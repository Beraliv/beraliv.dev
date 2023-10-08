import { EventApiModel } from "../Types/EventApiModel";
import { fetchTennisApi } from "./fetchTennisApi";

interface FetchEventParameters {
  eventId: string | undefined;
  enabled: boolean;
}

const fetchEvent = async ({
  eventId,
  enabled,
}: FetchEventParameters): Promise<EventApiModel | null> => {
  if (!eventId || eventId === "") {
    return Promise.resolve(null);
  }

  if (!enabled) {
    return Promise.resolve(null);
  }

  const response = await fetchTennisApi(`event/${eventId}`);

  const data = await response.json();

  const eventApiModel: EventApiModel = data.event;

  return eventApiModel;
};

export { fetchEvent };
