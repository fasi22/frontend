import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function Login({ switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe] = useState(false); // no setter needed
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:7000/api/auth/login", {
        email,
        password,
        rememberMe,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-100 mb-2 text-center">
        Welcome Back 👋
      </h2>
      <p className="text-gray-400 text-sm mb-8 text-center">
        Sign in to continue
      </p>

      {/* Email */}
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-3 rounded-lg bg-[#23212E] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-400 outline-none"
      />

      {/* Password */}
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 pr-12 rounded-lg bg-[#23212E] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-400 outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Login Button */}
      <button
        onClick={login}
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          loading
            ? "bg-green-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        } text-white`}
      >
        {loading ? "Signing in..." : "Login"}
      </button>

      {/* Error */}
      {error && (
        <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
      )}

      {/* Switch to Signup */}
      <p className="mt-6 text-sm text-gray-400 text-center">
        Don’t have an account?{" "}
        <span
          onClick={switchToSignup}
          className="text-green-400 font-semibold cursor-pointer hover:underline"
        >
          Sign up
        </span>
      </p>
    </>
  );
}
