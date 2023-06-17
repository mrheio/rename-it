import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let res: any = undefined

  const response = NextResponse.next()

  csrfMiddleware(request, response)

  return response
}

function csrfMiddleware(request: NextRequest, response: NextResponse) {
  const csrfToken = request.cookies.get('__csrf_t')

  if (!csrfToken) {
    let token = new Uint32Array(32)
    token = crypto.getRandomValues(token)
    const decoder = new TextDecoder('utf-8')

    response.cookies.set({
      name: '__csrf_t',
      value: btoa(decoder.decode(token)),
      path: '/',
      sameSite: 'strict',
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      secure: true,
      httpOnly: true,
    })
  }
}

export function csrfProtection(token?: string) {
  if (!token) {
    return false
  }

  return token === cookies().get('__csrf_t')?.value
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
      * Match all request paths except for the ones starting with:
      * - api (API routes)
      * - _next/static (static files)
      * - _next/image (image optimization files)
      * - favicon.ico (favicon file)
      */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
