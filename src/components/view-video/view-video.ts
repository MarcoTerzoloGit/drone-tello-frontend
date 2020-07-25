import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import { VideoStreamDataInterface } from '../../services/socket.interface';

@customElement('wc-view-video')
export class ViewVideo extends LitElement {
  @property() streamData: VideoStreamDataInterface;

  public render(): TemplateResult {
    return html`
      <style>
        :root {
        }
        :host {
          height: 100%;
        }
        .wc-view-video {
          background-image: radial-gradient(circle at top, rgb(38, 48, 91), rgb(0, 0, 0));
          height: 100%;
          /* padding-top: 180px; */
        }
      </style>

      <div class="wc-view-video"></div>
    `;
  }
}
