import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';

@customElement('wc-battery-wave')
export class BatteryWave extends LitElement {
  @property({ type: Number }) private battery = 80;

  public render(): TemplateResult {
    const batteryColor = this.battery > 75 ? 'green' : this.battery > 25 ? 'orange' : 'red';

    return html`
      <style>
        :root {
        }
        rect {
          transition: all 4s linear;
        }
      </style>

      <div style="height: 200px; width: 100vw">
        <svg
          viewBox="0 0 1400 400"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <clipPath id="wave">
              <path
                fill="#0099ff"
                fill-opacity="1"
                d="M0,256L120,234.7C240,213,480,171,720,138.7C960,107,1200,85,1320,74.7L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
              ></path>
            </clipPath>
          </defs>
          <rect x="0" y="0" fill="${batteryColor}" width="100%" height="100%" clip-path="url(#wave)" />
          <rect x="${this.battery + '%'}" y="0" fill="teal" width="100%" height="100%" clip-path="url(#wave)" />
        </svg>
      </div>
    `;
  }
}
