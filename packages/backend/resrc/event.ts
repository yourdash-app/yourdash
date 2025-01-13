/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import instance, { Instance } from "./main.js";

class EventHook {
  eventId: string;
  callback: (data: any) => void;

  constructor(eventId: string) {
    this.eventId = eventId;
    this.callback = () => {
      instance.log.warning(
        "event_hook",
        `An EventHook was created and the event was triggered, but the hook had no callback, event: ${eventId}`,
      );
    };
    instance.events.__internal_events[this.eventId].hooks.push(this);
    return this;
  }

  on(callback: (data: any) => void) {
    this.callback = callback;

    return this;
  }

  __internal_triggerHook(data: any) {
    this.callback(data);

    return this;
  }
}

class Events {
  instance: Instance;
  __internal_events: { [eventId: string]: { hooks: EventHook[] } };

  constructor(instance: Instance) {
    this.instance = instance;
    this.__internal_events = {};

    return this;
  }

  createEvent(eventId: string) {
    this.__internal_events[eventId] = { hooks: [] };

    return {
      trigger: (data: any) => {
        this.triggerEvent(eventId, data);
      },
    };
  }

  triggerEvent(eventId: string, data: any) {
    this.__internal_events[eventId].hooks.forEach((h) => {
      h.__internal_triggerHook(data);
    });

    return this;
  }

  on(eventId: string, callback: (data: any) => void) {
    const eventHook = new EventHook(eventId);
    eventHook.on(callback);
    this.__internal_events[eventId].hooks.push(eventHook);

    return this;
  }
}

export default Events;

/*
 *
 * YourDash Event System
 *
 * An Event is created with instance.events.createEvent(eventId: string)
 * An Event can be triggered with instance.events.trigger(eventId: string, data: any) or .trigger(data: any) on createEvent
 * An Event stores an array of all YourDashEventHooks
 * A YourDashEventHook is created with new YourDashEventHook(eventId: string)
 * When an event is triggered, the eventHook's .on(cb: (data: any) => {}) will be triggered
 *
 *
 * */
