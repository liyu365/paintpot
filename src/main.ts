import { ISprite, SpriteFactory, IShape, EOrder } from "./lib/spriteSystem/interface";
import { Sprite2DApplication } from "./lib/spriteSystem/sprite2DApplication";
import { CanvasMouseEvent, EInputEventType } from "./lib/application";
import { vec2, Math2D } from "./lib/math2d";
import { Line, Rect } from "./lib/spriteSystem/shapes";
import { SpriteNode, SpriteNodeGroup } from './lib/spriteSystem/sprite2dHierarchicalSystem'
import { Sprite2D } from './lib/spriteSystem/sprite2d'

import { CNodeTextShap } from './shaps/CNodeTextShap'
import { LinkTextShap } from './shaps/LinkTextShap'
import { ContainerSprite } from './shaps/ContainerShap'
import { RectSpr } from './shaps/RectShap'


class topologyApplication {
  private _app: Sprite2DApplication
  private _circleShap: IShape
  private _rectShap: IShape
  private _arrowShap: IShape
  private _cNodes: Array<SpriteNode> = []
  private _linkNodes: Array<SpriteNode> = []
  private _linkGroups: Array<SpriteNodeGroup> = []
  private _sameLinkGap = 25
  private _linkCircleGap = 5
  private _circleRadius = 30
  private _curZoom = 1

  public constructor(app: Sprite2DApplication) {
    this._app = app
    this._circleShap = SpriteFactory.createCircle(this._circleRadius)
    this._rectShap = SpriteFactory.createRect(20, 10)
    this._arrowShap = SpriteFactory.createPolygon([new vec2(5, 0), new vec2(0, 5), new vec2(0, -5)])

    this.init();
    this._app.start();


    const zoomInButton: HTMLElement = document.querySelector('#zoomIN') as HTMLElement
    const zoomOutButton: HTMLElement = document.querySelector('#zoomOut') as HTMLElement
    zoomInButton.onclick = () => {
      this._curZoom *= 1.2
      this.handleZoomChange()
    }

    zoomOutButton.onclick = () => {
      this._curZoom /= 1.2
      this.handleZoomChange()
    }
  }

  private handleZoomChange(): void {
    const root = this._app.rootContainer as SpriteNode
    const rootSpr = root.sprite
    const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
    if (rootSpr) {

      rootSpr.scaleX = this._curZoom
      rootSpr.scaleY = this._curZoom
      if (canvas) {
        const mouseX = (canvas.offsetWidth / 2)
        const mouseY = (canvas.offsetHeight / 2)

        // let mouseX = 320
        // let mouseY = 120
        const newW = canvas.offsetWidth * this._curZoom
        const newH = canvas.offsetHeight * this._curZoom
        const x = mouseX - mouseX / canvas.offsetWidth * newW // mouseX - mouseX映射到新宽度中的x坐标
        const y = mouseY - mouseY / canvas.offsetHeight * newH
        rootSpr.x = x
        rootSpr.y = y
      }
    }
  }

  private createCNode(position: vec2, name: string): SpriteNode {
    const circle: ISprite = SpriteFactory.createSprite(this._circleShap);
    circle.fillStyle = 'red'
    circle.x = position.x
    circle.y = position.y
    circle.mouseEvent = this.handleCircleEvent.bind(this)

    const circleN = new SpriteNode(circle)

    const textSpr: ISprite = new Sprite2D(new CNodeTextShap(), 'textSpr')
    textSpr.showCoordSystem = false
    textSpr.x = 0
    textSpr.y = this._circleRadius + 10;
    textSpr.data = {}
    textSpr.data.text = name
    circleN.addSprite(textSpr);

    this._cNodes.push(circleN)

    return circleN
  }

