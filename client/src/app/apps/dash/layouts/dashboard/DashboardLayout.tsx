import React from "react";
import useTranslate from "../../../../../helpers/l10n";
import {IconButton, Chip, Row} from "../../../../../ui";
import {useNavigate} from "react-router-dom";

export interface IDashboard {
  username: string,
  fullName: {
    first: string,
    last: string
  }
}

const DashboardLayout: React.FC<IDashboard> = ({
  username,
  fullName
}) => {
  const navigate = useNavigate();
  const trans = useTranslate("dash");
  return (
    <main className={"flex flex-col w-full min-h-full"}>
      <header className={"p-4 flex items-center justify-between"}>
        <span className={"text-4xl font-bold"}>
          {
            trans("LOCALIZED_GREETING", [fullName.first, fullName.last])
          }
        </span>
        <IconButton
          icon={"gear-16"}
          onClick={() => {
            navigate("/app/a/settings");
          }}
        />
      </header>
      <Row className={"p-2"}>
        {/* Chips */}
        <Chip onClick={() => 0} active>
          {"Weather 20°C"}
        </Chip>
        <Chip onClick={() => 0} active>
          {"Rain at 3pm"}
        </Chip>
        <Chip onClick={() => 0} active>
          {"You have 76 unread notifications"}
        </Chip>
      </Row>
    </main>
  );
};

export default DashboardLayout;
