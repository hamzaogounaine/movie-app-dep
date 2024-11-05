/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tei0FSpUW5m
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext/authContext";


export default function NotFound() {
    const {mode } = useAuth();
  return (
    <div className={`flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 ${mode}`}>
      <div className="mx-auto max-w-md text-center">
        <img
          src="https://media.tenor.com/KOZLvzU0o4kAAAAM/no-results.gif"
  
          
          alt="404 Not Found"
          className="mx-auto mb-6"
          
        />
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Page Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}