import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import KakaoProvider from 'next-auth/providers/kakao';
import GithubProvider from 'next-auth/providers/github';

import {
  KAKAO_CLIENT_ID,
  KAKAO_CLIENT_SECRET,
  GITHUB_ID,
  GITHUB_SECRET,
  SECRET,
  JWT_SECRET,
} from '@/utils/constant/index';
import prisma from '@/utils/prisma/index';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET || GITHUB_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET || KAKAO_CLIENT_SECRET,
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET || JWT_SECRET,
  },
  adapter: PrismaAdapter(prisma),
  secret: SECRET,
  theme: {
    colorScheme: 'light',
  },
  callbacks: {},
});
