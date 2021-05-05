import { ISprite, SpriteFactory, EOrder } from "../lib/spriteSystem/interface";
import { CanvasMouseEvent, EInputEventType } from "../lib/application";
import { vec2, } from "../lib/math2d";
import { SpriteNode, SpriteNodeGroup } from '../lib/spriteSystem/sprite2dHierarchicalSystem'
import { Sprite2D } from '../lib/spriteSystem/sprite2d'
import { Canvas2DUtil } from '../lib/canvas2d/canvas2DUtil'
import { TopologyApplication } from '../main'


export class PanelRectFactory {

  private static nodes: Array<SpriteNode> = []

  public static create(position: vec2, app: TopologyApplication): SpriteNode {
    let spr: Sprite2D = new Sprite2D(SpriteFactory.createRect(20, 20, 0.5, 0.5), 'panelRectFactory');
    spr.fillStyle = 'orange'
    spr.x = position.x
    spr.y = position.y
    spr.mouseEvent = (spr: ISprite, evt: CanvasMouseEvent) => {
      app.spriteMouseAction(spr, evt)
    }

    spr.renderEvent = (spr: ISprite, context: CanvasRenderingContext2D, renderOreder: EOrder) => {
      app.spriteDrawSelected(spr, context, renderOreder)
    }

    let node = new SpriteNode(spr)
    this.nodes.push(node)

    return node
  }

  public static getNodes(): Array<SpriteNode> {
    return this.nodes
  }
}