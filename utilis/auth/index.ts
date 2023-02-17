export const parseCookie = (str: string) => str
  .split(';')
  .map(v => v.split('='))
  .reduce((acc: {[key: string]: string}, v) => {
    acc[decodeURIComponent((v[0] || '').trim())] = decodeURIComponent((v[1] || '').trim())
    return acc
  }, {})

export const setCookie = (name, value, days) => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}
