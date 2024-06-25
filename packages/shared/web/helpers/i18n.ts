/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useEffect, useState } from "react";
import useYourDashLib from "./ydsh";

interface ITranslation {
  [key: string]: string | ITranslation;
}

function getValue(obj: ITranslation, selector: string): string | undefined {
  const parsed = selector.split(".");
  let result = obj || {};

  for (let i = 0; i < parsed.length; i++) {
    if (result[parsed[i]]) {
      result = result[parsed[i]] as never;
    } else {
      return undefined;
    }
  }

  return result as never;
}

interface ITranslateWindow extends Window {
  setTranslateLanguage: (language: string) => void;
  translateLang?: string;
}

declare const window: ITranslateWindow;

window.setTranslateLanguage = (language: string) => {
  window.translateLang = language;
  console.log("set i18n language", language);
};

const LOADED_TRANSLATIONS = new Map<`${string}:${string}`, ITranslation>();

export default function useTranslate(application: string) {
  const ydsh = useYourDashLib();
  const [messages, setMessages] = useState<ITranslation | undefined>(undefined);
  let languageOverride: string | undefined;

  useEffect(() => {
    // @ts-ignore
    const language = languageOverride || window.translateLang || navigator.language;

    if (LOADED_TRANSLATIONS.has(`${application}:${language}`)) {
      setMessages(LOADED_TRANSLATIONS.get(`${application}:${language}`));
      return;
    }

    if (LOADED_TRANSLATIONS.has(`${application}:en-GB`)) {
      setMessages(LOADED_TRANSLATIONS.get(`${application}:en-GB`));
      return;
    }

    import(`../../../../applications/${application}/web/i18n/${language}.json`)
      .then((response) => {
        setMessages(response.default);
        LOADED_TRANSLATIONS.set(`${application}:${language}`, response.default);
      })
      .catch(() => {
        if (language === "en-GB") {
          console.error("No translation found for en-GB, application:", application);
          // the page is missing translation into the default language :(
          ydsh.toast.error(
            "Localization Error",
            `This page is currently missing translation into your language (${language}) and the default fallback language (en-GB)`,
          );
          return;
        }

        // the page is missing translation into your language :(
        languageOverride = "en-GB";
        import(`../../../../applications/${application}/web/i18n/en-GB.json`)
          .then((response) => {
            setMessages(response.default);
            LOADED_TRANSLATIONS.set(`${application}:en-GB`, response.default);
          })
          .catch(() => {
            console.error("No translation found for en-GB, application:", application);
            // the page is missing translation into the default language :(
            ydsh.toast.error(
              "Localization Error",
              `This page is currently missing translation into your language (${language}) and the default fallback language (en-GB)`,
            );
          });
      });
  }, []);

  return (message: string, params?: string[]) => {
    if (!messages) {
      return message;
    }

    let output = getValue(messages, message) || "";

    if (output === "") {
      console.error(`I18N: No translation found for ${message} in ${application}`);
      return message;
    }

    params?.forEach((p, i) => {
      output = output?.replace(`{${i}}`, p);
    });
    return output;
  };
}

export function useTranslateAppCoreUI() {
  const [messages, setMessages] = useState<ITranslation | undefined>(undefined);

  useEffect(() => {
    // @ts-ignore
    const language = window.translateLang || navigator.language;
    import(`../../../../main/web/src/app/i10n/${language}.json`)
      .then((response) => setMessages(response.default))
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert(`This page is currently missing translation into your language (${language})`);

        // @ts-ignore
        window.setTranslateLanguage("en-GB");
      });
  }, []);

  return (message: string, params?: string[]) => {
    if (!messages) {
      return message;
    }
    let output = getValue(messages, message) || message;
    params?.forEach((p, i) => {
      output = output?.replace(`{${i}}`, p);
    });
    return output;
  };
}

export function useTranslateHomePage(page: string) {
  const [messages, setMessages] = useState<ITranslation | undefined>(undefined);

  useEffect(() => {
    // @ts-ignore
    const language = window.translateLang || navigator.language;
    import(`../../../../main/web/src/root/${page}/i10n/${language}.json`)
      .then((response) => setMessages(response.default))
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert(`This page is currently missing translation into your language (${language})`);

        // @ts-ignore
        window.setTranslateLanguage("en-GB");
      });
  }, []);

  return (message: string, params?: string[]) => {
    if (!messages) {
      return message;
    }

    let output = getValue(messages, message) || message;
    params?.forEach((p, i) => {
      output = output?.replace(`{${i}}`, p);
    });
    return output;
  };
}
