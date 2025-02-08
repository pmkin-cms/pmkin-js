import { describe, it, expect, beforeEach, vi } from 'vitest'

import {
  ApiClient,
  GraphQLError,
  RateLimitError,
  RequestError,
  UnauthorizedError
} from './api-client'

describe('ApiClient', () => {
  const endpoint = 'https://api.example.com/graphql'
  const token =
    '54a1a7c3f4bc48b6c7b58314c90fec7833e3fa4c2d8ce5d61fb36f448ce35aad'

  let client: ApiClient

  beforeEach(() => {
    client = new ApiClient(endpoint, token)

    vi.restoreAllMocks()
  })

  it('should make successful GraphQL requests.', async () => {
    const mockData = { user: { id: 1, name: 'Test User' } }
    const mockResponse = { data: mockData }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const query = 'query { user { id name } }'
    const variables = { userId: 1 }

    const result = await client.request(query, variables)

    expect(result).toEqual(mockData)
    expect(fetch).toHaveBeenCalledWith(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    })
  })

  it('should handle GraphQL errors in successful response.', async () => {
    const mockResponse = {
      data: null,
      errors: [{ message: 'Field "user" not found' }]
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const query = 'query { invalid }'

    await expect(client.request(query)).rejects.toThrow(GraphQLError)
    await expect(client.request(query)).rejects.toThrow(
      'Field "user" not found'
    )
  })

  it('should handle 400 GraphQL validation errors.', async () => {
    const mockResponse = {
      errors: [{ message: 'Invalid syntax' }]
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: () => Promise.resolve(mockResponse)
    })

    const query = 'invalid query'

    await expect(client.request(query)).rejects.toThrow(GraphQLError)
    await expect(client.request(query)).rejects.toThrow('Invalid syntax')
  })

  it('should handle 401 unauthorized errors.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized'
    })

    await expect(client.request('query')).rejects.toThrow(UnauthorizedError)
    await expect(client.request('query')).rejects.toThrow(/not authorized/)
  })

  it('should handle 429 rate limit errors.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests'
    })

    await expect(client.request('query')).rejects.toThrow(RateLimitError)
    await expect(client.request('query')).rejects.toThrow(/rate limit/)
  })

  it('should handle 503 service unavailable errors.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable'
    })

    await expect(client.request('query')).rejects.toThrow('Service unavailable')
  })

  it('should handle other HTTP errors.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    })

    await expect(client.request('query')).rejects.toThrow(RequestError)
    await expect(client.request('query')).rejects.toThrow(/status 500/)
  })

  it('should handle missing data in response.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: null })
    })

    await expect(client.request('query')).rejects.toThrow(
      'no data in the response'
    )
  })

  it('should handle network errors.', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    await expect(client.request('query')).rejects.toThrow('Network error')
  })
})
