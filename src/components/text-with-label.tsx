import { useWindowDimensions } from "react-native";
import { HStack } from "./ui/hstack/index";
import { Text } from "./ui/text";

export interface TextWithLabelProps {
	label: string;
	value: string;
	icon?: React.ReactNode;
}

export function TextWithLabel({ label, value, icon }: TextWithLabelProps) {
	return (
		<HStack space="xs" className="items-center">
			{icon}
			<Text>{label}</Text>
			<Text style={{ width: 250 }} className="font-bold" ellipsizeMode="tail" numberOfLines={1}>
				{value}
			</Text>
		</HStack>
	);
}
