import { ITransformable, IRenderState } from "../lib/spriteSystem/interface";
import { BaseShape2D } from "../lib/spriteSystem/shapes";
import { Sprite2D } from '../lib/spriteSystem/sprite2d'
import { vec2 } from "../lib/math2d";

export class FlexLineShap extends BaseShape2D {

  public start: vec2;
  public point1: vec2;
  public point2: vec2;
  public end: vec2;

  public constructor(start: vec2, point1: vec2, point2: vec2, end: vec2) {
    super();
    this.start = start
    this.point1 = point1
    this.point2 = point2
    this.end = end
  }

  public hitTest(localPt: vec2, transform: ITransformable): boolean {
    return false
  }

  public draw(transformable: ITransformable, state: IRenderState, context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.moveTo(this.start.x, this.start.y);
    context.lineTo(this.point1.x, this.point1.y);
    context.lineTo(this.point2.x, this.point2.y);
    context.lineTo(this.end.x, this.end.y);
    context.stroke();
  }

  public get type(): string {
    return "FlexLineShap";
  }
}