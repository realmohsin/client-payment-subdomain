import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/layout'

export default function SuccessPage () {
  // const router = useRouter()

  // const [message, setMessage] = useState('')

  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search)

  //   if (query.get('success')) {
  //     setMessage('Payment successful! You will receive an email confirmation.')
  //   }

  //   if (query.get('canceled')) {
  //     setMessage("Payment canceled -- continue to checkout when you're ready.")
  //   }
  // }, [])

  // const handleBacktoHome = () => {
  //   setMessage('')
  //   router.push('/')
  // }

  return (
    <Layout>
      <Head>
        <title>Real Mohsin - Successful Payment for Services</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Congratulations, your website will deployed live soon!</h1>
      </main>
    </Layout>
  )
}
