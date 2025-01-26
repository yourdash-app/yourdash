/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import core from "@yourdash/backend/src/core/core.js";
import { IWidget } from "../shared/types/widget.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class DashWidget<WidgetId extends string, WidgetData extends { [key: string]: any }> {
  widgetType: WidgetId;
  widgetData: WidgetData;
  allowedSize: IWidget<WidgetId, WidgetData>["allowedSize"];

  constructor(widgetType: WidgetId, defaultData: WidgetData) {
    this.widgetType = widgetType;
    this.widgetData = defaultData;
    this.allowedSize = {
      default: { width: 2, height: 1 },
      min: { width: 2, height: 1 },
      max: { width: 2, height: 1 },
    };

    return this;
  }

  setDefaultSize(width: number, height: number) {
    if (this.allowedSize.max.width < width) {
      core.log.warning("app/uk-ewsgit-dash", `${this.widgetType} Default widget width cannot be more than it's max width`);
      return this;
    }

    if (this.allowedSize.max.height < height) {
      core.log.warning("app/uk-ewsgit-dash", `${this.widgetType} Default widget height cannot be more than it's max width`);
      return this;
    }

    if (this.allowedSize.min.width > width) {
      core.log.warning("app/uk-ewsgit-dash", `${this.widgetType} Default widget width cannot be less than it's min width`);
      return this;
    }

    if (this.allowedSize.min.height > height) {
      core.log.warning("app/uk-ewsgit-dash", `${this.widgetType} Default widget height cannot be less than it's min width`);
      return this;
    }

    this.allowedSize.default = { width, height };

    return this;
  }

  setMinSize(width: number, height: number) {
    if (width < 1) {
      core.log.warning("app/uk-ewsgit-dash", `${this.widgetType} Min widget width cannot be less than 1`);
      return this;
    }

    if (height < 1) {
      core.log.warning("app/uk-ewsgit-dash", `${this.widgetType} Min widget height cannot be less than 1`);
      return this;
    }

    if (this.allowedSize.max.width < width) {
      core.log.warning("app/uk-ewsgit-dash", `${this.widgetType} Min widget width cannot be more than it's max width`);
      return this;
    }

    if (this.allowedSize.max.height < height) {
      core.log.warning("app/uk-ewsgit-dash", `${this.widgetType} Min widget height cannot be more than it's max width`);
      return this;
    }

    this.allowedSize.min = { width, height };

    return this;
  }

  setMaxSize(width: number, height: number) {
    if (this.allowedSize.min.width > width) {
      core.log.warning("app/uk-ewsgit-dash", `${this.widgetType} Max widget width cannot be less than it's min width`);
      return this;
    }

    if (this.allowedSize.min.height > height) {
      core.log.warning("app/uk-ewsgit-dash", `${this.widgetType} Max widget height cannot be less than it's min width`);
      return this;
    }

    this.allowedSize.max = { width, height };

    return this;
  }

  serialize(widgetSaveData: {
    size: IWidget<WidgetId, WidgetData>["size"];
    position: IWidget<WidgetId, WidgetData>["position"];
    data: IWidget<WidgetId, WidgetData>["data"];
  }) {
    return {
      widgetType: this.widgetType,
      allowedSize: this.allowedSize,
      size: widgetSaveData.size,
      data: widgetSaveData.data,
      position: widgetSaveData.position,
    } satisfies IWidget<WidgetId, WidgetData>;
  }
}
