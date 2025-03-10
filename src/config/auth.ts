// src/config/auth.ts
import { type NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scope =
  "user-read-email,user-read-private,user-top-read,playlist-read-private,playlist-modify-private,playlist-modify-public";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
      authorization: {
        params: { scope },
      },
    }),
  ],
  session: {
    maxAge: 60 * 60, //1min
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const updatedToken = {
          ...token,
          access_token: account?.access_token,
          expires_at: account?.expires_at ?? Date.now() / 1000,
          expires_in: account?.expires_in,
          refresh_token: account?.refresh_token,
          scope: account?.scope,
          id: account?.providerAccountId,
        };

        // If the token hasn't expired, return it
        if (Date.now() < updatedToken.expires_at) {
          return refreshAccessToken(updatedToken);
        }

        return updatedToken;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      const user: AuthUser = {
        ...session.user,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: token.expires_at,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        scope: token.scope,
        id: token.id,
      };
      session.user = user;
      session.error = token.error;

      return {
        ...session,
        token, // Ensure token is attached here
      };
    },
  },
};
