import { Issuer, generators } from 'openid-client'
import { redirect } from '@remix-run/node'

import { commitSession, getSession } from '~/services/session.server'

const AUTH_SESSION_CODE_KEY = "auth_session_code"
const AUTH_ACCESS_TOKEN_KEY = "auth_access_token"
const AUTH_REFRESH_TOKEN_KEY = "auth_refresh_token"

const keycloakIssuer = new Issuer({
  issuer: 'http://localhost:8080/realms/teste',
  authorization_endpoint: 'http://localhost:8080/realms/teste/protocol/openid-connect/auth',
  token_endpoint: 'http://localhost:8080/realms/teste/protocol/openid-connect/token',
  jwks_uri: "http://localhost:8080/realms/teste/protocol/openid-connect/certs"
})

const keycloakClient = new keycloakIssuer.Client({
  client_id: process.env.OIDC_CLIENT_ID as string,
  client_secret: process.env.OIDC_CLIENT_SECRET as string,
  redirect_uris: ['http://localhost:3000/callback'],
  response_types: ['code']
})

export async function authenticate(request: Request) {
  const session = await getSession(request.headers.get("Cookie"))

  const codeVerifier = generators.codeVerifier()

  session.set(AUTH_SESSION_CODE_KEY, codeVerifier)

  const codeChallenge = generators.codeChallenge(codeVerifier)

  const authenticationUrl = keycloakClient.authorizationUrl({
    scope: "openid email profile",
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  })

  return redirect(authenticationUrl, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  })
}

export async function authCallback(request: Request) {
  const params = keycloakClient.callbackParams(request.url)
  const session = await getSession(request.headers.get("Cookie"))
  const codeVerifier = session.get(AUTH_SESSION_CODE_KEY)

  try {
    const tokenSet = await keycloakClient.callback(
      'http://localhost:3000/callback',
      params,
      { code_verifier: codeVerifier }
    )

    const { access_token, refresh_token } = tokenSet

    session.set(AUTH_ACCESS_TOKEN_KEY, access_token)
    session.set(AUTH_REFRESH_TOKEN_KEY, refresh_token)

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    })
  } catch (err) {
    return redirect("/signin")
  }
}

// export async function isAuthenticated(request: Request) {
//   const session = await getSession(request.headers.get("Cookie"))

//   const accessToken = session.get(AUTH_ACCESS_TOKEN_KEY)

//   console.log("access token:", accessToken)

//   return !!accessToken
// }
