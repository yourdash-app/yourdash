import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../../../page";
import SERVER, { verifyAndReturnJson } from "../../../../server";
import styles from "./username.module.scss";
import { useRouter } from "next/router";
import AppLayout from "../../../../layouts/appLayout/AppLayout";
import Chiplet from "ui";
import { YourDashUser } from "../../../../../../packages/types/core/user";

const Username: NextPageWithLayout = () => {
    const router = useRouter();

    const username = router.query.username;

    const [user, setUser] = useState(null as null | YourDashUser);
    const [profileError, setProfileError] = useState(false);

    useEffect(() => {
        return setUser({
            name: { first: "admin", last: "istrator" },
            userName: "admin",
            permissions: [7],
            profile: {
                description: "this is a description",
                banner: "",
                externalLinks: {},
                image: "",
                location: { value: "", public: true },
                status: "",
            },
            quota: 1000,
            version: "1",
        });

        verifyAndReturnJson(
            SERVER.get(`/core/profile/user/${username}`),
            (data) => {
                setUser(data);
            },
            () => {
                console.error("unable to fetch user profile");
                setProfileError(true);
            }
        );
    }, [username]);

    if (profileError || !user)
        return (
            <Chiplet.Dialog visible={true} className={styles.errorPopup}>
                <Chiplet.Column>
                    <Chiplet.Icon color="var(--card-fg)" name="server-error" />
                    <h3>Error</h3>
                    <p>The user &quot;{username}&quot; was not found</p>
                    <Chiplet.Button
                        onClick={() => {
                            router.push(`/app/dash`);
                        }}
                    >
                        Go back
                    </Chiplet.Button>
                </Chiplet.Column>
            </Chiplet.Dialog>
        );

    // TODO: re-write this dummy layout
    return (
        <>
            <section data-hero="true" style={{ backgroundImage: "" }} />
            <section data-header="true">
                <img src="" alt="" />
                <div data-name-container="true">
                    <h1 data-name="true">{user.userName}</h1>
                    <span data-username="true" />
                </div>
                <div data-socials="true">
                    <div>
                        <img src="" alt="" />
                        <span>
                            {user.name.first} {user.name.last}
                        </span>
                    </div>
                </div>
            </section>
            <section data-description="true">
                <p>{user.profile.description}</p>
            </section>
            <section data-badges="true">
                <div>
                    <img src="" alt="" />
                    <span>user achievement badges</span>
                </div>
            </section>
            <section data-organizations="true">
                <div>
                    <img src="" alt="" />
                    <span>organization name</span>
                </div>
            </section>
        </>
    );
};

export default Username;

Username.getLayout = (page) => {
    return <AppLayout>{page}</AppLayout>;
};
