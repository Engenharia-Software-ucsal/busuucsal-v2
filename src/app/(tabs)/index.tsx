import { Container } from "@/components/container";
import { EarlyDepartureIndicator } from "@/components/home/early-departure-indicator";
import { NextDeparturesList } from "@/components/home/next-departures-list";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { useSetAtom } from "jotai";
import { useCallback } from "react";

import { useFocusEffect } from "@react-navigation/core";

import { currentDateAtom } from "@/atoms/date";

export default function HomeScreen() {
  const updateCurrentDate = useSetAtom(currentDateAtom);

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        updateCurrentDate(new Date());
      }, 5000);

      return () => clearInterval(interval);
    }, [updateCurrentDate]),
  );

  return (
    <Container>
      <Box className="items-center">
        <Heading size="2xl" className="flex justify-center items-center">
          Ônibus UCSAL
        </Heading>
        <EarlyDepartureIndicator />
        <NextDeparturesList />
      </Box>
    </Container>
  );
}
