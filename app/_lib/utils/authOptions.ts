import axios from 'axios';
// import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const OAUTH_NAVER_SECRET = process.env.OAUTH_NAVER_SECRET;
const OAUTH_NAVER_ID = process.env.OAUTH_NAVER_ID;

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
    GoogleProvider({
      clientId: process.env.OAUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.OAUTH_GOOGLE_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    NaverProvider({
      clientId: OAUTH_NAVER_ID!,
      clientSecret: OAUTH_NAVER_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.OAUTH_GIT_CLIENTID!,
      clientSecret: process.env.OAUTH_GIT_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
    }),
  ],

  callbacks: {
    // @ts-expect-error : dsdsd
    // eslint-disable-next-line
    async redirect({ baseUrl, url }) {
      return `${baseUrl}`;
    },
    // @ts-expect-error : sdsds
    async jwt(parmas) {
      const { token, user, account, profile } = parmas;
      console.log(token, user, account);

      if (account && profile) {
        token.id = profile.sub || profile.id;
        if (account.provider === 'kakao') {
          token.accessToken = account.access_token;
          // token.id = profile.id;
          token.name = profile.properties?.nickname;
          token.email = profile.kakao_account?.email;
          token.image = profile.properties?.profile_image;
        } else if (account.provider === 'google') {
          token.accessToken = account.access_token;
          token.name = profile.name;
          token.email = profile.email;
          token.image = profile.image;
        } else if (account.provider === 'github') {
          token.name = profile.name;
          token.image = profile.image;
        }
      }
      return token;
    },

    // @ts-expect-error : sdsds
    async session({ session, token }) {
      console.log(token, '여기입니다');
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      return session;
    },
  },
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
  // secret: process.env.NEXTAUTH_URL,
};

// // @ts-expect-error keep
// const handler = NextAuth(authOptions);
// export const GET = handler;
// export const POST = handler;
// // export { handler as GET, handler as POST };

// export const dynamic = 'force-dynamic';
