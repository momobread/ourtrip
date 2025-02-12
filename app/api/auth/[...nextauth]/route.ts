import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'test',
      credentials: {
        id: { label: 'id', type: 'text', placeholder: 'momo' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const { id, password } = credentials;
        console.log(id, password);
        try {
          const { data } = await axios.post(
            `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
            {
              email: id,
              password: password,
            },
            {
              headers: {
                apikey: SUPABASE_KEY,
                'Content-Type': 'application/json',
              },
            }
          );
          console.log(data, '로그인 테스트중');
          const result = {
            id: data?.user?.id,
            name: '모모',
            email: data?.user?.email,
            phone: '010-3344-4001',
          };
          console.log(result);
          return result;
        } catch (e) {
          if (e instanceof Error) e;
          throw new Error(e);
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}`;
    },
    async jwt({ token, user }) {
      if (user) {
        token.phone = user.phone;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.phone = token.phone;
      session.user.id = token.id;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
