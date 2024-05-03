/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import { FC, useState } from "react";
import Card from "../card/card.js";
import { UKIcon } from "../icon/iconDictionary.js";
import IconButton from "../iconButton/iconButton.js";
import Text from "../text/text.js";
import ToastContext from "./toastContext.js";
import React from "react";
import styles from "./toast.module.scss";

const Toast: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  const [toasts, setToasts] = useState<
    { type: "success" | "error" | "warning" | "info"; content: string; persist?: boolean; timestamp: number }[]
  >([]);

  return (
    <>
      <ToastContext.Provider
        value={{
          showToast: (data: { type: "success" | "error" | "warning" | "info"; content: string; persist?: boolean }) => {
            const timestamp = Date.now();

            setToasts([...toasts, { ...data, timestamp: timestamp }]);

            if (!data.persist) {
              setTimeout(() => {
                setToasts(toasts.filter((t) => t.timestamp !== timestamp));
              }, 5000);
            }
          },
        }}
      >
        <div className={styles.container}>
          {toasts.map((t) => {
            return (
              <Card
                key={t.timestamp}
                actions={
                  t.persist ? (
                    <IconButton
                      accessibleLabel={"Close toast"}
                      icon={UKIcon.X}
                      onClick={() => setToasts(toasts.filter((x) => x.timestamp !== t.timestamp))}
                    />
                  ) : null
                }
                containerClassName={clippy(styles.component, t.type && styles[t.type])}
              >
                <Text text={t.content} />
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
