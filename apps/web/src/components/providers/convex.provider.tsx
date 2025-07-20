"use client"

import type { ReactNode } from "react"
import {
  ConvexProvider as ConvexClientProvider,
  ConvexReactClient,
} from "convex/react"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "")

export function ConvexProvider({ children }: { children: React.ReactNode }) {
  return <ConvexClientProvider client={convex}>{children}</ConvexClientProvider>
}
