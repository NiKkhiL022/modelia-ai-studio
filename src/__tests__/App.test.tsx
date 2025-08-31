import { render, screen } from '@testing-library/react'
import React from 'react'
import App from '../App'

// Basic smoke test
it('renders hero heading', () => {
  render(<App />)
  expect(
    screen.getByRole('heading', { name: /create stunning ai-generated/i }),
  ).toBeInTheDocument()
})
