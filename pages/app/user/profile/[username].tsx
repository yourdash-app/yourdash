import { useEffect, useState } from 'react';
import { NextPageWithLayout } from '../../../page';
import SERVER, { verifyAndReturnJson } from '../../../../lib/server';

const AppIndex: NextPageWithLayout = () => {
  const [ user, setUser ] = useState(undefined)
  
  useEffect(() => {
    verifyAndReturnJson(
      SERVER.get(`/core/`),
      (data) => {
        setUser(data)
      },
      () => {
        console.error("unable to fetch user profile")
      }
    )
  }, [])

  if (!user) return <></>

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

export default AppIndex;