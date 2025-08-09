import * as Location from "expo-location";

export async function requestAllLocationPermissions() {
	const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
	if (fgStatus !== "granted") {
		console.log("Permissão de localização foreground negada");
		return false;
	}

	const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
	if (bgStatus !== "granted") {
		console.log("Permissão de localização background negada");
		return false;
	}

	return true;
}
