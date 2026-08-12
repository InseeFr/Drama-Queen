import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import Dexie from 'dexie'
import { IDBKeyRange, indexedDB } from 'fake-indexeddb'
import { afterEach, vi } from 'vitest'

vi.stubEnv('VITE_EXTERNAL_RESOURCES_URL', 'https://mock-external-resources-url')
vi.stubEnv('VITE_TELEMETY_DISABLED', '')

const storage = new Map<string, string>()
Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear(),
    get length() {
      return storage.size
    },
    key: (index: number) => [...storage.keys()][index] ?? null,
  },
  configurable: true,
})

afterEach(() => {
  storage.clear()
  cleanup()
})

// Use fake IndexedDB instead of the browser DB
Dexie.dependencies.indexedDB = indexedDB
Dexie.dependencies.IDBKeyRange = IDBKeyRange
