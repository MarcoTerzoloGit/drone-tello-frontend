import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import { FlightDataInterface } from '../../services/socket.interface';
// import droneImage from '../../assets/images/drone-axis.png';

@customElement('wc-plain-2d-model')
export class Plain2DModel extends LitElement {
  @property() private flightData: FlightDataInterface;

  public render(): TemplateResult {
    console.log('2D, flgihdata', this.flightData);

    return html`
      <style>
        :root {
        }
        .drone-axys {
          position: relative;
          height: 300px;
          width: 500px;
          color: white;
          background-color: black;
          transform: rotateX(${this.flightData.pitch}deg) rotateY(${this.flightData.roll * -1}deg)
            rotate(${this.flightData.yaw * -1}deg);
        }
        .perspective {
          perspective: 500px;
          transform-style: preserve-3d;
          display: grid;
          text-align: center;
          justify-content: center;
        }
        .fill {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
        }
      </style>

      <div class="fill">
        <div class="perspective">
          <img
            class="small-image drone-axys"
            id="droneAxys"
            src="src/assets/images/drone-axis.png"
            alt="drone tello flight data"
          />
        </div>
      </div>
    `;
  }
}
