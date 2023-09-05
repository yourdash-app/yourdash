/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import * as React from "react";
import { type IYourDashStoreApplication } from "shared/apps/store/storeApplication";
import styles from "./InstallationPopup.module.scss";
import { Card, IconButton, Dialog, MajorButton, Button } from "web-client/src/ui";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";
import { useNavigate } from "react-router-dom";

export interface IInstallationPopup {
  applicationData: IYourDashStoreApplication | undefined,
  onClose(): void
  onConfirm(): void
}

const InstallationPopup: React.FC<IInstallationPopup> = ( { applicationData, onClose, onConfirm } ) => {
  const navigate = useNavigate();
  return (
    <Dialog onClose={() => {
      onClose();
    }}
    >
      <Card showBorder className={styles.component}>
        <section className={"flex items-center justify-between"}>
          <h1 className={"text-3xl font-semibold tracking-wide"}>{`Confirm installation of ${ applicationData?.displayName }`}</h1>
          <IconButton
            icon={YourDashIcon.X}
            onClick={() => {
              onClose();
            }}
          />
        </section>
        <section className={"flex flex-col items-center gap-2"}>
          <div>
            {`Do you want to install ${ applicationData?.displayName }?`}
          </div>
          <Card level={"secondary"} className={"flex flex-col gap-2"}>
            <div>
              {"The following dependency applications will be installed automatically."}
            </div>
            <div className={"flex flex-wrap w-full"}>
              {
                applicationData?.dependencies && (
                  applicationData.dependencies.map( dependency => (
                    <Card
                      className={"p-2 flex-grow text-center"}
                      level={"tertiary"}
                      onClick={() => {
                        navigate( `/app/a/store/app/${ dependency }` );
                      }}
                      key={dependency}
                    >
                      {dependency}
                    </Card>
                  ) )
                )
              }
            </div>
          </Card>
          <div className={"flex gap-2"}>
            <Button onClick={() => {
              onClose();
            }}
            >
              {"Cancel"}
            </Button>
            <MajorButton onClick={() => {
              onConfirm();
            }}
            >
              {"Confirm installation"}
            </MajorButton>
          </div>
        </section>
      </Card>
    </Dialog>
  );
};

export default InstallationPopup;
