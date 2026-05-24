import React, { useState, useEffect } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import { 
  MapPin, Eye, Compass, Image, Video, FileText, ChevronLeft, ChevronRight, X, Sparkles, AlertTriangle
} from 'lucide-react';
import { MapMarker, Language, GalleryItem } from '../types';
import { TRANSLATIONS, MAP_MARKERS, GALLERY_ITEMS, VIDEO_ITEMS, PUBLICATION_ITEMS } from '../data';

interface MapSectionProps {
  language: Language;
  onSelectPhoto: (photoId: string) => void;
  onSelectVideo: (videoId: string) => void;
  onSelectPublication: (pubId: string) => void;
  theme: string;
  allPhotos?: GalleryItem[];
}

// Custom Map Style for Dark Theme
const mapStyleDark = [
  { "elementType": "geometry", "stylers": [{ "color": "#0d0d0d" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#0d0d0d" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{ "color": "#4a4a4a" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#030814" }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#2c3e50" }]
  }
];

export function MapSection({
  language,
  onSelectPhoto,
  onSelectVideo,
  onSelectPublication,
  theme,
  allPhotos = GALLERY_ITEMS
}: MapSectionProps) {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  
  // Lightbox State
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const API_KEY =
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
    (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
    '';

  const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY !== 'MY_GOOGLE_MAPS_PLATFORM_KEY';

  const t = TRANSLATIONS[language];

  // Open Lightbox for a marker's associated images starting at selected image
  const triggerLightbox = (photos: string[], startIndex: number) => {
    // Resolve IDs to actual URLs or items
    const urls = photos.map(id => {
      const gItem = allPhotos.find(item => item.id === id);
      return gItem ? gItem.imageUrl : "https://images.unsplash.com/photo-1516055619834-586f8c75d1de?q=80&w=1200";
    });
    setLightboxImages(urls);
    setLightboxIndex(startIndex);
    setIsLightboxOpen(true);
  };

  const nextSlide = () => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const prevSlide = () => {
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, lightboxImages]);

  // Handle marker selection / center
  const selectActiveSpot = (spot: MapMarker) => {
    setSelectedMarker(spot);
  };

  return (
    <div className="relative w-full h-[650px] bg-black overflow-hidden border border-zinc-800/80">
      
      {/* Absolute Header with Status Indicators */}
      <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-4 py-2 border border-zinc-800 flex items-center gap-3">
        <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="font-mono text-[10px] tracking-widest text-zinc-300 uppercase">
          {hasValidKey ? "LIVE GPS CORRELATION" : t.unsupportedMap}
        </span>
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
      </div>

      {hasValidKey ? (
        // GOOGLE MAPS IMPLEMENTATION
        <APIProvider apiKey={API_KEY} version="weekly">
          <GoogleMap
            defaultCenter={{ lat: -62.3, lng: -59.5 }}
            defaultZoom={7}
            mapId="saudeantar_dark_map"
            options={{
              styles: theme === 'dark' ? mapStyleDark : [],
              disableDefaultUI: false,
              mapTypeControl: false,
              streetViewControl: false
            }}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
          >
            {MAP_MARKERS.map((spot) => (
              <AdvancedMarker
                key={spot.id}
                position={{ lat: spot.lat, lng: spot.lng }}
                title={spot.title[language]}
                onClick={() => selectActiveSpot(spot)}
                gmpClickable={true}
              >
                <div className="cursor-pointer bg-zinc-950/90 text-cyan-400 border border-cyan-400/60 p-2 rounded-none hover:bg-cyan-450 hover:text-black transition-all flex items-center justify-center shadow-lg">
                  <MapPin className="w-4 h-4" />
                </div>
              </AdvancedMarker>
            ))}

            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="p-3 text-zinc-950 font-sans max-w-[320px]">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 mb-1">
                    {selectedMarker.type.toUpperCase()} • LAT: {selectedMarker.lat}° S
                  </div>
                  <h3 className="font-bold text-sm mb-2">{selectedMarker.title[language]}</h3>
                  
                  {/* Photo mini-gallery with visual trigger */}
                  <div className="mt-2 border-t border-zinc-200 pt-3">
                    <p className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-600 mb-2">
                      Assets vinculados ({selectedMarker.associatedPhotos.length})
                    </p>
                    <div className="grid grid-cols-3 gap-1">
                      {selectedMarker.associatedPhotos.map((id, index) => {
                        const item = allPhotos.find(g => g.id === id);
                        if (!item) return null;
                        return (
                          <div 
                            key={id}
                            onClick={() => triggerLightbox(selectedMarker.associatedPhotos, index)}
                            className="aspect-square bg-zinc-100 overflow-hidden relative group cursor-pointer border border-zinc-200"
                          >
                            <img 
                              src={item.imageUrl} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" 
                              alt="" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Eye className="w-3" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Publications or links */}
                  <div className="mt-3 space-y-1">
                    {selectedMarker.associatedVideos.length > 0 && (
                      <div className="text-[10.5px] text-zinc-600 flex items-center gap-1.5 font-mono">
                        <Video className="w-3 h-3 text-cyan-600" /> video clips
                      </div>
                    )}
                    {selectedMarker.associatedPublications.length > 0 && (
                      <div className="text-[10.5px] text-zinc-600 flex items-center gap-1.5 font-mono">
                        <FileText className="w-3 h-3 text-indigo-600" /> scientific reports
                      </div>
                    )}
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </APIProvider>
      ) : (
        // EMBEDDED HIGH-FIDELITY VECTOR MAP OF ANTARCTICA
        <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 overflow-hidden select-none">
          {/* Subtle abstract coordinate gridlines background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
            <div className="w-full h-full border-t border-b border-zinc-800/50 absolute top-1/4" />
            <div className="w-full h-full border-t border-b border-zinc-800/50 absolute top-2/3" />
            <div className="w-full h-1/2 border-l border-r border-zinc-800/50 absolute left-1/3" />
            <div className="w-full h-1/2 border-l border-r border-zinc-800/50 absolute left-2/3" />
            <div className="absolute top-[48%] left-[48%] w-12 h-12 rounded-full border border-zinc-800 animate-pulse" />
          </div>

          {/* Interactive Antarctica vector shape overlay mock */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-96 h-96 rounded-full bg-cyan-700/5 blur-3xl" />
            <div className="w-[450px] aspect-square border border-dashed border-zinc-800/40 rounded-full flex items-center justify-center">
              <div className="w-[320px] aspect-square border border-dashed border-zinc-800/40 rounded-full flex items-center justify-center">
                <div className="text-zinc-800 text-[10px] font-mono tracking-[0.25em] uppercase">60° SOUTH POLAR LINE</div>
              </div>
            </div>
          </div>

          {/* Actual Active Hotspots mapped spatially */}
          <div className="absolute inset-0 z-10">
            {/* m1 - EACF */}
            <div 
              className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              onClick={() => selectActiveSpot(MAP_MARKERS[0])}
            >
              <div className={`w-3.5 h-3.5 rounded-none flex items-center justify-center transition-all ${selectedMarker?.id === 'm1' ? 'bg-cyan-400 scale-125' : 'bg-cyan-950 border border-cyan-400 hover:bg-cyan-500'}`}>
                <div className="w-1.5 h-1.5 bg-white rounded-none" />
              </div>
              <span className="absolute left-6 top-1/2 -translate-y-1/2 w-48 bg-black/90 text-zinc-300 font-mono text-[9px] uppercase tracking-wider px-2 py-1 border border-zinc-850 opacity-0 group-hover:opacity-100 transition-opacity">
                EACF BASE
              </span>
            </div>

            {/* m2 - NPolar Maximiano */}
            <div 
              className="absolute top-[32%] left-[44%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              onClick={() => selectActiveSpot(MAP_MARKERS[1])}
            >
              <div className={`w-3.5 h-3.5 rounded-none flex items-center justify-center transition-all ${selectedMarker?.id === 'm2' ? 'bg-indigo-400 scale-125' : 'bg-zinc-900 border border-indigo-400 hover:bg-indigo-400'}`}>
                <Compass className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="absolute left-6 top-1/2 -translate-y-1/2 w-48 bg-black/90 text-zinc-300 font-mono text-[9px] uppercase tracking-wider px-2 py-1 border border-zinc-850 opacity-0 group-hover:opacity-100 transition-opacity">
                NPolar Vessel
              </span>
            </div>

            {/* m3 - Byers */}
            <div 
              className="absolute top-[58%] left-[36%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              onClick={() => selectActiveSpot(MAP_MARKERS[2])}
            >
              <div className={`w-3.5 h-3.5 rounded-none flex items-center justify-center transition-all ${selectedMarker?.id === 'm3' ? 'bg-emerald-400 scale-125' : 'bg-zinc-900 border border-emerald-400 hover:bg-emerald-400'}`}>
                <MapPin className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="absolute left-6 top-1/2 -translate-y-1/2 w-48 bg-black/90 text-zinc-300 font-mono text-[9px] uppercase tracking-wider px-2 py-1 border border-zinc-850 opacity-0 group-hover:opacity-100 transition-opacity">
                Byers Field Camp
              </span>
            </div>

            {/* m4 - Deception Island */}
            <div 
              className="absolute top-[68%] left-[55%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              onClick={() => selectActiveSpot(MAP_MARKERS[3])}
            >
              <div className={`w-3.5 h-3.5 rounded-none flex items-center justify-center transition-all ${selectedMarker?.id === 'm4' ? 'bg-rose-400 scale-125' : 'bg-zinc-900 border border-rose-450 hover:bg-rose-400'}`}>
                <div className="w-1.5 h-1.5 bg-rose-400" />
              </div>
              <span className="absolute left-6 top-1/2 -translate-y-1/2 w-48 bg-black/90 text-zinc-300 font-mono text-[9px] uppercase tracking-wider px-2 py-1 border border-zinc-850 opacity-0 group-hover:opacity-100 transition-opacity">
                Deception Island
              </span>
            </div>

            {/* m5 - Cape Shirreff OP 44 */}
            <div 
              className="absolute top-[51%] left-[41%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              onClick={() => selectActiveSpot(MAP_MARKERS[4])}
            >
              <div className={`w-3.5 h-3.5 rounded-none flex items-center justify-center transition-all ${selectedMarker?.id === 'm5' ? 'bg-[#38bdf8] scale-125' : 'bg-zinc-900 border border-[#38bdf8] hover:bg-[#38bdf8]'}`}>
                <MapPin className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="absolute left-6 top-1/2 -translate-y-1/2 w-48 bg-black/90 text-zinc-300 font-mono text-[9px] uppercase tracking-wider px-2 py-1 border border-zinc-850 opacity-0 group-hover:opacity-100 transition-opacity">
                Cape Shirreff OP 44
              </span>
            </div>
          </div>

          {/* Spatial Metadata and coordinate stats */}
          <div className="relative z-10 flex flex-col justify-between h-full pointer-events-none">
            {/* Top row */}
            <div className="flex justify-between items-start">
              <div />
              <div className="text-right text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                SOUTH SHETLAND SECTOR <br />
                BOUNDS: 62°S / 58°W
              </div>
            </div>

            {/* Centered details if selected */}
            <div className="pointer-events-auto flex justify-center items-center h-2/3">
              {selectedMarker ? (
                <div className="w-full max-w-lg bg-black/90 border border-zinc-800/90 text-zinc-100 p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-zinc-850 pb-3 mb-4">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-900 px-2 py-0.5">
                        OPERATIONAL SPOT
                      </span>
                      <h4 className="text-xl font-light text-white mt-1.5">{selectedMarker.title[language]}</h4>
                    </div>
                    <button 
                      onClick={() => setSelectedMarker(null)}
                      className="text-zinc-500 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="font-mono text-[10px] text-zinc-400 mb-4 uppercase tracking-normal">
                     COORDS: {Math.abs(selectedMarker.lat)}°S, {Math.abs(selectedMarker.lng)}°W • OP {selectedMarker.operation}
                  </p>

                  {/* Thumbnail micro gallery */}
                  <div className="mb-4">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                       GALLERY LEDGER ({selectedMarker.associatedPhotos.length})
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {selectedMarker.associatedPhotos.map((id, index) => {
                        const item = allPhotos.find(g => g.id === id);
                        if (!item) return null;
                        return (
                          <div 
                            key={id}
                            onClick={() => triggerLightbox(selectedMarker.associatedPhotos, index)}
                            className="aspect-square bg-zinc-900 overflow-hidden relative cursor-pointer group border border-zinc-800"
                          >
                            <img 
                              src={item.imageUrl} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                              alt="" 
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Eye className="w-4 h-4 text-cyan-300" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Connected media indicators */}
                  <div className="flex gap-4 border-t border-zinc-900 pt-4">
                    {selectedMarker.associatedVideos.length > 0 && (
                      <button 
                        onClick={() => onSelectVideo(selectedMarker.associatedVideos[0])}
                        className="text-[10px] font-mono uppercase text-zinc-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                      >
                        <Video className="w-3.5 h-3.5 text-cyan-400" /> {selectedMarker.associatedVideos.length} Movies
                      </button>
                    )}
                    {selectedMarker.associatedPublications.length > 0 && (
                      <button 
                        onClick={() => onSelectPublication(selectedMarker.associatedPublications[0])}
                        className="text-[10px] font-mono uppercase text-zinc-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5 text-indigo-400" /> {selectedMarker.associatedPublications.length} studies
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center font-mono text-xs text-zinc-500 py-12 max-w-sm pointer-events-none">
                  [ FILTRO CARTOGRÁFICO INTERATIVO ] <br />
                  <span className="text-[10px] uppercase tracking-wider block mt-2 font-light">
                    Selecione um marcador espacial no mapa para explorar o acervo humano e acadêmico associado.
                  </span>
                </div>
              )}
            </div>

            {/* Bottom row */}
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-mono tracking-widest text-zinc-650 uppercase">
                HEALTHANTAR-IA PROJECT LEDGER
              </span>
              <span className="text-[10px] font-mono text-zinc-500 tracking-widest">
                EPSG:4326 AUTOLOCATOR
              </span>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX OVERLAY */}
      {isLightboxOpen && lightboxImages.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/98 flex flex-col justify-between p-4 md:p-8 select-none border border-zinc-900 animate-fade-in">
          {/* Top light bar */}
          <div className="flex justify-between items-center text-zinc-400 z-10 bg-black/60 backdrop-blur px-6 py-4 border border-zinc-900">
            <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase">
              ANTARCTIC HIGH RESOLUTION VIEWPORT
            </span>
            <div className="flex items-center gap-6">
              <span className="font-mono text-xs">
                IMAGE {lightboxIndex + 1} OF {lightboxImages.length}
              </span>
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="text-zinc-400 hover:text-white cursor-pointer px-2 py-1 border border-zinc-800 bg-zinc-950 font-mono text-xs uppercase"
              >
                <X className="w-4 h-4 inline mr-1" /> CLOSE
              </button>
            </div>
          </div>

          {/* Main viewport with arrow keys */}
          <div className="flex-1 flex items-center justify-between relative group py-8 max-w-7xl mx-auto w-full">
            <button 
              onClick={prevSlide}
              className="absolute left-4 z-20 w-12 h-12 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="w-full h-full flex items-center justify-center relative overflow-hidden px-12">
              <img 
                src={lightboxImages[lightboxIndex]} 
                className="max-h-[75vh] max-w-full object-contain brightness-95 scale-95 md:scale-100 transition-all duration-700 shadow-2xl" 
                alt="Antarctic Fieldwork" 
              />
            </div>

            <button 
              onClick={nextSlide}
              className="absolute right-4 z-20 w-12 h-12 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Footer informational band */}
          <div className="text-center font-mono text-[10px] text-zinc-500 uppercase tracking-widest z-10 py-2">
            Use Left / Right arrow keys to navigate the collection. HEALTHANTAR-IA SaúdeAntar ACQUIRED.
          </div>
        </div>
      )}

    </div>
  );
}
