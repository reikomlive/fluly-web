import { getCollection } from 'astro:content';

export async function GET() {
  const allPosts = await getCollection('blog');
  
  const pages = [
    { url: '/', lastmod: new Date().toISOString() },
    { url: '/about', lastmod: new Date().toISOString() },
    { url: '/pricing', lastmod: new Date().toISOString() },
    { url: '/learn-more', lastmod: new Date().toISOString() },
    { url: '/blog', lastmod: new Date().toISOString() },
    { url: '/privacy', lastmod: new Date().toISOString() },
    { url: '/terms', lastmod: new Date().toISOString() },
    { url: '/cookies', lastmod: new Date().toISOString() },
    { url: '/learn', lastmod: new Date().toISOString() },
    { url: '/learn/french', lastmod: new Date().toISOString() },
    { url: '/learn/french/immersion-guide', lastmod: new Date().toISOString() },
    { url: '/learn/french/common-mistakes', lastmod: new Date().toISOString() },
    { url: '/learn/french/resources', lastmod: new Date().toISOString() },
    { url: '/learn/spanish', lastmod: new Date().toISOString() },
    { url: '/learn/spanish/immersion-guide', lastmod: new Date().toISOString() },
    { url: '/learn/spanish/common-mistakes', lastmod: new Date().toISOString() },
    { url: '/learn/spanish/resources', lastmod: new Date().toISOString() },
    { url: '/learn/german', lastmod: new Date().toISOString() },
    { url: '/learn/german/immersion-guide', lastmod: new Date().toISOString() },
    { url: '/learn/german/common-mistakes', lastmod: new Date().toISOString() },
    { url: '/learn/german/resources', lastmod: new Date().toISOString() },
  ];

  // Add blog posts
  allPosts.forEach(post => {
    pages.push({
      url: `/blog/${post.id}`,
      lastmod: post.data.date.toISOString()
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>https://fluly.io${page.url}</loc>
    <lastmod>${page.lastmod.split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.url === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
