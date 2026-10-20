
 // @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('Pizza & Slice website', () => {
  it('renders the website without crashing', () => {
    render(<App />);

    expect(document.body.textContent).toBeTruthy();
  });

  it('displays the restaurant name or branding', () => {
  render(<App />);

  expect(
    screen.getAllByText(/pizza\s*&?\s*slice/i).length,
  ).toBeGreaterThan(0);
});
});
