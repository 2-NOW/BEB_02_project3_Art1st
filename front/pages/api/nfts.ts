import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/utils/prisma/index';

interface Data {}

export default async function createNft(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ unauthorized: true });
  }

  console.log('session123', session.accessToken);

  if (typeof session.accessToken === 'string') {
    const accountRecord = await prisma.account.findMany({
      where: { access_token: session.accessToken },
    });
    console.log(accountRecord, '12333');

    const user = await prisma.user.findMany({
      where: { id: accountRecord.userId },
    });
    console.log(user);
  }

  res.status(200).send('end');
}
