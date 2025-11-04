import React, { useState } from "react";
import { signup as signupAPI } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";
import { useForm } from "react-hook-form";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const create = async (data) => {
    setError("");
    setSuccess("");
    try {
      console.log(data);
      await signupAPI(data);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
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
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-base text-gray-500">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 text-blue-600 font-medium underline underline-offset-4 hover:text-fuchsia-600 transition-colors"
            >
              Sign In
            </Link>
          </p>
          {success && (
            <p className="text-green-600 mt-8 text-center font-semibold animate-pulse">{success}</p>
          )}
          {error && (
            <p className="text-red-600 mt-8 text-center font-semibold">{error}</p>
          )}
          <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">
            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Name
                </label>
                <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="px-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="flex-1 px-3 py-3 rounded-xl bg-transparent outline-none text-gray-900 placeholder-gray-400"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <p className="text-red-600 text-sm mt-2">Name is required.</p>
                  )}
                </div>
              </div>
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
                  {errors.email && errors.email.type === 'required' && (
                    <p className="text-red-600 text-sm mt-2">Email is required.</p>
                  )}
                  {errors.email && errors.email.type === 'pattern' && (
                    <p className="text-red-600 text-sm mt-2">Please enter a valid email address.</p>
                  )}
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
                    placeholder="Create a password"
                    className="flex-1 px-3 py-3 rounded-xl bg-transparent outline-none text-gray-900 placeholder-gray-400"
                    {...register("password", { required: true, minLength: 6 })}
                  />
                  {errors.password && errors.password.type === 'required' && (
                    <p className="text-red-600 text-sm mt-2">Password is required.</p>
                  )}
                  {errors.password && errors.password.type === 'minLength' && (
                    <p className="text-red-600 text-sm mt-2">Password must be at least 6 characters.</p>
                  )}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full py-3 mt-2 mb-2 rounded-xl bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 hover:scale-105 hover:shadow-xl text-lg font-semibold text-white shadow-md transition-all duration-200"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
