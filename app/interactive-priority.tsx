"use client";

import { useState } from "react";

const qna = [
  ["Founder", "Who founded MATW Project and why?", "MATW Project was founded by Ali Banat after his cancer diagnosis led him to rethink what a meaningful legacy could look like. He chose to turn his time, wealth and influence toward serving Muslims facing poverty, displacement and crisis."],
  ["Charity", "Is MATW Project a legitimate, registered charity?", "MATW International Ltd is an Australian charity and Public Benevolent Institution (PBI), endorsed as a Deductible Gift Recipient. Always check that you are using an official MATW domain or verified channel before donating."],
  ["Policy", "What does the 100% Donation Policy actually mean?", "After merchant and banking fees, donations are used for direct project costs, donor engagement and fundraising that is reinvested into the project or other MATW projects. Read the full policy for the detailed explanation."],
  ["Countries", "What countries and regions does MATW operate in?", "MATW works across Africa, Asia, the Middle East and other regions where communities need emergency relief or sustainable support. Projects change as needs change, so current appeals and reports are the best guide."],
  ["Zakat", "Are MATW’s projects Zakat-compliant?", "MATW provides dedicated Zakat appeals and aims to distribute Zakat in accordance with Islamic principles. If you have a specific fiqh question, consult a trusted scholar and choose a clearly marked Zakat project."],
  ["Official", "How can I make sure I’m donating through official MATW channels?", "Use the official MATW website, its verified social profiles, or links published from those channels. Be cautious with unsolicited messages, personal bank details and domains that imitate MATW."],
  ["Tax", "Is my donation tax-deductible?", "Tax treatment depends on the country where you donate and the entity processing your gift. Australian donors should retain their receipt and confirm eligibility under the relevant DGR rules."],
  ["Trust", "How does MATW ensure transparency and accountability?", "MATW publishes project information, impact reporting and its donation policies. Project pages explain the purpose of the appeal, while reports and field updates show how the wider program is progressing."],
  ["Proof", "What proof do I have that my donation reaches the people it’s meant for?", "Receipts, project updates, distribution stories, impact reports and field documentation provide evidence of the work. No single post can represent every distribution, so use the full body of official reporting."],
  ["Delays", "What happens if a project is delayed, overfunded, or can’t proceed?", "MATW may redirect funds to a closely related need or another project in line with its donation policy so the gift can still support people in need. Contact MATW if you need clarification about a specific appeal."],
];

export function LegacyInteractive() {
  const [active, setActive] = useState("Story");
  const panels: Record<string, { kicker: string; title: string; body: string }> = {
    Story: { kicker: "THE FIRST SPARK", title: "One decision can outlive a lifetime.", body: "Ali looked at his life, asked what really mattered, and turned that question into a movement the Ummah could carry forward." },
    Values: { kicker: "THE MATW COMPASS", title: "Amanah. Dignity. Future.", body: "Every project is a living expression of the values Ali left behind: serve people with respect, build for tomorrow, and keep responding." },
    Quotes: { kicker: "WORDS THAT STAY", title: "The biggest mistake is thinking we have time.", body: "Move through Ali’s legacy with intention. Every good deed becomes a thread in a story that continues after us." },
  };
  const panel = panels[active];
  return <section className="legacy-interactive"><div className="legacy-interactive-orbit"><span className="orbit-ring ring-one"/><span className="orbit-ring ring-two"/><div className="orbit-core"><b>MATW</b><small>LEGACY</small></div><span className="orbit-dot dot-one"/><span className="orbit-dot dot-two"/><span className="orbit-dot dot-three"/></div><div className="legacy-interactive-copy"><span className="eyebrow">A living legacy</span><div className="legacy-tabs">{Object.keys(panels).map((tab) => <button className={active === tab ? "active" : ""} onClick={() => setActive(tab)} key={tab}>{tab}</button>)}</div><div className="legacy-panel" key={active}><span>{panel.kicker}</span><h2>{panel.title}</h2><p>{panel.body}</p></div><div className="legacy-progress"><span style={{ width: active === "Story" ? "33%" : active === "Values" ? "66%" : "100%" }}/></div></div></section>;
}

export function OneWordQna() {
  const [active, setActive] = useState(0);
  const current = qna[active];
  return <section className="one-word-qna"><div className="qna-orbit-copy"><span className="eyebrow">Tap a word. Get the full answer.</span><h2>Questions, without the clutter.</h2><p>Choose the one word that matches what you want to know. The complete MATW answer opens beside it.</p><div className="qna-signal"><span>10</span><small>answers ready</small></div></div><div className="qna-word-panel"><div className="qna-word-list">{qna.map(([word], index) => <button className={active === index ? "active" : ""} onClick={() => setActive(index)} key={word}><span>{String(index + 1).padStart(2, "0")}</span>{word}<i>↗</i></button>)}</div><article className="qna-answer" key={current[0]}><span className="eyebrow">{current[0]}</span><h3>{current[1]}</h3><p>{current[2]}</p></article></div></section>;
}
