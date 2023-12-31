/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useEffect, useState } from "react";
import { Language } from "web-tree-sitter";

interface ITranslation {
  [ key: string ]: string | ITranslation;
}

function getValue( obj: any, selector: string ): any {
  const parsed = selector.split( "." );
  let result = obj || {};

  for ( let i = 0; i < parsed.length; i++ ) {
    if ( result[parsed[i]] ) {
      result = result[parsed[i]];
    } else {
      return undefined;
    }
  }

  return result;
}

interface ITranslateWindow extends Window {
  setTranslateLanguage: ( language: string ) => void,
  translateLang?: string
}

declare const window: ITranslateWindow

window.setTranslateLanguage = ( language: string ) => {
  window.translateLang = language;
};

export default function useTranslate( application: string ) {
  const [ messages, setMessages ] = useState<ITranslation | undefined>( undefined );

  useEffect( () => {
    // @ts-ignore
    const language = window.translateLang || navigator.language;
    import( `../../../applications/${ application }/frontend/i18n/${ language }.json` )
      .then( response => setMessages( response.default ) )
      .catch( () => {
        // the page is missing translation into your language :(
        window.setTranslateLanguage( "en-GB" )
      } );
  }, [ window.translateLang, navigator.language ] );

  return ( message: string, params?: string[] ) => {
    let output = getValue( messages, message ) || "";
    params?.forEach( ( p, i ) => {
      output = output?.replace( `{${ i }}`, p );
    } );
    return output;
  };
}

export function useTranslateAppCoreUI() {
  const [ messages, setMessages ] = useState<ITranslation | undefined>( undefined );

  useEffect( () => {
    // @ts-ignore
    const language = window.translateLang || navigator.language;
    import( `../app/i10n/${ language }.json` ).then( response => setMessages( response.default ) ).catch( () => {
      // eslint-disable-next-line no-alert
      alert( `This page is currently missing translation into your language (${ language })` );

      // @ts-ignore
      window.setTranslateLanguage( "en-GB" )
    } );
  }, [] );

  return ( message: string, params?: string[] ) => {
    let output = getValue( messages, message ) || message;
    params?.forEach( ( p, i ) => {
      output = output?.replace( `{${ i }}`, p );
    } );
    return output;
  };
}


export function useTranslateHomePage( page: string ) {
  const [ messages, setMessages ] = useState<ITranslation | undefined>( undefined );

  useEffect( () => {
    // @ts-ignore
    const language = window.translateLang || navigator.language;
    import( `../root/${ page }/i10n/${ language }.json` ).then( response => setMessages( response.default ) ).catch( () => {
      // eslint-disable-next-line no-alert
      alert( `This page is currently missing translation into your language (${ language })` );

      // @ts-ignore
      window.setTranslateLanguage( "en-GB" )
    } );
  }, [] );

  return ( message: string, params?: string[] ) => {
    let output = getValue( messages, message ) || message;
    params?.forEach( ( p, i ) => {
      output = output?.replace( `{${ i }}`, p );
    } );
    return output;
  };
}
