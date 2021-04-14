/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./ts/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ts/app.ts":
/*!*******************!*\
  !*** ./ts/app.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = __webpack_require__(/*! ./src/spriteSystem/interface */ "./ts/src/spriteSystem/interface.ts");
const sprite2DApplication_1 = __webpack_require__(/*! ./src/spriteSystem/sprite2DApplication */ "./ts/src/spriteSystem/sprite2DApplication.ts");
const application_1 = __webpack_require__(/*! ./src/application */ "./ts/src/application.ts");
const math2d_1 = __webpack_require__(/*! ./src/math2d */ "./ts/src/math2d.ts");
const shapes_1 = __webpack_require__(/*! ./src/spriteSystem/shapes */ "./ts/src/spriteSystem/shapes.ts");
const sprite2dHierarchicalSystem_1 = __webpack_require__(/*! ./src/spriteSystem/sprite2dHierarchicalSystem */ "./ts/src/spriteSystem/sprite2dHierarchicalSystem.ts");
const sprite2d_1 = __webpack_require__(/*! ./src/spriteSystem/sprite2d */ "./ts/src/spriteSystem/sprite2d.ts");
class SpriteNodeGroup extends sprite2dHierarchicalSystem_1.SpriteNode {
    constructor(params, parent = undefined, name = "SpriteNodeGroup") {
        super(interface_1.SpriteFactory.createSprite(new shapes_1.EmptyShape), parent, name);
        this.params = params;
    }
}
class CNodeTextShap extends shapes_1.BaseShape2D {
    constructor(radius = 1) {
        super();
    }
    hitTest(localPt, transform) {
        return false;
    }
    draw(transformable, state, context) {
        let spr = transformable;
        let text = spr.data.text;
        context.save();
        context.font = "20px Arial";
        context.textBaseline = "middle";
        context.textAlign = "left";
        let w = context.measureText(text).width;
        let h = context.measureText('田').width;
        let padding = 10;
        let Xdeviation = -(w + 2 * padding) / 2; // x轴的偏移量
        context.save();
        context.beginPath();
        context.fillStyle = "rgba(0, 0, 255, 0.8)";
        this.drawRoundRect(context, Xdeviation, 0, w + 2 * padding, h + 2 * padding, 6);
        //context.rect(Xdeviation , 0 ,w + 2 * padding, h + 2 * padding)
        context.fill();
        context.restore();
        context.save();
        context.beginPath();
        context.fillStyle = "rgba(255, 255, 255, 1)";
        context.fillText(text, padding + Xdeviation, padding + h / 2 + 1);
        context.restore();
        context.restore();
    }
    drawRoundRect(cxt, x, y, width, height, radius) {
        cxt.beginPath();
        cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
        cxt.lineTo(width - radius + x, y);
        cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
        cxt.lineTo(width + x, height + y - radius);
        cxt.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
        cxt.lineTo(radius + x, height + y);
        cxt.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
        cxt.closePath();
    }
    get type() {
        return "CNodeTextShap";
    }
}
class LnikTextShap extends shapes_1.BaseShape2D {
    constructor() {
        super();
    }
    hitTest(localPt, transform) {
        return false;
    }
    draw(transformable, state, context) {
        let spr = transformable;
        let text = spr.data.text;
        context.save();
        context.font = "14px Arial";
        context.textBaseline = "middle";
        context.textAlign = "left";
        let w = context.measureText(text).width;
        let h = context.measureText('田').width;
        let padding = 4;
        let Xdeviation = -(w + 2 * padding) / 2; // x轴的偏移量
        let Ydeviation = -(h + 2 * padding) / 2; // y轴的偏移量
        context.save();
        context.beginPath();
        context.fillStyle = "rgba(0, 0, 255, 0.8)";
        this.drawRoundRect(context, Xdeviation, Ydeviation, w + 2 * padding, h + 2 * padding, 6);
        //context.rect(Xdeviation , 0 ,w + 2 * padding, h + 2 * padding)
        context.fill();
        context.restore();
        context.save();
        context.beginPath();
        context.fillStyle = "rgba(255, 255, 255, 1)";
        context.fillText(text, padding + Xdeviation, padding + h / 2 + Ydeviation + 1);
        context.restore();
        context.restore();
    }
    drawRoundRect(cxt, x, y, width, height, radius) {
        cxt.beginPath();
        cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
        cxt.lineTo(width - radius + x, y);
        cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
        cxt.lineTo(width + x, height + y - radius);
        cxt.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
        cxt.lineTo(radius + x, height + y);
        cxt.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
        cxt.closePath();
    }
    get type() {
        return "LnikTextShap";
    }
}
class topologyApplication {
    constructor(app) {
        this._cNodes = [];
        this._linkNodes = [];
        this._linkGroups = [];
        this._sameLinkGap = 25;
        this._linkCircleGap = 5;
        this._circleRadius = 30;
        this._curZoom = 1;
        this._app = app;
        this._circleShap = interface_1.SpriteFactory.createCircle(this._circleRadius);
        this._rectShap = interface_1.SpriteFactory.createRect(20, 10);
        this._arrowShap = interface_1.SpriteFactory.createPolygon([new math2d_1.vec2(5, 0), new math2d_1.vec2(0, 5), new math2d_1.vec2(0, -5)]);
        this.init();
        this._app.start();
        let zoomInButton = document.querySelector('#zoomIN');
        let zoomOutButton = document.querySelector('#zoomOut');
        zoomInButton.onclick = () => {
            this._curZoom *= 1.2;
            this.handleZoomChange();
        };
        zoomOutButton.onclick = () => {
            this._curZoom /= 1.2;
            this.handleZoomChange();
        };
    }
    handleZoomChange() {
        let root = this._app.rootContainer;
        let rootSpr = root.sprite;
        let canvas = document.getElementById('canvas');
        if (rootSpr) {
            rootSpr.scaleX = this._curZoom;
            rootSpr.scaleY = this._curZoom;
            if (canvas) {
                let mouseX = (canvas.offsetWidth / 2);
                let mouseY = (canvas.offsetHeight / 2);
                // let mouseX = 320
                // let mouseY = 120
                let newW = canvas.offsetWidth * this._curZoom;
                let newH = canvas.offsetHeight * this._curZoom;
                let x = mouseX - mouseX / canvas.offsetWidth * newW; // mouseX - mouseX映射到新宽度中的x坐标
                let y = mouseY - mouseY / canvas.offsetHeight * newH;
                rootSpr.x = x;
                rootSpr.y = y;
            }
        }
    }
    createCNode(position, name) {
        let circle = interface_1.SpriteFactory.createSprite(this._circleShap);
        circle.fillStyle = 'red';
        circle.x = position.x;
        circle.y = position.y;
        circle.mouseEvent = this.handleCircleEvent.bind(this);
        let circleN = new sprite2dHierarchicalSystem_1.SpriteNode(circle);
        let textSpr = new sprite2d_1.Sprite2D(new CNodeTextShap(), 'textSpr');
        textSpr.showCoordSystem = false;
        textSpr.x = 0;
        textSpr.y = this._circleRadius + 10;
        textSpr.data = {};
        textSpr.data.text = name;
        circleN.addSprite(textSpr);
        this._cNodes.push(circleN);
        return circleN;
    }
    createLink(node1, node2, name) {
        let link = interface_1.SpriteFactory.createSprite(interface_1.SpriteFactory.createXLine());
        link.strokeStyle = 'green';
        link.lineWidth = 4;
        link.data = {};
        link.data.from = node1;
        link.data.to = node2;
        link.x = 0;
        link.y = 0;
        link.mouseEvent = this.handleLinkEvent.bind(this);
        let linkN = new sprite2dHierarchicalSystem_1.SpriteNode(link);
        let arrow = interface_1.SpriteFactory.createSprite(this._arrowShap);
        arrow.fillStyle = 'blue';
        linkN.addSprite(arrow);
        let textSpr = new sprite2d_1.Sprite2D(new LnikTextShap(), 'LnikTextSpr');
        textSpr.showCoordSystem = false;
        textSpr.x = 0;
        textSpr.y = 0;
        textSpr.data = {};
        textSpr.data.text = name;
        linkN.addSprite(textSpr);
        let newGroup = new SpriteNodeGroup({});
        newGroup.params.from = node1;
        newGroup.params.to = node2;
        let sameGroup = this.getSameLinkGroup(newGroup);
        // 如果已经存在相同的group，则放到此group中，否则新建一个group，再作为新group的子集
        if (!sameGroup) {
            newGroup.addChild(linkN);
            this._linkNodes.push(linkN);
            this._linkGroups.push(newGroup);
            if (newGroup.sprite) {
                newGroup.sprite.updateEvent = this.handleLinkGroupUpdate.bind(this);
            }
        }
        else {
            sameGroup.addChild(linkN);
            this._linkNodes.push(linkN);
        }
    }
    getSameLinkGroup(linkGroup) {
        let o = null;
        this._linkGroups.forEach(item => {
            if ((item.params.from === linkGroup.params.from && item.params.to === linkGroup.params.to) ||
                (item.params.from === linkGroup.params.to && item.params.to === linkGroup.params.from)) {
                o = item;
            }
        });
        return o;
    }
    init() {
        let node1 = this.createCNode(new math2d_1.vec2(120, 120), 'node1');
        let node2 = this.createCNode(new math2d_1.vec2(320, 120), 'node2');
        let node3 = this.createCNode(new math2d_1.vec2(320, 400), 'node3');
        this.createLink(node1.sprite, node2.sprite, '1->2');
        this.createLink(node2.sprite, node1.sprite, '2->1');
        this.createLink(node2.sprite, node1.sprite, '2->1');
        this.createLink(node2.sprite, node1.sprite, '2->1');
        this.createLink(node1.sprite, node3.sprite, '1->3');
        this.createLink(node2.sprite, node3.sprite, '2->3');
        this.createLink(node2.sprite, node3.sprite, '2->3');
        let root = this._app.rootContainer;
        this._linkGroups.forEach(node => {
            root.addChild(node);
        });
        this._cNodes.forEach(node => {
            root.addChild(node);
        });
    }
    handleCircleEvent(spr, evt) {
        //console.log('handleCircleEvent', spr)
        if (evt.type === application_1.EInputEventType.MOUSEDRAG) {
            let root = this._app.rootContainer;
            if (root.sprite) {
                let position = new math2d_1.vec2(evt.canvasPosition.x, evt.canvasPosition.y);
                let newPosition = math2d_1.Math2D.transform(root.sprite.getLocalMatrix(), position); // 把鼠标的坐标用根sprite的局部矩阵进行转换
                spr.x = newPosition.x;
                spr.y = newPosition.y;
            }
        }
    }
    handleLinkEvent(spr, evt) {
        console.log('handleLinkEvent', spr);
    }
    handleLinkGroupUpdate(spr, mesc, diffSec, travelOrder) {
        let linkGroup = spr.owner;
        let children = linkGroup.children;
        let pt1 = new math2d_1.vec2(linkGroup.params.from.x, linkGroup.params.from.y);
        let pt2 = new math2d_1.vec2(linkGroup.params.to.x, linkGroup.params.to.y);
        let d = Math.sqrt((pt2.y - pt1.y) * (pt2.y - pt1.y) + (pt2.x - pt1.x) * (pt2.x - pt1.x));
        let linkGroupAngle = math2d_1.vec2.getOrientation(pt1, pt2);
        if (linkGroup.sprite) {
            linkGroup.sprite.x = pt1.x;
            linkGroup.sprite.y = pt1.y;
            linkGroup.sprite.rotation = linkGroupAngle;
        }
        if (children) {
            let count = children.length;
            children.forEach((linkN, index) => {
                let linkSpr = linkN.sprite;
                if (linkSpr) {
                    let gap = this._circleRadius + this._linkCircleGap;
                    let line = linkSpr.shape;
                    line.start = math2d_1.vec2.create(gap, 0);
                    line.end = math2d_1.vec2.create(d - gap, 0);
                    linkSpr.y = this._sameLinkGap * index + -(this._sameLinkGap * (count - 1)) / 2;
                    // 此linkSpr定义的方向与包含它的linkGroup的方向相反，所以此linkSpr要反向绘制
                    if (linkSpr.data.from !== linkGroup.params.from) {
                        linkSpr.rotation = 180;
                        linkSpr.x = d;
                    }
                    let arrowNode = linkN.getChildAt(0);
                    if (arrowNode) {
                        let arrow = arrowNode.sprite;
                        arrow.x = d - gap - 5;
                    }
                    let lnikTextNode = linkN.getChildAt(1);
                    if (lnikTextNode) {
                        let lnikTextSpr = lnikTextNode.sprite;
                        lnikTextSpr.x = d / 2;
                        lnikTextSpr.y = 0;
                        // 此linkSpr定义的方向与包含它的linkGroup的方向相反，所以此linkSpr种的文字也要反向绘制
                        if (linkSpr.data.from !== linkGroup.params.from) {
                            lnikTextSpr.data.isReverse = true; // 为反向显示的linkSpr打标识
                            lnikTextSpr.rotation = 180;
                        }
                        // 目标节点在第二、第三象限，文字需要反转，否则连线中的文字倒着显示不方便看
                        if ((linkGroupAngle > 90 && linkGroupAngle < 180) || (linkGroupAngle <= -90 && linkGroupAngle >= -180)) {
                            if (lnikTextSpr.data.isReverse === true) {
                                lnikTextSpr.rotation = 0;
                            }
                            else {
                                lnikTextSpr.rotation = 180;
                            }
                        }
                        else {
                            //不需要反转
                            if (lnikTextSpr.data.isReverse === true) {
                                lnikTextSpr.rotation = 180;
                            }
                            else {
                                lnikTextSpr.rotation = 0;
                            }
                        }
                    }
                }
            });
        }
    }
}
let canvas = document.getElementById('canvas');
new topologyApplication(new sprite2DApplication_1.Sprite2DApplication(canvas, true));


/***/ }),

/***/ "./ts/src/application.ts":
/*!*******************************!*\
  !*** ./ts/src/application.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas2DApplication = exports.Application = exports.CanvasKeyBoardEvent = exports.CanvasMouseEvent = exports.CanvasInputEvent = exports.EInputEventType = void 0;
const math2d_1 = __webpack_require__(/*! ./math2d */ "./ts/src/math2d.ts");
var EInputEventType;
(function (EInputEventType) {
    EInputEventType[EInputEventType["MOUSEEVENT"] = 0] = "MOUSEEVENT";
    EInputEventType[EInputEventType["MOUSEDOWN"] = 1] = "MOUSEDOWN";
    EInputEventType[EInputEventType["MOUSEUP"] = 2] = "MOUSEUP";
    EInputEventType[EInputEventType["MOUSEMOVE"] = 3] = "MOUSEMOVE";
    EInputEventType[EInputEventType["MOUSEDRAG"] = 4] = "MOUSEDRAG";
    EInputEventType[EInputEventType["KEYBOARDEVENT"] = 5] = "KEYBOARDEVENT";
    EInputEventType[EInputEventType["KEYUP"] = 6] = "KEYUP";
    EInputEventType[EInputEventType["KEYDOWN"] = 7] = "KEYDOWN";
    EInputEventType[EInputEventType["KEYPRESS"] = 8] = "KEYPRESS";
})(EInputEventType = exports.EInputEventType || (exports.EInputEventType = {}));
;
class CanvasInputEvent {
    constructor(type, altKey = false, ctrlKey = false, shiftKey = false) {
        this.altKey = altKey;
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
        this.type = type;
    }
}
exports.CanvasInputEvent = CanvasInputEvent;
class Timer {
    constructor(callback) {
        this.id = -1;
        this.enabled = false;
        this.callbackData = undefined;
        this.countdown = 0;
        this.timeout = 0;
        this.onlyOnce = false;
        this.callback = callback;
    }
}
class CanvasMouseEvent extends CanvasInputEvent {
    constructor(type, canvasPos, button, altKey = false, ctrlKey = false, shiftKey = false) {
        super(type, altKey, ctrlKey, shiftKey);
        this.canvasPosition = canvasPos;
        this.button = button;
        this.hasLocalPosition = false;
        this.localPosition = math2d_1.vec2.create();
    }
}
exports.CanvasMouseEvent = CanvasMouseEvent;
class CanvasKeyBoardEvent extends CanvasInputEvent {
    constructor(type, key, keyCode, repeat, altKey = false, ctrlKey = false, shiftKey = false) {
        super(type, altKey, ctrlKey, shiftKey);
        this.key = key;
        this.keyCode = keyCode;
        this.repeat = repeat;
    }
}
exports.CanvasKeyBoardEvent = CanvasKeyBoardEvent;
class Application {
    constructor(canvas) {
        this.timers = [];
        this._timeId = -1;
        this._fps = 0;
        this._start = false;
        this._requestId = -1;
        this.canvas = canvas;
        this.canvas.addEventListener("mousedown", this, false);
        this.canvas.addEventListener("mouseup", this, false);
        this.canvas.addEventListener("mousemove", this, false);
        window.addEventListener("keydown", this, false);
        window.addEventListener("keyup", this, false);
        window.addEventListener("keypress", this, false);
        this._isMouseDown = false;
        this.isSupportMouseMove = false;
    }
    isRunning() {
        return this._start;
    }
    get fps() {
        return this._fps;
    }
    start() {
        if (!this._start) {
            this._start = true;
            this._lastTime = -1;
            this._startTime = -1;
            this._requestId = requestAnimationFrame((msec) => {
                this.step(msec);
            });
        }
    }
    step(timeStamp) {
        if (this._startTime === -1)
            this._startTime = timeStamp;
        if (this._lastTime === -1)
            this._lastTime = timeStamp;
        let elapsedMsec = timeStamp - this._startTime;
        let intervalSec = (timeStamp - this._lastTime);
        if (intervalSec !== 0) {
            this._fps = 1000.0 / intervalSec;
        }
        intervalSec /= 1000.0;
        this._lastTime = timeStamp;
        this._handleTimers(intervalSec);
        this.update(elapsedMsec, intervalSec);
        this.render();
        requestAnimationFrame((elapsedMsec) => {
            this.step(elapsedMsec);
        });
    }
    stop() {
        if (this._start) {
            cancelAnimationFrame(this._requestId);
            this._lastTime = -1;
            this._startTime = -1;
            this._start = false;
        }
    }
    update(elapsedMsec, intervalSec) { }
    render() { }
    handleEvent(evt) {
        switch (evt.type) {
            case "mousedown":
                this._isMouseDown = true;
                this.dispatchMouseDown(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDOWN));
                break;
            case "mouseup":
                this._isMouseDown = false;
                this.dispatchMouseUp(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEUP));
                break;
            case "mousemove":
                if (this.isSupportMouseMove) {
                    this.dispatchMouseMove(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEMOVE));
                }
                if (this._isMouseDown) {
                    this.dispatchMouseDrag(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDRAG));
                }
                break;
            case "keypress":
                this.dispatchKeyPress(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYPRESS));
                break;
            case "keydown":
                this.dispatchKeyDown(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYDOWN));
                break;
            case "keyup":
                this.dispatchKeyUp(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYUP));
                break;
        }
    }
    dispatchMouseDown(evt) {
        return;
    }
    dispatchMouseUp(evt) {
        return;
    }
    dispatchMouseMove(evt) {
        return;
    }
    dispatchMouseDrag(evt) {
        return;
    }
    dispatchKeyDown(evt) {
        return;
    }
    dispatchKeyUp(evt) {
        return;
    }
    dispatchKeyPress(evt) {
        return;
    }
    _viewportToCanvasCoordinate(evt) {
        if (this.canvas) {
            let rect = this.canvas.getBoundingClientRect();
            if (evt.type === "mousedown") {
                //console . log (" boundingClientRect : " + JSON . stringify ( rect ) ) ;
                //console . log ( " clientX : " + evt . clientX + " clientY : " + evt.clientY ) ;
            }
            if (evt.target) {
                let borderLeftWidth = 0;
                let borderTopWidth = 0;
                let paddingLeft = 0;
                let paddingTop = 0;
                let decl = window.getComputedStyle(evt.target);
                let strNumber = decl.borderLeftWidth;
                if (strNumber !== null) {
                    borderLeftWidth = parseInt(strNumber, 10);
                }
                if (strNumber !== null) {
                    borderTopWidth = parseInt(strNumber, 10);
                }
                strNumber = decl.paddingLeft;
                if (strNumber !== null) {
                    paddingLeft = parseInt(strNumber, 10);
                }
                strNumber = decl.paddingTop;
                if (strNumber !== null) {
                    paddingTop = parseInt(strNumber, 10);
                }
                let x = evt.clientX - rect.left - borderLeftWidth - paddingLeft;
                let y = evt.clientY - rect.top - borderTopWidth - paddingTop;
                let pos = math2d_1.vec2.create(x, y);
                if (evt.type === "mousedown") {
                    //console . log ( " borderLeftWidth : " + borderLeftWidth + " borderTopWidth : " + borderTopWidth ) ;
                    //console . log ( " paddingLeft : " + paddingLeft + " paddingTop : " + paddingTop ) ;
                    //console . log ( " 变换后的canvasPosition : " + pos . toString( ) ) ;
                }
                return pos;
            }
            alert("canvas为null");
            throw new Error("canvas为null");
        }
        alert("evt . target为null");
        throw new Error("evt . target为null");
    }
    _toCanvasMouseEvent(evt, type) {
        let event = evt;
        let mousePosition = this._viewportToCanvasCoordinate(event);
        let canvasMouseEvent = new CanvasMouseEvent(type, mousePosition, event.button, event.altKey, event.ctrlKey, event.shiftKey);
        return canvasMouseEvent;
    }
    _toCanvasKeyBoardEvent(evt, type) {
        let event = evt;
        let canvasKeyboardEvent = new CanvasKeyBoardEvent(type, event.key, event.keyCode, event.repeat, event.altKey, event.ctrlKey, event.shiftKey);
        return canvasKeyboardEvent;
    }
    addTimer(callback, timeout = 1.0, onlyOnce = false, data = undefined) {
        let timer;
        let found = false;
        for (let i = 0; i < this.timers.length; i++) {
            let timer = this.timers[i];
            if (timer.enabled === false) {
                timer.callback = callback;
                timer.callbackData = data;
                timer.timeout = timeout;
                timer.countdown = timeout;
                timer.enabled = true;
                timer.onlyOnce = onlyOnce;
                return timer.id;
            }
        }
        timer = new Timer(callback);
        timer.callbackData = data;
        timer.timeout = timeout;
        timer.countdown = timeout;
        timer.enabled = true;
        timer.id = ++this._timeId;
        timer.onlyOnce = onlyOnce;
        this.timers.push(timer);
        return timer.id;
    }
    removeTimer(id) {
        let found = false;
        for (let i = 0; i < this.timers.length; i++) {
            if (this.timers[i].id === id) {
                let timer = this.timers[i];
                timer.enabled = false;
                found = true;
                break;
            }
        }
        return found;
    }
    _handleTimers(intervalSec) {
        for (let i = 0; i < this.timers.length; i++) {
            let timer = this.timers[i];
            if (timer.enabled === false) {
                continue;
            }
            timer.countdown -= intervalSec;
            if (timer.countdown < 0.0) {
                timer.callback(timer.id, timer.callbackData);
                if (timer.onlyOnce === false) {
                    timer.countdown = timer.timeout;
                }
                else {
                    this.removeTimer(timer.id);
                }
            }
        }
    }
}
exports.Application = Application;
class Canvas2DApplication extends Application {
    constructor(canvas) {
        super(canvas);
        this.context2D = this.canvas.getContext("2d");
    }
}
exports.Canvas2DApplication = Canvas2DApplication;
// export class WebGLApplication extends Application {
//     public context3D: WebGLRenderingContext | null;
//     public constructor(canvas: HTMLCanvasElement, contextAttributes?: WebGLContextAttributes) {
//         super(canvas);
//         this.context3D = this.canvas.getContext("webgl", contextAttributes);
//         if (this.context3D === null) {
//             this.context3D = this.canvas.getContext("experimental-webgl", contextAttributes);
//             if (this.context3D === null) {
//                 alert(" 无法创建WebGLRenderingContext上下文对象 ");
//                 throw new Error(" 无法创建WebGLRenderingContext上下文对象 ");
//             }
//         }
//     }
// }


/***/ }),

/***/ "./ts/src/math2d.ts":
/*!**************************!*\
  !*** ./ts/src/math2d.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadraticBezierEnumerator = exports.BezierEnumerator = exports.Transform2D = exports.Inset = exports.Rectangle = exports.Size = exports.Math2D = exports.MatrixStack = exports.mat2d = exports.vec3 = exports.vec2 = void 0;
const EPSILON = 0.00001;
const PiBy180 = 0.017453292519943295;
class vec2 {
    constructor(x = 0, y = 0) {
        this.values = new Float32Array([x, y]);
    }
    toString() {
        return " [ " + this.values[0] + " , " + this.values[1] + " ] ";
    }
    get x() { return this.values[0]; }
    set x(x) { this.values[0] = x; }
    get y() { return this.values[1]; }
    set y(y) { this.values[1] = y; }
    reset(x = 0, y) {
        this.values[0] = x;
        this.values[1] = y;
        return this;
    }
    equals(vector) {
        if (Math.abs(this.values[0] - vector.values[0]) > EPSILON)
            return false;
        if (Math.abs(this.values[1] - vector.values[1]) > EPSILON)
            return false;
        return true;
    }
    negative() {
        this.values[0] = -this.values[0];
        this.values[1] = -this.values[1];
        return this;
    }
    get squaredLength() {
        let x = this.values[0];
        let y = this.values[1];
        return (x * x + y * y);
    }
    get length() {
        return Math.sqrt(this.squaredLength);
    }
    normalize() {
        let len = this.length;
        if (Math2D.isEquals(len, 0)) {
            console.log(" the length = 0 ");
            this.values[0] = 0;
            this.values[1] = 0;
            return 0;
        }
        if (Math2D.isEquals(len, 1)) {
            console.log(" the length = 1 ");
            return 1.0;
        }
        this.values[0] /= len;
        this.values[1] /= len;
        return len;
    }
    static create(x = 0, y = 0) {
        return new vec2(x, y);
    }
    add(right) {
        vec2.sum(this, right, this);
        return this;
    }
    static sum(left, right, result = null) {
        if (result === null)
            result = new vec2();
        result.values[0] = left.values[0] + right.values[0];
        result.values[1] = left.values[1] + right.values[1];
        return result;
    }
    substract(another) {
        vec2.difference(this, another, this);
        return this;
    }
    static difference(end, start, result = null) {
        if (result === null)
            result = new vec2();
        result.values[0] = end.values[0] - start.values[0];
        result.values[1] = end.values[1] - start.values[1];
        return result;
    }
    static copy(src, result = null) {
        if (result === null)
            result = new vec2();
        result.values[0] = src.values[0];
        result.values[1] = src.values[1];
        return result;
    }
    static scale(direction, scalar, result = null) {
        if (result === null)
            result = new vec2();
        result.values[0] = direction.values[0] * scalar;
        result.values[1] = direction.values[1] * scalar;
        return result;
    }
    static scaleAdd(start, direction, scalar, result = null) {
        if (result === null)
            result = new vec2();
        vec2.scale(direction, scalar, result);
        return vec2.sum(start, result, result);
    }
    static moveTowards(start, direction, scalar, result = null) {
        if (result === null)
            result = new vec2();
        vec2.scale(direction, scalar, result);
        return vec2.sum(start, result, result);
    }
    innerProduct(right) {
        return vec2.dotProduct(this, right);
    }
    static dotProduct(left, right) {
        return left.values[0] * right.values[0] + left.values[1] * right.values[1];
    }
    static crossProduct(left, right) {
        return left.x * right.y - left.y * right.x;
    }
    static getOrientation(from, to, isRadian = false) {
        let diff = vec2.difference(to, from);
        let radian = Math.atan2(diff.y, diff.x);
        if (isRadian === false) {
            radian = Math2D.toDegree(radian);
        }
        return radian;
    }
    static getAngle(a, b, isRadian = false) {
        let dot = vec2.dotProduct(a, b);
        let radian = Math.acos(dot / (a.length * b.length));
        if (isRadian === false) {
            radian = Math2D.toDegree(radian);
        }
        return radian;
    }
    static cosAngle(a, b, norm = false) {
        if (norm === true) {
            a.normalize();
            b.normalize();
        }
        return vec2.dotProduct(a, b);
    }
    static sinAngle(a, b, norm = false) {
        if (norm === true) {
            a.normalize();
            b.normalize();
        }
        return (a.x * b.y - b.x * a.y);
    }
}
exports.vec2 = vec2;
vec2.zero = new vec2(0, 0);
vec2.xAxis = new vec2(1, 0);
vec2.yAxis = new vec2(0, 1);
vec2.nXAxis = new vec2(-1, 0);
vec2.nYAxis = new vec2(0, -1);
vec2.temp = new vec2(0, 0);
vec2.temp1 = new vec2(0, 0);
class vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.values = new Float32Array([x, y, z]);
    }
    get x() { return this.values[0]; }
    set x(x) { this.values[0] = x; }
    get y() { return this.values[1]; }
    set y(y) { this.values[1] = y; }
    get z() { return this.values[2]; }
    set z(z) { this.values[2] = z; }
    static cross(v1, v2, out = null) {
        if (out === null)
            out = new vec3();
        out.x = v1.y * v2.z - v1.z * v2.y;
        out.y = v1.z * v2.x - v1.x * v2.z;
        out.z = v1.x * v2.y - v1.y * v2.x;
        return out;
    }
    toString() {
        return " [ " + this.values[0] + " , " + this.values[1] + " , " + this.values[2] + " ] ";
    }
}
exports.vec3 = vec3;
class mat2d {
    constructor(a = 1, b = 0, c = 0, d = 1, x = 0, y = 0) {
        this.values = new Float32Array([a, b, c, d, x, y]);
    }
    identity() {
        this.values[0] = 1.0;
        this.values[1] = 0.0;
        this.values[2] = 0.0;
        this.values[3] = 1.0;
        this.values[4] = 0.0;
        this.values[5] = 0.0;
    }
    static create(a = 1, b = 0, c = 0, d = 1, x = 0, y = 0) {
        return new mat2d(a, b, c, d, x, y);
    }
    get xAxis() {
        return vec2.create(this.values[0], this.values[1]);
    }
    get yAxis() {
        return vec2.create(this.values[2], this.values[3]);
    }
    get origin() {
        return vec2.create(this.values[4], this.values[5]);
    }
    getAngle(isRadian = false) {
        let angle = Math.atan2(this.values[1], this.values[0]);
        if (isRadian) {
            return angle;
        }
        return angle / PiBy180;
    }
    static copy(src, result = null) {
        if (result === null)
            result = new mat2d();
        result.values[0] = src.values[0];
        result.values[1] = src.values[1];
        result.values[2] = src.values[2];
        result.values[3] = src.values[3];
        result.values[4] = src.values[4];
        result.values[5] = src.values[5];
        return result;
    }
    static multiply(left, right, result = null) {
        if (result === null)
            result = new mat2d();
        let a0 = left.values[0];
        let a1 = left.values[1];
        let a2 = left.values[2];
        let a3 = left.values[3];
        let a4 = left.values[4];
        let a5 = left.values[5];
        let b0 = right.values[0];
        let b1 = right.values[1];
        let b2 = right.values[2];
        let b3 = right.values[3];
        let b4 = right.values[4];
        let b5 = right.values[5];
        result.values[0] = a0 * b0 + a2 * b1;
        result.values[1] = a1 * b0 + a3 * b1;
        result.values[2] = a0 * b2 + a2 * b3;
        result.values[3] = a1 * b2 + a3 * b3;
        result.values[4] = a0 * b4 + a2 * b5 + a4;
        result.values[5] = a1 * b4 + a3 * b5 + a5;
        return result;
    }
    static determinant(mat) {
        return mat.values[0] * mat.values[3] - mat.values[2] * mat.values[1];
    }
    static invert(src, result) {
        let det = mat2d.determinant(src);
        if (Math2D.isEquals(det, 0)) {
            return false;
        }
        det = 1.0 / det;
        result.values[0] = src.values[3] * det;
        result.values[1] = -src.values[1] * det;
        result.values[2] = -src.values[2] * det;
        result.values[3] = src.values[0] * det;
        result.values[4] = (src.values[2] * src.values[5] - src.values[3] * src.values[4]) * det;
        result.values[5] = (src.values[1] * src.values[4] - src.values[0] * src.values[5]) * det;
        return true;
    }
    static makeRotation(radians, result = null) {
        if (result === null)
            result = new mat2d();
        let s = Math.sin(radians), c = Math.cos(radians);
        result.values[0] = c;
        result.values[1] = s;
        result.values[2] = -s;
        result.values[3] = c;
        result.values[4] = 0;
        result.values[5] = 0;
        return result;
    }
    onlyRotationMatrixInvert() {
        let s = this.values[1];
        this.values[1] = this.values[2];
        this.values[2] = s;
        return this;
    }
    static makeRotationFromVectors(v1, v2, norm = false, result = null) {
        if (result === null)
            result = new mat2d();
        result.values[0] = vec2.cosAngle(v1, v2, norm);
        result.values[1] = vec2.sinAngle(v1, v2, norm);
        result.values[2] = -vec2.sinAngle(v1, v2, norm);
        result.values[3] = vec2.cosAngle(v1, v2, norm);
        result.values[4] = 0;
        result.values[5] = 0;
        return result;
    }
    static makeReflection(axis, result = null) {
        if (result === null)
            result = new mat2d();
        result.values[0] = 1 - 2 * axis.x * axis.x;
        result.values[1] = -2 * axis.x * axis.y;
        result.values[2] = -2 * axis.x * axis.y;
        result.values[3] = 1 - 2 * axis.y * axis.y;
        result.values[4] = 0;
        result.values[5] = 0;
        return result;
    }
    static makeXSkew(sx, result = null) {
        if (result === null)
            result = new mat2d();
        result.values[0] = 1;
        result.values[1] = 0;
        result.values[2] = sx;
        result.values[3] = 1;
        result.values[4] = 0;
        result.values[5] = 0;
        return result;
    }
    static makeYSkew(sy, result = null) {
        if (result === null)
            result = new mat2d();
        result.values[0] = 1;
        result.values[1] = sy;
        result.values[2] = 0;
        result.values[3] = 1;
        result.values[4] = 0;
        result.values[5] = 0;
        return result;
    }
    static makeTranslation(tx, ty, result = null) {
        if (result === null)
            result = new mat2d();
        result.values[0] = 1;
        result.values[1] = 0;
        result.values[2] = 0;
        result.values[3] = 1;
        result.values[4] = tx;
        result.values[5] = ty;
        return result;
    }
    static makeScale(sx, sy, result = null) {
        if (Math2D.isEquals(sx, 0) || Math2D.isEquals(sy, 0)) {
            alert(" x轴或y轴缩放系数为0 ");
            throw new Error(" x轴或y轴缩放系数为0 ");
        }
        if (result === null)
            result = new mat2d();
        result.values[0] = sx;
        result.values[1] = 0;
        result.values[2] = 0;
        result.values[3] = sy;
        result.values[4] = 0;
        result.values[5] = 0;
        return result;
    }
}
exports.mat2d = mat2d;
mat2d.temp1 = mat2d.create();
mat2d.temp2 = mat2d.create();
mat2d.quadBezierBasicMatrix = mat2d.create(1, -2, -2, 2, 1, 0);
class MatrixStack {
    constructor() {
        this._mats = [];
        this._mats.push(new mat2d());
    }
    get matrix() {
        if (this._mats.length === 0) {
            alert(" 矩阵堆栈为空 ");
            throw new Error(" 矩阵堆栈为空 ");
        }
        return this._mats[this._mats.length - 1];
    }
    pushMatrix() {
        let mat = mat2d.copy(this.matrix);
        this._mats.push(mat);
    }
    popMatrix() {
        if (this._mats.length === 0) {
            alert(" 矩阵堆栈为空 ");
            return;
        }
        this._mats.pop();
    }
    loadIdentity() {
        this.matrix.identity();
    }
    loadMatrix(mat) {
        mat2d.copy(mat, this.matrix);
    }
    multMatrix(mat) {
        mat2d.multiply(this.matrix, mat, this.matrix);
    }
    translate(x = 0, y = 0) {
        let mat = mat2d.makeTranslation(x, y);
        this.multMatrix(mat);
    }
    rotate(degree = 0, isRadian = false) {
        if (isRadian === false) {
            degree = Math2D.toRadian(degree);
        }
        let mat = mat2d.makeRotation(degree);
        this.multMatrix(mat);
    }
    rotateFrom(v1, v2, norm = false) {
        let mat = mat2d.makeRotationFromVectors(v1, v2, norm);
        this.multMatrix(mat);
    }
    scale(x = 1.0, y = 1.0) {
        let mat = mat2d.makeScale(x, y);
        this.multMatrix(mat);
    }
    invert() {
        let ret = new mat2d();
        if (mat2d.invert(this.matrix, ret) === false) {
            alert(" 堆栈顶部矩阵为奇异矩阵，无法求逆 ");
            throw new Error(" 堆栈顶部矩阵为奇异矩阵，无法求逆 ");
        }
        return ret;
    }
}
exports.MatrixStack = MatrixStack;
class Math2D {
    static toRadian(degree) {
        return degree * PiBy180;
    }
    static toDegree(radian) {
        return radian / PiBy180;
    }
    static random(from, to) {
        return Math.random() * to + from;
    }
    static angleSubtract(from, to) {
        let diff = to - from;
        while (diff > 180) {
            diff -= 360;
        }
        while (diff < -180) {
            diff += 360;
        }
        return diff;
    }
    static isEquals(left, right, espilon = EPSILON) {
        if (Math.abs(left - right) >= EPSILON) {
            return false;
        }
        return true;
    }
    static getQuadraticBezierPosition(start, ctrl, end, t) {
        if (t < 0.0 || t > 1.0) {
            alert(" t的取值范围必须为[ 0 , 1 ] ");
            throw new Error(" t的取值范围必须为[ 0 , 1 ] ");
        }
        let t1 = 1.0 - t;
        let t2 = t1 * t1;
        return t2 * start + 2.0 * t * t1 * ctrl + t * t * end;
    }
    static getQuadraticBezierVector(start, ctrl, end, t, result = null) {
        if (result === null)
            result = vec2.create();
        result.x = Math2D.getQuadraticBezierPosition(start.x, ctrl.x, end.x, t);
        result.y = Math2D.getQuadraticBezierPosition(start.y, ctrl.y, end.y, t);
        return result;
    }
    static getQuadraticBezierMat(start, ctrl, end, t, result = null) {
        if (result === null)
            result = vec2.create();
        return result;
    }
    static getCubicBezierPosition(start, ctrl0, ctrl1, end, t) {
        if (t < 0.0 || t > 1.0) {
            alert(" t的取值范围必须为[ 0 , 1 ] ");
            throw new Error(" t的取值范围必须为[ 0 , 1 ] ");
        }
        let t1 = (1.0 - t);
        let t2 = t * t;
        let t3 = t2 * t;
        return (t1 * t1 * t1) * start + 3 * t * (t1 * t1) * ctrl0 + (3 * t2 * t1) * ctrl1 + t3 * end;
    }
    static getCubicBezierVector(start, ctrl0, ctrl1, end, t, result = null) {
        if (result === null)
            result = vec2.create();
        result.x = Math2D.getCubicBezierPosition(start.x, ctrl0.x, ctrl1.x, end.x, t);
        result.y = Math2D.getCubicBezierPosition(start.y, ctrl0.y, ctrl1.y, end.y, t);
        return result;
    }
    static createQuadraticBezierEnumerator(start, ctrl, end, steps = 30) {
        return new BezierEnumerator(start, end, ctrl, null, steps);
    }
    static createCubicBezierEnumerator(start, ctrl0, ctrl1, end, steps = 30) {
        return new BezierEnumerator(start, end, ctrl0, ctrl1, steps);
    }
    static projectPointOnLineSegment(pt, start, end, closePoint) {
        let v0 = vec2.create();
        let v1 = vec2.create();
        let d = 0;
        vec2.difference(pt, start, v0);
        vec2.difference(end, start, v1);
        d = v1.normalize();
        let t = vec2.dotProduct(v0, v1);
        if (t < 0) {
            closePoint.x = start.x;
            closePoint.y = start.y;
            return false;
        }
        else if (t > d) {
            closePoint.x = end.x;
            closePoint.y = end.y;
            return false;
        }
        else {
            vec2.scaleAdd(start, v1, t, closePoint);
            return true;
        }
    }
    static isPointOnLineSegment(pt, start, end, radius = 2) {
        let closePt = vec2.create();
        if (Math2D.projectPointOnLineSegment(pt, start, end, closePt) === false) {
            return false;
        }
        return Math2D.isPointInCircle(pt, closePt, radius);
    }
    static isPointInCircle(pt, center, radius) {
        let diff = vec2.difference(pt, center);
        let len2 = diff.squaredLength;
        if (len2 <= radius * radius) {
            return true;
        }
        return false;
    }
    static isPointInRect(ptX, ptY, x, y, w, h) {
        if (ptX >= x && ptX <= x + w && ptY >= y && ptY <= y + h) {
            return true;
        }
        return false;
    }
    static isPointInEllipse(ptX, ptY, centerX, centerY, radiusX, radiusY) {
        let diffX = ptX - centerX;
        let diffY = ptY - centerY;
        let n = (diffX * diffX) / (radiusX * radiusX) + (diffY * diffY) / (radiusY * radiusY);
        return n <= 1.0;
    }
    static sign(v0, v1, v2) {
        let e1 = vec2.difference(v0, v2);
        let e2 = vec2.difference(v1, v2);
        return vec2.crossProduct(e1, e2);
    }
    static isPointInTriangle(pt, v0, v1, v2) {
        let b1 = Math2D.sign(v0, v1, pt) < 0.0;
        let b2 = Math2D.sign(v1, v2, pt) < 0.0;
        let b3 = Math2D.sign(v2, v0, pt) < 0.0;
        return ((b1 === b2) && (b2 === b3));
    }
    static isPointInPolygon(pt, points) {
        if (points.length < 3) {
            return false;
        }
        for (let i = 2; i < points.length; i++) {
            if (Math2D.isPointInTriangle(pt, points[0], points[i - 1], points[i])) {
                return true;
            }
        }
        return false;
    }
    static isConvex(points) {
        let sign = Math2D.sign(points[0], points[1], points[2]) < 0;
        let j, k;
        for (let i = 1; i < points.length; i++) {
            j = (i + 1) % points.length;
            k = (i + 2) % points.length;
            if (sign !== Math2D.sign(points[i], points[j], points[k]) < 0) {
                return false;
            }
        }
        return true;
    }
    static transform(mat, pt, result = null) {
        if (result === null)
            result = vec2.create();
        result.values[0] = mat.values[0] * pt.values[0] + mat.values[2] * pt.values[1] + mat.values[4];
        result.values[1] = mat.values[1] * pt.values[0] + mat.values[3] * pt.values[1] + mat.values[5];
        return result;
    }
}
exports.Math2D = Math2D;
Math2D.matStack = new MatrixStack();
class Size {
    constructor(w = 1, h = 1) {
        this.values = new Float32Array([w, h]);
    }
    set width(value) { this.values[0] = value; }
    get width() { return this.values[0]; }
    set height(value) { this.values[1] = value; }
    get height() { return this.values[1]; }
    static create(w = 1, h = 1) {
        return new Size(w, h);
    }
}
exports.Size = Size;
class Rectangle {
    constructor(orign = new vec2(), size = new Size(1, 1)) {
        this.origin = orign;
        this.size = size;
    }
    isEmpty() {
        let area = this.size.width * this.size.height;
        if (Math2D.isEquals(area, 0) === true) {
            return true;
        }
        else {
            return false;
        }
    }
    static create(x = 0, y = 0, w = 1, h = 1) {
        let origin = new vec2(x, y);
        let size = new Size(w, h);
        return new Rectangle(origin, size);
    }
}
exports.Rectangle = Rectangle;
class Inset {
    constructor(l = 0, t = 0, r = 0, b = 0) {
        this.values = new Float32Array([l, t, r, b]);
    }
    get leftMargin() {
        return this.values[0];
    }
    set leftMargin(value) {
        this.values[0] = value;
    }
    get topMargin() {
        return this.values[1];
    }
    set topMargin(value) {
        this.values[1] = value;
    }
    get rightMargin() {
        return this.values[2];
    }
    set rightMargin(value) {
        this.values[2] = value;
    }
    get bottomMargin() {
        return this.values[3];
    }
    set bottomMargin(value) {
        this.values[3] = value;
    }
}
exports.Inset = Inset;
class Transform2D {
    constructor(x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) {
        this.position = new vec2(x, y);
        this.rotation = rotation;
        this.scale = new vec2(scaleX, scaleY);
    }
    toMatrix() {
        Math2D.matStack.loadIdentity();
        Math2D.matStack.translate(this.position.x, this.position.y);
        Math2D.matStack.rotate(this.rotation, false);
        Math2D.matStack.scale(this.scale.x, this.scale.y);
        return Math2D.matStack.matrix;
    }
    toInvMatrix(result) {
        let mat = this.toMatrix();
        return mat2d.invert(mat, result);
    }
}
exports.Transform2D = Transform2D;
class BezierEnumerator {
    constructor(start, end, control0, control1 = null, steps = 30) {
        this._startAnchorPoint = start;
        this._endAnchorPoint = end;
        this._controlPoint0 = control0;
        if (control1 !== null) {
            this._controlPoint1 = control1;
        }
        else {
            this._controlPoint1 = null;
        }
        this._steps = steps;
        this._i = 1.0 / (this._steps);
        this._currentIdx = -1;
    }
    reset() {
        this._currentIdx = -1;
    }
    get current() {
        if (this._controlPoint1 !== null) {
            return Math2D.getCubicBezierVector(this._startAnchorPoint, this._controlPoint0, this._controlPoint1, this._endAnchorPoint, this._currentIdx * this._i);
        }
        else {
            return Math2D.getQuadraticBezierVector(this._startAnchorPoint, this._controlPoint0, this._endAnchorPoint, this._currentIdx * this._i);
        }
    }
    moveNext() {
        this._currentIdx++;
        return this._currentIdx < this._steps;
    }
    get steps() {
        this._i = 1.0 / (this._steps);
        return this._steps;
    }
    set steps(steps) {
        this._steps = steps;
        this.reset();
    }
}
exports.BezierEnumerator = BezierEnumerator;
class QuadraticBezierEnumerator {
    constructor(start, end, control0, steps = 30) {
        this._startAnchorPoint = start;
        this._endAnchorPoint = end;
        this._controlPoint0 = control0;
        this._steps = steps;
        this._i = 1.0 / (this._steps);
        this._currentIdx = -1;
    }
    reset() {
        this._currentIdx = -1;
    }
    get current() {
        let t = this._currentIdx * this._i;
        let ret = vec2.create(t * t, t);
        Math2D.transform(mat2d.quadBezierBasicMatrix, ret, ret);
        ret.x = this._startAnchorPoint.x * ret.x + this._controlPoint0.x * ret.y + this._endAnchorPoint.x;
        ret.y = this._startAnchorPoint.y * ret.x + this._controlPoint0.y * ret.y + this._endAnchorPoint.y;
        return ret;
    }
    moveNext() {
        this._currentIdx++;
        return this._currentIdx < this._steps;
    }
    get steps() {
        this._i = 1.0 / (this._steps);
        return this._steps;
    }
    set steps(steps) {
        this._steps = steps;
        this.reset();
    }
}
exports.QuadraticBezierEnumerator = QuadraticBezierEnumerator;


/***/ }),

/***/ "./ts/src/spriteSystem/interface.ts":
/*!******************************************!*\
  !*** ./ts/src/spriteSystem/interface.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Scale9Data = exports.EImageFillType = exports.SpriteFactory = exports.EOrder = exports.ERenderType = void 0;
const shapes_1 = __webpack_require__(/*! ./shapes */ "./ts/src/spriteSystem/shapes.ts");
const sprite2d_1 = __webpack_require__(/*! ./sprite2d */ "./ts/src/spriteSystem/sprite2d.ts");
var ERenderType;
(function (ERenderType) {
    ERenderType[ERenderType["CUSTOM"] = 0] = "CUSTOM";
    ERenderType[ERenderType["STROKE"] = 1] = "STROKE";
    ERenderType[ERenderType["FILL"] = 2] = "FILL";
    ERenderType[ERenderType["STROKE_FILL"] = 3] = "STROKE_FILL";
    ERenderType[ERenderType["CLIP"] = 4] = "CLIP";
})(ERenderType = exports.ERenderType || (exports.ERenderType = {}));
var EOrder;
(function (EOrder) {
    EOrder[EOrder["PREORDER"] = 0] = "PREORDER";
    EOrder[EOrder["POSTORDER"] = 1] = "POSTORDER";
})(EOrder = exports.EOrder || (exports.EOrder = {}));
class SpriteFactory {
    static createGrid(w, h, xStep = 10, yStep = 10) {
        return new shapes_1.Grid(w, h, xStep, yStep);
    }
    static createCircle(radius) {
        return new shapes_1.Circle(radius);
    }
    static createRect(w, h, u = 0, v = 0) {
        return new shapes_1.Rect(w, h, u, v);
    }
    static createEllipse(radiusX, radiusY) {
        return new shapes_1.Ellipse(radiusX, radiusY);
    }
    static createPolygon(points) {
        if (points.length < 3) {
            throw new Error("多边形顶点数量必须大于或等于3!!!");
        }
        return new shapes_1.ConvexPolygon(points);
    }
    static createScale9Grid(data, width, height, u = 0, v = 0) {
        return new shapes_1.Scale9Grid(data, width, height, u, v);
    }
    static createLine(start, end) {
        let line = new shapes_1.Line();
        line.start = start;
        line.end = end;
        return line;
    }
    static createXLine(len = 10, t = 0) {
        return new shapes_1.Line(len, t);
    }
    static createBone(len = 10, t = 0) {
        return new shapes_1.Bone(len, t);
    }
    static createBezierPath(points, isCubic = false) {
        return new shapes_1.BezierPath(points, isCubic);
    }
    static createClipSprite() {
        let spr = new sprite2d_1.Sprite2D(SpriteFactory.endCLipShape, name);
        spr.renderType = ERenderType.CLIP;
        return spr;
    }
    static createSprite(shape, name = '') {
        let spr = new sprite2d_1.Sprite2D(shape, name);
        return spr;
    }
    static createISprite(shape, x = 0, y = 0, rotation = 0, scaleX = 1.0, scaleY = 1.0, name = ' ') {
        let spr = new sprite2d_1.Sprite2D(shape, name);
        spr.x = x;
        spr.y = y;
        spr.rotation = rotation;
        spr.scaleX = scaleX;
        spr.scaleY = scaleY;
        return spr;
    }
}
exports.SpriteFactory = SpriteFactory;
SpriteFactory.endCLipShape = new shapes_1.EndClipShape();
var EImageFillType;
(function (EImageFillType) {
    EImageFillType[EImageFillType["NONE"] = 0] = "NONE";
    EImageFillType[EImageFillType["STRETCH"] = 1] = "STRETCH";
    EImageFillType[EImageFillType["REPEAT"] = 2] = "REPEAT";
    EImageFillType[EImageFillType["REPEAT_X"] = 3] = "REPEAT_X";
    EImageFillType[EImageFillType["REPEAT_Y"] = 4] = "REPEAT_Y";
})(EImageFillType = exports.EImageFillType || (exports.EImageFillType = {}));
class Scale9Data {
    constructor(image, inset) {
        this.image = image;
        this._inset = inset;
    }
    set inset(value) {
        this._inset = value;
    }
    get leftMargin() {
        return this._inset.leftMargin;
    }
    get rightMargin() {
        return this._inset.rightMargin;
    }
    get topMargin() {
        return this._inset.topMargin;
    }
    get bottomMargin() {
        return this._inset.bottomMargin;
    }
}
exports.Scale9Data = Scale9Data;


/***/ }),

/***/ "./ts/src/spriteSystem/shapes.ts":
/*!***************************************!*\
  !*** ./ts/src/spriteSystem/shapes.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyShape = exports.EndClipShape = exports.Scale9Grid = exports.Bone = exports.Line = exports.BezierPath = exports.Grid = exports.Rect = exports.ConvexPolygon = exports.Ellipse = exports.Circle = exports.BaseShape2D = void 0;
const interface_1 = __webpack_require__(/*! ./interface */ "./ts/src/spriteSystem/interface.ts");
const math2d_1 = __webpack_require__(/*! ../math2d */ "./ts/src/math2d.ts");
class BaseShape2D {
    constructor() {
        this.axisXStyle = "rgba( 255 , 0 , 0 , 128 ) ";
        this.axisYStyle = "rgba( 0 , 255 , 0 , 128 ) ";
        this.axisLineWidth = 1;
        this.axisLength = 100;
        this.data = undefined;
    }
    drawLine(ctx, style, isAxisX = true) {
        ctx.save();
        ctx.strokeStyle = style;
        ctx.lineWidth = this.axisLineWidth;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        if (isAxisX) {
            ctx.lineTo(this.axisLength, 0);
        }
        else {
            ctx.lineTo(0, this.axisLength);
        }
        ctx.stroke();
        ctx.restore();
    }
    beginDraw(transformable, state, context) {
        context.save();
        context.lineWidth = state.lineWidth;
        context.strokeStyle = state.strokeStyle;
        context.fillStyle = state.fillStyle;
        let mat = transformable.getWorldMatrix();
        context.setTransform(mat.values[0], mat.values[1], mat.values[2], mat.values[3], mat.values[4], mat.values[5]);
    }
    draw(transformable, state, context) {
        if (state.renderType === interface_1.ERenderType.STROKE) {
            context.stroke();
        }
        else if (state.renderType === interface_1.ERenderType.FILL) {
            context.fill();
        }
        else if (state.renderType === interface_1.ERenderType.STROKE_FILL) {
            context.stroke();
            context.fill();
        }
        else if (state.renderType === interface_1.ERenderType.CLIP) {
            context.clip();
        }
    }
    endDraw(transformable, state, context) {
        if (state.renderType !== interface_1.ERenderType.CLIP) {
            if (state.showCoordSystem) {
                this.drawLine(context, this.axisXStyle, true);
                this.drawLine(context, this.axisYStyle, false);
            }
            context.restore();
        }
    }
}
exports.BaseShape2D = BaseShape2D;
class Circle extends BaseShape2D {
    constructor(radius = 1) {
        super();
        this.radius = radius;
    }
    hitTest(localPt, transform) {
        return math2d_1.Math2D.isPointInCircle(localPt, math2d_1.vec2.create(0, 0), this.radius);
    }
    draw(transformable, state, context) {
        context.beginPath();
        context.arc(0, 0, this.radius, 0.0, Math.PI * 2.0, true);
        super.draw(transformable, state, context);
    }
    get type() {
        return "Circle";
    }
}
exports.Circle = Circle;
class Ellipse extends BaseShape2D {
    constructor(radiusX = 10, radiusY = 10) {
        super();
        this.radiusX = radiusX;
        this.radiusY = radiusY;
    }
    hitTest(localPt, transform) {
        let isHitted = math2d_1.Math2D.isPointInEllipse(localPt.x, localPt.y, 0, 0, this.radiusX, this.radiusY);
        return isHitted;
    }
    draw(transform, state, context) {
        context.beginPath();
        context.ellipse(0, 0, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
        super.draw(transform, state, context);
    }
    get type() {
        return "Ellipse";
    }
}
exports.Ellipse = Ellipse;
class ConvexPolygon extends BaseShape2D {
    constructor(points) {
        if (points.length < 3) {
            alert("多边形顶点必须大于3或等于3!!");
            new Error("多边形顶点必须大于3或等于3!!");
        }
        if (math2d_1.Math2D.isConvex(points) === false) {
            alert("当前多边形不是凸多边形!!");
            new Error("当前多边形不是凸多边形!!");
        }
        super();
        this.points = points;
    }
    hitTest(localPt, transform) {
        return math2d_1.Math2D.isPointInPolygon(localPt, this.points);
    }
    draw(transformable, state, context) {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            context.lineTo(this.points[i].x, this.points[i].y);
        }
        context.closePath();
        super.draw(transformable, state, context);
    }
    get type() {
        return "Polygon";
    }
}
exports.ConvexPolygon = ConvexPolygon;
class Rect extends BaseShape2D {
    constructor(w = 1, h = 1, u = 0, v = 0) {
        super();
        this.width = w;
        this.height = h;
        this.x = -this.width * u;
        this.y = -this.height * v;
    }
    get right() {
        return this.x + this.width;
    }
    get bottom() {
        return this.y + this.height;
    }
    get type() {
        return "Rect";
    }
    hitTest(localPt, transform) {
        return math2d_1.Math2D.isPointInRect(localPt.x, localPt.y, this.x, this.y, this.width, this.height);
    }
    draw(transformable, state, context) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y);
        context.lineTo(this.x + this.width, this.y + this.height);
        context.lineTo(this.x, this.y + this.height);
        context.closePath();
        super.draw(transformable, state, context);
    }
}
exports.Rect = Rect;
class Grid extends Rect {
    constructor(w = 10, h = 10, xStep = 10, yStep = 10) {
        super(w, h, 0, 0);
        this.xStep = xStep;
        this.yStep = yStep;
    }
    draw(transformable, state, context) {
        state.renderType = interface_1.ERenderType.CUSTOM;
        context.fillRect(0, 0, this.width, this.height);
        context.beginPath();
        for (var i = this.xStep + 0.5; i < this.width; i += this.xStep) {
            context.moveTo(i, 0);
            context.lineTo(i, this.height);
        }
        context.stroke();
        context.beginPath();
        for (var i = this.yStep + 0.5; i < this.height; i += this.yStep) {
            context.moveTo(0, i);
            context.lineTo(this.width, i);
        }
        context.stroke();
    }
    get type() {
        return "Grid";
    }
}
exports.Grid = Grid;
class BezierPath extends BaseShape2D {
    constructor(points, isCubic = false) {
        super();
        this.points = points;
        this.isCubic = isCubic;
        this.data = points;
    }
    get type() {
        return "BezierPath";
    }
    hitTest(localPt, transform) { return false; }
    draw(transformable, state, context) {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        if (this.isCubic) {
            for (let i = 1; i < this.points.length; i += 3) {
                context.bezierCurveTo(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y, this.points[i + 2].x, this.points[i + 2].y);
            }
        }
        else {
            for (let i = 1; i < this.points.length; i += 2) {
                context.quadraticCurveTo(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y);
            }
        }
        super.draw(transformable, state, context);
    }
}
exports.BezierPath = BezierPath;
class Line {
    constructor(len = 10, t = 0) {
        if (t < 0.0 || t > 1.0) {
            alert("参数t必须处于 [ 0 , 1 ]之间!!");
            throw new Error("参数t必须处于 [ 0 , 1 ]之间!!");
        }
        this.start = math2d_1.vec2.create(-len * t, 0);
        this.end = math2d_1.vec2.create(len * (1.0 - t), 0);
        this.data = undefined;
    }
    hitTest(localPt, transform) {
        return math2d_1.Math2D.isPointOnLineSegment(localPt, this.start, this.end);
    }
    beginDraw(transformable, state, context) {
        context.save();
        context.lineWidth = state.lineWidth;
        context.strokeStyle = state.strokeStyle;
        let mat = transformable.getWorldMatrix();
        context.setTransform(mat.values[0], mat.values[1], mat.values[2], mat.values[3], mat.values[4], mat.values[5]);
    }
    draw(transformable, state, context) {
        state.renderType = interface_1.ERenderType.STROKE;
        context.beginPath();
        context.moveTo(this.start.x, this.start.y);
        context.lineTo(this.end.x, this.end.y);
        context.stroke();
    }
    endDraw(transformable, state, context) {
        context.restore();
    }
    get type() {
        return "Line";
    }
}
exports.Line = Line;
class Bone extends Line {
    get type() { return "Bone"; }
    draw(transformable, state, context) {
        super.draw(transformable, state, context);
        let mat = transformable.getWorldMatrix();
        context.save();
        context.setTransform(1, 0, 0, 1, mat.values[4], mat.values[5]);
        context.beginPath();
        context.fillStyle = 'blue';
        context.arc(this.start.x, this.start.y, 5, 0, Math.PI * 2);
        context.fill();
        context.restore();
    }
}
exports.Bone = Bone;
class Scale9Grid extends Rect {
    constructor(data, width, height, u, v) {
        super(width, height, u, v);
        this.data = data;
        this._calcDestRects();
    }
    get type() {
        return "Scale9Grid";
    }
    _calcDestRects() {
        this.destRects = [];
        this.srcRects = [];
        let rc;
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(0, 0);
        rc.size = math2d_1.Size.create(this.data.leftMargin, this.data.topMargin);
        this.srcRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.x, this.y);
        rc.size = math2d_1.Size.create(this.data.leftMargin, this.data.topMargin);
        this.destRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.data.image.width - this.data.rightMargin, 0);
        rc.size = math2d_1.Size.create(this.data.rightMargin, this.data.topMargin);
        this.srcRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.right - this.data.rightMargin, this.y);
        rc.size = math2d_1.Size.create(this.data.rightMargin, this.data.topMargin);
        this.destRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.data.image.width - this.data.rightMargin, this.data.image.height - this.data.bottomMargin);
        rc.size = math2d_1.Size.create(this.data.rightMargin, this.data.bottomMargin);
        this.srcRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.right - this.data.rightMargin, this.bottom - this.data.bottomMargin);
        rc.size = math2d_1.Size.create(this.data.rightMargin, this.data.bottomMargin);
        this.destRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(0, this.data.image.height - this.data.bottomMargin);
        rc.size = math2d_1.Size.create(this.data.leftMargin, this.data.bottomMargin);
        this.srcRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.x, this.bottom - this.data.bottomMargin);
        rc.size = math2d_1.Size.create(this.data.leftMargin, this.data.bottomMargin);
        this.destRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(0, this.data.topMargin);
        rc.size = math2d_1.Size.create(this.data.leftMargin, this.data.image.height - this.data.topMargin - this.data.bottomMargin);
        this.srcRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.x, this.y + this.data.topMargin);
        rc.size = math2d_1.Size.create(this.data.leftMargin, this.height - this.data.topMargin - this.data.bottomMargin);
        this.destRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.data.leftMargin, 0);
        rc.size = math2d_1.Size.create(this.data.image.width - this.data.leftMargin - this.data.rightMargin, this.data.topMargin);
        this.srcRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.x + this.data.leftMargin, this.y);
        rc.size = math2d_1.Size.create(this.width - this.data.leftMargin - this.data.rightMargin, this.data.topMargin);
        this.destRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.data.image.width - this.data.rightMargin, this.data.topMargin);
        rc.size = math2d_1.Size.create(this.data.rightMargin, this.data.image.height - this.data.topMargin - this.data.bottomMargin);
        this.srcRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.right - this.data.rightMargin, this.y + this.data.topMargin);
        rc.size = math2d_1.Size.create(this.data.rightMargin, this.height - this.data.topMargin - this.data.bottomMargin);
        this.destRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.data.leftMargin, this.data.image.height - this.data.bottomMargin);
        rc.size = math2d_1.Size.create(this.data.image.width - this.data.leftMargin - this.data.rightMargin, this.data.bottomMargin);
        this.srcRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.x + this.data.leftMargin, this.bottom - this.data.bottomMargin);
        rc.size = math2d_1.Size.create(this.width - this.data.leftMargin - this.data.rightMargin, this.data.bottomMargin);
        this.destRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.data.leftMargin, this.data.topMargin);
        rc.size = math2d_1.Size.create(this.data.image.width - this.data.leftMargin - this.data.rightMargin, this.data.image.height - this.data.topMargin - this.data.bottomMargin);
        this.srcRects.push(rc);
        rc = new math2d_1.Rectangle();
        rc.origin = math2d_1.vec2.create(this.x + this.data.leftMargin, this.y + this.data.topMargin);
        rc.size = math2d_1.Size.create(this.width - this.data.leftMargin - this.data.rightMargin, this.height - this.data.topMargin - this.data.bottomMargin);
        this.destRects.push(rc);
    }
    _drawImage(context, img, destRect, srcRect, fillType = interface_1.EImageFillType.STRETCH) {
        if (srcRect.isEmpty()) {
            return false;
        }
        if (destRect.isEmpty()) {
            return false;
        }
        if (fillType === interface_1.EImageFillType.STRETCH) {
            context.drawImage(img, srcRect.origin.x, srcRect.origin.y, srcRect.size.width, srcRect.size.height, destRect.origin.x, destRect.origin.y, destRect.size.width, destRect.size.height);
        }
        else {
            let rows = Math.ceil(destRect.size.width / srcRect.size.width);
            let colums = Math.ceil(destRect.size.height / srcRect.size.height);
            let left = 0;
            let top = 0;
            let right = 0;
            let bottom = 0;
            let width = 0;
            let height = 0;
            let destRight = destRect.origin.x + destRect.size.width;
            let destBottom = destRect.origin.y + destRect.size.height;
            if (fillType === interface_1.EImageFillType.REPEAT_X) {
                colums = 1;
            }
            else if (fillType === interface_1.EImageFillType.REPEAT_Y) {
                rows = 1;
            }
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < colums; j++) {
                    left = destRect.origin.x + i * srcRect.size.width;
                    top = destRect.origin.y + j * srcRect.size.height;
                    width = srcRect.size.width;
                    height = srcRect.size.height;
                    right = left + width;
                    bottom = top + height;
                    if (right > destRight) {
                        width = srcRect.size.width - (right - destRight);
                    }
                    if (bottom > destBottom) {
                        height = srcRect.size.height - (bottom - destBottom);
                    }
                    context.drawImage(img, srcRect.origin.x, srcRect.origin.y, width, height, left, top, width, height);
                }
            }
        }
        return true;
    }
    draw(transformable, state, context) {
        for (let i = 0; i < this.srcRects.length; i++) {
            this._drawImage(context, this.data.image, this.destRects[i], this.srcRects[i], interface_1.EImageFillType.STRETCH);
        }
    }
}
exports.Scale9Grid = Scale9Grid;
class EndClipShape {
    hitTest(localPt, transform) {
        return false;
    }
    beginDraw(transformable, state, context) {
    }
    draw(transformable, state, context) {
    }
    endDraw(transformable, state, context) {
        context.restore();
    }
    get type() {
        return "EndCLipShape";
    }
}
exports.EndClipShape = EndClipShape;
class EmptyShape {
    hitTest(localPt, transform) {
        return false;
    }
    beginDraw(transformable, state, context) {
    }
    draw(transformable, state, context) {
    }
    endDraw(transformable, state, context) {
    }
    get type() {
        return "EmptyShape";
    }
}
exports.EmptyShape = EmptyShape;
/*
export class Calendar extends BaseShape2D {

}
*/


/***/ }),

/***/ "./ts/src/spriteSystem/sprite2DApplication.ts":
/*!****************************************************!*\
  !*** ./ts/src/spriteSystem/sprite2DApplication.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite2DApplication = void 0;
const application_1 = __webpack_require__(/*! ../application */ "./ts/src/application.ts");
const sprite2dSystem_1 = __webpack_require__(/*! ./sprite2dSystem */ "./ts/src/spriteSystem/sprite2dSystem.ts");
const sprite2dHierarchicalSystem_1 = __webpack_require__(/*! ./sprite2dHierarchicalSystem */ "./ts/src/spriteSystem/sprite2dHierarchicalSystem.ts");
class Sprite2DApplication extends application_1.Canvas2DApplication {
    constructor(canvas, isHierarchical = true) {
        document.oncontextmenu = function () {
            return false;
        };
        super(canvas);
        if (isHierarchical === true) {
            this._dispatcher = new sprite2dHierarchicalSystem_1.SpriteNodeManager(canvas.width, canvas.height);
        }
        else {
            this._dispatcher = new sprite2dSystem_1.Sprite2DManager();
        }
    }
    get rootContainer() {
        return this._dispatcher.container;
    }
    update(msec, diff) {
        this._dispatcher.dispatchUpdate(msec, diff);
    }
    render() {
        if (this.context2D) {
            this.context2D.clearRect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height);
            this._dispatcher.dispatchDraw(this.context2D);
        }
    }
    dispatchMouseDown(evt) {
        super.dispatchMouseDown(evt);
        this._dispatcher.dispatchMouseEvent(evt);
    }
    dispatchMouseUp(evt) {
        super.dispatchMouseUp(evt);
        this._dispatcher.dispatchMouseEvent(evt);
    }
    dispatchMouseMove(evt) {
        super.dispatchMouseMove(evt);
        this._dispatcher.dispatchMouseEvent(evt);
    }
    dispatchMouseDrag(evt) {
        super.dispatchMouseDrag(evt);
        this._dispatcher.dispatchMouseEvent(evt);
    }
    dispatchKeyDown(evt) {
        super.dispatchKeyDown(evt);
        this._dispatcher.dispatchKeyEvent(evt);
    }
    dispatchKeyUp(evt) {
        super.dispatchKeyUp(evt);
        this._dispatcher.dispatchKeyEvent(evt);
    }
    dispatchKeyPress(evt) {
        super.dispatchKeyPress(evt);
        this._dispatcher.dispatchKeyEvent(evt);
    }
}
exports.Sprite2DApplication = Sprite2DApplication;


/***/ }),

/***/ "./ts/src/spriteSystem/sprite2d.ts":
/*!*****************************************!*\
  !*** ./ts/src/spriteSystem/sprite2d.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite2D = void 0;
const math2d_1 = __webpack_require__(/*! ../math2d */ "./ts/src/math2d.ts");
const interface_1 = __webpack_require__(/*! ./interface */ "./ts/src/spriteSystem/interface.ts");
const sprite2dHierarchicalSystem_1 = __webpack_require__(/*! ./sprite2dHierarchicalSystem */ "./ts/src/spriteSystem/sprite2dHierarchicalSystem.ts");
class Sprite2D {
    constructor(shape, name) {
        this.showCoordSystem = false;
        this.renderType = interface_1.ERenderType.FILL;
        this.isVisible = true;
        this.fillStyle = 'white';
        this.strokeStyle = 'black';
        this.lineWidth = 1;
        this.transform = new math2d_1.Transform2D();
        this.mouseEvent = null;
        this.keyEvent = null;
        this.updateEvent = null;
        this.renderEvent = null;
        this.name = name;
        this.shape = shape;
    }
    set x(x) {
        this.transform.position.x = x;
    }
    get x() {
        return this.transform.position.x;
    }
    set y(y) {
        this.transform.position.y = y;
    }
    get y() {
        return this.transform.position.y;
    }
    set rotation(rotation) {
        this.transform.rotation = rotation;
    }
    get rotation() {
        return this.transform.rotation;
    }
    set scaleX(s) {
        this.transform.scale.x = s;
    }
    get scaleX() {
        return this.transform.scale.x;
    }
    set scaleY(s) {
        this.transform.scale.y = s;
    }
    get scaleY() {
        return this.transform.scale.y;
    }
    getWorldMatrix() {
        if (this.owner instanceof sprite2dHierarchicalSystem_1.SpriteNode) {
            let arr = [];
            let curr = this.owner;
            while (curr !== undefined) {
                arr.push(curr);
                curr = curr.parent;
            }
            let out = math2d_1.mat2d.create();
            let currMat;
            for (let i = arr.length - 1; i >= 0; i--) {
                curr = arr[i];
                if (curr.data) {
                    currMat = curr.data.transform.toMatrix();
                    math2d_1.mat2d.multiply(out, currMat, out);
                }
            }
            return out;
        }
        else {
            return this.transform.toMatrix();
        }
    }
    getLocalMatrix() {
        let src = this.getWorldMatrix();
        let out = math2d_1.mat2d.create();
        if (math2d_1.mat2d.invert(src, out)) {
            return out;
        }
        else {
            alert("矩阵求逆失败");
            throw new Error("矩阵求逆失败");
        }
    }
    update(mesc, diff, order) {
        if (this.updateEvent) {
            this.updateEvent(this, mesc, diff, order);
        }
    }
    hitTest(localPt) {
        if (this.isVisible) {
            return this.shape.hitTest(localPt, this);
        }
        else {
            return false;
        }
    }
    draw(context) {
        if (this.isVisible) {
            this.shape.beginDraw(this, this, context);
            if (this.renderEvent !== null) {
                this.renderEvent(this, context, interface_1.EOrder.PREORDER);
            }
            this.shape.draw(this, this, context);
            if (this.renderEvent !== null) {
                this.renderEvent(this, context, interface_1.EOrder.POSTORDER);
            }
            this.shape.endDraw(this, this, context);
        }
    }
}
exports.Sprite2D = Sprite2D;


/***/ }),

/***/ "./ts/src/spriteSystem/sprite2dHierarchicalSystem.ts":
/*!***********************************************************!*\
  !*** ./ts/src/spriteSystem/sprite2dHierarchicalSystem.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteNodeManager = exports.SpriteNode = void 0;
const treeNode_1 = __webpack_require__(/*! ../treeNode */ "./ts/src/treeNode.ts");
const application_1 = __webpack_require__(/*! ../application */ "./ts/src/application.ts");
const interface_1 = __webpack_require__(/*! ./interface */ "./ts/src/spriteSystem/interface.ts");
const math2d_1 = __webpack_require__(/*! ../math2d */ "./ts/src/math2d.ts");
class SpriteNode extends treeNode_1.TreeNode {
    constructor(sprite, parent = undefined, name = "spriteNode") {
        super(sprite, parent, name);
    }
    addSprite(sprite) {
        let node = new SpriteNode(sprite, this, sprite.name);
        return node;
    }
    removeSprite(sprite) {
        let idx = this.getSpriteIndex(sprite);
        if (idx === -1) {
            return false;
        }
        if (this.removeChildAt(idx) === undefined) {
            return false;
        }
        else {
            return true;
        }
    }
    removeAll(includeThis) {
        let iter = treeNode_1.NodeEnumeratorFactory.create_bf_r2l_b2t_iter(this);
        let current = undefined;
        while (iter.moveNext()) {
            current = iter.current;
            if (current !== undefined) {
                {
                    if (current.data !== undefined) {
                        if (current === this) {
                            if (includeThis === true) {
                                current.data = undefined;
                                current = current.remove();
                            }
                        }
                        else {
                            current.data = undefined;
                            current = current.remove();
                        }
                    }
                }
            }
        }
    }
    getSprite(idx) {
        if (idx < 0 || idx > this.childCount - 1) {
            throw new Error("参数idx越界!!");
        }
        let spr = this.getChildAt(idx).sprite;
        if (spr === undefined) {
            alert("sprite 为undefined，请检查原因!!!");
            throw new Error("sprite 为undefined，请检查原因!!!");
        }
        return spr;
    }
    getParentSprite() {
        let parent = this.parent;
        if (parent !== undefined) {
            return parent.sprite;
        }
        else {
            return undefined;
        }
    }
    getSpriteCount() {
        return this.childCount;
    }
    getSpriteIndex(sprite) {
        for (let i = 0; i < this.childCount; i++) {
            let child = this.getChildAt(i);
            if (child !== undefined) {
                if (child.sprite !== undefined) {
                    if (child.sprite === sprite) {
                        return i;
                    }
                }
            }
        }
        return -1;
    }
    addChildAt(child, index) {
        let ret = super.addChildAt(child, index);
        if (ret !== undefined) {
            if (ret.data) {
                ret.data.owner = ret;
            }
        }
        return ret;
    }
    get sprite() {
        return this.data;
    }
    removeChildAt(index) {
        let ret = super.removeChildAt(index);
        return ret;
    }
    findSprite(src, localPoint = null) {
        let iter = treeNode_1.NodeEnumeratorFactory.create_bf_r2l_b2t_iter(this.root);
        let current = undefined;
        let mat;
        let dest = math2d_1.vec2.create();
        while (iter.moveNext()) {
            current = iter.current;
            if (current !== undefined) {
                if (current.data !== undefined) {
                    mat = current.data.getLocalMatrix();
                    {
                        math2d_1.Math2D.transform(mat, src, dest);
                        if (current.data.hitTest(dest)) {
                            if (localPoint !== null) {
                                localPoint.x = dest.x;
                                localPoint.y = dest.y;
                            }
                            return current.data;
                        }
                    }
                }
            }
        }
        return undefined;
    }
    draw(context) {
        if (this.sprite !== undefined) {
            this.sprite.draw(context);
            this._drawChildren(context);
        }
    }
    _drawChildren(context) {
        for (let i = 0; i < this.childCount; i++) {
            let child = this.getChildAt(i);
            if (child !== undefined) {
                let spriteNode = child;
                spriteNode.draw(context);
            }
        }
    }
    update(msec, diffSec) {
        if (this.sprite !== undefined) {
            this.sprite.update(msec, diffSec, interface_1.EOrder.PREORDER);
            this._updateChildren(msec, diffSec);
            this.sprite.update(msec, diffSec, interface_1.EOrder.POSTORDER);
        }
    }
    _updateChildren(msec, diffSec) {
        for (let i = 0; i < this.childCount; i++) {
            let child = this.getChildAt(i);
            if (child !== undefined) {
                let spriteNode = child;
                spriteNode.update(msec, diffSec);
            }
        }
    }
}
exports.SpriteNode = SpriteNode;
class SpriteNodeManager {
    constructor(width, height) {
        this._dragSprite = undefined;
        let spr = interface_1.SpriteFactory.createISprite(interface_1.SpriteFactory.createGrid(width, height));
        spr.name = 'root';
        spr.strokeStyle = "black";
        spr.fillStyle = 'white';
        spr.renderType = interface_1.ERenderType.STROKE_FILL;
        this._rootNode = new SpriteNode(spr, undefined, spr.name);
        spr.owner = this._rootNode;
    }
    get container() {
        return this._rootNode;
    }
    dispatchMouseEvent(evt) {
        if (evt.type === application_1.EInputEventType.MOUSEUP) {
            this._dragSprite = undefined;
        }
        else if (evt.type === application_1.EInputEventType.MOUSEDRAG) {
            if (this._dragSprite !== undefined) {
                if (this._dragSprite.mouseEvent !== null) {
                    this._dragSprite.mouseEvent(this._dragSprite, evt);
                    return;
                }
            }
        }
        let spr = this._rootNode.findSprite(evt.canvasPosition, evt.localPosition);
        if (spr !== undefined) {
            evt.hasLocalPosition = true;
            if (evt.button === 0 && evt.type === application_1.EInputEventType.MOUSEDOWN) {
                this._dragSprite = spr;
            }
            if (evt.type === application_1.EInputEventType.MOUSEDRAG)
                return;
            if (spr.mouseEvent) {
                spr.mouseEvent(spr, evt);
                return;
            }
        }
        else {
            evt.hasLocalPosition = false;
        }
    }
    dispatchKeyEvent(evt) {
        this._rootNode.visit((node) => {
            if (node.data !== undefined) {
                if (node.data.keyEvent !== null) {
                    node.data.keyEvent(node.data, evt);
                }
            }
        });
    }
    dispatchUpdate(msec, diffSec) {
        this._rootNode.update(msec, diffSec);
    }
    dispatchDraw(context) {
        this._rootNode.draw(context);
    }
}
exports.SpriteNodeManager = SpriteNodeManager;


/***/ }),

/***/ "./ts/src/spriteSystem/sprite2dSystem.ts":
/*!***********************************************!*\
  !*** ./ts/src/spriteSystem/sprite2dSystem.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite2DManager = void 0;
const application_1 = __webpack_require__(/*! ../application */ "./ts/src/application.ts");
const interface_1 = __webpack_require__(/*! ./interface */ "./ts/src/spriteSystem/interface.ts");
const math2d_1 = __webpack_require__(/*! ../math2d */ "./ts/src/math2d.ts");
class Sprite2DManager {
    constructor() {
        this.name = 'sprite2dManager';
        this._sprites = [];
        this.sprite = undefined;
        this._dragSprite = undefined;
    }
    addSprite(sprite) {
        sprite.owner = this;
        this._sprites.push(sprite);
        return this;
    }
    removeSpriteAt(idx) {
        this._sprites.splice(idx, 1);
    }
    removeSprite(sprite) {
        let idx = this.getSpriteIndex(sprite);
        if (idx != -1) {
            this.removeSpriteAt(idx);
            return true;
        }
        return false;
    }
    removeAll() {
        this._sprites = [];
    }
    getSprite(idx) {
        if (idx < 0 || idx > this._sprites.length - 1) {
            throw new Error("参数idx越界!!");
        }
        return this._sprites[idx];
    }
    getSpriteCount() {
        return this._sprites.length;
    }
    getSpriteIndex(sprite) {
        for (let i = 0; i < this._sprites.length; i++) {
            if (this._sprites[i] === sprite) {
                return i;
            }
        }
        return -1;
    }
    getParentSprite() {
        return undefined;
    }
    get container() {
        return this;
    }
    dispatchUpdate(msec, diff) {
        for (let i = 0; i < this._sprites.length; i++) {
            this._sprites[i].update(msec, diff, interface_1.EOrder.PREORDER);
        }
        for (let i = this._sprites.length - 1; i >= 0; i--) {
            this._sprites[i].update(msec, diff, interface_1.EOrder.POSTORDER);
        }
    }
    dispatchDraw(context) {
        for (let i = 0; i < this._sprites.length; i++) {
            this._sprites[i].draw(context);
        }
    }
    dispatchKeyEvent(evt) {
        let spr;
        for (let i = 0; i < this._sprites.length; i++) {
            spr = this._sprites[i];
            if (spr.keyEvent) {
                spr.keyEvent(spr, evt);
            }
        }
    }
    dispatchMouseEvent(evt) {
        if (evt.type === application_1.EInputEventType.MOUSEUP) {
            this._dragSprite = undefined;
        }
        else if (evt.type === application_1.EInputEventType.MOUSEDRAG) {
            if (this._dragSprite !== undefined) {
                if (this._dragSprite.mouseEvent !== null) {
                    this._dragSprite.mouseEvent(this._dragSprite, evt);
                    return;
                }
            }
        }
        let spr;
        for (let i = this._sprites.length - 1; i >= 0; i--) {
            spr = this._sprites[i];
            let mat = spr.getLocalMatrix();
            math2d_1.Math2D.transform(mat, evt.canvasPosition, evt.localPosition);
            if (spr.hitTest(evt.localPosition)) {
                evt.hasLocalPosition = true;
                if (evt.button === 0 && evt.type === application_1.EInputEventType.MOUSEDOWN) {
                    this._dragSprite = spr;
                }
                if (evt.type === application_1.EInputEventType.MOUSEDRAG) {
                    return;
                }
                if (spr.mouseEvent) {
                    spr.mouseEvent(spr, evt);
                    return;
                }
            }
        }
    }
}
exports.Sprite2DManager = Sprite2DManager;


/***/ }),

/***/ "./ts/src/treeNode.ts":
/*!****************************!*\
  !*** ./ts/src/treeNode.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeEnumeratorFactory = exports.NodeB2TEnumerator = exports.NodeT2BEnumerator = exports.LinkTreeNode = exports.TreeNode = exports.Queue = exports.Stack = exports.AdapterBase = exports.IndexerR2L = exports.IndexerL2R = void 0;
function IndexerL2R(len, idx) {
    return idx;
}
exports.IndexerL2R = IndexerL2R;
function IndexerR2L(len, idx) {
    return (len - idx - 1);
}
exports.IndexerR2L = IndexerR2L;
class AdapterBase {
    constructor() {
        this._arr = new Array();
    }
    add(t) {
        this._arr.push(t);
    }
    get length() {
        return this._arr.length;
    }
    get isEmpty() {
        return this._arr.length <= 0;
    }
    clear() {
        this._arr = new Array();
    }
    toString() {
        return this._arr.toString();
    }
}
exports.AdapterBase = AdapterBase;
class Stack extends AdapterBase {
    remove() {
        if (this._arr.length > 0)
            return this._arr.pop();
        else
            return undefined;
    }
}
exports.Stack = Stack;
class Queue extends AdapterBase {
    remove() {
        if (this._arr.length > 0)
            return this._arr.shift();
        else
            return undefined;
    }
}
exports.Queue = Queue;
class TreeNode {
    /*
                                  树数据结构
            -------------------------root--------------------
           /                         |                      \
        node1                       node2                  node3
      /   |   \                    /      \                  |
 node4  node5 node6              node7   node8             node9
    |                            |         |
  node10                        node11  node12
                                           |
                                         node13
    */
    constructor(data = undefined, parent = undefined, name = "") {
        this._parent = parent;
        this._children = undefined;
        this.name = name;
        this.data = data;
        if (this._parent !== undefined) {
            this._parent.addChild(this);
        }
    }
    addChildAt(child, index) {
        if (this.isDescendantOf(child)) {
            return undefined;
        }
        if (this._children === undefined) {
            this._children = [];
            //this._children = new Array<TreeNode<T>>();
        }
        if (index >= 0 && index <= this._children.length) {
            if (child._parent) {
                child._parent.removeChild(child);
            }
            child._parent = this;
            this._children.splice(index, 0, child);
            return child;
        }
        else {
            return undefined;
        }
    }
    addChild(child) {
        if (this._children === undefined) {
            this._children = [];
        }
        return this.addChildAt(child, this._children.length);
    }
    removeChildAt(index) {
        if (this._children === undefined)
            return undefined;
        let child = this.getChildAt(index);
        if (child === undefined) {
            return undefined;
        }
        this._children.splice(index, 1); // 从子节点列表中移除掉
        child._parent = undefined; // 将子节点的父亲节点设置为undefined
        return child;
    }
    removeChild(child) {
        if (child == undefined) {
            return undefined;
        }
        if (this._children === undefined) {
            return undefined;
        }
        let index = -1;
        for (let i = 0; i < this._children.length; i++) {
            if (this.getChildAt(i) === child) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            return undefined;
        }
        return this.removeChildAt(index);
    }
    remove() {
        if (this._parent !== undefined) {
            return this._parent.removeChild(this);
        }
        return undefined;
    }
    getChildAt(index) {
        if (this._children === undefined)
            return undefined;
        if (index < 0 || index >= this._children.length)
            return undefined;
        return this._children[index];
    }
    get childCount() {
        if (this._children !== undefined) {
            return this._children.length;
        }
        else {
            return 0;
        }
    }
    hasChild() {
        return this._children !== undefined && this._children.length > 0;
    }
    isDescendantOf(ancestor) {
        if (ancestor === undefined)
            return false;
        let node = this._parent;
        for (let node = this._parent; node !== undefined; node = node._parent) {
            if (node === ancestor)
                return true;
        }
        return false;
    }
    get children() {
        return this._children;
    }
    get parent() {
        return this._parent;
    }
    get root() {
        let curr = this;
        while (curr !== undefined && curr.parent !== undefined) {
            curr = curr.parent;
        }
        return curr;
    }
    get depth() {
        let curr = this;
        let level = 0;
        while (curr !== undefined && curr.parent !== undefined) {
            curr = curr.parent;
            level++;
        }
        return level;
    }
    repeatString(target, n) {
        let total = "";
        for (let i = 0; i < n; i++) {
            total += target;
        }
        return total;
    }
    visit(preOrderFunc = null, postOrderFunc = null, indexFunc = IndexerL2R) {
        if (preOrderFunc !== null) {
            preOrderFunc(this);
        }
        let arr = this._children;
        if (arr !== undefined) {
            for (let i = 0; i < arr.length; i++) {
                let child = this.getChildAt(indexFunc(arr.length, i));
                if (child !== undefined) {
                    child.visit(preOrderFunc, postOrderFunc, indexFunc);
                }
            }
        }
        if (postOrderFunc !== null) {
            postOrderFunc(this);
        }
    }
    visitForward(preOrderFunc = null, postOrderFunc = null) {
        if (preOrderFunc) {
            preOrderFunc(this);
        }
        let node = this.firstChild;
        while (node !== undefined) {
            node.visitForward(preOrderFunc, postOrderFunc);
            node = node.nextSibling;
        }
        if (postOrderFunc) {
            postOrderFunc(this);
        }
    }
    visitBackward(preOrderFunc = null, postOrderFunc = null) {
        if (preOrderFunc) {
            preOrderFunc(this);
        }
        let node = this.lastChild;
        while (node !== undefined) {
            node.visitBackward(preOrderFunc, postOrderFunc);
            node = node.prevSibling;
        }
        if (postOrderFunc) {
            postOrderFunc(this);
        }
    }
    printLevelInfo(idx = 0) {
        let str = this.repeatString(" ", idx * 4);
        let arr = this._children;
        if (arr !== undefined) {
            for (let i = 0; i < arr.length; i++) {
                let child = this.getChildAt(i);
                if (child !== undefined) {
                    child.printLevelInfo(idx + 1);
                }
            }
        }
        console.log("后根：" + str + this.name);
    }
    printInfo(idx = 0) {
        let str = this.repeatString(" ", idx * 4);
        console.log("先根：" + str + this.name);
        let node = this.firstChild;
        while (node !== undefined) {
            node.printInfo(idx + 1);
            node = node.nextSibling;
        }
    }
    printInfo2(idx = 0) {
        let str = this.repeatString(" ", idx * 4);
        console.log("先根：" + str + this.name);
        let node = this.lastChild;
        while (node !== undefined) {
            node.printInfo(idx + 1);
            node = node.prevSibling;
        }
    }
    get firstChild() {
        if (this._children !== undefined && this._children.length > 0) {
            return this._children[0];
        }
        else {
            return undefined;
        }
    }
    get lastChild() {
        if (this._children !== undefined && this._children.length > 0) {
            return this._children[this._children.length - 1];
        }
        else {
            return undefined;
        }
    }
    get nextSibling() {
        if (this._parent === undefined) {
            return undefined;
        }
        if (this._parent._children !== undefined && this._parent._children.length > 1) {
            let idx = -1;
            for (let i = 0; i < this._parent._children.length; i++) {
                if (this === this._parent._children[i]) {
                    idx = i;
                    break;
                }
            }
            if (idx !== this._parent._children.length - 1) {
                return this._parent._children[idx + 1];
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }
    get prevSibling() {
        if (this._parent === undefined) {
            return undefined;
        }
        if (this._parent._children !== undefined && this._parent._children.length > 1) {
            let idx = -1;
            for (let i = 0; i < this._parent._children.length; i++) {
                if (this === this._parent._children[i]) {
                    idx = i;
                    break;
                }
            }
            if (idx !== 0) {
                return this._parent._children[idx - 1];
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }
    get mostRight() {
        let node = this;
        while (true) {
            let subNode = undefined;
            if (node !== undefined) {
                subNode = node.lastChild;
            }
            if (subNode === undefined) {
                break;
            }
            node = subNode;
        }
        return node;
    }
    get mostLeft() {
        let node = this;
        while (true) {
            let subNode = undefined;
            if (node !== undefined) {
                subNode = node.firstChild;
            }
            if (subNode === undefined) {
                break;
            }
            node = subNode;
        }
        return node;
    }
    moveNext() {
        let ret = this.firstChild;
        if (ret !== undefined) {
            return ret;
        }
        ret = this.nextSibling;
        if (ret !== undefined) {
            return ret;
        }
        ret = this;
        while (ret !== undefined && ret.nextSibling === undefined) {
            ret = ret.parent;
        }
        if (ret !== undefined) {
            return ret.nextSibling;
        }
        return undefined;
    }
    movePrev() {
        let ret = this.lastChild;
        if (ret !== undefined) {
            return ret;
        }
        ret = this.prevSibling;
        if (ret !== undefined) {
            return ret;
        }
        ret = this;
        while (ret !== undefined && ret.prevSibling === undefined) {
            ret = ret.parent;
        }
        if (ret !== undefined) {
            return ret.prevSibling;
        }
        return undefined;
    }
    moveNextPost() {
        let next = this.nextSibling;
        if (next === undefined) {
            return this.parent;
        }
        let first = undefined;
        while (next !== undefined && (first = next.firstChild)) {
            next = first;
        }
        return next;
    }
    movePrevPost() {
        let prev = this.prevSibling;
        if (prev === undefined) {
            return this.parent;
        }
        let last = undefined;
        while (prev !== undefined && (last = prev.lastChild)) {
            prev = last;
        }
        return prev;
    }
}
exports.TreeNode = TreeNode;
class LinkTreeNode {
    constructor() {
        this.name = '';
    }
}
exports.LinkTreeNode = LinkTreeNode;
class NodeT2BEnumerator {
    constructor(node, func, adapter) {
        if (node === undefined) {
            return;
        }
        this._node = node;
        this._indexer = func;
        this._adapter = new adapter();
        this._adapter.add(this._node);
        this._currNode = undefined;
    }
    reset() {
        if (this._node === undefined) {
            return;
        }
        this._currNode = undefined;
        this._adapter.clear();
        this._adapter.add(this._node);
    }
    moveNext() {
        if (this._adapter.isEmpty) {
            return false;
        }
        this._currNode = this._adapter.remove();
        if (this._currNode != undefined) {
            let len = this._currNode.childCount;
            for (let i = 0; i < len; i++) {
                let childIdx = this._indexer(len, i);
                let child = this._currNode.getChildAt(childIdx);
                if (child !== undefined) {
                    this._adapter.add(child);
                }
            }
        }
        return true;
    }
    get current() {
        return this._currNode;
    }
}
exports.NodeT2BEnumerator = NodeT2BEnumerator;
class NodeB2TEnumerator {
    constructor(iter) {
        this._iter = iter;
        this.reset();
    }
    reset() {
        this._arr = [];
        while (this._iter.moveNext()) {
            this._arr.push(this._iter.current);
        }
        this._arrIdx = this._arr.length;
    }
    get current() {
        if (this._arrIdx >= this._arr.length) {
            return undefined;
        }
        else {
            return this._arr[this._arrIdx];
        }
    }
    moveNext() {
        this._arrIdx--;
        return (this._arrIdx >= 0 && this._arrIdx < this._arr.length);
    }
}
exports.NodeB2TEnumerator = NodeB2TEnumerator;
class NodeEnumeratorFactory {
    static create_df_l2r_t2b_iter(node) {
        let iter = new NodeT2BEnumerator(node, IndexerR2L, Stack);
        return iter;
    }
    static create_df_r2l_t2b_iter(node) {
        let iter = new NodeT2BEnumerator(node, IndexerL2R, Stack);
        return iter;
    }
    static create_bf_l2r_t2b_iter(node) {
        let iter = new NodeT2BEnumerator(node, IndexerL2R, Queue);
        return iter;
    }
    static create_bf_r2l_t2b_iter(node) {
        let iter = new NodeT2BEnumerator(node, IndexerR2L, Queue);
        return iter;
    }
    static create_df_l2r_b2t_iter(node) {
        let iter = new NodeB2TEnumerator(NodeEnumeratorFactory.create_df_r2l_t2b_iter(node));
        return iter;
    }
    static create_df_r2l_b2t_iter(node) {
        let iter = new NodeB2TEnumerator(NodeEnumeratorFactory.create_df_l2r_t2b_iter(node));
        return iter;
    }
    static create_bf_l2r_b2t_iter(node) {
        let iter = new NodeB2TEnumerator(NodeEnumeratorFactory.create_bf_r2l_t2b_iter(node));
        return iter;
    }
    static create_bf_r2l_b2t_iter(node) {
        let iter = new NodeB2TEnumerator(NodeEnumeratorFactory.create_bf_l2r_t2b_iter(node));
        return iter;
    }
}
exports.NodeEnumeratorFactory = NodeEnumeratorFactory;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vdHMvYXBwLnRzIiwid2VicGFjazovLy8uL3RzL3NyYy9hcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi90cy9zcmMvbWF0aDJkLnRzIiwid2VicGFjazovLy8uL3RzL3NyYy9zcHJpdGVTeXN0ZW0vaW50ZXJmYWNlLnRzIiwid2VicGFjazovLy8uL3RzL3NyYy9zcHJpdGVTeXN0ZW0vc2hhcGVzLnRzIiwid2VicGFjazovLy8uL3RzL3NyYy9zcHJpdGVTeXN0ZW0vc3ByaXRlMkRBcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi90cy9zcmMvc3ByaXRlU3lzdGVtL3Nwcml0ZTJkLnRzIiwid2VicGFjazovLy8uL3RzL3NyYy9zcHJpdGVTeXN0ZW0vc3ByaXRlMmRIaWVyYXJjaGljYWxTeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vdHMvc3JjL3Nwcml0ZVN5c3RlbS9zcHJpdGUyZFN5c3RlbS50cyIsIndlYnBhY2s6Ly8vLi90cy9zcmMvdHJlZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwy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O2dCQUNBLENBQUMsR0FBRyxJQUFJO2FBQ1Q7UUFDSCxDQUFDLENBQUM7UUFDRixPQUFPLENBQUM7SUFDVixDQUFDO0lBR08sSUFBSTtRQUNWLElBQUksS0FBSyxHQUFlLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxhQUFJLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JFLElBQUksS0FBSyxHQUFlLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxhQUFJLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JFLElBQUksS0FBSyxHQUFlLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxhQUFJLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFL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QUFLLEdBQUcsT0FBTyxDQUFFO0lBQzVCLENBQUM7SUFFTSxNQUFNLENBQUMsSUFBSSxDQUFHLEdBQVcsRUFBRyxTQUF3QixJQUFJO1FBQzNELElBQUssTUFBTSxLQUFLLElBQUk7WUFBRyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBRTtRQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFFLENBQUU7UUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBRSxDQUFFO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUUsQ0FBRTtRQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFFLENBQUU7UUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBRSxDQUFFO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUUsQ0FBRTtRQUN0QyxPQUFPLE1BQU0sQ0FBRTtJQUNuQixDQUFDO0lBR00sTUFBTSxDQUFDLFFBQVEsQ0FBRyxJQUFZLEVBQUcsS0FBYSxFQUFHLFNBQXdCLElBQUk7UUFDaEYsSUFBSyxNQUFNLEtBQUssSUFBSTtZQUFHLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFFO1FBRTdDLElBQUksRUFBRSxHQUFZLElBQUksQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLENBQUU7UUFDdkMsSUFBSSxFQUFFLEdBQVksSUFBSSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsQ0FBRTtRQUN2QyxJQUFJLEVBQUUsR0FBWSxJQUFJLENBQUcsTUFBTSxDQUFHLENBQUMsQ0FBRSxDQUFFO1FBQ3ZDLElBQUksRUFBRSxHQUFZLElBQUksQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLENBQUU7UUFDdkMsSUFBSSxFQUFFLEdBQVksSUFBSSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsQ0FBRTtRQUN2QyxJQUFJLEVBQUUsR0FBWSxJQUFJLENBQUcsTUFBTSxDQUFHLENBQUMsQ0FBRSxDQUFFO1FBRXZDLElBQUksRUFBRSxHQUFZLEtBQUssQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLENBQUU7UUFDeEMsSUFBSSxFQUFFLEdBQVksS0FBSyxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsQ0FBRTtRQUN4QyxJQUFJLEVBQUUsR0FBWSxLQUFLLENBQUcsTUFBTSxDQUFHLENBQUMsQ0FBRSxDQUFFO1FBQ3hDLElBQUksRUFBRSxHQUFZLEtBQUssQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLENBQUU7UUFDeEMsSUFBSSxFQUFFLEdBQVksS0FBSyxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsQ0FBRTtRQUN4QyxJQUFJLEVBQUUsR0FBWSxLQUFLLENBQUcsTUFBTSxDQUFHLENBQUMsQ0FBRSxDQUFFO1FBRXhDLE1BQU0sQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFFO1FBQzNDLE1BQU0sQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFFO1FBQzNDLE1BQU0sQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFFO1FBQzNDLE1BQU0sQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFFO1FBQzNDLE1BQU0sQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxF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UUFDM0IsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFDM0IsT0FBTyxNQUFNLENBQUU7SUFDbkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxjQUFjLENBQUcsSUFBVyxFQUFHLFNBQXdCLElBQUk7UUFDckUsSUFBSyxNQUFNLEtBQUssSUFBSTtZQUFHLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBSSxDQUFFO1FBQy9DLE1BQU0sQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUcsQ0FBQyxHQUFHLElBQUksQ0FBRyxDQUFDLENBQUU7UUFDckQsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFFLENBQUMsR0FBRyxJQUFJLENBQUcsQ0FBQyxHQUFHLElBQUksQ0FBRyxDQUFDLENBQUU7UUFDbkQsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFFLENBQUMsR0FBRyxJQUFJLENBQUcsQ0FBQyxHQUFHLElBQUksQ0FBRyxDQUFDLENBQUU7UUFDbkQsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFHLENBQUMsQ0FBRTtRQUNyRCxNQUFNLENBQUcsTUFBTSxDQUFHLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRTtRQUMzQixNQUFNLENBQUcsTUFBTSxDQUFHLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRTtRQUMzQixPQUFPLE1BQU0sQ0FBRTtJQUNuQixDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQVMsQ0FBRyxFQUFXLEVBQUcsU0FBd0IsSUFBSTtRQUNoRSxJQUFLLE1BQU0sS0FBSyxJQUFJO1lBQUcsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFJLENBQUU7UUFDL0MsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFDM0IsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFDM0IsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxFQUFFLENBQUM7UUFDM0IsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFDM0IsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFDM0IsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFDM0IsT0FBTyxNQUFNLENBQUU7SUFDbkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFTLENBQUcsRUFBVyxFQUFHLFNBQXdCLElBQUk7UUFDaEUsSUFBSyxNQUFNLEtBQUssSUFBSTtZQUFHLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBSSxDQUFFO1FBQy9DLE1BQU0sQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFO1FBQzNCLE1BQU0sQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLEdBQUcsRUFBRSxDQUFFO1FBQzVCLE1BQU0sQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFO1FBQzNCLE1BQU0sQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFO1FBQzNCLE1BQU0sQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFO1FBQzNCLE9BQU8sTUFBTSxDQUFFO0lBQ25CLENBQUM7SUFFTSxNQUFNLENBQUMsZUFBZSxDQUFHLEVBQVcsRUFBRyxFQUFXLEVBQUcsU0FBd0IsSUFBSTtRQUNwRixJQUFLLE1BQU0sS0FBSyxJQUFJO1lBQUcsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFJLENBQUU7UUFDL0MsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFDM0IsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFDM0IsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFDM0IsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFFM0IsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxFQUFFLENBQUU7UUFDNUIsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxFQUFFLENBQUU7UUFDNUIsT0FBTyxNQUFNLENBQUU7SUFDbkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFTLENBQUcsRUFBVyxFQUFHLEVBQVcsRUFBRyxTQUF3QixJQUFJO1FBQzlFLElBQUssTUFBTSxDQUFHLFFBQVEsQ0FBRyxFQUFFLEVBQUcsQ0FBQyxDQUFFLElBQUksTUFBTSxDQUFHLFFBQVEsQ0FBRyxFQUFFLEVBQUcsQ0FBQyxDQUFFLEVBQUc7WUFDaEUsS0FBSyxDQUFHLGVBQWUsQ0FBRSxDQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUcsZUFBZSxDQUFFLENBQUU7U0FDeEM7UUFFRCxJQUFLLE1BQU0sS0FBSyxJQUFJO1lBQUcsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUU7UUFDN0MsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxFQUFFLENBQUU7UUFDNUIsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFDM0IsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFDM0IsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxFQUFFLENBQUU7UUFDNUIsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFDM0IsTUFBTSxDQUFHLE1BQU0sQ0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUU7UUFDM0IsT0FBTyxNQUFNLENBQUU7SUFDbkIsQ0FBQzs7QUE5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LENBQUcsU0FBUyxDQUFFLENBQUU7UUFDL0csRUFBRSxDQUFHLElBQUksR0FBRyxhQUFJLENBQUcsTUFBTSxDQUFHLElBQUksQ0FBRyxJQUFJLENBQUcsV0FBVyxFQUFHLElBQUksQ0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFFLElBQUksQ0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFHLElBQUksQ0FBRyxZQUFZLENBQUUsQ0FBRTtRQUMvSCxJQUFJLENBQUcsU0FBUyxDQUFHLElBQUksQ0FBRyxFQUFFLENBQUUsQ0FBRTtRQUVoQyxFQUFFLEdBQUcsSUFBSSxrQkFBUyxFQUFJLENBQUU7UUFDeEIsRUFBRSxDQUFHLE1BQU0sR0FBRyxhQUFJLENBQUcsTUFBTSxDQUFHLElBQUksQ0FBRyxJQUFJLENBQUcsVUFBVSxFQUFJLElBQUksQ0FBRyxJQUFJLENBQUcsS0FBSyxDQUFHLE1BQU0sR0FBRyxJQUFJLENBQUUsSUFBSSxDQUFHLFlBQVksQ0FBRSxDQUFFO1FBQ3RILEVBQUUsQ0FBRyxJQUFJLEdBQUcsYUFBSSxDQUFHLE1BQU0sQ0FBRyxJQUFJLENBQUcsSUFBSSxDQUFHLEtBQUssQ0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFHLElBQUksQ0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFHLElBQUksQ0FBRyxXQUFXLEVBQUksSUFBSSxDQUFHLElBQUksQ0FBRyxZQUFZLENBQUUsQ0FBRTtRQUNoSixJQUFJLENBQUcsUUFBUSxDQUFHLElBQUksQ0FBRyxFQUFFLENBQUUsQ0FBRTtRQUUvQixFQUFFLEdBQUcsSUFBSSxrQkFBUyxFQUFJLENBQUU7UUFDeEIsRUFBRSxDQUFHLE1BQU0sR0FBRyxhQUFJLENBQUcsTUFBTSxDQUFJLElBQUksQ0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFHLElBQUksQ0FBRyxVQUFVLEVBQUcsSUFBSSxDQUFHLE1BQU0sR0FBRyxJQUFJLENBQUcsSUFBSSxDQUFHLFlBQVksQ0FBRyxDQUFFO1FBQ3BILEVBQUUsQ0FBRyxJQUFJLEdBQUcsYUFBSSxDQUFHLE1BQU0sQ0FBRyxJQUFJLENBQUcsS0FBSyxHQUFHLElBQUksQ0FBRyxJQUFJLENBQUcsVUFBVSxHQUFHLElBQUksQ0FBRyxJQUFJLENBQUcsV0FBVyxFQUFJLElBQUksQ0FBRyxJQUFJLENBQUcsWUFBWSxDQUFFLENBQUU7UUFDakksSUFBSSxDQUFHLFNBQVMsQ0FBRyxJQUFJLENBQUcsRUFBRSxDQUFFLENBQUU7UUFFaEMsRUFBRSxHQUFHLElBQUksa0JBQVMsRUFBSSxDQUFFO1FBQ3hCLEVBQUUsQ0FBRyxNQUFNLEdBQUcsYUFBSSxDQUFHLE1BQU0sQ0FBRyxJQUFJLENBQUcsSUFBSSxDQUFHLFVBQVUsRUFBSSxJQUFJLENBQUcsSUFBSSxDQUFHLFNBQVMsQ0FBRyxDQUFFO1FBQ3RGLEVBQUUsQ0FBRyxJQUFJLEdBQUcsYUFBSSxDQUFHLE1BQU0sQ0FBRyxJQUFJLENBQUcsSUFBSSxDQUFHLEtBQUssQ0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFHLElBQUksQ0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFHLElBQUksQ0FBRyxXQUFXLEVBQUksSUFBSSxDQUFHLElBQUksQ0FBRyxLQUFLLENBQUcsTUFBTSxHQUFHLElBQUksQ0FBRSxJQUFJLENBQUcsU0FBUyxHQUFHLElBQUksQ0FBRSxJQUFJLENBQUcsWUFBWSxDQUFFLENBQUU7UUFDdk0sSUFBSSxDQUFHLFFBQVEsQ0FBRyxJQUFJLENBQUcsRUFBRSxDQUFFLENBQUU7UUFFL0IsRUFBRSxHQUFHLElBQUksa0JBQVMsRUFBSSxDQUFFO1FBQ3hCLEVBQUUsQ0FBRyxNQUFNLEdBQUcsYUFBSSxDQUFHLE1BQU0sQ0FBSSxJQUFJLENBQUcsQ0FBQyxHQUFHLElBQUksQ0FBRyxJQUFJLENBQUcsVUFBVSxFQUFHLElBQUksQ0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFHLElBQUksQ0FBRyxTQUFTLENBQUcsQ0FBRTtRQUM1RyxFQUFFLENBQUcsSUFBSSxHQUFHLGFBQUksQ0FBRyxNQUFNLENBQUcsSUFBSSxDQUFHLEtBQUssR0FBRyxJQUFJLENBQUcsSUFBSSxDQUFHLFVBQVUsR0FBRyxJQUFJLENBQUcsSUFB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anMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3RzL2FwcC50c1wiKTtcbiIsImltcG9ydCB7ICBJU3ByaXRlLCBTcHJpdGVGYWN0b3J5LCBJU2hhcGUgLCAgSVNwcml0ZUNvbnRhaW5lciAsIEVPcmRlciwgSVRyYW5zZm9ybWFibGUsIElSZW5kZXJTdGF0ZSB9IGZyb20gXCIuL3NyYy9zcHJpdGVTeXN0ZW0vaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNwcml0ZTJEQXBwbGljYXRpb24gfSBmcm9tIFwiLi9zcmMvc3ByaXRlU3lzdGVtL3Nwcml0ZTJEQXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgQ2FudmFzTW91c2VFdmVudCwgRUlucHV0RXZlbnRUeXBlICwgQ2FudmFzS2V5Qm9hcmRFdmVudCB9IGZyb20gXCIuL3NyYy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBtYXQyZCAsIHZlYzIgLCBJbnNldCwgTWF0aDJEIH0gZnJvbSBcIi4vc3JjL21hdGgyZFwiO1xyXG5pbXBvcnQgeyBMaW5lLCBFbXB0eVNoYXBlLCBCYXNlU2hhcGUyRCB9IGZyb20gXCIuL3NyYy9zcHJpdGVTeXN0ZW0vc2hhcGVzXCI7XHJcbmltcG9ydCB7IFNwcml0ZU5vZGUgfSBmcm9tICcuL3NyYy9zcHJpdGVTeXN0ZW0vc3ByaXRlMmRIaWVyYXJjaGljYWxTeXN0ZW0nXHJcbmltcG9ydCB7IFNwcml0ZTJEIH0gZnJvbSAnLi9zcmMvc3ByaXRlU3lzdGVtL3Nwcml0ZTJkJ1xyXG5cclxuY2xhc3MgU3ByaXRlTm9kZUdyb3VwIGV4dGVuZHMgU3ByaXRlTm9kZSB7XHJcbiAgcHVibGljIHBhcmFtczogYW55XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yIChwYXJhbXM6IGFueSwgcGFyZW50IDogU3ByaXRlTm9kZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCAsIG5hbWUgOiBzdHJpbmcgPSBcIlNwcml0ZU5vZGVHcm91cFwiICkge1xyXG4gICAgc3VwZXIgKFNwcml0ZUZhY3RvcnkuY3JlYXRlU3ByaXRlKG5ldyBFbXB0eVNoYXBlKSAsIHBhcmVudCAsIG5hbWUgKSA7XHJcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtc1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgQ05vZGVUZXh0U2hhcCBleHRlbmRzIEJhc2VTaGFwZTJEIHsgIFxyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IgKCByYWRpdXM6IG51bWJlciA9IDEgKSB7XHJcbiAgICAgIHN1cGVyICggKSA7XHJcbiAgfVxyXG4gIHB1YmxpYyBoaXRUZXN0ICggbG9jYWxQdCA6IHZlYzIgLCB0cmFuc2Zvcm0gOiBJVHJhbnNmb3JtYWJsZSApOiBib29sZWFuIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHJhdyAoIHRyYW5zZm9ybWFibGU6IElUcmFuc2Zvcm1hYmxlLCBzdGF0ZSA6IElSZW5kZXJTdGF0ZSAsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgKTogdm9pZCB7XHJcbiAgICBsZXQgc3ByID0gdHJhbnNmb3JtYWJsZSBhcyBTcHJpdGUyRFxyXG4gICAgbGV0IHRleHQgPSBzcHIuZGF0YS50ZXh0XHJcbiAgICBcclxuICAgIGNvbnRleHQuc2F2ZSgpXHJcbiAgICBjb250ZXh0LmZvbnQ9IFwiMjBweCBBcmlhbFwiO1xyXG4gICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSBcIm1pZGRsZVwiXHJcbiAgICBjb250ZXh0LnRleHRBbGlnbiA9IFwibGVmdFwiXHJcbiAgICBsZXQgdyA9IGNvbnRleHQubWVhc3VyZVRleHQodGV4dCkud2lkdGhcclxuICAgIGxldCBoID0gY29udGV4dC5tZWFzdXJlVGV4dCgn55SwJykud2lkdGhcclxuICAgIGxldCBwYWRkaW5nID0gMTBcclxuICAgIGxldCBYZGV2aWF0aW9uID0gLSAodyArIDIgKiBwYWRkaW5nKSAvIDIgLy8geOi9tOeahOWBj+enu+mHj1xyXG5cclxuICAgIGNvbnRleHQuc2F2ZSgpXHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMCwgMCwgMjU1LCAwLjgpXCJcclxuICAgIHRoaXMuZHJhd1JvdW5kUmVjdChjb250ZXh0LCBYZGV2aWF0aW9uICwgMCAsdyArIDIgKiBwYWRkaW5nLCBoICsgMiAqIHBhZGRpbmcsIDYpXHJcbiAgICAvL2NvbnRleHQucmVjdChYZGV2aWF0aW9uICwgMCAsdyArIDIgKiBwYWRkaW5nLCBoICsgMiAqIHBhZGRpbmcpXHJcbiAgICBjb250ZXh0LmZpbGwoKVxyXG4gICAgY29udGV4dC5yZXN0b3JlKClcclxuXHJcbiAgICBjb250ZXh0LnNhdmUoKVxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpXCJcclxuICAgIGNvbnRleHQuZmlsbFRleHQodGV4dCAscGFkZGluZyArIFhkZXZpYXRpb24gLHBhZGRpbmcgKyBoIC8gMiArIDEpXHJcbiAgICBjb250ZXh0LnJlc3RvcmUoKVxyXG5cclxuICAgIGNvbnRleHQucmVzdG9yZSgpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRyYXdSb3VuZFJlY3QoY3h0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcmFkaXVzOiBudW1iZXIpeyAgIFxyXG4gICAgY3h0LmJlZ2luUGF0aCgpOyAgIFxyXG4gICAgY3h0LmFyYyh4ICsgcmFkaXVzLCB5ICsgcmFkaXVzLCByYWRpdXMsIE1hdGguUEksIE1hdGguUEkgKiAzIC8gMik7ICAgXHJcbiAgICBjeHQubGluZVRvKHdpZHRoIC0gcmFkaXVzICsgeCwgeSk7ICAgXHJcbiAgICBjeHQuYXJjKHdpZHRoIC0gcmFkaXVzICsgeCwgcmFkaXVzICsgeSwgcmFkaXVzLCBNYXRoLlBJICogMyAvIDIsIE1hdGguUEkgKiAyKTsgICBcclxuICAgIGN4dC5saW5lVG8od2lkdGggKyB4LCBoZWlnaHQgKyB5IC0gcmFkaXVzKTsgICBcclxuICAgIGN4dC5hcmMod2lkdGggLSByYWRpdXMgKyB4LCBoZWlnaHQgLSByYWRpdXMgKyB5LCByYWRpdXMsIDAsIE1hdGguUEkgKiAxIC8gMik7ICAgXHJcbiAgICBjeHQubGluZVRvKHJhZGl1cyArIHgsIGhlaWdodCAreSk7ICAgXHJcbiAgICBjeHQuYXJjKHJhZGl1cyArIHgsIGhlaWdodCAtIHJhZGl1cyArIHksIHJhZGl1cywgTWF0aC5QSSAqIDEgLyAyLCBNYXRoLlBJKTsgICBcclxuICAgIGN4dC5jbG9zZVBhdGgoKTsgICBcclxufSAgIFxyXG5cclxuICBwdWJsaWMgZ2V0IHR5cGUgKCk6IHN0cmluZyB7XHJcbiAgICAgIHJldHVybiBcIkNOb2RlVGV4dFNoYXBcIjtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIExuaWtUZXh0U2hhcCBleHRlbmRzIEJhc2VTaGFwZTJEIHsgIFxyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IgKCApIHtcclxuICAgICAgc3VwZXIgKCApIDtcclxuICB9XHJcbiAgcHVibGljIGhpdFRlc3QgKCBsb2NhbFB0IDogdmVjMiAsIHRyYW5zZm9ybSA6IElUcmFuc2Zvcm1hYmxlICk6IGJvb2xlYW4ge1xyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkcmF3ICggdHJhbnNmb3JtYWJsZTogSVRyYW5zZm9ybWFibGUsIHN0YXRlIDogSVJlbmRlclN0YXRlICwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCApOiB2b2lkIHtcclxuICAgIGxldCBzcHIgPSB0cmFuc2Zvcm1hYmxlIGFzIFNwcml0ZTJEXHJcbiAgICBsZXQgdGV4dCA9IHNwci5kYXRhLnRleHRcclxuICAgIFxyXG4gICAgY29udGV4dC5zYXZlKClcclxuICAgIGNvbnRleHQuZm9udD0gXCIxNHB4IEFyaWFsXCI7XHJcbiAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCJcclxuICAgIGNvbnRleHQudGV4dEFsaWduID0gXCJsZWZ0XCJcclxuICAgIGxldCB3ID0gY29udGV4dC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aFxyXG4gICAgbGV0IGggPSBjb250ZXh0Lm1lYXN1cmVUZXh0KCfnlLAnKS53aWR0aFxyXG4gICAgbGV0IHBhZGRpbmcgPSA0XHJcbiAgICBsZXQgWGRldmlhdGlvbiA9IC0gKHcgKyAyICogcGFkZGluZykgLyAyIC8vIHjovbTnmoTlgY/np7vph49cclxuICAgIGxldCBZZGV2aWF0aW9uID0gLSAoaCArIDIgKiBwYWRkaW5nKSAvIDIgLy8geei9tOeahOWBj+enu+mHj1xyXG5cclxuICAgIGNvbnRleHQuc2F2ZSgpXHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMCwgMCwgMjU1LCAwLjgpXCJcclxuICAgIHRoaXMuZHJhd1JvdW5kUmVjdChjb250ZXh0LCBYZGV2aWF0aW9uICwgWWRldmlhdGlvbiAsdyArIDIgKiBwYWRkaW5nLCBoICsgMiAqIHBhZGRpbmcsIDYpXHJcbiAgICAvL2NvbnRleHQucmVjdChYZGV2aWF0aW9uICwgMCAsdyArIDIgKiBwYWRkaW5nLCBoICsgMiAqIHBhZGRpbmcpXHJcbiAgICBjb250ZXh0LmZpbGwoKVxyXG4gICAgY29udGV4dC5yZXN0b3JlKClcclxuXHJcbiAgICBjb250ZXh0LnNhdmUoKVxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpXCJcclxuICAgIGNvbnRleHQuZmlsbFRleHQodGV4dCAscGFkZGluZyArIFhkZXZpYXRpb24gLHBhZGRpbmcgKyBoIC8gMiArIFlkZXZpYXRpb24gKyAxKVxyXG4gICAgY29udGV4dC5yZXN0b3JlKClcclxuXHJcbiAgICBjb250ZXh0LnJlc3RvcmUoKVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkcmF3Um91bmRSZWN0KGN4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHJhZGl1czogbnVtYmVyKXsgICBcclxuICAgIGN4dC5iZWdpblBhdGgoKTsgICBcclxuICAgIGN4dC5hcmMoeCArIHJhZGl1cywgeSArIHJhZGl1cywgcmFkaXVzLCBNYXRoLlBJLCBNYXRoLlBJICogMyAvIDIpOyAgIFxyXG4gICAgY3h0LmxpbmVUbyh3aWR0aCAtIHJhZGl1cyArIHgsIHkpOyAgIFxyXG4gICAgY3h0LmFyYyh3aWR0aCAtIHJhZGl1cyArIHgsIHJhZGl1cyArIHksIHJhZGl1cywgTWF0aC5QSSAqIDMgLyAyLCBNYXRoLlBJICogMik7ICAgXHJcbiAgICBjeHQubGluZVRvKHdpZHRoICsgeCwgaGVpZ2h0ICsgeSAtIHJhZGl1cyk7ICAgXHJcbiAgICBjeHQuYXJjKHdpZHRoIC0gcmFkaXVzICsgeCwgaGVpZ2h0IC0gcmFkaXVzICsgeSwgcmFkaXVzLCAwLCBNYXRoLlBJICogMSAvIDIpOyAgIFxyXG4gICAgY3h0LmxpbmVUbyhyYWRpdXMgKyB4LCBoZWlnaHQgK3kpOyAgIFxyXG4gICAgY3h0LmFyYyhyYWRpdXMgKyB4LCBoZWlnaHQgLSByYWRpdXMgKyB5LCByYWRpdXMsIE1hdGguUEkgKiAxIC8gMiwgTWF0aC5QSSk7ICAgXHJcbiAgICBjeHQuY2xvc2VQYXRoKCk7ICAgXHJcbn0gICBcclxuXHJcbiAgcHVibGljIGdldCB0eXBlICgpOiBzdHJpbmcge1xyXG4gICAgICByZXR1cm4gXCJMbmlrVGV4dFNoYXBcIjtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIHRvcG9sb2d5QXBwbGljYXRpb24ge1xyXG4gIHByaXZhdGUgX2FwcDogU3ByaXRlMkRBcHBsaWNhdGlvblxyXG4gIHByaXZhdGUgX2NpcmNsZVNoYXA6IElTaGFwZVxyXG4gIHByaXZhdGUgX3JlY3RTaGFwOiBJU2hhcGVcclxuICBwcml2YXRlIF9hcnJvd1NoYXA6IElTaGFwZVxyXG4gIHByaXZhdGUgX2NOb2RlczogQXJyYXk8U3ByaXRlTm9kZT4gPSBbXVxyXG4gIHByaXZhdGUgX2xpbmtOb2RlczogQXJyYXk8U3ByaXRlTm9kZT4gPSBbXVxyXG4gIHByaXZhdGUgX2xpbmtHcm91cHM6IEFycmF5PFNwcml0ZU5vZGVHcm91cD4gPSBbXVxyXG4gIHByaXZhdGUgX3NhbWVMaW5rR2FwID0gMjVcclxuICBwcml2YXRlIF9saW5rQ2lyY2xlR2FwID0gNVxyXG4gIHByaXZhdGUgX2NpcmNsZVJhZGl1cyA9IDMwXHJcbiAgcHJpdmF0ZSBfY3VyWm9vbSA9IDFcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yIChhcHA6IFNwcml0ZTJEQXBwbGljYXRpb24pIHtcclxuICAgIHRoaXMuX2FwcCA9IGFwcFxyXG4gICAgdGhpcy5fY2lyY2xlU2hhcCA9IFNwcml0ZUZhY3RvcnkuY3JlYXRlQ2lyY2xlKHRoaXMuX2NpcmNsZVJhZGl1cylcclxuICAgIHRoaXMuX3JlY3RTaGFwID0gU3ByaXRlRmFjdG9yeS5jcmVhdGVSZWN0KDIwLCAxMClcclxuICAgIHRoaXMuX2Fycm93U2hhcCA9IFNwcml0ZUZhY3RvcnkuY3JlYXRlUG9seWdvbihbbmV3IHZlYzIoNSwwKSwgbmV3IHZlYzIoMCwgNSksIG5ldyB2ZWMyKDAsIC01KV0pXHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgICB0aGlzLl9hcHAuc3RhcnQgKCApIDtcclxuXHJcblxyXG4gICAgbGV0IHpvb21JbkJ1dHRvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjem9vbUlOJykgYXMgSFRNTEVsZW1lbnRcclxuICAgIGxldCB6b29tT3V0QnV0dG9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN6b29tT3V0JykgYXMgSFRNTEVsZW1lbnRcclxuICAgIHpvb21JbkJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLl9jdXJab29tICo9IDEuMlxyXG4gICAgICB0aGlzLmhhbmRsZVpvb21DaGFuZ2UoKVxyXG4gICAgfVxyXG5cclxuICAgIHpvb21PdXRCdXR0b24ub25jbGljayA9ICAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2N1clpvb20gLz0gMS4yXHJcbiAgICAgIHRoaXMuaGFuZGxlWm9vbUNoYW5nZSgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVpvb21DaGFuZ2UgKCkgOiB2b2lkIHtcclxuICAgIGxldCByb290ID0gdGhpcy5fYXBwLnJvb3RDb250YWluZXIgYXMgU3ByaXRlTm9kZVxyXG4gICAgbGV0IHJvb3RTcHIgPSByb290LnNwcml0ZVxyXG4gICAgICBsZXQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICAgIGlmIChyb290U3ByKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcm9vdFNwci5zY2FsZVggPSB0aGlzLl9jdXJab29tXHJcbiAgICAgICAgcm9vdFNwci5zY2FsZVkgPSB0aGlzLl9jdXJab29tXHJcbiAgICAgICAgaWYgKGNhbnZhcykge1xyXG4gICAgICAgICAgbGV0IG1vdXNlWCA9IChjYW52YXMub2Zmc2V0V2lkdGggLyAyKVxyXG4gICAgICAgICAgbGV0IG1vdXNlWSA9IChjYW52YXMub2Zmc2V0SGVpZ2h0IC8gMilcclxuXHJcbiAgICAgICAgICAvLyBsZXQgbW91c2VYID0gMzIwXHJcbiAgICAgICAgICAvLyBsZXQgbW91c2VZID0gMTIwXHJcbiAgICAgICAgICBsZXQgbmV3VyA9IGNhbnZhcy5vZmZzZXRXaWR0aCAqIHRoaXMuX2N1clpvb21cclxuICAgICAgICAgIGxldCBuZXdIID0gY2FudmFzLm9mZnNldEhlaWdodCAqIHRoaXMuX2N1clpvb21cclxuICAgICAgICAgIGxldCB4ID0gbW91c2VYIC0gbW91c2VYIC8gY2FudmFzLm9mZnNldFdpZHRoICogbmV3VyAvLyBtb3VzZVggLSBtb3VzZVjmmKDlsITliLDmlrDlrr3luqbkuK3nmoR45Z2Q5qCHXHJcbiAgICAgICAgICBsZXQgeSA9IG1vdXNlWSAtIG1vdXNlWSAvIGNhbnZhcy5vZmZzZXRIZWlnaHQgKiBuZXdIXHJcbiAgICAgICAgICByb290U3ByLnggPSB4XHJcbiAgICAgICAgICByb290U3ByLnkgPSB5XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUNOb2RlKHBvc2l0aW9uOiB2ZWMyLCBuYW1lOiBzdHJpbmcpIDogU3ByaXRlTm9kZSB7XHJcbiAgICBsZXQgY2lyY2xlIDogSVNwcml0ZSA9IFNwcml0ZUZhY3RvcnkuY3JlYXRlU3ByaXRlKHRoaXMuX2NpcmNsZVNoYXApO1xyXG4gICAgY2lyY2xlLmZpbGxTdHlsZSA9ICdyZWQnXHJcbiAgICBjaXJjbGUueCA9IHBvc2l0aW9uLnhcclxuICAgIGNpcmNsZS55ID0gcG9zaXRpb24ueVxyXG4gICAgY2lyY2xlLm1vdXNlRXZlbnQgPSB0aGlzLmhhbmRsZUNpcmNsZUV2ZW50LmJpbmQodGhpcylcclxuXHJcbiAgICBsZXQgY2lyY2xlTiA9IG5ldyBTcHJpdGVOb2RlKGNpcmNsZSlcclxuXHJcbiAgICBsZXQgdGV4dFNwcjogSVNwcml0ZSA9IG5ldyBTcHJpdGUyRChuZXcgQ05vZGVUZXh0U2hhcCgpLCAndGV4dFNwcicpXHJcbiAgICB0ZXh0U3ByLnNob3dDb29yZFN5c3RlbSA9IGZhbHNlXHJcbiAgICB0ZXh0U3ByLnggPSAwXHJcbiAgICB0ZXh0U3ByLnkgPSB0aGlzLl9jaXJjbGVSYWRpdXMgKyAxMDtcclxuICAgIHRleHRTcHIuZGF0YSA9IHt9XHJcbiAgICB0ZXh0U3ByLmRhdGEudGV4dCA9IG5hbWVcclxuICAgIGNpcmNsZU4uYWRkU3ByaXRlKHRleHRTcHIpO1xyXG5cclxuICAgIHRoaXMuX2NOb2Rlcy5wdXNoKGNpcmNsZU4pXHJcblxyXG4gICAgcmV0dXJuIGNpcmNsZU5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlTGluayhub2RlMTogSVNwcml0ZSB8IHVuZGVmaW5lZCwgbm9kZTI6IElTcHJpdGUgfCB1bmRlZmluZWQsIG5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IGxpbms6IElTcHJpdGUgPSBTcHJpdGVGYWN0b3J5LmNyZWF0ZVNwcml0ZShTcHJpdGVGYWN0b3J5LmNyZWF0ZVhMaW5lKCkpO1xyXG4gICAgbGluay5zdHJva2VTdHlsZSA9ICdncmVlbidcclxuICAgIGxpbmsubGluZVdpZHRoID0gNFxyXG4gICAgbGluay5kYXRhID0ge31cclxuICAgIGxpbmsuZGF0YS5mcm9tID0gbm9kZTFcclxuICAgIGxpbmsuZGF0YS50byA9IG5vZGUyXHJcbiAgICBsaW5rLnggPSAwXHJcbiAgICBsaW5rLnkgPSAwXHJcblxyXG4gICAgbGluay5tb3VzZUV2ZW50ID0gdGhpcy5oYW5kbGVMaW5rRXZlbnQuYmluZCh0aGlzKVxyXG5cclxuICAgIGxldCBsaW5rTiA9IG5ldyBTcHJpdGVOb2RlKGxpbmspXHJcblxyXG4gICAgbGV0IGFycm93OiBJU3ByaXRlID0gU3ByaXRlRmFjdG9yeS5jcmVhdGVTcHJpdGUodGhpcy5fYXJyb3dTaGFwKVxyXG4gICAgYXJyb3cuZmlsbFN0eWxlID0gJ2JsdWUnXHJcbiAgICBsaW5rTi5hZGRTcHJpdGUoYXJyb3cpO1xyXG5cclxuICAgIGxldCB0ZXh0U3ByOiBJU3ByaXRlID0gbmV3IFNwcml0ZTJEKG5ldyBMbmlrVGV4dFNoYXAoKSwgJ0xuaWtUZXh0U3ByJylcclxuICAgIHRleHRTcHIuc2hvd0Nvb3JkU3lzdGVtID0gZmFsc2VcclxuICAgIHRleHRTcHIueCA9IDBcclxuICAgIHRleHRTcHIueSA9IDA7XHJcbiAgICB0ZXh0U3ByLmRhdGEgPSB7fVxyXG4gICAgdGV4dFNwci5kYXRhLnRleHQgPSBuYW1lXHJcbiAgICBsaW5rTi5hZGRTcHJpdGUodGV4dFNwcik7XHJcblxyXG4gICAgbGV0IG5ld0dyb3VwID0gIG5ldyBTcHJpdGVOb2RlR3JvdXAoe30pXHJcbiAgICBuZXdHcm91cC5wYXJhbXMuZnJvbSA9IG5vZGUxXHJcbiAgICBuZXdHcm91cC5wYXJhbXMudG8gPSBub2RlMlxyXG4gICAgbGV0IHNhbWVHcm91cDogU3ByaXRlTm9kZUdyb3VwIHwgbnVsbCAgPSB0aGlzLmdldFNhbWVMaW5rR3JvdXAobmV3R3JvdXApXHJcblxyXG4gICAgLy8g5aaC5p6c5bey57uP5a2Y5Zyo55u45ZCM55qEZ3JvdXDvvIzliJnmlL7liLDmraRncm91cOS4re+8jOWQpuWImeaWsOW7uuS4gOS4qmdyb3Vw77yM5YaN5L2c5Li65pawZ3JvdXDnmoTlrZDpm4ZcclxuICAgIGlmKCFzYW1lR3JvdXApIHtcclxuICAgICAgbmV3R3JvdXAuYWRkQ2hpbGQobGlua04pXHJcbiAgICAgIHRoaXMuX2xpbmtOb2Rlcy5wdXNoKGxpbmtOKVxyXG4gICAgICB0aGlzLl9saW5rR3JvdXBzLnB1c2gobmV3R3JvdXApXHJcbiAgICAgIGlmKG5ld0dyb3VwLnNwcml0ZSkge1xyXG4gICAgICAgIG5ld0dyb3VwLnNwcml0ZS51cGRhdGVFdmVudCA9IHRoaXMuaGFuZGxlTGlua0dyb3VwVXBkYXRlLmJpbmQodGhpcylcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2FtZUdyb3VwLmFkZENoaWxkKGxpbmtOKVxyXG4gICAgICB0aGlzLl9saW5rTm9kZXMucHVzaChsaW5rTilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U2FtZUxpbmtHcm91cCAobGlua0dyb3VwOiBTcHJpdGVOb2RlR3JvdXApIDogU3ByaXRlTm9kZUdyb3VwIHwgbnVsbCB7XHJcbiAgICBsZXQgbyA9IG51bGxcclxuICAgIHRoaXMuX2xpbmtHcm91cHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIChpdGVtLnBhcmFtcy5mcm9tID09PSBsaW5rR3JvdXAucGFyYW1zLmZyb20gJiYgIGl0ZW0ucGFyYW1zLnRvID09PSBsaW5rR3JvdXAucGFyYW1zLnRvKSB8fFxyXG4gICAgICAgIChpdGVtLnBhcmFtcy5mcm9tID09PSBsaW5rR3JvdXAucGFyYW1zLnRvICYmICBpdGVtLnBhcmFtcy50byA9PT0gbGlua0dyb3VwLnBhcmFtcy5mcm9tKVxyXG4gICAgICApIHtcclxuICAgICAgICBvID0gaXRlbVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIG9cclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGluaXQgKCk6IHZvaWQge1xyXG4gICAgbGV0IG5vZGUxOiBTcHJpdGVOb2RlID0gdGhpcy5jcmVhdGVDTm9kZShuZXcgdmVjMigxMjAsMTIwKSwgJ25vZGUxJyk7XHJcbiAgICBsZXQgbm9kZTI6IFNwcml0ZU5vZGUgPSB0aGlzLmNyZWF0ZUNOb2RlKG5ldyB2ZWMyKDMyMCwxMjApLCAnbm9kZTInKTtcclxuICAgIGxldCBub2RlMzogU3ByaXRlTm9kZSA9IHRoaXMuY3JlYXRlQ05vZGUobmV3IHZlYzIoMzIwLDQwMCksICdub2RlMycpO1xyXG4gICAgdGhpcy5jcmVhdGVMaW5rKG5vZGUxLnNwcml0ZSwgbm9kZTIuc3ByaXRlLCAnMS0+MicpO1xyXG4gICAgdGhpcy5jcmVhdGVMaW5rKG5vZGUyLnNwcml0ZSwgbm9kZTEuc3ByaXRlLCAnMi0+MScpO1xyXG4gICAgdGhpcy5jcmVhdGVMaW5rKG5vZGUyLnNwcml0ZSwgbm9kZTEuc3ByaXRlLCAnMi0+MScpO1xyXG4gICAgdGhpcy5jcmVhdGVMaW5rKG5vZGUyLnNwcml0ZSwgbm9kZTEuc3ByaXRlLCAnMi0+MScpO1xyXG4gICAgdGhpcy5jcmVhdGVMaW5rKG5vZGUxLnNwcml0ZSwgbm9kZTMuc3ByaXRlLCAnMS0+MycpO1xyXG4gICAgdGhpcy5jcmVhdGVMaW5rKG5vZGUyLnNwcml0ZSwgbm9kZTMuc3ByaXRlLCAnMi0+MycpO1xyXG4gICAgdGhpcy5jcmVhdGVMaW5rKG5vZGUyLnNwcml0ZSwgbm9kZTMuc3ByaXRlLCAnMi0+MycpO1xyXG4gICAgXHJcblxyXG4gICAgbGV0IHJvb3QgPSB0aGlzLl9hcHAucm9vdENvbnRhaW5lciBhcyBTcHJpdGVOb2RlXHJcbiAgICB0aGlzLl9saW5rR3JvdXBzLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgIHJvb3QuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX2NOb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICByb290LmFkZENoaWxkKG5vZGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVDaXJjbGVFdmVudCAoc3ByOiBJU3ByaXRlLCBldnQ6IENhbnZhc01vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIC8vY29uc29sZS5sb2coJ2hhbmRsZUNpcmNsZUV2ZW50Jywgc3ByKVxyXG4gICAgaWYgKGV2dC50eXBlID09PSBFSW5wdXRFdmVudFR5cGUuTU9VU0VEUkFHICkge1xyXG4gICAgICBsZXQgcm9vdCA9IHRoaXMuX2FwcC5yb290Q29udGFpbmVyIGFzIFNwcml0ZU5vZGVcclxuICAgICAgaWYgKHJvb3Quc3ByaXRlKSB7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gbmV3IHZlYzIoZXZ0LmNhbnZhc1Bvc2l0aW9uLngsIGV2dC5jYW52YXNQb3NpdGlvbi55KVxyXG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IE1hdGgyRCAuIHRyYW5zZm9ybSAoIHJvb3Quc3ByaXRlLmdldExvY2FsTWF0cml4KCkgLCBwb3NpdGlvbikgOyAvLyDmiorpvKDmoIfnmoTlnZDmoIfnlKjmoLlzcHJpdGXnmoTlsYDpg6jnn6npmLXov5vooYzovazmjaJcclxuXHJcbiAgICAgICAgc3ByLnggPSBuZXdQb3NpdGlvbiAuIHhcclxuICAgICAgICBzcHIueSA9IG5ld1Bvc2l0aW9uIC4geVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUxpbmtFdmVudCAoc3ByOiBJU3ByaXRlLCBldnQ6IENhbnZhc01vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdoYW5kbGVMaW5rRXZlbnQnLCBzcHIpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUxpbmtHcm91cFVwZGF0ZSAoc3ByIDogSVNwcml0ZSAsIG1lc2MgOiBudW1iZXIsIGRpZmZTZWMgOiBudW1iZXIgLCB0cmF2ZWxPcmRlciA6IEVPcmRlcik6IHZvaWQge1xyXG4gICAgbGV0IGxpbmtHcm91cCA9IHNwci5vd25lciBhcyBTcHJpdGVOb2RlR3JvdXBcclxuICAgIGxldCBjaGlsZHJlbiA9IGxpbmtHcm91cC5jaGlsZHJlblxyXG4gICAgbGV0IHB0MTogdmVjMiA9IG5ldyB2ZWMyKGxpbmtHcm91cC5wYXJhbXMuZnJvbS54LCBsaW5rR3JvdXAucGFyYW1zLmZyb20ueSlcclxuICAgIGxldCBwdDI6IHZlYzIgPSBuZXcgdmVjMihsaW5rR3JvdXAucGFyYW1zLnRvLngsIGxpbmtHcm91cC5wYXJhbXMudG8ueSlcclxuICAgIGxldCBkID0gTWF0aC5zcXJ0KChwdDIueSAtIHB0MS55KSAqIChwdDIueSAtIHB0MS55KSArIChwdDIueCAtIHB0MS54KSAqIChwdDIueCAtIHB0MS54KSlcclxuICAgIGxldCBsaW5rR3JvdXBBbmdsZSA9IHZlYzIuZ2V0T3JpZW50YXRpb24ocHQxLCBwdDIpXHJcbiAgICBpZihsaW5rR3JvdXAuc3ByaXRlKSB7XHJcbiAgICAgIGxpbmtHcm91cC5zcHJpdGUueCA9IHB0MS54XHJcbiAgICAgIGxpbmtHcm91cC5zcHJpdGUueSA9IHB0MS55XHJcbiAgICAgIGxpbmtHcm91cC5zcHJpdGUucm90YXRpb24gPSBsaW5rR3JvdXBBbmdsZVxyXG4gICAgfVxyXG4gICAgaWYoY2hpbGRyZW4pIHtcclxuICAgICAgbGV0IGNvdW50ID0gY2hpbGRyZW4ubGVuZ3RoXHJcbiAgICAgIGNoaWxkcmVuLmZvckVhY2goKGxpbmtOLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBsaW5rU3ByID0gKGxpbmtOIGFzIFNwcml0ZU5vZGUpLnNwcml0ZVxyXG4gICAgICAgIGlmKGxpbmtTcHIpe1xyXG4gICAgICAgICAgbGV0IGdhcCA9IHRoaXMuX2NpcmNsZVJhZGl1cyArIHRoaXMuX2xpbmtDaXJjbGVHYXBcclxuICAgICAgICAgIGxldCBsaW5lOiBMaW5lID0gbGlua1Nwci5zaGFwZSBhcyBMaW5lXHJcbiAgICAgICAgICBsaW5lIC4gc3RhcnQgPSB2ZWMyIC4gY3JlYXRlICggZ2FwICwgMCApIDtcclxuICAgICAgICAgIGxpbmUgLiBlbmQgPSAgdmVjMiAuIGNyZWF0ZSAoIGQgLSBnYXAgLCAwICkgO1xyXG4gICAgICAgICAgbGlua1Nwci55ID0gIHRoaXMuX3NhbWVMaW5rR2FwICogaW5kZXggKyAtICh0aGlzLl9zYW1lTGlua0dhcCAqIChjb3VudCAtIDEpKSAvIDJcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8g5q2kbGlua1NwcuWumuS5ieeahOaWueWQkeS4juWMheWQq+Wug+eahGxpbmtHcm91cOeahOaWueWQkeebuOWPje+8jOaJgOS7peatpGxpbmtTcHLopoHlj43lkJHnu5jliLZcclxuICAgICAgICAgIGlmKCBsaW5rU3ByLmRhdGEuZnJvbSAhPT0gIGxpbmtHcm91cC5wYXJhbXMuZnJvbSkge1xyXG4gICAgICAgICAgICBsaW5rU3ByLnJvdGF0aW9uID0gMTgwXHJcbiAgICAgICAgICAgIGxpbmtTcHIueCA9ICBkXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgbGV0IGFycm93Tm9kZSA9IGxpbmtOLmdldENoaWxkQXQoMCkgYXMgU3ByaXRlTm9kZVxyXG4gICAgICAgICAgaWYgKGFycm93Tm9kZSkge1xyXG4gICAgICAgICAgICBsZXQgYXJyb3cgPSBhcnJvd05vZGUuc3ByaXRlIGFzIFNwcml0ZTJEXHJcbiAgICAgICAgICAgIGFycm93LnggPSBkIC0gZ2FwIC0gNVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGxldCBsbmlrVGV4dE5vZGUgPSBsaW5rTi5nZXRDaGlsZEF0KDEpIGFzIFNwcml0ZU5vZGVcclxuICAgICAgICAgIGlmIChsbmlrVGV4dE5vZGUpIHtcclxuICAgICAgICAgICAgbGV0IGxuaWtUZXh0U3ByID0gbG5pa1RleHROb2RlLnNwcml0ZSBhcyBTcHJpdGUyRFxyXG4gICAgICAgICAgICBsbmlrVGV4dFNwci54ID0gZCAvIDJcclxuICAgICAgICAgICAgbG5pa1RleHRTcHIueSA9IDBcclxuICAgICAgICAgICAgLy8g5q2kbGlua1NwcuWumuS5ieeahOaWueWQkeS4juWMheWQq+Wug+eahGxpbmtHcm91cOeahOaWueWQkeebuOWPje+8jOaJgOS7peatpGxpbmtTcHLnp43nmoTmloflrZfkuZ/opoHlj43lkJHnu5jliLZcclxuICAgICAgICAgICAgaWYoIGxpbmtTcHIuZGF0YS5mcm9tICE9PSAgbGlua0dyb3VwLnBhcmFtcy5mcm9tKSB7XHJcbiAgICAgICAgICAgICAgbG5pa1RleHRTcHIuZGF0YS5pc1JldmVyc2UgPSB0cnVlIC8vIOS4uuWPjeWQkeaYvuekuueahGxpbmtTcHLmiZPmoIfor4ZcclxuICAgICAgICAgICAgICBsbmlrVGV4dFNwci5yb3RhdGlvbiA9IDE4MFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDnm67moIfoioLngrnlnKjnrKzkuozjgIHnrKzkuInosaHpmZDvvIzmloflrZfpnIDopoHlj43ovazvvIzlkKbliJnov57nur/kuK3nmoTmloflrZflgJLnnYDmmL7npLrkuI3mlrnkvr/nnItcclxuICAgICAgICAgICAgaWYoKGxpbmtHcm91cEFuZ2xlID4gOTAgJiYgbGlua0dyb3VwQW5nbGUgPCAxODApIHx8IChsaW5rR3JvdXBBbmdsZSA8PSAtOTAgJiYgbGlua0dyb3VwQW5nbGUgPj0gLTE4MCkpIHtcclxuICAgICAgICAgICAgICBpZihsbmlrVGV4dFNwci5kYXRhLmlzUmV2ZXJzZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbG5pa1RleHRTcHIucm90YXRpb24gPSAwIFxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsbmlrVGV4dFNwci5yb3RhdGlvbiA9IDE4MFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvL+S4jemcgOimgeWPjei9rFxyXG4gICAgICAgICAgICAgIGlmKGxuaWtUZXh0U3ByLmRhdGEuaXNSZXZlcnNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBsbmlrVGV4dFNwci5yb3RhdGlvbiA9IDE4MFxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsbmlrVGV4dFNwci5yb3RhdGlvbiA9IDBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbm5ldyB0b3BvbG9neUFwcGxpY2F0aW9uICggbmV3IFNwcml0ZTJEQXBwbGljYXRpb24gKCBjYW52YXMgLCB0cnVlICkgKSA7IiwiaW1wb3J0IHsgdmVjMiB9IGZyb20gXCIuL21hdGgyZFwiO1xyXG5leHBvcnQgZW51bSBFSW5wdXRFdmVudFR5cGUge1xyXG4gICAgTU9VU0VFVkVOVCxcclxuICAgIE1PVVNFRE9XTixcclxuICAgIE1PVVNFVVAsXHJcbiAgICBNT1VTRU1PVkUsXHJcbiAgICBNT1VTRURSQUcsXHJcbiAgICBLRVlCT0FSREVWRU5ULFxyXG4gICAgS0VZVVAsXHJcbiAgICBLRVlET1dOLFxyXG4gICAgS0VZUFJFU1NcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYW52YXNJbnB1dEV2ZW50IHtcclxuICAgIHB1YmxpYyBhbHRLZXk6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgY3RybEtleTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBzaGlmdEtleTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyB0eXBlOiBFSW5wdXRFdmVudFR5cGU7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IodHlwZTogRUlucHV0RXZlbnRUeXBlLCBhbHRLZXk6IGJvb2xlYW4gPSBmYWxzZSwgY3RybEtleTogYm9vbGVhbiA9IGZhbHNlLCBzaGlmdEtleTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5hbHRLZXkgPSBhbHRLZXk7XHJcbiAgICAgICAgdGhpcy5jdHJsS2V5ID0gY3RybEtleTtcclxuICAgICAgICB0aGlzLnNoaWZ0S2V5ID0gc2hpZnRLZXk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgVGltZXJDYWxsYmFjayA9IChpZDogbnVtYmVyLCBkYXRhOiBhbnkpID0+IHZvaWQ7XHJcblxyXG5cclxuY2xhc3MgVGltZXIge1xyXG4gICAgcHVibGljIGlkOiBudW1iZXIgPSAtMTtcclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrO1xyXG4gICAgcHVibGljIGNhbGxiYWNrRGF0YTogYW55ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIHB1YmxpYyBjb3VudGRvd246IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdGltZW91dDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBvbmx5T25jZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FudmFzTW91c2VFdmVudCBleHRlbmRzIENhbnZhc0lucHV0RXZlbnQge1xyXG4gICAgcHVibGljIGJ1dHRvbjogbnVtYmVyO1xyXG4gICAgcHVibGljIGNhbnZhc1Bvc2l0aW9uOiB2ZWMyO1xyXG5cclxuICAgIHB1YmxpYyBsb2NhbFBvc2l0aW9uOiB2ZWMyO1xyXG4gICAgcHVibGljIGhhc0xvY2FsUG9zaXRpb246IGJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHR5cGU6IEVJbnB1dEV2ZW50VHlwZSwgY2FudmFzUG9zOiB2ZWMyLCBidXR0b246IG51bWJlciwgYWx0S2V5OiBib29sZWFuID0gZmFsc2UsIGN0cmxLZXk6IGJvb2xlYW4gPSBmYWxzZSwgc2hpZnRLZXk6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIHN1cGVyKHR5cGUsIGFsdEtleSwgY3RybEtleSwgc2hpZnRLZXkpO1xyXG4gICAgICAgIHRoaXMuY2FudmFzUG9zaXRpb24gPSBjYW52YXNQb3M7XHJcbiAgICAgICAgdGhpcy5idXR0b24gPSBidXR0b247XHJcbiAgICAgICAgdGhpcy5oYXNMb2NhbFBvc2l0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb2NhbFBvc2l0aW9uID0gdmVjMi5jcmVhdGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENhbnZhc0tleUJvYXJkRXZlbnQgZXh0ZW5kcyBDYW52YXNJbnB1dEV2ZW50IHtcclxuICAgIHB1YmxpYyBrZXk6IHN0cmluZztcclxuICAgIHB1YmxpYyBrZXlDb2RlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVwZWF0OiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih0eXBlOiBFSW5wdXRFdmVudFR5cGUsIGtleTogc3RyaW5nLCBrZXlDb2RlOiBudW1iZXIsIHJlcGVhdDogYm9vbGVhbiwgYWx0S2V5OiBib29sZWFuID0gZmFsc2UsIGN0cmxLZXk6IGJvb2xlYW4gPSBmYWxzZSwgc2hpZnRLZXk6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIHN1cGVyKHR5cGUsIGFsdEtleSwgY3RybEtleSwgc2hpZnRLZXkpO1xyXG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gICAgICAgIHRoaXMua2V5Q29kZSA9IGtleUNvZGU7XHJcbiAgICAgICAgdGhpcy5yZXBlYXQgPSByZXBlYXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbiBpbXBsZW1lbnRzIEV2ZW50TGlzdGVuZXJPYmplY3Qge1xyXG5cclxuICAgIHB1YmxpYyB0aW1lcnM6IFRpbWVyW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIF90aW1lSWQ6IG51bWJlciA9IC0xO1xyXG5cclxuICAgIHByaXZhdGUgX2ZwczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuXHJcbiAgICBwdWJsaWMgaXNTdXBwb3J0TW91c2VNb3ZlOiBib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF9pc01vdXNlRG93bjogYm9vbGVhbjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX3N0YXJ0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgX3JlcXVlc3RJZDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9sYXN0VGltZSAhOiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgX3N0YXJ0VGltZSAhOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLl9pc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNTdXBwb3J0TW91c2VNb3ZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzUnVubmluZygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBmcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZwcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zdGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RUaW1lID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKG1zZWM6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwKG1zZWMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0ZXAodGltZVN0YW1wOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc3RhcnRUaW1lID09PSAtMSkgdGhpcy5fc3RhcnRUaW1lID0gdGltZVN0YW1wO1xyXG4gICAgICAgIGlmICh0aGlzLl9sYXN0VGltZSA9PT0gLTEpIHRoaXMuX2xhc3RUaW1lID0gdGltZVN0YW1wO1xyXG4gICAgICAgIGxldCBlbGFwc2VkTXNlYyA9IHRpbWVTdGFtcCAtIHRoaXMuX3N0YXJ0VGltZTtcclxuICAgICAgICBsZXQgaW50ZXJ2YWxTZWMgPSAodGltZVN0YW1wIC0gdGhpcy5fbGFzdFRpbWUpO1xyXG4gICAgICAgIGlmIChpbnRlcnZhbFNlYyAhPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcHMgPSAxMDAwLjAgLyBpbnRlcnZhbFNlYztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW50ZXJ2YWxTZWMgLz0gMTAwMC4wO1xyXG4gICAgICAgIHRoaXMuX2xhc3RUaW1lID0gdGltZVN0YW1wO1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZVRpbWVycyhpbnRlcnZhbFNlYyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoZWxhcHNlZE1zZWMsIGludGVydmFsU2VjKTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoZWxhcHNlZE1zZWM6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0ZXAoZWxhcHNlZE1zZWMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGFydCkge1xyXG4gICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9yZXF1ZXN0SWQpO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0VGltZSA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShlbGFwc2VkTXNlYzogbnVtYmVyLCBpbnRlcnZhbFNlYzogbnVtYmVyKTogdm9pZCB7IH1cclxuICAgIHB1YmxpYyByZW5kZXIoKTogdm9pZCB7IH1cclxuICAgIHB1YmxpYyBoYW5kbGVFdmVudChldnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoIChldnQudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwibW91c2Vkb3duXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc01vdXNlRG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoTW91c2VEb3duKHRoaXMuX3RvQ2FudmFzTW91c2VFdmVudChldnQsIEVJbnB1dEV2ZW50VHlwZS5NT1VTRURPV04pKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibW91c2V1cFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNb3VzZVVwKHRoaXMuX3RvQ2FudmFzTW91c2VFdmVudChldnQsIEVJbnB1dEV2ZW50VHlwZS5NT1VTRVVQKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1vdXNlbW92ZVwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdXBwb3J0TW91c2VNb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1vdXNlTW92ZSh0aGlzLl90b0NhbnZhc01vdXNlRXZlbnQoZXZ0LCBFSW5wdXRFdmVudFR5cGUuTU9VU0VNT1ZFKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNNb3VzZURvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoTW91c2VEcmFnKHRoaXMuX3RvQ2FudmFzTW91c2VFdmVudChldnQsIEVJbnB1dEV2ZW50VHlwZS5NT1VTRURSQUcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwia2V5cHJlc3NcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hLZXlQcmVzcyh0aGlzLl90b0NhbnZhc0tleUJvYXJkRXZlbnQoZXZ0LCBFSW5wdXRFdmVudFR5cGUuS0VZUFJFU1MpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwia2V5ZG93blwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEtleURvd24odGhpcy5fdG9DYW52YXNLZXlCb2FyZEV2ZW50KGV2dCwgRUlucHV0RXZlbnRUeXBlLktFWURPV04pKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwia2V5dXBcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hLZXlVcCh0aGlzLl90b0NhbnZhc0tleUJvYXJkRXZlbnQoZXZ0LCBFSW5wdXRFdmVudFR5cGUuS0VZVVApKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hNb3VzZURvd24oZXZ0OiBDYW52YXNNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkaXNwYXRjaE1vdXNlVXAoZXZ0OiBDYW52YXNNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkaXNwYXRjaE1vdXNlTW92ZShldnQ6IENhbnZhc01vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRpc3BhdGNoTW91c2VEcmFnKGV2dDogQ2FudmFzTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hLZXlEb3duKGV2dDogQ2FudmFzS2V5Qm9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hLZXlVcChldnQ6IENhbnZhc0tleUJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRpc3BhdGNoS2V5UHJlc3MoZXZ0OiBDYW52YXNLZXlCb2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3ZpZXdwb3J0VG9DYW52YXNDb29yZGluYXRlKGV2dDogTW91c2VFdmVudCk6IHZlYzIge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbnZhcykge1xyXG4gICAgICAgICAgICBsZXQgcmVjdDogQ2xpZW50UmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoZXZ0LnR5cGUgPT09IFwibW91c2Vkb3duXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZSAuIGxvZyAoXCIgYm91bmRpbmdDbGllbnRSZWN0IDogXCIgKyBKU09OIC4gc3RyaW5naWZ5ICggcmVjdCApICkgO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlIC4gbG9nICggXCIgY2xpZW50WCA6IFwiICsgZXZ0IC4gY2xpZW50WCArIFwiIGNsaWVudFkgOiBcIiArIGV2dC5jbGllbnRZICkgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldnQudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyTGVmdFdpZHRoOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlclRvcFdpZHRoOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhZGRpbmdMZWZ0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhZGRpbmdUb3A6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVjbDogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGV2dC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0ck51bWJlcjogc3RyaW5nIHwgbnVsbCA9IGRlY2wuYm9yZGVyTGVmdFdpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdHJOdW1iZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXJMZWZ0V2lkdGggPSBwYXJzZUludChzdHJOdW1iZXIsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RyTnVtYmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyVG9wV2lkdGggPSBwYXJzZUludChzdHJOdW1iZXIsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzdHJOdW1iZXIgPSBkZWNsLnBhZGRpbmdMZWZ0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0ck51bWJlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0ID0gcGFyc2VJbnQoc3RyTnVtYmVyLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3RyTnVtYmVyID0gZGVjbC5wYWRkaW5nVG9wO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0ck51bWJlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3AgPSBwYXJzZUludChzdHJOdW1iZXIsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgeDogbnVtYmVyID0gZXZ0LmNsaWVudFggLSByZWN0LmxlZnQgLSBib3JkZXJMZWZ0V2lkdGggLSBwYWRkaW5nTGVmdDtcclxuICAgICAgICAgICAgICAgIGxldCB5OiBudW1iZXIgPSBldnQuY2xpZW50WSAtIHJlY3QudG9wIC0gYm9yZGVyVG9wV2lkdGggLSBwYWRkaW5nVG9wO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwb3M6IHZlYzIgPSB2ZWMyLmNyZWF0ZSh4LCB5KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LnR5cGUgPT09IFwibW91c2Vkb3duXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUgLiBsb2cgKCBcIiBib3JkZXJMZWZ0V2lkdGggOiBcIiArIGJvcmRlckxlZnRXaWR0aCArIFwiIGJvcmRlclRvcFdpZHRoIDogXCIgKyBib3JkZXJUb3BXaWR0aCApIDtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUgLiBsb2cgKCBcIiBwYWRkaW5nTGVmdCA6IFwiICsgcGFkZGluZ0xlZnQgKyBcIiBwYWRkaW5nVG9wIDogXCIgKyBwYWRkaW5nVG9wICkgO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZSAuIGxvZyAoIFwiIOWPmOaNouWQjueahGNhbnZhc1Bvc2l0aW9uIDogXCIgKyBwb3MgLiB0b1N0cmluZyggKSApIDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhbGVydChcImNhbnZhc+S4um51bGxcIik7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbnZhc+S4um51bGxcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbGVydChcImV2dCAuIHRhcmdldOS4um51bGxcIik7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZXZ0IC4gdGFyZ2V05Li6bnVsbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF90b0NhbnZhc01vdXNlRXZlbnQoZXZ0OiBFdmVudCwgdHlwZTogRUlucHV0RXZlbnRUeXBlKTogQ2FudmFzTW91c2VFdmVudCB7XHJcbiAgICAgICAgbGV0IGV2ZW50OiBNb3VzZUV2ZW50ID0gZXZ0IGFzIE1vdXNlRXZlbnQ7XHJcbiAgICAgICAgbGV0IG1vdXNlUG9zaXRpb246IHZlYzIgPSB0aGlzLl92aWV3cG9ydFRvQ2FudmFzQ29vcmRpbmF0ZShldmVudCk7XHJcbiAgICAgICAgbGV0IGNhbnZhc01vdXNlRXZlbnQ6IENhbnZhc01vdXNlRXZlbnQgPSBuZXcgQ2FudmFzTW91c2VFdmVudCh0eXBlLCBtb3VzZVBvc2l0aW9uLCBldmVudC5idXR0b24sIGV2ZW50LmFsdEtleSwgZXZlbnQuY3RybEtleSwgZXZlbnQuc2hpZnRLZXkpO1xyXG4gICAgICAgIHJldHVybiBjYW52YXNNb3VzZUV2ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3RvQ2FudmFzS2V5Qm9hcmRFdmVudChldnQ6IEV2ZW50LCB0eXBlOiBFSW5wdXRFdmVudFR5cGUpOiBDYW52YXNLZXlCb2FyZEV2ZW50IHtcclxuICAgICAgICBsZXQgZXZlbnQ6IEtleWJvYXJkRXZlbnQgPSBldnQgYXMgS2V5Ym9hcmRFdmVudDtcclxuICAgICAgICBsZXQgY2FudmFzS2V5Ym9hcmRFdmVudDogQ2FudmFzS2V5Qm9hcmRFdmVudCA9IG5ldyBDYW52YXNLZXlCb2FyZEV2ZW50KHR5cGUsIGV2ZW50LmtleSwgZXZlbnQua2V5Q29kZSwgZXZlbnQucmVwZWF0LCBldmVudC5hbHRLZXksIGV2ZW50LmN0cmxLZXksIGV2ZW50LnNoaWZ0S2V5KTtcclxuICAgICAgICByZXR1cm4gY2FudmFzS2V5Ym9hcmRFdmVudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkVGltZXIoY2FsbGJhY2s6IFRpbWVyQ2FsbGJhY2ssIHRpbWVvdXQ6IG51bWJlciA9IDEuMCwgb25seU9uY2U6IGJvb2xlYW4gPSBmYWxzZSwgZGF0YTogYW55ID0gdW5kZWZpbmVkKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgdGltZXI6IFRpbWVyXHJcbiAgICAgICAgbGV0IGZvdW5kOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRpbWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGltZXI6IFRpbWVyID0gdGhpcy50aW1lcnNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aW1lci5lbmFibGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGltZXIuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgICAgIHRpbWVyLmNhbGxiYWNrRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aW1lci50aW1lb3V0ID0gdGltZW91dDtcclxuICAgICAgICAgICAgICAgIHRpbWVyLmNvdW50ZG93biA9IHRpbWVvdXQ7XHJcbiAgICAgICAgICAgICAgICB0aW1lci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRpbWVyLm9ubHlPbmNlID0gb25seU9uY2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZXIuaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpbWVyID0gbmV3IFRpbWVyKGNhbGxiYWNrKTtcclxuICAgICAgICB0aW1lci5jYWxsYmFja0RhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRpbWVyLnRpbWVvdXQgPSB0aW1lb3V0O1xyXG4gICAgICAgIHRpbWVyLmNvdW50ZG93biA9IHRpbWVvdXQ7XHJcbiAgICAgICAgdGltZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGltZXIuaWQgPSArK3RoaXMuX3RpbWVJZDtcclxuICAgICAgICB0aW1lci5vbmx5T25jZSA9IG9ubHlPbmNlO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVycy5wdXNoKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gdGltZXIuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVRpbWVyKGlkOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgZm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGltZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyc1tpXS5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lcjogVGltZXIgPSB0aGlzLnRpbWVyc1tpXTtcclxuICAgICAgICAgICAgICAgIHRpbWVyLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9oYW5kbGVUaW1lcnMoaW50ZXJ2YWxTZWM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50aW1lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRpbWVyOiBUaW1lciA9IHRoaXMudGltZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAodGltZXIuZW5hYmxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRpbWVyLmNvdW50ZG93biAtPSBpbnRlcnZhbFNlYztcclxuICAgICAgICAgICAgaWYgKHRpbWVyLmNvdW50ZG93biA8IDAuMCkge1xyXG4gICAgICAgICAgICAgICAgdGltZXIuY2FsbGJhY2sodGltZXIuaWQsIHRpbWVyLmNhbGxiYWNrRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZXIub25seU9uY2UgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXIuY291bnRkb3duID0gdGltZXIudGltZW91dDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUaW1lcih0aW1lci5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYW52YXMyREFwcGxpY2F0aW9uIGV4dGVuZHMgQXBwbGljYXRpb24ge1xyXG4gICAgcHVibGljIGNvbnRleHQyRDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHwgbnVsbDtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgc3VwZXIoY2FudmFzKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQyRCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gZXhwb3J0IGNsYXNzIFdlYkdMQXBwbGljYXRpb24gZXh0ZW5kcyBBcHBsaWNhdGlvbiB7XHJcbi8vICAgICBwdWJsaWMgY29udGV4dDNEOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBudWxsO1xyXG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIGNvbnRleHRBdHRyaWJ1dGVzPzogV2ViR0xDb250ZXh0QXR0cmlidXRlcykge1xyXG4vLyAgICAgICAgIHN1cGVyKGNhbnZhcyk7XHJcbi8vICAgICAgICAgdGhpcy5jb250ZXh0M0QgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2xcIiwgY29udGV4dEF0dHJpYnV0ZXMpO1xyXG4vLyAgICAgICAgIGlmICh0aGlzLmNvbnRleHQzRCA9PT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICB0aGlzLmNvbnRleHQzRCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIiwgY29udGV4dEF0dHJpYnV0ZXMpO1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0M0QgPT09IG51bGwpIHtcclxuLy8gICAgICAgICAgICAgICAgIGFsZXJ0KFwiIOaXoOazleWIm+W7uldlYkdMUmVuZGVyaW5nQ29udGV4dOS4iuS4i+aWh+WvueixoSBcIik7XHJcbi8vICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIg5peg5rOV5Yib5bu6V2ViR0xSZW5kZXJpbmdDb250ZXh05LiK5LiL5paH5a+56LGhIFwiKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuIiwiaW1wb3J0IHsgSUVudW1lcmF0b3IgfSBmcm9tIFwiLi9JRW51bWVyYXRvclwiXHJcbmNvbnN0IEVQU0lMT04gOiBudW1iZXIgPSAwLjAwMDAxIDtcclxuY29uc3QgUGlCeTE4MCA6IG51bWJlciA9IDAuMDE3NDUzMjkyNTE5OTQzMjk1IDtcclxuZXhwb3J0IGNsYXNzIHZlYzIge1xyXG4gICAgcHVibGljIHZhbHVlcyA6IEZsb2F0MzJBcnJheSA7IFxyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIHggOiBudW1iZXIgPSAwICwgeSA6IG51bWJlciA9IDAgKSB7XHJcbiAgICAgICAgdGhpcyAuIHZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkgKCBbIHggLCB5IF0gKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nICggKSA6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiIFsgXCIgKyB0aGlzIC4gdmFsdWVzIFsgMCBdICsgXCIgLCBcIiArIHRoaXMgLiB2YWx1ZXMgWyAxIF0gKyBcIiBdIFwiIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHggKCApIDogbnVtYmVyIHsgcmV0dXJuIHRoaXMgLiB2YWx1ZXMgWyAwIF0gOyB9IFxyXG4gICAgcHVibGljIHNldCB4ICggeCA6IG51bWJlciApIHsgdGhpcyAuIHZhbHVlcyBbIDAgXSA9IHggOyB9XHJcblxyXG4gICAgcHVibGljIGdldCB5ICgpIDogbnVtYmVyIHsgcmV0dXJuIHRoaXMgLiB2YWx1ZXMgWyAxIF0gOyB9XHJcbiAgICBwdWJsaWMgc2V0IHkgKCB5IDogbnVtYmVyICkgeyB0aGlzIC4gdmFsdWVzIFsgMSBdID0geSA7IH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQgKCB4IDogbnVtYmVyID0gMCAsIHkgOiBudW1iZXIgKSA6IHZlYzIge1xyXG4gICAgICAgIHRoaXMudmFsdWVzWyAwIF0gPSB4IDtcclxuICAgICAgICB0aGlzLnZhbHVlc1sgMSBdID0geSA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcXVhbHMgKCB2ZWN0b3IgOiB2ZWMyICkgOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIE1hdGggLiBhYnMoIHRoaXMgLiB2YWx1ZXNbIDAgXSAtIHZlY3RvciAuIHZhbHVlcyBbIDAgXSApID4gRVBTSUxPTiApXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZSA7XHJcblxyXG4gICAgICAgIGlmICggTWF0aCAuIGFicyggdGhpcyAuIHZhbHVlc1sgMSBdIC0gdmVjdG9yLnZhbHVlc1sgMSBdICkgPiBFUFNJTE9OIClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWUgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZWdhdGl2ZSAoKSA6IHZlYzIge1xyXG4gICAgICAgIHRoaXMgLiB2YWx1ZXMgWyAwIF0gPSAtIHRoaXMgLiB2YWx1ZXMgWyAwIF0gO1xyXG4gICAgICAgIHRoaXMgLiB2YWx1ZXMgWyAxIF0gPSAtIHRoaXMgLiB2YWx1ZXMgWyAxIF0gO1xyXG4gICAgICAgIHJldHVybiB0aGlzIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNxdWFyZWRMZW5ndGggKCkgOiBudW1iZXIge1xyXG4gICAgICAgIGxldCB4ID0gdGhpcyAuIHZhbHVlcyBbIDAgXSA7XHJcbiAgICAgICAgbGV0IHkgPSB0aGlzIC4gdmFsdWVzIFsgMSBdIDtcclxuICAgICAgICByZXR1cm4gKCB4ICogeCArIHkgKiB5ICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbGVuZ3RoICgpIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KCB0aGlzIC4gc3F1YXJlZExlbmd0aCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbm9ybWFsaXplICgpIDogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbGVuIDogbnVtYmVyID0gdGhpcyAuIGxlbmd0aCA7XHJcbiAgICAgICAgaWYgKCBNYXRoMkQgLiBpc0VxdWFscyAoIGxlbiAsIDAgKSApIHtcclxuICAgICAgICAgICAgY29uc29sZSAuIGxvZyAoIFwiIHRoZSBsZW5ndGggPSAwIFwiKSA7XHJcbiAgICAgICAgICAgIHRoaXMgLiB2YWx1ZXMgWyAwIF0gPSAwIDtcclxuICAgICAgICAgICAgdGhpcyAuIHZhbHVlcyBbIDEgXSA9IDAgO1xyXG4gICAgICAgICAgICByZXR1cm4gMCA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIE1hdGgyRC5pc0VxdWFscyggbGVuICwgMSApICkge1xyXG4gICAgICAgICAgICBjb25zb2xlIC4gbG9nICggXCIgdGhlIGxlbmd0aCA9IDEgXCIpIDtcclxuICAgICAgICAgICAgcmV0dXJuIDEuMCA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzIC4gdmFsdWVzIFsgMCBdIC89IGxlbiA7XHJcbiAgICAgICAgdGhpcyAuIHZhbHVlcyBbIDEgXSAvPSBsZW4gO1xyXG4gICAgICAgIHJldHVybiBsZW4gO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlICggeCA6IG51bWJlciA9IDAgLCB5IDogbnVtYmVyID0gMCApIDogdmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyB2ZWMyKCB4ICwgeSApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkICggcmlnaHQgOiB2ZWMyICkgOiB2ZWMyIHtcclxuICAgICAgICB2ZWMyIC4gc3VtICggdGhpcyAsIHJpZ2h0ICwgdGhpcyApIDtcclxuICAgICAgICByZXR1cm4gdGhpcyA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzdW0gKCBsZWZ0IDogdmVjMiAsIHJpZ2h0IDogdmVjMiAsIHJlc3VsdCA6IHZlYzIgfCBudWxsID0gbnVsbCApIDogdmVjMiB7XHJcbiAgICAgICAgaWYgKCByZXN1bHQgPT09IG51bGwgKSByZXN1bHQgPSBuZXcgdmVjMiAoICkgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDAgXSA9IGxlZnQgLiB2YWx1ZXMgWyAwIF0gKyByaWdodCAuIHZhbHVlcyBbIDAgXSA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMSBdID0gbGVmdCAuIHZhbHVlcyBbIDEgXSArIHJpZ2h0IC4gdmFsdWVzIFsgMSBdIDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0IDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3Vic3RyYWN0ICggYW5vdGhlciA6IHZlYzIgKSA6IHZlYzIge1xyXG4gICAgICAgIHZlYzIgLiBkaWZmZXJlbmNlICggdGhpcyAsIGFub3RoZXIgLCB0aGlzICkgO1xyXG4gICAgICAgIHJldHVybiB0aGlzIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRpZmZlcmVuY2UgKCBlbmQgOiB2ZWMyICwgc3RhcnQgOiB2ZWMyICwgcmVzdWx0IDogdmVjMiB8IG51bGwgPSBudWxsICkgOiB2ZWMyIHtcclxuICAgICAgICBpZiAoIHJlc3VsdCA9PT0gbnVsbCApIHJlc3VsdCA9IG5ldyB2ZWMyICggKSA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMCBdID0gZW5kIC4gdmFsdWVzIFsgMCBdIC0gc3RhcnQgLiB2YWx1ZXMgWyAwIF0gO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDEgXSA9IGVuZCAuIHZhbHVlcyBbIDEgXSAtIHN0YXJ0IC4gdmFsdWVzIFsgMSBdIDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0IDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvcHkgKCBzcmMgOiB2ZWMyICwgcmVzdWx0IDogdmVjMiB8IG51bGwgPSBudWxsICkgOiB2ZWMyIHtcclxuICAgICAgICBpZiAoIHJlc3VsdCA9PT0gbnVsbCApIHJlc3VsdCA9IG5ldyB2ZWMyKCkgO1xyXG4gICAgICAgIHJlc3VsdC52YWx1ZXNbIDAgXSA9IHNyYy52YWx1ZXNbIDAgXSA7XHJcbiAgICAgICAgcmVzdWx0LnZhbHVlc1sgMSBdID0gc3JjLnZhbHVlc1sgMSBdIDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0IDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlICggZGlyZWN0aW9uIDogdmVjMiAsIHNjYWxhciA6IG51bWJlciAsIHJlc3VsdCA6IHZlYzIgfCBudWxsID0gbnVsbCApIDogdmVjMiB7XHJcbiAgICAgICAgaWYgKCByZXN1bHQgPT09IG51bGwgKSByZXN1bHQgPSBuZXcgdmVjMiAoICkgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDAgXSA9IGRpcmVjdGlvbiAuIHZhbHVlcyBbIDAgXSAqIHNjYWxhciA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMSBdID0gZGlyZWN0aW9uIC4gdmFsdWVzIFsgMSBdICogc2NhbGFyIDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0IDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlQWRkICggc3RhcnQgOiB2ZWMyICwgZGlyZWN0aW9uIDogdmVjMiAsIHNjYWxhciA6IG51bWJlciAsIHJlc3VsdCA6IHZlYzIgfCBudWxsID0gbnVsbCApIDogdmVjMiB7XHJcbiAgICAgICAgaWYgKCByZXN1bHQgPT09IG51bGwgKSByZXN1bHQgPSBuZXcgdmVjMigpIDtcclxuICAgICAgICB2ZWMyIC4gc2NhbGUgKCBkaXJlY3Rpb24gLCBzY2FsYXIgLCByZXN1bHQgKSA7XHJcbiAgICAgICAgcmV0dXJuIHZlYzIgLiBzdW0gKCBzdGFydCAsIHJlc3VsdCAsIHJlc3VsdCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVUb3dhcmRzICggc3RhcnQgOiB2ZWMyICwgZGlyZWN0aW9uIDogdmVjMiAsIHNjYWxhciA6IG51bWJlciAsIHJlc3VsdCA6IHZlYzIgfCBudWxsID0gbnVsbCApIDogdmVjMiB7XHJcbiAgICAgICAgaWYgKCByZXN1bHQgPT09IG51bGwgKSByZXN1bHQgPSBuZXcgdmVjMigpIDtcclxuICAgICAgICB2ZWMyIC4gc2NhbGUgKCBkaXJlY3Rpb24gLCBzY2FsYXIgLCByZXN1bHQgKSA7XHJcbiAgICAgICAgcmV0dXJuIHZlYzIuc3VtICggc3RhcnQgLCByZXN1bHQgLCByZXN1bHQgKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlubmVyUHJvZHVjdCAoIHJpZ2h0IDogdmVjMiApIDogbnVtYmVyIHtcclxuICAgICAgIHJldHVybiB2ZWMyIC4gZG90UHJvZHVjdCAoIHRoaXMgLCByaWdodCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRvdFByb2R1Y3QgKCBsZWZ0IDogdmVjMiAsIHJpZ2h0IDogdmVjMiApIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gbGVmdC52YWx1ZXNbIDAgXSAqIHJpZ2h0LnZhbHVlc1sgMCBdICsgbGVmdC52YWx1ZXNbIDEgXSAqIHJpZ2h0LnZhbHVlc1sgMSBdIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyb3NzUHJvZHVjdCAoIGxlZnQgOiB2ZWMyICwgcmlnaHQgOiB2ZWMyICkgOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBsZWZ0IC4geCAqIHJpZ2h0IC4geSAtIGxlZnQgLnkgKiByaWdodCAueCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRPcmllbnRhdGlvbiAoIGZyb20gOiB2ZWMyICwgdG8gOiB2ZWMyICwgaXNSYWRpYW4gOiBib29sZWFuID0gZmFsc2UgKSA6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGRpZmYgOiB2ZWMyID0gdmVjMiAuIGRpZmZlcmVuY2UgKCB0byAsIGZyb20gKSA7XHJcbiAgICAgICAgbGV0IHJhZGlhbiA9IE1hdGggLiBhdGFuMiAoIGRpZmYgLiB5ICwgZGlmZiAuIHggKSA7XHJcbiAgICAgICAgaWYgKCBpc1JhZGlhbiA9PT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgIHJhZGlhbiA9IE1hdGgyRCAuIHRvRGVncmVlICggcmFkaWFuICkgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmFkaWFuIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEFuZ2xlICggYSA6IHZlYzIgLCBiIDogdmVjMiAsIGlzUmFkaWFuIDogYm9vbGVhbiA9IGZhbHNlICkgOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBkb3QgOiBudW1iZXIgPSB2ZWMyIC4gZG90UHJvZHVjdCAoIGEgLCBiICkgO1xyXG4gICAgICAgIGxldCByYWRpYW4gOiBudW1iZXIgPSBNYXRoIC4gYWNvcyAoIGRvdCAvICggYSAuIGxlbmd0aCAqIGIgLiBsZW5ndGggKSApIDtcclxuICAgICAgICBpZiAoIGlzUmFkaWFuID09PSBmYWxzZSApIHtcclxuICAgICAgICAgICAgcmFkaWFuID0gTWF0aDJEIC4gdG9EZWdyZWUgKCByYWRpYW4gKSA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByYWRpYW4gO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY29zQW5nbGUgKCBhIDogdmVjMiAsIGIgOiB2ZWMyICwgbm9ybSA6IGJvb2xlYW4gPSBmYWxzZSApIDogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIG5vcm0gPT09IHRydWUgKSB7XHJcbiAgICAgICAgICAgIGEgLiBub3JtYWxpemUgKCApIDtcclxuICAgICAgICAgICAgYiAuIG5vcm1hbGl6ZSAoICkgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmVjMiAuIGRvdFByb2R1Y3QgKCBhICwgYiApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNpbkFuZ2xlICggYSA6IHZlYzIgLCBiIDogdmVjMiAsIG5vcm0gOiBib29sZWFuID0gZmFsc2UgKSA6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCBub3JtID09PSB0cnVlICkge1xyXG4gICAgICAgICAgICBhIC4gbm9ybWFsaXplICggKSA7XHJcbiAgICAgICAgICAgIGIgLiBub3JtYWxpemUgKCApIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICggYSAuIHggKiBiIC4geSAtIGIgLiB4ICogYSAuIHkgKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB6ZXJvID0gbmV3IHZlYzIoIDAgLCAwICkgO1xyXG4gICAgcHVibGljIHN0YXRpYyB4QXhpcyA9IG5ldyB2ZWMyKCAxICwgMCApIDtcclxuICAgIHB1YmxpYyBzdGF0aWMgeUF4aXMgPSBuZXcgdmVjMiggMCAsIDEgKSA7XHJcbiAgICBwdWJsaWMgc3RhdGljIG5YQXhpcyA9IG5ldyB2ZWMyICggLSAxICwgMCApIDtcclxuICAgIHB1YmxpYyBzdGF0aWMgbllBeGlzID0gbmV3IHZlYzIgKCAwICwgLSAxICkgO1xyXG4gICAgcHVibGljIHN0YXRpYyB0ZW1wID0gbmV3IHZlYzIoIDAgLCAwICkgO1xyXG4gICAgcHVibGljIHN0YXRpYyB0ZW1wMSA9IG5ldyB2ZWMyICggMCAsIDAgKSA7XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgdmVjMyB7XHJcbiAgICBwdWJsaWMgdmFsdWVzIDogRmxvYXQzMkFycmF5IDsgXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCB4IDogbnVtYmVyID0gMCAsIHkgOiBudW1iZXIgPSAwICwgeiA6IG51bWJlciA9IDAgKSB7XHJcbiAgICAgICAgdGhpcyAuIHZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkgKCBbIHggLCB5ICwgeiBdICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgeCAoICkgOiBudW1iZXIgeyByZXR1cm4gdGhpcyAuIHZhbHVlcyBbIDAgXSA7IH0gXHJcbiAgICBwdWJsaWMgc2V0IHggKCB4IDogbnVtYmVyICkgeyB0aGlzIC4gdmFsdWVzIFsgMCBdID0geCA7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHkgKCkgOiBudW1iZXIgeyByZXR1cm4gdGhpcyAuIHZhbHVlcyBbIDEgXSA7IH1cclxuICAgIHB1YmxpYyBzZXQgeSAoIHkgOiBudW1iZXIgKSB7IHRoaXMgLiB2YWx1ZXMgWyAxIF0gPSB5IDsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgeiAoKSA6IG51bWJlciB7IHJldHVybiB0aGlzIC4gdmFsdWVzIFsgMiBdIDsgfVxyXG4gICAgcHVibGljIHNldCB6ICggeiA6IG51bWJlciApIHsgdGhpcyAuIHZhbHVlcyBbIDIgXSA9IHogOyB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcm9zcyAoIHYxIDogdmVjMyAsIHYyIDogdmVjMyAsIG91dCA6IHZlYzMgfCBudWxsID0gbnVsbCApIDogdmVjMyB7XHJcbiAgICAgICAgaWYgKCBvdXQgPT09IG51bGwgKSBvdXQgPSBuZXcgdmVjMyAoICkgO1xyXG4gICAgICAgIG91dCAuIHggPSB2MSAuIHkgKiB2MiAuIHogLSB2MSAuIHogKiB2MiAueSA7XHJcbiAgICAgICAgb3V0IC4geSA9IHYxIC4geiAqIHYyIC4geCAtIHYxIC54ICogdjIgLiB6IDtcclxuICAgICAgICBvdXQgLiB6ID0gdjEgLiB4ICogdjIgLiB5IC0gdjEgLnkgKiB2MiAuIHggO1xyXG4gICAgICAgIHJldHVybiBvdXQgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZyAoICkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIiBbIFwiICsgdGhpcyAuIHZhbHVlcyBbIDAgXSArIFwiICwgXCIgKyB0aGlzIC4gdmFsdWVzIFsgMSBdICsgXCIgLCBcIiArIHRoaXMgLiB2YWx1ZXMgWyAyIF0gICsgXCIgXSBcIiA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBtYXQyZCB7XHJcbiAgICBwdWJsaWMgdmFsdWVzIDogRmxvYXQzMkFycmF5IDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCBhIDogbnVtYmVyID0gMSAsIGIgOiBudW1iZXIgPSAwICwgYyA6IG51bWJlciA9IDAgLCBkIDogbnVtYmVyID0gMSAsIHggOiBudW1iZXIgPSAwICwgeSA6IG51bWJlciA9IDAgKSB7XHJcbiAgICAgICAgdGhpcyAuIHZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoIFsgYSAsIGIgLCBjICwgZCAsIHggLCB5IF0gKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlkZW50aXR5ICgpIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcyAuIHZhbHVlcyBbIDAgXSA9IDEuMCA7XHJcbiAgICAgICAgdGhpcyAuIHZhbHVlcyBbIDEgXSA9IDAuMCA7XHJcbiAgICAgICAgdGhpcyAuIHZhbHVlcyBbIDIgXSA9IDAuMCA7XHJcbiAgICAgICAgdGhpcyAuIHZhbHVlcyBbIDMgXSA9IDEuMCA7XHJcbiAgICAgICAgdGhpcyAuIHZhbHVlcyBbIDQgXSA9IDAuMCA7XHJcbiAgICAgICAgdGhpcyAuIHZhbHVlcyBbIDUgXSA9IDAuMCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUgKCBhIDogbnVtYmVyID0gMSAsIGIgOiBudW1iZXIgPSAwICwgYyA6IG51bWJlciA9IDAgLCBkIDogbnVtYmVyID0gMSAsIHggOiBudW1iZXIgPSAwICwgeSA6IG51bWJlciA9IDAgKSA6IG1hdDJkIHtcclxuICAgICAgICByZXR1cm4gbmV3IG1hdDJkIChhICwgYiAsIGMgLCBkICwgeCAsIHkgKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB4QXhpcyAoICkgOiB2ZWMyIHtcclxuICAgICAgICByZXR1cm4gdmVjMiAuIGNyZWF0ZSAoIHRoaXMgLiB2YWx1ZXMgWyAwIF0gLCB0aGlzIC4gdmFsdWVzIFsgMSBdICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgeUF4aXMgKCApIDogdmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIHZlYzIgLiBjcmVhdGUgKCB0aGlzIC4gdmFsdWVzIFsgMiBdICwgdGhpcyAuIHZhbHVlcyBbIDMgXSApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG9yaWdpbiAoICkgOiB2ZWMyIHtcclxuICAgICAgICByZXR1cm4gdmVjMiAuIGNyZWF0ZSAoIHRoaXMgLiB2YWx1ZXMgWyA0IF0gLCB0aGlzIC4gdmFsdWVzIFsgNSBdIClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QW5nbGUgKCBpc1JhZGlhbiA6IGJvb2xlYW4gPSBmYWxzZSApIDogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYW5nbGUgOiBudW1iZXIgPSBNYXRoIC4gYXRhbjIgKCB0aGlzIC4gdmFsdWVzIFsgMSBdICwgdGhpcyAuIHZhbHVlcyBbIDAgXSApIDtcclxuICAgICAgICBpZiAoIGlzUmFkaWFuICkge1xyXG4gICAgICAgICAgICByZXR1cm4gYW5nbGUgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYW5nbGUgLyBQaUJ5MTgwIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvcHkgKCBzcmMgOiBtYXQyZCAsIHJlc3VsdCA6IG1hdDJkIHwgbnVsbCA9IG51bGwgKSA6IG1hdDJkIHtcclxuICAgICAgICBpZiAoIHJlc3VsdCA9PT0gbnVsbCApIHJlc3VsdCA9IG5ldyBtYXQyZCgpIDtcclxuICAgICAgICByZXN1bHQudmFsdWVzWyAwIF0gPSBzcmMudmFsdWVzWyAwIF0gO1xyXG4gICAgICAgIHJlc3VsdC52YWx1ZXNbIDEgXSA9IHNyYy52YWx1ZXNbIDEgXSA7XHJcbiAgICAgICAgcmVzdWx0LnZhbHVlc1sgMiBdID0gc3JjLnZhbHVlc1sgMiBdIDtcclxuICAgICAgICByZXN1bHQudmFsdWVzWyAzIF0gPSBzcmMudmFsdWVzWyAzIF0gO1xyXG4gICAgICAgIHJlc3VsdC52YWx1ZXNbIDQgXSA9IHNyYy52YWx1ZXNbIDQgXSA7XHJcbiAgICAgICAgcmVzdWx0LnZhbHVlc1sgNSBdID0gc3JjLnZhbHVlc1sgNSBdIDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0IDtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgbXVsdGlwbHkgKCBsZWZ0IDogbWF0MmQgLCByaWdodCA6IG1hdDJkICwgcmVzdWx0IDogbWF0MmQgfCBudWxsID0gbnVsbCApIDogbWF0MmQge1xyXG4gICAgICAgIGlmICggcmVzdWx0ID09PSBudWxsICkgcmVzdWx0ID0gbmV3IG1hdDJkKCkgO1xyXG5cclxuICAgICAgICBsZXQgYTAgOiBudW1iZXIgPSBsZWZ0IC4gdmFsdWVzIFsgMCBdIDtcclxuICAgICAgICBsZXQgYTEgOiBudW1iZXIgPSBsZWZ0IC4gdmFsdWVzIFsgMSBdIDtcclxuICAgICAgICBsZXQgYTIgOiBudW1iZXIgPSBsZWZ0IC4gdmFsdWVzIFsgMiBdIDtcclxuICAgICAgICBsZXQgYTMgOiBudW1iZXIgPSBsZWZ0IC4gdmFsdWVzIFsgMyBdIDtcclxuICAgICAgICBsZXQgYTQgOiBudW1iZXIgPSBsZWZ0IC4gdmFsdWVzIFsgNCBdIDtcclxuICAgICAgICBsZXQgYTUgOiBudW1iZXIgPSBsZWZ0IC4gdmFsdWVzIFsgNSBdIDtcclxuXHJcbiAgICAgICAgbGV0IGIwIDogbnVtYmVyID0gcmlnaHQgLiB2YWx1ZXMgWyAwIF0gO1xyXG4gICAgICAgIGxldCBiMSA6IG51bWJlciA9IHJpZ2h0IC4gdmFsdWVzIFsgMSBdIDtcclxuICAgICAgICBsZXQgYjIgOiBudW1iZXIgPSByaWdodCAuIHZhbHVlcyBbIDIgXSA7XHJcbiAgICAgICAgbGV0IGIzIDogbnVtYmVyID0gcmlnaHQgLiB2YWx1ZXMgWyAzIF0gO1xyXG4gICAgICAgIGxldCBiNCA6IG51bWJlciA9IHJpZ2h0IC4gdmFsdWVzIFsgNCBdIDtcclxuICAgICAgICBsZXQgYjUgOiBudW1iZXIgPSByaWdodCAuIHZhbHVlcyBbIDUgXSA7XHJcblxyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDAgXSA9IGEwICogYjAgKyBhMiAqIGIxIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyAxIF0gPSBhMSAqIGIwICsgYTMgKiBiMSA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMiBdID0gYTAgKiBiMiArIGEyICogYjMgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDMgXSA9IGExICogYjIgKyBhMyAqIGIzIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyA0IF0gPSBhMCAqIGI0ICsgYTIgKiBiNSArIGE0IDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyA1IF0gPSBhMSAqIGI0ICsgYTMgKiBiNSArIGE1IDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZXRlcm1pbmFudCAoIG1hdCA6IG1hdDJkICkgOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBtYXQgLiB2YWx1ZXMgWyAwIF0gKiBtYXQgLiB2YWx1ZXMgWyAzIF0gLSBtYXQgLiB2YWx1ZXMgWyAyIF0gKiBtYXQgLiB2YWx1ZXMgWyAxIF0gO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW52ZXJ0ICggc3JjIDogbWF0MmQgLCByZXN1bHQgOiBtYXQyZCApIDogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGRldCA6IG51bWJlciA9IG1hdDJkIC4gZGV0ZXJtaW5hbnQgKCBzcmMgKSA7XHJcblxyXG4gICAgICAgIGlmICggTWF0aDJEIC4gaXNFcXVhbHMgKGRldCAsIDAgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRldCA9IDEuMCAvIGRldCA7XHJcblxyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDAgXSA9IHNyYyAuIHZhbHVlcyBbIDMgXSAqIGRldCA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMSBdID0gLSBzcmMgLiB2YWx1ZXMgWyAxIF0gKiBkZXQgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDIgXSA9IC0gc3JjIC4gdmFsdWVzIFsgMiBdICogZGV0IDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyAzIF0gPSBzcmMgLiB2YWx1ZXMgWyAwIF0gKiBkZXQgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDQgXSA9ICggc3JjIC4gdmFsdWVzIFsgMiBdICogc3JjIC4gdmFsdWVzIFsgNSBdIC0gc3JjIC4gdmFsdWVzIFsgMyBdICogc3JjIC4gdmFsdWVzIFsgNCBdICkgKiBkZXQgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDUgXSA9ICggc3JjIC4gdmFsdWVzIFsgMSBdICogc3JjIC4gdmFsdWVzIFsgNCBdIC0gc3JjIC4gdmFsdWVzIFsgMCBdICogc3JjIC4gdmFsdWVzIFsgNSBdICkgKiBkZXQgO1xyXG4gICAgICAgIHJldHVybiB0cnVlIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1ha2VSb3RhdGlvbiAoIHJhZGlhbnMgOiBudW1iZXIgLCByZXN1bHQgOiBtYXQyZCB8IG51bGwgPSBudWxsKSA6IG1hdDJkIHtcclxuICAgICAgICBpZiAoIHJlc3VsdCA9PT0gbnVsbCApIHJlc3VsdCA9IG5ldyBtYXQyZCAoICkgO1xyXG4gICAgICAgIGxldCBzIDogbnVtYmVyID0gTWF0aCAuIHNpbiggcmFkaWFucyApICwgYyA6IG51bWJlciA9IE1hdGggLiBjb3MgKCByYWRpYW5zICkgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDAgXSA9IGMgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDEgXSA9IHMgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDIgXSA9IC1zIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyAzIF0gPSBjIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyA0IF0gPSAwIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyA1IF0gPSAwIDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0IDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25seVJvdGF0aW9uTWF0cml4SW52ZXJ0ICggKSA6IG1hdDJkIHtcclxuICAgICAgICBsZXQgcyA6IG51bWJlciA9IHRoaXMgLiB2YWx1ZXMgWyAxIF0gO1xyXG4gICAgICAgIHRoaXMgLiB2YWx1ZXMgWyAxIF0gPSB0aGlzIC4gdmFsdWVzIFsgMiBdIDtcclxuICAgICAgICB0aGlzIC4gdmFsdWVzIFsgMiBdID0gcyA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbWFrZVJvdGF0aW9uRnJvbVZlY3RvcnMgKCB2MSA6IHZlYzIgLCB2MiA6IHZlYzIgLCBub3JtIDogYm9vbGVhbiA9IGZhbHNlICwgcmVzdWx0IDogbWF0MmQgfCBudWxsID0gbnVsbCApIDogbWF0MmQge1xyXG4gICAgICAgIGlmICggcmVzdWx0ID09PSBudWxsICkgcmVzdWx0ID0gbmV3IG1hdDJkICggKSA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMCBdID0gdmVjMiAuIGNvc0FuZ2xlICggdjEgLCB2MiAsIG5vcm0gKSA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMSBdID0gdmVjMiAuIHNpbkFuZ2xlICggdjEgLCB2MiAsIG5vcm0gKSA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMiBdID0gLSB2ZWMyIC4gc2luQW5nbGUgKCB2MSAsIHYyICwgbm9ybSApIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyAzIF0gPSB2ZWMyIC4gY29zQW5nbGUgKCB2MSAsIHYyICwgbm9ybSApIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyA0IF0gPSAwIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyA1IF0gPSAwIDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0IDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1ha2VSZWZsZWN0aW9uICggYXhpcyA6IHZlYzIgLCByZXN1bHQgOiBtYXQyZCB8IG51bGwgPSBudWxsICkgOiBtYXQyZCB7XHJcbiAgICAgICAgaWYgKCByZXN1bHQgPT09IG51bGwgKSByZXN1bHQgPSBuZXcgbWF0MmQgKCApIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyAwIF0gPSAxIC0gMiAqIGF4aXMgLiB4ICogYXhpcyAuIHggO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDEgXSA9IC0gMiAqIGF4aXMgLiB4ICogYXhpcyAuIHkgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDIgXSA9IC0gMiAqIGF4aXMgLiB4ICogYXhpcyAuIHkgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDMgXSA9IDEgLSAyICogYXhpcyAuIHkgKiBheGlzIC4geSA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgNCBdID0gMCA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgNSBdID0gMCA7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBtYWtlWFNrZXcgKCBzeCA6IG51bWJlciAsIHJlc3VsdCA6IG1hdDJkIHwgbnVsbCA9IG51bGwgKSA6IG1hdDJkIHtcclxuICAgICAgICBpZiAoIHJlc3VsdCA9PT0gbnVsbCApIHJlc3VsdCA9IG5ldyBtYXQyZCAoICkgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDAgXSA9IDEgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDEgXSA9IDAgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDIgXSA9IHN4O1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDMgXSA9IDEgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDQgXSA9IDAgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDUgXSA9IDAgO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbWFrZVlTa2V3ICggc3kgOiBudW1iZXIgLCByZXN1bHQgOiBtYXQyZCB8IG51bGwgPSBudWxsICkgOiBtYXQyZCB7XHJcbiAgICAgICAgaWYgKCByZXN1bHQgPT09IG51bGwgKSByZXN1bHQgPSBuZXcgbWF0MmQgKCApIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyAwIF0gPSAxIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyAxIF0gPSBzeSA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMiBdID0gMDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyAzIF0gPSAxIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyA0IF0gPSAwIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyA1IF0gPSAwIDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0IDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1ha2VUcmFuc2xhdGlvbiAoIHR4IDogbnVtYmVyICwgdHkgOiBudW1iZXIgLCByZXN1bHQgOiBtYXQyZCB8IG51bGwgPSBudWxsICApIDogbWF0MmQge1xyXG4gICAgICAgIGlmICggcmVzdWx0ID09PSBudWxsICkgcmVzdWx0ID0gbmV3IG1hdDJkICggKSA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMCBdID0gMSA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMSBdID0gMCA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMiBdID0gMCA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMyBdID0gMSA7XHJcbiAgXHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgNCBdID0gdHggO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDUgXSA9IHR5IDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0IDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1ha2VTY2FsZSAoIHN4IDogbnVtYmVyICwgc3kgOiBudW1iZXIgLCByZXN1bHQgOiBtYXQyZCB8IG51bGwgPSBudWxsICkgOiBtYXQyZCB7XHJcbiAgICAgICAgaWYgKCBNYXRoMkQgLiBpc0VxdWFscyAoIHN4ICwgMCApIHx8IE1hdGgyRCAuIGlzRXF1YWxzICggc3kgLCAwICkgKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0ICggXCIgeOi9tOaIlnnovbTnvKnmlL7ns7vmlbDkuLowIFwiICkgO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IgKCBcIiB46L205oiWeei9tOe8qeaUvuezu+aVsOS4ujAgXCIgKSA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHJlc3VsdCA9PT0gbnVsbCApIHJlc3VsdCA9IG5ldyBtYXQyZCgpIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyAwIF0gPSBzeCA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMSBdID0gMCA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMiBdID0gMCA7XHJcbiAgICAgICAgcmVzdWx0IC4gdmFsdWVzIFsgMyBdID0gc3kgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDQgXSA9IDAgO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDUgXSA9IDAgO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdGVtcDEgPSBtYXQyZC5jcmVhdGUgKCApIDtcclxuICAgIHB1YmxpYyBzdGF0aWMgdGVtcDIgPSBtYXQyZC5jcmVhdGUgKCApIDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcXVhZEJlemllckJhc2ljTWF0cml4ID0gbWF0MmQgLiBjcmVhdGUgKCAxICwgLTIgLCAtMiAsIDIgLCAxICwgMCkgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0cml4U3RhY2sge1xyXG4gICAgcHJpdmF0ZSBfbWF0cyA6IG1hdDJkIFsgXSA7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCApIHtcclxuICAgICAgICB0aGlzIC4gX21hdHMgPSBbIF0gOyBcclxuICAgICAgICB0aGlzIC4gX21hdHMgLiBwdXNoICggbmV3IG1hdDJkICggKSApIDsgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBtYXRyaXggKCApIDogbWF0MmQge1xyXG4gICAgICAgIGlmICggdGhpcyAuIF9tYXRzIC4gbGVuZ3RoID09PSAwICkge1xyXG4gICAgICAgICAgICBhbGVydCAoIFwiIOefqemYteWghuagiOS4uuepuiBcIiApIDtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yICggXCIg55+p6Zi15aCG5qCI5Li656m6IFwiICkgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBfbWF0cyBbIHRoaXMgLiBfbWF0cyAuIGxlbmd0aCAtIDEgXSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHB1c2hNYXRyaXggKCApIDogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1hdCA6IG1hdDJkID0gbWF0MmQgLiBjb3B5ICggdGhpcyAuIG1hdHJpeCApIDtcclxuICAgICAgICB0aGlzIC4gX21hdHMgLiBwdXNoICggbWF0ICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3BNYXRyaXggKCApIDogdm9pZCB7XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gX21hdHMgLiBsZW5ndGggPT09IDAgKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0ICggXCIg55+p6Zi15aCG5qCI5Li656m6IFwiICkgO1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzIC4gX21hdHMgLiBwb3AgKCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZElkZW50aXR5ICggKSA6IHZvaWQge1xyXG4gICAgICAgIHRoaXMgLiBtYXRyaXggLiBpZGVudGl0eSAoICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkTWF0cml4ICggbWF0IDogbWF0MmQgKSA6IHZvaWQge1xyXG4gICAgICAgIG1hdDJkIC4gY29weSAoIG1hdCAsIHRoaXMgLiBtYXRyaXggKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG11bHRNYXRyaXggKCBtYXQgOiBtYXQyZCApIDogdm9pZCB7XHJcbiAgICAgICAgbWF0MmQgLiBtdWx0aXBseSAoIHRoaXMgLiBtYXRyaXggLCBtYXQgLCB0aGlzIC4gbWF0cml4ICkgOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJhbnNsYXRlICggeCA6IG51bWJlciA9IDAgLCB5IDogbnVtYmVyID0gMCApIDogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1hdCA6IG1hdDJkID0gbWF0MmQgLiBtYWtlVHJhbnNsYXRpb24gKCB4ICwgeSApIDtcclxuICAgICAgICB0aGlzIC4gbXVsdE1hdHJpeCAoIG1hdCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcm90YXRlICggZGVncmVlIDogbnVtYmVyID0gMCAsIGlzUmFkaWFuIDogYm9vbGVhbiA9IGZhbHNlICkgOiB2b2lkIHtcclxuICAgICAgICBpZiAoIGlzUmFkaWFuID09PSBmYWxzZSApIHtcclxuICAgICAgICAgICAgZGVncmVlID0gIE1hdGgyRCAuIHRvUmFkaWFuICggZGVncmVlICkgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWF0IDogbWF0MmQgPSBtYXQyZCAuIG1ha2VSb3RhdGlvbiAoIGRlZ3JlZSApIDtcclxuICAgICAgICB0aGlzIC4gbXVsdE1hdHJpeCAoIG1hdCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcm90YXRlRnJvbSAoIHYxIDogdmVjMiAsIHYyIDogdmVjMiAsIG5vcm0gOiBib29sZWFuID0gZmFsc2UgKSA6IHZvaWQge1xyXG4gICAgICAgIGxldCBtYXQgOiBtYXQyZCA9IG1hdDJkIC4gbWFrZVJvdGF0aW9uRnJvbVZlY3RvcnMgKCB2MSAsIHYyICwgbm9ybSApIDtcclxuICAgICAgICB0aGlzIC4gbXVsdE1hdHJpeCAoIG1hdCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2NhbGUgKCB4IDogbnVtYmVyID0gMS4wICAsIHkgOiBudW1iZXIgPSAxLjAgKSA6IHZvaWQge1xyXG4gICAgICAgIGxldCBtYXQgOiBtYXQyZCA9IG1hdDJkIC4gbWFrZVNjYWxlICggeCAsIHkgKSA7XHJcbiAgICAgICAgdGhpcyAuIG11bHRNYXRyaXggKCBtYXQgKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludmVydCAoICkgOiBtYXQyZCB7XHJcbiAgICAgICAgbGV0IHJldCA6IG1hdDJkID0gbmV3IG1hdDJkICggKSA7XHJcbiAgICAgICAgaWYgKCBtYXQyZCAuIGludmVydCAoIHRoaXMgLiBtYXRyaXggLCByZXQgKSA9PT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0ICggXCIg5aCG5qCI6aG26YOo55+p6Zi15Li65aWH5byC55+p6Zi177yM5peg5rOV5rGC6YCGIFwiICkgO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IgKCBcIiDloIbmoIjpobbpg6jnn6npmLXkuLrlpYflvILnn6npmLXvvIzml6Dms5XmsYLpgIYgXCIgKSA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQgO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBNYXRoMkQge1xyXG4gICAgcHVibGljIHN0YXRpYyB0b1JhZGlhbiAoIGRlZ3JlZSA6IG51bWJlciApIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gZGVncmVlICogUGlCeTE4MCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB0b0RlZ3JlZSAoIHJhZGlhbiA6IG51bWJlciApIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gcmFkaWFuIC8gUGlCeTE4MCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByYW5kb20gKCBmcm9tIDogbnVtYmVyICwgdG8gOiBudW1iZXIgKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGggLnJhbmRvbSAoICkgKiB0byAgKyBmcm9tIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFuZ2xlU3VidHJhY3QgKCBmcm9tIDogbnVtYmVyICwgdG8gOiBudW1iZXIgKSA6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGRpZmYgOiBudW1iZXIgPSB0byAtIGZyb20gO1xyXG4gICAgICAgIHdoaWxlICggZGlmZiA+IDE4MCApIHtcclxuICAgICAgICAgICAgZGlmZiAtPSAzNjAgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2hpbGUgKCBkaWZmIDwgLSAxODAgKSB7XHJcbiAgICAgICAgICAgIGRpZmYgKz0gMzYwIDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkaWZmIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzRXF1YWxzICggbGVmdCA6IG51bWJlciAsIHJpZ2h0IDogbnVtYmVyICwgZXNwaWxvbiA6IG51bWJlciA9IEVQU0lMT04gKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICggTWF0aCAuIGFicyAoIGxlZnQgLSByaWdodCApID49IEVQU0lMT04gKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZSA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFF1YWRyYXRpY0JlemllclBvc2l0aW9uICggc3RhcnQgOiBudW1iZXIgLCBjdHJsIDogbnVtYmVyICwgZW5kOiBudW1iZXIgLCB0IDogbnVtYmVyICkgOiBudW1iZXIge1xyXG4gICAgICAgIGlmICggdCA8IDAuMCB8fCB0ID4gMS4wICkge1xyXG4gICAgICAgICAgICBhbGVydCAoIFwiIHTnmoTlj5blgLzojIPlm7Tlv4XpobvkuLpbIDAgLCAxIF0gXCIgKSA7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciAoIFwiIHTnmoTlj5blgLzojIPlm7Tlv4XpobvkuLpbIDAgLCAxIF0gXCIgKSA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0MSA6IG51bWJlciA9IDEuMCAtIHQgO1xyXG4gICAgICAgIGxldCB0MiA6IG51bWJlciA9IHQxICogdDEgO1xyXG4gICAgICAgIHJldHVybiB0MiAqIHN0YXJ0ICsgMi4wICogdCAqIHQxICogY3RybCArIHQgKiB0ICogZW5kIDtcclxuICAgIH0gXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRRdWFkcmF0aWNCZXppZXJWZWN0b3IgKCBzdGFydCA6IHZlYzIgLCBjdHJsIDogdmVjMiAsIGVuZCA6IHZlYzIgLCB0IDogbnVtYmVyICwgcmVzdWx0IDogdmVjMiB8IG51bGwgPSBudWxsICkgOiB2ZWMyIHtcclxuICAgICAgICBpZiAoIHJlc3VsdCA9PT0gbnVsbCApIHJlc3VsdCA9IHZlYzIgLiBjcmVhdGUgKCApIDtcclxuICAgICAgICByZXN1bHQgLiB4ID0gTWF0aDJEIC4gZ2V0UXVhZHJhdGljQmV6aWVyUG9zaXRpb24gKCBzdGFydCAuIHggLCBjdHJsIC4geCAsIGVuZCAuIHggLCB0ICkgO1xyXG4gICAgICAgIHJlc3VsdCAuIHkgPSBNYXRoMkQgLiBnZXRRdWFkcmF0aWNCZXppZXJQb3NpdGlvbiAoIHN0YXJ0IC4geSAsIGN0cmwgLiB5ICwgZW5kIC4geSAsIHQgKSA7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA7IFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UXVhZHJhdGljQmV6aWVyTWF0ICggIHN0YXJ0IDogdmVjMiAsIGN0cmwgOiB2ZWMyICwgZW5kIDogdmVjMiAsIHQgOiBudW1iZXIgLCByZXN1bHQgOiB2ZWMyIHwgbnVsbCA9IG51bGwgKSA6IHZlYzIge1xyXG4gICAgICAgIGlmICggcmVzdWx0ID09PSBudWxsICkgcmVzdWx0ID0gdmVjMiAuIGNyZWF0ZSAoICkgO1xyXG4gICAgICAgICBcclxuICAgICAgICByZXR1cm4gcmVzdWx0IDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEN1YmljQmV6aWVyUG9zaXRpb24gKCBzdGFydCA6IG51bWJlciAsIGN0cmwwIDogbnVtYmVyICwgY3RybDEgOiBudW1iZXIgLCBlbmQgOiBudW1iZXIgLCB0IDogbnVtYmVyICkgOiBudW1iZXIge1xyXG4gICAgICAgIGlmICggdCA8IDAuMCB8fCB0ID4gMS4wICkge1xyXG4gICAgICAgICAgICBhbGVydCAoIFwiIHTnmoTlj5blgLzojIPlm7Tlv4XpobvkuLpbIDAgLCAxIF0gXCIgKSA7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciAoIFwiIHTnmoTlj5blgLzojIPlm7Tlv4XpobvkuLpbIDAgLCAxIF0gXCIgKSA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0MSA6IG51bWJlciA9ICggMS4wIC0gdCApIDtcclxuICAgICAgICBsZXQgdDIgOiBudW1iZXIgPSB0ICogdCA7XHJcbiAgICAgICAgbGV0IHQzIDogbnVtYmVyID0gdDIgKiB0IDtcclxuICAgICAgICByZXR1cm4gKCB0MSAqIHQxICogdDEgKSAqIHN0YXJ0ICsgMyAqIHQgKiAoIHQxICogdDEgKSAgKiBjdHJsMCArICAoIDMgKiB0MiAqIHQxICkgKiBjdHJsMSArIHQzICogZW5kIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEN1YmljQmV6aWVyVmVjdG9yICggc3RhcnQgOiB2ZWMyICwgY3RybDAgOiB2ZWMyICwgY3RybDEgOiB2ZWMyICwgZW5kIDogdmVjMiAsIHQgOiBudW1iZXIgLCByZXN1bHQgOiB2ZWMyIHwgbnVsbCA9IG51bGwgKSA6IHZlYzIge1xyXG4gICAgICAgIGlmICggcmVzdWx0ID09PSBudWxsICkgcmVzdWx0ID0gdmVjMiAuIGNyZWF0ZSAoICkgO1xyXG4gICAgICAgIHJlc3VsdCAuIHggPSBNYXRoMkQgLiBnZXRDdWJpY0JlemllclBvc2l0aW9uICggc3RhcnQgLiB4ICwgY3RybDAgLiB4ICwgY3RybDEgLiB4ICwgZW5kIC4geCAsIHQgKSA7XHJcbiAgICAgICAgcmVzdWx0IC4geSA9IE1hdGgyRCAuIGdldEN1YmljQmV6aWVyUG9zaXRpb24gKCBzdGFydCAuIHkgLCBjdHJsMCAuIHkgLCBjdHJsMSAuIHkgLCBlbmQgLiB5ICwgdCApIDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0IDsgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVRdWFkcmF0aWNCZXppZXJFbnVtZXJhdG9yICggc3RhcnQgOiB2ZWMyICwgY3RybCA6IHZlYzIgLCBlbmQgOiB2ZWMyICAsIHN0ZXBzIDogbnVtYmVyID0gMzAgKSA6IElCZXppZXJFbnVtZXJhdG9yIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJlemllckVudW1lcmF0b3IgKCBzdGFydCAsIGVuZCAsIGN0cmwgLCBudWxsICwgc3RlcHMgKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVDdWJpY0JlemllckVudW1lcmF0b3IgKCBzdGFydCA6IHZlYzIgLGN0cmwwIDogdmVjMiAsIGN0cmwxIDogdmVjMiAsIGVuZCA6IHZlYzIgICwgc3RlcHMgOiBudW1iZXIgPSAzMCApIDogSUJlemllckVudW1lcmF0b3Ige1xyXG4gICAgICAgIHJldHVybiBuZXcgQmV6aWVyRW51bWVyYXRvciAoIHN0YXJ0ICwgZW5kICwgY3RybDAgLCBjdHJsMSAsIHN0ZXBzICkgO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIHByb2plY3RQb2ludE9uTGluZVNlZ21lbnQgKCBwdCA6IHZlYzIgLCBzdGFydCA6IHZlYzIgLCBlbmQgOiB2ZWMyICwgY2xvc2VQb2ludCA6IHZlYzIgKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCB2MCA6IHZlYzIgPSB2ZWMyIC4gY3JlYXRlICggKSA7XHJcbiAgICAgICAgbGV0IHYxIDogdmVjMiA9IHZlYzIgLiBjcmVhdGUgKCApIDtcclxuICAgICAgICBsZXQgZCA6IG51bWJlciA9IDAgO1xyXG5cclxuICAgICAgICB2ZWMyIC4gZGlmZmVyZW5jZSAoIHB0ICwgc3RhcnQgLCB2MCApIDsgXHJcbiAgICAgICAgdmVjMiAuIGRpZmZlcmVuY2UgKCBlbmQgLCBzdGFydCAsIHYxICkgOyBcclxuICAgICAgICBkID0gdjEgLiBub3JtYWxpemUgKCApIDtcclxuXHJcbiAgICAgICAgbGV0IHQgOiBudW1iZXIgPSB2ZWMyIC4gZG90UHJvZHVjdCAoIHYwICwgdjEgKSA7IFxyXG4gICAgICAgIGlmICggdCA8IDAgKSB7XHJcbiAgICAgICAgICAgY2xvc2VQb2ludCAuIHggPSBzdGFydCAuIHggO1xyXG4gICAgICAgICAgIGNsb3NlUG9pbnQgLiB5ID0gc3RhcnQgLiB5IDtcclxuICAgICAgICAgICByZXR1cm4gZmFsc2UgO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHQgPiBkICkge1xyXG4gICAgICAgICAgICBjbG9zZVBvaW50IC4geCA9IGVuZCAuIHggO1xyXG4gICAgICAgICAgICBjbG9zZVBvaW50IC4geSA9IGVuZCAuIHkgO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2UgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZlYzIgLiBzY2FsZUFkZCAoIHN0YXJ0ICwgdjEgLCB0ICwgY2xvc2VQb2ludCApIDtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWUgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzUG9pbnRPbkxpbmVTZWdtZW50ICggcHQgOiB2ZWMyICwgc3RhcnQgOiB2ZWMyICwgZW5kIDogdmVjMiAsIHJhZGl1cyA6IG51bWJlciA9IDIgKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjbG9zZVB0IDogdmVjMiA9IHZlYzIgLiBjcmVhdGUgKCApIDtcclxuICAgICAgICBpZiAoIE1hdGgyRCAuIHByb2plY3RQb2ludE9uTGluZVNlZ21lbnQgKCBwdCAsIHN0YXJ0ICwgZW5kICwgY2xvc2VQdCApID09PSBmYWxzZSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGgyRCAuIGlzUG9pbnRJbkNpcmNsZSAoIHB0ICwgY2xvc2VQdCAsIHJhZGl1cyApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzUG9pbnRJbkNpcmNsZSAoIHB0IDogdmVjMiAsIGNlbnRlciA6IHZlYzIgLCByYWRpdXMgOiBudW1iZXIgKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBkaWZmIDogdmVjMiA9IHZlYzIgLiBkaWZmZXJlbmNlICggcHQgLCBjZW50ZXIgKSA7XHJcbiAgICAgICAgbGV0IGxlbjIgOiBudW1iZXIgPSBkaWZmIC4gc3F1YXJlZExlbmd0aCA7XHJcbiAgICAgICAgaWYgKCBsZW4yIDw9IHJhZGl1cyAqIHJhZGl1cyApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWUgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2UgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNQb2ludEluUmVjdCAoIHB0WCA6IG51bWJlciAsIHB0WSA6IG51bWJlciAsIHggOiBudW1iZXIgLCB5IDogbnVtYmVyICwgdyA6IG51bWJlciAsIGggOiBudW1iZXIgKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICggcHRYID49IHggJiYgcHRYIDw9IHggKyB3ICYmIHB0WSA+PSB5ICYmIHB0WSA8PSB5ICsgaCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWUgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2UgO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzUG9pbnRJbkVsbGlwc2UgKCBwdFggOiBudW1iZXIgLCBwdFkgOiBudW1iZXIgLCBjZW50ZXJYIDogbnVtYmVyICwgY2VudGVyWSA6IG51bWJlciAsIHJhZGl1c1ggOiBudW1iZXIgLCByYWRpdXNZIDogbnVtYmVyICkgOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgZGlmZlggPSBwdFggLSBjZW50ZXJYIDtcclxuICAgICAgICBsZXQgZGlmZlkgPSBwdFkgLSBjZW50ZXJZIDtcclxuICAgICAgICBsZXQgbiA6IG51bWJlciA9ICggZGlmZlggKiBkaWZmWCApIC8gKCByYWRpdXNYICogcmFkaXVzWCApICsgKCBkaWZmWSAqIGRpZmZZICkgLyAoIHJhZGl1c1kgKiByYWRpdXNZICkgO1xyXG4gICAgICAgIHJldHVybiBuIDw9IDEuMCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzaWduICggdjAgOiB2ZWMyICwgdjEgOiB2ZWMyICwgdjIgOiB2ZWMyICApIDogbnVtYmVyIHtcclxuICAgICAgICBsZXQgZTEgOiB2ZWMyID0gdmVjMiAuIGRpZmZlcmVuY2UgKCB2MCAsICB2MiApIDtcclxuICAgICAgICBsZXQgZTIgOiB2ZWMyID0gdmVjMiAuIGRpZmZlcmVuY2UgKCB2MSAsICB2MiApIDtcclxuICAgICAgICByZXR1cm4gdmVjMiAuIGNyb3NzUHJvZHVjdCAoIGUxICwgZTIgKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc1BvaW50SW5UcmlhbmdsZSAoIHB0IDogdmVjMiAsIHYwIDogdmVjMiAsIHYxIDogdmVjMiAsIHYyIDogdmVjMiApIHtcclxuICAgICAgICBsZXQgYjEgOiBib29sZWFuICA9IE1hdGgyRCAuIHNpZ24gKCB2MCAsIHYxICwgcHQgKSA8IDAuMCA7XHJcbiAgICAgICAgbGV0IGIyIDogYm9vbGVhbiA9IE1hdGgyRCAuIHNpZ24gKCAgdjEgLCB2MiAsIHB0ICkgPCAwLjAgO1xyXG4gICAgICAgIGxldCBiMyA6IGJvb2xlYW4gPSBNYXRoMkQgLiBzaWduICggIHYyICwgdjAgLCBwdCApIDwgMC4wIDtcclxuICAgICAgICByZXR1cm4gKCggYjEgPT09IGIyICkgJiYgKCBiMiA9PT0gYjMgKSApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzUG9pbnRJblBvbHlnb24gKCBwdCA6IHZlYzIgLCBwb2ludHMgOiB2ZWMyIFsgXSApIDogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCBwb2ludHMgLiBsZW5ndGggPCAzICkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2UgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKCBsZXQgaSA6IG51bWJlciA9IDIgOyBpIDwgIHBvaW50cyAuIGxlbmd0aCAgOyBpICsrICkge1xyXG4gICAgICAgICAgICBpZiAoIE1hdGgyRCAuIGlzUG9pbnRJblRyaWFuZ2xlICggIHB0ICwgIHBvaW50cyBbIDAgXSAsIHBvaW50cyBbIGkgLSAxIF0gLCAgcG9pbnRzIFsgaSBdICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzQ29udmV4ICggcG9pbnRzIDogdmVjMiBbIF0gKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBzaWduIDogYm9vbGVhbiA9IE1hdGgyRCAuIHNpZ24gKCBwb2ludHMgWyAwIF0gLCBwb2ludHMgWyAxIF0gLCBwb2ludHMgWyAyIF0gKSA8IDAgO1xyXG4gICAgICAgIGxldCBqIDogbnVtYmVyICwgayA6IG51bWJlciA7XHJcbiAgICAgICAgZm9yICggbGV0IGkgOiBudW1iZXIgPSAxIDsgaSA8IHBvaW50cyAuIGxlbmd0aCA7IGkgKysgKSB7XHJcbiAgICAgICAgICAgIGogPSAoaSArIDEpICUgcG9pbnRzIC4gbGVuZ3RoIDtcclxuICAgICAgICAgICAgayA9IChpICsgMikgJSBwb2ludHMgLiBsZW5ndGggO1xyXG4gICAgICAgICAgICBpZiAoIHNpZ24gIT09IE1hdGgyRCAuIHNpZ24gKCBwb2ludHMgWyBpIF0gLCBwb2ludHMgWyBqIF0gLCBwb2ludHMgWyBrIF0gKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWUgO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIHRyYW5zZm9ybSAoIG1hdCA6IG1hdDJkICwgcHQgOiB2ZWMyICwgcmVzdWx0IDogdmVjMiB8IG51bGwgPSBudWxsICkgOiB2ZWMyIHtcclxuICAgICAgICBpZiAoIHJlc3VsdCA9PT0gbnVsbCApIHJlc3VsdCA9IHZlYzIgLiBjcmVhdGUgKCApIDtcclxuICAgICAgICByZXN1bHQgLiB2YWx1ZXMgWyAwIF0gPSBtYXQgLiB2YWx1ZXMgWyAwIF0gKiBwdCAuIHZhbHVlcyBbIDAgXSArIG1hdCAuIHZhbHVlc1sgMiBdICogcHQgLiB2YWx1ZXMgWyAxIF0gKyBtYXQgLiB2YWx1ZXMgWyA0IF0gO1xyXG4gICAgICAgIHJlc3VsdCAuIHZhbHVlcyBbIDEgXSA9IG1hdCAuIHZhbHVlcyBbIDEgXSAqIHB0IC4gdmFsdWVzIFsgMCBdICsgbWF0IC4gdmFsdWVzWyAzIF0gKiBwdCAuIHZhbHVlc1sgMSBdICsgbWF0IC4gdmFsdWVzWyA1IF0gO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbWF0U3RhY2sgOiBNYXRyaXhTdGFjayAgPSBuZXcgTWF0cml4U3RhY2sgKCApIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpemUge1xyXG5cclxuICAgIHB1YmxpYyB2YWx1ZXMgOiBGbG9hdDMyQXJyYXkgO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIHcgOiBudW1iZXIgPSAxICwgaCA6IG51bWJlciA9IDEgKSB7XHJcbiAgICAgICAgdGhpcyAuIHZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkgKCBbIHcgLCBoIF0gKSA7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHdpZHRoICggdmFsdWUgOiBudW1iZXIgKSB7IHRoaXMgLiB2YWx1ZXMgWyAwIF0gPSB2YWx1ZSA7IH1cclxuICAgIGdldCB3aWR0aCAoICkgOiBudW1iZXIgeyByZXR1cm4gdGhpcyAuIHZhbHVlcyBbIDAgXSA7IH1cclxuXHJcbiAgICBzZXQgaGVpZ2h0ICggdmFsdWUgOiBudW1iZXIgKSB7IHRoaXMgLiB2YWx1ZXMgWyAxIF0gPSB2YWx1ZSA7IH1cclxuICAgIGdldCBoZWlnaHQgKCApIDogbnVtYmVyIHsgcmV0dXJuIHRoaXMgLiB2YWx1ZXMgWyAxIF0gOyB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUgKCB3IDogbnVtYmVyID0gMSAsIGggOiBudW1iZXIgPSAxICkgOiBTaXplIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNpemUgKCB3ICwgaCApIDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSB7XHJcbiAgICBwdWJsaWMgb3JpZ2luIDogdmVjMiA7XHJcbiAgICBwdWJsaWMgc2l6ZSA6IFNpemUgO1xyXG4gIFxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggb3JpZ24gOiB2ZWMyID0gbmV3IHZlYzIgKCApICwgc2l6ZSA6IFNpemUgPSBuZXcgU2l6ZSAoIDEgLCAxICkgKSB7XHJcbiAgICAgICAgdGhpcyAuIG9yaWdpbiA9IG9yaWduIDtcclxuICAgICAgICB0aGlzIC4gc2l6ZSA9ICBzaXplIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNFbXB0eSAoICkgOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYXJlYSA6IG51bWJlciA9IHRoaXMgLiBzaXplIC4gd2lkdGggKiB0aGlzIC4gc2l6ZSAuIGhlaWdodCA7XHJcbiAgICAgICAgaWYgKCBNYXRoMkQgLiBpc0VxdWFscyAoIGFyZWEgLCAwICkgPT09IHRydWUgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlIDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2UgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSAoIHggOiBudW1iZXIgPSAwICwgeSA6IG51bWJlciA9IDAgLCB3IDogbnVtYmVyID0gMSAsIGggOiBudW1iZXIgPSAxICkgOiBSZWN0YW5nbGUge1xyXG4gICAgICAgIGxldCBvcmlnaW4gOiB2ZWMyID0gbmV3IHZlYzIgKCB4ICwgeSApIDtcclxuICAgICAgICBsZXQgc2l6ZSA6IFNpemUgPSBuZXcgU2l6ZSAoIHcgLCBoICkgO1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlICggb3JpZ2luICwgc2l6ZSApIDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEluc2V0IHtcclxuICAgIHB1YmxpYyB2YWx1ZXMgOiBGbG9hdDMyQXJyYXkgO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIGwgOiBudW1iZXIgPSAwICwgdCA6IG51bWJlciA9IDAgLCByIDogbnVtYmVyID0gMCAsIGIgOiBudW1iZXIgPSAwICkge1xyXG4gICAgICAgIHRoaXMgLiB2YWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5ICggWyBsICwgdCAsIHIgLCBiIF0gKSA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgbGVmdE1hcmdpbiAoICkgOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzIC4gdmFsdWVzIFsgMCBdIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGxlZnRNYXJnaW4gKCB2YWx1ZSA6IG51bWJlciApICB7XHJcbiAgICAgICAgdGhpcyAuIHZhbHVlcyBbIDAgXSA9IHZhbHVlIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRvcE1hcmdpbiAoICkgOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzIC4gdmFsdWVzIFsgMSBdIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRvcE1hcmdpbiAoIHZhbHVlIDogbnVtYmVyICkgIHtcclxuICAgICAgICB0aGlzIC4gdmFsdWVzIFsgMSBdID0gdmFsdWUgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcmlnaHRNYXJnaW4gKCApIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcyAuIHZhbHVlcyBbIDIgXSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCByaWdodE1hcmdpbiAoIHZhbHVlIDogbnVtYmVyICkgIHtcclxuICAgICAgICB0aGlzIC4gdmFsdWVzIFsgMiBdID0gdmFsdWUgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYm90dG9tTWFyZ2luICggKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiB2YWx1ZXMgWyAzIF0gO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYm90dG9tTWFyZ2luICggdmFsdWUgOiBudW1iZXIgKSAge1xyXG4gICAgICAgIHRoaXMgLiB2YWx1ZXMgWyAzIF0gPSB2YWx1ZSA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm0yRCB7XHJcbiAgICBwdWJsaWMgcG9zaXRpb24gOiB2ZWMyIDsgICBcclxuICAgIHB1YmxpYyByb3RhdGlvbiA6IG51bWJlciA7IFxyXG4gICAgcHVibGljIHNjYWxlIDogdmVjMiA7IFxyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIHggOiBudW1iZXIgPSAwICwgeSA6IG51bWJlciA9IDAgLCByb3RhdGlvbiA6IG51bWJlciA9IDAgLCBzY2FsZVggOiBudW1iZXIgPSAxICwgc2NhbGVZIDogbnVtYmVyID0gMSApIHtcclxuICAgICAgICB0aGlzIC4gcG9zaXRpb24gPSBuZXcgdmVjMiggeCAsIHkgKSA7XHJcbiAgICAgICAgdGhpcyAuIHJvdGF0aW9uID0gcm90YXRpb24gO1xyXG4gICAgICAgIHRoaXMgLiBzY2FsZSA9IG5ldyB2ZWMyKCBzY2FsZVggLCBzY2FsZVkgKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvTWF0cml4ICgpIDogbWF0MmQge1xyXG4gICAgICAgIE1hdGgyRCAuIG1hdFN0YWNrIC4gbG9hZElkZW50aXR5ICggKSA7IFxyXG4gICAgICAgIE1hdGgyRCAuIG1hdFN0YWNrIC4gdHJhbnNsYXRlICggdGhpcyAuIHBvc2l0aW9uIC4geCAsIHRoaXMgLiBwb3NpdGlvbiAuIHkgKSA7IFxyXG4gICAgICAgIE1hdGgyRCAuIG1hdFN0YWNrIC4gcm90YXRlICggdGhpcyAuIHJvdGF0aW9uICwgZmFsc2UgKSA7IFxyXG4gICAgICAgIE1hdGgyRCAuIG1hdFN0YWNrIC4gc2NhbGUgKCB0aGlzIC4gc2NhbGUgLiB4ICwgdGhpcyAuIHNjYWxlIC4geSApIDsgXHJcbiAgICAgICAgcmV0dXJuIE1hdGgyRCAuIG1hdFN0YWNrIC4gbWF0cml4IDsgXHJcbiAgICB9IFxyXG5cclxuICAgIHB1YmxpYyB0b0ludk1hdHJpeCAoIHJlc3VsdCA6IG1hdDJkICkgOiBib29sZWFuIHsgXHJcbiAgICAgICAgbGV0IG1hdCA6IG1hdDJkID0gdGhpcyAuIHRvTWF0cml4ICggKSA7XHJcbiAgICAgICAgcmV0dXJuIG1hdDJkIC4gaW52ZXJ0ICggbWF0ICwgcmVzdWx0ICkgO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmV6aWVyRW51bWVyYXRvciBleHRlbmRzIElFbnVtZXJhdG9yIDwgdmVjMiA+IHtcclxuICAgIHN0ZXBzIDogbnVtYmVyIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJlemllckVudW1lcmF0b3IgaW1wbGVtZW50cyBJQmV6aWVyRW51bWVyYXRvciB7XHJcbiAgICBwcml2YXRlIF9zdGVwcyA6IG51bWJlciA7XHJcbiAgICBwcml2YXRlIF9pIDogbnVtYmVyIDsgXHJcbiAgICBwcml2YXRlIF9zdGFydEFuY2hvclBvaW50IDogdmVjMiA7XHJcbiAgICBwcml2YXRlIF9lbmRBbmNob3JQb2ludCA6IHZlYzIgO1xyXG4gICAgcHJpdmF0ZSBfY29udHJvbFBvaW50MCA6IHZlYzIgOyBcclxuICAgIHByaXZhdGUgX2NvbnRyb2xQb2ludDEgOiB2ZWMyIHwgbnVsbCA7IFxyXG4gICAgcHJpdmF0ZSBfY3VycmVudElkeCA6IG51bWJlciA7IFxyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIHN0YXJ0IDogdmVjMiAsIGVuZCA6IHZlYzIgLCBjb250cm9sMCA6IHZlYzIgLCBjb250cm9sMSA6IHZlYzIgfCBudWxsID0gbnVsbCAsIHN0ZXBzIDogbnVtYmVyID0gMzAgKSB7XHJcbiAgICAgICAgdGhpcyAuIF9zdGFydEFuY2hvclBvaW50ID0gc3RhcnQgO1xyXG4gICAgICAgIHRoaXMgLiBfZW5kQW5jaG9yUG9pbnQgPSBlbmQgO1xyXG4gICAgICAgIHRoaXMgLiBfY29udHJvbFBvaW50MCA9IGNvbnRyb2wwIDtcclxuICAgICAgICBpZiAoIGNvbnRyb2wxICE9PSBudWxsICkge1xyXG4gICAgICAgICAgICB0aGlzIC4gX2NvbnRyb2xQb2ludDEgPSBjb250cm9sMSA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcyAuIF9jb250cm9sUG9pbnQxID0gbnVsbCA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMgLiBfc3RlcHMgPSBzdGVwcyA7XHJcbiAgICAgICAgdGhpcyAuIF9pID0gMS4wIC8gKCB0aGlzIC4gX3N0ZXBzICkgO1xyXG4gICAgICAgIHRoaXMgLiBfY3VycmVudElkeCA9IC0xIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQgKCApIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcyAuIF9jdXJyZW50SWR4ID0gLSAxIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGN1cnJlbnQgKCApIDogdmVjMiB7XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gX2NvbnRyb2xQb2ludDEgIT09IG51bGwgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoMkQgLiBnZXRDdWJpY0JlemllclZlY3RvciAoIHRoaXMgLiBfc3RhcnRBbmNob3JQb2ludCAsIHRoaXMgLiBfY29udHJvbFBvaW50MCAsIHRoaXMgLiBfY29udHJvbFBvaW50MSAsIHRoaXMgLiBfZW5kQW5jaG9yUG9pbnQgLCB0aGlzIC4gX2N1cnJlbnRJZHggKiB0aGlzIC4gX2kgKSA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgyRCAuIGdldFF1YWRyYXRpY0JlemllclZlY3RvciAoIHRoaXMgLiBfc3RhcnRBbmNob3JQb2ludCAsIHRoaXMgLiBfY29udHJvbFBvaW50MCAsIHRoaXMgLiBfZW5kQW5jaG9yUG9pbnQgLCB0aGlzIC4gX2N1cnJlbnRJZHggKiB0aGlzIC4gX2kgKSA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlTmV4dCAoICkgOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLl9jdXJyZW50SWR4ICsrIDtcclxuICAgICAgICByZXR1cm4gdGhpcyAuIF9jdXJyZW50SWR4IDwgdGhpcyAuIF9zdGVwcyA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdGVwcyAoICkgOiBudW1iZXIge1xyXG4gICAgICAgIHRoaXMgLiBfaSA9IDEuMCAvICggdGhpcyAuIF9zdGVwcyApIDtcclxuICAgICAgICByZXR1cm4gdGhpcyAuIF9zdGVwcyA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzdGVwcyAoIHN0ZXBzIDogbnVtYmVyICkge1xyXG4gICAgICAgIHRoaXMgLiBfc3RlcHMgPSBzdGVwcyA7XHJcbiAgICAgICAgdGhpcyAuIHJlc2V0ICggKSA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBRdWFkcmF0aWNCZXppZXJFbnVtZXJhdG9yIGltcGxlbWVudHMgSUJlemllckVudW1lcmF0b3Ige1xyXG4gICAgcHJpdmF0ZSBfc3RlcHMgOiBudW1iZXIgO1xyXG4gICAgcHJpdmF0ZSBfaSAhIDogbnVtYmVyIDtcclxuICAgIHByaXZhdGUgX3N0YXJ0QW5jaG9yUG9pbnQgOiB2ZWMyIDtcclxuICAgIHByaXZhdGUgX2VuZEFuY2hvclBvaW50IDogdmVjMiA7XHJcbiAgICBwcml2YXRlIF9jb250cm9sUG9pbnQwIDogdmVjMiA7IFxyXG4gICAgcHJpdmF0ZSBfY3VycmVudElkeCA6IG51bWJlciA7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggc3RhcnQgOiB2ZWMyICwgZW5kIDogdmVjMiAsIGNvbnRyb2wwIDogdmVjMiAsIHN0ZXBzIDogbnVtYmVyID0gMzAgKSB7XHJcbiAgICAgICAgdGhpcyAuIF9zdGFydEFuY2hvclBvaW50ID0gc3RhcnQgO1xyXG4gICAgICAgIHRoaXMgLiBfZW5kQW5jaG9yUG9pbnQgPSBlbmQgO1xyXG4gICAgICAgIHRoaXMgLiBfY29udHJvbFBvaW50MCA9IGNvbnRyb2wwIDtcclxuICAgICAgICB0aGlzIC4gX3N0ZXBzID0gc3RlcHMgO1xyXG4gICAgICAgIHRoaXMgLiBfaSA9IDEuMCAvICggdGhpcyAuIF9zdGVwcyApIDtcclxuICAgICAgICB0aGlzIC4gX2N1cnJlbnRJZHggPSAtMSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0ICggKSA6IHZvaWQge1xyXG4gICAgICAgIHRoaXMgLiBfY3VycmVudElkeCA9IC0gMSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjdXJyZW50ICggKSA6IHZlYzIge1xyXG4gICAgICAgIGxldCB0IDogbnVtYmVyID0gdGhpcyAuIF9jdXJyZW50SWR4ICogdGhpcyAuIF9pIDtcclxuICAgICAgICBsZXQgcmV0IDogdmVjMiA9IHZlYzIgLiBjcmVhdGUgKCB0ICogdCAsIHQgKSA7XHJcbiAgICAgICAgTWF0aDJEIC4gdHJhbnNmb3JtICggbWF0MmQgLiBxdWFkQmV6aWVyQmFzaWNNYXRyaXggLCByZXQgLCByZXQgKSA7XHJcbiAgICAgICAgcmV0IC4geCA9IHRoaXMgLiBfc3RhcnRBbmNob3JQb2ludCAuIHggKiByZXQgLiB4ICsgdGhpcyAuIF9jb250cm9sUG9pbnQwIC4geCAqIHJldCAuIHkgKyB0aGlzIC4gX2VuZEFuY2hvclBvaW50IC4geCA7XHJcbiAgICAgICAgcmV0IC4geSA9IHRoaXMgLiBfc3RhcnRBbmNob3JQb2ludCAuIHkgKiByZXQgLiB4ICsgdGhpcyAuIF9jb250cm9sUG9pbnQwIC4geSAqIHJldCAuIHkgKyB0aGlzIC4gX2VuZEFuY2hvclBvaW50IC4geSA7XHJcbiAgICAgICAgcmV0dXJuIHJldCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVOZXh0ICggKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRJZHggKysgO1xyXG4gICAgICAgIHJldHVybiB0aGlzIC4gX2N1cnJlbnRJZHggPCB0aGlzIC4gX3N0ZXBzIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN0ZXBzICggKSA6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcyAuIF9pID0gMS4wIC8gKCB0aGlzIC4gX3N0ZXBzICkgO1xyXG4gICAgICAgIHJldHVybiB0aGlzIC4gX3N0ZXBzIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHN0ZXBzICggc3RlcHMgOiBudW1iZXIgKSB7XHJcbiAgICAgICAgdGhpcyAuIF9zdGVwcyA9IHN0ZXBzIDtcclxuICAgICAgICB0aGlzIC4gcmVzZXQgKCApIDtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBtYXQyZCAsIHZlYzIgLCBJbnNldCB9IGZyb20gXCIuLi9tYXRoMmRcIjtcclxuaW1wb3J0IHsgQ2FudmFzTW91c2VFdmVudCAsIENhbnZhc0tleUJvYXJkRXZlbnQgfSBmcm9tIFwiLi4vYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgUmVjdCwgQ2lyY2xlLCBHcmlkLCBFbGxpcHNlICwgTGluZSAgLCBDb252ZXhQb2x5Z29uICwgU2NhbGU5R3JpZCAsIEJvbmUgLCBCZXppZXJQYXRoICwgRW5kQ2xpcFNoYXBlIH0gZnJvbSBcIi4vc2hhcGVzXCI7XHJcbmltcG9ydCB7IFNwcml0ZTJEIH0gZnJvbSBcIi4vc3ByaXRlMmRcIjtcclxuXHJcbmV4cG9ydCBlbnVtIEVSZW5kZXJUeXBlIHtcclxuICAgIENVU1RPTSAsICBcclxuICAgIFNUUk9LRSAsICBcclxuICAgIEZJTEwgLCAgIFxyXG4gICAgU1RST0tFX0ZJTEwgLCBcclxuICAgIENMSVAgIFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUcmFuc2Zvcm1hYmxlIHtcclxuICAgIHggOiBudW1iZXIgO1xyXG4gICAgeSA6IG51bWJlciA7XHJcblxyXG4gICAgcm90YXRpb24gOiBudW1iZXIgOyBcclxuXHJcbiAgICBzY2FsZVggOiBudW1iZXIgO1xyXG4gICAgc2NhbGVZIDogbnVtYmVyIDtcclxuXHJcbiAgICBnZXRXb3JsZE1hdHJpeCAoICkgOiBtYXQyZCA7XHJcbiAgICBnZXRMb2NhbE1hdHJpeCAoICkgOiBtYXQyZCA7XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZW5kZXJTdGF0ZSB7XHJcbiAgICBpc1Zpc2libGUgOiBib29sZWFuIDsgICAgICAgXHJcbiAgICBzaG93Q29vcmRTeXN0ZW0gOiBib29sZWFuIDsgIFxyXG4gICAgbGluZVdpZHRoIDogbnVtYmVyIDsgICAgICAgIFxyXG4gICAgZmlsbFN0eWxlIDogc3RyaW5nIHwgQ2FudmFzR3JhZGllbnQgfCBDYW52YXNQYXR0ZXJuIDsgXHJcbiAgICBzdHJva2VTdHlsZSA6IHN0cmluZyB8IENhbnZhc0dyYWRpZW50IHwgQ2FudmFzUGF0dGVybiA7IFxyXG4gICAgcmVuZGVyVHlwZSA6IEVSZW5kZXJUeXBlIDsgXHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElIaXR0YWJsZSB7XHJcbiAgICBoaXRUZXN0ICggbG9jYWxQdCA6IHZlYzIgLCB0cmFuc2Zvcm0gOiBJVHJhbnNmb3JtYWJsZSApIDogYm9vbGVhbiA7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURyYXdhYmxlIHtcclxuICAgIGJlZ2luRHJhdyAoIHRyYW5zZm9ybWFibGUgOiBJVHJhbnNmb3JtYWJsZSAsIHN0YXRlIDogSVJlbmRlclN0YXRlICwgY29udGV4dCA6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCApIDogdm9pZCA7XHJcbiAgICBkcmF3ICggdHJhbnNmb3JtYWJsZSA6IElUcmFuc2Zvcm1hYmxlICwgc3RhdGUgOiBJUmVuZGVyU3RhdGUgLCBjb250ZXh0IDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICkgOiB2b2lkIDtcclxuICAgIGVuZERyYXcgKCB0cmFuc2Zvcm1hYmxlIDogSVRyYW5zZm9ybWFibGUgLCBzdGF0ZSA6IElSZW5kZXJTdGF0ZSAsIGNvbnRleHQgOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgKSA6IHZvaWQgO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaGFwZSBleHRlbmRzIElIaXR0YWJsZSAsIElEcmF3YWJsZSB7XHJcbiAgICByZWFkb25seSB0eXBlIDogc3RyaW5nIDsgXHJcbiAgICBkYXRhIDogYW55IDsgXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNwcml0ZUNvbnRhaW5lciB7XHJcbiAgICBuYW1lIDogc3RyaW5nIDtcclxuICAgIGFkZFNwcml0ZSAoIHNwcml0ZSA6IElTcHJpdGUgKSA6IElTcHJpdGVDb250YWluZXIgO1xyXG4gICAgcmVtb3ZlU3ByaXRlICggc3ByaXRlIDogSVNwcml0ZSApIDogYm9vbGVhbiA7XHJcbiAgICByZW1vdmVBbGwgKCBpbmNsdWRlVGhpcyA6IGJvb2xlYW4gICkgOiB2b2lkIDtcclxuICAgIGdldFNwcml0ZUluZGV4ICggc3ByaXRlIDogSVNwcml0ZSApIDogbnVtYmVyIDtcclxuICAgIGdldFNwcml0ZSAoIGlkeCA6IG51bWJlciApIDogSVNwcml0ZSA7XHJcbiAgICBnZXRTcHJpdGVDb3VudCAoICkgOiBudW1iZXIgO1xyXG4gICAgZ2V0UGFyZW50U3ByaXRlICggKSA6IElTcHJpdGUgfCB1bmRlZmluZWQgO1xyXG4gICAgcmVhZG9ubHkgc3ByaXRlIDogSVNwcml0ZSB8IHVuZGVmaW5lZCA7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVPcmRlciB7XHJcbiAgICBQUkVPUkRFUixcclxuICAgIFBPU1RPUkRFUlxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBVcGRhdGVFdmVudEhhbmRsZXIgPSAoICggc3ByIDogSVNwcml0ZSAsIG1lc2MgOiBudW1iZXIsIGRpZmZTZWMgOiBudW1iZXIgLCB0cmF2ZWxPcmRlciA6IEVPcmRlciApID0+IHZvaWQgKSA7XHJcbmV4cG9ydCB0eXBlIE1vdXNlRXZlbnRIYW5kbGVyID0gKCAoIHNwciA6IElTcHJpdGUgLCBldnQgOiBDYW52YXNNb3VzZUV2ZW50ICApID0+IHZvaWQgKSA7XHJcbmV4cG9ydCB0eXBlIEtleWJvYXJkRXZlbnRIYW5kbGVyID0gKCAoIHNwciA6IElTcHJpdGUgLCBldnQgOiBDYW52YXNLZXlCb2FyZEV2ZW50ICApID0+IHZvaWQgKSA7XHJcbmV4cG9ydCB0eXBlIFJlbmRlckV2ZW50SGFuZGxlciA9ICggc3ByIDogSVNwcml0ZSAsIGNvbnRleHQgOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgLCByZW5kZXJPcmVkZXIgOiBFT3JkZXIgKSA9PiB2b2lkIDtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNwcml0ZSBleHRlbmRzIElUcmFuc2Zvcm1hYmxlICwgSVJlbmRlclN0YXRlIHtcclxuICAgIG5hbWUgOiBzdHJpbmcgOyAgXHJcbiAgICBzaGFwZSA6IElTaGFwZSA7ICBcclxuICAgIG93bmVyIDogSVNwcml0ZUNvbnRhaW5lciA7IFxyXG4gICAgZGF0YSA6IGFueSA7IFxyXG5cclxuICAgIGhpdFRlc3QgKCBsb2NhbFB0IDogdmVjMiApIDogYm9vbGVhbiA7IFxyXG4gICAgdXBkYXRlICggbWVzYyA6IG51bWJlciAsICBkaWZmIDogbnVtYmVyICwgb3JkZXIgOiBFT3JkZXIgKSA6IHZvaWQgOyBcclxuICAgIGRyYXcgKCBjb250ZXh0IDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICkgOiB2b2lkIDsgXHJcblxyXG4gICAgbW91c2VFdmVudCA6IE1vdXNlRXZlbnRIYW5kbGVyIHwgbnVsbCA7XHJcbiAgICBrZXlFdmVudCA6IEtleWJvYXJkRXZlbnRIYW5kbGVyIHwgbnVsbCA7XHJcbiAgICB1cGRhdGVFdmVudCA6IFVwZGF0ZUV2ZW50SGFuZGxlciB8IG51bGwgO1xyXG4gICAgcmVuZGVyRXZlbnQgOiBSZW5kZXJFdmVudEhhbmRsZXIgfCBudWxsIDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGlzcGF0Y2hlciB7XHJcbiAgICByZWFkb25seSBjb250YWluZXIgOiBJU3ByaXRlQ29udGFpbmVyIDsgIFxyXG4gICAgZGlzcGF0Y2hVcGRhdGUgKCBtc2VjIDogbnVtYmVyICwgZGlmZlNlYyA6IG51bWJlciApIDogdm9pZCA7XHJcbiAgICBkaXNwYXRjaERyYXcgKCBjb250ZXh0IDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICkgOiB2b2lkIDtcclxuICAgIGRpc3BhdGNoTW91c2VFdmVudCAoIGV2dCA6IENhbnZhc01vdXNlRXZlbnQgKSA6IHZvaWQgO1xyXG4gICAgZGlzcGF0Y2hLZXlFdmVudCAoIGV2dDogQ2FudmFzS2V5Qm9hcmRFdmVudCApIDogdm9pZCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGVGYWN0b3J5IHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUdyaWQgKCB3IDogbnVtYmVyICwgaCA6IG51bWJlciAsIHhTdGVwIDogbnVtYmVyID0gMTAsIHlTdGVwIDogbnVtYmVyID0gMTAgKSA6IElTaGFwZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmlkICggdyAsIGggLCB4U3RlcCAsIHlTdGVwICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQ2lyY2xlICggcmFkaXVzIDogbnVtYmVyICkgOiBJU2hhcGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ2lyY2xlICggcmFkaXVzICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUmVjdCAoIHcgOiBudW1iZXIgLCBoIDogbnVtYmVyICwgdSA6IG51bWJlciA9IDAgLCB2IDogbnVtYmVyID0gMCkgOiBJU2hhcGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVjdCAoIHcgLCBoICwgdSAsIHYgKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVFbGxpcHNlICggcmFkaXVzWCA6IG51bWJlciAsIHJhZGl1c1kgOiBudW1iZXIgKSA6IElTaGFwZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFbGxpcHNlICggcmFkaXVzWCAsIHJhZGl1c1kgKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVQb2x5Z29uICggcG9pbnRzIDogdmVjMiBbIF0gKSA6IElTaGFwZSB7XHJcbiAgICAgICAgaWYgKCBwb2ludHMgLiBsZW5ndGggPCAzICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IgKCBcIuWkmui+ueW9oumhtueCueaVsOmHj+W/hemhu+Wkp+S6juaIluetieS6jjMhISFcIikgO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb252ZXhQb2x5Z29uICggcG9pbnRzICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlU2NhbGU5R3JpZCAoIGRhdGEgOiBTY2FsZTlEYXRhICwgd2lkdGggOiBudW1iZXIgLCAgaGVpZ2h0IDogbnVtYmVyICwgdSA6IG51bWJlciA9IDAgLCB2IDogbnVtYmVyID0gMCApIDogSVNoYXBlIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNjYWxlOUdyaWQgKCBkYXRhICwgd2lkdGggLCBoZWlnaHQgLHUgLCB2ICApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUxpbmUgKCBzdGFydCA6IHZlYzIgLCBlbmQgOiB2ZWMyICkgOiBJU2hhcGUge1xyXG4gICAgICAgIGxldCBsaW5lIDogTGluZSA9IG5ldyBMaW5lICggKSA7XHJcbiAgICAgICAgbGluZSAuIHN0YXJ0ID0gc3RhcnQgO1xyXG4gICAgICAgIGxpbmUgLiBlbmQgPSBlbmQgO1xyXG4gICAgICAgIHJldHVybiBsaW5lIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVhMaW5lICggbGVuIDogbnVtYmVyID0gMTAgLCB0IDogbnVtYmVyID0gMCApIDogSVNoYXBlIHtcclxuICAgICAgICByZXR1cm4gbmV3IExpbmUgKCBsZW4gLCB0ICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQm9uZSAoIGxlbiA6IG51bWJlciA9IDEwICwgdCA6IG51bWJlciA9IDAgKSA6IElTaGFwZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCb25lICggbGVuICwgdCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUJlemllclBhdGggKCBwb2ludHMgOiB2ZWMyIFsgXSAsIGlzQ3ViaWMgOiBib29sZWFuID0gZmFsc2UgKSA6IElTaGFwZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCZXppZXJQYXRoICggcG9pbnRzICwgaXNDdWJpYyApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVuZENMaXBTaGFwZSA6IElTaGFwZSAgPSBuZXcgRW5kQ2xpcFNoYXBlICggKSA7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVDbGlwU3ByaXRlICggKSA6IElTcHJpdGUge1xyXG4gICAgICAgIGxldCBzcHIgOiBJU3ByaXRlID0gbmV3IFNwcml0ZTJEICggU3ByaXRlRmFjdG9yeSAuIGVuZENMaXBTaGFwZSAsIG5hbWUgKSA7XHJcbiAgICAgICAgc3ByIC4gcmVuZGVyVHlwZSA9IEVSZW5kZXJUeXBlIC4gQ0xJUCA7XHJcbiAgICAgICAgcmV0dXJuIHNwciA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVTcHJpdGUgKCBzaGFwZTogSVNoYXBlICwgbmFtZSA6IHN0cmluZyA9ICcnICkgOiBJU3ByaXRlIHtcclxuICAgICAgICBsZXQgc3ByIDogSVNwcml0ZSA9IG5ldyBTcHJpdGUyRCAoIHNoYXBlICwgbmFtZSApIDtcclxuICAgICAgICByZXR1cm4gc3ByIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUlTcHJpdGUgKCBzaGFwZTogSVNoYXBlICAsIHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDAsIHJvdGF0aW9uOiBudW1iZXIgPSAwLCBzY2FsZVg6IG51bWJlciA9IDEuMCwgc2NhbGVZOiBudW1iZXIgPSAxLjAgLCBuYW1lIDogc3RyaW5nID0gJyAnICApOiBJU3ByaXRlIHtcclxuICAgICAgICBsZXQgc3ByIDogSVNwcml0ZSA9IG5ldyBTcHJpdGUyRCAoIHNoYXBlICwgbmFtZSApIDtcclxuICAgICAgICBzcHIgLiB4ID0geCA7XHJcbiAgICAgICAgc3ByIC4geSA9IHkgO1xyXG4gICAgICAgIHNwciAuIHJvdGF0aW9uID0gcm90YXRpb24gO1xyXG4gICAgICAgIHNwci4gc2NhbGVYID0gc2NhbGVYIDtcclxuICAgICAgICBzcHIuIHNjYWxlWSA9IHNjYWxlWSA7XHJcbiAgICAgICAgcmV0dXJuIHNwciA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVJbWFnZUZpbGxUeXBlIHtcclxuICAgIE5PTkUgLCAgICAgIFxyXG4gICAgU1RSRVRDSCAsICAgXHJcbiAgICBSRVBFQVQgLCAgICBcclxuICAgIFJFUEVBVF9YICwgIFxyXG4gICAgUkVQRUFUX1kgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTY2FsZTlEYXRhIHtcclxuICAgIHB1YmxpYyBpbWFnZSA6IEhUTUxJbWFnZUVsZW1lbnQgO1xyXG4gICAgcHJpdmF0ZSBfaW5zZXQgOiBJbnNldCA7XHJcblxyXG4gICAgcHVibGljIHNldCBpbnNldCAoIHZhbHVlIDogSW5zZXQgKSAge1xyXG4gICAgICAgIHRoaXMgLiBfaW5zZXQgPSB2YWx1ZSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBsZWZ0TWFyZ2luICggKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBfaW5zZXQgLiBsZWZ0TWFyZ2luIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2h0TWFyZ2luICggKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBfaW5zZXQgLiByaWdodE1hcmdpbiA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0b3BNYXJnaW4gKCApIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcyAuIF9pbnNldCAuIHRvcE1hcmdpbiA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBib3R0b21NYXJnaW4gKCApIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcyAuIF9pbnNldCAuIGJvdHRvbU1hcmdpbiA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggaW1hZ2UgOiBIVE1MSW1hZ2VFbGVtZW50ICwgaW5zZXQgOiBJbnNldCApIHtcclxuICAgICAgICB0aGlzIC4gaW1hZ2UgPSBpbWFnZSA7XHJcbiAgICAgICAgdGhpcyAuIF9pbnNldCA9IGluc2V0IDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG4gICBcclxuXHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7IElTaGFwZSwgRVJlbmRlclR5cGUsIElUcmFuc2Zvcm1hYmxlICwgSVJlbmRlclN0YXRlLCBTY2FsZTlEYXRhICwgRUltYWdlRmlsbFR5cGUgfSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgbWF0MmQsIE1hdGgyRCAsIHZlYzIsIFJlY3RhbmdsZSAsIFNpemUgfSBmcm9tIFwiLi4vbWF0aDJkXCJcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyAgQmFzZVNoYXBlMkQgaW1wbGVtZW50cyBJU2hhcGUge1xyXG4gICAgcHVibGljIGF4aXNYU3R5bGUgOiBzdHJpbmcgfCBDYW52YXNHcmFkaWVudCB8IENhbnZhc1BhdHRlcm47XHJcbiAgICBwdWJsaWMgYXhpc1lTdHlsZSA6IHN0cmluZyB8IENhbnZhc0dyYWRpZW50IHwgQ2FudmFzUGF0dGVybjtcclxuICAgIHB1YmxpYyBheGlzTGluZVdpZHRoIDogbnVtYmVyO1xyXG4gICAgcHVibGljIGF4aXNMZW5ndGggOiBudW1iZXIgO1xyXG4gICAgcHVibGljIGRhdGEgOiBhbnkgO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgIHR5cGUgKCk6IHN0cmluZyA7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgaGl0VGVzdCAoIGxvY2FsUHQgOiB2ZWMyICwgdHJhbnNmb3JtIDogSVRyYW5zZm9ybWFibGUgKSA6IGJvb2xlYW4gO1xyXG4gIFxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggKSB7XHJcbiAgICAgICAgdGhpcyAuIGF4aXNYU3R5bGUgPSBcInJnYmEoIDI1NSAsIDAgLCAwICwgMTI4ICkgXCIgO1xyXG4gICAgICAgIHRoaXMgLiBheGlzWVN0eWxlID0gXCJyZ2JhKCAwICwgMjU1ICwgMCAsIDEyOCApIFwiIDtcclxuICAgICAgICB0aGlzIC4gYXhpc0xpbmVXaWR0aCA9IDEgO1xyXG4gICAgICAgIHRoaXMgLiBheGlzTGVuZ3RoID0gMTAwIDtcclxuICAgICAgICB0aGlzIC4gZGF0YSA9IHVuZGVmaW5lZCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRyYXdMaW5lICggY3R4IDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICwgc3R5bGUgOiBzdHJpbmcgfCBDYW52YXNHcmFkaWVudCB8IENhbnZhc1BhdHRlcm4gLCBpc0F4aXNYIDogYm9vbGVhbiA9IHRydWUgKSB7XHJcbiAgICAgICAgY3R4ICAuc2F2ZSAoICkgO1xyXG4gICAgICAgIGN0eCAuIHN0cm9rZVN0eWxlID0gc3R5bGUgO1xyXG4gICAgICAgIGN0eCAuIGxpbmVXaWR0aCA9IHRoaXMgLiBheGlzTGluZVdpZHRoIDtcclxuICAgICAgICBjdHggLiBiZWdpblBhdGggKCApIDtcclxuICAgICAgICBjdHggLiBtb3ZlVG8oIDAgLCAwICkgO1xyXG4gICAgICAgIGlmICggaXNBeGlzWCApIHtcclxuICAgICAgICAgICAgY3R4IC4gbGluZVRvICggdGhpcyAuIGF4aXNMZW5ndGggLCAwICkgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8oIDAgLCB0aGlzIC4gYXhpc0xlbmd0aCApIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4IC4gc3Ryb2tlICggKSA7XHJcbiAgICAgICAgY3R4IC4gcmVzdG9yZSggKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJlZ2luRHJhdyAoIHRyYW5zZm9ybWFibGU6IElUcmFuc2Zvcm1hYmxlLCBzdGF0ZSA6IElSZW5kZXJTdGF0ZSAsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCApOiB2b2lkIHtcclxuICAgICAgICBjb250ZXh0IC4gc2F2ZSAoICkgO1xyXG4gICAgICAgIGNvbnRleHQgLiBsaW5lV2lkdGggPSBzdGF0ZSAuIGxpbmVXaWR0aCA7XHJcbiAgICAgICAgY29udGV4dCAuIHN0cm9rZVN0eWxlID0gc3RhdGUgLiBzdHJva2VTdHlsZSA7XHJcbiAgICAgICAgY29udGV4dCAuIGZpbGxTdHlsZSA9IHN0YXRlIC4gZmlsbFN0eWxlIDtcclxuICAgICAgICBsZXQgbWF0IDogbWF0MmQgPSB0cmFuc2Zvcm1hYmxlIC4gZ2V0V29ybGRNYXRyaXggKCApIDtcclxuICAgICAgICBjb250ZXh0IC4gc2V0VHJhbnNmb3JtICggbWF0IC4gdmFsdWVzIFsgMCBdICwgbWF0IC4gdmFsdWVzIFsgMSBdICwgbWF0LnZhbHVlcyBbIDIgXSAsIG1hdCAuIHZhbHVlcyBbIDMgXSAsIG1hdCAuIHZhbHVlcyBbIDQgXSAsIG1hdCAuIHZhbHVlcyBbIDUgXSApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyAoIHRyYW5zZm9ybWFibGUgOiBJVHJhbnNmb3JtYWJsZSAsIHN0YXRlIDogSVJlbmRlclN0YXRlICwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCApOiB2b2lkIHtcclxuICAgICAgICBpZiAoIHN0YXRlLnJlbmRlclR5cGUgPT09IEVSZW5kZXJUeXBlLlNUUk9LRSApIHtcclxuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCBzdGF0ZS5yZW5kZXJUeXBlID09PSBFUmVuZGVyVHlwZS5GSUxMICkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCBzdGF0ZS5yZW5kZXJUeXBlID09PSBFUmVuZGVyVHlwZS5TVFJPS0VfRklMTCApIHtcclxuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICggc3RhdGUgLiByZW5kZXJUeXBlID09PSBFUmVuZGVyVHlwZSAuIENMSVAgKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQgLiBjbGlwICggKSA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmREcmF3ICggdHJhbnNmb3JtYWJsZSA6IElUcmFuc2Zvcm1hYmxlICwgc3RhdGUgOiBJUmVuZGVyU3RhdGUgLCBjb250ZXh0IDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICkgOiB2b2lkIHtcclxuICAgICAgICBpZiAoIHN0YXRlIC4gcmVuZGVyVHlwZSAhPT0gRVJlbmRlclR5cGUgLiBDTElQICkge1xyXG4gICAgICAgICAgICBpZiAoIHN0YXRlIC4gc2hvd0Nvb3JkU3lzdGVtICkge1xyXG4gICAgICAgICAgICAgICB0aGlzIC4gZHJhd0xpbmUgKCBjb250ZXh0ICwgdGhpcyAuIGF4aXNYU3R5bGUgLCB0cnVlICkgO1xyXG4gICAgICAgICAgICAgICB0aGlzIC4gZHJhd0xpbmUgKCBjb250ZXh0ICwgdGhpcyAuIGF4aXNZU3R5bGUgLCBmYWxzZSApIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250ZXh0IC4gcmVzdG9yZSAoICkgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENpcmNsZSBleHRlbmRzIEJhc2VTaGFwZTJEIHtcclxuICAgIHB1YmxpYyByYWRpdXMgOiBudW1iZXIgOyAgXHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggcmFkaXVzOiBudW1iZXIgPSAxICkge1xyXG4gICAgICAgIHN1cGVyICggKSA7XHJcbiAgICAgICAgdGhpcyAuIHJhZGl1cyA9IHJhZGl1cztcclxuICAgIH1cclxuICAgIHB1YmxpYyBoaXRUZXN0ICggbG9jYWxQdCA6IHZlYzIgLCB0cmFuc2Zvcm0gOiBJVHJhbnNmb3JtYWJsZSApOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gTWF0aDJEIC4gaXNQb2ludEluQ2lyY2xlICggbG9jYWxQdCAsIHZlYzIgLiBjcmVhdGUgKCAwLCAwICksIHRoaXMucmFkaXVzICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3ICggdHJhbnNmb3JtYWJsZTogSVRyYW5zZm9ybWFibGUsIHN0YXRlIDogSVJlbmRlclN0YXRlICwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCApOiB2b2lkIHtcclxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGNvbnRleHQuYXJjKCAwLCAwLCB0aGlzLnJhZGl1cywgMC4wLCBNYXRoLlBJICogMi4wLCB0cnVlICk7XHJcbiAgICAgICAgc3VwZXIuZHJhdyggdHJhbnNmb3JtYWJsZSwgc3RhdGUgLCBjb250ZXh0ICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlICgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkNpcmNsZVwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRWxsaXBzZSBleHRlbmRzIEJhc2VTaGFwZTJEIHtcclxuICAgIHB1YmxpYyByYWRpdXNYIDogbnVtYmVyIDtcclxuICAgIHB1YmxpYyByYWRpdXNZIDogbnVtYmVyIDtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIHJhZGl1c1ggOiBudW1iZXIgPSAxMCAsIHJhZGl1c1kgOiBudW1iZXIgPSAxMCApIHtcclxuICAgICAgICBzdXBlciAoICkgO1xyXG4gICAgICAgIHRoaXMgLiByYWRpdXNYID0gcmFkaXVzWCA7XHJcbiAgICAgICAgdGhpcyAuIHJhZGl1c1kgPSByYWRpdXNZIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGl0VGVzdCAoIGxvY2FsUHQgOiB2ZWMyICwgdHJhbnNmb3JtIDogSVRyYW5zZm9ybWFibGUgKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGlzSGl0dGVkIDogYm9vbGVhbiA9IE1hdGgyRCAuIGlzUG9pbnRJbkVsbGlwc2UgKCBsb2NhbFB0IC4geCAsIGxvY2FsUHQgLiB5ICwgMCAsIDAgLCB0aGlzIC4gcmFkaXVzWCwgdGhpcyAuIHJhZGl1c1kgKSA7XHJcbiAgICAgICAgcmV0dXJuIGlzSGl0dGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3ICggdHJhbnNmb3JtOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGUgOiBJUmVuZGVyU3RhdGUgLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgKSA6IHZvaWQge1xyXG4gICAgICAgIGNvbnRleHQgLiBiZWdpblBhdGggKCApIDtcclxuICAgICAgICBjb250ZXh0IC4gZWxsaXBzZSAoIDAgLCAwICwgdGhpcyAuIHJhZGl1c1ggLCB0aGlzIC4gcmFkaXVzWSAsIDAgLCAwICwgTWF0aC5QSSAqIDIgKSA7XHJcbiAgICAgICAgc3VwZXIgLiBkcmF3ICggdHJhbnNmb3JtICwgc3RhdGUgLCBjb250ZXh0ICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdHlwZSAoICkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkVsbGlwc2VcIiA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb252ZXhQb2x5Z29uIGV4dGVuZHMgQmFzZVNoYXBlMkQge1xyXG4gICAgcHVibGljIHBvaW50cyA6IHZlYzIgWyBdIDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCBwb2ludHMgOiB2ZWMyIFsgXSApIHtcclxuICAgICAgICBpZiAoIHBvaW50cyAuIGxlbmd0aCA8IDMgKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0ICggXCLlpJrovrnlvaLpobbngrnlv4XpobvlpKfkuo4z5oiW562J5LqOMyEhXCIpXHJcbiAgICAgICAgICAgIG5ldyBFcnJvciAoIFwi5aSa6L655b2i6aG254K55b+F6aG75aSn5LqOM+aIluetieS6jjMhIVwiKSA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggTWF0aDJEIC4gaXNDb252ZXggKCBwb2ludHMgKSA9PT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0ICggXCLlvZPliY3lpJrovrnlvaLkuI3mmK/lh7jlpJrovrnlvaIhIVwiICkgO1xyXG4gICAgICAgICAgICBuZXcgRXJyb3IgKCBcIuW9k+WJjeWkmui+ueW9ouS4jeaYr+WHuOWkmui+ueW9oiEhXCIgKSA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyICggKSA7XHJcbiAgICAgICAgdGhpcyAuIHBvaW50cyA9IHBvaW50cyA7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpdFRlc3QgKCBsb2NhbFB0IDogdmVjMiAsIHRyYW5zZm9ybSA6IElUcmFuc2Zvcm1hYmxlICkgOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gTWF0aDJEIC4gaXNQb2ludEluUG9seWdvbiAoIGxvY2FsUHQgLCB0aGlzIC4gcG9pbnRzICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3ICggdHJhbnNmb3JtYWJsZTogSVRyYW5zZm9ybWFibGUsIHN0YXRlIDogSVJlbmRlclN0YXRlICwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICk6IHZvaWQge1xyXG4gICAgICAgIGNvbnRleHQgLiBiZWdpblBhdGggKCApIDtcclxuICAgICAgICBjb250ZXh0IC4gbW92ZVRvICggdGhpcyAuIHBvaW50cyBbIDAgXSAuIHggLCB0aGlzIC4gcG9pbnRzIFsgMCBdIC4geSApIDtcclxuICAgICAgICBmb3IgKCBsZXQgaSA9IDEgOyBpIDwgdGhpcyAuIHBvaW50cyAuIGxlbmd0aCA7IGkgKysgKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQgLiBsaW5lVG8gKCB0aGlzIC4gcG9pbnRzIFsgaSBdIC4geCAsIHRoaXMgLiBwb2ludHMgWyBpIF0gLiB5ICkgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZXh0IC4gY2xvc2VQYXRoICggKSA7XHJcbiAgICAgICAgc3VwZXIgLiBkcmF3ICggdHJhbnNmb3JtYWJsZSAsIHN0YXRlICwgY29udGV4dCApIDtcclxuICAgIH0gXHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlICggKSA6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiUG9seWdvblwiIDtcclxuICAgIH1cclxufSBcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWN0IGV4dGVuZHMgQmFzZVNoYXBlMkQge1xyXG4gICAgcHVibGljIHdpZHRoIDogbnVtYmVyIDtcclxuICAgIHB1YmxpYyBoZWlnaHQgOiBudW1iZXIgO1xyXG4gICAgcHVibGljIHggOiBudW1iZXIgO1xyXG4gICAgcHVibGljIHkgOiBudW1iZXIgO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgcmlnaHQgKCApIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcyAuIHggKyB0aGlzIC53aWR0aCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBib3R0b20gKCApIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcyAuIHkgKyB0aGlzIC5oZWlnaHQgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIHc6IG51bWJlciA9IDEsIGg6IG51bWJlciA9IDEgLCB1IDogbnVtYmVyID0gMCAsIHYgOiBudW1iZXIgPSAwICApIHtcclxuICAgICAgICBzdXBlciAoICkgO1xyXG4gICAgICAgIHRoaXMgLiB3aWR0aCA9IHcgO1xyXG4gICAgICAgIHRoaXMgLiBoZWlnaHQgPSBoIDtcclxuICAgICAgICB0aGlzIC4geCA9IC0gdGhpcyAuIHdpZHRoICogdSA7XHJcbiAgICAgICAgdGhpcyAuIHkgPSAtIHRoaXMgLiBoZWlnaHQgKiB2IDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHR5cGUgKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiUmVjdFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaXRUZXN0ICggbG9jYWxQdCA6IHZlYzIgLCB0cmFuc2Zvcm0gOiBJVHJhbnNmb3JtYWJsZSApOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gTWF0aDJEIC4gaXNQb2ludEluUmVjdCAoIGxvY2FsUHQgLiB4ICwgbG9jYWxQdCAuIHkgLCB0aGlzIC4geCAsIHRoaXMgLiB5ICwgdGhpcyAuIHdpZHRoICwgdGhpcyAuIGhlaWdodCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyAoIHRyYW5zZm9ybWFibGU6IElUcmFuc2Zvcm1hYmxlLCBzdGF0ZSA6IElSZW5kZXJTdGF0ZSAsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCApOiB2b2lkIHtcclxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGNvbnRleHQubW92ZVRvKCB0aGlzIC4geCAsICB0aGlzIC4geSAgKTtcclxuICAgICAgICBjb250ZXh0LmxpbmVUbyggdGhpcyAuIHggKyB0aGlzIC4gd2lkdGggLCB0aGlzIC4geSAgKTtcclxuICAgICAgICBjb250ZXh0LmxpbmVUbyggdGhpcyAuIHggKyB0aGlzIC4gd2lkdGggICwgdGhpcyAuIHkgKyAgdGhpcyAuIGhlaWdodCApIDtcclxuICAgICAgICBjb250ZXh0LmxpbmVUbyggdGhpcyAuIHggLCB0aGlzIC4geSArIHRoaXMgLiBoZWlnaHQgKSA7XHJcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICBzdXBlciAuIGRyYXcgKCB0cmFuc2Zvcm1hYmxlLCBzdGF0ZSAsIGNvbnRleHQgKSA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHcmlkIGV4dGVuZHMgUmVjdCB7XHJcbiAgICBwdWJsaWMgeFN0ZXA6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5U3RlcDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIHcgOiBudW1iZXIgPSAxMCwgaCA6IG51bWJlciA9IDEwICwgeFN0ZXAgOiBudW1iZXIgPSAxMCwgeVN0ZXAgOiBudW1iZXIgPSAxMCApIHtcclxuICAgICAgICBzdXBlciggdyAsIGggLCAwICwgMCApIDtcclxuICAgICAgICB0aGlzIC4geFN0ZXAgPSB4U3RlcCA7XHJcbiAgICAgICAgdGhpcyAuIHlTdGVwID0geVN0ZXAgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3ICggdHJhbnNmb3JtYWJsZSA6IElUcmFuc2Zvcm1hYmxlICwgc3RhdGUgOiBJUmVuZGVyU3RhdGUgLCBjb250ZXh0IDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICkgOiB2b2lkIHtcclxuICAgICAgICBzdGF0ZSAuIHJlbmRlclR5cGUgPSBFUmVuZGVyVHlwZSAuIENVU1RPTSA7XHJcbiAgICAgICAgY29udGV4dCAuIGZpbGxSZWN0ICggMCAsIDAgLCB0aGlzIC4gd2lkdGggLCB0aGlzIC4gaGVpZ2h0ICkgO1xyXG5cclxuICAgICAgICBjb250ZXh0IC4gYmVnaW5QYXRoICggKSA7XHJcbiAgICAgICAgZm9yICggdmFyIGkgPSB0aGlzIC4geFN0ZXAgKyAwLjUgOyBpIDwgdGhpcyAuIHdpZHRoIDsgaSArPSB0aGlzIC4geFN0ZXAgKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQgLiBtb3ZlVG8gKCBpICwgMCApIDtcclxuICAgICAgICAgICAgY29udGV4dCAuIGxpbmVUbyAoIGkgLCB0aGlzIC4gaGVpZ2h0ICkgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZXh0IC4gc3Ryb2tlICggKSA7XHJcblxyXG4gICAgICAgIGNvbnRleHQgLiBiZWdpblBhdGggKCApIDtcclxuICAgICAgICBmb3IgKCB2YXIgaSA9IHRoaXMgLiB5U3RlcCArIDAuNSA7IGkgPCB0aGlzIC4gaGVpZ2h0IDsgaSArPSB0aGlzIC4geVN0ZXAgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGV4dCAuIG1vdmVUbyAoIDAgLCBpICk7XHJcbiAgICAgICAgICAgIGNvbnRleHQgLiBsaW5lVG8gKCB0aGlzIC4gd2lkdGggLCBpICkgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZXh0IC4gc3Ryb2tlICggKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlICggKSA6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiR3JpZFwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmV6aWVyUGF0aCBleHRlbmRzIEJhc2VTaGFwZTJEIHtcclxuICAgIHB1YmxpYyBwb2ludHMgOiB2ZWMyIFsgXSA7XHJcbiAgICBwdWJsaWMgaXNDdWJpYyA6IGJvb2xlYW4gO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIHBvaW50cyA6IHZlYzIgWyBdICAsIGlzQ3ViaWMgOiBib29sZWFuID0gZmFsc2UgKSB7XHJcbiAgICAgICAgc3VwZXIgKCApIDtcclxuICAgICAgICB0aGlzIC4gcG9pbnRzID0gcG9pbnRzIDtcclxuICAgICAgICB0aGlzIC4gaXNDdWJpYyA9IGlzQ3ViaWMgO1xyXG4gICAgICAgIHRoaXMgLiBkYXRhID0gcG9pbnRzIDsgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlICggKSA6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiQmV6aWVyUGF0aFwiIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGl0VGVzdCAoIGxvY2FsUHQgOiB2ZWMyICwgdHJhbnNmb3JtIDogSVRyYW5zZm9ybWFibGUgKSA6IGJvb2xlYW4geyByZXR1cm4gZmFsc2UgOyB9XHJcblxyXG4gICAgcHVibGljIGRyYXcgKCB0cmFuc2Zvcm1hYmxlOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGUgOiBJUmVuZGVyU3RhdGUgLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgKTogdm9pZCB7XHJcbiAgICAgICAgY29udGV4dCAuIGJlZ2luUGF0aCAoICkgO1xyXG4gICAgICAgIGNvbnRleHQgLiBtb3ZlVG8gKCB0aGlzIC4gcG9pbnRzIFsgMCBdIC4geCAsIHRoaXMgLiBwb2ludHMgWyAwIF0gLiB5ICkgO1xyXG4gICAgICAgIGlmICggdGhpcyAuIGlzQ3ViaWMgKSB7XHJcbiAgICAgICAgICAgIGZvciAoIGxldCBpID0gMSA7IGkgPCB0aGlzIC4gcG9pbnRzIC4gbGVuZ3RoIDsgaSArPSAzICkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dCAuIGJlemllckN1cnZlVG8gKHRoaXMgLiBwb2ludHMgWyBpIF0gLiB4ICwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcyAuIHBvaW50cyBbIGkgXSAuIHkgLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMgLiBwb2ludHMgWyBpICsgMSBdIC4geCAsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcyAuIHBvaW50cyBbIGkgKyAxIF0gLiB5ICxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzIC4gcG9pbnRzIFsgaSArIDIgXSAuIHggLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMgLiBwb2ludHMgWyBpICsgMiBdIC4geSApIDtcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yICggbGV0ICBpIDogbnVtYmVyICA9IDEgOyBpIDwgdGhpcyAuIHBvaW50cyAuIGxlbmd0aCAgOyBpICs9IDIgKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0IC4gcXVhZHJhdGljQ3VydmVUbyAoIHRoaXMgLiBwb2ludHMgWyBpIF0gLiB4ICwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgLiBwb2ludHMgWyBpXSAuIHkgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIC4gcG9pbnRzIFsgaSArIDEgIF0gLiB4ICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyAuIHBvaW50cyBbIGkgKyAxIF0gLiB5ICkgO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlciAuIGRyYXcgKCB0cmFuc2Zvcm1hYmxlICwgc3RhdGUgLCBjb250ZXh0ICkgO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZSBpbXBsZW1lbnRzIElTaGFwZSB7XHJcbiAgICBwdWJsaWMgc3RhcnQgOiB2ZWMyIDtcclxuICAgIHB1YmxpYyBlbmQgOiB2ZWMyIDtcclxuICAgIHB1YmxpYyBkYXRhIDogYW55IDsgXHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggbGVuIDogbnVtYmVyID0gMTAgLCB0IDogbnVtYmVyID0gMCApIHtcclxuICAgICAgICBpZiAoIHQgPCAwLjAgfHwgdCA+IDEuMCApIHtcclxuICAgICAgICAgICAgYWxlcnQgKCBcIuWPguaVsHTlv4XpobvlpITkuo4gWyAwICwgMSBd5LmL6Ze0ISFcIiApIDtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yICggXCLlj4LmlbB05b+F6aG75aSE5LqOIFsgMCAsIDEgXeS5i+mXtCEhXCIgKSA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMgLiBzdGFydCA9IHZlYzIgLiBjcmVhdGUgKCAtIGxlbiAqIHQgLCAwICkgO1xyXG4gICAgICAgIHRoaXMgLiBlbmQgPSAgdmVjMiAuIGNyZWF0ZSAoIGxlbiAqICggMS4wIC0gdCApICwgMCApIDtcclxuICAgICAgICB0aGlzIC4gZGF0YSA9IHVuZGVmaW5lZCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpdFRlc3QgKCBsb2NhbFB0IDogdmVjMiAsIHRyYW5zZm9ybSA6IElUcmFuc2Zvcm1hYmxlICk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBNYXRoMkQgLiBpc1BvaW50T25MaW5lU2VnbWVudCAoIGxvY2FsUHQgLCB0aGlzIC4gc3RhcnQgLCB0aGlzIC4gZW5kICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBiZWdpbkRyYXcgKCB0cmFuc2Zvcm1hYmxlIDogSVRyYW5zZm9ybWFibGUgLCBzdGF0ZSA6IElSZW5kZXJTdGF0ZSAsIGNvbnRleHQgOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgKTogdm9pZCB7XHJcbiAgICAgICAgY29udGV4dCAuIHNhdmUgKCApIDtcclxuICAgICAgICBjb250ZXh0IC4gbGluZVdpZHRoID0gc3RhdGUgLiBsaW5lV2lkdGggO1xyXG4gICAgICAgIGNvbnRleHQgLiBzdHJva2VTdHlsZSA9IHN0YXRlIC4gc3Ryb2tlU3R5bGUgO1xyXG4gICAgICAgIGxldCBtYXQgOiBtYXQyZCA9IHRyYW5zZm9ybWFibGUgLiBnZXRXb3JsZE1hdHJpeCAoICkgOyBcclxuICAgICAgICBjb250ZXh0IC4gc2V0VHJhbnNmb3JtICggbWF0IC4gdmFsdWVzIFsgMCBdICwgbWF0IC4gdmFsdWVzIFsgMSBdICwgbWF0IC4gdmFsdWVzIFsgMiBdICwgbWF0IC4gdmFsdWVzIFsgMyBdICwgbWF0IC4gdmFsdWVzIFsgNCBdICwgbWF0IC4gdmFsdWVzIFsgNSBdICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3ICggdHJhbnNmb3JtYWJsZSA6IElUcmFuc2Zvcm1hYmxlICwgc3RhdGUgOiBJUmVuZGVyU3RhdGUgLCBjb250ZXh0IDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICkgOiB2b2lkIHtcclxuICAgICAgICBzdGF0ZSAuIHJlbmRlclR5cGUgPSBFUmVuZGVyVHlwZSAuIFNUUk9LRSA7XHJcbiAgICAgICAgY29udGV4dCAuIGJlZ2luUGF0aCAoICkgOyBcclxuICAgICAgICBjb250ZXh0IC4gbW92ZVRvICggdGhpcyAuIHN0YXJ0IC4geCAsICB0aGlzIC4gc3RhcnQgLiB5ICApIDtcclxuICAgICAgICBjb250ZXh0IC4gbGluZVRvICggdGhpcyAuIGVuZCAuIHggLCB0aGlzIC4gZW5kIC4geSApIDtcclxuICAgICAgICBjb250ZXh0IC4gc3Ryb2tlICggKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuZERyYXcgKCB0cmFuc2Zvcm1hYmxlOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGUgOiBJUmVuZGVyU3RhdGUgLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgKTogdm9pZCB7XHJcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlICgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJMaW5lXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCb25lIGV4dGVuZHMgTGluZSB7XHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlICggKSA6IHN0cmluZyB7IHJldHVybiBcIkJvbmVcIiA7IH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyAodHJhbnNmb3JtYWJsZSA6IElUcmFuc2Zvcm1hYmxlICwgc3RhdGUgOiBJUmVuZGVyU3RhdGUgLCBjb250ZXh0IDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICkgOiB2b2lkIHtcclxuICAgICAgICBzdXBlciAuIGRyYXcgKCB0cmFuc2Zvcm1hYmxlLCBzdGF0ZSAgLCBjb250ZXh0ICApIDtcclxuXHJcbiAgICAgICAgbGV0IG1hdCA6IG1hdDJkID0gdHJhbnNmb3JtYWJsZSAuIGdldFdvcmxkTWF0cml4ICggKSA7XHJcbiAgICAgICAgY29udGV4dCAuIHNhdmUgKCApIDtcclxuICAgICAgICBjb250ZXh0IC4gc2V0VHJhbnNmb3JtICggMSAsIDAgLCAwICwgMSAsIG1hdCAuIHZhbHVlcyBbIDQgXSAsIG1hdCAuIHZhbHVlcyBbIDUgXSApIDtcclxuICAgICAgICBjb250ZXh0IC4gYmVnaW5QYXRoICggKSA7XHJcbiAgICAgICAgY29udGV4dCAuIGZpbGxTdHlsZSA9ICdibHVlJyA7XHJcbiAgICAgICAgY29udGV4dCAuIGFyYyAoIHRoaXMgLiBzdGFydCAuIHggLCB0aGlzIC4gc3RhcnQgLiB5ICwgNSAsIDAgLCBNYXRoIC4gUEkgKiAyICkgO1xyXG4gICAgICAgIGNvbnRleHQgLiBmaWxsICggKSA7XHJcbiAgICAgICAgY29udGV4dCAuIHJlc3RvcmUgKCApIDsgICBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNjYWxlOUdyaWQgZXh0ZW5kcyBSZWN0IHtcclxuXHJcbiAgICBwdWJsaWMgZGF0YSA6IFNjYWxlOURhdGEgO1xyXG4gICAgcHVibGljIHNyY1JlY3RzICEgOiBSZWN0YW5nbGUgWyBdIDtcclxuICAgIHB1YmxpYyBkZXN0UmVjdHMgISA6IFJlY3RhbmdsZSBbIF0gO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgdHlwZSAoICkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNjYWxlOUdyaWRcIiA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggZGF0YSA6IFNjYWxlOURhdGEgLCB3aWR0aCA6IG51bWJlciAsIGhlaWdodCA6IG51bWJlciAsIHUgOiBudW1iZXIgLCB2IDogbnVtYmVyICkge1xyXG4gICAgICAgIHN1cGVyICggd2lkdGggLCBoZWlnaHQgLCB1ICwgdiApIDtcclxuICAgICAgICB0aGlzIC4gZGF0YSA9IGRhdGEgO1xyXG4gICAgICAgIHRoaXMgLiBfY2FsY0Rlc3RSZWN0cyAoICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NhbGNEZXN0UmVjdHMgKCApIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcyAuIGRlc3RSZWN0cyA9IFsgXSA7XHJcbiAgICAgICAgdGhpcyAuIHNyY1JlY3RzID0gIFsgXSA7XHJcblxyXG4gICAgICAgIGxldCByYyA6IFJlY3RhbmdsZSA7XHJcbiAgICAgICAgcmMgPSBuZXcgUmVjdGFuZ2xlICggKSA7XHJcbiAgICAgICAgcmMgLiBvcmlnaW4gPSB2ZWMyIC4gY3JlYXRlICggMCAsIDAgKSA7XHJcbiAgICAgICAgcmMgLiBzaXplID0gU2l6ZSAuIGNyZWF0ZSAoIHRoaXMgLiBkYXRhIC4gbGVmdE1hcmdpbiAsIHRoaXMgLiBkYXRhIC4gdG9wTWFyZ2luICkgO1xyXG4gICAgICAgIHRoaXMgLiBzcmNSZWN0cyAuIHB1c2ggKCByYyApIDtcclxuXHJcbiAgICAgICAgcmMgPSBuZXcgUmVjdGFuZ2xlICggKSA7XHJcbiAgICAgICAgcmMgLiBvcmlnaW4gPSB2ZWMyIC4gY3JlYXRlICggdGhpcyAuIHggLCB0aGlzIC4geSApIDtcclxuICAgICAgICByYyAuIHNpemUgPSBTaXplIC4gY3JlYXRlICggdGhpcyAuIGRhdGEgLiBsZWZ0TWFyZ2luICwgdGhpcyAuIGRhdGEgLiB0b3BNYXJnaW4gKSA7XHJcbiAgICAgICAgdGhpcyAuIGRlc3RSZWN0cyAuIHB1c2ggKCByYyApIDtcclxuXHJcbiAgICAgICAgcmMgPSBuZXcgUmVjdGFuZ2xlICggKSA7XHJcbiAgICAgICAgcmMgLiBvcmlnaW4gPSB2ZWMyIC4gY3JlYXRlICggdGhpcyAuIGRhdGEgLiBpbWFnZSAuIHdpZHRoIC0gdGhpcyAuIGRhdGEgLiByaWdodE1hcmdpbiAgLCAwICkgO1xyXG4gICAgICAgIHJjIC4gc2l6ZSA9IFNpemUgLiBjcmVhdGUgKCB0aGlzIC4gZGF0YSAuIHJpZ2h0TWFyZ2luICwgdGhpcyAuIGRhdGEgLiB0b3BNYXJnaW4gKSA7XHJcbiAgICAgICAgdGhpcyAuIHNyY1JlY3RzIC4gcHVzaCAoIHJjICkgO1xyXG5cclxuICAgICAgICByYyA9IG5ldyBSZWN0YW5nbGUgKCApIDtcclxuICAgICAgICByYyAuIG9yaWdpbiA9IHZlYzIgLiBjcmVhdGUgKCB0aGlzIC4gcmlnaHQgLSB0aGlzIC4gZGF0YSAuIHJpZ2h0TWFyZ2luICwgdGhpcyAuIHkgKSA7XHJcbiAgICAgICAgcmMgLiBzaXplID0gU2l6ZSAuIGNyZWF0ZSAoIHRoaXMgLiBkYXRhIC4gcmlnaHRNYXJnaW4gLCB0aGlzIC4gZGF0YSAuIHRvcE1hcmdpbiApIDtcclxuICAgICAgICB0aGlzIC4gZGVzdFJlY3RzIC4gcHVzaCAoIHJjICkgO1xyXG5cclxuICAgICAgICByYyA9IG5ldyBSZWN0YW5nbGUgKCApIDtcclxuICAgICAgICByYyAuIG9yaWdpbiA9IHZlYzIgLiBjcmVhdGUgKCB0aGlzIC4gZGF0YSAuIGltYWdlIC4gd2lkdGggLSB0aGlzIC4gZGF0YSAuIHJpZ2h0TWFyZ2luICAsIHRoaXMgLiBkYXRhIC4gaW1hZ2UgLiBoZWlnaHQgLSB0aGlzIC4gZGF0YSAuIGJvdHRvbU1hcmdpbiApIDtcclxuICAgICAgICByYyAuIHNpemUgPSBTaXplIC4gY3JlYXRlICggdGhpcyAuIGRhdGEgLiByaWdodE1hcmdpbiAsIHRoaXMgLiBkYXRhIC4gYm90dG9tTWFyZ2luICkgO1xyXG4gICAgICAgIHRoaXMgLiBzcmNSZWN0cyAuIHB1c2ggKCByYyApIDtcclxuXHJcbiAgICAgICAgcmMgPSBuZXcgUmVjdGFuZ2xlICggKSA7XHJcbiAgICAgICAgcmMgLiBvcmlnaW4gPSB2ZWMyIC4gY3JlYXRlICggdGhpcyAuIHJpZ2h0IC0gdGhpcyAuIGRhdGEgLiByaWdodE1hcmdpbiAsIHRoaXMgLiBib3R0b20gLSB0aGlzIC4gZGF0YSAuIGJvdHRvbU1hcmdpbiApIDtcclxuICAgICAgICByYyAuIHNpemUgPSBTaXplIC4gY3JlYXRlICggdGhpcyAuIGRhdGEgLiByaWdodE1hcmdpbiAsIHRoaXMgLiBkYXRhIC4gYm90dG9tTWFyZ2luICkgO1xyXG4gICAgICAgIHRoaXMgLiBkZXN0UmVjdHMgLiBwdXNoICggcmMgKSA7XHJcblxyXG4gICAgICAgIHJjID0gbmV3IFJlY3RhbmdsZSAoICkgO1xyXG4gICAgICAgIHJjIC4gb3JpZ2luID0gdmVjMiAuIGNyZWF0ZSAoIDAgICwgdGhpcyAuIGRhdGEgLiBpbWFnZSAuIGhlaWdodCAtIHRoaXMgLiBkYXRhIC4gYm90dG9tTWFyZ2luICkgO1xyXG4gICAgICAgIHJjIC4gc2l6ZSA9IFNpemUgLiBjcmVhdGUgKCB0aGlzIC4gZGF0YSAuIGxlZnRNYXJnaW4gLCB0aGlzIC4gZGF0YSAuIGJvdHRvbU1hcmdpbiApIDtcclxuICAgICAgICB0aGlzIC4gc3JjUmVjdHMgLiBwdXNoICggcmMgKSA7XHJcblxyXG4gICAgICAgIHJjID0gbmV3IFJlY3RhbmdsZSAoICkgO1xyXG4gICAgICAgIHJjIC4gb3JpZ2luID0gdmVjMiAuIGNyZWF0ZSAoIHRoaXMgLiB4ICwgdGhpcyAuIGJvdHRvbSAtIHRoaXMgLiBkYXRhIC4gYm90dG9tTWFyZ2luICkgO1xyXG4gICAgICAgIHJjIC4gc2l6ZSA9IFNpemUgLiBjcmVhdGUgKCB0aGlzIC4gZGF0YSAuIGxlZnRNYXJnaW4gLCB0aGlzIC4gZGF0YSAuIGJvdHRvbU1hcmdpbiAgKSA7XHJcbiAgICAgICAgdGhpcyAuIGRlc3RSZWN0cyAuIHB1c2ggKCByYyApIDtcclxuXHJcbiAgICAgICAgcmMgPSBuZXcgUmVjdGFuZ2xlICggKSA7XHJcbiAgICAgICAgcmMgLiBvcmlnaW4gPSB2ZWMyIC4gY3JlYXRlICggMCAgLCB0aGlzIC4gZGF0YSAuIHRvcE1hcmdpbiApIDtcclxuICAgICAgICByYyAuIHNpemUgPSBTaXplIC4gY3JlYXRlICggdGhpcyAuIGRhdGEgLiBsZWZ0TWFyZ2luICwgdGhpcyAuZGF0YSAuIGltYWdlIC4gaGVpZ2h0IC0gdGhpcyAuIGRhdGEgLiB0b3BNYXJnaW4gLSB0aGlzIC4gZGF0YSAuIGJvdHRvbU1hcmdpbiApIDsgICAgXHJcbiAgICAgICAgdGhpcyAuIHNyY1JlY3RzIC4gcHVzaCAoIHJjICkgO1xyXG5cclxuICAgICAgICByYyA9IG5ldyBSZWN0YW5nbGUgKCApIDtcclxuICAgICAgICByYyAuIG9yaWdpbiA9IHZlYzIgLiBjcmVhdGUgKCB0aGlzIC4geCAsIHRoaXMgLiB5ICsgdGhpcyAuIGRhdGEgLiB0b3BNYXJnaW4gKSA7XHJcbiAgICAgICAgcmMgLiBzaXplID0gU2l6ZSAuIGNyZWF0ZSAoIHRoaXMgLiBkYXRhIC4gbGVmdE1hcmdpbiAsIHRoaXMgLiBoZWlnaHQgLSB0aGlzIC4gZGF0YSAuIHRvcE1hcmdpbiAtIHRoaXMgLiBkYXRhIC4gYm90dG9tTWFyZ2luICkgO1xyXG4gICAgICAgIHRoaXMgLiBkZXN0UmVjdHMgLiBwdXNoICggcmMgKSA7XHJcblxyXG4gICAgICAgIHJjID0gbmV3IFJlY3RhbmdsZSAoICkgO1xyXG4gICAgICAgIHJjIC4gb3JpZ2luID0gdmVjMiAuIGNyZWF0ZSAoIHRoaXMgLiBkYXRhIC4gbGVmdE1hcmdpbiAgLCAwICkgO1xyXG4gICAgICAgIHJjIC4gc2l6ZSA9IFNpemUgLiBjcmVhdGUgKCB0aGlzIC4gZGF0YSAuIGltYWdlIC4gd2lkdGggLSB0aGlzIC4gZGF0YSAuIGxlZnRNYXJnaW4gLSB0aGlzIC4gZGF0YSAucmlnaHRNYXJnaW4gLCAgdGhpcyAuIGRhdGEgLiB0b3BNYXJnaW4gKSA7ICAgIFxyXG4gICAgICAgIHRoaXMgLiBzcmNSZWN0cyAuIHB1c2ggKCByYyApIDtcclxuXHJcbiAgICAgICAgcmMgPSBuZXcgUmVjdGFuZ2xlICggKSA7XHJcbiAgICAgICAgcmMgLiBvcmlnaW4gPSB2ZWMyIC4gY3JlYXRlICggdGhpcyAuIHggKyB0aGlzIC4gZGF0YSAuIGxlZnRNYXJnaW4gLCB0aGlzIC4geSApIDtcclxuICAgICAgICByYyAuIHNpemUgPSBTaXplIC4gY3JlYXRlICggdGhpcyAuIHdpZHRoIC0gdGhpcyAuIGRhdGEgLiBsZWZ0TWFyZ2luIC0gdGhpcyAuIGRhdGEgLiByaWdodE1hcmdpbiAsIHRoaXMgLiBkYXRhIC4gdG9wTWFyZ2luICkgO1xyXG4gICAgICAgIHRoaXMgLiBkZXN0UmVjdHMgLiBwdXNoICggcmMgKSA7XHJcblxyXG4gICAgICAgIHJjID0gbmV3IFJlY3RhbmdsZSAoICkgO1xyXG4gICAgICAgIHJjIC4gb3JpZ2luID0gdmVjMiAuIGNyZWF0ZSAoIHRoaXMgLiBkYXRhIC4gaW1hZ2UgLiB3aWR0aCAtIHRoaXMgLmRhdGEgLiByaWdodE1hcmdpbiAgLCB0aGlzIC5kYXRhIC4gdG9wTWFyZ2luICkgO1xyXG4gICAgICAgIHJjIC4gc2l6ZSA9IFNpemUgLiBjcmVhdGUgKCB0aGlzIC4gZGF0YSAuIHJpZ2h0TWFyZ2luICwgIHRoaXMgLiBkYXRhIC4gaW1hZ2UgLiBoZWlnaHQgLSB0aGlzIC4gZGF0YSAuIHRvcE1hcmdpbiAtIHRoaXMgLiBkYXRhIC4gYm90dG9tTWFyZ2luICkgOyAgICBcclxuICAgICAgICB0aGlzIC4gc3JjUmVjdHMgLiBwdXNoICggcmMgKSA7XHJcblxyXG4gICAgICAgIHJjID0gbmV3IFJlY3RhbmdsZSAoICkgO1xyXG4gICAgICAgIHJjIC4gb3JpZ2luID0gdmVjMiAuIGNyZWF0ZSAoIHRoaXMgLiByaWdodCAtIHRoaXMgLiBkYXRhIC4gcmlnaHRNYXJnaW4gLCB0aGlzIC4geSArIHRoaXMgLiBkYXRhIC4gdG9wTWFyZ2luICkgO1xyXG4gICAgICAgIHJjIC4gc2l6ZSA9IFNpemUgLiBjcmVhdGUgKCB0aGlzIC4gZGF0YSAuIHJpZ2h0TWFyZ2luICwgdGhpcyAuIGhlaWdodCAtIHRoaXMgLmRhdGEgLiB0b3BNYXJnaW4gLSB0aGlzIC4gZGF0YSAuIGJvdHRvbU1hcmdpbiApIDtcclxuICAgICAgICB0aGlzIC4gZGVzdFJlY3RzIC4gcHVzaCAoIHJjICkgO1xyXG5cclxuICAgICAgICByYyA9IG5ldyBSZWN0YW5nbGUgKCApIDtcclxuICAgICAgICByYyAuIG9yaWdpbiA9IHZlYzIgLiBjcmVhdGUgKCB0aGlzIC4gZGF0YSAuIGxlZnRNYXJnaW4gICwgdGhpcyAuIGRhdGEgLiBpbWFnZSAuIGhlaWdodCAtIHRoaXMgLmRhdGEgLiBib3R0b21NYXJnaW4gKSA7XHJcbiAgICAgICAgcmMgLiBzaXplID0gU2l6ZSAuIGNyZWF0ZSAoIHRoaXMgLiBkYXRhIC4gaW1hZ2UgLiB3aWR0aCAtIHRoaXMgLiBkYXRhIC4gbGVmdE1hcmdpbiAtIHRoaXMgLiBkYXRhIC4gcmlnaHRNYXJnaW4gLCAgdGhpcyAuIGRhdGEgLiBib3R0b21NYXJnaW4gKSA7ICAgIFxyXG4gICAgICAgIHRoaXMgLiBzcmNSZWN0cyAuIHB1c2ggKCByYyApIDtcclxuXHJcbiAgICAgICAgcmMgPSBuZXcgUmVjdGFuZ2xlICggKSA7XHJcbiAgICAgICAgcmMgLiBvcmlnaW4gPSB2ZWMyIC4gY3JlYXRlICggIHRoaXMgLiB4ICsgdGhpcyAuIGRhdGEgLiBsZWZ0TWFyZ2luICwgdGhpcyAuIGJvdHRvbSAtIHRoaXMgLiBkYXRhIC4gYm90dG9tTWFyZ2luICApIDtcclxuICAgICAgICByYyAuIHNpemUgPSBTaXplIC4gY3JlYXRlICggdGhpcyAuIHdpZHRoIC0gdGhpcyAuIGRhdGEgLiBsZWZ0TWFyZ2luIC0gdGhpcyAuIGRhdGEgLiByaWdodE1hcmdpbiAgLCB0aGlzIC4gZGF0YSAuIGJvdHRvbU1hcmdpbiApIDtcclxuICAgICAgICB0aGlzIC4gZGVzdFJlY3RzIC4gcHVzaCAoIHJjICkgO1xyXG5cclxuICAgICAgICByYyA9IG5ldyBSZWN0YW5nbGUgKCApIDtcclxuICAgICAgICByYyAuIG9yaWdpbiA9IHZlYzIgLiBjcmVhdGUgKCB0aGlzIC4gZGF0YSAuIGxlZnRNYXJnaW4gLCAgdGhpcyAuIGRhdGEgLiB0b3BNYXJnaW4gICkgO1xyXG4gICAgICAgIHJjIC4gc2l6ZSA9IFNpemUgLiBjcmVhdGUgKCB0aGlzIC4gZGF0YSAuIGltYWdlIC4gd2lkdGggLSB0aGlzIC4gZGF0YSAuIGxlZnRNYXJnaW4gLSB0aGlzIC4gZGF0YSAuIHJpZ2h0TWFyZ2luICAsIHRoaXMgLiBkYXRhIC4gaW1hZ2UgLiBoZWlnaHQgLSB0aGlzIC5kYXRhIC4gdG9wTWFyZ2luIC0gdGhpcyAuZGF0YSAuIGJvdHRvbU1hcmdpbiApIDtcclxuICAgICAgICB0aGlzIC4gc3JjUmVjdHMgLiBwdXNoICggcmMgKSA7XHJcblxyXG4gICAgICAgIHJjID0gbmV3IFJlY3RhbmdsZSAoICkgO1xyXG4gICAgICAgIHJjIC4gb3JpZ2luID0gdmVjMiAuIGNyZWF0ZSAoICB0aGlzIC4geCArIHRoaXMgLiBkYXRhIC4gbGVmdE1hcmdpbiAsIHRoaXMgLiB5ICsgdGhpcyAuIGRhdGEgLiB0b3BNYXJnaW4gICkgO1xyXG4gICAgICAgIHJjIC4gc2l6ZSA9IFNpemUgLiBjcmVhdGUgKCB0aGlzIC4gd2lkdGggLSB0aGlzIC4gZGF0YSAuIGxlZnRNYXJnaW4gLSB0aGlzIC4gZGF0YSAuIHJpZ2h0TWFyZ2luICAsIHRoaXMgLiBoZWlnaHQgLSB0aGlzIC5kYXRhIC4gdG9wTWFyZ2luIC0gdGhpcyAuZGF0YSAuIGJvdHRvbU1hcmdpbiApIDtcclxuICAgICAgICB0aGlzIC4gZGVzdFJlY3RzIC4gcHVzaCAoIHJjICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgIF9kcmF3SW1hZ2UgKCBjb250ZXh0IDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICwgaW1nIDogSFRNTEltYWdlRWxlbWVudCB8IEhUTUxDYW52YXNFbGVtZW50ICwgIGRlc3RSZWN0IDogUmVjdGFuZ2xlICwgc3JjUmVjdCA6IFJlY3RhbmdsZSAgLCBmaWxsVHlwZSA6IEVJbWFnZUZpbGxUeXBlID0gRUltYWdlRmlsbFR5cGUgLiBTVFJFVENIICkgOiBib29sZWFuIHtcclxuICAgICAgICAgaWYgKCBzcmNSZWN0IC4gaXNFbXB0eSAoICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgIGlmICggZGVzdFJlY3QgLiBpc0VtcHR5ICggKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIDsgXHJcbiAgICAgICAgIH1cclxuIFxyXG4gICAgICAgICBpZiAoIGZpbGxUeXBlID09PSBFSW1hZ2VGaWxsVHlwZSAuIFNUUkVUQ0ggKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQgLiBkcmF3SW1hZ2UgKCBpbWcgLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyY1JlY3QgLiBvcmlnaW4gLiB4ICwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNSZWN0IC4gb3JpZ2luIC4geSAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNSZWN0IC4gc2l6ZSAuIHdpZHRoICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyY1JlY3QgLiBzaXplIC4gaGVpZ2h0ICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RSZWN0IC4gb3JpZ2luIC4geCAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0UmVjdCAuIG9yaWdpbiAuIHkgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdFJlY3QgLiBzaXplIC4gd2lkdGggLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdFJlY3QgLiBzaXplIC4gaGVpZ2h0XHJcbiAgICAgICAgICAgICApIDtcclxuICAgICAgICB9IGVsc2UgIHtcclxuICAgICAgICAgICAgIGxldCByb3dzIDogbnVtYmVyICA9IE1hdGggLiBjZWlsICggZGVzdFJlY3QgLiBzaXplIC4gd2lkdGggLyBzcmNSZWN0IC4gc2l6ZSAuIHdpZHRoICkgO1xyXG4gICAgICAgICAgICAgbGV0IGNvbHVtcyA6IG51bWJlciAgPSBNYXRoIC4gY2VpbCAoIGRlc3RSZWN0IC4gc2l6ZSAuIGhlaWdodCAvIHNyY1JlY3QgLiBzaXplIC4gaGVpZ2h0ICkgO1xyXG5cclxuICAgICAgICAgICAgIGxldCBsZWZ0IDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgIGxldCB0b3AgOiBudW1iZXIgPSAwIDtcclxuIFxyXG4gICAgICAgICAgICAgbGV0IHJpZ2h0IDogbnVtYmVyID0gMCA7XHJcbiAgICAgICAgICAgICBsZXQgYm90dG9tIDogbnVtYmVyID0gMCA7XHJcbiBcclxuICAgICAgICAgICAgIGxldCB3aWR0aCA6IG51bWJlciA9IDAgO1xyXG4gICAgICAgICAgICAgbGV0IGhlaWdodCA6IG51bWJlciA9IDAgO1xyXG5cclxuICAgICAgICAgICAgIGxldCBkZXN0UmlnaHQgOiBudW1iZXIgPSBkZXN0UmVjdCAuIG9yaWdpbiAuIHggKyBkZXN0UmVjdCAuIHNpemUgLiB3aWR0aCA7XHJcbiAgICAgICAgICAgICBsZXQgZGVzdEJvdHRvbSA6IG51bWJlciA9IGRlc3RSZWN0IC4gb3JpZ2luIC4geSArIGRlc3RSZWN0IC4gc2l6ZSAuIGhlaWdodCA7XHJcbiBcclxuICAgICAgICAgICAgIGlmICggZmlsbFR5cGUgPT09IEVJbWFnZUZpbGxUeXBlIC4gUkVQRUFUX1ggKSB7XHJcbiAgICAgICAgICAgICAgICAgY29sdW1zID0gMSA7IFxyXG4gICAgICAgICAgICAgfSBlbHNlIGlmICggZmlsbFR5cGUgPT09IEVJbWFnZUZpbGxUeXBlIC4gUkVQRUFUX1kgKSB7XHJcbiAgICAgICAgICAgICAgICAgcm93cyA9IDEgO1xyXG4gICAgICAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgICAgICBmb3IgKCBsZXQgaSA6IG51bWJlciA9IDAgOyBpIDwgcm93cyA7IGkgKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgZm9yICggbGV0IGogOiBudW1iZXIgPSAwIDsgaiA8IGNvbHVtcyA7IGogKysgKSBcclxuICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBkZXN0UmVjdCAuIG9yaWdpbiAuIHggKyBpICogc3JjUmVjdCAuIHNpemUgLiB3aWR0aCA7XHJcbiAgICAgICAgICAgICAgICAgICAgIHRvcCA9ICBkZXN0UmVjdCAuIG9yaWdpbiAuIHkgKyBqICogc3JjUmVjdCAuIHNpemUgLiBoZWlnaHQgO1xyXG4gXHJcbiAgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gc3JjUmVjdCAuIHNpemUgLiB3aWR0aCA7XHJcbiAgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IHNyY1JlY3QgLiBzaXplIC4gaGVpZ2h0IDtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICByaWdodCA9IGxlZnQgKyB3aWR0aCA7XHJcbiAgICAgICAgICAgICAgICAgICAgIGJvdHRvbSA9IHRvcCArIGhlaWdodCA7XHJcbiBcclxuICAgICAgICAgICAgICAgICAgICAgaWYgKCByaWdodCA+IGRlc3RSaWdodCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gc3JjUmVjdCAuIHNpemUgLiB3aWR0aCAtICggcmlnaHQgLSBkZXN0UmlnaHQgKSA7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIH1cclxuIFxyXG4gICAgICAgICAgICAgICAgICAgICBpZiAoIGJvdHRvbSA+IGRlc3RCb3R0b20gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IHNyY1JlY3QgLiBzaXplIC4gaGVpZ2h0IC0gKCBib3R0b20gLSBkZXN0Qm90dG9tICkgO1xyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgY29udGV4dCAuIGRyYXdJbWFnZSAoIGltZyAsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgc3JjUmVjdCAuIG9yaWdpbiAuIHggLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHNyY1JlY3QgLiBvcmlnaW4gLiB5ICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ICwgdG9wICwgd2lkdGggLCBoZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgKSA7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfSAgICAgIFxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgcmV0dXJuIHRydWUgO1xyXG4gICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGRyYXcgKCB0cmFuc2Zvcm1hYmxlIDogSVRyYW5zZm9ybWFibGUgLCBzdGF0ZSA6IElSZW5kZXJTdGF0ZSAsIGNvbnRleHQgOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgKSA6IHZvaWQge1xyXG4gICAgICAgIGZvciAoIGxldCBpIDogbnVtYmVyID0gMCA7IGkgPCB0aGlzIC4gc3JjUmVjdHMgLiBsZW5ndGggOyBpICsrICkge1xyXG4gICAgICAgICAgICB0aGlzIC4gX2RyYXdJbWFnZSAoIGNvbnRleHQgLCB0aGlzIC4gZGF0YSAuIGltYWdlICwgdGhpcyAuIGRlc3RSZWN0cyBbIGkgXSAsIHRoaXMgLiBzcmNSZWN0cyBbIGkgXSAsIEVJbWFnZUZpbGxUeXBlIC4gU1RSRVRDSCApIDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbmRDbGlwU2hhcGUgaW1wbGVtZW50cyBJU2hhcGUge1xyXG4gICAgcHVibGljIGRhdGEgOiBhbnkgO1xyXG4gICAgcHVibGljIGhpdFRlc3QgKCBsb2NhbFB0IDogdmVjMiAsIHRyYW5zZm9ybSA6IElUcmFuc2Zvcm1hYmxlICk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZSA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBiZWdpbkRyYXcgKCB0cmFuc2Zvcm1hYmxlIDogSVRyYW5zZm9ybWFibGUgLCBzdGF0ZSA6IElSZW5kZXJTdGF0ZSAsIGNvbnRleHQgOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgKTogdm9pZCB7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyAoIHRyYW5zZm9ybWFibGUgOiBJVHJhbnNmb3JtYWJsZSAsIHN0YXRlIDogSVJlbmRlclN0YXRlICwgY29udGV4dCA6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCApIDogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuZERyYXcgKCB0cmFuc2Zvcm1hYmxlOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGUgOiBJUmVuZGVyU3RhdGUgLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgKTogdm9pZCB7XHJcbiAgICAgICBjb250ZXh0IC4gcmVzdG9yZSAoICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdHlwZSAoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJFbmRDTGlwU2hhcGVcIjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVtcHR5U2hhcGUgaW1wbGVtZW50cyBJU2hhcGUge1xyXG4gICAgcHVibGljIGRhdGEgOiBhbnkgO1xyXG4gICAgcHVibGljIGhpdFRlc3QgKCBsb2NhbFB0IDogdmVjMiAsIHRyYW5zZm9ybSA6IElUcmFuc2Zvcm1hYmxlICk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZSA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBiZWdpbkRyYXcgKCB0cmFuc2Zvcm1hYmxlIDogSVRyYW5zZm9ybWFibGUgLCBzdGF0ZSA6IElSZW5kZXJTdGF0ZSAsIGNvbnRleHQgOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgKTogdm9pZCB7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyAoIHRyYW5zZm9ybWFibGUgOiBJVHJhbnNmb3JtYWJsZSAsIHN0YXRlIDogSVJlbmRlclN0YXRlICwgY29udGV4dCA6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCApIDogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuZERyYXcgKCB0cmFuc2Zvcm1hYmxlOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGUgOiBJUmVuZGVyU3RhdGUgLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlICgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkVtcHR5U2hhcGVcIjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuLypcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgQmFzZVNoYXBlMkQge1xyXG5cclxufVxyXG4qL1xyXG5cclxuIiwiaW1wb3J0IHsgQ2FudmFzMkRBcHBsaWNhdGlvbiwgQ2FudmFzTW91c2VFdmVudCwgQ2FudmFzS2V5Qm9hcmRFdmVudCB9IGZyb20gXCIuLi9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQge0lTcHJpdGVDb250YWluZXIsIElEaXNwYXRjaGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNwcml0ZTJETWFuYWdlcn0gZnJvbSBcIi4vc3ByaXRlMmRTeXN0ZW1cIiA7XHJcbmltcG9ydCB7IFNwcml0ZU5vZGVNYW5hZ2VyIH0gZnJvbSBcIi4vc3ByaXRlMmRIaWVyYXJjaGljYWxTeXN0ZW1cIlxyXG5cclxuZXhwb3J0IGNsYXNzIFNwcml0ZTJEQXBwbGljYXRpb24gZXh0ZW5kcyBDYW52YXMyREFwcGxpY2F0aW9uIHtcclxuICAgIHByb3RlY3RlZCBfZGlzcGF0Y2hlciA6IElEaXNwYXRjaGVyIDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCBjYW52YXMgOiBIVE1MQ2FudmFzRWxlbWVudCAsIGlzSGllcmFyY2hpY2FsIDogYm9vbGVhbiA9IHRydWUgKSB7XHJcbiAgICAgICAgZG9jdW1lbnQgLiBvbmNvbnRleHRtZW51ID0gZnVuY3Rpb24gKCApIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBzdXBlciggY2FudmFzICk7XHJcbiAgICAgICAgaWYgKCBpc0hpZXJhcmNoaWNhbCA9PT0gdHJ1ZSApe1xyXG4gICAgICAgICAgICB0aGlzIC4gX2Rpc3BhdGNoZXIgPSBuZXcgU3ByaXRlTm9kZU1hbmFnZXIgKCBjYW52YXMgLiB3aWR0aCAsIGNhbnZhcyAuIGhlaWdodCApIDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzIC4gX2Rpc3BhdGNoZXIgPSAgbmV3IFNwcml0ZTJETWFuYWdlciAoICkgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJvb3RDb250YWluZXIgKCApIDogSVNwcml0ZUNvbnRhaW5lciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBfZGlzcGF0Y2hlciAuIGNvbnRhaW5lciA7XHJcbiAgICB9IFxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUgKCBtc2VjIDogbnVtYmVyICwgZGlmZiA6IG51bWJlciApOiB2b2lkIHtcclxuICAgICAgICB0aGlzIC4gX2Rpc3BhdGNoZXIgLiBkaXNwYXRjaFVwZGF0ZSAoIG1zZWMgLCBkaWZmICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIgKCApIDogdm9pZCB7XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gY29udGV4dDJEICkge1xyXG4gICAgICAgICAgICB0aGlzIC4gY29udGV4dDJEIC4gY2xlYXJSZWN0ICggMCAsIDAgLCB0aGlzIC4gY29udGV4dDJEIC4gY2FudmFzIC4gd2lkdGggLCB0aGlzIC4gY29udGV4dDJEIC4gY2FudmFzIC4gaGVpZ2h0ICkgO1xyXG4gICAgICAgICAgICB0aGlzIC4gX2Rpc3BhdGNoZXIgLiBkaXNwYXRjaERyYXcgKCB0aGlzIC4gY29udGV4dDJEICkgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hNb3VzZURvd24gKCBldnQgOiBDYW52YXNNb3VzZUV2ZW50ICkgOiB2b2lke1xyXG4gICAgICAgIHN1cGVyIC4gZGlzcGF0Y2hNb3VzZURvd24gKCBldnQgKSA7XHJcbiAgICAgICAgdGhpcyAuIF9kaXNwYXRjaGVyIC4gZGlzcGF0Y2hNb3VzZUV2ZW50ICggZXZ0ICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkaXNwYXRjaE1vdXNlVXAoIGV2dCA6IENhbnZhc01vdXNlRXZlbnQgKSA6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyIC4gZGlzcGF0Y2hNb3VzZVVwICggZXZ0ICkgO1xyXG4gICAgICAgIHRoaXMgLiBfZGlzcGF0Y2hlciAuIGRpc3BhdGNoTW91c2VFdmVudCAoIGV2dCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hNb3VzZU1vdmUgKCBldnQgOiBDYW52YXNNb3VzZUV2ZW50ICkgOiB2b2lkIHtcclxuICAgICAgICBzdXBlciAuIGRpc3BhdGNoTW91c2VNb3ZlICggZXZ0ICkgO1xyXG4gICAgICAgIHRoaXMgLiBfZGlzcGF0Y2hlciAuIGRpc3BhdGNoTW91c2VFdmVudCAoIGV2dCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hNb3VzZURyYWcgKCBldnQgOiBDYW52YXNNb3VzZUV2ZW50ICkgOiB2b2lkIHtcclxuICAgICAgICBzdXBlciAuIGRpc3BhdGNoTW91c2VEcmFnICggZXZ0ICkgO1xyXG4gICAgICAgIHRoaXMgLiBfZGlzcGF0Y2hlciAuIGRpc3BhdGNoTW91c2VFdmVudCAoIGV2dCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hLZXlEb3duICggZXZ0IDogQ2FudmFzS2V5Qm9hcmRFdmVudCApIDogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIgLiBkaXNwYXRjaEtleURvd24gKCBldnQgKSA7XHJcbiAgICAgICAgdGhpcyAuIF9kaXNwYXRjaGVyIC4gZGlzcGF0Y2hLZXlFdmVudCAoIGV2dCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hLZXlVcCAoIGV2dCA6IENhbnZhc0tleUJvYXJkRXZlbnQgKSA6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyIC4gZGlzcGF0Y2hLZXlVcCAoIGV2dCApIDtcclxuICAgICAgICB0aGlzIC4gX2Rpc3BhdGNoZXIgLiBkaXNwYXRjaEtleUV2ZW50ICggZXZ0ICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkaXNwYXRjaEtleVByZXNzICggZXZ0IDogQ2FudmFzS2V5Qm9hcmRFdmVudCApIDogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIgLiBkaXNwYXRjaEtleVByZXNzICggZXZ0ICkgO1xyXG4gICAgICAgIHRoaXMgLiBfZGlzcGF0Y2hlciAuIGRpc3BhdGNoS2V5RXZlbnQgKCBldnQgKSA7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IG1hdDJkLCBUcmFuc2Zvcm0yRCAsIHZlYzIgfSBmcm9tIFwiLi4vbWF0aDJkXCJcclxuaW1wb3J0IHsgSVNwcml0ZSwgIE1vdXNlRXZlbnRIYW5kbGVyLCBLZXlib2FyZEV2ZW50SGFuZGxlciwgVXBkYXRlRXZlbnRIYW5kbGVyLCBFT3JkZXIgLCBJU2hhcGUsIEVSZW5kZXJUeXBlICwgSVRyYW5zZm9ybWFibGUsIElTcHJpdGVDb250YWluZXIsIFJlbmRlckV2ZW50SGFuZGxlciB9IGZyb20gXCIuL2ludGVyZmFjZVwiXHJcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSBcIi4uL3RyZWVOb2RlXCI7XHJcbmltcG9ydCB7IFNwcml0ZU5vZGUgfSBmcm9tIFwiLi9zcHJpdGUyZEhpZXJhcmNoaWNhbFN5c3RlbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcml0ZTJEIGltcGxlbWVudHMgSVNwcml0ZSB7XHJcbiAgICBwdWJsaWMgc2hvd0Nvb3JkU3lzdGVtIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHJlbmRlclR5cGUgOiBFUmVuZGVyVHlwZSA9IEVSZW5kZXJUeXBlIC4gRklMTCA7XHJcbiAgICBwdWJsaWMgaXNWaXNpYmxlIDogYm9vbGVhbiA9IHRydWUgO1xyXG4gICAgcHVibGljIGZpbGxTdHlsZSA6IHN0cmluZyB8IENhbnZhc0dyYWRpZW50IHwgQ2FudmFzUGF0dGVybiA9ICd3aGl0ZSc7XHJcbiAgICBwdWJsaWMgc3Ryb2tlU3R5bGUgOiBzdHJpbmcgfCBDYW52YXNHcmFkaWVudCB8IENhbnZhc1BhdHRlcm4gPSAnYmxhY2snO1xyXG4gICAgcHVibGljIGxpbmVXaWR0aCA6IG51bWJlciA9IDEgO1xyXG5cclxuICAgIHB1YmxpYyB0cmFuc2Zvcm0gOiBUcmFuc2Zvcm0yRCA9IG5ldyBUcmFuc2Zvcm0yRCAoICkgO1xyXG5cclxuICAgIHB1YmxpYyBuYW1lIDogc3RyaW5nIDtcclxuICAgIHB1YmxpYyBzaGFwZSA6IElTaGFwZSA7XHJcbiAgICBwdWJsaWMgZGF0YSA6IGFueSA7XHJcbiAgICBwdWJsaWMgb3duZXIgISA6IElTcHJpdGVDb250YWluZXIgOyAgXHJcblxyXG4gICAgcHVibGljIG1vdXNlRXZlbnQgOiBNb3VzZUV2ZW50SGFuZGxlciB8IG51bGwgPSBudWxsIDtcclxuICAgIHB1YmxpYyBrZXlFdmVudCA6IEtleWJvYXJkRXZlbnRIYW5kbGVyIHwgbnVsbCA9IG51bGwgO1xyXG4gICAgcHVibGljIHVwZGF0ZUV2ZW50IDogVXBkYXRlRXZlbnRIYW5kbGVyIHwgbnVsbCA9IG51bGwgO1xyXG4gICAgcHVibGljIHJlbmRlckV2ZW50IDogUmVuZGVyRXZlbnRIYW5kbGVyIHwgbnVsbCA9IG51bGwgO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIHNoYXBlOiBJU2hhcGUgLCBuYW1lIDogc3RyaW5nICApIHtcclxuICAgICAgICB0aGlzIC4gbmFtZSA9IG5hbWUgO1xyXG4gICAgICAgIHRoaXMgLiBzaGFwZSA9IHNoYXBlIDtcclxuICAgIH1cclxuICBcclxuICAgIHB1YmxpYyBzZXQgeCAoIHg6IG51bWJlciApIHtcclxuICAgICAgICB0aGlzIC4gdHJhbnNmb3JtIC4gcG9zaXRpb24gLiB4ID0geCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB4ICgpIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcyAuIHRyYW5zZm9ybSAuIHBvc2l0aW9uIC4geCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB5ICggeSA6IG51bWJlciApIHtcclxuICAgICAgICB0aGlzIC4gdHJhbnNmb3JtIC4gcG9zaXRpb24gLiB5ID0geSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB5ICggKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiB0cmFuc2Zvcm0gIC5wb3NpdGlvbiAuIHkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcm90YXRpb24gKCByb3RhdGlvbiA6IG51bWJlciApIHtcclxuICAgICAgICB0aGlzIC4gdHJhbnNmb3JtIC4gcm90YXRpb24gPSByb3RhdGlvbiA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCByb3RhdGlvbiAoICkgOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzIC4gdHJhbnNmb3JtIC4gcm90YXRpb24gO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2NhbGVYICggcyA6IG51bWJlciApIHtcclxuICAgICAgICB0aGlzIC4gdHJhbnNmb3JtIC4gc2NhbGUgLiB4ID0gcyA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzY2FsZVggKCApIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcyAuIHRyYW5zZm9ybSAuIHNjYWxlIC4geCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzY2FsZVkgKCBzIDogbnVtYmVyICkge1xyXG4gICAgICAgIHRoaXMgLiB0cmFuc2Zvcm0gLiBzY2FsZSAuIHkgPSBzIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNjYWxlWSAoICkgOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzIC4gdHJhbnNmb3JtIC4gc2NhbGUgLiB5IDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldFdvcmxkTWF0cml4ICggKSA6IG1hdDJkIHtcclxuICAgICAgICBpZiAoIHRoaXMgLiBvd25lciBpbnN0YW5jZW9mIFNwcml0ZU5vZGUgKSB7XHJcbiAgICAgICAgICAgIGxldCBhcnI6IFRyZWVOb2RlIDwgSVNwcml0ZSA+IFsgXSA9IFsgXSA7XHJcbiAgICAgICAgICAgIGxldCBjdXJyOiBUcmVlTm9kZSA8IElTcHJpdGUgPiB8IHVuZGVmaW5lZCA9IHRoaXMgLiBvd25lciBhcyBTcHJpdGVOb2RlIDtcclxuICAgICAgICAgICAgd2hpbGUgKCBjdXJyICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgLiBwdXNoICggY3VyciApIDtcclxuICAgICAgICAgICAgICAgIGN1cnIgPSBjdXJyIC4gcGFyZW50IDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG91dCA6IG1hdDJkID0gbWF0MmQgLiBjcmVhdGUgKCApIDtcclxuICAgICAgICAgICAgbGV0IGN1cnJNYXQgOiBtYXQyZCA7XHJcbiAgICAgICAgICAgIGZvciAoIGxldCBpIDogbnVtYmVyID0gYXJyIC4gbGVuZ3RoIC0gMSA7IGkgPj0gMCA7IGktLSApIHtcclxuICAgICAgICAgICAgICAgIGN1cnIgPSBhcnIgWyBpIF0gO1xyXG4gICAgICAgICAgICAgICAgaWYoIGN1cnIgLiBkYXRhICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJNYXQgPSAoIGN1cnIgLiBkYXRhIGFzIFNwcml0ZTJEICkgLiB0cmFuc2Zvcm0gLiB0b01hdHJpeCAoICkgO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdDJkIC4gbXVsdGlwbHkgKCBvdXQgLCBjdXJyTWF0ICwgb3V0ICkgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvdXQgOyBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcyAuIHRyYW5zZm9ybSAuIHRvTWF0cml4ICggKSA7XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TG9jYWxNYXRyaXggKCApIDogbWF0MmQge1xyXG4gICAgICAgIGxldCBzcmMgOiBtYXQyZCA9IHRoaXMgLiBnZXRXb3JsZE1hdHJpeCAoICkgO1xyXG4gICAgICAgIGxldCBvdXQgOiBtYXQyZCA9IG1hdDJkIC4gY3JlYXRlICggKSA7XHJcbiAgICAgICAgaWYgKCBtYXQyZCAuIGludmVydCAoIHNyYyAsIG91dCApICkge1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0IDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYWxlcnQgKCBcIuefqemYteaxgumAhuWksei0pVwiICkgO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IgKCBcIuefqemYteaxgumAhuWksei0pVwiICkgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlICggbWVzYzogbnVtYmVyLCBkaWZmOm51bWJlcixvcmRlcjogRU9yZGVyICk6IHZvaWQge1xyXG4gICAgICAgIGlmICggdGhpcyAuIHVwZGF0ZUV2ZW50ICkge1xyXG4gICAgICAgICAgICB0aGlzIC4gdXBkYXRlRXZlbnQgKCB0aGlzICwgbWVzYyAsIGRpZmYgLCBvcmRlciApIDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpdFRlc3QgKCBsb2NhbFB0IDogdmVjMiAgKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICggdGhpcyAuIGlzVmlzaWJsZSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMgLiBzaGFwZSAuIGhpdFRlc3QgKCBsb2NhbFB0ICwgdGhpcyApIDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2UgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyAoIGNvbnRleHQgOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gaXNWaXNpYmxlICkge1xyXG4gICAgICAgICAgICB0aGlzIC4gc2hhcGUgLiBiZWdpbkRyYXcgKCB0aGlzICwgdGhpcyAsIGNvbnRleHQgKSA7XHJcbiAgICAgICAgICAgIGlmICggdGhpcyAuIHJlbmRlckV2ZW50ICE9PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcyAuIHJlbmRlckV2ZW50ICggdGhpcyAsIGNvbnRleHQgLCBFT3JkZXIgLlBSRU9SREVSICkgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMgLiBzaGFwZSAuIGRyYXcgKCB0aGlzICwgdGhpcyAsIGNvbnRleHQgKSA7XHJcbiAgICAgICAgICAgIGlmICggdGhpcyAuIHJlbmRlckV2ZW50ICE9PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcyAuIHJlbmRlckV2ZW50ICggdGhpcyAsIGNvbnRleHQgLCBFT3JkZXIgLlBPU1RPUkRFUiApIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzIC4gc2hhcGUgLiBlbmREcmF3ICggdGhpcyAsIHRoaXMgLCBjb250ZXh0ICkgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgVHJlZU5vZGUsIE5vZGVFbnVtZXJhdG9yRmFjdG9yeSB9IGZyb20gXCIuLi90cmVlTm9kZVwiO1xyXG5pbXBvcnQgeyBJRW51bWVyYXRvciB9IGZyb20gXCIuLi9JRW51bWVyYXRvclwiIDtcclxuaW1wb3J0IHsgQ2FudmFzS2V5Qm9hcmRFdmVudCwgQ2FudmFzTW91c2VFdmVudCwgQ2FudmFzMkRBcHBsaWNhdGlvbiwgRUlucHV0RXZlbnRUeXBlIH0gZnJvbSBcIi4uL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IElTcHJpdGUsICBFT3JkZXIgLElEaXNwYXRjaGVyLCBTcHJpdGVGYWN0b3J5LCBFUmVuZGVyVHlwZSwgSVNwcml0ZUNvbnRhaW5lciB9IGZyb20gXCIuL2ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBtYXQyZCwgdmVjMiwgTWF0aDJEIH0gZnJvbSBcIi4uL21hdGgyZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcml0ZU5vZGUgZXh0ZW5kcyBUcmVlTm9kZSA8IElTcHJpdGUgPiBpbXBsZW1lbnRzIElTcHJpdGVDb250YWluZXIge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggc3ByaXRlIDogSVNwcml0ZSAgLCBwYXJlbnQgOiBTcHJpdGVOb2RlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkICwgbmFtZSA6IHN0cmluZyA9IFwic3ByaXRlTm9kZVwiICkge1xyXG4gICAgICAgIHN1cGVyICggc3ByaXRlICwgcGFyZW50ICwgbmFtZSApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkU3ByaXRlICggc3ByaXRlIDogSVNwcml0ZSApIDogSVNwcml0ZUNvbnRhaW5lciB7XHJcbiAgICAgICAgbGV0IG5vZGUgOiBTcHJpdGVOb2RlID0gbmV3IFNwcml0ZU5vZGUgKCBzcHJpdGUgLCB0aGlzICwgc3ByaXRlIC4gbmFtZSApIDtcclxuICAgICAgICByZXR1cm4gbm9kZSA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyByZW1vdmVTcHJpdGUgKCBzcHJpdGUgOiBJU3ByaXRlICkgOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaWR4IDogbnVtYmVyID0gdGhpcyAuIGdldFNwcml0ZUluZGV4ICggc3ByaXRlICkgO1xyXG4gICAgICAgIGlmICggaWR4ID09PSAtMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gcmVtb3ZlQ2hpbGRBdCAoIGlkeCApID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZSA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWUgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQWxsICggaW5jbHVkZVRoaXMgOiBib29sZWFuICApIDogdm9pZCB7XHJcbiAgICAgICAgbGV0IGl0ZXI6SUVudW1lcmF0b3I8VHJlZU5vZGU8SVNwcml0ZT4+ICA9IE5vZGVFbnVtZXJhdG9yRmFjdG9yeS5jcmVhdGVfYmZfcjJsX2IydF9pdGVyKHRoaXMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50OiBUcmVlTm9kZTxJU3ByaXRlPiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB3aGlsZSAoIGl0ZXIgLiBtb3ZlTmV4dCAoICkgKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBpdGVyIC5jdXJyZW50IDtcclxuICAgICAgICAgICAgaWYgKCBjdXJyZW50ICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50IC4gZGF0YSAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGN1cnJlbnQgPT09IHRoaXMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGluY2x1ZGVUaGlzID09PSB0cnVlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgLiBkYXRhID0gdW5kZWZpbmVkIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudCAuIHJlbW92ZSAoICkgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCAuIGRhdGEgPSB1bmRlZmluZWQgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQgLiByZW1vdmUgKCApIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U3ByaXRlICggaWR4IDogbnVtYmVyICkgOiBJU3ByaXRlIHtcclxuICAgICAgICBpZiAoIGlkeCA8IDAgfHwgaWR4ID4gdGhpcyAuIGNoaWxkQ291bnQgLTEgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciAoIFwi5Y+C5pWwaWR46LaK55WMISFcIiApIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNwciA6IElTcHJpdGUgfCB1bmRlZmluZWQgPSAoIHRoaXMgLiBnZXRDaGlsZEF0ICggaWR4ICkgYXMgU3ByaXRlTm9kZSApIC4gc3ByaXRlXHJcbiAgICAgICAgaWYgKCBzcHIgPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgYWxlcnQgKCBcInNwcml0ZSDkuLp1bmRlZmluZWTvvIzor7fmo4Dmn6Xljp/lm6AhISFcIiApIDtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yICggXCJzcHJpdGUg5Li6dW5kZWZpbmVk77yM6K+35qOA5p+l5Y6f5ZugISEhXCIgKSA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3ByIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGFyZW50U3ByaXRlICggKSA6IElTcHJpdGUgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBwYXJlbnQgOiBTcHJpdGVOb2RlIHwgdW5kZWZpbmVkID0gdGhpcyAuIHBhcmVudCBhcyBTcHJpdGVOb2RlIDtcclxuICAgICAgICBpZiAoIHBhcmVudCAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50IC4gc3ByaXRlIDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkIDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNwcml0ZUNvdW50ICggKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBjaGlsZENvdW50IDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U3ByaXRlSW5kZXggKCBzcHJpdGU6IElTcHJpdGUgKTogbnVtYmVyIHtcclxuICAgICAgICBmb3IgKCBsZXQgaSA6IG51bWJlciA9IDAgOyBpIDwgdGhpcyAuIGNoaWxkQ291bnQgOyBpICsrICkge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgOiBTcHJpdGVOb2RlID0gdGhpcyAuIGdldENoaWxkQXQgKCBpICkgYXMgU3ByaXRlTm9kZSA7XHJcbiAgICAgICAgICAgIGlmICggY2hpbGQgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgIGlmICggY2hpbGQgLiBzcHJpdGUgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICAgIGlmICggY2hpbGQgLiBzcHJpdGUgPT09IHNwcml0ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSA7XHJcbiAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtIDE7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBhZGRDaGlsZEF0ICggY2hpbGQgOiBUcmVlTm9kZSA8IElTcHJpdGUgPiAsIGluZGV4IDogbnVtYmVyICkgOiBUcmVlTm9kZSA8IElTcHJpdGUgPiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IHJldCA6IFRyZWVOb2RlIDwgSVNwcml0ZSA+IHwgdW5kZWZpbmVkID0gc3VwZXIgLiBhZGRDaGlsZEF0ICggY2hpbGQgLCBpbmRleCApIDtcclxuICAgICAgICBpZiAoIHJldCAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICBpZiAoIHJldCAuIGRhdGEgKSB7XHJcbiAgICAgICAgICAgICAgICByZXQgLiBkYXRhIC4gb3duZXIgPSByZXQgYXMgU3ByaXRlTm9kZSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzcHJpdGUgKCApIDogSVNwcml0ZSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBkYXRhIDtcclxuICAgIH1cclxuICAgICAgXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2hpbGRBdCAoIGluZGV4IDogbnVtYmVyICkgOiBUcmVlTm9kZSA8IElTcHJpdGUgPiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IHJldDogVHJlZU5vZGUgPCBJU3ByaXRlID4gfCB1bmRlZmluZWQgPSBzdXBlciAuIHJlbW92ZUNoaWxkQXQgKCBpbmRleCApIDtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5kU3ByaXRlICggc3JjIDogdmVjMiAsIGxvY2FsUG9pbnQgOiB2ZWMyIHwgbnVsbCA9IG51bGwgKTogSVNwcml0ZSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IGl0ZXIgOiBJRW51bWVyYXRvciA8IFRyZWVOb2RlIDwgSVNwcml0ZSA+ID4gID0gTm9kZUVudW1lcmF0b3JGYWN0b3J5IC4gY3JlYXRlX2JmX3IybF9iMnRfaXRlciAoIHRoaXMgLiByb290ICkgO1xyXG4gICAgICAgIGxldCBjdXJyZW50IDogVHJlZU5vZGU8SVNwcml0ZT4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQgO1xyXG4gICAgICAgIGxldCBtYXQgOiBtYXQyZCA7XHJcbiAgICAgICAgbGV0IGRlc3QgOiB2ZWMyID0gdmVjMiAuIGNyZWF0ZSAoICkgO1xyXG4gICAgICAgIHdoaWxlKCBpdGVyIC4gbW92ZU5leHQgKCApICkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gaXRlciAuIGN1cnJlbnQgO1xyXG4gICAgICAgICAgICBpZiAoIGN1cnJlbnQgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgIGlmKCBjdXJyZW50IC4gZGF0YSAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdCA9IGN1cnJlbnQgLiBkYXRhIC4gZ2V0TG9jYWxNYXRyaXggKCApIDtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgyRCAuIHRyYW5zZm9ybSAoIG1hdCAsIHNyYyAsIGRlc3QgKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBjdXJyZW50IC4gZGF0YSAuIGhpdFRlc3QgKCBkZXN0ICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGxvY2FsUG9pbnQgIT09IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxQb2ludCAuIHggPSBkZXN0IC4geCA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxQb2ludCAuIHkgPSBkZXN0IC4geSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudCAuIGRhdGEgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3ICggY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICk6IHZvaWQge1xyXG4gICAgICAgIGlmICggdGhpcyAuIHNwcml0ZSAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICB0aGlzIC4gc3ByaXRlIC4gZHJhdyAoIGNvbnRleHQgKSA7XHJcbiAgICAgICAgICAgIHRoaXMgLiBfZHJhd0NoaWxkcmVuICggY29udGV4dCApIDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9kcmF3Q2hpbGRyZW4gKCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgKTogdm9pZCB7XHJcbiAgICAgICAgZm9yICggbGV0IGkgOiBudW1iZXIgPSAwOyBpIDwgdGhpcyAuIGNoaWxkQ291bnQgOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA6IFRyZWVOb2RlIDwgSVNwcml0ZSA+IHwgdW5kZWZpbmVkID0gdGhpcyAuIGdldENoaWxkQXQgKCBpICkgO1xyXG4gICAgICAgICAgICBpZiAoIGNoaWxkICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ByaXRlTm9kZSA6IFNwcml0ZU5vZGUgPSBjaGlsZCBhcyBTcHJpdGVOb2RlIDtcclxuICAgICAgICAgICAgICAgIHNwcml0ZU5vZGUgLiBkcmF3ICggY29udGV4dCApIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlICggbXNlYyA6IG51bWJlciAsIGRpZmZTZWMgOiBudW1iZXIgKSA6IHZvaWQge1xyXG4gICAgICAgIGlmICggdGhpcyAuIHNwcml0ZSAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICB0aGlzIC4gc3ByaXRlIC4gdXBkYXRlICggbXNlYyAsIGRpZmZTZWMgLCBFT3JkZXIgLiBQUkVPUkRFUiApIDtcclxuICAgICAgICAgICAgdGhpcyAuIF91cGRhdGVDaGlsZHJlbiAoIG1zZWMgLCBkaWZmU2VjICkgO1xyXG4gICAgICAgICAgICB0aGlzIC4gc3ByaXRlIC4gdXBkYXRlICggbXNlYyAsIGRpZmZTZWMgLCBFT3JkZXIgLiBQT1NUT1JERVIgKSA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfdXBkYXRlQ2hpbGRyZW4gKCBtc2VjIDogbnVtYmVyLGRpZmZTZWMgOiBudW1iZXIgKSA6IHZvaWQge1xyXG4gICAgICAgIGZvciAoIGxldCBpID0gMCA7IGkgPCB0aGlzIC4gY2hpbGRDb3VudCA7IGkrKyApIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkIDogVHJlZU5vZGU8SVNwcml0ZT4gfCB1bmRlZmluZWQgPSB0aGlzIC4gZ2V0Q2hpbGRBdCAoIGkgKSA7XHJcbiAgICAgICAgICAgIGlmICggY2hpbGQgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcHJpdGVOb2RlIDogU3ByaXRlTm9kZSA9IGNoaWxkIGFzIFNwcml0ZU5vZGUgO1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlTm9kZSAuIHVwZGF0ZSAoIG1zZWMgLCBkaWZmU2VjICkgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSAgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGVOb2RlTWFuYWdlciBpbXBsZW1lbnRzIElEaXNwYXRjaGVyIHtcclxuICAgIHByaXZhdGUgX3Jvb3ROb2RlIDogU3ByaXRlTm9kZSA7XHJcbiAgICBwcml2YXRlIF9kcmFnU3ByaXRlIDogSVNwcml0ZSB8IHVuZGVmaW5lZCAgPSB1bmRlZmluZWQgO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggd2lkdGggOiBudW1iZXIgLCBoZWlnaHQgOiBudW1iZXIgKSB7XHJcbiAgICAgICAgbGV0IHNwciA6IElTcHJpdGUgPSBTcHJpdGVGYWN0b3J5IC4gY3JlYXRlSVNwcml0ZSAoIFNwcml0ZUZhY3RvcnkgLiBjcmVhdGVHcmlkICggd2lkdGggLCBoZWlnaHQgKSApIDtcclxuICAgICAgICBzcHIgLiBuYW1lID0gJ3Jvb3QnIDtcclxuICAgICAgICBzcHIgLiBzdHJva2VTdHlsZSA9IFwiYmxhY2tcIiA7XHJcbiAgICAgICAgc3ByIC4gZmlsbFN0eWxlID0nd2hpdGUnIDtcclxuICAgICAgICBzcHIgLiByZW5kZXJUeXBlID0gRVJlbmRlclR5cGUgLiBTVFJPS0VfRklMTCA7XHJcbiAgICAgICAgdGhpcyAuIF9yb290Tm9kZSA9IG5ldyBTcHJpdGVOb2RlICggIHNwciAsIHVuZGVmaW5lZCAsIHNwciAuIG5hbWUgKSA7XHJcbiAgICAgICAgc3ByIC4gb3duZXIgPSB0aGlzIC4gX3Jvb3ROb2RlIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbnRhaW5lciAoICkgOiBJU3ByaXRlQ29udGFpbmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcyAuIF9yb290Tm9kZSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3BhdGNoTW91c2VFdmVudCAoIGV2dCA6IENhbnZhc01vdXNlRXZlbnQgKSA6IHZvaWQge1xyXG4gICAgICAgIGlmICggZXZ0IC4gdHlwZSA9PT0gRUlucHV0RXZlbnRUeXBlIC4gTU9VU0VVUCApIHtcclxuICAgICAgICAgICAgdGhpcyAuIF9kcmFnU3ByaXRlID0gdW5kZWZpbmVkIDtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2dCAuIHR5cGUgPT09IEVJbnB1dEV2ZW50VHlwZSAuIE1PVVNFRFJBRykge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMgLiBfZHJhZ1Nwcml0ZSAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzIC4gX2RyYWdTcHJpdGUgLiBtb3VzZUV2ZW50ICE9PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMgLiBfZHJhZ1Nwcml0ZSAuIG1vdXNlRXZlbnQgKCB0aGlzIC4gX2RyYWdTcHJpdGUgLCBldnQgKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNwciA6IElTcHJpdGUgfCB1bmRlZmluZWQgPSB0aGlzIC4gX3Jvb3ROb2RlIC4gZmluZFNwcml0ZSAoIGV2dCAuIGNhbnZhc1Bvc2l0aW9uICwgZXZ0IC4gbG9jYWxQb3NpdGlvbiApIDtcclxuICAgICAgICBpZiAoIHNwciAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICBldnQgLiBoYXNMb2NhbFBvc2l0aW9uID0gdHJ1ZSA7XHJcbiAgICAgICAgICAgIGlmICggZXZ0IC4gYnV0dG9uID09PSAwICYmIGV2dCAuIHR5cGUgPT09IEVJbnB1dEV2ZW50VHlwZSAuIE1PVVNFRE9XTiApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMgLiBfZHJhZ1Nwcml0ZSA9IHNwciA7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIGV2dCAuIHR5cGUgPT09IEVJbnB1dEV2ZW50VHlwZSAuIE1PVVNFRFJBRyApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBzcHIgLiBtb3VzZUV2ZW50ICkge1xyXG4gICAgICAgICAgICAgICAgc3ByIC4gbW91c2VFdmVudCAoIHNwciAsIGV2dCAgKSA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXZ0IC4gaGFzTG9jYWxQb3NpdGlvbiA9IGZhbHNlIDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBkaXNwYXRjaEtleUV2ZW50ICggZXZ0OiBDYW52YXNLZXlCb2FyZEV2ZW50ICkgOiB2b2lkIHtcclxuICAgICAgICB0aGlzIC4gX3Jvb3ROb2RlIC4gdmlzaXQgKCBcclxuICAgICAgICAgICAgKCBub2RlIDogVHJlZU5vZGUgPCBJU3ByaXRlID4gKSA6ICB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICggbm9kZSAuIGRhdGEgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIG5vZGUgLiBkYXRhIC4ga2V5RXZlbnQgIT09IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgLiBkYXRhIC4ga2V5RXZlbnQgKCBub2RlIC4gZGF0YSAsIGV2dCAgKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKSA7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGF0Y2hVcGRhdGUgKCBtc2VjIDogbnVtYmVyICwgZGlmZlNlYyA6IG51bWJlciApIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcyAuIF9yb290Tm9kZSAuIHVwZGF0ZSAoIG1zZWMgLCBkaWZmU2VjICkgO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BhdGNoRHJhdyAoIGNvbnRleHQgOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgKSA6IHZvaWQge1xyXG4gICAgICAgIHRoaXMgLiBfcm9vdE5vZGUgLiBkcmF3ICggY29udGV4dCApIDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDYW52YXNNb3VzZUV2ZW50LCBDYW52YXNLZXlCb2FyZEV2ZW50LCBFSW5wdXRFdmVudFR5cGUgfSBmcm9tIFwiLi4vYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHtJU3ByaXRlQ29udGFpbmVyLElEaXNwYXRjaGVyLElTcHJpdGUsRU9yZGVyfSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHttYXQyZCxNYXRoMkQgLCB2ZWMyIH0gZnJvbSBcIi4uL21hdGgyZFwiXHJcblxyXG5leHBvcnQgY2xhc3MgU3ByaXRlMkRNYW5hZ2VyIGltcGxlbWVudHMgSVNwcml0ZUNvbnRhaW5lciAsIElEaXNwYXRjaGVyICB7XHJcbiAgICBwdWJsaWMgbmFtZSA6IHN0cmluZyA9ICdzcHJpdGUyZE1hbmFnZXInIDtcclxuICAgIHByaXZhdGUgX3Nwcml0ZXM6IElTcHJpdGUgWyBdID0gWyBdIDtcclxuXHJcbiAgICBwdWJsaWMgYWRkU3ByaXRlICggc3ByaXRlIDogSVNwcml0ZSAgKSA6IElTcHJpdGVDb250YWluZXIge1xyXG4gICAgICAgIHNwcml0ZSAuIG93bmVyID0gdGhpcyA7XHJcbiAgICAgICAgdGhpcyAuIF9zcHJpdGVzIC4gcHVzaCAoIHNwcml0ZSApIDtcclxuICAgICAgICByZXR1cm4gdGhpcyA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVNwcml0ZUF0ICggaWR4IDogbnVtYmVyICkgOiB2b2lkIHtcclxuICAgICAgICB0aGlzIC4gX3Nwcml0ZXMgLiBzcGxpY2UoIGlkeCAsIDEgKSA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyByZW1vdmVTcHJpdGUgKCBzcHJpdGUgOiBJU3ByaXRlICkgOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaWR4ID0gdGhpcyAuIGdldFNwcml0ZUluZGV4ICggc3ByaXRlICkgO1xyXG4gICAgICAgIGlmICggaWR4ICE9IC0xICkge1xyXG4gICAgICAgICAgICB0aGlzIC4gcmVtb3ZlU3ByaXRlQXQgKCBpZHggKSA7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQWxsICggKSA6IHZvaWQge1xyXG4gICAgICAgIHRoaXMgLiBfc3ByaXRlcyA9IFsgXSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNwcml0ZSAoIGlkeCA6IG51bWJlciApIDogSVNwcml0ZSB7XHJcbiAgICAgICAgaWYgKCBpZHggPCAwIHx8IGlkeCA+IHRoaXMgLiBfc3ByaXRlcyAuIGxlbmd0aCAtIDEgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciAoIFwi5Y+C5pWwaWR46LaK55WMISFcIiApIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBfc3ByaXRlcyBbIGlkeCBdIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U3ByaXRlQ291bnQgKCApIDogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcyAuIF9zcHJpdGVzIC4gbGVuZ3RoIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U3ByaXRlSW5kZXggKCBzcHJpdGU6IElTcHJpdGUgKTogbnVtYmVyIHtcclxuICAgICAgICBmb3IgKCBsZXQgaSA9IDAgOyBpIDwgdGhpcyAuIF9zcHJpdGVzIC4gbGVuZ3RoIDsgaSsrICkge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMgLiBfc3ByaXRlcyBbIGkgXSA9PT0gc3ByaXRlICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBhcmVudFNwcml0ZSAoICkgOiBJU3ByaXRlIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3ByaXRlIDogSVNwcml0ZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCA7XHJcblxyXG4gICAgcHJpdmF0ZSBfZHJhZ1Nwcml0ZSA6IElTcHJpdGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQgO1xyXG4gICBcclxuICAgIHB1YmxpYyBnZXQgY29udGFpbmVyICggKSA6IElTcHJpdGVDb250YWluZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcGF0Y2hVcGRhdGUgKCBtc2VjIDogbnVtYmVyICwgZGlmZiA6IG51bWJlciApIDogdm9pZCB7XHJcbiAgICAgICAgZm9yICggbGV0IGkgPSAwIDsgaSA8IHRoaXMgLiBfc3ByaXRlcyAuIGxlbmd0aCA7IGkgKysgKSB7XHJcbiAgICAgICAgICAgIHRoaXMgLiBfc3ByaXRlcyBbIGkgXSAuIHVwZGF0ZSAoIG1zZWMgLCBkaWZmICwgRU9yZGVyIC4gUFJFT1JERVIgKSA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKCBsZXQgaSA9IHRoaXMgLiBfc3ByaXRlcyAuIGxlbmd0aCAtMSA7IGkgPj0gMCA7IGkgLS0gKSB7XHJcbiAgICAgICAgICAgIHRoaXMgLiBfc3ByaXRlcyBbIGkgXSAuIHVwZGF0ZSAoIG1zZWMgLCBkaWZmICwgRU9yZGVyIC4gUE9TVE9SREVSICkgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcGF0Y2hEcmF3ICggY29udGV4dCA6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCApIDogdm9pZCB7XHJcbiAgICAgICAgZm9yICggbGV0IGkgPSAwIDsgaSA8IHRoaXMgLiBfc3ByaXRlcyAuIGxlbmd0aCA7IGkrKyApIHtcclxuICAgICAgICAgICAgdGhpcyAuIF9zcHJpdGVzIFsgaSBdIC4gZHJhdyAoIGNvbnRleHQgKSA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwYXRjaEtleUV2ZW50ICggZXZ0IDogQ2FudmFzS2V5Qm9hcmRFdmVudCApIDogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNwcjogSVNwcml0ZSA7XHJcbiAgICAgICAgZm9yICggbGV0IGkgPSAwIDsgaSA8IHRoaXMgLiBfc3ByaXRlcyAuIGxlbmd0aCA7IGkrKyApIHtcclxuICAgICAgICAgICAgc3ByID0gdGhpcyAuIF9zcHJpdGVzIFsgaSBdIDtcclxuICAgICAgICAgICAgaWYgKCBzcHIgLiBrZXlFdmVudCApIHtcclxuICAgICAgICAgICAgICAgIHNwciAuIGtleUV2ZW50ICggc3ByLCBldnQgKSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3BhdGNoTW91c2VFdmVudCAoIGV2dCA6IENhbnZhc01vdXNlRXZlbnQgKSA6IHZvaWQge1xyXG4gICAgICAgIGlmICggZXZ0IC4gdHlwZSA9PT0gRUlucHV0RXZlbnRUeXBlIC4gTU9VU0VVUCApIHtcclxuICAgICAgICAgICAgdGhpcyAuIF9kcmFnU3ByaXRlID0gdW5kZWZpbmVkIDtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2dCAuIHR5cGUgPT09IEVJbnB1dEV2ZW50VHlwZSAuIE1PVVNFRFJBRykge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMgLiBfZHJhZ1Nwcml0ZSAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzIC4gX2RyYWdTcHJpdGUgLiBtb3VzZUV2ZW50ICE9PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMgLiBfZHJhZ1Nwcml0ZSAuIG1vdXNlRXZlbnQgKCB0aGlzIC4gX2RyYWdTcHJpdGUgLCBldnQgKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNwciA6IElTcHJpdGUgO1xyXG4gICAgICAgIGZvciAoIGxldCBpID0gdGhpcyAuIF9zcHJpdGVzIC4gbGVuZ3RoIC0gMSA7IGkgPj0gMCA7IGktLSApIHtcclxuICAgICAgICAgICAgc3ByID0gdGhpcyAuIF9zcHJpdGVzIFsgaSBdIDtcclxuICAgICAgICAgICAgbGV0IG1hdCA6IG1hdDJkIHwgbnVsbCA9IHNwciAuIGdldExvY2FsTWF0cml4ICggKSA7XHJcbiAgICAgICAgICAgIE1hdGgyRCAuIHRyYW5zZm9ybSAoIG1hdCAsIGV2dCAuIGNhbnZhc1Bvc2l0aW9uICwgZXZ0IC4gbG9jYWxQb3NpdGlvbiApIDtcclxuICAgICAgICAgICAgaWYgKCBzcHIgLiBoaXRUZXN0ICggZXZ0IC4gbG9jYWxQb3NpdGlvbiApICkge1xyXG4gICAgICAgICAgICAgICAgZXZ0IC4gaGFzTG9jYWxQb3NpdGlvbiA9IHRydWUgO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBldnQgLiBidXR0b24gPT09IDAgJiYgZXZ0IC4gdHlwZSA9PT0gRUlucHV0RXZlbnRUeXBlIC4gTU9VU0VET1dOKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMgLiBfZHJhZ1Nwcml0ZSA9IHNwciA7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgICAgIGlmICggZXZ0IC4gdHlwZSA9PT0gRUlucHV0RXZlbnRUeXBlIC4gTU9VU0VEUkFHICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICggc3ByIC4gbW91c2VFdmVudCApIHtcclxuICAgICAgICAgICAgICAgICAgICBzcHIgLiBtb3VzZUV2ZW50ICggc3ByICwgZXZ0ICkgO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA7ICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IElFbnVtZXJhdG9yIH0gZnJvbSBcIi4vSUVudW1lcmF0b3JcIlxyXG5cclxuZXhwb3J0IHR5cGUgSW5kZXhlciA9ICggbGVuIDogbnVtYmVyICwgaWR4IDogbnVtYmVyICkgPT4gbnVtYmVyIDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJbmRleGVyTDJSICggbGVuIDogbnVtYmVyICwgaWR4IDogbnVtYmVyICkgOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGlkeCA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJbmRleGVyUjJMICggbGVuIDogbnVtYmVyICwgaWR4IDogbnVtYmVyICkgOiBudW1iZXIge1xyXG4gICAgcmV0dXJuICggbGVuIC0gaWR4IC0gMSApIDtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgTm9kZUNhbGxiYWNrIDwgVCA+ID0gKCBub2RlIDogVHJlZU5vZGUgPCBUID4gKSA9PiB2b2lkIDtcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBZGFwdGVyIDwgVCA+IHtcclxuICAgIGFkZCAoIHQgOiBUICkgOiB2b2lkIDsgXHJcbiAgICByZW1vdmUgKCApIDogVCB8IHVuZGVmaW5lZCA7IFxyXG4gICAgY2xlYXIgKCApIDogdm9pZCA7XHJcbiAgICBsZW5ndGggOiBudW1iZXIgOyBcclxuICAgIGlzRW1wdHkgOiBib29sZWFuIDtcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFkYXB0ZXJCYXNlIDwgVCA+IGltcGxlbWVudHMgSUFkYXB0ZXIgPCBUID4ge1xyXG4gICAgcHJvdGVjdGVkIF9hcnIgOiBBcnJheSA8IFQgPiA7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzIC4gX2FyciA9IG5ldyBBcnJheSA8IFQgPiAoICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGQgKCB0IDogVCApIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcyAuIF9hcnIgLiBwdXNoICggdCApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVtb3ZlICggKSA6IFQgfCB1bmRlZmluZWQgO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgbGVuZ3RoICggKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBfYXJyIC4gbGVuZ3RoIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzRW1wdHkgKCApIDogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBfYXJyIC4gbGVuZ3RoIDw9IDAgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhciAoICkgOiB2b2lkIHtcclxuICAgICAgICB0aGlzIC4gX2FyciA9IG5ldyBBcnJheSA8IFQgPiAoICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZyAoICkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzIC4gX2FyciAuIHRvU3RyaW5nICggKSA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFjayA8IFQgPiBleHRlbmRzIEFkYXB0ZXJCYXNlIDwgVCA+IHtcclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlICggKSA6IFQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICggdGhpcyAuIF9hcnIgLiBsZW5ndGggPiAwIClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMgLiBfYXJyIC4gcG9wICggKSA7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkIDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXVlIDwgVCA+IGV4dGVuZHMgQWRhcHRlckJhc2UgPCBUID4ge1xyXG5cclxuICAgIHB1YmxpYyByZW1vdmUgKCApIDogVCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gX2FyciAuIGxlbmd0aCA+IDAgKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcyAuIF9hcnIgLiBzaGlmdCAoICkgO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZSA8IFQgPiB7XHJcblxyXG4gICAgLypcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOagkeaVsOaNrue7k+aehFxyXG4gICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcm9vdC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgLyAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbiAgICAgICAgbm9kZTEgICAgICAgICAgICAgICAgICAgICAgIG5vZGUyICAgICAgICAgICAgICAgICAgbm9kZTNcclxuICAgICAgLyAgIHwgICBcXCAgICAgICAgICAgICAgICAgICAgLyAgICAgIFxcICAgICAgICAgICAgICAgICAgfFxyXG4gbm9kZTQgIG5vZGU1IG5vZGU2ICAgICAgICAgICAgICBub2RlNyAgIG5vZGU4ICAgICAgICAgICAgIG5vZGU5XHJcbiAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICB8XHJcbiAgbm9kZTEwICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTExICBub2RlMTJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlMTNcclxuICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCBkYXRhOiBUIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkICwgcGFyZW50OiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCAsIG5hbWUgOiBzdHJpbmcgPSBcIlwiICkge1xyXG5cclxuICAgICAgICB0aGlzIC4gX3BhcmVudCA9IHBhcmVudCA7XHJcbiAgICAgICAgdGhpcyAuIF9jaGlsZHJlbiA9IHVuZGVmaW5lZCA7XHJcbiAgICAgICAgdGhpcyAuIG5hbWUgPSBuYW1lIDtcclxuICAgICAgICB0aGlzIC4gZGF0YSA9IGRhdGEgO1xyXG4gICAgICAgIGlmICggdGhpcyAuIF9wYXJlbnQgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgdGhpcyAuIF9wYXJlbnQgLiBhZGRDaGlsZCAoIHRoaXMgKSA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRDaGlsZEF0ICggY2hpbGQgOiBUcmVlTm9kZTxUPiAgLCBpbmRleCA6IG51bWJlciApIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICggdGhpcyAuIGlzRGVzY2VuZGFudE9mICggY2hpbGQgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCA7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCB0aGlzIC4gX2NoaWxkcmVuID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIHRoaXMgLiBfY2hpbGRyZW4gPSBbXSA7XHJcbiAgICAgICAgICAgIC8vdGhpcy5fY2hpbGRyZW4gPSBuZXcgQXJyYXk8VHJlZU5vZGU8VD4+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIGluZGV4ID49IDAgJiYgaW5kZXggPD0gdGhpcyAuIF9jaGlsZHJlbiAuIGxlbmd0aCApIHtcclxuICAgICAgICAgICAgaWYgKCBjaGlsZCAuIF9wYXJlbnQgKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZCAuIF9wYXJlbnQgLiByZW1vdmVDaGlsZCAoIGNoaWxkICkgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoaWxkIC4gX3BhcmVudCA9IHRoaXMgO1xyXG4gICAgICAgICAgICB0aGlzIC4gX2NoaWxkcmVuIC4gc3BsaWNlICggaW5kZXggLCAwICwgY2hpbGQgKSA7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZCA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQ2hpbGQgKCBjaGlsZDogVHJlZU5vZGUgPCBUID4gKSA6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoIHRoaXMgLiBfY2hpbGRyZW4gPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgdGhpcyAuIF9jaGlsZHJlbiA9IFsgXSA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzIC4gYWRkQ2hpbGRBdCggY2hpbGQgLCB0aGlzIC4gX2NoaWxkcmVuIC4gbGVuZ3RoICkgO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2hpbGRBdCAoIGluZGV4IDogbnVtYmVyICk6IFRyZWVOb2RlIDwgVCA+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoIHRoaXMgLiBfY2hpbGRyZW4gPT09IHVuZGVmaW5lZCApXHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQgO1xyXG5cclxuICAgICAgICBsZXQgY2hpbGQgOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCA9IHRoaXMgLiBnZXRDaGlsZEF0ICggaW5kZXggKSA7XHJcblxyXG4gICAgICAgIGlmICggY2hpbGQgPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0aGlzIC4gX2NoaWxkcmVuIC4gc3BsaWNlKCBpbmRleCAsIDEgKSA7IC8vIOS7juWtkOiKgueCueWIl+ihqOS4reenu+mZpOaOiVxyXG4gICAgICAgIGNoaWxkIC4gX3BhcmVudCA9IHVuZGVmaW5lZCA7IC8vIOWwhuWtkOiKgueCueeahOeItuS6suiKgueCueiuvue9ruS4unVuZGVmaW5lZFxyXG4gICAgICAgIHJldHVybiBjaGlsZCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNoaWxkICggY2hpbGQgOiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCApIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICggY2hpbGQgPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICBpZiAoIHRoaXMuX2NoaWxkcmVuID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaW5kZXggOiBudW1iZXIgPSAtMSA7XHJcbiAgICAgICAgZm9yICggbGV0IGkgPSAwIDsgaSA8IHRoaXMgLiBfY2hpbGRyZW4gLiBsZW5ndGggOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcyAuIGdldENoaWxkQXQgKCBpICkgPT09IGNoaWxkICkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpOyBcclxuICAgICAgICAgICAgICAgIGJyZWFrIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBpbmRleCA9PT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiByZW1vdmVDaGlsZEF0ICggaW5kZXggKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZSAoICkgOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gX3BhcmVudCAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcyAuIF9wYXJlbnQgLiByZW1vdmVDaGlsZCAoIHRoaXMgKSA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDaGlsZEF0ICggaW5kZXg6IG51bWJlciApOiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gX2NoaWxkcmVuID09PSB1bmRlZmluZWQgKVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkIDtcclxuICAgICAgICBpZiAoIGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzIC4gX2NoaWxkcmVuIC4gbGVuZ3RoIClcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBfY2hpbGRyZW4gWyBpbmRleCBdIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNoaWxkQ291bnQgKCApIDogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIHRoaXMgLiBfY2hpbGRyZW4gIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMgLiBfY2hpbGRyZW4gLiBsZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMCA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXNDaGlsZCAoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBfY2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzIC4gX2NoaWxkcmVuIC4gbGVuZ3RoID4gMCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzRGVzY2VuZGFudE9mICggYW5jZXN0b3I6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkICk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICggYW5jZXN0b3IgPT09IHVuZGVmaW5lZCApXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgbm9kZTogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQgPSB0aGlzLl9wYXJlbnQ7XHJcbiAgICAgICAgZm9yICggbGV0IG5vZGU6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkID0gdGhpcy5fcGFyZW50OyBub2RlICE9PSB1bmRlZmluZWQ7IG5vZGUgPSBub2RlLl9wYXJlbnQgKSB7XHJcbiAgICAgICAgICAgIGlmICggbm9kZSA9PT0gYW5jZXN0b3IgKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNoaWxkcmVuICggKSA6IEFycmF5IDwgVHJlZU5vZGUgPCBUID4gPiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBfY2hpbGRyZW4gO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFyZW50ICgpIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzIC4gX3BhcmVudCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCByb290ICggKSA6IFRyZWVOb2RlIDwgVCA+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgY3VycjogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQgPSB0aGlzIDtcclxuICAgICAgICB3aGlsZSAoIGN1cnIgIT09IHVuZGVmaW5lZCAmJiBjdXJyIC4gcGFyZW50ICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIGN1cnIgPSBjdXJyIC4gcGFyZW50IDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRlcHRoICgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjdXJyIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQgPSB0aGlzIDtcclxuICAgICAgICBsZXQgbGV2ZWwgOiBudW1iZXIgPSAwIDtcclxuICAgICAgICB3aGlsZSAoIGN1cnIgIT09IHVuZGVmaW5lZCAmJiBjdXJyIC4gcGFyZW50ICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIGN1cnIgPSBjdXJyIC4gcGFyZW50IDtcclxuICAgICAgICAgICAgbGV2ZWwrKyA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsZXZlbCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlcGVhdFN0cmluZyAoIHRhcmdldDogc3RyaW5nLCBuOiBudW1iZXIgKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdG90YWw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgZm9yICggbGV0IGkgPSAwIDsgaSA8IG4gOyBpICsrKSB7XHJcbiAgICAgICAgICAgIHRvdGFsICs9IHRhcmdldCA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b3RhbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlzaXQgKCAgcHJlT3JkZXJGdW5jIDogTm9kZUNhbGxiYWNrIDwgVCA+IHwgbnVsbCA9IG51bGwgICwgcG9zdE9yZGVyRnVuYyA6IE5vZGVDYWxsYmFjayA8IFQgPiB8IG51bGwgPSBudWxsICwgaW5kZXhGdW5jIDogSW5kZXhlciA9IEluZGV4ZXJMMlIgKSA6IHZvaWQge1xyXG4gICAgICAgIGlmICggcHJlT3JkZXJGdW5jICE9PSBudWxsICkge1xyXG4gICAgICAgICAgICBwcmVPcmRlckZ1bmMgKCB0aGlzICkgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFyciA6IEFycmF5IDwgVHJlZU5vZGUgPCBUID4gPiB8IHVuZGVmaW5lZCA9IHRoaXMgLiBfY2hpbGRyZW4gO1xyXG4gICAgICAgIGlmICggYXJyICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIGZvciAoIGxldCBpIDogbnVtYmVyID0gMCA7IGkgPCBhcnIgLiBsZW5ndGggOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgOiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCA9IHRoaXMgLiBnZXRDaGlsZEF0ICggaW5kZXhGdW5jICggYXJyIC4gbGVuZ3RoICwgaSApICkgO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBjaGlsZCAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkIC4gdmlzaXQgKCBwcmVPcmRlckZ1bmMgLCBwb3N0T3JkZXJGdW5jICwgaW5kZXhGdW5jICkgO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBwb3N0T3JkZXJGdW5jICE9PSBudWxsICkge1xyXG4gICAgICAgICAgICBwb3N0T3JkZXJGdW5jICggdGhpcyApIDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpc2l0Rm9yd2FyZCAoIHByZU9yZGVyRnVuYyA6IE5vZGVDYWxsYmFjayA8IFQgPiB8IG51bGwgPSBudWxsICAsIHBvc3RPcmRlckZ1bmMgOiBOb2RlQ2FsbGJhY2sgPCBUID4gfCBudWxsID0gbnVsbCApIDogdm9pZCB7XHJcbiAgICAgICAgaWYgKCBwcmVPcmRlckZ1bmMgKSB7XHJcbiAgICAgICAgICAgIHByZU9yZGVyRnVuYyAoIHRoaXMgKSA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBub2RlIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQgPSB0aGlzIC4gZmlyc3RDaGlsZCA7XHJcbiAgICAgICAgd2hpbGUgKCBub2RlICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIG5vZGUgLiB2aXNpdEZvcndhcmQgKCBwcmVPcmRlckZ1bmMgLCBwb3N0T3JkZXJGdW5jICkgO1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZSAuIG5leHRTaWJsaW5nIDsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggcG9zdE9yZGVyRnVuYyApIHtcclxuICAgICAgICAgICAgcG9zdE9yZGVyRnVuYyAoIHRoaXMgKSA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2aXNpdEJhY2t3YXJkICggcHJlT3JkZXJGdW5jIDogTm9kZUNhbGxiYWNrIDwgVCA+IHwgbnVsbCA9IG51bGwgICwgcG9zdE9yZGVyRnVuYyA6IE5vZGVDYWxsYmFjayA8IFQgPiB8IG51bGwgPSBudWxsICkgOiB2b2lkIHtcclxuICAgICAgICBpZiAoIHByZU9yZGVyRnVuYyApIHtcclxuICAgICAgICAgICAgcHJlT3JkZXJGdW5jICggdGhpcyApIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5vZGUgOiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCA9IHRoaXMgLiBsYXN0Q2hpbGQgO1xyXG4gICAgICAgIHdoaWxlICggbm9kZSAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICBub2RlIC4gdmlzaXRCYWNrd2FyZCAoIHByZU9yZGVyRnVuYyAsIHBvc3RPcmRlckZ1bmMgKSA7XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2RlIC4gcHJldlNpYmxpbmcgOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBwb3N0T3JkZXJGdW5jICkge1xyXG4gICAgICAgICAgICBwb3N0T3JkZXJGdW5jICggdGhpcyApIDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByaW50TGV2ZWxJbmZvICggaWR4IDogbnVtYmVyID0gMCAgKSA6IHZvaWQge1xyXG4gICAgICAgIGxldCBzdHIgOiBzdHJpbmcgPSB0aGlzIC4gcmVwZWF0U3RyaW5nKCBcIiBcIiwgaWR4ICogNCApO1xyXG4gICAgICAgIGxldCBhcnIgOiBBcnJheSA8IFRyZWVOb2RlIDwgVCA+ID4gfCB1bmRlZmluZWQgPSB0aGlzIC4gX2NoaWxkcmVuIDtcclxuICAgICAgICBpZiAoIGFyciAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICBmb3IgKCBsZXQgaSA6IG51bWJlciA9IDAgOyBpIDwgYXJyIC4gbGVuZ3RoIDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQgPSB0aGlzIC4gZ2V0Q2hpbGRBdCAoIGkgKSA7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNoaWxkICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQgLiBwcmludExldmVsSW5mbyAoIGlkeCArIDEgKSA7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUgLiBsb2cgKCBcIuWQjuague+8mlwiICArIHN0ciArIHRoaXMgLiBuYW1lICkgO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIHByaW50SW5mbyAoIGlkeCA6IG51bWJlciA9IDAgKSA6IHZvaWQge1xyXG4gICAgICAgIGxldCBzdHIgOiBzdHJpbmcgPSB0aGlzIC4gcmVwZWF0U3RyaW5nKCBcIiBcIiwgaWR4ICogNCApO1xyXG4gICAgICAgIGNvbnNvbGUgLiBsb2coIFwi5YWI5qC577yaXCIgKyBzdHIgKyB0aGlzLm5hbWUgKTtcclxuICAgICAgICBsZXQgbm9kZSA6IFRyZWVOb2RlIDwgVCA+IHwgdW5kZWZpbmVkID0gdGhpcyAuIGZpcnN0Q2hpbGQgO1xyXG4gICAgICAgIHdoaWxlICggbm9kZSAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICBub2RlIC4gcHJpbnRJbmZvICggaWR4ICsgMSApIDtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUgLiBuZXh0U2libGluZyA7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJpbnRJbmZvMiAoIGlkeCA6IG51bWJlciA9IDAgKSA6IHZvaWQge1xyXG4gICAgICAgIGxldCBzdHIgOiBzdHJpbmcgPSB0aGlzIC4gcmVwZWF0U3RyaW5nKCBcIiBcIiwgaWR4ICogNCApO1xyXG4gICAgICAgIGNvbnNvbGUgLiBsb2coIFwi5YWI5qC577yaXCIgKyBzdHIgKyB0aGlzLm5hbWUgKTtcclxuICAgICAgICBsZXQgbm9kZSA6IFRyZWVOb2RlIDwgVCA+IHwgdW5kZWZpbmVkID0gdGhpcyAuIGxhc3RDaGlsZCA7XHJcbiAgICAgICAgd2hpbGUgKCBub2RlICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIG5vZGUgLiBwcmludEluZm8gKCBpZHggKyAxICkgO1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZSAuIHByZXZTaWJsaW5nIDsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZmlyc3RDaGlsZCAoICkgOiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gX2NoaWxkcmVuICE9PSB1bmRlZmluZWQgICYmICB0aGlzIC4gX2NoaWxkcmVuIC4gbGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMgLiBfY2hpbGRyZW4gWyAwIF0gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGxhc3RDaGlsZCAoICkgOiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gX2NoaWxkcmVuICE9PSB1bmRlZmluZWQgJiYgdGhpcyAuIF9jaGlsZHJlbiAuIGxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzIC4gX2NoaWxkcmVuIFsgdGhpcyAuIF9jaGlsZHJlbiAuIGxlbmd0aCAtIDEgXSA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmV4dFNpYmxpbmcgKCApIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICggdGhpcyAuIF9wYXJlbnQgPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGhpcyAuIF9wYXJlbnQgLiBfY2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzIC4gX3BhcmVudCAuIF9jaGlsZHJlbiAuIGxlbmd0aCA+IDEgKSB7XHJcbiAgICAgICAgICAgIGxldCBpZHggOiBudW1iZXIgPSAtMTtcclxuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwIDsgaSA8IHRoaXMgLiBfcGFyZW50IC4gX2NoaWxkcmVuIC4gbGVuZ3RoIDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzID09PSB0aGlzIC4gX3BhcmVudCAuIF9jaGlsZHJlbiBbIGkgXSApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZHggPSBpIDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhayA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCBpZHggIT09IHRoaXMgLiBfcGFyZW50IC4gX2NoaWxkcmVuIC4gbGVuZ3RoIC0gMSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzIC4gX3BhcmVudCAuIF9jaGlsZHJlblsgaWR4ICsgMSBdIDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJldlNpYmxpbmcgKCApIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICggdGhpcyAuIF9wYXJlbnQgPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGhpcyAuIF9wYXJlbnQgLiBfY2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzIC4gX3BhcmVudCAuIF9jaGlsZHJlbiAuIGxlbmd0aCA+IDEgKSB7XHJcbiAgICAgICAgICAgIGxldCBpZHg6IG51bWJlciA9IC0gMSA7XHJcbiAgICAgICAgICAgIGZvciAoIGxldCBpID0gMCA7IGkgPCB0aGlzIC4gX3BhcmVudCAuIF9jaGlsZHJlbiAuIGxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzID09PSB0aGlzIC4gX3BhcmVudCAuIF9jaGlsZHJlbiBbIGkgXSApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZHggPSBpIDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhayA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCBpZHggIT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcyAuIF9wYXJlbnQgLiBfY2hpbGRyZW4gWyBpZHggLSAxIF0gO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkIDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBtb3N0UmlnaHQgKCApIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBub2RlIDogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQgID0gdGhpcyA7XHJcbiAgICAgICAgd2hpbGUgKCB0cnVlICkge1xyXG4gICAgICAgICAgICBsZXQgc3ViTm9kZSA6IFRyZWVOb2RlIDwgVCA+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkIDtcclxuICAgICAgICAgICAgaWYgKCBub2RlICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJOb2RlID0gbm9kZSAuIGxhc3RDaGlsZCA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCBzdWJOb2RlID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhayA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZSA9IHN1Yk5vZGUgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBtb3N0TGVmdCAoICkgOiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IG5vZGUgOiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCAgPSB0aGlzIDtcclxuICAgICAgICB3aGlsZSAoIHRydWUgKSB7XHJcbiAgICAgICAgICAgIGxldCBzdWJOb2RlIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQgO1xyXG4gICAgICAgICAgICBpZiAoIG5vZGUgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgIHN1Yk5vZGUgPSBub2RlIC4gZmlyc3RDaGlsZCA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCBzdWJOb2RlID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhayA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZSA9IHN1Yk5vZGUgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVOZXh0ICAoICkgOiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IHJldDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQgPSB0aGlzIC4gZmlyc3RDaGlsZCA7XHJcbiAgICAgICAgaWYgKCByZXQgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJldCA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldCA9IHRoaXMgLiBuZXh0U2libGluZyA7XHJcbiAgICAgICAgaWYgKCByZXQgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJldCA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldCA9IHRoaXMgO1xyXG4gICAgICAgIHdoaWxlICggcmV0ICE9PSB1bmRlZmluZWQgJiYgcmV0IC4gbmV4dFNpYmxpbmcgPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgcmV0ID0gcmV0IC4gcGFyZW50IDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCByZXQgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJldCAuIG5leHRTaWJsaW5nIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVQcmV2ICggKSA6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgcmV0OiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCA9IHRoaXMgLiBsYXN0Q2hpbGQgO1xyXG4gICAgICAgIGlmICggcmV0ICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXQgPSB0aGlzIC4gcHJldlNpYmxpbmcgO1xyXG4gICAgICAgIGlmICggcmV0ICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXQgPSB0aGlzIDtcclxuICAgICAgICB3aGlsZSAoIHJldCAhPT0gdW5kZWZpbmVkICYmIHJldCAuIHByZXZTaWJsaW5nID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIHJldCA9IHJldCAuIHBhcmVudCA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggcmV0ICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQgLiBwcmV2U2libGluZyA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQgO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgbW92ZU5leHRQb3N0ICggKSA6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgbmV4dCA6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkICA9ICB0aGlzIC4gbmV4dFNpYmxpbmcgO1xyXG4gICAgICAgIGlmICggbmV4dCA9PT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzIC4gcGFyZW50IDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmaXJzdCA6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkICA7XHJcbiAgICAgICAgd2hpbGUgKCBuZXh0ICE9PSB1bmRlZmluZWQgJiYgKCBmaXJzdCA9IG5leHQgLiBmaXJzdENoaWxkICkgKSB7XHJcbiAgICAgICAgICAgIG5leHQgPSBmaXJzdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlUHJldlBvc3QgKCApIDogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBwcmV2IDogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQgPSB0aGlzIC4gcHJldlNpYmxpbmcgO1xyXG4gICAgICAgIGlmICggcHJldiA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcyAuIHBhcmVudCA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsYXN0IDogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQgO1xyXG4gICAgICAgIHdoaWxlICggcHJldiAhPT0gdW5kZWZpbmVkICYmICggbGFzdCA9IHByZXYgLiBsYXN0Q2hpbGQgKSApIHtcclxuICAgICAgICAgICAgcHJldiA9IGxhc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcmV2O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3BhcmVudDogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQ7ICBcclxuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBBcnJheTxUcmVlTm9kZTxUPj4gfCB1bmRlZmluZWQ7IFxyXG5cclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7IFxyXG4gICAgcHVibGljIGRhdGE6IFQgfCB1bmRlZmluZWQ7IFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGlua1RyZWVOb2RlIDwgVCA+IHtcclxuXHJcbiAgICBwcml2YXRlIF9wYXJlbnQgOiBMaW5rVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQgO1xyXG4gICAgcHJpdmF0ZSBfZmlyc3RDaGlsZCA6IExpbmtUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCA7IFxyXG4gICAgcHJpdmF0ZSBfbGFzdENoaWxkIDogTGlua1RyZWVOb2RlIDwgVCA+IHwgdW5kZWZpbmVkIDsgXHJcbiAgICBwcml2YXRlIF9uZXh0U2libGluZyA6IExpbmtUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCA7XHJcbiAgICBwcml2YXRlIF9wcmV2U2libGluZyA6IExpbmtUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCA7XHJcblxyXG4gICAgcHVibGljIG5hbWUgOiBzdHJpbmcgPSAnJzsgIFxyXG4gICAgcHVibGljIGRhdGEgOiBUIHwgdW5kZWZpbmVkIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vZGVUMkJFbnVtZXJhdG9yIDwgVCAsIElkeEZ1bmMgZXh0ZW5kcyBJbmRleGVyICwgQWRhcHRlciBleHRlbmRzIElBZGFwdGVyIDwgVHJlZU5vZGUgPCBUID4gPiA+IGltcGxlbWVudHMgSUVudW1lcmF0b3IgPCBUcmVlTm9kZSA8IFQgPiA+IHtcclxuXHJcbiAgICBwcml2YXRlIF9ub2RlIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQgOyBcclxuICAgIHByaXZhdGUgX2FkYXB0ZXIgISA6IElBZGFwdGVyIDwgVHJlZU5vZGUgPCBUID4gPiA7XHJcbiAgICBwcml2YXRlIF9jdXJyTm9kZSAhIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQgOyBcclxuICAgIHByaXZhdGUgX2luZGV4ZXIgISA6IElkeEZ1bmMgOyBcclxuICAgIFxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggbm9kZSA6IFRyZWVOb2RlIDwgVCA+IHwgdW5kZWZpbmVkICwgZnVuYyA6IElkeEZ1bmMgLCBhZGFwdGVyIDogbmV3ICggKSA9PiBBZGFwdGVyICkge1xyXG4gICAgICAgIGlmICggbm9kZSA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzIC4gX25vZGUgPSBub2RlIDsgXHJcbiAgICAgICAgdGhpcyAuIF9pbmRleGVyID0gZnVuYyA7IFxyXG4gICAgICAgIHRoaXMgLiBfYWRhcHRlciA9IG5ldyBhZGFwdGVyICggKSA7IFxyXG5cclxuICAgICAgICB0aGlzIC4gX2FkYXB0ZXIgLiBhZGQgKCB0aGlzIC4gX25vZGUgKSA7XHJcbiAgICAgICAgdGhpcyAuIF9jdXJyTm9kZSA9IHVuZGVmaW5lZCA7IFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCAoICkgOiB2b2lkIHtcclxuICAgICAgICBpZiAoIHRoaXMgLiBfbm9kZSA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzIC4gX2N1cnJOb2RlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMgLiBfYWRhcHRlciAuIGNsZWFyICggKSA7XHJcbiAgICAgICAgdGhpcyAuIF9hZGFwdGVyIC4gYWRkICggdGhpcyAuIF9ub2RlICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlTmV4dCAoICkgOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIHRoaXMgLiBfYWRhcHRlciAuIGlzRW1wdHkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZSA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzIC4gX2N1cnJOb2RlID0gdGhpcyAuIF9hZGFwdGVyIC4gcmVtb3ZlICggKSA7XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gX2N1cnJOb2RlICE9IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgbGV0IGxlbiA6IG51bWJlciA9IHRoaXMgLiBfY3Vyck5vZGUgLiBjaGlsZENvdW50IDtcclxuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwIDsgaSA8IGxlbiA7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGlsZElkeCA6IG51bWJlciA9IHRoaXMgLiBfaW5kZXhlciAoIGxlbiAsIGkgKSA7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgOiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCA9IHRoaXMgLiBfY3Vyck5vZGUgLiBnZXRDaGlsZEF0ICggY2hpbGRJZHggKSA7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNoaWxkICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcyAuIF9hZGFwdGVyIC4gYWRkICggY2hpbGQgKSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWUgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY3VycmVudCAoICkgOiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBfY3Vyck5vZGUgO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTm9kZUIyVEVudW1lcmF0b3IgPCBUID4gaW1wbGVtZW50cyBJRW51bWVyYXRvciA8IFRyZWVOb2RlIDwgVCA+ID4ge1xyXG4gICAgcHJpdmF0ZSBfaXRlciA6IElFbnVtZXJhdG9yIDwgVHJlZU5vZGUgPCBUID4gPiA7IFxyXG4gICAgcHJpdmF0ZSBfYXJyICEgOiBBcnJheSA8IFRyZWVOb2RlIDwgVCA+IHwgdW5kZWZpbmVkID4gO1xyXG4gICAgcHJpdmF0ZSBfYXJySWR4ICEgOiBudW1iZXIgOyBcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIGl0ZXIgOiBJRW51bWVyYXRvciA8IFRyZWVOb2RlIDwgVCA+ID4gKSB7XHJcbiAgICAgICAgdGhpcyAuIF9pdGVyID0gaXRlciA7IFxyXG4gICAgICAgIHRoaXMgLiByZXNldCAoICkgOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQgKCApIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcyAuIF9hcnIgPSBbIF0gO1xyXG4gICAgICAgIHdoaWxlICggdGhpcyAuIF9pdGVyIC4gbW92ZU5leHQgKCApICkge1xyXG4gICAgICAgICAgICB0aGlzIC4gX2FyciAuIHB1c2ggKCB0aGlzIC4gX2l0ZXIgLiBjdXJyZW50ICkgO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzIC4gX2FycklkeCA9IHRoaXMgLiBfYXJyIC4gbGVuZ3RoIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGN1cnJlbnQgKCApIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICggdGhpcyAuIF9hcnJJZHggPj0gdGhpcyAuIF9hcnIgLiBsZW5ndGggKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzIC4gX2FyciBbIHRoaXMgLiBfYXJySWR4IF0gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZU5leHQgKCApIDogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcyAuIF9hcnJJZHggLS07XHJcbiAgICAgICAgcmV0dXJuICggdGhpcyAuIF9hcnJJZHggPj0gMCAmJiB0aGlzIC4gX2FycklkeCA8IHRoaXMgLiBfYXJyIC4gbGVuZ3RoICkgO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBOSXRlciA8IFQgPiA9IE5vZGVUMkJFbnVtZXJhdG9yIDwgVCAsIEluZGV4ZXIgLCBJQWRhcHRlciA8IFRyZWVOb2RlIDwgVCA+ID4gPjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb2RlRW51bWVyYXRvckZhY3Rvcnkge1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVfZGZfbDJyX3QyYl9pdGVyIDwgVCA+ICggbm9kZSA6IFRyZWVOb2RlIDwgVCA+IHwgdW5kZWZpbmVkICkgOiBJRW51bWVyYXRvciA8IFRyZWVOb2RlIDwgVCA+ID4ge1xyXG4gICAgICAgIGxldCBpdGVyIDogSUVudW1lcmF0b3IgPCBUcmVlTm9kZSA8IFQgPiA+ID0gbmV3IE5vZGVUMkJFbnVtZXJhdG9yICggbm9kZSAsIEluZGV4ZXJSMkwgLCBTdGFjayApIDtcclxuICAgICAgICByZXR1cm4gaXRlciA7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVfZGZfcjJsX3QyYl9pdGVyIDwgVCA+ICggbm9kZSA6IFRyZWVOb2RlIDwgVCA+IHwgdW5kZWZpbmVkICkgOiBJRW51bWVyYXRvciA8IFRyZWVOb2RlIDwgVCA+ID4ge1xyXG4gICAgICAgIGxldCBpdGVyIDogSUVudW1lcmF0b3IgPCBUcmVlTm9kZSA8IFQgPiA+ID0gbmV3IE5vZGVUMkJFbnVtZXJhdG9yICggbm9kZSAsIEluZGV4ZXJMMlIgLCBTdGFjayApIDtcclxuICAgICAgICByZXR1cm4gaXRlciA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVfYmZfbDJyX3QyYl9pdGVyIDwgVCA+ICggbm9kZSA6IFRyZWVOb2RlIDwgVCA+IHwgdW5kZWZpbmVkICkgOiBJRW51bWVyYXRvciA8IFRyZWVOb2RlIDwgVCA+ID4ge1xyXG4gICAgICAgIGxldCBpdGVyIDogSUVudW1lcmF0b3IgPCBUcmVlTm9kZSA8IFQgPiA+ID0gbmV3IE5vZGVUMkJFbnVtZXJhdG9yICggbm9kZSAsIEluZGV4ZXJMMlIgLCBRdWV1ZSApIDtcclxuICAgICAgICByZXR1cm4gaXRlciA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZV9iZl9yMmxfdDJiX2l0ZXIgPCBUID4gKCBub2RlIDogVHJlZU5vZGUgPCBUID4gfCB1bmRlZmluZWQgKSA6IElFbnVtZXJhdG9yIDwgVHJlZU5vZGUgPCBUID4gPiB7XHJcbiAgICAgICAgbGV0IGl0ZXI6IElFbnVtZXJhdG9yIDwgVHJlZU5vZGUgPCBUID4gPiA9IG5ldyBOb2RlVDJCRW51bWVyYXRvciAoIG5vZGUgLCBJbmRleGVyUjJMICwgUXVldWUgKSA7XHJcbiAgICAgICAgcmV0dXJuIGl0ZXIgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlX2RmX2wycl9iMnRfaXRlciA8IFQgPiAoIG5vZGUgOiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCApIDogSUVudW1lcmF0b3IgPCBUcmVlTm9kZSA8IFQgPiA+IHtcclxuICAgICAgICBsZXQgaXRlciA6IElFbnVtZXJhdG9yIDwgVHJlZU5vZGUgPCBUID4gPiA9IG5ldyBOb2RlQjJURW51bWVyYXRvciA8IFQgPiAoIE5vZGVFbnVtZXJhdG9yRmFjdG9yeSAuIGNyZWF0ZV9kZl9yMmxfdDJiX2l0ZXIgKCBub2RlICkgKSA7XHJcbiAgICAgICAgcmV0dXJuIGl0ZXIgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlX2RmX3IybF9iMnRfaXRlciA8IFQgPiAoIG5vZGUgOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCApIDogSUVudW1lcmF0b3IgPCBUcmVlTm9kZSA8IFQgPiA+IHtcclxuICAgICAgICBsZXQgaXRlciA6IElFbnVtZXJhdG9yIDwgVHJlZU5vZGUgPCBUID4gPiA9IG5ldyBOb2RlQjJURW51bWVyYXRvciA8IFQgPiAoIE5vZGVFbnVtZXJhdG9yRmFjdG9yeSAuIGNyZWF0ZV9kZl9sMnJfdDJiX2l0ZXIgKCBub2RlICkgKSA7XHJcbiAgICAgICAgcmV0dXJuIGl0ZXIgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlX2JmX2wycl9iMnRfaXRlciA8IFQgPiAoIG5vZGUgOiBUcmVlTm9kZSA8IFQgPiB8IHVuZGVmaW5lZCApIDogSUVudW1lcmF0b3IgPCBUcmVlTm9kZSA8IFQgPiA+IHtcclxuICAgICAgICBsZXQgaXRlcjogSUVudW1lcmF0b3IgPCBUcmVlTm9kZSA8IFQgPiA+ID0gbmV3IE5vZGVCMlRFbnVtZXJhdG9yIDwgVCA+ICggTm9kZUVudW1lcmF0b3JGYWN0b3J5LmNyZWF0ZV9iZl9yMmxfdDJiX2l0ZXIoIG5vZGUgKSApIDtcclxuICAgICAgICByZXR1cm4gaXRlciA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVfYmZfcjJsX2IydF9pdGVyIDwgVCA+ICggbm9kZSA6IFRyZWVOb2RlIDwgVCA+IHwgdW5kZWZpbmVkICkgOiBJRW51bWVyYXRvciA8IFRyZWVOb2RlIDwgVCA+ID4ge1xyXG4gICAgICAgIGxldCBpdGVyIDogSUVudW1lcmF0b3IgPCBUcmVlTm9kZSA8IFQgPiA+ID0gbmV3IE5vZGVCMlRFbnVtZXJhdG9yIDwgVCA+ICggTm9kZUVudW1lcmF0b3JGYWN0b3J5IC4gY3JlYXRlX2JmX2wycl90MmJfaXRlciAoIG5vZGUgKSApIDtcclxuICAgICAgICByZXR1cm4gaXRlciA7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=