/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Heading from "@yourdash/chiplet/components/heading/Heading";
import Spinner from "@yourdash/chiplet/components/spinner/Spinner";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import coreCSI from "@yourdash/csi/coreCSI";
import { type IStoreCategory } from "@yourdash/shared/apps/store/storeCategory";
import StoreApplication from "../../component/storeApplication/StoreApplication";
import StoreHeader from "../../component/storeHeader/StoreHeader";
import styles from "./CategoryView.module.scss";

const CategoryView: React.FC = () => {
  const navigate = useNavigate();
  const { id: categoryId } = useParams();
  const [categoryData, setCategoryData] = useState<IStoreCategory>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    coreCSI.syncGetJson(
      `/app/store/category/${categoryId}`,
      (data) => {
        setCategoryData(data);
        setIsLoading(false);
      },
      () => {
        navigate("/app/a/uk-ewsgit-store");
      },
    );
  }, [categoryId, navigate]);

  if (!categoryId) {
    navigate("/app/a/uk-ewsgit-store");
    return null;
  }

  return (
    <div className={styles.main}>
      <StoreHeader showBackButton={2} />
      {isLoading ? (
        <div className={"w-full h-full flex items-center justify-center"}>
          <Spinner />
        </div>
      ) : (
        <>
          <Heading
            level={1}
            className={"p-6"}
          >{`${categoryData?.displayName}`}</Heading>
          <div
            className={
              "w-full max-h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate__animated animate__fadeIn animate__250ms"
            }
          >
            {categoryData &&
              categoryData.applications.map((application) => (
                <StoreApplication
                  key={application.name}
                  displayName={application.displayName}
                  id={application.name}
                  icon={application.icon}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryView;
