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
import React, { useState, useEffect } from 'react';
import ToggleSwitch from '../../global/ToggleSwitch';

export function ToggleSetting(props: {
  description: string;
  settingsKey: string;
  settingsData: any;
  defaultValue: boolean;
  disabled?: boolean;
}) {
  return (
    <>
      <p
        className={`m-0 flex items-center justify-center ${
          props?.disabled
            ? 'text-text-secondary line-through'
            : 'text-text-primary'
        } text-xl p-1 bg-content-normal rounded-xl`}
      >
        {props.description}
      </p>
      <div className={'md:pl-2'}>
        <ToggleSwitch
          disabled={props?.disabled}
          initialValue={
            props.settingsData[props.settingsKey]
              ? props.settingsData[props.settingsKey]
              : props.defaultValue
          }
          onChange={(newValue) => {
            props.settingsData[props.settingsKey] = newValue;
            localforage.setItem('settings', props.settingsData);
          }}
        />
      </div>
    </>
  );
}

export function StringSetting(props: {
  description: string;
  settingsKey: string;
  settingsData: any;
  defaultValue: string;
  disabled?: boolean;
}) {
  return (
    <>
      <p
        className={`m-0 flex items-center justify-center ${
          props?.disabled
            ? 'text-text-secondary line-through'
            : 'text-text-primary'
        } text-xl p-1 bg-content-normal rounded-xl`}
      >
        {props.description}
      </p>
      <div className={'md:pl-2 w-full'}>
        <input
          className={`pl-2 pr-2 p-1 rounded-xl h-full w-full`}
          type='text'
          disabled={props?.disabled}
          defaultValue={
            props.settingsData[props.settingsKey]
              ? props.settingsData[props.settingsKey]
              : props.defaultValue
          }
          onChange={(e) => {
            props.settingsData[props.settingsKey] = e.target.value;
            localforage.setItem('settings', props.settingsData);
          }}
        />
      </div>
    </>
  );
}
