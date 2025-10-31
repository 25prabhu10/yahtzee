import {
  type ErrorComponentProps,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    select: (state) => state.id === rootRouteId,
    strict: false,
  });

  return (
    <article className="flex-1 py-8">
      <div className="container mx-auto px-4">
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <h2>Something went wrong</h2>
              <p>An unexpected error occurred. Please try refreshing the page.</p>
            </div>
            <div className="space-y-4">
              {error && (
                <details className="text-sm text-muted-foreground">
                  <summary className="cursor-pointer">Error details</summary>
                  <pre className="mt-2 whitespace-pre-wrap wrap-break-words text-xs">
                    {error.message}
                  </pre>
                </details>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  router.invalidate();
                }}
                type="button"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </button>
              {isRoot ? (
                <button>
                  <Link to="/">
                    <ArrowLeft />
                    Go Home
                  </Link>
                </button>
              ) : (
                <button>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      globalThis.history.back();
                    }}
                    to="/"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go Back
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
