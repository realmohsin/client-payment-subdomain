import { css } from '@emotion/react'

export default function Layout ({ children }) {
  return <div css={container}>{children}</div>
}

const container = css`
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
`