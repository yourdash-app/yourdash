import Chiplet from 'ui';
import AppLayout from '../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import styles from "./index.module.scss"
import { useEffect, useState } from "react";

const TasksIndex: NextPageWithLayout = () => {
  const [ fullName, setFullName ] = useState("")

  useEffect(() => {
    setFullName()
  }, [])

  return (
    <div className={ styles.root }>
      <Chiplet.Column className={ styles.sidebar }>
        <h1>YourDash Flow</h1>
        <div className={ styles.sidebarCollapsibleButtons }>
          <Chiplet.Button>
            Create
          </Chiplet.Button>
          <Chiplet.Button>
            Create from template
          </Chiplet.Button>
        </div>
        <Chiplet.Button>
          Open File
        </Chiplet.Button>
      </Chiplet.Column>
      <section className={ styles.main }>
        <h1>Welcome back, </h1>
        <Chiplet.Column className={ styles.recentProjects }>
          <Chiplet.Card onClick={ () => {
              return 0
            } }
          >
            <span>Project 0</span>
          </Chiplet.Card>
          <Chiplet.Card onClick={ () => {
              return 0
            } }
          >
            <span>Project 1</span>
          </Chiplet.Card>
          <Chiplet.Card onClick={ () => {
              return 0
            } }
          >
            <span>Project 2</span>
          </Chiplet.Card>
          <Chiplet.Card onClick={ () => {
              return 0
            } }
          >
            <span>Project 3</span>
          </Chiplet.Card>
        </Chiplet.Column>
      </section>
    </div>
  )

};

export default TasksIndex;

TasksIndex.getLayout = page => {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}
