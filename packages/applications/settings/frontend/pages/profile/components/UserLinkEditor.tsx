/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { IconButton, Row, TextInput, YourDashIcon } from "web-client/src/ui/index";

const UserLinkEditor: React.FC<{
  link: { url: string, label: string },
  links: { url: string, label: string }[],
  setLinks: ( links: { url: string, label: string }[] ) => void
}> = ( { link, links, setLinks } ) => {
  return <Row className={ "child:flex-grow" } key={link.url + link.label}>
    <TextInput
      onChange={ ( value, e ) => {
        link.label = value
        setLinks( links );
      } }
      defaultValue={ link.label }
      label={ "Label" }
    />
    <TextInput
      onChange={ ( value, e ) => {
        link.url = value
        setLinks( links );
      } }
      defaultValue={ link.url }
      label={ "Url" }
    />
    <IconButton
      className={"aspect-square"}
      icon={YourDashIcon.Dash}
      onClick={ () => {
        setLinks( links?.filter( ( l ) => l !== link ) );
      } }
    />
  </Row>
}

export default UserLinkEditor
