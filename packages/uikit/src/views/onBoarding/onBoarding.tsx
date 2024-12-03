import * as React from "react";
import Card from "../../components/card/card.tsx";
import { UKIcon, UKIconType } from "../../components/icon/iconDictionary.ts";
import IconButton from "../../components/iconButton/iconButton.tsx";
import Image from "../../components/image/image.tsx";
import Heading from "../../components/heading/heading.tsx";
import Text from "../../components/text/text.tsx";
import ButtonWithIcon from "../../components/buttonWithIcon/buttonWithIcon.tsx";
import Button from "../../components/button/button.tsx";
import { Outlet } from "react-router";
import styles from "./onBoarding.module.scss";
import Flex from "../../components/flex/flex.tsx";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";

const OnBoarding: React.FC<{
  meta: { id: string };
  pages: {
    headerImage: string;
    header: string;
    body: string;
    actions: {
      label: string;
      icon?: UKIconType;
      onClick: () => void;
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
      <Card
        className={styles.card}
        containerClassName={styles.cardContainer}
      >
        {page.allowGoBack && (
          <IconButton
            className={clippy(styles.goBackButton, "animate__animated animate__fadeInDown")}
            accessibleLabel="Go back to the last page"
            icon={UKIcon.ChevronLeft}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
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
                    key={action.label}
                    className={clippy(styles.action, styles.actionWithIcon, "animate__animated animate__fadeInUp")}
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
                  key={action.icon}
                  className={clippy(styles.action, styles.actionWithoutIcon, "animate__animated animate__fadeInUp")}
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
      </Card>
    </div>
  );
};

export default OnBoarding;
