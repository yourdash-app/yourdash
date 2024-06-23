/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import Heading from "../heading/heading";
import type ToastInterface from "./toast";
import clippy from "@yourdash/shared/web/helpers/clippy.js";
import { FC, useState } from "react";
import Card from "../card/card.js";
import { UKIcon } from "../icon/iconDictionary.js";
import IconButton from "../iconButton/iconButton.js";
import Text from "../text/text.js";
import ToastContext from "./toastContext.js";
import * as React from "react";
// @ts-ignore
import styles from "./toast.module.scss";

const Toast: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  const [toasts, setToasts] = useState<(ToastInterface & { uuid: string })[]>([]);

  return (
    <>
      <ToastContext.Provider
        value={{
          showToast: (data: ToastInterface) => {
            const uuid = generateUUID();

            setToasts([...toasts, { ...data, uuid: uuid }]);

            if (!data.persist) {
              setTimeout(() => {
                setToasts([...toasts.filter((t) => t.uuid !== uuid)]);
              }, 5000);
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
                      accessibleLabel={"Close toast"}
                      icon={UKIcon.X}
                      onClick={() => setToasts(toasts.filter((x) => x.uuid !== t.uuid))}
                    />
                  ) : null
                }
                containerClassName={clippy(styles.component, t.type && styles[t.type])}
              >
                <Heading
                  level={3}
                  text={t.content.title}
                />
                <Text text={t.content.body} />
              </Card>
            );
          })}
        </div>
        {children}
      </ToastContext.Provider>
    </>
  );
};

export default Toast;
