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

  private static _arrowShap: IShape = SpriteFactory.createPolygon([new vec2(5, 0), new vec2(0, 5), new vec2(0, -5)])
  private static _linkNodes: Array<SpriteNode> = []
  public static _linkGroups: Array<SpriteNodeGroup> = []
  private static _linkCircleGap = 5
  private static _circleRadius = 30
  private static _sameLinkGap = 25

  public static create(): Sprite2D {
    let spr: Sprite2D = new Sprite2D(SpriteFactory.createRect(20, 20, 0.5, 0.5), 'panelRectFactory');
    spr.fillStyle = 'orange'
    return spr
  }
}