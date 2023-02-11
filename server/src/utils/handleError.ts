async function handleError(fn: any, ..._args: any[]) {
  let result

  try {
    result = [await fn(..._args), null]
  } catch (e: any) {
    result = [null, e.message]
  }

  return result
}

export default handleError
