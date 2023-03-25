import HomeLayout from "../layouts/homeLayout/HomeLayout"
import { NextPageWithLayout } from "./page"
import Chiplet from "~/frontend/chipletui";
import styles from "./404.module.scss"

const FourZeroFourPage: NextPageWithLayout = () => {
  return (
      <Chiplet.Column className={styles.root}>
        <Chiplet.Card>
          <Chiplet.Column>
            <h1 className={styles.title}>YourDash</h1>
            <p className={styles.subtitle}>Page not found</p>
            <Chiplet.ButtonLink href={"/"}>Home</Chiplet.ButtonLink>
          </Chiplet.Column>
        </Chiplet.Card>
      </Chiplet.Column>
  )
}

export default FourZeroFourPage;

FourZeroFourPage.getLayout = page => {
  return <HomeLayout>{page}</HomeLayout>
}
