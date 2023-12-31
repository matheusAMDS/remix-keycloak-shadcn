import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@/components/ui/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { FaKey, FaEnvelope } from "react-icons/fa6"

const signInSchema = z.object({
  email: z.string().min(8).max(20).includes('@'),
  password: z.string().min(8).max(20)
})

export default function SignIn() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema)
  })

  function onSubmitSuccess(values: z.infer<typeof signInSchema>) {
    alert(JSON.stringify(values))
  }

  function onSubmitError() {
    alert("error on trying to login")
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold">
        Fazer Login
      </h1>

      <Form {...form}>
        <form
          className="space-y-4 my-8 w-80"
          onSubmit={form.handleSubmit(onSubmitSuccess, onSubmitError)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="email"
                    placeholder="exemplo@email.com"
                    icon={<FaEnvelope class="p-0 m-0" />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="password"
                    placeholder="********"
                    icon={<FaKey class="p-0 m-0" />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>

        <hr className="mb-4 w-full" />

        <Button variant='secondary' className="w-full">
          Fazer login usando&nbsp;<strong>Single Sign On</strong>
        </Button>

        <Link to="/signup" className="text-sm my-2">
          ou se ainda não possui uma conta, cadastre-se
        </Link>
      </Form>
    </div>
  )
}
