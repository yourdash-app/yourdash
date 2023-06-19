import React from 'react';

const Editor: React.FC = () => {
  const [lines] = React.useState(true);
  const [linesOfCode] = React.useState<string[]>(['//TestFile.ts']);

  return (
    <div className={'grid grid-cols-[auto,1fr] h-full'}>
      <section className={'min-w-[4rem] flex items-center flex-col bg-container-secondary-bg text-container-secondary-fg h-full'}>
        {linesOfCode.map((line, index) => <span key={line}>{index}</span>)}
      </section>
      <section className={'flex items-start flex-col bg-container-tertiary-bg text-container-tertiary-fg pl-1 h-full'}>
        {linesOfCode.map((line, index) => <span key={line}>{line}</span>)}
      </section>
    </div>
  );
};

export default Editor;
