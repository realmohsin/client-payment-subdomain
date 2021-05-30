client-payment-subdomain

Notes: 

Stripe
- invoice.paid event occurs the first time for the one time payment + first subscription fee, then every month for just the subscription fee
- stripe sends the webhook events checkout.session.completed and invoice.paid at the same time, 
- checkout.session.completed does not contain customer name, but invoice.paid does (decided not to include customer name in database)
- if webhook endpoint does not send back 200 OK response, stripe resends the event to the endpoint


