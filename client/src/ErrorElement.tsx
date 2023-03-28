import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorElement: React.FC = () => {
  const error = useRouteError() as any
  
  return <div className={ `fixed bottom-2 right-2 rounded-2xl bg-base-800 p-3 border-4 border-red-400` }>
    <h2 className={ `text-3xl pb-2 font-semibold` }>An error has occurred</h2>
    <p>{ error?.data || "" }</p>
  </div>
}

export default ErrorElement
