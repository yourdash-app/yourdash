import { NextPageWithLayout } from './../page';
import HomeLayout from '../../components/layouts/homeLayout/HomeLayout';
import Icon from '../../components/elements/icon/Icon';

const Projects: NextPageWithLayout = () => {

  // const router = useRouter()

  return (
    <>
      <h1>Projects</h1>
      <p>Other projects part of YourDash</p>
      <main>
        <div>
          <img src="" alt="" />
          <h1>Code Engine</h1>
          <section>
            <Icon
              name='heart-16'
              style={{
                width: "1rem", aspectRatio: "1/1"
              }}
              color={"#ffffff"} />
            <span>1234</span>
          </section>
        </div>
      </main>
    </>
  );
};

export default Projects;

Projects.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>
}