"use client";
// Link is a component provided by Next.js for creating client-side navigation links between pages.

// It is typically used within the JSX of a component to create accessible and efficient links that allow users to navigate between different routes or pages of the application.

// It is a fundamental part of Next.js's client-side routing system and is often used for building navigation menus, buttons, or any clickable elements that lead to other parts of the application.

import Link from "next/link";

import React, { useEffect } from "react";

// useRouter is a hook that provides access to the Next.js router object, allowing you to work with routing information and navigate between pages programmatically.

// Common use cases for useRouter include:
// Accessing the current route's pathname, query parameters, and route-related information.
// Programmatically navigating to a different page using methods like push, replace, and back.

import { useRouter } from "next/navigation";

// by importing Axios into your project, you can leverage its capabilities to send and receive data over HTTP, making it a powerful tool for working with APIs and web services in both frontend and backend JavaScript applications.

// It supports various HTTP methods, such as GET, POST, PUT, DELETE, etc.You can use Axios to fetch data from an API, send data to a server, or interact with RESTful APIs and other HTTP-based services.

import axios from "axios";

import { toast } from "react-hot-toast";


export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);

      router.push("/login");
      
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">{loading ? "Processing" : "Signup"}</h1>

      <form className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">Username</label>
          <input
            className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-gray-600 text-gray-700"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
          />
        </div>

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
          onClick={onSignup}
          className={`p-2 border rounded-lg w-full ${buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"} focus:outline-none focus:border-blue-600`}
          disabled={buttonDisabled || loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
  );
}
