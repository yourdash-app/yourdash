import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorElement: React.FC = () => {
  const error = useRouteError() as any
  
  return <div className={ "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-base-800 p-6 border-4 border-red-400" }>
    <h2 className={ "text-4xl font-semibold text-center" }>An error has occurred</h2>
    {
      error.message && <p className={"mt-4"}>{ error.message }</p>
    }
  </div>
}

export default ErrorElement
