import { GalleryItem, VideoItem, PublicationItem, InterviewItem, BlogItem, MapMarker } from './types';

export const TRANSLATIONS = {
  BR: {
    subtitle: "Memórias visuais, ciência e experiências pessoais nas missões antárticas brasileiras.",
    exploreOps: "Explorar Operações",
    interviewsBtn: "Iniciar Expedição",
    detailsBtn: "Detalhes do Manifesto",
    highlights: "Destaques",
    scientificProjects: "Projetos Científicos",
    interviewsTitle: "Entrevistas & Depoimentos",
    moviesTitle: "Lives",
    visualMemories: "Memórias Visuais",
    viewAll: "Ver Tudo",
    currentLocation: "Localização de Pesquisa",
    eacfLocation: "EACF - Ilha Rei George",
    navioLocation: "NPolar Almirante Maximiano",
    acampamentoLocation: "Península Byers, Ilha Livingston",
    decepcaoLocation: "Baía de Foster, Ilha Decepção",
    searchPlaceholder: "Buscar por fotos, vídeos, pesquisadores, tags...",
    aboutTitle: "Sobre o Projeto",
    aboutPara1: "O SaúdeAntar-ia é um hub documental, científico e memorialístico de alta sensibilidade dedicado a catalogar os reflexos biopsicossociais do confinamento antártico humano.",
    aboutPara2: "Sob a governança do Programa Antártico Brasileiro (SaúdeAntar), nossas expedições visam o monitoramento da resiliência, psicologia em ambientes ICE (Isolados, Confinados e Extremos), e dinâmica de enfrentamento (coping) vivenciadas por cientistas e militares na Estação de Apoio Comandante Ferraz (EACF), em acampamentos glaciares isolados e a bordo das embarcações polares.",
    metricsOps: "Operações Catalisadas",
    metricsInterviews: "Vivências Filmadas",
    metricsArchive: "Acervo Digital",
    metricsArticles: "Estudos Publicados",
    mapHeader: "Cartografia da Presença Humana",
    mapSub: "Interaja com os hotspots cartográficos das missões para visualizar relatórios, arquivos audiovisuais correlacionados e os diários de campo associados.",
    openAtlasBtn: "Focar Coordenadas",
    operationsTitle: "Catálogo de Operações",
    operationsSub: "Navegue pela linha cronológica do SaúdeAntar e estude o desenvolvimento físico e humano de cada missão.",
    noResults: "Nenhum resultado encontrado para os filtros selecionados.",
    allOps: "Todas Operações",
    allSubcats: "Todas Categorias",
    allMedia: "Todos Arquivos",
    publicationsTitle: "Arquivo Acadêmico",
    publicationsSub: "Produção científica indexada, dados psicométricos de coping, relatórios clínicos de medicina polar e teses de doutorado sobre o estresse polar.",
    doiLabel: "DOI Publicação",
    authorsLabel: "Pesquisadores Principais",
    downloadPdf: "Extrair PDF",
    interviewsSub: "Arquivos humanos e transcrições de narrativa livre capturando as reflexões existenciais e emocionais do confinamento subzero.",
    blogTitle: "Diários do Silêncio",
    blogSub: "Crônicas biológicas, relatos de bastidores, ensaios etnográficos e as nuances adaptativas do cotidiano polar.",
    contactTitle: "Entre em contato",
    contactSub: "",
    contactName: "Nome Completo",
    contactEmail: "Endereço de E-mail",
    contactSubject: "Assunto do Contato",
    contactMsg: "Mensagem",
    contactSend: "Transmitir Mensagem",
    shareTitle: "Compartilhar",
    copySuccess: "Link copiado para a área de transferência!",
    uploadSuccess: "Upload concluído! A imagem está sendo processada.",
    uploadBtn: "Enviar Nova Foto",
    uploadPlaceholder: "Arraste uma foto polar ou clique para selecionar",
    searchResultCount: "conteúdos encontrados",
    tagTitle: "Arquivo Temático",
    relatedDocs: "Documentações Relacionadas",
    metadataSheet: "Ficha Técnica Completa",
    closeBtn: "Fechar",
    nextVideo: "Autoplay: Próximo Vídeo em 5s",
    allRightsReserved: "Todos os direitos reservados à equipe SaúdeAntar-ia & SaúdeAntar.",
    footerText: "Pesquisa científica e preservação da memória humana nas condições de maior isolamento geográfico do planeta.",
    langSelect: "Idioma",
    themeToggle: "Alternar Luminosidade",
    navHome: "Início",
    navAbout: "Projeto",
    navOps: "Operações",
    navGallery: "Galeria",
    navVideos: "Lives",
    navPubs: "Artigos",
    navInterviews: "Entrevistas",
    navBlog: "Diário",
    navMap: "Cartografia",
    navContact: "Contato",
    unsupportedMap: "Ambiente Offline: Exibindo Cartografia Vetorial Imersiva"
  },
  EN: {
    subtitle: "Visual memories, scientific research, and human journeys during the Brazilian Antarctic missions.",
    exploreOps: "Explore Operations",
    interviewsBtn: "Initiate Expedition",
    detailsBtn: "Mission Manifesto",
    highlights: "Highlights",
    scientificProjects: "Scientific Endeavors",
    interviewsTitle: "Interviews & Testimonials",
    moviesTitle: "Lives",
    visualMemories: "Visual Ledger",
    viewAll: "View All",
    currentLocation: "Research Spot",
    eacfLocation: "EACF - King George Island",
    navioLocation: "Almirante Maximiano Research Vessel",
    acampamentoLocation: "Byers Peninsula, Livingston Island",
    decepcaoLocation: "Foster Bay, Deception Island",
    searchPlaceholder: "Search photos, documentaries, researchers, tags...",
    aboutTitle: "About the Project",
    aboutPara1: "SaúdeAntar-ia is an archival, scientific, and memorial hub dedicated to documenting the biopsychosocial impacts of polar wilderness confinement on human beings.",
    aboutPara2: "Under the administrative umbrella of the Brazilian Antarctic Program (SaúdeAntar), our scientific teams monitor biological adaptation, psychophysiology, and human coping strategies in ICE (Isolated, Confined, and Extreme) environments at the Comandante Ferraz Antarctic Station (EACF), field camps, and research vessels.",
    metricsOps: "Operations Documented",
    metricsInterviews: "Filmed Testimonials",
    metricsArchive: "Digital Assets",
    metricsArticles: "Published Papers",
    mapHeader: "Polar Cartography",
    mapSub: "Map of operations and bases. Interact with our cartographic hotspots to explore visual assets, technical specs, and clinical field diaries.",
    openAtlasBtn: "Focus Coordinates",
    operationsTitle: "Operations Directory",
    operationsSub: "Navigate through the timeline of SaúdeAntar expeditions and study the evolution of polar medicine and behavior.",
    noResults: "No archives found matching the selected filters.",
    allOps: "All Operations",
    allSubcats: "All Categories",
    allMedia: "All Outlets",
    publicationsTitle: "Academic Database",
    publicationsSub: "Peer-reviewed scientific articles, psychometric coping datasets, clinical polar medicine essays, and doctoral research.",
    doiLabel: "DOI Identifier",
    authorsLabel: "Principal Investigators",
    downloadPdf: "Download PDF",
    interviewsSub: "Human archives and raw vocal transcripts capturing deep psychological adaptation in sub-zero wilderness confinement.",
    blogTitle: "Chronicles of Silence",
    blogSub: "Ethnographic essays, operational behind-the-scenes, polar biology journals, and survival coping diaries.",
    contactTitle: "Antarctic Bridge",
    contactSub: "Get in touch with our scientific team or request access to clinical data registries.",
    contactName: "Full Name",
    contactEmail: "Email Address",
    contactSubject: "Subject",
    contactMsg: "Message / Clinical Query",
    contactSend: "Transmit Message",
    shareTitle: "Share",
    copySuccess: "Link copied to clipboard!",
    uploadSuccess: "Upload completed! Optimizing image cache.",
    uploadBtn: "Upload Polar Photo",
    uploadPlaceholder: "Drag a polar photo or click to browse",
    searchResultCount: "records found",
    tagTitle: "Thematic Ledger",
    relatedDocs: "Related Documents",
    metadataSheet: "Technical Blueprint",
    closeBtn: "Close",
    nextVideo: "Autoplay: Next Video in 5s",
    allRightsReserved: "All rights reserved. SaúdeAntar-ia & SaúdeAntar.",
    footerText: "Scientific research and preservation of human memory in the most geographically isolated conditions on earth.",
    langSelect: "Language",
    themeToggle: "Toggle Illumination",
    navHome: "Home",
    navAbout: "About",
    navOps: "Operations",
    navGallery: "Gallery",
    navVideos: "Lives",
    navPubs: "Papers",
    navInterviews: "Interviews",
    navBlog: "Journal",
    navMap: "Cartography",
    navContact: "Contact",
    unsupportedMap: "Local Sandbox Mode: Running Full Panoramic Vector Map"
  },
  ES: {
    subtitle: "Memorias visuales, ciencia e historias humanas en las misiones antárticas brasileñas.",
    exploreOps: "Explorar Operaciones",
    interviewsBtn: "Iniciar Expedición",
    detailsBtn: "Manifiesto Científico",
    highlights: "Destacados",
    scientificProjects: "Proyectos Científicos",
    interviewsTitle: "Entrevistas & Testimonios",
    moviesTitle: "Lives",
    visualMemories: "Archivo Visual",
    viewAll: "Ver Todo",
    currentLocation: "Punto de Investigación",
    eacfLocation: "EACF - Isla de Rey Jorge",
    navioLocation: "NPolar Almirante Maximiano",
    acampamentoLocation: "Península Byers, Isla Livingston",
    decepcaoLocation: "Bahía Foster, Isla Decepción",
    searchPlaceholder: "Buscar fotos, documentales, investigadores, etiquetas...",
    aboutTitle: "Sobre el Proyecto",
    aboutPara1: "SaúdeAntar-ia es un hub patrimonial, científico y de memoria histórica dedicado a registrar la adaptación biopsicosocial del ser humano al confinamiento antártico.",
    aboutPara2: "Bajo el cobijo del Programa Antártico Brasileño (SaúdeAntar), nuestros equipos estudian la psicología en entornos ICE (Aislados, Confinados y Extremos), la medicina polar y las estrategias de afrontamiento de investigadores en la Base Comandante Ferraz (EACF).",
    metricsOps: "Operaciones Documentadas",
    metricsInterviews: "Testimonial Gráfico",
    metricsArchive: "Memoria Digital",
    metricsArticles: "Artículos Científicos",
    mapHeader: "Cartografía de Presencia",
    mapSub: "Explore geográficamente cada punto de muestreo clínico, estaciones científicas y campamentos de exploradores bajo el frío polar.",
    openAtlasBtn: "Focalizar Coordenadas",
    operationsTitle: "Directorio de Operaciones",
    operationsSub: "Navegue por la cronología polar de SaúdeAntar y repase la resiliência y el comportamiento táctico extremo.",
    noResults: "No se encontraron materiales con los filtros configurados.",
    allOps: "Todas Operaciones",
    allSubcats: "Todas Categorías",
    allMedia: "Todos Canales",
    publicationsTitle: "Base Académica",
    publicationsSub: "Artículos científicos indexados, bases de datos psicométricas de afrontamiento e investigaciones detalladas sobre estrés glacial.",
    doiLabel: "DOI del Estudio",
    authorsLabel: "Investigadores Principales",
    downloadPdf: "Documento PDF",
    interviewsSub: "Archivos testimoniales y transcripciones íntimas de la conducta y la salud biopsicosocial en aislamiento gélido.",
    blogTitle: "Crónicas del Silencio",
    blogSub: "Ensayos etnográficos, diarios de adaptación humana, apuntes biológicos y psicología de misiones polares.",
    contactTitle: "Conexión Antártica",
    contactSub: "Consulte a nuestro personal científico sobre el registro clínico y los indicadores biológicos recolectados.",
    contactName: "Nombre Completo",
    contactEmail: "Correo Electrónico",
    contactSubject: "Asunto",
    contactMsg: "Mensaje / Consulta Clínica",
    contactSend: "Enviar Transmisión",
    shareTitle: "Compartir",
    copySuccess: "¡Enlace copiado al portapapeles!",
    uploadSuccess: "¡Archivo subido! Optimizando caché de píxeles.",
    uploadBtn: "Subir Foto Polar",
    uploadPlaceholder: "Arrastre una fotografía o haga clic para examinar",
    searchResultCount: "registros encontrados",
    tagTitle: "Archivo Temático",
    relatedDocs: "Documentos de Campo",
    metadataSheet: "Detalle Técnico Glacial",
    closeBtn: "Cerrar",
    nextVideo: "Autoplay: Siguiente Video en 5s",
    allRightsReserved: "Todos los derechos reservados. SaúdeAntar-ia & SaúdeAntar.",
    footerText: "Investigación científica y preservación de memorias humanas en condiciones extremas de aislamiento geográfico.",
    langSelect: "Idioma",
    themeToggle: "Alternar Luminisidad",
    navHome: "Inicio",
    navAbout: "Proyecto",
    navOps: "Operaciones",
    navGallery: "Galería",
    navVideos: "Lives",
    navPubs: "Artículos",
    navInterviews: "Entrevistas",
    navBlog: "Diarios",
    navMap: "Cartografía",
    navContact: "Contacto",
    unsupportedMap: "Plano Estático Multicapa: Cartografía Autocontenida de Navegación"
  }
};

