import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import authService from "../services/appwrite/auth";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

type FormFields = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //in case we receive some error in the backend or our request failed
    try {
      const result = await authService.login(data);
      if (result) {
        reset();
        console.log(result);
      }
    } catch (error) {
      //use  setError("root" - if we want to show not for the specific field
      setError("email", {
        message: "This email is already taken",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 my-8"
    >
      <Input
        {...register("email", {
          required: "Email is required",
          validate: (value) => {
            if (!value.includes("@")) {
              return "Email must include @";
            }
            return true;
          },
        })}
        type="text"
        placeholder="Email"
        //!! - convert errors.email into boolean
        error={!!errors.email}
      />
      {errors.email && <div className="">{errors.email.message}</div>}
      <Input
        {...register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "Password is too short" },
        })}
        type="password"
        placeholder="Password"
        //!! - convert errors.password into boolean
        error={!!errors.password}
      />
      {errors.password && <div className="">{errors.password.message}</div>}
      <Button variant="contained" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading" : "Submit"}
      </Button>
    </form>
  );
}

export default Login;
