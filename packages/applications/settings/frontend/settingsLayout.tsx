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
import { Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "web-client/src/ui";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const SettingsLayout: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <main className={"grid grid-cols-1 grid-rows-[auto,1fr] md:grid-rows-none md:grid-cols-[auto,1fr] h-full w-full"}>
      <SideBar
        title={"Settings"}
        items={[
          {
            icon: YourDashIcon.Home,
            label: "Home",
            onClick() {
              navigate( "/app/a/settings/" );
            }
          },
          {
            icon: YourDashIcon.Paintbrush,
            label: "Personalization",
            onClick() {
              navigate( "/app/a/settings/personalization" );
            }
          },
          {
            icon: YourDashIcon.Login,
            label: "Login sessions",
            onClick() {
              navigate( "/app/a/settings/session" );
            }
          },
          {
            icon: YourDashIcon.Accessibility,
            label: "Accessibility",
            onClick() {
              navigate( "/app/a/settings/accessibility" );
            }
          },
          {
            icon: YourDashIcon.Tools,
            label: "Admin tools",
            onClick() {
              navigate( "/app/a/settings/admin" );
            }
          },
          {
            icon: YourDashIcon.Code,
            label: "Developer tools",
            onClick() {
              navigate( "/app/a/settings/developer" );
            }
          }
        ]}
      />
      <Outlet/>
    </main>
  );
};

export default SettingsLayout;
