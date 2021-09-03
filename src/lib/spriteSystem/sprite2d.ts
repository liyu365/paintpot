import { mat2d, Transform2D, vec2 } from "../math2d"
import { ISprite, MouseEventHandler, KeyboardEventHandler, UpdateEventHandler, EOrder, IShape, ERenderType, ISpriteContainer, RenderEventHandler } from "./interface"
import { TreeNode } from "../treeNode";
import { SpriteNode } from "./sprite2dHierarchicalSystem";

/**
 * 表示一个绘制对象，内部存储了：
 * shape：表示要绘制的路径；
 * transform：封装了变换矩阵；
 * fillStyle、strokeStyle、lineWidth：存储了context绘制此对象时需要设置的渲染状态；
 * renderType：BaseShape2D类的draw方法会读取此值，并执行绘制函数context.fill()或context.stroke()或context.clip()
 * isXXX：表示当前对象的状态
 */
export class Sprite2D implements ISprite {
  public showCoordSystem: boolean = false;
  public renderType: ERenderType = ERenderType.FILL;
  public isVisible: boolean = true;
  public isSelected: boolean = false
  public isDragging: boolean = false
  public isHovering: boolean = false
  public fillStyle: string | CanvasGradient | CanvasPattern = 'white';
  public strokeStyle: string | CanvasGradient | CanvasPattern = 'black';
  public lineWidth: number = 1;

  public transform: Transform2D = new Transform2D();

  public name: string;
  public shape: IShape;
  public data: any; // 挂在到此绘制对象的数据
  // 非空断言，因为owner不通过构造函数或内联赋值进行初始化。它指向一个SpriteNode对象（实现了ISpriteContainer接口）
  // 1：owner的初始化赋值是在调用SpriteNode对象的addChildAt()时，被传入的child如果被成功插入为其子级，则child包裹的Sprite2D对象的owner就会指向该child
  // 2：如果该Sprite2D实例是被根SpriteNode包裹，则它的owner的初始化赋值是在SpriteNodeManager的构造函数中（因为在此构造函数中实例化的根SpriteNode）
  public owner !: ISpriteContainer;

  public mouseEvent: MouseEventHandler | null = null;
  public keyEvent: KeyboardEventHandler | null = null;
  public updateEvent: UpdateEventHandler | null = null; // 被this.update()调用
  public renderEvent: RenderEventHandler | null = null; // 在this.draw()中被调用两次

  // 缓存鼠标点击到此对象的点，相对于此对象坐标系的局部坐标
  public diffX: number = 0;
  public diffY: number = 0;

  public constructor(shape: IShape, name: string) {
    this.name = name;
    this.shape = shape;
  }

  public set x(x: number) {
    this.transform.position.x = x;
  }

  public get x(): number {
    return this.transform.position.x;
  }

  public set y(y: number) {
    this.transform.position.y = y;
  }

  public get y(): number {
    return this.transform.position.y;
  }

  public set rotation(rotation: number) {
    this.transform.rotation = rotation;
  }

  public get rotation(): number {
    return this.transform.rotation;
  }

  public set scaleX(s: number) {
    this.transform.scale.x = s;
  }

  public get scaleX(): number {
    return this.transform.scale.x;
  }

  public set scaleY(s: number) {
    this.transform.scale.y = s;
  }

  public get scaleY(): number {
    return this.transform.scale.y;
  }


  public getWorldMatrix(): mat2d {
    if (this.owner instanceof SpriteNode) {
      let arr: TreeNode<ISprite>[] = [];
      let curr: TreeNode<ISprite> | undefined = this.owner as SpriteNode;
      while (curr !== undefined) {
        arr.push(curr);
        curr = curr.parent;
      }

      let out: mat2d = mat2d.create();
      let currMat: mat2d;
      for (let i: number = arr.length - 1; i >= 0; i--) {
        curr = arr[i];
        if (curr.data) {
          currMat = (curr.data as Sprite2D).transform.toMatrix();
          mat2d.multiply(out, currMat, out);
        }
      }
      return out;
    } else {
      return this.transform.toMatrix();
    }
  }

  public getWorldMatrix2(): mat2d {
    if (this.owner instanceof SpriteNode) {
      let arr: TreeNode<ISprite>[] = [];
      let curr: TreeNode<ISprite> | undefined = this.owner as SpriteNode;
      while (curr !== undefined) {
        arr.push(curr);
        curr = curr.parent;
      }
      arr.pop()

      let out: mat2d = mat2d.create();
      let currMat: mat2d;
      for (let i: number = arr.length - 1; i >= 0; i--) {
        curr = arr[i];
        if (curr.data) {
          currMat = (curr.data as Sprite2D).transform.toMatrix();
          mat2d.multiply(out, currMat, out);
        }
      }
      return out;
    } else {
      return this.transform.toMatrix();
    }
  }

  public getLocalMatrix(): mat2d {
    let src: mat2d = this.getWorldMatrix();
    let out: mat2d = mat2d.create();
    if (mat2d.invert(src, out)) {
      return out;
    } else {
      alert("矩阵求逆失败");
      throw new Error("矩阵求逆失败");
    }
  }

  public update(mesc: number, diff: number, order: EOrder): void {
    if (this.updateEvent) {
      this.updateEvent(this, mesc, diff, order);
    }
  }

  public hitTest(localPt: vec2): boolean {
    if (this.isVisible) {
      return this.shape.hitTest(localPt, this);
    } else {
      return false;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (this.isVisible) {

      // 1.先调用context.restore();
      // 2.根据this.lineWidth，this.strokeStyle，this.fillStyle设置上下文渲染状态
      // 3.根据当前对象的世界矩阵，设置context的setTransform()方法
      this.shape.beginDraw(this, this, context);

      if (this.renderEvent !== null) {
        this.renderEvent(this, context, EOrder.PREORDER);
      }

      this.shape.draw(this, this, context);

      if (this.renderEvent !== null) {
        this.renderEvent(this, context, EOrder.POSTORDER);
      }

      // 会调用context.restore();
      this.shape.endDraw(this, this, context);
    }
  }
}

