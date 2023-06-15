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
  }, [ref.current]);

  return (
    <main className={'w-full h-full'} ref={ref}/>
  );
};

export default CodeStudioEditor;
