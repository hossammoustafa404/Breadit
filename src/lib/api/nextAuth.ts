import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import User from "@models/user";
import connectDB from "./connectDB";
import { UserModel } from "@types/api/models";
import { nanoid } from "nanoid";

const authOptions: NextAuthOptions = {
  pages: { signIn: "/sign-in" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        await connectDB();
        const searchedUser: UserModel | null | undefined = await User.findOne({
          email: session?.user?.email,
        });

        if (!searchedUser) {
          console.log("User has been deleted");
          return session;
        }

        if (session.user) {
          session.user._id = searchedUser._id.toString();
          if (!session.user.username) {
            session.user.username = searchedUser.username;
          }
        }

        return session;
      } catch (error) {
        console.log("Something went wrong");
        return session;
      }
    },

    async signIn({ user }) {
      try {
        await connectDB();
        const searchedUser: UserModel | null | undefined = await User.findOne({
          email: user.email,
        });
        if (!searchedUser) {
          await User.create({
            name: user.name,
            email: user.email,
            username: user?.username || nanoid(10),
            image: user.image,
          });
          return true;
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

export const getSession = async () => await getServerSession(authOptions);

export default authOptions;
