import Icon from 'ui/icon/Icon';

import { NextPageWithLayout } from "../page";

import HomeLayout from "../../layouts/homeLayout/HomeLayout";

import styles from './index.module.scss'

const Projects: NextPageWithLayout = () =>

    // const router = useRouter()

    (
      <div className={styles.root}>
        <section className={styles.hero}>
          <h1>Projects</h1>
          <p>Other projects part of YourDash</p>
        </section>
        <main>
          <div style={{ backgroundImage: "url(/background.jpg)" }}>
            <h2>Code Engine</h2>
            <section>
              <Icon
                name='heart-fill-16'
                style={{
                      aspectRatio: "1/1",
                      width: "1rem",
                    }}
                color={"#f02434"}
              />
              <span>1234</span>
            </section>
          </div>
        </main>
      </div>
    )
;

export default Projects;

Projects.getLayout = page => <HomeLayout>{page}</HomeLayout>
