import React, { useState } from "react";
import Dialog from "../ui/dialog/Dialog";
import TextInput from "../ui/input/TextInput";

const LoginPage: React.FC = () => {
  const [ failure, setFailure ] = useState( false )
  
  return <>
    <Dialog>
      <main className={ `flex flex-col w-full p-3 pb-1 gap-2` }>
        <h1 className={ `font-semibold text-2xl select-none` }>Please enter your server url</h1>
        <TextInput
            title={ "test title" }
            onChange={ () => {} }
            mustMatchRegex={ /^(?:https?:\/\/)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d+)?|localhost(?::\d+)?|(?!.*\.$)[\w.-]+\.[a-z]{2,})(?::\d+)?$/ }
            placeholder={ `https://example.com` }
        /></main>
      <button
          className={ `w-full pt-2 pb-2 pl-4 pr-4 hover:bg-theme-600 active:bg-theme-500 bg-theme-700 transition-colors select-none cursor-pointer` }
          onClick={ () => {
            
            window.location.href = "/login/server"
          } }>
        Continue
      </button>
    </Dialog>
    <header>
      <img src={ `/assets/productLogos/yourdash.svg` }/>
      <h3>YourDash</h3>
    </header>
  </>
}

export default LoginPage
