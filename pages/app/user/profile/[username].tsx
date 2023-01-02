import { useEffect, useState } from 'react';
import { NextPageWithLayout } from '../../../page';
import SERVER, { verifyAndReturnJson } from '../../../../lib/server';
import styles from "./username.module.scss"
import { useRouter } from 'next/router';
import ColContainer from '../../../../components/containers/ColContainer/ColContainer';
import Card from '../../../../components/containers/card/Card';
import Button from '../../../../components/elements/button/Button';
import Icon from '../../../../components/elements/icon/Icon';
import AppLayout from '../../../../components/layouts/appLayout/AppLayout';

const Username: NextPageWithLayout = () => {
  const router = useRouter()

  const username = router.query.username

  const [ user, setUser ] = useState(undefined)
  const [ profileError, setProfileError ] = useState(false)
  
  useEffect(() => {
    verifyAndReturnJson(
      SERVER.get(`/core/`),
      (data) => {
        setUser(data)
      },
      () => {
        console.error("unable to fetch user profile")
        setProfileError(true)
      }
    )
  }, [])

  if (profileError)
    return <Card className={styles.errorPopup}>
      <ColContainer>
        <Icon color="var(--card-fg)" name="server-error"></Icon>
        <h3>Error</h3>
        <p>
        The user &quot;{username}&quot; was not found
        </p>
        <Button
          onClick={() => {
            router.push(`/app/dash`)
          }}>
        Go back
        </Button>
      </ColContainer>
    </Card>

  if (!user)
    return <></>

  return (
    <>
      <section data-hero style={{ backgroundImage: "" }}></section>
      <section data-header>
        <img src="" alt="" />
        <div data-name-container>
          <h1 data-name>Username</h1>
          <span data-username></span>
        </div>
        <div data-socials>
          <div>
            <img src="" alt="" />
            <span>social name</span>
          </div>
        </div>
      </section>
      <section data-description>
        <p>user description</p>
      </section>
      <section data-badges>
        <div>
          <img src="" alt="" />
          <span>user achievement badge</span>
        </div>
      </section>
      <section data-organizations>
        <div>
          <img src="" alt="" />
          <span>organization name</span>
        </div>
      </section>
    </>
  );
};

export default Username;

Username.getLayout = (page) => <>
  <AppLayout>
    {page}
  </AppLayout>
</>