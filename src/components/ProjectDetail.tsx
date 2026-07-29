import React, { useEffect, useState } from 'react';
import { X, Play, FileText, Calendar, Compass, User, Clock, Share2, Check, Tv } from 'lucide-react';
import { VideoItem, Language } from '../types';
import { TRANSLATIONS } from '../data';

interface ProjectDetailProps {
  item: VideoItem;
  language: Language;
  onClose: () => void;
  allVideos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
  onShare: (title: string) => void;
  theme?: string;
}

export function ProjectDetail({
  item,
  language,
  onClose,
  allVideos,
  onSelectVideo,
  onShare,
  theme = 'dark',
}: ProjectDetailProps) {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCinemaMode, setIsCinemaMode] = useState(false);

  useEffect(() => {
    setIsPlaying(true);
  }, [item]);

  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  // Suggest next video from the same operation or any other video
  const relatedVideos = allVideos.filter(v => v.id !== item.id).slice(0, 3);

  // Trigger copy mechanism
  const handleCopy = () => {
    navigator.clipboard.writeText(`https://saude-antar.vercel.app/?video=${item.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShare(item.title[language]);
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${isDark ? 'bg-black/95' : 'bg-stone-900/65'} backdrop-blur-2xl flex items-center justify-center p-0 md:p-6 lg:p-12 transition-all duration-500`}>
      <div 
        className={`w-full max-w-7xl ${isDark ? 'bg-zinc-950 border-zinc-800/80 text-zinc-100' : 'bg-white border-stone-200 text-stone-800 shadow-2xl'} border flex flex-col min-h-screen md:min-h-0 md:h-[90vh] overflow-y-auto`}
        id="project-detail-panel"
      >
        {/* Header bar / Top Controls */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-zinc-900 bg-zinc-950/90' : 'border-stone-100 bg-white/95'} sticky top-0 backdrop-blur z-20`}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-400 bg-cyan-950/50 px-2 py-1 select-none border border-cyan-800/40">
              {item.subcategory}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-2 hover:text-cyan-400 transition-colors text-[10px] uppercase font-mono tracking-wider ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-200' : 'bg-stone-100 border-stone-200 text-stone-750'} border px-3 py-1.5`}
              title="Save permalink"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? "COPIED" : "SHARE Link"}
            </button>
            <button 
              onClick={onClose}
              className={`p-1 px-3 hover:text-red-500 transition-colors font-mono text-[11px] uppercase tracking-wider ${isDark ? 'text-zinc-450' : 'text-stone-550'}`}
              id="close-detail-modal"
            >
              <X className="w-4 h-4 inline mr-1" /> {t.closeBtn}
            </button>
          </div>
        </div>

        {/* Content body layout */}
        <div className="flex-1 overflow-y-auto bg-zinc-950 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {/* Top row: Video (Left) and Synopsis (Right) */}
            <div className={`grid grid-cols-1 gap-8 items-start ${isCinemaMode ? '' : 'lg:grid-cols-12'}`}>
              {/* Left Column: contains strictly 16:9 Aspect Video Player */}
              <div className={`${isCinemaMode ? 'lg:col-span-12' : 'lg:col-span-8'} flex flex-col gap-3 w-full`}>
                <div className="w-full aspect-video bg-zinc-900 border border-zinc-900/60 flex flex-col justify-center relative group overflow-hidden rounded-xs shadow-2xl">
                  {isPlaying ? (
                    <div className="w-full h-full">
                      <iframe
                        src={item.youtubeId.includes('?') ? `https://www.youtube.com/embed/${item.youtubeId}&autoplay=1` : `https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
                        title={item.title[language]}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="relative w-full h-full overflow-hidden">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title[language]} 
                        className="w-full h-full object-cover grayscale brightness-50 contrast-125 scale-102 group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />
                      <div className="absolute inset-0 flex flex-col justify-center items-center">
                        <button 
                          onClick={() => setIsPlaying(true)}
                          className="w-20 h-20 bg-cyan-400 text-zinc-950 hover:bg-white transition-all duration-300 shadow-2xl shadow-cyan-400/20 flex items-center justify-center scale-95 hover:scale-105 rounded-none cursor-pointer"
                          id="play-featured-doc"
                        >
                          <Play className="w-8 h-8 fill-current translate-x-0.5" />
                        </button>
                        <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300 px-3 text-center">
                          CLICK TO STREAM AUDIOVISUAL ARCHIVE
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-6 font-mono text-zinc-400 text-xs bg-zinc-950/80 px-2 py-1 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" /> {item.duration}
                      </div>
                    </div>
                  )}
                </div>

                {/* Cinema Mode Button underneath */}
                <div className="flex justify-between items-center bg-zinc-900/40 p-2.5 border border-zinc-900/60 rounded-xs">
                  <button 
                    onClick={() => setIsCinemaMode(!isCinemaMode)}
                    className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-cyan-400 hover:text-white hover:bg-cyan-950/50 border border-cyan-500/40 px-3.5 py-1.5 transition-all cursor-pointer"
                    id="toggle-cinema-mode"
                  >
                    <Tv className="w-3.5 h-3.5" />
                    {isCinemaMode 
                      ? (language === 'BR' ? 'Sair do Modo Cinema' : language === 'ES' ? 'Salir del Modo Cine' : 'Exit Cinema Mode')
                      : (language === 'BR' ? 'Modo Cinema' : language === 'ES' ? 'Modo Cine' : 'Cinema Mode')
                    }
                  </button>
                  <span className="text-[9px] font-mono text-zinc-500 tracking-wider">
                    {isCinemaMode ? 'PREMIUM CINEMATIC STREAM ACTIVE' : 'STANDARD POLAR MONITOR'}
                  </span>
                </div>
              </div>

              {/* Right Column: Synopsis / Metadata Description */}
              {!isCinemaMode && (
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <span className={`text-[10px] font-mono tracking-[0.3em] uppercase ${isDark ? 'text-zinc-500' : 'text-stone-400'} block mb-2`}>
                      {item.isFilm ? t.moviesTitle : t.scientificProjects}
                    </span>
                    <h2 className={`text-xl md:text-2xl font-light tracking-tight mb-4 border-b ${isDark ? 'border-zinc-900 text-zinc-100' : 'border-stone-200 text-stone-900'} pb-3`}>
                      {item.title[language]}
                    </h2>
                    
                    {/* Description content */}
                    <p className={`${isDark ? 'text-zinc-300' : 'text-stone-600'} text-xs md:text-sm font-light leading-relaxed mb-4 whitespace-pre-line max-h-[180px] lg:max-h-[220px] overflow-y-auto pr-1`}>
                      {item.description[language]}
                    </p>

                    {/* Technical details list */}
                    <div className={`space-y-3 font-mono text-[10px] border-y ${isDark ? 'border-zinc-900' : 'border-stone-200'} py-3.5 mb-4`}>
                      <div className="flex justify-between items-center">
                        <span className={`${isDark ? 'text-zinc-500' : 'text-stone-400'} uppercase tracking-widest flex items-center gap-2`}>
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" /> YEAR OF FIELDWORK
                        </span>
                        <span className={`${isDark ? 'text-zinc-300' : 'text-stone-700'} font-bold`}>{item.year}</span>
                      </div>
                      {item.director && (
                        <div className="flex justify-between items-center border-t border-zinc-900/40 pt-2.5">
                          <span className={`${isDark ? 'text-zinc-500' : 'text-stone-400'} uppercase tracking-widest flex items-center gap-2`}>
                            <User className="w-3.5 h-3.5 text-cyan-400" /> DIRECTOR / PRODUCER
                          </span>
                          <span className={`${isDark ? 'text-zinc-300' : 'text-stone-750'} truncate max-w-[150px]`} title={item.director}>{item.director}</span>
                        </div>
                      )}
                    </div>

                    {/* Tag pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className={`text-[8.5px] font-mono uppercase border px-2 py-0.5 transition-colors select-none ${isDark ? 'bg-zinc-900 text-zinc-400 border-zinc-800' : 'bg-stone-100 text-stone-600 border-stone-200'}`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Row / Section: Horizontal Recommendations */}
            {!isCinemaMode && (
              <div className={`border-t ${isDark ? 'border-zinc-900' : 'border-stone-200'} pt-6`}>
                <h4 className={`text-[10px] font-mono uppercase tracking-[0.25em] ${isDark ? 'text-zinc-450' : 'text-stone-550'} mb-4 pb-2 border-b ${isDark ? 'border-zinc-900' : 'border-stone-100'}`}>
                  {t.relatedDocs}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedVideos.map((rev) => (
                    <div 
                      key={rev.id}
                      onClick={() => {
                        onSelectVideo(rev);
                        setIsPlaying(true);
                      }}
                      className={`group flex flex-col gap-3 border border-zinc-900 bg-zinc-950/20 p-3 cursor-pointer transition-all ${isDark ? 'hover:bg-zinc-900/60 hover:border-cyan-500/30' : 'hover:bg-stone-200/50 hover:border-stone-300'}`}
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-black rounded-xs">
                        <img 
                          src={rev.thumbnail} 
                          className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-300" 
                          alt="" 
                        />
                        <div className="absolute bottom-2 right-2 bg-black/85 px-1.5 py-0.5 text-[9px] font-mono text-zinc-400 rounded-sm">
                          {rev.duration}
                        </div>
                      </div>
                      <div className="overflow-hidden flex flex-col justify-between flex-grow">
                        <div>
                          <div className={`font-medium text-xs truncate ${isDark ? 'text-zinc-200' : 'text-stone-850'} group-hover:text-cyan-400 transition-colors`}>
                            {rev.title[language]}
                          </div>
                          <div className={`font-mono text-[9px] mt-1.5 uppercase ${isDark ? 'text-zinc-500' : 'text-stone-400'} flex items-center justify-between`}>
                            <span>{rev.subcategory || item.subcategory}</span>
                            <span>{rev.year}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
