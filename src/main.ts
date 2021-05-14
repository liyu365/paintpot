import { Sprite2DApplication } from "./lib/spriteSystem/sprite2DApplication";
import { ISprite, EOrder, IShape, Bounding, NodeType } from "./lib/spriteSystem/interface";
import { CanvasMouseEvent, EInputEventType } from "./lib/application";
import { vec2, Math2D } from "./lib/math2d";
import { SpriteNode } from './lib/spriteSystem/sprite2dHierarchicalSystem'
import { TreeNode, NodeEnumeratorFactory } from "./lib/treeNode";
import { IEnumerator } from "./lib/IEnumerator"
import { NodeData } from "./lib/NodeData"

import { LinkFactory } from './factory/LinkFactory'
import { HorizontalFlexLinkFactory } from './factory/HorizontalFlexLinkFactory'
import { VerticalFlexLinkFactory } from './factory/VerticalFlexLinkFactory'
import { PanelPointFactory } from './factory/PanelPointFactory'
import { ContainerFactory } from './factory/ContainerFactory'
import { PanelRectFactory } from './factory/PanelRectFactory'

import { Sprite2D } from './lib/spriteSystem/sprite2d'



interface WheelEvent extends Event {
  wheelDelta: number,
  detail: number
}

export enum WheelType {
  UP,
  DOWN
}

export class TopologyApplication {
  private _app: Sprite2DApplication
  private _curZoom = 1
  private lastWheelMouseX = 0
  private lastWheelMouseY = 0
  private _isMouseDown = false
  private _isSatgeHasDrag = false
  private _diffX = 0
  private _diffY = 0
  private _selectedSprites: Array<ISprite> = []
  private _hoveringSprite: ISprite | null = null
  private _sprMenu: HTMLElement | null

