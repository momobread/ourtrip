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
          return { id: data.user.id, test: '성공' };
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
