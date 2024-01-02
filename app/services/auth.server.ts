import { Authenticator } from 'remix-auth'
import { OAuth2Strategy } from 'remix-auth-oauth2'

import { sessionStorage } from '~/services/session.server'

export let authenticator = new Authenticator(sessionStorage)

authenticator.use(
  new OAuth2Strategy(
    {
      authorizationURL: "http://localhost:8080/realms/teste/protocol/openid-connect/auth",
      tokenURL: "http://localhost:8080/realms/teste/protocol/openid-connect/token",
      clientID: process.env.OIDC_CLIENT_ID as string,
      clientSecret: process.env.OIDC_CLIENT_SECRET as string,
      callbackURL: "http://localhost:3000/callback",
      scope: "openid email profile", // optional
      useBasicAuthenticationHeader: false // defaults to false
    },
    async ({ profile }) => {
      console.log("profile:", profile)
      return profile
    }
  ),
  "oidc-keycloak"
)
