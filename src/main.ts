import { Sprite2DApplication } from "./lib/spriteSystem/sprite2DApplication";
import { ISprite, EOrder, IShape, Bounding } from "./lib/spriteSystem/interface";
import { CanvasMouseEvent, EInputEventType } from "./lib/application";
import { vec2, Math2D } from "./lib/math2d";
import { SpriteNode } from './lib/spriteSystem/sprite2dHierarchicalSystem'
import { LinkFactory } from './factory/LinkFactory'
import { HorizontalFlexLinkFactory } from './factory/HorizontalFlexLinkFactory'
import { VerticalFlexLinkFactory } from './factory/VerticalFlexLinkFactory'
import { PanelPointFactory } from './factory/PanelPointFactory'
import { ContainerFactory } from './factory/ContainerFactory'
import { PanelRectFactory } from './factory/PanelRectFactory'


interface WheelEvent extends Event {
  wheelDelta: number,
  detail: number
}

export enum WheelType {
  UP,
  DOWN
}

export class TopologyApplication {
  private _app: Sprite2DApplication
  private _curZoom = 1
  private lastWheelMouseX = 0
  private lastWheelMouseY = 0
  private _isMouseDown = false
  private _diffX = 0
  private _diffY = 0

  public constructor(app: Sprite2DApplication) {
    this._app = app

    this.init();
    this._app.start();

    const zoomInButton: HTMLElement = document.querySelector('#zoomIN') as HTMLElement
    const zoomOutButton: HTMLElement = document.querySelector('#zoomOut') as HTMLElement
    zoomInButton.onclick = () => {
      this._curZoom *= 1.2
      this.handleScaleChange(this.lastWheelMouseX, this.lastWheelMouseY, WheelType.UP)
    }
    zoomOutButton.onclick = () => {
      this._curZoom /= 1.2
      this.handleScaleChange(this.lastWheelMouseX, this.lastWheelMouseY, WheelType.DOWN)
    }
    this.lastWheelMouseX = this._app.canvas.offsetWidth / 2
    this.lastWheelMouseY = this._app.canvas.offsetHeight / 2


    this._app.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this))
    this._app.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this))
    this._app.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this))
    this._app.canvas.addEventListener('mousewheel', this.handleWheel.bind(this))
    this._app.canvas.addEventListener('DOMMouseScroll', this.handleWheel.bind(this))
  }

  private handleMouseDown(evt: Event): void {
    const root = this._app.rootContainer as SpriteNode
    const rootSpr = root.sprite
    if (rootSpr) {
      let mouseOffset: vec2 = this._app._viewportToCanvasCoordinate(evt as MouseEvent)
      this._diffX = mouseOffset.x - rootSpr.x
      this._diffY = mouseOffset.y - rootSpr.y
      this._isMouseDown = true
    }
  }

  private handleMouseUp(evt: Event): void {
    this._isMouseDown = false
  }

  private handleMouseMove(evt: Event): void {
    const root = this._app.rootContainer as SpriteNode
    const rootSpr = root.sprite
    if (rootSpr) {
      if (this._isMouseDown && !this._app.getDragSprite() || this._app.getDragSprite() === rootSpr) {
        let mouseOffset: vec2 = this._app._viewportToCanvasCoordinate(evt as MouseEvent)
        rootSpr.x = mouseOffset.x - this._diffX
        rootSpr.y = mouseOffset.y - this._diffY
      }
    }
  }

  private handleWheel(evt: Event): void {
    evt.preventDefault()
    let wheelEvt = evt as WheelEvent
    let wheelDelta = wheelEvt.wheelDelta || wheelEvt.detail;		//detail是firefox的属性
    let mouseOffset: vec2 = this._app._viewportToCanvasCoordinate(evt as MouseEvent)
    if (wheelDelta === 120 || wheelDelta === -3 || wheelDelta === -10) {
      // 向上滚
      this._curZoom *= 1.2
      this.handleScaleChange(mouseOffset.x, mouseOffset.y, WheelType.UP)
    } else if (wheelDelta === -120 || wheelDelta === 3 || wheelDelta === 10) {
      // 向下滚
      this._curZoom /= 1.2
      this.handleScaleChange(mouseOffset.x, mouseOffset.y, WheelType.DOWN)
    }
  }

  private handleScaleChange(mouseX: number, mouseY: number, action: WheelType): void {
    const root = this._app.rootContainer as SpriteNode
    const rootSpr = root.sprite
    if (rootSpr) {
      rootSpr.scaleX = this._curZoom
      rootSpr.scaleY = this._curZoom
      let x = 0
      let y = 0
      //感谢 https://www.cnblogs.com/3body/p/9436864.html 这篇文章
      if (action === WheelType.UP) {
        x = (mouseX - rootSpr.x) * 1.2 - (mouseX - rootSpr.x)
        y = (mouseY - rootSpr.y) * 1.2 - (mouseY - rootSpr.y)
      } else if (action === WheelType.DOWN) {
        x = (mouseX - rootSpr.x) / 1.2 - (mouseX - rootSpr.x)
        y = (mouseY - rootSpr.y) / 1.2 - (mouseY - rootSpr.y)
      }
      this.lastWheelMouseX = mouseX // 缓存最后一次滚动滚轮时的鼠标位置，为点击缩放按钮时使用
      this.lastWheelMouseY = mouseY
      rootSpr.x = rootSpr.x - x
      rootSpr.y = rootSpr.y - y
    }
  }

  public spriteMouseAction(spr: ISprite, evt: CanvasMouseEvent): void {
    let position = new vec2(evt.canvasPosition.x, evt.canvasPosition.y)
    let parentSpr = spr.owner.getParentSprite()
    if (parentSpr) {
      position = Math2D.transform(parentSpr.getLocalMatrix(), position) // 把鼠标的坐标用父sprite的局部矩阵进行转换
    }
    if (evt.type === EInputEventType.MOUSEDOWN) {
      spr.diffX = position.x - spr.x
      spr.diffY = position.y - spr.y
    }
    if (evt.type === EInputEventType.MOUSEDRAG) {
      spr.isDragging = true
      spr.x = position.x - spr.diffX
      spr.y = position.y - spr.diffY
      // console.log('相对于根sprite的坐标（而不是canvas）', Math2D.transform(parentSpr.getWorldMatrix2(), new vec2(this.x, this.y)))
      // console.log('局部坐标', new vec2(this.x, this.y))
    }
    if (evt.type === EInputEventType.MOUSEUP) {
      if (spr.isSelected === false && spr.isDragging === false) {
        spr.isSelected = true
      }
      if (spr.isDragging === true) {
        spr.isDragging = false
      }
    }
  }

  public spriteDrawSelected(spr: ISprite, context: CanvasRenderingContext2D, renderOreder: EOrder): void {
    if (renderOreder === EOrder.PREORDER && spr.isSelected === true) {
      let shap: IShape = spr.shape
      let bounding: Bounding = shap.getBounding()
      context.save()
      context.beginPath()
      context.fillStyle = 'rgba(0,0,0,1)'
      context.strokeStyle = 'rgba(0,0,0,1)'
      context.lineWidth = 7
      context.rect(bounding.left, bounding.top, bounding.right - bounding.left, bounding.bottom - bounding.top)
      context.fill()
      context.stroke()
      context.restore()
    }
  }


  private init(): void {
    const root = this._app.rootContainer as SpriteNode

    const panelPointNode1: SpriteNode = PanelPointFactory.create(new vec2(120, 120), 'panelPointNode1', this);
    const panelPointNode2: SpriteNode = PanelPointFactory.create(new vec2(320, 120), 'panelPointNode2', this);
    const panelPointNode3: SpriteNode = PanelPointFactory.create(new vec2(320, 400), 'panelPointNode3', this);



    const containerNode1: SpriteNode = ContainerFactory.create(new vec2(500, 300), this)
    root.addChild(containerNode1);
    const rectNode1: SpriteNode = PanelRectFactory.create(new vec2(0, 0), this)
    const rectNode2: SpriteNode = PanelRectFactory.create(new vec2(60, 60), this)
    const rectNode3: SpriteNode = PanelRectFactory.create(new vec2(0, 0), this)
    containerNode1.addChild(rectNode1)
    containerNode1.addChild(rectNode2)
    root.addChild(rectNode3)




    const containerNode2: SpriteNode = ContainerFactory.create(new vec2(0, 0), this)
    containerNode1.addChild(containerNode2)

    const rectNode2_1: SpriteNode = PanelRectFactory.create(new vec2(0, 0), this)
    const rectNode2_2: SpriteNode = PanelRectFactory.create(new vec2(0, 80), this)
    containerNode2.addChild(rectNode2_1)
    containerNode2.addChild(rectNode2_2)


    LinkFactory.create(panelPointNode1.sprite, panelPointNode2.sprite, '1->2');
    LinkFactory.create(panelPointNode2.sprite, panelPointNode1.sprite, '2->1');
    LinkFactory.create(panelPointNode2.sprite, panelPointNode1.sprite, '2->1');
    LinkFactory.create(panelPointNode2.sprite, panelPointNode1.sprite, '2->1');
    LinkFactory.create(panelPointNode1.sprite, panelPointNode3.sprite, '1->3');
    LinkFactory.create(panelPointNode2.sprite, panelPointNode3.sprite, '2->3');
    LinkFactory.create(panelPointNode2.sprite, panelPointNode3.sprite, '2->3');
    LinkFactory.create(rectNode1.sprite, rectNode2.sprite, 'ii');
    LinkFactory.create(rectNode1.sprite, panelPointNode2.sprite, '88');



    const rectNode4: SpriteNode = PanelRectFactory.create(new vec2(700, 60), this);
    root.addChild(rectNode4);
    const rectNode5: SpriteNode = PanelRectFactory.create(new vec2(850, 300), this);
    root.addChild(rectNode5);
    HorizontalFlexLinkFactory.create(rectNode4.sprite, rectNode5.sprite, '1');
    HorizontalFlexLinkFactory.create(rectNode5.sprite, rectNode4.sprite, '2');

    const rectNode6: SpriteNode = PanelRectFactory.create(new vec2(700, 400), this);
    root.addChild(rectNode6);
    const rectNode7: SpriteNode = PanelRectFactory.create(new vec2(850, 500), this);
    root.addChild(rectNode7);
    VerticalFlexLinkFactory.create(rectNode6.sprite, rectNode7.sprite, '3');
    VerticalFlexLinkFactory.create(rectNode7.sprite, rectNode6.sprite, '4');






    // ContainerFactory.getNodes().forEach(node => {
    //   root.addChild(node);
    // });
    LinkFactory.getNodes().forEach(node => {
      root.addChild(node);
    });
    HorizontalFlexLinkFactory.getNodes().forEach(node => {
      root.addChild(node);
    });
    VerticalFlexLinkFactory.getNodes().forEach(node => {
      root.addChild(node);
    });
    PanelPointFactory.getNodes().forEach(node => {
      root.addChild(node);
    });

  }

}

const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
const app = new Sprite2DApplication(canvas, true)
app.isSupportMouseMove = true
new TopologyApplication(app);