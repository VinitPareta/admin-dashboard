import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { clearSession } from '../features/auth/session';
import { routes } from './router';
import { createAppStore } from './store';

describe('router', () => {
  beforeEach(() => {
    clearSession();
  });

  it('redirects guests from the root path to login', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(
      <Provider store={createAppStore()}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(await screen.findByText('Login to your workspace')).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/login');
  });
});
