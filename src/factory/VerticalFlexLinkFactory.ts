import { ISprite, SpriteFactory, IShape, EOrder } from "../lib/spriteSystem/interface";
import { CanvasMouseEvent } from "../lib/application";
import { vec2, Math2D } from "../lib/math2d";
import { SpriteNode, SpriteNodeGroup } from '../lib/spriteSystem/sprite2dHierarchicalSystem'
import { Sprite2D } from '../lib/spriteSystem/sprite2d'
import { LinkTextShap } from '../shaps/LinkTextShap'
import { RaduisLineShap } from '../shaps/RaduisLineShap'

export class VerticalFlexLinkFactory {

  private static _arrowShap: IShape = SpriteFactory.createPolygon([new vec2(5, 0), new vec2(0, 5), new vec2(0, -5)])
  public static _linkGroups: Array<SpriteNodeGroup> = []
  private static _sameLinkGap = 25

  public static create(from: ISprite | undefined, to: ISprite | undefined, name: string): void {
    const linkSpr: ISprite = SpriteFactory.createSprite(new RaduisLineShap(4, 16));
    linkSpr.strokeStyle = 'green'
    linkSpr.lineWidth = 4
    linkSpr.data = {}
    linkSpr.data.from = from
    linkSpr.data.to = to
    linkSpr.x = 0
    linkSpr.y = 0
    linkSpr.mouseEvent = this.handleLinkEvent.bind(this)

    const linkNode = new SpriteNode(linkSpr)

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


    const sameGroup: SpriteNodeGroup | null = this.getSameLinkGroup(from, to)

    // 如果已经存在相同的group，则放到此group中，否则新建一个group，再作为新group的子集
    if (!sameGroup) {
      const newGroup = new SpriteNodeGroup({})
      newGroup.params.from = from
      newGroup.params.to = to
      newGroup.addChild(linkNode)
      this._linkGroups.push(newGroup)
      if (newGroup.sprite) {
        newGroup.sprite.updateEvent = this.handleLinkGroupUpdate.bind(this)
      }
    } else {
      sameGroup.addChild(linkNode)
    }
  }

  private static getSameLinkGroup(from: ISprite | undefined, to: ISprite | undefined): SpriteNodeGroup | null {
    let o = null
    if (from === undefined || to === undefined) {
      return o
    }
    this._linkGroups.forEach(item => {
      if (
        (item.params.from === from && item.params.to === to) ||
        (item.params.from === to && item.params.to === from)
      ) {
        o = item
      }
    })
    return o
  }

  private static handleLinkEvent(spr: ISprite, evt: CanvasMouseEvent): void {

  }

  private static handleLinkGroupUpdate(spr: ISprite, mesc: number, diffSec: number, travelOrder: EOrder): void {
    const linkGroup = spr.owner as SpriteNodeGroup
    const children = linkGroup.children
    let from: Sprite2D = linkGroup.params.from
    let to: Sprite2D = linkGroup.params.to
    let pt1: vec2 = new vec2(from.x, from.y)
    let pt2: vec2 = new vec2(to.x, to.y)

    let fromParentSpr = from.owner.getParentSprite()
    let toParentSpr = to.owner.getParentSprite()
    // 把from和to的局部坐标转换为相对于根sprite的局部坐标
    if (fromParentSpr && toParentSpr) {
      pt1 = Math2D.transform(fromParentSpr.getWorldMatrix2(), pt1)
      pt2 = Math2D.transform(toParentSpr.getWorldMatrix2(), pt2)
    }

    const d = Math.sqrt((pt2.y - pt1.y) * (pt2.y - pt1.y) + (pt2.x - pt1.x) * (pt2.x - pt1.x))
    const xd = pt2.x - pt1.x
    const yd = pt2.y - pt1.y
    const linkGroupAngle = vec2.getOrientation(pt1, pt2)
    if (linkGroup.sprite) {
      linkGroup.sprite.x = pt1.x
      linkGroup.sprite.y = pt1.y
    }
    if (children) {
      const count = children.length
      children.forEach((linkN, index) => {
        const linkSpr = (linkN as SpriteNode).sprite
        if (linkSpr) {
          let yDeviation = index * 20
          if (pt2.x >= pt1.x) {
            yDeviation = pt2.y <= pt1.y ? index * 20 : - index * 20
          } else {
            yDeviation = pt2.y <= pt1.y ? -index * 20 : index * 20
          }
          const line: RaduisLineShap = linkSpr.shape as RaduisLineShap
          line.pointArr[0] = vec2.create(0, 0);
          line.pointArr[1] = vec2.create(0, yd / 2 + yDeviation);
          line.pointArr[2] = vec2.create(xd, yd / 2 + yDeviation);
          line.pointArr[3] = vec2.create(xd, yd);
          linkSpr.x = this._sameLinkGap * index + - (this._sameLinkGap * (count - 1)) / 2

          const arrowNode = linkN.getChildAt(0) as SpriteNode
          if (arrowNode) {
            const arrow = arrowNode.sprite as Sprite2D

            if (linkSpr.data.from === linkGroup.params.from) {
              arrow.x = xd
              arrow.y = yd
              if (pt2.y >= pt1.y) {
                arrow.rotation = 90
              } else {
                arrow.rotation = -90
              }
            } else {
              arrow.x = 0
              arrow.y = 0
              if (pt2.y >= pt1.y) {
                arrow.rotation = -90
              } else {
                arrow.rotation = 90
              }
            }
          }

          const lnikTextNode = linkN.getChildAt(1) as SpriteNode
          if (lnikTextNode) {
            const lnikTextSpr = lnikTextNode.sprite as Sprite2D
            lnikTextSpr.x = xd / 2
            lnikTextSpr.y = yd / 2 + yDeviation
          }
        }
      })
    }
  }

  public static getNodes(): Array<SpriteNode> {
    return this._linkGroups
  }
}