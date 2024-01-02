import { createCookieSessionStorage } from '@remix-run/node'

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["secret"],
    secure: process.env.NODE_ENV === 'production'
  }
})

export let { commitSession, destroySession, getSession } = sessionStorage
