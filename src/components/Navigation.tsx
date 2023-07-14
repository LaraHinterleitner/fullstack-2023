'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import '../app/styles.css'
import Link from 'next/link'

export default function Nav() {
    const { data: session } = useSession()

    if(session) {
      return (
        <nav>
          <ul>
            <li><p>Signed in as <b>{session.user?.name}</b></p></li>
            <div className='navBtn'>
              <li><Link href="/" className='navLink'>Home</Link></li>
              <li><Link href="/form" className='navLink'>Form</Link></li>
              <li><Link href="/show" className='navLink'>Show</Link></li>
            </div>
            <li>
              <button className='button' onClick={() => signOut()}>
                Sign out
              </button>
            </li>
          </ul>
        </nav>
      )
    } else {
      return (
          <nav>
            <ul>
              <li><p>Not signed in</p></li>
              <li>
                <button className='button' onClick={() => signIn()}>
                  Sign in
                </button>
              </li>
            </ul>
          </nav>
      )
    }
}
