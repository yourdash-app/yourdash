import { NextPageWithLayout } from "../../page";
import AppLayout from "../../../layouts/appLayout/AppLayout";
import Chiplet from "ui";
import styles from "./index.module.scss"

const WhiteboardIndex: NextPageWithLayout = () => {
  return (
      <main className={styles.root}>

        <Chiplet.Column>
          <h2 className={styles.sectionTitle}>Templates</h2>
          <Chiplet.Carousel className={styles.templateSection} compactControls>
            <Chiplet.Row className={styles.templateContent}>
              <Chiplet.Card onClick={() => {
                return 0
              }}
              >
                <span>name</span>
              </Chiplet.Card>
              <Chiplet.Card onClick={() => {
                return 0
              }}
              >
                <span>name</span>
              </Chiplet.Card>
              <Chiplet.Card onClick={() => {
                return 0
              }}
              >
                <span>name</span>
              </Chiplet.Card>
            </Chiplet.Row>
            <Chiplet.Row className={styles.templateContent}>
              <Chiplet.Card onClick={() => {
                return 0
              }}
              >
                <span>name</span>
              </Chiplet.Card>
              <Chiplet.Card onClick={() => {
                return 0
              }}
              >
                <span>name</span>
              </Chiplet.Card>
              <Chiplet.Card onClick={() => {
                return 0
              }}
              >
                <span>name</span>
              </Chiplet.Card>
            </Chiplet.Row>
            <Chiplet.Row className={styles.templateContent}>
              <Chiplet.Card onClick={() => {
                return 0
              }}
              >
                <span>name</span>
              </Chiplet.Card>
              <Chiplet.Card onClick={() => {
                return 0
              }}
              >
                <span>name</span>
              </Chiplet.Card>
              <Chiplet.Card onClick={() => {
                return 0
              }}
              >
                <span>name</span>
              </Chiplet.Card>
            </Chiplet.Row>
          </Chiplet.Carousel>
          <h2 className={styles.sectionTitle}>Recents</h2>
          <div className={styles.recents}>
            <Chiplet.Card
                onClick={() => {
                  return 0
                }}
            >
              <img src={require("./../../../public/assets/productLogos/yourdash.svg").default.src} alt=""/>
              <span>name</span>
            </Chiplet.Card>
            <Chiplet.Card
                onClick={() => {
                  return 0
                }}
            >
              <img src={require("./../../../public/assets/productLogos/yourdash.svg").default.src} alt=""/>
              <span>name</span>
            </Chiplet.Card>
            <Chiplet.Card
                onClick={() => {
                  return 0
                }}
            >
              <img src={require("./../../../public/assets/productLogos/yourdash.svg").default.src} alt=""/>
              <span>name</span>
            </Chiplet.Card>
            <Chiplet.Card
                onClick={() => {
                  return 0
                }}
            >
              <img src={require("./../../../public/assets/productLogos/yourdash.svg").default.src} alt=""/>
              <span>name</span>
            </Chiplet.Card>
            <Chiplet.Card
                onClick={() => {
                  return 0
                }}
            >
              <img src={require("./../../../public/assets/productLogos/yourdash.svg").default.src} alt=""/>
              <span>name</span>
            </Chiplet.Card>
            <Chiplet.Card
                onClick={() => {
                  return 0
                }}
            >
              <img src={require("./../../../public/assets/productLogos/yourdash.svg").default.src} alt=""/>
              <span>name</span>
            </Chiplet.Card>
            <Chiplet.Card
                onClick={() => {
                  return 0
                }}
            >
              <img src={require("./../../../public/assets/productLogos/yourdash.svg").default.src} alt=""/>
              <span>name</span>
            </Chiplet.Card>
          </div>
        </Chiplet.Column>
      </main>
  )
}

export default WhiteboardIndex

WhiteboardIndex.getLayout = page => {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}
