/// <reference types="@cloudflare/workers-types" />

const pages: Record<string, { title: string; description: string; canonical: string; heading: string }> = {
  '/': {
    title: 'ONXI — Football Teamwear Built for the Game',
    description: 'ONXI makes considered football kits and grip socks engineered for movement, confidence and match day.',
    canonical: 'https://www.onxigripsocks.co.uk/',
    heading: 'Built for the game.',
  },
  '/shop/': {
    title: 'Shop Football Kits & Grip Socks — ONXI',
    description: 'Shop ONXI football kits, training tops and grip socks. Performance teamwear designed for players who care about every detail.',
    canonical: 'https://www.onxigripsocks.co.uk/shop/',
    heading: 'Shop ONXI.',
  },
  '/story/': {
    title: 'The ONXI Standard — Football Performance & Design',
    description: 'Discover the ONXI approach to football essentials: stripped back, considered and designed around movement.',
    canonical: 'https://www.onxigripsocks.co.uk/story/',
    heading: 'The ONXI standard.',
  },
  '/merseyvalley/': {
    title: 'Mersey Valley FC Official Club Shop — ONXI Teamwear',
    description: 'Shop the official Mersey Valley FC ONXI teamwear collection, including kits, training tops and grip socks.',
    canonical: 'https://www.onxigripsocks.co.uk/merseyvalley/',
    heading: 'Mersey Valley FC.',
  },
}

function normalisePath(pathname: string) {
  if (pathname === '/') return '/'
  return `/${pathname.replace(/^\/+|\/+$/g, '')}/`
}

function pageResponse(request: Request, env: Env, page: (typeof pages)[string]) {
  const indexUrl = new URL('/index.html', request.url)
  return env.ASSETS.fetch(new Request(indexUrl.toString(), request))
    .then((response) => {
      const rewritten = new HTMLRewriter()
        .on('title', {
          element(element) {
            element.setInnerContent(page.title)
          },
        })
        .on('meta[name="description"]', {
          element(element) {
            element.setAttribute('content', page.description)
          },
        })
        .on('link[rel="canonical"]', {
          element(element) {
            element.setAttribute('href', page.canonical)
          },
        })
        .on('meta[property="og:title"]', {
          element(element) {
            element.setAttribute('content', page.title)
          },
        })
        .on('meta[property="og:description"]', {
          element(element) {
            element.setAttribute('content', page.description)
          },
        })
        .on('meta[property="og:url"]', {
          element(element) {
            element.setAttribute('content', page.canonical)
          },
        })
        .on('meta[name="twitter:title"]', {
          element(element) {
            element.setAttribute('content', page.title)
          },
        })
        .on('meta[name="twitter:description"]', {
          element(element) {
            element.setAttribute('content', page.description)
          },
        })
        .on('head', {
          element(element) {
            element.append(
              `<script type="application/ld+json">${JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'ONXI Teamwear',
                url: 'https://www.onxigripsocks.co.uk/',
                description: 'UK football teamwear and grip socks brand.',
                areaServed: 'GB',
                brand: { '@type': 'Brand', name: 'ONXI' },
              })}</script>`,
              { html: true },
            )
            element.append(
              `<script type="application/ld+json">${JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.onxigripsocks.co.uk/' },
                  ...(page.canonical === 'https://www.onxigripsocks.co.uk/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.heading, item: page.canonical }]),
                ],
              })}</script>`,
              { html: true },
            )
          },
        })

      return rewritten.transform(response)
    })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = normalisePath(url.pathname)

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } })
    }

    if (path === '/shop' || path === '/story' || path === '/merseyvalley') {
      return Response.redirect(`${url.origin}${path}/`, 308)
    }

    const page = pages[path]
    if (page) return pageResponse(request, env, page)

    if (url.pathname === '/404.html') return env.ASSETS.fetch(request)
    if (url.pathname.includes('.') || url.pathname.startsWith('/assets/')) return env.ASSETS.fetch(request)

    const notFound = await env.ASSETS.fetch(new Request(new URL('/404.html', request.url), request))
    return new Response(notFound.body, {
      status: 404,
      headers: new Headers(notFound.headers),
    })
  },
}
