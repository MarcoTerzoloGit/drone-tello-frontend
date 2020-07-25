import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import './hello-world-view-lit-element';

@customElement('hello-world')
export class HelloWorld extends LitElement {
  @property({ type: Number })
  private value = 0;

  public render(): TemplateResult {
    return html`
      <hello-view @increment="${this.handleIncrement}" value="${this.value.toString()}"> </hello-view>
    `;
  }

  private handleIncrement(): void {
    this.value++;
  }
}
