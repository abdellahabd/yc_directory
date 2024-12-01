import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { Author_By_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { write_client } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      const existuser = await client
        .withConfig({ useCdn: false })
        .fetch(Author_By_GITHUB_ID_QUERY, {
          id: profile?.id,
        });
      if (!existuser) {
        await write_client.create({
          _type: "author",
          id: profile?.id,
          name,
          username: profile?.login,
          email,
          image,
          bio: profile?.bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(Author_By_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });

      return session;
    },
  },
});
