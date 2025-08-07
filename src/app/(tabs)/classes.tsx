import { useAtomValue } from "jotai";
import { Clock, DoorOpen, GraduationCap, Loader } from "lucide-react-native";
import { FlatList, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetchDailyClass } from "@/api/fetch-daily-class";
import { formattedDateAtom } from "@/atoms/date";
import { Container } from "@/components/container";
import { TextWithLabel } from "@/components/text-with-label";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function ClassesScreen() {
	const { data, isPending } = useFetchDailyClass();

	const todayTitle = useAtomValue(formattedDateAtom);

	if (isPending || !data) {
		return (
			<Container>
				<Loader />
			</Container>
		);
	}

	const firstClassroom = data[0];

	return (
		<SafeAreaView>
			<Container>
				<VStack space="lg">
					<Center>
						<Heading className="text-2xl">Aula(s) de hoje,</Heading>
						<Text className="text-xl mt-2">{todayTitle}</Text>
					</Center>

					<Center>
						<Box className="mt-10 w-[200px] h-[200px] border border-blue-400 rounded-full">
							<VStack space="md" className="justify-center items-center flex-1">
								{firstClassroom?.room ? (
									<>
										<HStack className="" space="md">
											<Text className="text-2xl ">Sala Atual</Text>
										</HStack>
										<Heading className="text-3xl ">{firstClassroom?.room}</Heading>

										<Text className="text-xl ">19:00</Text>
									</>
								) : (
									<VStack className="items-center" space="md">
										<Heading className="max-w-[150px] text-center">Nada por aqui</Heading>
									</VStack>
								)}
							</VStack>
						</Box>
					</Center>

					<FlatList
						ItemSeparatorComponent={() => <Box className="my-2" />}
						data={data}
						keyExtractor={(classRoom) => `${classRoom.id}-${classRoom.dayNumber}`}
						renderItem={({ item: classRoom }) => (
							<Card className="mx-2">
								<VStack space="md">
									<Heading>{classRoom.subject}</Heading>

									<TextWithLabel
										icon={<Icon as={GraduationCap} size="md" />}
										label={"Professor:"}
										value={classRoom.teacher}
									/>

									<TextWithLabel
										icon={<Icon as={Clock} size="md" />}
										label={"Horário:"}
										value={`${classRoom.start_at} - ${classRoom.end_at}`}
									/>

									<TextWithLabel icon={<Icon as={DoorOpen} size="md" />} label={"Sala:"} value={classRoom.room} />
								</VStack>
							</Card>
						)}
					/>
				</VStack>
			</Container>
		</SafeAreaView>
	);
}