  private createLink(node1: ISprite | undefined, node2: ISprite | undefined, name: string): void {
    const link: ISprite = SpriteFactory.createSprite(SpriteFactory.createXLine());
    link.strokeStyle = 'green'
    link.lineWidth = 4
    link.data = {}
    link.data.from = node1
    link.data.to = node2
    link.x = 0
    link.y = 0

    link.mouseEvent = this.handleLinkEvent.bind(this)

    const linkN = new SpriteNode(link)

    const arrow: ISprite = SpriteFactory.createSprite(this._arrowShap)
    arrow.fillStyle = 'blue'
    linkN.addSprite(arrow);

    const textSpr: ISprite = new Sprite2D(new LinkTextShap(), 'LinkTextShap')
    textSpr.showCoordSystem = false
    textSpr.x = 0
    textSpr.y = 0;
    textSpr.data = {}
    textSpr.data.text = name
    linkN.addSprite(textSpr);

    const newGroup = new SpriteNodeGroup({})
    newGroup.params.from = node1
    newGroup.params.to = node2
    const sameGroup: SpriteNodeGroup | null = this.getSameLinkGroup(newGroup)

    // 如果已经存在相同的group，则放到此group中，否则新建一个group，再作为新group的子集
    if (!sameGroup) {
      newGroup.addChild(linkN)
      this._linkNodes.push(linkN)
      this._linkGroups.push(newGroup)
      if (newGroup.sprite) {
        newGroup.sprite.updateEvent = this.handleLinkGroupUpdate.bind(this)
      }
    } else {
      sameGroup.addChild(linkN)
      this._linkNodes.push(linkN)
    }
  }

  private getSameLinkGroup(linkGroup: SpriteNodeGroup): SpriteNodeGroup | null {
    let o = null
    this._linkGroups.forEach(item => {
      if (
        (item.params.from === linkGroup.params.from && item.params.to === linkGroup.params.to) ||
        (item.params.from === linkGroup.params.to && item.params.to === linkGroup.params.from)
      ) {
        o = item
      }
    })
    return o
  }


  private init(): void {
    const node1: SpriteNode = this.createCNode(new vec2(120, 120), 'node1');
    const node2: SpriteNode = this.createCNode(new vec2(320, 120), 'node2');
    const node3: SpriteNode = this.createCNode(new vec2(320, 400), 'node3');
    this.createLink(node1.sprite, node2.sprite, '1->2');
    this.createLink(node2.sprite, node1.sprite, '2->1');
    this.createLink(node2.sprite, node1.sprite, '2->1');
    this.createLink(node2.sprite, node1.sprite, '2->1');
    this.createLink(node1.sprite, node3.sprite, '1->3');
    this.createLink(node2.sprite, node3.sprite, '2->3');
    this.createLink(node2.sprite, node3.sprite, '2->3');


    const root = this._app.rootContainer as SpriteNode
    this._linkGroups.forEach(node => {
      root.addChild(node);
    });
    this._cNodes.forEach(node => {
      root.addChild(node);
    });

    const containerSpr: Sprite2D = new ContainerSprite()
    containerSpr.x = 500
    containerSpr.y = 300
    root.addSprite(containerSpr)

    const rectSpr1: Sprite2D = new RectSpr()
    const rectSpr2: Sprite2D = new RectSpr()
    rectSpr2.x = 60
    containerSpr.owner.addSprite(rectSpr1)
    containerSpr.owner.addSprite(rectSpr2)

  }


  private handleCircleEvent(spr: ISprite, evt: CanvasMouseEvent): void {
    //console.log('handleCircleEvent', spr)
    if (evt.type === EInputEventType.MOUSEDRAG) {
      const root = this._app.rootContainer as SpriteNode
      if (root.sprite) {
        const position = new vec2(evt.canvasPosition.x, evt.canvasPosition.y)
        const newPosition = Math2D.transform(root.sprite.getLocalMatrix(), position); // 把鼠标的坐标用根sprite的局部矩阵进行转换

        spr.x = newPosition.x
        spr.y = newPosition.y
      }
    }
  }

  private handleLinkEvent(spr: ISprite, evt: CanvasMouseEvent): void {
    console.log('handleLinkEvent', spr)
  }

  private handleLinkGroupUpdate(spr: ISprite, mesc: number, diffSec: number, travelOrder: EOrder): void {
    const linkGroup = spr.owner as SpriteNodeGroup
    const children = linkGroup.children
    const pt1: vec2 = new vec2(linkGroup.params.from.x, linkGroup.params.from.y)
    const pt2: vec2 = new vec2(linkGroup.params.to.x, linkGroup.params.to.y)
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
          line.start = vec2.create(gap, 0);
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
            // 此linkSpr定义的方向与包含它的linkGroup的方向相反，所以此linkSpr种的文字也要反向绘制
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
}

const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
new topologyApplication(new Sprite2DApplication(canvas, true));