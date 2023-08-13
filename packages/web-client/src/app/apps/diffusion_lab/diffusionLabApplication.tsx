/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { useState, useEffect } from "react";
import { Icon, MajorButton, Button, DropdownButton, TextBox, Card, ResizeContainer } from "../../../ui";
import csi from "helpers/csi";
import { IDiffusionLabImageGenerationData } from "../../../../../shared/apps/diffusion_lab/image/generationData";
import YourDashLogo from "../../../../public/assets/productLogos/yourdash.svg";
import { YourDashIcon } from "../../../ui/components/icon/iconDictionary";
import useTranslate from "../../../helpers/l10n";

const DiffusionLabApplication: React.FC = () => {
  const trans = useTranslate( "diffusion_lab" );
  const [progress, setProgress] = useState<number>( 1 );
  const [models, setModels] = useState<string[]>( [] );
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
  } );
  const [generationResult, setGenerationResult] = useState<string[][]>( [] );
  
  useEffect( () => {
    csi.getJson( "/app/diffusion_lab/models", ( data: { models: string[] } ) => {
      setGenerationData( { ...generationData, model: data.models[0] } );
      setModels( data.models );
    } );
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );
  
  return (
    <main>
      <header className={"w-full p-3 flex items-center justify-between sticky top-0 bg-container-bg text-container-fg"}>
        <section className={"flex items-center justify-center h-full gap-2"}>
          <DropdownButton items={
            models.map( model => {
              return {
                name: model.slice( 0, 1 ).toUpperCase() + model.slice( 1 ),
                onClick: () => {
                  setGenerationData( { ...generationData, model } );
                }
              };
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
                  setGenerationData( { ...generationData, model } );
                }
              };
            } )
          }
          >
            Select a VAE
          </DropdownButton>
        </section>
        <section className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"}>
          <div className={"flex items-center justify-center h-full gap-1.5"}>
            <Icon className={"h-9 aspect-square"} useDefaultColor icon={YourDashIcon.YourDashLogo}/>
            <h2 className={"text-3xl font-semibold tracking-wide"}>
              {trans( "APPLICATION_NAME" )}
            </h2>
          </div>
        </section>
        <section className={"flex items-center justify-center h-full gap-2"}>
          {
            progress === 1
              ? (
                <MajorButton
                  onClick={() => {
                    setProgress( 1 );
                    
                    csi.postJson( "/app/diffusion_lab/generate", { ...generationData }, data => {
                      setGenerationResult( data );
                      setProgress( 1 );
                    } );
                  }}
                >
                  {trans( "GENERATE_BUTTON.LABEL" )}
                </MajorButton>
              )
              : (
                <Button
                  onClick={() => {
                    setProgress( 0 );
                  }}
                >
                  {trans( "STOP_BUTTON.LABEL" )}
                </Button>
              )
          }
        </section>
      </header>
      <ResizeContainer className={"flex gap-3"} direction={"row"}>
        <section className={"flex flex-col flex-grow pl-3 pt-3 pb-3"}>
          <Card>
            <span>{trans( "PROMPT.LABEL" )}</span>
            <TextBox onChange={e => {
              setGenerationData( { ...generationData, prompt: { ...generationData.prompt, positive: e.target.value } } );
            }}
            />
            <span>{trans( "NEGATIVE_PROMPT.LABEL" )}</span>
            <TextBox onChange={e => {
              setGenerationData( { ...generationData, prompt: { ...generationData.prompt, negative: e.target.value } } );
            }}
            />
          </Card>
        </section>
        <section>
          <div className={"flex flex-col pr-3 pt-3 pb-3"}>
            <div
              style={{
                aspectRatio: `${ generationData.dimensions.width } / ${ generationData.dimensions.height }`
              }}
              className={"flex flex-col flex-wrap p-4 items-center justify-center"}
            >
              {
                generationResult.map( batch => {
                  return batch.map( image => {
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    return <img key={image} src={image || YourDashLogo} alt="generated ai-image" className={"w-full h-full"}/>;
                  } );
                } )
              }
            </div>
          </div>
        </section>
      </ResizeContainer>
    </main>
  );
};

export default DiffusionLabApplication;
