import { ActionContext, createStore } from "vuex";
import axios from "../plugins/axios";
import { MainState } from "../../interfaces/store";
import { ServerData, ServerResponse } from "../../interfaces/server-data";
import { AxiosResponse } from "axios";
import moment from "moment";
import _ from "lodash";

export default createStore<MainState>({
  state: {
    humidityData: [],
    temperatureData: [],
    availableDays: [],
    availableWeeks: [],
    availableMonths: [],
    selectedDay: "08-04-2021",
    dateType: "day",
    rangeType: "day",
  },
  getters: {
    /**
     * getHumidityData - Getter for the humidityData
     * @param state
     * @returns humidityData
     */
    getHumidityData: ({ humidityData }: MainState): ServerData[] => {
      return humidityData;
    },
    /**
     * getTemperatureData - Getter for the temperatureData
     * @param state
     * @returns temperatureData
     */
    getTemperatureData: ({ temperatureData }: MainState): ServerData[] => {
      return temperatureData;
    },
    /**
     * getAvailableDays - Getter for the availableDays
     * @param state
     * @returns availableDays
     */
    getAvailableDays: ({ availableDays }: MainState): string[] => {
      return availableDays;
    },
    getAvailableWeeks: ({ availableWeeks }: MainState): string[] => {
      return availableWeeks;
    },
    getAvailableMonths: ({ availableMonths }: MainState): string[] => {
      return availableMonths;
    },
    getSelectedDay: ({ selectedDay }: MainState): string => {
      return selectedDay;
    },
    getDateType: ({
      dateType,
    }: MainState): moment.unitOfTime.StartOf | undefined => {
      return dateType;
    },
    getRangeType: ({
      rangeType,
    }: MainState): moment.unitOfTime.StartOf | undefined => {
      return rangeType;
    },
    getXAxisData: ({ temperatureData, selectedDay, dateType }) => {
      return temperatureData
        .filter((data: ServerData) =>
          moment(data.ts).isSame(moment(selectedDay, "DD-MM-YYYY"), dateType)
        )
        .map((item: ServerData) =>
          moment(item.ts).format(
            dateType == "day" ? "HH:mm" : "DD-MM-YYYY HH:mm"
          )
        );
    },
  },
  mutations: {
    /**
     * setTemperatureData - Sets the temperature data by filtering the data response
     * @param state
     * @param payload: ServerData[]
     * @returns void
     */
    setTemperatureData(state: MainState, payload: ServerData[]): void {
      state.temperatureData = payload.filter(
        (data: ServerData) => data.type === "temperature"
      );
    },
    /**
     * setHumidityData - Sets the humidity data by filtering the data response
     * @param state
     * @param payload: ServerData[]
     * @returns void
     */
    setHumidityData(state: MainState, payload: ServerData[]): void {
      state.humidityData = payload.filter(
        (data: ServerData) => data.type === "humidity"
      );
    },
    /**
     * setAvailableDays - Sets the available dates for selection
     * @param state
     * @param payload: ServerData[]
     * @returns void
     */
    setAvailableDays(state: MainState, payload: ServerData[]): void {
      const groupedDays = _.groupBy(payload, (item: ServerData) =>
        moment(item.ts).startOf("day")
      );
      state.availableDays = Object.keys(groupedDays).map((date) =>
        moment(date).format("DD-MM-YYYY")
      );
    },
    setAvailableWeeks(state: MainState, payload: ServerData[]): void {
      const groupedDays = _.groupBy(payload, (item: ServerData) =>
        moment(item.ts).startOf("week")
      );
      state.availableWeeks = Object.keys(groupedDays).map((date) =>
        moment(date).format("DD-MM-YYYY")
      );
    },
    setAvailableMonths(state: MainState, payload: ServerData[]): void {
      const groupedDays = _.groupBy(payload, (item: ServerData) =>
        moment(item.ts).startOf("month")
      );
      state.availableMonths = Object.keys(groupedDays).map((date) =>
        moment(date).format("DD-MM-YYYY")
      );
    },
    setRangeType(state: MainState, payload: moment.unitOfTime.StartOf): void {
      state.rangeType = payload;
    },
    setDateType(state: MainState, payload: moment.unitOfTime.StartOf): void {
      state.dateType = payload;
    },
    setSelectedDay(state: MainState, payload: string): void {
      state.selectedDay = payload;
    },
  },
  actions: {
    /**
     * fetchData - fetching data from provided endpoint and sets humidity and temprature
     * @param state
     * @returns Promise<void>
     */
    async fetchData({
      commit,
    }: ActionContext<MainState, MainState>): Promise<void> {
      const { data }: AxiosResponse<ServerResponse> = await axios.get(
        "chart.json"
      );
      commit("setTemperatureData", data.data);
      commit("setHumidityData", data.data);
      commit("setAvailableDays", data.data);
      commit("setAvailableMonths", data.data);
      commit("setAvailableWeeks", data.data);
    },
  },
});
