import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "react-native-reanimated";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useRef } from "react";

import { Provider as JotaiProvider } from "jotai";

import { AppLoading } from "@/components/app-loading";
import "../../global.css";

export default function RootLayout() {
  const isDark = useRef(true);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <GluestackUIProvider mode="dark">
      <JotaiProvider>
        <ThemeProvider value={isDark.current ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </JotaiProvider>
    </GluestackUIProvider>
  );
}
