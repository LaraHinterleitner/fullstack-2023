import React from 'react'
import '../../styles.css'
import Nav from '@/components/Navigation'
import Footer from '@/components/Footer'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Page({ params }) {
    const userTransactions = await prisma.userTransaction.findMany({
        where: {
            transactionId: Number(params.id)
        },
        include: {
            users: true,
        }
    })

    const transactions = await prisma.transactions.findMany({
        where: {
            transactionId: Number(params.id)
        },
        include: {
            users: true
        }
    })

    return (
        <>
            <Nav />
            <main>
                <div className='mainForm'>
                    <span className='show'>
                        {transactions?.map((transaction) => ( 
                        <div key={transaction.transactionId}>
                            <h1>Italien Urlaub</h1>
                            <h2>{transaction?.title}</h2>
                            <p>{transaction?.createdAt.toLocaleString('de-AT', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                            <div>
                            {userTransactions?.map((transaction, userIndex) => (
                                <>
                                    <li>{transaction?.users.username} <span className='negative'>{transaction?.amount} € </span></li>
                                    {userIndex !== userTransactions.length - 1 && <hr />} 
                                    {userIndex === userTransactions.length - 1 && <hr className='t-hr' />} 
                                </>
                            ))}
                            </div>
                            <li>{transaction.users.username} <span className='positive'>{transaction.total} € </span></li>
                        </div>
                        ))}
                    </span>
                </div>
            </main>
            <Footer />
        </>
    )
}
