export class PushNotification {
  notification: {
    title: string;
    content: string;
    urgency: 1 | 2 | 3;
  } = {
    title: "no title set",
    content: "no content set",
    urgency: 1,
  };

  constructor() {
    return this;
  }

  public setTitle(title: string): this {
    this.notification.title = title;
    return this;
  }

  public setContent(content: string): this {
    this.notification.content = content;
    return this;
  }

  public setUrgency(urgency: 1 | 2 | 3) {
    this.notification.urgency = urgency;
    return this;
  }

  public push() {
    new CustomEvent("DEVDASH_push_notification", {
      detail: {
        title: this.notification.title,
        content: this.notification.content,
        urgency: this.notification.urgency,
      },
    });
  }
}