  public constructor(app: Sprite2DApplication) {
    this._app = app

    this.init();
    // this.init2();
    this._app.start();
    this._sprMenu = document.querySelector("#sprMenu");

    const zoomInButton: HTMLElement = document.querySelector('#zoomIN') as HTMLElement
    const zoomOutButton: HTMLElement = document.querySelector('#zoomOut') as HTMLElement
    zoomInButton.onclick = () => {
      this._curZoom *= 1.2
      this.handleScaleChange(this.lastWheelMouseX, this.lastWheelMouseY, WheelType.UP)
    }
    zoomOutButton.onclick = () => {
      this._curZoom /= 1.2
      this.handleScaleChange(this.lastWheelMouseX, this.lastWheelMouseY, WheelType.DOWN)
    }
    this.lastWheelMouseX = this._app.canvas.offsetWidth / 2
    this.lastWheelMouseY = this._app.canvas.offsetHeight / 2


    this._app.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this))
    this._app.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this))
    this._app.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this))
    this._app.canvas.addEventListener('mousewheel', this.handleWheel.bind(this))
    this._app.canvas.addEventListener('DOMMouseScroll', this.handleWheel.bind(this))


    const addBtn: HTMLElement = document.querySelector('#addBtn') as HTMLElement
    addBtn.onclick = () => {
      const root = this._app.rootContainer as SpriteNode
      const rectNode4: SpriteNode = PanelRectFactory.create(root, new vec2(20, 20), this);
    }

    const saveBtn: HTMLElement = document.querySelector('#saveBtn') as HTMLElement
    saveBtn.onclick = () => {
      const root = this._app.rootContainer as SpriteNode
      let json = this.convertTreeToJsonString<ISprite>(root)
      console.log(json)
      window.localStorage.setItem('chartJSON', json)
    }

    const restoreBtn: HTMLElement = document.querySelector('#restoreBtn') as HTMLElement
    restoreBtn.onclick = () => {
      const root = this._app.rootContainer as SpriteNode
      root.clearChildren()

      let json = window.localStorage.getItem('chartJSON')
      if (json) {
        console.log(this.convertJsonStringToTree(json))
      }
    }
  }

  private handleMouseDown(evt: Event): void {
    let event = evt as MouseEvent
    if (event.button === 0) {
      const root = this._app.rootContainer as SpriteNode
      const rootSpr = root.sprite
      if (rootSpr) {
        let mouseOffset: vec2 = this._app._viewportToCanvasCoordinate(event)
        this._diffX = mouseOffset.x - rootSpr.x
        this._diffY = mouseOffset.y - rootSpr.y
        this._isMouseDown = true
      }
    }

    if (this._sprMenu) {
      this._sprMenu.style.display = 'none'
    }
  }

  private handleMouseUp(evt: Event): void {
    this._isMouseDown = false

    let hitSprite = this._app.getHitSprite()
    // 如果点击了空白区域（并且没有拖动任何元素），则取消所有sprite的选中状态
    if ((hitSprite === undefined || hitSprite.owner.name === 'root') && this._isSatgeHasDrag === false) {
      this._selectedSprites.forEach(sprite => {
        sprite.isSelected = false
      })
      this._selectedSprites = []
    }
    this._isSatgeHasDrag = false
  }

  private handleMouseMove(evt: Event): void {
    const root = this._app.rootContainer as SpriteNode
    const rootSpr = root.sprite
    if (rootSpr) {
      // 拖动stage
      if (this._isMouseDown && !this._app.getDragSprite() || this._app.getDragSprite() === rootSpr) {
        let mouseOffset: vec2 = this._app._viewportToCanvasCoordinate(evt as MouseEvent)
        rootSpr.x = mouseOffset.x - this._diffX
        rootSpr.y = mouseOffset.y - this._diffY
        this._isSatgeHasDrag = true
        if (this._sprMenu) {
          this._sprMenu.style.display = 'none'
        }
      }
      // 如果鼠标移动到了空白区域，则取消所有sprite的hover状态
      let hitSprite = this._app.getHitSprite()
      if (hitSprite === undefined || hitSprite.owner.name === 'root') {
        if (this._hoveringSprite) {
          this._hoveringSprite.isHovering = false
        }
      }
    }
  }

  private handleWheel(evt: Event): void {
    evt.preventDefault()
    let wheelEvt = evt as WheelEvent
    let wheelDelta = wheelEvt.wheelDelta || wheelEvt.detail;		//detail是firefox的属性
    let mouseOffset: vec2 = this._app._viewportToCanvasCoordinate(evt as MouseEvent)
    if (wheelDelta === 120 || wheelDelta === -3 || wheelDelta === -10) {
      // 向上滚
      this._curZoom *= 1.2
      this.handleScaleChange(mouseOffset.x, mouseOffset.y, WheelType.UP)
    } else if (wheelDelta === -120 || wheelDelta === 3 || wheelDelta === 10) {
      // 向下滚
      this._curZoom /= 1.2
      this.handleScaleChange(mouseOffset.x, mouseOffset.y, WheelType.DOWN)
    }

    if (this._sprMenu) {
      this._sprMenu.style.display = 'none'
    }
  }

  private handleScaleChange(mouseX: number, mouseY: number, action: WheelType): void {
    const root = this._app.rootContainer as SpriteNode
    const rootSpr = root.sprite
    if (rootSpr) {
      rootSpr.scaleX = this._curZoom
      rootSpr.scaleY = this._curZoom
      let x = 0
      let y = 0
      //感谢 https://www.cnblogs.com/3body/p/9436864.html 这篇文章
      if (action === WheelType.UP) {
        x = (mouseX - rootSpr.x) * 1.2 - (mouseX - rootSpr.x)
        y = (mouseY - rootSpr.y) * 1.2 - (mouseY - rootSpr.y)
      } else if (action === WheelType.DOWN) {
        x = (mouseX - rootSpr.x) / 1.2 - (mouseX - rootSpr.x)
        y = (mouseY - rootSpr.y) / 1.2 - (mouseY - rootSpr.y)
      }
      this.lastWheelMouseX = mouseX // 缓存最后一次滚动滚轮时的鼠标位置，为点击缩放按钮时使用
      this.lastWheelMouseY = mouseY
      rootSpr.x = rootSpr.x - x
      rootSpr.y = rootSpr.y - y
    }
  }


  public spriteDragAction(spr: ISprite, evt: CanvasMouseEvent): void {
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
      if (this._hoveringSprite && this._hoveringSprite !== spr) {
        this._hoveringSprite.isHovering = false
      }
      this._hoveringSprite = spr

      spr.x = position.x - spr.diffX
      spr.y = position.y - spr.diffY
      // console.log('相对于根sprite的坐标（而不是canvas）', Math2D.transform(parentSpr.getWorldMatrix2(), new vec2(this.x, this.y)))
      // console.log('局部坐标', new vec2(this.x, this.y))
    }
  }

  public spriteSelectAction(spr: ISprite, evt: CanvasMouseEvent): void {

    if (evt.type === EInputEventType.MOUSEUP && evt.button === 0) {

      if (spr.isDragging === false) {
        // const root = this._app.rootContainer as SpriteNode
        // let iter: IEnumerator<TreeNode<ISprite>> = NodeEnumeratorFactory.create_bf_r2l_b2t_iter(root);
        // let current: TreeNode<ISprite> | undefined = undefined;
        // while (iter.moveNext()) {
        //   current = iter.current;
        //   if (current && current.data) {
        //     current.data.isSelected = false
        //   }
        // }

        if (this._selectedSprites.length === 1 && this._selectedSprites[0] === spr) {
          spr.isSelected = false
          spr.isHovering = true
          this._selectedSprites = []
        } else {
          spr.isSelected = true
          spr.isHovering = false
          this._selectedSprites.forEach(sprite => {
            sprite.isSelected = false
          })
          this._selectedSprites = []
          this._selectedSprites.push(spr)
        }
      }

      if (spr.isDragging === true) {
        spr.isDragging = false
      }
    }
  }

  public spriteMenuAction(spr: ISprite, evt: CanvasMouseEvent): void {
    if (evt.type === EInputEventType.MOUSEUP && evt.button === 2) {
      let bounding: Bounding = spr.shape.getBounding()
      let position = new vec2(spr.x + (bounding.right - bounding.left) / 2, spr.y)
      let parentSpr = spr.owner.getParentSprite()
      if (parentSpr) {
        position = Math2D.transform(parentSpr.getWorldMatrix(), position)
      }
      if (this._sprMenu) {
        this._sprMenu.style.display = 'block'
        this._sprMenu.style.left = position.x + 'px'
        this._sprMenu.style.top = position.y + 'px'
      }
    }
  }

  public spriteHoverAction(spr: ISprite, evt: CanvasMouseEvent): void {
    if (evt.type === EInputEventType.MOUSEMOVE) {
      if (spr.isSelected !== true) {
        spr.isHovering = true
      }
      if (this._hoveringSprite && this._hoveringSprite !== spr) {
        this._hoveringSprite.isHovering = false
      }
      this._hoveringSprite = spr
    }
  }

  public spriteDrawSelected(spr: ISprite, context: CanvasRenderingContext2D, renderOreder: EOrder): void {
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

  public spriteDrawHover(spr: ISprite, context: CanvasRenderingContext2D, renderOreder: EOrder): void {
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

  private init(): void {
    const root = this._app.rootContainer as SpriteNode

    const panelPointNode1: SpriteNode = PanelPointFactory.create(root, new vec2(120, 120), 'panelPointNode1', this);
    const panelPointNode2: SpriteNode = PanelPointFactory.create(root, new vec2(320, 120), 'panelPointNode2', this);
    const panelPointNode3: SpriteNode = PanelPointFactory.create(root, new vec2(320, 400), 'panelPointNode3', this);



    const containerNode1: SpriteNode = ContainerFactory.create(root, new vec2(520, 220), this)

    const rectNode1: SpriteNode = PanelRectFactory.create(containerNode1, new vec2(0, 0), this)
    const rectNode2: SpriteNode = PanelRectFactory.create(containerNode1, new vec2(60, 170), this)
    const rectNode3: SpriteNode = PanelRectFactory.create(root, new vec2(0, 0), this)





    const containerNode2: SpriteNode = ContainerFactory.create(containerNode1, new vec2(0, 170), this)


    const rectNode2_1: SpriteNode = PanelRectFactory.create(containerNode2, new vec2(0, 0), this)
    const rectNode2_2: SpriteNode = PanelRectFactory.create(containerNode2, new vec2(0, 120), this)

    LinkFactory.create(root, rectNode2_1, rectNode2_2, '99');



    LinkFactory.create(root, panelPointNode1, panelPointNode2, '1->2');
    LinkFactory.create(root, panelPointNode2, panelPointNode1, '2->1');
    LinkFactory.create(root, panelPointNode2, panelPointNode1, '2->1');
    LinkFactory.create(root, panelPointNode2, panelPointNode1, '2->1');
    LinkFactory.create(root, panelPointNode1, panelPointNode3, '1->3');
    LinkFactory.create(root, panelPointNode2, panelPointNode3, '2->3');
    LinkFactory.create(root, panelPointNode2, panelPointNode3, '2->3');
    LinkFactory.create(root, rectNode1, rectNode2, 'ii');
    LinkFactory.create(root, rectNode1, panelPointNode2, '88');



    const rectNode4: SpriteNode = PanelRectFactory.create(root, new vec2(700, 60), this);

    const rectNode5: SpriteNode = PanelRectFactory.create(root, new vec2(850, 300), this);

    HorizontalFlexLinkFactory.create(root, rectNode4, rectNode5, '1');
    HorizontalFlexLinkFactory.create(root, rectNode5, rectNode4, '2');

    const rectNode6: SpriteNode = PanelRectFactory.create(root, new vec2(700, 400), this);

    const rectNode7: SpriteNode = PanelRectFactory.create(root, new vec2(850, 500), this);

    VerticalFlexLinkFactory.create(root, rectNode6, rectNode7, '3');
    VerticalFlexLinkFactory.create(root, rectNode7, rectNode6, '4');


    console.log(root)
  }

  private init2(): void {
    const root = this._app.rootContainer as SpriteNode

    const containerNode1: SpriteNode = ContainerFactory.create(root, new vec2(0, 0), this)

    const panelPointNode1: SpriteNode = PanelPointFactory.create(containerNode1, new vec2(50, 50), 'panelPointNode1', this);
    const panelPointNode2: SpriteNode = PanelPointFactory.create(containerNode1, new vec2(320, 120), 'panelPointNode2', this);
    const panelPointNode3: SpriteNode = PanelPointFactory.create(root, new vec2(320, 400), 'panelPointNode3', this);

    LinkFactory.create(root, panelPointNode2, panelPointNode3, '2->3');
    LinkFactory.create(root, panelPointNode1, panelPointNode2, '1->2');

    console.log(root)
  }

  public convertTreeToJsonString<T extends ISprite>(node: TreeNode<T>): string {
    let nodes: Array<TreeNode<T>> = [];
    let datas: Array<NodeData> = [];
    for (let n: TreeNode<T> | undefined = node; n !== undefined; n = n.moveNext()) {
      if (n.needSerialize === true) {
        let sprite = n.data
        if (sprite) {
          let nodeData = new NodeData(-1, n.nodeType)
          nodeData.x = sprite.x
          nodeData.y = sprite.y
          nodeData.name = sprite.name
          datas.push(nodeData);
          nodes.push(n);
        }
      }
    }
    // 为parentIdx赋值
    for (let i: number = 0; i < datas.length; i++) {
      // 这些node只会挂载到root上
      if (
        nodes[i].nodeType === NodeType.CONTAINER ||
        nodes[i].nodeType === NodeType.LINK ||
        nodes[i].nodeType === NodeType.HORIZONTALFLEXLINK ||
        nodes[i].nodeType === NodeType.VERTICALFLEXLINK
      ) {
        datas[i].parentIdx = 0;
      } else {
        let parent: TreeNode<T> | undefined = nodes[i].parent;
        if (parent === undefined) {
          datas[i].parentIdx = -1;  // 根节点
        } else {
          for (let j: number = 0; j < datas.length; j++) {
            if (parent === nodes[j]) {
              datas[i].parentIdx = j;
            }
          }
        }
      }
    }
    // 为toIdx和fromIdx赋值
    for (let i: number = 0; i < datas.length; i++) {
      if (nodes[i].nodeType === NodeType.LINK || nodes[i].nodeType === NodeType.HORIZONTALFLEXLINK || nodes[i].nodeType === NodeType.VERTICALFLEXLINK) {
        let sprite: ISprite = nodes[i].data as ISprite
        let fromIdx = undefined
        let toIdx = undefined
        for (let j: number = 0; j < datas.length; j++) {
          if (sprite.data.from === nodes[j]) {
            fromIdx = j;
          }
          if (sprite.data.to === nodes[j]) {
            toIdx = j;
          }
        }
        console.log(fromIdx, toIdx)
        datas[i].fromIdx = fromIdx
        datas[i].toIdx = toIdx
      }
    }
    return JSON.stringify(datas);
  }

  public convertJsonStringToTree<T>(json: string): TreeNode<T> | undefined {
    // 首先我们使用JSON . parse方法，将json字符串反序列化成Array对象（datas）
    let datas: [] = JSON.parse(json);
    let data !: NodeData;
    let nodes: TreeNode<T>[] = [];
    // 根据NodeData列表生成节点数组
    for (let i: number = 0; i < datas.length; i++) {
      // 将datas中每个元素都转型为NodeData对象
      data = datas[i] as NodeData;
      // 如果当前的NodeData的parentidx为-1，表示根节点
      // 实际上，我们的datas是深度优先，从上到下（先根前序）顺序存储的
      // 因此datas [ 0 ]肯定是根节点
      if (data.parentIdx === - 1) {
        nodes.push(new TreeNode<T>(undefined, undefined, data.name));
      }
      else {  // 不是-1，说明有父亲节点
        // 我们利用了深度优先，从上到下（先根前序）顺序存储的nodes数组的特点
        // 上述顺序存储的数组，当前节点的父亲节点总是已经存在nodes中了
        nodes.push(new TreeNode<T>(undefined, nodes[data.parentIdx], data.name))
      }
    }

    // 返回反序列化中的根节点
    return nodes[0];
  }

}

const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
const app = new Sprite2DApplication(canvas, true)
app.isSupportMouseMove = true
new TopologyApplication(app);