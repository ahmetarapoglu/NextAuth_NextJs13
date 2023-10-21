import NextAuth from "next-auth/next";
import type { AuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined")
          try {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            const response: any = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/User/login`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
              }
            );
            const user = await response?.json();
            console.info("useruseruseruseruseruser ???", user);

            if (typeof user !== "undefined") {
              return { ...user.user, apiToken: user.token };
            } else {
              return null;
            }
          } catch (e) {
            console.error(e);
            return null;
          }
        else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
