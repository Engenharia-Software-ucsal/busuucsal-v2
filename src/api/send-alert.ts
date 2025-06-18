import { Alert } from "react-native";
import { useMutation } from "@/atoms/mutation-manager";

export async function sendAlert(_alertId: string) {
	//	await okamiNotifierApi.post("/alert/send", { alertId });
}

export function useSendAlertMutation() {
	const { mutate, isPending } = useMutation({
		mutationKey: sendAlert.name,
		requestMutation: sendAlert,
		onSuccess() {
			Alert.alert("Alerta enviado !");
			s;
		},
		onError() {
			Alert.alert("Erro ao enviar alerta !");
		},
	});

	return {
		isPending,
		mutate,
	};
}
