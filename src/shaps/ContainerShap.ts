import { SpriteNode } from './../lib/spriteSystem/sprite2dHierarchicalSystem';
import { Sprite2D } from './../lib/spriteSystem/sprite2d';
import { ITransformable, IRenderState, ISprite, IShape } from "../lib/spriteSystem/interface";
import { BaseShape2D, Rect } from "../lib/spriteSystem/shapes";
import { vec2, Math2D } from "../lib/math2d";
import { CanvasMouseEvent, EInputEventType } from "../lib/application";

export class ContainerShap extends BaseShape2D {

  public x: number;
  public y: number;
  public w: number;
  public h: number;

  public constructor(x: number, y: number, w: number, h: number) {
    super()
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  public hitTest(localPt: vec2, transform: ITransformable): boolean {
    return Math2D.isPointInRect(localPt.x, localPt.y, this.x, this.y, this.w, this.h);
  }

  public draw(transformable: ITransformable, state: IRenderState, context: CanvasRenderingContext2D): void {
    context.save()
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.w, this.y);
    context.lineTo(this.x + this.w, this.y + this.h);
    context.lineTo(this.x, this.y + this.h);
    context.closePath();

    context.fill();
    context.restore()

    let padding: number = 20
    let minX = 1e7
    let minY = 1e7
    let maxW = -1e7
    let maxH = -1e7
    let parentSpr = transformable as Sprite2D
    let parentSprNode = parentSpr.owner as SpriteNode
    if (parentSprNode && parentSprNode.children && parentSprNode.children.length > 0) {
      parentSprNode.children.forEach(childSprNode => {
        let childSpr = childSprNode.data as Sprite2D
        if (childSpr.x < minX) {
          minX = childSpr.x
        }

        if (childSpr.y < minY) {
          minY = childSpr.y
        }

        if (childSpr.x + 20 > maxW) {
          maxW = childSpr.x + 20
        }

        if (childSpr.y + 20 > maxH) {
          maxH = childSpr.y + 20
        }
      })
    }

    this.x = minX
    this.w = maxW - minX
    this.y = minY
    this.h = maxH - minY

    if (padding > 0) {
      this.x = minX - padding
      this.w = maxW - minX + padding * 2
      this.y = minY - padding
      this.h = maxH - minY + padding * 2
    }


    //super.draw(transformable, state, context);
  }

  public get type(): string {
    return "ContainerShap";
  }
}

let containerShap = new ContainerShap(0, 0, 50, 50)

export class ContainerSprite extends Sprite2D {
  public constructor() {
    super(containerShap, 'containerSprite')
  }
  public fillStyle = 'silver'
  public mouseEvent = (spr: ISprite, evt: CanvasMouseEvent): void => {
    let parentSpr = spr.owner.getParentSprite()
    if (evt.type === EInputEventType.MOUSEDRAG) {
      if (parentSpr) {
        const position = new vec2(evt.canvasPosition.x, evt.canvasPosition.y)
        const newPosition = Math2D.transform(parentSpr.getLocalMatrix(), position); // 把鼠标的坐标用父sprite的局部矩阵进行转换
        this.x = newPosition.x
        this.y = newPosition.y
      }
    }
  }
}