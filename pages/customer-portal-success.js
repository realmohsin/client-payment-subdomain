import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/layout'

export default function CustomerPortalSuccessPage () {
  return (
    <Layout>
      <Head>
        <title>Real Mohsin - Successful Customer Portal for Services</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>
          You're all set. Client Portal exited successful. If you need to update
          payment details again, visit..
        </h1>
      </main>
    </Layout>
  )
}
