import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Info, Compass, Camera, Video, FileText, Map as MapIcon, 
  Menu, X, Sun, Moon, Search, ChevronRight, ChevronLeft, Download, Share2, 
  Check, ArrowRight, User, Calendar, ExternalLink, Mail, Phone,
  Send, Database, Award, Layers, Sliders, MessageSquare, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Language, Subcategory, MediaType, GalleryItem, VideoItem, 
  PublicationItem, InterviewItem, BlogItem 
} from './types';
import { 
  TRANSLATIONS, GALLERY_ITEMS, VIDEO_ITEMS, PUBLICATION_ITEMS, 
  INTERVIEW_ITEMS, BLOG_ITEMS 
} from './data';
import { MapSection } from './components/MapSection';
import { ProjectDetail } from './components/ProjectDetail';
import { supabase, uploadImageToSupabase, fetchImagesFromSupabaseBucket } from './supabase';

export default function App() {
  // --- STATE LAYER ---
  const [language, setLanguage] = useState<Language>('BR');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  
  // Dynamic collections starting from hardcoded datasets
  const [customPhotos, setCustomPhotos] = useState<GalleryItem[]>([]);
  const [publications, setPublications] = useState<PublicationItem[]>(PUBLICATION_ITEMS);
  const [testimonials, setTestimonials] = useState<InterviewItem[]>(INTERVIEW_ITEMS);
  const [blogPosts, setBlogPosts] = useState<BlogItem[]>(BLOG_ITEMS);

  // Filters State for Operations & Media Catalog
  const [selectedOperation, setSelectedOperation] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType | null>(null);

  // Upload Modal/Process State
  const [uploadTitlePT, setUploadTitlePT] = useState('');
  const [uploadTitleEN, setUploadTitleEN] = useState('');
  const [uploadTitleES, setUploadTitleES] = useState('');
  const [uploadSubcat, setUploadSubcat] = useState<Subcategory>('EACF');
  const [uploadOp, setUploadOp] = useState<number>(42);
  const [uploadPhotographer, setUploadPhotographer] = useState('Dr. J. Silva');
  const [uploadTags, setUploadTags] = useState('Antártica, pesquisa, EACF');
  const [uploadFile, setUploadFile] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  
  // Real Supabase storage binary upload state
  const [supabaseFile, setSupabaseFile] = useState<File | null>(null);
  const [supabaseUploadError, setSupabaseUploadError] = useState<string | null>(null);
  const [supabaseUploadSuccess, setSupabaseUploadSuccess] = useState<boolean>(false);
  const [supabaseBucketName, setSupabaseBucketName] = useState<string>('photos');

  // Supabase live bucket synchronization states
  const [isSyncingBucket, setIsSyncingBucket] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Automatically pull or manually sync photos from user's Supabase bucket
  const handleSyncBucketPhotos = async (silent = false) => {
    if (!silent) setIsSyncingBucket(true);
    try {
      // Pull from both default folder uploads/ and root folder of the bucket
      const rootFiles = await fetchImagesFromSupabaseBucket(supabaseBucketName, '');
      const uploadsFiles = await fetchImagesFromSupabaseBucket(supabaseBucketName, 'uploads');
      
      const allFiles = [...rootFiles, ...uploadsFiles];
      if (allFiles.length > 0) {
        // Filter out files that don't look like common images (optional but good practice)
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'];
        const imageFiles = allFiles.filter(file => {
          const ext = file.name.split('.').pop()?.toLowerCase() || '';
          return imageExtensions.includes(ext);
        });

        const loadedPhotos: GalleryItem[] = imageFiles.map((file, idx) => {
          const isUpl = file.name.includes('_') && !isNaN(Number(file.name.split('_').pop()?.split('.')[0] || ''));
          const descriptionPT = isUpl
            ? "Fotografia de expedição real."
          
          
          return {
            id: `supabase_${file.name}_${idx}`,
            title: {
              BR: file.name.split('.')[0].replace(/_/g, ' ').toUpperCase(),
              EN: file.name.split('.')[0].replace(/_/g, ' ').toUpperCase(),
              ES: file.name.split('.')[0].replace(/_/g, ' ').toUpperCase()
            },
            description: {
              BR: descriptionPT,
              EN: `Real-time physical photo '${supabaseBucketName}'.`,
              ES: `Foto real '${supabaseBucketName}'.`
            },
            imageUrl: file.publicUrl,
            operation: 44, // Default to newest Operation for these custom photos
            subcategory: "Paisagens",
            tags: ["Sincronizado", "Acervo Real"],
        
            year: 2026,
            location: {
              BR: "Estação Comandante Ferraz",
              EN: "Comandante Ferraz Station",
              ES: "Base Comandante Ferraz"
            }
          };
        });

        // Add only those that don't already exist in state
        setCustomPhotos(prev => {
          const existingUrls = new Set(prev.map(p => p.imageUrl));
          const uniqueNewOnes = loadedPhotos.filter(ph => !existingUrls.has(ph.imageUrl));
          return [...uniqueNewOnes, ...prev];
        });

        if (!silent) {
          const count = loadedPhotos.length;
          setSyncMessage(
            language === 'BR' 
              ? `✓ Sincronizado! ${count} imagens reais .` 
              : `✓ Synced! ${count} real images .`
          );
          setTimeout(() => setSyncMessage(null), 5000);
        }
      } else {
        if (!silent) {
          setSyncMessage(
            language === 'BR'
              ? `Nenhuma imagem encontrada no bucket '${supabaseBucketName}'. Faça upload de arquivos antes!`
              : `No images found in bucket '${supabaseBucketName}'. Upload files first!`
          );
          setTimeout(() => setSyncMessage(null), 5000);
        }
      }
    } catch (err: any) {
      console.error('Error synchronizing Supabase bucket on load:', err);
      if (!silent) {
        setSyncMessage(`Erro ao sincronizar: ${err.message || err}`);
        setTimeout(() => setSyncMessage(null), 5000);
      }
    } finally {
      if (!silent) setIsSyncingBucket(false);
    }
  };

  // Combine static and custom user uploaded photo assets
  const combinedPhotos = [...customPhotos, ...GALLERY_ITEMS];

  // Lightbox Image Viewer State
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Auto-sync silently on startup & every 15 seconds to pull user's files completely automatically!
  useEffect(() => {
    handleSyncBucketPhotos(true);

    const interval = setInterval(() => {
      handleSyncBucketPhotos(true);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % combinedPhotos.length : null));
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + combinedPhotos.length) % combinedPhotos.length : null));
      } else if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, combinedPhotos.length]);

  // Details Modal State for publications & interviews
  const [activeAcademicDetail, setActiveAcademicDetail] = useState<PublicationItem | null>(null);
  const [activeInterviewTranscript, setActiveInterviewTranscript] = useState<InterviewItem | null>(null);

  // Form submission state
  const [subject, setSubject] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  // Share drawer status
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  // Mobile menu overlay
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[language];
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search recommendations on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync scroll context or state triggers
  const executeToastFeedback = (msg: string) => {
    setShareFeedback(msg);
    setTimeout(() => setShareFeedback(null), 3000);
  };

  // --- CORE SEARCH ENGINE ---
  const handleSearchResultClick = (item: any, category: string) => {
    setSearchQuery('');
    setSearchFocused(false);
    if (category === 'video') {
      setSelectedVideo(item as VideoItem);
      setActiveTab('videos');
    } else if (category === 'photo') {
      setActiveTab('gallery');
    } else if (category === 'publication') {
      setActiveTab('publications');
      setActiveAcademicDetail(item as PublicationItem);
    } else if (category === 'blog') {
      setActiveTab('blog');
    }
  };

  // Filter collections by search query
  const searchResults = {
    photos: combinedPhotos.filter(p => 
      p.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    videos: VIDEO_ITEMS.filter(v => 
      v.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    publications: publications.filter(pub => 
      pub.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pub.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    blog: blogPosts.filter(b => 
      b.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  };

  const hasAnySearchResults = searchQuery !== '' && (
    searchResults.photos.length > 0 ||
    searchResults.videos.length > 0 ||
    searchResults.publications.length > 0 ||
    searchResults.blog.length > 0
  );

  // --- SUPABASE-ENABLED GALLERY UPLOAD HANDLER ---
  const handlePhotoUploadSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitlePT) {
      alert(language === 'BR' ? 'Favor inserir o título (BR).' : 'Please enter the title (BR).');
      return;
    }

    let finalImageUrl = uploadFile;

    // If a physical file is selected, upload to real Supabase Storage!
    if (supabaseFile) {
      setIsUploading(true);
      setSupabaseUploadError(null);
      setSupabaseUploadSuccess(false);

      const { publicUrl, error } = await uploadImageToSupabase(supabaseFile, supabaseBucketName);
      
      if (error) {
        setSupabaseUploadError(
          language === 'BR' 
            ? `Erro Supabase: ${error}. Dica: Certifique-se de que buckets como '${supabaseBucketName}' existem e estão públicos!` 
            : `Supabase Error: ${error}. Hint: Ensure bucket '${supabaseBucketName}' exists and is set to public!`
        );
        setIsUploading(false);
        return;
      }

      if (publicUrl) {
        finalImageUrl = publicUrl;
        setSupabaseUploadSuccess(true);
      }
    }

    if (!finalImageUrl) {
      alert(
        language === 'BR' 
          ? 'Por favor, selecione uma imagem da expedição, insira uma URL ou faça upload de um arquivo real do Supabase.' 
          : 'Please select an expedition image, insert a URL, or upload a real file to Supabase.'
      );
      return;
    }

    setIsUploading(true);

    // Build the new gallery item
    const parsedTags = uploadTags.split(',').map(tag => tag.trim()).filter(Boolean);
    const newPhoto: GalleryItem = {
      id: `custom_${Date.now()}`,
      title: {
        BR: uploadTitlePT,
        EN: uploadTitleEN || uploadTitlePT,
        ES: uploadTitleES || uploadTitlePT
      },
      description: {
        BR: supabaseFile 
          ? `Fotografia real carregada no Supabase Storage (Bucket: ${supabaseBucketName}).`
          : "Fotografia autoral anexada pelo portal de pesquisa em tempo real.",
        EN: supabaseFile
          ? `Real photograph hosted in Supabase Storage (Bucket: ${supabaseBucketName}).`
          : "Researcher photograph uploaded live from the base portal.",
        ES: supabaseFile
          ? `Fotografía real alojada en Supabase Storage (Bucket: ${supabaseBucketName}).`
          : "Fotografía científica adjuntada desde la plataforma de comunicaciones."
      },
      imageUrl: finalImageUrl,
      operation: uploadOp,
      subcategory: uploadSubcat,
      tags: parsedTags,
      photographer: uploadPhotographer,
      year: 2026,
      location: {
        BR: "Ponto Antártico Coordenado",
        EN: "Coordinated Polar Station",
        ES: "Punto Antártico Registrado"
      }
    };

    // Save and cleanup
    setCustomPhotos(prev => [newPhoto, ...prev]);
    setIsUploading(false);
    setShowUploadPanel(false);
    
    // Clear inputs
    setUploadTitlePT('');
    setUploadTitleEN('');
    setUploadTitleES('');
    setUploadFile('');
    setSupabaseFile(null);
    setSupabaseUploadSuccess(false);
    setSupabaseUploadError(null);
    
    executeToastFeedback(t.uploadSuccess);
  };

  // --- CONTACT FORM SUBMISSION ---
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) {
      setFormFeedback(language === 'BR' ? 'Por favor complete todos os campos.' : 'Please fill all required fields.');
      return;
    }

    setFormFeedback(language === 'BR' ? 'Enviando transmissão de dados de rádio...' : 'Transmitting encrypted radio data packet...');
    setTimeout(() => {
      setFormFeedback(language === 'BR' ? 'Transmissão concluída com sucesso! Obrigado.' : 'Transmission successfully standard-routed! Support logged.');
      setSenderName('');
      setSenderEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setFormFeedback(null), 4000);
    }, 1800);
  };

  // Setup sample local base files for rapid testing
  const selectLocalSamplePhoto = (url: string) => {
    setUploadFile(url);
  };

  const sampleUrLs = [
    "https://images.unsplash.com/photo-1547190027-915998333755?q=80&w=800",
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=800",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800"
  ];

  // Dynamic Theme styling classes helper
  const isDark = theme === 'dark';
  const themeClasses = {
    bg: isDark ? 'bg-[#050505] text-[#F0F9FF]' : 'bg-stone-50 text-stone-900',
    navBg: isDark ? 'bg-[#050505]/80 border-white/10' : 'bg-[#fbfbfd]/95 border-stone-200',
    cardBg: isDark ? 'bg-[#141414] border-white/10 text-zinc-200' : 'bg-white border-stone-200 text-stone-800',
    textMuted: isDark ? 'text-white/50' : 'text-stone-600',
    border: isDark ? 'border-white/10' : 'border-stone-200',
    accentBorder: isDark ? 'border-[#38bdf8]/35' : 'border-stone-300',
    overlay: isDark ? 'bg-[#050505]/95' : 'bg-white/95',
    pillActive: 'bg-[#38bdf8] text-black',
    pillInactive: isDark ? 'border-white/10 bg-[#141414]/40 text-[#F0F9FF]/60 hover:text-white' : 'border-stone-305 bg-stone-100 text-stone-600 hover:text-stone-900',
    btnPrimary: 'bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-[#38bdf8] hover:text-black transition-all rounded-none px-8 py-4 shadow-sm',
    btnSecondary: isDark ? 'bg-white/5 border border-white/10 text-white font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white/10 transition-all rounded-none px-8 py-4' : 'bg-stone-200 text-stone-800 border border-stone-300 hover:bg-stone-300 rounded-none px-8 py-4 font-mono text-[10px] uppercase tracking-wider'
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} font-sans selection:bg-[#38bdf8] selection:text-black transition-colors duration-1000 overflow-x-hidden`}>
      
      {/* GLOBAL TOAST DRAWER FOR SHARE/UPLOAD FEEDBACK */}
      {shareFeedback && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#38bdf8] text-black px-6 py-3 font-mono text-xs tracking-wider border border-white flex items-center gap-3 animate-bounce">
          <Database className="w-4 h-4 animate-spin text-black" />
          <span>{shareFeedback}</span>
        </div>
      )}

      {/* HEADER NAVBAR */}
      <header className={`fixed top-0 w-full z-40 border-b backdrop-blur-xl ${themeClasses.navBg} transition-all duration-300 py-3 md:py-4`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-6" id="brand-launcher">
            <div 
              className="cursor-pointer flex flex-col justify-center"
              onClick={() => { setActiveTab('home'); setSelectedTag(null); }}
            >
              <h1 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-foreground leading-none">
                SAÚDE<span className="font-bold text-[#38bdf8]">ANTAR</span>-IA
              </h1>
              <span className="text-[7.5px] font-mono tracking-[0.35em] text-[#38bdf8]/70 uppercase mt-1">
                SaúdeAntar DIGITAL ARCHIVE
              </span>
            </div>
            
            {/* Desktop Desktop Tabs routing navigation */}
            <nav className="hidden xl:flex gap-5 text-[10px] uppercase tracking-widest font-mono">
              {[
                { id: 'home', label: t.navHome },
                { id: 'about', label: t.navAbout },
                { id: 'operations', label: t.exploreOps },
                { id: 'gallery', label: t.navGallery },
                { id: 'videos', label: t.navVideos },
                { id: 'publications', label: t.navPubs },
                { id: 'interviews', label: t.navInterviews },
                { id: 'blog', label: t.navBlog },
                { id: 'map', label: t.navMap },
                { id: 'contact', label: t.navContact }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedTag(null);
                  }}
                  className={`hover:text-cyan-400 transition-colors uppercase cursor-pointer py-1 border-b-2 ${
                    activeTab === tab.id ? 'text-cyan-400 border-cyan-400' : 'text-zinc-400 border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Header Panel Actions (Search, Language, Theme, Mobile Hamburger) */}
          <div className="flex items-center gap-4">
            
            {/* Search Input bar */}
            <div ref={searchContainerRef} className="relative z-50">
              <div className={`flex items-center border ${isDark ? 'border-zinc-800 bg-zinc-950/60' : 'border-stone-300 bg-white'} px-3 py-1.5 gap-2`}>
                <Search className="w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder={language === 'BR' ? "Buscar..." : "Search..."}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchFocused(true);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  className="bg-transparent text-xs outline-none w-24 md:w-40 font-mono tracking-tight"
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(''); setSearchFocused(false); }} className="text-zinc-500 hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* SEARCH AUTOCOMPLETE RESULTS */}
              {searchFocused && (searchQuery || hasAnySearchResults) && (
                <div className={`absolute right-0 mt-2 w-72 md:w-96 border shadow-2xl p-4 overflow-y-auto max-h-96 z-50 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-stone-200'}`}>
                  {searchQuery === '' ? (
                    <div className="text-xs text-zinc-500 font-mono mb-2">SUGESTÕES DE PESQUISA:</div>
                  ) : (
                    <div className="text-xs text-zinc-500 font-mono mb-2">
                      {searchResults.photos.length + searchResults.videos.length + searchResults.publications.length + searchResults.blog.length} {t.searchResultCount}
                    </div>
                  )}

                  {/* Sample suggestion terms when empty */}
                  {searchQuery === '' && (
                    <div className="flex flex-wrap gap-1.5">
                      {['saúde mental', 'EACF', 'navio', 'coping', 'medicina polar', 'SaúdeAntar'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="text-[10px] font-mono bg-zinc-900 text-cyan-300 px-2 py-1 hover:bg-cyan-400 hover:text-black"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Video Search Results */}
                  {searchResults.videos.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-400 border-b border-zinc-900 pb-1 mb-2">VÍDEOS & FILMES</h4>
                      <ul className="space-y-2">
                        {searchResults.videos.map(item => (
                          <li 
                            key={item.id} 
                            onClick={() => handleSearchResultClick(item, 'video')}
                            className="text-xs hover:text-cyan-300 cursor-pointer flex justify-between items-center py-1 hover:bg-zinc-900/40 px-1 font-mono"
                          >
                            <span className="truncate max-w-[200px]">{item.title[language]}</span>
                            <span className="text-[9px] text-zinc-500 uppercase">{item.duration}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Photo Search Results */}
                  {searchResults.photos.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-400 border-b border-zinc-900 pb-1 mb-2">PORTFÓLIO VISUAL</h4>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {searchResults.photos.slice(0, 4).map(item => (
                          <div 
                            key={item.id} 
                            onClick={() => handleSearchResultClick(item, 'photo')}
                            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-zinc-900/40"
                          >
                            <img src={item.imageUrl} className="w-8 h-8 object-cover object-center" alt="" />
                            <span className="text-[10px] truncate max-w-[80px] font-mono">{item.title[language]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Publications Search Results */}
                  {searchResults.publications.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-400 border-b border-zinc-900 pb-1 mb-2">ARTIGOS ACADÊMICOS</h4>
                      <ul className="space-y-1.5 text-xs text-zinc-400">
                        {searchResults.publications.map(pub => (
                          <li 
                            key={pub.id}
                            onClick={() => handleSearchResultClick(pub, 'publication')}
                            className="hover:text-cyan-300 cursor-pointer py-1 font-mono hover:bg-zinc-900/40 px-1"
                          >
                            📁 {pub.title[language]} <span className="text-[9px] text-indigo-400">({pub.year})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Language Selector Selector dropdown */}
            <div className="flex items-center gap-1 bg-zinc-900/10 px-2 py-1.5 border border-zinc-800/10">
              <span className="text-[9px] font-mono tracking-widest uppercase opacity-40 hidden md:inline">{t.langSelect}:</span>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value as Language)}
                className={`bg-transparent text-xs font-mono outline-none border-0 cursor-pointer ${isDark ? 'text-zinc-300 bg-zinc-950' : 'text-stone-800 bg-stone-105'}`}
              >
                <option value="BR" className="bg-zinc-950 text-white">BR</option>
                <option value="EN" className="bg-zinc-950 text-white">EN</option>
                <option value="ES" className="bg-zinc-950 text-white">ES</option>
              </select>
            </div>

            {/* Light/Dark Toggle */}
            <button
              onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
              className="p-1.5 border border-zinc-800/30 hover:border-cyan-400 hover:text-cyan-400"
              title={t.themeToggle}
            >
              {isDark ? <Sun className="w-4 h-4 cursor-pointer" /> : <Moon className="w-4 h-4 cursor-pointer" />}
            </button>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="xl:hidden p-1.5 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* MOBILE NAVIGATION OVERLAY */}
        {mobileMenuOpen && (
          <div className={`xl:hidden fixed inset-x-0 top-[60px] p-6 border-b border-zinc-900 shadow-2xl z-40 transition-all duration-300 ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-stone-900'}`}>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono tracking-widest uppercase">
              {[
                { id: 'home', label: t.navHome },
                { id: 'about', label: t.navAbout },
                { id: 'operations', label: t.exploreOps },
                { id: 'gallery', label: t.navGallery },
                { id: 'videos', label: t.navVideos },
                { id: 'publications', label: t.navPubs },
                { id: 'interviews', label: t.navInterviews },
                { id: 'blog', label: t.navBlog },
                { id: 'map', label: t.navMap },
                { id: 'contact', label: t.navContact }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedTag(null);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left p-2.5 border-b ${
                    activeTab === tab.id ? 'text-cyan-400 border-cyan-400/40' : 'text-zinc-500 border-zinc-900/20'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* RENDER DYNAMIC TAG PAGES PRESETS */}
      {selectedTag && (
        <div className="pt-24 max-w-7xl mx-auto px-6 pb-12">
          <div className="border border-cyan-800/40 bg-cyan-950/10 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-[0.3em] block mb-2">
                {t.tagTitle}
              </span>
              <h2 className="text-4xl text-white font-display italic">
                #{selectedTag}
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                EXPOSIÇÃO DE ARQUIVOS INDEXADOS SOB CATEGORIAS POLARES SISTEMÁTICAS
              </p>
            </div>
            <button 
              onClick={() => setSelectedTag(null)}
              className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 font-mono text-[10px] uppercase tracking-widest text-zinc-300 hover:text-white"
            >
              ← Retornar à Base
            </button>
          </div>

          {/* Rendering grouped results container */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {combinedPhotos.filter(p => p.tags.includes(selectedTag)).map((ph) => (
              <div 
                key={ph.id}
                onClick={() => {
                  const originalIndex = combinedPhotos.findIndex(item => item.id === ph.id);
                  if (originalIndex !== -1) {
                    setActivePhotoIndex(originalIndex);
                  }
                  setActiveTab('gallery');
                  setSelectedTag(null);
                }}
                className="group cursor-pointer border border-zinc-900 bg-zinc-950 p-4 transition-all"
              >
                <div className="aspect-video overflow-hidden bg-black mb-4 border border-zinc-900">
                  <img src={ph.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                </div>
                <span className="text-[9px] font-mono text-cyan-400 uppercase">FOTOGRAFIA • OP {ph.operation}</span>
                <h3 className="text-lg font-light text-white mt-1">{ph.title[language]}</h3>
              </div>
            ))}
            
            {VIDEO_ITEMS.filter(v => v.tags.includes(selectedTag)).map((vid) => (
              <div 
                key={vid.id}
                onClick={() => { setSelectedVideo(vid); setActiveTab('videos'); setSelectedTag(null); }}
                className="group cursor-pointer border border-zinc-900 bg-zinc-950 p-4 transition-all"
              >
                <div className="aspect-video overflow-hidden bg-black mb-4 relative border border-zinc-900">
                  <img src={vid.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                  <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-cyan-300 opacity-60" />
                </div>
                <span className="text-[9px] font-mono text-cyan-400 uppercase">VÍDEO • {vid.duration}</span>
                <h3 className="text-lg font-light text-white mt-1">{vid.title[language]}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CORE VIEW ROUTER PORTAL (If no tag file is focused) */}
      {!selectedTag && (
        <main className="pt-16 pb-20">
          
          {/* TAB 1: HOME PAGE */}
          {activeTab === 'home' && (
            <div>
              {/* Fullscreen cinematic video background Hero Banner */}
              <section className="relative h-screen w-full overflow-hidden flex items-center justify-start">
                
                {/* Visual Imagery or background preview */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-80 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=2000" 
                    className="w-full h-full object-cover scale-102 animate-slow-zoom brightness-75 opacity-70 contrast-110"
                    alt="Antarctica Landscape"
                  />
                </div>

                {/* Floating UI Meta Section */}
                <div className="absolute top-32 left-6 md:left-12 lg:left-24 xl:left-36 z-20 flex flex-col gap-1 text-[10px] font-mono tracking-widest uppercase opacity-40">
                  <div>Mission: SaúdeAntar 42</div>
                  <div>Location: 62°05'S 58°23'W</div>
                  <div className="mt-4 w-12 h-[1px] bg-[#38bdf8]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 w-full relative z-20 mt-12">
                  <div className="max-w-3xl">
                    <span className="text-[#38bdf8] font-mono text-[11px] tracking-[0.4em] uppercase mb-4 block">
                      ▲ HUB AUDIOVISUAL & CIENTÍFICO
                    </span>
                    <h2 className="text-6xl md:text-8xl font-light leading-[1.1] tracking-tighter mb-6 text-white text-left">
                      SaúdeAntar<span className="font-display italic text-[#38bdf8]">-ia</span>
                    </h2>
                    <p className="text-lg text-white/50 font-light leading-relaxed mb-10 max-w-lg text-left">
                      {t.subtitle}
                    </p>
                    
                    <div className="flex flex-wrap gap-6">
                      <button 
                        onClick={() => setActiveTab('operations')}
                        className={themeClasses.btnPrimary}
                      >
                        {t.exploreOps}
                      </button>
                      <button 
                        onClick={() => setActiveTab('interviews')}
                        className={themeClasses.btnSecondary}
                      >
                        {t.interviewsBtn}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Technical dynamic coords band */}
                <div className="absolute bottom-12 right-12 z-20 hidden lg:block text-right">
                  <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 mb-1">STATION OF DEPLOYMENT</div>
                  <div className="text-xs font-light italic text-zinc-300">Ferraz Shield Base, Admiralty Bay, Antarctica</div>
                  <div className="text-[9px] font-mono text-cyan-400 mt-2">62°05'S 58°23'W • AIR -12.4°C</div>
                </div>
              </section>

              {/* NETFLIX-STYLE HORIZONTAL CAROUSELS ROW SECTION */}
              <div className="relative -mt-20 z-30 space-y-16 max-w-7xl mx-auto px-6">
                
                {/* ROW 1: DOCUMENTÁRIOS HIGHLIGHTS */}
                <div className="group">
                  <div className="mb-6 flex justify-between items-end border-b border-zinc-900 pb-2">
                    <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-cyan-400 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" /> {t.highlights}
                    </h3>
                    <div 
                      onClick={() => setActiveTab('videos')}
                      className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-cyan-300 cursor-pointer flex items-center gap-1"
                    >
                      {t.viewAll} <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  
                  <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x">
                    {VIDEO_ITEMS.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => { setSelectedVideo(item); }}
                        className="min-w-[280px] md:min-w-[380px] aspect-video bg-zinc-950 border border-zinc-900 relative cursor-pointer snap-start overflow-hidden group/card"
                      >
                        <img 
                          src={item.thumbnail} 
                          className="w-full h-full object-cover grayscale brightness-75 group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-700" 
                          alt="" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-5 flex flex-col justify-end">
                          <span className="text-[8px] font-mono text-cyan-400 mb-1 uppercase tracking-widest">OP {item.operation} • {item.duration}</span>
                          <h4 className="font-light text-white text-md md:text-lg mb-1 leading-snug">{item.title[language]}</h4>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase">{item.director}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ROW 2: ESTUDOS E PESQUISAS */}
                <div className="group">
                  <div className="mb-6 flex justify-between items-end border-b border-zinc-900 pb-2">
                    <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-indigo-400 flex items-center gap-2">
                      <Database className="w-4 h-4" /> {t.scientificProjects}
                    </h3>
                    <div 
                      onClick={() => setActiveTab('publications')}
                      className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-indigo-400 cursor-pointer flex items-center gap-1"
                    >
                      {t.viewAll} <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {publications.slice(0, 3).map((pub) => (
                      <div 
                        key={pub.id}
                        onClick={() => { setActiveAcademicDetail(pub); setActiveTab('publications'); }}
                        className={`p-6 border ${themeClasses.cardBg} hover:border-indigo-500/50 transition-all cursor-pointer flex flex-col justify-between h-[230px]`}
                      >
                        <div>
                          <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 bg-zinc-950/20 py-1 px-2 border border-zinc-800">
                             {pub.journal}
                          </span>
                          <h4 className="font-light text-white text-md mt-4 line-clamp-2">
                            {pub.title[language]}
                          </h4>
                        </div>
                        <p className="text-[10px] font-mono text-indigo-300 uppercase mt-4">
                           DOI ID: {pub.doi}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ROW 3: MEMÓRIAS VISUAIS GALERIA PREVIEWS */}
                <div className="group">
                  <div className="mb-6 flex justify-between items-end border-b border-zinc-900 pb-2">
                    <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-cyan-450 flex items-center gap-2">
                      <Camera className="w-4 h-4" /> {t.visualMemories}
                    </h3>
                    <div 
                      onClick={() => setActiveTab('gallery')}
                      className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-cyan-400 cursor-pointer flex items-center gap-1"
                    >
                      {t.viewAll} <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {combinedPhotos.slice(0, 4).map((ph) => (
                      <div 
                        key={ph.id}
                        onClick={() => {
                          const originalIndex = combinedPhotos.findIndex(item => item.id === ph.id);
                          if (originalIndex !== -1) {
                            setActivePhotoIndex(originalIndex);
                          }
                          setActiveTab('gallery');
                        }}
                        className="group/photocard aspect-square bg-zinc-950 overflow-hidden relative cursor-pointer border border-zinc-900"
                      >
                        <img 
                          src={ph.imageUrl} 
                          className="w-full h-full object-cover grayscale group-hover/photocard:grayscale-0 group-hover/photocard:scale-105 transition-all duration-700" 
                          alt="" 
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/photocard:opacity-100 flex flex-col justify-end p-4 transition-opacity">
                          <span className="text-[8px] font-mono text-cyan-400 uppercase">OP {ph.operation}</span>
                          <h4 className="text-xs font-bold text-white uppercase truncate">{ph.title[language]}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>



              </div>
            </div>
          )}

          {/* TAB 2: SOBRE O PROJETO */}
          {activeTab === 'about' && (
            <div className="max-w-7xl mx-auto px-6 pt-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-[0.3em] block">
                    ▲ SCIENTIFIC MANIFESTO
                  </span>
                  <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
                    Preservando a <br /> <span className="font-display italic">Memória Polar</span>
                  </h2>
                  <div className="w-20 h-0.5 bg-cyan-400 my-6" />
                  <p className="text-zinc-300 font-light text-lg leading-relaxed">
                    {t.aboutPara1}
                  </p>
                  <p className="text-zinc-400 font-light leading-relaxed text-sm">
                    {t.aboutPara2}
                  </p>
                  
                  {/* Additional ICE characteristics bullet lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 text-xs font-mono text-zinc-400 uppercase">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400" /> RESILIÊNCIA PSICOFISIOLÓGICA
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400" /> MECANISMOS DE COPING
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400" /> CONFINAMENTO SUBZERO (ICE)
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400" /> SISTEMA DE SUPORTE GRUPAL
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 relative group overflow-hidden border border-zinc-900">
                  <img 
                    src="https://images.unsplash.com/photo-1551218372-a8c21e9c857b?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-102"
                    alt="Antarctica Exploration" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/20" />
                  <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-wider text-cyan-300">
                     EXPEDIÇÃO BRASILEIRA SaúdeAntar XLIV
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OPERAÇÕES 38–44 */}
          {activeTab === 'operations' && (
            <div className="max-w-7xl mx-auto px-6 pt-12">
              <div className="mb-12">
                <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-[0.3em] block mb-2">
                   {t.allOps}
                </span>
                <h2 className="text-4xl text-white font-light">
                  {t.operationsTitle}
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-1 uppercase">
                  {t.operationsSub}
                </p>
              </div>

              {/* RETANGULAR PILL FILTER MATRIX */}
              <div className="space-y-6 mb-12 border-y border-zinc-900 py-6">
                <div>
                  <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest block mb-3">
                     FILTRAR POR OPERAÇÃO CRONOLÓGICA
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedOperation(null)}
                      className={`px-4 py-1.5 font-mono text-xs ${selectedOperation === null ? themeClasses.pillActive : themeClasses.pillInactive}`}
                    >
                      {t.allOps}
                    </button>
                    {[37, 38, 39, 40, 41, 42, 43, 44].map((op) => (
                      <button
                        key={op}
                        onClick={() => setSelectedOperation(op)}
                        className={`px-4 py-1.5 font-mono text-xs ${selectedOperation === op ? themeClasses.pillActive : themeClasses.pillInactive}`}
                      >
                        OP_{op}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest block mb-3">
                     SUB-CATEGORAMENTO DE MISSÃO
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedSubcategory(null)}
                      className={`px-4 py-1.5 font-mono text-xs ${selectedSubcategory === null ? themeClasses.pillActive : themeClasses.pillInactive}`}
                    >
                      {t.allSubcats}
                    </button>
                    {['EACF', 'Navio', 'Acampamento', 'Paisagens', 'Rotina da missão', 'Fauna antártica', 'Expedições externas', 'Retratos'].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubcategory(sub as Subcategory)}
                        className={`px-4 py-1.5 font-mono text-xs ${selectedSubcategory === sub ? themeClasses.pillActive : themeClasses.pillInactive}`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* RENDER DYNAMIC ARCHIVE GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {combinedPhotos
                  .filter((p) => selectedOperation === null || p.operation === selectedOperation)
                  .filter((p) => selectedSubcategory === null || p.subcategory === selectedSubcategory)
                  .map((ph) => (
                    <div 
                      key={ph.id}
                      onClick={() => {
                        const originalIndex = combinedPhotos.findIndex(item => item.id === ph.id);
                        if (originalIndex !== -1) {
                          setActivePhotoIndex(originalIndex);
                        }
                        setActiveTab('gallery');
                      }}
                      className={`border overflow-hidden cursor-pointer group ${themeClasses.cardBg}`}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={ph.imageUrl} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-102" 
                          alt="" 
                        />
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="flex justify-between items-center text-[9px] font-mono text-cyan-400 uppercase">
                          <span>OP {ph.operation}</span>
                          <span>{ph.subcategory}</span>
                        </div>
                        <h3 className="text-md font-light text-white leading-tight">
                          {ph.title[language]}
                        </h3>
                        {ph.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-[9px] font-mono tracking-wider text-zinc-500 mr-2 uppercase">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Feedback if empty */}
              {combinedPhotos
                .filter((p) => selectedOperation === null || p.operation === selectedOperation)
                .filter((p) => selectedSubcategory === null || p.subcategory === selectedSubcategory).length === 0 && (
                <div className="text-center font-mono py-24 text-zinc-500 text-xs">
                  {t.noResults}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: GALERIA DE FOTOS */}
          {activeTab === 'gallery' && (
            <div className="max-w-7xl mx-auto px-6 pt-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-[0.3em] flex items-center gap-2 mb-2">
                     LEDGER FOTOGRÁFICO
                     <span className="inline-flex items-center gap-1.5 text-[8px] bg-cyan-950/40 text-cyan-300 border border-cyan-800/40 px-1.5 py-0.5 animate-pulse normal-case tracking-normal">
                       <span className="w-1 h-1 rounded-full bg-cyan-400" />
                       Supabase Auto-Sync
                     </span>
                  </span>
                  <h2 className="text-4xl text-white font-light">
                     {t.visualMemories}
                  </h2>
                </div>
              </div>

              {/* Feedback status message for Sync */}
              {syncMessage && (
                <div className="mb-6 p-3 bg-zinc-950 border border-cyan-800/50 text-xs text-cyan-300 font-mono flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  {syncMessage}
                </div>
              )}

              {/* PHOTO UPLOAD DRAWER IF TRIGGERED */}
              {showUploadPanel && (
                <div className="mb-12 border border-zinc-800 bg-zinc-900/60 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-3">
                    <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-[0.2em] flex items-center gap-2">
                      <Layers className="w-4 h-4 animate-spin" /> ACERVO DIGITAL SUB-PROCESSO
                    </span>
                    <button onClick={() => setShowUploadPanel(false)} className="text-zinc-500 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handlePhotoUploadSimulate} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono text-zinc-300">
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-1 opacity-70">TÍTULO (BR) *</label>
                        <input 
                          type="text" 
                          value={uploadTitlePT}
                          onChange={(e) => setUploadTitlePT(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 p-2 text-white" 
                          placeholder="Ex: Pôr do sol no Drake"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 opacity-70">TITLE (EN)</label>
                        <input 
                          type="text" 
                          value={uploadTitleEN}
                          onChange={(e) => setUploadTitleEN(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 p-2 text-white" 
                          placeholder="Ex: Drake Sunset"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 opacity-70">TÍTULO (ES)</label>
                        <input 
                          type="text" 
                          value={uploadTitleES}
                          onChange={(e) => setUploadTitleES(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 p-2 text-white" 
                          placeholder="Ex: Atardecer en el Drake"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1 opacity-70">OPERAÇÃO</label>
                          <select 
                            value={uploadOp}
                            onChange={(e) => setUploadOp(Number(e.target.value))}
                            className="w-full bg-zinc-950 border border-zinc-800 p-2 text-white"
                          >
                            {[38,39,40,41,42,43,44].map((num) => (
                              <option key={num} value={num}>OP_{num}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block mb-1 opacity-70">CATEGORIA</label>
                          <select 
                            value={uploadSubcat}
                            onChange={(e) => setUploadSubcat(e.target.value as Subcategory)}
                            className="w-full bg-zinc-950 border border-zinc-800 p-2 text-white"
                          >
                            {['EACF','Navio','Acampamento','Paisagens','Rotina da missão','Fauna antártica','Expedições externas','Retratos'].map((num) => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1 opacity-70">INVESTIGADOR / AUTOR</label>
                        <input 
                          type="text" 
                          value={uploadPhotographer}
                          onChange={(e) => setUploadPhotographer(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 p-2 text-white" 
                        />
                      </div>

                      {/* Drop local image template or manual typing */}
                      <div>
                        <label className="block mb-1 opacity-70">SELECIONE UMA IMAGEM DA EXPEDIÇÃO</label>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          {sampleUrLs.map((url, index) => (
                            <img 
                              key={index} 
                              onClick={() => {
                                selectLocalSamplePhoto(url);
                                setSupabaseFile(null);
                              }}
                              src={url} 
                              className={`w-full aspect-square object-cover cursor-pointer hover:opacity-100 ${uploadFile === url && !supabaseFile ? 'border-2 border-cyan-400 opacity-100' : 'opacity-60'}`} 
                              alt="" 
                            />
                          ))}
                        </div>
                        <input 
                          type="text" 
                          value={uploadFile}
                          disabled={!!supabaseFile}
                          onChange={(e) => setUploadFile(e.target.value)}
                          className={`w-full bg-zinc-950 border border-zinc-800 p-2 text-white ${supabaseFile ? 'opacity-40 cursor-not-allowed' : ''}`} 
                          placeholder={supabaseFile ? "Usando arquivo selecionado do Supabase" : "Ou insira outra URL de imagem válida..."}
                        />
                      </div>

                      {/* REAL SUPABASE STORAGE COMPONENT */}
                      <div className="p-4 border border-cyan-400/20 bg-cyan-950/5 rounded-none space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Database className="w-3.5 h-3.5 text-cyan-400" /> SUPABASE REAL STORAGE UPLOAD
                          </span>
                          <span className="text-[8px] px-1.5 py-0.5 bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
                            ACTIVE INTEGRATION
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] mb-1 opacity-50 uppercase">Arquivo Local</label>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setSupabaseFile(e.target.files[0]);
                                  setSupabaseUploadError(null);
                                  setSupabaseUploadSuccess(false);
                                }
                              }}
                              className="w-full bg-zinc-950 border border-zinc-900 p-1.5 text-[10px] text-zinc-300 cursor-pointer"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] mb-1 opacity-50 uppercase">Storage Bucket</label>
                            <input 
                              type="text" 
                              value={supabaseBucketName}
                              onChange={(e) => setSupabaseBucketName(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-900 p-1.5 text-[10px] text-cyan-300 font-mono"
                              placeholder="Default: photos"
                            />
                          </div>
                        </div>

                        {supabaseUploadError && (
                          <div className="p-2.5 bg-red-950/30 border border-red-900/50 text-[10px] text-red-300 rounded-none space-y-1">
                            <p className="font-bold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> Ops! Configuração Necessária</p>
                            <p className="opacity-90 leading-relaxed font-sans">{supabaseUploadError}</p>
                            <div className="pt-1.5 border-t border-red-900/30 text-[9px] font-mono space-y-0.5 opacity-80 list-decimal pl-1">
                              <div>1. Crie o bucket <span className="text-white font-bold">'{supabaseBucketName}'</span> no console do Supabase.</div>
                              <div>2. Defina o bucket como <span className="text-white font-bold">Public</span>.</div>
                              <div>3. Crie uma política de RLS para <span className="text-white font-bold font-mono">Anonymous Select & Insert</span>.</div>
                            </div>
                          </div>
                        )}

                        {supabaseFile && !supabaseUploadError && (
                          <div className="p-2 bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400 flex items-center justify-between font-mono">
                            <span className="truncate max-w-[200px]">Selecionado: {supabaseFile.name} ({(supabaseFile.size / 1024).toFixed(1)} KB)</span>
                            <button 
                              type="button" 
                              onClick={() => { setSupabaseFile(null); setSupabaseUploadError(null); }}
                              className="text-red-400 hover:text-white"
                            >
                              Remover
                            </button>
                          </div>
                        )}
                        
                        {supabaseUploadSuccess && (
                          <div className="p-2 bg-emerald-950/20 border border-emerald-900/50 text-[10px] text-emerald-400 font-mono">
                            ✓ Upload concluído com sucesso e link gerado!
                          </div>
                        )}
                      </div>

                      <button 
                        type="submit" 
                        disabled={isUploading}
                        className="w-full py-3 bg-cyan-400 text-zinc-950 font-bold hover:bg-white cursor-pointer select-none"
                      >
                        {isUploading ? "PROCESSANDO EXPEDIÇÃO POLAR..." : "SALVAR IMAGEM NO ACERVO"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* GRID OF GORGEOUS PHOTO TILES */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {combinedPhotos.map((item, idx) => (
                  <div 
                    key={item.id} 
                    onClick={() => setActivePhotoIndex(idx)}
                    className="break-inside-avoid bg-zinc-950 border border-zinc-900 group/photocell relative overflow-hidden cursor-pointer"
                  >
                    <div className="overflow-hidden relative max-h-[500px]">
                      <img 
                        src={item.imageUrl} 
                        className="w-full object-cover grayscale group-hover/photocell:grayscale-0 group-hover/photocell:scale-102 transition-all duration-1000" 
                        alt="" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photocell:opacity-100 flex flex-col justify-end p-6 transition-all duration-300">
                        <div className="flex justify-between items-center text-[8px] font-mono text-cyan-400 uppercase tracking-widest mb-1">
                          <span>OP {item.operation}</span>
                          <span>{item.subcategory}</span>
                        </div>
                        <h3 className="text-xl font-light text-white leading-snug">{item.title[language]}</h3>
                        <p className="text-xs text-zinc-300 font-mono italic mt-2">
                           Colaborador: {item.photographer} • {item.year}
                        </p>
                        
                        {/* Interactive Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {item.tags.map(tag => (
                            <span 
                              key={tag}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTag(tag);
                              }}
                              className="text-[9px] font-mono uppercase bg-zinc-950 text-cyan-300 border border-zinc-800 px-2 py-0.5 hover:bg-cyan-400 hover:text-black hover:border-white transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: VÍDEOS */}
          {activeTab === 'videos' && (
            <div className="max-w-7xl mx-auto px-6 pt-12">
              <div className="mb-12">
                <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-[0.3em] block mb-2">
                   FILMES & DOCUMENTÁRIOS DO SaúdeAntar
                </span>
                <h2 className="text-4xl text-white font-light">
                   {t.moviesTitle}
                </h2>
              </div>

              {/* EXQUISITE STAFF PICKS GALLERY LISTING */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {VIDEO_ITEMS.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => { setSelectedVideo(item); }}
                    className="group border border-zinc-900 bg-zinc-950 relative cursor-pointer overflow-hidden flex flex-col h-full"
                  >
                    <div className="aspect-video overflow-hidden bg-black relative">
                      <img 
                        src={item.thumbnail} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700"
                        alt="" 
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-cyan-400 text-zinc-950 group-hover:bg-white transition-colors flex items-center justify-center scale-95 hover:scale-100">
                          <Play className="w-6 h-6 fill-current translate-x-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-6 font-mono text-xs bg-zinc-950/80 px-2.5 py-1 text-zinc-300">
                         {item.duration}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center text-[9px] font-mono text-cyan-400 uppercase tracking-widest mb-2">
                          <span>OP {item.operation}</span>
                          <span>{item.subcategory}</span>
                        </div>
                        <h3 className="text-2xl font-light text-white mb-2 leading-none">
                          {item.title[language]}
                        </h3>
                        <p className="text-zinc-400 text-xs font-light tracking-wide line-clamp-2">
                          {item.description[language]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PUBLICAÇÕES CIENTÍFICAS */}
          {activeTab === 'publications' && (
            <div className="max-w-7xl mx-auto px-6 pt-12">
              <div className="mb-12">
                <span className="font-mono text-[10px] uppercase text-indigo-400 tracking-[0.3em] block mb-2">
                   {t.publicationsTitle}
                </span>
                <h2 className="text-4xl text-white font-light">
                   {t.publicationsTitle}
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-1 uppercase">
                   {t.publicationsSub}
                </p>
              </div>

              {/* TABLE FORMAT FOR SCIENTIFIC PAPERS */}
              <div className="space-y-4">
                {publications.map((pub) => (
                  <div 
                    key={pub.id}
                    onClick={() => setActiveAcademicDetail(pub)}
                    className="border border-zinc-904 bg-zinc-950/85 hover:bg-zinc-900/60 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer transition-all border-l-4 border-l-cyan-400"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 border border-cyan-900">
                           {pub.journal}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                           ANO: {pub.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-light text-white leading-tight">
                        {pub.title[language]}
                      </h3>
                      <p className="text-[10px] font-mono text-zinc-400 uppercase">
                        {t.authorsLabel}: {pub.authors.join(' • ')}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">
                         DOI: {pub.doi}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          executeToastFeedback("Documento Clínico PDF enfileirado para download");
                        }}
                        className="px-4 py-2 bg-zinc-900 hover:bg-cyan-400 hover:text-black border border-zinc-805 text-[10px] font-mono uppercase tracking-widest text-zinc-300 flex items-center gap-2 ml-auto"
                      >
                        <Download className="w-3.5 h-3.5" /> PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* MODAL / BOTTOM SLIDE FOR ACADEMIC DETAILS */}
              {activeAcademicDetail && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
                  <div className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 p-8 text-zinc-200">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
                      <div>
                        <span className="font-mono text-[9px] uppercase text-indigo-400 tracking-widest bg-indigo-950/50 px-2 py-1 border border-indigo-900">
                           {activeAcademicDetail.journal} • {activeAcademicDetail.year}
                        </span>
                        <h4 className="text-2xl font-light text-white mt-3">{activeAcademicDetail.title[language]}</h4>
                      </div>
                      <button onClick={() => setActiveAcademicDetail(null)} className="text-zinc-500 hover:text-white">
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">AUTHORS</span>
                        <p className="text-xs font-mono text-zinc-300">{activeAcademicDetail.authors.join(', ')}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">ABSTRACT / RESUMO</span>
                        <p className="text-sm font-light text-zinc-400 leading-relaxed">{activeAcademicDetail.abstract[language]}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-4 text-xs font-mono">
                        <div>
                          <span className="text-zinc-500 uppercase block">RESEARCH DOI</span>
                          <span className="text-cyan-400">{activeAcademicDetail.doi}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 uppercase block">FIELD / CATEGORY</span>
                          <span className="text-cyan-400">{activeAcademicDetail.category[language]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                      <button 
                        onClick={() => executeToastFeedback("Extração de PDF consolidada")}
                        className="px-6 py-3 bg-cyan-400 text-zinc-950 font-mono text-[11px] uppercase tracking-wider font-bold"
                      >
                        {t.downloadPdf}
                      </button>
                      <button 
                        onClick={() => setActiveAcademicDetail(null)}
                        className="px-6 py-3 bg-zinc-900 border border-zinc-800 font-mono text-[11px] uppercase text-zinc-300"
                      >
                        {t.closeBtn}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 7: ENTREVISTAS */}
          {activeTab === 'interviews' && (
            <div className="max-w-7xl mx-auto px-6 pt-12">
              <div className="mb-12">
                <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-[0.3em] block mb-2">
                   VIVÊNCIAS HUMANIZADAS
                </span>
                <h2 className="text-4xl text-white font-light animate-fade-in">
                   {t.interviewsTitle}
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-1 uppercase">
                   {t.interviewsSub}
                </p>
              </div>

              {/* DRAMATIC B&W PORTRAITS GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {testimonials.map((person) => (
                  <div 
                    key={person.id}
                    onClick={() => setActiveInterviewTranscript(person)}
                    className="border border-zinc-900 bg-zinc-950 p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-cyan-400 transition-all cursor-pointer group"
                    id={`interview-card-${person.id}`}
                  >
                    <div className="w-full md:w-44 aspect-square bg-zinc-900 overflow-hidden relative border border-zinc-850">
                      <img 
                        src={person.imageUrl} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-102"
                        alt={person.name} 
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                          OP {person.operation} • {person.location[language]}
                        </span>
                        <h3 className="text-xl text-white font-bold leading-tight mb-2">
                          {person.name}
                        </h3>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase mb-4 leading-normal">
                          {person.role[language]}
                        </p>
                        <p className="text-zinc-300 font-light italic leading-relaxed text-sm mb-4">
                          "{person.quote[language]}"
                        </p>
                      </div>

                      <span className="text-[10px] font-mono text-cyan-400 group-hover:underline flex items-center gap-1.5 uppercase mt-auto">
                        LER TRANSCRIÇÃO COMPLETA →
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* TRANSCRIPT DIALOG MODAL */}
              {activeInterviewTranscript && (
                <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto">
                  <div className={`w-full ${activeInterviewTranscript.youtubeId ? 'max-w-4xl' : 'max-w-2xl'} bg-zinc-950 border border-zinc-800 p-6 md:p-8 text-zinc-200 relative my-auto`}>
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
                      <div className="flex items-center gap-4">
                        <img src={activeInterviewTranscript.imageUrl} className="w-12 h-12 rounded-none object-cover grayscale" alt="" />
                        <div>
                          <h4 className="text-xl md:text-2xl font-bold text-white leading-none mb-1">{activeInterviewTranscript.name}</h4>
                          <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider">{activeInterviewTranscript.role[language]}</span>
                        </div>
                      </div>
                      <button onClick={() => setActiveInterviewTranscript(null)} className="text-zinc-500 hover:text-white pb-2">
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Video Player slot if youtubeId is present */}
                      {activeInterviewTranscript.youtubeId ? (
                        <div className="lg:col-span-6 space-y-4">
                          <div className="aspect-video w-full border border-zinc-900 bg-black overflow-hidden relative">
                            <iframe
                              src={`https://www.youtube.com/embed/${activeInterviewTranscript.youtubeId}`}
                              title={activeInterviewTranscript.name}
                              className="w-full h-full border-0 absolute inset-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-400/80 block text-center">
                            TRANSMISSÃO AUDIOCIENTÍFICA DA MISSÃO
                          </span>
                        </div>
                      ) : null}

                      {/* Text content slot */}
                      <div className={activeInterviewTranscript.youtubeId ? 'lg:col-span-6 space-y-4 flex flex-col justify-between' : 'lg:col-span-12 space-y-4'}>
                        <div className="space-y-4">
                          <blockquote className="border-l-2 border-cyan-400 pl-4 py-1 text-cyan-300 italic text-xs font-mono">
                             "{activeInterviewTranscript.quote[language]}"
                          </blockquote>
                          <div>
                            <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">DIÁRIO DE ADAPTAÇÃO & TRANSCRIÇÃO</span>
                            <p className="text-xs md:text-sm font-light text-zinc-350 leading-relaxed max-h-[220px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
                              {activeInterviewTranscript.fullTranscript[language]}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 flex flex-wrap gap-2 text-[10px] font-mono text-zinc-500">
                          <span>OPERAÇÃO: {activeInterviewTranscript.operation}</span>
                          <span>•</span>
                          <span>LOCAL: {activeInterviewTranscript.location[language]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 border-t border-zinc-900 pt-6 flex gap-3 justify-end">
                      <button 
                        onClick={() => executeToastFeedback("Cópia de memorando de rádio consolidada")}
                        className="px-6 py-2.5 bg-cyan-400 text-zinc-950 font-mono text-[10px] uppercase tracking-wider font-bold hover:bg-white transition-colors"
                      >
                         COPIAR TRANSCRIÇÃO
                      </button>
                      <button 
                        onClick={() => setActiveInterviewTranscript(null)}
                        className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 font-mono text-[10px] uppercase text-zinc-300 hover:text-white hover:bg-zinc-850"
                      >
                        {t.closeBtn}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 8: DIÁRIOS / BLOG */}
          {activeTab === 'blog' && (
            <div className="max-w-7xl mx-auto px-6 pt-12">
              <div className="mb-12">
                <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-[0.3em] block mb-2">
                   ARTIGOS & CRÔNICAS POLARES
                </span>
                <h2 className="text-4xl text-white font-light">
                   {t.blogTitle}
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-1 uppercase">
                   {t.blogSub}
                </p>
              </div>

              {/* PREMIUM MAGAZINE GRID COMPILATIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="border border-zinc-900 bg-zinc-950 p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative overflow-hidden mb-5 border border-zinc-850">
                        <img src={post.imageUrl} className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="" />
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400 mb-3">
                        <span>{post.date}</span>
                        <span>{post.readTime} LEITURA</span>
                      </div>
                      <h3 className="text-2xl font-light text-zinc-100 mb-3 leading-none hover:text-cyan-300 cursor-pointer">
                        {post.title[language]}
                      </h3>
                      <p className="text-sm font-light text-zinc-400 leading-relaxed mb-6">
                        {post.excerpt[language]}
                      </p>
                    </div>

                    <div className="border-t border-zinc-900 pt-4 flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-550 uppercase">AUTOR: {post.author}</span>
                      <button 
                        onClick={() => alert(`Acesso ao texto integral: ${post.title[language]}`)}
                        className="text-cyan-400 hover:underline inline-flex items-center gap-1 uppercase text-[10.5px]"
                      >
                         LER ARTIGO <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: CARTOGRAFIA INTERATIVA */}
          {activeTab === 'map' && (
            <div className="max-w-7xl mx-auto px-6 pt-12">
              <div className="mb-12">
                <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-[0.3em] block mb-2">
                   SPATIAL LEDGER DATABASE
                </span>
                <h2 className="text-4xl text-white font-light">
                   {t.mapHeader}
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-1 uppercase">
                   {t.mapSub}
                </p>
              </div>

              {/* MAP COMPONENT INJECTED */}
              <div className="w-full">
                <MapSection 
                  language={language}
                  onSelectPhoto={() => setActiveTab('gallery')}
                  onSelectVideo={(id) => {
                    const found = VIDEO_ITEMS.find(v => v.id === id);
                    if (found) setSelectedVideo(found);
                    setActiveTab('videos');
                  }}
                  onSelectPublication={(id) => {
                    const found = PUBLICATION_ITEMS.find(p => p.id === id);
                    if (found) setActiveAcademicDetail(found);
                    setActiveTab('publications');
                  }}
                  theme={theme}
                />
              </div>
            </div>
          )}

          {/* TAB 10: CONTATO */}
          {activeTab === 'contact' && (
            <div className="max-w-7xl mx-auto px-6 pt-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5 space-y-6">
                  <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-[0.3em] block">
                     LINHA DIRETA ACADÊMICA
                  </span>
                  <h2 className="text-4xl text-white font-light">
                     {t.contactTitle}
                  </h2>
                  <p className="text-zinc-400 font-light text-sm leading-relaxed">
                     {t.contactSub}
                  </p>

                  <div className="space-y-4 pt-6 font-mono text-xs text-zinc-450 uppercase">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-cyan-450" />
                      <span>proantar.resilience@saudeantar-ia.org</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-cyan-450" />
                      <span>+55 (21) 3221-1200 / R-442</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 p-8">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    {formFeedback && (
                      <div className="p-3 border border-cyan-800 bg-cyan-950/20 text-cyan-300 font-mono text-xs uppercase flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 animate-ping" /> {formFeedback}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono text-zinc-300">
                      <div>
                        <label className="block mb-2 opacity-75">{t.contactName} *</label>
                        <input 
                          type="text" 
                          required
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-cyan-400 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block mb-2 opacity-75">{t.contactEmail} *</label>
                        <input 
                          type="email" 
                          required
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-cyan-400 outline-none" 
                        />
                      </div>
                    </div>

                    <div className="text-xs font-mono text-zinc-300">
                      <label className="block mb-2 opacity-75">{t.contactSubject}</label>
                      <input 
                        type="text" 
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-cyan-400 outline-none" 
                      />
                    </div>

                    <div className="text-xs font-mono text-zinc-300">
                      <label className="block mb-2 opacity-75">{t.contactMsg} *</label>
                      <textarea 
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-cyan-400 outline-none resize-none leading-relaxed"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-4 bg-cyan-400 text-zinc-950 font-mono text-[11px] uppercase tracking-widest font-bold shadow-md hover:bg-white"
                    >
                      {t.contactSend}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

        </main>
      )}

      {/* FOOTER BAND */}
      <footer className="border-t border-zinc-900 py-16 mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-zinc-400">
          <div className="col-span-2 space-y-4">
            <h2 className="text-2xl font-light tracking-widest uppercase text-white">SAÚDEANTAR<span className="font-bold text-cyan-400">-IA</span></h2>
            <p className="text-xs leading-relaxed max-w-sm">
               {t.footerText}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-550 mb-4">REPOSITÓRIO M Memorial</h4>
            <ul className="space-y-2 text-xs font-mono uppercase">
              <li className="hover:text-cyan-300"><a href="#ops" onClick={() => setActiveTab('operations')}>Operações 38–44</a></li>
              <li className="hover:text-cyan-300"><a href="#pub" onClick={() => setActiveTab('publications')}>Arquivo Acadêmico</a></li>
              <li className="hover:text-cyan-300"><a href="#map" onClick={() => setActiveTab('map')}>Mapa Polar 3D</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-550 mb-4">COMPARTILHAMENTO</h4>
            <div className="flex gap-3 text-xs uppercase font-mono">
              <span className="hover:text-cyan-400 cursor-pointer" onClick={() => executeToastFeedback("Cópia de link consubstanciada")}>LINK</span>
              <span>•</span>
              <span className="hover:text-cyan-400 cursor-pointer" onClick={() => executeToastFeedback("Transmissão WhatsApp consolidada")}>WA</span>
              <span>•</span>
              <span className="hover:text-cyan-400 cursor-pointer" onClick={() => executeToastFeedback("X/Twitter post processado")}>X</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-zinc-900/60 font-mono text-[9px] text-zinc-550 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© 1982-2026 SaúdeAntar / MINISTÉRIO DA CIÊNCIA, TECNOLOGIA E INOVAÇÃO.</span>
          <span>{t.allRightsReserved}</span>
        </div>
      </footer>

      {/* VIMEO / STAFF PICKS DETAILED THEATER OVERLAY */}
      {selectedVideo && (
        <ProjectDetail 
          item={selectedVideo}
          language={language}
          onClose={() => setSelectedVideo(null)}
          allVideos={VIDEO_ITEMS}
          onSelectVideo={(v) => setSelectedVideo(v)}
          onShare={(title) => executeToastFeedback(`Consolidação de compartilhamento: "${title}"`)}
        />
      )}

      {/* PREMIUM LIGHTBOX PHOTO VIEWER OVERLAY */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 select-none"
          >
            {/* Header / Info bar */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-cyan-400 border border-cyan-800 bg-cyan-950/40 px-2.5 py-1 uppercase tracking-widest">
                  OP {combinedPhotos[activePhotoIndex].operation} • {combinedPhotos[activePhotoIndex].subcategory}
                </span>
                <span className="text-zinc-500 font-mono text-xs">
                  {activePhotoIndex + 1} / {combinedPhotos.length}
                </span>
              </div>
              <button 
                onClick={() => setActivePhotoIndex(null)}
                className="w-10 h-10 rounded-full border border-zinc-900/40 bg-zinc-950 hover:bg-zinc-900 hover:text-white text-zinc-400 flex items-center justify-center transition-all cursor-pointer shadow-lg outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle Container (Arrow - Images Stage - Arrow) */}
            <div className="relative flex-grow flex items-center justify-between gap-4 max-h-[75vh]">
              {/* Previous Arrow Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + combinedPhotos.length) % combinedPhotos.length : null));
                }}
                className="absolute left-2 md:left-4 z-10 w-12 h-12 rounded-full bg-zinc-950/60 border border-zinc-900 hover:bg-zinc-900 text-cyan-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xl outline-none"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Slide/Drag image viewport */}
              <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activePhotoIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragEnd={(event, info) => {
                      const swipeThreshold = 50;
                      if (info.offset.x < -swipeThreshold) {
                        setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % combinedPhotos.length : null));
                      } else if (info.offset.x > swipeThreshold) {
                        setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + combinedPhotos.length) % combinedPhotos.length : null));
                      }
                    }}
                    className="w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing p-2"
                  >
                    <img 
                      src={combinedPhotos[activePhotoIndex].imageUrl} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      className="max-h-[60vh] md:max-h-[68vh] max-w-full object-contain pointer-events-none select-none border border-zinc-900 shadow-2xl" 
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Arrow Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % combinedPhotos.length : null));
                }}
                className="absolute right-2 md:right-4 z-10 w-12 h-12 rounded-full bg-zinc-950/60 border border-zinc-900 hover:bg-zinc-900 text-cyan-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xl outline-none"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Descriptive Tray */}
            <div className="bg-zinc-950/80 border border-zinc-900/60 p-4 md:p-6 mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-3xl">
                <h3 className="text-xl font-light text-white leading-tight">
                  {combinedPhotos[activePhotoIndex].title[language]}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-1">
                  {combinedPhotos[activePhotoIndex].description[language]}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end text-[10px] font-mono whitespace-nowrap gap-1">
                <span className="text-cyan-400">MEMBRO: {combinedPhotos[activePhotoIndex].photographer.toUpperCase()}</span>
                <span className="text-zinc-500">LOCAL: {combinedPhotos[activePhotoIndex].location[language].toUpperCase()} ({combinedPhotos[activePhotoIndex].year})</span>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  {combinedPhotos[activePhotoIndex].tags.map(tag => (
                    <span key={tag} className="text-[9px] bg-zinc-900 text-cyan-300 border border-zinc-800 px-2 py-0.5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
