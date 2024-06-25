export default interface EndpointResponseCoreLoginNotice {
  // the raw text of the notice message.
  message?: string;
  // the author of the notice's username.
  author?: string;
  // Unix epoch timestamp of the notice.
  timestamp?: number;
  // should the notice be displayed, this should return true unless no notice should be displayed.
  display: boolean;
}
