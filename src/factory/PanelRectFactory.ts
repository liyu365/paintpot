import { ISprite, SpriteFactory, IShape, EOrder } from "../lib/spriteSystem/interface";
import { Sprite2DApplication } from "../lib/spriteSystem/sprite2DApplication";
import { CanvasMouseEvent, EInputEventType } from "../lib/application";
import { vec2, Math2D } from "../lib/math2d";
import { Line, Rect } from "../lib/spriteSystem/shapes";
import { SpriteNode, SpriteNodeGroup } from '../lib/spriteSystem/sprite2dHierarchicalSystem'
import { Sprite2D } from '../lib/spriteSystem/sprite2d'

import { CNodeTextShap } from '../shaps/CNodeTextShap'
import { LinkTextShap } from '../shaps/LinkTextShap'


export class PanelRectFactory {

  private static nodes: Array<SpriteNode> = []

  public static create(position: vec2): SpriteNode {
    let spr: Sprite2D = new Sprite2D(SpriteFactory.createRect(20, 20, 0.5, 0.5), 'panelRectFactory');
    spr.fillStyle = 'orange'
    spr.x = position.x
    spr.y = position.y

    let node = new SpriteNode(spr)
    this.nodes.push(node)

    return node
  }

  public static getNodes(): Array<SpriteNode> {
    return this.nodes
  }
}