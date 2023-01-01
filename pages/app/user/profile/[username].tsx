import { NextPageWithLayout } from '../../../page';

const AppIndex: NextPageWithLayout = () => {
  return (
    <>
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
          <span></span>
        </div>
      </section>
      <section data-organizations>
        <div>
          <img src="" alt="" />
        </div>
      </section>
    </>
  );
};

export default AppIndex;