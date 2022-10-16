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

import React from "react"
import ColContainer from "../../components/containers/ColContainer/ColContainer";
import CardButton from "../../components/elements/cardButton/CardButton";
import Card from "../../components/elements/card/Card";
import { NextPageWithLayout } from "../page";
import styles from "./options.module.css"
import { useRouter } from "next/router";
import HomeLayout from "../../components/layouts/homeLayout/HomeLayout";

const LoginOptions: NextPageWithLayout = () => {
  const router = useRouter()
  return (
    <div className={styles.root}>
      <Card>
        <ColContainer>
          <h1 className={styles.title}>Please choose a login option to continue.</h1>
          <CardButton icon="mark-github-16" onClick={() => { router.push("/login/github") }}>Github</CardButton>
          <CardButton icon="key-16" onClick={() => { router.push("/login/ghtoken") }}>Github Auth Token</CardButton>
          <CardButton icon="arrow-left-16" onClick={() => { router.push("/") }}>Go Back</CardButton>
        </ColContainer>
      </Card> 
    </div>
  );
};

export default LoginOptions;

LoginOptions.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>
}