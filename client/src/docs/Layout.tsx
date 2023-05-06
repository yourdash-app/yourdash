import React from "react"
import { SideBar } from "../ui"

const DocsLayout: React.FC = () => (
  <SideBar
    title={ "Docs" }
    items={ [
      {
        icon: "info-16",
        label: "test",
        onClick() {
          return 0
        }
      }
    ] }
  />
)

export default DocsLayout