export const GALLERY_ITEMS: GalleryItem[] = [];

export const VIDEO_ITEMS: VideoItem[] = [
  {
    id: 'v5',
    youtubeId: "L2HRu84c9g8",
    title: {
      BR: "Jairo Werner: Projeto SAÚDEANTAR-IA",
      EN: "Jairo Werner: Projeto SAÚDEANTAR-IA",
      ES: "Jairo Werner: Projeto SAÚDEANTAR-IA"
    },
    description: {
      BR: "Uma análise detalhada das trajetórias metodológicas e das dinâmicas biopsicossociais vividas no deserto gelado durante a Operação 44.",
      EN: "A highly informative review outlining the biopsychosocial dynamics and human coping of researchers in the frozen margins.",
      ES: "Un análisis pormenorizado del comportamiento humano, resiliencia grupal y salud mental bajo el frío extremo polar."
    },
    duration: "14:22",
    operation: 44,
    subcategory: "Rotina da missão",
    tags: ["saúde mental", "entrevista", "SaúdeAntar", "psicologia"],
    director: "João Paulo Werdan",
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/L2HRu84c9g8/hqdefault.jpg",
    isFilm: false
  },
  {
    id: 'v6',
    youtubeId: "_aIdn3IhijU",
    title: {
      BR: "SaúdeAntar: Evento da 1a Transmissão Holográfica de Telessaúde da Antártica ao Brasil",
      EN: "SaúdeAntar: Evento da 1a Transmissão Holográfica de Telessaúde da Antártica ao Brasil",
      ES: "SaúdeAntar: Evento da 1a Transmissão Holográfica de Telessaúde da Antártica ao Brasil"
    },
    description: {
      BR: "Live debatendo como o advento da internet de alta velocidade na EACF alterou o isolamento e os ritmos psíquicos.",
      EN: "Special stream debating how high-speed connectivity in modern bases has altered classical polar loneliness.",
      ES: "Mesa interactiva de debate científico sobre conectividad instantánea, soporte digital y resiliencia en la base."
    },
    duration: "45:10",
    operation: 44,
    subcategory: "EACF",
    tags: ["EACF", "saúde mental", "conectividade", "confinamento"],
    director: "João Paulo Werdan & Eliane G. da Silva",
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/_aIdn3IhijU/hqdefault.jpg",
    isFilm: false
  },
  {
    id: 'v7',
    youtubeId: "MSE-zN9AM4A",
    title: {
      BR: "Winterover: O Impacto Psicológico do Inverno Polar",
      EN: "Winterover: Psychological Impact of polar darkness",
      ES: "Winterover: El Impacto Psicológico del Invierno Polar"
    },
    description: {
      BR: "Discussão aprofundada sobre a vivência psicológica continuada durante os meses de confinamento sob as trevas climáticas e gelo.",
      EN: "Deep talk outlining extreme seasonal adaptation, hormonal spikes, and social support during wintering darkness.",
      ES: "Sesión científica abordando la clínica de la noche polar profunda, depresión estacional y adaptación."
    },
    duration: "52:15",
    operation: 43,
    subcategory: "Rotina da missão",
    tags: ["winterover", "saúde mental", "coping", "isolamento"],
    director: "Dr. Roberto Mendes",
    year: 2024,
    thumbnail: "https://img.youtube.com/vi/MSE-zN9AM4A/hqdefault.jpg",
    isFilm: false
  },
  {
    id: 'v8',
    youtubeId: "LqN1XSPcELI",
    title: {
      BR: "Estratégias de Cooperação e Coesão de Grupo na Antártica",
      EN: "Cooperative Strategies and Group Cohesion in Antarctica",
      ES: "Estrategias de Cooperación y Cohesión de Grupo en la Antártida"
    },
    description: {
      BR: "Transmissão sobre a co-construção do espírito de equipe, dinâmicas de apoio horizontal e liderança compassiva.",
      EN: "Live presentation sharing tips and metrics on group alignment and horizontal support in field camps.",
      ES: "Presentación de datos y dinámicas preventivas de salud grupal, camaradería y amortiguación interpersonal."
    },
    duration: "38:40",
    operation: 44,
    subcategory: "Acampamento",
    tags: ["coesão", "trabalho em equipe", "isolamento", "coping"],
    director: "Dra. Patricia Oliveira",
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/LqN1XSPcELI/hqdefault.jpg",
    isFilm: false
  },
  {
    id: 'v9',
    youtubeId: "pfc1bWnzatQ",
    title: {
      BR: "Estresse e Sono em Estações Científicas Antárticas",
      EN: "Stress & Sleep in Antarctic Scientific Stations",
      ES: "Estrés y Sueño en Estaciones Científicas Antárticas"
    },
    description: {
      BR: "Debate científico sobre como a perda de luz natural e o ruído da estação alteram o sono e geram estresse nos militares.",
      EN: "Focusing on physiological biomarkers, insomnia, and circadian rhythm preservation hacks at Comandante Ferraz.",
      ES: "Evaluación clínica de marcadores biológicos de estrés, sueño fragmentado y pautas de higiene de sueño."
    },
    duration: "41:05",
    operation: 42,
    subcategory: "EACF",
    tags: ["sono", "estresse", "fisiologia", "EACF"],
    director: "Dr. Lucas Carvalho",
    year: 2023,
    thumbnail: "https://img.youtube.com/vi/pfc1bWnzatQ/hqdefault.jpg",
    isFilm: false
  },
  {
    id: 'v10',
    youtubeId: "vu25zcQx6K4",
    title: {
      BR: "Adaptação Humana e Psicologia Ambiental em Climas Extremos",
      EN: "Human Adaptation and Environmental Psychology",
      ES: "Adaptación Humana y Psicología Ambiental en Climas Extremos"
    },
    description: {
      BR: "A relação íntima entre o espaço hostil e a resposta adaptativa neurológica dos participantes.",
      EN: "A highly structured lecture analyzing sensory patterns, extreme environmental conditions, and human endurance.",
      ES: "Conferencia magistral diseccionando patrones sensoriales y la plasticidad neural ante climas subzero extremos."
    },
    duration: "48:30",
    operation: 44,
    subcategory: "Rotina da missão",
    tags: ["adaptação", "psicologia ambiental", "extremo", "isolamento"],
    director: "João Paulo Werdan & Colaboradores",
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/vu25zcQx6K4/hqdefault.jpg",
    isFilm: false
  },
  {
    id: 'v11',
    youtubeId: "OWQeeJPuuFY",
    title: {
      BR: "Minhas Vivências na Antártica (I Seminário SaúdeAntar)",
      EN: "Minhas Vivências na Antártica (I Seminário SaúdeAntar)",
      ES: "Minhas Vivências na Antártica (I Seminário SaúdeAntar)"
    },
    description: {
      BR: "Estudos futuros integrando neurociência, psicologia espacial e biofeedback adaptado para futuras expedições interplanetárias.",
      EN: "How Antarctic confinement represents an analog setting for deep space exploration and future habitat medicine.",
      ES: "Un simposio proyectando la investigación polar como análogo espacial para viajes espaciales a Marte y la Luna."
    },
    duration: "59:20",
    operation: 44,
    subcategory: "EACF",
    tags: ["pesquisa", "futuro", "biopsicossocial", "ciência"],
    director: "João Paulo Werdan",
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/OWQeeJPuuFY/hqdefault.jpg",
    isFilm: false
  }
];

