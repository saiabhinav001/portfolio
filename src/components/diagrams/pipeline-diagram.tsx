"use client";

import { useReducedMotion } from "framer-motion";
import { Box, DiagramFrame, Edge, Note } from "./parts";

/** MachineInsight Pro: telemetry → serverless proxy → Watson AutoAI model → dashboard. */
export function PipelineDiagram() {
  const reduce = useReducedMotion();

  return (
    <DiagramFrame
      label="Predictive maintenance flow"
      fig="fig.04"
      viewBox="0 0 680 240"
      reduce={reduce}
      desc="Five telemetry signals (torque, speed, temperature, tool wear, quality type) go to a Vercel serverless function that injects IBM credentials and forwards the request to an IBM Watson AutoAI LightGBM model with 99.4% F1. The failure-risk prediction returns through the function to a Chart.js dashboard, so the API key never reaches the browser."
    >
      <Edge d="M160,110 L190,110" />
      <Edge d="M350,110 L380,110" accent />
      <Edge d="M530,110 L560,110" accent />

      <Box x={20} y={83} w={140} h={54} title="Telemetry" sub="torque · speed · temp · wear" />
      <Box x={190} y={83} w={160} h={54} title="Vercel /api/predict" sub="injects credentials" tone="accent" />
      <Box x={380} y={83} w={150} h={54} title="Watson AutoAI" sub="LightGBM · 99.4% F1" tone="accent" />
      <Box x={560} y={83} w={104} h={54} title="Dashboard" sub="Chart.js · GSAP" />

      <Note x={190} y={73}>serverless proxy · hides the IBM key</Note>
      <Note x={380} y={158}>failure-risk prediction in milliseconds</Note>
    </DiagramFrame>
  );
}
