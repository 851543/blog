export function AvatarImage(url: string) {
  if (url.includes('http')) {
    return url
  }
  return '/api/' + url
}
