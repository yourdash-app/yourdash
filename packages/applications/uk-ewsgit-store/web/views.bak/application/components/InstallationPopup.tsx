/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Button from "@yourdash/chiplet/components/button/Button";
import Card from "@yourdash/chiplet/components/card/Card";
import Dialog from "@yourdash/chiplet/components/dialog/Dialog";
import MajorButton from "@yourdash/chiplet/components/majorButton/MajorButton";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { type IYourDashStoreApplication } from "@yourdash/shared/apps/store/storeApplication";

export interface IInstallationPopup {
  applicationData: IYourDashStoreApplication | undefined;

  onClose(): void;

  onConfirm(): void;
}

const InstallationPopup: React.FC<IInstallationPopup> = ({ applicationData, onClose, onConfirm }) => {
  const navigate = useNavigate();
  return (
    <Dialog
      onClose={onClose}
      title={`Confirm installation of ${applicationData?.displayName}`}
    >
      <section className={"flex flex-col items-center gap-2"}>
        <div>{`Do you want to install ${applicationData?.displayName}?`}</div>
        {applicationData?.requiresBackend && (
          <Card
            level={"tertiary"}
            className={"flex flex-col gap-2"}
          >
            <div>{"Installing this application will automatically load it's supplied backend module on startup."}</div>
          </Card>
        )}
        {applicationData?.dependencies && applicationData.dependencies?.length !== 0 && (
          <Card
            level={"tertiary"}
            className={"flex flex-col gap-2"}
          >
            <div>{"The following dependency applications will be installed automatically."}</div>
            <div className={"flex flex-wrap w-full"}>
              {applicationData.dependencies.map((dependency) => (
                <Card
                  className={"p-2 flex-grow text-center"}
                  level={"tertiary"}
                  onClick={() => {
                    navigate(`/app/a/uk-ewsgit-store/app/${dependency}`);
                  }}
                  key={dependency}
                >
                  {dependency}
                </Card>
              ))}
            </div>
          </Card>
        )}
        <div className={"flex gap-2"}>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            {"Cancel"}
          </Button>
          <MajorButton
            onClick={() => {
              onConfirm();
            }}
          >
            {"Confirm installation"}
          </MajorButton>
        </div>
      </section>
    </Dialog>
  );
};

export default InstallationPopup;
