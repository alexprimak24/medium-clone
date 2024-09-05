import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import authService from "../services/appwrite/auth";

type FormFields = {
  email: string;
  password: string;
};

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@email.com",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //in case we receive some error in the backend or our request failed
    try {
      await authService.getCurrentUser();
      const result = await authService.createAccount(data);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
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
      />
      {errors.email && <div className="">{errors.email.message}</div>}
      <input
        {...register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "Password is too short" },
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <div className="">{errors.password.message}</div>}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading" : "Submit"}
      </button>
    </form>
  );
}

export default Signup;
