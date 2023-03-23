import React, { useEffect, useState } from "react";
import SERVER, { verifyAndReturnJson } from "../../../../../server";
import styles from "./Assignees.module.scss";

export interface IAssignees {
    assignees: string[];
}

const Assignees: React.FC<IAssignees> = ({ assignees }) => {
    const [assigneesData, setAssigneesData] = useState([] as any[]);

    useEffect(() => {
        setAssigneesData([]);
        const result: any[] = [];
        assignees.map((assignee, ind) => {
            verifyAndReturnJson(
                SERVER.get(`/checklist/assignee/${assignee}`),
                (data: any) => {
                    result.push(data);

                    if (ind + 1 === assignees.length) {
                        if (result.length !== assignees.length) {
                            setTimeout(() => {
                                if (result.length !== assignees.length) {
                                    setTimeout(() => {
                                        if (result.length !== assignees.length) {
                                            console.error(`error fetching assignees`);
                                            setAssigneesData([]);
                                        } else {
                                            setAssigneesData(result);
                                        }
                                    }, 500);
                                } else {
                                    setAssigneesData(result);
                                }
                            }, 250);
                        } else {
                            setAssigneesData(result);
                        }
                    }

                    return;
                },
                () => {
                    console.error(`no user named '${assignee}'`);
                }
            );
        });
    }, [assignees]);

    return (
        <div className={styles.component}>
            {assigneesData.map((assignee) => {
                return (
                    <div key={assignee.userName} className={styles.assignee}>
                        <img src={assignee.profile.image} alt="" />
                        <span>{assignee.name}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default Assignees;
