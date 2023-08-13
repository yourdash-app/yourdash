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

import React, { useState } from "react";
import clippy from "../../../helpers/clippy";
import { IconButton } from "../../../ui";
import { PanelPosition } from "../Panel";
import PanelApplicationLauncherPopOut from "./popout/PanelPopoutLauncher";
import PanelApplicationLauncherSlideOut from "./slideout/PanelSlideoutLauncher";
import styles from "./PanelLaunchers.module.scss";
import { YourDashIcon } from "../../../ui/components/icon/iconDictionary";

const PanelApplicationLauncher: React.FC<{
  side: PanelPosition;
  type: number;
  num: number
}> = ( {
  side,
  type,
  num
} ) => {
  const [isVisible, setIsVisible] = useState<boolean>( false );
  return (
    <div
      className={
        clippy(
          side === PanelPosition.left || side === PanelPosition.right
            ? styles.horizontal
            : styles.vertical,
          type !== 1 && "relative",
          styles.component
        )
      }
    >
      <IconButton
        icon={YourDashIcon.AppLauncher16}
        className={styles.button}
        onClick={() => setIsVisible( !isVisible )}
      />
      {
        type === 1
          ? (
            <PanelApplicationLauncherSlideOut
              num={num}
              side={side}
              visible={isVisible}
              setVisible={val => setIsVisible( val )}
            />
          )
          : (
            <PanelApplicationLauncherPopOut
              num={num}
              side={side}
              visible={isVisible}
              setVisible={val => setIsVisible( val )}
            />
          )
      }
    </div>
  );
};

export default PanelApplicationLauncher;
