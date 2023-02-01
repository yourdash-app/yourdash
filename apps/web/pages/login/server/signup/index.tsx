import { useRouter } from "next/router";
import { useState } from "react";
import Card from "../../../../components/containers/card/Card";
import ColContainer from "../../../../components/containers/ColContainer/ColContainer";
import Button from "../../../../components/elements/button/SegmentButton";
import TextInput from "../../../../components/elements/textInput/TextInput";
import HomeLayout from "../../../../components/layouts/homeLayout/HomeLayout";
import { NextPageWithLayout } from "../../../page";
import styles from "./index.module.scss";
import RowContainer from "../../../../components/containers/row/row";

const LoginOptions: NextPageWithLayout = () => {

  // const [ userName, setUserName ] = useState("")
  // const [ password, setPassword ] = useState("")
  // const [ errorHasOccurred, setErrorHasOccurred ] = useState(false)
  const [ allowsSignUp, /* setAllowsSignUp */ ] = useState(false)

  const router = useRouter()

  return (
    <div className={ styles.root }>
      <Card>
        <ColContainer style={ { alignItems: "center", } }>
          {
              !allowsSignUp ? (
                <>
                  <h2 style={ { margin: 0 } }>We&apos;re sorry</h2>
                  <p>This server isn&apos;t currently allowing users to sign up.</p>
                  <RowContainer style={ { marginTop: "0.5rem" } }>
                    <Button
                      onClick={ () => {
                      localStorage.removeItem("currentServer")
                      router.push("/login")
                    } }
                      vibrant
                    >
                      Select a different instance
                    </Button>
                    <Button onClick={ () => {
                      router.push(`/login/server`)
                    } }
                    >
                      Go back
                    </Button>
                  </RowContainer>
                </>
              )
                : (
                  <>
                    <TextInput/>
                    <TextInput/>
                  </>
              )}
        </ColContainer>
      </Card>
    </div>
  );
};

export default LoginOptions;

LoginOptions.getLayout = page => {
  return <HomeLayout>{page}</HomeLayout>
}
