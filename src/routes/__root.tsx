import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <main className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Outlet />
      <TanStackRouterDevtools />
    </main>
  ),
})
