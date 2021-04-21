import { Sprite2DApplication } from "./lib/spriteSystem/sprite2DApplication";
import { vec2 } from "./lib/math2d";
import { SpriteNode } from './lib/spriteSystem/sprite2dHierarchicalSystem'
import { Sprite2D } from './lib/spriteSystem/sprite2d'
import { LinkFactory } from './factory/LinkFactory'
import { PanelPointFactory } from './factory/PanelPointFactory'
import { ContainerFactory } from './factory/ContainerFactory'
import { PanelRectFactory } from './factory/PanelRectFactory'


class topologyApplication {
  private _app: Sprite2DApplication
  private _curZoom = 1

  public constructor(app: Sprite2DApplication) {
    this._app = app

    this.init();
    this._app.start();

    const zoomInButton: HTMLElement = document.querySelector('#zoomIN') as HTMLElement
    const zoomOutButton: HTMLElement = document.querySelector('#zoomOut') as HTMLElement
    zoomInButton.onclick = () => {
      this._curZoom *= 1.2
      this.handleZoomChange()
    }
    zoomOutButton.onclick = () => {
      this._curZoom /= 1.2
      this.handleZoomChange()
    }
  }

  private handleZoomChange(): void {
    const root = this._app.rootContainer as SpriteNode
    const rootSpr = root.sprite
    const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
    if (rootSpr) {
      rootSpr.scaleX = this._curZoom
      rootSpr.scaleY = this._curZoom
      if (canvas) {
        const mouseX = (canvas.offsetWidth / 2)
        const mouseY = (canvas.offsetHeight / 2)

        // let mouseX = 320
        // let mouseY = 120
        const newW = canvas.offsetWidth * this._curZoom
        const newH = canvas.offsetHeight * this._curZoom
        const x = mouseX - mouseX / canvas.offsetWidth * newW // mouseX - mouseX映射到新宽度中的x坐标
        const y = mouseY - mouseY / canvas.offsetHeight * newH
        rootSpr.x = x
        rootSpr.y = y
      }
    }
  }


  private init(): void {
    const root = this._app.rootContainer as SpriteNode

    const node1: SpriteNode = PanelPointFactory.create(new vec2(120, 120), 'node1');
    const node2: SpriteNode = PanelPointFactory.create(new vec2(320, 120), 'node2');
    const node3: SpriteNode = PanelPointFactory.create(new vec2(320, 400), 'node3');
    LinkFactory.create(node1.sprite, node2.sprite, '1->2');
    LinkFactory.create(node2.sprite, node1.sprite, '2->1');
    LinkFactory.create(node2.sprite, node1.sprite, '2->1');
    LinkFactory.create(node2.sprite, node1.sprite, '2->1');
    LinkFactory.create(node1.sprite, node3.sprite, '1->3');
    LinkFactory.create(node2.sprite, node3.sprite, '2->3');
    LinkFactory.create(node2.sprite, node3.sprite, '2->3');


    const containerSpr: Sprite2D = ContainerFactory.create()
    containerSpr.x = 500
    containerSpr.y = 300
    root.addSprite(containerSpr)

    const rectSpr1: Sprite2D = PanelRectFactory.create()
    const rectSpr2: Sprite2D = PanelRectFactory.create()
    const rectSpr3: Sprite2D = PanelRectFactory.create()
    rectSpr2.x = 60
    rectSpr2.y = 60
    containerSpr.owner.addSprite(rectSpr1)
    containerSpr.owner.addSprite(rectSpr2)
    root.addSprite(rectSpr3)

    LinkFactory.create(rectSpr1, rectSpr2, 'ii');
    LinkFactory.create(rectSpr1, node2.sprite, '88');


    const containerSpr2: Sprite2D = ContainerFactory.create()
    containerSpr2.x = 0
    containerSpr2.y = 0
    containerSpr.owner.addSprite(containerSpr2)

    const rectSpr2_1: Sprite2D = PanelRectFactory.create()
    const rectSpr2_2: Sprite2D = PanelRectFactory.create()
    rectSpr2_2.y = 80
    containerSpr2.owner.addSprite(rectSpr2_1)
    containerSpr2.owner.addSprite(rectSpr2_2)


    LinkFactory._linkGroups.forEach(node => {
      root.addChild(node);
    });
    PanelPointFactory.getNodes().forEach(node => {
      root.addChild(node);
    });

  }

}

const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
new topologyApplication(new Sprite2DApplication(canvas, true));