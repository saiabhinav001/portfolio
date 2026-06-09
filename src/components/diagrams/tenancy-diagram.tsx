"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Box, DiagramFrame, Edge, nodeVariants, Note } from "./parts";

/** Multi-tenant request flow with rule-enforced data isolation. */
export function TenancyDiagram() {
  const reduce = useReducedMotion();

  return (
    <DiagramFrame
      label="Multi-tenant isolation"
      fig="fig.03"
      viewBox="0 0 680 300"
      reduce={reduce}
      desc="Tenants authenticate through RBAC and Google OAuth into a real-time booking engine; Firestore security rules form an isolation barrier so each tenant reaches only its own data, with no cross-tenant access."
    >
      {/* tenants → auth gate */}
      <Edge d="M130,57 C156,57 156,139 180,139" />
      <Edge d="M130,125 L180,134" />
      <Edge d="M130,193 C156,193 156,144 180,144" />

      {/* gate → engine */}
      <Edge d="M300,139 L330,139" accent />

      {/* engine → isolation barrier → partitions */}
      <Edge d="M460,139 L490,139" />
      <Edge d="M490,94 C500,94 500,93 516,93" />
      <Edge d="M490,153 L516,153" />
      <Edge d="M490,213 C500,213 500,213 516,213" />

      {/* isolation barrier (security rules) */}
      <Edge d="M490,60 L490,250" accent dashed />

      {/* tenants */}
      <Box x={20} y={36} w={110} h={42} title="Tenant A" sub="client" />
      <Box x={20} y={104} w={110} h={42} title="Tenant B" sub="client" />
      <Box x={20} y={172} w={110} h={42} title="Tenant C" sub="client" />

      {/* auth + app */}
      <Box x={180} y={108} w={120} h={62} title="RBAC + OAuth" sub="NextAuth.js" tone="accent" />
      <Box x={330} y={108} w={130} h={62} title="Booking engine" sub="optimistic · realtime" />

      {/* firestore region */}
      <text x={585} y={28} textAnchor="middle" className="fill-faint font-mono uppercase" style={{ fontSize: 9.5, letterSpacing: "0.16em" }}>
        Firestore
      </text>
      <motion.rect variants={nodeVariants} x={500} y={40} width={168} height={232} rx={11} className="fill-inset stroke-line" strokeWidth={1.25} />
      <Box x={516} y={72} w={136} h={42} title="Tenant A data" sub="isolated" />
      <Box x={516} y={132} w={136} h={42} title="Tenant B data" sub="isolated" />
      <Box x={516} y={192} w={136} h={42} title="Tenant C data" sub="isolated" />

      <Note x={490} y={52} anchor="middle">security rules</Note>
      <Note x={585} y={258} anchor="middle">no cross-tenant access</Note>
    </DiagramFrame>
  );
}
