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

  const email = req.query.email;
  const id = req.query.userId;
  const logID = req.query.id;

  const subProcess = spawn(`python3`, [
    `${process.cwd()}/scripts/gen_points.py`,
    "--email",
    email,
    "--userID",
    id,
    "--logID",
    logID,
  ]);

  let responseFromPython = "";
  let error: string = "No stdout or stderr from python process.";
  let responseStatus = 500;

  subProcess.stdout.on("data", (data: any) => {
    responseFromPython += data.toString();
    responseStatus = 201;
    console.log("output:", responseFromPython, responseStatus)
  });

  subProcess.stderr.on("error", (err: any) => {
    console.log(err);
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
