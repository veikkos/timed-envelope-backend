export const responseHeaders = () => {
  return {
    'Access-Control-Allow-Headers' : 'Content-Type',
    'Access-Control-Allow-Origin': '*',
  }
}

export const cacheHeaders = () => {
  return {
    'cache-control': 'public, max-age=63072000;'
  }
}