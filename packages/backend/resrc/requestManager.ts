/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { LoginLayout } from "@yourdash/shared/core/login/loginLayout.js";
import chalk from "chalk";
import Fastify, { fastify, FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { fastifyRequestContext, requestContext } from "@fastify/request-context";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { createReadStream } from "fs";
import path from "path";
import { fetch } from "undici";
import { z, ZodError } from "zod";
import { YourDashApplication } from "./applications.js";
import { YourDashSessionType } from "./authorization.js";
import { type Instance } from "./main.js";
import { INSTANCE_STATUS } from "./types/instanceStatus.js";
import User from "./user.js";
import { resizeImage } from "./image.js";
import { mkdir } from "fs/promises";

declare module "zod" {
  interface ZodError {
    httpPart?: string;
  }
}

class RequestManager {
  private instance: Instance;
  app: FastifyInstance;
  publicRoutes: RegExp[];

  constructor(instance: Instance) {
    this.instance = instance;
    this.publicRoutes = [];

    this.app = Fastify({
      logger: {
        msgPrefix: "YourDash Backend -> ",
        enabled: false,
      },
    }).withTypeProvider<ZodTypeProvider>();

    return this;
  }

  sendFile(res: FastifyReply, filePath: string, mimeType: string) {
    const stream = createReadStream(path.resolve(filePath));

    return res.type(mimeType).send(stream);
  }

  async __internal_startup() {
    try {
      await this.instance.database.query(`CREATE TABLE IF NOT EXISTS public.request_manager_log
                                     (
                                       request_id serial primary key,
                                       request_timestamp bigint NOT NULL,
                                       request_method text NOT NULL,
                                       request_path text   NOT NULL,
                                       request_body text
                                     )`);
    } catch (err) {
      console.error(err);
    }

    this.app.setValidatorCompiler(validatorCompiler);
    this.app.setSerializerCompiler(serializerCompiler);

    this.app.setErrorHandler((error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
      const cause: { name: string; issues: { code: string; expected: string; recieved: string; path: string[]; message: string }[] } =
        error.cause as any;

      // noinspection SuspiciousTypeOfGuard
      if (cause.name === "ZodError") {
        reply.status(400).send({
          statusCode: 400,
          error: "Bad Request",
          // @ts-ignore
          httpPart: error.httpPart!,
          issues: cause.issues,
        });
      }

      reply.send(error);
    });

    await this.app.register(cors, {
      methods: "*",
      origin: "http://localhost:5173",
      credentials: true,
    });

    this.app.register(fastifyCookie, {
      secret: this.instance.flags.cookieSecret,
      hook: "onRequest",
      parseOptions: {}, // options for parsing cookies
    });

    this.app.register(fastifySwagger, {
      openapi: {
        info: {
          title: "YourDash Backend",
          description: "The YourDash Instance Backend",
          version: "0.0.1",
        },
        servers: [
          {
            url: "http://localhost:3563",
            description: "Local development server",
          },
        ],
        openapi: "3.1.0",
      },
      transform: jsonSchemaTransform,
    });

    this.app.register(fastifySwaggerUI, {
      routePrefix: "/swagger",
      uiConfig: {},
      logo: {
        type: "image/png",
        content: (await Bun.file(path.join(process.cwd(), "./src/defaults/yourdash.png")).bytes()) as unknown as string,
        href: "/swagger",
        target: "_blank",
      },
      staticCSP: true,
      theme: {
        favicon: [
          {
            filename: "favicon.png",
            rel: "icon",
            sizes: "1024x1024",
            type: "image/png",
            content: (await Bun.file(path.join(process.cwd(), "./src/defaults/yourdash.png")).bytes()) as unknown as string,
          },
        ],
        css: [
          {
            filename: "theme.css",
            content: `@charset "UTF-8";
.swagger-ui html {
  box-sizing: border-box
}

#swagger-ui > section > div.topbar > div > div > form {
  display: none;
  visibility: hidden;
}

.swagger-ui {
  color: #b7c8f1;
}

.swagger-ui *, .swagger-ui :after, .swagger-ui :before {
  box-sizing: inherit
}

.swagger-ui body {
  margin: 0;
  background: #333333
}

.swagger-ui .wrapper {
  width: 100%;
  max-width: 1460px;
  margin: 0 auto;
  padding: 0 20px
}

.swagger-ui .opblock-tag-section {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column
}

.swagger-ui .opblock-tag {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px 20px 10px 10px;
  cursor: pointer;
  -webkit-transition: all .2s;
  transition: all .2s;
  border-bottom: 1px solid rgba(59, 65, 81, 1);
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .opblock-tag:hover {
  background: rgba(0, 0, 0, .02)
}

.swagger-ui .opblock-tag {
  font-size: 24px;
  margin: 0 0 5px;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1;
  background: #333;
  border-radius: 0.5rem 0.5rem 0 0;
}

.swagger-ui .opblock-tag.no-desc span {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1
}

.swagger-ui .opblock-tag svg {
  -webkit-transition: all .4s;
  transition: all .4s
}

.swagger-ui .opblock-tag small {
  font-size: 14px;
  font-weight: 400;
  padding: 0 10px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-family: Open Sans, sans-serif;
  color: #b7c8f1
}

.swagger-ui .parаmeter__type {
  font-size: 12px;
  padding: 5px 0;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #b7c8f1
}

.swagger-ui .view-line-link {
  position: relative;
  top: 3px;
  width: 20px;
  margin: 0 5px;
  cursor: pointer;
  -webkit-transition: all .5s;
  transition: all .5s
}

.swagger-ui .opblock {
  margin: 0 0 15px;
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, .19)
}

.swagger-ui .opblock.is-open .opblock-summary {
  border-bottom: 1px solid #000
}

.swagger-ui .opblock .opblock-section-header {
  padding: 8px 20px;
  background: hsla(0, 0%, 0%, .2);
  box-shadow: 0 1px 2px rgba(0, 0, 0, .1)
}

.swagger-ui .opblock .opblock-section-header, .swagger-ui .opblock .opblock-section-header label {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .opblock .opblock-section-header label {
  font-size: 12px;
  font-weight: 700;
  margin: 0;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1
}

.swagger-ui .opblock .opblock-section-header label span {
  padding: 0 10px 0 0
}

.swagger-ui .opblock .opblock-section-header h4 {
  font-size: 14px;
  margin: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1
}

.swagger-ui section h3 {
  color: #b7c8f1
}

.swagger-ui .response-col_links {
  color: #b7c8f1;
}

.swagger-ui .opblock .opblock-summary-method {
  font-size: 14px;
  font-weight: 700;
  min-width: 80px;
  padding: 6px 15px;
  text-align: center;
  border-radius: 3px;
  background: #000;
  text-shadow: 0 1px 0 rgba(0, 0, 0, .1);
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #fff
}

.swagger-ui .opblock .opblock-summary-path, .swagger-ui .opblock .opblock-summary-path__deprecated {
  font-size: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0 10px;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #b7c8f1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .opblock .opblock-summary-path .view-line-link, .swagger-ui .opblock .opblock-summary-path__deprecated .view-line-link {
  position: relative;
  top: 2px;
  width: 0;
  margin: 0;
  cursor: pointer;
  -webkit-transition: all .5s;
  transition: all .5s
}

.swagger-ui .opblock .opblock-summary-path:hover .view-line-link, .swagger-ui .opblock .opblock-summary-path__deprecated:hover .view-line-link {
  width: 18px;
  margin: 0 5px
}

.swagger-ui .opblock .opblock-summary-path__deprecated {
  text-decoration: line-through
}

.swagger-ui .opblock .opblock-summary-description {
  font-size: 13px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-family: Open Sans, sans-serif;
  color: #b7c8f1
}

.swagger-ui .opblock .opblock-summary {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 5px;
  cursor: pointer;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .opblock.opblock-post {
  border-color: #49cc90;
  background: rgba(73, 204, 144, .1)
}

.swagger-ui .opblock.opblock-post .opblock-summary-method {
  background: #49cc90
}

.swagger-ui .opblock.opblock-post .opblock-summary {
  border-color: #49cc90
}

.swagger-ui .opblock.opblock-put {
  border-color: #fca130;
  background: rgba(252, 161, 48, .1)
}

.swagger-ui .opblock.opblock-put .opblock-summary-method {
  background: #fca130
}

.swagger-ui .opblock.opblock-put .opblock-summary {
  border-color: #fca130
}

.swagger-ui .opblock.opblock-delete {
  border-color: #f93e3e;
  background: rgba(249, 62, 62, .1)
}

.swagger-ui .opblock.opblock-delete .opblock-summary-method {
  background: #f93e3e
}

.swagger-ui .opblock.opblock-delete .opblock-summary {
  border-color: #f93e3e
}

.swagger-ui .opblock.opblock-get {
  border-color: #61affe;
  background: rgba(97, 175, 254, .1)
}

.swagger-ui .opblock.opblock-get .opblock-summary-method {
  background: #61affe
}

.swagger-ui .opblock.opblock-get .opblock-summary {
  border-color: #61affe
}

.swagger-ui .opblock.opblock-patch {
  border-color: #50e3c2;
  background: rgba(80, 227, 194, .1)
}

.swagger-ui .opblock.opblock-patch .opblock-summary-method {
  background: #50e3c2
}

.swagger-ui .opblock.opblock-patch .opblock-summary {
  border-color: #50e3c2
}

.swagger-ui .opblock.opblock-head {
  border-color: #9012fe;
  background: rgba(144, 18, 254, .1)
}

.swagger-ui .opblock.opblock-head .opblock-summary-method {
  background: #9012fe
}

.swagger-ui .opblock.opblock-head .opblock-summary {
  border-color: #9012fe
}

.swagger-ui .opblock.opblock-options {
  border-color: #0d5aa7;
  background: rgba(13, 90, 167, .1)
}

.swagger-ui .opblock.opblock-options .opblock-summary-method {
  background: #0d5aa7
}

.swagger-ui .opblock.opblock-options .opblock-summary {
  border-color: #0d5aa7
}

.swagger-ui .opblock.opblock-deprecated {
  opacity: .6;
  border-color: #ebebeb;
  background: hsla(0, 0%, 92%, .1)
}

.swagger-ui .opblock.opblock-deprecated .opblock-summary-method {
  background: #ebebeb
}

.swagger-ui .opblock.opblock-deprecated .opblock-summary {
  border-color: #ebebeb
}

.swagger-ui .tab {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 20px 0 10px;
  padding: 0;
  list-style: none
}

.swagger-ui .tab li {
  font-size: 12px;
  min-width: 100px;
  min-width: 90px;
  padding: 0;
  cursor: pointer;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1
}

.swagger-ui .tab li:first-of-type {
  position: relative;
  padding-left: 0
}

.swagger-ui .tab li:first-of-type:after {
  position: absolute;
  top: 0;
  right: 6px;
  width: 1px;
  height: 100%;
  content: "";
  background: rgba(0, 0, 0, .2)
}

.swagger-ui .tab li.active {
  font-weight: 700
}

.swagger-ui .opblock-description-wrapper, .swagger-ui .opblock-title_normal {
  padding: 15px 20px
}

.swagger-ui .opblock-description-wrapper, .swagger-ui .opblock-description-wrapper h4, .swagger-ui .opblock-title_normal, .swagger-ui .opblock-title_normal h4 {
  font-size: 12px;
  margin: 0 0 5px;
  font-family: Open Sans, sans-serif;
  color: #b7c8f1
}

.swagger-ui .opblock-description-wrapper p, .swagger-ui .opblock-title_normal p {
  font-size: 14px;
  margin: 0;
  font-family: Open Sans, sans-serif;
  color: #b7c8f1
}

.swagger-ui .execute-wrapper {
  padding: 20px;
  text-align: right
}

.swagger-ui .execute-wrapper .btn {
  width: 100%;
  padding: 8px 40px
}

.swagger-ui .body-param-options {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column
}

.swagger-ui .body-param-options .body-param-edit {
  padding: 10px 0
}

.swagger-ui .body-param-options label {
  padding: 8px 0
}

.swagger-ui .body-param-options label select {
  margin: 3px 0 0
}

.swagger-ui .responses-inner {
  padding: 20px
}

.swagger-ui .responses-inner h4, .swagger-ui .responses-inner h5 {
  font-size: 12px;
  margin: 10px 0 5px;
  font-family: Open Sans, sans-serif;
  color: #b7c8f1
}

.swagger-ui .response-col_status {
  font-size: 14px;
  font-family: Open Sans, sans-serif;
  color: #b7c8f1
}

.swagger-ui .response-col_status .response-undocumented {
  font-size: 11px;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #999
}

.swagger-ui .response-col_description__inner span {
  font-size: 12px;
  font-style: italic;
  display: block;
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  background: #41444e;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #fff
}

.swagger-ui .response-col_description__inner span p {
  margin: 0
}

.swagger-ui .opblock-body pre {
  font-size: 12px;
  margin: 0;
  padding: 10px;
  white-space: pre-wrap;
  border-radius: 4px;
  background: #41444e;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #fff
}

.swagger-ui .opblock-body pre span {
  color: #fff!important
}

.swagger-ui .scheme-container {
  margin: 0 0 0;
  padding: 0.5rem 0;
  background: #222;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .15)
}

.swagger-ui .scheme-container .schemes {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .scheme-container .schemes>label {
  font-size: 12px;
  font-weight: 700;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  margin: -20px 15px 0 0;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1
}

.swagger-ui .scheme-container .schemes>label select {
  min-width: 130px;
  text-transform: uppercase
}

.swagger-ui .loading-container {
  padding: 40px 0 60px
}

.swagger-ui .loading-container .loading {
  position: relative
}

.swagger-ui .loading-container .loading:after {
  font-size: 10px;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 50%;
  content: "loading";
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1
}

.swagger-ui .loading-container .loading:before {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 60px;
  height: 60px;
  margin: -30px;
  content: "";
  -webkit-animation: rotation 1s infinite linear, opacity .5s;
  animation: rotation 1s infinite linear, opacity .5s;
  opacity: 1;
  border: 2px solid rgba(85, 85, 85, .1);
  border-top-color: rgba(0, 0, 0, .6);
  border-radius: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden
}

@-webkit-keyframes rotation {
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn)
  }
}

@keyframes rotation {
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn)
  }
}

@-webkit-keyframes blinker {
  50% {
    opacity: 0
  }
}

@keyframes blinker {
  50% {
    opacity: 0
  }
}

.swagger-ui .btn {
  font-size: 14px;
  font-weight: 700;
  padding: 5px 23px;
  -webkit-transition: all .3s;
  transition: all .3s;
  border: 2px solid #888;
  border-radius: 4px;
  background: transparent;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1
}

.swagger-ui .btn[disabled] {
  cursor: not-allowed;
  opacity: .3
}

.swagger-ui .btn:hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, .3)
}

.swagger-ui .btn.cancel {
  border-color: #ff6060;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #ff6060
}

.swagger-ui .btn.authorize {
  line-height: 1;
  display: inline;
  color: #49cc90;
  border-color: #49cc90
}

.swagger-ui .btn.authorize span {
  float: left;
  padding: 4px 20px 0 0
}

.swagger-ui .btn.authorize svg {
  fill: #49cc90
}

.swagger-ui .btn.execute {
  -webkit-animation: pulse 2s infinite;
  animation: pulse 2s infinite;
  color: #fff;
  border-color: #4990e2
}

@-webkit-keyframes pulse {
  0% {
    color: #fff;
    background: #4990e2;
    box-shadow: 0 0 0 0 rgba(73, 144, 226, .8)
  }
  70% {
    box-shadow: 0 0 0 5px rgba(73, 144, 226, 0)
  }
  to {
    color: #fff;
    background: #4990e2;
    box-shadow: 0 0 0 0 rgba(73, 144, 226, 0)
  }
}

@keyframes pulse {
  0% {
    color: #fff;
    background: #4990e2;
    box-shadow: 0 0 0 0 rgba(73, 144, 226, .8)
  }
  70% {
    box-shadow: 0 0 0 5px rgba(73, 144, 226, 0)
  }
  to {
    color: #fff;
    background: #4990e2;
    box-shadow: 0 0 0 0 rgba(73, 144, 226, 0)
  }
}

.swagger-ui .btn-group {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 30px
}

.swagger-ui .btn-group .btn {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1
}

.swagger-ui .btn-group .btn:first-child {
  border-radius: 4px 0 0 4px
}

.swagger-ui .btn-group .btn:last-child {
  border-radius: 0 4px 4px 0
}

.swagger-ui .authorization__btn {
  padding: 0 10px;
  border: none;
  background: none
}

.swagger-ui .authorization__btn.locked {
  opacity: 1
}

.swagger-ui .authorization__btn.unlocked {
  opacity: .4
}

.swagger-ui .expand-methods, .swagger-ui .expand-operation {
  border: none;
  background: none
}

.swagger-ui .expand-methods svg, .swagger-ui .expand-operation svg {
  width: 20px;
  height: 20px
}

.swagger-ui .expand-methods {
  padding: 0 10px
}

.swagger-ui .expand-methods:hover svg {
  fill: #444
}

.swagger-ui .expand-methods svg {
  -webkit-transition: all .3s;
  transition: all .3s;
  fill: #777
}

.swagger-ui button {
  cursor: pointer;
  outline: none
}

.swagger-ui select {
  font-size: 14px;
  font-weight: 700;
  padding: 5px 40px 5px 10px;
  border: 2px solid #41444e;
  border-radius: 4px;
  background: #333 url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICAgIDxwYXRoIGQ9Ik0xMy40MTggNy44NTljLjI3MS0uMjY4LjcwOS0uMjY4Ljk3OCAwIC4yNy4yNjguMjcyLjcwMSAwIC45NjlsLTMuOTA4IDMuODNjLS4yNy4yNjgtLjcwNy4yNjgtLjk3OSAwbC0zLjkwOC0zLjgzYy0uMjctLjI2Ny0uMjctLjcwMSAwLS45NjkuMjcxLS4yNjguNzA5LS4yNjguOTc4IDBMMTAgMTFsMy40MTgtMy4xNDF6Ii8+PC9zdmc+) right 10px center no-repeat;
  background-size: 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .25);
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none
}

.swagger-ui select:focus-visible {
  outline: none
}

.swagger-ui select[multiple] {
  margin: 5px 0;
  padding: 5px;
  background: #f7f7f7
}

.swagger-ui .opblock-body select {
  min-width: 230px
}

.swagger-ui label {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 5px;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1
}

.swagger-ui input[type=email], .swagger-ui input[type=password], .swagger-ui input[type=search], .swagger-ui input[type=text] {
  min-width: 100px;
  margin: 5px 0;
  padding: 8px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff
}

.swagger-ui input[type=email].invalid, .swagger-ui input[type=password].invalid, .swagger-ui input[type=search].invalid, .swagger-ui input[type=text].invalid {
  -webkit-animation: shake .4s 1;
  animation: shake .4s 1;
  border-color: #f93e3e;
  background: #feebeb
}

@-webkit-keyframes shake {
  10%, 90% {
    -webkit-transform: translate3d(-1px, 0, 0);
    transform: translate3d(-1px, 0, 0)
  }
  20%, 80% {
    -webkit-transform: translate3d(2px, 0, 0);
    transform: translate3d(2px, 0, 0)
  }
  30%, 50%, 70% {
    -webkit-transform: translate3d(-4px, 0, 0);
    transform: translate3d(-4px, 0, 0)
  }
  40%, 60% {
    -webkit-transform: translate3d(4px, 0, 0);
    transform: translate3d(4px, 0, 0)
  }
}

@keyframes shake {
  10%, 90% {
    -webkit-transform: translate3d(-1px, 0, 0);
    transform: translate3d(-1px, 0, 0)
  }
  20%, 80% {
    -webkit-transform: translate3d(2px, 0, 0);
    transform: translate3d(2px, 0, 0)
  }
  30%, 50%, 70% {
    -webkit-transform: translate3d(-4px, 0, 0);
    transform: translate3d(-4px, 0, 0)
  }
  40%, 60% {
    -webkit-transform: translate3d(4px, 0, 0);
    transform: translate3d(4px, 0, 0)
  }
}

.swagger-ui textarea {
  font-size: 12px;
  width: 100%;
  min-height: 280px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  outline: none;
  background: hsla(0, 0%, 0%, .8);
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #b7c8f1
}

.swagger-ui textarea:focus {
  border: 2px solid #61affe
}

.swagger-ui textarea.curl {
  font-size: 12px;
  min-height: 100px;
  margin: 0;
  padding: 10px;
  resize: none;
  border-radius: 4px;
  background: #41444e;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #fff
}

.swagger-ui .checkbox {
  padding: 5px 0 10px;
  -webkit-transition: opacity .5s;
  transition: opacity .5s;
  color: #333
}

.swagger-ui .checkbox label {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex
}

.swagger-ui .checkbox p {
  font-weight: 400!important;
  font-style: italic;
  margin: 0!important;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #b7c8f1
}

.swagger-ui .checkbox input[type=checkbox] {
  display: none
}

.swagger-ui .checkbox input[type=checkbox]+label>.item {
  position: relative;
  top: 3px;
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: 0 8px 0 0;
  padding: 5px;
  cursor: pointer;
  border-radius: 1px;
  background: #e8e8e8;
  box-shadow: 0 0 0 2px #e8e8e8;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none
}

.swagger-ui .checkbox input[type=checkbox]+label>.item:active {
  -webkit-transform: scale(.9);
  transform: scale(.9)
}

.swagger-ui .checkbox input[type=checkbox]:checked+label>.item {
  background: #e8e8e8 url("data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='8' viewBox='3 7 10 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%2341474E' fill-rule='evenodd' d='M6.333 15L3 11.667l1.333-1.334 2 2L11.667 7 13 8.333z'/%3E%3C/svg%3E") 50% no-repeat
}

.swagger-ui .dialog-ux {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0
}

.swagger-ui .dialog-ux .backdrop-ux {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .8)
}

.swagger-ui .dialog-ux .modal-ux {
  position: absolute;
  z-index: 9999;
  top: 50%;
  left: 50%;
  width: 100%;
  min-width: 300px;
  max-width: 650px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: 1px solid #ebebeb;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, .2)
}

.swagger-ui .dialog-ux .modal-ux-content {
  overflow-y: auto;
  max-height: 540px;
  padding: 20px
}

.swagger-ui .dialog-ux .modal-ux-content p {
  font-size: 12px;
  margin: 0 0 5px;
  color: #41444e;
  font-family: Open Sans, sans-serif;
  color: #b7c8f1
}

.swagger-ui .dialog-ux .modal-ux-content h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 15px 0 0;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1
}

.swagger-ui .dialog-ux .modal-ux-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #ebebeb;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .dialog-ux .modal-ux-header .close-modal {
  padding: 0 10px;
  border: none;
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none
}

.swagger-ui .dialog-ux .modal-ux-header h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  padding: 0 20px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1
}

.swagger-ui .model {
  font-size: 12px;
  font-weight: 300;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #b7c8f1
}

.swagger-ui .model-toggle {
  font-size: 10px;
  position: relative;
  top: 6px;
  display: inline-block;
  margin: auto .3em;
  cursor: pointer;
  -webkit-transition: -webkit-transform .15s ease-in;
  transition: -webkit-transform .15s ease-in;
  transition: transform .15s ease-in;
  transition: transform .15s ease-in, -webkit-transform .15s ease-in;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%
}

.swagger-ui .model-toggle.collapsed {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg)
}

.swagger-ui .model-toggle:after {
  display: block;
  width: 20px;
  height: 20px;
  content: "";
  background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3E%3C/svg%3E") 50% no-repeat;
  background-size: 100%
}

.swagger-ui .model-jump-to-path {
  position: relative;
  cursor: pointer
}

.swagger-ui .model-jump-to-path .view-line-link {
  position: absolute;
  top: -.4em;
  cursor: pointer
}

.swagger-ui .model-title {
  position: relative
}

.swagger-ui .model-title:hover .model-hint {
  visibility: visible
}

.swagger-ui .model-hint {
  position: absolute;
  top: -1.8em;
  visibility: hidden;
  padding: .1em .5em;
  white-space: nowrap;
  color: #ebebeb;
  border-radius: 4px;
  background: rgba(0, 0, 0, .7)
}

.swagger-ui section.models {
  margin: 30px 0;
  border: 1px solid rgba(59, 65, 81, .3);
  border-radius: 4px
}

.swagger-ui section.models.is-open {
  padding: 0 0 20px
}

.swagger-ui section.models.is-open h4 {
  margin: 0 0 5px;
  border-bottom: 1px solid rgba(59, 65, 81, .3)
}

.swagger-ui section.models.is-open h4 svg {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg)
}

.swagger-ui section.models h4 {
  font-size: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 0;
  padding: 10px 20px 10px 10px;
  cursor: pointer;
  -webkit-transition: all .2s;
  transition: all .2s;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #777;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui section.models h4 svg {
  -webkit-transition: all .4s;
  transition: all .4s
}

.swagger-ui section.models h4 span {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1
}

.swagger-ui section.models h4:hover {
  background: rgba(0, 0, 0, .02)
}

.swagger-ui section.models h5 {
  font-size: 16px;
  margin: 0 0 10px;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #777
}

.swagger-ui section.models .model-jump-to-path {
  position: relative;
  top: 5px
}

.swagger-ui section.models .model-container {
  margin: 0 20px 15px;
  -webkit-transition: all .5s;
  transition: all .5s;
  border-radius: 4px;
  background: rgba(0, 0, 0, .05)
}

.swagger-ui section.models .model-container:hover {
  background: rgba(0, 0, 0, .07)
}

.swagger-ui section.models .model-container:first-of-type {
  margin: 20px
}

.swagger-ui section.models .model-container:last-of-type {
  margin: 0 20px
}

.swagger-ui section.models .model-box {
  background: none
}

.swagger-ui .model-box {
  padding: 10px;
  border-radius: 4px;
  background: rgba(0, 0, 0, .1)
}

.swagger-ui .model-box .model-jump-to-path {
  position: relative;
  top: 4px
}

.swagger-ui .model-title {
  font-size: 16px;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #555
}

.swagger-ui span>span.model, .swagger-ui span>span.model .brace-close {
  padding: 0 0 0 10px
}

.swagger-ui .prop-type {
  color: #55a
}

.swagger-ui .prop-enum {
  display: block
}

.swagger-ui .prop-format {
  color: #999
}

.swagger-ui table {
  width: 100%;
  padding: 0 10px;
  border-collapse: collapse
}

.swagger-ui table.model tbody tr td {
  padding: 0;
  vertical-align: top
}

.swagger-ui table.model tbody tr td:first-of-type {
  width: 100px;
  padding: 0
}

.swagger-ui table.headers td {
  font-size: 12px;
  font-weight: 300;
  vertical-align: middle;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #b7c8f1
}

.swagger-ui table tbody tr td {
  padding: 10px 0 0;
  vertical-align: top
}

.swagger-ui table tbody tr td:first-of-type {
  width: 20%;
  padding: 10px 0
}

.swagger-ui table thead tr td, .swagger-ui table thead tr th {
  font-size: 12px;
  font-weight: 700;
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid rgba(59, 65, 81, .2);
  font-family: Open Sans, sans-serif;
  color: #b7c8f1
}

.swagger-ui .parameters-col_description p {
  font-size: 14px;
  margin: 0;
  font-family: Open Sans, sans-serif;
  color: #b7c8f1
}

.swagger-ui .parameters-col_description input[type=text] {
  width: 100%;
  max-width: 340px
}

.swagger-ui .parameter__name {
  font-size: 16px;
  font-weight: 400;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1
}

.swagger-ui .parameter__name.required {
  font-weight: 700
}

.swagger-ui .parameter__name.required:after {
  font-size: 10px;
  position: relative;
  top: -6px;
  padding: 5px;
  content: "required";
  color: rgba(255, 0, 0, .6)
}

.swagger-ui .parameter__in {
  font-size: 12px;
  font-style: italic;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #888
}

.swagger-ui .table-container {
  padding: 20px
}

.swagger-ui .topbar {
  padding: 8px 30px;
  background-color: #222222
}

.swagger-ui .topbar .topbar-wrapper {
  -ms-flex-align: center
}

.swagger-ui .topbar .topbar-wrapper, .swagger-ui .topbar a {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  align-items: center
}

.swagger-ui .topbar a {
  font-size: 1.5em;
  font-weight: 700;
  text-decoration: none;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-align: center;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #fff
}

.swagger-ui .topbar a::after {
  content: "YourDash / Swagger";
  font-size: 1.2rem;
  font-weight: 700;
  font-family: Inter, Roboto, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  padding-left: 0.5rem;
}

.swagger-ui .topbar a span {
  margin: 0;
  padding: 0 10px
}

.swagger-ui .topbar .download-url-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex
}

.swagger-ui .topbar .download-url-wrapper label.select-label span {
  color: white;
}

.swagger-ui .topbar .download-url-wrapper input[type=text] {
  min-width: 350px;
  margin: 0;
  border: 2px solid #222222;
  border-radius: 4px 0 0 4px;
  outline: none
}

.swagger-ui .topbar .download-url-wrapper .download-url-button {
  font-size: 16px;
  font-weight: 700;
  padding: 4px 40px;
  border: none;
  border-radius: 0 4px 4px 0;
  background: #222222;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #fff
}

.swagger-ui .info {
  margin: 1rem 0;
  margin-bottom: 4rem;
}

.swagger-ui .info hgroup.main {
  margin: 0 0 20px
}

.swagger-ui .info hgroup.main a {
  font-size: 12px
}

.swagger-ui .info p {
  font-size: 14px;
  font-family: Open Sans, sans-serif;
  color: #b7c8f1;
  margin-bottom: -2.5rem;
}

.swagger-ui .info code {
  padding: 3px 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, .05);
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #9012fe
}

.swagger-ui .info a {
  font-size: 14px;
  -webkit-transition: all .4s;
  transition: all .4s;
  font-family: Open Sans, sans-serif;
  color: #4990e2
}

.swagger-ui .info a:hover {
  color: #1f69c0
}

.swagger-ui .info>div {
  margin: 0 0 5px
}

.swagger-ui .info .base-url {
  font-size: 12px;
  font-weight: 300!important;
  margin: 0;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #b7c8f1
}

.swagger-ui .info .title {
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
  font-family: Open Sans, sans-serif;
  color: #fff;
}

.swagger-ui .info .title small {
  font-size: 10px;
  position: relative;
  top: -5px;
  display: inline-block;
  margin: 0 0 0 5px;
  padding: 2px 4px;
  vertical-align: super;
  border-radius: 57px;
  background: #7d8492
}

.swagger-ui .info .title small pre {
  margin: 0;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #fff
}

.swagger-ui .auth-btn-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px 0;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center
}

.swagger-ui .auth-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end
}

.swagger-ui .auth-wrapper .authorize {
  padding-right: 20px
}

.swagger-ui .auth-container {
  margin: 0 0 10px;
  padding: 10px 20px;
  border-bottom: 1px solid #ebebeb
}

.swagger-ui .auth-container:last-of-type {
  margin: 0;
  padding: 10px 20px;
  border: 0
}

.swagger-ui .auth-container h4 {
  margin: 5px 0 15px!important
}

.swagger-ui .auth-container .wrapper {
  margin: 0;
  padding: 0
}

.swagger-ui .auth-container input[type=password], .swagger-ui .auth-container input[type=text] {
  min-width: 230px
}

.swagger-ui .auth-container .errors {
  font-size: 12px;
  padding: 10px;
  border-radius: 4px;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #b7c8f1
}

.swagger-ui .scopes h2 {
  font-size: 14px;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1
}

.swagger-ui .scope-def {
  padding: 0 0 20px
}

.swagger-ui .errors-wrapper {
  margin: 20px;
  padding: 10px 20px;
  -webkit-animation: scaleUp .5s;
  animation: scaleUp .5s;
  border: 2px solid #f93e3e;
  border-radius: 4px;
  background: rgba(249, 62, 62, .1)
}

.swagger-ui .errors-wrapper .error-wrapper {
  margin: 0 0 10px
}

.swagger-ui .errors-wrapper .errors h4 {
  font-size: 14px;
  margin: 0;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #b7c8f1
}

.swagger-ui .errors-wrapper hgroup {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .errors-wrapper hgroup h4 {
  font-size: 20px;
  margin: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-family: Inter, Roboto, system-ui, sans-serif;
  color: #b7c8f1
}

@-webkit-keyframes scaleUp {
  0% {
    -webkit-transform: scale(.8);
    transform: scale(.8);
    opacity: 0
  }
  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1
  }
}

@keyframes scaleUp {
  0% {
    -webkit-transform: scale(.8);
    transform: scale(.8);
    opacity: 0
  }
  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1
  }
}

.swagger-ui .Resizer.vertical.disabled {
  display: none
}

/*# sourceMappingURL=swagger-ui.css.map*/

/**
 * Swagger UI Theme Overrides
 *
 * Theme: Material
 * Author: Mark Ostrander
 * Github: https://github.com/ostranme/swagger-ui-themes
 */

 .swagger-ui .opblock.opblock-post {
   border-color: #ffffff;
   background: #ffffff;
 }

 .swagger-ui .opblock.opblock-post .opblock-summary-method {
   background: #009688;
 }

 .swagger-ui .opblock.opblock-post .opblock-summary {
   border-color: #ffffff;
 }

 .swagger-ui .opblock.opblock-post .tab-header .tab-item.active h4 span:after {
   background: #009688;
 }

 .swagger-ui .opblock.opblock-put {
   border-color: #ffffff;
   background: #ffffff;
 }

 .swagger-ui .opblock.opblock-put .opblock-summary-method {
   background: #ff9800;
 }

 .swagger-ui .opblock.opblock-put .opblock-summary {
   border-color: #ffffff;
 }

 .swagger-ui .opblock.opblock-put .tab-header .tab-item.active h4 span:after {
   background: #ff9800;
 }

 .swagger-ui .opblock.opblock-delete {
   border-color: #ffffff;
   background: #ffffff;
 }

 .swagger-ui .opblock.opblock-delete .opblock-summary-method {
   background: #f44336;
 }

 .swagger-ui .opblock.opblock-delete .opblock-summary {
   border-color: #ffffff;
 }

 .swagger-ui .opblock.opblock-delete .tab-header .tab-item.active h4 span:after {
   background: #f44336;
 }

 .swagger-ui .opblock.opblock-get {
   border-color: #444444;
   background: #333333;
 }

 .swagger-ui .opblock.opblock-get .opblock-summary-method {
   background: #3f51b5;
 }

 .swagger-ui .opblock.opblock-get .opblock-summary {
   border-color: #444444;
 }

 .swagger-ui .opblock.opblock-get .tab-header .tab-item.active h4 span:after {
   background: #3f51b5;
 }

 .swagger-ui .opblock.opblock-patch {
   border-color: #ffffff;
   background: #444444;
 }

 .swagger-ui .opblock.opblock-patch .opblock-summary-method {
   background: #f57c00;
 }

 .swagger-ui .opblock.opblock-patch .opblock-summary {
   border-color: #ffffff;
 }

 .swagger-ui .opblock.opblock-patch .tab-header .tab-item.active h4 span:after {
   background: #f57c00;
 }

 .swagger-ui .opblock.opblock-head {
   border-color: #ffffff;
   background: #ffffff;
 }

 .swagger-ui .opblock.opblock-head .opblock-summary-method {
   background: #3f51b5;
 }

 .swagger-ui .opblock.opblock-head .opblock-summary {
   border-color: #ffffff;
 }

 .swagger-ui .opblock.opblock-head .tab-header .tab-item.active h4 span:after {
  background: #3f51b5;
 }

 .swagger-ui .opblock.opblock-options {
   border-color: #ffffff;
   background: #ffffff;
 }

 .swagger-ui .opblock.opblock-options .opblock-summary-method {
   background: #3f51b5;
 }

 .swagger-ui .opblock.opblock-options .opblock-summary {
   border-color: #ffffff;
 }

 .swagger-ui .opblock.opblock-options .tab-header .tab-item.active h4 span:after {
   background: #3f51b5;
 }

 .swagger-ui .topbar {
   padding: 8px 30px;
   background-color: #333333;
   box-shadow: 0 5px 5px 0 rgba(0,0,0,.4), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
 }

 .swagger-ui .topbar .download-url-wrapper input[type=text] {
   min-width: 350px;
   margin: 0;
   border: 2px solid #DADFE1;
   border-radius: 4px 0 0 4px;
   outline: none;
 }

 .swagger-ui .topbar .download-url-wrapper .download-url-button {
   font-size: 16px;
   font-weight: 700;
   padding: 4px 40px;
   border: none;
   border-radius: 0 4px 4px 0;
   background: #ffffff;
   font-family: Inter, Roboto, system-ui, sans-serif;
   color: #222222;
 }

 .swagger-ui .info a {
   font-size: 14px;
   -webkit-transition: all .4s;
   transition: all .4s;
   font-family: Inter, Open Sans, sans-serif;
   color: #3f51b5;
 }

 .swagger-ui .info a:hover {
   color: #3f51b5;
 }

 .swagger-ui .btn.authorize {
   line-height: 1;
   display: inline;
   color: #3f51b5;
   border-color: #3f51b5;
 }

 .swagger-ui .btn.authorize svg {
   fill: #3f51b5;
 }

 body {
   margin:0;
   background: #222222;
   font-family: "Inter","Roboto","Helvetica","Arial",sans-serif;
 }

 .swagger-ui .opblock {
     margin: 0 0 0.25rem;
     border: none;
     border-radius: 2px;
     box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
 }

 .swagger-ui .model-box-control:focus, .swagger-ui .models-control:focus, .swagger-ui .opblock-summary-control:focus {
   outline: none;
 }`,
          },
        ],
      },
    });

    this.app.register(fastifyRequestContext);

    this.app.addHook("onResponse", async (req, res) => {
      if (res.statusCode.toString()[0] === "4") {
        switch (req.method.toUpperCase()) {
          case "GET":
            if (req.url.startsWith("/core/auth-img")) {
              return;
            }
            if (req.url.startsWith("/core/auth-video")) {
              return;
            }

            this.instance.log.info(
              "response",
              `${chalk.bgBlack(chalk.green(" GET "))} ${chalk.bgBlack(chalk.red(` ${res.statusCode} `))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
            );
            break;
          case "POST":
            this.instance.log.info(
              "response",
              `${chalk.bgBlack(chalk.blue(" POS "))} ${chalk.bgBlack(chalk.red(` ${res.statusCode} `))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
            );
            break;
          case "DELETE":
            this.instance.log.info(
              "response",
              `${chalk.bgBlack(chalk.red(" DEL "))} ${chalk.bgBlack(chalk.red(` ${res.statusCode} `))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
            );
            break;
          case "OPTIONS":
            if (this.instance.flags.logOptionsRequests) {
              this.instance.log.info(
                "response",
                `${chalk.bgBlack(chalk.cyan(" OPT "))} ${chalk.bgBlack(chalk.red(` ${res.statusCode} `))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
              );
            }
            break;
          case "PROPFIND":
            this.instance.log.info(
              "response",
              `${chalk.bgBlack(chalk.cyan(" PFI "))} ${chalk.bgBlack(chalk.red(` ${res.statusCode} `))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
            );
            break;
          case "PROPPATCH":
            this.instance.log.info(
              "response",
              `${chalk.bgCyan(chalk.cyan(" PPA "))} ${chalk.bgBlack(chalk.red(` ${res.statusCode} `))} ${chalk.bgBlack(chalk.red(` ${res.statusCode} `))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
            );
            break;
          default:
        }
      }
      if (res.statusCode.toString()[0] === "5") {
        switch (req.method.toUpperCase()) {
          case "GET":
            if (req.url.startsWith("/core/auth-img")) {
              return;
            }
            if (req.url.startsWith("/core/auth-video")) {
              return;
            }

            this.instance.log.info(
              "response",
              `${chalk.bgBlack(chalk.green(" GET "))} ${chalk.bgBlack(chalk.red(` ${res.statusCode} `))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
            );
            break;
          case "POST":
            this.instance.log.info(
              "response",
              `${chalk.bgBlack(chalk.blue(" POS "))} ${chalk.bgBlack(chalk.red(` ${res.statusCode} `))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
            );
            break;
          case "DELETE":
            this.instance.log.info(
              "response",
              `${chalk.bgBlack(chalk.red(" DEL "))} ${chalk.bgBlack(chalk.red(` ${res.statusCode} `))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
            );
            break;
          case "OPTIONS":
            if (this.instance.flags.logOptionsRequests) {
              this.instance.log.info(
                "response",
                `${chalk.bgBlack(chalk.cyan(" OPT "))} ${chalk.bgBlack(chalk.red(` ${res.statusCode} `))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
              );
            }
            break;
          case "PROPFIND":
            this.instance.log.info(
              "response",
              `${chalk.bgBlack(chalk.cyan(" PFI "))} ${chalk.bgBlack(chalk.red(` ${res.statusCode} `))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
            );
            break;
          case "PROPPATCH":
            this.instance.log.info(
              "response",
              `${chalk.bgCyan(chalk.cyan(" PPA "))} ${chalk.bgBlack(chalk.red(` ${res.statusCode} `))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
            );
            break;
          default:
        }
      }
    });

    this.app.addHook("onRequest", async (req, res) => {
      let queryResult = await this.instance.database.query(
        "INSERT INTO public.request_manager_log (request_timestamp, request_method, request_path, request_body) VALUES ($1, $2, $3, $4) RETURNING request_id;",
        [Date.now(), req.method, req.url, req.body],
      );

      res.header("request-id", JSON.stringify(queryResult.rows[0].request_id));

      switch (req.method.toUpperCase()) {
        case "GET":
          if (req.url.startsWith("/core/auth-img")) {
            return;
          }
          if (req.url.startsWith("/core/auth-video")) {
            return;
          }

          this.instance.log.info(
            "request",
            `${chalk.bgBlack(chalk.green(" GET "))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
          );
          break;
        case "POST":
          this.instance.log.info(
            "request",
            `${chalk.bgBlack(chalk.blue(" POS "))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
          );
          break;
        case "DELETE":
          this.instance.log.info(
            "request",
            `${chalk.bgBlack(chalk.red(" DEL "))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
          );
          break;
        case "OPTIONS":
          if (this.instance.flags.logOptionsRequests) {
            this.instance.log.info(
              "request",
              `${chalk.bgBlack(chalk.cyan(" OPT "))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
            );
          }
          break;
        case "PROPFIND":
          this.instance.log.info(
            "request",
            `${chalk.bgBlack(chalk.cyan(" PFI "))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
          );
          break;
        case "PROPPATCH":
          this.instance.log.info(
            "request",
            `${chalk.bgCyan(chalk.cyan(" PPA "))} ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
          );
          break;
        default:
          this.instance.log.error(
            "core_requests",
            `ERROR IN REQUEST LOGGER, UNKNOWN REQUEST TYPE: ${req.method}, ${chalk.bold(req.url)} ${this.instance.flags.logQueryParameters ? JSON.stringify(req.query) !== "{}" && JSON.stringify(req.query) : ""}`,
          );
      }

      return;
    });

    await this.instance.authorization.__internal_authHook(this.app);

    const self = this;
    this.app.after(() => {
      this.publicRoutes.push(/(\/)$/);
      this.app.get("/", async function handler(req, res) {
        if (self.instance.flags.isDevmode) {
          return res.redirect(`http://localhost:5173/login/http://localhost:3563`);
        }

        return res.redirect(`https://yourdash.ewsgit.uk/login/${/* this.globalDb.get("core:this.instanceurl") */ "FIXME: implement this"}`);
      });

      this.publicRoutes.push(/(\/test)$/);
      this.app.get(
        "/test",
        {
          schema: {
            response: {
              200: z.object({
                version: z.object({ major: z.number(), minor: z.number() }),
                type: z.literal("YourDash"),
                status: z.nativeEnum(INSTANCE_STATUS),
              }),
            },
          },
        },
        async () => {
          return {
            version: { major: 0, minor: 1 },
            type: "YourDash" as const,
            status: this.instance.getStatus() || INSTANCE_STATUS.NON_FUNCTIONAL,
          };
        },
      );

      this.publicRoutes.push(/(\/418)$/);
      this.app.get("/418", { schema: { response: { 200: z.string() } } }, async () => {
        return "This is a yourdash instance, not a coffee pot. This server does not implement the Hyper Text Coffee Pot Control Protocol";
      });

      this.publicRoutes.push(/(\/ping)$/);
      this.app.get("/ping", { schema: { response: { 200: z.string() } } }, async () => {
        return "pong";
      });

      this.publicRoutes.push(/(\/core\/test\/self-ping)$/);
      this.app.get("/core/test/self-ping", { schema: { response: { 200: z.object({ success: z.boolean() }) } } }, async () => {
        return { success: true };
      });
    });

    this.publicRoutes.push(/(\/login\/instance\/metadata)$/);
    this.app.get(
      "/login/instance/metadata",
      { schema: { response: { 200: z.object({ title: z.string(), message: z.string(), loginLayout: z.nativeEnum(LoginLayout) }) } } },
      () => {
        return {
          title: "YourDash Instance",
          message: "Placeholder message. Hey system admin, you should change this!",
          loginLayout: LoginLayout.CARDS,
        };
      },
    );

    this.publicRoutes.push(/(\/login\/user\/)[a-zA-z]*/);
    this.app.get(
      "/login/user/:username",
      {
        schema: {
          response: { 200: z.object({ name: z.object({ first: z.string(), last: z.string() }) }), 404: z.object({ error: z.string() }) },
        },
      },
      async (req, res) => {
        const user = new User((req.params as unknown as { username: string }).username);
        if (await user.doesExist()) {
          res.status(200);
          return {
            name: {
              first: await user.getForename(),
              last: await user.getSurname(),
            },
          };
        } else {
          res.status(404);
          return { error: "Unknown user" };
        }
      },
    );

    this.publicRoutes.push(/(\/login\/user\/)[a-zA-Z](\/avatar)$/);
    this.app.get("/login/user/:username/avatar", async (req, res) => {
      const user = new User((req.params as unknown as { username: string }).username);
      if (await user.doesExist()) {
        res.status(200);
        return this.instance.requestManager.sendFile(
          res,
          path.join(this.instance.filesystem.commonPaths.userSystemDirectory(user.username), "avatar128.webp"),
          "image/webp",
        );
      } else {
        return res.status(404);
      }
    });

    this.publicRoutes.push(/(\/login\/user\/authenticate)$/);
    this.app.post(
      "/login/user/authenticate",
      { schema: { body: z.object({ username: z.string(), password: z.string() }) } },
      async (req, res) => {
        const body = req.body as { username: string; password: string };
        const user = new User(body.username);

        if (await user.doesExist()) {
          res.status(200);

          // perform authorization
          let sessionToken = await this.instance.authorization.authenticateUser(body.username, body.password, YourDashSessionType.WEB);

          if (sessionToken === null) {
            res.status(401);
            return { error: "Password did not match." };
          }

          res.cookie("authorization", sessionToken, {
            httpOnly: true,
            maxAge: 7 * 86400,
            path: "/",
            sameSite: "none",
            secure: true,
          });

          return { success: true };
        } else {
          return res.status(404);
        }
      },
    );

    this.publicRoutes.push(/(\/login\/instance\/background)$/);
    this.app.get("/login/instance/background", async (req, res) => {
      res.status(200);
      return this.instance.requestManager.sendFile(
        res,
        path.join(this.instance.filesystem.commonPaths.systemDirectory(), "loginBackground.avif"),
        "image/avif",
      );
    });

    this.app.get(
      "/core/login/notice",
      { schema: { response: { 200: z.object({ author: z.string(), message: z.string(), timestamp: z.number(), display: z.boolean() }) } } },
      async (req, res) => {
        return {
          author: "System",
          message: "This is a sample notice message",
          timestamp: Date.now(),
          display: true,
        };
      },
    );

    this.publicRoutes.push(/(\/login\/is-authenticated)$/);
    this.app.get("/login/is-authenticated", async (req, res) => {
      const authorization = req.cookies["authorization"];

      if (!authorization) return res.status(401).send();

      const [username, sessionToken] = authorization.split(" ");

      if (!(await this.instance.authorization.authorizeUser(username, `${username} ${sessionToken}`))) return res.status(401).send();

      return res.status(200).send();
    });

    this.app.get("/panel/logo/small", async (req, res) => {
      return this.sendFile(res, path.join(this.instance.filesystem.commonPaths.systemDirectory(), "instanceLogo32.webp"), "image/webp");
    });

    this.app.get("/panel/logo/medium", async (req, res) => {
      return this.sendFile(res, path.join(this.instance.filesystem.commonPaths.systemDirectory(), "instanceLogo40.webp"), "image/webp");
    });

    this.app.get("/panel/logo/large", async (req, res) => {
      return this.sendFile(res, path.join(this.instance.filesystem.commonPaths.systemDirectory(), "instanceLogo128.webp"), "image/webp");
    });

    this.app.get(
      "/core/panel/applications",
      {
        schema: {
          response: {
            200: z
              .object({
                id: z.string(),
                displayName: z.string(),
                description: z.string(),
                type: z.literal("frontend").or(z.literal("externalFrontend")),
                endpoint: z.string().optional(),
                url: z.string().optional(),
              })
              .array(),
          },
        },
      },
      async (req, res) => {
        const applications = this.instance.applications.loadedApplications;

        return applications.map((app) => {
          return {
            id: app.__internal_params.id,
            displayName: app.__internal_params.displayName,
            description: app.__internal_params.description,
            type: "frontend",
            endpoint: `/app/a/${app.__internal_params.id}/`,
          };
        });
      },
    );

    this.app.get("/core/panel/applications/app/largeGrid/:applicationId", async (req, res) => {
      const applicationId = (req.params as { applicationId: string }).applicationId;

      const app = this.instance.applications.loadedApplications.find((a) => a.__internal_params.id === applicationId);

      if (!app) return res.status(404);

      if (
        await this.instance.filesystem.doesPathExist(
          path.join(
            this.instance.filesystem.commonPaths.globalCacheDirectory(),
            "panel/applications",
            app.__internal_params.id,
            "largeGridIcon.webp",
          ),
        )
      ) {
        // return this.sendFile(res, path.join(app?.__internal_initializedPath, "./icon.avif"), "image/avif");
        return this.sendFile(
          res,
          path.join(
            this.instance.filesystem.commonPaths.globalCacheDirectory(),
            "panel/applications",
            app.__internal_params.id,
            "largeGridIcon.webp",
          ),
          "image/webp",
        );
      }

      await mkdir(path.join(this.instance.filesystem.commonPaths.globalCacheDirectory(), "panel/applications", app.__internal_params.id), {
        recursive: true,
      });

      if (!await this.instance.filesystem.doesPathExist(path.join(app?.__internal_initializedPath, "./icon.avif"))) {
        return this.sendFile(
          res,
          path.join(
            this.instance.filesystem.commonPaths.globalCacheDirectory(),
            "panel",
            "invalidIcon.webp"
          ),
          "image/webp",
        );
      }

      await resizeImage(
        path.join(app?.__internal_initializedPath, "./icon.avif"),
        88,
        88,
        path.join(
          this.instance.filesystem.commonPaths.globalCacheDirectory(),
          "panel/applications",
          app.__internal_params.id,
          "largeGridIcon.webp",
        ),
        "webp",
      );

      return this.sendFile(
        res,
        path.join(
          this.instance.filesystem.commonPaths.globalCacheDirectory(),
          "panel/applications",
          app.__internal_params.id,
          "largeGridIcon.webp",
        ),
        "image/webp",
      );
    });

    /*
      async (req, res) => {
        res.set("Cache-Control", "no-store");

        const { username, sessionid } = req.headers;

        const panel = new YourDashPanel(username);

        return res.json(
          (
            await Promise.all(
              (await panel.getQuickShortcuts()).map(async (shortcut) => {
                const module = this.core.applicationManager.loadedModules[shortcut.moduleType]?.find(
                  (mod) => mod.config.id === shortcut.id,
                );

                if (!module) {
                  return;
                }

                const RESIZED_ICON_PATH = path.join("cache/modules/icons", `${module.config.id}`, "64.png");

                if (!(await this.core.fs.doesExist(RESIZED_ICON_PATH))) {
                  this.core.log.info("core:panel", `Generating 64x64 icon for ${module.config.id}`);

                  await this.core.fs.createDirectory(path.dirname(RESIZED_ICON_PATH));

                  const resizedIconPath = await this.core.image.resizeTo(
                    this.core.applicationManager.getModuleIcon(shortcut.moduleType, shortcut.id),
                    64,
                    64,
                    "webp",
                  );

                  await this.core.fs.copy(resizedIconPath, RESIZED_ICON_PATH);
                  await this.core.fs.removePath(resizedIconPath);
                }

                let isOfficialFrontend: "frontend" | "officialFrontend" = "officialFrontend";

                // @ts-ignore
                if (module.config.url || module.config.devUrl) {
                  isOfficialFrontend = "frontend";
                }

                return {
                  name: module?.config.displayName || "Undefined name",
                  module: shortcut,
                  icon: this.core.image.createAuthenticatedImage(username, sessionid, AUTHENTICATED_IMAGE_TYPE.FILE, RESIZED_ICON_PATH),
                  // @ts-ignore
                  url: (isOfficialFrontend === "officialFrontend"
                    ? `/app/a/${module.config.id}`
                    : this.core.isDevMode
                      ? // @ts-ignore
                        module?.config?.devUrl! || ""
                      : // @ts-ignore
                        module?.config?.url! || "") as string,
                };
              }),
            )
          ).filter((x) => x !== undefined),
        );
      },
    );
    */

    this.app.get(
      "/core/panel/quick-shortcuts",
      {
        schema: {
          response: {
            200: z.object({ displayName: z.string(), id: z.string(), endpoint: z.string().optional(), url: z.string().optional() }).array(),
          },
        },
      },
      async (req, res) => {
        const username = this.getRequestUsername();
        const query = await this.instance.database.query("SELECT pinned_applications FROM panel_configuration WHERE username = $1", [
          username,
        ]);

        const pinnedApplications: YourDashApplication[] = query.rows[0].pinned_applications.map((a: string) =>
          this.instance.applications.loadedApplications.find((i) => i.__internal_params.id === a),
        );

        return pinnedApplications.map((app) => {
          if (app.__internal_params.frontend) {
            return {
              displayName: app.__internal_params.displayName,
              id: app.__internal_params.id,
              endpoint: `/app/a/${app.__internal_params.id}`,
            };
          }

          return {
            displayName: app.__internal_params.displayName,
            id: app.__internal_params.id,
            url: app.__internal_params.externalFrontend?.url || "example.com",
          };
        });
      },
    );

    this.app.get("/core/panel/quick-shortcut/icon/:applicationId", async (req, res) => {
      const applicationId = (req.params as { applicationId: string }).applicationId;

      const app = this.instance.applications.loadedApplications.find((a) => a.__internal_params.id === applicationId);

      if (!app) return res.status(404);

      if (
        await this.instance.filesystem.doesPathExist(
          path.join(
            this.instance.filesystem.commonPaths.globalCacheDirectory(),
            "panel/applications",
            app.__internal_params.id,
            "quickShortcut.webp",
          ),
        )
      ) {
        // return this.sendFile(res, path.join(app?.__internal_initializedPath, "./icon.avif"), "image/avif");
        return this.sendFile(
          res,
          path.join(
            this.instance.filesystem.commonPaths.globalCacheDirectory(),
            "panel/applications",
            app.__internal_params.id,
            "quickShortcut.webp",
          ),
          "image/webp",
        );
      }

      await mkdir(path.join(this.instance.filesystem.commonPaths.globalCacheDirectory(), "panel/applications", app.__internal_params.id), {
        recursive: true,
      });

      await resizeImage(
        path.join(app?.__internal_initializedPath, "./icon.avif"),
        88,
        88,
        path.join(
          this.instance.filesystem.commonPaths.globalCacheDirectory(),
          "panel/applications",
          app.__internal_params.id,
          "quickShortcut.webp",
        ),
        "webp",
      );

      return this.sendFile(
        res,
        path.join(
          this.instance.filesystem.commonPaths.globalCacheDirectory(),
          "panel/applications",
          app.__internal_params.id,
          "quickShortcut.webp",
        ),
        "image/webp",
      );
    });

    this.app.post(
      "/core/panel/quick-shortcuts/create",
      {
        schema: {
          body: z.object({
            id: z.string(),
          }),
          response: {
            200: z.object({
              success: z.boolean(),
            }),
          },
        },
      },
      async (req, res) => {
        const applicationId = (req.body as { id: string }).id;
        const username = this.getRequestUsername();

        if (this.instance.applications.loadedApplications.find((i) => i.__internal_params.id === applicationId)) {
          try {
            const previousPins = await this.instance.database.query(
              "SELECT pinned_applications FROM panel_configuration WHERE username = $1;",
              [username],
            );

            if (previousPins.rows[0].pinned_applications.includes(applicationId)) return { success: false };

            const newPins = [...previousPins.rows[0].pinned_applications, applicationId];

            await this.instance.database.query("UPDATE panel_configuration SET pinned_applications = $2 WHERE username = $1;", [
              username,
              newPins,
            ]);
            return { success: true };
          } catch (error) {
            return { success: false };
          }
        }
      },
    );
  }

  // start listening for requests
  // once called, no more routes may be defined
  async __internal_beginListening() {
    try {
      await this.app.ready();
      await this.app.listen({ port: this.instance.flags.port });
      this.instance.log.info(
        "request_manager",
        `YourDash ReSrc Instance Backend Online & listening at ${this.instance.log.addEmphasisToString(`port "${this.instance.flags.port}"`)}`,
      );

      this.instance.log.info("request_manager", `Attempting to ping self`);
      fetch(`http://localhost:${this.instance.flags.port}/core/test/self-ping`)
        .then((res) => res.json())
        // @ts-ignore
        .then((data: { success?: boolean }) => {
          if (data?.success) {
            this.instance.setStatus(INSTANCE_STATUS.OK);
            return this.instance.log.success("self_ping_test", "self ping successful - The server is receiving requests");
          }

          console.log(data);
          this.instance.log.error("request_manager", "CRITICAL ERROR!, unable to ping self");
        })
        .catch(() => {
          this.instance.log.error("request_manager", "CRITICAL ERROR!, unable to ping self");
        });
    } catch (err) {
      this.instance.log.error("request_manager", err);
      console.error(err);
      process.exit(1);
    }
  }

  getRequestUsername() {
    // @ts-ignore
    return requestContext.get("username") as string;
  }
}

export default RequestManager;
