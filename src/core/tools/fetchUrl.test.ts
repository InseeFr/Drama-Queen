import axios from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { fetchUrl } from './fetchUrl'

vi.mock('axios')

describe('fetchUrl', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch data from the provided URL and return the response data', async () => {
    const mockUrl = 'https://example.com/api/data'
    const mockResponseData = { key: 'value' }

    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockResponseData })

    const result = await fetchUrl<{ key: string }>({ url: mockUrl })

    expect(axios.get).toHaveBeenCalledWith(decodeURIComponent(mockUrl))

    expect(result).toEqual(mockResponseData)
  })

  it('should throw an error if the request fails', async () => {
    const mockUrl = 'https://example.com/api/error'
    const mockError = new Error('Request failed')

    vi.mocked(axios.get).mockRejectedValueOnce(mockError)

    await expect(fetchUrl({ url: mockUrl })).rejects.toThrow(mockError)

    expect(axios.get).toHaveBeenCalledWith(decodeURIComponent(mockUrl))
  })
})
