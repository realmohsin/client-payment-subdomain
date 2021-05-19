import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '../components/layout'
import { loadStripe } from '@stripe/stripe-js'
import handleFetchResponse from '../stripe-lib/handleFetchResponse'

const stripePromise = loadStripe(
  'pk_test_51IoJY3EXA5L7jZkU4GFtUPpw7LpJRh5JZ79vTAhj3WlvJ7PZch6pqAsFM6wq37oUAKrNdK0unEnU8KlrmzcLjnTz00Rcx5ZLcf'
)

export default function HomePage () {
  const [bundle, setBundle] = useState(null)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    setBundle(query.get('bundle'))
  }, [])

  const createCheckoutSession = async () => {
    const fetchResponse = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oneTimeFeePriceId: 'price_1IrxFnEXA5L7jZkUrYNEdobI',
        subscriptionPriceId: 'price_1IrnkKEXA5L7jZkUxXOoaWtu',
        bundle
      })
    })

    return handleFetchResponse(fetchResponse)
  }

  const handleGoToCheckout = async event => {
    const stripe = await stripePromise

    const session = await createCheckoutSession()

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId
    })

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      alert(`Something went wrong! Try again.\nError: ${result.error.message}`)
      console.log(
        `Error Message: ${result.error.message}\n Error: ${result.error}`
      )
    }
  }

  return (
    <Layout>
      <Head>
        <title>Real Mohsin - Payment for Services</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className='title'>Click to pay your $15.00 service fee.</h1>
        <Image
          priority
          src='/images/profile.jpg'
          height={144}
          width={144}
          alt='Your Name'
        />
        <button disabled={!bundle} onClick={handleGoToCheckout}>
          Go to Checkout
        </button>
      </main>
    </Layout>
  )
}
