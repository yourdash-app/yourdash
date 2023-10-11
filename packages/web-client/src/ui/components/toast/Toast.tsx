/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

const Toast: React.FC<{ message: string, type: "success" | "error" | "info" | "warn" }> = ( { message, type } ) => {
  return <div>
    {
      type
    }
    {
      message
    }
  </div>
}

export default Toast
