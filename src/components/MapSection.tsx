import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import { 
  MapPin, Eye, Compass, Image as ImageIcon, Video, FileText, ChevronLeft, ChevronRight, X, Sparkles, AlertTriangle, Play, Activity, Wind, CloudSnow, Sun, ShieldCheck, Globe, Thermometer, UserCheck
} from 'lucide-react';
import { MapMarker, Language, GalleryItem } from '../types';
import { TRANSLATIONS, MAP_MARKERS, GALLERY_ITEMS, VIDEO_ITEMS, PUBLICATION_ITEMS } from '../data';
import { fetchImagesFromSupabaseBucketRecursive } from '../supabase';
// @ts-ignore
import polarReliefMap from '../assets/images/antarctica_polar_relief_1780608622317.png';

interface MapSectionProps {
  language: Language;
  onSelectPhoto: (photoId: string) => void;
  onSelectVideo: (videoId: string) => void;
  onSelectPublication: (pubId: string) => void;
  theme: string;
  allPhotos?: GalleryItem[];
  onSelectOperations?: () => void;
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

export const LOCAL_MEDIA_RECORDS: Record<string, {
  photos: string[];
  videos: { title: string; length: string; youtubeId: string; thumbnail: string }[];
  facts: { temp: string; wind: string; isolate: string; population: string; status: string };
  desc: { BR: string; EN: string; ES: string };
}> = {
  m1: {
    photos: [
      "https://images.unsplash.com/photo-1548100512-16d46f5a8fc5?q=80&w=600", 
      "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?q=80&w=600" 
    ],
    videos: [
      { 
        title: "Primeira Transmissão de Telessaúde da Antártica ao Brasil", 
        length: "12:45", 
        youtubeId: "_aIdn3IhijU",
        thumbnail: "https://img.youtube.com/vi/_aIdn3IhijU/hqdefault.jpg"
      }
    ],
    facts: {
      temp: "-11.8°C",
      wind: "42 km/h ESE",
      isolate: "Extremo / Confinamento Ativo",
      population: "64 Cientistas e Militares",
      status: "Operações Ativas - SaúdeAntar-ia Lincado"
    },
    desc: {
      BR: "Estação científica permanente do Programa Antártico Brasileiro, localizada na Baía do Almirante, Ilha Rei George. Inaugurada em sua versão moderna e futurista em 2020.",
      EN: "Brazil's permanent research base located in Admiralty Bay, King George Island. A highly modular, state-of-the-art facility rebuilt in 2020.",
      ES: "Estación científica permanente del Programa Antártico Brasileño, ubicada en la Bahía del Almirante. Un hito de arquitectura polar moderna."
    }
  },
  m2: {
    photos: [
      "https://images.unsplash.com/photo-1516055619834-586f8c75d1de?q=80&w=600", 
      "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=600" 
    ],
    videos: [
      { 
        title: "Rotina a Bordo do Navio Polar Almirante Maximiano", 
        length: "08:15", 
        youtubeId: "L2HRu84c9g8",
        thumbnail: "https://img.youtube.com/vi/L2HRu84c9g8/hqdefault.jpg"
      }
    ],
    facts: {
      temp: "-2.1°C to -4.1°C",
      wind: "58 km/h NNW",
      isolate: "Moderado / Mar Revolto Drake",
      population: "106 Tripulantes e Pesquisadores",
      status: "Navegação em Curso - Drake Passage"
    },
    desc: {
      BR: "Navio Oceanográfico conhecido carinhosamente como o 'Tio Max'. Equipado com laboratórios avançados de oceanografia física e biologia polar.",
      EN: "Oceanographic research vessel operated by the Brazilian Navy, cruising through the Drake Passage and Bransfield Strait.",
      ES: "Buque oceanográfico operado por la Armada de Brasil, equipado con laboratorios polares de última generación."
    }
  },
  m3: {
    photos: [
      "https://images.unsplash.com/photo-1504221507732-5246c245949b?q=80&w=600", 
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=600" 
    ],
    videos: [
      { 
        title: "Vida no Acampamento de Byers e Glaciologia Extrema", 
        length: "15:20", 
        youtubeId: "L2HRu84c9g8",
        thumbnail: "https://img.youtube.com/vi/L2HRu84c9g8/hqdefault.jpg"
      }
    ],
    facts: {
      temp: "-8.4°C",
      wind: "65 km/h W",
      isolate: "Extremo / Sem Abrigo Estruturado",
      population: "8 Cientistas em Barracas",
      status: "Campanha de Campo Encerrada"
    },
    desc: {
      BR: "Península Byers é uma Área Antártica Especialmente Protegida. Acampamento geológico e paleoclimático temporário do SaúdeAntar sob vento extremo.",
      EN: "Byers Peninsula is an Antarctic Specially Protected Area. Hosted remote paleoclimatic and soil micro-biology expeditions under tents.",
      ES: "Área Antártica Especialmente Protegida. Sitio de muestreo geológico y paleoclimático bajo condiciones de viento extremo."
    }
  },
  m4: {
    photos: [
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=600", 
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600" 
    ],
    videos: [
      { 
        title: "Expedição Histórica na Baía de Foster - Ilha Decepção", 
        length: "06:40", 
        youtubeId: "L2HRu84c9g8",
        thumbnail: "https://img.youtube.com/vi/L2HRu84c9g8/hqdefault.jpg"
      }
    ],
    facts: {
      temp: "0°C nas Fontes Termais",
      wind: "28 km/h S",
      isolate: "Extremo / Cratera Ativa de Vulcão",
      population: "Apenas Fauna Selvagem e Coletas Clínicas Rápidas",
      status: "Monitoramento Ativo de Gases Vulcânicos"
    },
    desc: {
      BR: "Um vulcão ativo inundado pelo mar. A Baía de Foster oferece águas aquecidas por fontes termais em contraste chocante com as geleiras circundantes.",
      EN: "An active volcano caldera flooded by the sea. Foster Bay contains thermal springs contrasting with massive active glaciers.",
      ES: "Un volcán activo con caldera inundada por el mar. Bahía de Foster alberga aguas termales de alto contraste con glaciares polares."
    }
  },
  m5: {
    photos: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600", 
      "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=600" 
    ],
    videos: [
      { 
        title: "Biologia e Monitoramento de Predadores no Cabo Shirreff", 
        length: "09:30", 
        youtubeId: "L2HRu84c9g8",
        thumbnail: "https://img.youtube.com/vi/L2HRu84c9g8/hqdefault.jpg"
      }
    ],
    facts: {
      temp: "-6.2°C",
      wind: "50 km/h WNW",
      isolate: "Sensorial Extremo / Isolamento Total",
      population: "6 Cientistas de Campo",
      status: "Campanha Concluída com Sucesso"
    },
    desc: {
      BR: "Acampamento de ecologia e monitoramento populacional de aves e pinípedes na costa norte da Ilha Livingston. Foco de pesquisas biológicas de ponta.",
      EN: "Field camp focused on marine predators biology, penguin and seal counting, on the northern coast of Livingston Island.",
      ES: "Campamento de biología marina y monitoreo de depredadores tope en la costa norte de la Isla Livingston."
    }
  },
  m6: {
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/7/7b/Amundsen-scott-station-elevated-building-all-year-2007.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/South_pole_station_aerial_view.jpg"
    ],
    videos: [
      { 
        title: "Amundsen-Scott: Sobrevivendo na Estação mais Isolada da Terra", 
        length: "22:15", 
        youtubeId: "gQ3_gZ3ZS_4",
        thumbnail: "https://img.youtube.com/vi/gQ3_gZ3ZS_4/hqdefault.jpg"
      }
    ],
    facts: {
      temp: "-58.4°C",
      wind: "22 km/h S",
      isolate: "Isolamento Geográfico Máximo Absoluto",
      population: "42 Membros de Invernada",
      status: "Estação Científica Permanente"
    },
    desc: {
      BR: "Incrível base científica americana situada exatamente no Polo Sul geográfico da Terra, suspensa sobre pilares ajustáveis para conter o acúmulo de gelo.",
      EN: "American research station located at the Geographic South Pole. Continuously inhabited and elevated on hydraulic columns to prevent burial.",
      ES: "Estación científica estadounidense ubicada en el Polo Sur geográfico. Inhabitada de forma ininterrumpida bajo el frío más extremo."
    }
  },
  m7: {
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/f/ff/Stancia_Vostok.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/5/52/Vostok_Station_in_summer.jpg"
    ],
    videos: [
      {
        title: "Perfurações Científicas em Vostok e Climas do Passado",
        length: "14:10",
        youtubeId: "ZSt7VAVf-4c",
        thumbnail: "https://img.youtube.com/vi/ZSt7VAVf-4c/hqdefault.jpg"
      }
    ],
    facts: {
      temp: "-62.1°C",
      wind: "12 km/h E",
      isolate: "Extremo Severo / Platô de Grande Altitude",
      population: "14 Investigadores Russos e Franceses",
      status: "Pesquisa de Perfuração de Núcleo de Gelo"
    },
    desc: {
      BR: "Estação russa no Platô Antártico de alta altitude. Conhecida pela perfuração do maior lago subglacial da Terra, selado sob 3700 metros de gelo.",
      EN: "Russian high-altitude research station. Famous for drilling into Lake Vostok, the largest subglacial lake sealed under 3,700m of ice.",
      ES: "Estación científica rusa de gran altitud. Famosa por perforar hasta el Lago Vostok, el cuerpo subglacial de agua sellado por milenios."
    }
  },
  m8: {
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/e/ec/McMurdo_Station_aerial_view.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/1/14/McMurdo_Station_Antarctica.jpg"
    ],
    videos: [
      {
        title: "Logística e Apoio Científico no Hub de McMurdo",
        length: "17:35",
        youtubeId: "Mq8_6hCgsbk",
        thumbnail: "https://img.youtube.com/vi/Mq8_6hCgsbk/hqdefault.jpg"
      }
    ],
    facts: {
      temp: "-12.5°C",
      wind: "33 km/h NW",
      isolate: "Estação Costeira em Península Ativa",
      population: "150 Membros no Verão",
      status: "Módulo Logístico Integrado Operando"
    },
    desc: {
      BR: "A maior comunidade científica e base de apoio logístico na Antártica, operada pelos Estados Unidos na Ilha de Ross.",
      EN: "The largest research community and logistic hub in Antarctica, operated by the United States on volcanic Ross Island.",
      ES: "La base logística y comunidad científica más grande de la Antártida, operada por EE. UU. en la Isla de Ross."
    }
  }
};

