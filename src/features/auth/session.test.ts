import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  clearSession,
  createDemoSession,
  hasActiveSession,
  readSession,
} from './session';

describe('session helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('creates and persists a demo session for valid credentials', async () => {
    vi.useFakeTimers();

    const sessionPromise = createDemoSession({
      login: 'user',
      password: 'password',
    });

    await vi.advanceTimersByTimeAsync(300);

    const session = await sessionPromise;

    expect(session.user.name).toBe('Administrator');
    expect(hasActiveSession()).toBe(true);
    expect(readSession()).toEqual(session);
  });

  it('rejects invalid credentials and keeps storage clean', async () => {
    vi.useFakeTimers();

    const sessionPromise = createDemoSession({
      login: 'user',
      password: 'wrong-password',
    });
    const rejection = expect(sessionPromise).rejects.toThrow(
      'Use demo credentials: user / password'
    );

    await vi.advanceTimersByTimeAsync(300);

    await rejection;
    expect(hasActiveSession()).toBe(false);
  });

  it('clears the stored session', async () => {
    vi.useFakeTimers();

    const sessionPromise = createDemoSession({
      login: 'user',
      password: 'password',
    });

    await vi.advanceTimersByTimeAsync(300);
    await sessionPromise;

    clearSession();

    expect(readSession()).toBeNull();
  });
});
