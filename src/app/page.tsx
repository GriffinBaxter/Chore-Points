"use client";

import { useState } from "react";
import Calculate from "./calculate";
import Display from "./display";
import { CookiesProvider } from "react-cookie";

export default function Home() {
  const [rewards, setRewards] = useState<string[]>([]);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          {rewards.length ? (
            <Display rewards={rewards} setRewards={setRewards} />
          ) : (
            <Calculate setRewards={setRewards} />
          )}
        </CookiesProvider>
      </main>
    </div>
  );
}