export const PUBLICATION_ITEMS: PublicationItem[] = [
  {
    id: 'pub1',
    title: {
      BR: "Clínica do Confinamento: Resiliência Emocional na Estação Comandante Ferraz",
      EN: "Confinement Clinics: Emotional Resilience at the Comandante Ferraz Antarctic Station",
      ES: "Clínica del Confinamiento: Resiliencia Emocional en la Estación Comandante Ferraz"
    },
    abstract: {
      BR: "Este ensaio avalia longitudinalmente o bem-estar mental e as variações hormonais em pesquisadores no decorrer do inverno antártico de 360 dias. Foram identificados mecanismos maduros de coping relacionados ao humor afetivo e suporte interpessoal estruturado.",
      EN: "A longitudinal study evaluating mental symptoms and hormonal shifts in researchers throughout the 360-day Antarctic wintering. Findings indicate advanced coping strategies and small group buffering systems are essential traits.",
      ES: "Estudio clínico longitudinal sobre los estados psicoafectivos y cortisol durante el invierno polar. Se documentan mecanismos de afrontamiento y amortiguación emocional para solventar el Síndrome de Winterover."
    },
    authors: ["Silva, A. C.", "Duarte, R. F.", "Mendes, C. B."],
    journal: "Clinical Polar Psychology",
    year: 2024,
    doi: "10.1016/j.actaastro.2024.12.001",
    tags: ["saúde mental", "coping", "EACF", "psicologia", "medicina polar"],
    pdfUrl: "#",
    category: {
      BR: "Psicologia em Ambientes ICE",
      EN: "ICE Environments Psychology",
      ES: "Psicología en Entornos ICE"
    }
  },
  {
    id: 'pub2',
    title: {
      BR: "Comportamento Humano em Missões Criofílicas: Estratégias Adaptativas no Drake",
      EN: "Human Behaviour Under Cryophilic Shifts: Adaptative Strategies on the Ocean Crossing",
      ES: "Conducta Humana en Misiones Criogénicas: Estilos Tácticos en el Drake"
    },
    abstract: {
      BR: "Investigação com militares do SaúdeAntar expostos a estressores agudos em ambiente marítimo. A regulação psicofisiológica correlaciona estabilidade de ritmo circadiano e rotinas de atividades físicas controladas no convés metálico.",
      EN: "An evaluation of naval soldiers facing severe marine stress factors during raw Antarctica passage. Successful cardiac regulation relates to structured sleep intervals and deck task rotations.",
      ES: "Análisis técnico de soldados expuestos a sobrecargas vestibulares y climáticas severas. El ajuste funcional se liga a la modulación del ritmo cardíaco y sueño pautado."
    },
    authors: ["Almeida, J. P.", "Torres, M. G.", "Ramos, A. R."],
    journal: "Military Extreme Medicine",
    year: 2023,
    doi: "10.1111/j.extreme.2023.01.045",
    tags: ["navio", "logística", "coping", "adaptação humana", "medicina polar"],
    pdfUrl: "#",
    category: {
      BR: "Fisiologia da Sobrevivência",
      EN: "Survival Physiology",
      ES: "Fisiología de la Supervivencia"
    }
  },
  {
    id: 'pub3',
    title: {
      BR: "Termorregulação e Saúde Mental em Acampamentos Isolados na Ilha Livingston",
      EN: "Thermoregulation and Mental Status in Deep Wilderness Camps on Livingston Island",
      ES: "Termorregulación y Psicología Clínica en Campamentos Extremos en Livingston"
    },
    abstract: {
      BR: "Mapeamento das interações psicOSSociais e estresse térmico em equipes geológicas isoladas em barracas volantes. Recomenda-se treinos de mediação cognitiva prévios ao embarque para blindar dinâmicas de discussões territoriais.",
      EN: "Mapping of community parameters and thermal discomfort ratios in geology crews utilizing temporary dome covers. Pre-departure behavioral cognitive preparation helps avoid high friction disputes under confined cold states.",
      ES: "Estudio de las interacciones grupales y confort calórico en tiendas de campaña portátiles. La preparación cognitiva previa al aislamiento mitiga querellas territoriales."
    },
    authors: ["Carvalho, E. S.", "Souza, D. S."],
    journal: "Journal of Polar Medicine and Survival Science",
    year: 2025,
    doi: "10.1002/polmed.2025.10928",
    tags: ["acampamento", "isolamento", "expedição", "saúde mental"],
    pdfUrl: "#",
    category: {
      BR: "Medicina de Expedições",
      EN: "Expedition Medicine",
      ES: "Medicina de Expediciones"
    }
  }
];

