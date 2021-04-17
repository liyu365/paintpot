import { SpriteNode } from './../lib/spriteSystem/sprite2dHierarchicalSystem';
import { Sprite2D } from './../lib/spriteSystem/sprite2d';
import { ITransformable, IRenderState, ISprite, EOrder, Bounding } from "../lib/spriteSystem/interface";
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
    //super.draw(transformable, state, context);
  }

  public get type(): string {
    return "ContainerShap";
  }
}

//let containerShap = new ContainerShap(0, 0, 50, 50)

export class ContainerSprite extends Sprite2D {
  public constructor() {
    super(new Rect(0, 0, 50, 50), 'containerSprite')
  }
  public fillStyle = 'rgba(0,0,0,.3)'
  // public diffX = 0
  // public diffY = 0
  // public mouseEvent = (spr: ISprite, evt: CanvasMouseEvent): void => {
  //   let parentSpr = spr.owner.getParentSprite()
  //   if (parentSpr) {
  //     const worldPosition = new vec2(evt.canvasPosition.x, evt.canvasPosition.y)
  //     const localPosition = Math2D.transform(parentSpr.getLocalMatrix(), worldPosition) // 把鼠标的坐标用父sprite的局部矩阵进行转换
  //     if (evt.type === EInputEventType.MOUSEDOWN) {
  //       this.diffX = localPosition.x - this.x
  //       this.diffY = localPosition.y - this.y
  //     }
  //     if (evt.type === EInputEventType.MOUSEDRAG) {
  //       this.x = localPosition.x - this.diffX
  //       this.y = localPosition.y - this.diffY
  //       // console.log('相对于根sprite的坐标（而不是canvas）', Math2D.transform(parentSpr.getWorldMatrix2(), new vec2(this.x, this.y)))
  //       // console.log('局部坐标', new vec2(this.x, this.y))
  //     }
  //   }

  // }
  public updateEvent = (spr: ISprite, mesc: number, diffSec: number, travelOrder: EOrder): void => {
    let padding: number = 20
    let minX = 1e7
    let minY = 1e7
    let maxW = -1e7
    let maxH = -1e7

    let parentSprNode = spr.owner as SpriteNode

    if (parentSprNode && parentSprNode.children && parentSprNode.children.length > 0) {

      let shape = spr.shape as Rect

      let childSprArr: Array<Sprite2D> = []
      parentSprNode.children.forEach(childSprNode => {
        let childSpr = childSprNode.data as Sprite2D
        childSprArr.push(childSpr)
      })

      // childSprArr.forEach(childSpr => {
      //   if (childSpr.x < 0) {
      //     let move = childSpr.x
      //     childSpr.x = 0
      //     spr.x = spr.x + move
      //     childSprArr.forEach(cspr => {
      //       if (cspr !== childSpr) {
      //         cspr.x = cspr.x - move
      //       }
      //     })
      //   }
      //   if (childSpr.x + 20 > shape.w) {
      //     shape.w = childSpr.x + 20
      //   }
      //   if (childSpr.y < 0) {
      //     let move = childSpr.y
      //     childSpr.y = 0
      //     spr.y = spr.y + move
      //     childSprArr.forEach(cspr => {
      //       if (cspr !== childSpr) {
      //         cspr.y = cspr.y - move
      //       }
      //     })
      //   }
      //   if (childSpr.y + 20 > shape.h) {
      //     shape.h = childSpr.y + 20
      //   }
      // })



      childSprArr.forEach(childSpr => {
        let bounding: Bounding = childSpr.shape.getBounding()
        if (childSpr.x + bounding.left < minX) {
          minX = childSpr.x + bounding.left
        }
        if (childSpr.y + bounding.top < minY) {
          minY = childSpr.y + bounding.top
        }
        if (childSpr.x + bounding.right > maxW) {
          maxW = childSpr.x + bounding.right
        }
        if (childSpr.y + bounding.bottom > maxH) {
          maxH = childSpr.y + bounding.bottom
        }
      })

      if (padding === 0) {
        spr.x = spr.x + minX
        childSprArr.forEach(cspr => {
          cspr.x = cspr.x - minX
        })

        spr.y = spr.y + minY
        childSprArr.forEach(cspr => {
          cspr.y = cspr.y - minY
        })

        shape.width = maxW
        shape.height = maxH
      } else if (padding > 0) {
        spr.x = spr.x + minX - padding
        childSprArr.forEach(cspr => {
          cspr.x = cspr.x - minX + padding
        })

        spr.y = spr.y + minY - padding
        childSprArr.forEach(cspr => {
          cspr.y = cspr.y - minY + padding
        })

        shape.width = maxW + padding
        shape.height = maxH + padding
      }


      // let parentSpr = spr.owner.getParentSprite()
      // if (parentSpr) {
      //   let dot1 = Math2D.transform(spr.getWorldMatrix2(), new vec2(minX, minY))
      //   let dot2 = Math2D.transform(spr.getWorldMatrix2(), new vec2(maxW - minX, maxH - minY))
      //   spr.x = dot1.x
      //   spr.y = dot1.y
      // }




      // let shape = spr.shape as ContainerShap

      // shape.x = minX
      // shape.w = maxW - minX
      // shape.y = minY
      // shape.h = maxH - minY

      // if (padding > 0) {
      //   shape.x = minX - padding
      //   shape.w = maxW - minX + padding * 2
      //   shape.y = minY - padding
      //   shape.h = maxH - minY + padding * 2
      // }
    }

  }
}