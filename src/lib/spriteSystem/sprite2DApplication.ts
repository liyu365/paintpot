import { Canvas2DApplication, CanvasMouseEvent, CanvasKeyBoardEvent } from "../application";
import { ISpriteContainer, IDispatcher, ISprite } from "./interface";
import { Sprite2DManager } from "./sprite2dSystem";
import { SpriteNodeManager } from "./sprite2dHierarchicalSystem"

export class Sprite2DApplication extends Canvas2DApplication {
  protected _dispatcher: IDispatcher;

  public constructor(canvas: HTMLCanvasElement, isHierarchical: boolean = true) {
    document.oncontextmenu = function () {
      return false;
    }

    super(canvas);
    if (isHierarchical === true) {
      this._dispatcher = new SpriteNodeManager(canvas.width, canvas.height);
    } else {
      this._dispatcher = new Sprite2DManager();
    }
  }

  public get rootContainer(): ISpriteContainer {
    return this._dispatcher.container;
  }

  public set rootContainer(spr: ISpriteContainer) {
    this._dispatcher.container = spr;
  }

  public update(msec: number, diff: number): void {
    this._dispatcher.dispatchUpdate(msec, diff);
  }

  public render(): void {
    if (this.context2D) {
      this.context2D.clearRect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height);
      this._dispatcher.dispatchDraw(this.context2D);
    }
  }

  // 返回正在被拖动的sprite
  public getDragSprite(): ISprite | undefined {
    return this._dispatcher.dragSprite
  }

  // 返回鼠标命中的sprite
  public getHitSprite(): ISprite | undefined {
    return this._dispatcher.hitSprite
  }

  protected dispatchMouseDown(evt: CanvasMouseEvent): void {
    super.dispatchMouseDown(evt);
    this._dispatcher.dispatchMouseEvent(evt);
  }

  protected dispatchMouseUp(evt: CanvasMouseEvent): void {
    super.dispatchMouseUp(evt);
    this._dispatcher.dispatchMouseEvent(evt);
  }

  protected dispatchMouseMove(evt: CanvasMouseEvent): void {
    super.dispatchMouseMove(evt);
    this._dispatcher.dispatchMouseEvent(evt);
  }

  protected dispatchMouseDrag(evt: CanvasMouseEvent): void {
    super.dispatchMouseDrag(evt);
    this._dispatcher.dispatchMouseEvent(evt);
  }

  protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void {
    super.dispatchKeyDown(evt);
    this._dispatcher.dispatchKeyEvent(evt);
  }

  protected dispatchKeyUp(evt: CanvasKeyBoardEvent): void {
    super.dispatchKeyUp(evt);
    this._dispatcher.dispatchKeyEvent(evt);
  }

  protected dispatchKeyPress(evt: CanvasKeyBoardEvent): void {
    super.dispatchKeyPress(evt);
    this._dispatcher.dispatchKeyEvent(evt);
  }
}

