import React from "react";

export interface IFilesLayout {
  children: React.ReactNode;
}

const FilesLayout: React.FC<IFilesLayout> = ({ children }) => {
  return (
    <main className={`grid grid-cols-[auto,1fr]`}>
      <section
        className={`flex flex-col min-h-full overflow-x-hidden overflow-y-auto pl-1 pr-1 border-r-2 border border-container-border min-w-[10rem]`}
      >
        <h1
          className={`font-semibold text-container-fg text-3xl text-center pt-2 pb-2`}
        >
          Files
        </h1>

        <div className={`flex flex-col`}>
          <h2 className={`pl-2 pr-2 pb-0.5 pt-2`}>Category</h2>
          <span className={`pl-2 pr-2`}>Cat item 1</span>
          <span className={`pl-2 pr-2`}>Cat item 2</span>
          <span className={`pl-2 pr-2`}>Cat item 3</span>
          <span className={`pl-2 pr-2`}>Cat item 4</span>
          <span className={`pl-2 pr-2`}>Cat item 5</span>
        </div>
      </section>
      <section className={`flex flex-col w-full min-h-full overflow-auto`}>
        {children}
      </section>
    </main>
  );
};

export default FilesLayout;
