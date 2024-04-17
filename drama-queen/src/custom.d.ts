declare const APP_VERSION: string
declare const LUNATIC_VERSION: string

declare module 'queen/'

//Due to a bug with vite-envs, need to be delated when fixed
declare module '*.png'
declare namespace JSX {
  interface IntrinsicElements {
    'queen-app': any
  }
}
