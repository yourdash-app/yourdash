import Button from "@yourdash/uikit/src/components/button/button";
import React, { useContext } from "react";
import pathContext from "../../pathContext";

const PathBar: React.FC = () => {
  const { path, setPath } = useContext(pathContext);

  if (path === undefined) {
    return null;
  }

  const pathSegments = path.split("/");

  return (
    <div>
      {pathSegments.map((segment, index) => {
        return (
          <Button
            text={segment}
            onClick={() => {
              setPath(pathSegments.slice(index).join("/"));
            }}
          />
        );
      })}
    </div>
  );
};

export default PathBar;
