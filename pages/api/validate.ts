const { spawn } = require("child_process");
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data?: any;
  error?: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "GET") {
    res.status(500).send({ data: "Supports only get" });
    return;
  }
  const email = req.body.email;
  const id = req.body.userId;
  const logID = req.body.id;
  const subProcess = spawn("python3", [
    "../../scripts/cheater.py",
    "--userID",
    id,
    "--email",
    email,
    "--logID",
    logID,
  ]);

  let responseFromPython = false;
  let error: string = "";
  let responseStatus = 202;

  subProcess.stdout.on("data", (data: any) => {
    console.log(data);
    responseFromPython = data.toString();
    responseStatus = 201;
  });

  subProcess.stderr.on("error", (err: any) => {
    error = err;
    responseStatus = 500;
  });

  subProcess.on("close", () => {
    if (responseStatus == 201) {
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
