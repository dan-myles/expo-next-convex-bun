import type { ReactNode } from "react"
import {
  ConvexProvider as ConvexClientProvider,
  ConvexReactClient,
} from "convex/react"

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL ?? "")

interface ConvexProviderProps {
  children: ReactNode
}

export function ConvexProvider({ children }: ConvexProviderProps) {
  return <ConvexClientProvider client={convex}>{children}</ConvexClientProvider>
}
