"use client";
import Board from "@/components/Board";
import Header from "@/components/Header";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useBoardStore } from "@/store/BoardStore";
import { account } from "@/appwrite";
//import FacebookLogin from "react-facebook-login";

export default function Home() {
  const [credentials, setCredentials] = useBoardStore((state) => [
    state.credentials,
    state.setCredentials,
  ]);
  const responseFacebook = (response: any) => {
    setCredentials({ name: response.name, email: response.email });
    console.log(response);
  };
  const componentClicked = (error: any) => {
    console.warn(error);
  };

  const facebookAuth = (e: any) => {
    e.preventDefault();

    account.createOAuth2Session(
      "facebook",
      "http://localhost:3000/",
      "http://localhost:3000/"
    );
    //const name = account.get().then((res) => console.log(res));

    //setCredentials(name);
  };

  return (
    <main>
      {credentials.name !== "" ? (
        <>
          <Header />
          <Board />
        </>
      ) : (
        <div className="flex gap-2 items-center justify-center h-screen  ">
          <div className="flex flex-col items-center p-10 rounded-lg border-x-slate-200 ring-offset-2 ring-4  text-center shadow-sm bg-white/50 ">
            <h2 className=" font-bold text-3xl mb-6 ">Login Using</h2>
            <GoogleLogin
              onSuccess={(response) => {
                const userObject: any = jwt_decode(response.credential!);

                console.log(userObject);
                setCredentials({
                  name: userObject.name,
                  email: userObject.email,
                });
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              shape="square"
              logo_alignment="center"
            />
            <br />

            <br />
          </div>
        </div>
      )}
    </main>
  );
}
