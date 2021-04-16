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
    // context.beginPath();
    // context.moveTo(this.x, this.y);
    // context.lineTo(this.x + this.width, this.y);
    // context.lineTo(this.x + this.width, this.y + this.height);
    // context.lineTo(this.x, this.y + this.height);
    // context.closePath();
    // this.width = 200
    super.draw(transformable, state, context);
  }

  public get type(): string {
    return "MyRect";
  }
}

let myRect = new MyRect(20, 20)

export class RectSpr extends Sprite2D {
  public constructor() {
    super(myRect, 'RectSpr')
  }
  public fillStyle = 'orange'
  public mouseEvent = (spr: ISprite, evt: CanvasMouseEvent): void => {
    let parentSpr = spr.owner.getParentSprite()
    if (evt.type === EInputEventType.MOUSEDRAG) {
      if (parentSpr) {
        const position = new vec2(evt.canvasPosition.x, evt.canvasPosition.y)
        const newPosition = Math2D.transform(parentSpr.getLocalMatrix(), position); // 把鼠标的坐标用父sprite的局部矩阵进行转换
        this.x = newPosition.x
        this.y = newPosition.y
        console.log('全局坐标', Math2D.transform(parentSpr.getWorldMatrix2(), new vec2(this.x, this.y)))
        console.log('局部坐标', new vec2(this.x, this.y))
      }

    }
  }
}