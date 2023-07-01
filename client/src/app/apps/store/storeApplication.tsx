import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {type StorePromotedApplication} from "../../../../../shared/apps/store/storePromotedApplication";
import csi from "../../../helpers/csi";
import {Carousel, MajorButton} from "../../../ui";
import StoreCategoryComponent from "./component/StoreCategoryComponent";
import StoreApplicationComponent from "./component/StoreApplicationComponent";
import useTranslate from "../../../helpers/l10n";

const StoreApplication: React.FC = () => {
  const navigate = useNavigate();
  const trans = useTranslate("store");
  const [promotedApplications, setPromotedApplications] = useState<StorePromotedApplication[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [applications, setApplications] = useState<{
    id: string,
    displayName: string,
    icon: string
  }[]>([]);

  useEffect(() => {
    csi.getJson("/app/store/promoted/applications", data => {
      setPromotedApplications(data);
    });

    csi.getJson("/app/store/categories", data => {
      setCategories(data);
    });

    csi.getJson("/app/store/applications", data => {
      setApplications(data);
    });
  }, []);

  return (
    <main>
      <header
        className={"w-full flex flex-col items-center justify-center pt-2 pb-4 bg-container-bg bg-opacity-40 backdrop-blur-lg animate__animated animate__fadeIn"}
      >
        <h2 className={"text-3xl font-semibold tracking-wide pt-1 pb-3"}>{"YourDash Store"}</h2>
        <Carousel containerClassName={"max-w-4xl w-full"}>
          {
            promotedApplications.map(item => (
              <div key={item.name} className={"w-full h-full"}>
                <div
                  style={{
                    backgroundImage: `url(${ item.backgroundImage })`
                  }}
                  className={"w-[calc(100%-7rem)] h-full relative ml-auto mr-auto overflow-hidden rounded-2xl bg-center bg-cover flex items-center justify-end"}
                >
                  <div
                    className={"w-full pt-3 pb-3 pl-12 pr-12 flex items-center bg-container-bg bg-opacity-75 backdrop-blur-md mt-auto"}
                  >
                    <img className={"h-12 aspect-square"} src={item.icon} alt=""/>
                    <span className={"mr-auto pl-2 text-lg"}>
                      {item.displayName}
                    </span>
                    <MajorButton
                      disabled={item.installed}
                      className={"h-max"}
                    >
                      {
                        item.installed
                          ? "Installed"
                          : "Install"
                      }
                    </MajorButton>
                  </div>
                </div>
              </div>
            ))
          }
        </Carousel>
      </header>
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
              categories.map(category => (
                <StoreCategoryComponent
                  id={category}
                  key={category}
                />
              ))
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
          <section className={"p-4 grid grid-cols-3 gap-2 animate__animated animate__fadeIn animate__250ms"}>
            {
              applications.map(application => (
                <StoreApplicationComponent
                  id={application.id}
                  displayName={application.displayName}
                  key={application.id}
                  icon={application.icon}
                />
              ))
            }
          </section>
        )
      }
    </main>
  );
};

export default StoreApplication;
