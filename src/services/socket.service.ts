import io from 'socket.io-client';
import { Observable, fromEvent } from 'rxjs';
import { FlightDataInterface, VideoStreamDataInterface } from './socket.interface';

export class SocketServices {
  socket: SocketIOClient.Socket;
  socketRoute: string;

  constructor(socketRoute: string) {
    this.socket = io.connect(socketRoute);
  }

  // initSocket(socketRoute): this {
  //   console.log('initSocket');
  //   this.socket = io.connect(socketRoute);

  //   return this;
  // }

  getFlightData(): Observable<FlightDataInterface> {
    console.log('>>>>>>>', this.socket);
    return fromEvent(this.socket, 'stats');
  }

  getVideoStreamData(): Observable<VideoStreamDataInterface> {
    return fromEvent(this.socket, 'image');
  }

  sendCommand(command: string): void {
    this.socket.emit('command', command);
  }
}

// image service
// socket.on('image', frame => {
//   console.log('IMAGE INCOMING');

//   const image = document.getElementById('drone-camera');
//   image.src = `data:image/jpeg;base64,${frame}`;
// });

// stats service
// socket.on('stats', (data = { pitch: 'test' }) => {
//   console.log('STATS INCOMING');

//   const pitch = document.getElementById('pitch');
//   const roll = document.getElementById('roll');
//   const yaw = document.getElementById('yaw');
//   const height = document.getElementById('height');
//   const battery = document.getElementById('battery');
//   const batteryLvl = document.getElementById('battery-level');
//   const droneAxys = document.getElementById('droneAxys');

// });
