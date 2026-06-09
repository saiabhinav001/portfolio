"use client";

import { useReducedMotion } from "framer-motion";
import { Box, DiagramFrame, Edge, Note } from "./parts";

/** HireLog hybrid search: a worker builds FAISS + Typesense indexes a reranker blends. */
export function RetrievalDiagram() {
  const reduce = useReducedMotion();

  return (
    <DiagramFrame
      label="Hybrid search pipeline"
      fig="fig.02"
      viewBox="0 0 680 300"
      reduce={reduce}
      desc="Candidates submit interview experiences; a background worker runs spaCy NLP and sentence-transformers embeddings (ONNX) to build a FAISS semantic index and a Typesense BM25 lexical index. At query time, hybrid search blends both and reranks. The FastAPI backend runs in Docker on a Hugging Face Space; the frontend is Next.js on Vercel."
    >
      {/* ingest spine */}
      <Edge d="M132,151 L160,151" />
      <Edge d="M290,151 C312,151 312,81 332,81" accent />
      <Edge d="M290,151 C312,151 312,219 332,219" accent />

      {/* indexes → hybrid */}
      <Edge d="M462,81 C484,81 484,150 504,150" />
      <Edge d="M462,219 C484,219 484,158 504,158" />

      {/* nodes */}
      <Box x={20} y={128} w={112} h={46} title="Submission" sub="experience" />
      <Box x={160} y={128} w={130} h={46} title="Worker" sub="spaCy · ONNX embed" tone="accent" />
      <Box x={332} y={58} w={130} h={46} title="FAISS" sub="semantic vectors" />
      <Box x={332} y={196} w={130} h={46} title="Typesense" sub="BM25 lexical" />
      <Box x={504} y={128} w={150} h={52} title="Hybrid + rerank" sub="blend · reorder" tone="accent" />

      <Note x={20} y={118}>ingest · build indexes</Note>
      <Note x={504} y={118}>query · ranked results</Note>
      <Note x={20} y={262}>FastAPI · Docker · Hugging Face Space</Note>
      <Note x={660} y={262} anchor="end">Next.js · Vercel</Note>
    </DiagramFrame>
  );
}
