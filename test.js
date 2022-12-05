
const exec = require("child_process").exec;

const email = "nihal1@gmail.com";
const id = "SXDJa8GbvQXfheVk0bAJoQ469If1";
const logID = "fd74c45-c0ae-3ed-53d8-f4313ec0ec3";

const command = `python3 ${process.cwd()}scripts/cheater.py --email ${email} --userID ${id} --logID ${logID}`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.log(err);  
  } else {
    console.log(stdout);
    console.log(stderr);
  }
})

