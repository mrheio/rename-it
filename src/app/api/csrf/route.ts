import { NextRequest, NextResponse } from 'next/server'
import { API_URL } from '../../../api/utils' // maybe move the env in the root?
import { cookies } from 'next/headers'

export async function GET(req: Request) {
  const csrfToken = cookies().get('__csrf_t')

  if (!csrfToken) {
    return new Response('No CSRF token found', { status: 400 })
  }

  return new Response(JSON.stringify({ token: csrfToken }), { 
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
