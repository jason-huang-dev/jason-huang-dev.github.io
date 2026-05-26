import { SITE_URL } from './Seo';

export function personJsonLd(profile) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: SITE_URL,
    sameAs: [
      profile.links.github,
      profile.links.linkedin,
    ].filter(Boolean),
    email: profile.links.email?.replace('mailto:', ''),
  };
}

export function projectJsonLd(project, page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: page.subtitle,
    description: project.shortDescription,
    url: `${SITE_URL}/work/${project.slug}`,
    creator: {
      '@type': 'Person',
      name: 'Jason Huang',
    },
    keywords: project.techStack.join(', '),
  };
}
