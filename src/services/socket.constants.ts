import { CommandsInterface } from './socket.interface';

const commands: CommandsInterface = {
  FLIP_RIGHT: 'flip r',
  FLIP_LEFT: 'flip l',
  FORWARD: 'forward 50',
  BACKWARD: 'back 50',
  LEFT: 'left 50',
  RIGHT: 'right 50',
  LAND: 'land',
  TAKE_OFF: 'takeoff',
  STREAM: 'streamon',
  COMMAND: 'command',
};

export { commands };
