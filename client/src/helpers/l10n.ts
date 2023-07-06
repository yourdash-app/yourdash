import {useEffect, useState} from "react";

// @ts-ignore
window.setTranslateLanguage = (language: string) => {
  // @ts-ignore
  window.translateLang = language;
};

interface Itranslation {
  [key: string]: string | Itranslation
}

function getValue(obj: any, selector: string): any {
  const parsed = selector.split(".");
  let result = obj || {};

  for (let i = 0; i < parsed.length; i++) {
    if (result[parsed[i]]) {
      result = result[parsed[i]];
    } else {
      return undefined;
    }
  }

  return result;
}

export default function useTranslate(application: string) {
  const [messages, setMessages] = useState<Itranslation | undefined>(undefined);

  useEffect(() => {
    // @ts-ignore
    const langauge = window.translateLang || navigator.language;
    import(`../app/apps/${ application }/i10n/${ langauge }.json`).then(response => setMessages(response.default)).catch(() => {
      // eslint-disable-next-line no-alert
      alert(`This page is currently missing translation into your language (${langauge})`);
    });
  }, []);

  return (message: string, params?: string[]) => {
    let output = getValue(messages, message) || message;
    params?.forEach((p, i) => {
      output = output?.replace(`{${ i }}`, p);
    });
    return output;
  };
}

export function useTranslateAppCoreUI() {
  const [messages, setMessages] = useState<Itranslation | undefined>(undefined);

  useEffect(() => {
    // @ts-ignore
    const langauge = window.translateLang || navigator.language;
    import(`../app/i10n/${ langauge }.json`).then(response => setMessages(response.default)).catch(() => {
      // eslint-disable-next-line no-alert
      alert(`This page is currently missing translation into your language (${langauge})`);
    });
  }, []);

  return (message: string, params?: string[]) => {
    let output = getValue(messages, message) || message;
    params?.forEach((p, i) => {
      output = output?.replace(`{${ i }}`, p);
    });
    return output;
  };
}


export function useTranslateHomePage(page: string) {
  const [messages, setMessages] = useState<Itranslation | undefined>(undefined);

  useEffect(() => {
    // @ts-ignore
    const langauge = window.translateLang || navigator.language;
    import(`../root/${page}/i10n/${ langauge }.json`).then(response => setMessages(response.default)).catch(() => {
      // eslint-disable-next-line no-alert
      alert(`This page is currently missing translation into your language (${langauge})`);
    });
  }, []);

  return (message: string, params?: string[]) => {
    let output = getValue(messages, message) || message;
    params?.forEach((p, i) => {
      output = output?.replace(`{${ i }}`, p);
    });
    return output;
  };
}
