import { FiArrowUpRight, FiCode, FiDroplet, FiGlobe, FiLayers, FiServer, FiShield, FiTarget, FiTool, FiZap } from 'react-icons/fi';

export const navLinks = [
  { href: '#identity', label: 'Identity' },
  { href: '#craft', label: 'Craft' },
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export const brandPrinciples = [
  { label: 'Balance', icon: FiTarget, detail: 'Clean product structure without visual stiffness.' },
  { label: 'Flow', icon: FiDroplet, detail: 'Interfaces that guide users through real decisions.' },
  { label: 'Clarity', icon: FiGlobe, detail: 'Dashboards, docs, and systems that explain themselves.' },
  { label: 'Focus', icon: FiShield, detail: 'Scoped builds with measurable outcomes.' },
  { label: 'Energy', icon: FiZap, detail: 'Fast iteration without chaotic architecture.' },
  { label: 'Elevation', icon: FiArrowUpRight, detail: 'A refined finish over practical engineering work.' },
];

export const metrics = [
  { value: '3.885', label: 'Rutgers GPA' },
  { value: '1K+', label: 'tickets analyzed yearly' },
  { value: '95%', label: 'CSAT sustained' },
  { value: '20+', label: 'tickets closed weekly' },
];

export const craftAreas = [
  { icon: FiCode, title: 'Interface Systems', body: 'React, Vite, MUI, Tailwind, reusable component patterns, responsive dashboards, and design-system thinking.' },
  { icon: FiServer, title: 'Backend Architecture', body: 'Django, DRF, FastAPI, Node, PostgreSQL, Supabase, auth flows, API contracts, and deployment-aware structure.' },
  { icon: FiTool, title: 'Operational Clarity', body: 'ServiceNow analysis, WordPress multisite operations, SharePoint migrations, ITIL runbooks, and triage workflows.' },
  { icon: FiLayers, title: 'Spec-Led Delivery', body: 'Technical specs, scoped PR planning, architecture notes, acceptance criteria, and implementation checklists.' },
];
