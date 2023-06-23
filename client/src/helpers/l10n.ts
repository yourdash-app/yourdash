import {useEffect, useState} from 'react';

// @ts-ignore
window.setTranslateLanguage = (language: string) => {
  // @ts-ignore
  window.translateLang = language;
};

export default function useTranslate(application: string) {
  const [messages, setMessages] = useState<{
    [ key: string ]: string
  } | undefined>(undefined);

  useEffect(() => {
    // @ts-ignore
    const langauge = window.translateLang || navigator.language;
    import(`../app/apps/${ application }/i10n/${ langauge }.json`).then(response => setMessages(response.default));
  }, []);

  return (message: string, params?: string[]) => {
    let output = messages?.[message] || message;
    params?.forEach((p, i) => {
      output = output?.replace(`{${ i }}`, p);
    });
    return output;
  };
}

export function useTranslateAppCoreUI() {
  const [messages, setMessages] = useState<{
    [ key: string ]: string
  } | undefined>(undefined);

  useEffect(() => {
    // @ts-ignore
    const langauge = window.translateLang || navigator.language;
    import(`../app/i10n/${ langauge }.json`).then(response => setMessages(response.default));
  }, []);

  return (message: string, params?: string[]) => {
    let output = messages?.[message] || message;
    params?.forEach((p, i) => {
      output = output?.replace(`{${ i }}`, p);
    });
    return output;
  };
}


export function useTranslateCoreUI() {
  const [messages, setMessages] = useState<{
    [ key: string ]: string
  } | undefined>(undefined);

  useEffect(() => {
    // @ts-ignore
    const langauge = window.translateLang || navigator.language;
    import(`../i10n/${ langauge }.json`).then(response => setMessages(response.default));
  }, []);

  return (message: string, params?: string[]) => {
    let output = messages?.[message] || message;
    params?.forEach((p, i) => {
      output = output?.replace(`{${ i }}`, p);
    });
    return output;
  };
}
