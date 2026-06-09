"use client";

import { useReducedMotion } from "framer-motion";
import { Box, DiagramFrame, Edge, Note, Port } from "./parts";

// Six specialised extraction agents (under the supervisor + master agent).
const agents = [
  { x: 14, title: "Metadata" },
  { x: 138, title: "Facts" },
  { x: 262, title: "Petitioner" },
  { x: 386, title: "Respondent" },
  { x: 510, title: "Statute" },
  { x: 634, title: "Reasoning" },
];
const AGENT_W = 112;
const validationPorts = [198, 270, 343, 417, 490, 563];

// Frontend, built with GenW.AI App Maker.
const apps = [
  { x: 14, title: "Dashboard" },
  { x: 162, title: "Case Viewer" },
  { x: 310, title: "Case Comparison" },
  { x: 458, title: "Chat with AI" },
  { x: 606, title: "Human Review" },
];
const APP_W = 140;

/** GenW.AI nine-agent system for structured legal-document intelligence. */
export function AgenticDiagram() {
  const reduce = useReducedMotion();

  return (
    <DiagramFrame
      label="Nine-agent legal intelligence"
      fig="fig.01"
      viewBox="0 0 760 544"
      minWidth="40rem"
      reduce={reduce}
      desc="A legal judgment is parsed by an intake agent, then a master agent and a supervisor agent route the work to six specialised agents in parallel: metadata, facts, petitioner, respondent, statute, and reasoning. Every field is source-verified, confidence-scored, and schema-validated, with low-confidence output sent to a human review queue, before validated data is stored in PostgreSQL and surfaced through a GenW.AI App Maker frontend: dashboard, case viewer, case comparison, chat with AI, and human review queue. Built on GenW.AI Agent Builder with Qwen3."
    >
      {/* spine */}
      <Edge d="M380,46 L380,66" />
      <Edge d="M380,110 L380,126" accent />
      <Edge d="M380,172 L380,190" accent />

      {/* supervisor → six agents */}
      {agents.map((a, i) => (
        <Edge key={`s${i}`} d={`M380,236 C380,252 ${a.x + AGENT_W / 2},248 ${a.x + AGENT_W / 2},262`} />
      ))}

      {/* six agents → validation ports */}
      {agents.map((a, i) => (
        <Edge key={`v${i}`} d={`M${a.x + AGENT_W / 2},312 C${a.x + AGENT_W / 2},332 ${validationPorts[i]},330 ${validationPorts[i]},346`} />
      ))}
      {validationPorts.map((px, i) => (
        <Port key={`p${i}`} x={px} y={346} accent />
      ))}

      {/* validation → store → frontend */}
      <Edge d="M380,398 L380,424" accent />
      {apps.map((p, i) => (
        <Edge key={`f${i}`} d={`M380,466 C380,478 ${p.x + APP_W / 2},476 ${p.x + APP_W / 2},488`} />
      ))}

      {/* nodes — spine */}
      <Box x={310} y={8} w={140} h={38} title="Legal judgment" sub="court PDF" />
      <Box x={305} y={66} w={150} h={44} title="Intake Agent" sub="parse · segment" />
      <Box x={288} y={126} w={184} h={46} title="Master Agent" sub="orchestration" tone="accent" />
      <Box x={288} y={190} w={184} h={46} title="Supervisor Agent" sub="routes extraction" tone="accent" />

      {/* six specialised agents */}
      {agents.map((a) => (
        <Box key={a.title} x={a.x} y={262} w={AGENT_W} h={50} title={a.title} sub="agent" />
      ))}

      {/* validation + store */}
      <Box x={160} y={346} w={440} h={52} title="Validation & responsible AI" sub="source check · confidence · schema · HITL" tone="accent" />
      <Box x={305} y={424} w={150} h={42} title="PostgreSQL" sub="structured store" />

      {/* frontend (GenW.AI App Maker) */}
      {apps.map((p) => (
        <Box key={p.title} x={p.x} y={488} w={APP_W} h={44} title={p.title} />
      ))}

      <Note x={486} y={158}>GenW.AI Agent Builder · Qwen3</Note>
      <Note x={160} y={340}>responsible ai · human-in-the-loop</Note>
      <Note x={14} y={482}>GenW.AI App Maker</Note>
    </DiagramFrame>
  );
}
