import { IShape, ISprite, Bounding, EOrder } from "../spriteSystem/interface";
import { CanvasMouseEvent, EInputEventType } from "../application";
import { vec2, Math2D } from "../math2d";

type LineCap = "butt" | "round" | "square";
type LineJoin = "bevel" | "round" | "miter";

type TextAlign = "start" | "center" | "end" | "left" | "right";
type TextBaseLine = "top" | "bottom" | "middle" | "alphabetic" | "ideographic" | "hanging";

type GlobalCompositeOperation = "source-over" | "source-atop" | "source-in" | "source-out" | "destination-over" | "destination-atop" | "destination-in" | "destination-out" | "lighte" | "copy" | "xor";

export class Canvas2DUtil {
  public static Colors: string[] = [
    //'black' ,   //黑色
    // 'white' ,   //白色
    'aqua',    //浅绿色
    'blue',    //蓝色 
    'fuchsia', //紫红色
    'gray',     //灰色
    'green',   //绿色
    'lime',    //绿黄色
    'maroon',  //褐红色
    'navy',    //海军蓝
    'olive',   //橄榄色
    'orange',  //橙色
    'purple',  //紫色
    'red',      //红色
    'silver',  //银灰色
    'teal',    //蓝绿色
    'yellow'    //黄色
  ];

  public static printAllStates(ctx: CanvasRenderingContext2D): void {
    console.log("*********LineState**********");
    console.log(" lineWidth : " + ctx.lineWidth);
    console.log(" lineCap : " + ctx.lineCap);
    console.log(" lineJoin : " + ctx.lineJoin);
    console.log(" miterLimit : " + ctx.miterLimit);

    console.log("*********LineDashState**********");
    console.log(" lineDashOffset : " + ctx.lineDashOffset);

    console.log("*********ShadowState**********");
    console.log(" shadowBlur : " + ctx.shadowBlur);
    console.log(" shadowColor : " + ctx.shadowColor);
    console.log(" shadowOffsetX : " + ctx.shadowOffsetX);
    console.log(" shadowOffsetY : " + ctx.shadowOffsetY);

    console.log("*********TextState**********");
    console.log(" font : " + ctx.font);
    console.log(" textAlign : " + ctx.textAlign);
    console.log(" textBaseline : " + ctx.textBaseline);

    console.log("*********RenderState**********");
    console.log(" strokeStyle : " + ctx.strokeStyle);
    console.log(" fillStyle : " + ctx.fillStyle);
    console.log(" globalAlpha : " + ctx.globalAlpha);
    console.log(" globalCompositeOperation : " + ctx.globalCompositeOperation);

  }

  public static state(ctx: CanvasRenderingContext2D, save: boolean = true): void {
    if (save === true) {
      ctx.save();
    } else {
      ctx.restore();
    }
  }

  public static setLineState(ctx: CanvasRenderingContext2D, lineWidth: number = 1.0, lineCap: LineCap = "butt", lineJoint: LineJoin = "miter", miterLimit: number = 10.0): void {
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;
    ctx.lineJoin = lineJoint;
    ctx.miterLimit = miterLimit;
  }

  public static setLineDashState(ctx: CanvasRenderingContext2D, lineDashArray: number[], lineDashOffset: number = 0.0): void {
    ctx.setLineDash(lineDashArray);
    ctx.lineDashOffset = lineDashOffset;
  }

  public static setShadowState(ctx: CanvasRenderingContext2D, shadowBlur: number = 0, shadowColor: string = "rgba(0, 0, 0, 0)", shadowOffsetX: number = 0, shadowOffsetY: number = 0): void {
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
  }

  public static setTextState(ctx: CanvasRenderingContext2D, font: string, textAlign: TextAlign = "left", textBaseLine: TextBaseLine = "top"): void {
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseLine;
  }

  public static setRenderState(ctx: CanvasRenderingContext2D, strokeStyle: string | CanvasGradient | CanvasPattern = "#000000", fillStyle: string | CanvasGradient | CanvasPattern = "#000000", globalAlpha: number = 1.0, compositeOperation: GlobalCompositeOperation = "source-over"): void {
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.globalAlpha = globalAlpha;
    ctx.globalCompositeOperation = compositeOperation;
  }

  public static drawSelected(spr: ISprite, context: CanvasRenderingContext2D, renderOreder: EOrder): void {
    if (renderOreder === EOrder.PREORDER && spr.isSelected === true) {
      let shap: IShape = spr.shape
      let bounding: Bounding = shap.getBounding()
      context.save()
      context.beginPath()
      context.fillStyle = 'rgba(0,0,0,1)'
      context.strokeStyle = 'rgba(0,0,0,1)'
      context.lineWidth = 7
      context.rect(bounding.left, bounding.top, bounding.right - bounding.left, bounding.bottom - bounding.top)
      context.fill()
      context.stroke()
      context.restore()
    }

  }

  public static dragSprite(spr: ISprite, evt: CanvasMouseEvent): void {
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
      spr.x = position.x - spr.diffX
      spr.y = position.y - spr.diffY
      // console.log('相对于根sprite的坐标（而不是canvas）', Math2D.transform(parentSpr.getWorldMatrix2(), new vec2(this.x, this.y)))
      // console.log('局部坐标', new vec2(this.x, this.y))
    }
    if (evt.type === EInputEventType.MOUSEUP) {
      if (spr.isSelected === false && spr.isDragging === false) {
        spr.isSelected = true
      }
      if (spr.isDragging === true) {
        spr.isDragging = false
      }
    }
  }


}