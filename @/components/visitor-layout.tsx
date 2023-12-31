import React from "react";
import { Link } from '@/components/ui/link'

export function VisitorLayout(
  { children }: React.PropsWithChildren
) {
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <header className="p-4 border">
        <h1 className="text-xl font-semibold">
          Remix + Keycloak
        </h1>
      </header>

      <main className="h-full mx-auto">
        {children}
      </main>

      <footer className="p-4 bg-slate-300">
        <p className="text-center">
          Desenvolvido por <Link
            to="https://github.com/matheusamds"
            target="_blank"
          >
            Matheus Andrade
          </Link>
        </p>
      </footer>
    </div>
  )
}
