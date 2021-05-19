import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/layout'

export default function CanceledPage () {
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

  const [bundle, setBundle] = useState(null)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    setBundle(query.get('bundle'))
  }, [])

  return (
    <Layout>
      <Head>
        <title>Real Mohsin - Canceled Payment for Services</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Oops, you canceled the process!.</h1>

        <Link disabled={!bundle} href={`/?bundle=${bundle}`}>
          <a>Go back to Home</a>
        </Link>
      </main>
    </Layout>
  )
}
