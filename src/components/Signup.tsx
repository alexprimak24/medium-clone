import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import authService from "../services/appwrite/auth";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

type FormFields = {
  email: string;
  password: string;
  confirm_password: string;
};

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@email.com",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //in case we receive some error in the backend or our request failed
    try {
      const result = await authService.createAccount(data);

      console.log(result);
    } catch (error) {
      console.log(error);
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
      <Input
        {...register("confirm_password", {
          required: "Please repeat the password",
          minLength: { value: 8, message: "Password is too short" },
          validate: (val: string) => {
            if (watch("password") != val) {
              return "Password should match!";
            }
          },
        })}
        type="password"
        placeholder="Confirm Password"
        //!! - convert errors.confirm_password into boolean
        error={!!errors.confirm_password}
      />
      {errors.confirm_password && (
        <div className="">{errors.confirm_password.message}</div>
      )}
      <Button variant="contained" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading" : "Submit"}
      </Button>
    </form>
  );
}

export default Signup;
