import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
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
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))
}