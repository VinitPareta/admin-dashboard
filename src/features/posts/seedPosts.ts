export type PostRecord = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};

export const seedPosts: PostRecord[] = [
  {
    id: 'post-1',
    updatedAt: '2026-03-12T08:30:00.000Z',
    title: 'React dashboard template moved to Vite 8',
    content:
      'The new platform baseline uses Vite, React Router 7 and Redux Toolkit. This keeps the template fast to boot, easy to extend, and straightforward to ship.',
  },
  {
    id: 'post-2',
    updatedAt: '2026-03-10T13:15:00.000Z',
    title: 'React 19 patterns are now the default',
    content:
      'Core runtime flows now prefer function components, hooks, route-based code splitting, and modern async state handling over legacy classes and connect wrappers.',
  },
  {
    id: 'post-3',
    updatedAt: '2026-03-08T17:45:00.000Z',
    title: 'Demo auth no longer depends on browser crypto polyfills',
    content:
      'The template now uses a simple local demo session service for auth examples instead of bundling server-oriented JWT libraries into the browser build.',
  },
  {
    id: 'post-4',
    updatedAt: '2026-03-05T11:05:00.000Z',
    title: 'Legacy GraphQL demo backend removed from the main runtime path',
    content:
      'Server-specific demo code was detached from the app shell so the template remains focused, lightweight, and ready for real API integration.',
  },
  {
    id: 'post-5',
    updatedAt: '2026-03-01T09:20:00.000Z',
    title: 'Bootstrap 5 theme layer kept, old architecture dropped',
    content:
      'The existing visual language is preserved, but the runtime beneath it now follows modern React architecture and tooling patterns.',
  },
];
