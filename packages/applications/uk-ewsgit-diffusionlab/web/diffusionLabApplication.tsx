/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Button from "@yourdash/chiplet/components/button/Button";
import Card from "@yourdash/chiplet/components/card/Card";
import DropdownButton from "@yourdash/chiplet/components/dropdownButton/DropdownButton";
import Icon from "@yourdash/chiplet/components/icon/Icon";
import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import MajorButton from "@yourdash/chiplet/components/majorButton/MajorButton";
import ResizeContainer from "@yourdash/chiplet/components/resizeContainer/ResizeContainer";
import TextBox from "@yourdash/chiplet/components/textBox/TextBox";
import React, { useState, useEffect } from "react";
import coreCSI, { TJson } from "@yourdash/csi/coreCSI";
import { IDiffusionLabImageGenerationData } from "@yourdash/shared/apps/diffusion_lab/image/generationData";
import YourDashLogo from "@yourdash/web/public/assets/productLogos/yourdash.svg";

const DiffusionLabApplication: React.FC = () => {
  const trans = useTranslate("diffusion_lab");
  const [progress, setProgress] = useState<number>(1);
  const [models, setModels] = useState<string[]>([]);
  const [generationData, setGenerationData] = useState<IDiffusionLabImageGenerationData>({
    extensions: [],
    dimensions: {
      width: 256,
      height: 256,
    },
    model: "",
    prompt: {
      positive: "",
      negative: "",
    },
    seed: -1,
    steps: 20,
    clientId: 0,
    batch: {
      size: 1,
      quantity: 1,
    },
  });
  const [generationResult, setGenerationResult] = useState<string[][]>([]);

  useEffect(() => {
    coreCSI.syncGetJson("/app/diffusion_lab/models", (data: { models: string[] }) => {
      setGenerationData({ ...generationData, model: data.models[0] });
      setModels(data.models);
    });
  }, []);

  return (
    <main>
      <header className={"w-full p-3 flex items-center justify-between sticky top-0 bg-container-bg text-container-fg"}>
        <section className={"flex items-center justify-center h-full gap-2"}>
          <DropdownButton
            items={models.map((model) => {
              return {
                label: model.slice(0, 1).toUpperCase() + model.slice(1),
                onClick: () => {
                  setGenerationData({ ...generationData, model });
                },
              };
            })}
          >
            Select a diffusion model
          </DropdownButton>
          <DropdownButton
            items={models.map((model) => {
              return {
                label: model.slice(0, 1).toUpperCase() + model.slice(1),
                onClick: () => {
                  setGenerationData({ ...generationData, model });
                },
              };
            })}
          >
            Select a VAE
          </DropdownButton>
        </section>
        <section className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"}>
          <div className={"flex items-center justify-center h-full gap-1.5"}>
            <Icon
              className={"h-9 aspect-square"}
              preserveColor
              icon={UKIcons.YourDashLogo}
            />
            <h2 className={"text-3xl font-semibold tracking-wide"}>{trans("APPLICATION_NAME")}</h2>
          </div>
        </section>
        <section className={"flex items-center justify-center h-full gap-2"}>
          {progress === 1 ? (
            <MajorButton
              onClick={() => {
                setProgress(1);

                coreCSI.postJson("/app/diffusion_lab/generate", { ...(generationData as any as TJson) }, (data: any) => {
                  setGenerationResult(data);
                  setProgress(1);
                });
              }}
            >
              {trans("GENERATE_BUTTON.LABEL")}
            </MajorButton>
          ) : (
            <Button
              onClick={() => {
                setProgress(0);
              }}
            >
              {trans("STOP_BUTTON.LABEL")}
            </Button>
          )}
        </section>
      </header>
      <ResizeContainer
        className={"flex gap-3"}
        direction={"row"}
      >
        <section className={"flex flex-col flex-grow pl-3 pt-3 pb-3"}>
          <Card>
            <span>{trans("PROMPT.LABEL")}</span>
            <TextBox
              onChange={(e) => {
                setGenerationData({
                  ...generationData,
                  prompt: { ...generationData.prompt, positive: e.target.value },
                });
              }}
            />
            <span>{trans("NEGATIVE_PROMPT.LABEL")}</span>
            <TextBox
              onChange={(e) => {
                setGenerationData({
                  ...generationData,
                  prompt: { ...generationData.prompt, negative: e.target.value },
                });
              }}
            />
          </Card>
        </section>
        <section>
          <div className={"flex flex-col pr-3 pt-3 pb-3"}>
            <div
              style={{
                aspectRatio: `${generationData.dimensions.width} / ${generationData.dimensions.height}`,
              }}
              className={"flex flex-col flex-wrap p-4 items-center justify-center"}
            >
              {generationResult.map((batch) => {
                return batch.map((image) => {
                  return (
                    <img
                      key={image}
                      src={image || YourDashLogo}
                      alt="generated ai-image"
                      className={"w-full h-full"}
                    />
                  );
                });
              })}
            </div>
          </div>
        </section>
      </ResizeContainer>
    </main>
  );
};

export default DiffusionLabApplication;
