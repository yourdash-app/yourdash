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
import useTranslate from "web-client/src/helpers/i10n";
import { IconButton, Chip, Row } from "web-client/src/ui";
import { useNavigate } from "react-router-dom";
import styles from "./DashboardLayout.module.scss";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

export interface IDashboard {
  username: string,
  fullName: {
    first: string,
    last: string
  }
}

const DashboardLayout: React.FC<IDashboard> = ( {
  username,
  fullName
} ) => {
  const navigate = useNavigate();
  const trans = useTranslate( "dash" );
  return (
    <main
      className={"flex flex-col w-full min-h-full h-full overflow-y-auto"}
    >
      <header className={"p-6 pl-8 pr-8 flex flex-col from-container-bg to-transparent bg-gradient-to-b"}>
        <Row>
          <span className={"text-5xl font-bold"}>
            {
              trans( "LOCALIZED_GREETING", [fullName.first, fullName.last] )
            }
          </span>
          <IconButton
            className={"ml-auto"}
            icon={YourDashIcon.Gear16}
            onClick={() => {
              navigate( "/app/a/settings/personalization/dashboard" );
            }}
          />
        </Row>
        <Row className={"pt-6 flex-wrap child:flex-grow md:child:flex-grow-0"}>
          {/* Chips */}
          <Chip onClick={() => 0}>
            {"Weather 20°C"}
          </Chip>
          <Chip onClick={() => 0} active>
            {"Rain at 3pm"}
          </Chip>
          <Chip onClick={() => 0}>
            {"You have 76 unread notifications"}
          </Chip>
        </Row>
      </header>
      <section className={styles.content}>
        {/* Widgets */}
        <div className={"bg-red-400 h-auto rounded-xl flex items-center justify-center font-bold text-4xl text-center p-4"}>
          {"Placeholder Widget"}
        </div>
        <div className={"bg-red-400 h-auto rounded-xl flex items-center justify-center font-bold text-4xl text-center p-4"}>
          {"Placeholder Widget"}
        </div>
        <div className={"bg-red-400 h-auto rounded-xl flex items-center justify-center font-bold text-4xl text-center p-4"}>
          {"Placeholder Widget"}
        </div>
        <div className={"bg-red-400 h-auto rounded-xl flex items-center justify-center font-bold text-4xl text-center p-4"}>
          {"Placeholder Widget"}
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
