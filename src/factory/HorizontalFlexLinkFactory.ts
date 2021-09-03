import { ISprite, SpriteFactory, IShape, EOrder, NodeType } from "../lib/spriteSystem/interface";
import { CanvasMouseEvent } from "../lib/application";
import { vec2, Math2D } from "../lib/math2d";
import { SpriteNode, SpriteNodeGroup } from '../lib/spriteSystem/sprite2dHierarchicalSystem'
import { Sprite2D } from '../lib/spriteSystem/sprite2d'
import { LinkTextShap } from '../shaps/LinkTextShap'
import { RaduisLineShap } from '../shaps/RaduisLineShap'
import { mountLinkNode } from './factoryUtil'

export class HorizontalFlexLinkFactory {

  private static _arrowShap: IShape = SpriteFactory.createPolygon([new vec2(5, 0), new vec2(0, 5), new vec2(0, -5)])
  public static _linkGroups: Array<SpriteNodeGroup> = []
  private static _sameLinkGap = 25

  public static create(parent: SpriteNode, from: SpriteNode | undefined, to: SpriteNode | undefined, name: string): void {
    const linkSpr: ISprite = SpriteFactory.createSprite(new RaduisLineShap(4, 20));
    linkSpr.strokeStyle = 'green'
    linkSpr.lineWidth = 4
    linkSpr.data = {}
    linkSpr.data.from = from
    linkSpr.data.to = to
    linkSpr.x = 0
    linkSpr.y = 0
    linkSpr.mouseEvent = this.handleLinkEvent.bind(this)

    const linkNode = new SpriteNode(linkSpr)
    linkNode.nodeType = NodeType.HORIZONTALFLEXLINK
    linkNode.needSerialize = true
    linkNode.name = name

    const arrowSpr: ISprite = SpriteFactory.createSprite(this._arrowShap)
    arrowSpr.fillStyle = 'blue'
    linkNode.addSprite(arrowSpr);

    const textSpr: ISprite = new Sprite2D(new LinkTextShap(), 'linkTextShap')
    textSpr.showCoordSystem = false
    textSpr.x = 0
    textSpr.y = 0;
    textSpr.data = {}
    textSpr.data.text = name
    linkNode.addSprite(textSpr);

    // 挂载linkNode对象
    mountLinkNode(linkNode, parent, from, to, this._linkGroups, this.handleLinkGroupUpdate.bind(this))
  }

  private static handleLinkEvent(spr: ISprite, evt: CanvasMouseEvent): void {
    console.log('handleLinkEvent', spr)
  }

  private static handleLinkGroupUpdate(spr: ISprite, mesc: number, diffSec: number, travelOrder: EOrder): void {
    const linkGroup = spr.owner as SpriteNodeGroup
    const children = linkGroup.children
    let from: Sprite2D = linkGroup.params.from.data
    let to: Sprite2D = linkGroup.params.to.data
    let pt1: vec2 = new vec2(from.x, from.y)
    let pt2: vec2 = new vec2(to.x, to.y)

    let fromParentSpr = from.owner.getParentSprite()
    let toParentSpr = to.owner.getParentSprite()
    // 把from和to的局部坐标转换为相对于根sprite的全局坐标
    if (fromParentSpr && toParentSpr) {
      pt1 = Math2D.transform(fromParentSpr.getWorldMatrix2(), pt1)
      pt2 = Math2D.transform(toParentSpr.getWorldMatrix2(), pt2)
    }

    const xd = pt2.x - pt1.x
    const yd = pt2.y - pt1.y

    if (linkGroup.sprite) {
      linkGroup.sprite.x = pt1.x
      linkGroup.sprite.y = pt1.y
    }
    if (children) {
      const count = children.length
      children.forEach((linkN, index) => {
        const linkSpr = (linkN as SpriteNode).sprite
        if (linkSpr) {
          let xDeviation = index * 20 // xDeviation为连线中两个拐点的x轴方向偏移量
          let change = (20 * (count - 1)) / 2 // 整体偏移（为了居中）
          if (pt2.x >= pt1.x) {
            if (pt2.y > pt1.y) {
              xDeviation = -xDeviation
              change = change
            } else {
              xDeviation = xDeviation
              change = -change
            }
          } else {
            if (pt2.y > pt1.y) {
              xDeviation = xDeviation
              change = -change
            } else {
              xDeviation = -xDeviation
              change = change
            }
          }
          const line: RaduisLineShap = linkSpr.shape as RaduisLineShap
          line.pointArr[0] = vec2.create(0, 0);
          line.pointArr[1] = vec2.create(xd / 2 + xDeviation + change, 0);
          line.pointArr[2] = vec2.create(xd / 2 + xDeviation + change, yd);
          line.pointArr[3] = vec2.create(xd, yd);
          linkSpr.y = this._sameLinkGap * index + - (this._sameLinkGap * (count - 1)) / 2

          const arrowNode = linkN.getChildAt(0) as SpriteNode
          if (arrowNode) {
            const arrow = arrowNode.sprite as Sprite2D
            if (linkSpr.data.from === linkGroup.params.from) {
              arrow.x = xd
              arrow.y = yd
              if (pt2.x >= pt1.x) {
                arrow.rotation = 0
              } else {
                arrow.rotation = 180
              }
            } else {
              arrow.x = 0
              arrow.y = 0
              if (pt2.x >= pt1.x) {
                arrow.rotation = 180
              } else {
                arrow.rotation = 0
              }
            }
          }

          const lnikTextNode = linkN.getChildAt(1) as SpriteNode
          if (lnikTextNode) {
            const lnikTextSpr = lnikTextNode.sprite as Sprite2D
            lnikTextSpr.x = xd / 2 + xDeviation + change
            lnikTextSpr.y = yd / 2
          }
        }
      })
    }
  }

  public static getNodes(): Array<SpriteNode> {
    return this._linkGroups
  }
}