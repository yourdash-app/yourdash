import React from "react"
import { Card } from "../../../../ui"
import csi from "../../../../helpers/csi"
import Panel from "../../../Panel/Panel"

const SettingsSectionPanelPosition: React.FC = () => {
  return (
    <section className={ "p-4" }>
      <h2
        className={ "text-container-fg font-semibold text-3xl w-min whitespace-nowrap pb-4" }
      >
        Panel position
      </h2>
      <div
        className={ "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-2 min-h-32" }
      >
        <Card
          className={ "flex flex-col transition-[var(--transition)] h-full" }
          onClick={ () => {
            csi.postJson(
              "/app/settings/panel/position",
              { position: 0 },
              () => {
                // @ts-ignore
                Panel.reload()
              }
            )
          } }
        >
          <img
            src={ "/assets/settings/panel_left.svg" }
            alt={ "" }
            className={ "p-4 h-full" }
            draggable={ false }
          />
          <span className={ "text-xl" }>Left</span>
        </Card>
        <Card
          className={ "flex flex-col transition-[var(--transition)] h-full" }
          onClick={ () => {
            csi.postJson(
              "/app/settings/panel/position",
              { position: 1 },
              () => {
                // @ts-ignoret
                Panel.reload()
              }
            )
          } }
        >
          <img
            src={ "/assets/settings/panel_top.svg" }
            alt={ "" }
            className={ "p-4 h-full" }
            draggable={ false }
          />
          <span className={ "text-xl" }>Top</span>
        </Card>
        <Card
          className={ "flex flex-col transition-[var(--transition)] h-full" }
          onClick={ () => {
            csi.postJson(
              "/app/settings/panel/position",
              { position: 2 },
              () => {
                // @ts-ignore
                Panel.reload()
              }
            )
          } }
        >
          <img
            src={ "/assets/settings/panel_right.svg" }
            alt={ "" }
            className={ "p-4 h-full" }
            draggable={ false }
          />
          <span className={ "text-xl" }>Right</span>
        </Card>
        <Card
          className={ "flex flex-col transition-[var(--transition)] h-full" }
          onClick={ () => {
            csi.postJson(
              "/app/settings/panel/position",
              { position: 3 },
              () => {
                // @ts-ignore
                Panel.reload()
              }
            )
          } }
        >
          <img
            src={ "/assets/settings/panel_bottom.svg" }
            alt={ "" }
            className={ "p-4 h-full" }
            draggable={ false }
          />
          <span className={ "text-xl" }>Bottom</span>
        </Card>
      </div>
    </section>
  )
}

export default SettingsSectionPanelPosition
