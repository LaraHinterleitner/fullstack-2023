import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  adapter: PrismaAdapter(prisma),

  database: process.env.DATABASE_URL,
}

// export {
//   handler as GET,
//   handler as POST
// }

export default NextAuth(authOptions)