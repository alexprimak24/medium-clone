import React, { ReactNode } from "react";

interface FormStyleProps {
  children: ReactNode;
}

function FormStyle({ children }: FormStyleProps) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className=" min-w-72 min-h-72 bg-gradient-to-r from-slate-200 via-slate-200 to-slate-200 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl ">
        {children}
      </div>
    </div>
  );
}

export default FormStyle;
