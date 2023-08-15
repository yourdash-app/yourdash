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
import SettingCategoryComponent from "../../components/SettingCategoryComponent";
import BasePageLayout from "../../components/BasePageLayout";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const Index: React.FC = () => (
  <BasePageLayout
    title={"Personalization"}
  >
    <SettingCategoryComponent
      href={"/app/a/settings/personalization/panel"}
      description={"Customize your panel"}
      title={"Panel"}
      icon={YourDashIcon.Paintbrush16}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/personalization/dashboard"}
      description={"Customize your dashboard"}
      title={"Dashboard"}
      icon={YourDashIcon.Paintbrush16}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/personalization/profile"}
      description={"Personalize your profile"}
      title={"Profile"}
      icon={YourDashIcon.Login}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/personalization/theme"}
      description={"Customize the look of YourDash"}
      title={"Theme"}
      icon={YourDashIcon.Accessibility16}
    />
  </BasePageLayout>
);

export default Index;
