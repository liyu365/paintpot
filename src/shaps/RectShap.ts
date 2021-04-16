import { ITransformable, IRenderState, ISprite, IShape } from "../lib/spriteSystem/interface";
import { BaseShape2D, Rect } from "../lib/spriteSystem/shapes";
import { Sprite2D } from '../lib/spriteSystem/sprite2d'
import { vec2, Math2D } from "../lib/math2d";
import { CanvasMouseEvent, EInputEventType } from "../lib/application";

export class MyRect extends Rect {
  public constructor(w: number = 1, h: number = 1, u: number = 0, v: number = 0) {
    super(w, h, u, v);
  }

  public draw(transformable: ITransformable, state: IRenderState, context: CanvasRenderingContext2D): void {
    super.draw(transformable, state, context);
  }

  public get type(): string {
    return "MyRect";
  }
}

let myRect = new MyRect(20, 20, 0.5, 0.5)

export class RectSpr extends Sprite2D {
  public constructor() {
    super(myRect, 'RectSpr')
  }
  public fillStyle = 'orange'
  public diffX = 0
  public diffY = 0
  public mouseEvent = (spr: ISprite, evt: CanvasMouseEvent): void => {
    let parentSpr = spr.owner.getParentSprite()
    if (parentSpr) {
      const worldPosition = new vec2(evt.canvasPosition.x, evt.canvasPosition.y)
      const localPosition = Math2D.transform(parentSpr.getLocalMatrix(), worldPosition) // 把鼠标的坐标用父sprite的局部矩阵进行转换
      if (evt.type === EInputEventType.MOUSEDOWN) {
        this.diffX = localPosition.x - this.x
        this.diffY = localPosition.y - this.y
      }
      if (evt.type === EInputEventType.MOUSEDRAG) {
        this.x = localPosition.x - this.diffX
        this.y = localPosition.y - this.diffY
        // console.log('相对于根sprite的坐标（而不是canvas）', Math2D.transform(parentSpr.getWorldMatrix2(), new vec2(this.x, this.y)))
        // console.log('局部坐标', new vec2(this.x, this.y))
      }
    }

  }
}