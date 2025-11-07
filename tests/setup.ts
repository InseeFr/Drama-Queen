import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import Dexie from 'dexie'
import { IDBKeyRange, indexedDB } from 'fake-indexeddb'
import { afterEach, vi } from 'vitest'

vi.stubEnv('VITE_EXTERNAL_RESOURCES_URL', 'https://mock-external-resources-url')
vi.stubEnv('VITE_TELEMETY_DISABLED', '')

afterEach(() => {
  cleanup()
})

// Use fake IndexedDB instead of the browser DB
Dexie.dependencies.indexedDB = indexedDB
Dexie.dependencies.IDBKeyRange = IDBKeyRange
