import { ISprite, SpriteFactory, IShape, EOrder, NodeType } from "../lib/spriteSystem/interface";
import { CanvasMouseEvent } from "../lib/application";
import { vec2, Math2D } from "../lib/math2d";
import { Line } from "../lib/spriteSystem/shapes";
import { SpriteNode, SpriteNodeGroup } from '../lib/spriteSystem/sprite2dHierarchicalSystem'
import { Sprite2D } from '../lib/spriteSystem/sprite2d'
import { LinkTextShap } from '../shaps/LinkTextShap'

export class LinkFactory {

  private static _arrowShap: IShape = SpriteFactory.createPolygon([new vec2(5, 0), new vec2(0, 5), new vec2(0, -5)])
  public static _linkGroups: Array<SpriteNodeGroup> = []
  private static _linkCircleGap = 5
  private static _circleRadius = 30
  private static _sameLinkGap = 25

  public static create(parent: SpriteNode, from: ISprite | undefined, to: ISprite | undefined, name: string): void {
    const linkSpr: ISprite = SpriteFactory.createSprite(SpriteFactory.createXLine());
    linkSpr.strokeStyle = 'green'
    linkSpr.lineWidth = 4
    linkSpr.data = {}
    linkSpr.data.from = from
    linkSpr.data.to = to
    linkSpr.x = 0
    linkSpr.y = 0
    linkSpr.mouseEvent = this.handleLinkEvent.bind(this)

    const linkNode = new SpriteNode(linkSpr)
    linkNode.nodeType = NodeType.LINK
    linkNode.needSerialize = true


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
      if (Array.isArray(parent.children)) {
        // 插入到所有containerNode的后面，其他元素的后面
        let hasAdd = false
        for (let i = 0; i < parent.children.length; i++) {
          if (parent.children[i].nodeType !== NodeType.CONTAINER) {
            parent.addChildAt(newGroup, i)
            hasAdd = true
            break
          }
        }
        //证明当前root下的子元素都为containerNode
        if (hasAdd === false) {
          parent.addChildAt(newGroup, parent.children.length)
        }
      } else {
        parent.addChildAt(newGroup, 0)
      }
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
    // console.log('handleLinkEvent', spr, evt)
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
          line.start = vec2.create(gap, 0); // 注意line这个shap的start和end的坐标y值都是0
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
            // 此linkSpr定义的方向与包含它的linkGroup的方向相反，所以此linkSpr中的文字也要反向绘制
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

  public static getNodes(): Array<SpriteNode> {
    return this._linkGroups
  }
}