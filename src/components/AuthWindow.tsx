import React, { useState } from "react";
import FormStyle from "./ui/FormStyle";
import Button from "@mui/material/Button";
import Login from "../pages/LoginScreen";
import Signup from "../pages/SignupScreen";
import { Link } from "react-router-dom";

export enum Auth {
  Login = "login",
  Signup = "signup",
}

function AuthWindow() {
  const [action, setAction] = useState<Auth>(Auth.Signup);

  const renderButton = (authType: Auth, label: string) => (
    <Button
      variant={action === authType ? "outlined" : undefined}
      onClick={() => setAction(authType)}
    >
      <Link to={"/" + label.toLowerCase()}>{label}</Link>
    </Button>
  );

  return (
    <FormStyle>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row mt-5 gap-4">
          {renderButton(Auth.Login, "Login")}
          {renderButton(Auth.Signup, "Signup")}
        </div>
        <>
          {action === Auth.Login && <Login />}
          {action === Auth.Signup && <Signup />}
        </>
      </div>
    </FormStyle>
  );
}

export default AuthWindow;
