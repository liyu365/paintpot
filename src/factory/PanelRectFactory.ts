import { ISprite, SpriteFactory, EOrder, NodeType } from "../lib/spriteSystem/interface";
import { CanvasMouseEvent, EInputEventType } from "../lib/application";
import { vec2, } from "../lib/math2d";
import { SpriteNode, SpriteNodeGroup } from '../lib/spriteSystem/sprite2dHierarchicalSystem'
import { Sprite2D } from '../lib/spriteSystem/sprite2d'
import { Canvas2DUtil } from '../lib/canvas2d/canvas2DUtil'
import { TopologyApplication } from '../main'
import { spriteDragAction, spriteSelectAction, spriteHoverAction, spriteMenuAction, spriteDrawSelected, spriteDrawHover } from './factoryUtil'


export class PanelRectFactory {

  private static nodes: Array<SpriteNode> = []

  public static create(parent: SpriteNode, name: string, position: vec2, app: TopologyApplication): SpriteNode {
    let spr: Sprite2D = new Sprite2D(SpriteFactory.createRect(20, 20, 0.5, 0.5), 'panelRectFactory');
    spr.fillStyle = 'orange'
    spr.x = position.x
    spr.y = position.y
    spr.mouseEvent = (spr: ISprite, evt: CanvasMouseEvent) => {
      spriteDragAction(spr, evt, app)
      spriteSelectAction(spr, evt, app)
      spriteHoverAction(spr, evt, app)
      spriteMenuAction(spr, evt, app)
    }

    spr.renderEvent = (spr: ISprite, context: CanvasRenderingContext2D, renderOreder: EOrder) => {
      spriteDrawSelected(spr, context, renderOreder)
      spriteDrawHover(spr, context, renderOreder)
    }

    let node = new SpriteNode(spr)
    node.nodeType = NodeType.PANELRECT
    node.needSerialize = true
    node.name = name
    parent.addChild(node)
    //this.nodes.push(node)

    return node
  }

  public static getNodes(): Array<SpriteNode> {
    return this.nodes
  }
}