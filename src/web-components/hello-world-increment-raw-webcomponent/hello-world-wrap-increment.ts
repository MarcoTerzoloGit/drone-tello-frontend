import './hello-world-increment-webcomponent';

export class HelloWorldWrap extends HTMLElement {
  private helloViewEl: HTMLElement | null = null;
  private value = 0;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    this.helloViewEl = document.createElement('hello-world-increment');
    this.helloViewEl.setAttribute('value', this.value.toString());
    this.helloViewEl.addEventListener('increment', this.handleIncrement);
    shadow.appendChild(this.helloViewEl);
  }

  public disconnectedCallback(): void {
    if (this.helloViewEl === null) {
      return;
    }
    this.helloViewEl.removeEventListener('increment', this.handleIncrement);
  }

  private handleIncrement = (): void => {
    if (this.helloViewEl === null) {
      return;
    }
    this.value += 1;
    this.helloViewEl.setAttribute('value', this.value.toString());
  };
}
