import {
  frontend,
  backend,
  ux,
  prototyping,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  nodejs,
  git,
  docker,
  postgresql,
  aws,
  c,
  django,
  fastapi,
  java,
  postman,
  python,
  rutgers,
  cybertigers8075,
  headstarterai,
  csRU,
  marketbot,
  linkedin,
  githubsocial,
  youtube,
  instagram,
  leetcode,
} from '../assets';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Backend & API Engineering',
    icon: backend,
  },
  {
    title: 'Full-Stack Product Development',
    icon: frontend,
  },
  {
    title: 'Automation & Data Pipelines',
    icon: ux,
  },
  {
    title: 'Cloud, DevOps & Reliability',
    icon: prototyping,
  },
];

const technologies = [
  {
    name: 'Python',
    icon: python,
  },
  {
    name: 'Java',
    icon: java,
  },
  {
    name: 'C Programming Language',
    icon: c,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'Django',
    icon: django,
  },
  {
    name: 'FastAPI',
    icon: fastapi,
  },
  {
    name: 'PostgreSQL',
    icon: postgresql,
  },
  {
    name: 'Amazon Web Services',
    icon: aws,
  },
  {
    name: 'Docker',
    icon: docker,
  },
  {
    name: 'Git',
    icon: git,
  },
  {
    name: 'Postman',
    icon: postman,
  },
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
];

const experiences = [
  {
    title: 'B.S. Computer Science & B.S. Economics',
    company_name: 'Rutgers University - New Brunswick',
    icon: rutgers,
    iconBg: '#333333',
    date: 'Sep 2022 - Jan 2026',
  },
  {
    title: 'Web Developer & IT Support Technician',
    company_name: 'Rutgers SC&I IT Helpdesk',
    icon: rutgers,
    iconBg: '#333333',
    date: 'Jan 2025 - Jan 2026',
  },
  {
    title: 'Software Engineer',
    company_name: 'TimeMesh - Productivity SaaS Platform',
    icon: headstarterai,
    iconBg: '#333333',
    date: 'Jul 2024 - Dec 2024',
  },
  {
    title: 'Software Engineer Fellow',
    company_name: 'Headstarter AI',
    icon: headstarterai,
    iconBg: '#333333',
    date: 'Jul 2024 - Sep 2024',
  },
  {
    title: 'Coding Mentor (Volunteer)',
    company_name: 'Cybertigers 8075 FIRST Robotics',
    icon: cybertigers8075,
    iconBg: '#333333',
    date: 'Sep 2022 - Sep 2024',
  },
];

const projects = [
  {
    id: 'project-1',
    name: 'DockFlow',
    description:
      'Warehouse management platform with a modular Django REST backend spanning auth, IAM, inventory, inbound/outbound operations, returns, logistics, fees, work orders, reporting, and marketplace workflows.',
    tags: [
      {
        name: 'Django REST',
        color: 'green-text-gradient',
      },
      {
        name: 'PostgreSQL',
        color: 'blue-text-gradient',
      },
      {
        name: 'CI/CD',
        color: 'pink-text-gradient',
      },
    ],
    image: csRU,
    repo: 'https://github.com/jason-huang-dev/DaChongWMS',
    demo: 'https://github.com/jason-huang-dev/DaChongWMS',
  },
  {
    id: 'project-2',
    name: 'ChemFarm',
    description:
      'Game-powered STEM learning platform with FastAPI routers, Supabase storage, RLS/RPC-backed data access, and a validated ingestion pipeline for turning curriculum data into playable learning content.',
    tags: [
      {
        name: 'FastAPI',
        color: 'green-text-gradient',
      },
      {
        name: 'Supabase',
        color: 'blue-text-gradient',
      },
      {
        name: 'ETL',
        color: 'yellow-text-gradient',
      },
    ],
    image: marketbot,
    repo: 'https://github.com/jason-huang-dev/chemfarm',
    demo: 'https://github.com/jason-huang-dev/chemfarm',
  },
  {
    id: 'project-3',
    name: 'TimeMesh',
    description:
      'Productivity SaaS platform for scheduling workflows, calendar events, and goal planning. Improved API latency from roughly 83ms to 25ms through PostgreSQL indexing and Django REST Framework query rewrites.',
    tags: [
      {
        name: 'React',
        color: 'light-blue-text-gradient',
      },
      {
        name: 'Django',
        color: 'green-text-gradient',
      },
      {
        name: 'AWS',
        color: 'yellow-text-gradient',
      },
    ],
    image: csRU,
    repo: 'https://github.com/jason-huang-dev',
    demo: 'https://github.com/jason-huang-dev',
  },
  {
    id: 'project-4',
    name: 'Video Automation Pipeline',
    description:
      'Repeatable script-to-video production pipeline that packages prompts, scripts, audio, captions, storyboards, render assets, QA reports, upload metadata, and logs for short-form content workflows.',
    tags: [
      {
        name: 'Python',
        color: 'yellow-text-gradient',
      },
      {
        name: 'Remotion',
        color: 'pink-text-gradient',
      },
      {
        name: 'Makefile',
        color: 'blue-text-gradient',
      },
    ],
    image: marketbot,
    repo: 'https://github.com/jason-huang-dev/Shorts',
    demo: 'https://github.com/jason-huang-dev/Shorts',
  },
  {
    id: 'project-5',
    name: 'csRU Course Planner',
    description:
      'Rutgers Computer Science course planner that helps students map BA/BS requirements, explore courses, and reason through degree planning constraints.',
    tags: [
      {
        name: 'ReactJS',
        color: 'light-blue-text-gradient',
      },
      {
        name: 'Python',
        color: 'yellow-text-gradient',
      },
      {
        name: 'Docker',
        color: 'blue-text-gradient',
      },
    ],
    image: csRU,
    repo: 'https://github.com/williamowenwu/csRU',
    demo: 'https://github.com/williamowenwu/csRU',
  },
  {
    id: 'project-6',
    name: 'Market Bot',
    description:
      'Discord-based market research bot that gathers financial news and market data to support faster company and stock analysis workflows.',
    tags: [
      {
        name: 'Discord',
        color: 'blue-text-gradient',
      },
      {
        name: 'Python',
        color: 'yellow-text-gradient',
      },
      {
        name: 'APIs',
        color: 'green-text-gradient',
      },
    ],
    image: marketbot,
    repo: 'https://github.com/jason-huang-dev/Market_Bot',
    demo: 'https://github.com/jason-huang-dev/Market_Bot',
  },
];

const socials = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jasonhuangdev',
    icon: linkedin,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/jason-huang-dev',
    icon: githubsocial,
  },
  {
    name: 'Youtube',
    url: 'https://www.youtube.com/@JasonHuangDev',
    icon: youtube,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/jasonhuangdev/',
    icon: instagram,
  },
  {
    name: 'Leetcode',
    url: 'https://leetcode.com/jason-huang-dev/',
    icon: leetcode,
  },
];

export { services, technologies, experiences, projects, socials };
