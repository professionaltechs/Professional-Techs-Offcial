import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // agar koi private route ho to
    },
    sitemap: 'https://www.professionaltechs.co/sitemap.xml',
  }
}