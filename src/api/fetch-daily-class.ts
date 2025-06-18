import { okamiNotifierApi } from "@/lib/axios";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect } from "react";

export type ClassRoom = {
  id: number;
  created_at: string;
  dayNumber: number;
  subject: string;
  room: string;
  teacher: string;
  semester_id: number;
  day: string;
};

export async function fetchDailyClass() {
  const { data } = await okamiNotifierApi.get<ClassRoom>("/classroom/daily");

  return data;
}

export type DataWithTimestamp = {
  value: ClassRoom;
  timestamp: number;
};

export interface RequestState {
  isLoading: boolean;
  data: ClassRoom | null;
  error: any;
}

const requestStateAtom = atom<RequestState>({
  data: null,
  error: null,
  isLoading: false,
});

export function useFetchDailyClass({ enable = false }: { enable: boolean }) {
  const [request, setRequest] = useAtom(requestStateAtom);

  const makeRequest = useCallback(async () => {
    setRequest((old) => ({
      ...old,
      error: null,
      isLoading: true,
    }));

    try {
      const data = await fetchDailyClass();

      setRequest({
        isLoading: false,
        data,
        error: null,
      });
    } catch (e) {
      setRequest((old) => ({
        ...old,
        isLoading: false,
        error: e,
      }));
    }
  }, [setRequest]);

  useEffect(() => {
    void makeRequest();
  }, []);

  return { ...request, fetch: makeRequest };
}
