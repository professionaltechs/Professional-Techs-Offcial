import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getPublishedPosts } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    '/blog',
    '/careers',
    '/contact',
    '/quote',
    '/privacy-policy',
    '/terms-and-conditions',
  ]

  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))

  const posts = await getPublishedPosts()
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...pages, ...postPages]
}