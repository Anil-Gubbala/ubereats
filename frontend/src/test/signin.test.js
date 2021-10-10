// __tests__/fetch.test.js
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signin from '../account/Signin';

const server = setupServer(
  rest.get('/signin', (req, res, ctx) =>
    res(ctx.json({ greeting: 'hello there' }))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders learn react link', () => {
  render(<Signin />);
  screen.debug();
});
