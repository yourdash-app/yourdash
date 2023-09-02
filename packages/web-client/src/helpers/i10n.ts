/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { useEffect, useState } from "react";

// @ts-ignore
window.setTranslateLanguage = ( language: string ) => {
  // @ts-ignore
  window.translateLang = language;
};

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

export default function useTranslate( application: string ) {
  const [messages, setMessages] = useState<ITranslation | undefined>( undefined );
  
  useEffect( () => {
    // @ts-ignore
    const langauge = window.translateLang || navigator.language;
    import( `applications/${ application }/frontend/i10n/${ langauge }.json` ).then( response => setMessages( response.default ) ).catch( () => {
      // eslint-disable-next-line no-alert
      alert( `This page is currently missing translation into your language (${ langauge })` );
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

export function useTranslateAppCoreUI() {
  const [messages, setMessages] = useState<ITranslation | undefined>( undefined );
  
  useEffect( () => {
    // @ts-ignore
    const langauge = window.translateLang || navigator.language;
    import( `../app/i10n/${ langauge }.json` ).then( response => setMessages( response.default ) ).catch( () => {
      // eslint-disable-next-line no-alert
      alert( `This page is currently missing translation into your language (${ langauge })` );
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
  const [messages, setMessages] = useState<ITranslation | undefined>( undefined );
  
  useEffect( () => {
    // @ts-ignore
    const langauge = window.translateLang || navigator.language;
    import( `../root/${ page }/i10n/${ langauge }.json` ).then( response => setMessages( response.default ) ).catch( () => {
      // eslint-disable-next-line no-alert
      alert( `This page is currently missing translation into your language (${ langauge })` );
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
