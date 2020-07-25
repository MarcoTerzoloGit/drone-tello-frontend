import { css, customElement, html, LitElement, property, CSSResult, TemplateResult } from 'lit-element';

@customElement('hello-view')
class HelloView extends LitElement {
  static get styles(): CSSResult {
    return css`
      #root {
        text-align: center;
      }
    `;
  }

  @property({ type: String })
  private value = '';

  public render(): TemplateResult {
    return html`
      <div id="root">
        lit element web component:
        <span>${this.value}</span>
        <button @click="${this.handleClick}">Increment</button>
      </div>
    `;
  }

  private handleClick(): void {
    this.dispatchEvent(new CustomEvent('increment'));
  }
}

export default HelloView;

// NOTE keep for info

// So, instead of this:

// customElements.define('x-my-element', class extends LitElement {
//   static get styles() {
//     return css`.whatever{}`
//   }
// })
// You can export something like this:

// export default theme => {
//   customElements.define('x-my-element', class extends LitElement {
//     static get styles() {
//       return [theme, css`.whatever{}`]
//     }
//   }
// }
// Then you can use your globally-themed component like:

// import MyElement from './my-element.js'

// const theme = css`.global-things{}`

// MyElement(theme)
