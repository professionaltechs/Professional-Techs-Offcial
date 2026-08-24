import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.professionaltechs.co'
  
  const routes = [
    '',
    '/about',
    '/services',
    '/services/web-development',
    '/services/mobile-app-development',
    '/services/ui-ux-design',
    '/services/cloud-devops',
    '/services/ai-ml-solutions',
    '/services/seo',
    '/portfolio',
    '/portfolio/fansright',
    '/portfolio/vinpol',
    '/portfolio/albe-engineering',
    '/portfolio/jarcon-ltd',
    '/careers',
    '/contact',
    '/quote',
    '/privacy-policy',
    '/terms-and-conditions',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))
}