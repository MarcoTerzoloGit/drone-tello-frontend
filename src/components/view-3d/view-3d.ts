import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import { FlightDataInterface } from '../../services/socket.interface';

@customElement('wc-view-3d')
export class View3d extends LitElement {
  @property() flightData: FlightDataInterface;

  public render(): TemplateResult {
    return html`
      <style>
        :root {
        }
        :host {
          height: 100%;
        }
        .wc-view-3d {
          background-image: radial-gradient(circle at top, rgb(38, 48, 91), rgb(0, 0, 0));
          height: 100%;
        }
      </style>

      <div class="wc-view-3d">
        <!-- <wc-plain-2d-model .flightData="${this.flightData}"></wc-plain-2d-model> -->

        <wc-plain-3d-model .flightData="${this.flightData}"></wc-plain-3d-model>
      </div>
    `;
  }
}
