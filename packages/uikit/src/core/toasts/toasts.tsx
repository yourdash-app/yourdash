/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid.ts";
import Heading from "../../components/heading/heading.tsx";
import Separator from "../../components/separator/separator.tsx";
import type ToastInterface from "./toast.ts";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import { FC, useState } from "react";
import Card from "../../components/card/card.tsx";
import { UKIcon } from "../../components/icon/iconDictionary.ts";
import IconButton from "../../components/iconButton/iconButton.tsx";
import Text from "../../components/text/text.tsx";
import ToastContext from "./toastContext.ts";
import * as React from "react";
import styles from "./toast.module.scss";

const TOAST_DISPLAY_TIME = 5000;

const Toasts: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  const [toasts, setToasts] = useState<(ToastInterface & { uuid: string; animatingOut: boolean })[]>([]);

  return (
    <ToastContext.Provider
      value={{
        showToast: (data: ToastInterface) => {
          const uuid = generateUUID();

          setToasts((t) => [...t, { ...data, uuid: uuid, animatingOut: false }]);

          if (!data.persist) {
            setTimeout(() => {
              setToasts((t) =>
                t.map((toast) => {
                  if (uuid === toast.uuid) {
                    return {
                      ...toast,
                      animatingOut: true,
                    };
                  }

                  return toast;
                }),
              );
            }, TOAST_DISPLAY_TIME - 500);

            setTimeout(() => {
              setToasts((t) => t.filter((toast) => toast.uuid !== uuid));
            }, TOAST_DISPLAY_TIME);
          }
        },
      }}
    >
      <div className={styles.container}>
        {toasts.map((t) => {
          return (
            <Card
              key={t.uuid}
              actions={
                t.persist ? (
                  <IconButton
                    accessibleLabel={"Close toasts"}
                    icon={UKIcon.X}
                    onClick={() => setToasts((toasts) => toasts.filter((x) => x.uuid !== t.uuid))}
                  />
                ) : null
              }
              className={clippy(styles.cardContent, t.type && styles[t.type])}
              containerClassName={clippy(
                styles.component,
                t.persist && styles.pointerEvents,
                t.animatingOut ? "animate__animated animate__fadeOutRightBig" : "animate__animated animate__fadeInDown",
              )}
            >
              <Heading
                className={styles.heading}
                level={3}
                text={t.content.title}
              />
              <Separator direction={"column"} />
              <Text
                className={styles.body}
                text={t.content.body}
              />
            </Card>
          );
        })}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export default Toasts;
