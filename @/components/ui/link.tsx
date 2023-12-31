import { Link as RemixLink } from '@remix-run/react'
import { RemixLinkProps } from '@remix-run/react/dist/components'

export function Link(
  { children, className, ...props }: React.PropsWithChildren<RemixLinkProps>
) {
  return (
    <RemixLink
      {...props}
      className={
        "font-semibold text-blue-500 cursor-pointer hover:underline "
        + className
      }
    >
      {children}
    </RemixLink>
  )
}
