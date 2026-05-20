export type VisualizeClient = {
  get: <T>(url: string) => Promise<T>
}
