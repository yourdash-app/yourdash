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

import React, { useState, useEffect } from "react";
import { IconButton } from "../../../ui";
import { PanelPosition } from "../Panel";
import clippy from "web-client/src/helpers/clippy";
import { YourDashIcon } from "../../../ui/components/icon/iconDictionary";

const PanelDesktopIndicator: React.FC<{ side: PanelPosition }> = ( { side } ) => {
  const [visible, setVisible] = useState( false );
  const [isDesktopMode, setIsDesktopMode] = useState( false );
  
  useEffect( () => {
    if ( localStorage.getItem( "desktop_mode" ) ) {
      setIsDesktopMode( true );
    }
  }, [] );
  
  if ( !isDesktopMode ) {
    return null;
  }
  
  return (
    <div className={"relative"}>
      <IconButton
        icon={YourDashIcon.Server16}
        onClick={() => {
          setVisible( !visible );
        }}
      />
      {
        visible && (
          <div className={clippy(
            side === PanelPosition.left && "left-full top-0 ml-4",
            side === PanelPosition.top && "top-full left-0 mt-4",
            side === PanelPosition.right && "right-full top-0 mr-4",
            side === PanelPosition.bottom && "bottom-full left-0 mb-4",
            "absolute bg-container-bg border-[1px] border-container-border p-2 rounded-lg w-64"
          )}
          >
            <span>{"Personal Server Accelerator"}</span>
          </div>
        )
      }
    </div>
  );
};

export default PanelDesktopIndicator;
