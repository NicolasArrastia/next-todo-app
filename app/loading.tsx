import React from "react";
import { MOCK_TODO } from "./constants";

const SKELETON_BG_CLASS = "bg-neutral-300 dark:bg-neutral-500";

const HeaderSkeleton = () => (
  <header
    className={`${SKELETON_BG_CLASS} h-12 animate-pulse top-0 sticky grid grid-cols-3 p-2 rounded-md shadow-lg mb-4`}
  />
);

const ContentSkeleton = () => (
  <div className="grid">
    <div className={`w-40 h-12 rounded-md ${SKELETON_BG_CLASS}`}></div>
    <div className="grid">
      {MOCK_TODO.map((_, index) => (
        <div
          key={index}
          className={`${SKELETON_BG_CLASS} group flex items-center relative justify-start rounded-md
        px-2 py-2 mt-4`}
        >
          {_.todoList.map((item, index) => (
            <div
              key={index}
              className={`${SKELETON_BG_CLASS} h-10 w-full rounded-md`}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

const loading = () => {
  return (
    <main className="bg-pattern bg-slate-300 w-full h-screen flex justify-center items-center">
      <div className="flex flex-col p-4 bg-neutral-100 dark:bg-neutral-900 md:rounded-md w-full h-screen md:w-[420px] md:aspect-[9/16] md:max-h-[90dvh]">
        <HeaderSkeleton />
        <ContentSkeleton />
      </div>
    </main>
  );
};

export default loading;
