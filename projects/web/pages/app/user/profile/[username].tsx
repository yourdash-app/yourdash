import { useEffect, useState } from 'react';
import { NextPageWithLayout } from '../../../page';
import SERVER, { verifyAndReturnJson } from '../../../../server';
import styles from "./username.module.scss"
import { useRouter } from 'next/router';
import AppLayout from '../../../../layouts/appLayout/AppLayout';
import Chiplet from "ui";

const Username: NextPageWithLayout = () => {
  const router = useRouter()

  const username = router.query.username

  const [ user, setUser ] = useState(undefined)
  const [ profileError, setProfileError ] = useState(false)

  useEffect(() => {
    verifyAndReturnJson(
        SERVER.get(`/core/`),
        data => {
          setUser(data)
        },
        () => {
          console.error("unable to fetch user profile")
          setProfileError(true)
        }
    )
  }, [])

  if (profileError)
    return (
      <Chiplet.Card className={ styles.errorPopup }>
        <Chiplet.Column>
          <Chiplet.Icon color="var(--card-fg)" name="server-error"/>
          <h3>Error</h3>
          <p>
            The user &quot;{username}&quot; was not found
          </p>
          <Chiplet.Button
            onClick={ () => {
                  router.push(`/app/dash`)
                } }
          >
            Go back
          </Chiplet.Button>
        </Chiplet.Column>
      </Chiplet.Card>
    )

  if (!user)
    return <div/>

  return (
    <>
      <section data-hero="true" style={ { backgroundImage: "" } }/>
      <section data-header="true">
        <img src="" alt=""/>
        <div data-name-container="true">
          <h1 data-name="true">Username</h1>
          <span data-username="true"/>
        </div>
        <div data-socials="true">
          <div>
            <img src="" alt=""/>
            <span>social name</span>
          </div>
        </div>
      </section>
      <section data-description="true">
        <p>user description</p>
      </section>
      <section data-badges="true">
        <div>
          <img src="" alt=""/>
          <span>user achievement badge</span>
        </div>
      </section>
      <section data-organizations="true">
        <div>
          <img src="" alt=""/>
          <span>organization name</span>
        </div>
      </section>
    </>
  );
};

export default Username;

Username.getLayout = page => {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}