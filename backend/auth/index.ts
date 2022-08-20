/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import express from "express";
import fetch from "node-fetch";
import cors from "cors";
// @ts-ignore
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cors());

// online test
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World! - DevDash Auth Api.");
});

// GitHub auth
app.get("/auth/github", (req, res) => {
  let hostRes = req.query.url;
  res.cookie("authUrlCallback", hostRes);
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=http://${req.headers.host}/auth/callback`
  );
});

// GitHub auth callback
app.get(
  "/auth/callback",
  (
    req: {
      query: { code: string };
      cookies: {
        authUrlCallback: string;
      };
    },
    res
  ) => {
    const code = req.query.code;

    fetch(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(res => res.json())
      .then((json: { access_token: string }) => {
        const accessToken = json.access_token;
        if (accessToken) {
          res.redirect(req.cookies.authUrlCallback + `?token=${accessToken}`);
        } else {
          res.redirect(req.cookies.authUrlCallback + `/error/githubAuth`);
        }
      });
  }
);

// Start Express server
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
