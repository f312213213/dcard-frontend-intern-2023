export const parseCookie = (str: string) => str
  .split(';')
  .map(v => v.split('='))
  .reduce((acc: {[key: string]: string}, v) => {
    acc[decodeURIComponent((v[0] || '').trim())] = decodeURIComponent((v[1] || '').trim())
    return acc
  }, {})

export const getCookie = (name: string) => {
  if (typeof window === 'undefined') return undefined
  const cookies = parseCookie(document.cookie)
  return cookies[name]
}

export const setCookie = (name: string, value: string | number, days: number) => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

export const deleteCookie = (name: string) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
