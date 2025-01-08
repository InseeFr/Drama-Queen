export const chunk = <T>(array: T[], chunkSize: number) => {
  if (chunkSize <= 0 || !Number.isInteger(chunkSize)) {
    throw new Error('chunkSize must be a strictly positive integer')
  }

  const res: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize)
    res.push(chunk)
  }
  return res
}
