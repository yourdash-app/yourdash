import React from "react"
import ToggleSwitch from "ui/elements/toggleSwitch/ToggleSwitch"
import BlankSetting from "./BlankSetting"

export interface IBooleanSetting {
  title: string,
  description: string,
  setValue: (_value: boolean) => void,
  defaultValue: boolean
}

const BooleanSetting: React.FC<IBooleanSetting> = ({
                                                     title, description, setValue, defaultValue
                                                   }) => (
                                                     <BlankSetting title={title} description={description}>
                                                       <ToggleSwitch onValueChange={value => setValue(value)} defaultValue={defaultValue ? "true" : "false"}/>
                                                     </BlankSetting>
)

export default BooleanSetting