import React, {useEffect, useRef} from "react";
import CodeStudioEditor from "./editor/editor";

const Editor: React.FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const editor = new CodeStudioEditor(ref.current);
  }, []);

  return (
    <div ref={ref}/>
  );
};

export default Editor;
