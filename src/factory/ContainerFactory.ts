import { ISprite, SpriteFactory, IShape, EOrder, Bounding } from "../lib/spriteSystem/interface";
import { Sprite2DApplication } from "../lib/spriteSystem/sprite2DApplication";
import { CanvasMouseEvent, EInputEventType } from "../lib/application";
import { vec2, Math2D } from "../lib/math2d";
import { Line, Rect } from "../lib/spriteSystem/shapes";
import { SpriteNode, SpriteNodeGroup } from '../lib/spriteSystem/sprite2dHierarchicalSystem'
import { Sprite2D } from '../lib/spriteSystem/sprite2d'

import { CNodeTextShap } from '../shaps/CNodeTextShap'
import { LinkTextShap } from '../shaps/LinkTextShap'

export class ContainerFactory {

  private static _sprites: Array<Sprite2D> = []
  private static _nodes: Array<SpriteNode> = []

  public static create(position: vec2): SpriteNode {
    let containerSpr = new Sprite2D(SpriteFactory.createRect(50, 50), 'containerSprite') // 这里shap不能指向同一个对象，因为在updateEvent中会去修改shap对象
    containerSpr.x = position.x
    containerSpr.y = position.y
    containerSpr.fillStyle = 'rgba(0,0,0,.3)'
    containerSpr.updateEvent = this.handleUpdateEvent.bind(this)
    containerSpr.mouseEvent = (spr: ISprite, evt: CanvasMouseEvent) => {
      containerSpr.dragMove(spr, evt)
    }


    const sprNode = new SpriteNode(containerSpr)


    this._nodes.push(sprNode)
    return sprNode
  }


  private static handleUpdateEvent(spr: ISprite, mesc: number, diffSec: number, travelOrder: EOrder): void {
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

  public static getSprites(): Array<Sprite2D> {
    return ContainerFactory._sprites
  }

  public static getNodes(): Array<SpriteNode> {
    return this._nodes
  }
}