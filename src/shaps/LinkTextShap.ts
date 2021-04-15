import { ITransformable, IRenderState } from "../lib/spriteSystem/interface";
import { BaseShape2D } from "../lib/spriteSystem/shapes";
import { Sprite2D } from '../lib/spriteSystem/sprite2d'
import { vec2 } from "../lib/math2d";

export class LinkTextShap extends BaseShape2D {

  public constructor() {
    super();
  }
  public hitTest(localPt: vec2, transform: ITransformable): boolean {
    return false
  }

  public draw(transformable: ITransformable, state: IRenderState, context: CanvasRenderingContext2D,): void {
    const spr = transformable as Sprite2D
    const text = spr.data.text

    context.save()
    context.font = "14px Arial";
    context.textBaseline = "middle"
    context.textAlign = "left"
    const w = context.measureText(text).width
    const h = context.measureText('田').width
    const padding = 4
    const Xdeviation = - (w + 2 * padding) / 2 // x轴的偏移量
    const Ydeviation = - (h + 2 * padding) / 2 // y轴的偏移量

    context.save()
    context.beginPath();
    context.fillStyle = "rgba(0, 0, 255, 0.8)"
    this.drawRoundRect(context, Xdeviation, Ydeviation, w + 2 * padding, h + 2 * padding, 6)
    //context.rect(Xdeviation , 0 ,w + 2 * padding, h + 2 * padding)
    context.fill()
    context.restore()

    context.save()
    context.beginPath();
    context.fillStyle = "rgba(255, 255, 255, 1)"
    context.fillText(text, padding + Xdeviation, padding + h / 2 + Ydeviation + 1)
    context.restore()

    context.restore()
  }

  private drawRoundRect(cxt: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    cxt.beginPath();
    cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
    cxt.lineTo(width - radius + x, y);
    cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
    cxt.lineTo(width + x, height + y - radius);
    cxt.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
    cxt.lineTo(radius + x, height + y);
    cxt.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
    cxt.closePath();
  }

  public get type(): string {
    return "LinkTextShap";
  }
}