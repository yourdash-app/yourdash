import {useEffect, useState} from 'react';

export default function useTranslate(application: string) {
  const [messages, setMessages] = useState<{ [ key: string ]: string } | undefined>(undefined);

  useEffect(() => {
    import(`../app/apps/${ application }/i10n/${ navigator.language }.json`).then(response => setMessages(response.default));
  }, []);

  return (message: string, params?: string[]) => {
    let output = messages?.[message] || message;
    params?.forEach((p, i) => {
      output = output?.replace(`{${ i }}`, p);
    });
    return output;
  };
}
