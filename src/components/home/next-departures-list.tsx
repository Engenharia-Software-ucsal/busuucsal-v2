import { nextDeparturesAtom } from "@/atoms/itinenary";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { useAtomValue } from "jotai";
import { map, tail } from "lodash";
import { Clock } from "lucide-react-native";
import React from "react";
import { FlatList } from "react-native";
import { Text } from "../ui/text";

export function NextDepartureListIem({
  departure,
  arrival,
}: {
  departure: string;
  arrival: string;
}) {
  return (
    <Box className="flex-row justify-between">
      <Text>{departure}</Text>
      <Text>{arrival}</Text>
    </Box>
  );
}

export function NextDeparturesList() {
  const nextDepartures = useAtomValue(nextDeparturesAtom);

  const parsedNextDeparturesList = tail(
    map(nextDepartures, (item) => ({
      departure: item.departure.concat(" h"),
      arrival: item.arrival.concat(" h"),
    })),
  );

  return (
    <>
      <HStack className="mt-20 items-center" space="sm">
        <Icon as={Clock} size="xl" />
        <Heading
          testID="next_departures_title"
          size="xl"
          className="flex justify-center items-center  "
        >
          Próximos horários
        </Heading>
      </HStack>
      <Box className="w-full px-10 mt-10 mb-14">
        <Card size="lg" className="w-full max-h-[200px]">
          <VStack space="2xl">
            <Box className="flex-row justify-between">
              <Heading>Saída</Heading>
              <Heading>Chegada</Heading>
            </Box>

            <FlatList
              testID="next_departures_list"
              style={{ maxHeight: 100 }}
              keyExtractor={({ departure, arrival }, index) =>
                `${index}-${departure}-${arrival}`
              }
              data={parsedNextDeparturesList}
              ItemSeparatorComponent={() => <Box className="mt-4" />}
              renderItem={({ item }) => (
                <NextDepartureListIem
                  arrival={item.arrival}
                  departure={item.departure}
                />
              )}
              ListEmptyComponent={() => (
                <Box className="flex justify-center items-center w-full h-[100px]">
                  <Text>Nenhum horário disponível</Text>
                </Box>
              )}
            />
          </VStack>
        </Card>
      </Box>
    </>
  );
}
