import AsyncStorage from "@react-native-async-storage/async-storage";

const isNotificationSendKey = "isNotificationSend";

export function createNotificationStorage() {
	const saveNotificationIsSend = async (isSend: boolean, day: number) => {
		await AsyncStorage.setItem(isNotificationSendKey, JSON.stringify({ isSend, day }));
	};

	const checkIsNotificationSend = async (day: number): Promise<boolean> => {
		try {
			const value = await AsyncStorage.getItem(isNotificationSendKey);
			if (value !== null) {
				const { isSend, day: storedDay } = JSON.parse(value);
				return isSend && storedDay === day;
			}
			return false;
		} catch (error) {
			console.error("Error checking notification status:", error);
			return false;
		}
	};

	return {
		saveNotificationIsSend,
		checkIsNotificationSend,
	};
}

export const notificationStorage = createNotificationStorage();