const DYNAMIC_MARKERS_DATA = [
  ...MAP_MARKERS,
  {
    id: 'm6',
    title: {
      BR: "Estação Amundsen-Scott (Polo Sul)",
      EN: "Amundsen-Scott South Pole Station",
      ES: "Estación Amundsen-Scott (Polo Sur)"
    },
    lat: -90.0000,
    lng: 0.0000,
    type: 'base',
    operation: 42,
    associatedPhotos: [],
    associatedVideos: [],
    associatedPublications: []
  },
  {
    id: 'm7',
    title: {
      BR: "Estação Soviética Vostok",
      EN: "Vostok Russian Station",
      ES: "Estación Soviética Vostok"
    },
    lat: -78.4644,
    lng: 106.8373,
    type: 'base',
    operation: 38,
    associatedPhotos: [],
    associatedVideos: [],
    associatedPublications: []
  },
  {
    id: 'm8',
    title: {
      BR: "Estação McMurdo (Ilha de Ross)",
      EN: "McMurdo Station (Ross Island)",
      ES: "Estación McMurdo (Isla de Ross)"
    },
    lat: -77.8460,
    lng: 166.6605,
    type: 'base',
    operation: 41,
    associatedPhotos: [],
    associatedVideos: [],
    associatedPublications: []
  }
];

// Layout Positions on our 1:1 square polar projection card
const GRAPHIC_COORDS: Record<string, { left: string; top: string }> = {
  m1: { left: '27.5%', top: '25.5%' }, // EACF - Tip of Peninsula
  m2: { left: '21%', top: '19.5%' },   // Ship Maximiano - open waters/Drake Passage
  m3: { left: '22%', top: '30%' },     // Byers Peninsula - Livingston west end
  m4: { left: '25.6%', top: '33.8%' }, // Deception Island - flooded crater
  m5: { left: '24.8%', top: '27.4%' },   // Cape Shirreff - Livingston north coast
  m6: { left: '50.1%', top: '50.2%' },   // South Pole - geographical center
  m7: { left: '61.5%', top: '57%' },     // Vostok Station - East Antarctica
  m8: { left: '46.1%', top: '70.8%' }      // McMurdo Station - Ross Ice Shelf
};

const GEOGRAPHIC_FACTS = {
  BR: {
    area: "Área Terrestre Total",
    areaVal: "14.200.000 km² (~98% sob manto de gelo permanente)",
    iceThickness: "Espessura Máxima Observada do Gelo",
    iceThicknessVal: "4.776 metros",
    freshWater: "Percentual Global de Água Doce",
    freshWaterVal: "Aproximadamente 70% da reserva de água doce do planeta",
    windSpeed: "Ventos de Gradiente (Katabáticos)",
    windSpeedVal: "Velocidades de até 327 km/h registrados em encostas",
    avgTemp: "Temperatura Média no Planalto Elevado",
    avgTempVal: "-57°C (Mínima extrema registrada de -89,2°C em Vostok)",
    title: "Instrumento Geográfico de Referência",
    source: "Cartografia em Projeção Polar Hemisférica Estereográfica • SCAR / USGS",
    mapTypeSelector: "Representação Física e Cartográfica:",
    mapTypeScar: "Carta Geopolítica / Física (SCAR)",
    mapTypeNasa: "Relevo Topográfico Shaded Relief (USGS)",
    zoomTip: "Aproxime para explorar a zona operacional do SaúdeAntar no Bransfield.",
    operationalZoneLabel: "ZONA OPERACIONAL BRASILEIRA",
  },
  ES: {
    area: "Área Terrestre Total",
    areaVal: "14.200.000 km² (~98% bajo manto de hielo permanente)",
    iceThickness: "Espesor de Hielo Máximo Registrado",
    iceThicknessVal: "4.776 metros",
    freshWater: "Porcentaje Global de Agua Dulce",
    freshWaterVal: "Aproximadamente 70% de la reserva de agua dulce del planeta",
    windSpeed: "Vientos Catabáticos de Alta Pendiente",
    windSpeedVal: "Velocidades de hasta 327 km/h registrados en laderas",
    avgTemp: "Temperatura Promedio en el Altiplano",
    avgTempVal: "-57°C (Mínima extrema registrada de -89,2°C en Vostok)",
    title: "Instrumento Geográfico de Referencia",
    source: "Cartografía en Proyección Polar Hemisférica Estereográfica • SCAR / USGS",
    mapTypeSelector: "Representación Física y Cartográfica:",
    mapTypeScar: "Carta Geopolítica / Física (SCAR)",
    mapTypeNasa: "Relieve Topográfico Shaded Relief (USGS)",
    zoomTip: "Haga clic para ampliar la zona operacional en el Estrecho de Bransfield.",
    operationalZoneLabel: "ZONA OPERACIONAL BRASILEÑA",
  },
  EN: {
    area: "Total Landmass Area",
    areaVal: "14,200,000 km² (~98% covered by permanent ice sheet)",
    iceThickness: "Maximum Recorded Ice Thickness",
    iceThicknessVal: "4,776 meters (15,669 ft)",
    freshWater: "Global Freshwater Supply",
    freshWaterVal: "Approximately 70% of the world's freshwater reserves",
    windSpeed: "Extreme Katabatic Grade Winds",
    windSpeedVal: "Speeds up to 327 km/h (203 mph) logged",
    avgTemp: "Mean High Plateau Temperature",
    avgTempVal: "-57°C (-70°F) (Extreme absolute low of -89.2°C at Vostok)",
    title: "Reference Cartographic Instrument",
    source: "Polar Stereographic Hemispheric Projection System • SCAR / USGS",
    mapTypeSelector: "Physical & Geopolitical Representation Mode:",
    mapTypeScar: "Political & Base Geography (SCAR)",
    mapTypeNasa: "Shaded Topographic Relief (USGS)",
    zoomTip: "Focus in to explore the polar operational zone on Bransfield Strait.",
    containerScaleInfo: "SCAR Standard Hemispheric Grid",
    operationalZoneLabel: "BRAZILIAN OPERATIONAL ZONE",
  }
};

