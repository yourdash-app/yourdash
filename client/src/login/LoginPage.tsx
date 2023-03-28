import React, { useState } from "react";
import TextInput from "../ui/input/TextInput";
import UI from "./../ui"

const LoginPage: React.FC = () => {
  const [ failure, setFailure ] = useState( false )
  
  return <>
    <UI.Dialog title={ `Please enter your server URL` }>
      <main className={ `flex flex-col w-full p-3 pb-1 gap-2` }>
        <UI.TextInput
            title={ "test title" }
            onChange={ () => {} }
            // mustMatchRegex={
            // /^(?:https?:\/\/)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d+)?|localhost(?::\d+)?|(?!.*\.$)[\w.-]+\.[a-z]{2,})(?::\d+)?$/
            // }
            placeholder={ `https://example.com` }
        /></main>
      <UI.Button
          className={ `w-full pt-2 pb-2 pl-4 pr-4 hover:bg-theme-600 active:bg-theme-500 bg-theme-700 transition-colors select-none cursor-pointer` }
          onClick={ () => {
            window.location.href = "/login/server"
          } }>
        Continue
      </UI.Button>
    </UI.Dialog>
    <header>
      <img src={ `/assets/productLogos/yourdash.svg` }/>
      <h3>YourDash</h3>
    </header>
  </>
}

export default LoginPage
