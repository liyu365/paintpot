import { ISprite, SpriteFactory, IShape, EOrder } from "../lib/spriteSystem/interface";
import { Sprite2DApplication } from "../lib/spriteSystem/sprite2DApplication";
import { CanvasMouseEvent, EInputEventType } from "../lib/application";
import { vec2, Math2D } from "../lib/math2d";
import { Line, Rect } from "../lib/spriteSystem/shapes";
import { SpriteNode, SpriteNodeGroup } from '../lib/spriteSystem/sprite2dHierarchicalSystem'
import { Sprite2D } from '../lib/spriteSystem/sprite2d'

import { CNodeTextShap } from '../shaps/CNodeTextShap'
import { LinkTextShap } from '../shaps/LinkTextShap'
import { ContainerSprite } from '../shaps/ContainerShap'
import { RectSpr } from '../shaps/RectShap'



export class PanelPointFactory {

  private static _circleRadius = 30
  private static _circleShap: IShape = SpriteFactory.createCircle(PanelPointFactory._circleRadius)
  private static nodes: Array<SpriteNode> = []

  public static create(position: vec2, name: string): SpriteNode {
    const circle: ISprite = SpriteFactory.createSprite(PanelPointFactory._circleShap);
    circle.fillStyle = 'red'
    circle.x = position.x
    circle.y = position.y

    const circleN = new SpriteNode(circle)

    const textSpr: ISprite = new Sprite2D(new CNodeTextShap(), 'textSpr')
    textSpr.showCoordSystem = false
    textSpr.x = 0
    textSpr.y = PanelPointFactory._circleRadius + 10;
    textSpr.data = {}
    textSpr.data.text = name
    circleN.addSprite(textSpr);

    PanelPointFactory.nodes.push(circleN)

    return circleN
  }

  public static getNodes(): Array<SpriteNode> {
    return PanelPointFactory.nodes
  }
}