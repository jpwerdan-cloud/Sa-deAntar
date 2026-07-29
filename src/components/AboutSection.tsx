import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Activity, 
  MapPin, 
  Cpu, 
  Globe, 
  Compass, 
  Users, 
  Anchor, 
  Tent, 
  Sparkles,
  HeartPulse,
  LayoutGrid,
  FileText,
  Clock,
  Thermometer,
  Wind,
  Shield,
  Gauge,
  UserCheck,
  CheckCircle2,
  LineChart,
  Moon,
  AlertTriangle,
  Radio,
  Eye,
  Settings,
  HelpCircle,
  Rocket,
  Orbit
} from 'lucide-react';

interface AboutSectionProps {
  language: 'BR' | 'EN' | 'ES';
  isDark: boolean;
  initialSubTab?: 'interactive' | 'fulltext';
}

const SECTION_TEXTS = {
  BR: {
    title: "SaúdeAntar-ia",
    subtitle: "Monitoramento e Assistência em Saúde Mental em Ambientes ICE (Isolados, Confinados e Extremos)",
    academicEntity: "Universidade Federal Fluminense (UFF) • Programa Antártico Brasileiro (PROANTAR) • CNPq",
    tabInteractive: "Módulo de Exploração Dinâmica",
    tabFullText: "Manifesto Científico Integral",
    
    // Main paragraphs for fulltext manifesto
    p1: "O Projeto SAÚDEANTAR – Monitoramento e Assistência em Saúde Mental na Antártica é uma iniciativa multidisciplinar da Universidade Federal Fluminense (UFF) desenvolvida no âmbito do Programa Antártico Brasileiro, integrando as ações científicas do program e contribuindo para o avanço do conhecimento sobre os fatores humanos em ambientes isolados, confinados e extremos (ICE). O projeto esteve alinhado ao Action Plan for Brazilian Antarctic Science 2013–2022, especialmente à área de investigação da psicologia de grupos submetidos a condições extremas, reconhecendo a importância de compreender os aspectos humanos que permeiam as atividades científicas e operacionais na Antártica.",
    p2: "Partindo da compreensão de que a experiência humana em ambientes extremos resulta da interação entre fatores biológicos, psicológicos, sociais e ambientais, o SAÚDEANTAR busca ampliar o conhecimento sobre os impactos do isolamento, do confinamento, das condições climáticas adversas e das demandas operacionais da vida antártica sobre a saúde mental, o comportamento e os processos de adaptação humana. O projeto também promove a integração entre pesquisadores, profissionais de saúde, cientistas e militares, fortalecendo uma abordagem interdisciplinar para a Medicina Polar e a Saúde Mental em ambientes extremos.",
    p3: "O objetivo geral do projeto é contribuir para o desenvolvimento de um modelo teórico-conceitual do psiquismo humano e de seus processos subjacentes, a partir da investigação de como as condições materiais e simbólicas vivenciadas em contextos de isolamento e confinamento antártico influenciam a gênese, a adaptação e a evolução das manifestações psíquicas.",
    p4: "Para alcançar esse objetivo, o projeto desenvolve pesquisas voltadas para a investigação da relação entre alterações do ciclo circadiano e diferentes estados de humor; a identificação e análise das representações sociais dos papéis vivenciados no ambiente antártico; o estudo das estratégias de coping (enfrentamento) utilizadas por indivíduos submetidos ao isolamento e às condições extremas da Antártica; a elaboração de programas e protocolos de preparação, prevenção e assistência em saúde mental para expedicionários; e o desenvolvimento de modelos inovadores de supervisão remota e apoio matricial em saúde mental utilizando tecnologias de telepresença e telessaúde.",
    p5: "As atividades científicas do SAÚDEANTAR estão organizadas em cinco linhas principais de pesquisa: Psiquiatria e Psicologia Polar, voltada ao estudo dos processos psicológicos e emocionais envolvidos na adaptação a ambientes extremos; Fisiologia do Sono e Vigília, dedicada à compreensão dos efeitos das condições antárticas sobre os ritmos biológicos e o desempenho humano; Meio Ambiente e Saúde Mental, que investiga a influência dos fatores ambientais sobre o bem-estar psicológico; Gênero, Corpo e Sexualidade, que analisa as experiências subjetivas e as relações sociais em contextos de confinamento; e Matriciamento Remoto e Telessaúde, responsável pelo desenvolvimento de estratégias tecnológicas de monitoramento e assistência em saúde.",
    p6: "A pesquisa de campo é realizada em três importantes microambientes antárticos: acampamentos, navios e Estação Antártica Comandante Ferraz (EACF). Essa abordagem permite comparar diferentes condições de trabalho, convivência, isolamento e exposição ambiental, possibilitando uma compreensão mais ampla dos fatores que influenciam a saúde mental e a adaptação humana. O projeto é desenvolvido em colaboração com diversos grupos de pesquisa brasileiros e estrangeiros, fortalecendo a cooperação científica internacional e ampliando a inserção do Brasil nas redes globais de pesquisa polar.",
    p7: "Como parte das estratégias de monitoramento e coleta de dados, o projeto utiliza a Caderneta do Expedicionário, uma ferramenta desenvolvida para acompanhar expedicionárias e expedicionários ao longo de sua permanência na Antártica. A caderneta reúne questionários, diários de sono, registros de humor e sentimentos, além de espaços para observações e anotações pessoais. Seu preenchimento pode ser realizado desde o primeiro dia da missão, permitindo o acompanhamento longitudinal das experiências individuais e contribuindo para a produção de conhecimento científico sobre os processos de adaptação psicológica em ambientes extremos. As informações coletadas auxiliam no desenvolvimento de protocolos de preparação, prevenção e assistência em saúde mental para futuras missões antárticas.",
    p8: "Complementando essas ações, foi desenvolvida a plataforma SaúdeAntar-IA, uma solução inovadora de saúde digital voltada ao monitoramento contínuo da saúde mental, emocional e do sono de pessoas que atuam em ambientes remotos, isolados ou extremos. A plataforma utiliza questionários cientificamente validados e recursos de inteligência artificial para acompanhar indicadores relacionados ao humor, qualidade do sono, fadiga, estresse, ansiedade e adaptação ao ambiente. Por meio de algoritmos inteligentes, o sistema auxilia na identificação precoce de sinais de sofrimento psíquico, alterações do sono e fatores de risco para adoecimento mental, permitindo intervenções preventivas e suporte especializado quando necessário.",
    p9: "Desenvolvido inicialmente para atender às demandas das missões antárticas brasileiras, o SaúdeAntar-IA possibilita o acompanhamento longitudinal dos participantes e gera dados valiosos para a pesquisa científica e para a construção de estratégias de assistência em saúde mental. Além de sua aplicação na Antártica, a plataforma apresenta potencial para utilização em diversos contextos que envolvem isolamento geográfico, confinamento ou condições operacionais desafiadoras, como plataformas offshore, embarcações, bases científicas remotas, operações militares, regiões de difícil acesso e futuras missões espaciais.",
    p10: "Ao integrar pesquisa científica, inovação tecnológica e assistência em saúde, o SAÚDEANTAR contribui para o fortalecimento da pesquisa brasileira em Medicina Polar, Psicologia Polar e Saúde Mental em ambientes extremos, promovendo avanços no conhecimento sobre a adaptação humana e o desenvolvimento de estratégias de cuidado aplicáveis tanto à Antártica quanto a outros cenários de isolamento e confinamento ao redor do mundo.",

    // Interactive translations
    navTracks: "Linhas de Pesquisa",
    navMicro: "Microambientes de Campo",
    navNotebook: "Caderneta Interativa",
    navAI: "Simulador SaúdeAntar-IA",
    navSpace: "Treinamento Espacial",
    
    // Tracks panel
    tracksHeadline: "Análise das Linhas Científicas Ativas",
    tracksDescription: "Clique em uma das cinco linhas fundamentais do projeto pioneiro para examinar as variáveis cronobiológicas e comportamentais monitoradas.",
    trackScore: "Adesão Geral",
    trackTarget: "Foco Analítico",
    trackStatus: "Status",
    trackStatusActive: "Monitoramento Contínuo",
    
    // Micro panel
    microHeadline: "Simulador de Condições Ambientais de Campo",
    microDescription: "As investigações científicas são efetuadas em microambientes extremos com regimes de estresse específicos.",
    tempText: "Temperatura Média",
    windText: "Pressão dos Ventos",
    isolateText: "Nível de Confinamento",
    extremeTitle: "Desafios Biopsicossociais Principais",

    // Notebook panel
    notebookHeadline: "Caderneta do Expedicionário Digitalizada",
    notebookDescription: "Dispositivo de coleta longitudinal. Experimente preencher os indicadores diários abaixo para ver o impacto em tempo real.",
    howManyHours: "Quantas horas dormiu na última noite?",
    moodLabel: "Registro de Humor Dominante",
    stressorsLabel: "Estressores Clínicos Identificados",
    stressorCold: "Frio Extremo",
    stressorNoise: "Fadiga de Motores",
    stressorWind: "Isolamento Externo",
    stressorComm: "Latência de Satélite",
    adaptabilityReport: "Índice de Adaptação Estimado",
    adaptabilityDesc: "Cálculo computacional baseado nas horas de sono, estado humorístico e estressores reportados na caderneta.",

    // AI Simulator panel
    aiHeadline: "Estação de Rastreamento & Inteligência Artificial",
    aiDescription: "Nossos algoritmos preditivos cruzam dados históricos para mitigar riscos psiquiátricos e crises psicofisiológicas antes que ocorram.",
    selectSubject: "Selecione o Perfil do Expedicionário",
    runDiagnostic: "Processar Diagnóstico de Saúde Mental",
    diagnosing: "Processando telemetria clínica...",
    diagResult: "Relatório de Saúde Preditiva por I.A.",
    p1Label: "Pesquisadora - Estação EACF",
    p2Label: "Expedicionário - Acampamento Geológico",
    p3Label: "Tripulante - Navio Oceanográfico",

    // Space training translations
    spaceHeadline: "A Antártica como Campo de Treinamento para o Futuro",
    spaceSubtitle: "DO GELO AO INFINITO: A ANTÁRTICA PREPARA A HUMANIDADE PARA CONHECER NOVOS MUNDOS",
    spaceDescription: "Apesar de ser um dos lugares mais inóspitos da Terra, a Antártica cumpre um papel fundamental na preparação para a vida fora do nosso planeta. Ela nos ajuda a desenvolver tecnologias, entender os limites do corpo humano e treinar equipes para enfrentar os desafios extremos do espaço. Enquanto a humanidade se prepara para pisar novamente na Lua e, no futuro, em Marte, a Antártica continuará sendo uma das nossas melhores ferramentas de aprendizado — aqui mesmo, no nosso planeta.",
    spaceMarsComparison: "Quando se chega a Marte, o que se vê é um vasto deserto gelado inóspito, coincidentemente, a Antártica também é assim. Com seus 13 milhões de km² e brutal isolamento, é o lugar perfeito para estudar os efeitos das missões espaciais na saúde e na psicologia humanas! Daí a importância do projeto SaúdeAntar - dimensões de saúde mental no isolamento antártico.",
    spaceSimTitle: "Simulador de Prontidão de Voo Espacial Análogo",
    spaceSimDesc: "Inicie simulações de isolamento e confinamento extremo na Antártica para mensurar o fator de adaptabilidade da tripulação.",
    spaceConfigTitle: "Parâmetros da Missão Espacial",
    spacePillarsTitle: "Pilares do Estágio Científico (Inspirado no Banner de Campo)",
    spaceReadinessLabel: "Índice de Aptidão Planetária",
    spacePillarTech: "Testes de Tecnologia",
    spacePillarTechDesc: "Agências usam a Antártica para validar trajes pressurizados, sistemas de suporte à vida e robótica autónoma.",
    spacePillarEnv: "Ambiente Extremo",
    spacePillarEnvDesc: "Temperaturas abaixo de -50°C, ventos catabáticos fortes e isolamento total simulam severamente as condições espaciais.",
    spacePillarHuman: "Estudos Humanos",
    spacePillarHumanDesc: "Confinamento em pequenos habitáculos e convivência continuada ajudam a preparar e treinar missões espaciais de longa duração.",
    spacePillarRobotics: "Robótica e Veículos",
    spacePillarRoboticsDesc: "Testes operacionais de sondas planetárias e rovers autónomos em terrenos semelhantes ao relevo marciano.",

    linesList: [
      { id: 'l1', name: "Psiquiatria e Psicologia Polar", desc: "Estudo dos processos psicológicos, cognitivos e emocionais envolvidos na adaptação a ambientes extremos e gestão de estresse ICE.", target: "Padrões de Ansiedade e Resiliência Psíquica", score: "94%", color: "border-purple-500/30 text-purple-400 bg-purple-950/20", icon: Brain },
      { id: 'l2', name: "Fisiologia do Sono e Vigília", desc: "Compreensão dos efeitos das condições antárticas sobre os ritmos biológicos, ciclo circadiano e desempenho humano.", target: "Eficiência de Sono e Sintomas de Insônia", score: "88%", color: "border-amber-500/30 text-amber-400 bg-amber-950/20", icon: HeartPulse },
      { id: 'l3', name: "Meio Ambiente e Saúde Mental", desc: "Investigação sobre a influência direta dos fatores ambientais e climáticos polares extremos sobre o bem-estar mental geral.", target: "Transtorno Afetivo Sazonal (SAD)", score: "89%", color: "border-sky-500/30 text-sky-400 bg-sky-950/20", icon: Globe },
      { id: 'l4', name: "Gênero, Corpo e Sexualidade", desc: "Análise das experiências subjetivas, corporalidade e dinâmicas das relações sociais em confinamento espacial restrito.", target: "Coesão de Grupo e Estressores Sociais", score: "91%", color: "border-rose-500/30 text-rose-400 bg-rose-950/20", icon: Users },
      { id: 'l5', name: "Matriciamento Remoto e Telessaúde", desc: "Desenvolvimento de estratégias de telepresença e telessaúde para assistência médica e suporte matricial a longas distâncias.", target: "Modelos Tecnológicos de Escuta Remota", score: "96%", color: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20", icon: Cpu }
    ],
    microList: [
      { id: 'm1', name: "Acampamentos Glaciares", temp: "-25°C", wind: "Até 90 km/h", isolate: "Máximo / Instabilidade", desc: "Isolamento total e exposição direta ao vento no manto de gelo. Alta territorialidade corporal.", challenges: ["Desidratação térmica rápida", "Fadiga física extrema", "Fadiga por vento constante"], icon: Tent, badge: "Ambiente Rígido" },
      { id: 'm2', name: "Navios Oceanográficos", temp: "+2°C a -8°C", wind: "Ondas de 12 metros", isolate: "Moderado / Confinamento", desc: "Isolamento no mar de Drake com espaço de convívio extremamente reduzido e sobrecargas vestibulares constantes.", challenges: ["Cinetose severa (bordo)", "Poluição sonora de geradores", "Invasão sistemática de privacidade"], icon: Anchor, badge: "Regime Móvel" },
      { id: 'm3', name: "Estação Antártica EACF", temp: "-12°C", wind: "Até 120 km/h", isolate: "Regular / Estrutura", desc: "Base de pesquisa com recursos médicos, laboratórios científicos complexos, mas confinamento social severo no inverno.", challenges: ["Inversão total do ritmo sono-vigília", "Privação sensorial extrema", "Conflitos de fuso horário social"], icon: MapPin, badge: "Base Estruturada" }
    ]
  },
  EN: {
    title: "SaúdeAntar-ia",
    subtitle: "Mental Health Monitoring and Assistance in ICE (Isolated, Confined, and Extreme) Environments",
    academicEntity: "Fluminense Federal University (UFF) • Brazilian Antarctic Program (PROANTAR) • CNPq",
    tabInteractive: "Dynamic Exploration Module",
    tabFullText: "Scientific Manifesto Full Text",

    // Main paragraphs for fulltext manifesto
    p1: "The SAÚDEANTAR Project – Monitoring and Assistance in Mental Health in Antarctica is a multidisciplinary initiative of the Fluminense Federal University (UFF) developed within the scope of the Brazilian Antarctic Program, integrating the scientific actions of the program and contributing to the advancement of knowledge about human factors in isolated, confined, and extreme (ICE) environments. The project was aligned with the Action Plan for Brazilian Antarctic Science 2013–2022, especially in the area of psychology of groups subjected to extreme conditions, recognizing the importance of understanding the human aspects that permeate scientific and operational activities in Antarctica.",
    p2: "Starting from the understanding that the human experience in extreme environments results from the interaction of biological, psychological, social, and environmental factors, SAÚDEANTAR aims to expand knowledge about the impacts of isolation, confinement, adverse weather conditions, and operational demands of Antarctic life on mental health, behavior, and human adaptation processes. The project also promotes integration among researchers, health professionals, scientists, and military personnel, strengthening an interdisciplinary approach to Polar Medicine and Mental Health in extreme environments.",
    p3: "The general objective of the project is to contribute to the development of a theoretical-conceptual model of the human psyche and its underlying processes, from the investigation of how the material and symbolic conditions experienced in contexts of Antarctic isolation and confinement influence the genesis, adaptation, and evolution of psychic manifestations.",
    p4: "To achieve this objective, the project develops research aimed at investigating the relationship between circadian cycle changes and different mood states; the identification and analysis of the social representations of the roles experienced in the Antarctic environment; the study of coping strategies used by individuals subjected to isolation and extreme conditions in Antarctica; the preparation of preparation, prevention, and assistance programs and protocols in mental health for expeditionaries; and the development of innovative models of remote supervision and matrix support in mental health using telepresence and telehealth technologies.",
    p5: "The scientific activities of SAÚDEANTAR are organized into five main lines of research: Polar Psychiatry and Psychology, aimed at studying the psychological and emotional processes involved in adjusting to extreme environments; Physiology of Sleep and Wakefulness, dedicated to understanding the effects of Antarctic conditions on biological rhythms and human performance; Environment and Mental Health, which investigates the influence of environmental factors on psychological well-being; Gender, Body, and Sexuality, which analyzes subjective experiences and social relations in confinement contexts; and Remote Matrix Support and Telehealth, responsible for developing technological strategies for health monitoring and assistance.",
    p6: "Field research is carried out in three important Antarctic microenvironments: camps, vessels, and the Comandante Ferraz Antarctic Station (EACF). This approach allows comparing different conditions of work, cohabitation, isolation, and environmental exposure, enabling a broader understanding of the factors that influence mental health and human adaptation. The project is developed in collaboration with several Brazilian and foreign research groups, strengthening international scientific cooperation and expanding Brazil's integration into global polar research networks.",
    p7: "As part of the monitoring and data collection strategies, the project uses the Expeditionary's Logbook, a tool developed to monitor expeditions and expeditionary paths throughout their stay in Antarctica. The logbook brings together questionnaires, sleep diaries, records of mood and feelings, as well as spaces for personal observations and notes. It can be completed from the first day of the mission, allowing longitudinal monitoring of individual experiences and contributing to the production of scientific knowledge on psychological adaptation processes in extreme environments. The collected information assists in the development of preparation, prevention, and mental health assistance protocols for future Antarctic missions.",
    p8: "Complementando these actions, the SaúdeAntar-IA platform was developed, an innovative digital health solution aimed at continuous monitoring of mental, emotional, and sleep health of people working in remote, isolated, or extreme environments. The platform uses scientifically validated questionnaires and artificial intelligence features to monitor indicators related to mood, sleep quality, fatigue, stress, anxiety, and adaptation to the environment. Through intelligent algorithms, the system assists in the early identification of signs of psychological distress, sleep disturbances, and risk factors for mental illness, allowing preventive interventions and specialized support when necessary.",
    p9: "Initially developed to meet the demands of Brazilian Antarctic missions, SaúdeAntar-IA enables the longitudinal monitoring of participants and generates valuable data for scientific research and for building mental health care strategies. In addition to its application in Antarctica, the platform has potential for use in various contexts involving geographic isolation, confinement, or challenging operational conditions, such as offshore platforms, vessels, remote scientific bases, military operations, regions of difficult access, and future space missions.",
    p10: "By integrating scientific research, technological innovation, and health care, SAÚDEANTAR contributes to strengthening Brazilian research in Polar Medicine, Polar Psychology, and Mental Health in extreme environments, promoting advances in knowledge on human adaptation and the development of care strategies applicable both to Antarctica and to other isolation and confinement scenarios around the world.",

    // Interactive translations
    navTracks: "Research Lines",
    navMicro: "Field Settings",
    navNotebook: "Interactive Logbook",
    navAI: "SaúdeAntar-IA Simulator",
    navSpace: "Space Training",
    
    // Tracks panel
    tracksHeadline: "Active Scientific Tracks",
    tracksDescription: "Select one of the five core lines of investigation to explore the specific psychophysiological variables monitored.",
    trackScore: "General Adherence",
    trackTarget: "Analytical Target",
    trackStatus: "Status",
    trackStatusActive: "Continuous Stream",
    
    // Micro panel
    microHeadline: "Field Conditions Telemetry",
    microDescription: "Fieldwork is performed under discrete ice regimes with highly polarized stressors.",
    tempText: "Average Temp",
    windText: "Wind Pressure",
    isolateText: "Confinement Level",
    extremeTitle: "Primary Biopsychosocial Challenges",

    // Notebook panel
    notebookHeadline: "Digitized Expeditionary Logbook",
    notebookDescription: "Longitudinal data device. Fill your daily sleep, mood, and stress factors to dynamically see their impact on performance.",
    howManyHours: "How many hours did you sleep last night?",
    moodLabel: "Dominant Mood Register",
    stressorsLabel: "Clinical Stressors Identified",
    stressorCold: "Extreme Cold",
    stressorNoise: "Engine Fatigue",
    stressorWind: "Outer Seclusions",
    stressorComm: "Satellite Lag",
    adaptabilityReport: "Estimated Adaptation Index",
    adaptabilityDesc: "Computed adaptation index based on logged sleep, mood, and current stress layers.",

    // AI Simulator panel
    aiHeadline: "Predictive AI Tracking System",
    aiDescription: "Intelligent analytics scan psychophysiological arrays to forecast crisis points and prevent mental stress overload.",
    selectSubject: "Choose Expeditionary Profile",
    runDiagnostic: "Run Neural Health Screening",
    diagnosing: "Processing clinical parameters...",
    diagResult: "AI Predictive Assessment Report",
    p1Label: "Researcher - EACF Central Base",
    p2Label: "Expeditionary - Glacial Geotech Camp",
    p3Label: "Crewmember - Oceanographic Vessel",

    // Space training translations
    spaceHeadline: "Antarctica as a Training Ground for the Future",
    spaceSubtitle: "FROM ICE TO INFINITY: ANTARCTICA PREPARES HUMANITY TO EXPLORE NEW WORLDS",
    spaceDescription: "Despite being one of the most inhosphes on Earth, Antarctica plays a core role in preparing for life outside our planet. It helps us develop technologies, understand the limits of the human body, and train crews to face the extreme challenges of space. As humanity prepares to step back on the Moon and, in the future, on Mars, Antarctica will continue to be one of our best learning tools—right here on our own planet.",
    spaceMarsComparison: "When you reach Mars, what you see is a vast and inhospitable icy desert; coincidentally, Antarctica is exactly like that. With its 13 million km² and brutal isolation, it is the perfect sandbox to study the effects of space missions on human health and psychology. Hence the critical value of the SaúdeAntar project - tracking mental health dimensions during polar isolation.",
    spaceSimTitle: "Analog Space Flight Readiness Simulator",
    spaceSimDesc: "Launch extreme polar isolation simulations to analyze the biopsychosocial readiness index of the crew.",
    spaceConfigTitle: "Analog Mission Parameters",
    spacePillarsTitle: "Scientific Test Pillars (Inspired by the Training Banner)",
    spaceReadinessLabel: "General Planet Flight Qualification",
    spacePillarTech: "Technology Testing",
    spacePillarTechDesc: "Agencies use Antarctica to validate spacesuits, life support systems (ECLSS), and rover autonomy designs.",
    spacePillarEnv: "Extreme Environment",
    spacePillarEnvDesc: "Temperatures below -50°C, severe katabatic winds, and absolute isolation simulate deep space conditions.",
    spacePillarHuman: "Human Studies",
    spacePillarHumanDesc: "Confinement and close cohabitation in small crews prepare long-duration space voyages.",
    spacePillarRobotics: "Robotics & Vehicles",
    spacePillarRoboticsDesc: "Dynamic testing of autonomous probes and rover units on planetary-like regolith ground.",

    linesList: [
      { id: 'l1', name: "Polar Psychiatry & Psychology", desc: "Study of psychological, cognitive, and emotional processes in extreme adaptation and ICE stress management.", target: "Anxiety and Psychic Resilience Patterns", score: "94%", color: "border-purple-500/30 text-purple-400 bg-purple-950/20", icon: Brain },
      { id: 'l2', name: "Sleep & Wakefulness Physiology", desc: "Understanding the effects of Antarctic light regimes on biological rhythms, circadian status, and human performance.", target: "Sleep Efficiency index & Disruption cycles", score: "88%", color: "border-amber-500/30 text-amber-400 bg-amber-950/20", icon: HeartPulse },
      { id: 'l3', name: "Environment & Mental Health", desc: "Investigation on direct environmental and weather triggers of polar wilderness on general mental health.", target: "Seasonal Affective Disorder (SAD) parameters", score: "89%", color: "border-sky-500/30 text-sky-400 bg-sky-950/20", icon: Globe },
      { id: 'l4', name: "Gender, Body & Sexuality", desc: "Analysis of subjective experiences, embodiment, and social relations in small, closed, isolated compartments.", target: "Group Cohesion & Micro-sociological Friction", score: "91%", color: "border-rose-500/30 text-rose-400 bg-rose-950/20", icon: Users },
      { id: 'l5', name: "Remote Support & Telehealth", desc: "Development of telehealth networks, remote psychiatric matrix support, and telepresence models in deep isolation.", target: "Holographic & Remote Supervision Devices", score: "96%", color: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20", icon: Cpu }
    ],
    microList: [
      { id: 'm1', name: "Glacial Outpost Camps", temp: "-25°C", wind: "Up to 90 km/h", isolate: "Maximum / Tent shelters", desc: "Total isolation and wind exposure on ice sheets. High physical and survival strain.", challenges: ["Dehydration from high cold pressure", "Musculoskeletal physical fatigue", "Constant gale noise wear"], icon: Tent, badge: "Wild Ice" },
      { id: 'm2', name: "Ocean Research Vessels", temp: "+2°C to -8°C", wind: "12-meter swells", isolate: "Moderate / Rolling Metallic", desc: "Seaborne Drake Passage logs. Constant rolling motions, extremely tight shared cabins.", challenges: ["Severe seasickness states (vestibular)", "Engine and generator constant noise", "Systemic privacy invasion stressors"], icon: Anchor, badge: "Vessel Outpost" },
      { id: 'm3', name: "Comandante Ferraz Station (EACF)", temp: "-12°C", wind: "Up to 120 km/h", isolate: "Structured / Long Term", desc: "Main scientific facility with medical wing and modern modules but severe winter lockdown dynamics.", challenges: ["Total swap of circadian schedule", "Extreme winter sensory deprivation", "Social polar hibernation syndrome"], icon: MapPin, badge: "Main Polar Base" }
    ]
  },
  ES: {
    title: "SaúdeAntar-ia",
    subtitle: "Monitoreo y Soporte en Salud Mental en entornos ICE (Aislados, Confinados y Extremos)",
    academicEntity: "Universidad Federal Fluminense (UFF) • Programa Antártico Brasileño (PROANTAR) • CNPq",
    tabInteractive: "Módulo de Exploración Dinámica",
    tabFullText: "Manifiesto Científico Integral",

    // Main paragraphs for fulltext manifesto
    p1: "El Proyecto SAÚDEANTAR – Monitoreo y Asistencia en Salud Mental en la Antártida es una iniciativa multidisciplinaria de la Universidad Federal Fluminense (UFF) desarrollada en el el ámbito del Programa Antártico Brasileño, integrando las acciones científicas del programa y contribuyendo al avance del conocimiento sobre los factores humanos en ambientes aislados, confinados y extremos (ICE). El proyecto estuvo alineado con el Action Plan for Brazilian Antarctic Science 2013–2022, especialmente con el área de investigación de la psicología de grupos sometidos a condiciones extremas, reconociendo la importancia de comprender los aspectos humanos que impregnan las actividades científicas y operacionales en la Antártica.",
    p2: "Partiendo de la premisa de que la experiencia humana en ambientes extremos resulta de la interacción de factores biológicos, psicológicos, sociales y ambientales, SAÚDEANTAR busca ampliar el conocimiento sobre los impactos del aislamiento, el confinamiento, las condiciones climáticas adversas y las demandas operacionales de la vida antártica sobre la salud mental, el comportamiento y los procesos de adaptación humana. El proyecto también promueve la integración entre investigadores, profesionales de la salud, científicos y militares, fortaleciendo un enfoque interdisciplinario para la Medicina Polar y la Salud Mental en ambientes extremos.",
    p3: "El objetivo general del proyecto es contribuir al desarrollo de un modelo teórico-conceptual del psiquismo humano y sus procesos subjacentes, a partir de la investigación de cómo las condiciones materiales y simbólicas experimentadas en contextos de aislamiento y confinamiento antártico influyen en la génesis, adaptación y evolución de las manifestaciones psíquicas.",
    p4: "Para lograr este objetivo, el proyecto desarrolla investigaciones orientadas a indagar la relación entre las alteraciones del ciclo circadiano y los diferentes estados de ánimo; la identificación y análisis de las representaciones sociales de los roles experimentados en el ambiente antártico; el estudio de las estrategias de coping (afrontamiento) utilizadas por individuos sometidos al aislamiento y a las condiciones extremas de la Antártica; la formulación de programas y protocolos de preparación, prevención y asistencia en salud mental para expedicionarios; y el desarrollo de modelos inovadores de supervisión remota y apoyo matricial en salud mental mediante tecnologías de telepresencia y telesalud.",
    p5: "Las actividades científicas de SAÚDEANTAR se organizan en cinco líneas principales de investigación: Psiquiatría y Psicología Polar, orientada al estudio de los procesos psicológicos y emocionales involucrados en la adaptación a ambientes extremos; Fisiología del Sueño y la Vigilia, dedicada a la comprensión de los efectos de las condiciones antárticas sobre los ritmos biológicos y el rendimiento humano; Medio Ambiente y Salud Mental, que investiga la influencia de los factores ambientales en el bienestar psicológico; Género, Cuerpo y Sexualidade, que analiza las experiencias subjetivas y las relaciones sociales en contextos de confinamiento; y Apoyo Matricial Remoto y Telesalud, responsable del desarrollo de estrategias tecnológicas de monitoreo y asistencia médica.",
    p6: "La investigación de campo se realiza en tres importantes microambientes antárticos: campamentos, buques y la Estación Antártica Comandante Ferraz (EACF). Este enfoque permite comparar diferentes condiciones de trabajo, convivencia, aislamiento y exposición ambiental, posibilitando una comprensión más amplia de los factores que influyen en la salud mental y la adaptación humana. El proyecto se desarrolla en colaboración con diversos grupos de investigación brasileños y extranjeros, fortaleciendo la cooperación científica internacional y ampliando la inserción de Brasil en las redes globales de investigación polar.",
    p7: "Como parte de las estrategias de monitoreo y recolección de datos, el proyecto utiliza la Libreta del Expedicionario, una herramienta diseñada para acompañar a los expedicionarios a lo largo de su permanencia en la Antártica. La libreta reúne cuestionarios, diarios de sueño, registros de estado de ánimo y sentimientos, además de espacios para observaciones y notas personales. Su llenado puede realizarse desde el primer día de la misión, permitiendo el seguimiento longitudinal de las experiencias individuales y contribuyendo a la producción de conocimiento científico sobre los procesos de adaptación psicológica en ambientes extremos. La información recopilada apoya el desarrollo de protocolos de preparación, prevención y asistencia en salud mental para futuras misiones antárticas.",
    p8: "Complementando estas acciones, se desarrolló la plataforma SaúdeAntar-IA, una solución innovadora de salud digital enfocada al monitoreo continuo de la salud mental, emocional y del sueño de personas que se desempeñan en ambientes remotos, aislados o extremos. La plataforma utiliza cuestionarios científicamente validados y recursos de inteligencia artificial para monitorear indicadores relacionados con el estado de ánimo, la calidad del sueño, la fatiga, el estrés, la ansiedad y la adaptación al entorno. Mediante algoritmos inteligentes, el sistema ayuda en la detección temprana de signos de sufrimiento psíquico, alteraciones del sueño y factores de riesgo de enfermedad mental, permitiendo intervenciones preventivas y soporte especializado cuando sea necesario.",
    p9: "Desarrollada inicialmente para atender las demandas de las misiones antárticas brasileiras, SaúdeAntar-IA permite el seguimiento longitudinal de los participantes y genera valiosos datos para la investigación científica y la construcción de estrategias de asistencia en salud mental. Además de su aplicación en la Antártica, la plataforma presenta potencial de uso en diversos contextos que involucran aislamiento geográfico, confinamiento o condiciones operativas desafiantes, como plataformas offshore, embarcações, bases científicas remotas, operaciones militares, regiones de difícil acceso y futuras misiones espaciales.",
    p10: "Al integrar investigación científica, innovación tecnológica y asistencia en salud, SAÚDEANTAR contribuye al fortalecimiento de la investigación brasileña en Medicina Polar, Psicologia Polar y Salud Mental en ambientes extremos, promoviendo avances en el conocimiento sobre la adaptación humana y el desarrollo de estrategias de cuidado aplicables tanto a la Antártida como a otros escenarios de aislamiento y confinamiento en todo el mundo.",

    // Interactive translations
    navTracks: "Líneas de Investigación",
    navMicro: "Entornos Operativos",
    navNotebook: "Libreta Interactiva",
    navAI: "Simulador SaúdeAntar-IA",
    navSpace: "Análogo Espacial",

    // Tracks panel
    tracksHeadline: "Líneas Científicas Activas",
    tracksDescription: "Seleccione una de las cinco líneas de investigación para explorar los indicadores biológicos, conductuales y cronobiológicos que rastreamos.",
    trackScore: "Adhesión General",
    trackTarget: "Foco de Análisis",
    trackStatus: "Status",
    trackStatusActive: "Transmisión Continua",

    // Micro panel
    microHeadline: "Telemetría de Ambientes Polares",
    microDescription: "Las tareas de campo se extienden en tres microclimas helados con tensiones corporales únicas.",
    tempText: "Temperatura Media",
    windText: "Presión del Viento",
    isolateText: "Nivel de Reclusión",
    extremeTitle: "Desafíos Biopsicosociales Principales",

    // Notebook panel
    notebookHeadline: "Libreta del Expedicionario Digitalizada",
    notebookDescription: "Dispositivo de recolección de datos longitudinales. Simule el llenado diario para evaluar el coeficiente de adaptabilidad en tiempo real.",
    howManyHours: "¿Cuántas horas ha dormido la noche anterior?",
    moodLabel: "Estado de Ánimo Predominante",
    stressorsLabel: "Estresores Clínicos a Bordo",
    stressorCold: "Frío Extremo",
    stressorNoise: "Ruido de Motores",
    stressorWind: "Aislamiento General",
    stressorComm: "Retardo de Satélite",
    adaptabilityReport: "Índice de Adaptación Estimado",
    adaptabilityDesc: "Cálculo en tiempo real del estado adaptativo según horas de sueño, nivel emocional y estresores activos.",

    // AI Simulator panel
    aiHeadline: "Sistema Predictivo de Inteligencia Artificial",
    aiDescription: "Nuestros algoritmos neurales analizan flujos longitudinales para proyectar puntos de quiebre y prevenir incidentes psíquicos.",
    selectSubject: "Seleccione Perfil del Expedicionario",
    runDiagnostic: "Iniciar Diagnóstico Neural Predictivo",
    diagnosing: "Procesando parámetros clínicos...",
    diagResult: "Reporte Inteligente de Salud Predictiva",
    p1Label: "Investigadora - Base Central EACF",
    p2Label: "Expedicionario - Campamento de Glaciares Extremos",
    p3Label: "Tripulante - Buque Oceanográfico Polar",

    // Space training translations
    spaceHeadline: "La Antártida como Campo de Entrenamiento para el Futuro",
    spaceSubtitle: "DEL HIELO AL INFINITO: LA ANTÁRTIDA PREPARA A LA HUMANIDAD PARA CONOCER NUEVOS MUNDOS",
    spaceDescription: "A pesar de ser uno de los lugares más inhóspitos de la Tierra, la Antártida cumple un rol fundamental en la preparación para la vida fuera de nuestro planeta. Nos ayuda a desarrollar tecnologías, comprender los límites del cuerpo humano y entrenar equipos para afrontar los desafíos extremos del espacio. Mientras la humanidad se prepara para volver a pisar la Luna y, en el futuro, Marte, la Antártida continuará siendo una de nuestras mejores herramientas de aprendizaje — aquí mismo, en nuestro planeta.",
    spaceMarsComparison: "Cuando se llega a Marte, lo que se ve es un vasto desierto helado e inhóspito; de manera coincidente, la Antártida también es así. Con sus 13 millones de km² y un aislamiento brutal, ¡es el lugar perfecto para estudiar los efectos de las misiones espaciales en la salud y psicología humanas! De ahí la importancia del proyecto SaúdeAntar - dimensiones de salud mental en el aislamiento antártico.",
    spaceSimTitle: "Simulador de Aptitud de Vuelo Espacial Análogo",
    spaceSimDesc: "Inicie simulaciones de aislamiento extremo en la Antártida para calcular la aptitud biopsicosocial de la tripulación en tiempo real.",
    spaceConfigTitle: "Parámetros de la Misión Análoga",
    spacePillarsTitle: "Pilares de Ensayo Científico (Inspirado por el Banner de Entrenamiento)",
    spaceReadinessLabel: "Calificación de Vuelo Planetario General",
    spacePillarTech: "Pruebas de Tecnología",
    spacePillarTechDesc: "Las agencias usan la Antártida para validar trajes presurizados, sistemas de soporte vital y robots autonómicos.",
    spacePillarEnv: "Ambiente Extremo",
    spacePillarEnvDesc: "Temperaturas bajo -50°C, vientos severos y aislamiento total simulan condiciones espaciales inhóspitas.",
    spacePillarHuman: "Estudos Humanos",
    spacePillarHumanDesc: "El confinamiento y la convivencia en grupos pequeños ayudan a preparar misiones de larga duración.",
    spacePillarRobotics: "Robótica y Vehículos",
    spacePillarRoboticsDesc: "Pruebas de sondas autónomas y rovers en terrenos similares al regolito marciano.",

    linesList: [
      { id: 'l1', name: "Psiquiatría y Psicología Polar", desc: "Estudio de las variables psicológicas de adaptación y gestión de emergencias psíquicas bajo confinamiento extremo.", target: "Esquemas de Resiliencia y Ansiedad", score: "94%", color: "border-purple-500/30 text-purple-400 bg-purple-950/20", icon: Brain },
      { id: 'l2', name: "Fisiología de Sueño y Vigilia", desc: "Estudio del impacto de la asincronía del fotoperíodo solar antártico en el sueño, la vigilia y productividad humana.", target: "Eficiencia del Sueño Profundo y Melatonina", score: "88%", color: "border-amber-500/30 text-amber-400 bg-amber-950/20", icon: HeartPulse },
      { id: 'l3', name: "Medio Ambiente y Salud Mental", desc: "Correlación entre el clima antártico implacable, hipoxia general y Trastornos Afectivos Estacionales.", target: "Sensibilidad Atmosférica e Hipoxia", score: "89%", color: "border-sky-500/30 text-sky-400 bg-sky-950/20", icon: Globe },
      { id: 'l4', name: "Género, Cuerpo y Sexualidad", desc: "Análisis de roles de género, corporalidad y disputas espaciales en condiciones de cohabitación reducida prolongada.", target: "Cohesión Grupal y Tensiones Sociales", score: "91%", color: "border-rose-500/30 text-rose-400 bg-rose-950/20", icon: Users },
      { id: 'l5', name: "Soporte Remoto y Telesalud", desc: "Modelado e innovaciones en telemedicina polar, soporte clínico a larga distancia y matrices de diagnóstico satelital.", target: "Conexión Satelital y Clínicas Holográficas", score: "96%", color: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20", icon: Cpu }
    ],
    microList: [
      { id: 'm1', name: "Campamentos de Glaciología", temp: "-25°C", wind: "Hasta 90 km/h", isolate: "Máxima / Carpas de lona", desc: "Aislamiento total y ventiscas directas en el manto glacial. Exposición crítica corporal extrema.", challenges: ["Deshidratación inducida por frío seco", "Fatiga muscular extrema de soporte", "Tensión por ruidos eólicos intensos"], icon: Tent, badge: "Glaciar Salvaje" },
      { id: 'm2', name: "Buques de Investigación", temp: "+2°C a -8°C", wind: "Olas de 12 metros", isolate: "Moderado / Hierro y Drake", desc: "Laboratorios móviles en Drake. Camas oscilantes, invasión diaria de espacio íntimo.", challenges: ["Cinetosis severa persistente", "Zumbido sordo de turbinas navales", "Fatiga de comunicación familiar"], icon: Anchor, badge: "Nave Polar" },
      { id: 'm3', name: "Estación Comandante Ferraz", temp: "-12°C", wind: "Hasta 120 km/h", isolate: "Estructurado / Confinado", desc: "Base moderna con comodidades operativas avanzadas, pero estricta clausura social durante los inviernos prolongados.", challenges: ["Trastorno extremo del ritmo biológico", "Monotonía y privación psicorregulatoria", "Polarización de pequeños grupos"], icon: MapPin, badge: "Base Comandante" }
    ]
  }
};

export function AboutSection({ language, isDark, initialSubTab = 'interactive' }: AboutSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<'interactive' | 'fulltext'>(initialSubTab);
  
  useEffect(() => {
    setActiveSubTab(initialSubTab);
  }, [initialSubTab]);
  
  // Interactive Panel Tabs
  const [interactiveTab, setInteractiveTab] = useState<'tracks' | 'micro' | 'notebook' | 'ai' | 'space'>('tracks');

  // Interactive Track ID selection
  const [selectedTrackId, setSelectedTrackId] = useState<string>('l1');

  // Interactive Micro ID selection
  const [selectedMicroId, setSelectedMicroId] = useState<string>('m1');

  // Interactive Active Sliders for Tracks tab
  const [cortisolValue, setCortisolValue] = useState<number>(74);
  const [exhaustionValue, setExhaustionValue] = useState<number>(28);

  // Interactive Season selection for Microenvironments
  const [activeSeason, setActiveSeason] = useState<'summer' | 'winter'>('summer');

  // Interactive Digital Logbook States
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [selectedMood, setSelectedMood] = useState<'calm' | 'anxious' | 'tired' | 'focused'>('calm');
  const [activeStressors, setActiveStressors] = useState<string[]>(['comm']);

  // Interactive AI Simulator states
  const [selectedProfile, setSelectedProfile] = useState<'p1' | 'p2' | 'p3'>('p1');
  const [aiIsAnalyzing, setAiIsAnalyzing] = useState<boolean>(false);
  const [aiDiagnosticResult, setAiDiagnosticResult] = useState<any | null>(null);

  // Interactive Space Analog Simulation States
  const [spaceConfinementDays, setSpaceConfinementDays] = useState<number>(180);
  const [spaceCrewSize, setSpaceCrewSize] = useState<number>(6);
  const [spaceGravitySim, setSpaceGravitySim] = useState<'mars' | 'moon' | 'micro'>('mars');
  const [spaceCommDelay, setSpaceCommDelay] = useState<number>(240); // in seconds
  const [spacePillarSelected, setSpacePillarSelected] = useState<'tech' | 'env' | 'human' | 'robotics'>('tech');

  const texts = SECTION_TEXTS[language] || SECTION_TEXTS.BR;

  // Toggle stressor callback
  const handleStressorToggle = (str: string) => {
    if (activeStressors.includes(str)) {
      setActiveStressors(activeStressors.filter(item => item !== str));
    } else {
      setActiveStressors([...activeStressors, str]);
    }
  };

  // Compute mock adaptability score from states
  const computeAdaptabilityScore = () => {
    let base = 50;
    // sleep impact: optimal is 7-8 hours
    if (sleepHours >= 7 && sleepHours <= 8) base += 25;
    else if (sleepHours === 6 || sleepHours === 9) base += 15;
    else base += 5;

    // mood impact
    if (selectedMood === 'calm') base += 15;
    if (selectedMood === 'focused') base += 20;
    if (selectedMood === 'tired') base -= 10;
    if (selectedMood === 'anxious') base -= 15;

    // stressors impact
    base -= activeStressors.length * 8;

    return Math.max(10, Math.min(100, base));
  };

  // Run mock AI analytic processing depending dynamically on the Antarctic scientific environment and profile selected
  const handleRunAiDiagnostic = () => {
    setAiIsAnalyzing(true);
    setAiDiagnosticResult(null);

    setTimeout(() => {
      setAiIsAnalyzing(false);
      
      if (selectedProfile === 'p1') { // EACF Militar do Grupo de Apoio
        if (activeSeason === 'summer') {
          setAiDiagnosticResult({
            language: language,
            status: 'stable',
            score: 88,
            metrics: { sleep: "85%", fatg: "20%", stress: "25%", circadian: "Aclimatado" },
            bullet: language === 'BR' 
              ? "Excelente recepção metabólica ao verão polar. Elevada atividade operacional para manutenção predial na estação EACF. Recomendado apenas rodízio periódico de guarda." 
              : language === 'ES' 
                ? "Excelente respuesta metabólica al verano polar. Alta actividad operativa en la estación EACF. Rotaciones regulares recomendadas." 
                : "Excellent metabolic adjustment during the polar summer. High operational activity level at the EACF base. Routine guard rotations recommended."
          });
        } else {
          setAiDiagnosticResult({
            language: language,
            status: 'warning',
            score: 58,
            metrics: { sleep: "52%", fatg: "60%", stress: "64%", circadian: "Inversão de Fase" },
            bullet: language === 'BR' 
              ? "Sinais moderados de depressão estacional e dessincronização do ciclo vigília-sono devido à noite polar contínua (Inverno). Indicação crítica de terapia de luz azul (fototerapia)." 
              : language === 'ES' 
                ? "Fase tardía de sueño y desincronización debido a la noche polar prolongada. Se prescribe fototerapia activa a bordo de la estación." 
                : "Circadian phase delay and disruption due to continuous Polar Night. Active blue light therapy (phototherapy) prescribed inside Comandante Ferraz modules."
          });
        }
      } else if (selectedProfile === 'p2') { // Pesquisador Acampamento Seymour (Geologia)
        if (activeSeason === 'summer') {
          setAiDiagnosticResult({
            language: language,
            status: 'optimal',
            score: 92,
            metrics: { sleep: "80%", fatg: "18%", stress: "15%", circadian: "Foco Científico" },
            bullet: language === 'BR' 
              ? "Níveis de entusiasmo científico e coping de autogestão ideais na Ilha Seymour. Supervisar hidratação cutânea e labial regulada para combater ventos secos constantes." 
              : language === 'ES' 
                ? "Resiliencia psicológica ideal en misiones de campo de la Isla Seymour. Monitorear hidratación regular contra vientos polares secos." 
                : "Ideal research focus and coping resilience at Seymour Island camp. Monitor strict hydration levels during glacier and soil sampling."
          });
        } else {
          setAiDiagnosticResult({
            language: language,
            status: 'critical',
            score: 0,
            metrics: { sleep: "0%", fatg: "100%", stress: "100%", circadian: "Não-Aplicável" },
            bullet: language === 'BR' 
              ? "ACAMPAMENTO DESATIVADO: Durante o rigoroso inverno antártico, todos os acampamentos científicos de campo são completamente desmobilizados e o pessoal é evacuado. Impossível operar de forma remota no gelo." 
              : language === 'ES' 
                ? "CAMPAMENTO EVACUADO: Campamento científico de campo completamente cerrado y evacuado durante la invernada extrema. Operación inactiva." 
                : "CAMP DEMOBILIZED: Field outpost is completely closed and evacuated during the extreme polar winter conditions. No physical operation allowed."
          });
        }
      } else { // Cientista NPqHo Maximiano
        if (activeSeason === 'summer') {
          setAiDiagnosticResult({
            language: language,
            status: 'stable',
            score: 82,
            metrics: { sleep: "72%", fatg: "44%", stress: "36%", circadian: "Estabilizado" },
            bullet: language === 'BR' 
              ? "Coping adaptativo funcional contra fadiga vestibular (cinetose) moderada decorrente da travessia de Drake e península no NPqHo Almirante Maximiano. Sono intermitente estável." 
              : language === 'ES' 
                ? "Adaptación funcional con fatiga vestibular moderada debido a olas en el Drake. Higiene del sueño e hidratación a bordo recomendada." 
                : "Adaptive physiological stability with mild seasickness due to Drake Passage crossings. Sleep hygiene protocols advised on standard shipboard routines."
          });
        } else {
          setAiDiagnosticResult({
            language: language,
            status: 'critical',
            score: 0,
            metrics: { sleep: "0%", fatg: "100%", stress: "100%", circadian: "Inativo" },
            bullet: language === 'BR' 
              ? "CAMPANHA ENCERRADA: O navio de apoio e pesquisa retornou ao porto de origem na América do Sul para manutenção profunda e docagem de inverno. Sem equipe científica a bordo." 
              : language === 'ES' 
                ? "NAVEGACIÓN SUSPENDIDA: El buque oceanográfico se retiró de las aguas polares por invierno extremo. Mantenimiento anual en puerto sudamericano." 
                : "VESSEL RECALLED: Polar support ship is back in the South American homeport for scheduled annual winter dock and maintenance. No crew onboard."
          });
        }
      }
    }, 1200);
  };

  const getDynamicMicro = () => {
    const base = texts.microList.find(m => m.id === selectedMicroId) || texts.microList[0];
    
    if (selectedMicroId === 'm1') { // Camps
      return {
        ...base,
        name: language === 'BR' ? "Acampamentos Científicos de Campo" : language === 'ES' ? "Campamentos Científicos de Campo" : "Scientific Field Camps",
        temp: activeSeason === 'summer' ? "-5°C" : "-35°C",
        wind: activeSeason === 'summer' ? "45 km/h" : "120 km/h (Nevascas)",
        isolate: activeSeason === 'summer' 
          ? (language === 'BR' ? "Médio / Equipes Ativas" : "Medium / Active Teams") 
          : (language === 'BR' ? "Nulo / Evacuado na Invernada" : "Null / Evacuated in Winter"),
        desc: activeSeason === 'summer'
          ? (language === 'BR' ? "Acampamentos temporários montados em áreas de interesse científico (geologia, paleontologia, biologia), como a Ilha Seymour, durante o verão antártico." : "Temporary camps deployed in fields of high scientific value (geology, paleontology, biology), such as Seymour Island, during the Antarctic summer.")
          : (language === 'BR' ? "Desativados e totalmente evacuados durante o rigoroso inverno antártico devido à impossibilidade logística de sobrevivência continuada sob barracas." : "Deactivated and fully evacuated during the harsh Antarctic winter, due to the absolute logistical impossibility of sustained tent survival."),
        challenges: activeSeason === 'summer'
          ? (language === 'BR' ? ["Fadiga física por caminhadas científicas", "Isolamento geográfico e dependência de resgate aéreo", "Instalação de barracas sob ventos de alta intensidade"] : ["Physical fatigue from scientific hikes", "Geographic isolation and air rescue dependency", "Setting up shelter tents under strong wind gusts"])
          : (language === 'BR' ? ["Evacuação concluída", "Não operacional de inverno", "Temperaturas extremas de congelamento"] : ["Evacuation complete", "Non-operational in winter", "Extreme freezing temperatures"])
      };
    } else if (selectedMicroId === 'm2') { // Ships
      return {
        ...base,
        name: language === 'BR' ? "Navios de Apoio Polar (Maximiano / Ary Rongel)" : language === 'ES' ? "Buques de Apoyo Polar (Maximiano / Ary Rongel)" : "Antarctic Support Vessels",
        temp: activeSeason === 'summer' ? "+3°C" : "-12°C",
        wind: activeSeason === 'summer' ? "65 km/h (Drake)" : "110 km/h (Frente Polar)",
        isolate: activeSeason === 'summer'
          ? (language === 'BR' ? "Moderado / Navegação Costeira" : "Moderate / Coastal Navigation")
          : (language === 'BR' ? "Crítico / Retornado à América do Sul" : "Critical / Returned to South America"),
        desc: activeSeason === 'summer'
          ? (language === 'BR' ? "O NPqHo Almirante Maximiano (H-41) e o NApOc Ary Rongel (G-51) atuam intensamente na coleta oceânica e suporte logístico ao longo da Península e travessia do Drake." : "The polar ships NPqHo Almirante Maximiano (H-41) and NApOc Ary Rongel (G-51) operate actively on oceanographic collections and logistical support along the Drake Passage.")
          : (language === 'BR' ? "As embarcações retornam ao Brasil durante o inverno antártico pois a península e passagens marítimas se tornam intransitáveis devido às banquisas de gelo denso." : "The vessels return to South America during the polar winter because maritime channels and coastal areas freeze over, becoming blocked by pack ice."),
        challenges: activeSeason === 'summer'
          ? (language === 'BR' ? ["Cinetose severa na travessia do Estreito de Drake", "Monotonia e restrição de espaço a bordo", "Fadiga de maquinário e motores em turnos contínuos"] : ["Severe seasickness crossing the Drake Passage", "Monotony and sensory restriction onboard", "Engine and machine vibration in continuous shifts"])
          : (language === 'BR' ? ["Retornado à base porto de origem", "Manutenção e docagem de inverno", "Fim da campanha científica anual"] : ["Returned to homeport", "Winter maintenance and dry dock", "End of annual scientific campaign"])
      };
    } else { // Station Comandante Ferraz
      return {
        ...base,
        name: language === 'BR' ? "Estação Antártica Comandante Ferraz (EACF)" : language === 'ES' ? "Estación Antártica Comandante Ferraz" : "Comandante Ferraz Antarctic Station (EACF)",
        temp: activeSeason === 'summer' ? "-2°C" : "-22°C",
        wind: activeSeason === 'summer' ? "40 km/h" : "125 km/h (Nevascas fortes)",
        isolate: activeSeason === 'summer'
          ? (language === 'BR' ? "Moderado / Máximo fluxo de pessoal" : "Moderate / Maximum personnel flow")
          : (language === 'BR' ? "Extremo / Grupo de Invernada Fechado" : "Extreme / Wintering Group Confinement"),
        desc: activeSeason === 'summer'
          ? (language === 'BR' ? "Localizada na Ilha Rei George, acolhe até 64 cientistas e militares em alta atividade de pesquisa e rodízio de equipes operacionais sob luz solar estendida." : "Located on King George Island, hosting up to 64 scientists and military personnel in intense research activities with extended sunlight hours and team rotations.")
          : (language === 'BR' ? "Apenas o grupo restrito de invernada (militares e técnicos) permanece isolado para manutenção integral da estação, enfrentando noites polares e confinamento social estrito." : "Only the small wintering crew (military & technical support) remains isolated to preserve the base, facing dark polar nights and severe prolonged social confinement."),
        challenges: activeSeason === 'summer'
          ? (language === 'BR' ? ["Fadiga cognitiva por alta densidade social", "Dificuldades de adequação ao fotoperíodo estendido", "Sobrecarga de rotinas científicas e laboratório"] : ["Cognitive fatigue from high social density", "Adapting to extended sunlight hours (hyperactivity)", "Overload from continuous lab and field activities"])
          : (language === 'BR' ? ["Privação total de luz solar (Noite Polar)", "Síndrome de T3 Polar (alterações na tireoide e humor)", "Conflitos interpessoais de microgrupo confinado"] : ["Total solar light deprivation (Polar Night)", "Polar T3 Syndrome (thyroid and mood shifts)", "Interpersonal friction within the wintering crew"])
      };
    }
  };

  const selectedTrack = texts.linesList.find(t => t.id === selectedTrackId) || texts.linesList[0];
  const selectedMicro = getDynamicMicro();
  const adaptabilityScore = computeAdaptabilityScore();

  const computeSpaceReadinessScore = () => {
    let score = 95;
    
    // Confinement penalty
    if (spaceConfinementDays > 300) {
      score -= Math.floor((spaceConfinementDays - 300) / 10);
    } else if (spaceConfinementDays < 90) {
      score -= Math.floor((90 - spaceConfinementDays) / 5);
    }
    
    // Crew Size safety penalty (ideal is 5 to 8)
    if (spaceCrewSize < 4) {
      score -= 15; // Isolation risk
    } else if (spaceCrewSize > 10) {
      score -= 8;  // High friction risk
    }
    
    // Comm delay penalty
    score -= Math.floor(spaceCommDelay / 40);
    
    // Gravity simulation adjustment
    if (spaceGravitySim === 'micro') score -= 5;
    
    return Math.max(12, Math.min(100, score));
  };

  const spaceReadinessScore = computeSpaceReadinessScore();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
      {/* Title Header Section */}
      <div className="space-y-4 mb-10 text-center lg:text-left">
        <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-[0.3em] block">
          ▲ PROJECT PORTAL
        </span>
        <h2 className={`text-4xl md:text-6xl font-extralight ${isDark ? 'text-white' : 'text-stone-900'} leading-none font-display`}>
          {texts.title}
        </h2>
        <div className={`text-xs font-mono uppercase ${isDark ? 'text-zinc-400' : 'text-slate-600'} tracking-wide mt-1`}>
          {texts.academicEntity}
        </div>
        <p className={`text-sm max-w-4xl leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-700'}`}>
          {texts.subtitle}
        </p>

        {/* Outer Tab Switcher: Interactive vs Full Editorial Text */}
        <div className="flex justify-center lg:justify-start gap-3 pt-4">
          <button
            onClick={() => setActiveSubTab('interactive')}
            className={`px-4 py-2 text-[10px] uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
              activeSubTab === 'interactive'
                ? (isDark ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-400/50' : 'bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold')
                : (isDark ? 'bg-transparent text-zinc-400 border border-zinc-800 hover:text-white' : 'bg-transparent text-slate-500 border border-slate-200 hover:text-slate-900')
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            {texts.tabInteractive}
          </button>
          <button
            onClick={() => setActiveSubTab('fulltext')}
            className={`px-4 py-2 text-[10px] uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
              activeSubTab === 'fulltext'
                ? (isDark ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-400/50' : 'bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold')
                : (isDark ? 'bg-transparent text-zinc-400 border border-zinc-800 hover:text-white' : 'bg-transparent text-slate-500 border border-slate-200 hover:text-slate-900')
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            {texts.tabFullText}
          </button>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gradient-to-r from-cyan-500/20 via-zinc-800/10 to-transparent mb-10" />

      {/* Render Sub Tabs */}
      <AnimatePresence mode="wait">
        {activeSubTab === 'interactive' ? (
          <motion.div
            key="interactive"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* INNER CATEGORIES SELECTOR SYSTEM FOR THE EXPLORER */}
            <div className={`p-1.5 border flex flex-wrap gap-1 ${isDark ? 'bg-zinc-950/60 border-zinc-900' : 'bg-slate-100 border-slate-200'}`}>
              <button
                onClick={() => setInteractiveTab('tracks')}
                className={`flex-1 min-w-[150px] py-3 px-4 font-mono text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  interactiveTab === 'tracks'
                    ? (isDark ? 'bg-cyan-950/45 text-cyan-400' : 'bg-white text-cyan-700 shadow-sm font-semibold')
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Brain className="w-4 h-4 text-cyan-400" />
                {texts.navTracks}
              </button>
              
              <button
                onClick={() => setInteractiveTab('micro')}
                className={`flex-1 min-w-[150px] py-3 px-4 font-mono text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  interactiveTab === 'micro'
                    ? (isDark ? 'bg-cyan-950/45 text-cyan-400' : 'bg-white text-cyan-700 shadow-sm font-semibold')
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                {texts.navMicro}
              </button>

              <button
                onClick={() => setInteractiveTab('notebook')}
                className={`flex-1 min-w-[150px] py-3 px-4 font-mono text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  interactiveTab === 'notebook'
                    ? (isDark ? 'bg-cyan-950/45 text-cyan-400' : 'bg-white text-cyan-700 shadow-sm font-semibold')
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                {texts.navNotebook}
              </button>

              <button
                onClick={() => setInteractiveTab('ai')}
                className={`flex-1 min-w-[150px] py-3 px-4 font-mono text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  interactiveTab === 'ai'
                    ? (isDark ? 'bg-cyan-950/45 text-cyan-400' : 'bg-white text-cyan-700 shadow-sm font-semibold')
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                {texts.navAI}
              </button>

              <button
                onClick={() => setInteractiveTab('space')}
                className={`flex-1 min-w-[150px] py-3 px-4 font-mono text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  interactiveTab === 'space'
                    ? (isDark ? 'bg-cyan-950/45 text-cyan-400' : 'bg-white text-cyan-700 shadow-sm font-semibold')
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Rocket className="w-4 h-4 text-cyan-400" />
                {texts.navSpace}
              </button>
            </div>

            {/* DYNAMIC VIEWPORTS DISPLAY */}
            <AnimatePresence mode="wait">
              {/* TAB 1: RESEARCH TRACKS INTERVIEWER */}
              {interactiveTab === 'tracks' && (
                <motion.div
                  key="v_tracks"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left Column - Clickable Track Index Cards */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="pb-2 border-b border-zinc-800/20">
                      <h3 className={`text-lg font-light ${isDark ? 'text-zinc-200' : 'text-slate-800'} font-display`}>
                        {texts.tracksHeadline}
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'} mt-1`}>
                        {texts.tracksDescription}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {texts.linesList.map((item) => {
                        const IsActive = item.id === selectedTrackId;
                        const TrackIcon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setSelectedTrackId(item.id)}
                            className={`w-full p-4 text-left border flex items-start gap-3 transition-all cursor-pointer ${
                              IsActive
                                ? (isDark ? 'bg-cyan-950/30 border-cyan-500/50 shadow-lg' : 'bg-cyan-50/50 border-cyan-400 shadow-sm')
                                : (isDark ? 'bg-zinc-950/30 border-zinc-900 hover:border-zinc-800' : 'bg-white border-slate-200 hover:border-slate-300')
                            }`}
                          >
                            <div className={`p-2 border ${IsActive ? 'border-cyan-500 text-cyan-400' : (isDark ? 'border-zinc-800 text-zinc-500' : 'border-slate-300 text-slate-500')}`}>
                              <TrackIcon className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5">
                              <h4 className={`text-xs font-mono uppercase font-bold ${IsActive ? 'text-cyan-400' : (isDark ? 'text-zinc-300' : 'text-slate-700')}`}>
                                {item.name}
                              </h4>
                              <p className={`text-[11px] line-clamp-1 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                                {item.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column - Deep Clinical Dashboard Panel */}
                  <div className="lg:col-span-7">
                    <div className={`p-8 border h-full flex flex-col justify-between ${isDark ? 'bg-[#060b14]/75 border-zinc-800 shadow-xl' : 'bg-white border-slate-200 shadow-lg'}`}>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-800/10 pb-4">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-2 py-0.5">
                            {texts.trackStatus} • {texts.trackStatusActive}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-mono text-cyan-400">
                            <Radio className="w-3.5 h-3.5 animate-pulse" />
                            LIVE FEED
                          </span>
                        </div>

                        {/* Title & Desc */}
                        <div className="space-y-3">
                          <h3 className={`text-2xl font-light ${isDark ? 'text-white' : 'text-slate-900'} font-display`}>
                            {selectedTrack.name}
                          </h3>
                          <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                            {selectedTrack.desc}
                          </p>
                        </div>

                        {/* Custom analytical visual block */}
                        <div className={`p-4 border ${isDark ? 'bg-black/40 border-zinc-850' : 'bg-slate-50 border-slate-150'} space-y-4`}>
                          {/* Dynamic visual parameters representing bio-metrics */}
                          <div className="space-y-4">
                            <span className={`text-[9px] font-mono uppercase block ${isDark ? 'text-zinc-500' : 'text-slate-500'} font-bold`}>
                              {language === 'BR' ? "Painel de Ajuste de Parâmetros de Estresse Humano" : "Human Stress Metrics Interactive Controller"}
                            </span>
                            <div className="space-y-3">
                              {/* Sliders */}
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono items-center">
                                  <span className="flex items-center gap-1">
                                    {language === 'BR' ? "Cortisol adaptativo" : "Adaptive Cortisol Level"}
                                    <div className="group relative inline-block z-30">
                                      <HelpCircle className="w-3.5 h-3.5 text-zinc-500 hover:text-cyan-400 transition-colors cursor-help" />
                                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none normal-case font-normal leading-normal text-center select-none">
                                        {language === 'BR' 
                                          ? "O nível de cortisol reflete a resposta ao estresse adaptativo e flutuações circadianas em ambientes extremos."
                                          : language === 'ES'
                                            ? "El nivel de cortisol refleja la respuesta de adaptación al estrés y fluctuaciones circadianas en entornos extremos."
                                            : "Cortisol level reflects the adaptive stress response and circadian fluctuations in extreme environments."
                                        }
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-950" />
                                      </div>
                                    </div>
                                  </span>
                                  <span className="text-cyan-400 font-bold">{cortisolValue} mcg/dL</span>
                                </div>
                                <input 
                                  type="range"
                                  min="5"
                                  max="100"
                                  value={cortisolValue}
                                  onChange={(e) => setCortisolValue(Number(e.target.value))}
                                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-ew-resize accent-cyan-400"
                                />
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono items-center">
                                  <span className="flex items-center gap-1">
                                    {language === 'BR' ? "Índice de exaustão ICE" : "ICE Exhaustion Score"}
                                    <div className="group relative inline-block z-30">
                                      <HelpCircle className="w-3.5 h-3.5 text-zinc-500 hover:text-cyan-400 transition-colors cursor-help" />
                                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none normal-case font-normal leading-normal text-center select-none">
                                        {language === 'BR'
                                          ? "Mede o desgaste físico e mental cumulativo decorrente dos estímulos combinados de Isolamento, Confinamento e Extremos."
                                          : language === 'ES'
                                            ? "Mide el desgaste físico y mental acumulativo debido a los estímulos combinados de Aislamiento, Confinamiento y Extremos."
                                            : "Measures accumulated physical and mental fatigue resulting from the combined stressors of Isolation, Confinement, and Extremes."
                                        }
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-950" />
                                      </div>
                                    </div>
                                  </span>
                                  <span className="text-rose-455 font-bold">{exhaustionValue} %</span>
                                </div>
                                <input 
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={exhaustionValue}
                                  onChange={(e) => setExhaustionValue(Number(e.target.value))}
                                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-ew-resize accent-rose-400"
                                />
                              </div>
                            </div>
                            
                            {/* Interactive Clinical Evaluation */}
                            <div className={`p-3 border text-[11px] font-mono ${isDark ? 'bg-black/50 border-zinc-850' : 'bg-white border-slate-200'}`}>
                              <span className="text-cyan-400 font-semibold">&gt;_ {language === 'BR' ? "AVALIAÇÃO FISIOLÓGICA CONTÍNUA:" : "REAL-TIME PHYSIOLOGICAL ADVICE:"}</span>
                              <p className="mt-1 font-light leading-relaxed text-zinc-400">
                                {cortisolValue > 80 && exhaustionValue > 70 
                                  ? (language === 'BR' 
                                      ? "ALERTA: Hipercortisolismo agudo concomitante a alta estafa ICE. Alerta crítico para incidentes psicológicos. Recomenda-se descompressão." 
                                      : "ALERT: Acute hypercortisolism concurrent with extreme ICE exhaustion. Critical psych stress warning triggered. Immediate decompression advised.")
                                  : cortisolValue < 30 
                                    ? (language === 'BR' 
                                        ? "SINAIS DE ESGOTAMENTO (BURNOUT): Ritmo de cortisol hiporreativo indicando exaustão adrenal crônica. Recomenda-se repouso integral e interrupção de turnos extremos." 
                                        : "ADRENAL BURN STATE: Hyporeactive cortisol curve indicating chronic adrenal depletion. Immediate rest cycle and duty leave recommended.")
                                    : (language === 'BR' 
                                        ? "ESTÁVEL: Níveis ótimos de regulação metabólica. Resposta neuro-hormonal adequada às flutuações e clima da Antártica brasileira." 
                                        : "STABLE: Optimal metabolic balance detected. Well-adapted neuroendocrine curve relative to the Brazilian Antarctic operations climate variables.")
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-zinc-800/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                        <span>Simulação sem valor científico.</span>
                        <span>SAÚDEANTAR CORE</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: ENVIRONMENT TELEMETRY CHANGER */}
              {interactiveTab === 'micro' && (
                <motion.div
                  key="v_micro"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left Column: 3 settings selection */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="pb-2 border-b border-zinc-800/20">
                      <h3 className={`text-lg font-light ${isDark ? 'text-zinc-200' : 'text-slate-800'} font-display`}>
                        {texts.microHeadline}
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'} mt-1`}>
                        {texts.microDescription}
                      </p>
                    </div>

                    {/* Season Selector */}
                    <div className="p-1 border bg-zinc-950/40 border-zinc-900/60 grid grid-cols-2 gap-1 rounded-sm">
                      <button
                        onClick={() => { setActiveSeason('summer'); setAiDiagnosticResult(null); }}
                        type="button"
                        className={`py-1.5 px-3 font-mono text-[9px] uppercase tracking-wider text-center cursor-pointer transition-all ${
                          activeSeason === 'summer'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                            : 'text-zinc-500 hover:text-zinc-350'
                        }`}
                      >
                        ☀ {language === 'BR' ? "Verão (Out–Mar)" : "Polar Summer"}
                      </button>
                      <button
                        onClick={() => { setActiveSeason('winter'); setAiDiagnosticResult(null); }}
                        type="button"
                        className={`py-1.5 px-3 font-mono text-[9px] uppercase tracking-wider text-center cursor-pointer transition-all ${
                          activeSeason === 'winter'
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 font-semibold'
                            : 'text-zinc-500 hover:text-zinc-355'
                        }`}
                      >
                        ❄ {language === 'BR' ? "Inverno (Abr–Set)" : "Polar Winter"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {texts.microList.map((rawItem) => {
                        const IsActive = rawItem.id === selectedMicroId;
                        const MicroIcon = rawItem.icon;
                        
                        // Resolve dynamic names & badges
                        const name = rawItem.id === 'm1' 
                          ? (language === 'BR' ? "Acampamentos Científicos" : "Scientific Field Camps")
                          : rawItem.id === 'm2'
                            ? (language === 'BR' ? "Navios de Apoio Polar" : "Antarctic Support Vessels")
                            : (language === 'BR' ? "Estação Comandante Ferraz" : "Comandante Ferraz Base");
                        
                        const desc = rawItem.id === 'm1'
                          ? (activeSeason === 'summer' ? "Instalações de barracas e refúgios temporários para pesquisas geológicas de campo ativo no verão." : "Acampamentos evacuados e desmembrados durante o gelado inverno polar.")
                          : rawItem.id === 'm2'
                            ? (activeSeason === 'summer' ? "Navegações científicas ativas ao longo da Península e Estreito de Drake." : "Embarcações retornadas ao continente devido ao congelamento marítimo.")
                            : (activeSeason === 'summer' ? "Estação moderna operando sob alto fluxo solar e rotatividade de equipes científicas." : "Base científica fechada sob confinamento rígido para o grupo restrito de invernada.");

                        return (
                          <div 
                            key={rawItem.id}
                            onClick={() => setSelectedMicroId(rawItem.id)}
                            className={`p-5 border text-left cursor-pointer transition-all ${
                              IsActive
                                ? (isDark ? 'bg-cyan-950/20 border-cyan-500/50' : 'bg-cyan-50/50 border-cyan-300')
                                : (isDark ? 'bg-zinc-950/20 border-zinc-900 hover:border-zinc-800' : 'bg-white border-slate-200 hover:border-slate-300')
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 border ${
                                IsActive ? 'border-cyan-500/40 text-cyan-400' : (isDark ? 'border-zinc-800 text-zinc-500' : 'border-slate-300 text-slate-500')
                              }`}>
                                {rawItem.badge}
                              </span>
                              <MicroIcon className={`w-4 h-4 ${IsActive ? 'text-cyan-400' : 'text-zinc-500'}`} />
                            </div>
                            <h4 className={`text-sm font-mono uppercase font-bold ${IsActive ? 'text-cyan-300' : (isDark ? 'text-zinc-100' : 'text-slate-800')}`}>
                              {name}
                            </h4>
                            <p className={`text-xs font-light mt-1.5 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                              {desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Physical & Psychological diagnostic simulations */}
                  <div className="lg:col-span-7">
                    <div className={`p-8 border h-full space-y-6 ${isDark ? 'bg-[#060b14]/75 border-zinc-800 shadow-xl' : 'bg-white border-slate-200'}`}>
                      <div className="flex items-center justify-between border-b border-zinc-800/10 pb-4">
                        <span className="text-[10px] font-mono text-cyan-400 tracking-wider">
                          MÓDULO SIMULADOR / REGIME DE ESTRESSE
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">
                          Microambiente: {selectedMicro.name}
                        </span>
                      </div>

                      {/* Display live indicators */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className={`p-4 border text-center ${isDark ? 'bg-zinc-950/50 border-zinc-850' : 'bg-slate-50 border-slate-150'}`}>
                          <Thermometer className="w-5 h-5 text-cyan-400 mx-auto mb-1 animate-pulse" />
                          <span className={`text-[9px] font-mono uppercase block ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                            {texts.tempText}
                          </span>
                          <span className="font-mono text-lg font-bold text-cyan-400 mt-1 block">
                            {selectedMicro.temp}
                          </span>
                        </div>

                        <div className={`p-4 border text-center ${isDark ? 'bg-zinc-950/50 border-zinc-850' : 'bg-slate-50 border-slate-150'}`}>
                          <Wind className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                          <span className={`text-[9px] font-mono uppercase block ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                            {texts.windText}
                          </span>
                          <span className="font-mono text-lg font-bold text-sky-400 mt-1 block">
                            {selectedMicro.wind}
                          </span>
                        </div>

                        <div className={`p-4 border text-center ${isDark ? 'bg-zinc-950/50 border-zinc-850' : 'bg-slate-50 border-slate-150'}`}>
                          <Compass className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                          <span className={`text-[9px] font-mono uppercase block ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                            {texts.isolateText}
                          </span>
                          <span className="font-mono text-[11px] font-medium text-purple-400 mt-2 block whitespace-nowrap overflow-hidden text-ellipsis">
                            {selectedMicro.isolate}
                          </span>
                        </div>
                      </div>

                      {/* Descriptive narrative */}
                      <div className="space-y-4">
                        <h4 className={`text-xs font-mono uppercase font-bold ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>
                          Configuração Ambiental & Operação
                        </h4>
                        <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                          {selectedMicro.desc}
                        </p>
                      </div>

                      {/* Main Challenges checkboxes mock */}
                      <div className={`p-5 border ${isDark ? 'bg-black/30 border-zinc-850' : 'bg-zinc-50 border-slate-150'} space-y-3`}>
                        <h5 className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? 'text-zinc-400' : 'text-slate-700'} font-bold`}>
                          {texts.extremeTitle}
                        </h5>
                        <div className="space-y-2">
                          {selectedMicro.challenges.map((chal, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs">
                              <span className="text-rose-500 font-semibold font-mono">▲</span>
                              <span className={isDark ? 'text-zinc-300' : 'text-slate-700'}>{chal}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Detailed EACF Memorial & Technical info requested by the user */}
                      {selectedMicroId === 'm3' && (
                        <div className={`p-6 border border-dashed rounded-lg transition-all ${isDark ? 'bg-[#0d1527]/40 border-cyan-500/20 text-zinc-300' : 'bg-cyan-50/20 border-cyan-600/20 text-slate-800'} space-y-4`}>
                          <div className="flex items-center gap-2 border-b border-zinc-800/10 pb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <h5 className="text-[10px] font-mono uppercase tracking-widest font-bold text-cyan-400">
                              {language === 'BR' ? "EACF: Ficha Técnica & Memorial Histórico" : language === 'ES' ? "EACF: Ficha Técnica y Memorial Histórico" : "EACF: Technical Sheet & Historical Memorial"}
                            </h5>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] font-mono leading-normal">
                            <div className="space-y-1">
                              <span className="text-zinc-500 text-[9px] block font-semibold">{language === 'BR' ? "LOCALIZAÇÃO" : language === 'ES' ? "UBICACIÓN" : "LOCATION"}</span>
                              <p className={isDark ? "text-zinc-200" : "text-slate-700"}>
                                {language === 'BR' 
                                  ? "Península Keller, Baía do Almirantado, Ilha Rei George, arquipélago das Shetland do Sul" 
                                  : language === 'ES' 
                                    ? "Península Keller, Bahía de Almirantazgo, Isla de Rey Jorge, Islas Shetland del Sur" 
                                    : "Keller Peninsula, Admiralty Bay, King George Island, South Shetland Islands"
                                }
                              </p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-zinc-500 text-[9px] block font-semibold">{language === 'BR' ? "COORDENADAS" : language === 'ES' ? "COORDENADAS" : "COORDINATES"}</span>
                              <p className={`${isDark ? 'text-zinc-200' : 'text-slate-700'} font-medium`}>
                                Latitude 62° 05'S | Longitude 058° 24'W
                              </p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-zinc-500 text-[9px] block font-semibold">{language === 'BR' ? "CAPACIDADE" : language === 'ES' ? "CAPACIDAD" : "CAPACITY"}</span>
                              <p className={isDark ? "text-zinc-200" : "text-slate-700"}>
                                {language === 'BR' 
                                  ? "64 pessoas (verão) / 35 pessoas (inverno) • Uso contínuo o ano todo" 
                                  : language === 'ES' 
                                    ? "64 personas (verano) / 35 personas (invierno) • Uso continuo todo el año" 
                                    : "64 personnel (summer) / 35 (winter) • Operational year-round"
                                }
                              </p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-zinc-500 text-[9px] block font-semibold">{language === 'BR' ? "REINAUGURAÇÃO" : language === 'ES' ? "REINAUGURACIÓN" : "REOPENING"}</span>
                              <p className={isDark ? "text-cyan-300 font-bold" : "text-cyan-700 font-bold"}>
                                {language === 'BR' ? "15 de Janeiro de 2020 (Pós-reconstrução)" : language === 'ES' ? "15 de Enero de 2020 (Post-reconstrucción)" : "January 15, 2020 (Post-reconstruction)"}
                              </p>
                            </div>
                          </div>

                          <div className="text-xs space-y-3 font-light leading-relaxed pt-3 border-t border-zinc-800/10">
                            <div>
                              <strong className="text-[9px] font-mono text-cyan-400 block mb-1">{language === 'BR' ? "ESTRUTURA FÍSICA" : language === 'ES' ? "ESTRUCTURA FÍSICA" : "PHYSICAL INFRASTRUCTURE"}</strong>
                              <p className={isDark ? "text-zinc-300" : "text-slate-600"}>
                                {language === 'BR' 
                                  ? "As edificações ocupam uma área total de 4.500m². Além de 32 unidades de alojamento, conta com 14 laboratórios de ponta no interior da Estação e mais 3 na área externa, um setor completo de saúde, uma biblioteca e sala de estar coletiva." 
                                  : language === 'ES' 
                                    ? "Edificaciones que ocupan un área de 4.500m². Dispone de 32 alojamientos, 14 laboratorios de última generación dentro de la Estación y 3 en el exterior, un moderno sector de salud, biblioteca y sala de estar colectiva." 
                                    : "Modulated structures spanning 4,500m² of built area. Featuring 32 accommodation units, 14 cutting-edge internal laboratories and 3 external research labs, a comprehensive medical wing, a library, and a shared social lounge."
                                }
                              </p>
                            </div>

                            <div>
                              <strong className="text-[9px] font-mono text-cyan-400 block mb-1">{language === 'BR' ? "MARCO HISTÓRICO E GEOPOLÍTICA (PROANTAR)" : language === 'ES' ? "MARCO HISTÓRICO Y GEOPOLÍTICA (PROANTAR)" : "HISTORICAL LANDMARK & GEOPOLITICS (PROANTAR)"}</strong>
                              <p className={isDark ? "text-zinc-300" : "text-slate-600"}>
                                {language === 'BR' 
                                  ? "Em 1982, os pioneiros do PROANTAR hastearam pela primeira vez a bandeira brasileira na Antártica, pavilhão que permanece tremulando de forma perpétua naquela localidade. As atuais instalações são compatíveis com a importância que o Brasil conquistou no cenário Antártico, tanto como Membro Consultivo do Tratado da Antártica (desde 1983) como membro do Comitê Científico de Pesquisas Antárticas (SCAR, desde 1984). A nova EACF atende de forma extraordinária a pesquisas nacionais e cooperações científicas internacionais." 
                                  : language === 'ES' 
                                    ? "En 1982, los pioneros del PROANTAR izaron por primera vez la bandera brasileña en la Antártida, pabellón que permanece flameando firmemente en esa localidad hoy en día. La escala de las instalaciones actuales es compatible con la relevancia que Brasil conquistó en el escenario antártico, tanto como Miembro Consultivo del Tratado de la Antártida (desde 1983) como miembro del Comité Científico de Investigación Antártica (SCAR, desde 1984). La nueva estación responde plenamente a la investigación nacional y el desarrollo de iniciativas de cooperación internacional activa." 
                                    : "In 1982, PROANTAR's pioneers hoisted the Brazilian flag in Antarctica for the first time, still permanently waving there today. The size of the current facilities matches Brazil's achievements on the Antarctic platform, both as a Consultative Member of the Antarctic Treaty (since 1983) and in the Scientific Committee on Antarctic Research (SCAR, since 1984). The new EACF extensively meets demands for national scientific excellence and active international academic partnerships."
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Detailed Vessel Information (Ary Rongel & Almirante Maximiano) requested by the user */}
                      {selectedMicroId === 'm2' && (
                        <div className={`p-6 border border-dashed rounded-lg transition-all ${isDark ? 'bg-[#0d1527]/40 border-cyan-500/20 text-zinc-300' : 'bg-cyan-50/20 border-cyan-600/20 text-slate-800'} space-y-6`}>
                          <div className="flex items-center gap-2 border-b border-zinc-800/10 pb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                            <h5 className="text-[10px] font-mono uppercase tracking-widest font-bold text-rose-500">
                              {language === 'BR' ? "Navios do PROANTAR: Especificações Técnicas & Operação" : language === 'ES' ? "Buques de PROANTAR: Especificaciones Técnicas y Operación" : "PROANTAR Research Vessels: Technical Specs & Operation"}
                            </h5>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Vessel 1: Ary Rongel */}
                            <div className={`p-4 rounded border ${isDark ? 'bg-zinc-950/60 border-zinc-900/60' : 'bg-white border-slate-200'} space-y-3`}>
                              <div className="flex justify-between items-start border-b border-zinc-800/10 pb-1.5 font-mono">
                                <span className={isDark ? "text-cyan-400 text-xs font-bold" : "text-cyan-800 text-xs font-bold"}>
                                  {language === 'BR' ? "NApOc “Ary Rongel” (H-44)" : language === 'ES' ? "NApOc “Ary Rongel” (H-44)" : "NApOc \"Ary Rongel\" (H-44)"}
                                </span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${isDark ? 'bg-rose-950/50 text-rose-400 border border-rose-900/30' : 'bg-rose-100 text-rose-800'}`}>
                                  {language === 'BR' ? "Gigante Vermelho" : language === 'ES' ? "Gigante Rojo" : "Red Giant"}
                                </span>
                              </div>

                              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                                {language === 'BR' 
                                  ? "Construído na Noruega em 1981, o “Gigante Vermelho” realiza apoio logístico à EACF com transporte de combustível, gêneros, equipamentos e materiais diversos que asseguaram o funcionamento ininterrupto da Estação. Serve ainda como plataforma científica, efetuando o lançamento e recolhimento de pesquisadores em refúgios e acampamentos isolados na região da Península Antártica."
                                  : language === 'ES'
                                    ? "Construido en Noruega en 1981, el “Gigante Rojo” realiza apoyo logístico a la EACF con el transporte de combustible, víveres, equipos y materiales diversos para mantener la Base operativa de forma continua. Sirve como plataforma de investigación que despliega científicos en campamentos remotos."
                                    : "Built in Norway in 1981, the \"Red Giant\" provides critical logistics support to the EACF station, carrying fuel, provisions, scientific hardware, and raw cargo to secure uninterrupted base operation. Serves as a marine science platform deployed to land and recover field researchers in camps and shelters."
                                }
                              </p>

                              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono leading-normal pt-2 border-t border-zinc-800/10">
                                <div>
                                  <span className="text-zinc-500 text-[8px] block font-semibold">{language === 'BR' ? "DIMENSÕES" : language === 'ES' ? "DIMENSIONES" : "DIMENSIONS"}</span>
                                  <span className={isDark ? 'text-zinc-300' : 'text-slate-700'}>75,20m x 13,00m boca / 6,20m calado</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500 text-[8px] block font-semibold">{language === 'BR' ? "VELOCIDADE MÁX." : language === 'ES' ? "VELOCIDIDAD MÁX." : "MAX SPEED"}</span>
                                  <span className={isDark ? 'text-zinc-300' : 'text-slate-700'}>14.5 nós / knots</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500 text-[8px] block font-semibold">{language === 'BR' ? "AUTONOMIA" : language === 'ES' ? "AUTONOMÍA" : "ENDURANCE"}</span>
                                  <span className={isDark ? 'text-zinc-300' : 'text-slate-700'}>22.872 nm (11 kts) / 98 {language === 'BR' ? "dias" : language === 'ES' ? "días" : "days"}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500 text-[8px] block font-semibold">{language === 'BR' ? "TRIPULAÇÃO & HOSPEDAGEM" : language === 'ES' ? "TRIPULACIÓN & ALOJAMIENTO" : "CREW & ADDITIONAL ACC."}</span>
                                  <span className={isDark ? 'text-zinc-300' : 'text-slate-700'}>68 {language === 'BR' ? "militares (12 oficiais, 56 praças)" : language === 'ES' ? "marinos (12 oficiales, 56 de tropa)" : "crew"} + 41 {language === 'BR' ? "pesquisadores" : language === 'ES' ? "científicos" : "berths"}</span>
                                </div>
                              </div>
                            </div>

                            {/* Vessel 2: Almirante Maximiano */}
                            <div className={`p-4 rounded border ${isDark ? 'bg-zinc-950/60 border-zinc-900/60' : 'bg-white border-slate-200'} space-y-3`}>
                              <div className="flex justify-between items-start border-b border-zinc-800/10 pb-1.5 font-mono">
                                <span className={isDark ? "text-cyan-400 text-xs font-bold" : "text-cyan-800 text-xs font-bold"}>
                                  {language === 'BR' ? "NPo “Almirante Maximiano” (H-41)" : language === 'ES' ? "NPo “Almirante Maximiano” (H-41)" : "NPo \"Almirante Maximiano\" (H-41)"}
                                </span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${isDark ? 'bg-sky-950/50 text-sky-400 border border-sky-900/30' : 'bg-sky-100 text-sky-800'}`}>
                                  {language === 'BR' ? "Laboratório Hidroceanográfico" : language === 'ES' ? "Laboratorio Oceanográfico" : "Hydro-Oceanic Vessel"}
                                </span>
                              </div>

                              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                                {language === 'BR' 
                                  ? "Construído em 1974 no estaleiro Todd (EUA), o navio polar é empregado prioritariamente na coleta sistemática de dados oceanográficos e hidrográficos em toda a região Antártica em apoio aos projetos de pesquisa acadêmica de excelência do PROANTAR."
                                  : language === 'ES'
                                    ? "Construido en 1974 en el astillero Todd (EE. UU.), el buque es operado de forma prioritaria en recolección de datos oceanográficos e hidrográficos en la región Antártica como soporte estratégico directo a la investigación en ciencia polar."
                                    : "Constructed in 1974 at Todd Shipyards (USA), this polar vessel is deployed chiefly for deep oceanographic, biological, and hydrographic data collection across Antarctic waters in alignment with PROANTAR's prime research fields."
                                }
                              </p>

                              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono leading-normal pt-2 border-t border-zinc-800/10">
                                <div>
                                  <span className="text-zinc-500 text-[8px] block font-semibold">{language === 'BR' ? "DIMENSÕES" : language === 'ES' ? "DIMENSIONES" : "DIMENSIONS"}</span>
                                  <span className={isDark ? 'text-zinc-300' : 'text-slate-700'}>93,4m {language === 'BR' ? "de comprimento" : language === 'ES' ? "eslora" : "length"}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500 text-[8px] block font-semibold">{language === 'BR' ? "VELOCIDADE MANTIDA" : language === 'ES' ? "VELOCIDAD SUSTENIDA" : "SUSTAINED SPEED"}</span>
                                  <span className={isDark ? 'text-zinc-300' : 'text-slate-700'}>11.5 nós / knots</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500 text-[8px] block font-semibold">{language === 'BR' ? "TRIPULAÇÃO" : language === 'ES' ? "TRIPULACIÓN" : "NAVY CREW"}</span>
                                  <span className={isDark ? 'text-zinc-300' : 'text-slate-700'}>54 {language === 'BR' ? "militares" : language === 'ES' ? "marinos" : "navy crew"}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500 text-[8px] block font-semibold">{language === 'BR' ? "ACOMODAÇÕES TOTAIS" : language === 'ES' ? "ALOJAMIENTO MÁXIMO" : "MAX CAPACITY"}</span>
                                  <span className={isDark ? 'text-zinc-300' : 'text-slate-700'}>119 {language === 'BR' ? "pessoas (até 30 pesquisadores)" : language === 'ES' ? "personas (hasta 30 científicos)" : "berths (up to 30 researchers)"}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: THE INTERACTIVE EXPEDITIONARY LOGBOOK */}
              {interactiveTab === 'notebook' && (
                <motion.div
                  key="v_notebook"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left Column: Notebook inputs and dials */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="pb-2 border-b border-zinc-800/20">
                      <h3 className={`text-lg font-light ${isDark ? 'text-zinc-200' : 'text-slate-800'} font-display`}>
                        {texts.notebookHeadline}
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'} mt-1`}>
                        {texts.notebookDescription}
                      </p>
                    </div>

                    {/* INTERACTIVE COMPONENT: INPUTS */}
                    <div className={`p-6 border space-y-6 ${isDark ? 'bg-zinc-950/40 border-zinc-850' : 'bg-slate-50 border-slate-200'}`}>
                      {/* Q1: Sleep hours */}
                      <div className="space-y-3">
                        <label className={`text-xs font-mono uppercase font-bold flex items-center gap-1 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                          {texts.howManyHours}
                          <div className="group relative inline-block z-30">
                            <HelpCircle className="w-3.5 h-3.5 text-zinc-500 hover:text-cyan-400 transition-colors cursor-help" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none normal-case font-normal leading-normal text-center select-none font-sans">
                              {language === 'BR'
                                ? "O monitoramento do sono identifica perturbações circadianas decorrentes do fotoperíodo polar extremo (sol da meia-noite ou noite polar)."
                                : language === 'ES'
                                  ? "El monitoreo de horas de sueño identifica alteraciones circadianas causadas por el fotoperíodo polar extremo (sol de medianoche o noche polar)."
                                  : "Monitoring sleep duration identifies circadian rhythm disruptions caused by extreme polar photoperiods (midnight sun or polar night)."
                              }
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-950" />
                            </div>
                          </div>
                        </label>
                        <div className="flex gap-2">
                          {[4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <button
                              key={num}
                              onClick={() => setSleepHours(num)}
                              className={`flex-1 py-1.5 font-mono text-xs border text-center cursor-pointer transition-all ${
                                sleepHours === num
                                  ? 'bg-cyan-500 border-cyan-500 text-white font-bold'
                                  : (isDark ? 'bg-black border-zinc-800 text-zinc-400 hover:text-white' : 'bg-white border-slate-300 text-slate-600')
                              }`}
                            >
                              {num}h
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Q2: Dominant Mood */}
                      <div className="space-y-3">
                        <label className={`text-xs font-mono uppercase font-bold flex items-center gap-1 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                          {texts.moodLabel}
                          <div className="group relative inline-block z-30">
                            <HelpCircle className="w-3.5 h-3.5 text-zinc-500 hover:text-cyan-400 transition-colors cursor-help" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none normal-case font-normal leading-normal text-center select-none font-sans">
                              {language === 'BR'
                                ? "Flutuações afetivas recorrentes são marcadores do estresse de confinamento prolongado e da Síndrome do T3 Polar (alterações na tiroide e cognição)."
                                : language === 'ES'
                                  ? "Las fluctuaciones de ánimo son marcadores de la tensión de confinamiento y el Síndrome del T3 Polar (cambios de tiroides y cognición)."
                                  : "Mood shifts are sensitive indicators of prolonged confinement stress and Polar T3 Syndrome (thyroid activity and cognitive alterations)."
                              }
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-950" />
                            </div>
                          </div>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { key: 'calm', pt: 'Tranquilo / Estável', en: 'Calm / Checked', style: 'border-cyan-500 text-cyan-400 bg-cyan-950/20' },
                            { key: 'focused', pt: 'Focado / Operacional', en: 'Focused / Operational', style: 'border-emerald-500 text-emerald-400 bg-emerald-950/20' },
                            { key: 'tired', pt: 'Cansado / Exausto', en: 'Tired / Exhausted', style: 'border-amber-500 text-amber-400 bg-amber-950/20' },
                            { key: 'anxious', pt: 'Ansioso / Tenso', en: 'Anxious / Tense', style: 'border-rose-500 text-rose-400 bg-rose-950/20' }
                          ].map((moodItem) => {
                            const IsSelected = selectedMood === moodItem.key;
                            return (
                              <button
                                key={moodItem.key}
                                onClick={() => setSelectedMood(moodItem.key as any)}
                                className={`p-2.5 text-left border font-mono text-[10px] cursor-pointer transition-all ${
                                  IsSelected
                                    ? `${moodItem.style} font-bold border-2`
                                    : (isDark ? 'bg-black border-zinc-900 text-zinc-500 hover:text-zinc-300' : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-100')
                                }`}
                              >
                                {language === 'BR' ? moodItem.pt : moodItem.en}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Q3: Stressors checkboxes */}
                      <div className="space-y-3">
                        <label className={`text-xs font-mono uppercase font-bold flex items-center gap-1 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                          {texts.stressorsLabel}
                          <div className="group relative inline-block z-30">
                            <HelpCircle className="w-3.5 h-3.5 text-zinc-500 hover:text-cyan-400 transition-colors cursor-help" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none normal-case font-normal leading-normal text-center select-none font-sans">
                              {language === 'BR'
                                ? "Estressores ambientais polares (frio, ventos intensos e atrasos na rede) ativam defesas neurovegetativas e respostas adaptativas de enfrentamento (coping)."
                                : language === 'ES'
                                  ? "Los estresores ambientales polares (frío, vientos severos y demoras en red) activan respuestas neurovegetativas y de afrontamiento (coping)."
                                  : "Extreme polar environmental stressors (severe cold, winds, and web delays) activate neurovegetative strain and adaptive coping responses."
                              }
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-950" />
                            </div>
                          </div>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { key: 'cold', label: texts.stressorCold },
                            { key: 'noise', label: texts.stressorNoise },
                            { key: 'wind', label: texts.stressorWind },
                            { key: 'comm', label: texts.stressorComm }
                          ].map((item) => {
                            const IsChecked = activeStressors.includes(item.key);
                            return (
                              <button
                                key={item.key}
                                onClick={() => handleStressorToggle(item.key)}
                                className={`p-2.5 text-left border flex items-center justify-between text-[11px] cursor-pointer transition-all ${
                                  IsChecked
                                    ? 'border-cyan-400 text-cyan-400 bg-cyan-950/10'
                                    : (isDark ? 'bg-black border-zinc-900 text-zinc-500' : 'bg-white border-slate-200 text-slate-600')
                                }`}
                              >
                                <span>{item.label}</span>
                                <span className={`w-2.5 h-2.5 rounded-full ${IsChecked ? 'bg-cyan-400' : 'bg-transparent border border-zinc-800'}`} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual output calculating dynamic adaptiveness */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div className={`p-8 border h-full flex flex-col justify-between relative overflow-hidden ${
                      isDark ? 'bg-[#060b14]/75 border-zinc-800 shadow-xl' : 'bg-white border-slate-200'
                    }`}>
                      {/* Grid background simulation */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />

                      <div className="space-y-8 relative z-10">
                        <div className="flex items-center justify-between border-b border-zinc-800/10 pb-4">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400">
                            CÁLCULO ALGORÍTMICO INTEGRADO
                          </span>
                          <Gauge className="w-5 h-5 text-cyan-400" />
                        </div>

                        {/* Animated gauge meter output */}
                        <div className="text-center space-y-2 py-4">
                          <div className={`text-5xl md:text-7xl font-mono font-bold ${
                            adaptabilityScore > 75 ? 'text-emerald-400' : adaptabilityScore > 50 ? 'text-amber-400' : 'text-rose-500'
                          }`}>
                            {adaptabilityScore}%
                          </div>
                          <div className={`text-xs font-mono uppercase tracking-wider ${isDark ? 'text-zinc-300' : 'text-slate-800'}`}>
                            {texts.adaptabilityReport}
                          </div>
                          <p className={`text-[11px] max-w-sm mx-auto ${isDark ? 'text-zinc-400' : 'text-slate-500'} leading-relaxed`}>
                            {texts.adaptabilityDesc}
                          </p>
                        </div>

                        {/* Interactive dynamic clinical output logs mimicking science protocol */}
                        <div className={`p-4 border font-mono text-[10px] space-y-2 ${isDark ? 'bg-black/50 border-zinc-850 text-cyan-300' : 'bg-slate-50 border-slate-150 text-cyan-800'}`}>
                          <div>&gt; _ CALCULATING BIO-ADJUSTMENT COEFFICIENTS...</div>
                          <div>&gt; SLEEP INDEX: {sleepHours} hrs logged ({sleepHours >= 7 && sleepHours <= 8 ? "Optimal Delta recovery" : "Partial circadian shift"})</div>
                          <div>&gt; MIND REGISTRY: {selectedMood.toUpperCase()}</div>
                          <div>&gt; CLOUD ANOMALY DETECTOR: {activeStressors.length > 0 ? `${activeStressors.length} active stress loops` : "No stressors flagged"}</div>
                          <div className="h-[1px] bg-cyan-700/20 my-1" />
                          <div className="text-xs uppercase font-bold text-white flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            {language === 'BR' ? "Aclimatização Recomendada: " : "Recommended Acclimatization Status: "}
                            {adaptabilityScore > 75 ? "EXCELENTE" : adaptabilityScore > 50 ? "MONITORAMENTO REGULAR" : "INTERVENÇÃO RECOMENDADA"}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-zinc-800/10 flex items-center justify-between text-[9px] font-mono text-zinc-500 z-10">
                        <span>Simulação sem valor científico.</span>
                        <span>OFFLINE SYNC ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: SAÚDEANTAR-IA SIMULATOR */}
              {interactiveTab === 'ai' && (
                <motion.div
                  key="v_ai"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left Column: Select profile and Action button */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="pb-2 border-b border-zinc-800/20">
                      <h3 className={`text-lg font-light ${isDark ? 'text-zinc-200' : 'text-slate-800'} font-display`}>
                        {texts.aiHeadline}
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'} mt-1`}>
                        {texts.aiDescription}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <label className={`text-xs font-mono uppercase font-bold block ${isDark ? 'text-zinc-300' : 'text-slate-650'}`}>
                        {texts.selectSubject}
                      </label>

                      <div className="space-y-2">
                        {[
                          { id: 'p1', label: texts.p1Label },
                          { id: 'p2', label: texts.p2Label },
                          { id: 'p3', label: texts.p3Label }
                        ].map((p) => {
                          const IsSelected = selectedProfile === p.id;
                          return (
                            <button
                              key={p.id}
                              onClick={() => { setSelectedProfile(p.id as any); setAiDiagnosticResult(null); }}
                              className={`w-full p-4 text-left border flex items-center justify-between cursor-pointer transition-all ${
                                IsSelected
                                  ? (isDark ? 'bg-cyan-950/20 border-cyan-500' : 'bg-cyan-50 border-cyan-300')
                                  : (isDark ? 'bg-zinc-950/30 border-zinc-900 hover:border-zinc-800' : 'bg-white border-slate-200 hover:border-slate-300')
                              }`}
                            >
                              <span className={`text-xs font-mono font-medium ${IsSelected ? (isDark ? 'text-cyan-300' : 'text-cyan-800 font-bold') : (isDark ? 'text-zinc-400' : 'text-slate-650')}`}>
                                {p.label}
                              </span>
                              <span className={`w-3 h-3 border ${IsSelected ? 'bg-cyan-400 border-cyan-400' : 'border-zinc-800'}`} />
                            </button>
                          );
                        })}
                      </div>

                      {/* Main Action Trigger */}
                      <button
                        onClick={handleRunAiDiagnostic}
                        disabled={aiIsAnalyzing}
                        className="w-full py-3.5 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-mono text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Sparkles className={`w-4 h-4 ${aiIsAnalyzing ? 'animate-spin' : ''}`} />
                        {aiIsAnalyzing ? texts.diagnosing : texts.runDiagnostic}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: AI telemetry screen output */}
                  <div className="lg:col-span-7">
                    <div className={`p-8 border h-full flex flex-col justify-between ${
                      isDark ? 'bg-[#03070e] border-zinc-800 text-zinc-300 shadow-2xl shadow-black/80' : 'bg-white border-slate-200'
                    }`}>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-800/10 pb-4">
                          <span className="text-[10px] font-mono text-cyan-400 tracking-wider">
                            {texts.diagResult}
                          </span>
                          <span className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
                            ONLINE ASSISTOR • INTEL NEURAL
                          </span>
                        </div>

                        {/* Real-time Loading simulation or dynamic analytical reports */}
                        {aiIsAnalyzing ? (
                          <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <div className="w-10 h-10 border-2 border-cyan-500/10 border-t-cyan-400 rounded-full animate-spin" />
                            <span className="font-mono text-xs text-cyan-400 animate-pulse uppercase tracking-widest">{texts.diagnosing}</span>
                          </div>
                        ) : aiDiagnosticResult ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center justify-between bg-black/40 p-4 border border-zinc-850">
                              <span className="text-xs font-mono uppercase font-bold">Diagnóstico Geral</span>
                              <span className={`font-mono text-xs uppercase px-2 py-0.5 border ${
                                aiDiagnosticResult.status === 'stable' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20' :
                                aiDiagnosticResult.status === 'warning' ? 'border-amber-500/30 text-amber-400 bg-amber-950/20' :
                                'border-cyan-500/30 text-cyan-400 bg-cyan-950/20'
                              }`}>
                                {aiDiagnosticResult.status.toUpperCase()}
                              </span>
                            </div>

                            {/* Predictive core numbers */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                              <div className={`p-3 border ${isDark ? 'bg-zinc-950/50 border-zinc-850' : 'bg-slate-50'}`}>
                                <span className="text-[9px] font-mono text-zinc-400 block uppercase">Qualidade do Sono</span>
                                <span className="font-mono text-lg font-bold text-cyan-300 block mt-1">{aiDiagnosticResult.metrics.sleep}</span>
                              </div>
                              <div className={`p-3 border ${isDark ? 'bg-zinc-950/50 border-zinc-850' : 'bg-slate-50'}`}>
                                <span className="text-[9px] font-mono text-zinc-400 block uppercase">Fadiga Geral</span>
                                <span className="font-mono text-lg font-bold text-amber-400 block mt-1">{aiDiagnosticResult.metrics.fatg}</span>
                              </div>
                              <div className={`p-3 border ${isDark ? 'bg-zinc-950/50 border-zinc-850' : 'bg-slate-50'}`}>
                                <span className="text-[9px] font-mono text-zinc-400 block uppercase">Fator Estresse</span>
                                <span className="font-mono text-lg font-bold text-rose-400 block mt-1">{aiDiagnosticResult.metrics.stress}</span>
                              </div>
                              <div className={`p-3 border ${isDark ? 'bg-zinc-950/50 border-zinc-850' : 'bg-slate-50'}`}>
                                <span className="text-[9px] font-mono text-zinc-400 block uppercase">Ciclo Circadiano</span>
                                <span className="font-mono text-[9px] font-semibold text-purple-400 block mt-2">{aiDiagnosticResult.metrics.circadian}</span>
                              </div>
                            </div>

                            {/* Clinical narrative response */}
                            <div className={`p-5 border ${isDark ? 'bg-zinc-950 border-zinc-850' : 'bg-slate-50'} shadow-sm`}>
                              <div className="text-xs font-light leading-relaxed">
                                {aiDiagnosticResult.bullet}
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center border border-dashed border-zinc-850/50">
                            <Sparkles className="w-8 h-8 text-zinc-650 animate-pulse" />
                            <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                              Aguardando Inicialização do Simulador de Telemedicina
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="pt-6 border-t border-zinc-800/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                        <span>Simulação sem valor científico.</span>
                        <span>ACCURACY RATE: 94.2%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: SPACE ANALOG SIMULATION ENGINE */}
              {interactiveTab === 'space' && (
                <motion.div
                  key="v_space"
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -15 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 p-4 sm:p-6 rounded-2xl relative overflow-hidden border ${
                    isDark
                      ? 'bg-gradient-to-br from-[#02050c] via-[#040e21] to-[#010307] border-cyan-500/20 shadow-2xl'
                      : 'bg-[#030914] border-cyan-400/30 shadow-2xl text-zinc-100'
                  }`}
                >
                  {/* Futuristic Grid Pattern Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                  
                  {/* Ambient Holographic Glow */}
                  <div className="absolute -top-40 -left-45 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
                  <div className="absolute -bottom-40 -right-45 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse [animation-duration:6s]" />

                  {/* Corner Brackets decoration (HUD feel) */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/70" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/70" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/70" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/70" />

                  {/* Top Status Strip */}
                  <div className="col-span-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-4 mb-2 z-10">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-400 font-black">
                        ANALOG COOPERATIVE STATION #II // EXPEDITIONARY BIOSPHERE GRID
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[9px] font-mono text-zinc-400">
                      <span>SEC_LEVEL: ALPHA</span>
                      <span>MISSION SOL: {Math.floor(spaceConfinementDays / 1.25)}</span>
                      <span className="text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded animate-pulse bg-orange-950/35 uppercase font-bold tracking-widest">
                        {spaceGravitySim === 'mars' ? 'Mars Expedition' : spaceGravitySim === 'moon' ? 'Lunar Base' : 'Hermes L-Orbit'}
                      </span>
                    </div>
                  </div>

                  {/* Left Column - Scientific Content & Exploro Pillars */}
                  <div className="col-span-12 lg:col-span-6 space-y-5 z-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-cyan-400 mb-1">
                          <Orbit className="w-5 h-5 animate-spin-slow text-orange-400" />
                          <span className="font-mono text-[9px] uppercase tracking-[0.25em] font-semibold text-orange-300">
                            {language === 'BR' ? "COOPERAÇÃO ESPACIAL E POLAR" : language === 'ES' ? "COOPERACIÓN ESPACIAL Y POLAR" : "SPACE & POLAR COOPERATION"}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2.5xl lg:text-3xl font-black text-white font-display leading-tight tracking-tight uppercase bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-orange-200">
                          {texts.spaceHeadline}
                        </h3>
                        {/* Highlights Box identical to the Banner's style */}
                        <div className="mt-3 px-3 py-1.5 border border-orange-500/30 bg-orange-950/20 rounded-md">
                          <p className="text-[10px] md:text-xs font-bold text-orange-400 font-mono tracking-wider">
                            {texts.spaceSubtitle}
                          </p>
                        </div>
                      </div>

                      {/* Scientific Banner Descriptions */}
                      <div className="space-y-3 text-xs font-light leading-relaxed text-zinc-300">
                        <p>
                          {texts.spaceDescription}
                        </p>
                        <div className="p-3 border-l-2 border-orange-500 bg-orange-950/10 rounded-r-lg italic">
                          <p className="text-[11px] text-orange-200/90 leading-relaxed font-sans">
                            {texts.spaceMarsComparison}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Integrated Rich Interactive Vector Space-Analog Canvas (Marvelous custom design!) */}
                    <div className="py-2">
                      <div className="relative w-full aspect-[2/1.1] rounded-xl overflow-hidden border border-cyan-500/20 bg-gradient-to-b from-[#02050d] via-[#0b1321] to-[#040810] group">
                        {/* Stars & Grid overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:16px_16px]" />
                        
                        {/* Interactive UI Status Tag Overlay */}
                        <div className="absolute bottom-2.5 left-4 text-[7px] sm:text-[8px] font-mono tracking-wider text-orange-400 flex items-center gap-1.5 z-20">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                          <span className="font-semibold uppercase tracking-[0.15em]">
                            ARES III BIO-GRID // {spaceGravitySim.toUpperCase()} SIMULATED SURFACE
                          </span>
                        </div>

                        {/* Scanner Line swipe */}
                        <div className="absolute inset-x-0 h-[1.5px] bg-cyan-500/25 shadow-[0_0_12px_rgba(6,182,212,0.6)] animate-pulse" style={{ top: '35%' }} />

                        <svg viewBox="0 0 500 270" className="w-full h-full select-none">
                          <defs>
                            {/* Stars RadGrad */}
                            <radialGradient id="skyVoidGrad" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#040815" />
                              <stop offset="100%" stopColor="#010207" />
                            </radialGradient>

                            {/* Earth Radial Gradient */}
                            <radialGradient id="earthGrad" cx="35%" cy="35%" r="65%">
                              <stop offset="0%" stopColor="#e0f2fe" />
                              <stop offset="20%" stopColor="#38bdf8" />
                              <stop offset="65%" stopColor="#0284c7" />
                              <stop offset="90%" stopColor="#0f172a" />
                              <stop offset="100%" stopColor="#000000" />
                            </radialGradient>

                            {/* Gold Visor Gradient for Astronaut Helmets */}
                            <linearGradient id="goldVisor" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#fbbf24" />
                              <stop offset="50%" stopColor="#d97706" />
                              <stop offset="100%" stopColor="#78350f" />
                            </linearGradient>

                            {/* Mars Soil/Terrain Gradient */}
                            <linearGradient id="marsSoilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#ea580c" />
                              <stop offset="35%" stopColor="#c2410c" />
                              <stop offset="70%" stopColor="#9a3412" />
                              <stop offset="100%" stopColor="#450a0a" />
                            </linearGradient>

                            {/* Lunar Soil/Terrain Gradient */}
                            <linearGradient id="moonSoilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#94a3b8" />
                              <stop offset="40%" stopColor="#64748b" />
                              <stop offset="75%" stopColor="#475569" />
                              <stop offset="100%" stopColor="#1e293b" />
                            </linearGradient>

                            {/* Station Metal Deck Gradient */}
                            <linearGradient id="stationDeckGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#1e293b" />
                              <stop offset="40%" stopColor="#334155" />
                              <stop offset="100%" stopColor="#0f172a" />
                            </linearGradient>

                            {/* Pressurized Habitat White Dome Gradient */}
                            <radialGradient id="habCanvasGrad" cx="45%" cy="30%" r="55%">
                              <stop offset="0%" stopColor="#ffffff" />
                              <stop offset="70%" stopColor="#e2e8f0" />
                              <stop offset="100%" stopColor="#94a3b8" />
                            </radialGradient>

                            {/* Greenhouse translucent cupola */}
                            <radialGradient id="greenhouseGrad" cx="50%" cy="30%" r="60%">
                              <stop offset="0%" stopColor="#86efac" stopOpacity="0.4" />
                              <stop offset="75%" stopColor="#22c55e" stopOpacity="0.08" />
                              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.6" />
                            </radialGradient>
                          </defs>

                          {/* Zero-G/Deep space background blackness */}
                          <rect width="500" height="270" fill="url(#skyVoidGrad)" />

                          {/* Outer Stars */}
                          <circle cx="50" cy="40" r="1" fill="#fff" opacity="0.8" />
                          <circle cx="280" cy="30" r="1" fill="#fff" opacity="0.5" />
                          <circle cx="160" cy="110" r="0.75" fill="#fff" opacity="0.6" />
                          <circle cx="450" cy="80" r="1.5" fill="#cbd5e1" opacity="0.4" className="animate-pulse" />
                          <circle cx="330" cy="120" r="1" fill="#fff" opacity="0.8" />

                          {/* ================= BACKGROUND: PLANET EARTH ================= */}
                          {/* Earth rises or glows at the background depending on gravity simulation */}
                          <g className="transition-all duration-700">
                            {spaceGravitySim === 'mars' && (
                              <g transform="translate(390, 50)" className="cursor-help filter drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]">
                                {/* Earth sphere */}
                                <circle cx="0" cy="0" r="26" fill="url(#earthGrad)" />
                                {/* Glow Halo */}
                                <circle cx="0" cy="0" r="26" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeOpacity="0.65" />
                                {/* Swirly visible oceans/continents curves */}
                                <path d="M -15,-5 Q -5,-15 10,-8 T 18,12 Q 10,25 -5,15 Z" fill="#22c55e" opacity="0.45" />
                                <path d="M -8,11 Q -2,6 8,14" fill="none" stroke="#22c55e" strokeWidth="3" opacity="0.5" />
                                <path d="M -20,-12 Q -12,-8 -5,-15" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                                {/* HUD Tracking graphics */}
                                <rect x="-32" y="-32" width="64" height="64" fill="none" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
                                <path d="M -32,-20 V -32 H -20" fill="none" stroke="#ff8200" strokeWidth="1" />
                                <path d="M 32,-20 V -32 H 20" fill="none" stroke="#ff8200" strokeWidth="1" />
                                <path d="M -32,20 V 32 H -20" fill="none" stroke="#ff8200" strokeWidth="1" />
                                <path d="M 32,20 V 32 H 20" fill="none" stroke="#ff8200" strokeWidth="1" />
                                <text x="0" y="-38" fill="#54d3ee" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">
                                  EARTH TARGET (RESCUE DIST)
                                </text>
                              </g>
                            )}

                            {spaceGravitySim === 'moon' && (
                              <g transform="translate(320, 65)" className="filter drop-shadow-[0_0_22px_rgba(56,189,248,0.85)]">
                                {/* Larger Earth Sunrise (magnificent blue marble) */}
                                <circle cx="0" cy="0" r="44" fill="url(#earthGrad)" />
                                <circle cx="0" cy="0" r="44.5" fill="none" stroke="#7dd3fc" strokeWidth="3.5" strokeOpacity="0.8" />
                                
                                {/* Realistic Continent Shapes */}
                                <path d="M -25,-12 Q -8,-32 10,-10 T 32,15 Q 15,35 -15,22 Z" fill="#16a34a" opacity="0.5" />
                                <path d="M -35,5 Q -20,20 -10,32 T 22,25" fill="none" stroke="#22c55e" strokeWidth="5.5" strokeLinecap="round" opacity="0.45" />
                                <path d="M 8,-28 Q 15,-15 32,-18" fill="none" stroke="#15803d" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                                {/* Intricate Swirly White Clouds */}
                                <path d="M-30,-20 Q-10,0 20,-15 T 40,12" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
                                <path d="M-25,18 Q0,5 25,24" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" opacity="0.7" />
                                <text x="0" y="-52" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                                  EARTHRISE // OVER LUNAR CANYON
                                </text>
                              </g>
                            )}

                            {spaceGravitySim === 'micro' && (
                              <g transform="translate(250, 240)">
                                {/* Gigantic curving Earth backdrop fill (Colossal blue surface) */}
                                <circle cx="0" cy="0" r="190" fill="url(#earthGrad)" />
                                <circle cx="0" cy="0" r="191" fill="none" stroke="#0ea5e9" strokeWidth="4" strokeOpacity="0.5" />
                                {/* Earth swirls on grand scale */}
                                <path d="M-150,-120 C-80,-60 -50,-160 50,-100 C120,-60 160,-150 180,-80" fill="none" stroke="#22c55e" strokeWidth="18" strokeLinecap="round" opacity="0.3" />
                                <path d="M-110,-70 C-30,-30 40,-90 120,-40" fill="none" stroke="#15803d" strokeWidth="24" strokeLinecap="round" opacity="0.32" />
                                <path d="M-170,-90 C-90,-10 10,-100 130,-50" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" opacity="0.65" />
                                <path d="M-130,-40 C-50,20 60,-60 160,10" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" opacity="0.6" />
                              </g>
                            )}
                          </g>

                          {/* ================= GROUND TERRAIN SOIL ================= */}
                          {/* Rich analog landscape terrain */}
                          <g className="transition-all duration-500">
                            {spaceGravitySim === 'mars' && (
                              <g>
                                {/* Curved Sand Dunes for Mars */}
                                <path d="M-20 270 L80 185 Q160 170 240 210 T400 172 L520 270 Z" fill="url(#marsSoilGrad)" />
                                <path d="M-20 270 L80 185 Q160 170 240 210 T400 172 L520 270" fill="none" stroke="#ea580c" strokeWidth="1.5" />
                                {/* Secondary Dune overlay */}
                                <path d="M110 270 L220 220 Q290 200 360 225 L490 270 Z" fill="#9a3412" opacity="0.7" />
                                <path d="M110 270 L220 220 Q290 200 360 225 L490 270" fill="none" stroke="#f97316" strokeWidth="0.8" opacity="0.5" />
                                {/* Rover tracks tire treads */}
                                <path d="M-10 262 Q 130 190 208 221" fill="none" stroke="#450a0a" strokeWidth="3" strokeDasharray="4 4" opacity="0.8" />
                                <path d="M15 264 Q 148 194 213 222" fill="none" stroke="#450a0a" strokeWidth="3" strokeDasharray="4 4" opacity="0.8" />
                                {/* Martian rocks and boulders */}
                                <ellipse cx="380" cy="235" rx="10" ry="6" fill="#7c2d12" stroke="#ea580c" strokeWidth="0.75" />
                                <circle cx="384" cy="232" r="3" fill="#ea580c" />
                                <ellipse cx="145" cy="250" rx="6" ry="4" fill="#450a0a" stroke="#9a3412" />
                              </g>
                            )}

                            {spaceGravitySim === 'moon' && (
                              <g>
                                {/* Gray, Cratered Lunar Ground */}
                                <path d="M-20 270 L100 195 Q180 180 260 215 T410 180 L520 270 Z" fill="url(#moonSoilGrad)" />
                                <path d="M-20 270 L100 195 Q180 180 260 215 T410 180 L520 270" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                                {/* Lunar Crater Overlays */}
                                <ellipse cx="150" cy="230" rx="14" ry="7" fill="none" stroke="#475569" strokeWidth="1.5" opacity="0.8" />
                                <ellipse cx="148" cy="231" rx="11" ry="5.5" fill="#334155" opacity="0.4" />
                                <ellipse cx="370" cy="220" rx="30" ry="12" fill="none" stroke="#334155" strokeWidth="2.2" opacity="0.6" strokeDasharray="6 3" />
                                <ellipse cx="368" cy="221" rx="26" ry="10" fill="#1e293b" opacity="0.5" />
                                {/* Secondary Ridge */}
                                <path d="M-10 270 L120 230 Q220 210 290 235 L450 270 Z" fill="#334155" opacity="0.75" />
                              </g>
                            )}

                            {spaceGravitySim === 'micro' && (
                              <g>
                                {/* Space Station Metal Framework (Hermes Hull architecture) */}
                                <rect x="-20" y="222" width="540" height="60" fill="url(#stationDeckGrad)" />
                                <line x1="0" y1="222" x2="500" y2="222" stroke="#22d3ee" strokeWidth="2.5" />
                                <line x1="0" y1="222" x2="500" y2="222" stroke="#0891b2" strokeWidth="6" strokeOpacity="0.3" />
                                {/* Metal Grids and rivets on base */}
                                <line x1="50" y1="222" x2="50" y2="270" stroke="#475569" strokeWidth="1.5" />
                                <line x1="150" y1="222" x2="150" y2="270" stroke="#475569" strokeWidth="1.5" />
                                <line x1="250" y1="222" x2="250" y2="270" stroke="#475569" strokeWidth="1.5" />
                                <line x1="350" y1="222" x2="350" y2="270" stroke="#475569" strokeWidth="1.5" />
                                <line x1="450" y1="222" x2="450" y2="270" stroke="#475569" strokeWidth="1.5" />
                                {/* Glowing warning line */}
                                <line x1="0" y1="235" x2="500" y2="235" stroke="#eab308" strokeWidth="1" strokeDasharray="8 4" />
                                {/* Cyber panel indicators */}
                                <rect x="80" y="245" width="22" height="10" rx="1" fill="#020617" stroke="#0891b2" strokeWidth="0.5" />
                                <circle cx="85" cy="250" r="1.5" fill="#22c55e" className="animate-pulse" />
                                <circle cx="91" cy="250" r="1.5" fill="#f43f5e" />
                                <circle cx="97" cy="250" r="1.5" fill="#3b82f6" />
                              </g>
                            )}
                          </g>

                          {/* ================= SPACE HABITAT & MODULES ================= */}
                          {/* Pressurized Habitat Domes and Solar generator fields */}
                          <g className="transition-all duration-500">
                            {spaceGravitySim !== 'micro' ? (
                              <g>
                                {/* Ares III pressurized Habitat Dome (Center Left) */}
                                <g transform="translate(145, 198)">
                                  {/* White protective thermal shell */}
                                  <path d="M -28 0 A 28 28 0 0 1 28 0 Z" fill="url(#habCanvasGrad)" stroke="#475569" strokeWidth="1" />
                                  {/* Canvas segments and reinforced ribs */}
                                  <path d="M -28 0 Q -10 -18 0 -28 Q 10 -18 28 0" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                                  <path d="M -22 -17 Q 0 -8 22 -17" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                                  <path d="M -14 -24 Q 0 -12 14 -24" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                                  
                                  {/* Safety Orange/hazard band representing Ares III tape */}
                                  <path d="M -26 -11 Q 0 -1 26 -11" fill="none" stroke="#f97316" strokeWidth="1.5" />
                                  
                                  {/* Airlock Chamber Annex */}
                                  <rect x="23" y="-12" width="12" height="12" fill="#cbd5e1" stroke="#475569" strokeWidth="0.75" />
                                  <rect x="28" y="-10" width="5" height="10" fill="#1e293b" />
                                  <polygon points="26,-6 29,-6 29,-7 26,-7" fill="#eab308" />

                                  {/* Status Lamp pulsing on top */}
                                  <circle cx="0" cy="-28" r="2.5" fill="#ef4444" className="animate-pulse" />
                                  <line x1="0" y1="-28" x2="0" y2="-34" stroke="#64748b" strokeWidth="0.75" />
                                  <line x1="-5" y1="-34" x2="5" y2="-34" stroke="#e2e8f0" strokeWidth="0.5" />
                                  
                                  {/* Typography marking */}
                                  <text x="0" y="-8" fill="#c2410c" fontSize="5.5" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.8">
                                    ARES III
                                  </text>
                                </g>

                                {/* Ares III Secondary Dome: Biological Greenhouse Unit (Agronomical Special!) */}
                                <g transform="translate(80, 215)">
                                  {/* Geodesic translucent structure */}
                                  <path d="M -18 0 A 18 18 0 0 1 18 0 Z" fill="url(#greenhouseGrad)" stroke="#22c55e" strokeWidth="0.75" strokeOpacity="0.7" />
                                  <path d="M -18 0 Q -8 -10 0 -18 Q 8 -10 18 0" fill="none" stroke="#4ade80" strokeWidth="0.5" strokeOpacity="0.5" />
                                  <path d="M -15 -10 Q 0 -4 15 -10" fill="none" stroke="#4ade80" strokeWidth="0.5" strokeOpacity="0.5" />
                                  
                                  {/* Miniature dynamic plants visible inside */}
                                  <g transform="translate(-8, 0)">
                                    <line x1="0" y1="0" x2="0" y2="-5" stroke="#904d30" strokeWidth="1.5" />
                                    <path d="M-2,-5 C-2,-8 2,-8 2,-5" fill="none" stroke="#22c55e" strokeWidth="1" />
                                  </g>
                                  <g transform="translate(0, 0)">
                                    <line x1="0" y1="0" x2="0" y2="-6" stroke="#904d30" strokeWidth="1.5" />
                                    <path d="M-3,-6 C-3,-9 3,-9 3,-6" fill="none" stroke="#22c55e" strokeWidth="1" />
                                  </g>
                                  <g transform="translate(8, 0)">
                                    <line x1="0" y1="0" x2="0" y2="-5" stroke="#904d30" strokeWidth="1.5" />
                                    <path d="M-2,-5 C-2,-8 2,-8 2,-5" fill="none" stroke="#22c55e" strokeWidth="1" />
                                  </g>
                                  
                                  <text x="0" y="-21" fill="#4ade80" fontSize="4.5" fontFamily="monospace" textAnchor="middle" letterSpacing="0.2">
                                    BIOMASS_LAB
                                  </text>
                                </g>

                                {/* Ares III Communications Dish and High-Gain Antenna */}
                                <g transform="translate(205, 206)">
                                  <line x1="0" y1="12" x2="0" y2="-15" stroke="#94a3b8" strokeWidth="1.25" />
                                  {/* Parabolic receiver */}
                                  <path d="M -11 -15 Q 0 -22 11 -15 Q 8 -13 0 -11 Q -8 -13 -11 -15" fill="#f1f5f9" stroke="#475569" strokeWidth="0.75" />
                                  <line x1="0" y1="-15" x2="0" y2="-21" stroke="#38bdf8" strokeWidth="0.8" />
                                  <circle cx="0" cy="-21" r="1.5" fill="#ff4500" className="animate-pulse" />
                                  {/* Wave transmissions */}
                                  <path d="M-7,-25 Q0,-31 7,-25" fill="none" stroke="#38bdf8" strokeWidth="0.75" className="animate-pulse" />
                                </g>

                                {/* Ares III Solar Panel Fields (Angled arrays pointing up) */}
                                <g transform="translate(235, 208)">
                                  {/* Array 1 */}
                                  <polygon points="0,0 8,-12 16,-10 8,2" fill="#0f172a" stroke="#22d3ee" strokeWidth="0.75" />
                                  <line x1="6" y1="-1" x2="10" y2="-9" stroke="#64748b" strokeWidth="0.5" />
                                  {/* Array 2 */}
                                  <polygon points="12,2 20,-10 28,-8 20,4" fill="#0f172a" stroke="#22d3ee" strokeWidth="0.75" />
                                  <line x1="18" y1="1" x2="22" y2="-7" stroke="#64748b" strokeWidth="0.5" />
                                </g>

                                {/* The Ares III Scientific Rover (Rugged six-wheeler explorer) */}
                                <g transform="translate(425, 226)" className="transition-all duration-300">
                                  {/* Rover black shadow */}
                                  <ellipse cx="0" cy="8" rx="14" ry="3.5" fill="#000" opacity="0.4" />
                                  {/* 6 robust treads wheels */}
                                  <circle cx="-10" cy="8" r="4.5" fill="#1e293b" stroke="#64748b" strokeWidth="0.75" />
                                  <circle cx="0" cy="8" r="4.5" fill="#1e293b" stroke="#64748b" strokeWidth="0.75" />
                                  <circle cx="10" cy="8" r="4.5" fill="#1e293b" stroke="#64748b" strokeWidth="0.75" />
                                  
                                  {/* High tech modular chassis body with red logotype indicator */}
                                  <rect x="-14" y="-1" width="28" height="8.5" rx="1.5" fill="#ffffff" stroke="#475569" strokeWidth="0.8" />
                                  <line x1="-14" y1="3" x2="14" y2="3" stroke="#ea580c" strokeWidth="1" />
                                  
                                  {/* Communications dish on rover */}
                                  <path d="M-6,-1 Q-9,-7 -6,-11 Q-3,-7 -6,-1" fill="#e2e8f0" stroke="#475569" strokeWidth="0.5" />
                                  
                                  {/* Rover camera sensor mast */}
                                  <line x1="8" y1="-1" x2="8" y2="-12" stroke="#475569" strokeWidth="1" />
                                  <circle cx="8" cy="-12" r="2" fill="#fdba74" />
                                  <circle cx="8" cy="-12" r="0.75" fill="#ea580c" />

                                  {/* National/Cooperative Small Flag staff on Rover */}
                                  <g transform="translate(-11, -12)">
                                    <line x1="0" y1="12" x2="0" y2="-3" stroke="#475569" strokeWidth="0.6" />
                                    {/* Small BR Brazilian Flag emblem */}
                                    <rect x="0" y="-3" width="9" height="6" fill="#15803d" />
                                    <polygon points="4.5,-3 9,0 4.5,3 0,0" fill="#eab308" />
                                    <circle cx="4.5" cy="0" r="1.2" fill="#1d4ed8" />
                                  </g>
                                </g>
                              </g>
                            ) : (
                              <g>
                                {/* Hermes Command Module Window & Solar Wings in Microgravity */}
                                <g transform="translate(140, 160)">
                                  {/* Large panel and structural ribs */}
                                  <rect x="-90" y="-20" width="180" height="24" fill="#334155" stroke="#475569" strokeWidth="1" />
                                  <ellipse cx="60" cy="-8" rx="8" ry="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="1" />
                                  <ellipse cx="60" cy="-8" rx="5" ry="5" fill="#0284c7" />
                                  
                                  {/* Large Giant Solar Wing structures trailing on left */}
                                  <polygon points="-90,-8 -170,-28 -240,-24 -160,4" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.2" />
                                  <line x1="-165" y1="-14" x2="-205" y2="-12" stroke="#475569" strokeWidth="1" />
                                  <line x1="-125" y1="-10" x2="-165" y2="-8" stroke="#475569" strokeWidth="1" />
                                  
                                  {/* Secondary telemetry antenna floating */}
                                  <line x1="10" y1="4" x2="30" y2="40" stroke="#94a3b8" strokeWidth="1.5" />
                                  <circle cx="30" cy="40" r="2.5" fill="#f43f5e" className="animate-ping" />
                                </g>
                              </g>
                            )}
                          </g>

                          {/* ================= ASTRONAUTS (The Martian style!) ================= */}
                          {/* Dedicated micro scale astronauts with Mark Watney styled suits (Orange striping, Gold Helmets) */}
                          <g className="transition-all duration-500">
                            {/* Astronaut Alpha (Expedition scientist checking resources) */}
                            {spaceGravitySim !== 'micro' ? (
                              <g transform="translate(325, 218)">
                                {/* Shadow */}
                                <ellipse cx="0" cy="11" rx="4.5" ry="1.2" fill="#000" opacity="0.45" />

                                {/* White spacesuit legs & arms */}
                                <line x1="-1.8" y1="5" x2="-2.8" y2="11.2" stroke="#f8fafc" strokeWidth="2.1" strokeLinecap="round" />
                                <line x1="1.8" y1="5" x2="2.8" y2="11.2" stroke="#f8fafc" strokeWidth="2.1" strokeLinecap="round" />
                                
                                {/* Torso Backpack Support Pack */}
                                <rect x="-4.2" y="-1.5" width="8.4" height="7.2" rx="1.5" fill="#cbd5e1" stroke="#334155" strokeWidth="0.5" />
                                <rect x="-3.6" y="0" width="7.2" height="6.6" rx="1" fill="#f8fafc" />

                                {/* Ares Safety Orange strip markings */}
                                <line x1="-3.2" y1="1.8" x2="3.2" y2="1.8" stroke="#f97316" strokeWidth="1" />
                                <line x1="-3.2" y1="4.2" x2="3.2" y2="4.2" stroke="#f97316" strokeWidth="0.6" />

                                {/* Suit Arms bending forward holding soil analyzer */}
                                <line x1="-3.5" y1="1" x2="-6" y2="5" stroke="#f8fafc" strokeWidth="1.8" strokeLinecap="round" />
                                <line x1="3.5" y1="1" x2="6" y2="5" stroke="#f8fafc" strokeWidth="1.8" strokeLinecap="round" />
                                <rect x="-6.5" y="4" width="13" height="3" rx="0.5" fill="#d97706" />

                                {/* Life Support Helmet with Golden Visor */}
                                <circle cx="0" cy="-3.5" r="3.6" fill="#f8fafc" stroke="#475569" strokeWidth="0.5" />
                                {/* The famous sparkling Golden Visor face shield */}
                                <path d="M -2.5,-3.6 A 2.5 2.5 0 0 1 2.5,-3.6 Z" fill="url(#goldVisor)" stroke="#78350f" strokeWidth="0.4" />
                              </g>
                            ) : (
                              /* Floating Astronaut Tethered in L-Orbit above Earth */
                              <g transform="translate(340, 105)">
                                {/* Long metallic silver safety tether wire leading to Hermes module */}
                                <path d="M -160,15 Q -10,140 -200,55" fill="none" stroke="#e2e8f0" strokeWidth="1.5" opacity="0.65" />
                                <path d="M -160,15 Q -10,140 -200,55" fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.4" />

                                {/* Floating bodies orientation */}
                                <g transform="rotate(35)">
                                  <line x1="-1.5" y1="6" x2="-4" y2="14" stroke="#f8fafc" strokeWidth="2.1" strokeLinecap="round" />
                                  <line x1="1.5" y1="6" x2="1" y2="14" stroke="#f8fafc" strokeWidth="2.1" strokeLinecap="round" />
                                  
                                  <rect x="-4.2" y="-1.5" width="8.4" height="7.2" rx="1.5" fill="#cbd5e1" stroke="#334155" strokeWidth="0.5" />
                                  <rect x="-3.6" y="0" width="7.2" height="6.6" rx="1" fill="#f8fafc" />

                                  <line x1="-3.2" y1="1.8" x2="3.2" y2="1.8" stroke="#f97316" strokeWidth="1" />
                                  {/* Arm waving into deep cosmos */}
                                  <line x1="-3.5" y1="2" x2="-8.5" y2="-3.5" stroke="#f8fafc" strokeWidth="1.8" strokeLinecap="round" />
                                  <line x1="3.5" y1="2" x2="7.5" y2="7" stroke="#f8fafc" strokeWidth="1.8" strokeLinecap="round" />

                                  <circle cx="0" cy="-3.5" r="3.6" fill="#f8fafc" stroke="#475569" strokeWidth="0.5" />
                                  <path d="M -2.5,-3.6 A 2.5 2.5 0 0 1 2.5,-3.6 Z" fill="url(#goldVisor)" stroke="#78350f" strokeWidth="0.4" />
                                </g>
                              </g>
                            )}

                            {/* Astronaut Beta (Waving to coordinate telemetry / Rover) */}
                            {spaceGravitySim !== 'micro' && (
                              <g transform="translate(365, 222)">
                                <ellipse cx="0" cy="11" rx="4.5" ry="1.2" fill="#000" opacity="0.45" />

                                <line x1="-1" y1="5" x2="-1" y2="11.2" stroke="#f8fafc" strokeWidth="2.1" strokeLinecap="round" />
                                <line x1="1.2" y1="5" x2="1.2" y2="11.2" stroke="#f8fafc" strokeWidth="2.1" strokeLinecap="round" />
                                
                                <rect x="-4.2" y="-1.5" width="8.4" height="7.2" rx="1.5" fill="#cbd5e1" stroke="#334155" strokeWidth="0.5" />
                                <rect x="-3.6" y="0" width="7.2" height="6.6" rx="1" fill="#f8fafc" />

                                <line x1="-3.2" y1="1.8" x2="3.2" y2="1.8" stroke="#f97316" strokeWidth="1" />
                                
                                {/* Right Arm waved high pointing up */}
                                <line x1="-3.5" y1="2" x2="-8.5" y2="-3" stroke="#f8fafc" strokeWidth="1.8" strokeLinecap="round" />
                                <line x1="3.5" y1="2" x2="5.5" y2="7" stroke="#f8fafc" strokeWidth="1.8" strokeLinecap="round" />

                                <circle cx="0" cy="-3.5" r="3.6" fill="#f8fafc" stroke="#475569" strokeWidth="0.5" />
                                <path d="M -2.5,-3.6 A 2.5 2.5 0 0 1 2.5,-3.6 Z" fill="url(#goldVisor)" stroke="#78350f" strokeWidth="0.4" />
                              </g>
                            )}

                            {/* Cute Antarctic Penguin wearing a mini space bubble globe helmet! (Connection to Expo Antar!) */}
                            <g transform="translate(42, 224)" className="transition-all duration-300">
                              {/* Bubble helmet sphere */}
                              <circle cx="0" cy="2" r="14.5" fill="rgba(34,211,238,0.18)" stroke="rgba(34,211,238,0.85)" strokeWidth="0.9" />
                              <path d="M-8,-6 Q-4,-11 0,-10" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
                              <ellipse cx="0" cy="12" rx="4.5" ry="1.2" fill="#000" opacity="0.4" />
                              
                              {/* Penguin Body (Black back) */}
                              <path d="M-5,11 Q-7,4 -4,-0.5 Q0,-4.5 4,-0.5 Q7,4 5,11 Z" fill="#0f172a" />
                              <path d="M-5,5.5 Q-7.5,8 -7.5,10.5" fill="none" stroke="#0f172a" strokeWidth="1.75" strokeLinecap="round" />
                              <path d="M5,5.5 Q7.5,8 7.5,10.5" fill="none" stroke="#0f172a" strokeWidth="1.75" strokeLinecap="round" />
                              <ellipse cx="0" cy="6.2" rx="3.5" ry="5" fill="#ffffff" />
                              
                              {/* Small orange patch on chest */}
                              <circle cx="0" cy="4" r="1" fill="#ea580c" />

                              <ellipse cx="-2.5" cy="11.8" rx="1.6" ry="0.6" fill="#ea580c" />
                              <ellipse cx="2.5" cy="11.8" rx="1.6" ry="0.6" fill="#ea580c" />
                              <circle cx="0" cy="-1" r="3.5" fill="#0f172a" />
                              <circle cx="-1.1" cy="-2" r="0.6" fill="#fff" />
                              <circle cx="-1.1" cy="-2" r="0.3" fill="#000" />
                              <circle cx="1.1" cy="-2" r="0.6" fill="#fff" />
                              <circle cx="1.1" cy="-2" r="0.3" fill="#000" />
                              <polygon points="-1.5,-1 0,1 1.5,-1" fill="#ea580c" />
                            </g>
                          </g>

                          {/* Outer HUD brackets and technical text overlay */}
                          <path d="M 12 12 H 35" fill="none" stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.8" />
                          <path d="M 12 12 V 35" fill="none" stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.8" />
                          <path d="M 488 12 H 465" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.8" />
                          <path d="M 488 12 V 35" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.8" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Holographic Cockpit controls & Four Scientific Pillars */}
                  <div className="col-span-12 lg:col-span-6 flex flex-col justify-between space-y-6 z-10 font-mono">
                    
                    {/* The Four Scientific Pillars, matching the exact banner nodes */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-orange-500/10 pb-1.5">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-orange-400">
                          {texts.spacePillarsTitle}
                        </h4>
                        <span className="text-[8px] text-zinc-500">[ARES III INTEGRATED SENSORS]</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Pillar 1: Tech */}
                        <button
                          onClick={() => setSpacePillarSelected('tech')}
                          className={`relative p-3.5 text-left border rounded-lg cursor-pointer transition-all duration-300 ${
                            spacePillarSelected === 'tech'
                              ? 'bg-orange-950/25 border-orange-500/80 shadow-[0_0_15px_rgba(249,115,22,0.25)] text-orange-400'
                              : 'bg-[#040810]/60 border-zinc-900/50 hover:border-zinc-800 text-zinc-400'
                          }`}
                        >
                          <div className="absolute top-0.5 right-1.5 text-[8.5px] text-orange-500/60 font-bold">01</div>
                          <span className="text-[10.5px] uppercase font-black block tracking-wider">
                            {texts.spacePillarTech}
                          </span>
                          <span className="text-[9px] line-clamp-1 block mt-1 text-zinc-500">
                            {texts.spacePillarTechDesc}
                          </span>
                        </button>

                        {/* Pillar 2: Environment */}
                        <button
                          onClick={() => setSpacePillarSelected('env')}
                          className={`relative p-3.5 text-left border rounded-lg cursor-pointer transition-all duration-300 ${
                            spacePillarSelected === 'env'
                              ? 'bg-orange-950/25 border-orange-500/80 shadow-[0_0_15px_rgba(249,115,22,0.25)] text-orange-400'
                              : 'bg-[#040810]/60 border-zinc-900/50 hover:border-zinc-800 text-zinc-400'
                          }`}
                        >
                          <div className="absolute top-0.5 right-1.5 text-[8.5px] text-orange-500/60 font-bold">02</div>
                          <span className="text-[10.5px] uppercase font-black block tracking-wider">
                            {texts.spacePillarEnv}
                          </span>
                          <span className="text-[9px] line-clamp-1 block mt-1 text-zinc-500">
                            {texts.spacePillarEnvDesc}
                          </span>
                        </button>

                        {/* Pillar 3: Human */}
                        <button
                          onClick={() => setSpacePillarSelected('human')}
                          className={`relative p-3.5 text-left border rounded-lg cursor-pointer transition-all duration-300 ${
                            spacePillarSelected === 'human'
                              ? 'bg-orange-950/25 border-orange-500/80 shadow-[0_0_15px_rgba(249,115,22,0.25)] text-orange-400'
                              : 'bg-[#040810]/60 border-zinc-900/50 hover:border-zinc-800 text-zinc-400'
                          }`}
                        >
                          <div className="absolute top-0.5 right-1.5 text-[8.5px] text-orange-500/60 font-bold">03</div>
                          <span className="text-[10.5px] uppercase font-black block tracking-wider">
                            {texts.spacePillarHuman}
                          </span>
                          <span className="text-[9px] line-clamp-1 block mt-1 text-zinc-500">
                            {texts.spacePillarHumanDesc}
                          </span>
                        </button>

                        {/* Pillar 4: Robotics */}
                        <button
                          onClick={() => setSpacePillarSelected('robotics')}
                          className={`relative p-3.5 text-left border rounded-lg cursor-pointer transition-all duration-300 ${
                            spacePillarSelected === 'robotics'
                              ? 'bg-orange-950/25 border-orange-500/80 shadow-[0_0_15px_rgba(249,115,22,0.25)] text-orange-400'
                              : 'bg-[#040810]/60 border-zinc-900/50 hover:border-zinc-800 text-zinc-400'
                          }`}
                        >
                          <div className="absolute top-0.5 right-1.5 text-[8.5px] text-orange-500/60 font-bold">04</div>
                          <span className="text-[10.5px] uppercase font-black block tracking-wider">
                            {texts.spacePillarRobotics}
                          </span>
                          <span className="text-[9px] line-clamp-1 block mt-1 text-zinc-500">
                            {texts.spacePillarRoboticsDesc}
                          </span>
                        </button>
                      </div>

                      {/* Display Selected Pillar Advice */}
                      <div className="p-3.5 border rounded-lg bg-black/45 border-orange-500/15 text-zinc-350 text-[11px] leading-relaxed flex items-center gap-3">
                        <div className="p-1 px-1.5 bg-orange-950/45 border border-orange-500/30 text-orange-400 font-bold text-xs">
                          {spacePillarSelected === 'tech' ? "P01" : spacePillarSelected === 'env' ? "P02" : spacePillarSelected === 'human' ? "P03" : "P04"}
                        </div>
                        <div>
                          <span className="font-bold text-[9.5px] uppercase tracking-widest text-[#f97316] block mb-0.5">
                            {spacePillarSelected === 'tech' ? texts.spacePillarTech :
                             spacePillarSelected === 'env' ? texts.spacePillarEnv :
                             spacePillarSelected === 'human' ? texts.spacePillarHuman :
                             texts.spacePillarRobotics}
                          </span>
                          <p className="font-sans font-light leading-relaxed text-zinc-350">
                            {spacePillarSelected === 'tech' ? texts.spacePillarTechDesc :
                             spacePillarSelected === 'env' ? texts.spacePillarEnvDesc :
                             spacePillarSelected === 'human' ? texts.spacePillarHumanDesc :
                             texts.spacePillarRoboticsDesc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Analog Telemetry Simulation Parameters Panel */}
                    <div className="bg-[#030811]/90 rounded-xl p-4 sm:p-5 border border-orange-500/15 shadow-inner space-y-4">
                      <div className="flex flex-wrap items-center justify-between border-b border-orange-500/20 pb-3 gap-2">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-orange-400 bg-orange-950/40 border border-orange-850/30 px-2 py-0.5 flex items-center gap-1.5">
                          <Rocket className="w-3 h-3 animate-pulse text-orange-400" />
                          {texts.spaceSimTitle}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                          <Radio className="w-3 h-3 animate-pulse" />
                          TELEMETRY LINK: ACTIVE
                        </span>
                      </div>

                      <p className="text-[11px] text-zinc-400 leading-normal font-sans">
                        {texts.spaceSimDesc}
                      </p>

                      {/* Control variables */}
                      <div className="space-y-4">
                        {/* Confinement duration */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] items-center text-zinc-300">
                            <span>[C-DUR] CONFINEMENT PERIOD</span>
                            <span className="text-orange-400 font-bold">{spaceConfinementDays} DAYS / SOLS</span>
                          </div>
                          <input
                            type="range"
                            min="30"
                            max="500"
                            value={spaceConfinementDays}
                            onChange={(e) => setSpaceConfinementDays(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-ew-resize accent-orange-500"
                          />
                        </div>

                        {/* Crew Size */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] items-center text-zinc-300">
                            <span>[C-SIZE] CREW SIZE SEGMENTS</span>
                            <span className="text-amber-400 font-bold">{spaceCrewSize} MEMBERS</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="12"
                            value={spaceCrewSize}
                            onChange={(e) => setSpaceCrewSize(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-ew-resize accent-amber-500"
                          />
                        </div>

                        {/* Comm latency */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] items-center text-zinc-300">
                            <span>[COMM-LAG] TELEMETRY LATENCY</span>
                            <span className="text-[#f43f5e] font-bold">{spaceCommDelay}S (~{Math.round(spaceCommDelay / 60)} MIN)</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="1200"
                            value={spaceCommDelay}
                            onChange={(e) => setSpaceCommDelay(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-ew-resize accent-rose-450"
                          />
                        </div>

                        {/* Gravity Target parameters block */}
                        <div className="space-y-2">
                          <span className="text-[8.5px] uppercase block text-orange-400 font-bold tracking-wider">
                            [G-SELECTOR] SIMULATED TARGET EXPEDITION
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              type="button"
                              onClick={() => setSpaceGravitySim('mars')}
                              className={`py-1.5 px-2.5 border rounded font-mono text-[9px] uppercase tracking-wider cursor-pointer text-center transition-all ${
                                spaceGravitySim === 'mars'
                                  ? 'bg-orange-950/45 text-orange-400 border-orange-500/60 shadow-[0_0_8px_rgba(249,115,22,0.25)]'
                                  : 'text-zinc-500 border-zinc-910 hover:text-zinc-350 bg-black/20'
                              }`}
                            >
                              {language === 'BR' ? "Marte (0.38g)" : "Mars (0.38g)"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setSpaceGravitySim('moon')}
                              className={`py-1.5 px-2.5 border rounded font-mono text-[9px] uppercase tracking-wider cursor-pointer text-center transition-all ${
                                spaceGravitySim === 'moon'
                                  ? 'bg-orange-950/45 text-orange-400 border-orange-500/60 shadow-[0_0_8px_rgba(249,115,22,0.25)]'
                                  : 'text-zinc-500 border-zinc-910 hover:text-zinc-350 bg-black/20'
                              }`}
                            >
                              {language === 'BR' ? "Lua (0.16g)" : "Moon (0.16g)"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setSpaceGravitySim('micro')}
                              className={`py-1.5 px-2.5 border rounded font-mono text-[9px] uppercase tracking-wider cursor-pointer text-center transition-all ${
                                spaceGravitySim === 'micro'
                                  ? 'bg-orange-950/45 text-orange-400 border-orange-500/60 shadow-[0_0_8px_rgba(249,115,22,0.25)]'
                                  : 'text-zinc-505 border-zinc-910 hover:text-zinc-350 bg-black/20'
                              }`}
                            >
                              {language === 'BR' ? "Órbita (0.00g)" : "L-Orbit (0.00g)"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Calculated Readiness Output & Diagnostic terminal */}
                      <div className="p-4 bg-black/75 border border-orange-500/20 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase text-orange-450 font-bold tracking-widest">
                            {texts.spaceReadinessLabel}
                          </span>
                          <span className={`text-base font-bold tracking-widest ${
                            spaceReadinessScore > 80 ? 'text-emerald-450' :
                            spaceReadinessScore > 50 ? 'text-amber-450' :
                            'text-rose-450'
                          }`}>
                            {spaceReadinessScore}%
                          </span>
                        </div>

                        {/* Outer progress bar */}
                        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: `${spaceReadinessScore}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className={`h-full ${
                              spaceReadinessScore > 80 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                              spaceReadinessScore > 50 ? 'bg-gradient-to-r from-amber-500 to-orange-400' :
                              'bg-gradient-to-r from-rose-500 to-red-650'
                            }`}
                          />
                        </div>

                        {/* Interactive Diagnostic Terminal Output */}
                        <div className="p-2.5 bg-[#010408]/90 border border-zinc-900 rounded text-[9.5px] leading-relaxed text-zinc-400">
                          <div className="font-bold text-orange-400 mb-1 flex items-center gap-1">
                            <span>&gt;_ ARES III CLINICAL REPORT & CALORIES</span>
                            <span className="w-1.5 h-3 bg-orange-400 animate-pulse inline-block" />
                          </div>

                          {/* Dynamic "The Martian" easter egg text inputs depending on states */}
                          <div className="font-mono text-zinc-500 border-b border-zinc-900 pb-1.5 mb-1.5 space-y-0.5">
                            <div>• <span className="text-zinc-350 font-semibold">[WRS] WATER RECOVERY:</span> 98.4% NOMINAL EFFICIENCY</div>
                            <div>• <span className="text-zinc-350 font-semibold">[OXYGENATOR]:</span> NOMINAL (CRYOGENIC CELL RATIO: 1.0)</div>
                            <div>• <span className="text-zinc-350 font-semibold">[CROP HARVEST]:</span> {spaceCrewSize > 6 ? (
                              <span className="text-red-400 font-bold">CALORIC DEFICIT (HARVEST FAILURE!)</span>
                            ) : (
                              <span className="text-emerald-400 font-bold">x1.45 CALORIC SURPLUS (AGRONOMY DESIGN SUCCESS)</span>
                            )}</div>
                            <div>• <span className="text-zinc-350 font-semibold">[SOLS ELAPSED]:</span> SOL {Math.floor(spaceConfinementDays / 1.15)} OF SOL 500</div>
                          </div>

                          {spaceConfinementDays > 300 ? (
                            language === 'BR'
                              ? "CUIDADO: Confinamento prolongado excede o limiar psicológico de tolerância de Marte. Alto risco para manifestações dissociativas e isolamento crônico da tripulação."
                              : "WARNING: Extended confinement period exceeds typical psychological ICE Mars thresholds. High risk of dissociative flares and T3 polar depletion."
                          ) : spaceCommDelay > 480 ? (
                            language === 'BR'
                              ? "ATENÇÃO: Latência de rádio severa ({spaceCommDelay}s) inviabiliza telepesquisa síncrona com Houston. Equipe deve agir de forma autônoma."
                              : "COGNITIVE STRESS: Severe communication latency ({spaceCommDelay}s) prohibits synchronous matrix counseling. Crew must rely on strict autonomous protocols."
                          ) : spaceCrewSize < 4 ? (
                            language === 'BR'
                              ? "RISCO: Microgrupo isolado ({spaceCrewSize} pessoas) eleva a fadiga de reciprocidade social. Risco de alienação ou solidão profunda no habitat."
                              : "RISK LEVEL: Isolation in extremely small crews ({spaceCrewSize} members) raises hyper-vigilance. Risk of severe interpersonal friction or deep subjective loneliness."
                          ) : (
                            language === 'BR'
                              ? "APTO: Ajustes de parâmetros validados. Forças gravitacionais estáveis combinadas com isolamento simulado padrão. Resiliência psicológica ideal."
                              : "READY: Mission telemetry parameters validated. Standard gravity vectors and isolation ratios match psychological resiliency targets."
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Cockpit stamp footer */}
                    <div className="border-t border-cyan-500/10 pt-4 flex items-center justify-between text-[8px] text-zinc-500">
                      <span>Simulação sem valor científico.</span>
                      <span>TELEMETRY ITERATIONS: 1.25k</span>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="fulltext"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`max-w-4xl mx-auto p-10 border shadow-2xl relative select-text antialiased overflow-hidden ${
              isDark ? 'bg-zinc-950 border-zinc-850 text-zinc-300' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            {/* Ambient coordinates overlay as architectural marker */}
            <div className={`absolute top-4 right-4 text-[9px] font-mono select-none opacity-25 ${isDark ? 'text-zinc-700' : 'text-slate-400'}`}>
              LAT -62.0833°S | LON -58.3833°W
            </div>

            {/* Title */}
            <div className="mb-12 border-b border-zinc-800/20 pb-8 text-center sm:text-left">
              <span className={`text-[9px] font-mono uppercase tracking-[0.25em] ${isDark ? 'text-cyan-400' : 'text-cyan-700'} block mb-2`}>
                MANIFESTO CIENTÍFICO INTEGRAL
              </span>
              <h1 className={`text-3xl sm:text-5xl font-light tracking-tight ${isDark ? 'text-white' : 'text-slate-900'} font-display leading-tight`}>
                {texts.title}
              </h1>
              <p className={`text-xs sm:text-sm font-mono uppercase ${isDark ? 'text-zinc-400' : 'text-slate-500'} mt-2`}>
                {texts.academicEntity}
              </p>
            </div>

            {/* Editorial Content - Displaying the exact, verbatim requested paragraph text in full sequential series */}
            <div className="space-y-6 text-sm leading-relaxed text-justify font-sans select-text whitespace-pre-line">
              <p className="indent-8 font-light">
                {texts.p1}
              </p>
              <p className="indent-8 font-light">
                {texts.p2}
              </p>
              <p className="indent-8 font-light italic bg-cyan-500/5 p-4 border-l-4 border-cyan-500 rounded-none my-6">
                {texts.p3}
              </p>
              <p className="indent-8 font-light">
                {texts.p4}
              </p>
              <p className="indent-8 font-light">
                {texts.p5}
              </p>
              <p className="indent-8 font-light">
                {texts.p6}
              </p>
              <p className="indent-8 font-light font-sans">
                {texts.p7}
              </p>
              <p className="indent-8 font-light font-sans">
                {texts.p8}
              </p>
              <p className="indent-8 font-light font-sans">
                {texts.p9}
              </p>
              <p className="indent-8 font-light font-sans">
                {texts.p10}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
