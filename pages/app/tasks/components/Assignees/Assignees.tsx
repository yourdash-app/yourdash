import React, { useEffect, useState } from "react"
import SERVER, { verifyAndReturnJson } from "../../../../../lib/server"
import { TaskAssignee } from "../../../../../types/tasks/taskAssignee"

export interface IAssignees {
  assignees: string[]
}

const Assignees: React.FC<IAssignees> = ({ assignees }) => {
  const [ assigneesData, setAssigneesData ] = useState(null as TaskAssignee[] | null)

  useEffect(() => {
    assignees.forEach((assignee) => {
      verifyAndReturnJson(SERVER.get(`/tasks/assignee/${assignee}`),
        (data: TaskAssignee) => {
          if (!assigneesData)
            return setAssigneesData([ data ])

          setAssigneesData([ ...assigneesData, data ])
        },
        () => {
          console.error(`no user named '${assignee}'`)
        })
    })
  }, [])

  if (!assigneesData) return <div></div>

  return <div>
    {assigneesData.map((assignee) => {
      return <div>
        <img src={assignee.profile.picture} />
        <span>{assignee.name}</span>
      </div>
    })}
  </div>
}

export default Assignees
