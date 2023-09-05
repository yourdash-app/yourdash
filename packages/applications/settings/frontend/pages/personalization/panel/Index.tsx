/*
 * Copyright © 2023 @Ewsgit and YourDash contributors.
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

import { useState } from "react"
import BasePageLayout from "../../../components/BasePageLayout";
import BooleanSettingComponent from "../../../components/BooleanSettingComponent";
import csi from "web-client/src/helpers/csi";
import { YourDashIcon } from "web-client/src/ui/index";
import Panel from "web-client/src/app/new/Panel/Panel"
import DropdownSettingComponent from "../../../components/DropdownSettingComponent";

const Index: React.FC = () => {
  const [panelSize, setPanelSize] = useState<"small" | "medium" | "large">( csi.userDB.get( "core:panel:size" ) );
  const [panelSide, setPanelSide] = useState<"top" | "right" | "bottom" | "left">( csi.userDB.get( "core:panel:side" ) );

  return <BasePageLayout title={"Panel"}>
    <DropdownSettingComponent
      title={"Panel Size"}
      icon={YourDashIcon.Gear}
      description={"Set the size of the panel and it's widgets"}
      options={[
        {
          value: "small",
          name: "Small"
        },
        {
          value: "medium",
          name: "Medium (Default)"
        },
        {
          value: "large",
          name: "Large"
        }
      ]}
      value={panelSize}
      setValue={( val ) => {
        setPanelSize( val as "small" | "medium" | "large" );
        csi.userDB.set( "core:panel:size", val );
        // @ts-ignore
        Panel.reload();
      }}/>
    <DropdownSettingComponent
      title={"Panel Side"}
      icon={YourDashIcon.Gear}
      description={"Set the side that the panel is on the screen"}
      options={[
        {
          value: "top",
          name: "Top"
        },
        {
          value: "right",
          name: "Right"
        },
        {
          value: "bottom",
          name: "Bottom"
        },
        {
          value: "left",
          name: "Left (Default)"
        }
      ]}
      value={panelSide}
      setValue={( val ) => {
        setPanelSide( val as "top" | "right" | "bottom" | "left" );
        csi.userDB.set( "core:panel:side", val );
        // @ts-ignore
        Panel.reload();
      }}/>
  </BasePageLayout>
}

export default Index