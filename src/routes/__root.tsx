import { TanStackDevtools } from '@tanstack/react-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { MotionConfig } from 'motion/react';

export const Route = createRootRoute({
  component: () => (
    <main className="min-h-svh overflow-auto bg-linear-to-br from-blue-200 to-purple-300 px-4">
      <MotionConfig reducedMotion="user">
        <Outlet />
      </MotionConfig>
      {import.meta.env.DEV && (
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      )}
    </main>
  ),
});
