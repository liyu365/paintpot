import { ITransformable, IRenderState, Bounding } from "../lib/spriteSystem/interface";
import { BaseShape2D } from "../lib/spriteSystem/shapes";
import { Sprite2D } from '../lib/spriteSystem/sprite2d'
import { vec2 } from "../lib/math2d";

export class RaduisLineShap extends BaseShape2D {

  public radius: number = 7
  public pointArr: Array<vec2> = []

  public constructor(pointCount: number = 0, radius: number = 0) {
    super();

    this.radius = radius
    for (let i = 0; i < pointCount; i++) {
      this.pointArr.push(new vec2(0, 0))
    }
  }

  public hitTest(localPt: vec2, transform: ITransformable): boolean {
    return false
  }

  public getBounding(): Bounding {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  }

  public drawRadius(context: CanvasRenderingContext2D, pot1: vec2, pot2: vec2, pot3: vec2): void {
    let rotate = Math.atan2(pot2.y - pot1.y, pot2.x - pot1.x)
    let dx = Math.cos(rotate) * this.radius
    let dy = Math.sin(rotate) * this.radius
    let newPoint1 = new vec2(pot2.x - dx, pot2.y - dy)

    let rotate2 = Math.atan2(pot3.y - pot2.y, pot3.x - pot2.x)
    let dx2 = Math.cos(rotate2) * this.radius
    let dy2 = Math.sin(rotate2) * this.radius
    let newPoint2 = new vec2(pot2.x + dx2, pot2.y + dy2)

    context.lineTo(newPoint1.x, newPoint1.y)
    context.quadraticCurveTo(pot2.x, pot2.y, newPoint2.x, newPoint2.y)
  }

  public draw(transformable: ITransformable, state: IRenderState, context: CanvasRenderingContext2D): void {

    context.beginPath();

    if (this.radius === 0) {
      this.pointArr.forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      });
    } else {
      this.pointArr.forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y);
        } else {
          if (index < this.pointArr.length - 1) {
            this.drawRadius(context, this.pointArr[index - 1], this.pointArr[index], this.pointArr[index + 1])
          } else {
            context.lineTo(point.x, point.y);
          }
        }
      });
    }

    context.stroke();
  }

  public get type(): string {
    return "RaduisLineShap";
  }
}