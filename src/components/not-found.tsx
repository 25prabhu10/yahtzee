import { Link } from '@tanstack/react-router';
import { ArrowLeft, Home, Search } from 'lucide-react';
import type { ReactNode } from 'react';

export function NotFound({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center justify-center bg-linear-to-br from-primary/10 via-accent/5 to-secondary/10 py-20 lg:py-32">
      <section className="container">
        <div className="mx-auto max-w-md border-muted/40">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/20">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-base">
              {children ?? (
                <>
                  The page you&apos;re looking for doesn&apos;t exist. It might have been moved,
                  deleted, or you entered the wrong URL.
                </>
              )}
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Lost? No worries! You can return to our homepage or try searching for what you need
                from our menu.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <Link to="/">
                <button className="flex items-center justify-center w-full bg-purple-600 active:scale-90 text-white font-bold tracking-wide px-6 py-3 rounded-lg text-lg hover:bg-purple-700 cursor-pointer transition-all">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </button>
              </Link>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  globalThis.history.back();
                }}
                to="/"
              >
                <button className="flex items-center justify-center w-full bg-gray-600 active:scale-90 text-white font-bold tracking-wide px-6 py-3 rounded-lg text-lg hover:bg-gray-700 cursor-pointer transition-all">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-2">
              Looking for our delicious food? Check out our menu and place your order!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
