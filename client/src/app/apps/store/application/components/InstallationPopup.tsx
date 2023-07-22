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

import React from "react";
import { type IYourDashStoreApplication } from "../../../../../../../shared/apps/store/storeApplication";
import styles from "./InstallationPopup.module.scss";
import { Card, IconButton } from "../../../../../ui";
import { YourDashIcon } from "../../../../../ui/components/icon/iconDictionary";

export interface IInstallationPopup {
  applicationData: IYourDashStoreApplication | undefined,
  onClose(): void
  onConfirm(): void
}

const InstallationPopup: React.FC<IInstallationPopup> = ( { applicationData, onClose, onConfirm } ) => {
  return (
    <Card showBorder className={styles.component}>
      <section className={"flex items-center justify-between"}>
        <h1>{"Confirm installation of YourDev"}</h1>
        <IconButton
          icon={YourDashIcon.X16}
          onClick={() => {
            onClose();
          }}
        />
      </section>
      <p>
        {"Do you want to install YourDev?"}
        {
          applicationData?.dependencies && (
            applicationData.dependencies.map( dependency => (
              <p key={dependency}>
                {dependency}
              </p>
            ) )
          )
          
        }
      </p>
    </Card>
  );
};

export default InstallationPopup;
