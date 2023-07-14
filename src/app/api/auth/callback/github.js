import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}


// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   const supabase = createRouteHandlerClient({ cookies });
//   const { searchParams } = new URL(req.url);
//   const code = searchParams.get("code");

//   if (code) {
//     await supabase.auth.exchangeCodeForSession(code);
//   }

//   return NextResponse.redirect(new URL("https://split-the-bill-ruby.vercel.app/dashboard", req.url));
// }