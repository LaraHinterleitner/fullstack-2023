import React from 'react'
import { users } from '@prisma/client'
import { GetStaticProps } from 'next'
import { PrismaClient } from '@prisma/client'

interface FormTemplateProps {
  users: users[]
}

const prisma = new PrismaClient()

export default function FormTemplate ({ users }: FormTemplateProps) {
  return (
    <div>
    </div>
  )
}

export const getInitialProps: GetStaticProps<FormTemplateProps> = async (context) => {
  try {
    await prisma.$connect()
    console.log('Connected to the database')

    const users: users[] = await prisma.users.findMany()

    const formattedUsers: users[] = users?.map((user) => ({
      userId: user.userId,
      username: user.username,
      password: user.password,
      email: user.email,
      paypal: user.paypal
    }))

    return {
      props: {
        users: formattedUsers,
      },
    }
  } catch (error) {
    console.error('Error connecting to the database:', error)
    return {
      props: {
        users: [],
      },
    }
  } finally {
    await prisma.$disconnect()
    console.log('Disconnected from the database')
  }
}

