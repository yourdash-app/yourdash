import React from 'react';

const Editor: React.FC = () => {
  const [lines] = React.useState(true);
  const [linesOfCode] = React.useState<string[]>(['//TestFile.ts']);


  return (
    <div>
      {'Editor component'}
    </div>
  );
};

export default Editor;
