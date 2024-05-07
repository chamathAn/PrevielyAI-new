import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
  useClerk,
} from "@clerk/clerk-react";
import React from "react";

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const { user } = useClerk();

  return (
    <div className="flex justify-around h-[80px] bg-[#080c14] text-[#f3f3f3] items-center">
      <span className="text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#d9ff00] to-[#00a49d]">PrevielyAI</span>
      {isSignedIn ? (
        <div className="flex gap-4 w-fit">
          <span className="text-[#f3f3f3] ">Welcome, {user.firstName}</span>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <div className="flex gap-4 w-fit">
          <SignInButton
            className=" p-2 h-[40px] px-4 border-sky-100 border-[2px] flex justify-center items-center rounded-lg hover:text-[#0085ff] hover:border-[#0085ff] transition"
            mode="modal"
          />
          <SignUpButton
            forceRedirectUrl={"/"}
            className=" p-2 h-[40px] px-4 bg-[#e0fc04] flex justify-center items-center text-black rounded-lg hover:opacity-[.8] transition "
            mode="modal"
          />
        </div>
      )}
    </div>
  );
}
