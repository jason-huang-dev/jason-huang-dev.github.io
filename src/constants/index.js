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
  goldenunicorn,
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
    title: 'Full-Stack Development',
    icon: frontend,
  },
  {
    title: 'Software Development',
    icon: backend,
  },
  {
    title: 'Automation & Scripting',
    icon: ux,
  },
  {
    title: 'Cloud Solutions',
    icon: prototyping,
  },
];

const technologies = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'Python',
    icon: python,
  },
  {
    name: 'Amazon Web Services',
    icon: aws,
  },
  {
    name: 'C Programming Language',
    icon: c,
  },
  {
    name: 'Django',
    icon: django,
  },
  {
    name: 'Fast API',
    icon: fastapi,
  },
  {
    name: 'Java',
    icon: java,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
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
    name: 'postgresql',
    icon: postgresql,
  },
  {
    name: 'git',
    icon: git,
  },
  {
    name: 'docker',
    icon: docker,
  },
  {
    name: 'Postman',
    icon: postman,
  },
];

const experiences = [
  {
    title: 'BS Computer Science + Economics',
    company_name: 'Rutgers University',
    icon: rutgers,
    iconBg: '#333333',
    date: 'Sep 2022 - Jan 2026',
  },
  {
    title: 'Coding Mentor (Volunteer)',
    company_name: 'Cybertigers',
    icon: cybertigers8075,
    iconBg: '#333333',
    date: 'Sep 2022 - Present',
  },
  {
    title: 'Operations Manager',
    company_name: 'Golden Unicorn',
    icon: goldenunicorn,
    iconBg: '#333333',
    date: 'Oct 2019 - Present',
  },
  {
    title: 'Software Engineer Fellow',
    company_name: 'Headstarter AI',
    icon: headstarterai,
    iconBg: '#333333',
    date: 'July 2024 - Sep 2024',
  },
];

const projects = [
  {
    id: 'project-1',
    name: 'Market Bot',
    description: 'A discrod bot that gathers news and market data',
    tags: [
      {
        name: 'Discord',
        color: 'blue-text-gradient',
      },
      {
        name: 'Python',
        color: 'yellow-text-gradient',
      }
    ],
    image: marketbot,
    repo: 'https://github.com/jason-huang-dev/Market_Bot',
    demo: 'https://github.com/jason-huang-dev/Market_Bot',
  },
  {
    id: 'project-2',
    name: 'csRU',
    description: 'A course manager for the BA/BS Computer Science Track at Rutgers University New-Brunswick.',
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
      {
        name: 'Docker',
        color: 'green-text-gradient',
      }
    ],
    image: csRU,
    repo: 'https://github.com/williamowenwu/csRU',
    demo: 'https://github.com/williamowenwu/csRU',
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
  // Add more social media links here
]


export { services, technologies, experiences, projects, socials };
