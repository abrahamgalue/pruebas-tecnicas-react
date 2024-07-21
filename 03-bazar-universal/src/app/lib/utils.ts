export const mErrorObj = (input: string) => {
  return {
    message: `Product '${input}' not found`,
    error: 'not_found',
    status: 404,
  }
}
