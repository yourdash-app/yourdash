/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import LoginIndexPage from "./index.tsx";
import isValidInstance from "./lib/isValidInstance.ts";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UKC, UKV } from "@yourdash/uikit";

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
      {validInstance === undefined || !validInstance ? (
        <UKV.Dialog>
          <UKC.Flex
            padding
            direction={"column"}
          >
            <UKC.Heading text={"Logging in..."} />
            <UKC.Text text={"Checking if the instance is valid and online"} />
            <UKC.Flex direction={"row"}>
              <UKC.Button
                text={"Retry"}
                onClick={() => {
                  setRetryCounter(retryCounter + 1);
                }}
              />
              <UKC.Button
                text={"Select new instance"}
                onClick={() => {
                  navigate("/login/instance");
                }}
              />
            </UKC.Flex>
          </UKC.Flex>
        </UKV.Dialog>
      ) : (
        <>
          <LoginIndexPage />
        </>
      )}
    </>
  );
};

export default LoginIndexPagePreload;
