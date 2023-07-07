import React from "react";
import {
  useFloating,
  flip,
  offset,
  shift,
  autoUpdate,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions
} from "@floating-ui/react";
import DROPLET_ICON from "../../../../weather/weatherIcons/droplet.svg";
import {Card} from "../../../../../../ui";

export interface IHourlyConditionsHour {
  time: string,
  conditionIcon: string,
  temperature: number,
  feelsLike: number,
  rainChance: number
}

const HourlyConditionsHour: React.FC<IHourlyConditionsHour> = ({
  time,
  conditionIcon,
  temperature,
  feelsLike,
  rainChance
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const {
    refs,
    floatingStyles,
    context
  } = useFloating({
    open: showTooltip,
    onOpenChange: setShowTooltip,
    middleware: [
      flip(),
      // eslint-disable-next-line no-magic-numbers
      offset(8),
      shift()
    ],
    placement: "top",
    whileElementsMounted: autoUpdate
  });

  const {
    getReferenceProps,
    getFloatingProps
  } = useInteractions([
    useHover(context, {move: false}),
    useFocus(context),
    useDismiss(context),
    useRole(context, {role: "tooltip"})
  ]);

  return (
    <>
      {
        showTooltip && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <Card>
              <span>{`${ temperature }°C`}</span>
              <div className={"flex items-center justify-center"}>
                <img className={"h-full"} src={DROPLET_ICON} alt={""}/>
                <span>{`Rain chance: ${ rainChance }%`}</span>
              </div>
              <span>{`${ feelsLike }°C`}</span>
            </Card>
          </div>
        )
      }
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={"p-2 h-max mt-auto mb-auto flex flex-col items-center justify-center border-r-[1px] border-r-container-border last-of-type:border-r-0"}
      >
        <span>{time}</span>
        <img alt={""} className={"aspect-square h-16"} src={conditionIcon}/>
        <span>{`${ temperature }°C`}</span>
        <div className={"flex items-center justify-center"}>
          <img className={"h-full"} src={DROPLET_ICON} alt={""}/>
          <span>{`${ rainChance }%`}</span>
        </div>
        <span>{`${ feelsLike }°C`}</span>
      </div>
    </>
  );
};

export default HourlyConditionsHour;