const INSTRUCTIONS_TRANSLATIONS = {
  BR: {
    hoverTip: "Passe o mouse sobre os marcadores e acampamentos para visualizar fotos e vídeos reais instantaneamente.",
    clickLockTip: "Clique em uma marcação para travar os controles e ler relatórios ou ampliar as fotografias.",
    statusInactive: "Aguardando seleção cartográfica no painel tático...",
    temperature: "Temperatura do Ar",
    windSpeed: "Velocidade do Vento",
    environmentalStatus: "Nível de Isolamento/Isolante",
    crewActive: "População de Cientistas",
    statusText: "Status de Comunicação",
    viewDocuments: "Analisar Registros",
    associatedMedia: "Áudio e Vídeo Disponível",
    readReport: "Estudo Clínico Associado",
    mapViewSwitcher: "PERSPECTIVA VISUAL ANTÁRTICA",
    polarTabName: "Astro-Mapa (Polar)",
    regionalTabName: "Estreito de Bransfield (Vetor)",
    googleTabName: "Satélite GPS (Google Maps)",
    threeDTabName: "Globo Tático (3D)"
  },
  ES: {
    hoverTip: "Pase el cursor sobre los marcadores para visualizar fotos y videos reales al instante.",
    clickLockTip: "Haga clic en un marcador para bloquear los controles, leer informes o ampliar fotografías.",
    statusInactive: "Esperando selección cartográfica...",
    temperature: "Temperatura del Aire",
    windSpeed: "Velocidad del Viento",
    environmentalStatus: "Nivel de Aislamiento",
    crewActive: "Población Activa",
    statusText: "Estado del Enlace",
    viewDocuments: "Analizar Registros",
    associatedMedia: "Medios Disponibles",
    readReport: "Estudio Clínico Relacionado",
    mapViewSwitcher: "PERSPECTIVA VISUAL ANTÁRTICA",
    polarTabName: "Astro-Mapa (Polar)",
    regionalTabName: "Estrecho de Bransfield (Vetor)",
    googleTabName: "Satélite GPS (Google Maps)",
    threeDTabName: "Globo Táctico (3D)"
  },
  EN: {
    hoverTip: "Hover over the waypoints on the polar map to stream active photos and videos instantly.",
    clickLockTip: "Click any location pin to lock selection, drill down into logs, or zoom images.",
    statusInactive: "Awaiting cartographic waypoint query...",
    temperature: "Air Temperature",
    windSpeed: "Wind Velocity",
    environmentalStatus: "Isolation Grading",
    crewActive: "Scientific Population",
    statusText: "Link Telemetry",
    viewDocuments: "Analyse Field Assets",
    associatedMedia: "Associated Media Deck",
    readReport: "Scientific Research Report",
    mapViewSwitcher: "ANTARCTIC VISUAL PROJECTION",
    polarTabName: "Astro-Map (Polar)",
    regionalTabName: "Bransfield Strait (Vector)",
    googleTabName: "GPS Satellite (Google Maps)",
    threeDTabName: "Tactical Globe (3D)"
  }
};

