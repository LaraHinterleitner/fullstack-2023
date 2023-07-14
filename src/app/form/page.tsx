import React from 'react'
import FormTemplate from './FormTemplate.server'
import Form from './Form'
import dotenv from 'dotenv'
import Nav from '../../components/Navigation'
import Footer from '@/components/Footer'
import { PrismaClient } from '@prisma/client'
import '../styles.css'

const prisma = new PrismaClient()
dotenv.config()

const Home = async () => {
  const users = await prisma.users.findMany()

  return (
    <>
      <Nav />
      <main>
        <div className='mainForm'>
          <FormTemplate users={users} />
          <Form users={users}></Form>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home
