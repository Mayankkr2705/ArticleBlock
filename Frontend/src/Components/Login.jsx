import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login as LoginAPI } from "../api/api";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";

export function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async (data) => {
    setError("");
    try {
      const res = await LoginAPI(data);
      const { user, token } = res.data;
      if (user && token) {
        login(user, token);
        navigate("/");
      }
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100">
      <div className="relative mx-auto w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/30 p-10">
        {/* Animated Gradient Blur Accent */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-500 via-fuchsia-500 to-pink-500 blur-2xl opacity-20 pointer-events-none z-0" />
        <div className="relative z-10">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex w-[100px]">
              <Logo width={100} />
            </span>
          </div>
          <h2 className="text-3xl font-bold text-center leading-tight text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-base text-gray-500">
            Don&apos;t have an account?
            <Link
              to="/signup"
              className="ml-1 text-blue-600 font-medium underline underline-offset-4 hover:text-fuchsia-600 transition-colors"
            >
              Sign Up
            </Link>
          </p>
          {error && (
            <p className="text-red-600 mt-8 text-center">{error}</p>
          )}
          <form onSubmit={handleSubmit(handleLogin)} className="mt-8 space-y-6">
            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Email
                </label>
                <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="px-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12v1.5a4.5 4.5 0 01-9 0V12m9 0v-2a4.5 4.5 0 10-9 0v2m9 0H7" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-3 rounded-xl bg-transparent outline-none text-gray-900 placeholder-gray-400"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+\.\S{2,3}$/,
                    })}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="px-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657A8 8 0 116.343 6.343" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="flex-1 px-3 py-3 rounded-xl bg-transparent outline-none text-gray-900 placeholder-gray-400"
                    {...register("password", { required: true })}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full py-3 mt-2 mb-2 rounded-xl bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 hover:scale-105 hover:shadow-xl text-lg font-semibold text-white shadow-md transition-all duration-200"
            >
              Sign In
            </Button>
            <div className="flex justify-end text-sm">
              <Link to="/forgot-password" className="text-blue-600 hover:text-fuchsia-600 transition underline underline-offset-2">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