export function MapSection({
  language,
  onSelectPhoto,
  onSelectVideo,
  onSelectPublication,
  theme,
  allPhotos = GALLERY_ITEMS,
  onSelectOperations
}: MapSectionProps) {
  // Tabs: 'polar' | 'regional' | '3d' | 'google'
  const [mapTab, setMapTab] = useState<'polar' | 'regional' | '3d' | 'google'>('polar');
  
  // Interactive selected / hovered marker states
  const [selectedMarkerId, setSelectedMarkerId] = useState<string>('m1'); // EACF selected by default
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
  
  // Ref to debounce clearing hovered state, preventing erratic jumping/vibration on close pins
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Supabase Station Photos state
  const [stationPhotos, setStationPhotos] = useState<Record<string, string[]>>({
    m6: [], // Amundsen Scott
    m7: [], // Vostok
    m8: [], // McMurdo
  });

  useEffect(() => {
    const loadStationPhotos = async () => {
      try {
        const [amundsenFiles, mcmurdoFiles, vostokFiles] = await Promise.all([
          fetchImagesFromSupabaseBucketRecursive('Stations', 'Amundsen Scott'),
          fetchImagesFromSupabaseBucketRecursive('Stations', 'McMurdo'),
          fetchImagesFromSupabaseBucketRecursive('Stations', 'Vostok')
        ]);

        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'];
        const filterUrls = (files: any[]) => files
          .filter(file => {
            const ext = file.name.split('.').pop()?.toLowerCase() || '';
            return imageExtensions.includes(ext);
          })
          .map(file => file.publicUrl);

        setStationPhotos({
          m6: filterUrls(amundsenFiles),
          m7: filterUrls(vostokFiles),
          m8: filterUrls(mcmurdoFiles)
        });
      } catch (err) {
        console.error("Failed to load station photos from Supabase bucket 'Stations'", err);
      }
    };
    loadStationPhotos();
  }, []);

  const handleMouseEnterPin = (id: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredMarkerId(id);
  };

  const handleMouseLeavePin = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMarkerId(null);
    }, 120); // 120ms buffer to transition between adjacent dots smoothly
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Lightbox view state
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Active details (for side panel, photos, videos, etc.)
  // Only updates on click (selectedMarkerId) as requested
  const activeId = selectedMarkerId;
  const activeMarker = DYNAMIC_MARKERS_DATA.find(m => m.id === activeId) || DYNAMIC_MARKERS_DATA[0];
  const activeMedia = LOCAL_MEDIA_RECORDS[activeId];

  // Dynamic photos selection based on user request:
  // - NPolar Almirante H-41 (marker m2) -> Supabase "navio" folder photos
  // - Camp markers (markers of type 'camp') -> Supabase "acampamento" folder photos
  // - Amundsen Scott (m6), Vostok (m7), McMurdo (m8) -> Supabase bucket "Stations" folder photos
  // - Default -> activeMedia?.photos || []
  const getDynamicPhotos = (): string[] => {
    if (activeId === 'm6' || activeId === 'm7' || activeId === 'm8') {
      const sp = stationPhotos[activeId];
      if (sp && sp.length > 0) {
        return sp;
      }
    }

    if (!allPhotos) return activeMedia?.photos || [];

    if (activeId === 'm2') {
      // Find all photos that belong to the navio folder
      const navioPhotos = allPhotos.filter(photo => {
        const subIsNavio = photo.subcategory === 'Navio';
        const hasNavioTag = photo.tags && photo.tags.some(t => t.toLowerCase() === 'navio');
        const descHasNavio = photo.description && (
          (photo.description.BR && photo.description.BR.toLowerCase().includes('navio')) ||
          (photo.description.EN && photo.description.EN.toLowerCase().includes('navio'))
        );
        const idHasNavio = photo.id && photo.id.toLowerCase().includes('navio');
        return subIsNavio || hasNavioTag || descHasNavio || idHasNavio;
      }).map(p => p.imageUrl);

      if (navioPhotos.length > 0) {
        return navioPhotos;
      }
    } else if (activeMarker?.type === 'camp') {
      // Find all photos that belong to the acampamento folder
      const campPhotos = allPhotos.filter(photo => {
        const subIsCamp = photo.subcategory === 'Acampamento';
        const hasCampTag = photo.tags && photo.tags.some(t => t.toLowerCase().includes('acampamento') || t.toLowerCase() === 'camp');
        const descHasCamp = photo.description && (
          (photo.description.BR && photo.description.BR.toLowerCase().includes('acampamento')) ||
          (photo.description.EN && photo.description.EN.toLowerCase().includes('acampamento'))
        );
        const idHasCamp = photo.id && photo.id.toLowerCase().includes('acampamento');
        return subIsCamp || hasCampTag || descHasCamp || idHasCamp;
      }).map(p => p.imageUrl);

      if (campPhotos.length > 0) {
        return campPhotos;
      }
    }

    return activeMedia?.photos || [];
  };

  const displayPhotos = getDynamicPhotos();
  const photosToRender = displayPhotos.slice(0, 2);

  const API_KEY =
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
    (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
    '';

  const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY !== 'MY_GOOGLE_MAPS_PLATFORM_KEY';

  const inst = INSTRUCTIONS_TRANSLATIONS[language];
  const geoFacts = GEOGRAPHIC_FACTS[language];

  // Open Lightbox
  const triggerLightbox = (photos: string[], startIndex: number) => {
    setLightboxImages(photos);
    setLightboxIndex(startIndex);
    setIsLightboxOpen(true);
  };

  const nextSlide = () => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const prevSlide = () => {
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  // Keyboard controls for Lightbox
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

  return (
    <div className={`relative w-full border ${theme === 'dark' ? 'bg-[#030712] border-zinc-850 text-zinc-100' : 'bg-slate-50 border-slate-200 text-slate-800'} transition-all flex flex-col overflow-hidden rounded-none p-1 md:p-4 select-none`}>
      
      {/* 1. SECTION BAR CONTROLLER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 mb-6 select-none border-zinc-800/10 dark:border-zinc-800/30">
        <div>
          <span className={`font-mono text-[9px] tracking-widest uppercase ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'} flex items-center gap-1.5`}>
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
            {inst.mapViewSwitcher}
          </span>
          <h3 className={`text-xl font-light tracking-tight ${theme === 'dark' ? 'text-zinc-150' : 'text-slate-850'} mt-1`}>
            {language === 'BR' ? "Cartografia de Operações do SaúdeAntar" : language === 'ES' ? "Cartografía de Campañas de SaludAntar" : "SaúdeAntar Operational Cartography"}
          </h3>
        </div>

        {/* Dynamic Mode Switcher Bar */}
        <div className={`flex flex-wrap items-center p-1 border gap-1 self-start md:self-auto ${theme === 'dark' ? 'bg-black/90 border-zinc-800' : 'bg-white shadow-sm border-slate-250'}`}>
          <button
            onClick={() => setMapTab('polar')}
            className={`px-3 py-1 text-[9.5px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              mapTab === 'polar'
                ? (theme === 'dark' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/35' : 'bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold')
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            {inst.polarTabName}
          </button>
          
          <button
            onClick={() => setMapTab('regional')}
            className={`px-3 py-1 text-[9.5px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              mapTab === 'regional'
                ? (theme === 'dark' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/35' : 'bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold')
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            {inst.regionalTabName}
          </button>

          <button
            onClick={() => setMapTab('3d')}
            className={`px-3 py-1 text-[9.5px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              mapTab === '3d'
                ? (theme === 'dark' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/35' : 'bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold')
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            {inst.threeDTabName}
          </button>

          <button
            onClick={() => setMapTab('google')}
            className={`px-3 py-1 text-[9.5px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              mapTab === 'google'
                ? (theme === 'dark' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/35' : 'bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold')
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            {inst.googleTabName}
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC WORKSPACE BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[520px]">
        
        {/* ======================= TAB 1: POLAR MAIN IMAGE COVER ======================= */}
        {mapTab === 'polar' && (
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative p-2 overflow-hidden border border-zinc-800/10 dark:border-zinc-800/30 bg-sky-950/[0.02] dark:bg-black/45">
            {/* High fidelity coordinates grid layout over background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] dark:opacity-20 text-cyan-500">
              <svg width="100%" height="100%">
                <pattern id="grid-polar" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,4" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid-polar)" />
              </svg>
            </div>

            {/* Compass calibration lines */}
            <div className={`absolute top-6 left-6 z-10 pointer-events-none font-mono text-[8.5px] tracking-wider uppercase ${theme === 'dark' ? 'text-zinc-650' : 'text-slate-450'}`}>
              Grid projection: Orthographic Polar Index • Shaded Relief USGS Shading relief
            </div>

            {/* Interactive Sized Container matching the aspect-square constraint */}
            <div className="relative aspect-square w-full max-w-[430px] rounded-full border border-sky-500/15 overflow-hidden shadow-inner flex items-center justify-center select-none bg-[#020d1c]">
              <img 
                src={polarReliefMap} 
                alt="Antarctica Polar Shaded Relief"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none brightness-95 opacity-90 hover:brightness-100 transition-all duration-700 scale-100 hover:scale-[1.02]"
              />

              {/* Polar Coordinates overlays */}
              <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-cyan-400/15 pointer-events-none" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-cyan-400/15 pointer-events-none animate-pulse" />
              <div className="absolute inset-[15%] rounded-full border border-dashed border-cyan-400/10 pointer-events-none" />
              <div className="absolute inset-[40%] rounded-full border border-dashed border-cyan-400/10 pointer-events-none" />

              {/* South Pole exact reference pin */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              </div>

              {/* ALL INTERACTIVE PIN MARKERS OVERLAID PERFECTLY */}
              {DYNAMIC_MARKERS_DATA.map((spot) => {
                const graphicCoords = GRAPHIC_COORDS[spot.id];
                if (!graphicCoords) return null;
                const isFocused = spot.id === selectedMarkerId || spot.id === hoveredMarkerId;
                const isSelected = spot.id === selectedMarkerId;

                return (
                  <div
                    key={spot.id}
                    onMouseEnter={() => handleMouseEnterPin(spot.id)}
                    onMouseLeave={handleMouseLeavePin}
                    onClick={() => setSelectedMarkerId(spot.id)}
                    className="absolute cursor-pointer select-none group/pin z-20"
                    style={{ left: graphicCoords.left, top: graphicCoords.top }}
                  >
                    <div className="relative flex items-center justify-center w-6 h-6">
                      {/* Interactive Ripple Waves */}
                      <span className={`absolute inline-flex rounded-full h-full w-full transition-all duration-300 ${
                        isFocused 
                          ? 'bg-cyan-400 opacity-80 animate-ping' 
                          : 'bg-cyan-500/40 opacity-55 hover:animate-ping'
                      }`} />
                      
                      {/* Active Core Bullet */}
                      <span className={`relative inline-flex rounded-full transition-all duration-300 border border-white shadow-md ${
                        isSelected 
                          ? 'h-3.5 w-3.5 bg-cyan-400 scale-110' 
                          : isFocused 
                            ? 'h-3 w-3 bg-cyan-300 scale-105' 
                            : 'h-2.5 w-2.5 bg-cyan-600 group-hover/pin:bg-cyan-400'
                      }`} />

                      {/* Small visual beacon for mobile users wanting click targets */}
                      {isSelected && (
                        <span className="absolute -inset-1.5 border border-cyan-400/40 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
                      )}
                    </div>

                    {/* Compact Popover Overlaid directly near the Cursor Pin */}
                    <div className={`absolute top-7 left-1/2 -translate-x-1/2 bg-black/95 border backdrop-blur text-white px-2.5 py-1.5 text-[8px] font-mono tracking-wider shadow-xl transition-all duration-300 flex flex-col gap-0.5 select-none pointer-events-none ${
                      isFocused 
                        ? 'opacity-100 scale-100 -translate-y-1 visible' 
                        : 'opacity-0 scale-95 invisible'
                    } ${isFocused ? 'border-cyan-400 z-50' : 'border-zinc-800'}`}>
                      <span className="font-bold text-cyan-300 uppercase whitespace-nowrap">{spot.title[language]}</span>
                      <span className="text-zinc-405 text-[7px] truncate max-w-[140px] whitespace-nowrap">
                        {!['m6', 'm7', 'm8'].includes(spot.id) && `OP ${spot.operation || '44'} • `}{spot.type.toUpperCase()}
                      </span>
                    </div>

                  </div>
                );
              })}

            </div>

            {/* Quick Helper Legend Tip at the bottom margins */}
            <div className="w-full text-center mt-3 select-none">
              <span className={`inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider px-3 py-1 ${
                theme === 'dark' ? 'text-zinc-450 bg-zinc-950/40' : 'text-slate-550 bg-slate-100/50'
              }`}>
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                {hoveredMarkerId ? "Mapeando vetor radiogoniométrico..." : inst.hoverTip}
              </span>
            </div>
          </div>
        )}

        {/* ======================= TAB 2: DETAILED SAMPLING ZONE VECTOR CHART ======================= */}
        {mapTab === 'regional' && (
          <div className="lg:col-span-7 flex flex-col justify-between p-4 relative min-h-[460px] border border-zinc-800/10 dark:border-zinc-800/30 bg-sky-950/[0.01] dark:bg-black/35">
            {/* Bransfield Strait and South Shetland Islands Map Vector Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20 text-cyan-400/30 z-0">
              <svg width="100%" height="100%">
                <pattern id="grid-regional" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid-regional)" />
              </svg>
            </div>

            {/* Header detail */}
            <div className="flex items-center justify-between border-b border-cyan-500/10 pb-3 mb-2 relative z-10 select-none">
              <div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-cyan-400">BRANSFIELD REGIONAL HYDROGRAPHIC SYSTEM</span>
                <h4 className="text-sm font-semibold uppercase tracking-tight text-cyan-300">Estreito de Bransfield & Shetlands do Sul</h4>
              </div>
              <Compass className="w-5 h-5 text-cyan-500 animate-spin" style={{ animationDuration: '15s' }} />
            </div>

            {/* Beautiful SVG Interactive Map drawing exact islands lines */}
            <div className="my-auto py-4 flex items-center justify-center relative z-10 select-none h-full min-h-[340px]">
              <svg viewBox="0 0 400 240" className="w-full max-w-[480px] aspect-[5/3] overflow-visible">
                <defs>
                  {/* Bathymetry gradients */}
                  <radialGradient id="oceanBathymetry" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={theme === 'dark' ? '#031023' : '#dbf0fe'} />
                    <stop offset="100%" stopColor={theme === 'dark' ? '#010712' : '#f0f9ff'} />
                  </radialGradient>
                </defs>

                {/* Main ocean basin background */}
                <rect x="0" y="0" width="400" height="240" rx="4" fill="url(#oceanBathymetry)" className="stroke-zinc-500/20" />

                {/* Latitude parallels lines */}
                <line x1="0" y1="60" x2="400" y2="60" className="stroke-zinc-500/10 stroke-[0.5]" strokeDasharray="2,5" />
                <line x1="0" y1="120" x2="400" y2="120" className="stroke-zinc-500/10 stroke-[0.5]" strokeDasharray="2,5" />
                <line x1="0" y1="180" x2="400" y2="180" className="stroke-zinc-500/10 stroke-[0.5]" strokeDasharray="2,5" />
                <text x="395" y="118" textAnchor="end" className="font-mono text-[5.5px] fill-zinc-500 opacity-60">62°00'S</text>
                <text x="395" y="178" textAnchor="end" className="font-mono text-[5.5px] fill-zinc-500 opacity-60">62°30'S</text>

                {/* Longitude meridians lines */}
                <line x1="100" y1="0" x2="100" y2="240" className="stroke-zinc-500/10 stroke-[0.5]" strokeDasharray="2,5" />
                <line x1="200" y1="0" x2="200" y2="240" className="stroke-zinc-500/10 stroke-[0.5]" strokeDasharray="2,5" />
                <line x1="300" y1="0" x2="300" y2="240" className="stroke-zinc-500/10 stroke-[0.5]" strokeDasharray="2,5" />
                <text x="202" y="10" className="font-mono text-[5.5px] fill-zinc-500 opacity-60">59°00'W</text>
                <text x="302" y="10" className="font-mono text-[5.5px] fill-zinc-500 opacity-60">58°00'W</text>

                {/* 1. King George Island Shape (EACF location) */}
                <g className="transition-all hover:opacity-95">
                  <path 
                    d="M 330,62 C 345,55 372,48 375,54 C 378,61 366,74 355,80 C 345,86 331,94 324,88 C 319,83 318,72 330,62 Z" 
                    className={`transition-colors stroke-[0.8] ${theme === 'dark' ? 'fill-zinc-900 stroke-zinc-700 hover:fill-zinc-800' : 'fill-white stroke-slate-350 hover:fill-slate-50'}`} 
                  />
                  <text x="365" y="72" className="font-sans text-[6.5px] font-bold tracking-tight select-none pointer-events-none fill-zinc-400">King George I.</text>
                  <text x="331" y="93" className="font-serif italic text-[5px] select-none pointer-events-none fill-cyan-500">Admiralty Bay</text>
                </g>

                {/* 2. Nelson Island & Robert Island */}
                <path d="M 312,85 C 315,81 321,83 322,87 C 322,91 316,95 311,92 C 307,89 308,86 312,85 Z" className={`stroke-[0.6] ${theme === 'dark' ? 'fill-zinc-900 stroke-zinc-700' : 'fill-white stroke-slate-350'}`} />
                <path d="M 295,95 C 298,92 305,94 306,98 C 306,102 300,105 295,102 C 291,99 292,96 295,95 Z" className={`stroke-[0.6] ${theme === 'dark' ? 'fill-zinc-900 stroke-zinc-700' : 'fill-white stroke-slate-350'}`} />

                {/* 3. Greenwich Island */}
                <path d="M 272,104 C 275,100 286,102 288,107 C 288,111 281,118 273,115 C 266,112 268,107 272,104 Z" className={`stroke-[0.6] ${theme === 'dark' ? 'fill-zinc-900 stroke-zinc-700' : 'fill-white stroke-slate-350'}`} />

                {/* 4. Livingston Island Shape (Byers and Cape Shirreff location) */}
                <g className="transition-all hover:opacity-95">
                  <path 
                    d="M 210,128 C 220,118 250,110 262,112 C 267,118 261,130 250,135 C 242,139 220,144 212,141 C 205,138 202,134 210,128 Z" 
                    className={`transition-colors stroke-[0.8] ${theme === 'dark' ? 'fill-zinc-900 stroke-zinc-700 hover:fill-zinc-800' : 'fill-white stroke-slate-350 hover:fill-slate-50'}`} 
                  />
                  <text x="228" y="132" className="font-sans text-[6.5px] font-bold tracking-tight select-none pointer-events-none fill-zinc-400">Livingston I.</text>
                </g>

                {/* 5. Deception Island Shape (Foster Bay collapsed caldera circular ring) */}
                <g className="transition-all hover:opacity-95">
                  <path 
                    d="M 201,162 A 10,10 0 1,1 200.9,162 Z" 
                    className={`fill-none stroke-[2.2] ${theme === 'dark' ? 'stroke-zinc-900' : 'stroke-slate-350'}`} 
                  />
                  <path 
                    d="M 201,162 A 10,10 0 1,1 200.9,162 Z" 
                    className="fill-none stroke-[1] stroke-cyan-500/20" 
                  />
                  <text x="180" y="174" className="font-sans text-[6px] font-semibold tracking-wide select-none pointer-events-none fill-zinc-400">Deception I.</text>
                </g>

                {/* 6. Byers Peninsula Detail Overlay */}
                <path d="M 208,129 C 202,130 196,132 195,135 C 196,140 205,138 212,135 Z" className={`stroke-[0.8] ${theme === 'dark' ? 'fill-zinc-950 stroke-zinc-650' : 'fill-stone-100 stroke-slate-400'}`} />
                <path d="M 238,112 L 244,103 C 245,102 248,103 249,106 Z" className={`stroke-[0.8] ${theme === 'dark' ? 'fill-zinc-950 stroke-zinc-650' : 'fill-stone-100 stroke-slate-400'}`} id="capeShirreffSpit" />

                {/* Bransfield Strait text */}
                <text x="280" y="165" textAnchor="middle" className="font-serif italic text-[10px] tracking-widest fill-sky-500/40 opacity-70">BRANSFIELD STRAIT</text>
                <text x="280" y="175" textAnchor="middle" className="font-mono text-[5.5px] tracking-[0.2em] fill-sky-400/50">Estreito de Bransfield</text>

                {/* PINS ON THIS VIEW AND DYNAMIC HOVER/CLICK FOR THE SHETLANDS ZONE */}
                {/* 1. EACF */}
                <g 
                  onMouseEnter={() => setHoveredMarkerId('m1')}
                  onMouseLeave={() => setHoveredMarkerId(null)}
                  onClick={() => setSelectedMarkerId('m1')}
                  className="cursor-pointer select-none group/pin2"
                  transform="translate(342, 73)"
                >
                  <circle cx="0" cy="0" r="8" className="fill-cyan-400/20 stroke-none group-hover/pin2:animate-ping" />
                  <circle cx="0" cy="0" r="3" className={`stroke-white stroke-[0.8] ${selectedMarkerId === 'm1' ? 'fill-cyan-400' : 'fill-cyan-600'}`} />
                  <text x="8" y="2.5" className="font-mono text-[6.5px] font-bold fill-cyan-400 bg-black">EACF</text>
                </g>

                {/* 2. Cape Shirreff */}
                <g 
                  onMouseEnter={() => setHoveredMarkerId('m5')}
                  onMouseLeave={() => setHoveredMarkerId(null)}
                  onClick={() => setSelectedMarkerId('m5')}
                  className="cursor-pointer select-none group/pin2"
                  transform="translate(247, 106)"
                >
                  <circle cx="0" cy="0" r="8" className="fill-cyan-400/20 stroke-none group-hover/pin2:animate-ping" />
                  <circle cx="0" cy="0" r="3" className={`stroke-white stroke-[0.8] ${selectedMarkerId === 'm5' ? 'fill-cyan-400' : 'fill-cyan-600'}`} />
                  <text x="8" y="2.5" className="font-mono text-[6.5px] font-bold fill-cyan-400 bg-black">SHIRREFF</text>
                </g>

                {/* 3. Byers */}
                <g 
                  onMouseEnter={() => setHoveredMarkerId('m3')}
                  onMouseLeave={() => setHoveredMarkerId(null)}
                  onClick={() => setSelectedMarkerId('m3')}
                  className="cursor-pointer select-none group/pin2"
                  transform="translate(202, 134)"
                >
                  <circle cx="0" cy="0" r="8" className="fill-cyan-400/20 stroke-none group-hover/pin2:animate-ping" />
                  <circle cx="0" cy="0" r="3" className={`stroke-white stroke-[0.8] ${selectedMarkerId === 'm3' ? 'fill-cyan-400' : 'fill-cyan-600'}`} />
                  <text x="-8" y="2.5" textAnchor="end" className="font-mono text-[6.5px] font-bold fill-cyan-400 bg-black">BYERS</text>
                </g>

                {/* 4. Deception */}
                <g 
                  onMouseEnter={() => setHoveredMarkerId('m4')}
                  onMouseLeave={() => setHoveredMarkerId(null)}
                  onClick={() => setSelectedMarkerId('m4')}
                  className="cursor-pointer select-none group/pin2"
                  transform="translate(201, 162)"
                >
                  <circle cx="0" cy="0" r="8" className="fill-cyan-400/20 stroke-none group-hover/pin2:animate-ping" />
                  <circle cx="0" cy="0" r="3" className={`stroke-white stroke-[0.8] ${selectedMarkerId === 'm4' ? 'fill-cyan-400' : 'fill-cyan-600'}`} />
                  <text x="8" y="2.5" className="font-mono text-[6.5px] font-bold fill-cyan-400 bg-black">DECEPÇÃO</text>
                </g>

                {/* 5. Almirante Maximiano Vessel */}
                <g 
                  onMouseEnter={() => setHoveredMarkerId('m2')}
                  onMouseLeave={() => setHoveredMarkerId(null)}
                  onClick={() => setSelectedMarkerId('m2')}
                  className="cursor-pointer select-none group/pin2"
                  transform="translate(270, 142)"
                >
                  <circle cx="0" cy="0" r="8" className="fill-cyan-400/20 stroke-none group-hover/pin2:animate-ping" />
                  <circle cx="0" cy="0" r="3" className={`stroke-white stroke-[0.8] ${selectedMarkerId === 'm2' ? 'fill-indigo-400' : 'fill-indigo-600'}`} />
                  <text x="8" y="2.5" className="font-mono text-[6px] font-bold fill-indigo-400 bg-black">&#128682; MAXIMIANO</text>
                </g>

              </svg>
            </div>

            {/* Scale bar metrics at bottom */}
            <div className={`mt-auto border-t pt-4 flex flex-col gap-1 text-[8px] font-mono ${theme === 'dark' ? 'bg-black/40 border-zinc-850 text-zinc-500' : 'bg-white border-slate-200 text-slate-500'} p-3 select-none`}>
              <div className="flex justify-between">
                <span>Projection: Mercator Grid Bransfield Strait</span>
                <span>0 ———— 20 ———— 40 Nautical Miles</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 3: IMMERSIVE GOOGLE MAPS COORD GRID ======================= */}
        {mapTab === 'google' && (
          <div className="lg:col-span-7 flex flex-col justify-between p-4 min-h-[460px] relative border border-zinc-800/10 dark:border-zinc-800/30 bg-sky-950/[0.01]">
            {hasValidKey ? (
              <div className="w-full h-full min-h-[380px] relative rounded-none overflow-hidden">
                <APIProvider apiKey={API_KEY}>
                  <GoogleMap
                    defaultCenter={{ lat: -62.0833, lng: -58.3833 }}
                    defaultZoom={8}
                    mapId="antarctica_satellite_hud"
                    mapTypeId="satellite"
                    gestureHandling={'cooperative'}
                    style={{ width: '100%', height: '100%', minHeight: '380px' }}
                  >
                    {DYNAMIC_MARKERS_DATA.map((spot) => (
                      <AdvancedMarker
                        key={spot.id}
                        position={{ lat: spot.lat, lng: spot.lng }}
                        onClick={() => setSelectedMarkerId(spot.id)}
                      >
                        <div className="relative cursor-pointer flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full border border-white ${selectedMarkerId === spot.id ? 'bg-cyan-400 animate-pulse' : 'bg-red-500'}`} />
                          <span className="font-mono text-[8px] bg-black/85 text-white border border-zinc-800 px-1 py-0.5 mt-1 whitespace-nowrap">
                            {spot.title[language]}
                          </span>
                        </div>
                      </AdvancedMarker>
                    ))}
                  </GoogleMap>
                </APIProvider>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 select-none">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border mb-4 shadow ${
                  theme === 'dark' ? 'bg-[#0a0f1d] border-zinc-800 text-cyan-400' : 'bg-slate-100 border-slate-200 text-cyan-600'
                }`}>
                  <Globe className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-semibold uppercase font-mono tracking-wider">
                  {language === 'BR' ? "COOPERAÇÃO GPS GOOGLE MAPS" : language === 'ES' ? "DISPOSITIVO SATELITAL GOOGLE" : "SATELLITE GPS LINK"}
                </h4>
                <p className="text-xs text-zinc-400 max-w-sm mt-2 font-sans leading-relaxed">
                  {language === 'BR' 
                    ? "Para ativar visualizações de satélite em tempo real integradas com o Google Maps, registre sua chave no painel de configurações (GOOGLE_MAPS_PLATFORM_KEY)."
                    : language === 'ES'
                      ? "Ingrese su variable GOOGLE_MAPS_PLATFORM_KEY para sincronizar capas satelitales interactivas en tiempo real."
                      : "Please configure your environment variable GOOGLE_MAPS_PLATFORM_KEY to connect interactive Google Maps layer."}
                </p>
                
                {/* Render elegant list of fallback coordinates */}
                <div className={`mt-6 p-4 border max-w-sm w-full rounded text-left ${
                  theme === 'dark' ? 'bg-zinc-950/80 border-zinc-800' : 'bg-slate-150/40 border-slate-250'
                }`}>
                  <span className="font-mono text-[8px] uppercase text-cyan-400 block mb-2 font-bold select-none">Dossier de Coordenadas de Missão</span>
                  <div className="space-y-1.5 text-[9px] font-mono select-none">
                    {DYNAMIC_MARKERS_DATA.slice(0, 5).map(spot => (
                      <div key={spot.id} className="flex justify-between hover:text-cyan-300 cursor-pointer" onClick={() => setSelectedMarkerId(spot.id)}>
                        <span className="truncate max-w-[170px] uppercase font-bold">{spot.title[language]}</span>
                        <span className="text-zinc-400">{spot.lat.toFixed(4)}° S, {spot.lng.toFixed(4)}° W</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div className={`mt-auto border-t pt-3 font-mono text-[8px] uppercase tracking-wider text-zinc-400 flex items-center gap-2 select-none ${
              theme === 'dark' ? 'border-zinc-850' : 'border-slate-150'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{language === 'BR' ? "COORDENADAS DE SATÉLITE CRIPTOGRAFADAS • GOOGLE PLATFORM" : "ENCRYPTED SATELLITE COORDINATES • GOOGLE PLATFORM"}</span>
            </div>
          </div>
        )}

        {/* ======================= TAB 2.5: GEOLOGICAL DIGITAL TWIN 3D MODEL ======================= */}
        {mapTab === '3d' && (
          <div className="lg:col-span-12 flex flex-col justify-between p-4 min-h-[460px] relative border border-zinc-800/10 dark:border-zinc-800/30 bg-sky-950/[0.01]">
            
            {/* Sketchfab Interactive Embed IFrame */}
            <div className="w-full flex-1 min-h-[380px] relative rounded-none overflow-hidden border border-zinc-800 dark:border-zinc-850 bg-black shadow-inner flex flex-col">
              <iframe
                title="Antarctica 3D Map"
                className="w-full flex-1 border-0 rounded-none bg-black"
                src="https://sketchfab.com/models/6e801649600845c79f00cef86f157f08/embed?autostart=1&preload=1&camera=0&ui_animations=0&ui_infos=0&ui_stop=1&ui_inspector=0&ui_theme=dark&transparent=1"
                referrerPolicy="no-referrer"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
              />
            </div>
            
            {/* High Tech HUD status bar explaining model controls */}
            <div className={`mt-3 p-3 border leading-relaxed text-[10px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 select-none ${
              theme === 'dark' ? 'bg-black/60 border-zinc-800 text-zinc-400 font-sans' : 'bg-white border-slate-200 text-slate-600 font-sans'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  {language === 'BR' 
                    ? "Modelo Tridimensional Interativo de Elevação de Relevo (Shaded Relief Topográfico)."
                    : language === 'ES'
                      ? "Modelo Tridimensional Interactivo de Elevación y Sombreado de Terreno Polar."
                      : "Tactical Polar Elevation & Shaded Digital Twin Relief tridimensional simulation."}
                </span>
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 bg-cyan-950/20 px-2 py-0.5 rounded-none border border-cyan-500/20">
                <Compass className="w-3.5 h-3.5" />
                {language === 'BR' ? "Gire: Botão Esquerdo | Arrasta: Botão Direito" : language === 'ES' ? "Giro: Clic Izq. | Desplazar: Clic Der." : "Orbit: Left Click | Pan: Right Click"}
              </div>
            </div>

            <div className={`mt-auto border-t pt-3 font-mono text-[8px] uppercase tracking-wider text-zinc-400 flex items-center gap-2 select-none ${
              theme === 'dark' ? 'border-zinc-850' : 'border-slate-150'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{language === 'BR' ? "Modelagem Externa de Referência Cartográfica • SCAR WG-GGI" : language === 'ES' ? "Modelo Externo de Referencia Geológica • SCAR WG-GGI" : "External Digital Cartographic Twin Mesh • SCAR WG-GGI"}</span>
            </div>
          </div>
        )}

        {/* ======================= RIGHT LOGISTICAL & AUDIOVISUAL HUDS PANEL ======================= */}
        {mapTab !== '3d' && (
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* A. DYNAMIC SITE HUD TITLE BLOCK */}
            <div className={`border p-4 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              theme === 'dark' 
                ? 'bg-[#060a15] border-zinc-800 text-zinc-100 shadow-xl' 
                : 'bg-white border-slate-200 text-slate-800 shadow-md'
            }`}>
              {!['m6', 'm7', 'm8'].includes(activeMarker.id) && (
                <div className="absolute top-0 right-0 p-3 select-none">
                  <span className={`font-mono text-[8.5px] uppercase border px-2 py-0.5 tracking-wider font-semibold rounded-none ${
                    theme === 'dark' ? 'bg-cyan-950/40 border-cyan-800/30 text-cyan-300' : 'bg-cyan-50 border-cyan-200 text-cyan-700 font-bold'
                  }`}>
                    OP {activeMarker.operation || '44'}
                  </span>
                </div>
              )}

              <div className="select-none">
                <span className={`font-mono text-[8px] uppercase tracking-wider block mb-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-450'}`}>
                  WAYPOINT EXPLORER RADAR • {activeMarker.type.toUpperCase()}
                </span>
                <h4 className="text-base font-medium tracking-tight uppercase flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 animate-bounce" />
                  <span className="leading-tight">{activeMarker.title[language]}</span>
                </h4>
                <p className={`text-[10px] mt-2 select-none ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'} leading-relaxed font-sans`}>
                  {activeMedia ? activeMedia.desc[language] : inst.statusInactive}
                </p>
              </div>

              {/* Geographical coordinates */}
              <div className={`mt-4 pt-3 border-t flex justify-between font-mono text-[9px] select-none ${
                theme === 'dark' ? 'border-zinc-850 text-zinc-500' : 'border-slate-150 text-slate-500'
              }`}>
                <span>LATITUDE: {Math.abs(activeMarker.lat).toFixed(4)}° S</span>
                <span>LONGITUDE: {Math.abs(activeMarker.lng).toFixed(4)}° W</span>
              </div>
            </div>

            {/* B. BIOCOMPLIANCE & ENVIRONMENT TELEMETRY HUD */}
            <div className={`border p-4 select-none ${
              theme === 'dark' ? 'bg-black/75 border-zinc-850' : 'bg-stone-50 border-slate-205 shadow-sm'
            }`}>
              <span className="font-mono text-[8.5px] uppercase text-cyan-300 block mb-3 font-semibold select-none">TELEMETRIA GEOCLÍNICA POLAR</span>
              
              <div className="grid grid-cols-2 gap-3 font-mono text-[9.5px]">
                <div className={`p-2 border rounded-none flex items-center gap-2 ${theme === 'dark' ? 'bg-zinc-950/90 border-zinc-850' : 'bg-white border-slate-200'}`}>
                  <Thermometer className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="text-[7.5px] text-zinc-500 block uppercase">{inst.temperature}</span>
                    <span className="font-bold text-[10px]">{activeMedia ? activeMedia.facts.temp : "-4.2°C"}</span>
                  </div>
                </div>

                <div className={`p-2 border rounded-none flex items-center gap-2 ${theme === 'dark' ? 'bg-zinc-950/90 border-zinc-850' : 'bg-white border-slate-200'}`}>
                  <Wind className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="text-[7.5px] text-zinc-500 block uppercase">{inst.windSpeed}</span>
                    <span className="font-bold text-[10px] truncate max-w-[90px] block">{activeMedia ? activeMedia.facts.wind : "26 km/h SSW"}</span>
                  </div>
                </div>

                <div className={`p-2 border rounded-none flex items-center gap-2 ${theme === 'dark' ? 'bg-zinc-950/90 border-zinc-850' : 'bg-white border-slate-200'}`}>
                  <CloudSnow className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="text-[7.5px] text-zinc-500 block uppercase">{inst.environmentalStatus}</span>
                    <span className="font-bold text-[9px] truncate max-w-[100px] block">{activeMedia ? activeMedia.facts.isolate : "Nível Moderado"}</span>
                  </div>
                </div>

                <div className={`p-2 border rounded-none flex items-center gap-2 ${theme === 'dark' ? 'bg-zinc-950/90 border-zinc-850' : 'bg-white border-slate-200'}`}>
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="text-[7.5px] text-zinc-500 block uppercase">{inst.crewActive}</span>
                    <span className="font-bold text-[10px] truncate max-w-[100px] block">{activeMedia ? activeMedia.facts.population : "12 Cientistas"}</span>
                  </div>
                </div>
              </div>

              <div className={`mt-3 border-t pt-2.5 flex items-center justify-between text-[8px] font-mono uppercase ${
                theme === 'dark' ? 'border-zinc-850 text-zinc-500' : 'border-slate-150 text-slate-500'
              }`}>
                <span>{inst.statusText}</span>
                <span className="text-cyan-400 text-[8.5px] font-bold tracking-widest">{activeMedia ? activeMedia.facts.status : "ONLINE • CRIPTO"}</span>
              </div>
            </div>

            {/* C. VISUAL PHOTO MATRIX FOR HOVERED/SELECTED POINT */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className={`text-[8.5px] font-mono uppercase tracking-widest block mb-2 select-none font-semibold ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-slate-450'
                }`}>
                  {inst.viewDocuments} ({photosToRender.length})
                </span>

                {photosToRender.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 select-none">
                    {photosToRender.map((url, idx) => (
                      <div
                        key={idx}
                        onClick={() => triggerLightbox(photosToRender, idx)}
                        className={`relative aspect-[3/2] overflow-hidden cursor-pointer group border ${
                          theme === 'dark' ? 'bg-zinc-950 border-zinc-850 hover:border-cyan-400' : 'bg-slate-100 border-slate-200 hover:border-cyan-600'
                        } transition-all duration-300`}
                      >
                        <img 
                          src={url} 
                          className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-300"
                          alt="Antarctic Fieldwork" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                          <span className="font-mono text-[9px] text-cyan-300 tracking-widest uppercase flex items-center gap-1 bg-black/60 px-2 py-0.5">
                            <Eye className="w-3.5 h-3.5" /> AMPLIAR
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`border p-6 text-center select-none ${
                    theme === 'dark' ? 'bg-zinc-950/40 border-zinc-850/40 text-zinc-500' : 'bg-slate-100/50 border-slate-200 text-slate-400'
                  }`}>
                    <ImageIcon className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    <span className="font-mono text-[9px] uppercase">Nenhuma fotografia disponível</span>
                  </div>
                )}

                {/* Navigation button to Operations page */}
                {onSelectOperations && !['m6', 'm7', 'm8'].includes(activeId) && (
                  <button
                    onClick={onSelectOperations}
                    className={`mt-3 w-full py-2 px-3 border font-mono text-[9px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-900/40 hover:border-cyan-400'
                        : 'border-cyan-200 bg-cyan-150 text-cyan-800 hover:bg-cyan-205 font-bold shadow-sm'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                    {language === 'BR' 
                      ? "Explorar Operações do SaúdeAntar nessa localização" 
                      : language === 'ES' 
                        ? "Explorar Campañas de SaludAntar en esta ubicación" 
                        : "Explore SaúdeAntar Operations at this location"}
                  </button>
                )}
              </div>

              {/* D. CONNECTED VIDEO NODE STREAM */}
              <div className="mt-4 select-none">
                <span className={`text-[8.5px] font-mono uppercase tracking-widest block mb-2 font-semibold ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-slate-450'
                }`}>
                  {inst.associatedMedia}
                </span>

                {activeMedia && activeMedia.videos.length > 0 ? (
                  <div className="space-y-1.5 select-none">
                    {activeMedia.videos.map((vid, index) => (
                      <div 
                        key={index}
                        onClick={() => onSelectVideo(vid.youtubeId)}
                        className={`flex items-center gap-3 p-2.5 border cursor-pointer hover:border-cyan-400 transition-colors ${
                          theme === 'dark' ? 'bg-zinc-950 border-zinc-850' : 'bg-white border-slate-205 shadow-sm'
                        }`}
                      >
                        {/* Play Action button */}
                        <div className="w-10 h-7 bg-red-600 flex items-center justify-center text-white relative shrink-0">
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span className="absolute bottom-0.5 right-0.5 font-mono text-[6.5px] bg-black/85 px-0.5">{vid.length}</span>
                        </div>
                        
                        <div className="truncate flex-1">
                          <h5 className="font-sans text-[10px] font-bold uppercase truncate tracking-tight">{vid.title}</h5>
                          <p className="font-mono text-[7.5px] text-zinc-400 mt-0.5 uppercase truncate font-semibold">SAÚDEANTAR CANAL DOCUMENTAL</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`border p-4 text-center select-none ${
                      theme === 'dark' ? 'bg-zinc-950/40 border-zinc-850/40 text-zinc-500' : 'bg-slate-100/50 border-slate-200 text-slate-400'
                  }`}>
                    <Video className="w-6 h-6 mx-auto mb-1.5 opacity-50" />
                    <span className="font-mono text-[9px] uppercase">Nenhum documentário indexado</span>
                  </div>
                )}
              </div>



            </div>

          </div>
        )}

      </div>

      {/* 3. LIGHTBOX SYSTEM VIEWER OVERLAY */}
      {isLightboxOpen && lightboxImages.length > 0 && (
        <div className={`fixed inset-0 z-50 flex flex-col justify-between p-4 md:p-8 select-none border animate-fade-in ${theme === 'dark' ? 'bg-black/98 border-zinc-900 text-zinc-100' : 'bg-stone-50/98 border-stone-200 text-stone-900'}`}>
          {/* Top light bar */}
          <div className="flex justify-between items-center z-10 bg-black/50 backdrop-blur px-6 py-4 border border-zinc-800/20 select-none">
            <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold">
              ANTARCTIC HIGH RESOLUTION VIEWPORT
            </span>
            <div className="flex items-center gap-6 select-none">
              <span className="font-mono text-xs text-white">
                IMAGE {lightboxIndex + 1} OF {lightboxImages.length}
              </span>
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className={`cursor-pointer px-3 py-1 border font-mono text-xs uppercase ${theme === 'dark' ? 'text-zinc-405 hover:text-white border-zinc-805 bg-zinc-950' : 'text-stone-705 hover:text-stone-905 border-stone-250 bg-white shadow-sm'}`}
              >
                <X className="w-4 h-4 inline mr-1" /> CLOSE
              </button>
            </div>
          </div>

          {/* Main viewport with arrow keys */}
          <div className="flex-1 flex items-center justify-between relative group py-8 max-w-7xl mx-auto w-full select-none">
            <button 
              onClick={prevSlide}
              className={`absolute left-4 z-20 w-12 h-12 border flex items-center justify-center transition-all cursor-pointer ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900' : 'border-stone-200 bg-white text-stone-700 hover:text-cyan-600 hover:bg-stone-100 shadow-sm'}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="w-full h-full flex items-center justify-center relative overflow-hidden px-12 select-none">
              <img 
                src={lightboxImages[lightboxIndex]} 
                className="max-h-[75vh] max-w-full object-contain brightness-95 scale-95 md:scale-100 transition-all duration-700 shadow-2xl" 
                alt="Antarctic Fieldwork Viewport" 
                referrerPolicy="no-referrer"
              />
            </div>

            <button 
              onClick={nextSlide}
              className={`absolute right-4 z-20 w-12 h-12 border flex items-center justify-center transition-all cursor-pointer ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900' : 'border-stone-200 bg-white text-stone-700 hover:text-cyan-600 hover:bg-stone-100 shadow-sm'}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Footer informational band */}
          <div className={`text-center font-mono text-[10px] uppercase tracking-widest z-10 py-2 select-none ${theme === 'dark' ? 'text-zinc-500' : 'text-stone-500'}`}>
            Use Left / Right arrow keys to navigate the collection. HEALTHANTAR-IA COGNITIVE ATTAINED.
          </div>
        </div>
      )}

    </div>
  );
}
