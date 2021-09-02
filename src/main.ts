import { Sprite2DApplication } from "./lib/spriteSystem/sprite2DApplication";
import { ISprite, EOrder, IShape, Bounding, NodeType, SceneMode, SpriteFactory, ERenderType } from "./lib/spriteSystem/interface";
import { CanvasMouseEvent, EInputEventType } from "./lib/application";
import { vec2, Math2D } from "./lib/math2d";
import { SpriteNode, SpriteNodeGroup } from './lib/spriteSystem/sprite2dHierarchicalSystem'
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
  private _diffX = 0 // 鼠标按下的世界坐标与rootSpr左上角世界坐标的差
  private _diffY = 0
  private _downX = 0 // 鼠标按下时的世界坐标
  private _downY = 0
  private _selectAreaVertexs: Array<number> = [] // 选框的x,y,w,h
  private _selectedSprites: Array<ISprite> = []
  private _hoveringSprite: ISprite | null = null
  private _sprMenu: HTMLElement | null

  public constructor(app: Sprite2DApplication) {
    this._app = app

    this.init();
    // this.init2();
    // this.init3()
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
      const rectNode4: SpriteNode = PanelRectFactory.create(root, 'rectNode4', new vec2(20, 20), this);
    }

    const saveBtn: HTMLElement = document.querySelector('#saveBtn') as HTMLElement
    saveBtn.onclick = () => {
      const root = this._app.rootContainer as SpriteNode
      let json = this.convertTreeToJsonString(root)
      console.log(json)
      window.localStorage.setItem('chartJSON', json)
    }

    const restoreBtn: HTMLElement = document.querySelector('#restoreBtn') as HTMLElement
    restoreBtn.onclick = () => {
      // const root = this._app.rootContainer as SpriteNode
      // root.clearChildren()
      let json = window.localStorage.getItem('chartJSON')
      if (json) {
        let root = this.convertJsonStringToTree(json)
        console.log('root', root)
        if (root) {
          this._app.rootContainer = root
        }
      }
    }

    const dragModeBtn: HTMLElement = document.querySelector('#dragModeBtn') as HTMLElement
    dragModeBtn.onclick = () => {
      this._app.sceneMode = SceneMode.DRAG
    }

    const selectModeBtn: HTMLElement = document.querySelector('#selectModeBtn') as HTMLElement
    selectModeBtn.onclick = () => {
      this._app.sceneMode = SceneMode.SELECT
    }
  }

  private clearAllSprite(): void {
    this._selectedSprites.forEach(spr => {
      spr.isSelected = false
    })
    this._selectedSprites = []
  }

  private removeSelectedSprite(spr: ISprite): ISprite {
    spr.isSelected = false
    let index = this._selectedSprites.findIndex(item => {
      return item === spr
    })
    if (index !== -1) {
      this._selectedSprites.splice(index, 1)
    }
    return spr
  }

  private addSelectedSprite(spr: ISprite): ISprite {
    spr.isSelected = true
    let index = this._selectedSprites.findIndex(item => {
      return item === spr
    })
    if (index === -1) {
      this._selectedSprites.push(spr)
    }
    return spr
  }

  private handleMouseDown(evt: Event): void {
    let event = evt as MouseEvent
    if (event.button === 0) {
      const root = this._app.rootContainer as SpriteNode
      const rootSpr = root.sprite
      const mouseOffset: vec2 = this._app._viewportToCanvasCoordinate(event)
      if (rootSpr) {
        this._diffX = mouseOffset.x - rootSpr.x
        this._diffY = mouseOffset.y - rootSpr.y
        this._isMouseDown = true
      }
      this._downX = mouseOffset.x
      this._downY = mouseOffset.y
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
      this.clearAllSprite()
    }
    this._isSatgeHasDrag = false
    this._app.operations = []
  }

  private handleMouseMove(evt: Event): void {
    const root = this._app.rootContainer as SpriteNode
    const rootSpr = root.sprite
    if (rootSpr) {
      if (this._isMouseDown && !this._app.getDragSprite() || this._app.getDragSprite() === rootSpr) {
        this._isSatgeHasDrag = true

        // 拖动stage
        if (this._app.sceneMode === SceneMode.DRAG) {
          let mouseOffset: vec2 = this._app._viewportToCanvasCoordinate(evt as MouseEvent)
          rootSpr.x = mouseOffset.x - this._diffX
          rootSpr.y = mouseOffset.y - this._diffY
          if (this._sprMenu) {
            this._sprMenu.style.display = 'none'
          }
        }

        // 绘制选框
        if (this._app.sceneMode === SceneMode.SELECT) {
          let mouseOffset: vec2 = this._app._viewportToCanvasCoordinate(evt as MouseEvent)
          let p1 = new vec2(this._downX, this._downY)
          let p2 = new vec2(mouseOffset.x, mouseOffset.y)
          let x = p1.x >= p2.x ? p2.x : p1.x
          let y = p1.y >= p2.y ? p2.y : p1.y
          let w = Math.abs(p1.x - p2.x)
          let h = Math.abs(p1.y - p2.y)
          this._selectAreaVertexs[0] = x
          this._selectAreaVertexs[1] = y
          this._selectAreaVertexs[2] = w
          this._selectAreaVertexs[3] = h
          let getOperationFun = (x: number, y: number, w: number, h: number) => {
            return (context: CanvasRenderingContext2D | null) => {
              if (context) {
                context.save()
                context.beginPath()
                context.strokeStyle = "rgba(0,0,236,0.5)"
                context.fillStyle = "rgba(0,0,236,0.2)"
                context.rect(x, y, w, h)
                context.fill()
                context.stroke()
                context.closePath()
                context.restore()
              }
            }
          }
          this._app.operations = []
          this._app.operations[0] = getOperationFun(x, y, w, h)
          this.calcInSelectArae()
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

  // 计算所有sprite是否在选区内
  private calcInSelectArae() {
    const root = this._app.rootContainer as SpriteNode
    let iter: IEnumerator<TreeNode<ISprite>> = NodeEnumeratorFactory.create_bf_r2l_b2t_iter(root);
    let current: TreeNode<ISprite> | undefined = undefined;
    this.clearAllSprite()
    while (iter.moveNext()) {
      current = iter.current;
      if (current && current.data) {
        let sprite: ISprite = current.data
        let bounding: Bounding = sprite.shape.getBounding()
        let parentSpr = sprite.owner.getParentSprite()
        if (parentSpr) {
          let spriteLeftTop: vec2 = new vec2(sprite.x + bounding.left, sprite.y + bounding.top)
          spriteLeftTop = Math2D.transform(parentSpr.getWorldMatrix(), spriteLeftTop)

          let spriteRightBottom = new vec2(sprite.x + bounding.right, sprite.y + bounding.bottom)
          spriteRightBottom = Math2D.transform(parentSpr.getWorldMatrix(), spriteRightBottom)

          if (Math2D.isCollisionWithRect(
            spriteLeftTop.x, spriteLeftTop.y, spriteRightBottom.x - spriteLeftTop.x, spriteRightBottom.y - spriteLeftTop.y,
            this._selectAreaVertexs[0], this._selectAreaVertexs[1], this._selectAreaVertexs[2], this._selectAreaVertexs[3]
          )) {
            this.addSelectedSprite(sprite)
          } else {
            this.removeSelectedSprite(sprite)
          }
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
        if (spr.isSelected === true) {
          this.removeSelectedSprite(spr)
          spr.isHovering = true
        } else {
          this.clearAllSprite()
          this.addSelectedSprite(spr)
          spr.isHovering = false
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

    const panelPointNode1: SpriteNode = PanelPointFactory.create(root, 'panelPointNode1', new vec2(120, 120), this);
    const panelPointNode2: SpriteNode = PanelPointFactory.create(root, 'panelPointNode2', new vec2(320, 120), this);
    const panelPointNode3: SpriteNode = PanelPointFactory.create(root, 'panelPointNode3', new vec2(320, 400), this);



    const containerNode1: SpriteNode = ContainerFactory.create(root, 'containerNode1', new vec2(520, 220), this)

    const rectNode1: SpriteNode = PanelRectFactory.create(containerNode1, 'rectNode1', new vec2(0, 0), this)
    const rectNode2: SpriteNode = PanelRectFactory.create(containerNode1, 'rectNode2', new vec2(60, 170), this)
    const rectNode3: SpriteNode = PanelRectFactory.create(root, 'rectNode3', new vec2(0, 0), this)





    const containerNode2: SpriteNode = ContainerFactory.create(containerNode1, 'containerNode2', new vec2(0, 170), this)


    const rectNode2_1: SpriteNode = PanelRectFactory.create(containerNode2, 'rectNode2_1', new vec2(0, 0), this)
    const rectNode2_2: SpriteNode = PanelRectFactory.create(containerNode2, 'rectNode2_2', new vec2(0, 120), this)

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



    const rectNode4: SpriteNode = PanelRectFactory.create(root, 'rectNode4', new vec2(700, 60), this);

    const rectNode5: SpriteNode = PanelRectFactory.create(root, 'rectNode5', new vec2(850, 300), this);

    HorizontalFlexLinkFactory.create(root, rectNode4, rectNode5, '1');
    HorizontalFlexLinkFactory.create(root, rectNode5, rectNode4, '2');

    const rectNode6: SpriteNode = PanelRectFactory.create(root, 'rectNode6', new vec2(700, 400), this);

    const rectNode7: SpriteNode = PanelRectFactory.create(root, 'rectNode7', new vec2(850, 500), this);

    VerticalFlexLinkFactory.create(root, rectNode6, rectNode7, '3');
    VerticalFlexLinkFactory.create(root, rectNode7, rectNode6, '4');
    VerticalFlexLinkFactory.create(root, rectNode7, rectNode6, '5');



    console.log(root)
  }

  private init2(): void {
    const root = this._app.rootContainer as SpriteNode

    const containerNode1: SpriteNode = ContainerFactory.create(root, 'containerNode1', new vec2(0, 0), this)

    const panelPointNode1: SpriteNode = PanelPointFactory.create(containerNode1, 'panelPointNode1', new vec2(50, 50), this);
    const panelPointNode2: SpriteNode = PanelPointFactory.create(containerNode1, 'panelPointNode2', new vec2(320, 120), this);
    const panelPointNode3: SpriteNode = PanelPointFactory.create(root, 'panelPointNode3', new vec2(320, 400), this);

    LinkFactory.create(root, panelPointNode2, panelPointNode3, '2->3');
    LinkFactory.create(root, panelPointNode1, panelPointNode2, '1->2');

    console.log(root)
  }

  private init3(): void {
    const root = this._app.rootContainer as SpriteNode



    const rectNode3: SpriteNode = PanelRectFactory.create(root, 'rectNode3', new vec2(200, 200), this)
    //const panelPointNode2: SpriteNode = PanelPointFactory.create(root, 'panelPointNode2', new vec2(320, 120), this);

    console.log(root)
  }

  public convertTreeToJsonString(node: TreeNode<ISprite>): string {
    let nodes: Array<TreeNode<ISprite>> = [];
    let datas: Array<NodeData> = [];
    let n: TreeNode<ISprite> | undefined = node
    do {
      if (n.needSerialize === true) {
        let sprite = n.data
        if (sprite) {
          // 父级对象的索引先统一设置成-1
          let nodeData = new NodeData(-1, n.nodeType)
          nodeData.x = sprite.x
          nodeData.y = sprite.y
          nodeData.name = n.name
          // 在同一个循环里一起赋值datas和nodes，保证datas和nodes的同一索引对应的是同一个TreeNode数据
          datas.push(nodeData);
          nodes.push(n);
        }
      }
    } while (n = n.moveNext()); // 深度优先、从上到下、从左到右的遍历，保证父节点在数组中的索引肯定比子节点的索引小，这样反序列化的时候，父节点的实例才能先于子节点创建

    // 为parentIdx赋值
    for (let i: number = 0; i < datas.length; i++) {
      // 连线node需要手动指定parent为root，因为再工厂函数中连线node都会放到一个SpriteNodeGroup中，再把SpriteNodeGroup放到root下
      if (
        nodes[i].nodeType === NodeType.LINK ||
        nodes[i].nodeType === NodeType.HORIZONTALFLEXLINK ||
        nodes[i].nodeType === NodeType.VERTICALFLEXLINK
      ) {
        datas[i].parentIdx = 0;
      } else {
        let parent: TreeNode<ISprite> | undefined = nodes[i].parent;
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

    // 为detas数组中的连线数据的toIdx和fromIdx赋值，这里不需要管fromIdx和toIdx指向的node对象在反序列化的时候是否已经创建，因为反序列化的时候有特殊处理
    for (let i: number = 0; i < datas.length; i++) {
      if (nodes[i].nodeType === NodeType.LINK || nodes[i].nodeType === NodeType.HORIZONTALFLEXLINK || nodes[i].nodeType === NodeType.VERTICALFLEXLINK) {
        let sprite = nodes[i].data
        if (sprite) {
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
          datas[i].fromIdx = fromIdx
          datas[i].toIdx = toIdx
        }
      }
    }
    return JSON.stringify(datas);
  }

  public convertJsonStringToTree<T>(json: string): SpriteNode | undefined {
    let datas: [] = JSON.parse(json);
    let data !: NodeData;
    let nodes: SpriteNode[] = [];

    const root = this._app.rootContainer as SpriteNode
    // 根据NodeData列表生成节点数组
    for (let i: number = 0; i < datas.length; i++) {
      data = datas[i] as NodeData;
      if (data.parentIdx === -1) {
        let spr: ISprite = SpriteFactory.createISprite(SpriteFactory.createGrid(1000, 600));
        spr.name = 'root';
        spr.strokeStyle = "rgba(0,0,0,0.1)";
        spr.fillStyle = 'white';
        spr.renderType = ERenderType.STROKE_FILL;
        let root = new SpriteNode(spr, undefined, spr.name);
        root.nodeType = NodeType.SPRITE
        root.needSerialize = true
        spr.owner = root
        nodes.push(root)
      } else {
        let blankNode = new SpriteNodeGroup(undefined, undefined, 'blank')
        if (data.nodeType === NodeType.CONTAINER) {
          let node = ContainerFactory.create(nodes[data.parentIdx], data.name || '', new vec2(data.x, data.y), this)
          nodes.push(node)
        } else if (data.nodeType === NodeType.PANELPOINT) {
          let node = PanelPointFactory.create(nodes[data.parentIdx], data.name || '', new vec2(data.x, data.y), this);
          nodes.push(node)
        } else if (data.nodeType === NodeType.PANELRECT) {
          let node = PanelRectFactory.create(nodes[data.parentIdx], data.name || '', new vec2(data.x, data.y), this);
          nodes.push(node)
        } else if (data.nodeType === NodeType.LINK || data.nodeType === NodeType.VERTICALFLEXLINK || data.nodeType === NodeType.HORIZONTALFLEXLINK) {
          // 连线类型的node，因为他们的from或to指向的对象还没有建立，所以先用blankNode在nodes中做占位
          nodes.push(blankNode)
        }

      }
    }

    // 把所有连线node都实例化并设置它们的from和to指向，因为此时的nodes中所有node都已经按顺序实例化（连线node已经进行了占位）
    // 不用担心fromIdx索引或toIdx索引在nodes中没有对应的成员
    for (let i: number = 0; i < datas.length; i++) {
      data = datas[i] as NodeData;
      if (data.fromIdx !== undefined && data.toIdx !== undefined) {
        if (data.nodeType === NodeType.LINK) {
          LinkFactory.create(nodes[data.parentIdx], nodes[data.fromIdx], nodes[data.toIdx], data.name || '');
        }
        if (data.nodeType === NodeType.VERTICALFLEXLINK) {
          VerticalFlexLinkFactory.create(nodes[data.parentIdx], nodes[data.fromIdx], nodes[data.toIdx], data.name || '');
        }
        if (data.nodeType === NodeType.HORIZONTALFLEXLINK) {
          HorizontalFlexLinkFactory.create(nodes[data.parentIdx], nodes[data.fromIdx], nodes[data.toIdx], data.name || '');
        }
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