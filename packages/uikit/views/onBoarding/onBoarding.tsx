import * as React from "react";
import { UKIcon } from "../../components/icon/iconDictionary";
import IconButton from "../../components/iconButton/iconButton";
import Image from "../../components/image/image";
import Heading from "../../components/heading/heading";
import Text from "../../components/text/text";
import ButtonWithIcon from "../../components/buttonWithIcon/buttonWithIcon";
import Button from "../../components/button/button";
import { Outlet } from "react-router";
import styles from "./onBoarding.module.scss";
import Flex from "../../components/flex/flex";
import clippy from "@yourdash/shared/web/helpers/clippy";

const OnBoarding: React.FC<{
  meta: { id: string };
  pages: {
    headerImage: string;
    header: string;
    body: string;
    actions: { label: string; icon?: UKIcon; onClick: () => void; changeTo?: "next" | "previous" | "remain" | "completed" }[];
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
      {page.allowGoBack && (
        <IconButton
          className={styles.goBackButton}
          accessibleLabel="Go back to the last page"
          icon={UKIcon.ChevronLeft}
          onClick={() => [setCurrentPage(currentPage - 1)]}
        />
      )}
      <Image
        className={styles.headerImage}
        src={page.headerImage}
        accessibleLabel=""
      />
      <Heading
        className={styles.header}
        text={page.header}
      />
      <Text
        className={styles.body}
        text={page.body}
      />
      <Flex
        className={styles.actions}
        direction="row"
      >
        {page.actions.map((action) => {
          if (action.icon) {
            return (
              <>
                <ButtonWithIcon
                  className={clippy(styles.action, styles.actionWithIcon)}
                  text={action.label}
                  icon={action.icon}
                  onClick={() => {
                    action.onClick();
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
              <Button
                className={clippy(styles.action, styles.actionWithoutIcon)}
                text={action.label}
                onClick={() => {
                  action.onClick();

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
      </Flex>
    </div>
  );
};

export default OnBoarding;
