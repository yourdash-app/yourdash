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
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";
import { Icon, Card } from "web-client/src/ui";

export interface IBaseSettingComponent {
  children: React.ReactNode,
  title: string,
  description: string,
  icon: YourDashIcon,
  onClick?: () => void
}

const BaseSettingComponent: React.FC<IBaseSettingComponent> = ( {
  children,
  title,
  description,
  icon,
  onClick
} ) => (
  <Card onClick={onClick} className={"flex gap-2 items-center w-full"}>
    <Icon className={"aspect-square h-10"} icon={icon}/>
    <div className={"mr-auto"}>
      <h2 className={"font-semibold text-container-fg text-3xl -mb-1"}>{title}</h2>
      <span className={"font-light text-container-tertiary-fg text-sm"}>{description}</span>
    </div>
    {
      children
    }
  </Card>
);

export default BaseSettingComponent;
