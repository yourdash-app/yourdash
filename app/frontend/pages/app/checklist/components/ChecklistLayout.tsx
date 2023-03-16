import React from "react";
import styles from "./ChecklistLayout.module.scss";
import { useRouter } from "next/router";
import Chiplet from "~/chipletui";

const ChecklistLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    // const [ personalLists, setPersonalLists ] = useState([])
    // const [ organizations, setOrganizations ] = useState([] as YourDashOrganization[])

    return (
        <div className={styles.root}>
            <Chiplet.SideBar
                className={styles.sideBar}
                title="YourDash Tasks"
                items={[
                    {
                        icon: "apps-16",
                        label: "Home",
                        onClick: () => {
                            router.push(`/app/checklist/`);
                        },
                    },

                    /* { type: "separator", },
                {
                  icon: "person-16",
                  items: [],
                  name: "Personal",
                  type: "category",
                },
                {
                  icon: "app-launcher-16",
                  items: organizations.map((org) => {
                    return {
                      icon: org.icon,
                      name: org.name,
                      onClick: () => {
                        router.push(`/app/checklist/organization/`)
                      },
                      type: "button"
                    }
                  }),
                  name: "Organizations",
                  type: "category",
                }
                */
                ]}
            />
            <div className={styles.page}>{children}</div>
        </div>
    );
};

export default ChecklistLayout;
