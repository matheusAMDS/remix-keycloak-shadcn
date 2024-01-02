import { Link } from '@/components/ui/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@radix-ui/react-navigation-menu";
import { Button } from "@/components/ui/button";
import { Outlet, useNavigate } from "@remix-run/react";

export default function PublicLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <header className="p-4 border flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Remix + Keycloak
        </h1>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button onClick={() => navigate("/signin")}>
                Entrar
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <main className="h-full mx-auto">
        <Outlet />
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
