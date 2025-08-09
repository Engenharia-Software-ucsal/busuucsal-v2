import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import type { TaskManagerTaskBody } from "expo-task-manager";
import { fetchDailyClass } from "@/api/fetch-daily-class";
import { AppNotificationManager } from "@/lib/notifications";
import { notificationStorage } from "@/lib/storage";

export type EventType = {
	eventType: Location.GeofencingEventType;
	region: Location.LocationRegion;
};

export async function onUserEnterUCSALEventHandler({ data, error }: TaskManagerTaskBody<EventType>) {
	if (error) {
		console.error("Erro na task de localização:", error);
		return;
	}

	const isEnterInUCSAL = data?.eventType === Location.GeofencingEventType.Enter;

	if (isEnterInUCSAL) {
		const currentDay = new Date().getDay();
		const notificationIsSend = await notificationStorage.checkIsNotificationSend(currentDay);

		if (notificationIsSend) {
			console.log("Notificação já enviada hoje.");
			return;
		}

		const classDetails = await fetchDailyClass(currentDay);

		for (const classDetail of classDetails) {
			await AppNotificationManager.scheduleNotification({
				content: {
					title: `Aula de ${classDetail.subject} sala: ${classDetail.room}`,
					body: `
					 Aula de ${classDetail.subject} com ${classDetail.teacher}, sala: ${classDetail.room}
					Sua aula de ${classDetail.subject} começa às ${classDetail.start_at}.
					`,
				},
				trigger: null,
			});
		}

		await notificationStorage.saveNotificationIsSend(true, currentDay);
	}
}
