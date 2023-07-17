import React from "react";

import CodeStudioEditor from "./core/Editor";
import TabContainer from "./ui/Tabs/TabContainer";
import StatusBar from "./ui/StatusBar/StatusBar";

const CodeStudioApplication: React.FC = () => (
  <main className={"grid grid-rows-[auto,1fr,auto] h-full"}>
    {/* Tabs */}
    <section>
      <TabContainer/>
    </section>
    {/* Content */}
    <section className={"grid grid-cols-[auto,1fr,auto] h-full overflow-hidden"}>
      <section>
        {"FileManager"}
      </section>
      <CodeStudioEditor/>
      <section>
        {"Symbols"}
      </section>
    </section>
    {/*StatusBar*/}
    <section>
      <StatusBar/>
    </section>
  </main>
);

export { CodeStudioApplication as default };
