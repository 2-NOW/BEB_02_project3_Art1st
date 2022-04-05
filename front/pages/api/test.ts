// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  name: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let testData = 'test';
  if (req.method === 'GET') {
    console.log('get test data', testData);
    res.status(200).json(testData);
  }
  if (req.method === 'POST') {
    console.log('post test data', testData);
    testData = req.body;
    console.log('change testData : ', testData);

    res.status(200).json(testData);
    return testData;
  }
}
