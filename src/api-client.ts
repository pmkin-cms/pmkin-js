export class ApiClient {
  private readonly endpoint: string
  private readonly token: string

  constructor(endpoint: string, token: string) {
    this.token = token
    this.endpoint = endpoint
  }

  async request<T>(query: string, variables: Record<string, any> = {}) {
    const response = await this.performRequest<T>(query, variables)

    return response
  }

  private async performRequest<T>(
    query: string,
    variables: Record<string, any> = {}
  ) {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }

    const response = await fetch(this.endpoint, {
      body: JSON.stringify({ query, variables }),
      headers,
      method: 'POST'
    })

    if (!response.ok) {
      if (response.status === 400) {
        const result = await response.json()

        if (result.errors && result.errors.length > 0) {
          throw new GraphQLError(result.errors[0].message)
        }
      }

      if (response.status === 401) {
        throw new UnauthorizedError()
      }

      if (response.status === 429) {
        throw new RateLimitError()
      }

      if (response.status === 503) {
        throw new Error('Service unavailable. Please try again later.')
      }

      throw new RequestError(
        `GraphQL request failed with status ${response.status}: ${response.statusText}`
      )
    }

    const result = await response.json()

    if (result.errors) {
      throw new GraphQLError(result.errors[0].message)
    }

    if (!result.data) {
      throw new Error('There is no data in the response.')
    }

    return result.data as T
  }
}

export class GraphQLError extends Error {}

export class RateLimitError extends Error {
  constructor() {
    super('You have reached the rate limit. Please try again later.')
  }
}

export class RequestError extends Error {}

export class UnauthorizedError extends Error {
  constructor() {
    super(
      'You are not authorized to access this resource. Make sure that you pass a valid token.'
    )
  }
}
