import template from './hello-world-increment-webcomponent.html';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class HelloWorldIncrement extends HTMLElement {
  private buttonEl: HTMLElement | null = null;
  private value = 0;
  private valueEl: HTMLElement | null = null;

  static get observedAttributes(): Array<string> {
    return ['value'];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(templateEl.content.cloneNode(true));

    this.valueEl = shadow.getElementById('root__value');
    this.buttonEl = shadow.getElementById('root__button');

    if (this.buttonEl === null) {
      return;
    }

    this.buttonEl.addEventListener('click', this.handleClick);
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (this.valueEl === null) {
      return;
    }
    switch (name) {
      case 'value':
        this.valueEl.textContent = newValue;
        break;
    }
  }

  public disconnectedCallback(): void {
    if (this.buttonEl === null) {
      return;
    }
    this.buttonEl.removeEventListener('click', this.handleClick);
  }

  private handleClick = (): void => {
    if (this.valueEl === null) {
      return;
    }
    this.dispatchEvent(new CustomEvent('increment'));
  };
}
