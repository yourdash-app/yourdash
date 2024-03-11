/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import useTranslate from "@yourdash/shared/web/helpers/i18n";
import AutocompletedTextInput from "@yourdash/uikit/depChiplet/components/autocompletedTextInput/AutocompletedTextInput";
import Button from "@yourdash/uikit/depChiplet/components/button/Button";
import Card from "@yourdash/uikit/depChiplet/components/card/Card";
import DropdownButton from "@yourdash/uikit/depChiplet/components/dropdownButton/DropdownButton";
import Icon from "@yourdash/uikit/depChiplet/components/icon/Icon";
import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import TextBox from "@yourdash/uikit/depChiplet/components/textBox/TextBox";
import React, { useState, useEffect } from "react";
import csi from "@yourdash/csi/csi";

function loadPossibleEndpoints(setEndpoints: (data: string[]) => void) {
  csi.getJson("/app/endpoints/endpoints", (data: any) => {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    const endpoints: string[] = data
      .map((endpoint: any) => endpoint?.route?.path || null)
      .filter((endpoint: any) => endpoint !== null); // eslint-disable-line @typescript-eslint/no-explicit-any

    setEndpoints([...new Set(endpoints)]);
  });
}

const EndpointsApplication: React.FC = () => {
  const trans = useTranslate("endpoints");
  const [requestType, setRequestType] = useState<"Text" | "JSON">("JSON");
  const [requestMethod, setRequestMethod] = useState<"GET" | "POST" | "DELETE">("GET");
  const [requestHeaders, setRequestHeaders] = useState<{ [key: string]: string }>({});
  const [requestBody, setRequestBody] = useState<string>("");
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("");
  const [endpoints, setEndpoints] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [didError, setDidError] = useState<string | false>(false);
  const [response, setResponse] = useState<string>("");

  useEffect(() => {
    loadPossibleEndpoints((eps) => setEndpoints(eps));
  }, []);

  return (
    <main className={"grid grid-cols-2 p-2 gap-2"}>
      <Card
        showBorder={true}
        className={
          "w-full p-3 flex items-center justify-between sticky top-0 bg-container-bg text-container-fg col-span-2"
        }
      >
        <section className={"flex items-center justify-center h-full gap-2"}>
          <DropdownButton
            items={[
              {
                label: "Get",
                onClick() {
                  setRequestMethod("GET");
                },
              },
              {
                label: "Post",
                onClick() {
                  setRequestMethod("POST");
                },
              },
              {
                label: "Delete",
                onClick() {
                  setRequestMethod("DELETE");
                },
              },
            ]}
          >
            {"Get"}
          </DropdownButton>
          <DropdownButton
            items={[
              {
                label: "Text",
                onClick() {
                  setRequestType("Text");
                },
              },
              {
                label: "JSON",
                onClick() {
                  setRequestType("JSON");
                },
              },
            ]}
          >
            {"JSON"}
          </DropdownButton>
        </section>
        <section className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"}>
          <div className={"flex items-center justify-center h-full gap-1.5"}>
            <Icon className={"h-9 aspect-square"} preserveColor icon={YourDashIcon.YourDashLogo} />
            <h2 className={"text-3xl font-semibold tracking-wide"}>{trans("APPLICATION_NAME")}</h2>
          </div>
        </section>
        <section className={"flex items-center justify-center h-full gap-2"}>
          <Button
            onClick={() => {
              setDidError(false);
              setLoading(true);

              switch (requestMethod) {
                case "GET":
                  switch (requestType) {
                    case "Text":
                      csi.getText(
                        selectedEndpoint,
                        (data: any) => {
                          setResponse(data);
                          setLoading(false);
                        },
                        (error: any) => {
                          setDidError(error);
                          setLoading(false);
                        },
                        requestHeaders,
                      );
                      break;
                    case "JSON":
                      csi.getJson(
                        selectedEndpoint,
                        (data: any) => {
                          setResponse(data);
                          setLoading(false);
                        },
                        (error) => {
                          setDidError(error);
                          setLoading(false);
                        },
                        requestHeaders,
                      );
                      break;
                    default:
                      setDidError(trans("INTERNAL_ERROR"));
                  }
                  break;
                case "POST":
                  switch (requestType) {
                    case "Text":
                      csi.postText(
                        selectedEndpoint,
                        JSON.parse(requestBody),
                        (data: any) => {
                          setResponse(data);
                          setLoading(false);
                        },
                        (error: any) => {
                          setDidError(error);
                          setLoading(false);
                        },
                        requestHeaders,
                      );
                      break;
                    case "JSON":
                      csi.postJson(
                        selectedEndpoint,
                        JSON.parse(requestBody),
                        (data: any) => {
                          setResponse(data);
                          setLoading(false);
                        },
                        (error: any) => {
                          setDidError(error);
                          setLoading(false);
                        },
                        requestHeaders,
                      );
                      break;
                    default:
                      setDidError(trans("INTERNAL_ERROR"));
                  }
                  break;
                case "DELETE":
                  switch (requestType) {
                    case "Text":
                      csi.deleteText(
                        selectedEndpoint,
                        (data: any) => {
                          setResponse(data);
                          setLoading(false);
                        },
                        (error: any) => {
                          setDidError(error);
                          setLoading(false);
                        },
                        requestHeaders,
                      );
                      break;
                    case "JSON":
                      csi.deleteJson(
                        selectedEndpoint,
                        (data: any) => {
                          setResponse(data);
                          setLoading(false);
                        },
                        (error: any) => {
                          setDidError(error);
                          setLoading(false);
                        },
                        requestHeaders,
                      );
                      break;
                    default:
                      setDidError(trans("INTERNAL_ERROR"));
                  }
                  break;
                default:
                  setDidError(trans("INTERNAL_ERROR"));
              }
            }}
          >
            {trans("SEND_REQUEST.LABEL")}
          </Button>
        </section>
      </Card>
      <Card
        showBorder
        className={"bg-container-bg text-container-fg rounded-container-rounding p-2 h-max flex flex-col"}
      >
        <AutocompletedTextInput
          options={endpoints}
          label={"Request Endpoint"}
          onChange={(value) => {
            setSelectedEndpoint(value);
          }}
          className={"mb-2"}
        />
        {requestMethod !== "GET" && (
          <>
            <span className={"-mb-0.5 text-opacity-60 text-container-fg"}>{"Request Body"}</span>
            <TextBox
              defaultValue={"{\n  \n}"}
              onChange={(e) => {
                setRequestBody(e.currentTarget.value);
              }}
            />
          </>
        )}
        <span className={"-mb-0.5 text-opacity-60 text-container-fg"}>{"Request Extra Headers"}</span>
        <TextBox
          defaultValue={"{\n  \n}"}
          onChange={(e) => {
            setRequestHeaders(JSON.parse(e.currentTarget.value));
          }}
        />
      </Card>
      {!loading && (
        <Card className={"overflow-x-auto w-auto"} showBorder>
          <pre
            className={"bg-container-secondary-bg text-container-fg p-4 rounded-container-secondary-rounding w-auto"}
          >
            {requestType === "JSON" ? JSON.stringify(response, null, 2) : response.toString()}
          </pre>
          {didError && (
            <pre className={"bg-container-tertiary-bg text-red-400 p-4 rounded-container-rounding"}>{didError}</pre>
          )}
        </Card>
      )}
    </main>
  );
};

export default EndpointsApplication;
