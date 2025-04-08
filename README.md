# PMKIN JavaScript SDK

[PMKIN](https://pmkin.io) is a lightweight headless CMS designed for developers
who want to focus on building rather than managing complex content
infrastructure. It provides a simple GraphQL API to manage and deliver your
content, making it perfect for blogs, documentation sites, and other
content-driven applications.

## Installation

```bash
bun add pmkin
# or
npm install pmkin
# or
yarn add pmkin
# or
pnpm add pmkin
```

## Getting Started (Next.js)

### Setup Client

First, create a PMKIN client instance. Create a new file `lib/pmkin.ts`:

```typescript
import { PmkinClient } from 'pmkin'

if (!process.env.PMKIN_TOKEN) {
  throw new Error('PMKIN_TOKEN is not set')
}

export const pmkin = new PmkinClient({
  token: process.env.PMKIN_TOKEN
})
```

Add your PMKIN token to your `.env.local` file:

```
PMKIN_TOKEN=your_token_here
```

### List Blog Posts

Create a blog posts listing page at `app/blog/page.tsx`:

```typescript
import Link from 'next/link'
import { pmkin } from '@/lib/pmkin'

 // Revalidate every hour
export const revalidate = 3600

export default async function BlogPage() {
  const posts = await pmkin.listDocuments()

  return (
    <div className="prose lg:prose-xl">
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>

          {post.subtitle && <p>{post.subtitle}</p>}

          <Link href={`/blog/${post.slug}`}>Read more</Link>
        </article>
      ))}
    </div>
  )
}
```

### Show a Single Blog Post

Create a dynamic route for individual blog posts at `app/blog/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'

import { pmkin } from '@/lib/pmkin'

interface PageProps {
  params: {
    slug: string
  }
}

// Revalidate every hour
export const revalidate = 3600

export default async function BlogPostPage({ params }: PageProps) {
  const post = await pmkin.findDocumentBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose lg:prose-xl">
      <h1>{post.title}</h1>

      {post.subtitle && <p>{post.subtitle}</p>}

      <Markdown>
        {post.markdown}
      </Markdown>
    </article>
  )
}
```

## Error Handling

The client methods can throw different types of errors depending on the API
response:

```typescript
try {
  const posts = await pmkin.listDocuments()
} catch (error) {
  if (error instanceof GraphQLError) {
    // GraphQL validation or execution errors
    console.error('GraphQL Error:', error.message)
  } else if (error instanceof UnauthorizedError) {
    // Invalid or expired token
    console.error('Authentication failed')
  } else if (error instanceof RateLimitError) {
    // Too many requests
    console.error('Rate limit exceeded')
  } else if (error instanceof InvalidResponseError) {
    // Invalid response format
    console.error('Invalid API response:', error.response)
  } else if (error instanceof RequestError) {
    // Other HTTP errors
    console.error('Request failed:', error.message)
  }
}
```

### Error Types

- `GraphQLError`: Thrown when the GraphQL query is invalid or fails to execute
- `UnauthorizedError`: Thrown when the API token is invalid or expired
  (HTTP 401)
- `RateLimitError`: Thrown when you've exceeded the rate limit (HTTP 429)
- `InvalidResponseError`: Thrown when the API response format is invalid
- `RequestError`: Thrown for other HTTP errors (like 503 Service Unavailable)

### Not Found Cases

Methods that fetch single items return `undefined` when the item is not found:

```typescript
const post = await pmkin.findDocumentBySlug('non-existent')

if (!post) {
  // Handle not found case
}
```

## API Reference

### PmkinClient

```typescript
const client = new PmkinClient({
  token: string // Your PMKIN API token
})
```

#### Documents

```typescript
// List all documents
const posts = await client.listDocuments()
// Returns: DocumentListing[]

// List all documents in a specific category
const posts = await client.listDocumentsInCategory('c58b1646-94b7-4baf-b9cb-1c40d47284ac', true) // Second parameter is optional includeDrafts flag
// Returns: DocumentListing[]

// Find document by ID
const post = await client.findDocument('6733466740869c00233ad8dd')
// Returns: Document | undefined

// Find document by slug
const post = await client.findDocumentBySlug('my-post')
// Returns: Document | undefined
```

#### Categories

```typescript
// List all categories
const categories = await client.listCategories()
// Returns: CategoryListing[]

// Find category by ID
const category = await client.findCategory('c58b1646-94b7-4baf-b9cb-1c40d47284ac')
// Returns: Category | undefined
```
