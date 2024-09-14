/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Dialog from "@yourdash/chiplet/components/dialog/Dialog.tsx";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import LoginIndexPage from "./index.tsx";
import isValidInstance from "./lib/isValidInstance.ts";
import { FC, useState } from "react";
import { useNavigate } from "react-router";

const LoginIndexPagePreload: FC = () => {
  const navigate = useNavigate();
  const [validInstance, setValidInstance] = useState<boolean | undefined>(undefined);

  isValidInstance(coreCSI.getInstanceUrl()).then((isValid) => {
    setValidInstance(isValid);

    if (!isValid) {
      navigate("/login/instance");
    }
  });

  return (
    <>
      {validInstance === undefined ? (
        <Dialog
          title={"Logging in..."}
          hideCloseButton={true}
        >
          checking if instance is valid
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
