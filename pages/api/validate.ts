const { spawn } = require("child_process");
const path = require("path");
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
  const email = req.body.email;
  const id = req.body.userId;
  const logID = req.body.id;
  const subProcess = spawn(`${process.cwd()}/bin/python3`, [
    `${process.cwd()}/scripts/cheater.py`,
    "--email",
    email,
    "--userID",
    id,
    "--logID",
    logID,
  ]);

  let responseFromPython = "";
  let error: string = "";
  let responseStatus = 201;

  subProcess.stdout.on("data", (data: any) => {
    console.log("HELLLOOOOO");
    console.log(data.toString());
    responseFromPython += data.toString();
    responseStatus = 201;
  });

  subProcess.stderr.on("error", (err: any) => {
    console.log(err);
    error = err;
    responseStatus = 500;
  });

  subProcess.stderr.on("close", () => {
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
