import { ISprite, SpriteFactory, IShape, EOrder } from "../lib/spriteSystem/interface";
import { Sprite2DApplication } from "../lib/spriteSystem/sprite2DApplication";
import { CanvasMouseEvent, EInputEventType } from "../lib/application";
import { vec2, Math2D } from "../lib/math2d";
import { Line, Rect } from "../lib/spriteSystem/shapes";
import { SpriteNode, SpriteNodeGroup } from '../lib/spriteSystem/sprite2dHierarchicalSystem'
import { Sprite2D } from '../lib/spriteSystem/sprite2d'

import { CNodeTextShap } from '../shaps/CNodeTextShap'
import { LinkTextShap } from '../shaps/LinkTextShap'

export class LinkFactory {

  private static _arrowShap: IShape = SpriteFactory.createPolygon([new vec2(5, 0), new vec2(0, 5), new vec2(0, -5)])
  private static _linkNodes: Array<SpriteNode> = []
  public static _linkGroups: Array<SpriteNodeGroup> = []
  private static _linkCircleGap = 5
  private static _circleRadius = 30
  private static _sameLinkGap = 25

  public static create(node1: ISprite | undefined, node2: ISprite | undefined, name: string): void {
    const link: ISprite = SpriteFactory.createSprite(SpriteFactory.createXLine());
    link.strokeStyle = 'green'
    link.lineWidth = 4
    link.data = {}
    link.data.from = node1
    link.data.to = node2
    link.x = 0
    link.y = 0

    link.mouseEvent = this.handleLinkEvent.bind(this)

    const linkN = new SpriteNode(link)

    const arrow: ISprite = SpriteFactory.createSprite(this._arrowShap)
    arrow.fillStyle = 'blue'
    linkN.addSprite(arrow);

    const textSpr: ISprite = new Sprite2D(new LinkTextShap(), 'LinkTextShap')
    textSpr.showCoordSystem = false
    textSpr.x = 0
    textSpr.y = 0;
    textSpr.data = {}
    textSpr.data.text = name
    linkN.addSprite(textSpr);

    const newGroup = new SpriteNodeGroup({})
    newGroup.params.from = node1
    newGroup.params.to = node2
    const sameGroup: SpriteNodeGroup | null = this.getSameLinkGroup(newGroup)

    // 如果已经存在相同的group，则放到此group中，否则新建一个group，再作为新group的子集
    if (!sameGroup) {
      newGroup.addChild(linkN)
      this._linkNodes.push(linkN)
      this._linkGroups.push(newGroup)
      if (newGroup.sprite) {
        newGroup.sprite.updateEvent = this.handleLinkGroupUpdate.bind(this)
      }
    } else {
      sameGroup.addChild(linkN)
      this._linkNodes.push(linkN)
    }
  }

  private static getSameLinkGroup(linkGroup: SpriteNodeGroup): SpriteNodeGroup | null {
    let o = null
    this._linkGroups.forEach(item => {
      if (
        (item.params.from === linkGroup.params.from && item.params.to === linkGroup.params.to) ||
        (item.params.from === linkGroup.params.to && item.params.to === linkGroup.params.from)
      ) {
        o = item
      }
    })
    return o
  }

  private static handleLinkEvent(spr: ISprite, evt: CanvasMouseEvent): void {
    console.log('handleLinkEvent', spr)
  }

  private static handleLinkGroupUpdate(spr: ISprite, mesc: number, diffSec: number, travelOrder: EOrder): void {
    const linkGroup = spr.owner as SpriteNodeGroup
    const children = linkGroup.children
    let from: Sprite2D = linkGroup.params.from
    let to: Sprite2D = linkGroup.params.to
    let pt1: vec2 = new vec2(from.x, from.y)
    let pt2: vec2 = new vec2(to.x, to.y)
    // const root = this._app.rootContainer as SpriteNode
    // let rootSpr = root.sprite
    let fromParentSpr = from.owner.getParentSprite()
    let toParentSpr = to.owner.getParentSprite()
    if (fromParentSpr && toParentSpr) {
      pt1 = Math2D.transform(fromParentSpr.getWorldMatrix2(), pt1)
      pt2 = Math2D.transform(toParentSpr.getWorldMatrix2(), pt2)
    }
    //console.log(pt1, pt2)
    const d = Math.sqrt((pt2.y - pt1.y) * (pt2.y - pt1.y) + (pt2.x - pt1.x) * (pt2.x - pt1.x))
    const linkGroupAngle = vec2.getOrientation(pt1, pt2)
    if (linkGroup.sprite) {
      linkGroup.sprite.x = pt1.x
      linkGroup.sprite.y = pt1.y
      linkGroup.sprite.rotation = linkGroupAngle
    }
    if (children) {
      const count = children.length
      children.forEach((linkN, index) => {
        const linkSpr = (linkN as SpriteNode).sprite
        if (linkSpr) {
          const gap = this._circleRadius + this._linkCircleGap
          const line: Line = linkSpr.shape as Line
          line.start = vec2.create(gap, 0);
          line.end = vec2.create(d - gap, 0);
          linkSpr.y = this._sameLinkGap * index + - (this._sameLinkGap * (count - 1)) / 2

          // 此linkSpr定义的方向与包含它的linkGroup的方向相反，所以此linkSpr要反向绘制
          if (linkSpr.data.from !== linkGroup.params.from) {
            linkSpr.rotation = 180
            linkSpr.x = d
          }

          const arrowNode = linkN.getChildAt(0) as SpriteNode
          if (arrowNode) {
            const arrow = arrowNode.sprite as Sprite2D
            arrow.x = d - gap - 5
          }

          const lnikTextNode = linkN.getChildAt(1) as SpriteNode
          if (lnikTextNode) {
            const lnikTextSpr = lnikTextNode.sprite as Sprite2D
            lnikTextSpr.x = d / 2
            lnikTextSpr.y = 0
            // 此linkSpr定义的方向与包含它的linkGroup的方向相反，所以此linkSpr种的文字也要反向绘制
            if (linkSpr.data.from !== linkGroup.params.from) {
              lnikTextSpr.data.isReverse = true // 为反向显示的linkSpr打标识
              lnikTextSpr.rotation = 180
            }

            // 目标节点在第二、第三象限，文字需要反转，否则连线中的文字倒着显示不方便看
            if ((linkGroupAngle > 90 && linkGroupAngle < 180) || (linkGroupAngle <= -90 && linkGroupAngle >= -180)) {
              if (lnikTextSpr.data.isReverse === true) {
                lnikTextSpr.rotation = 0
              } else {
                lnikTextSpr.rotation = 180
              }
            } else {
              //不需要反转
              if (lnikTextSpr.data.isReverse === true) {
                lnikTextSpr.rotation = 180
              } else {
                lnikTextSpr.rotation = 0
              }
            }
          }
        }
      })
    }
  }
}