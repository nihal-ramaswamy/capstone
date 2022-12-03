import { spawn } from "child_process";
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

  const subProcess = spawn(`python3`, [
    `${process.cwd()}scripts/cheater.py`,
    "--email",
    email as string,
    "--userID",
    id as string,
    "--logID",
    logID as string,
  ]);

  let responseFromPython = "";
  let error: string = "No stdout or stderr from python process.";
  let responseStatus = 500;

  subProcess.stdout.on("data", (data: any) => {
    responseFromPython += data.toString();
    responseStatus = 201;
  });

  subProcess.stderr.on("error", (err: any) => {
    error = err;
    responseStatus = 500;
  });

  subProcess.on("close", () => {
    if (responseStatus != 201) {
      res.status(responseStatus).json({
        error: error,
      });
    } else {
      res.status(responseStatus).json({
        data: responseFromPython,
      });
    }
  });
};

export default handler;
