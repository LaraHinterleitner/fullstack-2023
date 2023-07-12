import React from 'react'
import styles from '../page.module.css'
import FormTemplate from './FormTemplate.server'
import Form from './Form'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
dotenv.config()

const Home = async () => {
  const users = await prisma.users.findMany()

  return (
    <main>
      <FormTemplate users={users} />
      <h2>Italien Urlaub</h2>
      <div className={styles.overlay}>
       <Form users={users}></Form>
      </div>
    </main>
  )
}

export default Home
