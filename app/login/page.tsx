"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">{loading ? "Processing" : "Login"}</h1>
      <hr />

      <form className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">Email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-gray-600 text-gray-700"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-gray-600 text-gray-700"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={onLogin}
          className={`p-2 border rounded-lg w-full ${buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"} focus:outline-none focus:border-blue-600`}
          disabled={buttonDisabled || loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Dont have an account?{" "}
        <Link href="/signup" className="text-blue-500">Signup</Link>
      </p>
    </div>
  );
}
