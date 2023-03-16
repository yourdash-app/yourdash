import React from "react";
import BlankSetting from "../BlankSetting/BlankSetting";
import Chiplet from "~/chipletui";

export interface IBooleanSetting {
    title: string;
    description: string;
    setValue: (_value: boolean) => void;
    defaultValue: boolean;
}

const BooleanSetting: React.FC<IBooleanSetting> = ({ title, description, setValue, defaultValue }) => {
    return (
        <BlankSetting title={title} description={description}>
            <Chiplet.ToggleSwitch
                onValueChange={(value: boolean) => {
                    return setValue(value);
                }}
                defaultValue={defaultValue ? "true" : "false"}
            />
        </BlankSetting>
    );
};

export default BooleanSetting;
