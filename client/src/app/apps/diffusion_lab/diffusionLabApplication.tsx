import React, { useState, useEffect } from "react"
import { Icon, MajorButton, Button, DropdownButton, TextBox, Card, ResizeContainer } from "../../../ui"
import csi from "helpers/csi"
import { IDiffusionLabImageGenerationData } from "../../../../../shared/apps/diffusion_lab/image/generationData"
import YourDashLogo from "../../../../public/assets/productLogos/yourdash.svg"

const DiffusionLabApplication: React.FC = () => {
  const [progress, setProgress] = useState<number>( 0 )
  const [models, setModels] = useState<string[]>( [] )
  const [generationData, setGenerationData] = useState<IDiffusionLabImageGenerationData>( {
    extensions: [],
    dimensions: {
      width: 256,
      height: 256
    },
    model: "",
    prompt: {
      positive: "",
      negative: ""
    },
    seed: -1,
    steps: 20,
    clientId: 0,
    batch: {
      size: 1,
      quantity: 1
    }
  } )
  const [generationResult, setGenerationResult] = useState<string[][]>( [] )

  useEffect( () => {
    csi.getJson( "/app/diffusion_lab/models", ( data: { models: string[] } ) => {
      setGenerationData( { ...generationData, model: data.models[0] } )
      setModels( data.models )
    } )
  }, [] )

  return (
    <main>
      <header className={ "w-full p-3 flex items-center justify-between sticky top-0 bg-container-bg text-container-fg" }>
        <section className={ "flex items-center justify-center h-full gap-2" }>
          <DropdownButton items={
            models.map( model => {
              return {
                name: model.slice( 0, 1 ).toUpperCase() + model.slice( 1 ),
                onClick: () => {
                  setGenerationData( { ...generationData, model } )
                }
              }
            } )
          }
          >
            Select a diffusion model
          </DropdownButton>
          <DropdownButton items={
            models.map( model => {
              return {
                name: model.slice( 0, 1 ).toUpperCase() + model.slice( 1 ),
                onClick: () => {
                  setGenerationData( { ...generationData, model } )
                }
              }
            } )
          }
          >
            Select a VAE
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
      <ResizeContainer className={ "p-3 flex gap-3" } direction={ "column" }>
        <section className={ "flex flex-col flex-grow" }>
          <Card>
            <span>Prompt</span>
            <TextBox onChange={ e => {
              setGenerationData( { ...generationData, prompt: { ...generationData.prompt, positive: e.target.value } } )
            } }
            />
            <span>Negative prompt</span>
            <TextBox onChange={ e => {
              setGenerationData( { ...generationData, prompt: { ...generationData.prompt, negative: e.target.value } } )
            } }
            />
          </Card>
        </section>
        <section>
          <div className={ "flex flex-col" }>
            <div
              style={ {
                aspectRatio: `${generationData.dimensions.width} / ${generationData.dimensions.height}`
              } }
              className={ "flex flex-col flex-wrap p-4 items-center justify-center" }
            >
              {
                generationResult.map( batch => {
                  return batch.map( image => {
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    return <img key={ image } src={ image || YourDashLogo } alt="generated ai-image" className={ "w-full h-full" }/>
                  } )
                } )
              }
            </div>
          </div>
        </section>
      </ResizeContainer>
    </main>
  )
}

export default DiffusionLabApplication
