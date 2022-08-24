const spawn = require('child_process');
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  isCheater: boolean;
}

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   // res.status(200).json({ name: 'John Doe' })
// }

export const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ isCheater: false });
}
