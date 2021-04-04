export const range = (from: number, to: number) => {
  const result = []

  for (let value = from; value <= to; value++) {
    result.push(value)
  }

  return result
}
