// import {authOptions} from "@/app/api/auth/[...nextauth]/route.js"
// import {getServerSession} from "next-auth/next"
// import Link from "next/link"

// export default async function SignInStatus() {
//   const session = await getServerSession(authOptions)

//   if(session) {
//     return <>
//       Signed in as {session.user.email} <br/>
//       <Link href="/api/auth/signout">Sign out</Link>
//       <pre>{JSON.stringify(session, null, 2)}</pre>
//     </>
//   }
//   return <>
//     Not signed in <br/>
//     <Link href="/api/auth/signin">Sign in</Link>
//   </>
// }