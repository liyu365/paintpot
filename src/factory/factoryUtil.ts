import { ISprite, EOrder, NodeType } from "../lib/spriteSystem/interface";
import { SpriteNode, SpriteNodeGroup } from '../lib/spriteSystem/sprite2dHierarchicalSystem'


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