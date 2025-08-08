import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { AndroidNotificationPriority } from "expo-notifications/src/Notifications.types";
import { Tabs } from "expo-router";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";
import { fetchDailyClass } from "@/api/fetch-daily-class";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

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

const taskName = "update-user-location";

const usalCordinates = {
	latidade: -12.947488,
	longitude: -38.413094,
};

const TOTAL_DISTANCE_RADIUS = 1000;

type EventType = {
	eventType: Location.GeofencingEventType;
	region: Location.LocationRegion;
};

TaskManager.defineTask<EventType>(taskName, async ({ data, error }) => {
	if (error) {
		console.error("Error in location task:", error);
		return;
	}

	console.log({ data });

	const isEnterInUcasl = data?.eventType === Location.GeofencingEventType.Enter;

	if (isEnterInUcasl) {
		const classDetails = await fetchDailyClass();

		for (const classDetail of classDetails) {
			await Notifications.scheduleNotificationAsync({
				content: {
					title: `Aula de ${classDetail.subject} com ${classDetail.teacher}, sala: ${classDetail.room}`,
					body: `Sua aula de ${classDetail.subject} com ${classDetail.teacher} começa às ${classDetail.start_at}.`,
				},
				trigger: null,
			});
		}
	}
});

export default function TabLayout() {
	const colorScheme = useColorScheme();

	useEffect(() => {
		(async () => {
			const { status: permissionsForegroundStatus } = await Location.requestForegroundPermissionsAsync();

			if (permissionsForegroundStatus === "granted") {
				const { status: permissionsBackgroundStatus } = await Location.requestBackgroundPermissionsAsync();
				if (permissionsBackgroundStatus === "granted") {
					console.log("Background permissions granted");

					if (await Location.hasStartedLocationUpdatesAsync(taskName)) {
						console.log("Already started");
						return;
					}

					await Location.startGeofencingAsync(taskName, [
						{
							identifier: "UCSAL",
							longitude: usalCordinates.longitude,
							latitude: usalCordinates.latidade,
							radius: TOTAL_DISTANCE_RADIUS,
							notifyOnEnter: true,
						},
					]);
				} else {
					console.log("Background permissions not granted");
				}
			}
		})();
	}, []);

	useEffect(() => {
		Notifications.getPermissionsAsync().then((permission) => {
			if (!permission.granted) {
				Notifications.requestPermissionsAsync().then((permission) => {
					if (permission.granted) {
						console.log("Notification permissions granted");
					} else {
						console.log("Notification permissions not granted");
					}
				});
			}
		});
	}, []);

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Ônibus",
					tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "bus-sharp" : "bus-outline"} color={color} />,
				}}
			/>

			<Tabs.Screen
				name="classes"
				options={{
					title: "Aulas",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? "calendar" : "calendar-outline"} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="alerts"
				options={{
					title: "Alertas",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? "alert-circle" : "alert-circle-outline"} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
