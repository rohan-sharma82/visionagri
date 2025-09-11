
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This route is no longer used as authentication has been removed.
export async function GET(request: NextRequest) {
  const redirectUrl = new URL('/', request.url)
  return NextResponse.redirect(redirectUrl)
}
