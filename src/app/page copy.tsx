import '../app/styles.css'
import Nav from '../components/Navigation'
import Footer from '../components/Footer'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
// import { useSession, signIn, signOut } from 'next-auth/react'

const prisma = new PrismaClient()

const Home = async () => {
  // const { data: session } = useSession()

  const users = await prisma.users.findMany()

  const transactions = await prisma.transactions.findMany({
    include: {
      users: true
    }
  })

  const userTransaction = await prisma.userTransaction.findMany({
    include: {
      users: true,
    }
  })

  const userAmounts: { [key: string]: number } = {}

  userTransaction.forEach((transaction) => {
    const { userId, amount } = transaction
  
    const user = users.find((user) => user.userId === userId)

    if (user) {
      const { username } = user
  
      if (!userAmounts.hasOwnProperty(username)) {
        userAmounts[username] = 0
      }
  
      userAmounts[username] += amount
    }
  })

  const userTotal: { [key: string]: number } = {}

  transactions.forEach((transaction) => {
    const { users, total } = transaction
    
    if (users.username) {
  
      if (!userTotal.hasOwnProperty(users.username)) {
        userTotal[users.username] = 0
      }
      userTotal[users.username] += total
    }

  })

  const remainingAmounts: { [key: string]: number } = {}
    Object.keys(userAmounts).forEach((username) => {
      const remainingAmount = (userTotal[username] || 0) - userAmounts[username]
      remainingAmounts[username] = remainingAmount
    })

  // if(session) {
    return (
      <>
        <Nav />
        <main className='transactionContainer'>
          <h1></h1>
          <div className='container'>
            <h2>Overview</h2>
            <ul>
            {Object.entries(userAmounts).map(([username, totalAmount]) => (
              <>
                <li key={username}>
                  <div>{username}</div>
                  <div className={remainingAmounts[username]<0 ? 'negative' : 'positive'}>{remainingAmounts[username].toFixed(2)} €</div>
                </li>
                <hr/>
              </>
            ))}
            </ul>
          </div>
            
          <div className='container'>
            <h2>Expenses</h2>
            <ul>
              {transactions?.map((transaction) => (
                <>
                <li key={transaction.transactionId}>
                  <div className='leftFlex'>
                    <Link href={{ pathname: `/show/${transaction.transactionId}`}}> {transaction.title} </Link>
                    {transaction.users.username}
                  </div>
                  <div>
                    {transaction.total.toFixed(2)} €
                  </div>
                </li>
                <hr />
                </>
              ))}
            </ul>
            <Link href="/form" className='button'>New expense</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  // } else {
  //   return(
  //     <p>log in</p>
  //   )
  // }
}

export default Home
