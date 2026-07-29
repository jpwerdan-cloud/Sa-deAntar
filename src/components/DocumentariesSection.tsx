import React, { useState } from 'react';
import { Play, Info, ChevronRight, Star, Heart, Clock, Award, Flame, Search, Grid, List, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';

export interface Documentary {
  id: string;
  youtubeId: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  duration: string;
  year: number;
  category: string;
  rating: string;
  views: string;
  match: string;
  tags: string[];
  trending: boolean;
  director: string;
}

export const DOCUMENTARIES_DATA: Documentary[] = [
  {
    id: "doc1",
    youtubeId: "cTQ3Ko9ZKg8",
    title: {
      BR: "Our Planet | Frozen Worlds",
      EN: "Our Planet | Frozen Worlds",
      ES: "Our Planet | Frozen Worlds"
    },
    description: {
      BR: "Vítimas das impiedosas consequências das mudanças climáticas, baleias, leões-marinhos, focas e pinguins veem seus paraísos de gelo em perigo.",
      EN: "Victims of the ruthless consequences of climate change, whales, sea lions, seals, and penguins see their icy paradises in danger.",
      ES: "Víctimas de las despiadadas consecuencias del cambio climático, ballenas, leones marinos, focas y pingüinos ven sus paraísos de hielo en peligro."
    },
    duration: "48 min",
    year: 2019,
    category: "Ciência & Clima",
    rating: "9.9",
    views: "520k",
    match: "99% Match",
    tags: ["Mudanças Climáticas", "Fauna Polar", "Nossos Tempos"],
    trending: true,
    director: "Alastair Fothergill"
  },
  {
    id: "doc2",
    youtubeId: "RJHrdAWxc50",
    title: {
      BR: "ANTÁRTIDA - Segredos do Fim do Mundo",
      EN: "ANTÁRTIDA - Segredos do Fim do Mundo",
      ES: "ANTÁRTIDA - Segredos do Fim do Mundo"
    },
    description: {
      BR: "Documentário épico que revela os segredos e mistérios do continente mais gelado e inóspito do planeta. Neste filme completo, você vai explorar a vida extraordinária de animais icônicos como o Pinguim Imperador, Pinguim Rei, Pinguim-gentoo, Foca-leopardo, Orca, Baleia-azul, Elefante-marinho, e muitos outros. A Antártica é um lugar onde a natureza mostra sua força e resiliência, e cada cena nos leva a uma jornada fascinante pelo último continente selvagem da Terra.\nCom paisagens deslumbrantes e narrativas envolventes, este documentário apresenta os desafios enfrentados por essas incríveis criaturas, adaptadas para sobreviver nas condições mais extremas. Acompanhe a luta pela sobrevivência em um dos ecossistemas mais ameaçados pelas mudanças climáticas, e descubra como a biodiversidade continua a florescer no reino do gelo.\nSe você ama documentários sobre a natureza, exploração da vida selvagem, e histórias de resiliência, este vídeo é para você. Assista agora e se surpreenda com a beleza da Antártida e seus habitantes.",
      EN: "Documentary revealing secrets and mysteries of the coldest, most inhospitable continent. Explore adaptations and struggles of iconic creatures like the Emperor Penguin, Leopard Seal, Orca, and Blue Whale in an ecosystem vulnerable to global climate shifts.",
      ES: "Documental que revela secretos y misterios del continente más frío e inhóspito. Explora las adaptaciones y luchas de criaturas icónicas como el pingüino emperador, foca leopardo, orca y ballena azul en un ecosistema vulnerable al cambio climático."
    },
    duration: "54 min",
    year: 2024,
    category: "Fauna & Ecossistemas",
    rating: "9.8",
    views: "385k",
    match: "97% Match",
    tags: ["Pinguins", "Biodiversidade", "Resiliência"],
    trending: true,
    director: "Werdan Filmes"
  },
  {
    id: "doc3",
    youtubeId: "OuStNY2gzGM",
    title: {
      BR: "O Continente Oculto Que Pode Guardar As Reais Origens Da Terra",
      EN: "O Continente Oculto Que Pode Guardar As Reais Origens Da Terra",
      ES: "O Continente Oculto Que Pode Guardar As Reais Origens Da Terra"
    },
    description: {
      BR: "A Antártica é geralmente descrita como vazia, congelada e sem vida. Essa imagem mal arranha a superfície. Além das tempestades e do horizonte branco, encontra-se um continente cheio de perguntas sem resposta — um lugar onde o tempo parece suspenso, onde a mudança acontece, mas raramente é vista, e onde o silêncio esconde mais do que revela.\n\nSeu vasto interior permanece fechado para quase todos. Regiões inteiras são marcadas como restritas, estações antigas estão abandonadas sem explicação, linhas costeiras mudam de maneiras que não correspondem aos mapas, e vastas áreas parecem intocadas, mas alteradas. O que sobrevive aqui parece ancestral, não apenas na idade, mas no caráter, como se a terra carregasse memórias mais antigas do que qualquer registro que possuímos.\n\nA Antártica não é apenas hostil — ela é guardada. Ela protege segredos no seu gelo, nas suas montanhas e nas histórias que nunca foram escritas, mas que ainda ecoam através do seu vazio. Quanto mais se explora, mais claro se torna que este continente não apenas perdura — ele oculta, resiste e supera a interpretação.\n\nEsta é a Antártica da qual raramente se fala: silenciosa, enigmática e cheia de vestígios de algo que o mundo escolheu não confrontar.",
      EN: "Antarctica is usually described as frozen and empty, but deep below lies a land of unanswered questions. Ancient coastlines, secret mapping shifts, restrict zones, and historic echoes reveal a resilient continent that hides its memories from human interpretation.",
      ES: "La Antártida se describe usualmente como vacía y helada, pero en su profundidad yace una tierra llena de misterios. Antiguas costas, zonas restringidas e historias no escritas sugieren recuerdos ocultos de nuestro planeta."
    },
    duration: "48 min",
    year: 2025,
    category: "Mistérios Polares",
    rating: "9.7",
    views: "410k",
    match: "96% Match",
    tags: ["Origens", "Geologia", "Enigmas"],
    trending: true,
    director: "Origins Channel"
  },
  {
    id: "doc4",
    youtubeId: "qSc4zeaLXvE",
    title: {
      BR: "Unseen Vostok Station - exploring the Vostok Station hidden secrets",
      EN: "Unseen Vostok Station - exploring the Vostok Station hidden secrets",
      ES: "Unseen Vostok Station - exploring the Vostok Station hidden secrets"
    },
    description: {
      BR: "Estação Vostok Inédita – Embarque em uma jornada cinematográfica única para explorar a Estação Vostok, a fronteira mais fria e remota da Terra. Nesta exploração, mergulhamos nos segredos ocultos de um lugar que permaneceu praticamente intocado e escondido dos olhos humanos por séculos.\n\nFilmado em impressionante 8K HDR, esta aventura leva você ao coração da Estação Vostok, localizada sob as espessas camadas de gelo da Antártica. Aqui, geleiras ancestrais, vastos campos de gelo e paisagens inexploradas aguardam para serem descobertos. O lugar mais inóspito da Terra guarda mais do que apenas gelo — ele oculta segredos perdidos, vida selvagem nunca vista e fenômenos misteriosos que desafiam tudo o que sabemos sobre o nosso planeta.\n\nNesta jornada emocionante, você descobrirá:\n✔️ A natureza selvagem intocada da Estação Vostok, lar de geleiras ancestrais e paisagens inexploradas.\n✔️ Ecossistemas ocultos que se adaptaram para sobrevivir ao frio extremo.\n✔️ Formações de gelo misteriosas e vida selvagem peculiar que prosperam nas condições mais extremas.\n✔️ Segredos ancestrais e ruínas há muito esquecidas, enterradas sob o gelo.\n\nEsses mundos ocultos da Estação Vostok permaneceram escondidos por séculos, mas agora é hora de revelar a beleza e o mistério dessa fronteira congelada.",
      EN: "Unseen Vostok Station – Embark on a unique cinematic journey in pristine 8K HDR. Under meters of ancient ice lay untouched subglacial ecosystems, extreme structures, and geological mysteries that rewrite terrestrial history.",
      ES: "Estación Vostok Inédita – Embárcate en una aventura cinematográfica única en 8K HDR. Bajo metros de hielo profundo yacen ecosistemas subglaciales intactos, glaciares antiguos y misterios terrestres."
    },
    duration: "45 min",
    year: 2024,
    category: "Expedições",
    rating: "9.9",
    views: "340k",
    match: "98% Match",
    tags: ["Vostok", "Gelo Subglacial", "Fronteira Extrema"],
    trending: true,
    director: "Vostok Explorers"
  },
  {
    id: "doc5",
    youtubeId: "YtAL8y2lACs",
    title: {
      BR: "Storming Antarctica (Full Episode) | Continent 7: Antarctica",
      EN: "Storming Antarctica (Full Episode) | Continent 7: Antarctica",
      ES: "Storming Antarctica (Full Episode) | Continent 7: Antarctica"
    },
    description: {
      BR: "Acompanhe cientistas e exploradores enfrentando tempestades extremas em Continent 7, a série de documentários definitiva da National Geographic mostrando os desafios brutais da vida e logística polar.",
      EN: "Follow scientists and adventurers facing historic storms in National Geographic's Continent 7 series, featuring live logistical runs, winterizations, and deep science projects.",
      ES: "Acompaña a científicos y exploradores enfrentando tormentas históricas en la serie Continent 7 de National Geographic, mostrando logística pesada y ciencia avanzada."
    },
    duration: "44 min",
    year: 2017,
    category: "Expedições",
    rating: "9.5",
    views: "154k",
    match: "93% Match",
    tags: ["Storming", "Antarctica", "Sobrevivência"],
    trending: false,
    director: "National Geographic"
  },
  {
    id: "doc6",
    youtubeId: "B8JemnPuBfU",
    title: {
      BR: "ANTÁRTICA | Vida Selvagem no Fim do Mundo | Documentários animais",
      EN: "ANTÁRTICA | Vida Selvagem no Fim do Mundo | Documentários animais",
      ES: "ANTÁRTICA | Vida Selvagem no Fim do Mundo | Documentários animais"
    },
    description: {
      BR: "Um registro extraordinário e imersivo sobre a flora e a abundante fauna que habitam o oceano austral e o litoral congelado da Antártica, com foco nas colônias selvagens de reprodução e animais icônicos.",
      EN: "An extraordinary immersive view into polar wildlife, capturing penguins, seals, whales, and microscopic marvels thriving throughout the sub-zero Southern Ocean ecosystems.",
      ES: "Una vista inmersiva y extraordinaria de la fauna polar, capturando pingüinos, focas, ballenas y maravillas microscópicas prosperando en los ecosistemas helados del océano."
    },
    duration: "52 min",
    year: 2021,
    category: "Fauna & Ecossistemas",
    rating: "9.6",
    views: "210k",
    match: "95% Match",
    tags: ["Vida Selvagem", "Oceano Austral", "Orcas"],
    trending: false,
    director: "Nature Archives"
  },
  {
    id: "doc7",
    youtubeId: "e2ovOlGkyVs",
    title: {
      BR: "Antártica, o lugar mais incrível da Terra",
      EN: "Antártica, o lugar mais incrível da Terra",
      ES: "Antártica, o lugar mais incrível da Terra"
    },
    description: {
      BR: "Um documentário revelador sobre as belezas naturais, o gelo eterno e a incrível sensação de pisar e pesquisar no continente antártico, o lugar mais misterioso e deslumbrante de nosso planeta.",
      EN: "A magnificent documentary detailing the absolute wonder, geographic majesty, and research adventures on the grand ice dome of Antarctica.",
      ES: "Un magnífico documental que detalla la maravilla absoluta, la majestuosidad geográfica y las aventuras de investigación en la gran cúpula de hielo de la Antártida."
    },
    duration: "41 min",
    year: 2022,
    category: "Mistérios Polares",
    rating: "9.4",
    views: "180k",
    match: "94% Match",
    tags: ["Gelo Eterno", "Incrível", "Geografia Maravilhosa"],
    trending: false,
    director: "Território Selvagem"
  },
  {
    id: "doc8",
    youtubeId: "auIVuBBv88Q?start=1032",
    title: {
      BR: "A Transformação Extrema do Último Refúgio Congelado",
      EN: "The Extreme Transformation of the Last Frozen Refuge",
      ES: "La Transformación Extrema del Último Refugio Congelado"
    },
    description: {
      BR: "Neste episódio intitulado \"UM ANO NA ANTÁRTICA | A Transformação Extrema do Último Refúgio Congelado - Documentário sobre Animais Selvagens\", exploramos as estações do ano no continente mais inóspito e remoto do planeta, onde a vida desafia o impossível. A Antártida, com suas planícies de gelo infinitas, tempestades brutais e temperaturas que podem cair abaixo de -60°C, também é o cenário de um dos ciclos mais surpreendentes do reino animal.\n\nJunte-se a nós neste documentário sobre animais selvagens para descobrir como espécies como o pinguim-imperador, a foca-de-Weddell, o petrel-da-antártida, o krill e as orcas sobrevivem ao inverno mais rigoroso do planeta e aproveitam a breve chegada do verão para se alimentar, reproduzir e continuar vivendo neste refúgio gelado. Cada estação traz consigo uma mudança radical que transforma o continente e testa seus habitantes.",
      EN: "In this episode titled \"A YEAR IN ANTARCTICA | The Extreme Transformation of the Last Frozen Refuge - Wildlife Documentary\", we explore the seasons in the most inhospitable and remote continent on the planet, where life defies the impossible. Antarctica, with its endless ice plains, brutal storms, and temperatures that can drop below -60°C, is also the setting for one of the most surprising cycles in the animal kingdom.\n\nJoin us in this wildlife documentary to discover how species like the emperor penguin, Weddell seal, Antarctic petrel, krill, and orcas survive the planet's harshest winter and take advantage of the short arrival of summer to feed, reproduce, and continue living in this frozen refuge. Each season brings a radical change that transforms the continent and tests its inhabitants.",
      ES: "En este episodio titulado \"UN AÑO EN LA ANTÁRTIDA | La Transformación Extrema del Último Refugio Congelado - Documental de Vida Silvestre\", exploramos las estaciones en el continente más inhóspito y remoto del planeta, donde la vida desafía lo imposible. La Antártida, con sus infinitas llanuras de hielo, tormentas brutales y temperaturas que pueden caer por debajo de los -60°C, es también el escenario de uno de los ciclos más sorprendentes del reino animal.\n\nÚnase a nosotros en este documental de vida silvestre para descubrir cómo especies como el pingüino emperador, la foca de Weddell, el petrel antártico, el krill y las orcas sobreviven al invierno más riguroso de la Tierra y aprovechan la breve llegada del verano para alimentarse, reproducirse y seguir viviendo en este refugio helado. Cada estación trae consigo un cambio radical que transforma el continente y desafía a sus habitantes."
    },
    duration: "1h 22min",
    year: 2024,
    category: "Fauna & Ecossistemas",
    rating: "9.9",
    views: "520k",
    match: "99% Match",
    tags: ["Antártica", "Fauna", "Sobrevivência", "Inverno Extremo"],
    trending: true,
    director: "Wildlife Channels"
  }
];

interface DocumentariesSectionProps {
  language: Language;
  onSelectVideo: (videoItem: any) => void;
  theme: string;
}

export function DocumentariesSection({ language, onSelectVideo, theme }: DocumentariesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'netflix' | 'grid'>('netflix');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // The main/featured billboard video must be cTQ3Ko9ZKg8 (Our Planet | Frozen Worlds) when opening the tab
  const billboardDoc = DOCUMENTARIES_DATA.find(d => d.youtubeId.split('?')[0] === 'cTQ3Ko9ZKg8') || DOCUMENTARIES_DATA[0];

  const categories = ['All', 'Expedições', 'Fauna & Ecossistemas', 'Mistérios Polares', 'Ciência & Clima'];

  const filteredDocs = DOCUMENTARIES_DATA.filter(doc => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const lowerQuery = searchQuery.toLowerCase();
    const matchesSearch = 
      doc.title[language].toLowerCase().includes(lowerQuery) ||
      doc.description[language].toLowerCase().includes(lowerQuery) ||
      doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      doc.category.toLowerCase().includes(lowerQuery);
    return matchesCat && matchesSearch;
  });

  const getThumbnail = (youtubeId: string) => {
    const cleanId = youtubeId.split('?')[0];
    return `https://img.youtube.com/vi/${cleanId}/maxresdefault.jpg`;
  };

  const trendingDocs = DOCUMENTARIES_DATA.filter(d => d.trending);
  const otherDocs = DOCUMENTARIES_DATA.filter(d => !d.trending);

  const watchVideo = (doc: Documentary) => {
    // Construct video object expected by App's player modal
    const cleanId = doc.youtubeId.split('?')[0];
    const videoObj = {
      id: doc.id,
      youtubeId: doc.youtubeId,
      title: doc.title,
      description: doc.description,
      duration: doc.duration,
      operation: 44,
      subcategory: doc.category as any,
      tags: doc.tags,
      director: doc.director,
      year: doc.year,
      thumbnail: `https://img.youtube.com/vi/${cleanId}/hqdefault.jpg`,
      isFilm: true
    };
    onSelectVideo(videoObj);
  };

  return (
    <div className="relative text-white min-h-screen bg-zinc-950 pb-20 select-none">
      {/* GLOW ATMOSPHERE */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-cyan-950/15 via-zinc-950/20 to-transparent pointer-events-none" />

      {/* 1. CINEMATIC BILLBOARD HERO BANNER (NETFLIX STYLE) */}
      <div className="relative w-full h-[65vh] min-h-[450px] max-h-[700px] overflow-hidden bg-black flex items-end">
        <div className="absolute inset-0 z-0">
          <img 
            src={getThumbnail(billboardDoc.youtubeId)} 
            alt={billboardDoc.title[language]} 
            className="w-full h-full object-cover opacity-60 scale-105 filter brightness-[0.7] transition-all duration-[10s] hover:scale-100"
          />
          {/* NETFLIX-LIKE CORNER SHADOW GRADIANT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-black/30" />
          <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-zinc-950/80 via-zinc-950/20 to-transparent" />
        </div>

        {/* Hero Meta Description Info */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-10 md:pb-16 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 text-[9px] font-semibold tracking-wider font-mono">
              {billboardDoc.match}
            </span>
            <span className="text-zinc-400 text-xs font-mono">{billboardDoc.year}</span>
            <span className="border border-zinc-600 text-zinc-300 text-[10px] px-1 font-semibold rounded-xs">4K ULTRA HD</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-2xl mb-4 font-sans drop-shadow-xl">
            {billboardDoc.title[language]}
          </h1>

          <p className="text-sm md:text-base text-zinc-300 max-w-2xl mb-6 font-normal leading-relaxed drop-shadow-md">
            {billboardDoc.description[language]}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => watchVideo(billboardDoc)}
              className="flex items-center gap-2.5 bg-white text-black hover:bg-cyan-400 hover:text-black transition-all px-7 py-3 font-semibold text-xs uppercase tracking-widest cursor-pointer shadow-lg active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              {language === 'BR' ? 'Assistir Agora' : language === 'ES' ? 'Ver Ahora' : 'Watch Now'}
            </button>
          </div>
        </div>

      </div>

      {/* 2. LIVE NAVIGATION & SEARCH CONTROLS */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="border-b border-zinc-900 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Categories Horizontal scroll tab lists */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 font-mono text-[9.5px] uppercase tracking-wider rounded-xs border transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold'
                    : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat === 'All' ? (language === 'BR' ? 'Todos' : cat) : cat}
              </button>
            ))}
          </div>

          {/* Quick Search & Layout Switcher */}
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            <div className="flex items-center bg-zinc-900/60 border border-zinc-800 px-3 py-1.5 gap-2 w-full max-w-xs rounded-sm">
              <Search className="w-3.5 h-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder={language === 'BR' ? "Buscar documentários..." : "Search docs..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs outline-none w-full font-mono text-zinc-300"
              />
            </div>
            
            <div className="flex items-center gap-1 border border-zinc-800 p-0.5 rounded-sm shrink-0 bg-zinc-900/20">
              <button 
                onClick={() => setViewMode('netflix')} 
                className={`p-1.5 rounded-xs transition-colors cursor-pointer ${viewMode === 'netflix' ? 'bg-cyan-950 text-cyan-300' : 'text-zinc-500 hover:text-zinc-300'}`}
                title="Profile"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-1.5 rounded-xs transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-cyan-950 text-cyan-300' : 'text-zinc-500 hover:text-zinc-300'}`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. DYNAMIC CONTENT RENDERING GRID OR ROW CAROUSEL */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        {filteredDocs.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 bg-zinc-950/50">
            <Info className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base text-zinc-400 font-mono">
              {language === 'BR' ? "Nenhum documentário polar encontrado" : "No polar documentaries found"}
            </h3>
            <p className="text-xs text-zinc-600 font-mono mt-1">
              {language === 'BR' ? "Tente reajustar seu termo de pesquisa ou trocar de categoria." : "Try resetting your filters or search term."}
            </p>
          </div>
        ) : viewMode === 'netflix' && selectedCategory === 'All' ? (
          
          /* NETFLIX STREAMING EXPERIENCE (CATEGORIZED ROWS WITH HEROES) */
          <div className="space-y-12">
            
            {/* ROW 1: EM ALTA (TRENDING POLAR DOCS) */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-4 h-4 text-red-500 fill-current" />
                <h2 className="text-lg md:text-xl font-bold tracking-tight uppercase flex items-center gap-1 font-sans">
                  {language === 'BR' ? 'Recomendados para Você' : language === 'ES' ? 'Recomendaciones' : 'Trending Now'} 
                  <span className="text-cyan-400 font-mono text-[10px] tracking-normal font-normal ml-3">({trendingDocs.length})</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onMouseEnter={() => setHoveredId(doc.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => watchVideo(doc)}
                    className="group relative bg-[#141414] border border-zinc-900 cursor-pointer overflow-hidden transition-all duration-300 hover:border-cyan-400"
                  >
                    <div className="aspect-video relative overflow-hidden bg-black">
                      <img 
                        src={getThumbnail(doc.youtubeId)} 
                        alt={doc.title[language]} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-[9px] font-mono text-cyan-300 px-1.5 py-0.5 border border-zinc-850">
                        {doc.duration}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-cyan-500 text-black rounded-full p-1.5 shadow-lg">
                            <Play className="w-3 h-3 fill-current" />
                          </span>
                          <span className="text-[10px] font-semibold text-white drop-shadow-md">{doc.views} views</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-yellow-400">
                          <Star className="w-3 h-3 fill-current" /> {doc.rating}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-1.5 font-mono text-[9px] mb-1">
                        <span className="text-cyan-400 uppercase font-semibold">{doc.category}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400">{doc.year}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-red-400 font-bold">{doc.match}</span>
                      </div>
                      <h3 className="text-xs md:text-sm font-semibold tracking-tight text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {doc.title[language]}
                      </h3>
                      <p className="text-[11px] text-zinc-400 leading-normal line-clamp-2 mt-1.5">
                        {doc.description[language]}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-1 mt-3">
                        {doc.tags.map((tag, idx) => (
                          <span key={idx} className="text-[8.5px] font-mono bg-zinc-900 border border-zinc-850 text-zinc-500 px-1.5 py-0.2 rounded-xs">
                            #{tag.toLowerCase()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* RED STROKE DYNAMIC BRAND */}
                    <div className="absolute top-0 left-0 w-1 bg-red-600 h-0 group-hover:h-full transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: ORIGINAIS DA CIÊNCIA POLAR (OTHER DISCOVERIES) */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-emerald-400" />
                <h2 className="text-lg md:text-xl font-bold tracking-tight uppercase flex items-center gap-1 font-sans">
                  {language === 'BR' ? 'Catálogo de Filmes Livres' : language === 'ES' ? 'Catálogo Completo' : 'SaúdeAntar Originals Catalog'} 
                  <span className="text-cyan-400 font-mono text-[10px] tracking-normal font-normal ml-3">({otherDocs.length})</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => watchVideo(doc)}
                    className="group bg-[#0e0e0e] border border-zinc-900/60 hover:border-cyan-500 cursor-pointer transition-all duration-300 p-4 rounded-xs"
                  >
                    <div className="relative aspect-video overflow-hidden bg-black mb-3">
                      <img 
                        src={getThumbnail(doc.youtubeId)} 
                        alt={doc.title[language]} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-102 transition-all duration-500"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-[8.5px] font-mono text-cyan-300 px-1.5 py-0.5 border border-zinc-800">
                        {doc.duration}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-mono mb-2 text-zinc-500">
                      <span className="text-emerald-400 font-bold uppercase">{doc.category}</span>
                      <span>{doc.year} • {doc.views} views</span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1 mb-2">
                      {doc.title[language]}
                    </h3>

                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {doc.description[language]}
                    </p>

                    <div className="flex items-center justify-between border-t border-zinc-900 pt-3 text-[10px] text-zinc-500">
                      <span className="font-mono text-[9px]">{doc.director}</span>
                      <span className="flex items-center gap-0.5 text-yellow-400 font-bold">
                        <Star className="w-3 h-3 fill-current" /> {doc.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          
          /* VIEW MODE - STANDARD GRID (OR CATEGORIZED SINGLE TAB GRID) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => watchVideo(doc)}
                className="group relative bg-[#0e0e0e] border border-zinc-950 rounded-xs overflow-hidden hover:border-cyan-400 hover:-translate-y-1 transition-all duration-350 cursor-pointer p-4 shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden bg-black mb-3">
                  <img 
                    src={getThumbnail(doc.youtubeId)} 
                    alt={doc.title[language]} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-cyan-400 border border-zinc-800">
                    {doc.duration}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] font-mono mb-2 text-zinc-500">
                  <span className="text-cyan-400 font-bold uppercase">{doc.category}</span>
                  <span>{doc.year} • {doc.views} views</span>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {doc.title[language]}
                </h3>

                <p className="text-xs text-zinc-400 line-clamp-3 mt-2 leading-relaxed">
                  {doc.description[language]}
                </p>

                <div className="flex items-center justify-between border-t border-zinc-900 pt-3 mt-4 text-[10px] text-zinc-500">
                  <span className="font-mono text-[9.5px]">{doc.director}</span>
                  <span className="flex items-center gap-0.5 text-yellow-400 font-mono">
                    <Star className="w-3 h-3 fill-current text-yellow-400" /> {doc.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>

        )}

      </div>
    </div>
  );
}
