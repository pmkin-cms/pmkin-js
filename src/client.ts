import { ApiClient } from './api-client'

export interface CategoryListing {
  description: string
  id: string
  name: string
  slug: string
}
export interface Category {
  description: string
  id: string
  name: string
  slug: string
}

export interface DocumentListing {
  category?: {
    id: string
    description: string
    name: string
    slug: string
  }
  coverImage: {
    url: string
  }
  excerpt: string
  id: string
  isPublished: boolean
  metaDescription: string
  metaTitle: string
  publishedAt: string
  slug: string
  subtitle: string
  title: string
}
export interface Document {
  category?: {
    id: string
    description: string
    name: string
    slug: string
  }
  coverImage: {
    url: string
  }
  excerpt: string
  html: string
  id: string
  isPublished: boolean
  markdown: string
  metaDescription: string
  metaTitle: string
  publishedAt: string
  slug: string
  subtitle: string
  title: string
}

interface FindCategoryResponse {
  category: Category
}

interface ListCategoriesResponse {
  categories: CategoryListing[]
}

interface FindDocumentResponse {
  document: Document
}

interface FindDocumentBySlugResponse {
  documentBySlug: Document
}

interface ListDocumentsResponse {
  documents: DocumentListing[]
}

interface ListDocumentsInCategoryResponse {
  documentsInCategory: DocumentListing[]
}

interface PmkinClientOptions {
  token: string
}

export class PmkinClient {
  private readonly apiClient: ApiClient

  constructor(options: PmkinClientOptions) {
    this.apiClient = new ApiClient(
      'https://content.pmkin.io/graphql',
      options.token
    )
  }

  async findCategory(id: string): Promise<Category | undefined> {
    const query = `
      query FindCategory($id: ID!) {
        category(id: $id) {
          id
          description
          name
          slug
        }
      }
    `

    const response = await this.apiClient.request<FindCategoryResponse>(query, {
      id
    })

    if (!response || !response.category) {
      return
    }

    return response.category
  }

  async listCategories(): Promise<CategoryListing[]> {
    const query = `
      query {
        categories {
          id
          description
          name
          slug
        }
      }
    `

    const response = await this.apiClient.request<ListCategoriesResponse>(query)

    if (!response || response.categories == undefined) {
      throw new InvalidResponseError(
        'The response is undefined or empty.',
        response
      )
    }

    return response.categories
  }

  async findDocument(id: string): Promise<Document | undefined> {
    const query = `
      query FindDocument($id: ID!) {
        document(id: $id) {
          category {
            id
            description
            name
            slug
          }
          coverImage {
            url
          }
          excerpt
          html
          id
          isPublished
          markdown
          metaDescription
          metaTitle
          publishedAt
          slug
          subtitle
          title
        }
      }
    `

    const response = await this.apiClient.request<FindDocumentResponse>(query, {
      id
    })

    if (!response || response.document === undefined) {
      return
    }

    return response.document
  }

  async findDocumentBySlug(slug: string): Promise<Document | undefined> {
    const query = `
      query FindDocumentBySlug($slug: String!) {
        documentBySlug(slug: $slug) {
          category {
            id
            description
            name
            slug
          }
          coverImage {
            url
          }
          excerpt
          html
          id
          isPublished
          markdown
          metaDescription
          metaTitle
          publishedAt
          slug
          subtitle
          title
        }
      }
    `

    const response = await this.apiClient.request<FindDocumentBySlugResponse>(
      query,
      {
        slug
      }
    )

    if (!response || response.documentBySlug == undefined) {
      return
    }

    return response.documentBySlug
  }

  async listDocuments(): Promise<DocumentListing[]> {
    const query = `
      query {
        documents {
          category {
            id
            description
            name
            slug
          }
          coverImage {
            url
          }
          excerpt
          id
          isPublished
          metaDescription
          metaTitle
          publishedAt
          slug
          subtitle
          title
        }
      }
    `

    const response = await this.apiClient.request<ListDocumentsResponse>(query)

    if (!response || response.documents == undefined) {
      throw new InvalidResponseError(
        'The response is undefined or empty.',
        response
      )
    }

    return response.documents ?? []
  }

  async listDocumentsInCategory(categoryId: string, includeDrafts?: boolean): Promise<DocumentListing[]> {
    const query = `
      query ListDocumentsInCategory($categoryId: ID!, $includeDrafts: Boolean) {
        documentsInCategory(categoryId: $categoryId, includeDrafts: $includeDrafts) {
          category {
            id
            description
            name
            slug
          }
          coverImage {
            url
          }
          excerpt
          id
          isPublished
          metaDescription
          metaTitle
          publishedAt
          slug
          subtitle
          title
        }
      }
    `

    const response = await this.apiClient.request<ListDocumentsInCategoryResponse>(query, {
      categoryId,
      includeDrafts
    })

    if (!response || response.documentsInCategory == undefined) {
      throw new InvalidResponseError(
        'The response is undefined or empty.',
        response
      )
    }

    return response.documentsInCategory
  }
}

export class InvalidResponseError extends Error {
  public readonly response: any

  constructor(message: string, response: any) {
    super(message)

    this.response = response
  }
}
