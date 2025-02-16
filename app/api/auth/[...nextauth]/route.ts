import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Kakao from 'next-auth/providers/kakao';

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
        console.log('로그인실행중');
        if (!credentials?.id || !credentials?.password)
          throw new Error('아이디와 비밀번호를 입력하세요');
        const { id, password } = credentials;

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
          const result = {
            id: data?.user?.id,
            name: '모모',
            email: data?.user?.email,
            phone: '010-3344-4001',
          };
          return result;
        } catch (e) {
          if (e instanceof Error) {
            throw new Error('비밀번호와 아이디가 일치하지 않습니다');
          }
          throw new Error('credentails 로그인 실패');
        }
      },
    }),
    Kakao({
      clientId: process.env.OAUTH_KAKAO_REST_API_KEY ?? '',
      clientSecret: process.env.OAUTH_KAKAO_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}`;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.phone = user.phone;
        token.id = user.id;
      }
      if (account && profile) {
        token.accessToken = account.access_token;
        token.id = profile.id;
        token.name = profile.properties?.nickname;
        token.email = profile.kakao_account?.email;
        token.image = profile.properties?.profile_image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.phone = token.phone;
      session.user.id = token.id;

      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
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
