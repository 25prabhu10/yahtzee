import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { scan } from 'react-scan'; // must be imported before React and React DOM
import './styles.css';

import { createRouter, RouterProvider } from '@tanstack/react-router';

import { DefaultCatchBoundary } from '@/components/default-error-boundary';
import { NotFound } from '@/components/not-found';
import { routeTree } from '@/routeTree.gen';

import reportWebVitals from './report-web-vitals';

const router = createRouter({
  context: {},
  defaultErrorComponent: DefaultCatchBoundary,
  defaultNotFoundComponent: () => <NotFound />,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultStructuralSharing: true,
  defaultViewTransition: true,
  routeTree,
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

scan({
  enabled: true,
});

const rootElement = document.getElementById('root')!;
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (import.meta.env.DEV) {
  reportWebVitals(console.log);
}
