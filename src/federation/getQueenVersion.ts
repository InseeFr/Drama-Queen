/**
 * Returns version of Drama-Queen application.
 */
export function getQueenVersion(): string {
  return import.meta.env.APP_VERSION
}
