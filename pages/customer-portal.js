import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '../components/layout'
import { loadStripe } from '@stripe/stripe-js'
import handleFetchResponse from '../stripe-lib/handleFetchResponse'

export default function CustomerPortalPage () {
  const [customerStripeId, setCustomerStripeId] = useState(null)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    setCustomerStripeId(query.get('customerStripeId'))
  }, [])

  const createCustomerPortalSession = async customerStripeId => {
    const fetchResponse = await fetch('/api/create-customer-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerStripeId
      })
    })

    return handleFetchResponse(fetchResponse)
  }

  const handleGoToCustomerPortal = async event => {
    const session = await createCustomerPortalSession(customerStripeId)
    window.location.href = session.url
  }

  return (
    <Layout>
      <Head>
        <title>Real Mohsin - Customer Portal</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className='title'>Click to go to Customer Portal</h1>
        <Image
          priority
          src='/images/profile.jpg'
          height={144}
          width={144}
          alt='Your Name'
        />
        <button disabled={!customerStripeId} onClick={handleGoToCustomerPortal}>
          Go to Checkout
        </button>
      </main>
    </Layout>
  )
}
