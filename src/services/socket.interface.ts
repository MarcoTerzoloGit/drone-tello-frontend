interface FlightDataInterface {
  pitch: number;
  roll: number;
  yaw: number;
  h: number;
  bat: number;
}

interface VideoStreamDataInterface {
  data: any;
}

interface CommandsInterface {
  FLIP_RIGHT: string;
  FLIP_LEFT: string;
  FORWARD: string;
  BACKWARD: string;
  LEFT: string;
  RIGHT: string;
  LAND: string;
  TAKE_OFF: string;
  STREAM: string;
  COMMAND: string;
}

export { FlightDataInterface, VideoStreamDataInterface, CommandsInterface };
