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
import { Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "../../../ui";

const SettingsLayout: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <main className={"grid grid-cols-1 grid-rows-[auto,1fr] md:grid-rows-none md:grid-cols-[auto,1fr] h-full w-full"}>
      <SideBar
        title={"Settings"}
        items={[
          {
            icon: "home-16",
            label: "Home",
            onClick() {
              navigate( "/app/a/settings/" );
            }
          },
          {
            icon: "paintbrush-16",
            label: "Personalization",
            onClick() {
              navigate( "/app/a/settings/personalization" );
            }
          },
          {
            icon: "login",
            label: "Login sessions",
            onClick() {
              navigate( "/app/a/settings/session" );
            }
          },
          {
            icon: "accessibility-16",
            label: "Accessibility",
            onClick() {
              navigate( "/app/a/settings/accessibility" );
            }
          },
          {
            icon: "tools-16",
            label: "Admin tools",
            onClick() {
              navigate( "/app/a/settings/admin" );
            }
          },
          {
            icon: "code-16",
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
