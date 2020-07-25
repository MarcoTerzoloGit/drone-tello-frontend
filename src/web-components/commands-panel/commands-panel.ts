import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import './commands-panel.html';
import './commands-panel.scss';
import { CommandConfigInterface } from './commands-panel.interface';

@customElement('wc-commands-panel')
export class CommandsPanel extends LitElement {
  @property() commandsConfig: Array<CommandConfigInterface>;

  public render(): TemplateResult {
    return html`
      <style>
        :root {
        }
        .panelContainer {
          height: 160px;
          width: 160px;
          display: flex;
          flex-direction: column;
          background-color: teal;
          border-radius: 50%;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          box-shadow: 0px 4px 20px 0px #2c2727;
        }
        #top {
        }

        #middle {
          display: flex;
          width: 100%;
          justify-content: space-between;
        }

        #bottom {
        }
      </style>
      <div class="panelContainer">
        <div id="top">
          <slot name="top"></slot>
        </div>
        <div id="middle">
          <slot name="middle"></slot>
        </div>
        <div id="bottom">
          <slot name="bottom"></slot>
        </div>
      </div>
    `;
  }
}
