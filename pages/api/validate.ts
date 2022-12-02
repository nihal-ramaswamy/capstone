import { execSync } from "child_process";
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

  const email = req.query.email;
  const id = req.query.userId;
  const logID = req.query.id;

  const pythonCliScript = `python3 ${process.cwd()}scripts/cheater.py 
                              --email ${email} 
                              --userID ${id} 
                              --logID ${logID}`;

  const result = execSync(pythonCliScript);

  res.json({
    data: result,
  });
};

export default handler;
