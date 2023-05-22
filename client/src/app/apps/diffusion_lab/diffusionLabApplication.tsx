import React, { useState } from "react"
import { Icon, MajorButton, Button, DropdownButton, TextBox } from "../../../ui"

const DiffusionLabApplication: React.FC = () => {
  const [progress, setProgress] = useState<number>( 0 )
  const [model, setModel] = useState<string>( "" )
  return (
    <main>
      <header className={ "w-full p-3 flex items-center justify-between sticky top-0 bg-container-bg text-container-fg" }>
        <section className={ "flex items-center justify-center h-full gap-2" }>
          <DropdownButton items={ [
            {
              name: "Anything v5",
              onClick() {
                setModel( "Anything v5" )
              }
            }
          ] }
          >
            Select a diffusion model
          </DropdownButton>
        </section>
        <section className={ "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" }>
          <div className={ "flex items-center justify-center h-full gap-1.5" }>
            <Icon className={ "h-9 aspect-square" } useDefaultColor name={ "yourdash-logo" }/>
            <h2 className={ "text-3xl font-semibold tracking-wide" }>
              YourDash Diffusion Lab
            </h2>
          </div>
        </section>
        <section className={ "flex items-center justify-center h-full gap-2" }>
          {
            progress === 0
              ? (
                <MajorButton
                  onClick={ () => {
                    setProgress( 1 )
                  } }
                >
                  Diffuse
                </MajorButton>
              )
              : (
                <Button
                  onClick={ () => {
                    setProgress( 0 )
                  } }
                >
                  Stop Diffusion
                </Button>
              )
          }
        </section>
      </header>
      <main className={ "p-3 flex gap-3" }>
        <section className={ "flex flex-col flex-grow" }>
          <span>Prompt</span>
          <TextBox/>
          <span>Negative prompt</span>
          <TextBox/>
        </section>
      </main>
    </main>
  )
}

export default DiffusionLabApplication
