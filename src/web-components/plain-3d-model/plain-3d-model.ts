import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import { FlightDataInterface } from '../../services/socket.interface';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@customElement('wc-plain-3d-model')
export class Plain3DModel extends LitElement {
  @property() private flightData: FlightDataInterface;

  @property() private camera: any;
  @property() private scene: any;
  @property() private renderer: THREE.WebGLRenderer;
  @property() private clock: any;
  @property() private mixers = new Array<THREE.AnimationMixer>();
  @property() private hemisphere: any;
  @property() private mainLight: THREE.DirectionalLight;
  @property() directionalLightOptions = {
    color: 0xffffff,
    intensity: 5,
  };
  @property() hemisphereOptions = {
    skyColor: 0xddeeff,
    groundColor: 0x0f0e0d,
    intensity: 5,
  };
  @property() private model: THREE.Group;
  @property() private modelPath = {
    drone: 'src/assets/gltf/drones/s9_mini_drone/scene.gltf',
    parrot: 'src/assets/gltf/parrot/Parrot.glb',
  };

  @property() private timer = 0;
  @property() private t = 0;
  @property() private dt = 0.02;

  constructor() {
    super();
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.renderer = this.buildRenderer();
    this.camera = this.buildCamera();
    this.createLight();
  }

  connectedCallback(): void {
    const loader = new GLTFLoader();
    loader.load(
      //'https://rawcdn.githack.com/mrdoob/three.js/7249d12dac2907dac95d36227d62c5415af51845/examples/models/gltf/Parrot.glb',
      this.modelPath.drone,
      model => this.onModelLoad(model),
    );
    window.addEventListener('resize', this.onWindowResize);

    // this.mockkone();
    this.render3D();
  }

  public render(): TemplateResult {
    return html``;
  }

  render3D(): void {
    window.requestAnimationFrame(() => this.render3D());
    const delta = this.clock.getDelta();

    if (this.flightData) {
      // const newX = this.lerp(this.model.rotation.x, this.flightData.pitch, this.ease(this.dt));
      // const newY = this.lerp(this.model.rotation.y, this.flightData.yaw, this.ease(this.dt));
      // const newZ = this.lerp(this.model.rotation.z, this.flightData.roll, this.ease(this.dt));

      // const { x, y, z } = this.setFlightData('parrot');
      const { x, y, z } = this.setFlightData('drone');

      this.model.rotation.set(x, y, z);
    }

    this.mixers.forEach(x => x.update(delta));
    this.renderer.render(this.scene, this.camera);
  }

  // INIT
  private buildCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

    camera.position.set(0, 0, -10);
    camera.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);

    return camera;
  }

  private buildRenderer(): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.shadowRoot.appendChild(renderer.domElement);

    return renderer;
  }

  private createLight = (): void => {
    this.hemisphere = new THREE.HemisphereLight(
      this.hemisphereOptions.skyColor,
      this.hemisphereOptions.groundColor,
      this.hemisphereOptions.intensity,
    );

    this.mainLight = new THREE.DirectionalLight(
      this.directionalLightOptions.color,
      this.directionalLightOptions.intensity,
    );
    this.mainLight.position.set(10, 10, 10);

    this.scene.add(this.hemisphere, this.mainLight);
  };

  private onModelLoad(gltf: any): void {
    console.log('GLTF', gltf);

    this.model = gltf.scene.children[0];
    this.model.scale.set(0.7, 0.7, 0.7);

    const animation = gltf.animations[0];
    const mixer = new THREE.AnimationMixer(this.model);
    this.mixers.push(mixer);

    const action = mixer.clipAction(animation);
    action.play();

    this.scene.add(this.model);
  }

  setFlightData(type: string): { x: number; y: number; z: number } {
    switch (type) {
      case 'drone':
        return {
          x: this.flightData.roll, // 45deg is start position
          y: this.flightData.pitch,
          z: this.flightData.yaw, // +45 for reald data?
        };
      case 'parrot':
        return {
          x: -this.flightData.roll,
          y: this.flightData.yaw,
          z: this.flightData.pitch,
        };

      default:
        return {
          x: 0,
          y: 0,
          z: 0,
        };
    }
  }

  // EVENTS
  onWindowResize = (): void => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer && this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  // ANIMATION
  private lerp(a: any, b: any, t: any): number {
    return a + (b - a) * t;
  }

  private ease(time: number): number {
    return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
  }
}
