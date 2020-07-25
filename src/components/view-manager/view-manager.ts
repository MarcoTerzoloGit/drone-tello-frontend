import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import { SocketServices } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { VideoStreamDataInterface, FlightDataInterface } from '../../services/socket.interface';
import { commands } from '../../services/socket.constants';

@customElement('wc-view-manager')
export class ViewManager extends LitElement {
  @property() private route = '3D';
  @property() private socket: SocketServices;
  @property() private subscriptions: Array<Subscription> = [];
  @property() private videoStreamData: VideoStreamDataInterface;
  @property() private flightData: FlightDataInterface = {
    bat: 50,
    h: 0,
    yaw: 0,
    pitch: 0,
    roll: 0,
  };

  constructor() {
    super();
    this.socket = new SocketServices('http://127.0.0.1:9700');
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.subscriptions.push(
      this.socket.getFlightData().subscribe((flightData: FlightDataInterface) => {
        this.flightData = flightData;
      }),
    );
    this.subscriptions.push(
      this.socket.getVideoStreamData().subscribe((videoStreamData: VideoStreamDataInterface) => {
        this.videoStreamData = videoStreamData;
      }),
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public render(): TemplateResult {
    console.log('FLIGHT DATA', this.flightData);

    // this.list.push(this.flightData);

    // console.log('list', JSON.stringify(this.list));

    const { bat, pitch, yaw, roll } = this.flightData;
    const { FLIP_LEFT, FLIP_RIGHT, TAKE_OFF, LAND, RIGHT, LEFT, BACKWARD, FORWARD } = commands;

    return this.flightData
      ? html`
          <style>
            :root {
            }
            .wc-view-manager {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              position: relative;
            }

            .view-button {
              position: absolute;
              margin: 16px 16px 0px 16px;
            }

            .view-stats {
              position: absolute;
              right: 12px;
              top: 0px;
              color: white;
              font-size: 2em;
            }

            .commands-panel {
              position: absolute;
              bottom: 20px;
            }

            #left {
              left: 20px;
            }
            #right {
              right: 20px;
            }

            .svg-box {
              position: fixed;
              bottom: 0px;
            }

            /* TODO REMOVE THIS MEDIA QUERY AND MAKE THE WAVE REALLY RESPONSIVE */
            @media screen and (min-width: 1364px) {
              .svg-box {
                height: 36%;
              }
            }
            @media screen and (min-width: 1055px) and (max-width: 1364px) {
              .svg-box {
                height: 28%;
              }
            }
            @media screen and (min-width: 876px) and (max-width: 1054px) {
              .svg-box {
                height: 20%;
              }
            }
            @media screen and (min-width: 751px) and (max-width: 875px) {
              .svg-box {
                height: 16%;
              }
            }
            @media screen and (min-width: 525px) and (max-width: 750px) {
              .svg-box {
                height: 14%;
              }
            }
            @media screen and (min-width: 455px) and (max-width: 525px) {
              .svg-box {
                height: 12%;
              }
            }
            @media screen and (min-width: 378px) and (max-width: 454px) {
              .svg-box {
                height: 10%;
              }
            }
            @media screen and (max-width: 377px) {
              .svg-box {
                height: 8%;
              }
            }
          </style>

          <div class="wc-view-manager">
            <wc-button class="view-button" @btnClick="${this.switchMainView}">
              ${this.nextView()}
            </wc-button>
            <p class="view-stats">PITCH: ${pitch} ROLL: ${roll} YAW: ${yaw}</p>

            ${this.route === 'video'
              ? html`
                  <wc-view-video></wc-view-video>
                `
              : html`
                  <wc-view-3d .flightData="${this.flightData}"></wc-view-3d>
                `}

            <div class="svg-box">
              <wc-battery-wave class="battery" .battery="${bat}"></wc-battery-wave>
            </div>

            <wc-commands-panel class="commands-panel" id="left">
              <wc-custom-icon
                slot="top"
                iconName="icon-cloud-upload"
                @click="${(): void => this.socket.sendCommand(TAKE_OFF)}"
              ></wc-custom-icon>
              <wc-custom-icon
                slot="middle"
                iconName="icon-undo2"
                @click="${(): void => this.socket.sendCommand(FLIP_LEFT)}"
              ></wc-custom-icon>
              <wc-custom-icon
                slot="middle"
                iconName="icon-redo2"
                @click="${(): void => this.socket.sendCommand(FLIP_RIGHT)}"
              ></wc-custom-icon>
              <wc-custom-icon
                slot="bottom"
                iconName="icon-cloud-download"
                @click="${(): void => this.socket.sendCommand(LAND)}"
              ></wc-custom-icon>
            </wc-commands-panel>

            <wc-commands-panel class="commands-panel" id="right">
              <wc-custom-icon
                slot="top"
                iconName="icon-arrow-up2"
                @click="${(): void => this.socket.sendCommand(FORWARD)}"
              ></wc-custom-icon>
              <wc-custom-icon
                slot="middle"
                iconName="icon-arrow-left2"
                @click="${(): void => this.socket.sendCommand(LEFT)}"
              ></wc-custom-icon>
              <wc-custom-icon
                slot="middle"
                iconName="icon-arrow-right2"
                @click="${(): void => this.socket.sendCommand(RIGHT)}"
              ></wc-custom-icon>
              <wc-custom-icon
                slot="bottom"
                iconName="icon-arrow-down2"
                @click="${(): void => this.socket.sendCommand(BACKWARD)}"
              ></wc-custom-icon>
            </wc-commands-panel>
          </div>
        `
      : html``;
  }

  nextView(): string {
    return this.route === 'video' ? '3D' : 'video';
  }

  switchMainView(): void {
    this.route = this.nextView();
  }
}
