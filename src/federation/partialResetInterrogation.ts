import { prCore } from '@/createCore'

export async function partialResetInterrogation(interrogationId: string) {
  const core = await prCore
  await core.functions.synchronizeData.partialReset({ interrogationId })
}
