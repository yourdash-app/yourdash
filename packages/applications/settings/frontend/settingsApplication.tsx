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
import { Card } from "web-client/src/ui";
import csi from "web-client/src/helpers/csi";
import Panel from "web-client/src/app/Panel/Panel";
import SettingsSectionPanelPosition from "./sections/SettingsSectionPanelPosition";
import SettingCategoryComponent from "./components/SettingCategoryComponent";
import BasePageLayout from "./components/BasePageLayout";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const SettingsApplication: React.FC = () => (
  <BasePageLayout
    noBack
    title={"Home"}
  >
    <SettingCategoryComponent
      href={"/app/a/settings/profile"}
      description={"Manage your user profile"}
      title={"Profile"}
      icon={YourDashIcon.Person}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/personalization"}
      description={"Sample text"}
      title={"Personalization"}
      icon={YourDashIcon.Paintbrush}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/session"}
      description={"Sample text"}
      title={"Login sessions"}
      icon={YourDashIcon.Login}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/accessibility"}
      description={"Sample text"}
      title={"Accessibility"}
      icon={YourDashIcon.Accessibility}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/admin"}
      description={"Sample text"}
      title={"Admin tools"}
      icon={YourDashIcon.Tools}
    />
    <div className={"h-full overflow-auto"}>
      <main className={"ml-auto mr-auto w-full max-w-5xl"}>
        <SettingsSectionPanelPosition/>
        <section className={"p-4"}>
          {/* TODO: improve the design of the position button icons */}
          <div
            className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2 min-h-32"}
          >
            <Card
              className={"flex flex-col transition-[var(--transition)] h-full"}
              onClick={() => {
                csi.postJson(
                  "/app/settings/core/panel/quick-shortcuts",
                  { launcher: 0 },
                  () => {
                    // @ts-ignore
                    Panel.reload();
                  }
                );
              }}
            >
              <img
                src={"/assets/productLogos/yourdash.svg"}
                alt={""}
                className={"p-4 h-full"}
                draggable={false}
              />
              <span className={"text-xl"}>{"Pop out"}</span>
            </Card>
            <Card
              className={"flex flex-col transition-[var(--transition)] h-full"}
              onClick={() => {
                csi.postJson(
                  "/app/settings/core/panel/quick-shortcuts",
                  { launcher: 1 },
                  () => {
                    // @ts-ignoret
                    Panel.reload();
                  }
                );
              }}
            >
              <img
                src={"/assets/productLogos/yourdash.svg"}
                alt={""}
                className={"p-4 h-full"}
                draggable={false}
              />
              <span className={"text-xl"}>{"Slide out"}</span>
            </Card>
          </div>
        </section>
      </main>
    </div>
  </BasePageLayout>
);

export default SettingsApplication;
