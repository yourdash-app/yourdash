/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import { type StorePromotedApplication } from "shared/apps/store/storePromotedApplication";
import csi from "web-client/src/helpers/csi";
import { Card } from "web-client/src/ui/index";
import StoreCategoryComponent from "./component/StoreCategoryComponent";
import StoreApplicationComponent from "./component/StoreApplicationComponent";
import useTranslate from "web-client/src/helpers/i10n";
import STORE_APPLICATION_LOGO from "../icon.avif"
import StoreHeader from "./component/storeHeader/StoreHeader";

const StoreApplication: React.FC = () => {
  const trans = useTranslate( "store" );
  const [ promotedApplications, setPromotedApplications ] = React.useState<StorePromotedApplication[]>( [] );
  const [ categories, setCategories ] = React.useState<string[]>( [] );
  const [ applications, setApplications ] = React.useState<{
    id: string,
    displayName: string,
    icon: string
  }[]>( [] );

  React.useEffect( () => {
    csi.getJson( "/app/store/promoted/applications", data => {
      setPromotedApplications( data );
    } );

    csi.getJson( "/app/store/categories", data => {
      setCategories( data );
    } );

    csi.getJson( "/app/store/applications", data => {
      setApplications( data );
    } );
  }, [] );

  return (
    <main className={"p-4 flex flex-col gap-2"}>
      <StoreHeader />
      <h2 className={"text-3xl font-semibold tracking-wide pt-2 pl-5 animate__animated animate__fadeIn animate__250ms"}>
        {
          trans(
            "ALL_CATEGORIES_SECTION"
          )
        }
      </h2>
      {
        categories.length !== 0 && (
          <section className={"p-4 grid 3xl:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-2 gap-1 animate__animated animate__fadeIn animate__250ms"}>
            {
              categories.map( category => (
                <StoreCategoryComponent
                  id={category}
                  key={category}
                />
              ) )
            }
          </section>
        )
      }
      <h2 className={"text-3xl font-semibold tracking-wide pt-2 pl-5 animate__animated animate__fadeIn animate__500ms"}>
        {
          trans(
            "ALL_APPLICATIONS_SECTION"
          )
        }
      </h2>
      {
        applications.length !== 0 && (
          <section className={"p-4 grid grid-cols-1 gap-2 animate__animated animate__fadeIn animate__500ms md:grid-cols-2 lg:grid-cols-3"}>
            {
              applications.map( application => (
                <StoreApplicationComponent
                  id={application.id}
                  displayName={application.displayName}
                  key={application.id}
                  icon={application.icon}
                />
              ) )
            }
          </section>
        )
      }
    </main>
  );
};

export default StoreApplication;
