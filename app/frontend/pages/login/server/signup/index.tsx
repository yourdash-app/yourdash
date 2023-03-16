import { useRouter } from "next/router";
import { useState } from "react";
import Chiplet from "~/chipletui";
import HomeLayout from "../../../../layouts/homeLayout/HomeLayout";
import { NextPageWithLayout } from "../../../page";
import styles from "./index.module.scss";

const LoginOptions: NextPageWithLayout = () => {

  // const [ userName, setUserName ] = useState("")
  // const [ password, setPassword ] = useState("")
  // const [ errorHasOccurred, setErrorHasOccurred ] = useState(false)
  const [ allowsSignUp, /* setAllowsSignUp */ ] = useState(false)

  const router = useRouter()

  return (
    <div className={ styles.root }>
      <Chiplet.Card>
        <Chiplet.Column style={ { alignItems: "center", } }>
          {
                !allowsSignUp && (
                <>
                  <h2 style={ { margin: 0 } }>We&apos;re sorry</h2>
                  <p>This server isn&apos;t currently allowing users to sign up.</p>
                  <Chiplet.Row style={ { marginTop: "0.5rem" } }>
                    <Chiplet.Button
                      onClick={ () => {
                              localStorage.removeItem("currentServer")
                              router.push("/login")
                            } }
                      vibrant
                    >
                      Select a different instance
                    </Chiplet.Button>
                    <Chiplet.Button onClick={ () => {
                          router.push(`/login/server`)
                        } }
                    >
                      Go back
                    </Chiplet.Button>
                  </Chiplet.Row>
                </>
                )
            }
        </Chiplet.Column>
      </Chiplet.Card>
    </div>
  );
};

export default LoginOptions;

LoginOptions.getLayout = page => {
  return <HomeLayout>{page}</HomeLayout>
}
