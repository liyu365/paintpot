import { ISprite, SpriteFactory, IShape, EOrder } from "./lib/spriteSystem/interface";
import { Sprite2DApplication } from "./lib/spriteSystem/sprite2DApplication";
import { CanvasMouseEvent, EInputEventType } from "./lib/application";
import { vec2, Math2D } from "./lib/math2d";
import { Line, Rect } from "./lib/spriteSystem/shapes";
import { SpriteNode, SpriteNodeGroup } from './lib/spriteSystem/sprite2dHierarchicalSystem'
import { Sprite2D } from './lib/spriteSystem/sprite2d'

import { CNodeTextShap } from './shaps/CNodeTextShap'
import { LinkTextShap } from './shaps/LinkTextShap'
import { ContainerSprite } from './shaps/ContainerShap'
import { RectSpr } from './shaps/RectShap'

import { LinkNodeFactory } from './factory/LinkNodeFactory'


class topologyApplication {
  private _app: Sprite2DApplication
  private _circleShap: IShape
  private _rectShap: IShape
  private _arrowShap: IShape
  private _cNodes: Array<SpriteNode> = []
  private _linkNodes: Array<SpriteNode> = []
  private _linkGroups: Array<SpriteNodeGroup> = []
  private _sameLinkGap = 25
  private _linkCircleGap = 5
  private _circleRadius = 30
  private _curZoom = 1
  private _inkNodeFactory = new LinkNodeFactory()

  public constructor(app: Sprite2DApplication) {
    this._app = app
    this._circleShap = SpriteFactory.createCircle(this._circleRadius)
    this._rectShap = SpriteFactory.createRect(20, 10)
    this._arrowShap = SpriteFactory.createPolygon([new vec2(5, 0), new vec2(0, 5), new vec2(0, -5)])

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

  private createCNode(position: vec2, name: string): SpriteNode {
    const circle: ISprite = SpriteFactory.createSprite(this._circleShap);
    circle.fillStyle = 'red'
    circle.x = position.x
    circle.y = position.y
    // circle.mouseEvent = this.handleCircleEvent.bind(this)

    const circleN = new SpriteNode(circle)

    const textSpr: ISprite = new Sprite2D(new CNodeTextShap(), 'textSpr')
    textSpr.showCoordSystem = false
    textSpr.x = 0
    textSpr.y = this._circleRadius + 10;
    textSpr.data = {}
    textSpr.data.text = name
    circleN.addSprite(textSpr);

    this._cNodes.push(circleN)

    return circleN
  }

  private createLink(node1: ISprite | undefined, node2: ISprite | undefined, name: string): void {
    this._inkNodeFactory.addLink(node1, node2, name)
  }

  private init(): void {
    const node1: SpriteNode = this.createCNode(new vec2(120, 120), 'node1');
    const node2: SpriteNode = this.createCNode(new vec2(320, 120), 'node2');
    const node3: SpriteNode = this.createCNode(new vec2(320, 400), 'node3');
    this.createLink(node1.sprite, node2.sprite, '1->2');
    this.createLink(node2.sprite, node1.sprite, '2->1');
    this.createLink(node2.sprite, node1.sprite, '2->1');
    this.createLink(node2.sprite, node1.sprite, '2->1');
    this.createLink(node1.sprite, node3.sprite, '1->3');
    this.createLink(node2.sprite, node3.sprite, '2->3');
    this.createLink(node2.sprite, node3.sprite, '2->3');


    const root = this._app.rootContainer as SpriteNode


    const containerSpr: Sprite2D = new ContainerSprite()
    containerSpr.x = 500
    containerSpr.y = 300
    root.addSprite(containerSpr)

    const rectSpr1: Sprite2D = new RectSpr()
    const rectSpr2: Sprite2D = new RectSpr()
    const rectSpr3: Sprite2D = new RectSpr()
    rectSpr2.x = 60
    rectSpr2.y = 60
    containerSpr.owner.addSprite(rectSpr1)
    containerSpr.owner.addSprite(rectSpr2)
    root.addSprite(rectSpr3)

    this.createLink(rectSpr1, rectSpr2, 'ii');
    this.createLink(rectSpr1, node2.sprite, '88');


    const containerSpr2: Sprite2D = new ContainerSprite()
    containerSpr2.x = 0
    containerSpr2.y = 0
    containerSpr.owner.addSprite(containerSpr2)

    const rectSpr2_1: Sprite2D = new RectSpr()
    const rectSpr2_2: Sprite2D = new RectSpr()
    rectSpr2_2.y = 80
    containerSpr2.owner.addSprite(rectSpr2_1)
    containerSpr2.owner.addSprite(rectSpr2_2)


    this._inkNodeFactory._linkGroups.forEach(node => {
      root.addChild(node);
    });
    this._cNodes.forEach(node => {
      root.addChild(node);
    });

  }

}

const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
new topologyApplication(new Sprite2DApplication(canvas, true));