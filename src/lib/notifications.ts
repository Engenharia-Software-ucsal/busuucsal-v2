import type { NotificationRequestInput } from "expo-notifications";
import * as Notifications from "expo-notifications";
import { AndroidNotificationPriority } from "expo-notifications/src/Notifications.types";

export const AppNotificationManager = {
	async requestNotificationPermissions() {
		const { granted } = await Notifications.getPermissionsAsync();

		if (granted) return granted;

		const { status } = await Notifications.requestPermissionsAsync();

		return status === "granted";
	},

	async scheduleNotification(notification: NotificationRequestInput) {
		await Notifications.scheduleNotificationAsync({
			...notification,
			trigger: null,
		});
	},

	async cancelAllNotifications() {
		await Notifications.cancelAllScheduledNotificationsAsync();
	},

	async getAllScheduledNotifications() {
		return await Notifications.getAllScheduledNotificationsAsync();
	},

	startNotificationSetup() {
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowBanner: true,
				shouldShowList: true,
				shouldPlaySound: false,
				shouldSetBadge: false,
				priority: AndroidNotificationPriority.HIGH,
				shouldShowAlert: true,
			}),
		});
	},
};
