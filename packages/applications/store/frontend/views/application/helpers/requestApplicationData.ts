/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import type { IYourDashStoreApplication } from "shared/apps/store/storeApplication";
import csi from "web-client/src/helpers/csi";

export function requestApplication( applicationId: string, setAppData: ( data: IYourDashStoreApplication ) => void, setIsLoading: ( data: boolean ) => void, navigate: ( data: string ) => void ) {
  csi.getJson( `/app/store/application/${ applicationId }`, data => {
    setAppData( data );
    setIsLoading( false );
  }, () => {
    navigate( "/app/a/store" );
  } );
}
