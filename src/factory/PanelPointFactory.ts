import { ISprite, SpriteFactory, IShape, EOrder } from "../lib/spriteSystem/interface";
import { CanvasMouseEvent, EInputEventType } from "../lib/application";
import { vec2 } from "../lib/math2d";
import { SpriteNode } from '../lib/spriteSystem/sprite2dHierarchicalSystem'
import { Sprite2D } from '../lib/spriteSystem/sprite2d'
import { CNodeTextShap } from '../shaps/CNodeTextShap'
import { TopologyApplication } from '../main'


export class PanelPointFactory {

  private static _circleRadius = 30
  private static _circleShap: IShape = SpriteFactory.createCircle(PanelPointFactory._circleRadius)

  public static create(parent: SpriteNode, position: vec2, name: string, app: TopologyApplication): SpriteNode {
    const circleSpr: ISprite = SpriteFactory.createSprite(PanelPointFactory._circleShap);
    circleSpr.fillStyle = 'red'
    circleSpr.x = position.x
    circleSpr.y = position.y

    circleSpr.mouseEvent = (spr: ISprite, evt: CanvasMouseEvent) => {
      app.spriteDragAction(spr, evt)
      app.spriteSelectAction(spr, evt)
      app.spriteHoverAction(spr, evt)
      app.spriteMenuAction(spr, evt)
      if (evt.type === EInputEventType.MOUSEDOWN) {
        console.log('点击了', spr)
      }
    }

    circleSpr.renderEvent = (spr: ISprite, context: CanvasRenderingContext2D, renderOreder: EOrder) => {
      app.spriteDrawSelected(spr, context, renderOreder)
      app.spriteDrawHover(spr, context, renderOreder)
    }

    const circleN = new SpriteNode(circleSpr)

    parent.addChild(circleN)

    const textSpr: ISprite = new Sprite2D(new CNodeTextShap(), 'textSpr')
    textSpr.showCoordSystem = false
    textSpr.x = 0
    textSpr.y = PanelPointFactory._circleRadius + 10;
    textSpr.data = {}
    textSpr.data.text = name
    circleN.addSprite(textSpr);


    return circleN
  }
}