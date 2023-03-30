import React, { useState } from "react";
import * as Ui from "./../ui";

const LoginPage: React.FC = () => {
  const [ failure, setFailure ] = useState( false );
  const [ instanceUrl, setInstanceUrl ] = useState( `http://example.com` );
  
  return <>
    <Ui.Card className={ `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2` }>
      <h1 className={ `text-3xl text-white pb-3` }>Please input your instance's url</h1>
      <Ui.TextInput
          title={ "test title" }
          onChange={ (value) => {
            if (value.indexOf( ":" ) === -1) {
              setInstanceUrl( value );
            } else {
              setInstanceUrl( `${ value }:3560` );
            }
          } }
          mustMatchRegex={ /^(?:https?:\/\/)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d+)?|localhost(?::\d+)?|(?!.*\.$)[\w.-]+\.[a-z]{2,})(?::\d+)?$/ }
          placeholder={ `https://example.com` }
      ></Ui.TextInput>
      <Ui.Button
          className={ `w-full pt-2 pb-2 pl-4 pr-4 hover:bg-theme-600 active:bg-theme-500 bg-theme-700 transition-colors select-none cursor-pointer` }
          onClick={ () => {
            fetch( `${ instanceUrl }/test` )
            .then( resp => resp.json() )
            .then( resp => {
              if (resp.status === 1 && resp.type === "yourdash") {
                localStorage.setItem( "current_server", instanceUrl );
                window.location.href = "#/login/server";
              }
            } );
          } }>
        Continue
      </Ui.Button>
    </Ui.Card>
    <header className={ `absolute top-0 left-0 w-full h-16 flex items-center justify-center gap-2` }>
      <img src={ `/assets/productLogos/yourdash.svg` } className={ `h-full pt-2 pb-2` } alt={ `` }/>
      <h3 className={ `font-bold text-3xl` }>YourDash</h3>
    </header>
  </>;
};

export default LoginPage;
