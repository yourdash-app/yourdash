/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import csi from "web-client/src/helpers/csi";
import { type IStoreCategory } from "shared/apps/store/storeCategory";
import Heading from "web-client/src/ui/components/heading/Heading";
import { Spinner } from "web-client/src/ui/index";
import StoreApplication from "../../component/storeApplication/StoreApplication";
import StoreHeader from "../../component/storeHeader/StoreHeader";
import styles from "./CategoryView.module.scss"

const CategoryView: React.FC = () => {
  const navigate = useNavigate();
  const { id: categoryId } = useParams();
  const [ categoryData, setCategoryData ] = useState<IStoreCategory>();
  const [ isLoading, setIsLoading ] = useState<boolean>( true );

  useEffect( () => {
    csi.getJson(
      `/app/store/category/${ categoryId }`,
      data => {
        setCategoryData( data );
        setIsLoading( false );
      },
      () => {
        navigate( "/app/a/store" );
      }
    );
  }, [ categoryId, navigate ] );

  if ( !categoryId ) {
    navigate( "/app/a/store" );
    return null;
  }

  return (
    <div className={styles.main}>
      <StoreHeader
        showBackButton={2}
      />
      {
        isLoading
          ? (
            <div className={"w-full h-full flex items-center justify-center"}>
              <Spinner/>
            </div>
          )
          : ( <>
            <Heading level={1} className={"p-6"}>{`${ categoryData?.displayName }`}</Heading>
            <div className={"w-full max-h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate__animated animate__fadeIn animate__250ms"}>
              {
                categoryData && categoryData.applications.map( application => (
                  <StoreApplication
                    key={application.name}
                    displayName={application.displayName}
                    id={application.name}
                    icon={application.icon}
                  />
                ) )
              }
            </div>
          </>
          )
      }
    </div>
  );
};

export default CategoryView;
