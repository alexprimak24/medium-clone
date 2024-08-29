import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

function AuthWindow() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@email.com",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //in case we receive some error in the backend or our request failed
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //   throw new Error();
      console.log(data);
    } catch (error) {
      //use  setError("root" - if we want to show not for the specific field
      setError("email", {
        message: "This email is already taken",
      });
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

export default AuthWindow;
