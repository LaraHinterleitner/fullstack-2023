'use client'
import '../app/styles.css'
import Nav from '../components/Navigation'
import Footer from '../components/Footer'

const Home = async () => {

    return (
      <>
        <Nav />
        <main className='transactionContainer'>
        </main>
        <Footer />
      </>
    )
}

export default Home
