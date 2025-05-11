export function AvatarImage(url: string) {
  if (!url) {
    return url
  }
  if (url.includes('http')) {
    return url
  }
  return '/api/' + url
}
