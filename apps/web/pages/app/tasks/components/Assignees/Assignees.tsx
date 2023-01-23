import React, { useEffect, useState } from "react"
import SERVER, { verifyAndReturnJson } from "../../../../../lib/server"
import { TaskAssignee } from "../../../../../types/tasks/taskAssignee"
import styles from "./Assignees.module.scss"

export interface IAssignees {
  assignees: string[]
}

const Assignees: React.FC<IAssignees> = ({ assignees }) => {
  const [ assigneesData, setAssigneesData ] = useState([] as TaskAssignee[])

  useEffect(() => {
    setAssigneesData([])
    const result: TaskAssignee[] = []
    assignees.map((assignee, ind) => {
      verifyAndReturnJson(SERVER.get(`/tasks/assignee/${assignee}`),
        (data: TaskAssignee) => {
          result.push(data)

          if ((ind + 1) === assignees.length) {
            if (result.length !== assignees.length) {
              setTimeout(() => {
                if (result.length !== assignees.length) {
                  setTimeout(() => {
                    if (result.length !== assignees.length) {
                      console.error(`error fetching assignees`)
                      setAssigneesData([])
                    } else {
                      setAssigneesData(result)
                    }
                  }, 500)
                } else {
                  setAssigneesData(result)
                }
              }, 250)
            } else {
              setAssigneesData(result)
            }
          }

          return
        },
        () => {
          console.error(`no user named '${assignee}'`)
        })
    })
  }, [ assignees ])

  return <div className={styles.component}>
    {assigneesData.map((assignee, ind) => {
      return <div key={ind} className={styles.assignee}>
        <img src={assignee.profile.image} alt="" />
        <span>{assignee.name}</span>
      </div>
    })}
  </div>
}

export default Assignees
