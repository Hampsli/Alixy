export const seedAchievements = [
  {
    id: '1',
    title: 'Resolví conflicto entre equipos de backend y frontend',
    description:
      'Medié una sesión de alineación que resultó en una API redesignada con mejor performance y DX.',
    type: 'conflict',
    date: '2026-05-01',
    status: 'curated',
    curatedBy: 'María González',
    evidences: ['testimonio-tech-lead.pdf', 'screenshot-api-docs.png'],
    featured: true,
  },
  {
    id: '2',
    title: 'Optimicé el proceso de code review',
    description:
      'Implementé un checklist automatizado que redujo el tiempo de review en 40%.',
    type: 'process',
    date: '2026-04-28',
    status: 'curated',
    curatedBy: 'Ana Martínez',
    evidences: ['metrics-before-after.png'],
    featured: true,
  },
  {
    id: '3',
    title: 'Mentoré a junior developer en testing',
    description:
      'Sesiones 1:1 semanales durante un mes. La desarrolladora ahora escribe tests con confianza.',
    type: 'support',
    date: '2026-04-25',
    status: 'raw',
    evidences: [],
  },
];

export const seedEvidences = [
  { id: '1', name: 'testimonio-tech-lead.pdf', type: 'pdf', date: '2026-05-01', linked: true, featured: true },
  { id: '2', name: 'screenshot-api-docs.png', type: 'image', date: '2026-05-01', linked: true, featured: false },
  { id: '3', name: 'metrics-before-after.png', type: 'image', date: '2026-04-28', linked: true, featured: true },
  { id: '4', name: 'email-agradecimiento.pdf', type: 'pdf', date: '2026-04-20', linked: false, featured: false },
];

export const organizations = [
  {
    id: '1',
    name: 'Women in Tech México',
    description: 'Comunidad que conecta, visibiliza y potencia a mujeres en tecnología',
    tags: ['Networking', 'Eventos', 'Mentoría'],
    logo: '🌟',
  },
  {
    id: '2',
    name: 'Tech Ladies',
    description: 'Red global de mujeres en tech con oportunidades de empleo y comunidad',
    tags: ['Empleo', 'Comunidad', 'Recursos'],
    logo: '💼',
  },
  {
    id: '3',
    name: 'Laboratoria',
    description: 'Organización que transforma vidas de mujeres a través de la educación en tech',
    tags: ['Educación', 'Empleo', 'Mentoría'],
    logo: '🚀',
  },
];

export const curators = [
  {
    id: '1',
    name: 'María González',
    specialty: 'Narrativa de liderazgo técnico',
    rate: '$80 USD / sesión',
    rating: 4.9,
    reviews: 47,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
  },
  {
    id: '2',
    name: 'Ana Martínez',
    specialty: 'Negociación salarial y promociones',
    rate: '$75 USD / sesión',
    rating: 5.0,
    reviews: 32,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
  },
  {
    id: '3',
    name: 'Carmen López',
    specialty: 'Transición a roles de management',
    rate: '$90 USD / sesión',
    rating: 4.8,
    reviews: 28,
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400',
  },
];

export const mentors = [
  {
    id: '1',
    name: 'Laura Sánchez',
    specialty: 'Engineering Leadership',
    rate: 'Gratis (scholarship)',
    availability: 'Disponible',
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
  },
  {
    id: '2',
    name: 'Isabel Ramírez',
    specialty: 'System Design & Architecture',
    rate: '$60 USD / sesión',
    availability: 'Disponible',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
  {
    id: '3',
    name: 'Patricia Torres',
    specialty: 'Career Development',
    rate: 'Gratis (scholarship)',
    availability: 'Lista de espera',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
  },
];
