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

import React, { useEffect, useState } from "react";
import csi from "../../../helpers/csi";
import useTranslate from "../../../helpers/l10n";
import loadable from "@loadable/component";

const DashboardLayout = loadable( () => import( "./layouts/dashboard/DashboardLayout" ) );
const BrowserLayout = loadable( () => import( "./layouts/browser/BrowserLayout" ) );

const DashApplication: React.FC = () => {
  const trans = useTranslate( "dash" );
  const [userFullName, setUserFullName] = useState( {
    first: "",
    last: ""
  } );
  const [userName, setUserName] = useState( "" );
  const [layout, setLayout] = useState<"browser" | "dashboard">( "dashboard" );
  
  useEffect( () => {
    csi.getJson( "/app/dash/user-full-name", res => {
      setUserFullName( res );
    } );
    
    setUserName( localStorage.getItem( "username" ) || "ERROR" );
    setLayout( csi.userDB.get( "dash:useBrowserLayout" ) ? "browser" : "dashboard" );
  }, [] );
  
  if ( userFullName.first === "" && userFullName.last === "" ) {
    return null;
  }
  
  return (
    <div
      className={"overflow-hidden bg-cover bg-center h-full w-full"}
      style={{ backgroundImage: `url(${ localStorage.getItem( "current_server" ) }/core/login/background)` }}
    >
      {
        layout === "dashboard"
          ? <DashboardLayout username={userName} fullName={userFullName}/>
          : <BrowserLayout username={userName} fullName={userFullName}/>
      }
    </div>
  );
};

export default DashApplication;