export const INTERVIEW_ITEMS: InterviewItem[] = [
  {
    id: 'int1',
    name: "Dra. Amanda Silva",
    role: {
      BR: "Neuropsicóloga e Pesquisadora de Ambientes ICE",
      EN: "Neuropsychologist and ICE Environments Researcher",
      ES: "Neuropsicóloga e investigadora de entornos ICE"
    },
    quote: {
      BR: "O gelo não quebra apenas a rocha; ele expõe as fraturas esquecidas de nossa própria mente. No confinamento absoluto, o silêncio grita por autocontrole.",
      EN: "The ice doesn't just split stone; it exposes the long-forgotten fractures of our own mind. In absolute confinement, the freeze forces deep introspection.",
      ES: "El hielo no solo rompe la roca; expone los quiebres íntimos olvidados de nuestra propia psique. Confinados al límite, el silencio es ensordecedor."
    },
    fullTranscript: {
      BR: "Passar 10 meses na Estação Comandante Ferraz exige reconfigurar tudo o que sabemos sobre interações sociais. Em nossa pesquisa preliminar da Operação 42, percebemos que o 'efeito do terceiro trimestre' não é um mito. Ele surge quando a metade do percurso é superada e o fim do isolamento ainda parece inalcancável. É ali que descobrimos as estratégias maduras de resiliência que o cérebro humano consegue acionar para estabilizar a mente.",
      EN: "Spending 10 consecutive months at EACF forces a total recalibration of human feedback. Throughout OP 42, we confirmed the 'third-quarter effect' is robustly real. It spikes when mid-adventure passes and home feels distant. But it's also where we trace the extraordinary adaptative pathways that the human cortex fires to preserve our stability.",
      ES: "Soportar diez meses continuos en EACF impone reconfigurar toda interacción social. En la Operación 42, confirmamos que el 'efecto del tercer trimestre' es sumamente real. Despunta cuando la mitad de la misión sucumbe y el fin de la campaña luce remoto. Pero allí es donde florece la formidable creatividad adaptativa que el cerebro activa."
    },
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600",
    operation: 42,
    duration: "08:45",
    youtubeId: "vGl_NMygP_0",
    tags: ["saúde mental", "coping", "entrevista", "EACF"],
    location: {
      BR: "EACF - Laboratório Mental",
      EN: "EACF - Mental Health Laboratory",
      ES: "EACF - Cabina de Medición"
    }
  },
  {
    id: 'int2',
    name: "Comte. Roberto Duarte",
    role: {
      BR: "Coordenador Logístico e Oficial Naval do Drake",
      EN: "Logistical Supervisor and Drake Naval Commander",
      ES: "Coordinador Logístico y Comandante Naval del Drake"
    },
    quote: {
      BR: "Na Antártica, a logística é a espinha dorsal que impede a tragédia física; a disciplina de equipe, a âncora que previne o pânico psicológico.",
      EN: "In Antarctica, coordination is the steel backbone preventing disaster; team discipline is the secure anchor preventing collapse.",
      ES: "En la Antártida, la logística es la columna metálica que frena la catástrofe; la disciplina grupal es el ancla que repele el pánico."
    },
    fullTranscript: {
      BR: "Eu naveguei nas tempestades mais severas do Estreito de Drake 15 vezes. A tripulação naval desenvolve uma simbiose operacional única. Se uma peça fraqueja, todo o ecossistema polar é afetado. Por isso focamos no treinamento preventivo e social do bando. O segredo principal para resistir às tormentas não está no aço do casco, mas no cuidado com a camaradagem interna dos marinheiros.",
      EN: "I navigated across Drake's savage currents over 15 distinct runs. The maritime force develops a profound communal codependency. If one hand experiences anxiety, the balance of the vessel is tested. Our preparation focuses strictly on the human fabric. Storm survival resides not on structural iron alloys, but on daily, quiet kindness.",
      ES: "Crucé las violentas aguas del Drake quince veces. La dotación naval desarrolla una simbiosis táctica insondable. Si un navegante desfallece, se resiente la nave entera. Así que diseñamos dinámicas de contención interna. El secreto no está en el blindaje de la quilla, sino en la compasión templada grupal."
    },
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600",
    operation: 40,
    duration: "06:12",
    youtubeId: "W0qfI8GisE0",
    tags: ["navio", "confinamento", "entrevista", "logística"],
    location: {
      BR: " NPolar Maximiano - Passadiço",
      EN: "Vessel Almirante Maximiano - Bridge",
      ES: "NPolar Almirante Maximiano - Puente de Mando"
    }
  },
  {
    id: 'int3',
    name: "João Paulo Werdan",
    role: {
      BR: "Pesquisador de Psicologia Polar e Biopsicossocial (UFRRJ)",
      EN: "Researcher in Polar & Biopsychosocial Psychology (UFRRJ)",
      ES: "Investigador de Psicología Polar y Biopsicosocial (UFRRJ)"
    },
    quote: {
      BR: "O verdadeiro desafio antártico não está no fustigar das neves, mas no gerenciar cooperativo dos afetos humanos e da solidão regida pelo silêncio.",
      EN: "The true Antarctic challenge is not the blasting of the snow, but the cooperative management of human affect and silence-governed solitude.",
      ES: "El auténtico reto antártico no reside en el embate de las nieves, sino en la gestión cooperativa de los afectos humanos y la soledad regida por el silencio."
    },
    fullTranscript: {
      BR: "Em nossa investigação longitudinal no SaúdeAntar durante a Operação 44, buscamos avaliar como os fatores psicossociais e as redes de apoio mitigam as sobrecargas mentais decorrentes do confinamento extremo. A introdução de canais modernos de comunicação aproximou as famílias, mas a estrutura elementar do suporte interno coletivo continua sendo o principal fator de proteção para estabilidade do grupo.",
      EN: "During our longitudinal work for SaúdeAntar in OP 44, we evaluated how psychosocial buffers and support networks protect participants. While digital technologies bring families closer, standard, face-to-face peer dynamics at the base remain the single most relevant protective barrier for group integrity.",
      ES: "Durante nuestra investigación longitudinal en SaúdeAntar en la Op 44, evaluamos cómo los amortiguadores psicosociales protegen a los exploradores. Aunque los canales digitales estrechen lazos, el soporte horizontal presencial sigue siendo la barrera de resiliencia más preponderante."
    },
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600",
    operation: 44,
    duration: "14:22",
    youtubeId: "L2HRu84c9g8",
    tags: ["saúde mental", "SaúdeAntar", "entrevista", "EACF"],
    location: {
      BR: "EACF - Laboratório Mental",
      EN: "EACF - Mental Health Laboratory",
      ES: "EACF - Cabina de Medición"
    }
  },
  {
    id: 'int4',
    name: "Dra. Eliane G. da Silva",
    role: {
      BR: "Pesquisadora de Saúde Pública e Cronobiologia Polar",
      EN: "Public Health & Polar Chronobiology Researcher",
      ES: "Investigadora en Salud Pública y Cronobiología Polar"
    },
    quote: {
      BR: "Regar a mente sob a escuridão estacional exige um olhar cuidadoso sobre o bem-estar comunitário e os ritmos do sono.",
      EN: "Watering the mind under seasonal darkness demands a careful eye on collective well-being and sleep hygiene.",
      ES: "Cuidar la psique bajo la penumbra estacional exige una mirada escrupulosa sobre el bienestar colectivo y los ritmos de sueño."
    },
    fullTranscript: {
      BR: "A conectividade moderna alterou como as pessoas gerenciam a distância. No entanto, ela também trouxe novos desafios para o sono e para o distanciamento reparador. Debater as rotinas na EACF esclarece que micro-hábitos e espaços coletivos compartilhados diminuem drasticamente os índices corporais de estresse agudo.",
      EN: "Recent connection speeds changed how researchers manage physical distance, but it also introduced novel tests for mental decompression and circadian alignment. Standardized schedules and communal rooms help maintain group health parameters in check.",
      ES: "La conectividad instantánea redefine la relación con la distancia. No obstante, instaura nuevos retos de sincronía circadiana y aislamiento reparador. Confeccionar rutinas estructuradas y ocio compartido desactiva el cortisol."
    },
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
    operation: 44,
    duration: "45:10",
    youtubeId: "_aIdn3IhijU",
    tags: ["sono", "conectividade", "entrevista", "EACF"],
    location: {
      BR: "EACF - Módulo de Conveniência",
      EN: "EACF - Leisure Module",
      ES: "EACF - Módulo de Descanso"
    }
  },
  {
    id: 'int5',
    name: "Dra. Patricia Oliveira",
    role: {
      BR: "Psicóloga de Campo e Pesquisadora Independente",
      EN: "Field Psychologist and Independent Polar Researcher",
      ES: "Psicóloga de Campo e Investigadora Independiente"
    },
    quote: {
      BR: "Nos acampamentos isolados, a solidariedade e a coesão mútua deixam de ser conceitos teóricos e tornam-se ferramentas puras de sobrevivência.",
      EN: "In isolated wilderness camps, team cohesion ceases to be a theory and becomes a literal tool of survival.",
      ES: "En los campamentos aislados, la cohesión mutua deja de ser teoría y deviene en una herramienta pura de supervivencia."
    },
    fullTranscript: {
      BR: "Viver em barracas rústicas por semanas longe da estação obriga o desenvolvimento de cooperação sem precedentes. Analisamos detalhadamente como a tolerância a pequenos atritos interpares determina as chances de sucesso de uma expedição científica móvel na Antártica.",
      EN: "Living in light shelters for months away from Comandante Ferraz forces outstanding levels of team focus. Our study outlines how daily, minor friction tolerance predicts scientific campaign outcomes under polar weather.",
      ES: "Habitar refugios temporales bajo tormentas continuas adiestra la tolerancia humana. Evaluamos cómo el microclima grupal y la amortiguación de pequeños ruidos de fricción blindan la vitalidad del grupo."
    },
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600",
    operation: 44,
    duration: "38:40",
    youtubeId: "LqN1XSPcELI",
    tags: ["acampamento", "coesão", "entrevista", "expedição"],
    location: {
      BR: "Península Byers - Acampamento Móvel",
      EN: "Byers Peninsula - Expedition Camp",
      ES: "Península Byers - Campamento Móvil"
    }
  },
  {
    id: 'int6',
    name: "Dr. Lucas Carvalho",
    role: {
      BR: "Fisiologista e Neurocientista do Sono",
      EN: "Physiologist and Sleep Neuroscientist",
      ES: "Fisiólogo y Neurocientífico del Sueño"
    },
    quote: {
      BR: "A desregulação do ritmo circadiano devido à ausência de fuso horário natural é um dos maiores gatilhos para fadiga cognitiva polar.",
      EN: "Circadian mismatch due to photoperiod absence represents a heavy driver for cognitive and operational fatigue.",
      ES: "La desincronización de ritmos circadianos por ausencia de fotoperíodo natural es el mayor gatilho de fatiga cognitiva."
    },
    fullTranscript: {
      BR: "Nossa meta foi documentar as respostas hormonais de melatonina e cortisol salivar em marinheiros de apoio durante as manobras logísticas de alta tensão. Os dados mostram que a estabilidade fisiológica é profundamente resguardada quando o bando se percebe emocionalmente acolhido.",
      EN: "We mapped sleep patterns and cortisol biomarkers in service personnel under stressful maritime transfers. The data verifies that physical fatigue indicators remain low when overall group emotional validation is high.",
      ES: "Mapeamos el sueño y biomarcadores salivares de marinos bajo transferencia de carga extrema. La fatiga física decrece significativamente cuando la sensación de seguridad psicológica es plena."
    },
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
    operation: 42,
    duration: "41:05",
    youtubeId: "pfc1bWnzatQ",
    tags: ["sono", "estresse", "entrevista", "fisiologia"],
    location: {
      BR: "Navio Oceanográfico Maximiano",
      EN: "Maximiano Ocean Vessel",
      ES: "Navio Oceanográfico Maximiano"
    }
  }
];

