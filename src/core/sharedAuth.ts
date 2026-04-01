export type GetAccessToken = () => Promise<string | undefined>

let parentGetAccessToken: GetAccessToken | undefined

export function setParentGetAccessToken(getAccessToken?: GetAccessToken): void {
  parentGetAccessToken = getAccessToken
}

export function getParentGetAccessToken(): GetAccessToken | undefined {
  return parentGetAccessToken
}
