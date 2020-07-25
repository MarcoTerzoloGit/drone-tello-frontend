import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import './button.html';
import './button.scss';

@customElement('wc-button')
export class Button extends LitElement {
  @property({ type: Number }) private height = 60;
  @property({ type: Number }) private width = 60;
  @property({ type: String }) private bgColor = 'teal';
  @property({ type: Number }) private textSize = 16;
  @property({ type: String }) private textColor = 'white';

  public render(): TemplateResult {
    return html`
      <style>
        :root {
          --wc-button__theme__background-color: red;
        }
        button {
          width: ${this.width + 'px'};
          height: ${this.height + 'px'};
          background-color: ${this.bgColor};
          color: ${this.textColor};
          font-size: ${this.textSize + 'px'};
        }
      </style>
      <button @click="${(): void => this.handleClick()}">
        <slot></slot>
      </button>
    `;
  }

  private handleClick(): void {
    this.dispatchEvent(
      new CustomEvent('btnClick', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }),
    );
  }
}