export const BLOG_ITEMS: BlogItem[] = [
  {
    id: 'post1',
    title: {
      BR: "A Psicologia do Gelo: Entendendo o Efeito do Terceiro Trimestre",
      EN: "Understanding the Third-Quarter Syndrome in Deep Polar Wintering",
      ES: "Comprendiendo la Psicología Glacial: El Fenómeno del Tercio Final"
    },
    excerpt: {
      BR: "Neste ensaio clínico, analisamos as dinâmicas comportamentais e as fases adaptativas do confinamento extremo na Antártica.",
      EN: "We evaluate the behavioral curves and survival strategies that keep polar scientists sane in extreme ice confinement.",
      ES: "Un análisis empírico sobre las etapas comportamentales reguladoras de los equipos que invernan en aislamiento absoluto."
    },
    content: {
      BR: "Nas primeiras semanas da missão polar, há uma euforia desmedida: a novidade da paisagem gelada, o prestígio científico e a aventura iminente dominam a consciência. O segundo estágio, marcado pelo início formal do inverno, impõe a rotina claustrofóbica. É, contudo, no 'terceiro trimestre' que a barreira psicológica é verdadeiramente testada. Nesse ponto crítico, as estratégias de coping focalizadas na regulação emocional e o relaxamento planejado são de extrema importância para blindar a sanidade da tripulação...",
      EN: "During the first month, euphoria prevails: the novelty of frozen architecture, the professional honors, and raw thrill spark high spirits. Stage two, the start of wintering darkness, brings heavy fatigue. But the ultimate test arises at the 'third quarter'. In this period, psychological coping focused on positive cognitive reframing and custom spatial limits are paramount to prevent collective cognitive fallout...",
      ES: "En el primer lapso prima la euforia gélida: la estampa polar, los laureles de investigación y el espíritu de aventura. El segundo tramo, la noche polar plena, infunde rutinas solemnes. Pero el momento crítico asesta en el 'tercer trimestre'. Es donde el coping focalizado en la descompresión y el microdinamismo grupal asumen el control vital..."
    },
    imageUrl: "https://images.unsplash.com/photo-1547190027-915998333755?q=80&w=800",
    author: "Dra. Amanda Silva",
    date: "2026-04-12",
    tags: ["saúde mental", "coping", "isolamento", "psicologia"],
    readTime: "7 min"
  },
  {
    id: 'post2',
    title: {
      BR: "Medicina do Drake: Sobrevivência sob Ondas de 12 Metros",
      EN: "Polar Naval Medicine: Coping and Survival under Huge Waves",
      ES: "Medicina de Drake: Sobrevivencia Biológica bajo Mareas Inclinadas"
    },
    excerpt: {
      BR: "Como a medicina preventiva e a psicologia militar blindam a tripulação naval nos piores oceanos da Terra.",
      EN: "How preventive clinics and tactical group support guard sailors from the world's most treacherous ocean storm systems.",
      ES: "Una perspectiva clínica de la robustez vestibular y el blindaje emocional de los marinos del SaúdeAntar."
    },
    content: {
      BR: "Cruzando a mítica Passagem de Drake, a biologia humana é submetida a sobrecargas intensas. Náuseas severas, labirintite momentânea e distúrbios de repouso reduzem a eficácia operacional do marinheiro. Sob a nossa supervisão, implementamos terapias combinadas de biofeedback cardiovascular, administração otimizada de cinetose farmacológica e suporte relacional focado para converter a fadiga em orgulho profissional e adaptabilidade...",
      EN: "Crossing the Drake Passage puts our biology under incredible sensory demands. Severe seasickness, sleep fragmentation, and vestibular stress deplete human cognitive performance. Our teams address this by coupling pharmacological remedies with progressive cardiac biofeedback, turning primal fear into structured teamwork...",
      ES: "Navegar las aguas de Drake acarrea disturbios sensoriales colosais. El mareo por marejada, desregulación de sueño y estrés vestibular minan el foco del explorador. Atenuamos este estrago acoplando fármacos de vanguardia con biofeedback cardiovascular y respiración pautada..."
    },
    imageUrl: "https://images.unsplash.com/photo-1506443306124-77ae348f9565?q=80&w=800",
    author: "Dr. Carlos Mendes",
    date: "2026-05-01",
    tags: ["navio", "medicina polar", "tempestade", "confinamento"],
    readTime: "5 min"
  }
];

