import { NextPageWithLayout } from "../../page";
import AppLayout from "../../../layouts/appLayout/AppLayout";
import Chiplet from "ui";
import styles from "./index.module.scss"

const WhiteboardIndex: NextPageWithLayout = () => {
  return (
    <div>
      <Chiplet.Carousel compactControls>
        <Chiplet.Row className={ styles.templatePage }>
          <Chiplet.Card onClick={ () => {
              return 0
            } }
          >
            <span>name</span>
          </Chiplet.Card>
          <Chiplet.Card onClick={ () => {
              return 0
            } }
          >
            <span>name</span>
          </Chiplet.Card>
          <Chiplet.Card onClick={ () => {
              return 0
            } }
          >
            <span>name</span>
          </Chiplet.Card>
        </Chiplet.Row>
        <Chiplet.Row className={ styles.templatePage }>
          <Chiplet.Card onClick={ () => {
              return 0
            } }
          >
            <span>name</span>
          </Chiplet.Card>
          <Chiplet.Card onClick={ () => {
              return 0
            } }
          >
            <span>name</span>
          </Chiplet.Card>
          <Chiplet.Card onClick={ () => {
              return 0
            } }
          >
            <span>name</span>
          </Chiplet.Card>
        </Chiplet.Row>
        <Chiplet.Row className={ styles.templatePage }>
          <Chiplet.Card onClick={ () => {
              return 0
            } }
          >
            <span>name</span>
          </Chiplet.Card>
          <Chiplet.Card onClick={ () => {
              return 0
            } }
          >
            <span>name</span>
          </Chiplet.Card>
          <Chiplet.Card onClick={ () => {
              return 0
            } }
          >
            <span>name</span>
          </Chiplet.Card>
        </Chiplet.Row>
      </Chiplet.Carousel>
    </div>
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
