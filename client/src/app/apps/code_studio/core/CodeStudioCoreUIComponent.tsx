import React, {useRef, useEffect} from 'react';

import CodeStudioPanel from './panel/panel';

import CodeStudio from '.';

const CodeStudioEditor: React.FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const cs = new CodeStudio(ref.current);


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return (
    <div ref={ref}/>
  );
};

export default CodeStudioEditor;
