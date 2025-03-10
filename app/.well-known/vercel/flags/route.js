import { verifyAccess } from 'flags';
import { getProviderData } from 'flags/next';
import { NextResponse } from 'next/server';
import * as flags from '@/lib/flags';
export async function GET(request) {
    
  const access = await verifyAccess(request.headers.get('Authorization'));
  if (!access) return NextResponse.json(null, { status: 401 });
 
  const providerData = getProviderData(flags);
  return NextResponse.json(providerData);
}