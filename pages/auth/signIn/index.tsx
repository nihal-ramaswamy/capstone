import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailPassword } from "../../../db/db";
import { setUserName } from "../../../store/user";
import Router from "next/router";

const SignIn: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(email, password);
    const res = await signInWithEmailPassword(email, password);
    if (res.status == "error") {
      console.log("Error: ", res.error); // TODO: Handle errors better
    } else {
      if (res.data === undefined) {
        console.log("Error: result is undefined");
        return;
      }
      dispatch(setUserName(res.data.uid));
      Router.push("/");
    }
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign In</h1>
          <input 
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
            
          <button
              type="submit"
              className="w-full text-center py-3 rounded bg-[#663399] text-white hover:bg-green-dark focus:outline-none my-1"
              onClick={(e) => handleSubmit(e)}
          >Sign In</button>
        </div>

        <div className="text-grey-dark mt-6">
          Do not have an account? 
          <Link href = "/auth/signUp">
            <div className="no-underline border-b border-blue text-[#663399]">
              Sign Up
            </div>
          </Link>.
        </div>
      </div>
    </div>
  );
};

export default SignIn;
