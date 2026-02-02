import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import loginImage from "./image.jpg";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#2F2C3A]">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-8">
        <div className="w-full h-full rounded-3xl shadow-2xl overflow-hidden">
          <img
            src={loginImage}
            alt="Auth"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Right Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-xl min-h-[480px] rounded-3xl bg-[#2F2C3A] border border-white/10 shadow-2xl p-12 flex flex-col justify-center">
          {isSignup ? (
            <Signup switchToLogin={() => setIsSignup(false)} />
          ) : (
            <Login switchToSignup={() => setIsSignup(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
