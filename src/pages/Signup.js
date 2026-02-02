import React, { useState } from "react";

const Signup = ({ switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:7000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("Signup successful! Redirecting to login... ✅");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        switchToLogin(); // 👈 switch back to Login card
      }, 1500);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-100 mb-2 text-center">
        Create Account ✨
      </h2>

      {message && (
        <p className="text-green-400 mb-4 text-center font-medium">
          {message}
        </p>
      )}
      {error && (
        <p className="text-red-400 mb-4 text-center font-medium">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-[#23212E] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-400 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-[#23212E] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-400 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-400 text-center">
        Already have an account?{" "}
        <span
          onClick={switchToLogin}
          className="text-green-400 font-semibold cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </>
  );
};

export default Signup;
