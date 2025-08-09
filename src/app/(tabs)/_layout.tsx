import * as Notifications from "expo-notifications";
import { AndroidNotificationPriority } from "expo-notifications/src/Notifications.types";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Events } from "@/lib/location/events";
import { requestAllLocationPermissions } from "@/lib/location/permissions";
import { Tasks } from "@/lib/location/tasks";
import { AppNotificationManager } from "@/lib/notifications";

AppNotificationManager.startNotificationSetup(); // Configura o handler de notificações
Tasks.registerUCSALGeofencingTaskHandler(); // Registra o handler de geofencing

export default function TabLayout() {
	const colorScheme = useColorScheme();

	useEffect(() => {
		(async () => {
			const isNotificationGranted = await AppNotificationManager.requestNotificationPermissions();

			if (!isNotificationGranted) {
				console.error("Permissões de notificação não concedidas");
				return;
			}

			const isLocationPermissionsGranted = await requestAllLocationPermissions();

			if (!isLocationPermissionsGranted) {
				console.error("Permissões de localização não concedidas");
				return;
			}

			await Events.registerUCSALGeofencingEvent(); // Registra o evento de geofencing
		})();
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
