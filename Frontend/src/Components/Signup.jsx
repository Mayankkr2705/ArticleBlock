// src/Components/Signup.jsx
import React, { useState } from "react";
import authserve from "../api/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import  Button from "./Button";
import  Input  from "./Input";
import  Logo from "./Logo";
import { useForm } from "react-hook-form";
import { login } from "../Store/AuthSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, seterror] = useState("");

  const create = async (data) => {
    seterror("");
    try {
      const user = await authserve.createAccount(data);
      const me = user || (await authserve.getCurrentUser());
      if (me) {
        dispatch(login(me));
        navigate("/");
      }
    } catch (e) {
      seterror(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(create)} className="space-y-6">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <Input label="Name" {...register("name", { required: true })} />
        <Input label="Email" type="email" {...register("email", { required: true })} />
        <Input label="Password" type="password" {...register("password", { required: true, minLength: 6 })} />
        <Button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition">Create Account</Button>
        <p className="text-gray-600 text-center">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
        </p>
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
}

export { Signup };
