import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

vi.stubEnv('VITE_EXTERNAL_RESOURCES_URL', 'https://mock-external-resources-url')

afterEach(() => {
  cleanup()
})
