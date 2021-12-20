export interface ServerData {
  id: string;
  ts: Date;
  type: ServerDataType;
  value: number;
}

type ServerDataType = "temperature" | "humidity";

export interface ServerResponse {
  data: ServerData;
}
