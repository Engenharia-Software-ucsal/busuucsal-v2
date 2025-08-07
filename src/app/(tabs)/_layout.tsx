import * as Location from "expo-location";
import { Tabs } from "expo-router";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const taskName = "update-user-location";

const usalCordinates = {
	latidade: -12.948442479406221,
	longitude: -38.413382028252094,
};

const TOTAL_DISTANCE_RADIUS = 1000;

type EventType = {
	eventType: Location.GeofencingEventType;
	region: Location.LocationRegion;
};

TaskManager.defineTask<EventType>("listUserLocationUpdate", async ({ data, error }) => {
	if (error) {
		console.error("Error in location task:", error);
		return;
	}

	const isEnterInUcasl = data?.eventType === Location.GeofencingEventType.Enter;

	if (isEnterInUcasl) {
		console.log("User entered the UCASL area");
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
