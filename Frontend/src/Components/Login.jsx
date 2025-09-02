import React, { useState } from "react";
import { login as authlogin } from "../Store/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import  Button from './Button'
import  Input  from './Input'
import  Logo from "./Logo";
import { useDispatch } from "react-redux";
import authserve from "../api/auth"; // changed path
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState("");

  const onSubmit = async (data) => {
    seterror("");
    try {
      const user = await authserve.login(data);
      if (user) {
        dispatch(authlogin(user));
        navigate("/");
      }
    } catch (e) {
      seterror(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <Input label="Email" type="email" {...register("email", { required: true })} />
        <Input label="Password" type="password" {...register("password", { required: true })} />
        <Button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition">Sign In</Button>
        <p className="text-gray-600 text-center">
          Don't have any account? <Link to="/signup" className="text-primary font-semibold hover:underline">Sign Up</Link>
        </p>
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
