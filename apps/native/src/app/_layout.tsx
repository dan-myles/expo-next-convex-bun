import { useEffect } from "react"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import FontAwesome from "@expo/vector-icons/FontAwesome"

import "react-native-reanimated"

import { ConvexProvider } from "@/components/providers/convex.provider"

export { ErrorBoundary } from "expo-router"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ConvexProvider>
      <Stack />
    </ConvexProvider>
  )
}
