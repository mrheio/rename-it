import { NextRequest, NextResponse } from 'next/server'
import { API_URL } from '../../../api/utils' // maybe move the env in the root?
import { redirect } from 'next/navigation'

import { csrfProtection } from '@/middleware';

export async function POST(req: Request) {
  const body = await req.formData()
  const csrfToken = body.get('csrfToken')

  if (!csrfProtection(csrfToken?.toString())) {
    return loginRedirect('/login/error', 400, { message: 'Invalid CSRF token' })
  }

  // TODO: captcha here

  const username = body.get('username')
  const password = body.get('password')
  const twoFA = body.get('twoFA')

  if (!username || !password) {
    return loginRedirect('/login/error', 400, { message: 'Missing username or password' })
  }

  const apiKey = process.env.CORE_API_KEY
  const headers = new Headers()

  if (!apiKey) {
    return loginRedirect('/login/error', 500, { message: 'Missing API key' })
  }

  headers.set('Content-Type', 'application/json')
  headers.set('Authorization', `Bearer ${process.env.CORE_API_KEY}`)

  const res = await fetch(`${API_URL}/api/v1/auth/login`, {
    headers,
    body: JSON.stringify({ username, password, twoFA }),
  })

  const data = await res.json()

  if (!res.ok) {
    try {
      return loginRedirect('/login/error', res.status, { message: 'response not ok', response: await res.json() })
    } catch (e) {
      return loginRedirect(`/login/error`, res.status, { message: 'exception', error: '' + e })
    }
  }

  const { access_token, refresh_token, expires_at } = data
  const ret = loginRedirect('/login/success')

  ret.cookies.set('access_token', access_token, {
    path: '/',
    sameSite: 'strict',
    expires: new Date(expires_at),
    secure: true,
    httpOnly: false,
  })

  ret.cookies.set('refresh_token', refresh_token, {
    path: '/',
    sameSite: 'strict',
    expires: new Date(expires_at),
    secure: true,
    httpOnly: false,
  })

  ret.cookies.set('expires_at', expires_at, {
    path: '/',
    sameSite: 'strict',
    expires: new Date(expires_at),
    secure: true,
    httpOnly: false,
  })
 
  return res
}

function loginRedirect(url: string, code?: number, error?: any) {
  let _url = new URL(url)
 
  if (code) {
    _url.searchParams.set('code', '' + code)
  }

  if (error) {
    let data = ''

    try {
      data = btoa(JSON.stringify(error))
      data = encodeURIComponent(data)
    } catch (e) {}

    _url.searchParams.set('data', data)
  }

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: _url.toString(),
    },
  })
}
