import { Sprite2DApplication } from "./lib/spriteSystem/sprite2DApplication";
import { vec2 } from "./lib/math2d";
import { SpriteNode } from './lib/spriteSystem/sprite2dHierarchicalSystem'
import { LinkFactory } from './factory/LinkFactory'
import { HorizontalFlexLinkFactory } from './factory/HorizontalFlexLinkFactory'
import { VerticalFlexLinkFactory } from './factory/VerticalFlexLinkFactory'
import { PanelPointFactory } from './factory/PanelPointFactory'
import { ContainerFactory } from './factory/ContainerFactory'
import { PanelRectFactory } from './factory/PanelRectFactory'


class topologyApplication {
  private _app: Sprite2DApplication
  private _curZoom = 1

  public constructor(app: Sprite2DApplication) {
    this._app = app

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


  private init(): void {
    const root = this._app.rootContainer as SpriteNode

    const panelPointNode1: SpriteNode = PanelPointFactory.create(new vec2(120, 120), 'panelPointNode1');
    const panelPointNode2: SpriteNode = PanelPointFactory.create(new vec2(320, 120), 'panelPointNode2');
    const panelPointNode3: SpriteNode = PanelPointFactory.create(new vec2(320, 400), 'panelPointNode3');



    const containerNode1: SpriteNode = ContainerFactory.create(new vec2(500, 300))
    root.addChild(containerNode1);
    const rectNode1: SpriteNode = PanelRectFactory.create(new vec2(0, 0))
    const rectNode2: SpriteNode = PanelRectFactory.create(new vec2(60, 60))
    const rectNode3: SpriteNode = PanelRectFactory.create(new vec2(0, 0))
    containerNode1.addChild(rectNode1)
    containerNode1.addChild(rectNode2)
    root.addChild(rectNode3)




    const containerNode2: SpriteNode = ContainerFactory.create(new vec2(0, 0))
    containerNode1.addChild(containerNode2)

    const rectNode2_1: SpriteNode = PanelRectFactory.create(new vec2(0, 0))
    const rectNode2_2: SpriteNode = PanelRectFactory.create(new vec2(0, 80))
    containerNode2.addChild(rectNode2_1)
    containerNode2.addChild(rectNode2_2)


    LinkFactory.create(panelPointNode1.sprite, panelPointNode2.sprite, '1->2');
    LinkFactory.create(panelPointNode2.sprite, panelPointNode1.sprite, '2->1');
    LinkFactory.create(panelPointNode2.sprite, panelPointNode1.sprite, '2->1');
    LinkFactory.create(panelPointNode2.sprite, panelPointNode1.sprite, '2->1');
    LinkFactory.create(panelPointNode1.sprite, panelPointNode3.sprite, '1->3');
    LinkFactory.create(panelPointNode2.sprite, panelPointNode3.sprite, '2->3');
    LinkFactory.create(panelPointNode2.sprite, panelPointNode3.sprite, '2->3');
    LinkFactory.create(rectNode1.sprite, rectNode2.sprite, 'ii');
    LinkFactory.create(rectNode1.sprite, panelPointNode2.sprite, '88');



    const rectNode4: SpriteNode = PanelRectFactory.create(new vec2(700, 60));
    root.addChild(rectNode4);
    const rectNode5: SpriteNode = PanelRectFactory.create(new vec2(850, 300));
    root.addChild(rectNode5);
    HorizontalFlexLinkFactory.create(rectNode4.sprite, rectNode5.sprite, '1');
    HorizontalFlexLinkFactory.create(rectNode5.sprite, rectNode4.sprite, '2');

    const rectNode6: SpriteNode = PanelRectFactory.create(new vec2(700, 400));
    root.addChild(rectNode6);
    const rectNode7: SpriteNode = PanelRectFactory.create(new vec2(850, 500));
    root.addChild(rectNode7);
    VerticalFlexLinkFactory.create(rectNode6.sprite, rectNode7.sprite, '3');
    VerticalFlexLinkFactory.create(rectNode7.sprite, rectNode6.sprite, '4');






    // ContainerFactory.getNodes().forEach(node => {
    //   root.addChild(node);
    // });
    LinkFactory.getNodes().forEach(node => {
      root.addChild(node);
    });
    HorizontalFlexLinkFactory.getNodes().forEach(node => {
      root.addChild(node);
    });
    VerticalFlexLinkFactory.getNodes().forEach(node => {
      root.addChild(node);
    });
    PanelPointFactory.getNodes().forEach(node => {
      root.addChild(node);
    });

  }

}

const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
new topologyApplication(new Sprite2DApplication(canvas, true));