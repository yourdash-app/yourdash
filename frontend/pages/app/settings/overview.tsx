/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import localforage from 'localforage';
import { useEffect, useState } from 'react';
import SettingsPageTemplate from '../../../components/app/settings/PageTemplate';
import {
  ToggleSetting,
  StringSetting
} from '../../../components/app/settings/SettingComponents';

export default function SettingsOverviewPage() {
  const [settingsData, setSettingsData] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    localforage.getItem('settings').then((settings: any) => {
      setSettingsData(settings);
      setLoaded(true)
    });
  }, []);
  if (!loaded) return <></>;
  return (
    <SettingsPageTemplate>
      <ToggleSetting
        description={'Collapse navigation bar'}
        settingsKey={`collapseNavigationBar`}
        defaultValue={false}
        settingsData={settingsData}
      />
      <ToggleSetting
        disabled
        description={'Enable high-contrast mode'}
        settingsKey={`isHightContrast`}
        defaultValue={false}
        settingsData={settingsData}
      />
      <StringSetting
        description={'Test string'}
        settingsKey={`testString`}
        defaultValue={'Hello World'}
        settingsData={settingsData}
      />
      <ToggleSetting
        description={'Enable right-aligned navigation bar'}
        settingsKey={`isNavigationBarRightAligned`}
        defaultValue={false}
        settingsData={settingsData}
      />
    </SettingsPageTemplate>
  );
}
