import * as React from "react";
import UKCard from "../../components/card/UKCard.tsx";
import { UKIcons, UKIconType } from "../../core/iconDictionary.ts";
import UKIconButton from "../../components/iconButton/UKIconButton.tsx";
import UKImage from "../../components/image/UKImage.tsx";
import UKHeading from "../../components/heading/UKHeading.tsx";
import UKText from "../../components/text/UKText.tsx";
import UKButtonWithIcon from "../../components/buttonWithIcon/UKButtonWithIcon.tsx";
import UKButton from "../../components/button/UKButton.tsx";
import { Outlet } from "react-router";
import styles from "./onBoarding.module.scss";
import UKFlex from "../../components/flex/UKFlex.tsx";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import UKSeparator from "../../components/separator/UKSeparator.tsx";

const UKOnBoarding: React.FC<{
  meta: { id: string };
  pages: {
    headerImage: string;
    header: string;
    body: string;
    actions: {
      label: string;
      icon?: UKIconType;
      onClick?: () => void;
      changeTo?: "next" | "previous" | "remain" | "completed";
    }[];
    allowGoBack?: boolean;
  }[];
}> = ({ pages, meta }) => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const page = pages[currentPage];

  if (localStorage.getItem(`yourdash-application-visited-${meta.id}`) || currentPage > pages.length - 1) {
    localStorage.setItem(`yourdash-application-visited-${meta.id}`, "true");

    return <Outlet />;
  }

  return (
    <div className={styles.page}>
      <UKCard
        className={styles.card}
        containerClassName={styles.cardContainer}
      >
        {page.allowGoBack && (
          <UKIconButton
            key={"GoBackButton"}
            className={clippy(styles.goBackButton, "animate__animated animate__fadeInDown")}
            accessibleLabel="Go back to the last page"
            icon={UKIcons.ChevronLeft}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          />
        )}
        <UKImage
          className={styles.headerImage}
          src={page.headerImage}
          accessibleLabel=""
        />
        <UKHeading
          className={styles.header}
          text={page.header}
        />
        <UKSeparator direction={"column"} />
        <UKText
          className={styles.body}
          text={page.body}
        />
        <UKFlex
          className={styles.actions}
          direction="row"
        >
          {page.actions.map((action) => {
            if (action.icon) {
              return (
                <>
                  <UKButtonWithIcon
                    key={action.label}
                    className={clippy(styles.action, styles.actionWithIcon, "animate__animated animate__fadeInUp")}
                    text={action.label}
                    icon={action.icon}
                    onClick={() => {
                      action.onClick?.();
                      if (action.changeTo) {
                        switch (action.changeTo) {
                          case "next":
                            setCurrentPage(currentPage + 1);
                            break;
                          case "previous":
                            if (currentPage > 0) setCurrentPage(currentPage - 1);
                            break;
                          case "remain":
                            break;
                          case "completed":
                            setCurrentPage(pages.length + 1);
                            break;
                          default:
                            break;
                        }
                      }
                    }}
                  />
                </>
              );
            }

            return (
              <>
                <UKButton
                  key={action.label}
                  className={clippy(styles.action, styles.actionWithoutIcon, "animate__animated animate__fadeInUp")}
                  text={action.label}
                  onClick={() => {
                    action.onClick?.();

                    if (action.changeTo) {
                      switch (action.changeTo) {
                        case "next":
                          setCurrentPage(currentPage + 1);
                          break;
                        case "previous":
                          if (currentPage > 0) setCurrentPage(currentPage - 1);
                          break;
                        case "remain":
                          break;
                        case "completed":
                          setCurrentPage(pages.length + 1);
                          break;
                        default:
                          break;
                      }
                    }
                  }}
                />
              </>
            );
          })}
        </UKFlex>
      </UKCard>
    </div>
  );
};

export default UKOnBoarding;