export const MAP_MARKERS: MapMarker[] = [
  {
    id: 'm1',
    title: {
      BR: "Estação de Apoio Comandante Ferraz (EACF)",
      EN: "Comandante Ferraz Research Station (EACF)",
      ES: "Estación Científica Comandante Ferraz (EACF)"
    },
    lat: -62.0833,
    lng: -58.3833,
    type: 'base',
    operation: 42,
    associatedPhotos: ['ph1', 'ph4', 'ph5'],
    associatedVideos: ['v6', 'v11'],
    associatedPublications: ['pub1']
  },
  {
    id: 'm2',
    title: {
      BR: "NPolar Almirante Maximiano (Em Rota)",
      EN: "Almirante Maximiano Research Vessel (In Route)",
      ES: "NPolar Almirante Maximiano (En Ruta Marítima)"
    },
    lat: -62.2000,
    lng: -58.6000,
    type: 'ship',
    operation: 40,
    associatedPhotos: ['ph2', 'ph6'],
    associatedVideos: [],
    associatedPublications: ['pub2']
  },
  {
    id: 'm3',
    title: {
      BR: "Península Byers - Acampamento Volante",
      EN: "Byers Peninsula - Glaciology Camp",
      ES: "Península Byers - Campamento Móvil"
    },
    lat: -62.6333,
    lng: -61.1000,
    type: 'camp',
    operation: 43,
    associatedPhotos: ['ph3', 'ph8'],
    associatedVideos: [],
    associatedPublications: ['pub3']
  },
  {
    id: 'm4',
    title: {
      BR: "Ilha Decepção - Coleta Etnográfica",
      EN: "Deception Island - Ethnographical Study Site",
      ES: "Isla Decepción - Punto Etnográfico"
    },
    lat: -62.9667,
    lng: -60.6333,
    type: 'point',
    operation: 39,
    associatedPhotos: ['ph7'],
    associatedVideos: [],
    associatedPublications: ['pub3']
  },
  {
    id: 'm5',
    title: {
      BR: "Cabo Shirreff - Acampamento OP 44",
      EN: "Cape Shirreff - OP 44 Field Camp",
      ES: "Cabo Shirreff - Campamento OP 44"
    },
    lat: -62.4667,
    lng: -60.7833,
    type: 'camp',
    operation: 44,
    associatedPhotos: ['ph6'],
    associatedVideos: [],
    associatedPublications: ['pub3']
  }
];
