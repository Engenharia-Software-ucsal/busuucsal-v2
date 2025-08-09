import * as TaskManager from "expo-task-manager";
import { GEOFENCE_TASK } from "@/lib/location/constants";
import { onUserEnterUCSALEventHandler } from "@/lib/location/handlers";

export const Tasks = {
	registerUCSALGeofencingTaskHandler: () => TaskManager.defineTask(GEOFENCE_TASK, onUserEnterUCSALEventHandler),
};
