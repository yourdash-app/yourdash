/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import useYourDashLib from "@yourdash/shared/web/helpers/ydsh";
import Button from "@yourdash/chiplet/components/button/Button";
import Card from "@yourdash/chiplet/components/card/Card";
import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton";
import Row from "@yourdash/chiplet/components/row/Row";
import TextBox from "@yourdash/chiplet/components/textBox/TextBox";
import TextInput from "@yourdash/chiplet/components/textInput/TextInput";
import React, { useEffect } from "react";
import coreCSI, { TJson } from "@yourdash/csi/coreCSI";
import BasePageLayout from "../../components/BasePageLayout";
import UserLinkEditor from "./components/UserLinkEditor";
import UserPreview, { IUserPreview } from "./components/UserPreview";

const ProfileIndexPage: React.FC = () => {
  const ydsh = useYourDashLib();
  const [userData, setUserData] = React.useState<IUserPreview>({
    name: { first: "Admin", last: "Istrator" },
    avatar: "abc",
    username: "admin",
    bio: "This is the user's sample bio",
    links: [{ url: "https://github.com/yourdash/yourdash", label: "Click me" }],
  });

  useEffect(() => {
    // get the user's data
    coreCSI.getText("/core/user/current/avatar/original", (resp: string) => {
      setUserData({ ...userData, avatar: `${coreCSI.getInstanceUrl()}${resp}` });
    });
  }, []);

  return (
    <BasePageLayout title={"Profile"}>
      <section className={"grid grid-cols-[auto,1fr] w-full col-span-2 gap-4"}>
        <div className={"h-full flex items-center justify-center"}>
          <UserPreview
            name={userData.name}
            avatar={userData.avatar}
            username={userData.username}
            bio={userData.bio}
            links={userData.links}
          />
        </div>
        <Card className={"gap-4 flex flex-col child:w-full"}>
          <h2 className={"-mb-2 font-semibold text-2xl"}>Name</h2>
          <Row className={"child:flex-grow"}>
            <TextInput
              accessibleName="First name"
              onChange={(value) => {
                setUserData({
                  ...userData,
                  name: { ...userData.name, first: value },
                });
              }}
              defaultValue={userData.name.first}
              label={"FirstName"}
            />
            <TextInput
              accessibleName="Last name"
              onChange={(value) => {
                setUserData({
                  ...userData,
                  name: { ...userData.name, last: value },
                });
              }}
              defaultValue={userData.name.last}
              label={"LastName"}
            />
          </Row>
          <TextInput
            accessibleName="Username"
            onChange={(value) => {
              setUserData({ ...userData, username: value });
            }}
            defaultValue={userData.username}
            label={"username"}
          />
          <h2 className={"-mb-4 font-semibold text-2xl"}>Bio</h2>
          <TextBox
            defaultValue={userData.bio}
            onChange={(e) => {
              setUserData({ ...userData, bio: e.currentTarget.value });
            }}
          />
          <div className={"-mb-2 flex justify-between items-center"}>
            <h2 className={"font-semibold text-2xl"}>Links</h2>
            <IconButton
              icon={UKIcon.Plus}
              onClick={() => {
                setUserData({
                  ...userData,
                  links: [
                    ...(userData.links || []),
                    {
                      url: "https://example.com",
                      label: `Example${(userData.links?.length || 0) + 1}`,
                    },
                  ],
                });
              }}
            />
          </div>
          <>
            {userData.links?.map((link, ind) => {
              return (
                <UserLinkEditor
                  links={userData.links || []}
                  setLinks={(links) => {
                    setUserData({ ...userData, links });
                  }}
                  link={link}
                  key={link.url + link.label}
                />
              );
            })}
          </>
          <Button
            onClick={() => {
              coreCSI.syncPostJson(
                "/core/user/current",
                userData as unknown as TJson,
                () => {
                  ydsh.toast.success("Success", "Saved user data");
                },
                () => {
                  ydsh.toast.error("Error", "Failed to save user data");
                },
              );
            }}
          >
            Save
          </Button>
        </Card>
      </section>
    </BasePageLayout>
  );
};

export default ProfileIndexPage;
