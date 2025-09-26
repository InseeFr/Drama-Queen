export enum TELEMETRY_EVENT_TYPE {
  CONTROL = 'control',
  CONTROL_SKIP = 'control-skip',
  EXIT = 'exit',
  INIT = 'initialized',
  NEW_PAGE = 'new-page',
}

export enum TELEMETRY_EVENT_EXIT_SOURCE {
  QUIT = 'quit',
  DEFINITIVE_QUIT = 'definitiveQuit',
}
