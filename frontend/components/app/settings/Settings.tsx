import localforage from "localforage";
import React, { useState, useEffect } from "react";
import ToggleSwitch from "../../global/ToggleSwitch";

export function ToggleSetting(props: {
  description: string;
  settingsKey: string;
  settingsData: any;
  defaultValue: boolean;
  disabled?: boolean;
}) {
  return (
    <div className={`flex w-full h-12 items-center mt-1 mb-1 justify-center`}>
      <p
        className={`mr-4 ${
          props?.disabled ? "text-text-secondary" : "text-text-primary"
        } text-xl p-2.5 bg-content-normal rounded-xl`}>
        {props.description}
      </p>
      <ToggleSwitch
        disabled={props?.disabled}
        initialValue={
          props.settingsData[props.settingsKey]
            ? props.settingsData[props.settingsKey]
            : props.defaultValue
        }
        onChange={newValue => {
          localforage.getItem("settings").then((data: any) => {
            data[props.settingsKey] = newValue;
            localforage.setItem("settings", data);
          });
        }}
      />
    </div>
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
    <div className={`flex w-full h-12 items-center mt-1 mb-1 justify-center`}>
      <p
        className={`mr-4 ${
          props?.disabled ? "text-text-secondary" : "text-text-primary"
        } text-xl p-2.5 bg-content-normal rounded-xl`}>
        {props.description}
      </p>
      <input
        className={`w-1/4 pl-2 pr-2 p-1 rounded-lg`}
        type="text"
        disabled={props?.disabled}
        defaultValue={
          props.settingsData[props.settingsKey]
            ? props.settingsData[props.settingsKey]
            : props.defaultValue
        }
        onChange={e => {
          localforage.getItem("settings").then((data: any) => {
            data[props.settingsKey] = e.target.value;
            localforage.setItem("settings", data);
          });
        }}
      />
    </div>
  );
}
