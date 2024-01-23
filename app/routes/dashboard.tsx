import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@radix-ui/react-navigation-menu";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { isAuthenticated } from "~/services/auth.server";

export const seila = () => {
  const oi = "Hello World"

  return oi + ", como vai você?"
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (!await isAuthenticated(request)) {
    return redirect("/signin")
  }

  return json({ hello: "world" })
}

export default function Dashboard() {
  const { hello } = useLoaderData<typeof loader>()

  console.log(hello)

  const userAvatar = ''

  return (
    <>
      <header className="p-4 border flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Remix + Keycloak
        </h1>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Avatar>
                <AvatarImage src={userAvatar} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>

      </footer>
    </>
  )
}
