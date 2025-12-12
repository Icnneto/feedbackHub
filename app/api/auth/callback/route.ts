import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/dashboard'

  if (code) {
    const supabase = await createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Auth callback error:', error)

      return NextResponse.redirect(
        new URL(`/login?error=auth_callback_failed`, requestUrl.origin)
      )
    }

    // Successfully authenticated - redirect to dashboard or custom next URL
    return NextResponse.redirect(new URL(next, requestUrl.origin))
  }

  // No code provided - redirect to login
  return NextResponse.redirect(new URL('/login', requestUrl.origin))
}