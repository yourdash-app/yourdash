import React from 'react';

import CodeStudioEditor from './core/Editor';

const CodeStudioApplication: React.FC = () => (
  <main className={'grid grid-rows-[auto,1fr,auto] h-full'}>
    {/* Tabs */}
    <section>
      <span>
        {'Tabs'}
      </span>
    </section>
    {/* Content */}
    <section className={'grid grid-cols-[auto,1fr,auto]'}>
      <section>
        {'FileManager'}
      </section>
      <CodeStudioEditor/>
      <section>
        {'Symbols'}
      </section>
    </section>
    {/*StatusBar*/}
    <section>
      <span>
        {'StatusBar'}
      </span>
    </section>
  </main>
);

export {CodeStudioApplication as default};
