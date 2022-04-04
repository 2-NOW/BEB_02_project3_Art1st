import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import prisma from '@/utils/prisma/index';

interface Data {}

export default async function createNft(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // session 찾아서 user를 특정하는 api입니다.
  // 임시로 expires로 session record를 찾았는데
  // 참고할 다른 id값이 있거나 다른 방법이 있으면 수정하겠습니다.
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ unauthorized: true });
  }

  const sessionRecord = await prisma.session.findFirst({
    where: { expires: session.expires },
  });
  console.log('session record: ', sessionRecord);

  const user = await prisma.user.findFirst({
    where: { id: sessionRecord?.userId },
  });
  console.log('user: ', user);

  res.status(200).send('end');
}
