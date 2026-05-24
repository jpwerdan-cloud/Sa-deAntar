import React, { useEffect, useState } from 'react';
import { X, Play, FileText, Calendar, Compass, User, Clock, Share2, Check } from 'lucide-react';
import { VideoItem, Language } from '../types';
import { TRANSLATIONS } from '../data';

interface ProjectDetailProps {
  item: VideoItem;
  language: Language;
  onClose: () => void;
  allVideos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
  onShare: (title: string) => void;
}

export function ProjectDetail({
  item,
  language,
  onClose,
  allVideos,
  onSelectVideo,
  onShare,
}: ProjectDetailProps) {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);

  const t = TRANSLATIONS[language];

  // Suggest next video from the same operation or any other video
  const relatedVideos = allVideos.filter(v => v.id !== item.id).slice(0, 3);

  // Trigger copy mechanism
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + `?video=${item.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShare(item.title[language]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl flex items-center justify-center p-0 md:p-6 lg:p-12 transition-all duration-500">
      <div 
        className="w-full max-w-7xl bg-zinc-950 border border-zinc-800/80 text-zinc-100 flex flex-col min-h-screen md:min-h-0 md:h-[90vh] overflow-y-auto"
        id="project-detail-panel"
      >
        {/* Header bar / Top Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 sticky top-0 bg-zinc-950/90 backdrop-blur z-20">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-400 bg-cyan-950/50 px-2 py-1 select-none border border-cyan-800/40">
              {item.subcategory}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors text-[10px] uppercase font-mono tracking-wider bg-zinc-900 border border-zinc-800 px-3 py-1.5"
              title="Save permalink"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? "COPIED" : "SHARE Link"}
            </button>
            <button 
              onClick={onClose}
              className="p-1 px-3 hover:text-red-400 transition-colors font-mono text-[11px] uppercase tracking-wider"
              id="close-detail-modal"
            >
              <X className="w-4 h-4 inline mr-1" /> {t.closeBtn}
            </button>
          </div>
        </div>

        {/* Content body split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Main video player slot */}
          <div className="lg:col-span-8 bg-black flex flex-col justify-center relative group min-h-[300px] md:min-h-[450px]">
            {isPlaying ? (
              <div className="w-full h-full aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
                  title={item.title[language]}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="relative w-full h-full aspect-video overflow-hidden">
                <img 
                  src={item.thumbnail} 
                  alt={item.title[language]} 
                  className="w-full h-full object-cover grayscale brightness-50 contrast-125 scale-105 group-hover:scale-110 transition-transform duration-1000"
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
                  <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                    CLICK TO STREAM AUDIOVISUAL ARCHIVE
                  </span>
                </div>
                <div className="absolute bottom-4 left-6 font-mono text-zinc-400 text-xs bg-zinc-950/80 px-2 py-1 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> {item.duration}
                </div>
              </div>
            )}
          </div>

          {/* Lateral Metadata Curation */}
          <div className="lg:col-span-4 p-6 md:p-8 bg-zinc-950 border-t lg:border-t-0 lg:border-l border-zinc-900 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 block mb-2">
                {item.isFilm ? t.moviesTitle : t.scientificProjects}
              </span>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4 text-zinc-100 border-b border-zinc-900 pb-4">
                {item.title[language]}
              </h2>
              <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                {item.description[language]}
              </p>

              {/* Technical index list */}
              <div className="space-y-4 font-mono text-[11px] border-y border-zinc-900 py-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" /> YEAR OF FIELDWORK
                  </span>
                  <span className="text-zinc-300">{item.year}</span>
                </div>
              </div>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="text-[9px] font-mono uppercase bg-zinc-900 text-zinc-400 hover:text-cyan-300 border border-zinc-800/70 px-2 py-0.5 transition-colors select-none"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Next Recommendations */}
            <div className="border-t border-zinc-900 pt-6">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-3">
                {t.relatedDocs}
              </h4>
              <div className="space-y-3">
                {relatedVideos.map((rev) => (
                  <div 
                    key={rev.id}
                    onClick={() => {
                      onSelectVideo(rev);
                      setIsPlaying(false);
                    }}
                    className="flex gap-3 hover:bg-zinc-900/60 p-2 border border-transparent hover:border-zinc-800/40 cursor-pointer transition-all"
                  >
                    <img 
                      src={rev.thumbnail} 
                      className="w-16 aspect-video object-cover grayscale brightness-75 hover:grayscale-0" 
                      alt="" 
                    />
                    <div className="overflow-hidden">
                      <div className="font-medium text-xs truncate text-zinc-200">
                        {rev.title[language]}
                      </div>
                      <div className="font-mono text-[9px] text-zinc-500 mt-1 uppercase">
                        {rev.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
