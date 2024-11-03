/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Dialog from "@yourdash/chiplet/components/dialog/Dialog.tsx";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import Button from "@yourdash/uikit/src/components/button/button.tsx";
import LoginIndexPage from "./index.tsx";
import isValidInstance from "./lib/isValidInstance.ts";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const LoginIndexPagePreload: FC = () => {
  const navigate = useNavigate();
  const [validInstance, setValidInstance] = useState<boolean | undefined>(undefined);
  const [retryCounter, setRetryCounter] = useState<number>(0);

  useEffect(() => {
    isValidInstance(coreCSI.getInstanceUrl()).then((isValid) => {
      setValidInstance(isValid);

      if (!isValid) {
        setValidInstance(false);
      }

      if (coreCSI.getInstanceUrl() === "") {
        navigate("/login/instance");
      }
    });
  }, [retryCounter]);

  return (
    <>
      {validInstance === undefined || validInstance === false ? (
        <Dialog
          title={"Logging in..."}
          hideCloseButton={true}
        >
          checking if instance is valid
          <Button
            text={"Retry"}
            onClick={() => {
              setRetryCounter(retryCounter + 1);
            }}
          />
          <Button
            text={"Select new instance"}
            onClick={() => {
              navigate("/login/instance");
            }}
          />
        </Dialog>
      ) : (
        <>
          <LoginIndexPage />
        </>
      )}
    </>
  );
};

export default LoginIndexPagePreload;
