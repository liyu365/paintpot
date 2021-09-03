import { ISprite, EOrder, NodeType, Bounding, IShape } from "../lib/spriteSystem/interface";
import { SpriteNode, SpriteNodeGroup } from '../lib/spriteSystem/sprite2dHierarchicalSystem'
import { CanvasMouseEvent, EInputEventType } from "../lib/application";
import { vec2, Math2D } from "../lib/math2d";
import { TopologyApplication } from '../main'

export function mountLinkNode(
  linkNode: SpriteNode,
  parent: SpriteNode,
  from: SpriteNode | undefined,
  to: SpriteNode | undefined,
  linkGroups: Array<SpriteNodeGroup>,
  update: (spr: ISprite, mesc: number, diffSec: number, travelOrder: EOrder) => void
): void {

  const sameGroup: SpriteNodeGroup | null = getSameLinkGroup(from, to, linkGroups)

  // 如果已经存在相同的group，则放到此group中，否则新建一个group，再作为新group的子集
  if (!sameGroup) {
    const newGroup = new SpriteNodeGroup({})
    newGroup.params.from = from
    newGroup.params.to = to
    newGroup.addChild(linkNode)

    /**
     * 绘制顺序为containerNode->linkNode->其它Node
     * 因此这里的group需要插到所有containerNode的后面，其他Node的前面
     */
    if (Array.isArray(parent.children)) {
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

    linkGroups.push(newGroup)

    if (newGroup.sprite) {
      newGroup.sprite.updateEvent = update // 这个是为SpriteNodeGroup内的包含空Shap的Sprite对象绑定updateEvent回调，而不是LinkNode内的Sprite对象
    }
  } else {
    sameGroup.addChild(linkNode)
  }
}

export function getSameLinkGroup(from: SpriteNode | undefined, to: SpriteNode | undefined, linkGroups: Array<SpriteNodeGroup>): SpriteNodeGroup | null {
  let o = null
  if (from === undefined || to === undefined) {
    return o
  }
  linkGroups.forEach(item => {
    if (
      (item.params.from === from && item.params.to === to) ||
      (item.params.from === to && item.params.to === from)
    ) {
      o = item
    }
  })
  return o
}

export function spriteDragAction(spr: ISprite, evt: CanvasMouseEvent, app: TopologyApplication): void {
  let position = new vec2(evt.canvasPosition.x, evt.canvasPosition.y)
  let parentSpr = spr.owner.getParentSprite()
  if (parentSpr) {
    position = Math2D.transform(parentSpr.getLocalMatrix(), position) // 把鼠标的坐标用父sprite的局部矩阵进行转换
  }
  if (evt.type === EInputEventType.MOUSEDOWN) {
    spr.diffX = position.x - spr.x
    spr.diffY = position.y - spr.y
  }
  if (evt.type === EInputEventType.MOUSEDRAG) {
    spr.isDragging = true

    // 设置当前被拖拽的元素为isHovering状态
    if (spr.isSelected !== true) {
      spr.isHovering = true
    }
    if (app._hoveringSprite && app._hoveringSprite !== spr) {
      app._hoveringSprite.isHovering = false
    }
    app._hoveringSprite = spr

    spr.x = position.x - spr.diffX
    spr.y = position.y - spr.diffY
    // console.log('相对于根sprite的坐标（而不是canvas）', Math2D.transform(parentSpr.getWorldMatrix2(), new vec2(this.x, this.y)))
    // console.log('局部坐标', new vec2(this.x, this.y))
  }
}

export function spriteSelectAction(spr: ISprite, evt: CanvasMouseEvent, app: TopologyApplication): void {
  if (evt.type === EInputEventType.MOUSEUP && evt.button === 0) {
    if (spr.isDragging === false) {
      if (spr.isSelected === true) {
        app.removeSelectedSprite(spr)
        spr.isHovering = true
      } else {
        app.clearAllSelectedSprite()
        app.addSelectedSprite(spr)
        spr.isHovering = false
      }
    }

    if (spr.isDragging === true) {
      spr.isDragging = false
    }
  }
}

export function spriteHoverAction(spr: ISprite, evt: CanvasMouseEvent, app: TopologyApplication): void {
  if (evt.type === EInputEventType.MOUSEMOVE) {
    if (spr.isSelected !== true) {
      spr.isHovering = true
    }
    if (app._hoveringSprite && app._hoveringSprite !== spr) {
      app._hoveringSprite.isHovering = false
    }
    app._hoveringSprite = spr
  }
}

export function spriteMenuAction(spr: ISprite, evt: CanvasMouseEvent, app: TopologyApplication): void {
  if (evt.type === EInputEventType.MOUSEUP && evt.button === 2) {
    let bounding: Bounding = spr.shape.getBounding()
    let position = new vec2(spr.x + (bounding.right - bounding.left) / 2, spr.y)
    let parentSpr = spr.owner.getParentSprite()
    if (parentSpr) {
      position = Math2D.transform(parentSpr.getWorldMatrix(), position)
    }
    if (app._sprMenu) {
      app._sprMenu.style.display = 'block'
      app._sprMenu.style.left = position.x + 'px'
      app._sprMenu.style.top = position.y + 'px'
    }
  }
}

export function spriteDrawSelected(spr: ISprite, context: CanvasRenderingContext2D, renderOreder: EOrder): void {
  if (renderOreder === EOrder.PREORDER && spr.isSelected === true) {
    let shap: IShape = spr.shape
    let bounding: Bounding = shap.getBounding()
    let margin = 5
    context.save()
    context.beginPath()
    context.fillStyle = 'rgba(0, 0, 0, 1)'
    context.lineWidth = 7
    context.rect(bounding.left - margin, bounding.top - margin, bounding.right - bounding.left + margin * 2, bounding.bottom - bounding.top + margin * 2)
    context.fill()
    context.restore()
  }
}

export function spriteDrawHover(spr: ISprite, context: CanvasRenderingContext2D, renderOreder: EOrder): void {
  if (renderOreder === EOrder.PREORDER && spr.isHovering === true) {
    let shap: IShape = spr.shape
    let bounding: Bounding = shap.getBounding()
    let margin = 5
    context.save()
    context.beginPath()
    context.fillStyle = 'rgba(0, 255, 255, 0.5)'
    context.lineWidth = 7
    context.rect(bounding.left - margin, bounding.top - margin, bounding.right - bounding.left + margin * 2, bounding.bottom - bounding.top + margin * 2)
    context.fill()
    context.restore()
  }
}