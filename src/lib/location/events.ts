import * as Location from "expo-location";
import { GEOFENCE_TASK, TOTAL_DISTANCE_RADIUS, UCSALCoordinates } from "@/lib/location/constants";

export const Events = {
	registerUCSALGeofencingEvent: () =>
		Location.startGeofencingAsync(GEOFENCE_TASK, [
			{
				identifier: "UCSAL",
				latitude: UCSALCoordinates.latitude,
				longitude: UCSALCoordinates.longitude,
				radius: TOTAL_DISTANCE_RADIUS,
				notifyOnEnter: true,
			},
		]),
};
