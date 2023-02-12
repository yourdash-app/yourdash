import Chiplet from "ui";
import styles from "./File.module.scss"
import React from "react";
import { useRouter } from "next/router";

export interface IFile {
  name: string,
  path: string,
  type: "file" | "folder",
}

const File: React.FC<IFile> = ({
                                 name, path, type
                               }) => {
  const router = useRouter()

  return (
    <Chiplet.Card
      onClick={
      () => {
          if (type !== "folder") return

          router.push(`/app/files/p${path}`)
        }
      }
      className={ styles.component }
    >
      <Chiplet.Icon color={ "var(--card-fg)" } name={ type === "file" ? "file-16" : "file-directory-16" }/>
      <span>{name}</span>
      <span>{type}</span>
      <Chiplet.DropdownContainer items={ [
          {
            name: "Delete",
            onClick: () => {
              console.log(`Implement Me!!!`)
            }
          }
        ] }
      >
        <Chiplet.IconButton
          onClick={ () => {
                console.log(`Implement Me!!!`)
              } }
          icon="three-bars-16"
        />
      </Chiplet.DropdownContainer>
    </Chiplet.Card>
  )
};

export default File;
