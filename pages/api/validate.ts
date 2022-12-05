import { spawn, exec } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data?: any;
  error?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "GET") {
    res.status(500).send({ data: "Supports only get" });
    return;
  }

  const id = req.query.userId;

  console.log({id});


  const command = `python3 ${process.cwd()}scripts/cheater.py --userID ${id as string}`;

  exec(command, (err, stdout, stderr) => {

    console.log({err, stdout, stderr});
      res.status(201).json({
        data: stdout
      });
  })
};

export default handler;
