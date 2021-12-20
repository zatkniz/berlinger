import { ServerData } from "./server-data";

export interface MainState {
  humidityData: ServerData[];
  temperatureData: ServerData[];
  availableDays: string[];
  availableWeeks: string[];
  availableMonths: string[];
  selectedDay: string;
  dateType: moment.unitOfTime.StartOf | undefined;
  rangeType: moment.unitOfTime.StartOf | undefined;
}
