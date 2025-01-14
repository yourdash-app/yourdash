/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import useResource from "@yourdash/csi/useResource";
import tun from "@yourdash/tunnel/src/index.js";
import UKCard from "@yourdash/uikit/src/components/card/UKCard.js";
import UKFlex from "@yourdash/uikit/src/components/flex/UKFlex.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKCarousel from "@yourdash/uikit/src/views/carousel/UKCarousel.js";
import React, { useState } from "react";
import styles from "./dashApplication.module.scss";
import { z } from "zod";

const DashApplication: React.FC = () => {
  const [currentWidgetPage, setCurrentWidgetPage] = useState<number>(0);
  const dashboard = useResource(
    () =>
      tun.get(
        `/app/uk-ewsgit-dash/dashboard`,
        "json",
        z.object({
          header: z.object({
            welcomeMessage: z.string(),
            size: z.union([z.literal("small"), z.literal("medium"), z.literal("large")]),
            style: z.union([z.literal("floating"), z.literal("docked")]),
            background: z.object({
              blur: z.number(),
              opacity: z.number(),
            }),
          }),
          background: z.union([
            z.object({
              type: z.literal("image"),
              path: z.string(),
            }),
            z.object({
              type: z.literal("color"),
              value: z.string(),
            }),
            z.object({
              type: z.literal("linearGradient"),
              value: z.string(),
            }),
            z.object({
              type: z.literal("radialGradient"),
              value: z.string(),
            }),
          ]),
          content: z.object({
            background: z.object({
              blur: z.number(),
              opacity: z.number(),
            }),
            pages: z
              .object({
                id: z.string(),
                data: z.any(),
                dimensions: z.object({
                  width: z.number(),
                  height: z.number(),
                }),
                position: z.object({
                  x: z.number(),
                  y: z.number(),
                }),
              })
              .array(),
          }),
          user: z.object({
            username: z.string(),
            forename: z.string(),
            surname: z.string(),
          }),
        }),
      ),
    [currentWidgetPage],
  )?.data;
  const [isWidgetEditMode, setIsWidgetEditMode] = useState(false);

  if (!dashboard) return <>LOADING...</>;

  return (
    <div
      className={styles.page}
      style={
        dashboard.background.type === "color"
          ? { backgroundColor: dashboard.background.value }
          : dashboard.background.type === "linearGradient"
            ? { backgroundImage: `linear-gradient(${dashboard.background.value})` }
            : { backgroundImage: `url(${tun.baseUrl + "/app/uk-ewsgit-dash/backgroundImage"})` }
      }
    >
      <UKFlex
        className={styles.header}
        direction={"column"}
        centerHorizontally
        centerVertically
        style={{
          opacity: `${dashboard.header.background.opacity}`,
          backdropFilter: `blur(${4 * dashboard.header.background.blur}rem)`,
        }}
      >
        <UKHeading
          level={1}
          text={dashboard.header.welcomeMessage.replace(`%username%`, `${dashboard.user.forename} ${dashboard.user.surname}`)}
        />
      </UKFlex>
      <UKFlex
        direction={"row"}
        className={styles.widgetsCarouselContainer}
      >
        <UKCarousel
          items={[
            {
              element: (
                <UKFlex direction={"column"}>
                  <UKFlex direction={"row"}>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                  </UKFlex>
                  <UKFlex direction={"row"}>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                  </UKFlex>
                </UKFlex>
              ),
              id: "page1",
            },
            {
              element: (
                <UKFlex direction={"column"}>
                  <UKFlex direction={"row"}>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                  </UKFlex>
                  <UKFlex direction={"row"}>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                    <UKCard>Item</UKCard>
                  </UKFlex>
                </UKFlex>
              ),
              id: "page2",
            },
          ]}
        />
      </UKFlex>

      {/* /!* <UKFlex */}
      {/*   className={clippy(styles.header, tallHeader && styles.tallHeader, isWidgetEditMode && styles.headerEditMode)} */}
      {/*   direction={"row"} */}
      {/* > */}
      {/*   <UKHeading */}
      {/*     text={`Hiya, ${coreCSI.userDB.get<{ first: string; last: string }>("user:name")?.first}`} */}
      {/*     level={1} */}
      {/*   /> */}
      {/*   {isWidgetEditMode && ( */}
      {/*     <> */}
      {/*       <UKFlex */}
      {/*         direction="row" */}
      {/*         className={styles.headerActions} */}
      {/*       > */}
      {/*         {tallHeader ? ( */}
      {/*           <UKButtonWithIcon */}
      {/*             text="Use small header" */}
      {/*             icon={UKIcons.SidebarCollapse} */}
      {/*             onClick={() => { */}
      {/*               setTallHeader(false); */}
      {/*             }} */}
      {/*           /> */}
      {/*         ) : ( */}
      {/*           <UKButtonWithIcon */}
      {/*             text="Use tall header" */}
      {/*             icon={UKIcons.SidebarExpand} */}
      {/*             onClick={() => { */}
      {/*               setTallHeader(true); */}
      {/*             }} */}
      {/*           /> */}
      {/*         )} */}
      {/*       </UKFlex> */}
      {/*     </> */}
      {/*   )} */}
      {/* </UKFlex> */}
      {/* {isWidgetEditMode ? ( */}
      {/*   <EditWidgets /> */}
      {/* ) : ( */}
      {/*   <div className={styles.widgetGrid}> */}
      {/*     {widgetPage.widgets.map((widget) => { */}
      {/*       const Widget = loadable(() => import(`./widgets/${widget.widgetType}/widget.tsx`)); */}
      {/*       return ( */}
      {/*         <div */}
      {/*           key={widget.widgetType + JSON.stringify(widget.position)} */}
      {/*@ts-ignore*/}
      {/*           style={{ "--position-x": widget.position.x, "--position-y": widget.position.y }} */}
      {/*           className={styles.widgetGridWidget} */}
      {/*         > */}
      {/*           <Widget data={widget.data} /> */}
      {/*         </div> */}
      {/*       ); */}
      {/*     })} */}
      {/*   </div> */}
      {/* )} */}
      {/* <UKFlex */}
      {/*   className={styles.footer} */}
      {/*   direction={"row"} */}
      {/* > */}
      {/*   <div> */}
      {/*     {Array(pageCount).map((_, index) => { */}
      {/*       return ( */}
      {/*         <div */}
      {/*           key={index} */}
      {/*           className={currentWidgetPage === index ? styles.active : undefined} */}
      {/*           onClick={() => setCurrentWidgetPage(index)} */}
      {/*         > */}
      {/*           {index + 1} */}
      {/*         </div> */}
      {/*       ); */}
      {/*     })} */}
      {/*   </div> */}
      {/*   <div className={styles.actions}> */}
      {/*     {isWidgetEditMode ? ( */}
      {/*       <> */}
      {/*         <UKButtonWithIcon */}
      {/*           text={"Confirm edits"} */}
      {/*           icon={UKIcons.Check} */}
      {/*           onClick={() => { */}
      {/*             setIsWidgetEditMode(false); */}
      {/*           }} */}
      {/*         /> */}
      {/*       </> */}
      {/*     ) : ( */}
      {/*       <> */}
      {/*         <UKButtonWithIcon */}
      {/*           text={"Edit"} */}
      {/*           icon={UKIcons.Pencil} */}
      {/*           onClick={() => { */}
      {/*             setIsWidgetEditMode(true); */}
      {/*           }} */}
      {/*         /> */}
      {/*       </> */}
      {/*     )} */}
      {/*   </div> */}
      {/* </UKFlex> *!/ */}
    </div>
  );
};
export default DashApplication;
