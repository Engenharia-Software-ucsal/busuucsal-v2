import React from "react";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { formattedDateAtom } from "@/atoms/date";
import {
  distanceToNextDepartureAtom,
  earlyDepartureTimeAtom,
} from "@/atoms/itinenary";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { useAtomValue } from "jotai";
import { BusFront, Calendar } from "lucide-react-native";

export function EarlyDepartureIndicator() {
  const todayTitle = useAtomValue(formattedDateAtom);
  const earlyNextDeparture = useAtomValue(earlyDepartureTimeAtom);
  const distanceToNextDeparture = useAtomValue(distanceToNextDepartureAtom);

  return (
    <>
      <HStack className="items-center gap-2">
        <Icon as={Calendar} size="md" />
        <Heading size="xl" className="flex justify-center items-center">
          {todayTitle}
        </Heading>
      </HStack>

      <Box className="mt-10 w-[250px] h-[250px] border border-blue-400 rounded-full">
        <VStack space="lg" className="justify-center items-center flex-1">
          {earlyNextDeparture && <Text size="xl">Próxima saída</Text>}

          <Text testID="earlyNextDepartureHour" size="3xl">
            {earlyNextDeparture ?? "Sem horários"}
          </Text>

          <Icon as={BusFront} size={30 as any} />

          {distanceToNextDeparture && (
            <Text>
              <Text testID="distanceToNextDeparture" className="font-bold">
                {distanceToNextDeparture}
              </Text>
            </Text>
          )}
        </VStack>
      </Box>
    </>
  );
}
