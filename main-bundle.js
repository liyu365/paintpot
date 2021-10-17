/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factory/ContainerFactory.ts":
/*!*****************************************!*\
  !*** ./src/factory/ContainerFactory.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContainerFactory = void 0;
const interface_1 = __webpack_require__(/*! ../lib/spriteSystem/interface */ "./src/lib/spriteSystem/interface.ts");
const sprite2dHierarchicalSystem_1 = __webpack_require__(/*! ../lib/spriteSystem/sprite2dHierarchicalSystem */ "./src/lib/spriteSystem/sprite2dHierarchicalSystem.ts");
const sprite2d_1 = __webpack_require__(/*! ../lib/spriteSystem/sprite2d */ "./src/lib/spriteSystem/sprite2d.ts");
const factoryUtil_1 = __webpack_require__(/*! ./factoryUtil */ "./src/factory/factoryUtil.ts");
class ContainerFactory {
    static create(parent, name, position, app) {
        let containerSpr = new sprite2d_1.Sprite2D(interface_1.SpriteFactory.createRect(50, 50), 'containerSprite'); // 这里shap不能指向同一个对象，因为在updateEvent中会去修改shap对象
        containerSpr.x = position.x;
        containerSpr.y = position.y;
        containerSpr.fillStyle = 'rgba(0,0,0,.3)';
        containerSpr.updateEvent = this.handleUpdateEvent.bind(this);
        containerSpr.mouseEvent = (spr, evt) => {
            factoryUtil_1.spriteDragAction(spr, evt, app);
            factoryUtil_1.spriteSelectAction(spr, evt, app);
            factoryUtil_1.spriteHoverAction(spr, evt, app);
        };
        const sprNode = new sprite2dHierarchicalSystem_1.SpriteNode(containerSpr, undefined, 'containerNode');
        sprNode.nodeType = interface_1.NodeType.CONTAINER;
        sprNode.needSerialize = true;
        sprNode.name = name;
        parent.addChildAt(sprNode, 0);
        this._nodes.push(sprNode);
        return sprNode;
    }
    static handleUpdateEvent(spr, mesc, diffSec, travelOrder) {
        let padding = 20;
        let minX = 1e7;
        let minY = 1e7;
        let maxW = -1e7;
        let maxH = -1e7;
        let parentSprNode = spr.owner;
        if (parentSprNode && parentSprNode.children && parentSprNode.children.length > 0) {
            let shape = spr.shape;
            let childSprArr = [];
            parentSprNode.children.forEach(childSprNode => {
                let childSpr = childSprNode.data;
                childSprArr.push(childSpr);
            });
            // childSprArr.forEach(childSpr => {
            //   if (childSpr.x < 0) {
            //     let move = childSpr.x
            //     childSpr.x = 0
            //     spr.x = spr.x + move
            //     childSprArr.forEach(cspr => {
            //       if (cspr !== childSpr) {
            //         cspr.x = cspr.x - move
            //       }
            //     })
            //   }
            //   if (childSpr.x + 20 > shape.w) {
            //     shape.w = childSpr.x + 20
            //   }
            //   if (childSpr.y < 0) {
            //     let move = childSpr.y
            //     childSpr.y = 0
            //     spr.y = spr.y + move
            //     childSprArr.forEach(cspr => {
            //       if (cspr !== childSpr) {
            //         cspr.y = cspr.y - move
            //       }
            //     })
            //   }
            //   if (childSpr.y + 20 > shape.h) {
            //     shape.h = childSpr.y + 20
            //   }
            // })
            childSprArr.forEach(childSpr => {
                let bounding = childSpr.shape.getBounding();
                if (childSpr.x + bounding.left < minX) {
                    minX = childSpr.x + bounding.left;
                }
                if (childSpr.y + bounding.top < minY) {
                    minY = childSpr.y + bounding.top;
                }
                if (childSpr.x + bounding.right > maxW) {
                    maxW = childSpr.x + bounding.right;
                }
                if (childSpr.y + bounding.bottom > maxH) {
                    maxH = childSpr.y + bounding.bottom;
                }
            });
            if (padding === 0) {
                spr.x = spr.x + minX;
                childSprArr.forEach(cspr => {
                    cspr.x = cspr.x - minX;
                });
                spr.y = spr.y + minY;
                childSprArr.forEach(cspr => {
                    cspr.y = cspr.y - minY;
                });
                shape.width = maxW;
                shape.height = maxH;
            }
            else if (padding > 0) {
                spr.x = spr.x + minX - padding;
                childSprArr.forEach(cspr => {
                    cspr.x = cspr.x - minX + padding;
                });
                spr.y = spr.y + minY - padding;
                childSprArr.forEach(cspr => {
                    cspr.y = cspr.y - minY + padding;
                });
                shape.width = maxW + padding;
                shape.height = maxH + padding;
            }
            // let parentSpr = spr.owner.getParentSprite()
            // if (parentSpr) {
            //   let dot1 = Math2D.transform(spr.getWorldMatrix2(), new vec2(minX, minY))
            //   let dot2 = Math2D.transform(spr.getWorldMatrix2(), new vec2(maxW - minX, maxH - minY))
            //   spr.x = dot1.x
            //   spr.y = dot1.y
            // }
            // let shape = spr.shape as ContainerShap
            // shape.x = minX
            // shape.w = maxW - minX
            // shape.y = minY
            // shape.h = maxH - minY
            // if (padding > 0) {
            //   shape.x = minX - padding
            //   shape.w = maxW - minX + padding * 2
            //   shape.y = minY - padding
            //   shape.h = maxH - minY + padding * 2
            // }
        }
    }
    static getSprites() {
        return ContainerFactory._sprites;
    }
    static getNodes() {
        return this._nodes;
    }
}
exports.ContainerFactory = ContainerFactory;
ContainerFactory._sprites = [];
ContainerFactory._nodes = [];


/***/ }),

/***/ "./src/factory/HorizontalFlexLinkFactory.ts":
/*!**************************************************!*\
  !*** ./src/factory/HorizontalFlexLinkFactory.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HorizontalFlexLinkFactory = void 0;
const interface_1 = __webpack_require__(/*! ../lib/spriteSystem/interface */ "./src/lib/spriteSystem/interface.ts");
const math2d_1 = __webpack_require__(/*! ../lib/math2d */ "./src/lib/math2d.ts");
const sprite2dHierarchicalSystem_1 = __webpack_require__(/*! ../lib/spriteSystem/sprite2dHierarchicalSystem */ "./src/lib/spriteSystem/sprite2dHierarchicalSystem.ts");
const sprite2d_1 = __webpack_require__(/*! ../lib/spriteSystem/sprite2d */ "./src/lib/spriteSystem/sprite2d.ts");
const LinkTextShap_1 = __webpack_require__(/*! ../shaps/LinkTextShap */ "./src/shaps/LinkTextShap.ts");
const RaduisLineShap_1 = __webpack_require__(/*! ../shaps/RaduisLineShap */ "./src/shaps/RaduisLineShap.ts");
const factoryUtil_1 = __webpack_require__(/*! ./factoryUtil */ "./src/factory/factoryUtil.ts");
class HorizontalFlexLinkFactory {
    static create(parent, from, to, name) {
        const linkSpr = interface_1.SpriteFactory.createSprite(new RaduisLineShap_1.RaduisLineShap(4, 20));
        linkSpr.strokeStyle = 'green';
        linkSpr.lineWidth = 4;
        linkSpr.data = {};
        linkSpr.data.from = from;
        linkSpr.data.to = to;
        linkSpr.x = 0;
        linkSpr.y = 0;
        linkSpr.mouseEvent = this.handleLinkEvent.bind(this);
        const linkNode = new sprite2dHierarchicalSystem_1.SpriteNode(linkSpr);
        linkNode.nodeType = interface_1.NodeType.HORIZONTALFLEXLINK;
        linkNode.needSerialize = true;
        linkNode.name = name;
        const arrowSpr = interface_1.SpriteFactory.createSprite(this._arrowShap);
        arrowSpr.fillStyle = 'blue';
        linkNode.addSprite(arrowSpr);
        const textSpr = new sprite2d_1.Sprite2D(new LinkTextShap_1.LinkTextShap(), 'linkTextShap');
        textSpr.showCoordSystem = false;
        textSpr.x = 0;
        textSpr.y = 0;
        textSpr.data = {};
        textSpr.data.text = name;
        linkNode.addSprite(textSpr);
        // 挂载linkNode对象
        factoryUtil_1.mountLinkNode(linkNode, parent, from, to, this._linkGroups, this.handleLinkGroupUpdate.bind(this));
    }
    static handleLinkEvent(spr, evt) {
        console.log('handleLinkEvent', spr);
    }
    static handleLinkGroupUpdate(spr, mesc, diffSec, travelOrder) {
        const linkGroup = spr.owner;
        const children = linkGroup.children;
        let from = linkGroup.params.from.data;
        let to = linkGroup.params.to.data;
        let pt1 = new math2d_1.vec2(from.x, from.y);
        let pt2 = new math2d_1.vec2(to.x, to.y);
        let fromParentSpr = from.owner.getParentSprite();
        let toParentSpr = to.owner.getParentSprite();
        // 把from和to的局部坐标转换为相对于根sprite的全局坐标
        if (fromParentSpr && toParentSpr) {
            pt1 = math2d_1.Math2D.transform(fromParentSpr.getWorldMatrix2(), pt1);
            pt2 = math2d_1.Math2D.transform(toParentSpr.getWorldMatrix2(), pt2);
        }
        const xd = pt2.x - pt1.x;
        const yd = pt2.y - pt1.y;
        if (linkGroup.sprite) {
            linkGroup.sprite.x = pt1.x;
            linkGroup.sprite.y = pt1.y;
        }
        if (children) {
            const count = children.length;
            children.forEach((linkN, index) => {
                const linkSpr = linkN.sprite;
                if (linkSpr) {
                    let xDeviation = index * 20; // xDeviation为连线中两个拐点的x轴方向偏移量
                    let change = (20 * (count - 1)) / 2; // 整体偏移（为了居中）
                    if (pt2.x >= pt1.x) {
                        if (pt2.y > pt1.y) {
                            xDeviation = -xDeviation;
                            change = change;
                        }
                        else {
                            xDeviation = xDeviation;
                            change = -change;
                        }
                    }
                    else {
                        if (pt2.y > pt1.y) {
                            xDeviation = xDeviation;
                            change = -change;
                        }
                        else {
                            xDeviation = -xDeviation;
                            change = change;
                        }
                    }
                    const line = linkSpr.shape;
                    line.pointArr[0] = math2d_1.vec2.create(0, 0);
                    line.pointArr[1] = math2d_1.vec2.create(xd / 2 + xDeviation + change, 0);
                    line.pointArr[2] = math2d_1.vec2.create(xd / 2 + xDeviation + change, yd);
                    line.pointArr[3] = math2d_1.vec2.create(xd, yd);
                    linkSpr.y = this._sameLinkGap * index + -(this._sameLinkGap * (count - 1)) / 2;
                    const arrowNode = linkN.getChildAt(0);
                    if (arrowNode) {
                        const arrow = arrowNode.sprite;
                        if (linkSpr.data.from === linkGroup.params.from) {
                            arrow.x = xd;
                            arrow.y = yd;
                            if (pt2.x >= pt1.x) {
                                arrow.rotation = 0;
                            }
                            else {
                                arrow.rotation = 180;
                            }
                        }
                        else {
                            arrow.x = 0;
                            arrow.y = 0;
                            if (pt2.x >= pt1.x) {
                                arrow.rotation = 180;
                            }
                            else {
                                arrow.rotation = 0;
                            }
                        }
                    }
                    const lnikTextNode = linkN.getChildAt(1);
                    if (lnikTextNode) {
                        const lnikTextSpr = lnikTextNode.sprite;
                        lnikTextSpr.x = xd / 2 + xDeviation + change;
                        lnikTextSpr.y = yd / 2;
                    }
                }
            });
        }
    }
    static getNodes() {
        return this._linkGroups;
    }
}
exports.HorizontalFlexLinkFactory = HorizontalFlexLinkFactory;
HorizontalFlexLinkFactory._arrowShap = interface_1.SpriteFactory.createPolygon([new math2d_1.vec2(5, 0), new math2d_1.vec2(0, 5), new math2d_1.vec2(0, -5)]);
HorizontalFlexLinkFactory._linkGroups = [];
HorizontalFlexLinkFactory._sameLinkGap = 25;


/***/ }),

/***/ "./src/factory/LinkFactory.ts":
/*!************************************!*\
  !*** ./src/factory/LinkFactory.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinkFactory = void 0;
const interface_1 = __webpack_require__(/*! ../lib/spriteSystem/interface */ "./src/lib/spriteSystem/interface.ts");
const math2d_1 = __webpack_require__(/*! ../lib/math2d */ "./src/lib/math2d.ts");
const sprite2dHierarchicalSystem_1 = __webpack_require__(/*! ../lib/spriteSystem/sprite2dHierarchicalSystem */ "./src/lib/spriteSystem/sprite2dHierarchicalSystem.ts");
const sprite2d_1 = __webpack_require__(/*! ../lib/spriteSystem/sprite2d */ "./src/lib/spriteSystem/sprite2d.ts");
const LinkTextShap_1 = __webpack_require__(/*! ../shaps/LinkTextShap */ "./src/shaps/LinkTextShap.ts");
const factoryUtil_1 = __webpack_require__(/*! ./factoryUtil */ "./src/factory/factoryUtil.ts");
class LinkFactory {
    static create(parent, from, to, name) {
        const linkSpr = interface_1.SpriteFactory.createSprite(interface_1.SpriteFactory.createXLine());
        linkSpr.strokeStyle = 'green';
        linkSpr.lineWidth = 4;
        linkSpr.data = {};
        linkSpr.data.from = from;
        linkSpr.data.to = to;
        linkSpr.x = 0;
        linkSpr.y = 0;
        linkSpr.mouseEvent = this.handleLinkEvent.bind(this);
        const linkNode = new sprite2dHierarchicalSystem_1.SpriteNode(linkSpr);
        linkNode.nodeType = interface_1.NodeType.LINK;
        linkNode.needSerialize = true;
        linkNode.name = name;
        const arrowSpr = interface_1.SpriteFactory.createSprite(this._arrowShap);
        arrowSpr.fillStyle = 'blue';
        linkNode.addSprite(arrowSpr);
        const textSpr = new sprite2d_1.Sprite2D(new LinkTextShap_1.LinkTextShap(), 'linkTextShap');
        textSpr.showCoordSystem = false;
        textSpr.x = 0;
        textSpr.y = 0;
        textSpr.data = {};
        textSpr.data.text = name;
        linkNode.addSprite(textSpr);
        // 挂载linkNode对象
        factoryUtil_1.mountLinkNode(linkNode, parent, from, to, this._linkGroups, this.handleLinkGroupUpdate.bind(this));
    }
    static handleLinkEvent(spr, evt) {
        // console.log('handleLinkEvent', spr, evt)
    }
    static handleLinkGroupUpdate(spr, mesc, diffSec, travelOrder) {
        const linkGroup = spr.owner;
        const children = linkGroup.children;
        let from = linkGroup.params.from.data;
        let to = linkGroup.params.to.data;
        let pt1 = new math2d_1.vec2(from.x, from.y);
        let pt2 = new math2d_1.vec2(to.x, to.y);
        if (!from.owner && !to.owner) {
            return;
        }
        let fromParentSpr = from.owner.getParentSprite();
        let toParentSpr = to.owner.getParentSprite();
        // 把from和to的局部坐标转换为相对于根sprite的全局坐标
        if (fromParentSpr && toParentSpr) {
            pt1 = math2d_1.Math2D.transform(fromParentSpr.getWorldMatrix2(), pt1);
            pt2 = math2d_1.Math2D.transform(toParentSpr.getWorldMatrix2(), pt2);
        }
        const d = Math.sqrt((pt2.y - pt1.y) * (pt2.y - pt1.y) + (pt2.x - pt1.x) * (pt2.x - pt1.x));
        const linkGroupAngle = math2d_1.vec2.getOrientation(pt1, pt2);
        if (linkGroup.sprite) {
            linkGroup.sprite.x = pt1.x;
            linkGroup.sprite.y = pt1.y;
            linkGroup.sprite.rotation = linkGroupAngle;
        }
        if (children) {
            const count = children.length;
            children.forEach((linkN, index) => {
                const linkSpr = linkN.sprite;
                if (linkSpr) {
                    const gap = this._circleRadius + this._linkCircleGap; // todo _circleRadius需要改成活的
                    const line = linkSpr.shape;
                    line.start = math2d_1.vec2.create(gap, 0); // 注意line这个shap的start和end的坐标y值都是0
                    line.end = math2d_1.vec2.create(d - gap, 0);
                    linkSpr.y = this._sameLinkGap * index + -(this._sameLinkGap * (count - 1)) / 2;
                    // 此linkSpr定义的方向与包含它的linkGroup的方向相反，所以此linkSpr要反向绘制
                    if (linkSpr.data.from !== linkGroup.params.from) {
                        linkSpr.rotation = 180;
                        linkSpr.x = d;
                    }
                    const arrowNode = linkN.getChildAt(0);
                    if (arrowNode) {
                        const arrow = arrowNode.sprite;
                        arrow.x = d - gap - 5;
                    }
                    const lnikTextNode = linkN.getChildAt(1);
                    if (lnikTextNode) {
                        const lnikTextSpr = lnikTextNode.sprite;
                        lnikTextSpr.x = d / 2;
                        lnikTextSpr.y = 0;
                        // 此linkSpr定义的方向与包含它的linkGroup的方向相反，所以此linkSpr中的文字也要反向绘制
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
    static getNodes() {
        return this._linkGroups;
    }
}
exports.LinkFactory = LinkFactory;
LinkFactory._arrowShap = interface_1.SpriteFactory.createPolygon([new math2d_1.vec2(5, 0), new math2d_1.vec2(0, 5), new math2d_1.vec2(0, -5)]);
LinkFactory._linkGroups = [];
LinkFactory._linkCircleGap = 5;
LinkFactory._circleRadius = 30;
LinkFactory._sameLinkGap = 25;


/***/ }),

/***/ "./src/factory/PanelPointFactory.ts":
/*!******************************************!*\
  !*** ./src/factory/PanelPointFactory.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PanelPointFactory = void 0;
const interface_1 = __webpack_require__(/*! ../lib/spriteSystem/interface */ "./src/lib/spriteSystem/interface.ts");
const application_1 = __webpack_require__(/*! ../lib/application */ "./src/lib/application.ts");
const sprite2dHierarchicalSystem_1 = __webpack_require__(/*! ../lib/spriteSystem/sprite2dHierarchicalSystem */ "./src/lib/spriteSystem/sprite2dHierarchicalSystem.ts");
const sprite2d_1 = __webpack_require__(/*! ../lib/spriteSystem/sprite2d */ "./src/lib/spriteSystem/sprite2d.ts");
const CNodeTextShap_1 = __webpack_require__(/*! ../shaps/CNodeTextShap */ "./src/shaps/CNodeTextShap.ts");
const factoryUtil_1 = __webpack_require__(/*! ./factoryUtil */ "./src/factory/factoryUtil.ts");
class PanelPointFactory {
    static create(parent, name, position, app) {
        const circleSpr = interface_1.SpriteFactory.createSprite(PanelPointFactory._circleShap);
        circleSpr.fillStyle = 'red';
        circleSpr.x = position.x;
        circleSpr.y = position.y;
        circleSpr.mouseEvent = (spr, evt) => {
            factoryUtil_1.spriteDragAction(spr, evt, app);
            factoryUtil_1.spriteSelectAction(spr, evt, app);
            factoryUtil_1.spriteHoverAction(spr, evt, app);
            factoryUtil_1.spriteMenuAction(spr, evt, app);
            if (evt.type === application_1.EInputEventType.MOUSEDOWN) {
                console.log('点击了', spr);
            }
        };
        circleSpr.renderEvent = (spr, context, renderOreder) => {
            factoryUtil_1.spriteDrawSelected(spr, context, renderOreder);
            factoryUtil_1.spriteDrawHover(spr, context, renderOreder);
        };
        const circleN = new sprite2dHierarchicalSystem_1.SpriteNode(circleSpr);
        circleN.nodeType = interface_1.NodeType.PANELPOINT;
        circleN.needSerialize = true;
        circleN.name = name;
        parent.addChild(circleN);
        const textSpr = new sprite2d_1.Sprite2D(new CNodeTextShap_1.CNodeTextShap(), 'textSpr');
        textSpr.showCoordSystem = false;
        textSpr.x = 0;
        textSpr.y = PanelPointFactory._circleRadius + 10;
        textSpr.data = {};
        textSpr.data.text = name;
        circleN.addSprite(textSpr);
        return circleN;
    }
}
exports.PanelPointFactory = PanelPointFactory;
PanelPointFactory._circleRadius = 30;
PanelPointFactory._circleShap = interface_1.SpriteFactory.createCircle(PanelPointFactory._circleRadius);


/***/ }),

/***/ "./src/factory/PanelRectFactory.ts":
/*!*****************************************!*\
  !*** ./src/factory/PanelRectFactory.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PanelRectFactory = void 0;
const interface_1 = __webpack_require__(/*! ../lib/spriteSystem/interface */ "./src/lib/spriteSystem/interface.ts");
const sprite2dHierarchicalSystem_1 = __webpack_require__(/*! ../lib/spriteSystem/sprite2dHierarchicalSystem */ "./src/lib/spriteSystem/sprite2dHierarchicalSystem.ts");
const sprite2d_1 = __webpack_require__(/*! ../lib/spriteSystem/sprite2d */ "./src/lib/spriteSystem/sprite2d.ts");
const factoryUtil_1 = __webpack_require__(/*! ./factoryUtil */ "./src/factory/factoryUtil.ts");
class PanelRectFactory {
    static create(parent, name, position, app) {
        let spr = new sprite2d_1.Sprite2D(interface_1.SpriteFactory.createRect(20, 20, 0.5, 0.5), 'panelRectFactory');
        spr.fillStyle = 'orange';
        spr.x = position.x;
        spr.y = position.y;
        spr.mouseEvent = (spr, evt) => {
            factoryUtil_1.spriteDragAction(spr, evt, app);
            factoryUtil_1.spriteSelectAction(spr, evt, app);
            factoryUtil_1.spriteHoverAction(spr, evt, app);
            factoryUtil_1.spriteMenuAction(spr, evt, app);
        };
        spr.renderEvent = (spr, context, renderOreder) => {
            factoryUtil_1.spriteDrawSelected(spr, context, renderOreder);
            factoryUtil_1.spriteDrawHover(spr, context, renderOreder);
        };
        let node = new sprite2dHierarchicalSystem_1.SpriteNode(spr);
        node.nodeType = interface_1.NodeType.PANELRECT;
        node.needSerialize = true;
        node.name = name;
        parent.addChild(node);
        //this.nodes.push(node)
        return node;
    }
    static getNodes() {
        return this.nodes;
    }
}
exports.PanelRectFactory = PanelRectFactory;
PanelRectFactory.nodes = [];


/***/ }),

/***/ "./src/factory/VerticalFlexLinkFactory.ts":
/*!************************************************!*\
  !*** ./src/factory/VerticalFlexLinkFactory.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerticalFlexLinkFactory = void 0;
const interface_1 = __webpack_require__(/*! ../lib/spriteSystem/interface */ "./src/lib/spriteSystem/interface.ts");
const math2d_1 = __webpack_require__(/*! ../lib/math2d */ "./src/lib/math2d.ts");
const sprite2dHierarchicalSystem_1 = __webpack_require__(/*! ../lib/spriteSystem/sprite2dHierarchicalSystem */ "./src/lib/spriteSystem/sprite2dHierarchicalSystem.ts");
const sprite2d_1 = __webpack_require__(/*! ../lib/spriteSystem/sprite2d */ "./src/lib/spriteSystem/sprite2d.ts");
const LinkTextShap_1 = __webpack_require__(/*! ../shaps/LinkTextShap */ "./src/shaps/LinkTextShap.ts");
const RaduisLineShap_1 = __webpack_require__(/*! ../shaps/RaduisLineShap */ "./src/shaps/RaduisLineShap.ts");
const factoryUtil_1 = __webpack_require__(/*! ./factoryUtil */ "./src/factory/factoryUtil.ts");
class VerticalFlexLinkFactory {
    static create(parent, from, to, name) {
        const linkSpr = interface_1.SpriteFactory.createSprite(new RaduisLineShap_1.RaduisLineShap(4, 16));
        linkSpr.strokeStyle = 'green';
        linkSpr.lineWidth = 4;
        linkSpr.data = {};
        linkSpr.data.from = from;
        linkSpr.data.to = to;
        linkSpr.x = 0;
        linkSpr.y = 0;
        linkSpr.mouseEvent = this.handleLinkEvent.bind(this);
        const linkNode = new sprite2dHierarchicalSystem_1.SpriteNode(linkSpr);
        linkNode.nodeType = interface_1.NodeType.VERTICALFLEXLINK;
        linkNode.needSerialize = true;
        linkNode.name = name;
        const arrowSpr = interface_1.SpriteFactory.createSprite(this._arrowShap);
        arrowSpr.fillStyle = 'blue';
        linkNode.addSprite(arrowSpr);
        const textSpr = new sprite2d_1.Sprite2D(new LinkTextShap_1.LinkTextShap(), 'linkTextShap');
        textSpr.showCoordSystem = false;
        textSpr.x = 0;
        textSpr.y = 0;
        textSpr.data = {};
        textSpr.data.text = name;
        linkNode.addSprite(textSpr);
        // 挂载linkNode对象
        factoryUtil_1.mountLinkNode(linkNode, parent, from, to, this._linkGroups, this.handleLinkGroupUpdate.bind(this));
    }
    static handleLinkEvent(spr, evt) {
    }
    static handleLinkGroupUpdate(spr, mesc, diffSec, travelOrder) {
        const linkGroup = spr.owner;
        const children = linkGroup.children;
        let from = linkGroup.params.from.data;
        let to = linkGroup.params.to.data;
        let pt1 = new math2d_1.vec2(from.x, from.y);
        let pt2 = new math2d_1.vec2(to.x, to.y);
        let fromParentSpr = from.owner.getParentSprite();
        let toParentSpr = to.owner.getParentSprite();
        // 把from和to的局部坐标转换为相对于根sprite的全局坐标
        if (fromParentSpr && toParentSpr) {
            pt1 = math2d_1.Math2D.transform(fromParentSpr.getWorldMatrix2(), pt1);
            pt2 = math2d_1.Math2D.transform(toParentSpr.getWorldMatrix2(), pt2);
        }
        const xd = pt2.x - pt1.x;
        const yd = pt2.y - pt1.y;
        if (linkGroup.sprite) {
            linkGroup.sprite.x = pt1.x;
            linkGroup.sprite.y = pt1.y;
        }
        if (children) {
            const count = children.length;
            children.forEach((linkN, index) => {
                const linkSpr = linkN.sprite;
                if (linkSpr) {
                    let yDeviation = index * 20; // yDeviation为连线中两个拐点的y轴方向偏移量
                    let change = (20 * (count - 1)) / 2; // 整体偏移（为了居中）
                    if (pt2.x >= pt1.x) {
                        if (pt2.y > pt1.y) {
                            yDeviation = -yDeviation;
                            change = change;
                        }
                        else {
                            yDeviation = yDeviation;
                            change = -change;
                        }
                    }
                    else {
                        if (pt2.y > pt1.y) {
                            yDeviation = yDeviation;
                            change = -change;
                        }
                        else {
                            yDeviation = -yDeviation;
                            change = change;
                        }
                    }
                    const line = linkSpr.shape;
                    line.pointArr[0] = math2d_1.vec2.create(0, 0);
                    line.pointArr[1] = math2d_1.vec2.create(0, yd / 2 + yDeviation + change);
                    line.pointArr[2] = math2d_1.vec2.create(xd, yd / 2 + yDeviation + change);
                    line.pointArr[3] = math2d_1.vec2.create(xd, yd);
                    linkSpr.x = this._sameLinkGap * index + -(this._sameLinkGap * (count - 1)) / 2;
                    const arrowNode = linkN.getChildAt(0);
                    if (arrowNode) {
                        const arrow = arrowNode.sprite;
                        if (linkSpr.data.from === linkGroup.params.from) {
                            arrow.x = xd;
                            arrow.y = yd;
                            if (pt2.y >= pt1.y) {
                                arrow.rotation = 90;
                            }
                            else {
                                arrow.rotation = -90;
                            }
                        }
                        else {
                            arrow.x = 0;
                            arrow.y = 0;
                            if (pt2.y >= pt1.y) {
                                arrow.rotation = -90;
                            }
                            else {
                                arrow.rotation = 90;
                            }
                        }
                    }
                    const lnikTextNode = linkN.getChildAt(1);
                    if (lnikTextNode) {
                        const lnikTextSpr = lnikTextNode.sprite;
                        lnikTextSpr.x = xd / 2;
                        lnikTextSpr.y = yd / 2 + yDeviation + change;
                    }
                }
            });
        }
    }
    static getNodes() {
        return this._linkGroups;
    }
}
exports.VerticalFlexLinkFactory = VerticalFlexLinkFactory;
VerticalFlexLinkFactory._arrowShap = interface_1.SpriteFactory.createPolygon([new math2d_1.vec2(5, 0), new math2d_1.vec2(0, 5), new math2d_1.vec2(0, -5)]);
VerticalFlexLinkFactory._linkGroups = [];
VerticalFlexLinkFactory._sameLinkGap = 25;


/***/ }),

/***/ "./src/factory/factoryUtil.ts":
/*!************************************!*\
  !*** ./src/factory/factoryUtil.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.spriteDrawHover = exports.spriteDrawSelected = exports.spriteMenuAction = exports.spriteHoverAction = exports.spriteSelectAction = exports.spriteDragAction = exports.getSameLinkGroup = exports.mountLinkNode = void 0;
const interface_1 = __webpack_require__(/*! ../lib/spriteSystem/interface */ "./src/lib/spriteSystem/interface.ts");
const sprite2dHierarchicalSystem_1 = __webpack_require__(/*! ../lib/spriteSystem/sprite2dHierarchicalSystem */ "./src/lib/spriteSystem/sprite2dHierarchicalSystem.ts");
const application_1 = __webpack_require__(/*! ../lib/application */ "./src/lib/application.ts");
const math2d_1 = __webpack_require__(/*! ../lib/math2d */ "./src/lib/math2d.ts");
function mountLinkNode(linkNode, parent, from, to, linkGroups, update) {
    const sameGroup = getSameLinkGroup(from, to, linkGroups);
    // 如果已经存在相同的group，则放到此group中，否则新建一个group，再作为新group的子集
    if (!sameGroup) {
        const newGroup = new sprite2dHierarchicalSystem_1.SpriteNodeGroup({});
        newGroup.params.from = from;
        newGroup.params.to = to;
        newGroup.addChild(linkNode);
        /**
         * 绘制顺序为containerNode->linkNode->其它Node
         * 因此这里的group需要插到所有containerNode的后面，其他Node的前面
         */
        if (Array.isArray(parent.children)) {
            let hasAdd = false;
            for (let i = 0; i < parent.children.length; i++) {
                if (parent.children[i].nodeType !== interface_1.NodeType.CONTAINER) {
                    parent.addChildAt(newGroup, i);
                    hasAdd = true;
                    break;
                }
            }
            //证明当前root下的子元素都为containerNode
            if (hasAdd === false) {
                parent.addChildAt(newGroup, parent.children.length);
            }
        }
        else {
            parent.addChildAt(newGroup, 0);
        }
        linkGroups.push(newGroup);
        if (newGroup.sprite) {
            newGroup.sprite.updateEvent = update; // 这个是为SpriteNodeGroup内的包含空Shap的Sprite对象绑定updateEvent回调，而不是LinkNode内的Sprite对象
        }
    }
    else {
        sameGroup.addChild(linkNode);
    }
}
exports.mountLinkNode = mountLinkNode;
function getSameLinkGroup(from, to, linkGroups) {
    let o = null;
    if (from === undefined || to === undefined) {
        return o;
    }
    linkGroups.forEach(item => {
        if ((item.params.from === from && item.params.to === to) ||
            (item.params.from === to && item.params.to === from)) {
            o = item;
        }
    });
    return o;
}
exports.getSameLinkGroup = getSameLinkGroup;
function spriteDragAction(spr, evt, app) {
    let position = new math2d_1.vec2(evt.canvasPosition.x, evt.canvasPosition.y);
    let parentSpr = spr.owner.getParentSprite();
    if (parentSpr) {
        position = math2d_1.Math2D.transform(parentSpr.getLocalMatrix(), position); // 把鼠标的坐标用父sprite的局部矩阵进行转换
    }
    if (evt.type === application_1.EInputEventType.MOUSEDOWN) {
        spr.diffX = position.x - spr.x;
        spr.diffY = position.y - spr.y;
    }
    if (evt.type === application_1.EInputEventType.MOUSEDRAG) {
        spr.isDragging = true;
        // 设置当前被拖拽的元素为isHovering状态
        if (spr.isSelected !== true) {
            spr.isHovering = true;
        }
        if (app._hoveringSprite && app._hoveringSprite !== spr) {
            app._hoveringSprite.isHovering = false;
        }
        app._hoveringSprite = spr;
        spr.x = position.x - spr.diffX;
        spr.y = position.y - spr.diffY;
        // console.log('相对于根sprite的坐标（而不是canvas）', Math2D.transform(parentSpr.getWorldMatrix2(), new vec2(this.x, this.y)))
        // console.log('局部坐标', new vec2(this.x, this.y))
    }
}
exports.spriteDragAction = spriteDragAction;
function spriteSelectAction(spr, evt, app) {
    if (evt.type === application_1.EInputEventType.MOUSEUP && evt.button === 0) {
        if (spr.isDragging === false) {
            if (spr.isSelected === true) {
                app.removeSelectedSprite(spr);
                spr.isHovering = true;
            }
            else {
                app.clearAllSelectedSprite();
                app.addSelectedSprite(spr);
                spr.isHovering = false;
            }
        }
        if (spr.isDragging === true) {
            spr.isDragging = false;
        }
    }
}
exports.spriteSelectAction = spriteSelectAction;
function spriteHoverAction(spr, evt, app) {
    if (evt.type === application_1.EInputEventType.MOUSEMOVE) {
        if (spr.isSelected !== true) {
            spr.isHovering = true;
        }
        if (app._hoveringSprite && app._hoveringSprite !== spr) {
            app._hoveringSprite.isHovering = false;
        }
        app._hoveringSprite = spr;
    }
}
exports.spriteHoverAction = spriteHoverAction;
function spriteMenuAction(spr, evt, app) {
    if (evt.type === application_1.EInputEventType.MOUSEUP && evt.button === 2) {
        let bounding = spr.shape.getBounding();
        let position = new math2d_1.vec2(spr.x + (bounding.right - bounding.left) / 2, spr.y);
        let parentSpr = spr.owner.getParentSprite();
        if (parentSpr) {
            position = math2d_1.Math2D.transform(parentSpr.getWorldMatrix(), position);
        }
        if (app._sprMenu) {
            app._sprMenu.style.display = 'block';
            app._sprMenu.style.left = position.x + 'px';
            app._sprMenu.style.top = position.y + 'px';
        }
    }
}
exports.spriteMenuAction = spriteMenuAction;
function spriteDrawSelected(spr, context, renderOreder) {
    if (renderOreder === interface_1.EOrder.PREORDER && spr.isSelected === true) {
        let shap = spr.shape;
        let bounding = shap.getBounding();
        let margin = 5;
        context.save();
        context.beginPath();
        context.fillStyle = 'rgba(0, 0, 0, 1)';
        context.lineWidth = 7;
        context.rect(bounding.left - margin, bounding.top - margin, bounding.right - bounding.left + margin * 2, bounding.bottom - bounding.top + margin * 2);
        context.fill();
        context.restore();
    }
}
exports.spriteDrawSelected = spriteDrawSelected;
function spriteDrawHover(spr, context, renderOreder) {
    if (renderOreder === interface_1.EOrder.PREORDER && spr.isHovering === true) {
        let shap = spr.shape;
        let bounding = shap.getBounding();
        let margin = 5;
        context.save();
        context.beginPath();
        context.fillStyle = 'rgba(0, 255, 255, 0.5)';
        context.lineWidth = 7;
        context.rect(bounding.left - margin, bounding.top - margin, bounding.right - bounding.left + margin * 2, bounding.bottom - bounding.top + margin * 2);
        context.fill();
        context.restore();
    }
}
exports.spriteDrawHover = spriteDrawHover;


/***/ }),

/***/ "./src/lib/NodeData.ts":
/*!*****************************!*\
  !*** ./src/lib/NodeData.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeData = void 0;
class NodeData {
    constructor(parentIdx, nodeType) {
        this.x = 0;
        this.y = 0;
        this.parentIdx = parentIdx;
        this.nodeType = nodeType;
    }
}
exports.NodeData = NodeData;


/***/ }),

/***/ "./src/lib/application.ts":
/*!********************************!*\
  !*** ./src/lib/application.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Canvas2DApplication = exports.Application = exports.CanvasKeyBoardEvent = exports.CanvasMouseEvent = exports.CanvasInputEvent = exports.EInputEventType = void 0;
const math2d_1 = __webpack_require__(/*! ./math2d */ "./src/lib/math2d.ts");
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
        this.timeout = 0; // 单位是秒
        this.onlyOnce = false;
        this.callback = callback;
    }
}
class CanvasMouseEvent extends CanvasInputEvent {
    constructor(type, canvasPos, button, altKey = false, ctrlKey = false, shiftKey = false) {
        super(type, altKey, ctrlKey, shiftKey);
        this.canvasPosition = canvasPos;
        this.button = button;
        // 这两个属性在Application的子类sprite2DApplication中的_dispatcher: IDispatcher（SpriteNodeManager或Sprite2DManager实例）的dispatchMouseEvent()方法中被赋值
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
            this._startTime = timeStamp; // 肯定为0
        if (this._lastTime === -1)
            this._lastTime = timeStamp;
        let elapsedMsec = timeStamp - this._startTime; // 从第一次执行step方法到此次执行step方法经历的毫秒数
        let intervalSec = (timeStamp - this._lastTime); // 上一次执行step到此次执行step经历的秒数
        if (intervalSec !== 0) {
            this._fps = 1000.0 / intervalSec; // 间隔越小fps越高
        }
        intervalSec /= 1000.0; // intervalSec转为秒单位
        this._lastTime = timeStamp; // 更新_lastTime为本次执行时的时间，用于下个周期计算周期间隔时间
        this._handleTimers(intervalSec); // 检查注册的timer是否需要执行
        this.update(elapsedMsec, intervalSec); // 此方法在子类Sprite2DApplication中实现
        this.render(); // 调用子类Sprite2DApplication中的_dispatcher的dispatchDraw()方法
        requestAnimationFrame((elapsedMsec) => {
            // 这里传入的是elapsedMsec是从0开始计算的（第一次requestAnimationFrame被执行就会传入0），而不是从1970 年 1 月 1 日 00:00:00 (UTC) 到当前时间的毫秒数作为基数
            // 所以上面的this._startTime肯对会为0
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
    // 这是addEventListener的一种写法，第二个参数为一个对象，对象的handleEvent方法会作为事件的回调
    // 这里的dispatchMouseDown、dispatchMouseUp、dispatchMouseMove、dispatchMouseMove会被子类sprite2DApplication实现，调用其内部_dispatcher对象的dispatchMouseEvent方法
    // 这里的dispatchKeyPress、dispatchKeyDown、dispatchKeyUp会被子类sprite2DApplication实现，调用其内部_dispatcher对象的dispatchKeyEvent方法
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
                strNumber = decl.borderTopWidth;
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
        timer = new Timer(callback);
        timer.callbackData = data;
        timer.timeout = timeout;
        timer.countdown = timeout;
        timer.enabled = true; // 通过addTimer()方法添加的timer的enabled都为true
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
                    timer.countdown = timer.timeout; // 重置倒计时（循环执行）
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

/***/ "./src/lib/math2d.ts":
/*!***************************!*\
  !*** ./src/lib/math2d.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
    reset(x = 0, y = 0) {
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
    // 沿direction方向移动scalar的距离
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
    // 点乘
    static dotProduct(left, right) {
        return left.values[0] * right.values[0] + left.values[1] * right.values[1];
    }
    // 叉乘
    static crossProduct(left, right) {
        return left.x * right.y - left.y * right.x;
    }
    // 以点from作为原点，获得点to的方向（相对于x轴正方向）
    static getOrientation(from, to, isRadian = false) {
        let diff = vec2.difference(to, from);
        let radian = Math.atan2(diff.y, diff.x);
        if (isRadian === false) {
            radian = Math2D.toDegree(radian);
        }
        return radian;
    }
    // 获得方向a到方向b的夹角的弧度或角度
    static getAngle(a, b, isRadian = false) {
        let dot = vec2.dotProduct(a, b);
        let radian = Math.acos(dot / (a.length * b.length));
        if (isRadian === false) {
            radian = Math2D.toDegree(radian);
        }
        return radian;
    }
    // 获取方向a到方向b的夹角的余弦值
    static cosAngle(a, b, norm = false) {
        if (norm === true) {
            a.normalize();
            b.normalize();
        }
        return vec2.dotProduct(a, b);
    }
    // 获取方向a到方向b的夹角的正弦值
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
    // 旋转矩阵取逆（当前矩阵只能包含旋转信息）
    onlyRotationMatrixInvert() {
        let s = this.values[1];
        this.values[1] = this.values[2];
        this.values[2] = s;
        return this;
    }
    // 构建从方向v1到方向v2的旋转矩阵（例如获取x轴正方的向量到某个向量的旋转矩阵，这样可以代替Math.atan2的一些应用）
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
    // 判断点是否在线段上。先判断点在线段上是否存在投影，再判断点和投影点的距离是否小于半径
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
    // 判断两个矩形是否碰撞
    static isCollisionWithRect(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x1 >= x2 && x1 >= x2 + w2) {
            return false;
        }
        else if (x1 <= x2 && x1 + w1 <= x2) {
            return false;
        }
        else if (y1 >= y2 && y1 >= y2 + h2) {
            return false;
        }
        else if (y1 <= y2 && y1 + h1 <= y2) {
            return false;
        }
        return true;
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
    // 把向量通过变换矩阵进行变换
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
    // 根据position、rotation、scale设置栈顶的矩阵并返回栈顶矩阵
    toMatrix() {
        Math2D.matStack.loadIdentity(); // 先把栈顶的矩阵归一化
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

/***/ "./src/lib/spriteSystem/interface.ts":
/*!*******************************************!*\
  !*** ./src/lib/spriteSystem/interface.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Scale9Data = exports.EImageFillType = exports.SpriteFactory = exports.EOrder = exports.ERenderType = exports.NodeType = exports.SceneMode = void 0;
const shapes_1 = __webpack_require__(/*! ./shapes */ "./src/lib/spriteSystem/shapes.ts");
const sprite2d_1 = __webpack_require__(/*! ./sprite2d */ "./src/lib/spriteSystem/sprite2d.ts");
var SceneMode;
(function (SceneMode) {
    SceneMode["SELECT"] = "select";
    SceneMode["DRAG"] = "drag";
})(SceneMode = exports.SceneMode || (exports.SceneMode = {}));
var NodeType;
(function (NodeType) {
    NodeType[NodeType["TREENODE"] = 0] = "TREENODE";
    NodeType[NodeType["SPRITE"] = 1] = "SPRITE";
    NodeType[NodeType["CONTAINER"] = 2] = "CONTAINER";
    NodeType[NodeType["PANELPOINT"] = 3] = "PANELPOINT";
    NodeType[NodeType["PANELRECT"] = 4] = "PANELRECT";
    NodeType[NodeType["LINK"] = 5] = "LINK";
    NodeType[NodeType["HORIZONTALFLEXLINK"] = 6] = "HORIZONTALFLEXLINK";
    NodeType[NodeType["VERTICALFLEXLINK"] = 7] = "VERTICALFLEXLINK"; // 7
})(NodeType = exports.NodeType || (exports.NodeType = {}));
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
    static createBezierPath(points, isCubic = false) {
        return new shapes_1.BezierPath(points, isCubic);
    }
    static createClipSprite() {
        let spr = new sprite2d_1.Sprite2D(SpriteFactory.endCLipShape, 'clipSprite');
        spr.renderType = ERenderType.CLIP;
        return spr;
    }
    static createSprite(shape, name = '') {
        let spr = new sprite2d_1.Sprite2D(shape, name);
        return spr;
    }
    static createISprite(shape, x = 0, y = 0, rotation = 0, scaleX = 1.0, scaleY = 1.0, name = '') {
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
SpriteFactory.emptyShape = new shapes_1.EmptyShape();
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

/***/ "./src/lib/spriteSystem/shapes.ts":
/*!****************************************!*\
  !*** ./src/lib/spriteSystem/shapes.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmptyShape = exports.EndClipShape = exports.Scale9Grid = exports.Line = exports.BezierPath = exports.Grid = exports.Rect = exports.ConvexPolygon = exports.Ellipse = exports.Circle = exports.BaseShape2D = void 0;
const interface_1 = __webpack_require__(/*! ./interface */ "./src/lib/spriteSystem/interface.ts");
const math2d_1 = __webpack_require__(/*! ../math2d */ "./src/lib/math2d.ts");
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
    getBounding() {
        return {
            top: -this.radius,
            bottom: this.radius,
            left: -this.radius,
            right: this.radius
        };
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
    getBounding() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
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
    getBounding() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
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
    getBounding() {
        let top = this.y;
        let bottom = this.y + this.height;
        let left = this.x;
        let right = this.x + this.width;
        return {
            top,
            bottom,
            left,
            right
        };
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
        for (let i = this.xStep + 0.5; i < this.width; i += this.xStep) {
            context.moveTo(i, 0);
            context.lineTo(i, this.height);
        }
        context.stroke();
        context.beginPath();
        for (let i = this.yStep + 0.5; i < this.height; i += this.yStep) {
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
    getBounding() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
    }
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
    // len为线的长度。线只会位于x轴上，起点默认为坐标原点，终点默认在x轴正方向
    // t为线的起点终点相对于y轴的偏移量
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
    getBounding() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
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
    getBounding() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
    }
    beginDraw(transformable, state, context) { }
    draw(transformable, state, context) { }
    endDraw(transformable, state, context) {
        context.restore(); // 只有这一句有用
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
    getBounding() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
    }
    beginDraw(transformable, state, context) { }
    draw(transformable, state, context) { }
    endDraw(transformable, state, context) { }
    get type() {
        return "EmptyShape";
    }
}
exports.EmptyShape = EmptyShape;


/***/ }),

/***/ "./src/lib/spriteSystem/sprite2DApplication.ts":
/*!*****************************************************!*\
  !*** ./src/lib/spriteSystem/sprite2DApplication.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sprite2DApplication = void 0;
const application_1 = __webpack_require__(/*! ../application */ "./src/lib/application.ts");
const interface_1 = __webpack_require__(/*! ./interface */ "./src/lib/spriteSystem/interface.ts");
const sprite2dSystem_1 = __webpack_require__(/*! ./sprite2dSystem */ "./src/lib/spriteSystem/sprite2dSystem.ts");
const sprite2dHierarchicalSystem_1 = __webpack_require__(/*! ./sprite2dHierarchicalSystem */ "./src/lib/spriteSystem/sprite2dHierarchicalSystem.ts");
class Sprite2DApplication extends application_1.Canvas2DApplication {
    constructor(canvas, isHierarchical = true) {
        super(canvas);
        this.operations = [];
        this.sceneMode = interface_1.SceneMode.DRAG; // 应用模式，现在有拖动和选择两种
        document.oncontextmenu = function () {
            return false;
        };
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
    set rootContainer(spr) {
        this._dispatcher.container = spr;
    }
    // 每一帧都会被执行
    update(msec, diff) {
        this._dispatcher.dispatchUpdate(msec, diff);
    }
    // 每一帧都会被执行
    render() {
        if (this.context2D) {
            this.context2D.clearRect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height);
            this._dispatcher.dispatchDraw(this.context2D);
            this.drawOperations();
            this.renderCopyRight();
        }
    }
    drawOperations() {
        if (this.context2D) {
            this.operations.forEach(operation => {
                operation(this.context2D);
            });
        }
    }
    renderCopyRight() {
        if (this.context2D) {
            const text = 'liyu365';
            const margin = 5;
            this.context2D.save();
            this.context2D.beginPath();
            this.context2D.fillStyle = "rgba(0, 0, 0, 0.5)";
            this.context2D.font = "12px san_serif";
            const w = this.context2D.measureText(text).width;
            const h = this.context2D.measureText('田').width;
            this.context2D.textAlign = 'left';
            this.context2D.textBaseline = 'top';
            this.context2D.fillText(text, this.context2D.canvas.width - w - margin, this.context2D.canvas.height - h - margin);
            this.context2D.restore();
        }
    }
    // 返回正在被拖动的sprite
    getDragSprite() {
        return this._dispatcher.dragSprite;
    }
    // 返回鼠标命中的sprite
    getHitSprite() {
        return this._dispatcher.hitSprite;
    }
    // 父类Application监听到的所有鼠标事件，都会调用_dispatcher的dispatchMouseEvent()方法
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
    // 父类Application监听到所有键盘事件，都调用_dispatcher的dispatchKeyEvent()方法
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

/***/ "./src/lib/spriteSystem/sprite2d.ts":
/*!******************************************!*\
  !*** ./src/lib/spriteSystem/sprite2d.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sprite2D = void 0;
const math2d_1 = __webpack_require__(/*! ../math2d */ "./src/lib/math2d.ts");
const interface_1 = __webpack_require__(/*! ./interface */ "./src/lib/spriteSystem/interface.ts");
const sprite2dHierarchicalSystem_1 = __webpack_require__(/*! ./sprite2dHierarchicalSystem */ "./src/lib/spriteSystem/sprite2dHierarchicalSystem.ts");
/**
 * 表示一个绘制对象，内部存储了：
 * shape：表示要绘制的路径；
 * transform：封装了变换矩阵；
 * fillStyle、strokeStyle、lineWidth：存储了context绘制此对象时需要设置的渲染状态；
 * renderType：BaseShape2D类的draw方法会读取此值，并执行绘制函数context.fill()或context.stroke()或context.clip()
 * isXXX：表示当前对象的状态
 */
class Sprite2D {
    constructor(shape, name) {
        this.showCoordSystem = false;
        this.renderType = interface_1.ERenderType.FILL;
        this.isVisible = true;
        this.isSelected = false;
        this.isDragging = false;
        this.isHovering = false;
        this.fillStyle = 'white';
        this.strokeStyle = 'black';
        this.lineWidth = 1;
        this.transform = new math2d_1.Transform2D();
        this.mouseEvent = null;
        this.keyEvent = null;
        this.updateEvent = null; // 被this.update()调用
        this.renderEvent = null; // 在this.draw()中被调用两次
        // 缓存鼠标点击到此对象的点，相对于此对象坐标系的局部坐标
        this.diffX = 0;
        this.diffY = 0;
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
    getWorldMatrix2() {
        if (this.owner instanceof sprite2dHierarchicalSystem_1.SpriteNode) {
            let arr = [];
            let curr = this.owner;
            while (curr !== undefined) {
                arr.push(curr);
                curr = curr.parent;
            }
            arr.pop();
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
            // 1.先调用context.restore();
            // 2.根据this.lineWidth，this.strokeStyle，this.fillStyle设置上下文渲染状态
            // 3.根据当前对象的世界矩阵，设置context的setTransform()方法
            this.shape.beginDraw(this, this, context);
            if (this.renderEvent !== null) {
                this.renderEvent(this, context, interface_1.EOrder.PREORDER);
            }
            this.shape.draw(this, this, context);
            if (this.renderEvent !== null) {
                this.renderEvent(this, context, interface_1.EOrder.POSTORDER);
            }
            // 会调用context.restore();
            this.shape.endDraw(this, this, context);
        }
    }
}
exports.Sprite2D = Sprite2D;


/***/ }),

/***/ "./src/lib/spriteSystem/sprite2dHierarchicalSystem.ts":
/*!************************************************************!*\
  !*** ./src/lib/spriteSystem/sprite2dHierarchicalSystem.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpriteNodeManager = exports.SpriteNodeGroup = exports.SpriteNode = void 0;
const treeNode_1 = __webpack_require__(/*! ../treeNode */ "./src/lib/treeNode.ts");
const application_1 = __webpack_require__(/*! ../application */ "./src/lib/application.ts");
const interface_1 = __webpack_require__(/*! ./interface */ "./src/lib/spriteSystem/interface.ts");
const math2d_1 = __webpack_require__(/*! ../math2d */ "./src/lib/math2d.ts");
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
        if (ret !== undefined) { // ret不为undefind，证明形参child成为了当前SpriteNode对象的子级
            if (ret.data) { // ret.data就是形参child内部包裹的ISprite对象
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
    // 从根节点开始遍历：把鼠标的世界坐标转化为相对于当前迭代到的SpriteNode包裹的Sprite2D对象的局部坐标，然后进行碰撞检测，一点碰撞检测成功就返回此Speite2D对象
    findSprite(src, localPoint = null) {
        let iter = treeNode_1.NodeEnumeratorFactory.create_bf_r2l_b2t_iter(this.root); // 从下到上、广度优先、从右到左遍历，也就是说最后绘制的对象优先碰撞检测
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
    // 递归绘制自身和自身的所有子级别
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
class SpriteNodeGroup extends SpriteNode {
    constructor(params, parent = undefined, name = "spriteNodeGroup") {
        super(interface_1.SpriteFactory.createSprite(interface_1.SpriteFactory.emptyShape), parent, name);
        this.params = params;
    }
}
exports.SpriteNodeGroup = SpriteNodeGroup;
class SpriteNodeManager {
    constructor(width, height) {
        this._dragSprite = undefined;
        this._hitSprite = undefined;
        let spr = interface_1.SpriteFactory.createISprite(interface_1.SpriteFactory.createGrid(width, height));
        spr.name = 'root';
        spr.strokeStyle = "rgba(0,0,0,0.1)";
        spr.fillStyle = 'white';
        spr.renderType = interface_1.ERenderType.STROKE_FILL;
        this._rootNode = new SpriteNode(spr, undefined, spr.name);
        this._rootNode.nodeType = interface_1.NodeType.SPRITE;
        this._rootNode.needSerialize = true;
        spr.owner = this._rootNode;
    }
    get container() {
        return this._rootNode;
    }
    set container(spr) {
        this._rootNode = spr;
    }
    get dragSprite() {
        return this._dragSprite;
    }
    get hitSprite() {
        return this._hitSprite;
    }
    // 为鼠标命中的对象，派发鼠标事件
    dispatchMouseEvent(evt) {
        if (evt.type === application_1.EInputEventType.MOUSEUP) {
            this._dragSprite = undefined;
        }
        else if (evt.type === application_1.EInputEventType.MOUSEDRAG) { // 如果为鼠标拖动事件，并且当前已经缓存了拖动的对象，则不进行下面的递归命中检测了，只执行当前拖动对象的mouseEvent()方法
            if (this._dragSprite !== undefined) {
                if (this._dragSprite.mouseEvent !== null) {
                    this._dragSprite.mouseEvent(this._dragSprite, evt);
                    return;
                }
            }
        }
        // 从根节点递归寻找鼠标命中的对象，如果找到则返回命中的Sprite对象
        // 并把evt对象的localPosition属性赋值为：鼠标的世界坐标转换为命中对象的局部坐标
        // 并把evt对象的hasLocalPosition设置为true
        let spr = this._rootNode.findSprite(evt.canvasPosition, evt.localPosition);
        this._hitSprite = spr;
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
    // 深度优先的递归遍历整个树，派发键盘事件
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

/***/ "./src/lib/spriteSystem/sprite2dSystem.ts":
/*!************************************************!*\
  !*** ./src/lib/spriteSystem/sprite2dSystem.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sprite2DManager = void 0;
const application_1 = __webpack_require__(/*! ../application */ "./src/lib/application.ts");
const interface_1 = __webpack_require__(/*! ./interface */ "./src/lib/spriteSystem/interface.ts");
const math2d_1 = __webpack_require__(/*! ../math2d */ "./src/lib/math2d.ts");
class Sprite2DManager {
    constructor() {
        this.name = 'sprite2dManager';
        this._sprites = [];
        this.sprite = undefined;
        this._dragSprite = undefined;
        this._hitSprite = undefined;
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
    get dragSprite() {
        return this._dragSprite;
    }
    get hitSprite() {
        return this._hitSprite;
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
                this._hitSprite = spr;
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
            else {
                this._hitSprite = undefined;
            }
        }
    }
}
exports.Sprite2DManager = Sprite2DManager;


/***/ }),

/***/ "./src/lib/treeNode.ts":
/*!*****************************!*\
  !*** ./src/lib/treeNode.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeEnumeratorFactory = exports.NodeB2TEnumerator = exports.NodeT2BEnumerator = exports.LinkTreeNode = exports.TreeNode = exports.Queue = exports.Stack = exports.AdapterBase = exports.IndexerR2L = exports.IndexerL2R = void 0;
const interface_1 = __webpack_require__(/*! ./spriteSystem/interface */ "./src/lib/spriteSystem/interface.ts");
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
// 栈结构
class Stack extends AdapterBase {
    remove() {
        if (this._arr.length > 0)
            return this._arr.pop();
        else
            return undefined;
    }
}
exports.Stack = Stack;
// 队列结构
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
        this.nodeType = interface_1.NodeType.TREENODE;
        this.needSerialize = false;
        this._parent = parent;
        this._children = undefined;
        this.name = name;
        this.data = data;
        if (this._parent !== undefined) {
            this._parent.addChild(this);
        }
    }
    addChildAt(child, index) {
        // 先要保证传入的形参child对象不是此对象的父节点
        if (this.isDescendantOf(child)) {
            return undefined;
        }
        if (this._children === undefined) {
            // this._children = [];
            this._children = new Array();
        }
        if (index >= 0 && index <= this._children.length) {
            if (child._parent) { // 如果传入的形参child已经有_parent，则先把此对象从_parent._children中移除
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
        this._children.splice(index, 1);
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
    clearChildren() {
        if (this._children) {
            for (let i = 0; i < this._children.length; i++) {
                this._children[i]._parent = undefined;
            }
        }
        this._children = undefined;
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
    // 查看当前节点的父级有没有ancestor对象
    isDescendantOf(ancestor) {
        if (ancestor === undefined)
            return false;
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
    // 深度，例如node1的深度是1
    get depth() {
        let curr = this;
        let level = 0;
        while (curr !== undefined && curr.parent !== undefined) {
            curr = curr.parent;
            level++;
        }
        return level;
    }
    // 递归的遍历算法：深度优先，从上到下
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
    // 递归的遍历算法：深度优先，从上到下，从左到右
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
    // 递归的遍历算法：深度优先，从上到下，从右到左
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
    // 直接子节点的第一个
    get firstChild() {
        if (this._children !== undefined && this._children.length > 0) {
            return this._children[0];
        }
        else {
            return undefined;
        }
    }
    // 直接子节点的最后一个
    get lastChild() {
        if (this._children !== undefined && this._children.length > 0) {
            return this._children[this._children.length - 1];
        }
        else {
            return undefined;
        }
    }
    // 下一个兄弟节点
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
    // 上一个兄弟节点
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
    // 所有子孙节点中最右侧的节点
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
    // 所有子孙节点中最左侧的节点
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
    // 非递归的遍历算法：深度优先、从上到下、从左到右
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
        while (ret !== undefined && ret.nextSibling === undefined) { // 一直回溯查找有右兄弟节点的祖先节点，并设置为此祖先节点
            ret = ret.parent;
        }
        if (ret !== undefined) { // 如果存在这样的祖先节点，就取它的右兄弟节点返回
            return ret.nextSibling;
        }
        return undefined;
    }
    // 非递归的遍历算法：深度优先、从上到下、从右到左
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
        while (ret !== undefined && ret.prevSibling === undefined) { // 一直回溯查找有左兄弟节点的祖先节点，并设置为此祖先节点
            ret = ret.parent;
        }
        if (ret !== undefined) { // 如果存在这样的祖先节点，就取它的左兄弟节点返回
            return ret.prevSibling;
        }
        return undefined;
    }
    // 非递归的遍历算法：深度优先、从下到上、从左到右
    // 需要使用mostLeft作为起始元素
    moveNextPost() {
        let next = this.nextSibling;
        if (next === undefined) {
            return this.parent;
        }
        let first = undefined;
        while (next !== undefined && (first = next.firstChild)) { // 如果有右兄弟节点，则找到右兄弟节点最左侧的子孙节点
            next = first;
        }
        return next;
    }
    // 非递归的遍历算法：深度优先、从下到上、从右到左
    // 需要使用mostRight作为起始元素
    movePrevPost() {
        let prev = this.prevSibling;
        if (prev === undefined) {
            return this.parent;
        }
        let last = undefined;
        while (prev !== undefined && (last = prev.lastChild)) { // 如果有左兄弟节点，则找到左兄弟节点最右侧的子孙节点
            prev = last;
        }
        return prev;
    }
    repeatString(target, n) {
        let total = "";
        for (let i = 0; i < n; i++) {
            total += target;
        }
        return total;
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
}
exports.TreeNode = TreeNode;
class LinkTreeNode {
    constructor() {
        this.name = '';
    }
}
exports.LinkTreeNode = LinkTreeNode;
// 先上后下枚举器
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
    /**
     * 核心：
     * 每次调用moveNext()都是从_adapter中取出一个元素（取出哪个元素取决于_adapter的类型，有先进先出和先进后出）赋值给_currNode，作为当前枚举到的值
     * 之后根据_indexer定义的迭代顺序（顺序或倒叙），把_currNode的所有直接子元素按顺序push进_adapter中
     * 因此如果_adapter为Stack则是深度优先的枚举，_adapter为Queue则是深度优先的枚举
     * 这个枚举器是先上后下的枚举器，因为放入初始化时放入_adapter的第一个元素是root元素
     */
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
// 先下后上枚举器（相当于把与之对应的先上后下的枚举器先执行一遍并缓存所有结果，当调用current时，把缓存倒着输出）
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
// 根据入参node，返回枚举此node的各种枚举器对象
class NodeEnumeratorFactory {
    /**
     * -----
     * 从上到下遍历
     * -----
     */
    // 深度优先、从左到右
    static create_df_l2r_t2b_iter(node) {
        let iter = new NodeT2BEnumerator(node, IndexerR2L, Stack);
        return iter;
    }
    // 深度优先、从右到左
    static create_df_r2l_t2b_iter(node) {
        let iter = new NodeT2BEnumerator(node, IndexerL2R, Stack);
        return iter;
    }
    // 广度优先，从左到右
    static create_bf_l2r_t2b_iter(node) {
        let iter = new NodeT2BEnumerator(node, IndexerL2R, Queue);
        return iter;
    }
    // 广度优先，从右到左
    static create_bf_r2l_t2b_iter(node) {
        let iter = new NodeT2BEnumerator(node, IndexerR2L, Queue);
        return iter;
    }
    /**
     * -----
     * 从下到上遍历
     * -----
     */
    // 深度优先、从左到右
    static create_df_l2r_b2t_iter(node) {
        let iter = new NodeB2TEnumerator(NodeEnumeratorFactory.create_df_r2l_t2b_iter(node));
        return iter;
    }
    // 深度优先、从右到左
    static create_df_r2l_b2t_iter(node) {
        let iter = new NodeB2TEnumerator(NodeEnumeratorFactory.create_df_l2r_t2b_iter(node));
        return iter;
    }
    // 广度优先、从左到右
    static create_bf_l2r_b2t_iter(node) {
        let iter = new NodeB2TEnumerator(NodeEnumeratorFactory.create_bf_r2l_t2b_iter(node));
        return iter;
    }
    // 广度优先、从右到左（做鼠标碰撞检测时，采用此种枚举方式）
    static create_bf_r2l_b2t_iter(node) {
        let iter = new NodeB2TEnumerator(NodeEnumeratorFactory.create_bf_l2r_t2b_iter(node));
        return iter;
    }
}
exports.NodeEnumeratorFactory = NodeEnumeratorFactory;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopologyApplication = exports.WheelType = void 0;
const sprite2DApplication_1 = __webpack_require__(/*! ./lib/spriteSystem/sprite2DApplication */ "./src/lib/spriteSystem/sprite2DApplication.ts");
const interface_1 = __webpack_require__(/*! ./lib/spriteSystem/interface */ "./src/lib/spriteSystem/interface.ts");
const math2d_1 = __webpack_require__(/*! ./lib/math2d */ "./src/lib/math2d.ts");
const sprite2dHierarchicalSystem_1 = __webpack_require__(/*! ./lib/spriteSystem/sprite2dHierarchicalSystem */ "./src/lib/spriteSystem/sprite2dHierarchicalSystem.ts");
const treeNode_1 = __webpack_require__(/*! ./lib/treeNode */ "./src/lib/treeNode.ts");
const NodeData_1 = __webpack_require__(/*! ./lib/NodeData */ "./src/lib/NodeData.ts");
const LinkFactory_1 = __webpack_require__(/*! ./factory/LinkFactory */ "./src/factory/LinkFactory.ts");
const HorizontalFlexLinkFactory_1 = __webpack_require__(/*! ./factory/HorizontalFlexLinkFactory */ "./src/factory/HorizontalFlexLinkFactory.ts");
const VerticalFlexLinkFactory_1 = __webpack_require__(/*! ./factory/VerticalFlexLinkFactory */ "./src/factory/VerticalFlexLinkFactory.ts");
const PanelPointFactory_1 = __webpack_require__(/*! ./factory/PanelPointFactory */ "./src/factory/PanelPointFactory.ts");
const ContainerFactory_1 = __webpack_require__(/*! ./factory/ContainerFactory */ "./src/factory/ContainerFactory.ts");
const PanelRectFactory_1 = __webpack_require__(/*! ./factory/PanelRectFactory */ "./src/factory/PanelRectFactory.ts");
var WheelType;
(function (WheelType) {
    WheelType[WheelType["UP"] = 0] = "UP";
    WheelType[WheelType["DOWN"] = 1] = "DOWN";
})(WheelType = exports.WheelType || (exports.WheelType = {}));
class TopologyApplication {
    constructor(app) {
        this._curZoom = 1;
        this.lastWheelMouseX = 0;
        this.lastWheelMouseY = 0;
        this._isMouseDown = false;
        this._isStageHasDrag = false;
        this._diffX = 0; // 鼠标按下的世界坐标与rootSpr左上角世界坐标的差
        this._diffY = 0;
        this._downX = 0; // 鼠标按下时的世界坐标
        this._downY = 0;
        this._selectAreaVertexs = []; // 选框的x,y,w,h
        this._selectedSprites = [];
        this._hoveringSprite = null;
        this._app = app;
        this.init();
        // this.init2();
        // this.init3()
        this._app.start();
        this._sprMenu = document.querySelector("#sprMenu");
        const zoomInButton = document.querySelector('#zoomIN');
        const zoomOutButton = document.querySelector('#zoomOut');
        zoomInButton.onclick = () => {
            this._curZoom *= 1.2;
            this.handleScaleChange(this.lastWheelMouseX, this.lastWheelMouseY, WheelType.UP);
        };
        zoomOutButton.onclick = () => {
            this._curZoom /= 1.2;
            this.handleScaleChange(this.lastWheelMouseX, this.lastWheelMouseY, WheelType.DOWN);
        };
        this.lastWheelMouseX = this._app.canvas.offsetWidth / 2;
        this.lastWheelMouseY = this._app.canvas.offsetHeight / 2;
        this._app.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this._app.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this._app.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this._app.canvas.addEventListener('mousewheel', this.handleWheel.bind(this));
        this._app.canvas.addEventListener('DOMMouseScroll', this.handleWheel.bind(this));
        const addBtn = document.querySelector('#addBtn');
        addBtn.onclick = () => {
            const root = this._app.rootContainer;
            const rectNode4 = PanelRectFactory_1.PanelRectFactory.create(root, 'rectNode4', new math2d_1.vec2(20, 20), this);
        };
        const saveBtn = document.querySelector('#saveBtn');
        saveBtn.onclick = () => {
            const root = this._app.rootContainer;
            let json = this.convertTreeToJsonString(root);
            console.log(json);
            window.localStorage.setItem('chartJSON', json);
        };
        const restoreBtn = document.querySelector('#restoreBtn');
        restoreBtn.onclick = () => {
            // const root = this._app.rootContainer as SpriteNode
            // root.clearChildren()
            let json = window.localStorage.getItem('chartJSON');
            if (json) {
                let root = this.convertJsonStringToTree(json);
                console.log('root', root);
                if (root) {
                    this._app.rootContainer = root;
                }
            }
        };
        const dragModeBtn = document.querySelector('#dragModeBtn');
        dragModeBtn.onclick = () => {
            this._app.sceneMode = interface_1.SceneMode.DRAG;
        };
        const selectModeBtn = document.querySelector('#selectModeBtn');
        selectModeBtn.onclick = () => {
            this._app.sceneMode = interface_1.SceneMode.SELECT;
        };
    }
    clearAllSelectedSprite() {
        this._selectedSprites.forEach(spr => {
            spr.isSelected = false;
        });
        this._selectedSprites = [];
    }
    removeSelectedSprite(spr) {
        spr.isSelected = false;
        let index = this._selectedSprites.findIndex(item => {
            return item === spr;
        });
        if (index !== -1) {
            this._selectedSprites.splice(index, 1);
        }
        return spr;
    }
    addSelectedSprite(spr) {
        spr.isSelected = true;
        let index = this._selectedSprites.findIndex(item => {
            return item === spr;
        });
        if (index === -1) {
            this._selectedSprites.push(spr);
        }
        return spr;
    }
    handleMouseDown(evt) {
        let event = evt;
        if (event.button === 0) {
            const root = this._app.rootContainer;
            const rootSpr = root.sprite;
            const mouseOffset = this._app._viewportToCanvasCoordinate(event);
            if (rootSpr) {
                this._diffX = mouseOffset.x - rootSpr.x;
                this._diffY = mouseOffset.y - rootSpr.y;
                this._isMouseDown = true;
            }
            this._downX = mouseOffset.x;
            this._downY = mouseOffset.y;
        }
        if (this._sprMenu) {
            this._sprMenu.style.display = 'none';
        }
    }
    handleMouseUp(evt) {
        this._isMouseDown = false;
        let hitSprite = this._app.getHitSprite();
        // 如果点击了空白区域（并且没有拖动任何元素），则取消所有sprite的选中状态
        if ((hitSprite === undefined || hitSprite.owner.name === 'root') && this._isStageHasDrag === false) {
            this.clearAllSelectedSprite();
        }
        this._isStageHasDrag = false;
        this._app.operations = [];
    }
    handleMouseMove(evt) {
        const root = this._app.rootContainer;
        const rootSpr = root.sprite;
        if (rootSpr) {
            if (this._isMouseDown && !this._app.getDragSprite() || this._app.getDragSprite() === rootSpr) {
                this._isStageHasDrag = true;
                // 拖动stage
                if (this._app.sceneMode === interface_1.SceneMode.DRAG) {
                    let mouseOffset = this._app._viewportToCanvasCoordinate(evt);
                    rootSpr.x = mouseOffset.x - this._diffX;
                    rootSpr.y = mouseOffset.y - this._diffY;
                    if (this._sprMenu) {
                        this._sprMenu.style.display = 'none';
                    }
                }
                // 绘制选框
                if (this._app.sceneMode === interface_1.SceneMode.SELECT) {
                    let mouseOffset = this._app._viewportToCanvasCoordinate(evt);
                    let p1 = new math2d_1.vec2(this._downX, this._downY);
                    let p2 = new math2d_1.vec2(mouseOffset.x, mouseOffset.y);
                    let x = p1.x >= p2.x ? p2.x : p1.x;
                    let y = p1.y >= p2.y ? p2.y : p1.y;
                    let w = Math.abs(p1.x - p2.x);
                    let h = Math.abs(p1.y - p2.y);
                    this._selectAreaVertexs[0] = x;
                    this._selectAreaVertexs[1] = y;
                    this._selectAreaVertexs[2] = w;
                    this._selectAreaVertexs[3] = h;
                    let getOperationFun = (x, y, w, h) => {
                        return (context) => {
                            if (context) {
                                context.save();
                                context.beginPath();
                                context.strokeStyle = "rgba(0,0,236,0.5)";
                                context.fillStyle = "rgba(0,0,236,0.2)";
                                context.rect(x, y, w, h);
                                context.fill();
                                context.stroke();
                                context.closePath();
                                context.restore();
                            }
                        };
                    };
                    this._app.operations = [];
                    this._app.operations[0] = getOperationFun(x, y, w, h);
                    this.calcInSelectArae();
                }
            }
            // 如果鼠标移动到了空白区域，则取消所有sprite的hover状态
            let hitSprite = this._app.getHitSprite();
            if (hitSprite === undefined || hitSprite.owner.name === 'root') {
                if (this._hoveringSprite) {
                    this._hoveringSprite.isHovering = false;
                }
            }
        }
    }
    // 计算所有sprite是否在选区内
    calcInSelectArae() {
        const root = this._app.rootContainer;
        let iter = treeNode_1.NodeEnumeratorFactory.create_bf_r2l_b2t_iter(root);
        let current = undefined;
        this.clearAllSelectedSprite();
        while (iter.moveNext()) {
            current = iter.current;
            if (current && current.data) {
                let sprite = current.data;
                let bounding = sprite.shape.getBounding();
                let parentSpr = sprite.owner.getParentSprite();
                if (parentSpr) {
                    let spriteLeftTop = new math2d_1.vec2(sprite.x + bounding.left, sprite.y + bounding.top);
                    spriteLeftTop = math2d_1.Math2D.transform(parentSpr.getWorldMatrix(), spriteLeftTop);
                    let spriteRightBottom = new math2d_1.vec2(sprite.x + bounding.right, sprite.y + bounding.bottom);
                    spriteRightBottom = math2d_1.Math2D.transform(parentSpr.getWorldMatrix(), spriteRightBottom);
                    if (math2d_1.Math2D.isCollisionWithRect(spriteLeftTop.x, spriteLeftTop.y, spriteRightBottom.x - spriteLeftTop.x, spriteRightBottom.y - spriteLeftTop.y, this._selectAreaVertexs[0], this._selectAreaVertexs[1], this._selectAreaVertexs[2], this._selectAreaVertexs[3])) {
                        this.addSelectedSprite(sprite);
                    }
                    else {
                        this.removeSelectedSprite(sprite);
                    }
                }
            }
        }
    }
    handleWheel(evt) {
        evt.preventDefault();
        let wheelEvt = evt;
        let wheelDelta = wheelEvt.wheelDelta || wheelEvt.detail; //detail是firefox的属性
        let mouseOffset = this._app._viewportToCanvasCoordinate(evt);
        if (wheelDelta === 120 || wheelDelta === -3 || wheelDelta === -10) {
            // 向上滚
            this._curZoom *= 1.2;
            this.handleScaleChange(mouseOffset.x, mouseOffset.y, WheelType.UP);
        }
        else if (wheelDelta === -120 || wheelDelta === 3 || wheelDelta === 10) {
            // 向下滚
            this._curZoom /= 1.2;
            this.handleScaleChange(mouseOffset.x, mouseOffset.y, WheelType.DOWN);
        }
        if (this._sprMenu) {
            this._sprMenu.style.display = 'none';
        }
    }
    handleScaleChange(mouseX, mouseY, action) {
        const root = this._app.rootContainer;
        const rootSpr = root.sprite;
        if (rootSpr) {
            rootSpr.scaleX = this._curZoom;
            rootSpr.scaleY = this._curZoom;
            let x = 0;
            let y = 0;
            //感谢 https://www.cnblogs.com/3body/p/9436864.html 这篇文章
            if (action === WheelType.UP) {
                x = (mouseX - rootSpr.x) * 1.2 - (mouseX - rootSpr.x);
                y = (mouseY - rootSpr.y) * 1.2 - (mouseY - rootSpr.y);
            }
            else if (action === WheelType.DOWN) {
                x = (mouseX - rootSpr.x) / 1.2 - (mouseX - rootSpr.x);
                y = (mouseY - rootSpr.y) / 1.2 - (mouseY - rootSpr.y);
            }
            this.lastWheelMouseX = mouseX; // 缓存最后一次滚动滚轮时的鼠标位置，为点击缩放按钮时使用
            this.lastWheelMouseY = mouseY;
            rootSpr.x = rootSpr.x - x;
            rootSpr.y = rootSpr.y - y;
        }
    }
    init() {
        const root = this._app.rootContainer;
        const panelPointNode1 = PanelPointFactory_1.PanelPointFactory.create(root, 'panelPointNode1', new math2d_1.vec2(120, 120), this);
        const panelPointNode2 = PanelPointFactory_1.PanelPointFactory.create(root, 'panelPointNode2', new math2d_1.vec2(320, 120), this);
        const panelPointNode3 = PanelPointFactory_1.PanelPointFactory.create(root, 'panelPointNode3', new math2d_1.vec2(320, 400), this);
        const containerNode1 = ContainerFactory_1.ContainerFactory.create(root, 'containerNode1', new math2d_1.vec2(520, 220), this);
        const rectNode1 = PanelRectFactory_1.PanelRectFactory.create(containerNode1, 'rectNode1', new math2d_1.vec2(0, 0), this);
        const rectNode2 = PanelRectFactory_1.PanelRectFactory.create(containerNode1, 'rectNode2', new math2d_1.vec2(60, 170), this);
        const rectNode3 = PanelRectFactory_1.PanelRectFactory.create(root, 'rectNode3', new math2d_1.vec2(0, 0), this);
        const containerNode2 = ContainerFactory_1.ContainerFactory.create(containerNode1, 'containerNode2', new math2d_1.vec2(0, 170), this);
        const rectNode2_1 = PanelRectFactory_1.PanelRectFactory.create(containerNode2, 'rectNode2_1', new math2d_1.vec2(0, 0), this);
        const rectNode2_2 = PanelRectFactory_1.PanelRectFactory.create(containerNode2, 'rectNode2_2', new math2d_1.vec2(0, 120), this);
        LinkFactory_1.LinkFactory.create(root, rectNode2_1, rectNode2_2, '99');
        LinkFactory_1.LinkFactory.create(root, panelPointNode1, panelPointNode2, '1->2');
        LinkFactory_1.LinkFactory.create(root, panelPointNode2, panelPointNode1, '2->1');
        LinkFactory_1.LinkFactory.create(root, panelPointNode2, panelPointNode1, '2->1');
        LinkFactory_1.LinkFactory.create(root, panelPointNode2, panelPointNode1, '2->1');
        LinkFactory_1.LinkFactory.create(root, panelPointNode1, panelPointNode3, '1->3');
        LinkFactory_1.LinkFactory.create(root, panelPointNode2, panelPointNode3, '2->3');
        LinkFactory_1.LinkFactory.create(root, panelPointNode2, panelPointNode3, '2->3');
        LinkFactory_1.LinkFactory.create(root, rectNode1, rectNode2, 'ii');
        LinkFactory_1.LinkFactory.create(root, rectNode1, panelPointNode2, '88');
        const rectNode4 = PanelRectFactory_1.PanelRectFactory.create(root, 'rectNode4', new math2d_1.vec2(700, 60), this);
        const rectNode5 = PanelRectFactory_1.PanelRectFactory.create(root, 'rectNode5', new math2d_1.vec2(850, 300), this);
        HorizontalFlexLinkFactory_1.HorizontalFlexLinkFactory.create(root, rectNode4, rectNode5, '1');
        HorizontalFlexLinkFactory_1.HorizontalFlexLinkFactory.create(root, rectNode5, rectNode4, '2');
        const rectNode6 = PanelRectFactory_1.PanelRectFactory.create(root, 'rectNode6', new math2d_1.vec2(700, 400), this);
        const rectNode7 = PanelRectFactory_1.PanelRectFactory.create(root, 'rectNode7', new math2d_1.vec2(850, 500), this);
        VerticalFlexLinkFactory_1.VerticalFlexLinkFactory.create(root, rectNode6, rectNode7, '3');
        VerticalFlexLinkFactory_1.VerticalFlexLinkFactory.create(root, rectNode7, rectNode6, '4');
        VerticalFlexLinkFactory_1.VerticalFlexLinkFactory.create(root, rectNode7, rectNode6, '5');
        console.log(root);
    }
    init2() {
        const root = this._app.rootContainer;
        const containerNode1 = ContainerFactory_1.ContainerFactory.create(root, 'containerNode1', new math2d_1.vec2(0, 0), this);
        const panelPointNode1 = PanelPointFactory_1.PanelPointFactory.create(containerNode1, 'panelPointNode1', new math2d_1.vec2(50, 50), this);
        const panelPointNode2 = PanelPointFactory_1.PanelPointFactory.create(containerNode1, 'panelPointNode2', new math2d_1.vec2(320, 120), this);
        const panelPointNode3 = PanelPointFactory_1.PanelPointFactory.create(root, 'panelPointNode3', new math2d_1.vec2(320, 400), this);
        LinkFactory_1.LinkFactory.create(root, panelPointNode2, panelPointNode3, '2->3');
        LinkFactory_1.LinkFactory.create(root, panelPointNode1, panelPointNode2, '1->2');
        console.log(root);
    }
    init3() {
        const root = this._app.rootContainer;
        const rectNode3 = PanelRectFactory_1.PanelRectFactory.create(root, 'rectNode3', new math2d_1.vec2(200, 200), this);
        //const panelPointNode2: SpriteNode = PanelPointFactory.create(root, 'panelPointNode2', new vec2(320, 120), this);
        console.log(root);
    }
    convertTreeToJsonString(node) {
        let nodes = [];
        let datas = [];
        let n = node;
        do {
            if (n.needSerialize === true) {
                let sprite = n.data;
                if (sprite) {
                    // 父级对象的索引先统一设置成-1
                    let nodeData = new NodeData_1.NodeData(-1, n.nodeType);
                    nodeData.x = sprite.x;
                    nodeData.y = sprite.y;
                    nodeData.name = n.name;
                    // 在同一个循环里一起赋值datas和nodes，保证datas和nodes的同一索引对应的是同一个TreeNode数据
                    datas.push(nodeData);
                    nodes.push(n);
                }
            }
        } while (n = n.moveNext()); // 深度优先、从上到下、从左到右的遍历，保证父节点在数组中的索引肯定比子节点的索引小，这样反序列化的时候，父节点的实例才能先于子节点创建
        // 为parentIdx赋值
        for (let i = 0; i < datas.length; i++) {
            // 连线node需要手动指定parent为root，因为再工厂函数中连线node都会放到一个SpriteNodeGroup中，再把SpriteNodeGroup放到root下
            if (nodes[i].nodeType === interface_1.NodeType.LINK ||
                nodes[i].nodeType === interface_1.NodeType.HORIZONTALFLEXLINK ||
                nodes[i].nodeType === interface_1.NodeType.VERTICALFLEXLINK) {
                datas[i].parentIdx = 0;
            }
            else {
                let parent = nodes[i].parent;
                if (parent === undefined) {
                    datas[i].parentIdx = -1; // 根节点
                }
                else {
                    for (let j = 0; j < datas.length; j++) {
                        if (parent === nodes[j]) {
                            datas[i].parentIdx = j;
                        }
                    }
                }
            }
        }
        // 为detas数组中的连线数据的toIdx和fromIdx赋值，这里不需要管fromIdx和toIdx指向的node对象在反序列化的时候是否已经创建，因为反序列化的时候有特殊处理
        for (let i = 0; i < datas.length; i++) {
            if (nodes[i].nodeType === interface_1.NodeType.LINK || nodes[i].nodeType === interface_1.NodeType.HORIZONTALFLEXLINK || nodes[i].nodeType === interface_1.NodeType.VERTICALFLEXLINK) {
                let sprite = nodes[i].data;
                if (sprite) {
                    let fromIdx = undefined;
                    let toIdx = undefined;
                    for (let j = 0; j < datas.length; j++) {
                        if (sprite.data.from === nodes[j]) {
                            fromIdx = j;
                        }
                        if (sprite.data.to === nodes[j]) {
                            toIdx = j;
                        }
                    }
                    datas[i].fromIdx = fromIdx;
                    datas[i].toIdx = toIdx;
                }
            }
        }
        return JSON.stringify(datas);
    }
    convertJsonStringToTree(json) {
        let datas = JSON.parse(json);
        let data;
        let nodes = [];
        const root = this._app.rootContainer;
        // 根据NodeData列表生成节点数组
        for (let i = 0; i < datas.length; i++) {
            data = datas[i];
            if (data.parentIdx === -1) {
                let spr = interface_1.SpriteFactory.createISprite(interface_1.SpriteFactory.createGrid(1000, 600));
                spr.name = 'root';
                spr.strokeStyle = "rgba(0,0,0,0.1)";
                spr.fillStyle = 'white';
                spr.renderType = interface_1.ERenderType.STROKE_FILL;
                let root = new sprite2dHierarchicalSystem_1.SpriteNode(spr, undefined, spr.name);
                root.nodeType = interface_1.NodeType.SPRITE;
                root.needSerialize = true;
                spr.owner = root;
                nodes.push(root);
            }
            else {
                let blankNode = new sprite2dHierarchicalSystem_1.SpriteNodeGroup(undefined, undefined, 'blank');
                if (data.nodeType === interface_1.NodeType.CONTAINER) {
                    let node = ContainerFactory_1.ContainerFactory.create(nodes[data.parentIdx], data.name || '', new math2d_1.vec2(data.x, data.y), this);
                    nodes.push(node);
                }
                else if (data.nodeType === interface_1.NodeType.PANELPOINT) {
                    let node = PanelPointFactory_1.PanelPointFactory.create(nodes[data.parentIdx], data.name || '', new math2d_1.vec2(data.x, data.y), this);
                    nodes.push(node);
                }
                else if (data.nodeType === interface_1.NodeType.PANELRECT) {
                    let node = PanelRectFactory_1.PanelRectFactory.create(nodes[data.parentIdx], data.name || '', new math2d_1.vec2(data.x, data.y), this);
                    nodes.push(node);
                }
                else if (data.nodeType === interface_1.NodeType.LINK || data.nodeType === interface_1.NodeType.VERTICALFLEXLINK || data.nodeType === interface_1.NodeType.HORIZONTALFLEXLINK) {
                    // 连线类型的node，因为他们的from或to指向的对象还没有建立，所以先用blankNode在nodes中做占位
                    nodes.push(blankNode);
                }
            }
        }
        // 把所有连线node都实例化并设置它们的from和to指向，因为此时的nodes中所有node都已经按顺序实例化（连线node已经进行了占位）
        // 不用担心fromIdx索引或toIdx索引在nodes中没有对应的成员
        for (let i = 0; i < datas.length; i++) {
            data = datas[i];
            if (data.fromIdx !== undefined && data.toIdx !== undefined) {
                if (data.nodeType === interface_1.NodeType.LINK) {
                    LinkFactory_1.LinkFactory.create(nodes[data.parentIdx], nodes[data.fromIdx], nodes[data.toIdx], data.name || '');
                }
                if (data.nodeType === interface_1.NodeType.VERTICALFLEXLINK) {
                    VerticalFlexLinkFactory_1.VerticalFlexLinkFactory.create(nodes[data.parentIdx], nodes[data.fromIdx], nodes[data.toIdx], data.name || '');
                }
                if (data.nodeType === interface_1.NodeType.HORIZONTALFLEXLINK) {
                    HorizontalFlexLinkFactory_1.HorizontalFlexLinkFactory.create(nodes[data.parentIdx], nodes[data.fromIdx], nodes[data.toIdx], data.name || '');
                }
            }
        }
        // 返回反序列化中的根节点
        return nodes[0];
    }
}
exports.TopologyApplication = TopologyApplication;
const canvas = document.getElementById('canvas');
const app = new sprite2DApplication_1.Sprite2DApplication(canvas, true);
app.isSupportMouseMove = true;
new TopologyApplication(app);


/***/ }),

/***/ "./src/shaps/CNodeTextShap.ts":
/*!************************************!*\
  !*** ./src/shaps/CNodeTextShap.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CNodeTextShap = void 0;
const shapes_1 = __webpack_require__(/*! ../lib/spriteSystem/shapes */ "./src/lib/spriteSystem/shapes.ts");
class CNodeTextShap extends shapes_1.BaseShape2D {
    constructor(radius = 1) {
        super();
    }
    hitTest(localPt, transform) {
        return false;
    }
    getBounding() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
    }
    draw(transformable, state, context) {
        const spr = transformable;
        const text = spr.data.text;
        context.save();
        context.font = "20px Arial";
        context.textBaseline = "middle";
        context.textAlign = "left";
        const w = context.measureText(text).width;
        const h = context.measureText('田').width;
        const padding = 10;
        const Xdeviation = -(w + 2 * padding) / 2; // x轴的偏移量
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
        cxt.moveTo(x + radius, y);
        cxt.lineTo(x + width - radius, y);
        cxt.quadraticCurveTo(x + width, y, x + width, y + radius);
        cxt.lineTo(x + width, y + height - radius);
        cxt.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        cxt.lineTo(x + radius, y + height);
        cxt.quadraticCurveTo(x, y + height, x, y + height - radius);
        cxt.lineTo(x, y + radius);
        cxt.quadraticCurveTo(x, y, x + radius, y);
        // cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
        // cxt.lineTo(width - radius + x, y);
        // cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
        // cxt.lineTo(width + x, height + y - radius);
        // cxt.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
        // cxt.lineTo(radius + x, height + y);
        // cxt.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
        cxt.closePath();
    }
    get type() {
        return "CNodeTextShap";
    }
}
exports.CNodeTextShap = CNodeTextShap;


/***/ }),

/***/ "./src/shaps/LinkTextShap.ts":
/*!***********************************!*\
  !*** ./src/shaps/LinkTextShap.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinkTextShap = void 0;
const shapes_1 = __webpack_require__(/*! ../lib/spriteSystem/shapes */ "./src/lib/spriteSystem/shapes.ts");
class LinkTextShap extends shapes_1.BaseShape2D {
    constructor() {
        super();
    }
    hitTest(localPt, transform) {
        return false;
    }
    getBounding() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
    }
    draw(transformable, state, context) {
        const spr = transformable;
        const text = spr.data.text;
        context.save();
        context.font = "14px Arial";
        context.textBaseline = "middle";
        context.textAlign = "left";
        const w = context.measureText(text).width;
        const h = context.measureText('田').width;
        const padding = 4;
        const Xdeviation = -(w + 2 * padding) / 2; // x轴的偏移量
        const Ydeviation = -(h + 2 * padding) / 2; // y轴的偏移量
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
        cxt.moveTo(x + radius, y);
        cxt.lineTo(x + width - radius, y);
        cxt.quadraticCurveTo(x + width, y, x + width, y + radius);
        cxt.lineTo(x + width, y + height - radius);
        cxt.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        cxt.lineTo(x + radius, y + height);
        cxt.quadraticCurveTo(x, y + height, x, y + height - radius);
        cxt.lineTo(x, y + radius);
        cxt.quadraticCurveTo(x, y, x + radius, y);
        // cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
        // cxt.lineTo(width - radius + x, y);
        // cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
        // cxt.lineTo(width + x, height + y - radius);
        // cxt.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
        // cxt.lineTo(radius + x, height + y);
        // cxt.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
        cxt.closePath();
    }
    get type() {
        return "LinkTextShap";
    }
}
exports.LinkTextShap = LinkTextShap;


/***/ }),

/***/ "./src/shaps/RaduisLineShap.ts":
/*!*************************************!*\
  !*** ./src/shaps/RaduisLineShap.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RaduisLineShap = void 0;
const shapes_1 = __webpack_require__(/*! ../lib/spriteSystem/shapes */ "./src/lib/spriteSystem/shapes.ts");
const math2d_1 = __webpack_require__(/*! ../lib/math2d */ "./src/lib/math2d.ts");
class RaduisLineShap extends shapes_1.BaseShape2D {
    constructor(pointCount = 0, radius = 0) {
        super();
        this.radius = 7;
        this.pointArr = [];
        this.radius = radius;
        for (let i = 0; i < pointCount; i++) {
            this.pointArr.push(new math2d_1.vec2(0, 0));
        }
    }
    hitTest(localPt, transform) {
        return false;
    }
    getBounding() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
    }
    drawRadius(context, pot1, pot2, pot3) {
        let rotate = Math.atan2(pot2.y - pot1.y, pot2.x - pot1.x);
        let dx = Math.cos(rotate) * this.radius;
        let dy = Math.sin(rotate) * this.radius;
        let newPoint1 = new math2d_1.vec2(pot2.x - dx, pot2.y - dy);
        let rotate2 = Math.atan2(pot3.y - pot2.y, pot3.x - pot2.x);
        let dx2 = Math.cos(rotate2) * this.radius;
        let dy2 = Math.sin(rotate2) * this.radius;
        let newPoint2 = new math2d_1.vec2(pot2.x + dx2, pot2.y + dy2);
        context.lineTo(newPoint1.x, newPoint1.y);
        context.quadraticCurveTo(pot2.x, pot2.y, newPoint2.x, newPoint2.y);
    }
    draw(transformable, state, context) {
        context.beginPath();
        if (this.radius === 0) {
            this.pointArr.forEach((point, index) => {
                if (index === 0) {
                    context.moveTo(point.x, point.y);
                }
                else {
                    context.lineTo(point.x, point.y);
                }
            });
        }
        else {
            this.pointArr.forEach((point, index) => {
                if (index === 0) {
                    context.moveTo(point.x, point.y);
                }
                else {
                    if (index < this.pointArr.length - 1) {
                        this.drawRadius(context, this.pointArr[index - 1], this.pointArr[index], this.pointArr[index + 1]);
                    }
                    else {
                        context.lineTo(point.x, point.y);
                    }
                }
            });
        }
        context.stroke();
    }
    get type() {
        return "RaduisLineShap";
    }
}
exports.RaduisLineShap = RaduisLineShap;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFjdG9yeS9Db250YWluZXJGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9mYWN0b3J5L0hvcml6b250YWxGbGV4TGlua0ZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZhY3RvcnkvTGlua0ZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZhY3RvcnkvUGFuZWxQb2ludEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZhY3RvcnkvUGFuZWxSZWN0RmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZmFjdG9yeS9WZXJ0aWNhbEZsZXhMaW5rRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZmFjdG9yeS9mYWN0b3J5VXRpbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL05vZGVEYXRhLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvYXBwbGljYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9tYXRoMmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9zcHJpdGVTeXN0ZW0vaW50ZXJmYWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc3ByaXRlU3lzdGVtL3NoYXBlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3Nwcml0ZVN5c3RlbS9zcHJpdGUyREFwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc3ByaXRlU3lzdGVtL3Nwcml0ZTJkLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc3ByaXRlU3lzdGVtL3Nwcml0ZTJkSGllcmFyY2hpY2FsU3lzdGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc3ByaXRlU3lzdGVtL3Nwcml0ZTJkU3lzdGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvdHJlZU5vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXBzL0NOb2RlVGV4dFNoYXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXBzL0xpbmtUZXh0U2hhcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcHMvUmFkdWlzTGluZVNoYXAudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLG9IQUEyRztBQUszRyx1S0FBNEY7QUFDNUYsaUhBQXVEO0FBT3ZELCtGQUE4STtBQUU5SSxNQUFhLGdCQUFnQjtJQUtwQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQWtCLEVBQUUsSUFBWSxFQUFFLFFBQWMsRUFBRSxHQUF3QjtRQUM3RixJQUFJLFlBQVksR0FBRyxJQUFJLG1CQUFRLENBQUMseUJBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLEVBQUMsNENBQTRDO1FBQ2pJLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFDM0IsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUMzQixZQUFZLENBQUMsU0FBUyxHQUFHLGdCQUFnQjtRQUN6QyxZQUFZLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVELFlBQVksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBcUIsRUFBRSxFQUFFO1lBQ2hFLDhCQUFnQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQy9CLGdDQUFrQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQ2pDLCtCQUFpQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2xDLENBQUM7UUFJRCxNQUFNLE9BQU8sR0FBRyxJQUFJLHVDQUFVLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUM7UUFDeEUsT0FBTyxDQUFDLFFBQVEsR0FBRyxv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RUFBRSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLEVBQUUsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhDLElBQUksRUFBRSxHQUFXLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxFQUFFLEdBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLEVBQUUsR0FBVyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksRUFBRSxHQUFXLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxFQUFFLEdBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLEVBQUUsR0FBVyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFMUMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBVTtRQUNsQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBVSxFQUFFLE1BQWE7UUFDNUMsSUFBSSxHQUFHLEdBQVcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV6QyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVoQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN6RixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN6RixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQWUsRUFBRSxTQUF1QixJQUFJO1FBQ3JFLElBQUksTUFBTSxLQUFLLElBQUk7WUFBRSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsTUFB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QUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRixFQUFFLENBQUMsSUFBSSxHQUFHLGFBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXhCLEVBQUUsR0FBRyxJQUFJLGtCQUFTLEVBQUUsQ0FBQztRQUNyQixFQUFFLENBQUMsTUFBTSxHQUFHLGFBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0YsRUFBRSxDQUFDLElBQUksR0FBRyxhQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXZCLEVBQUUsR0FBRyxJQUFJLGtCQUFTLEVBQUUsQ0FBQztRQUNyQixFQUFFLENBQUMsTUFBTSxHQUFHLGFBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0YsRUFBRSxDQUFDLElBQUksR0FBRyxhQUFJLENBQUMs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VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU3ByaXRlLCBTcHJpdGVGYWN0b3J5LCBJU2hhcGUsIEVPcmRlciwgQm91bmRpbmcsIE5vZGVUeXBlIH0gZnJvbSBcIi4uL2xpYi9zcHJpdGVTeXN0ZW0vaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNwcml0ZTJEQXBwbGljYXRpb24gfSBmcm9tIFwiLi4vbGliL3Nwcml0ZVN5c3RlbS9zcHJpdGUyREFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IENhbnZhc01vdXNlRXZlbnQsIEVJbnB1dEV2ZW50VHlwZSB9IGZyb20gXCIuLi9saWIvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgdmVjMiwgTWF0aDJEIH0gZnJvbSBcIi4uL2xpYi9tYXRoMmRcIjtcclxuaW1wb3J0IHsgTGluZSwgUmVjdCB9IGZyb20gXCIuLi9saWIvc3ByaXRlU3lzdGVtL3NoYXBlc1wiO1xyXG5pbXBvcnQgeyBTcHJpdGVOb2RlLCBTcHJpdGVOb2RlR3JvdXAgfSBmcm9tICcuLi9saWIvc3ByaXRlU3lzdGVtL3Nwcml0ZTJkSGllcmFyY2hpY2FsU3lzdGVtJ1xyXG5pbXBvcnQgeyBTcHJpdGUyRCB9IGZyb20gJy4uL2xpYi9zcHJpdGVTeXN0ZW0vc3ByaXRlMmQnXHJcblxyXG5pbXBvcnQgeyBDTm9kZVRleHRTaGFwIH0gZnJvbSAnLi4vc2hhcHMvQ05vZGVUZXh0U2hhcCdcclxuaW1wb3J0IHsgTGlua1RleHRTaGFwIH0gZnJvbSAnLi4vc2hhcHMvTGlua1RleHRTaGFwJ1xyXG5cclxuaW1wb3J0IHsgQ2FudmFzMkRVdGlsIH0gZnJvbSAnLi4vbGliL2NhbnZhczJkL2NhbnZhczJEVXRpbCdcclxuaW1wb3J0IHsgVG9wb2xvZ3lBcHBsaWNhdGlvbiB9IGZyb20gJy4uL21haW4nXHJcbmltcG9ydCB7IHNwcml0ZURyYWdBY3Rpb24sIHNwcml0ZVNlbGVjdEFjdGlvbiwgc3ByaXRlSG92ZXJBY3Rpb24sIHNwcml0ZU1lbnVBY3Rpb24sIHNwcml0ZURyYXdTZWxlY3RlZCwgc3ByaXRlRHJhd0hvdmVyIH0gZnJvbSAnLi9mYWN0b3J5VXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250YWluZXJGYWN0b3J5IHtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgX3Nwcml0ZXM6IEFycmF5PFNwcml0ZTJEPiA9IFtdXHJcbiAgcHJpdmF0ZSBzdGF0aWMgX25vZGVzOiBBcnJheTxTcHJpdGVOb2RlPiA9IFtdXHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhcmVudDogU3ByaXRlTm9kZSwgbmFtZTogc3RyaW5nLCBwb3NpdGlvbjogdmVjMiwgYXBwOiBUb3BvbG9neUFwcGxpY2F0aW9uKTogU3ByaXRlTm9kZSB7XHJcbiAgICBsZXQgY29udGFpbmVyU3ByID0gbmV3IFNwcml0ZTJEKFNwcml0ZUZhY3RvcnkuY3JlYXRlUmVjdCg1MCwgNTApLCAnY29udGFpbmVyU3ByaXRlJykgLy8g6L+Z6YeMc2hhcOS4jeiDveaMh+WQkeWQjOS4gOS4quWvueixoe+8jOWboOS4uuWcqHVwZGF0ZUV2ZW505Lit5Lya5Y675L+u5pS5c2hhcOWvueixoVxyXG4gICAgY29udGFpbmVyU3ByLnggPSBwb3NpdGlvbi54XHJcbiAgICBjb250YWluZXJTcHIueSA9IHBvc2l0aW9uLnlcclxuICAgIGNvbnRhaW5lclNwci5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwuMyknXHJcbiAgICBjb250YWluZXJTcHIudXBkYXRlRXZlbnQgPSB0aGlzLmhhbmRsZVVwZGF0ZUV2ZW50LmJpbmQodGhpcylcclxuICAgIGNvbnRhaW5lclNwci5tb3VzZUV2ZW50ID0gKHNwcjogSVNwcml0ZSwgZXZ0OiBDYW52YXNNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIHNwcml0ZURyYWdBY3Rpb24oc3ByLCBldnQsIGFwcClcclxuICAgICAgc3ByaXRlU2VsZWN0QWN0aW9uKHNwciwgZXZ0LCBhcHApXHJcbiAgICAgIHNwcml0ZUhvdmVyQWN0aW9uKHNwciwgZXZ0LCBhcHApXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBjb25zdCBzcHJOb2RlID0gbmV3IFNwcml0ZU5vZGUoY29udGFpbmVyU3ByLCB1bmRlZmluZWQsICdjb250YWluZXJOb2RlJylcclxuICAgIHNwck5vZGUubm9kZVR5cGUgPSBOb2RlVHlwZS5DT05UQUlORVJcclxuICAgIHNwck5vZGUubmVlZFNlcmlhbGl6ZSA9IHRydWVcclxuICAgIHNwck5vZGUubmFtZSA9IG5hbWVcclxuXHJcbiAgICBwYXJlbnQuYWRkQ2hpbGRBdChzcHJOb2RlLCAwKVxyXG5cclxuXHJcbiAgICB0aGlzLl9ub2Rlcy5wdXNoKHNwck5vZGUpXHJcbiAgICByZXR1cm4gc3ByTm9kZVxyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGhhbmRsZVVwZGF0ZUV2ZW50KHNwcjogSVNwcml0ZSwgbWVzYzogbnVtYmVyLCBkaWZmU2VjOiBudW1iZXIsIHRyYXZlbE9yZGVyOiBFT3JkZXIpOiB2b2lkIHtcclxuICAgIGxldCBwYWRkaW5nOiBudW1iZXIgPSAyMFxyXG4gICAgbGV0IG1pblggPSAxZTdcclxuICAgIGxldCBtaW5ZID0gMWU3XHJcbiAgICBsZXQgbWF4VyA9IC0xZTdcclxuICAgIGxldCBtYXhIID0gLTFlN1xyXG5cclxuICAgIGxldCBwYXJlbnRTcHJOb2RlID0gc3ByLm93bmVyIGFzIFNwcml0ZU5vZGVcclxuXHJcbiAgICBpZiAocGFyZW50U3ByTm9kZSAmJiBwYXJlbnRTcHJOb2RlLmNoaWxkcmVuICYmIHBhcmVudFNwck5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgbGV0IHNoYXBlID0gc3ByLnNoYXBlIGFzIFJlY3RcclxuXHJcbiAgICAgIGxldCBjaGlsZFNwckFycjogQXJyYXk8U3ByaXRlMkQ+ID0gW11cclxuICAgICAgcGFyZW50U3ByTm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkU3ByTm9kZSA9PiB7XHJcbiAgICAgICAgbGV0IGNoaWxkU3ByID0gY2hpbGRTcHJOb2RlLmRhdGEgYXMgU3ByaXRlMkRcclxuICAgICAgICBjaGlsZFNwckFyci5wdXNoKGNoaWxkU3ByKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLy8gY2hpbGRTcHJBcnIuZm9yRWFjaChjaGlsZFNwciA9PiB7XHJcbiAgICAgIC8vICAgaWYgKGNoaWxkU3ByLnggPCAwKSB7XHJcbiAgICAgIC8vICAgICBsZXQgbW92ZSA9IGNoaWxkU3ByLnhcclxuICAgICAgLy8gICAgIGNoaWxkU3ByLnggPSAwXHJcbiAgICAgIC8vICAgICBzcHIueCA9IHNwci54ICsgbW92ZVxyXG4gICAgICAvLyAgICAgY2hpbGRTcHJBcnIuZm9yRWFjaChjc3ByID0+IHtcclxuICAgICAgLy8gICAgICAgaWYgKGNzcHIgIT09IGNoaWxkU3ByKSB7XHJcbiAgICAgIC8vICAgICAgICAgY3Nwci54ID0gY3Nwci54IC0gbW92ZVxyXG4gICAgICAvLyAgICAgICB9XHJcbiAgICAgIC8vICAgICB9KVxyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gICBpZiAoY2hpbGRTcHIueCArIDIwID4gc2hhcGUudykge1xyXG4gICAgICAvLyAgICAgc2hhcGUudyA9IGNoaWxkU3ByLnggKyAyMFxyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gICBpZiAoY2hpbGRTcHIueSA8IDApIHtcclxuICAgICAgLy8gICAgIGxldCBtb3ZlID0gY2hpbGRTcHIueVxyXG4gICAgICAvLyAgICAgY2hpbGRTcHIueSA9IDBcclxuICAgICAgLy8gICAgIHNwci55ID0gc3ByLnkgKyBtb3ZlXHJcbiAgICAgIC8vICAgICBjaGlsZFNwckFyci5mb3JFYWNoKGNzcHIgPT4ge1xyXG4gICAgICAvLyAgICAgICBpZiAoY3NwciAhPT0gY2hpbGRTcHIpIHtcclxuICAgICAgLy8gICAgICAgICBjc3ByLnkgPSBjc3ByLnkgLSBtb3ZlXHJcbiAgICAgIC8vICAgICAgIH1cclxuICAgICAgLy8gICAgIH0pXHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyAgIGlmIChjaGlsZFNwci55ICsgMjAgPiBzaGFwZS5oKSB7XHJcbiAgICAgIC8vICAgICBzaGFwZS5oID0gY2hpbGRTcHIueSArIDIwXHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9KVxyXG5cclxuXHJcblxyXG4gICAgICBjaGlsZFNwckFyci5mb3JFYWNoKGNoaWxkU3ByID0+IHtcclxuICAgICAgICBsZXQgYm91bmRpbmc6IEJvdW5kaW5nID0gY2hpbGRTcHIuc2hhcGUuZ2V0Qm91bmRpbmcoKVxyXG4gICAgICAgIGlmIChjaGlsZFNwci54ICsgYm91bmRpbmcubGVmdCA8IG1pblgpIHtcclxuICAgICAgICAgIG1pblggPSBjaGlsZFNwci54ICsgYm91bmRpbmcubGVmdFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hpbGRTcHIueSArIGJvdW5kaW5nLnRvcCA8IG1pblkpIHtcclxuICAgICAgICAgIG1pblkgPSBjaGlsZFNwci55ICsgYm91bmRpbmcudG9wXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGlsZFNwci54ICsgYm91bmRpbmcucmlnaHQgPiBtYXhXKSB7XHJcbiAgICAgICAgICBtYXhXID0gY2hpbGRTcHIueCArIGJvdW5kaW5nLnJpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGlsZFNwci55ICsgYm91bmRpbmcuYm90dG9tID4gbWF4SCkge1xyXG4gICAgICAgICAgbWF4SCA9IGNoaWxkU3ByLnkgKyBib3VuZGluZy5ib3R0b21cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBpZiAocGFkZGluZyA9PT0gMCkge1xyXG4gICAgICAgIHNwci54ID0gc3ByLnggKyBtaW5YXHJcbiAgICAgICAgY2hpbGRTcHJBcnIuZm9yRWFjaChjc3ByID0+IHtcclxuICAgICAgICAgIGNzcHIueCA9IGNzcHIueCAtIG1pblhcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBzcHIueSA9IHNwci55ICsgbWluWVxyXG4gICAgICAgIGNoaWxkU3ByQXJyLmZvckVhY2goY3NwciA9PiB7XHJcbiAgICAgICAgICBjc3ByLnkgPSBjc3ByLnkgLSBtaW5ZXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgc2hhcGUud2lkdGggPSBtYXhXXHJcbiAgICAgICAgc2hhcGUuaGVpZ2h0ID0gbWF4SFxyXG4gICAgICB9IGVsc2UgaWYgKHBhZGRpbmcgPiAwKSB7XHJcbiAgICAgICAgc3ByLnggPSBzcHIueCArIG1pblggLSBwYWRkaW5nXHJcbiAgICAgICAgY2hpbGRTcHJBcnIuZm9yRWFjaChjc3ByID0+IHtcclxuICAgICAgICAgIGNzcHIueCA9IGNzcHIueCAtIG1pblggKyBwYWRkaW5nXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgc3ByLnkgPSBzcHIueSArIG1pblkgLSBwYWRkaW5nXHJcbiAgICAgICAgY2hpbGRTcHJBcnIuZm9yRWFjaChjc3ByID0+IHtcclxuICAgICAgICAgIGNzcHIueSA9IGNzcHIueSAtIG1pblkgKyBwYWRkaW5nXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgc2hhcGUud2lkdGggPSBtYXhXICsgcGFkZGluZ1xyXG4gICAgICAgIHNoYXBlLmhlaWdodCA9IG1heEggKyBwYWRkaW5nXHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICAvLyBsZXQgcGFyZW50U3ByID0gc3ByLm93bmVyLmdldFBhcmVudFNwcml0ZSgpXHJcbiAgICAgIC8vIGlmIChwYXJlbnRTcHIpIHtcclxuICAgICAgLy8gICBsZXQgZG90MSA9IE1hdGgyRC50cmFuc2Zvcm0oc3ByLmdldFdvcmxkTWF0cml4MigpLCBuZXcgdmVjMihtaW5YLCBtaW5ZKSlcclxuICAgICAgLy8gICBsZXQgZG90MiA9IE1hdGgyRC50cmFuc2Zvcm0oc3ByLmdldFdvcmxkTWF0cml4MigpLCBuZXcgdmVjMihtYXhXIC0gbWluWCwgbWF4SCAtIG1pblkpKVxyXG4gICAgICAvLyAgIHNwci54ID0gZG90MS54XHJcbiAgICAgIC8vICAgc3ByLnkgPSBkb3QxLnlcclxuICAgICAgLy8gfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgLy8gbGV0IHNoYXBlID0gc3ByLnNoYXBlIGFzIENvbnRhaW5lclNoYXBcclxuXHJcbiAgICAgIC8vIHNoYXBlLnggPSBtaW5YXHJcbiAgICAgIC8vIHNoYXBlLncgPSBtYXhXIC0gbWluWFxyXG4gICAgICAvLyBzaGFwZS55ID0gbWluWVxyXG4gICAgICAvLyBzaGFwZS5oID0gbWF4SCAtIG1pbllcclxuXHJcbiAgICAgIC8vIGlmIChwYWRkaW5nID4gMCkge1xyXG4gICAgICAvLyAgIHNoYXBlLnggPSBtaW5YIC0gcGFkZGluZ1xyXG4gICAgICAvLyAgIHNoYXBlLncgPSBtYXhXIC0gbWluWCArIHBhZGRpbmcgKiAyXHJcbiAgICAgIC8vICAgc2hhcGUueSA9IG1pblkgLSBwYWRkaW5nXHJcbiAgICAgIC8vICAgc2hhcGUuaCA9IG1heEggLSBtaW5ZICsgcGFkZGluZyAqIDJcclxuICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldFNwcml0ZXMoKTogQXJyYXk8U3ByaXRlMkQ+IHtcclxuICAgIHJldHVybiBDb250YWluZXJGYWN0b3J5Ll9zcHJpdGVzXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldE5vZGVzKCk6IEFycmF5PFNwcml0ZU5vZGU+IHtcclxuICAgIHJldHVybiB0aGlzLl9ub2Rlc1xyXG4gIH1cclxufSIsImltcG9ydCB7IElTcHJpdGUsIFNwcml0ZUZhY3RvcnksIElTaGFwZSwgRU9yZGVyLCBOb2RlVHlwZSB9IGZyb20gXCIuLi9saWIvc3ByaXRlU3lzdGVtL2ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYW52YXNNb3VzZUV2ZW50IH0gZnJvbSBcIi4uL2xpYi9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyB2ZWMyLCBNYXRoMkQgfSBmcm9tIFwiLi4vbGliL21hdGgyZFwiO1xyXG5pbXBvcnQgeyBTcHJpdGVOb2RlLCBTcHJpdGVOb2RlR3JvdXAgfSBmcm9tICcuLi9saWIvc3ByaXRlU3lzdGVtL3Nwcml0ZTJkSGllcmFyY2hpY2FsU3lzdGVtJ1xyXG5pbXBvcnQgeyBTcHJpdGUyRCB9IGZyb20gJy4uL2xpYi9zcHJpdGVTeXN0ZW0vc3ByaXRlMmQnXHJcbmltcG9ydCB7IExpbmtUZXh0U2hhcCB9IGZyb20gJy4uL3NoYXBzL0xpbmtUZXh0U2hhcCdcclxuaW1wb3J0IHsgUmFkdWlzTGluZVNoYXAgfSBmcm9tICcuLi9zaGFwcy9SYWR1aXNMaW5lU2hhcCdcclxuaW1wb3J0IHsgbW91bnRMaW5rTm9kZSB9IGZyb20gJy4vZmFjdG9yeVV0aWwnXHJcblxyXG5leHBvcnQgY2xhc3MgSG9yaXpvbnRhbEZsZXhMaW5rRmFjdG9yeSB7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIF9hcnJvd1NoYXA6IElTaGFwZSA9IFNwcml0ZUZhY3RvcnkuY3JlYXRlUG9seWdvbihbbmV3IHZlYzIoNSwgMCksIG5ldyB2ZWMyKDAsIDUpLCBuZXcgdmVjMigwLCAtNSldKVxyXG4gIHB1YmxpYyBzdGF0aWMgX2xpbmtHcm91cHM6IEFycmF5PFNwcml0ZU5vZGVHcm91cD4gPSBbXVxyXG4gIHByaXZhdGUgc3RhdGljIF9zYW1lTGlua0dhcCA9IDI1XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhcmVudDogU3ByaXRlTm9kZSwgZnJvbTogU3ByaXRlTm9kZSB8IHVuZGVmaW5lZCwgdG86IFNwcml0ZU5vZGUgfCB1bmRlZmluZWQsIG5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgbGlua1NwcjogSVNwcml0ZSA9IFNwcml0ZUZhY3RvcnkuY3JlYXRlU3ByaXRlKG5ldyBSYWR1aXNMaW5lU2hhcCg0LCAyMCkpO1xyXG4gICAgbGlua1Nwci5zdHJva2VTdHlsZSA9ICdncmVlbidcclxuICAgIGxpbmtTcHIubGluZVdpZHRoID0gNFxyXG4gICAgbGlua1Nwci5kYXRhID0ge31cclxuICAgIGxpbmtTcHIuZGF0YS5mcm9tID0gZnJvbVxyXG4gICAgbGlua1Nwci5kYXRhLnRvID0gdG9cclxuICAgIGxpbmtTcHIueCA9IDBcclxuICAgIGxpbmtTcHIueSA9IDBcclxuICAgIGxpbmtTcHIubW91c2VFdmVudCA9IHRoaXMuaGFuZGxlTGlua0V2ZW50LmJpbmQodGhpcylcclxuXHJcbiAgICBjb25zdCBsaW5rTm9kZSA9IG5ldyBTcHJpdGVOb2RlKGxpbmtTcHIpXHJcbiAgICBsaW5rTm9kZS5ub2RlVHlwZSA9IE5vZGVUeXBlLkhPUklaT05UQUxGTEVYTElOS1xyXG4gICAgbGlua05vZGUubmVlZFNlcmlhbGl6ZSA9IHRydWVcclxuICAgIGxpbmtOb2RlLm5hbWUgPSBuYW1lXHJcblxyXG4gICAgY29uc3QgYXJyb3dTcHI6IElTcHJpdGUgPSBTcHJpdGVGYWN0b3J5LmNyZWF0ZVNwcml0ZSh0aGlzLl9hcnJvd1NoYXApXHJcbiAgICBhcnJvd1Nwci5maWxsU3R5bGUgPSAnYmx1ZSdcclxuICAgIGxpbmtOb2RlLmFkZFNwcml0ZShhcnJvd1Nwcik7XHJcblxyXG4gICAgY29uc3QgdGV4dFNwcjogSVNwcml0ZSA9IG5ldyBTcHJpdGUyRChuZXcgTGlua1RleHRTaGFwKCksICdsaW5rVGV4dFNoYXAnKVxyXG4gICAgdGV4dFNwci5zaG93Q29vcmRTeXN0ZW0gPSBmYWxzZVxyXG4gICAgdGV4dFNwci54ID0gMFxyXG4gICAgdGV4dFNwci55ID0gMDtcclxuICAgIHRleHRTcHIuZGF0YSA9IHt9XHJcbiAgICB0ZXh0U3ByLmRhdGEudGV4dCA9IG5hbWVcclxuICAgIGxpbmtOb2RlLmFkZFNwcml0ZSh0ZXh0U3ByKTtcclxuXHJcbiAgICAvLyDmjILovb1saW5rTm9kZeWvueixoVxyXG4gICAgbW91bnRMaW5rTm9kZShsaW5rTm9kZSwgcGFyZW50LCBmcm9tLCB0bywgdGhpcy5fbGlua0dyb3VwcywgdGhpcy5oYW5kbGVMaW5rR3JvdXBVcGRhdGUuYmluZCh0aGlzKSlcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGhhbmRsZUxpbmtFdmVudChzcHI6IElTcHJpdGUsIGV2dDogQ2FudmFzTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ2hhbmRsZUxpbmtFdmVudCcsIHNwcilcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGhhbmRsZUxpbmtHcm91cFVwZGF0ZShzcHI6IElTcHJpdGUsIG1lc2M6IG51bWJlciwgZGlmZlNlYzogbnVtYmVyLCB0cmF2ZWxPcmRlcjogRU9yZGVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBsaW5rR3JvdXAgPSBzcHIub3duZXIgYXMgU3ByaXRlTm9kZUdyb3VwXHJcbiAgICBjb25zdCBjaGlsZHJlbiA9IGxpbmtHcm91cC5jaGlsZHJlblxyXG4gICAgbGV0IGZyb206IFNwcml0ZTJEID0gbGlua0dyb3VwLnBhcmFtcy5mcm9tLmRhdGFcclxuICAgIGxldCB0bzogU3ByaXRlMkQgPSBsaW5rR3JvdXAucGFyYW1zLnRvLmRhdGFcclxuICAgIGxldCBwdDE6IHZlYzIgPSBuZXcgdmVjMihmcm9tLngsIGZyb20ueSlcclxuICAgIGxldCBwdDI6IHZlYzIgPSBuZXcgdmVjMih0by54LCB0by55KVxyXG5cclxuICAgIGxldCBmcm9tUGFyZW50U3ByID0gZnJvbS5vd25lci5nZXRQYXJlbnRTcHJpdGUoKVxyXG4gICAgbGV0IHRvUGFyZW50U3ByID0gdG8ub3duZXIuZ2V0UGFyZW50U3ByaXRlKClcclxuICAgIC8vIOaKimZyb23lkox0b+eahOWxgOmDqOWdkOagh+i9rOaNouS4uuebuOWvueS6juaguXNwcml0ZeeahOWFqOWxgOWdkOagh1xyXG4gICAgaWYgKGZyb21QYXJlbnRTcHIgJiYgdG9QYXJlbnRTcHIpIHtcclxuICAgICAgcHQxID0gTWF0aDJELnRyYW5zZm9ybShmcm9tUGFyZW50U3ByLmdldFdvcmxkTWF0cml4MigpLCBwdDEpXHJcbiAgICAgIHB0MiA9IE1hdGgyRC50cmFuc2Zvcm0odG9QYXJlbnRTcHIuZ2V0V29ybGRNYXRyaXgyKCksIHB0MilcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB4ZCA9IHB0Mi54IC0gcHQxLnhcclxuICAgIGNvbnN0IHlkID0gcHQyLnkgLSBwdDEueVxyXG5cclxuICAgIGlmIChsaW5rR3JvdXAuc3ByaXRlKSB7XHJcbiAgICAgIGxpbmtHcm91cC5zcHJpdGUueCA9IHB0MS54XHJcbiAgICAgIGxpbmtHcm91cC5zcHJpdGUueSA9IHB0MS55XHJcbiAgICB9XHJcbiAgICBpZiAoY2hpbGRyZW4pIHtcclxuICAgICAgY29uc3QgY291bnQgPSBjaGlsZHJlbi5sZW5ndGhcclxuICAgICAgY2hpbGRyZW4uZm9yRWFjaCgobGlua04sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGlua1NwciA9IChsaW5rTiBhcyBTcHJpdGVOb2RlKS5zcHJpdGVcclxuICAgICAgICBpZiAobGlua1Nwcikge1xyXG4gICAgICAgICAgbGV0IHhEZXZpYXRpb24gPSBpbmRleCAqIDIwIC8vIHhEZXZpYXRpb27kuLrov57nur/kuK3kuKTkuKrmi5DngrnnmoR46L205pa55ZCR5YGP56e76YePXHJcbiAgICAgICAgICBsZXQgY2hhbmdlID0gKDIwICogKGNvdW50IC0gMSkpIC8gMiAvLyDmlbTkvZPlgY/np7vvvIjkuLrkuoblsYXkuK3vvIlcclxuICAgICAgICAgIGlmIChwdDIueCA+PSBwdDEueCkge1xyXG4gICAgICAgICAgICBpZiAocHQyLnkgPiBwdDEueSkge1xyXG4gICAgICAgICAgICAgIHhEZXZpYXRpb24gPSAteERldmlhdGlvblxyXG4gICAgICAgICAgICAgIGNoYW5nZSA9IGNoYW5nZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHhEZXZpYXRpb24gPSB4RGV2aWF0aW9uXHJcbiAgICAgICAgICAgICAgY2hhbmdlID0gLWNoYW5nZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAocHQyLnkgPiBwdDEueSkge1xyXG4gICAgICAgICAgICAgIHhEZXZpYXRpb24gPSB4RGV2aWF0aW9uXHJcbiAgICAgICAgICAgICAgY2hhbmdlID0gLWNoYW5nZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHhEZXZpYXRpb24gPSAteERldmlhdGlvblxyXG4gICAgICAgICAgICAgIGNoYW5nZSA9IGNoYW5nZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBsaW5lOiBSYWR1aXNMaW5lU2hhcCA9IGxpbmtTcHIuc2hhcGUgYXMgUmFkdWlzTGluZVNoYXBcclxuICAgICAgICAgIGxpbmUucG9pbnRBcnJbMF0gPSB2ZWMyLmNyZWF0ZSgwLCAwKTtcclxuICAgICAgICAgIGxpbmUucG9pbnRBcnJbMV0gPSB2ZWMyLmNyZWF0ZSh4ZCAvIDIgKyB4RGV2aWF0aW9uICsgY2hhbmdlLCAwKTtcclxuICAgICAgICAgIGxpbmUucG9pbnRBcnJbMl0gPSB2ZWMyLmNyZWF0ZSh4ZCAvIDIgKyB4RGV2aWF0aW9uICsgY2hhbmdlLCB5ZCk7XHJcbiAgICAgICAgICBsaW5lLnBvaW50QXJyWzNdID0gdmVjMi5jcmVhdGUoeGQsIHlkKTtcclxuICAgICAgICAgIGxpbmtTcHIueSA9IHRoaXMuX3NhbWVMaW5rR2FwICogaW5kZXggKyAtICh0aGlzLl9zYW1lTGlua0dhcCAqIChjb3VudCAtIDEpKSAvIDJcclxuXHJcbiAgICAgICAgICBjb25zdCBhcnJvd05vZGUgPSBsaW5rTi5nZXRDaGlsZEF0KDApIGFzIFNwcml0ZU5vZGVcclxuICAgICAgICAgIGlmIChhcnJvd05vZGUpIHtcclxuICAgICAgICAgICAgY29uc3QgYXJyb3cgPSBhcnJvd05vZGUuc3ByaXRlIGFzIFNwcml0ZTJEXHJcbiAgICAgICAgICAgIGlmIChsaW5rU3ByLmRhdGEuZnJvbSA9PT0gbGlua0dyb3VwLnBhcmFtcy5mcm9tKSB7XHJcbiAgICAgICAgICAgICAgYXJyb3cueCA9IHhkXHJcbiAgICAgICAgICAgICAgYXJyb3cueSA9IHlkXHJcbiAgICAgICAgICAgICAgaWYgKHB0Mi54ID49IHB0MS54KSB7XHJcbiAgICAgICAgICAgICAgICBhcnJvdy5yb3RhdGlvbiA9IDBcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXJyb3cucm90YXRpb24gPSAxODBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYXJyb3cueCA9IDBcclxuICAgICAgICAgICAgICBhcnJvdy55ID0gMFxyXG4gICAgICAgICAgICAgIGlmIChwdDIueCA+PSBwdDEueCkge1xyXG4gICAgICAgICAgICAgICAgYXJyb3cucm90YXRpb24gPSAxODBcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXJyb3cucm90YXRpb24gPSAwXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgbG5pa1RleHROb2RlID0gbGlua04uZ2V0Q2hpbGRBdCgxKSBhcyBTcHJpdGVOb2RlXHJcbiAgICAgICAgICBpZiAobG5pa1RleHROb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxuaWtUZXh0U3ByID0gbG5pa1RleHROb2RlLnNwcml0ZSBhcyBTcHJpdGUyRFxyXG4gICAgICAgICAgICBsbmlrVGV4dFNwci54ID0geGQgLyAyICsgeERldmlhdGlvbiArIGNoYW5nZVxyXG4gICAgICAgICAgICBsbmlrVGV4dFNwci55ID0geWQgLyAyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXROb2RlcygpOiBBcnJheTxTcHJpdGVOb2RlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGlua0dyb3Vwc1xyXG4gIH1cclxufSIsImltcG9ydCB7IElTcHJpdGUsIFNwcml0ZUZhY3RvcnksIElTaGFwZSwgRU9yZGVyLCBOb2RlVHlwZSB9IGZyb20gXCIuLi9saWIvc3ByaXRlU3lzdGVtL2ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYW52YXNNb3VzZUV2ZW50IH0gZnJvbSBcIi4uL2xpYi9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyB2ZWMyLCBNYXRoMkQgfSBmcm9tIFwiLi4vbGliL21hdGgyZFwiO1xyXG5pbXBvcnQgeyBMaW5lIH0gZnJvbSBcIi4uL2xpYi9zcHJpdGVTeXN0ZW0vc2hhcGVzXCI7XHJcbmltcG9ydCB7IFNwcml0ZU5vZGUsIFNwcml0ZU5vZGVHcm91cCB9IGZyb20gJy4uL2xpYi9zcHJpdGVTeXN0ZW0vc3ByaXRlMmRIaWVyYXJjaGljYWxTeXN0ZW0nXHJcbmltcG9ydCB7IFNwcml0ZTJEIH0gZnJvbSAnLi4vbGliL3Nwcml0ZVN5c3RlbS9zcHJpdGUyZCdcclxuaW1wb3J0IHsgTGlua1RleHRTaGFwIH0gZnJvbSAnLi4vc2hhcHMvTGlua1RleHRTaGFwJ1xyXG5pbXBvcnQgeyBtb3VudExpbmtOb2RlIH0gZnJvbSAnLi9mYWN0b3J5VXRpbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5rRmFjdG9yeSB7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIF9hcnJvd1NoYXA6IElTaGFwZSA9IFNwcml0ZUZhY3RvcnkuY3JlYXRlUG9seWdvbihbbmV3IHZlYzIoNSwgMCksIG5ldyB2ZWMyKDAsIDUpLCBuZXcgdmVjMigwLCAtNSldKVxyXG4gIHB1YmxpYyBzdGF0aWMgX2xpbmtHcm91cHM6IEFycmF5PFNwcml0ZU5vZGVHcm91cD4gPSBbXVxyXG4gIHByaXZhdGUgc3RhdGljIF9saW5rQ2lyY2xlR2FwID0gNVxyXG4gIHByaXZhdGUgc3RhdGljIF9jaXJjbGVSYWRpdXMgPSAzMFxyXG4gIHByaXZhdGUgc3RhdGljIF9zYW1lTGlua0dhcCA9IDI1XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhcmVudDogU3ByaXRlTm9kZSwgZnJvbTogU3ByaXRlTm9kZSB8IHVuZGVmaW5lZCwgdG86IFNwcml0ZU5vZGUgfCB1bmRlZmluZWQsIG5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgbGlua1NwcjogSVNwcml0ZSA9IFNwcml0ZUZhY3RvcnkuY3JlYXRlU3ByaXRlKFNwcml0ZUZhY3RvcnkuY3JlYXRlWExpbmUoKSk7XHJcbiAgICBsaW5rU3ByLnN0cm9rZVN0eWxlID0gJ2dyZWVuJ1xyXG4gICAgbGlua1Nwci5saW5lV2lkdGggPSA0XHJcbiAgICBsaW5rU3ByLmRhdGEgPSB7fVxyXG4gICAgbGlua1Nwci5kYXRhLmZyb20gPSBmcm9tXHJcbiAgICBsaW5rU3ByLmRhdGEudG8gPSB0b1xyXG4gICAgbGlua1Nwci54ID0gMFxyXG4gICAgbGlua1Nwci55ID0gMFxyXG4gICAgbGlua1Nwci5tb3VzZUV2ZW50ID0gdGhpcy5oYW5kbGVMaW5rRXZlbnQuYmluZCh0aGlzKVxyXG5cclxuICAgIGNvbnN0IGxpbmtOb2RlID0gbmV3IFNwcml0ZU5vZGUobGlua1NwcilcclxuICAgIGxpbmtOb2RlLm5vZGVUeXBlID0gTm9kZVR5cGUuTElOS1xyXG4gICAgbGlua05vZGUubmVlZFNlcmlhbGl6ZSA9IHRydWVcclxuICAgIGxpbmtOb2RlLm5hbWUgPSBuYW1lXHJcblxyXG5cclxuICAgIGNvbnN0IGFycm93U3ByOiBJU3ByaXRlID0gU3ByaXRlRmFjdG9yeS5jcmVhdGVTcHJpdGUodGhpcy5fYXJyb3dTaGFwKVxyXG4gICAgYXJyb3dTcHIuZmlsbFN0eWxlID0gJ2JsdWUnXHJcbiAgICBsaW5rTm9kZS5hZGRTcHJpdGUoYXJyb3dTcHIpO1xyXG5cclxuICAgIGNvbnN0IHRleHRTcHI6IElTcHJpdGUgPSBuZXcgU3ByaXRlMkQobmV3IExpbmtUZXh0U2hhcCgpLCAnbGlua1RleHRTaGFwJylcclxuICAgIHRleHRTcHIuc2hvd0Nvb3JkU3lzdGVtID0gZmFsc2VcclxuICAgIHRleHRTcHIueCA9IDBcclxuICAgIHRleHRTcHIueSA9IDA7XHJcbiAgICB0ZXh0U3ByLmRhdGEgPSB7fVxyXG4gICAgdGV4dFNwci5kYXRhLnRleHQgPSBuYW1lXHJcbiAgICBsaW5rTm9kZS5hZGRTcHJpdGUodGV4dFNwcik7XHJcblxyXG4gICAgLy8g5oyC6L29bGlua05vZGXlr7nosaFcclxuICAgIG1vdW50TGlua05vZGUobGlua05vZGUsIHBhcmVudCwgZnJvbSwgdG8sIHRoaXMuX2xpbmtHcm91cHMsIHRoaXMuaGFuZGxlTGlua0dyb3VwVXBkYXRlLmJpbmQodGhpcykpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBoYW5kbGVMaW5rRXZlbnQoc3ByOiBJU3ByaXRlLCBldnQ6IENhbnZhc01vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVMaW5rRXZlbnQnLCBzcHIsIGV2dClcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGhhbmRsZUxpbmtHcm91cFVwZGF0ZShzcHI6IElTcHJpdGUsIG1lc2M6IG51bWJlciwgZGlmZlNlYzogbnVtYmVyLCB0cmF2ZWxPcmRlcjogRU9yZGVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBsaW5rR3JvdXAgPSBzcHIub3duZXIgYXMgU3ByaXRlTm9kZUdyb3VwXHJcbiAgICBjb25zdCBjaGlsZHJlbiA9IGxpbmtHcm91cC5jaGlsZHJlblxyXG4gICAgbGV0IGZyb206IFNwcml0ZTJEID0gbGlua0dyb3VwLnBhcmFtcy5mcm9tLmRhdGFcclxuICAgIGxldCB0bzogU3ByaXRlMkQgPSBsaW5rR3JvdXAucGFyYW1zLnRvLmRhdGFcclxuICAgIGxldCBwdDE6IHZlYzIgPSBuZXcgdmVjMihmcm9tLngsIGZyb20ueSlcclxuICAgIGxldCBwdDI6IHZlYzIgPSBuZXcgdmVjMih0by54LCB0by55KVxyXG5cclxuICAgIGlmICghZnJvbS5vd25lciAmJiAhdG8ub3duZXIpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBsZXQgZnJvbVBhcmVudFNwciA9IGZyb20ub3duZXIuZ2V0UGFyZW50U3ByaXRlKClcclxuICAgIGxldCB0b1BhcmVudFNwciA9IHRvLm93bmVyLmdldFBhcmVudFNwcml0ZSgpXHJcbiAgICAvLyDmiopmcm9t5ZKMdG/nmoTlsYDpg6jlnZDmoIfovazmjaLkuLrnm7jlr7nkuo7moLlzcHJpdGXnmoTlhajlsYDlnZDmoIdcclxuICAgIGlmIChmcm9tUGFyZW50U3ByICYmIHRvUGFyZW50U3ByKSB7XHJcbiAgICAgIHB0MSA9IE1hdGgyRC50cmFuc2Zvcm0oZnJvbVBhcmVudFNwci5nZXRXb3JsZE1hdHJpeDIoKSwgcHQxKVxyXG4gICAgICBwdDIgPSBNYXRoMkQudHJhbnNmb3JtKHRvUGFyZW50U3ByLmdldFdvcmxkTWF0cml4MigpLCBwdDIpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZCA9IE1hdGguc3FydCgocHQyLnkgLSBwdDEueSkgKiAocHQyLnkgLSBwdDEueSkgKyAocHQyLnggLSBwdDEueCkgKiAocHQyLnggLSBwdDEueCkpXHJcbiAgICBjb25zdCBsaW5rR3JvdXBBbmdsZSA9IHZlYzIuZ2V0T3JpZW50YXRpb24ocHQxLCBwdDIpXHJcbiAgICBpZiAobGlua0dyb3VwLnNwcml0ZSkge1xyXG4gICAgICBsaW5rR3JvdXAuc3ByaXRlLnggPSBwdDEueFxyXG4gICAgICBsaW5rR3JvdXAuc3ByaXRlLnkgPSBwdDEueVxyXG4gICAgICBsaW5rR3JvdXAuc3ByaXRlLnJvdGF0aW9uID0gbGlua0dyb3VwQW5nbGVcclxuICAgIH1cclxuICAgIGlmIChjaGlsZHJlbikge1xyXG4gICAgICBjb25zdCBjb3VudCA9IGNoaWxkcmVuLmxlbmd0aFxyXG4gICAgICBjaGlsZHJlbi5mb3JFYWNoKChsaW5rTiwgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rU3ByID0gKGxpbmtOIGFzIFNwcml0ZU5vZGUpLnNwcml0ZVxyXG4gICAgICAgIGlmIChsaW5rU3ByKSB7XHJcbiAgICAgICAgICBjb25zdCBnYXAgPSB0aGlzLl9jaXJjbGVSYWRpdXMgKyB0aGlzLl9saW5rQ2lyY2xlR2FwIC8vIHRvZG8gX2NpcmNsZVJhZGl1c+mcgOimgeaUueaIkOa0u+eahFxyXG4gICAgICAgICAgY29uc3QgbGluZTogTGluZSA9IGxpbmtTcHIuc2hhcGUgYXMgTGluZVxyXG4gICAgICAgICAgbGluZS5zdGFydCA9IHZlYzIuY3JlYXRlKGdhcCwgMCk7IC8vIOazqOaEj2xpbmXov5nkuKpzaGFw55qEc3RhcnTlkoxlbmTnmoTlnZDmoId55YC86YO95pivMFxyXG4gICAgICAgICAgbGluZS5lbmQgPSB2ZWMyLmNyZWF0ZShkIC0gZ2FwLCAwKTtcclxuICAgICAgICAgIGxpbmtTcHIueSA9IHRoaXMuX3NhbWVMaW5rR2FwICogaW5kZXggKyAtICh0aGlzLl9zYW1lTGlua0dhcCAqIChjb3VudCAtIDEpKSAvIDJcclxuXHJcbiAgICAgICAgICAvLyDmraRsaW5rU3By5a6a5LmJ55qE5pa55ZCR5LiO5YyF5ZCr5a6D55qEbGlua0dyb3Vw55qE5pa55ZCR55u45Y+N77yM5omA5Lul5q2kbGlua1NwcuimgeWPjeWQkee7mOWItlxyXG4gICAgICAgICAgaWYgKGxpbmtTcHIuZGF0YS5mcm9tICE9PSBsaW5rR3JvdXAucGFyYW1zLmZyb20pIHtcclxuICAgICAgICAgICAgbGlua1Nwci5yb3RhdGlvbiA9IDE4MFxyXG4gICAgICAgICAgICBsaW5rU3ByLnggPSBkXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgYXJyb3dOb2RlID0gbGlua04uZ2V0Q2hpbGRBdCgwKSBhcyBTcHJpdGVOb2RlXHJcbiAgICAgICAgICBpZiAoYXJyb3dOb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFycm93ID0gYXJyb3dOb2RlLnNwcml0ZSBhcyBTcHJpdGUyRFxyXG4gICAgICAgICAgICBhcnJvdy54ID0gZCAtIGdhcCAtIDVcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBsbmlrVGV4dE5vZGUgPSBsaW5rTi5nZXRDaGlsZEF0KDEpIGFzIFNwcml0ZU5vZGVcclxuICAgICAgICAgIGlmIChsbmlrVGV4dE5vZGUpIHtcclxuICAgICAgICAgICAgY29uc3QgbG5pa1RleHRTcHIgPSBsbmlrVGV4dE5vZGUuc3ByaXRlIGFzIFNwcml0ZTJEXHJcbiAgICAgICAgICAgIGxuaWtUZXh0U3ByLnggPSBkIC8gMlxyXG4gICAgICAgICAgICBsbmlrVGV4dFNwci55ID0gMFxyXG4gICAgICAgICAgICAvLyDmraRsaW5rU3By5a6a5LmJ55qE5pa55ZCR5LiO5YyF5ZCr5a6D55qEbGlua0dyb3Vw55qE5pa55ZCR55u45Y+N77yM5omA5Lul5q2kbGlua1NwcuS4reeahOaWh+Wtl+S5n+imgeWPjeWQkee7mOWItlxyXG4gICAgICAgICAgICBpZiAobGlua1Nwci5kYXRhLmZyb20gIT09IGxpbmtHcm91cC5wYXJhbXMuZnJvbSkge1xyXG4gICAgICAgICAgICAgIGxuaWtUZXh0U3ByLmRhdGEuaXNSZXZlcnNlID0gdHJ1ZSAvLyDkuLrlj43lkJHmmL7npLrnmoRsaW5rU3By5omT5qCH6K+GXHJcbiAgICAgICAgICAgICAgbG5pa1RleHRTcHIucm90YXRpb24gPSAxODBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g55uu5qCH6IqC54K55Zyo56ys5LqM44CB56ys5LiJ6LGh6ZmQ77yM5paH5a2X6ZyA6KaB5Y+N6L2s77yM5ZCm5YiZ6L+e57q/5Lit55qE5paH5a2X5YCS552A5pi+56S65LiN5pa55L6/55yLXHJcbiAgICAgICAgICAgIGlmICgobGlua0dyb3VwQW5nbGUgPiA5MCAmJiBsaW5rR3JvdXBBbmdsZSA8IDE4MCkgfHwgKGxpbmtHcm91cEFuZ2xlIDw9IC05MCAmJiBsaW5rR3JvdXBBbmdsZSA+PSAtMTgwKSkge1xyXG4gICAgICAgICAgICAgIGlmIChsbmlrVGV4dFNwci5kYXRhLmlzUmV2ZXJzZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbG5pa1RleHRTcHIucm90YXRpb24gPSAwXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxuaWtUZXh0U3ByLnJvdGF0aW9uID0gMTgwXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8v5LiN6ZyA6KaB5Y+N6L2sXHJcbiAgICAgICAgICAgICAgaWYgKGxuaWtUZXh0U3ByLmRhdGEuaXNSZXZlcnNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBsbmlrVGV4dFNwci5yb3RhdGlvbiA9IDE4MFxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsbmlrVGV4dFNwci5yb3RhdGlvbiA9IDBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldE5vZGVzKCk6IEFycmF5PFNwcml0ZU5vZGU+IHtcclxuICAgIHJldHVybiB0aGlzLl9saW5rR3JvdXBzXHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSVNwcml0ZSwgU3ByaXRlRmFjdG9yeSwgSVNoYXBlLCBFT3JkZXIsIE5vZGVUeXBlIH0gZnJvbSBcIi4uL2xpYi9zcHJpdGVTeXN0ZW0vaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbnZhc01vdXNlRXZlbnQsIEVJbnB1dEV2ZW50VHlwZSB9IGZyb20gXCIuLi9saWIvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgdmVjMiB9IGZyb20gXCIuLi9saWIvbWF0aDJkXCI7XHJcbmltcG9ydCB7IFNwcml0ZU5vZGUgfSBmcm9tICcuLi9saWIvc3ByaXRlU3lzdGVtL3Nwcml0ZTJkSGllcmFyY2hpY2FsU3lzdGVtJ1xyXG5pbXBvcnQgeyBTcHJpdGUyRCB9IGZyb20gJy4uL2xpYi9zcHJpdGVTeXN0ZW0vc3ByaXRlMmQnXHJcbmltcG9ydCB7IENOb2RlVGV4dFNoYXAgfSBmcm9tICcuLi9zaGFwcy9DTm9kZVRleHRTaGFwJ1xyXG5pbXBvcnQgeyBUb3BvbG9neUFwcGxpY2F0aW9uIH0gZnJvbSAnLi4vbWFpbidcclxuaW1wb3J0IHsgc3ByaXRlRHJhZ0FjdGlvbiwgc3ByaXRlU2VsZWN0QWN0aW9uLCBzcHJpdGVIb3ZlckFjdGlvbiwgc3ByaXRlTWVudUFjdGlvbiwgc3ByaXRlRHJhd1NlbGVjdGVkLCBzcHJpdGVEcmF3SG92ZXIgfSBmcm9tICcuL2ZhY3RvcnlVdGlsJ1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBQYW5lbFBvaW50RmFjdG9yeSB7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIF9jaXJjbGVSYWRpdXMgPSAzMFxyXG4gIHByaXZhdGUgc3RhdGljIF9jaXJjbGVTaGFwOiBJU2hhcGUgPSBTcHJpdGVGYWN0b3J5LmNyZWF0ZUNpcmNsZShQYW5lbFBvaW50RmFjdG9yeS5fY2lyY2xlUmFkaXVzKVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShwYXJlbnQ6IFNwcml0ZU5vZGUsIG5hbWU6IHN0cmluZywgcG9zaXRpb246IHZlYzIsIGFwcDogVG9wb2xvZ3lBcHBsaWNhdGlvbik6IFNwcml0ZU5vZGUge1xyXG4gICAgY29uc3QgY2lyY2xlU3ByOiBJU3ByaXRlID0gU3ByaXRlRmFjdG9yeS5jcmVhdGVTcHJpdGUoUGFuZWxQb2ludEZhY3RvcnkuX2NpcmNsZVNoYXApO1xyXG4gICAgY2lyY2xlU3ByLmZpbGxTdHlsZSA9ICdyZWQnXHJcbiAgICBjaXJjbGVTcHIueCA9IHBvc2l0aW9uLnhcclxuICAgIGNpcmNsZVNwci55ID0gcG9zaXRpb24ueVxyXG5cclxuICAgIGNpcmNsZVNwci5tb3VzZUV2ZW50ID0gKHNwcjogSVNwcml0ZSwgZXZ0OiBDYW52YXNNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIHNwcml0ZURyYWdBY3Rpb24oc3ByLCBldnQsIGFwcClcclxuICAgICAgc3ByaXRlU2VsZWN0QWN0aW9uKHNwciwgZXZ0LCBhcHApXHJcbiAgICAgIHNwcml0ZUhvdmVyQWN0aW9uKHNwciwgZXZ0LCBhcHApXHJcbiAgICAgIHNwcml0ZU1lbnVBY3Rpb24oc3ByLCBldnQsIGFwcClcclxuICAgICAgaWYgKGV2dC50eXBlID09PSBFSW5wdXRFdmVudFR5cGUuTU9VU0VET1dOKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+eCueWHu+S6hicsIHNwcilcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNpcmNsZVNwci5yZW5kZXJFdmVudCA9IChzcHI6IElTcHJpdGUsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgcmVuZGVyT3JlZGVyOiBFT3JkZXIpID0+IHtcclxuICAgICAgc3ByaXRlRHJhd1NlbGVjdGVkKHNwciwgY29udGV4dCwgcmVuZGVyT3JlZGVyKVxyXG4gICAgICBzcHJpdGVEcmF3SG92ZXIoc3ByLCBjb250ZXh0LCByZW5kZXJPcmVkZXIpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2lyY2xlTiA9IG5ldyBTcHJpdGVOb2RlKGNpcmNsZVNwcilcclxuICAgIGNpcmNsZU4ubm9kZVR5cGUgPSBOb2RlVHlwZS5QQU5FTFBPSU5UXHJcbiAgICBjaXJjbGVOLm5lZWRTZXJpYWxpemUgPSB0cnVlXHJcbiAgICBjaXJjbGVOLm5hbWUgPSBuYW1lXHJcblxyXG4gICAgcGFyZW50LmFkZENoaWxkKGNpcmNsZU4pXHJcblxyXG4gICAgY29uc3QgdGV4dFNwcjogSVNwcml0ZSA9IG5ldyBTcHJpdGUyRChuZXcgQ05vZGVUZXh0U2hhcCgpLCAndGV4dFNwcicpXHJcbiAgICB0ZXh0U3ByLnNob3dDb29yZFN5c3RlbSA9IGZhbHNlXHJcbiAgICB0ZXh0U3ByLnggPSAwXHJcbiAgICB0ZXh0U3ByLnkgPSBQYW5lbFBvaW50RmFjdG9yeS5fY2lyY2xlUmFkaXVzICsgMTA7XHJcbiAgICB0ZXh0U3ByLmRhdGEgPSB7fVxyXG4gICAgdGV4dFNwci5kYXRhLnRleHQgPSBuYW1lXHJcbiAgICBjaXJjbGVOLmFkZFNwcml0ZSh0ZXh0U3ByKTtcclxuXHJcblxyXG4gICAgcmV0dXJuIGNpcmNsZU5cclxuICB9XHJcbn0iLCJpbXBvcnQgeyBJU3ByaXRlLCBTcHJpdGVGYWN0b3J5LCBFT3JkZXIsIE5vZGVUeXBlIH0gZnJvbSBcIi4uL2xpYi9zcHJpdGVTeXN0ZW0vaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbnZhc01vdXNlRXZlbnQsIEVJbnB1dEV2ZW50VHlwZSB9IGZyb20gXCIuLi9saWIvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgdmVjMiwgfSBmcm9tIFwiLi4vbGliL21hdGgyZFwiO1xyXG5pbXBvcnQgeyBTcHJpdGVOb2RlLCBTcHJpdGVOb2RlR3JvdXAgfSBmcm9tICcuLi9saWIvc3ByaXRlU3lzdGVtL3Nwcml0ZTJkSGllcmFyY2hpY2FsU3lzdGVtJ1xyXG5pbXBvcnQgeyBTcHJpdGUyRCB9IGZyb20gJy4uL2xpYi9zcHJpdGVTeXN0ZW0vc3ByaXRlMmQnXHJcbmltcG9ydCB7IENhbnZhczJEVXRpbCB9IGZyb20gJy4uL2xpYi9jYW52YXMyZC9jYW52YXMyRFV0aWwnXHJcbmltcG9ydCB7IFRvcG9sb2d5QXBwbGljYXRpb24gfSBmcm9tICcuLi9tYWluJ1xyXG5pbXBvcnQgeyBzcHJpdGVEcmFnQWN0aW9uLCBzcHJpdGVTZWxlY3RBY3Rpb24sIHNwcml0ZUhvdmVyQWN0aW9uLCBzcHJpdGVNZW51QWN0aW9uLCBzcHJpdGVEcmF3U2VsZWN0ZWQsIHNwcml0ZURyYXdIb3ZlciB9IGZyb20gJy4vZmFjdG9yeVV0aWwnXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFBhbmVsUmVjdEZhY3Rvcnkge1xyXG5cclxuICBwcml2YXRlIHN0YXRpYyBub2RlczogQXJyYXk8U3ByaXRlTm9kZT4gPSBbXVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShwYXJlbnQ6IFNwcml0ZU5vZGUsIG5hbWU6IHN0cmluZywgcG9zaXRpb246IHZlYzIsIGFwcDogVG9wb2xvZ3lBcHBsaWNhdGlvbik6IFNwcml0ZU5vZGUge1xyXG4gICAgbGV0IHNwcjogU3ByaXRlMkQgPSBuZXcgU3ByaXRlMkQoU3ByaXRlRmFjdG9yeS5jcmVhdGVSZWN0KDIwLCAyMCwgMC41LCAwLjUpLCAncGFuZWxSZWN0RmFjdG9yeScpO1xyXG4gICAgc3ByLmZpbGxTdHlsZSA9ICdvcmFuZ2UnXHJcbiAgICBzcHIueCA9IHBvc2l0aW9uLnhcclxuICAgIHNwci55ID0gcG9zaXRpb24ueVxyXG4gICAgc3ByLm1vdXNlRXZlbnQgPSAoc3ByOiBJU3ByaXRlLCBldnQ6IENhbnZhc01vdXNlRXZlbnQpID0+IHtcclxuICAgICAgc3ByaXRlRHJhZ0FjdGlvbihzcHIsIGV2dCwgYXBwKVxyXG4gICAgICBzcHJpdGVTZWxlY3RBY3Rpb24oc3ByLCBldnQsIGFwcClcclxuICAgICAgc3ByaXRlSG92ZXJBY3Rpb24oc3ByLCBldnQsIGFwcClcclxuICAgICAgc3ByaXRlTWVudUFjdGlvbihzcHIsIGV2dCwgYXBwKVxyXG4gICAgfVxyXG5cclxuICAgIHNwci5yZW5kZXJFdmVudCA9IChzcHI6IElTcHJpdGUsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgcmVuZGVyT3JlZGVyOiBFT3JkZXIpID0+IHtcclxuICAgICAgc3ByaXRlRHJhd1NlbGVjdGVkKHNwciwgY29udGV4dCwgcmVuZGVyT3JlZGVyKVxyXG4gICAgICBzcHJpdGVEcmF3SG92ZXIoc3ByLCBjb250ZXh0LCByZW5kZXJPcmVkZXIpXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG5vZGUgPSBuZXcgU3ByaXRlTm9kZShzcHIpXHJcbiAgICBub2RlLm5vZGVUeXBlID0gTm9kZVR5cGUuUEFORUxSRUNUXHJcbiAgICBub2RlLm5lZWRTZXJpYWxpemUgPSB0cnVlXHJcbiAgICBub2RlLm5hbWUgPSBuYW1lXHJcbiAgICBwYXJlbnQuYWRkQ2hpbGQobm9kZSlcclxuICAgIC8vdGhpcy5ub2Rlcy5wdXNoKG5vZGUpXHJcblxyXG4gICAgcmV0dXJuIG5vZGVcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0Tm9kZXMoKTogQXJyYXk8U3ByaXRlTm9kZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZXNcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBJU3ByaXRlLCBTcHJpdGVGYWN0b3J5LCBJU2hhcGUsIEVPcmRlciwgTm9kZVR5cGUgfSBmcm9tIFwiLi4vbGliL3Nwcml0ZVN5c3RlbS9pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FudmFzTW91c2VFdmVudCB9IGZyb20gXCIuLi9saWIvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgdmVjMiwgTWF0aDJEIH0gZnJvbSBcIi4uL2xpYi9tYXRoMmRcIjtcclxuaW1wb3J0IHsgU3ByaXRlTm9kZSwgU3ByaXRlTm9kZUdyb3VwIH0gZnJvbSAnLi4vbGliL3Nwcml0ZVN5c3RlbS9zcHJpdGUyZEhpZXJhcmNoaWNhbFN5c3RlbSdcclxuaW1wb3J0IHsgU3ByaXRlMkQgfSBmcm9tICcuLi9saWIvc3ByaXRlU3lzdGVtL3Nwcml0ZTJkJ1xyXG5pbXBvcnQgeyBMaW5rVGV4dFNoYXAgfSBmcm9tICcuLi9zaGFwcy9MaW5rVGV4dFNoYXAnXHJcbmltcG9ydCB7IFJhZHVpc0xpbmVTaGFwIH0gZnJvbSAnLi4vc2hhcHMvUmFkdWlzTGluZVNoYXAnXHJcbmltcG9ydCB7IG1vdW50TGlua05vZGUgfSBmcm9tICcuL2ZhY3RvcnlVdGlsJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlcnRpY2FsRmxleExpbmtGYWN0b3J5IHtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgX2Fycm93U2hhcDogSVNoYXBlID0gU3ByaXRlRmFjdG9yeS5jcmVhdGVQb2x5Z29uKFtuZXcgdmVjMig1LCAwKSwgbmV3IHZlYzIoMCwgNSksIG5ldyB2ZWMyKDAsIC01KV0pXHJcbiAgcHVibGljIHN0YXRpYyBfbGlua0dyb3VwczogQXJyYXk8U3ByaXRlTm9kZUdyb3VwPiA9IFtdXHJcbiAgcHJpdmF0ZSBzdGF0aWMgX3NhbWVMaW5rR2FwID0gMjVcclxuXHJcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocGFyZW50OiBTcHJpdGVOb2RlLCBmcm9tOiBTcHJpdGVOb2RlIHwgdW5kZWZpbmVkLCB0bzogU3ByaXRlTm9kZSB8IHVuZGVmaW5lZCwgbmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBsaW5rU3ByOiBJU3ByaXRlID0gU3ByaXRlRmFjdG9yeS5jcmVhdGVTcHJpdGUobmV3IFJhZHVpc0xpbmVTaGFwKDQsIDE2KSk7XHJcbiAgICBsaW5rU3ByLnN0cm9rZVN0eWxlID0gJ2dyZWVuJ1xyXG4gICAgbGlua1Nwci5saW5lV2lkdGggPSA0XHJcbiAgICBsaW5rU3ByLmRhdGEgPSB7fVxyXG4gICAgbGlua1Nwci5kYXRhLmZyb20gPSBmcm9tXHJcbiAgICBsaW5rU3ByLmRhdGEudG8gPSB0b1xyXG4gICAgbGlua1Nwci54ID0gMFxyXG4gICAgbGlua1Nwci55ID0gMFxyXG4gICAgbGlua1Nwci5tb3VzZUV2ZW50ID0gdGhpcy5oYW5kbGVMaW5rRXZlbnQuYmluZCh0aGlzKVxyXG5cclxuICAgIGNvbnN0IGxpbmtOb2RlID0gbmV3IFNwcml0ZU5vZGUobGlua1NwcilcclxuICAgIGxpbmtOb2RlLm5vZGVUeXBlID0gTm9kZVR5cGUuVkVSVElDQUxGTEVYTElOS1xyXG4gICAgbGlua05vZGUubmVlZFNlcmlhbGl6ZSA9IHRydWVcclxuICAgIGxpbmtOb2RlLm5hbWUgPSBuYW1lXHJcblxyXG4gICAgY29uc3QgYXJyb3dTcHI6IElTcHJpdGUgPSBTcHJpdGVGYWN0b3J5LmNyZWF0ZVNwcml0ZSh0aGlzLl9hcnJvd1NoYXApXHJcbiAgICBhcnJvd1Nwci5maWxsU3R5bGUgPSAnYmx1ZSdcclxuICAgIGxpbmtOb2RlLmFkZFNwcml0ZShhcnJvd1Nwcik7XHJcblxyXG4gICAgY29uc3QgdGV4dFNwcjogSVNwcml0ZSA9IG5ldyBTcHJpdGUyRChuZXcgTGlua1RleHRTaGFwKCksICdsaW5rVGV4dFNoYXAnKVxyXG4gICAgdGV4dFNwci5zaG93Q29vcmRTeXN0ZW0gPSBmYWxzZVxyXG4gICAgdGV4dFNwci54ID0gMFxyXG4gICAgdGV4dFNwci55ID0gMDtcclxuICAgIHRleHRTcHIuZGF0YSA9IHt9XHJcbiAgICB0ZXh0U3ByLmRhdGEudGV4dCA9IG5hbWVcclxuICAgIGxpbmtOb2RlLmFkZFNwcml0ZSh0ZXh0U3ByKTtcclxuXHJcbiAgICAvLyDmjILovb1saW5rTm9kZeWvueixoVxyXG4gICAgbW91bnRMaW5rTm9kZShsaW5rTm9kZSwgcGFyZW50LCBmcm9tLCB0bywgdGhpcy5fbGlua0dyb3VwcywgdGhpcy5oYW5kbGVMaW5rR3JvdXBVcGRhdGUuYmluZCh0aGlzKSlcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGhhbmRsZUxpbmtFdmVudChzcHI6IElTcHJpdGUsIGV2dDogQ2FudmFzTW91c2VFdmVudCk6IHZvaWQge1xyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGhhbmRsZUxpbmtHcm91cFVwZGF0ZShzcHI6IElTcHJpdGUsIG1lc2M6IG51bWJlciwgZGlmZlNlYzogbnVtYmVyLCB0cmF2ZWxPcmRlcjogRU9yZGVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBsaW5rR3JvdXAgPSBzcHIub3duZXIgYXMgU3ByaXRlTm9kZUdyb3VwXHJcbiAgICBjb25zdCBjaGlsZHJlbiA9IGxpbmtHcm91cC5jaGlsZHJlblxyXG4gICAgbGV0IGZyb206IFNwcml0ZTJEID0gbGlua0dyb3VwLnBhcmFtcy5mcm9tLmRhdGFcclxuICAgIGxldCB0bzogU3ByaXRlMkQgPSBsaW5rR3JvdXAucGFyYW1zLnRvLmRhdGFcclxuICAgIGxldCBwdDE6IHZlYzIgPSBuZXcgdmVjMihmcm9tLngsIGZyb20ueSlcclxuICAgIGxldCBwdDI6IHZlYzIgPSBuZXcgdmVjMih0by54LCB0by55KVxyXG5cclxuICAgIGxldCBmcm9tUGFyZW50U3ByID0gZnJvbS5vd25lci5nZXRQYXJlbnRTcHJpdGUoKVxyXG4gICAgbGV0IHRvUGFyZW50U3ByID0gdG8ub3duZXIuZ2V0UGFyZW50U3ByaXRlKClcclxuICAgIC8vIOaKimZyb23lkox0b+eahOWxgOmDqOWdkOagh+i9rOaNouS4uuebuOWvueS6juaguXNwcml0ZeeahOWFqOWxgOWdkOagh1xyXG4gICAgaWYgKGZyb21QYXJlbnRTcHIgJiYgdG9QYXJlbnRTcHIpIHtcclxuICAgICAgcHQxID0gTWF0aDJELnRyYW5zZm9ybShmcm9tUGFyZW50U3ByLmdldFdvcmxkTWF0cml4MigpLCBwdDEpXHJcbiAgICAgIHB0MiA9IE1hdGgyRC50cmFuc2Zvcm0odG9QYXJlbnRTcHIuZ2V0V29ybGRNYXRyaXgyKCksIHB0MilcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB4ZCA9IHB0Mi54IC0gcHQxLnhcclxuICAgIGNvbnN0IHlkID0gcHQyLnkgLSBwdDEueVxyXG5cclxuICAgIGlmIChsaW5rR3JvdXAuc3ByaXRlKSB7XHJcbiAgICAgIGxpbmtHcm91cC5zcHJpdGUueCA9IHB0MS54XHJcbiAgICAgIGxpbmtHcm91cC5zcHJpdGUueSA9IHB0MS55XHJcbiAgICB9XHJcbiAgICBpZiAoY2hpbGRyZW4pIHtcclxuICAgICAgY29uc3QgY291bnQgPSBjaGlsZHJlbi5sZW5ndGhcclxuICAgICAgY2hpbGRyZW4uZm9yRWFjaCgobGlua04sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGlua1NwciA9IChsaW5rTiBhcyBTcHJpdGVOb2RlKS5zcHJpdGVcclxuICAgICAgICBpZiAobGlua1Nwcikge1xyXG5cclxuICAgICAgICAgIGxldCB5RGV2aWF0aW9uID0gaW5kZXggKiAyMCAvLyB5RGV2aWF0aW9u5Li66L+e57q/5Lit5Lik5Liq5ouQ54K555qEeei9tOaWueWQkeWBj+enu+mHj1xyXG4gICAgICAgICAgbGV0IGNoYW5nZSA9ICgyMCAqIChjb3VudCAtIDEpKSAvIDIgLy8g5pW05L2T5YGP56e777yI5Li65LqG5bGF5Lit77yJXHJcbiAgICAgICAgICBpZiAocHQyLnggPj0gcHQxLngpIHtcclxuICAgICAgICAgICAgaWYgKHB0Mi55ID4gcHQxLnkpIHtcclxuICAgICAgICAgICAgICB5RGV2aWF0aW9uID0gLXlEZXZpYXRpb25cclxuICAgICAgICAgICAgICBjaGFuZ2UgPSBjaGFuZ2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB5RGV2aWF0aW9uID0geURldmlhdGlvblxyXG4gICAgICAgICAgICAgIGNoYW5nZSA9IC1jaGFuZ2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHB0Mi55ID4gcHQxLnkpIHtcclxuICAgICAgICAgICAgICB5RGV2aWF0aW9uID0geURldmlhdGlvblxyXG4gICAgICAgICAgICAgIGNoYW5nZSA9IC1jaGFuZ2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB5RGV2aWF0aW9uID0gLXlEZXZpYXRpb25cclxuICAgICAgICAgICAgICBjaGFuZ2UgPSBjaGFuZ2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGxpbmU6IFJhZHVpc0xpbmVTaGFwID0gbGlua1Nwci5zaGFwZSBhcyBSYWR1aXNMaW5lU2hhcFxyXG4gICAgICAgICAgbGluZS5wb2ludEFyclswXSA9IHZlYzIuY3JlYXRlKDAsIDApO1xyXG4gICAgICAgICAgbGluZS5wb2ludEFyclsxXSA9IHZlYzIuY3JlYXRlKDAsIHlkIC8gMiArIHlEZXZpYXRpb24gKyBjaGFuZ2UpO1xyXG4gICAgICAgICAgbGluZS5wb2ludEFyclsyXSA9IHZlYzIuY3JlYXRlKHhkLCB5ZCAvIDIgKyB5RGV2aWF0aW9uICsgY2hhbmdlKTtcclxuICAgICAgICAgIGxpbmUucG9pbnRBcnJbM10gPSB2ZWMyLmNyZWF0ZSh4ZCwgeWQpO1xyXG4gICAgICAgICAgbGlua1Nwci54ID0gdGhpcy5fc2FtZUxpbmtHYXAgKiBpbmRleCArIC0gKHRoaXMuX3NhbWVMaW5rR2FwICogKGNvdW50IC0gMSkpIC8gMlxyXG5cclxuICAgICAgICAgIGNvbnN0IGFycm93Tm9kZSA9IGxpbmtOLmdldENoaWxkQXQoMCkgYXMgU3ByaXRlTm9kZVxyXG4gICAgICAgICAgaWYgKGFycm93Tm9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBhcnJvdyA9IGFycm93Tm9kZS5zcHJpdGUgYXMgU3ByaXRlMkRcclxuXHJcbiAgICAgICAgICAgIGlmIChsaW5rU3ByLmRhdGEuZnJvbSA9PT0gbGlua0dyb3VwLnBhcmFtcy5mcm9tKSB7XHJcbiAgICAgICAgICAgICAgYXJyb3cueCA9IHhkXHJcbiAgICAgICAgICAgICAgYXJyb3cueSA9IHlkXHJcbiAgICAgICAgICAgICAgaWYgKHB0Mi55ID49IHB0MS55KSB7XHJcbiAgICAgICAgICAgICAgICBhcnJvdy5yb3RhdGlvbiA9IDkwXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFycm93LnJvdGF0aW9uID0gLTkwXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFycm93LnggPSAwXHJcbiAgICAgICAgICAgICAgYXJyb3cueSA9IDBcclxuICAgICAgICAgICAgICBpZiAocHQyLnkgPj0gcHQxLnkpIHtcclxuICAgICAgICAgICAgICAgIGFycm93LnJvdGF0aW9uID0gLTkwXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFycm93LnJvdGF0aW9uID0gOTBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBsbmlrVGV4dE5vZGUgPSBsaW5rTi5nZXRDaGlsZEF0KDEpIGFzIFNwcml0ZU5vZGVcclxuICAgICAgICAgIGlmIChsbmlrVGV4dE5vZGUpIHtcclxuICAgICAgICAgICAgY29uc3QgbG5pa1RleHRTcHIgPSBsbmlrVGV4dE5vZGUuc3ByaXRlIGFzIFNwcml0ZTJEXHJcbiAgICAgICAgICAgIGxuaWtUZXh0U3ByLnggPSB4ZCAvIDJcclxuICAgICAgICAgICAgbG5pa1RleHRTcHIueSA9IHlkIC8gMiArIHlEZXZpYXRpb24gKyBjaGFuZ2VcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldE5vZGVzKCk6IEFycmF5PFNwcml0ZU5vZGU+IHtcclxuICAgIHJldHVybiB0aGlzLl9saW5rR3JvdXBzXHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSVNwcml0ZSwgRU9yZGVyLCBOb2RlVHlwZSwgQm91bmRpbmcsIElTaGFwZSB9IGZyb20gXCIuLi9saWIvc3ByaXRlU3lzdGVtL2ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTcHJpdGVOb2RlLCBTcHJpdGVOb2RlR3JvdXAgfSBmcm9tICcuLi9saWIvc3ByaXRlU3lzdGVtL3Nwcml0ZTJkSGllcmFyY2hpY2FsU3lzdGVtJ1xyXG5pbXBvcnQgeyBDYW52YXNNb3VzZUV2ZW50LCBFSW5wdXRFdmVudFR5cGUgfSBmcm9tIFwiLi4vbGliL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IHZlYzIsIE1hdGgyRCB9IGZyb20gXCIuLi9saWIvbWF0aDJkXCI7XHJcbmltcG9ydCB7IFRvcG9sb2d5QXBwbGljYXRpb24gfSBmcm9tICcuLi9tYWluJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1vdW50TGlua05vZGUoXHJcbiAgbGlua05vZGU6IFNwcml0ZU5vZGUsXHJcbiAgcGFyZW50OiBTcHJpdGVOb2RlLFxyXG4gIGZyb206IFNwcml0ZU5vZGUgfCB1bmRlZmluZWQsXHJcbiAgdG86IFNwcml0ZU5vZGUgfCB1bmRlZmluZWQsXHJcbiAgbGlua0dyb3VwczogQXJyYXk8U3ByaXRlTm9kZUdyb3VwPixcclxuICB1cGRhdGU6IChzcHI6IElTcHJpdGUsIG1lc2M6IG51bWJlciwgZGlmZlNlYzogbnVtYmVyLCB0cmF2ZWxPcmRlcjogRU9yZGVyKSA9PiB2b2lkXHJcbik6IHZvaWQge1xyXG5cclxuICBjb25zdCBzYW1lR3JvdXA6IFNwcml0ZU5vZGVHcm91cCB8IG51bGwgPSBnZXRTYW1lTGlua0dyb3VwKGZyb20sIHRvLCBsaW5rR3JvdXBzKVxyXG5cclxuICAvLyDlpoLmnpzlt7Lnu4/lrZjlnKjnm7jlkIznmoRncm91cO+8jOWImeaUvuWIsOatpGdyb3Vw5Lit77yM5ZCm5YiZ5paw5bu65LiA5LiqZ3JvdXDvvIzlho3kvZzkuLrmlrBncm91cOeahOWtkOmbhlxyXG4gIGlmICghc2FtZUdyb3VwKSB7XHJcbiAgICBjb25zdCBuZXdHcm91cCA9IG5ldyBTcHJpdGVOb2RlR3JvdXAoe30pXHJcbiAgICBuZXdHcm91cC5wYXJhbXMuZnJvbSA9IGZyb21cclxuICAgIG5ld0dyb3VwLnBhcmFtcy50byA9IHRvXHJcbiAgICBuZXdHcm91cC5hZGRDaGlsZChsaW5rTm9kZSlcclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7mOWItumhuuW6j+S4umNvbnRhaW5lck5vZGUtPmxpbmtOb2RlLT7lhbblroNOb2RlXHJcbiAgICAgKiDlm6DmraTov5nph4znmoRncm91cOmcgOimgeaPkuWIsOaJgOaciWNvbnRhaW5lck5vZGXnmoTlkI7pnaLvvIzlhbbku5ZOb2Rl55qE5YmN6Z2iXHJcbiAgICAgKi9cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmVudC5jaGlsZHJlbikpIHtcclxuICAgICAgbGV0IGhhc0FkZCA9IGZhbHNlXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbltpXS5ub2RlVHlwZSAhPT0gTm9kZVR5cGUuQ09OVEFJTkVSKSB7XHJcbiAgICAgICAgICBwYXJlbnQuYWRkQ2hpbGRBdChuZXdHcm91cCwgaSlcclxuICAgICAgICAgIGhhc0FkZCA9IHRydWVcclxuICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8v6K+B5piO5b2T5YmNcm9vdOS4i+eahOWtkOWFg+e0oOmDveS4umNvbnRhaW5lck5vZGVcclxuICAgICAgaWYgKGhhc0FkZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICBwYXJlbnQuYWRkQ2hpbGRBdChuZXdHcm91cCwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aClcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGFyZW50LmFkZENoaWxkQXQobmV3R3JvdXAsIDApXHJcbiAgICB9XHJcblxyXG4gICAgbGlua0dyb3Vwcy5wdXNoKG5ld0dyb3VwKVxyXG5cclxuICAgIGlmIChuZXdHcm91cC5zcHJpdGUpIHtcclxuICAgICAgbmV3R3JvdXAuc3ByaXRlLnVwZGF0ZUV2ZW50ID0gdXBkYXRlIC8vIOi/meS4quaYr+S4ulNwcml0ZU5vZGVHcm91cOWGheeahOWMheWQq+epulNoYXDnmoRTcHJpdGXlr7nosaHnu5Hlrpp1cGRhdGVFdmVudOWbnuiwg++8jOiAjOS4jeaYr0xpbmtOb2Rl5YaF55qEU3ByaXRl5a+56LGhXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHNhbWVHcm91cC5hZGRDaGlsZChsaW5rTm9kZSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTYW1lTGlua0dyb3VwKGZyb206IFNwcml0ZU5vZGUgfCB1bmRlZmluZWQsIHRvOiBTcHJpdGVOb2RlIHwgdW5kZWZpbmVkLCBsaW5rR3JvdXBzOiBBcnJheTxTcHJpdGVOb2RlR3JvdXA+KTogU3ByaXRlTm9kZUdyb3VwIHwgbnVsbCB7XHJcbiAgbGV0IG8gPSBudWxsXHJcbiAgaWYgKGZyb20gPT09IHVuZGVmaW5lZCB8fCB0byA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gb1xyXG4gIH1cclxuICBsaW5rR3JvdXBzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIChpdGVtLnBhcmFtcy5mcm9tID09PSBmcm9tICYmIGl0ZW0ucGFyYW1zLnRvID09PSB0bykgfHxcclxuICAgICAgKGl0ZW0ucGFyYW1zLmZyb20gPT09IHRvICYmIGl0ZW0ucGFyYW1zLnRvID09PSBmcm9tKVxyXG4gICAgKSB7XHJcbiAgICAgIG8gPSBpdGVtXHJcbiAgICB9XHJcbiAgfSlcclxuICByZXR1cm4gb1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3ByaXRlRHJhZ0FjdGlvbihzcHI6IElTcHJpdGUsIGV2dDogQ2FudmFzTW91c2VFdmVudCwgYXBwOiBUb3BvbG9neUFwcGxpY2F0aW9uKTogdm9pZCB7XHJcbiAgbGV0IHBvc2l0aW9uID0gbmV3IHZlYzIoZXZ0LmNhbnZhc1Bvc2l0aW9uLngsIGV2dC5jYW52YXNQb3NpdGlvbi55KVxyXG4gIGxldCBwYXJlbnRTcHIgPSBzcHIub3duZXIuZ2V0UGFyZW50U3ByaXRlKClcclxuICBpZiAocGFyZW50U3ByKSB7XHJcbiAgICBwb3NpdGlvbiA9IE1hdGgyRC50cmFuc2Zvcm0ocGFyZW50U3ByLmdldExvY2FsTWF0cml4KCksIHBvc2l0aW9uKSAvLyDmiorpvKDmoIfnmoTlnZDmoIfnlKjniLZzcHJpdGXnmoTlsYDpg6jnn6npmLXov5vooYzovazmjaJcclxuICB9XHJcbiAgaWYgKGV2dC50eXBlID09PSBFSW5wdXRFdmVudFR5cGUuTU9VU0VET1dOKSB7XHJcbiAgICBzcHIuZGlmZlggPSBwb3NpdGlvbi54IC0gc3ByLnhcclxuICAgIHNwci5kaWZmWSA9IHBvc2l0aW9uLnkgLSBzcHIueVxyXG4gIH1cclxuICBpZiAoZXZ0LnR5cGUgPT09IEVJbnB1dEV2ZW50VHlwZS5NT1VTRURSQUcpIHtcclxuICAgIHNwci5pc0RyYWdnaW5nID0gdHJ1ZVxyXG5cclxuICAgIC8vIOiuvue9ruW9k+WJjeiiq+aLluaLveeahOWFg+e0oOS4umlzSG92ZXJpbmfnirbmgIFcclxuICAgIGlmIChzcHIuaXNTZWxlY3RlZCAhPT0gdHJ1ZSkge1xyXG4gICAgICBzcHIuaXNIb3ZlcmluZyA9IHRydWVcclxuICAgIH1cclxuICAgIGlmIChhcHAuX2hvdmVyaW5nU3ByaXRlICYmIGFwcC5faG92ZXJpbmdTcHJpdGUgIT09IHNwcikge1xyXG4gICAgICBhcHAuX2hvdmVyaW5nU3ByaXRlLmlzSG92ZXJpbmcgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgYXBwLl9ob3ZlcmluZ1Nwcml0ZSA9IHNwclxyXG5cclxuICAgIHNwci54ID0gcG9zaXRpb24ueCAtIHNwci5kaWZmWFxyXG4gICAgc3ByLnkgPSBwb3NpdGlvbi55IC0gc3ByLmRpZmZZXHJcbiAgICAvLyBjb25zb2xlLmxvZygn55u45a+55LqO5qC5c3ByaXRl55qE5Z2Q5qCH77yI6ICM5LiN5pivY2FudmFz77yJJywgTWF0aDJELnRyYW5zZm9ybShwYXJlbnRTcHIuZ2V0V29ybGRNYXRyaXgyKCksIG5ldyB2ZWMyKHRoaXMueCwgdGhpcy55KSkpXHJcbiAgICAvLyBjb25zb2xlLmxvZygn5bGA6YOo5Z2Q5qCHJywgbmV3IHZlYzIodGhpcy54LCB0aGlzLnkpKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNwcml0ZVNlbGVjdEFjdGlvbihzcHI6IElTcHJpdGUsIGV2dDogQ2FudmFzTW91c2VFdmVudCwgYXBwOiBUb3BvbG9neUFwcGxpY2F0aW9uKTogdm9pZCB7XHJcbiAgaWYgKGV2dC50eXBlID09PSBFSW5wdXRFdmVudFR5cGUuTU9VU0VVUCAmJiBldnQuYnV0dG9uID09PSAwKSB7XHJcbiAgICBpZiAoc3ByLmlzRHJhZ2dpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgIGlmIChzcHIuaXNTZWxlY3RlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGFwcC5yZW1vdmVTZWxlY3RlZFNwcml0ZShzcHIpXHJcbiAgICAgICAgc3ByLmlzSG92ZXJpbmcgPSB0cnVlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXBwLmNsZWFyQWxsU2VsZWN0ZWRTcHJpdGUoKVxyXG4gICAgICAgIGFwcC5hZGRTZWxlY3RlZFNwcml0ZShzcHIpXHJcbiAgICAgICAgc3ByLmlzSG92ZXJpbmcgPSBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNwci5pc0RyYWdnaW5nID09PSB0cnVlKSB7XHJcbiAgICAgIHNwci5pc0RyYWdnaW5nID0gZmFsc2VcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzcHJpdGVIb3ZlckFjdGlvbihzcHI6IElTcHJpdGUsIGV2dDogQ2FudmFzTW91c2VFdmVudCwgYXBwOiBUb3BvbG9neUFwcGxpY2F0aW9uKTogdm9pZCB7XHJcbiAgaWYgKGV2dC50eXBlID09PSBFSW5wdXRFdmVudFR5cGUuTU9VU0VNT1ZFKSB7XHJcbiAgICBpZiAoc3ByLmlzU2VsZWN0ZWQgIT09IHRydWUpIHtcclxuICAgICAgc3ByLmlzSG92ZXJpbmcgPSB0cnVlXHJcbiAgICB9XHJcbiAgICBpZiAoYXBwLl9ob3ZlcmluZ1Nwcml0ZSAmJiBhcHAuX2hvdmVyaW5nU3ByaXRlICE9PSBzcHIpIHtcclxuICAgICAgYXBwLl9ob3ZlcmluZ1Nwcml0ZS5pc0hvdmVyaW5nID0gZmFsc2VcclxuICAgIH1cclxuICAgIGFwcC5faG92ZXJpbmdTcHJpdGUgPSBzcHJcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzcHJpdGVNZW51QWN0aW9uKHNwcjogSVNwcml0ZSwgZXZ0OiBDYW52YXNNb3VzZUV2ZW50LCBhcHA6IFRvcG9sb2d5QXBwbGljYXRpb24pOiB2b2lkIHtcclxuICBpZiAoZXZ0LnR5cGUgPT09IEVJbnB1dEV2ZW50VHlwZS5NT1VTRVVQICYmIGV2dC5idXR0b24gPT09IDIpIHtcclxuICAgIGxldCBib3VuZGluZzogQm91bmRpbmcgPSBzcHIuc2hhcGUuZ2V0Qm91bmRpbmcoKVxyXG4gICAgbGV0IHBvc2l0aW9uID0gbmV3IHZlYzIoc3ByLnggKyAoYm91bmRpbmcucmlnaHQgLSBib3VuZGluZy5sZWZ0KSAvIDIsIHNwci55KVxyXG4gICAgbGV0IHBhcmVudFNwciA9IHNwci5vd25lci5nZXRQYXJlbnRTcHJpdGUoKVxyXG4gICAgaWYgKHBhcmVudFNwcikge1xyXG4gICAgICBwb3NpdGlvbiA9IE1hdGgyRC50cmFuc2Zvcm0ocGFyZW50U3ByLmdldFdvcmxkTWF0cml4KCksIHBvc2l0aW9uKVxyXG4gICAgfVxyXG4gICAgaWYgKGFwcC5fc3ByTWVudSkge1xyXG4gICAgICBhcHAuX3Nwck1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgICAgYXBwLl9zcHJNZW51LnN0eWxlLmxlZnQgPSBwb3NpdGlvbi54ICsgJ3B4J1xyXG4gICAgICBhcHAuX3Nwck1lbnUuc3R5bGUudG9wID0gcG9zaXRpb24ueSArICdweCdcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzcHJpdGVEcmF3U2VsZWN0ZWQoc3ByOiBJU3ByaXRlLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHJlbmRlck9yZWRlcjogRU9yZGVyKTogdm9pZCB7XHJcbiAgaWYgKHJlbmRlck9yZWRlciA9PT0gRU9yZGVyLlBSRU9SREVSICYmIHNwci5pc1NlbGVjdGVkID09PSB0cnVlKSB7XHJcbiAgICBsZXQgc2hhcDogSVNoYXBlID0gc3ByLnNoYXBlXHJcbiAgICBsZXQgYm91bmRpbmc6IEJvdW5kaW5nID0gc2hhcC5nZXRCb3VuZGluZygpXHJcbiAgICBsZXQgbWFyZ2luID0gNVxyXG4gICAgY29udGV4dC5zYXZlKClcclxuICAgIGNvbnRleHQuYmVnaW5QYXRoKClcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgMSknXHJcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDdcclxuICAgIGNvbnRleHQucmVjdChib3VuZGluZy5sZWZ0IC0gbWFyZ2luLCBib3VuZGluZy50b3AgLSBtYXJnaW4sIGJvdW5kaW5nLnJpZ2h0IC0gYm91bmRpbmcubGVmdCArIG1hcmdpbiAqIDIsIGJvdW5kaW5nLmJvdHRvbSAtIGJvdW5kaW5nLnRvcCArIG1hcmdpbiAqIDIpXHJcbiAgICBjb250ZXh0LmZpbGwoKVxyXG4gICAgY29udGV4dC5yZXN0b3JlKClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzcHJpdGVEcmF3SG92ZXIoc3ByOiBJU3ByaXRlLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHJlbmRlck9yZWRlcjogRU9yZGVyKTogdm9pZCB7XHJcbiAgaWYgKHJlbmRlck9yZWRlciA9PT0gRU9yZGVyLlBSRU9SREVSICYmIHNwci5pc0hvdmVyaW5nID09PSB0cnVlKSB7XHJcbiAgICBsZXQgc2hhcDogSVNoYXBlID0gc3ByLnNoYXBlXHJcbiAgICBsZXQgYm91bmRpbmc6IEJvdW5kaW5nID0gc2hhcC5nZXRCb3VuZGluZygpXHJcbiAgICBsZXQgbWFyZ2luID0gNVxyXG4gICAgY29udGV4dC5zYXZlKClcclxuICAgIGNvbnRleHQuYmVnaW5QYXRoKClcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuNSknXHJcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDdcclxuICAgIGNvbnRleHQucmVjdChib3VuZGluZy5sZWZ0IC0gbWFyZ2luLCBib3VuZGluZy50b3AgLSBtYXJnaW4sIGJvdW5kaW5nLnJpZ2h0IC0gYm91bmRpbmcubGVmdCArIG1hcmdpbiAqIDIsIGJvdW5kaW5nLmJvdHRvbSAtIGJvdW5kaW5nLnRvcCArIG1hcmdpbiAqIDIpXHJcbiAgICBjb250ZXh0LmZpbGwoKVxyXG4gICAgY29udGV4dC5yZXN0b3JlKClcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBOb2RlVHlwZSB9IGZyb20gJy4vc3ByaXRlU3lzdGVtL2ludGVyZmFjZSdcclxuXHJcbmV4cG9ydCBjbGFzcyBOb2RlRGF0YSB7XHJcblxyXG5cclxuICBwdWJsaWMgcGFyZW50SWR4OiBudW1iZXI7IC8vIOeItuiKgueCuee0ouW8lVxyXG4gIHB1YmxpYyBub2RlVHlwZTogTm9kZVR5cGU7IC8vIOiKgueCueexu+Wei1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7IC8vIG5hbWVcclxuICBwdWJsaWMgZnJvbUlkeDogbnVtYmVyIHwgdW5kZWZpbmVkIC8vIGZyb23ntKLlvJVcclxuICBwdWJsaWMgdG9JZHg6IG51bWJlciB8IHVuZGVmaW5lZCAvLyB0b+e0ouW8lVxyXG5cclxuICBwdWJsaWMgeDogbnVtYmVyID0gMDtcclxuICBwdWJsaWMgeTogbnVtYmVyID0gMFxyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICBwYXJlbnRJZHg6IG51bWJlcixcclxuICAgIG5vZGVUeXBlOiBOb2RlVHlwZSxcclxuICApIHtcclxuICAgIHRoaXMucGFyZW50SWR4ID0gcGFyZW50SWR4XHJcbiAgICB0aGlzLm5vZGVUeXBlID0gbm9kZVR5cGVcclxuICB9XHJcbn0iLCJpbXBvcnQgeyB2ZWMyIH0gZnJvbSBcIi4vbWF0aDJkXCI7XHJcbmV4cG9ydCBlbnVtIEVJbnB1dEV2ZW50VHlwZSB7XHJcbiAgTU9VU0VFVkVOVCxcclxuICBNT1VTRURPV04sXHJcbiAgTU9VU0VVUCxcclxuICBNT1VTRU1PVkUsXHJcbiAgTU9VU0VEUkFHLFxyXG4gIEtFWUJPQVJERVZFTlQsXHJcbiAgS0VZVVAsXHJcbiAgS0VZRE9XTixcclxuICBLRVlQUkVTU1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FudmFzSW5wdXRFdmVudCB7XHJcbiAgcHVibGljIGFsdEtleTogYm9vbGVhbjtcclxuICBwdWJsaWMgY3RybEtleTogYm9vbGVhbjtcclxuICBwdWJsaWMgc2hpZnRLZXk6IGJvb2xlYW47XHJcbiAgcHVibGljIHR5cGU6IEVJbnB1dEV2ZW50VHlwZTtcclxuICBwdWJsaWMgY29uc3RydWN0b3IodHlwZTogRUlucHV0RXZlbnRUeXBlLCBhbHRLZXk6IGJvb2xlYW4gPSBmYWxzZSwgY3RybEtleTogYm9vbGVhbiA9IGZhbHNlLCBzaGlmdEtleTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLmFsdEtleSA9IGFsdEtleTtcclxuICAgIHRoaXMuY3RybEtleSA9IGN0cmxLZXk7XHJcbiAgICB0aGlzLnNoaWZ0S2V5ID0gc2hpZnRLZXk7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgVGltZXJDYWxsYmFjayA9IChpZDogbnVtYmVyLCBkYXRhOiBhbnkpID0+IHZvaWQ7XHJcblxyXG5cclxuY2xhc3MgVGltZXIge1xyXG4gIHB1YmxpYyBpZDogbnVtYmVyID0gLTE7XHJcbiAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgcHVibGljIGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrO1xyXG4gIHB1YmxpYyBjYWxsYmFja0RhdGE6IGFueSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgcHVibGljIGNvdW50ZG93bjogbnVtYmVyID0gMDtcclxuICBwdWJsaWMgdGltZW91dDogbnVtYmVyID0gMDsgLy8g5Y2V5L2N5piv56eSXHJcbiAgcHVibGljIG9ubHlPbmNlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FudmFzTW91c2VFdmVudCBleHRlbmRzIENhbnZhc0lucHV0RXZlbnQge1xyXG4gIHB1YmxpYyBidXR0b246IG51bWJlcjtcclxuICBwdWJsaWMgY2FudmFzUG9zaXRpb246IHZlYzI7XHJcblxyXG4gIHB1YmxpYyBsb2NhbFBvc2l0aW9uOiB2ZWMyO1xyXG4gIHB1YmxpYyBoYXNMb2NhbFBvc2l0aW9uOiBib29sZWFuO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IodHlwZTogRUlucHV0RXZlbnRUeXBlLCBjYW52YXNQb3M6IHZlYzIsIGJ1dHRvbjogbnVtYmVyLCBhbHRLZXk6IGJvb2xlYW4gPSBmYWxzZSwgY3RybEtleTogYm9vbGVhbiA9IGZhbHNlLCBzaGlmdEtleTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBzdXBlcih0eXBlLCBhbHRLZXksIGN0cmxLZXksIHNoaWZ0S2V5KTtcclxuICAgIHRoaXMuY2FudmFzUG9zaXRpb24gPSBjYW52YXNQb3M7XHJcbiAgICB0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcclxuICAgIC8vIOi/meS4pOS4quWxnuaAp+WcqEFwcGxpY2F0aW9u55qE5a2Q57G7c3ByaXRlMkRBcHBsaWNhdGlvbuS4reeahF9kaXNwYXRjaGVyOiBJRGlzcGF0Y2hlcu+8iFNwcml0ZU5vZGVNYW5hZ2Vy5oiWU3ByaXRlMkRNYW5hZ2Vy5a6e5L6L77yJ55qEZGlzcGF0Y2hNb3VzZUV2ZW50KCnmlrnms5XkuK3ooqvotYvlgLxcclxuICAgIHRoaXMuaGFzTG9jYWxQb3NpdGlvbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5sb2NhbFBvc2l0aW9uID0gdmVjMi5jcmVhdGUoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYW52YXNLZXlCb2FyZEV2ZW50IGV4dGVuZHMgQ2FudmFzSW5wdXRFdmVudCB7XHJcbiAgcHVibGljIGtleTogc3RyaW5nO1xyXG4gIHB1YmxpYyBrZXlDb2RlOiBudW1iZXI7XHJcbiAgcHVibGljIHJlcGVhdDogYm9vbGVhbjtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHR5cGU6IEVJbnB1dEV2ZW50VHlwZSwga2V5OiBzdHJpbmcsIGtleUNvZGU6IG51bWJlciwgcmVwZWF0OiBib29sZWFuLCBhbHRLZXk6IGJvb2xlYW4gPSBmYWxzZSwgY3RybEtleTogYm9vbGVhbiA9IGZhbHNlLCBzaGlmdEtleTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBzdXBlcih0eXBlLCBhbHRLZXksIGN0cmxLZXksIHNoaWZ0S2V5KTtcclxuICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gICAgdGhpcy5rZXlDb2RlID0ga2V5Q29kZTtcclxuICAgIHRoaXMucmVwZWF0ID0gcmVwZWF0O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uIGltcGxlbWVudHMgRXZlbnRMaXN0ZW5lck9iamVjdCB7XHJcblxyXG4gIHB1YmxpYyB0aW1lcnM6IFRpbWVyW10gPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBfdGltZUlkOiBudW1iZXIgPSAtMTtcclxuXHJcbiAgcHJpdmF0ZSBfZnBzOiBudW1iZXIgPSAwO1xyXG5cclxuICBwdWJsaWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuXHJcbiAgcHVibGljIGlzU3VwcG9ydE1vdXNlTW92ZTogYm9vbGVhbjtcclxuICBwcm90ZWN0ZWQgX2lzTW91c2VEb3duOiBib29sZWFuO1xyXG5cclxuICBwcm90ZWN0ZWQgX3N0YXJ0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJvdGVjdGVkIF9yZXF1ZXN0SWQ6IG51bWJlciA9IC0xO1xyXG5cclxuICBwcm90ZWN0ZWQgX2xhc3RUaW1lICE6IG51bWJlcjtcclxuICBwcm90ZWN0ZWQgX3N0YXJ0VGltZSAhOiBudW1iZXI7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcywgZmFsc2UpO1xyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcywgZmFsc2UpO1xyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLCBmYWxzZSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcywgZmFsc2UpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLCBmYWxzZSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIHRoaXMsIGZhbHNlKTtcclxuICAgIHRoaXMuX2lzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzU3VwcG9ydE1vdXNlTW92ZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzUnVubmluZygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGFydDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZnBzKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fZnBzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLl9zdGFydCkge1xyXG4gICAgICB0aGlzLl9zdGFydCA9IHRydWU7XHJcbiAgICAgIHRoaXMuX2xhc3RUaW1lID0gLTE7XHJcbiAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IC0xO1xyXG4gICAgICB0aGlzLl9yZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKG1zZWM6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuc3RlcChtc2VjKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc3RlcCh0aW1lU3RhbXA6IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3N0YXJ0VGltZSA9PT0gLTEpIHRoaXMuX3N0YXJ0VGltZSA9IHRpbWVTdGFtcDsgLy8g6IKv5a6a5Li6MFxyXG4gICAgaWYgKHRoaXMuX2xhc3RUaW1lID09PSAtMSkgdGhpcy5fbGFzdFRpbWUgPSB0aW1lU3RhbXA7XHJcbiAgICBsZXQgZWxhcHNlZE1zZWMgPSB0aW1lU3RhbXAgLSB0aGlzLl9zdGFydFRpbWU7IC8vIOS7juesrOS4gOasoeaJp+ihjHN0ZXDmlrnms5XliLDmraTmrKHmiafooYxzdGVw5pa55rOV57uP5Y6G55qE5q+r56eS5pWwXHJcbiAgICBsZXQgaW50ZXJ2YWxTZWMgPSAodGltZVN0YW1wIC0gdGhpcy5fbGFzdFRpbWUpOyAgLy8g5LiK5LiA5qyh5omn6KGMc3RlcOWIsOatpOasoeaJp+ihjHN0ZXDnu4/ljobnmoTnp5LmlbBcclxuICAgIGlmIChpbnRlcnZhbFNlYyAhPT0gMCkge1xyXG4gICAgICB0aGlzLl9mcHMgPSAxMDAwLjAgLyBpbnRlcnZhbFNlYzsgLy8g6Ze06ZqU6LaK5bCPZnBz6LaK6auYXHJcbiAgICB9XHJcbiAgICBpbnRlcnZhbFNlYyAvPSAxMDAwLjA7IC8vIGludGVydmFsU2Vj6L2s5Li656eS5Y2V5L2NXHJcbiAgICB0aGlzLl9sYXN0VGltZSA9IHRpbWVTdGFtcDsgLy8g5pu05pawX2xhc3RUaW1l5Li65pys5qyh5omn6KGM5pe255qE5pe26Ze077yM55So5LqO5LiL5Liq5ZGo5pyf6K6h566X5ZGo5pyf6Ze06ZqU5pe26Ze0XHJcbiAgICB0aGlzLl9oYW5kbGVUaW1lcnMoaW50ZXJ2YWxTZWMpOyAvLyDmo4Dmn6Xms6jlhoznmoR0aW1lcuaYr+WQpumcgOimgeaJp+ihjFxyXG4gICAgdGhpcy51cGRhdGUoZWxhcHNlZE1zZWMsIGludGVydmFsU2VjKTsgLy8g5q2k5pa55rOV5Zyo5a2Q57G7U3ByaXRlMkRBcHBsaWNhdGlvbuS4reWunueOsFxyXG4gICAgdGhpcy5yZW5kZXIoKTsgLy8g6LCD55So5a2Q57G7U3ByaXRlMkRBcHBsaWNhdGlvbuS4reeahF9kaXNwYXRjaGVy55qEZGlzcGF0Y2hEcmF3KCnmlrnms5VcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoZWxhcHNlZE1zZWM6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgICAvLyDov5nph4zkvKDlhaXnmoTmmK9lbGFwc2VkTXNlY+aYr+S7jjDlvIDlp4vorqHnrpfnmoTvvIjnrKzkuIDmrKFyZXF1ZXN0QW5pbWF0aW9uRnJhbWXooqvmiafooYzlsLHkvJrkvKDlhaUw77yJ77yM6ICM5LiN5piv5LuOMTk3MCDlubQgMSDmnIggMSDml6UgMDA6MDA6MDAgKFVUQykg5Yiw5b2T5YmN5pe26Ze055qE5q+r56eS5pWw5L2c5Li65Z+65pWwXHJcbiAgICAgIC8vIOaJgOS7peS4iumdoueahHRoaXMuX3N0YXJ0VGltZeiCr+WvueS8muS4ujBcclxuICAgICAgdGhpcy5zdGVwKGVsYXBzZWRNc2VjKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0b3AoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fc3RhcnQpIHtcclxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fcmVxdWVzdElkKTtcclxuICAgICAgdGhpcy5fbGFzdFRpbWUgPSAtMTtcclxuICAgICAgdGhpcy5fc3RhcnRUaW1lID0gLTE7XHJcbiAgICAgIHRoaXMuX3N0YXJ0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlKGVsYXBzZWRNc2VjOiBudW1iZXIsIGludGVydmFsU2VjOiBudW1iZXIpOiB2b2lkIHsgfVxyXG4gIHB1YmxpYyByZW5kZXIoKTogdm9pZCB7IH1cclxuXHJcbiAgLy8g6L+Z5pivYWRkRXZlbnRMaXN0ZW5lcueahOS4gOenjeWGmeazle+8jOesrOS6jOS4quWPguaVsOS4uuS4gOS4quWvueixoe+8jOWvueixoeeahGhhbmRsZUV2ZW505pa55rOV5Lya5L2c5Li65LqL5Lu255qE5Zue6LCDXHJcbiAgLy8g6L+Z6YeM55qEZGlzcGF0Y2hNb3VzZURvd27jgIFkaXNwYXRjaE1vdXNlVXDjgIFkaXNwYXRjaE1vdXNlTW92ZeOAgWRpc3BhdGNoTW91c2VNb3Zl5Lya6KKr5a2Q57G7c3ByaXRlMkRBcHBsaWNhdGlvbuWunueOsO+8jOiwg+eUqOWFtuWGhemDqF9kaXNwYXRjaGVy5a+56LGh55qEZGlzcGF0Y2hNb3VzZUV2ZW505pa55rOVXHJcbiAgLy8g6L+Z6YeM55qEZGlzcGF0Y2hLZXlQcmVzc+OAgWRpc3BhdGNoS2V5RG93buOAgWRpc3BhdGNoS2V5VXDkvJrooqvlrZDnsbtzcHJpdGUyREFwcGxpY2F0aW9u5a6e546w77yM6LCD55So5YW25YaF6YOoX2Rpc3BhdGNoZXLlr7nosaHnmoRkaXNwYXRjaEtleUV2ZW505pa55rOVXHJcbiAgcHVibGljIGhhbmRsZUV2ZW50KGV2dDogRXZlbnQpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAoZXZ0LnR5cGUpIHtcclxuICAgICAgY2FzZSBcIm1vdXNlZG93blwiOlxyXG4gICAgICAgIHRoaXMuX2lzTW91c2VEb3duID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoTW91c2VEb3duKHRoaXMuX3RvQ2FudmFzTW91c2VFdmVudChldnQsIEVJbnB1dEV2ZW50VHlwZS5NT1VTRURPV04pKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIm1vdXNldXBcIjpcclxuICAgICAgICB0aGlzLl9pc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hNb3VzZVVwKHRoaXMuX3RvQ2FudmFzTW91c2VFdmVudChldnQsIEVJbnB1dEV2ZW50VHlwZS5NT1VTRVVQKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJtb3VzZW1vdmVcIjpcclxuICAgICAgICBpZiAodGhpcy5pc1N1cHBvcnRNb3VzZU1vdmUpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNb3VzZU1vdmUodGhpcy5fdG9DYW52YXNNb3VzZUV2ZW50KGV2dCwgRUlucHV0RXZlbnRUeXBlLk1PVVNFTU9WRSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faXNNb3VzZURvd24pIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNb3VzZURyYWcodGhpcy5fdG9DYW52YXNNb3VzZUV2ZW50KGV2dCwgRUlucHV0RXZlbnRUeXBlLk1PVVNFRFJBRykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImtleXByZXNzXCI6XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaEtleVByZXNzKHRoaXMuX3RvQ2FudmFzS2V5Qm9hcmRFdmVudChldnQsIEVJbnB1dEV2ZW50VHlwZS5LRVlQUkVTUykpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwia2V5ZG93blwiOlxyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hLZXlEb3duKHRoaXMuX3RvQ2FudmFzS2V5Qm9hcmRFdmVudChldnQsIEVJbnB1dEV2ZW50VHlwZS5LRVlET1dOKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJrZXl1cFwiOlxyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hLZXlVcCh0aGlzLl90b0NhbnZhc0tleUJvYXJkRXZlbnQoZXZ0LCBFSW5wdXRFdmVudFR5cGUuS0VZVVApKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBkaXNwYXRjaE1vdXNlRG93bihldnQ6IENhbnZhc01vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBkaXNwYXRjaE1vdXNlVXAoZXZ0OiBDYW52YXNNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZGlzcGF0Y2hNb3VzZU1vdmUoZXZ0OiBDYW52YXNNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZGlzcGF0Y2hNb3VzZURyYWcoZXZ0OiBDYW52YXNNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZGlzcGF0Y2hLZXlEb3duKGV2dDogQ2FudmFzS2V5Qm9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGRpc3BhdGNoS2V5VXAoZXZ0OiBDYW52YXNLZXlCb2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZGlzcGF0Y2hLZXlQcmVzcyhldnQ6IENhbnZhc0tleUJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBfdmlld3BvcnRUb0NhbnZhc0Nvb3JkaW5hdGUoZXZ0OiBNb3VzZUV2ZW50KTogdmVjMiB7XHJcbiAgICBpZiAodGhpcy5jYW52YXMpIHtcclxuICAgICAgbGV0IHJlY3Q6IENsaWVudFJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgaWYgKGV2dC50eXBlID09PSBcIm1vdXNlZG93blwiKSB7XHJcbiAgICAgICAgLy9jb25zb2xlIC4gbG9nIChcIiBib3VuZGluZ0NsaWVudFJlY3QgOiBcIiArIEpTT04gLiBzdHJpbmdpZnkgKCByZWN0ICkgKSA7XHJcbiAgICAgICAgLy9jb25zb2xlIC4gbG9nICggXCIgY2xpZW50WCA6IFwiICsgZXZ0IC4gY2xpZW50WCArIFwiIGNsaWVudFkgOiBcIiArIGV2dC5jbGllbnRZICkgO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChldnQudGFyZ2V0KSB7XHJcbiAgICAgICAgbGV0IGJvcmRlckxlZnRXaWR0aDogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgYm9yZGVyVG9wV2lkdGg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IHBhZGRpbmdMZWZ0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBwYWRkaW5nVG9wOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBkZWNsOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZXZ0LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XHJcblxyXG4gICAgICAgIGxldCBzdHJOdW1iZXI6IHN0cmluZyB8IG51bGwgPSBkZWNsLmJvcmRlckxlZnRXaWR0aDtcclxuICAgICAgICBpZiAoc3RyTnVtYmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBib3JkZXJMZWZ0V2lkdGggPSBwYXJzZUludChzdHJOdW1iZXIsIDEwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0ck51bWJlciA9IGRlY2wuYm9yZGVyVG9wV2lkdGg7XHJcbiAgICAgICAgaWYgKHN0ck51bWJlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgYm9yZGVyVG9wV2lkdGggPSBwYXJzZUludChzdHJOdW1iZXIsIDEwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0ck51bWJlciA9IGRlY2wucGFkZGluZ0xlZnQ7XHJcbiAgICAgICAgaWYgKHN0ck51bWJlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgcGFkZGluZ0xlZnQgPSBwYXJzZUludChzdHJOdW1iZXIsIDEwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0ck51bWJlciA9IGRlY2wucGFkZGluZ1RvcDtcclxuICAgICAgICBpZiAoc3RyTnVtYmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBwYWRkaW5nVG9wID0gcGFyc2VJbnQoc3RyTnVtYmVyLCAxMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgeDogbnVtYmVyID0gZXZ0LmNsaWVudFggLSByZWN0LmxlZnQgLSBib3JkZXJMZWZ0V2lkdGggLSBwYWRkaW5nTGVmdDtcclxuICAgICAgICBsZXQgeTogbnVtYmVyID0gZXZ0LmNsaWVudFkgLSByZWN0LnRvcCAtIGJvcmRlclRvcFdpZHRoIC0gcGFkZGluZ1RvcDtcclxuXHJcbiAgICAgICAgbGV0IHBvczogdmVjMiA9IHZlYzIuY3JlYXRlKHgsIHkpO1xyXG5cclxuICAgICAgICBpZiAoZXZ0LnR5cGUgPT09IFwibW91c2Vkb3duXCIpIHtcclxuICAgICAgICAgIC8vY29uc29sZSAuIGxvZyAoIFwiIGJvcmRlckxlZnRXaWR0aCA6IFwiICsgYm9yZGVyTGVmdFdpZHRoICsgXCIgYm9yZGVyVG9wV2lkdGggOiBcIiArIGJvcmRlclRvcFdpZHRoICkgO1xyXG4gICAgICAgICAgLy9jb25zb2xlIC4gbG9nICggXCIgcGFkZGluZ0xlZnQgOiBcIiArIHBhZGRpbmdMZWZ0ICsgXCIgcGFkZGluZ1RvcCA6IFwiICsgcGFkZGluZ1RvcCApIDtcclxuICAgICAgICAgIC8vY29uc29sZSAuIGxvZyAoIFwiIOWPmOaNouWQjueahGNhbnZhc1Bvc2l0aW9uIDogXCIgKyBwb3MgLiB0b1N0cmluZyggKSApIDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFsZXJ0KFwiY2FudmFz5Li6bnVsbFwiKTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FudmFz5Li6bnVsbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBhbGVydChcImV2dCAuIHRhcmdldOS4um51bGxcIik7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJldnQgLiB0YXJnZXTkuLpudWxsXCIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdG9DYW52YXNNb3VzZUV2ZW50KGV2dDogRXZlbnQsIHR5cGU6IEVJbnB1dEV2ZW50VHlwZSk6IENhbnZhc01vdXNlRXZlbnQge1xyXG4gICAgbGV0IGV2ZW50OiBNb3VzZUV2ZW50ID0gZXZ0IGFzIE1vdXNlRXZlbnQ7XHJcbiAgICBsZXQgbW91c2VQb3NpdGlvbjogdmVjMiA9IHRoaXMuX3ZpZXdwb3J0VG9DYW52YXNDb29yZGluYXRlKGV2ZW50KTtcclxuICAgIGxldCBjYW52YXNNb3VzZUV2ZW50OiBDYW52YXNNb3VzZUV2ZW50ID0gbmV3IENhbnZhc01vdXNlRXZlbnQodHlwZSwgbW91c2VQb3NpdGlvbiwgZXZlbnQuYnV0dG9uLCBldmVudC5hbHRLZXksIGV2ZW50LmN0cmxLZXksIGV2ZW50LnNoaWZ0S2V5KTtcclxuICAgIHJldHVybiBjYW52YXNNb3VzZUV2ZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdG9DYW52YXNLZXlCb2FyZEV2ZW50KGV2dDogRXZlbnQsIHR5cGU6IEVJbnB1dEV2ZW50VHlwZSk6IENhbnZhc0tleUJvYXJkRXZlbnQge1xyXG4gICAgbGV0IGV2ZW50OiBLZXlib2FyZEV2ZW50ID0gZXZ0IGFzIEtleWJvYXJkRXZlbnQ7XHJcbiAgICBsZXQgY2FudmFzS2V5Ym9hcmRFdmVudDogQ2FudmFzS2V5Qm9hcmRFdmVudCA9IG5ldyBDYW52YXNLZXlCb2FyZEV2ZW50KHR5cGUsIGV2ZW50LmtleSwgZXZlbnQua2V5Q29kZSwgZXZlbnQucmVwZWF0LCBldmVudC5hbHRLZXksIGV2ZW50LmN0cmxLZXksIGV2ZW50LnNoaWZ0S2V5KTtcclxuICAgIHJldHVybiBjYW52YXNLZXlib2FyZEV2ZW50O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZFRpbWVyKGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrLCB0aW1lb3V0OiBudW1iZXIgPSAxLjAsIG9ubHlPbmNlOiBib29sZWFuID0gZmFsc2UsIGRhdGE6IGFueSA9IHVuZGVmaW5lZCk6IG51bWJlciB7XHJcbiAgICBsZXQgdGltZXI6IFRpbWVyXHJcbiAgICB0aW1lciA9IG5ldyBUaW1lcihjYWxsYmFjayk7XHJcbiAgICB0aW1lci5jYWxsYmFja0RhdGEgPSBkYXRhO1xyXG4gICAgdGltZXIudGltZW91dCA9IHRpbWVvdXQ7XHJcbiAgICB0aW1lci5jb3VudGRvd24gPSB0aW1lb3V0O1xyXG4gICAgdGltZXIuZW5hYmxlZCA9IHRydWU7IC8vIOmAmui/h2FkZFRpbWVyKCnmlrnms5Xmt7vliqDnmoR0aW1lcueahGVuYWJsZWTpg73kuLp0cnVlXHJcbiAgICB0aW1lci5pZCA9ICsrdGhpcy5fdGltZUlkO1xyXG4gICAgdGltZXIub25seU9uY2UgPSBvbmx5T25jZTtcclxuXHJcbiAgICB0aGlzLnRpbWVycy5wdXNoKHRpbWVyKTtcclxuICAgIHJldHVybiB0aW1lci5pZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVUaW1lcihpZDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgZm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50aW1lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMudGltZXJzW2ldLmlkID09PSBpZCkge1xyXG4gICAgICAgIGxldCB0aW1lcjogVGltZXIgPSB0aGlzLnRpbWVyc1tpXTtcclxuICAgICAgICB0aW1lci5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm91bmQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYW5kbGVUaW1lcnMoaW50ZXJ2YWxTZWM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRpbWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgdGltZXI6IFRpbWVyID0gdGhpcy50aW1lcnNbaV07XHJcbiAgICAgIGlmICh0aW1lci5lbmFibGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRpbWVyLmNvdW50ZG93biAtPSBpbnRlcnZhbFNlYztcclxuICAgICAgaWYgKHRpbWVyLmNvdW50ZG93biA8IDAuMCkge1xyXG4gICAgICAgIHRpbWVyLmNhbGxiYWNrKHRpbWVyLmlkLCB0aW1lci5jYWxsYmFja0RhdGEpO1xyXG4gICAgICAgIGlmICh0aW1lci5vbmx5T25jZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIHRpbWVyLmNvdW50ZG93biA9IHRpbWVyLnRpbWVvdXQ7IC8vIOmHjee9ruWAkuiuoeaXtu+8iOW+queOr+aJp+ihjO+8iVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZVRpbWVyKHRpbWVyLmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYW52YXMyREFwcGxpY2F0aW9uIGV4dGVuZHMgQXBwbGljYXRpb24ge1xyXG4gIHB1YmxpYyBjb250ZXh0MkQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB8IG51bGw7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgIHN1cGVyKGNhbnZhcyk7XHJcbiAgICB0aGlzLmNvbnRleHQyRCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBXZWJHTEFwcGxpY2F0aW9uIGV4dGVuZHMgQXBwbGljYXRpb24ge1xyXG4vLyAgICAgcHVibGljIGNvbnRleHQzRDogV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgbnVsbDtcclxuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBjb250ZXh0QXR0cmlidXRlcz86IFdlYkdMQ29udGV4dEF0dHJpYnV0ZXMpIHtcclxuLy8gICAgICAgICBzdXBlcihjYW52YXMpO1xyXG4vLyAgICAgICAgIHRoaXMuY29udGV4dDNEID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIndlYmdsXCIsIGNvbnRleHRBdHRyaWJ1dGVzKTtcclxuLy8gICAgICAgICBpZiAodGhpcy5jb250ZXh0M0QgPT09IG51bGwpIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5jb250ZXh0M0QgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiZXhwZXJpbWVudGFsLXdlYmdsXCIsIGNvbnRleHRBdHRyaWJ1dGVzKTtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dDNEID09PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICBhbGVydChcIiDml6Dms5XliJvlu7pXZWJHTFJlbmRlcmluZ0NvbnRleHTkuIrkuIvmloflr7nosaEgXCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiIOaXoOazleWIm+W7uldlYkdMUmVuZGVyaW5nQ29udGV4dOS4iuS4i+aWh+WvueixoSBcIik7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcbiIsImltcG9ydCB7IElFbnVtZXJhdG9yIH0gZnJvbSBcIi4vSUVudW1lcmF0b3JcIlxyXG5jb25zdCBFUFNJTE9OOiBudW1iZXIgPSAwLjAwMDAxO1xyXG5jb25zdCBQaUJ5MTgwOiBudW1iZXIgPSAwLjAxNzQ1MzI5MjUxOTk0MzI5NTtcclxuZXhwb3J0IGNsYXNzIHZlYzIge1xyXG4gIHB1YmxpYyB2YWx1ZXM6IEZsb2F0MzJBcnJheTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApIHtcclxuICAgIHRoaXMudmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbeCwgeV0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gXCIgWyBcIiArIHRoaXMudmFsdWVzWzBdICsgXCIgLCBcIiArIHRoaXMudmFsdWVzWzFdICsgXCIgXSBcIjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy52YWx1ZXNbMF07IH1cclxuICBwdWJsaWMgc2V0IHgoeDogbnVtYmVyKSB7IHRoaXMudmFsdWVzWzBdID0geDsgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHkoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudmFsdWVzWzFdOyB9XHJcbiAgcHVibGljIHNldCB5KHk6IG51bWJlcikgeyB0aGlzLnZhbHVlc1sxXSA9IHk7IH1cclxuXHJcbiAgcHVibGljIHJlc2V0KHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApOiB2ZWMyIHtcclxuICAgIHRoaXMudmFsdWVzWzBdID0geDtcclxuICAgIHRoaXMudmFsdWVzWzFdID0geTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGVxdWFscyh2ZWN0b3I6IHZlYzIpOiBib29sZWFuIHtcclxuICAgIGlmIChNYXRoLmFicyh0aGlzLnZhbHVlc1swXSAtIHZlY3Rvci52YWx1ZXNbMF0pID4gRVBTSUxPTilcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGlmIChNYXRoLmFicyh0aGlzLnZhbHVlc1sxXSAtIHZlY3Rvci52YWx1ZXNbMV0pID4gRVBTSUxPTilcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5lZ2F0aXZlKCk6IHZlYzIge1xyXG4gICAgdGhpcy52YWx1ZXNbMF0gPSAtIHRoaXMudmFsdWVzWzBdO1xyXG4gICAgdGhpcy52YWx1ZXNbMV0gPSAtIHRoaXMudmFsdWVzWzFdO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNxdWFyZWRMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgIGxldCB4ID0gdGhpcy52YWx1ZXNbMF07XHJcbiAgICBsZXQgeSA9IHRoaXMudmFsdWVzWzFdO1xyXG4gICAgcmV0dXJuICh4ICogeCArIHkgKiB5KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuc3F1YXJlZExlbmd0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbm9ybWFsaXplKCk6IG51bWJlciB7XHJcbiAgICBsZXQgbGVuOiBudW1iZXIgPSB0aGlzLmxlbmd0aDtcclxuICAgIGlmIChNYXRoMkQuaXNFcXVhbHMobGVuLCAwKSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIiB0aGUgbGVuZ3RoID0gMCBcIik7XHJcbiAgICAgIHRoaXMudmFsdWVzWzBdID0gMDtcclxuICAgICAgdGhpcy52YWx1ZXNbMV0gPSAwO1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTWF0aDJELmlzRXF1YWxzKGxlbiwgMSkpIHtcclxuICAgICAgY29uc29sZS5sb2coXCIgdGhlIGxlbmd0aCA9IDEgXCIpO1xyXG4gICAgICByZXR1cm4gMS4wO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmFsdWVzWzBdIC89IGxlbjtcclxuICAgIHRoaXMudmFsdWVzWzFdIC89IGxlbjtcclxuICAgIHJldHVybiBsZW47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKTogdmVjMiB7XHJcbiAgICByZXR1cm4gbmV3IHZlYzIoeCwgeSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkKHJpZ2h0OiB2ZWMyKTogdmVjMiB7XHJcbiAgICB2ZWMyLnN1bSh0aGlzLCByaWdodCwgdGhpcyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgc3VtKGxlZnQ6IHZlYzIsIHJpZ2h0OiB2ZWMyLCByZXN1bHQ6IHZlYzIgfCBudWxsID0gbnVsbCk6IHZlYzIge1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgcmVzdWx0ID0gbmV3IHZlYzIoKTtcclxuICAgIHJlc3VsdC52YWx1ZXNbMF0gPSBsZWZ0LnZhbHVlc1swXSArIHJpZ2h0LnZhbHVlc1swXTtcclxuICAgIHJlc3VsdC52YWx1ZXNbMV0gPSBsZWZ0LnZhbHVlc1sxXSArIHJpZ2h0LnZhbHVlc1sxXTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3Vic3RyYWN0KGFub3RoZXI6IHZlYzIpOiB2ZWMyIHtcclxuICAgIHZlYzIuZGlmZmVyZW5jZSh0aGlzLCBhbm90aGVyLCB0aGlzKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBkaWZmZXJlbmNlKGVuZDogdmVjMiwgc3RhcnQ6IHZlYzIsIHJlc3VsdDogdmVjMiB8IG51bGwgPSBudWxsKTogdmVjMiB7XHJcbiAgICBpZiAocmVzdWx0ID09PSBudWxsKSByZXN1bHQgPSBuZXcgdmVjMigpO1xyXG4gICAgcmVzdWx0LnZhbHVlc1swXSA9IGVuZC52YWx1ZXNbMF0gLSBzdGFydC52YWx1ZXNbMF07XHJcbiAgICByZXN1bHQudmFsdWVzWzFdID0gZW5kLnZhbHVlc1sxXSAtIHN0YXJ0LnZhbHVlc1sxXTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNvcHkoc3JjOiB2ZWMyLCByZXN1bHQ6IHZlYzIgfCBudWxsID0gbnVsbCk6IHZlYzIge1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgcmVzdWx0ID0gbmV3IHZlYzIoKTtcclxuICAgIHJlc3VsdC52YWx1ZXNbMF0gPSBzcmMudmFsdWVzWzBdO1xyXG4gICAgcmVzdWx0LnZhbHVlc1sxXSA9IHNyYy52YWx1ZXNbMV07XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBzY2FsZShkaXJlY3Rpb246IHZlYzIsIHNjYWxhcjogbnVtYmVyLCByZXN1bHQ6IHZlYzIgfCBudWxsID0gbnVsbCk6IHZlYzIge1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgcmVzdWx0ID0gbmV3IHZlYzIoKTtcclxuICAgIHJlc3VsdC52YWx1ZXNbMF0gPSBkaXJlY3Rpb24udmFsdWVzWzBdICogc2NhbGFyO1xyXG4gICAgcmVzdWx0LnZhbHVlc1sxXSA9IGRpcmVjdGlvbi52YWx1ZXNbMV0gKiBzY2FsYXI7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLy8g5rK/ZGlyZWN0aW9u5pa55ZCR56e75Yqoc2NhbGFy55qE6Led56a7XHJcbiAgcHVibGljIHN0YXRpYyBzY2FsZUFkZChzdGFydDogdmVjMiwgZGlyZWN0aW9uOiB2ZWMyLCBzY2FsYXI6IG51bWJlciwgcmVzdWx0OiB2ZWMyIHwgbnVsbCA9IG51bGwpOiB2ZWMyIHtcclxuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHJlc3VsdCA9IG5ldyB2ZWMyKCk7XHJcbiAgICB2ZWMyLnNjYWxlKGRpcmVjdGlvbiwgc2NhbGFyLCByZXN1bHQpO1xyXG4gICAgcmV0dXJuIHZlYzIuc3VtKHN0YXJ0LCByZXN1bHQsIHJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIG1vdmVUb3dhcmRzKHN0YXJ0OiB2ZWMyLCBkaXJlY3Rpb246IHZlYzIsIHNjYWxhcjogbnVtYmVyLCByZXN1bHQ6IHZlYzIgfCBudWxsID0gbnVsbCk6IHZlYzIge1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgcmVzdWx0ID0gbmV3IHZlYzIoKTtcclxuICAgIHZlYzIuc2NhbGUoZGlyZWN0aW9uLCBzY2FsYXIsIHJlc3VsdCk7XHJcbiAgICByZXR1cm4gdmVjMi5zdW0oc3RhcnQsIHJlc3VsdCwgcmVzdWx0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbm5lclByb2R1Y3QocmlnaHQ6IHZlYzIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHZlYzIuZG90UHJvZHVjdCh0aGlzLCByaWdodCk7XHJcbiAgfVxyXG5cclxuICAvLyDngrnkuZhcclxuICBwdWJsaWMgc3RhdGljIGRvdFByb2R1Y3QobGVmdDogdmVjMiwgcmlnaHQ6IHZlYzIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGxlZnQudmFsdWVzWzBdICogcmlnaHQudmFsdWVzWzBdICsgbGVmdC52YWx1ZXNbMV0gKiByaWdodC52YWx1ZXNbMV07XHJcbiAgfVxyXG5cclxuICAvLyDlj4nkuZhcclxuICBwdWJsaWMgc3RhdGljIGNyb3NzUHJvZHVjdChsZWZ0OiB2ZWMyLCByaWdodDogdmVjMik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gbGVmdC54ICogcmlnaHQueSAtIGxlZnQueSAqIHJpZ2h0Lng7XHJcbiAgfVxyXG5cclxuICAvLyDku6Xngrlmcm9t5L2c5Li65Y6f54K577yM6I635b6X54K5dG/nmoTmlrnlkJHvvIjnm7jlr7nkuo546L205q2j5pa55ZCR77yJXHJcbiAgcHVibGljIHN0YXRpYyBnZXRPcmllbnRhdGlvbihmcm9tOiB2ZWMyLCB0bzogdmVjMiwgaXNSYWRpYW46IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XHJcbiAgICBsZXQgZGlmZjogdmVjMiA9IHZlYzIuZGlmZmVyZW5jZSh0bywgZnJvbSk7XHJcbiAgICBsZXQgcmFkaWFuID0gTWF0aC5hdGFuMihkaWZmLnksIGRpZmYueCk7XHJcbiAgICBpZiAoaXNSYWRpYW4gPT09IGZhbHNlKSB7XHJcbiAgICAgIHJhZGlhbiA9IE1hdGgyRC50b0RlZ3JlZShyYWRpYW4pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJhZGlhbjtcclxuICB9XHJcblxyXG4gIC8vIOiOt+W+l+aWueWQkWHliLDmlrnlkJFi55qE5aS56KeS55qE5byn5bqm5oiW6KeS5bqmXHJcbiAgcHVibGljIHN0YXRpYyBnZXRBbmdsZShhOiB2ZWMyLCBiOiB2ZWMyLCBpc1JhZGlhbjogYm9vbGVhbiA9IGZhbHNlKTogbnVtYmVyIHtcclxuICAgIGxldCBkb3Q6IG51bWJlciA9IHZlYzIuZG90UHJvZHVjdChhLCBiKTtcclxuICAgIGxldCByYWRpYW46IG51bWJlciA9IE1hdGguYWNvcyhkb3QgLyAoYS5sZW5ndGggKiBiLmxlbmd0aCkpO1xyXG4gICAgaWYgKGlzUmFkaWFuID09PSBmYWxzZSkge1xyXG4gICAgICByYWRpYW4gPSBNYXRoMkQudG9EZWdyZWUocmFkaWFuKTtcclxuICAgIH1cclxuICAgIHJldHVybiByYWRpYW47XHJcbiAgfVxyXG5cclxuICAvLyDojrflj5bmlrnlkJFh5Yiw5pa55ZCRYueahOWkueinkueahOS9meW8puWAvFxyXG4gIHB1YmxpYyBzdGF0aWMgY29zQW5nbGUoYTogdmVjMiwgYjogdmVjMiwgbm9ybTogYm9vbGVhbiA9IGZhbHNlKTogbnVtYmVyIHtcclxuICAgIGlmIChub3JtID09PSB0cnVlKSB7XHJcbiAgICAgIGEubm9ybWFsaXplKCk7XHJcbiAgICAgIGIubm9ybWFsaXplKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmVjMi5kb3RQcm9kdWN0KGEsIGIpO1xyXG4gIH1cclxuXHJcbiAgLy8g6I635Y+W5pa55ZCRYeWIsOaWueWQkWLnmoTlpLnop5LnmoTmraPlvKblgLxcclxuICBwdWJsaWMgc3RhdGljIHNpbkFuZ2xlKGE6IHZlYzIsIGI6IHZlYzIsIG5vcm06IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XHJcbiAgICBpZiAobm9ybSA9PT0gdHJ1ZSkge1xyXG4gICAgICBhLm5vcm1hbGl6ZSgpO1xyXG4gICAgICBiLm5vcm1hbGl6ZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChhLnggKiBiLnkgLSBiLnggKiBhLnkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyB6ZXJvID0gbmV3IHZlYzIoMCwgMCk7XHJcbiAgcHVibGljIHN0YXRpYyB4QXhpcyA9IG5ldyB2ZWMyKDEsIDApO1xyXG4gIHB1YmxpYyBzdGF0aWMgeUF4aXMgPSBuZXcgdmVjMigwLCAxKTtcclxuICBwdWJsaWMgc3RhdGljIG5YQXhpcyA9IG5ldyB2ZWMyKC0gMSwgMCk7XHJcbiAgcHVibGljIHN0YXRpYyBuWUF4aXMgPSBuZXcgdmVjMigwLCAtIDEpO1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVtcCA9IG5ldyB2ZWMyKDAsIDApO1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVtcDEgPSBuZXcgdmVjMigwLCAwKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyB2ZWMzIHtcclxuICBwdWJsaWMgdmFsdWVzOiBGbG9hdDMyQXJyYXk7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDAsIHo6IG51bWJlciA9IDApIHtcclxuICAgIHRoaXMudmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbeCwgeSwgel0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLnZhbHVlc1swXTsgfVxyXG4gIHB1YmxpYyBzZXQgeCh4OiBudW1iZXIpIHsgdGhpcy52YWx1ZXNbMF0gPSB4OyB9XHJcblxyXG4gIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy52YWx1ZXNbMV07IH1cclxuICBwdWJsaWMgc2V0IHkoeTogbnVtYmVyKSB7IHRoaXMudmFsdWVzWzFdID0geTsgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHooKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudmFsdWVzWzJdOyB9XHJcbiAgcHVibGljIHNldCB6KHo6IG51bWJlcikgeyB0aGlzLnZhbHVlc1syXSA9IHo7IH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBjcm9zcyh2MTogdmVjMywgdjI6IHZlYzMsIG91dDogdmVjMyB8IG51bGwgPSBudWxsKTogdmVjMyB7XHJcbiAgICBpZiAob3V0ID09PSBudWxsKSBvdXQgPSBuZXcgdmVjMygpO1xyXG4gICAgb3V0LnggPSB2MS55ICogdjIueiAtIHYxLnogKiB2Mi55O1xyXG4gICAgb3V0LnkgPSB2MS56ICogdjIueCAtIHYxLnggKiB2Mi56O1xyXG4gICAgb3V0LnogPSB2MS54ICogdjIueSAtIHYxLnkgKiB2Mi54O1xyXG4gICAgcmV0dXJuIG91dDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFwiIFsgXCIgKyB0aGlzLnZhbHVlc1swXSArIFwiICwgXCIgKyB0aGlzLnZhbHVlc1sxXSArIFwiICwgXCIgKyB0aGlzLnZhbHVlc1syXSArIFwiIF0gXCI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgbWF0MmQge1xyXG4gIHB1YmxpYyB2YWx1ZXM6IEZsb2F0MzJBcnJheTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKGE6IG51bWJlciA9IDEsIGI6IG51bWJlciA9IDAsIGM6IG51bWJlciA9IDAsIGQ6IG51bWJlciA9IDEsIHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApIHtcclxuICAgIHRoaXMudmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbYSwgYiwgYywgZCwgeCwgeV0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlkZW50aXR5KCk6IHZvaWQge1xyXG4gICAgdGhpcy52YWx1ZXNbMF0gPSAxLjA7XHJcbiAgICB0aGlzLnZhbHVlc1sxXSA9IDAuMDtcclxuICAgIHRoaXMudmFsdWVzWzJdID0gMC4wO1xyXG4gICAgdGhpcy52YWx1ZXNbM10gPSAxLjA7XHJcbiAgICB0aGlzLnZhbHVlc1s0XSA9IDAuMDtcclxuICAgIHRoaXMudmFsdWVzWzVdID0gMC4wO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoYTogbnVtYmVyID0gMSwgYjogbnVtYmVyID0gMCwgYzogbnVtYmVyID0gMCwgZDogbnVtYmVyID0gMSwgeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCk6IG1hdDJkIHtcclxuICAgIHJldHVybiBuZXcgbWF0MmQoYSwgYiwgYywgZCwgeCwgeSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHhBeGlzKCk6IHZlYzIge1xyXG4gICAgcmV0dXJuIHZlYzIuY3JlYXRlKHRoaXMudmFsdWVzWzBdLCB0aGlzLnZhbHVlc1sxXSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHlBeGlzKCk6IHZlYzIge1xyXG4gICAgcmV0dXJuIHZlYzIuY3JlYXRlKHRoaXMudmFsdWVzWzJdLCB0aGlzLnZhbHVlc1szXSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG9yaWdpbigpOiB2ZWMyIHtcclxuICAgIHJldHVybiB2ZWMyLmNyZWF0ZSh0aGlzLnZhbHVlc1s0XSwgdGhpcy52YWx1ZXNbNV0pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0QW5nbGUoaXNSYWRpYW46IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XHJcbiAgICBsZXQgYW5nbGU6IG51bWJlciA9IE1hdGguYXRhbjIodGhpcy52YWx1ZXNbMV0sIHRoaXMudmFsdWVzWzBdKTtcclxuICAgIGlmIChpc1JhZGlhbikge1xyXG4gICAgICByZXR1cm4gYW5nbGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYW5nbGUgLyBQaUJ5MTgwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBjb3B5KHNyYzogbWF0MmQsIHJlc3VsdDogbWF0MmQgfCBudWxsID0gbnVsbCk6IG1hdDJkIHtcclxuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHJlc3VsdCA9IG5ldyBtYXQyZCgpO1xyXG4gICAgcmVzdWx0LnZhbHVlc1swXSA9IHNyYy52YWx1ZXNbMF07XHJcbiAgICByZXN1bHQudmFsdWVzWzFdID0gc3JjLnZhbHVlc1sxXTtcclxuICAgIHJlc3VsdC52YWx1ZXNbMl0gPSBzcmMudmFsdWVzWzJdO1xyXG4gICAgcmVzdWx0LnZhbHVlc1szXSA9IHNyYy52YWx1ZXNbM107XHJcbiAgICByZXN1bHQudmFsdWVzWzRdID0gc3JjLnZhbHVlc1s0XTtcclxuICAgIHJlc3VsdC52YWx1ZXNbNV0gPSBzcmMudmFsdWVzWzVdO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG5cclxuICBwdWJsaWMgc3RhdGljIG11bHRpcGx5KGxlZnQ6IG1hdDJkLCByaWdodDogbWF0MmQsIHJlc3VsdDogbWF0MmQgfCBudWxsID0gbnVsbCk6IG1hdDJkIHtcclxuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHJlc3VsdCA9IG5ldyBtYXQyZCgpO1xyXG5cclxuICAgIGxldCBhMDogbnVtYmVyID0gbGVmdC52YWx1ZXNbMF07XHJcbiAgICBsZXQgYTE6IG51bWJlciA9IGxlZnQudmFsdWVzWzFdO1xyXG4gICAgbGV0IGEyOiBudW1iZXIgPSBsZWZ0LnZhbHVlc1syXTtcclxuICAgIGxldCBhMzogbnVtYmVyID0gbGVmdC52YWx1ZXNbM107XHJcbiAgICBsZXQgYTQ6IG51bWJlciA9IGxlZnQudmFsdWVzWzRdO1xyXG4gICAgbGV0IGE1OiBudW1iZXIgPSBsZWZ0LnZhbHVlc1s1XTtcclxuXHJcbiAgICBsZXQgYjA6IG51bWJlciA9IHJpZ2h0LnZhbHVlc1swXTtcclxuICAgIGxldCBiMTogbnVtYmVyID0gcmlnaHQudmFsdWVzWzFdO1xyXG4gICAgbGV0IGIyOiBudW1iZXIgPSByaWdodC52YWx1ZXNbMl07XHJcbiAgICBsZXQgYjM6IG51bWJlciA9IHJpZ2h0LnZhbHVlc1szXTtcclxuICAgIGxldCBiNDogbnVtYmVyID0gcmlnaHQudmFsdWVzWzRdO1xyXG4gICAgbGV0IGI1OiBudW1iZXIgPSByaWdodC52YWx1ZXNbNV07XHJcblxyXG4gICAgcmVzdWx0LnZhbHVlc1swXSA9IGEwICogYjAgKyBhMiAqIGIxO1xyXG4gICAgcmVzdWx0LnZhbHVlc1sxXSA9IGExICogYjAgKyBhMyAqIGIxO1xyXG4gICAgcmVzdWx0LnZhbHVlc1syXSA9IGEwICogYjIgKyBhMiAqIGIzO1xyXG4gICAgcmVzdWx0LnZhbHVlc1szXSA9IGExICogYjIgKyBhMyAqIGIzO1xyXG4gICAgcmVzdWx0LnZhbHVlc1s0XSA9IGEwICogYjQgKyBhMiAqIGI1ICsgYTQ7XHJcbiAgICByZXN1bHQudmFsdWVzWzVdID0gYTEgKiBiNCArIGEzICogYjUgKyBhNTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBkZXRlcm1pbmFudChtYXQ6IG1hdDJkKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBtYXQudmFsdWVzWzBdICogbWF0LnZhbHVlc1szXSAtIG1hdC52YWx1ZXNbMl0gKiBtYXQudmFsdWVzWzFdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbnZlcnQoc3JjOiBtYXQyZCwgcmVzdWx0OiBtYXQyZCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGRldDogbnVtYmVyID0gbWF0MmQuZGV0ZXJtaW5hbnQoc3JjKTtcclxuXHJcbiAgICBpZiAoTWF0aDJELmlzRXF1YWxzKGRldCwgMCkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGRldCA9IDEuMCAvIGRldDtcclxuXHJcbiAgICByZXN1bHQudmFsdWVzWzBdID0gc3JjLnZhbHVlc1szXSAqIGRldDtcclxuICAgIHJlc3VsdC52YWx1ZXNbMV0gPSAtIHNyYy52YWx1ZXNbMV0gKiBkZXQ7XHJcbiAgICByZXN1bHQudmFsdWVzWzJdID0gLSBzcmMudmFsdWVzWzJdICogZGV0O1xyXG4gICAgcmVzdWx0LnZhbHVlc1szXSA9IHNyYy52YWx1ZXNbMF0gKiBkZXQ7XHJcbiAgICByZXN1bHQudmFsdWVzWzRdID0gKHNyYy52YWx1ZXNbMl0gKiBzcmMudmFsdWVzWzVdIC0gc3JjLnZhbHVlc1szXSAqIHNyYy52YWx1ZXNbNF0pICogZGV0O1xyXG4gICAgcmVzdWx0LnZhbHVlc1s1XSA9IChzcmMudmFsdWVzWzFdICogc3JjLnZhbHVlc1s0XSAtIHNyYy52YWx1ZXNbMF0gKiBzcmMudmFsdWVzWzVdKSAqIGRldDtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBtYWtlUm90YXRpb24ocmFkaWFuczogbnVtYmVyLCByZXN1bHQ6IG1hdDJkIHwgbnVsbCA9IG51bGwpOiBtYXQyZCB7XHJcbiAgICBpZiAocmVzdWx0ID09PSBudWxsKSByZXN1bHQgPSBuZXcgbWF0MmQoKTtcclxuICAgIGxldCBzOiBudW1iZXIgPSBNYXRoLnNpbihyYWRpYW5zKSwgYzogbnVtYmVyID0gTWF0aC5jb3MocmFkaWFucyk7XHJcbiAgICByZXN1bHQudmFsdWVzWzBdID0gYztcclxuICAgIHJlc3VsdC52YWx1ZXNbMV0gPSBzO1xyXG4gICAgcmVzdWx0LnZhbHVlc1syXSA9IC1zO1xyXG4gICAgcmVzdWx0LnZhbHVlc1szXSA9IGM7XHJcbiAgICByZXN1bHQudmFsdWVzWzRdID0gMDtcclxuICAgIHJlc3VsdC52YWx1ZXNbNV0gPSAwO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8vIOaXi+i9rOefqemYteWPlumAhu+8iOW9k+WJjeefqemYteWPquiDveWMheWQq+aXi+i9rOS/oeaBr++8iVxyXG4gIHB1YmxpYyBvbmx5Um90YXRpb25NYXRyaXhJbnZlcnQoKTogbWF0MmQge1xyXG4gICAgbGV0IHM6IG51bWJlciA9IHRoaXMudmFsdWVzWzFdO1xyXG4gICAgdGhpcy52YWx1ZXNbMV0gPSB0aGlzLnZhbHVlc1syXTtcclxuICAgIHRoaXMudmFsdWVzWzJdID0gcztcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8g5p6E5bu65LuO5pa55ZCRdjHliLDmlrnlkJF2MueahOaXi+i9rOefqemYte+8iOS+i+WmguiOt+WPlnjovbTmraPmlrnnmoTlkJHph4/liLDmn5DkuKrlkJHph4/nmoTml4vovaznn6npmLXvvIzov5nmoLflj6/ku6Xku6Pmm79NYXRoLmF0YW4y55qE5LiA5Lqb5bqU55So77yJXHJcbiAgcHVibGljIHN0YXRpYyBtYWtlUm90YXRpb25Gcm9tVmVjdG9ycyh2MTogdmVjMiwgdjI6IHZlYzIsIG5vcm06IGJvb2xlYW4gPSBmYWxzZSwgcmVzdWx0OiBtYXQyZCB8IG51bGwgPSBudWxsKTogbWF0MmQge1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgcmVzdWx0ID0gbmV3IG1hdDJkKCk7XHJcbiAgICByZXN1bHQudmFsdWVzWzBdID0gdmVjMi5jb3NBbmdsZSh2MSwgdjIsIG5vcm0pO1xyXG4gICAgcmVzdWx0LnZhbHVlc1sxXSA9IHZlYzIuc2luQW5nbGUodjEsIHYyLCBub3JtKTtcclxuICAgIHJlc3VsdC52YWx1ZXNbMl0gPSAtIHZlYzIuc2luQW5nbGUodjEsIHYyLCBub3JtKTtcclxuICAgIHJlc3VsdC52YWx1ZXNbM10gPSB2ZWMyLmNvc0FuZ2xlKHYxLCB2Miwgbm9ybSk7XHJcbiAgICByZXN1bHQudmFsdWVzWzRdID0gMDtcclxuICAgIHJlc3VsdC52YWx1ZXNbNV0gPSAwO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgbWFrZVJlZmxlY3Rpb24oYXhpczogdmVjMiwgcmVzdWx0OiBtYXQyZCB8IG51bGwgPSBudWxsKTogbWF0MmQge1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgcmVzdWx0ID0gbmV3IG1hdDJkKCk7XHJcbiAgICByZXN1bHQudmFsdWVzWzBdID0gMSAtIDIgKiBheGlzLnggKiBheGlzLng7XHJcbiAgICByZXN1bHQudmFsdWVzWzFdID0gLSAyICogYXhpcy54ICogYXhpcy55O1xyXG4gICAgcmVzdWx0LnZhbHVlc1syXSA9IC0gMiAqIGF4aXMueCAqIGF4aXMueTtcclxuICAgIHJlc3VsdC52YWx1ZXNbM10gPSAxIC0gMiAqIGF4aXMueSAqIGF4aXMueTtcclxuICAgIHJlc3VsdC52YWx1ZXNbNF0gPSAwO1xyXG4gICAgcmVzdWx0LnZhbHVlc1s1XSA9IDA7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBtYWtlWFNrZXcoc3g6IG51bWJlciwgcmVzdWx0OiBtYXQyZCB8IG51bGwgPSBudWxsKTogbWF0MmQge1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgcmVzdWx0ID0gbmV3IG1hdDJkKCk7XHJcbiAgICByZXN1bHQudmFsdWVzWzBdID0gMTtcclxuICAgIHJlc3VsdC52YWx1ZXNbMV0gPSAwO1xyXG4gICAgcmVzdWx0LnZhbHVlc1syXSA9IHN4O1xyXG4gICAgcmVzdWx0LnZhbHVlc1szXSA9IDE7XHJcbiAgICByZXN1bHQudmFsdWVzWzRdID0gMDtcclxuICAgIHJlc3VsdC52YWx1ZXNbNV0gPSAwO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgbWFrZVlTa2V3KHN5OiBudW1iZXIsIHJlc3VsdDogbWF0MmQgfCBudWxsID0gbnVsbCk6IG1hdDJkIHtcclxuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHJlc3VsdCA9IG5ldyBtYXQyZCgpO1xyXG4gICAgcmVzdWx0LnZhbHVlc1swXSA9IDE7XHJcbiAgICByZXN1bHQudmFsdWVzWzFdID0gc3k7XHJcbiAgICByZXN1bHQudmFsdWVzWzJdID0gMDtcclxuICAgIHJlc3VsdC52YWx1ZXNbM10gPSAxO1xyXG4gICAgcmVzdWx0LnZhbHVlc1s0XSA9IDA7XHJcbiAgICByZXN1bHQudmFsdWVzWzVdID0gMDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIG1ha2VUcmFuc2xhdGlvbih0eDogbnVtYmVyLCB0eTogbnVtYmVyLCByZXN1bHQ6IG1hdDJkIHwgbnVsbCA9IG51bGwpOiBtYXQyZCB7XHJcbiAgICBpZiAocmVzdWx0ID09PSBudWxsKSByZXN1bHQgPSBuZXcgbWF0MmQoKTtcclxuICAgIHJlc3VsdC52YWx1ZXNbMF0gPSAxO1xyXG4gICAgcmVzdWx0LnZhbHVlc1sxXSA9IDA7XHJcbiAgICByZXN1bHQudmFsdWVzWzJdID0gMDtcclxuICAgIHJlc3VsdC52YWx1ZXNbM10gPSAxO1xyXG5cclxuICAgIHJlc3VsdC52YWx1ZXNbNF0gPSB0eDtcclxuICAgIHJlc3VsdC52YWx1ZXNbNV0gPSB0eTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIG1ha2VTY2FsZShzeDogbnVtYmVyLCBzeTogbnVtYmVyLCByZXN1bHQ6IG1hdDJkIHwgbnVsbCA9IG51bGwpOiBtYXQyZCB7XHJcbiAgICBpZiAoTWF0aDJELmlzRXF1YWxzKHN4LCAwKSB8fCBNYXRoMkQuaXNFcXVhbHMoc3ksIDApKSB7XHJcbiAgICAgIGFsZXJ0KFwiIHjovbTmiJZ56L2057yp5pS+57O75pWw5Li6MCBcIik7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIiB46L205oiWeei9tOe8qeaUvuezu+aVsOS4ujAgXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHJlc3VsdCA9IG5ldyBtYXQyZCgpO1xyXG4gICAgcmVzdWx0LnZhbHVlc1swXSA9IHN4O1xyXG4gICAgcmVzdWx0LnZhbHVlc1sxXSA9IDA7XHJcbiAgICByZXN1bHQudmFsdWVzWzJdID0gMDtcclxuICAgIHJlc3VsdC52YWx1ZXNbM10gPSBzeTtcclxuICAgIHJlc3VsdC52YWx1ZXNbNF0gPSAwO1xyXG4gICAgcmVzdWx0LnZhbHVlc1s1XSA9IDA7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyB0ZW1wMSA9IG1hdDJkLmNyZWF0ZSgpO1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVtcDIgPSBtYXQyZC5jcmVhdGUoKTtcclxuICBwdWJsaWMgc3RhdGljIHF1YWRCZXppZXJCYXNpY01hdHJpeCA9IG1hdDJkLmNyZWF0ZSgxLCAtMiwgLTIsIDIsIDEsIDApO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0cml4U3RhY2sge1xyXG4gIHByaXZhdGUgX21hdHM6IG1hdDJkW107XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fbWF0cyA9IFtdO1xyXG4gICAgdGhpcy5fbWF0cy5wdXNoKG5ldyBtYXQyZCgpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbWF0cml4KCk6IG1hdDJkIHtcclxuICAgIGlmICh0aGlzLl9tYXRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBhbGVydChcIiDnn6npmLXloIbmoIjkuLrnqbogXCIpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCIg55+p6Zi15aCG5qCI5Li656m6IFwiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fbWF0c1t0aGlzLl9tYXRzLmxlbmd0aCAtIDFdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHB1c2hNYXRyaXgoKTogdm9pZCB7XHJcbiAgICBsZXQgbWF0OiBtYXQyZCA9IG1hdDJkLmNvcHkodGhpcy5tYXRyaXgpO1xyXG4gICAgdGhpcy5fbWF0cy5wdXNoKG1hdCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcG9wTWF0cml4KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX21hdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGFsZXJ0KFwiIOefqemYteWghuagiOS4uuepuiBcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX21hdHMucG9wKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9hZElkZW50aXR5KCk6IHZvaWQge1xyXG4gICAgdGhpcy5tYXRyaXguaWRlbnRpdHkoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2FkTWF0cml4KG1hdDogbWF0MmQpOiB2b2lkIHtcclxuICAgIG1hdDJkLmNvcHkobWF0LCB0aGlzLm1hdHJpeCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbXVsdE1hdHJpeChtYXQ6IG1hdDJkKTogdm9pZCB7XHJcbiAgICBtYXQyZC5tdWx0aXBseSh0aGlzLm1hdHJpeCwgbWF0LCB0aGlzLm1hdHJpeCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdHJhbnNsYXRlKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApOiB2b2lkIHtcclxuICAgIGxldCBtYXQ6IG1hdDJkID0gbWF0MmQubWFrZVRyYW5zbGF0aW9uKHgsIHkpO1xyXG4gICAgdGhpcy5tdWx0TWF0cml4KG1hdCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcm90YXRlKGRlZ3JlZTogbnVtYmVyID0gMCwgaXNSYWRpYW46IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgaWYgKGlzUmFkaWFuID09PSBmYWxzZSkge1xyXG4gICAgICBkZWdyZWUgPSBNYXRoMkQudG9SYWRpYW4oZGVncmVlKTtcclxuICAgIH1cclxuICAgIGxldCBtYXQ6IG1hdDJkID0gbWF0MmQubWFrZVJvdGF0aW9uKGRlZ3JlZSk7XHJcbiAgICB0aGlzLm11bHRNYXRyaXgobWF0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByb3RhdGVGcm9tKHYxOiB2ZWMyLCB2MjogdmVjMiwgbm9ybTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICBsZXQgbWF0OiBtYXQyZCA9IG1hdDJkLm1ha2VSb3RhdGlvbkZyb21WZWN0b3JzKHYxLCB2Miwgbm9ybSk7XHJcbiAgICB0aGlzLm11bHRNYXRyaXgobWF0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzY2FsZSh4OiBudW1iZXIgPSAxLjAsIHk6IG51bWJlciA9IDEuMCk6IHZvaWQge1xyXG4gICAgbGV0IG1hdDogbWF0MmQgPSBtYXQyZC5tYWtlU2NhbGUoeCwgeSk7XHJcbiAgICB0aGlzLm11bHRNYXRyaXgobWF0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbnZlcnQoKTogbWF0MmQge1xyXG4gICAgbGV0IHJldDogbWF0MmQgPSBuZXcgbWF0MmQoKTtcclxuICAgIGlmIChtYXQyZC5pbnZlcnQodGhpcy5tYXRyaXgsIHJldCkgPT09IGZhbHNlKSB7XHJcbiAgICAgIGFsZXJ0KFwiIOWghuagiOmhtumDqOefqemYteS4uuWlh+W8guefqemYte+8jOaXoOazleaxgumAhiBcIik7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIiDloIbmoIjpobbpg6jnn6npmLXkuLrlpYflvILnn6npmLXvvIzml6Dms5XmsYLpgIYgXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxuICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIE1hdGgyRCB7XHJcbiAgcHVibGljIHN0YXRpYyB0b1JhZGlhbihkZWdyZWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGVncmVlICogUGlCeTE4MDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgdG9EZWdyZWUocmFkaWFuOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHJhZGlhbiAvIFBpQnkxODA7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHJhbmRvbShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiB0byArIGZyb207XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFuZ2xlU3VidHJhY3QoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGxldCBkaWZmOiBudW1iZXIgPSB0byAtIGZyb207XHJcbiAgICB3aGlsZSAoZGlmZiA+IDE4MCkge1xyXG4gICAgICBkaWZmIC09IDM2MDtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAoZGlmZiA8IC0gMTgwKSB7XHJcbiAgICAgIGRpZmYgKz0gMzYwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkaWZmO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpc0VxdWFscyhsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGVzcGlsb246IG51bWJlciA9IEVQU0lMT04pOiBib29sZWFuIHtcclxuICAgIGlmIChNYXRoLmFicyhsZWZ0IC0gcmlnaHQpID49IEVQU0lMT04pIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldFF1YWRyYXRpY0JlemllclBvc2l0aW9uKHN0YXJ0OiBudW1iZXIsIGN0cmw6IG51bWJlciwgZW5kOiBudW1iZXIsIHQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBpZiAodCA8IDAuMCB8fCB0ID4gMS4wKSB7XHJcbiAgICAgIGFsZXJ0KFwiIHTnmoTlj5blgLzojIPlm7Tlv4XpobvkuLpbIDAgLCAxIF0gXCIpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCIgdOeahOWPluWAvOiMg+WbtOW/hemhu+S4ulsgMCAsIDEgXSBcIik7XHJcbiAgICB9XHJcbiAgICBsZXQgdDE6IG51bWJlciA9IDEuMCAtIHQ7XHJcbiAgICBsZXQgdDI6IG51bWJlciA9IHQxICogdDE7XHJcbiAgICByZXR1cm4gdDIgKiBzdGFydCArIDIuMCAqIHQgKiB0MSAqIGN0cmwgKyB0ICogdCAqIGVuZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0UXVhZHJhdGljQmV6aWVyVmVjdG9yKHN0YXJ0OiB2ZWMyLCBjdHJsOiB2ZWMyLCBlbmQ6IHZlYzIsIHQ6IG51bWJlciwgcmVzdWx0OiB2ZWMyIHwgbnVsbCA9IG51bGwpOiB2ZWMyIHtcclxuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHJlc3VsdCA9IHZlYzIuY3JlYXRlKCk7XHJcbiAgICByZXN1bHQueCA9IE1hdGgyRC5nZXRRdWFkcmF0aWNCZXppZXJQb3NpdGlvbihzdGFydC54LCBjdHJsLngsIGVuZC54LCB0KTtcclxuICAgIHJlc3VsdC55ID0gTWF0aDJELmdldFF1YWRyYXRpY0JlemllclBvc2l0aW9uKHN0YXJ0LnksIGN0cmwueSwgZW5kLnksIHQpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0UXVhZHJhdGljQmV6aWVyTWF0KHN0YXJ0OiB2ZWMyLCBjdHJsOiB2ZWMyLCBlbmQ6IHZlYzIsIHQ6IG51bWJlciwgcmVzdWx0OiB2ZWMyIHwgbnVsbCA9IG51bGwpOiB2ZWMyIHtcclxuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHJlc3VsdCA9IHZlYzIuY3JlYXRlKCk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0Q3ViaWNCZXppZXJQb3NpdGlvbihzdGFydDogbnVtYmVyLCBjdHJsMDogbnVtYmVyLCBjdHJsMTogbnVtYmVyLCBlbmQ6IG51bWJlciwgdDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGlmICh0IDwgMC4wIHx8IHQgPiAxLjApIHtcclxuICAgICAgYWxlcnQoXCIgdOeahOWPluWAvOiMg+WbtOW/hemhu+S4ulsgMCAsIDEgXSBcIik7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIiB055qE5Y+W5YC86IyD5Zu05b+F6aG75Li6WyAwICwgMSBdIFwiKTtcclxuICAgIH1cclxuICAgIGxldCB0MTogbnVtYmVyID0gKDEuMCAtIHQpO1xyXG4gICAgbGV0IHQyOiBudW1iZXIgPSB0ICogdDtcclxuICAgIGxldCB0MzogbnVtYmVyID0gdDIgKiB0O1xyXG4gICAgcmV0dXJuICh0MSAqIHQxICogdDEpICogc3RhcnQgKyAzICogdCAqICh0MSAqIHQxKSAqIGN0cmwwICsgKDMgKiB0MiAqIHQxKSAqIGN0cmwxICsgdDMgKiBlbmQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldEN1YmljQmV6aWVyVmVjdG9yKHN0YXJ0OiB2ZWMyLCBjdHJsMDogdmVjMiwgY3RybDE6IHZlYzIsIGVuZDogdmVjMiwgdDogbnVtYmVyLCByZXN1bHQ6IHZlYzIgfCBudWxsID0gbnVsbCk6IHZlYzIge1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgcmVzdWx0ID0gdmVjMi5jcmVhdGUoKTtcclxuICAgIHJlc3VsdC54ID0gTWF0aDJELmdldEN1YmljQmV6aWVyUG9zaXRpb24oc3RhcnQueCwgY3RybDAueCwgY3RybDEueCwgZW5kLngsIHQpO1xyXG4gICAgcmVzdWx0LnkgPSBNYXRoMkQuZ2V0Q3ViaWNCZXppZXJQb3NpdGlvbihzdGFydC55LCBjdHJsMC55LCBjdHJsMS55LCBlbmQueSwgdCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBjcmVhdGVRdWFkcmF0aWNCZXppZXJFbnVtZXJhdG9yKHN0YXJ0OiB2ZWMyLCBjdHJsOiB2ZWMyLCBlbmQ6IHZlYzIsIHN0ZXBzOiBudW1iZXIgPSAzMCk6IElCZXppZXJFbnVtZXJhdG9yIHtcclxuICAgIHJldHVybiBuZXcgQmV6aWVyRW51bWVyYXRvcihzdGFydCwgZW5kLCBjdHJsLCBudWxsLCBzdGVwcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZUN1YmljQmV6aWVyRW51bWVyYXRvcihzdGFydDogdmVjMiwgY3RybDA6IHZlYzIsIGN0cmwxOiB2ZWMyLCBlbmQ6IHZlYzIsIHN0ZXBzOiBudW1iZXIgPSAzMCk6IElCZXppZXJFbnVtZXJhdG9yIHtcclxuICAgIHJldHVybiBuZXcgQmV6aWVyRW51bWVyYXRvcihzdGFydCwgZW5kLCBjdHJsMCwgY3RybDEsIHN0ZXBzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcHJvamVjdFBvaW50T25MaW5lU2VnbWVudChwdDogdmVjMiwgc3RhcnQ6IHZlYzIsIGVuZDogdmVjMiwgY2xvc2VQb2ludDogdmVjMik6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHYwOiB2ZWMyID0gdmVjMi5jcmVhdGUoKTtcclxuICAgIGxldCB2MTogdmVjMiA9IHZlYzIuY3JlYXRlKCk7XHJcbiAgICBsZXQgZDogbnVtYmVyID0gMDtcclxuXHJcbiAgICB2ZWMyLmRpZmZlcmVuY2UocHQsIHN0YXJ0LCB2MCk7XHJcbiAgICB2ZWMyLmRpZmZlcmVuY2UoZW5kLCBzdGFydCwgdjEpO1xyXG4gICAgZCA9IHYxLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgIGxldCB0OiBudW1iZXIgPSB2ZWMyLmRvdFByb2R1Y3QodjAsIHYxKTtcclxuICAgIGlmICh0IDwgMCkge1xyXG4gICAgICBjbG9zZVBvaW50LnggPSBzdGFydC54O1xyXG4gICAgICBjbG9zZVBvaW50LnkgPSBzdGFydC55O1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKHQgPiBkKSB7XHJcbiAgICAgIGNsb3NlUG9pbnQueCA9IGVuZC54O1xyXG4gICAgICBjbG9zZVBvaW50LnkgPSBlbmQueTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmVjMi5zY2FsZUFkZChzdGFydCwgdjEsIHQsIGNsb3NlUG9pbnQpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIOWIpOaWreeCueaYr+WQpuWcqOe6v+auteS4iuOAguWFiOWIpOaWreeCueWcqOe6v+auteS4iuaYr+WQpuWtmOWcqOaKleW9se+8jOWGjeWIpOaWreeCueWSjOaKleW9seeCueeahOi3neemu+aYr+WQpuWwj+S6juWNiuW+hFxyXG4gIHB1YmxpYyBzdGF0aWMgaXNQb2ludE9uTGluZVNlZ21lbnQocHQ6IHZlYzIsIHN0YXJ0OiB2ZWMyLCBlbmQ6IHZlYzIsIHJhZGl1czogbnVtYmVyID0gMik6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGNsb3NlUHQ6IHZlYzIgPSB2ZWMyLmNyZWF0ZSgpO1xyXG4gICAgaWYgKE1hdGgyRC5wcm9qZWN0UG9pbnRPbkxpbmVTZWdtZW50KHB0LCBzdGFydCwgZW5kLCBjbG9zZVB0KSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE1hdGgyRC5pc1BvaW50SW5DaXJjbGUocHQsIGNsb3NlUHQsIHJhZGl1cyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGlzUG9pbnRJbkNpcmNsZShwdDogdmVjMiwgY2VudGVyOiB2ZWMyLCByYWRpdXM6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGRpZmY6IHZlYzIgPSB2ZWMyLmRpZmZlcmVuY2UocHQsIGNlbnRlcik7XHJcbiAgICBsZXQgbGVuMjogbnVtYmVyID0gZGlmZi5zcXVhcmVkTGVuZ3RoO1xyXG4gICAgaWYgKGxlbjIgPD0gcmFkaXVzICogcmFkaXVzKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpc1BvaW50SW5SZWN0KHB0WDogbnVtYmVyLCBwdFk6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICBpZiAocHRYID49IHggJiYgcHRYIDw9IHggKyB3ICYmIHB0WSA+PSB5ICYmIHB0WSA8PSB5ICsgaCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8vIOWIpOaWreS4pOS4quefqeW9ouaYr+WQpueisOaSnlxyXG4gIHB1YmxpYyBzdGF0aWMgaXNDb2xsaXNpb25XaXRoUmVjdChcclxuICAgIHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHcxOiBudW1iZXIsIGgxOiBudW1iZXIsXHJcbiAgICB4MjogbnVtYmVyLCB5MjogbnVtYmVyLCB3MjogbnVtYmVyLCBoMjogbnVtYmVyXHJcbiAgKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoeDEgPj0geDIgJiYgeDEgPj0geDIgKyB3Mikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKHgxIDw9IHgyICYmIHgxICsgdzEgPD0geDIpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmICh5MSA+PSB5MiAmJiB5MSA+PSB5MiArIGgyKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoeTEgPD0geTIgJiYgeTEgKyBoMSA8PSB5Mikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaXNQb2ludEluRWxsaXBzZShwdFg6IG51bWJlciwgcHRZOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCByYWRpdXNYOiBudW1iZXIsIHJhZGl1c1k6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGRpZmZYID0gcHRYIC0gY2VudGVyWDtcclxuICAgIGxldCBkaWZmWSA9IHB0WSAtIGNlbnRlclk7XHJcbiAgICBsZXQgbjogbnVtYmVyID0gKGRpZmZYICogZGlmZlgpIC8gKHJhZGl1c1ggKiByYWRpdXNYKSArIChkaWZmWSAqIGRpZmZZKSAvIChyYWRpdXNZICogcmFkaXVzWSk7XHJcbiAgICByZXR1cm4gbiA8PSAxLjA7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHNpZ24odjA6IHZlYzIsIHYxOiB2ZWMyLCB2MjogdmVjMik6IG51bWJlciB7XHJcbiAgICBsZXQgZTE6IHZlYzIgPSB2ZWMyLmRpZmZlcmVuY2UodjAsIHYyKTtcclxuICAgIGxldCBlMjogdmVjMiA9IHZlYzIuZGlmZmVyZW5jZSh2MSwgdjIpO1xyXG4gICAgcmV0dXJuIHZlYzIuY3Jvc3NQcm9kdWN0KGUxLCBlMik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGlzUG9pbnRJblRyaWFuZ2xlKHB0OiB2ZWMyLCB2MDogdmVjMiwgdjE6IHZlYzIsIHYyOiB2ZWMyKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgYjE6IGJvb2xlYW4gPSBNYXRoMkQuc2lnbih2MCwgdjEsIHB0KSA8IDAuMDtcclxuICAgIGxldCBiMjogYm9vbGVhbiA9IE1hdGgyRC5zaWduKHYxLCB2MiwgcHQpIDwgMC4wO1xyXG4gICAgbGV0IGIzOiBib29sZWFuID0gTWF0aDJELnNpZ24odjIsIHYwLCBwdCkgPCAwLjA7XHJcbiAgICByZXR1cm4gKChiMSA9PT0gYjIpICYmIChiMiA9PT0gYjMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaXNQb2ludEluUG9seWdvbihwdDogdmVjMiwgcG9pbnRzOiB2ZWMyW10pOiBib29sZWFuIHtcclxuICAgIGlmIChwb2ludHMubGVuZ3RoIDwgMykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAyOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChNYXRoMkQuaXNQb2ludEluVHJpYW5nbGUocHQsIHBvaW50c1swXSwgcG9pbnRzW2kgLSAxXSwgcG9pbnRzW2ldKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGlzQ29udmV4KHBvaW50czogdmVjMltdKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgc2lnbjogYm9vbGVhbiA9IE1hdGgyRC5zaWduKHBvaW50c1swXSwgcG9pbnRzWzFdLCBwb2ludHNbMl0pIDwgMDtcclxuICAgIGxldCBqOiBudW1iZXIsIGs6IG51bWJlcjtcclxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaiA9IChpICsgMSkgJSBwb2ludHMubGVuZ3RoO1xyXG4gICAgICBrID0gKGkgKyAyKSAlIHBvaW50cy5sZW5ndGg7XHJcbiAgICAgIGlmIChzaWduICE9PSBNYXRoMkQuc2lnbihwb2ludHNbaV0sIHBvaW50c1tqXSwgcG9pbnRzW2tdKSA8IDApIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy8g5oqK5ZCR6YeP6YCa6L+H5Y+Y5o2i55+p6Zi16L+b6KGM5Y+Y5o2iXHJcbiAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm0obWF0OiBtYXQyZCwgcHQ6IHZlYzIsIHJlc3VsdDogdmVjMiB8IG51bGwgPSBudWxsKTogdmVjMiB7XHJcbiAgICBpZiAocmVzdWx0ID09PSBudWxsKSByZXN1bHQgPSB2ZWMyLmNyZWF0ZSgpO1xyXG4gICAgcmVzdWx0LnZhbHVlc1swXSA9IG1hdC52YWx1ZXNbMF0gKiBwdC52YWx1ZXNbMF0gKyBtYXQudmFsdWVzWzJdICogcHQudmFsdWVzWzFdICsgbWF0LnZhbHVlc1s0XTtcclxuICAgIHJlc3VsdC52YWx1ZXNbMV0gPSBtYXQudmFsdWVzWzFdICogcHQudmFsdWVzWzBdICsgbWF0LnZhbHVlc1szXSAqIHB0LnZhbHVlc1sxXSArIG1hdC52YWx1ZXNbNV07XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBtYXRTdGFjazogTWF0cml4U3RhY2sgPSBuZXcgTWF0cml4U3RhY2soKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpemUge1xyXG5cclxuICBwdWJsaWMgdmFsdWVzOiBGbG9hdDMyQXJyYXk7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih3OiBudW1iZXIgPSAxLCBoOiBudW1iZXIgPSAxKSB7XHJcbiAgICB0aGlzLnZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoW3csIGhdKTtcclxuICB9XHJcblxyXG4gIHNldCB3aWR0aCh2YWx1ZTogbnVtYmVyKSB7IHRoaXMudmFsdWVzWzBdID0gdmFsdWU7IH1cclxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudmFsdWVzWzBdOyB9XHJcblxyXG4gIHNldCBoZWlnaHQodmFsdWU6IG51bWJlcikgeyB0aGlzLnZhbHVlc1sxXSA9IHZhbHVlOyB9XHJcbiAgZ2V0IGhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy52YWx1ZXNbMV07IH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUodzogbnVtYmVyID0gMSwgaDogbnVtYmVyID0gMSk6IFNpemUge1xyXG4gICAgcmV0dXJuIG5ldyBTaXplKHcsIGgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSB7XHJcbiAgcHVibGljIG9yaWdpbjogdmVjMjtcclxuICBwdWJsaWMgc2l6ZTogU2l6ZTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKG9yaWduOiB2ZWMyID0gbmV3IHZlYzIoKSwgc2l6ZTogU2l6ZSA9IG5ldyBTaXplKDEsIDEpKSB7XHJcbiAgICB0aGlzLm9yaWdpbiA9IG9yaWduO1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc0VtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGFyZWE6IG51bWJlciA9IHRoaXMuc2l6ZS53aWR0aCAqIHRoaXMuc2l6ZS5oZWlnaHQ7XHJcbiAgICBpZiAoTWF0aDJELmlzRXF1YWxzKGFyZWEsIDApID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCwgdzogbnVtYmVyID0gMSwgaDogbnVtYmVyID0gMSk6IFJlY3RhbmdsZSB7XHJcbiAgICBsZXQgb3JpZ2luOiB2ZWMyID0gbmV3IHZlYzIoeCwgeSk7XHJcbiAgICBsZXQgc2l6ZTogU2l6ZSA9IG5ldyBTaXplKHcsIGgpO1xyXG4gICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUob3JpZ2luLCBzaXplKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbnNldCB7XHJcbiAgcHVibGljIHZhbHVlczogRmxvYXQzMkFycmF5O1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IobDogbnVtYmVyID0gMCwgdDogbnVtYmVyID0gMCwgcjogbnVtYmVyID0gMCwgYjogbnVtYmVyID0gMCkge1xyXG4gICAgdGhpcy52YWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KFtsLCB0LCByLCBiXSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGxlZnRNYXJnaW4oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnZhbHVlc1swXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgbGVmdE1hcmdpbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnZhbHVlc1swXSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0b3BNYXJnaW4oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnZhbHVlc1sxXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgdG9wTWFyZ2luKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMudmFsdWVzWzFdID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHJpZ2h0TWFyZ2luKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXNbMl07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHJpZ2h0TWFyZ2luKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMudmFsdWVzWzJdID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGJvdHRvbU1hcmdpbigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsdWVzWzNdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBib3R0b21NYXJnaW4odmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy52YWx1ZXNbM10gPSB2YWx1ZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm0yRCB7XHJcbiAgcHVibGljIHBvc2l0aW9uOiB2ZWMyO1xyXG4gIHB1YmxpYyByb3RhdGlvbjogbnVtYmVyO1xyXG4gIHB1YmxpYyBzY2FsZTogdmVjMjtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDAsIHJvdGF0aW9uOiBudW1iZXIgPSAwLCBzY2FsZVg6IG51bWJlciA9IDEsIHNjYWxlWTogbnVtYmVyID0gMSkge1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyB2ZWMyKHgsIHkpO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uO1xyXG4gICAgdGhpcy5zY2FsZSA9IG5ldyB2ZWMyKHNjYWxlWCwgc2NhbGVZKTtcclxuICB9XHJcblxyXG4gIC8vIOagueaNrnBvc2l0aW9u44CBcm90YXRpb27jgIFzY2FsZeiuvue9ruagiOmhtueahOefqemYteW5tui/lOWbnuagiOmhtuefqemYtVxyXG4gIHB1YmxpYyB0b01hdHJpeCgpOiBtYXQyZCB7XHJcbiAgICBNYXRoMkQubWF0U3RhY2subG9hZElkZW50aXR5KCk7IC8vIOWFiOaKiuagiOmhtueahOefqemYteW9kuS4gOWMllxyXG4gICAgTWF0aDJELm1hdFN0YWNrLnRyYW5zbGF0ZSh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XHJcbiAgICBNYXRoMkQubWF0U3RhY2sucm90YXRlKHRoaXMucm90YXRpb24sIGZhbHNlKTtcclxuICAgIE1hdGgyRC5tYXRTdGFjay5zY2FsZSh0aGlzLnNjYWxlLngsIHRoaXMuc2NhbGUueSk7XHJcbiAgICByZXR1cm4gTWF0aDJELm1hdFN0YWNrLm1hdHJpeDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b0ludk1hdHJpeChyZXN1bHQ6IG1hdDJkKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgbWF0OiBtYXQyZCA9IHRoaXMudG9NYXRyaXgoKTtcclxuICAgIHJldHVybiBtYXQyZC5pbnZlcnQobWF0LCByZXN1bHQpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJlemllckVudW1lcmF0b3IgZXh0ZW5kcyBJRW51bWVyYXRvcjx2ZWMyPiB7XHJcbiAgc3RlcHM6IG51bWJlcjsgLy8gcHVibGljIOaAu+atpeaVsFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmV6aWVyRW51bWVyYXRvciBpbXBsZW1lbnRzIElCZXppZXJFbnVtZXJhdG9yIHtcclxuICBwcml2YXRlIF9zdGVwczogbnVtYmVyOyAvLyDmgLvmraXmlbBcclxuICBwcml2YXRlIF9pOiBudW1iZXI7IC8vIOatpemVv1xyXG4gIHByaXZhdGUgX3N0YXJ0QW5jaG9yUG9pbnQ6IHZlYzI7XHJcbiAgcHJpdmF0ZSBfZW5kQW5jaG9yUG9pbnQ6IHZlYzI7XHJcbiAgcHJpdmF0ZSBfY29udHJvbFBvaW50MDogdmVjMjtcclxuICBwcml2YXRlIF9jb250cm9sUG9pbnQxOiB2ZWMyIHwgbnVsbDtcclxuICBwcml2YXRlIF9jdXJyZW50SWR4OiBudW1iZXI7IC8vIOW9k+WJjeatpee0ouW8lVxyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3Ioc3RhcnQ6IHZlYzIsIGVuZDogdmVjMiwgY29udHJvbDA6IHZlYzIsIGNvbnRyb2wxOiB2ZWMyIHwgbnVsbCA9IG51bGwsIHN0ZXBzOiBudW1iZXIgPSAzMCkge1xyXG4gICAgdGhpcy5fc3RhcnRBbmNob3JQb2ludCA9IHN0YXJ0O1xyXG4gICAgdGhpcy5fZW5kQW5jaG9yUG9pbnQgPSBlbmQ7XHJcbiAgICB0aGlzLl9jb250cm9sUG9pbnQwID0gY29udHJvbDA7XHJcbiAgICBpZiAoY29udHJvbDEgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5fY29udHJvbFBvaW50MSA9IGNvbnRyb2wxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fY29udHJvbFBvaW50MSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zdGVwcyA9IHN0ZXBzO1xyXG4gICAgdGhpcy5faSA9IDEuMCAvICh0aGlzLl9zdGVwcyk7XHJcbiAgICB0aGlzLl9jdXJyZW50SWR4ID0gLTE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9jdXJyZW50SWR4ID0gLSAxO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBjdXJyZW50KCk6IHZlYzIge1xyXG4gICAgaWYgKHRoaXMuX2NvbnRyb2xQb2ludDEgIT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIE1hdGgyRC5nZXRDdWJpY0JlemllclZlY3Rvcih0aGlzLl9zdGFydEFuY2hvclBvaW50LCB0aGlzLl9jb250cm9sUG9pbnQwLCB0aGlzLl9jb250cm9sUG9pbnQxLCB0aGlzLl9lbmRBbmNob3JQb2ludCwgdGhpcy5fY3VycmVudElkeCAqIHRoaXMuX2kpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIE1hdGgyRC5nZXRRdWFkcmF0aWNCZXppZXJWZWN0b3IodGhpcy5fc3RhcnRBbmNob3JQb2ludCwgdGhpcy5fY29udHJvbFBvaW50MCwgdGhpcy5fZW5kQW5jaG9yUG9pbnQsIHRoaXMuX2N1cnJlbnRJZHggKiB0aGlzLl9pKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBtb3ZlTmV4dCgpOiBib29sZWFuIHtcclxuICAgIHRoaXMuX2N1cnJlbnRJZHgrKztcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50SWR4IDwgdGhpcy5fc3RlcHM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHN0ZXBzKCk6IG51bWJlciB7XHJcbiAgICB0aGlzLl9pID0gMS4wIC8gKHRoaXMuX3N0ZXBzKTtcclxuICAgIHJldHVybiB0aGlzLl9zdGVwcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgc3RlcHMoc3RlcHM6IG51bWJlcikge1xyXG4gICAgdGhpcy5fc3RlcHMgPSBzdGVwcztcclxuICAgIHRoaXMucmVzZXQoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBRdWFkcmF0aWNCZXppZXJFbnVtZXJhdG9yIGltcGxlbWVudHMgSUJlemllckVudW1lcmF0b3Ige1xyXG4gIHByaXZhdGUgX3N0ZXBzOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfaSAhOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfc3RhcnRBbmNob3JQb2ludDogdmVjMjtcclxuICBwcml2YXRlIF9lbmRBbmNob3JQb2ludDogdmVjMjtcclxuICBwcml2YXRlIF9jb250cm9sUG9pbnQwOiB2ZWMyO1xyXG4gIHByaXZhdGUgX2N1cnJlbnRJZHg6IG51bWJlcjtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHN0YXJ0OiB2ZWMyLCBlbmQ6IHZlYzIsIGNvbnRyb2wwOiB2ZWMyLCBzdGVwczogbnVtYmVyID0gMzApIHtcclxuICAgIHRoaXMuX3N0YXJ0QW5jaG9yUG9pbnQgPSBzdGFydDtcclxuICAgIHRoaXMuX2VuZEFuY2hvclBvaW50ID0gZW5kO1xyXG4gICAgdGhpcy5fY29udHJvbFBvaW50MCA9IGNvbnRyb2wwO1xyXG4gICAgdGhpcy5fc3RlcHMgPSBzdGVwcztcclxuICAgIHRoaXMuX2kgPSAxLjAgLyAodGhpcy5fc3RlcHMpO1xyXG4gICAgdGhpcy5fY3VycmVudElkeCA9IC0xO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fY3VycmVudElkeCA9IC0gMTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgY3VycmVudCgpOiB2ZWMyIHtcclxuICAgIGxldCB0OiBudW1iZXIgPSB0aGlzLl9jdXJyZW50SWR4ICogdGhpcy5faTtcclxuICAgIGxldCByZXQ6IHZlYzIgPSB2ZWMyLmNyZWF0ZSh0ICogdCwgdCk7XHJcbiAgICBNYXRoMkQudHJhbnNmb3JtKG1hdDJkLnF1YWRCZXppZXJCYXNpY01hdHJpeCwgcmV0LCByZXQpO1xyXG4gICAgcmV0LnggPSB0aGlzLl9zdGFydEFuY2hvclBvaW50LnggKiByZXQueCArIHRoaXMuX2NvbnRyb2xQb2ludDAueCAqIHJldC55ICsgdGhpcy5fZW5kQW5jaG9yUG9pbnQueDtcclxuICAgIHJldC55ID0gdGhpcy5fc3RhcnRBbmNob3JQb2ludC55ICogcmV0LnggKyB0aGlzLl9jb250cm9sUG9pbnQwLnkgKiByZXQueSArIHRoaXMuX2VuZEFuY2hvclBvaW50Lnk7XHJcbiAgICByZXR1cm4gcmV0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG1vdmVOZXh0KCk6IGJvb2xlYW4ge1xyXG4gICAgdGhpcy5fY3VycmVudElkeCsrO1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJZHggPCB0aGlzLl9zdGVwcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc3RlcHMoKTogbnVtYmVyIHtcclxuICAgIHRoaXMuX2kgPSAxLjAgLyAodGhpcy5fc3RlcHMpO1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0ZXBzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBzdGVwcyhzdGVwczogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9zdGVwcyA9IHN0ZXBzO1xyXG4gICAgdGhpcy5yZXNldCgpO1xyXG4gIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBtYXQyZCwgdmVjMiwgSW5zZXQgfSBmcm9tIFwiLi4vbWF0aDJkXCI7XHJcbmltcG9ydCB7IENhbnZhc01vdXNlRXZlbnQsIENhbnZhc0tleUJvYXJkRXZlbnQgfSBmcm9tIFwiLi4vYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgUmVjdCwgQ2lyY2xlLCBHcmlkLCBFbGxpcHNlLCBMaW5lLCBDb252ZXhQb2x5Z29uLCBTY2FsZTlHcmlkLCBCZXppZXJQYXRoLCBFbmRDbGlwU2hhcGUsIEVtcHR5U2hhcGUgfSBmcm9tIFwiLi9zaGFwZXNcIjtcclxuaW1wb3J0IHsgU3ByaXRlMkQgfSBmcm9tIFwiLi9zcHJpdGUyZFwiO1xyXG5cclxuZXhwb3J0IGVudW0gU2NlbmVNb2RlIHtcclxuICBTRUxFQ1QgPSAnc2VsZWN0JyxcclxuICBEUkFHID0gJ2RyYWcnXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE5vZGVUeXBlIHtcclxuICBUUkVFTk9ERSwgLy8gMFxyXG4gIFNQUklURSwgLy8gMVxyXG4gIENPTlRBSU5FUiwgLy8gMlxyXG4gIFBBTkVMUE9JTlQsIC8vIDNcclxuICBQQU5FTFJFQ1QsIC8vIDRcclxuICBMSU5LLCAvLyA1XHJcbiAgSE9SSVpPTlRBTEZMRVhMSU5LLCAvLyA2XHJcbiAgVkVSVElDQUxGTEVYTElOSyAvLyA3XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQm91bmRpbmcge1xyXG4gIHRvcDogbnVtYmVyLFxyXG4gIGJvdHRvbTogbnVtYmVyLFxyXG4gIGxlZnQ6IG51bWJlcixcclxuICByaWdodDogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVSZW5kZXJUeXBlIHtcclxuICBDVVNUT00sXHJcbiAgU1RST0tFLFxyXG4gIEZJTEwsXHJcbiAgU1RST0tFX0ZJTEwsXHJcbiAgQ0xJUFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUcmFuc2Zvcm1hYmxlIHtcclxuICB4OiBudW1iZXI7XHJcbiAgeTogbnVtYmVyO1xyXG5cclxuICByb3RhdGlvbjogbnVtYmVyO1xyXG5cclxuICBzY2FsZVg6IG51bWJlcjtcclxuICBzY2FsZVk6IG51bWJlcjtcclxuXHJcbiAgZ2V0V29ybGRNYXRyaXgoKTogbWF0MmQ7XHJcbiAgZ2V0V29ybGRNYXRyaXgyKCk6IG1hdDJkO1xyXG4gIGdldExvY2FsTWF0cml4KCk6IG1hdDJkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZW5kZXJTdGF0ZSB7XHJcbiAgaXNWaXNpYmxlOiBib29sZWFuO1xyXG4gIHNob3dDb29yZFN5c3RlbTogYm9vbGVhbjtcclxuICBsaW5lV2lkdGg6IG51bWJlcjtcclxuICBmaWxsU3R5bGU6IHN0cmluZyB8IENhbnZhc0dyYWRpZW50IHwgQ2FudmFzUGF0dGVybjtcclxuICBzdHJva2VTdHlsZTogc3RyaW5nIHwgQ2FudmFzR3JhZGllbnQgfCBDYW52YXNQYXR0ZXJuO1xyXG4gIHJlbmRlclR5cGU6IEVSZW5kZXJUeXBlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJSGl0dGFibGUge1xyXG4gIGhpdFRlc3QobG9jYWxQdDogdmVjMiwgdHJhbnNmb3JtOiBJVHJhbnNmb3JtYWJsZSk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURyYXdhYmxlIHtcclxuICBiZWdpbkRyYXcodHJhbnNmb3JtYWJsZTogSVRyYW5zZm9ybWFibGUsIHN0YXRlOiBJUmVuZGVyU3RhdGUsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQ7XHJcbiAgZHJhdyh0cmFuc2Zvcm1hYmxlOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGU6IElSZW5kZXJTdGF0ZSwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZDtcclxuICBlbmREcmF3KHRyYW5zZm9ybWFibGU6IElUcmFuc2Zvcm1hYmxlLCBzdGF0ZTogSVJlbmRlclN0YXRlLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaGFwZSBleHRlbmRzIElIaXR0YWJsZSwgSURyYXdhYmxlIHtcclxuICByZWFkb25seSB0eXBlOiBzdHJpbmc7XHJcbiAgZGF0YTogYW55O1xyXG4gIGdldEJvdW5kaW5nKCk6IEJvdW5kaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTcHJpdGVDb250YWluZXIge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBhZGRTcHJpdGUoc3ByaXRlOiBJU3ByaXRlKTogSVNwcml0ZUNvbnRhaW5lcjtcclxuICByZW1vdmVTcHJpdGUoc3ByaXRlOiBJU3ByaXRlKTogYm9vbGVhbjtcclxuICByZW1vdmVBbGwoaW5jbHVkZVRoaXM6IGJvb2xlYW4pOiB2b2lkO1xyXG4gIGdldFNwcml0ZUluZGV4KHNwcml0ZTogSVNwcml0ZSk6IG51bWJlcjtcclxuICBnZXRTcHJpdGUoaWR4OiBudW1iZXIpOiBJU3ByaXRlO1xyXG4gIGdldFNwcml0ZUNvdW50KCk6IG51bWJlcjtcclxuICBnZXRQYXJlbnRTcHJpdGUoKTogSVNwcml0ZSB8IHVuZGVmaW5lZDtcclxuICByZWFkb25seSBzcHJpdGU6IElTcHJpdGUgfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVPcmRlciB7XHJcbiAgUFJFT1JERVIsXHJcbiAgUE9TVE9SREVSXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFVwZGF0ZUV2ZW50SGFuZGxlciA9ICgoc3ByOiBJU3ByaXRlLCBtZXNjOiBudW1iZXIsIGRpZmZTZWM6IG51bWJlciwgdHJhdmVsT3JkZXI6IEVPcmRlcikgPT4gdm9pZCk7XHJcbmV4cG9ydCB0eXBlIE1vdXNlRXZlbnRIYW5kbGVyID0gKChzcHI6IElTcHJpdGUsIGV2dDogQ2FudmFzTW91c2VFdmVudCkgPT4gdm9pZCk7XHJcbmV4cG9ydCB0eXBlIEtleWJvYXJkRXZlbnRIYW5kbGVyID0gKChzcHI6IElTcHJpdGUsIGV2dDogQ2FudmFzS2V5Qm9hcmRFdmVudCkgPT4gdm9pZCk7XHJcbmV4cG9ydCB0eXBlIFJlbmRlckV2ZW50SGFuZGxlciA9IChzcHI6IElTcHJpdGUsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgcmVuZGVyT3JlZGVyOiBFT3JkZXIpID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTcHJpdGUgZXh0ZW5kcyBJVHJhbnNmb3JtYWJsZSwgSVJlbmRlclN0YXRlIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgc2hhcGU6IElTaGFwZTtcclxuICBvd25lcjogSVNwcml0ZUNvbnRhaW5lcjtcclxuICBkYXRhOiBhbnk7XHJcblxyXG4gIGhpdFRlc3QobG9jYWxQdDogdmVjMik6IGJvb2xlYW47XHJcbiAgdXBkYXRlKG1lc2M6IG51bWJlciwgZGlmZjogbnVtYmVyLCBvcmRlcjogRU9yZGVyKTogdm9pZDtcclxuICBkcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQ7XHJcblxyXG4gIG1vdXNlRXZlbnQ6IE1vdXNlRXZlbnRIYW5kbGVyIHwgbnVsbDtcclxuICBrZXlFdmVudDogS2V5Ym9hcmRFdmVudEhhbmRsZXIgfCBudWxsO1xyXG4gIHVwZGF0ZUV2ZW50OiBVcGRhdGVFdmVudEhhbmRsZXIgfCBudWxsO1xyXG4gIHJlbmRlckV2ZW50OiBSZW5kZXJFdmVudEhhbmRsZXIgfCBudWxsO1xyXG5cclxuICBpc1NlbGVjdGVkOiBib29sZWFuO1xyXG4gIGlzRHJhZ2dpbmc6IGJvb2xlYW47XHJcbiAgaXNIb3ZlcmluZzogYm9vbGVhbjtcclxuICBkaWZmWDogbnVtYmVyO1xyXG4gIGRpZmZZOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURpc3BhdGNoZXIge1xyXG4gIGNvbnRhaW5lcjogSVNwcml0ZUNvbnRhaW5lcjtcclxuICByZWFkb25seSBkcmFnU3ByaXRlOiBJU3ByaXRlIHwgdW5kZWZpbmVkXHJcbiAgcmVhZG9ubHkgaGl0U3ByaXRlOiBJU3ByaXRlIHwgdW5kZWZpbmVkXHJcbiAgZGlzcGF0Y2hVcGRhdGUobXNlYzogbnVtYmVyLCBkaWZmU2VjOiBudW1iZXIpOiB2b2lkO1xyXG4gIGRpc3BhdGNoRHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkO1xyXG4gIGRpc3BhdGNoTW91c2VFdmVudChldnQ6IENhbnZhc01vdXNlRXZlbnQpOiB2b2lkO1xyXG4gIGRpc3BhdGNoS2V5RXZlbnQoZXZ0OiBDYW52YXNLZXlCb2FyZEV2ZW50KTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNwcml0ZUZhY3Rvcnkge1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZUdyaWQodzogbnVtYmVyLCBoOiBudW1iZXIsIHhTdGVwOiBudW1iZXIgPSAxMCwgeVN0ZXA6IG51bWJlciA9IDEwKTogSVNoYXBlIHtcclxuICAgIHJldHVybiBuZXcgR3JpZCh3LCBoLCB4U3RlcCwgeVN0ZXApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBjcmVhdGVDaXJjbGUocmFkaXVzOiBudW1iZXIpOiBJU2hhcGUge1xyXG4gICAgcmV0dXJuIG5ldyBDaXJjbGUocmFkaXVzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlUmVjdCh3OiBudW1iZXIsIGg6IG51bWJlciwgdTogbnVtYmVyID0gMCwgdjogbnVtYmVyID0gMCk6IElTaGFwZSB7XHJcbiAgICByZXR1cm4gbmV3IFJlY3QodywgaCwgdSwgdik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZUVsbGlwc2UocmFkaXVzWDogbnVtYmVyLCByYWRpdXNZOiBudW1iZXIpOiBJU2hhcGUge1xyXG4gICAgcmV0dXJuIG5ldyBFbGxpcHNlKHJhZGl1c1gsIHJhZGl1c1kpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBjcmVhdGVQb2x5Z29uKHBvaW50czogdmVjMltdKTogSVNoYXBlIHtcclxuICAgIGlmIChwb2ludHMubGVuZ3RoIDwgMykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCLlpJrovrnlvaLpobbngrnmlbDph4/lv4XpobvlpKfkuo7miJbnrYnkuo4zISEhXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBDb252ZXhQb2x5Z29uKHBvaW50cyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZVNjYWxlOUdyaWQoZGF0YTogU2NhbGU5RGF0YSwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHU6IG51bWJlciA9IDAsIHY6IG51bWJlciA9IDApOiBJU2hhcGUge1xyXG4gICAgcmV0dXJuIG5ldyBTY2FsZTlHcmlkKGRhdGEsIHdpZHRoLCBoZWlnaHQsIHUsIHYpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBjcmVhdGVMaW5lKHN0YXJ0OiB2ZWMyLCBlbmQ6IHZlYzIpOiBJU2hhcGUge1xyXG4gICAgbGV0IGxpbmU6IExpbmUgPSBuZXcgTGluZSgpO1xyXG4gICAgbGluZS5zdGFydCA9IHN0YXJ0O1xyXG4gICAgbGluZS5lbmQgPSBlbmQ7XHJcbiAgICByZXR1cm4gbGluZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlWExpbmUobGVuOiBudW1iZXIgPSAxMCwgdDogbnVtYmVyID0gMCk6IElTaGFwZSB7XHJcbiAgICByZXR1cm4gbmV3IExpbmUobGVuLCB0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlQmV6aWVyUGF0aChwb2ludHM6IHZlYzJbXSwgaXNDdWJpYzogYm9vbGVhbiA9IGZhbHNlKTogSVNoYXBlIHtcclxuICAgIHJldHVybiBuZXcgQmV6aWVyUGF0aChwb2ludHMsIGlzQ3ViaWMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBlbmRDTGlwU2hhcGU6IElTaGFwZSA9IG5ldyBFbmRDbGlwU2hhcGUoKTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBlbXB0eVNoYXBlOiBJU2hhcGUgPSBuZXcgRW1wdHlTaGFwZSgpO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNsaXBTcHJpdGUoKTogSVNwcml0ZSB7XHJcbiAgICBsZXQgc3ByOiBJU3ByaXRlID0gbmV3IFNwcml0ZTJEKFNwcml0ZUZhY3RvcnkuZW5kQ0xpcFNoYXBlLCAnY2xpcFNwcml0ZScpO1xyXG4gICAgc3ByLnJlbmRlclR5cGUgPSBFUmVuZGVyVHlwZS5DTElQO1xyXG4gICAgcmV0dXJuIHNwcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlU3ByaXRlKHNoYXBlOiBJU2hhcGUsIG5hbWU6IHN0cmluZyA9ICcnKTogSVNwcml0ZSB7XHJcbiAgICBsZXQgc3ByOiBJU3ByaXRlID0gbmV3IFNwcml0ZTJEKHNoYXBlLCBuYW1lKTtcclxuICAgIHJldHVybiBzcHI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZUlTcHJpdGUoc2hhcGU6IElTaGFwZSwgeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCwgcm90YXRpb246IG51bWJlciA9IDAsIHNjYWxlWDogbnVtYmVyID0gMS4wLCBzY2FsZVk6IG51bWJlciA9IDEuMCwgbmFtZTogc3RyaW5nID0gJycpOiBJU3ByaXRlIHtcclxuICAgIGxldCBzcHI6IElTcHJpdGUgPSBuZXcgU3ByaXRlMkQoc2hhcGUsIG5hbWUpO1xyXG4gICAgc3ByLnggPSB4O1xyXG4gICAgc3ByLnkgPSB5O1xyXG4gICAgc3ByLnJvdGF0aW9uID0gcm90YXRpb247XHJcbiAgICBzcHIuc2NhbGVYID0gc2NhbGVYO1xyXG4gICAgc3ByLnNjYWxlWSA9IHNjYWxlWTtcclxuICAgIHJldHVybiBzcHI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBFSW1hZ2VGaWxsVHlwZSB7XHJcbiAgTk9ORSxcclxuICBTVFJFVENILFxyXG4gIFJFUEVBVCxcclxuICBSRVBFQVRfWCxcclxuICBSRVBFQVRfWVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2NhbGU5RGF0YSB7XHJcbiAgcHVibGljIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gIHByaXZhdGUgX2luc2V0OiBJbnNldDtcclxuXHJcbiAgcHVibGljIHNldCBpbnNldCh2YWx1ZTogSW5zZXQpIHtcclxuICAgIHRoaXMuX2luc2V0ID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGxlZnRNYXJnaW4oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnNldC5sZWZ0TWFyZ2luO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCByaWdodE1hcmdpbigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luc2V0LnJpZ2h0TWFyZ2luO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0b3BNYXJnaW4oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnNldC50b3BNYXJnaW47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGJvdHRvbU1hcmdpbigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luc2V0LmJvdHRvbU1hcmdpbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihpbWFnZTogSFRNTEltYWdlRWxlbWVudCwgaW5zZXQ6IEluc2V0KSB7XHJcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7XHJcbiAgICB0aGlzLl9pbnNldCA9IGluc2V0O1xyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7IElTaGFwZSwgRVJlbmRlclR5cGUsIElUcmFuc2Zvcm1hYmxlLCBJUmVuZGVyU3RhdGUsIFNjYWxlOURhdGEsIEVJbWFnZUZpbGxUeXBlLCBCb3VuZGluZyB9IGZyb20gXCIuL2ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBtYXQyZCwgTWF0aDJELCB2ZWMyLCBSZWN0YW5nbGUsIFNpemUgfSBmcm9tIFwiLi4vbWF0aDJkXCJcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2hhcGUyRCBpbXBsZW1lbnRzIElTaGFwZSB7XHJcbiAgcHVibGljIGF4aXNYU3R5bGU6IHN0cmluZyB8IENhbnZhc0dyYWRpZW50IHwgQ2FudmFzUGF0dGVybjtcclxuICBwdWJsaWMgYXhpc1lTdHlsZTogc3RyaW5nIHwgQ2FudmFzR3JhZGllbnQgfCBDYW52YXNQYXR0ZXJuO1xyXG4gIHB1YmxpYyBheGlzTGluZVdpZHRoOiBudW1iZXI7XHJcbiAgcHVibGljIGF4aXNMZW5ndGg6IG51bWJlcjtcclxuICBwdWJsaWMgZGF0YTogYW55O1xyXG5cclxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0IHR5cGUoKTogc3RyaW5nO1xyXG4gIHB1YmxpYyBhYnN0cmFjdCBoaXRUZXN0KGxvY2FsUHQ6IHZlYzIsIHRyYW5zZm9ybTogSVRyYW5zZm9ybWFibGUpOiBib29sZWFuO1xyXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXRCb3VuZGluZygpOiBCb3VuZGluZzsgLy8g6L+U5Zue5b2T5YmNc2hhcGXnmoTovrnnlYzvvIznm7jlr7nkuo7lsYDpg6jlnZDmoIfljp/ngrlcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5heGlzWFN0eWxlID0gXCJyZ2JhKCAyNTUgLCAwICwgMCAsIDEyOCApIFwiO1xyXG4gICAgdGhpcy5heGlzWVN0eWxlID0gXCJyZ2JhKCAwICwgMjU1ICwgMCAsIDEyOCApIFwiO1xyXG4gICAgdGhpcy5heGlzTGluZVdpZHRoID0gMTtcclxuICAgIHRoaXMuYXhpc0xlbmd0aCA9IDEwMDtcclxuICAgIHRoaXMuZGF0YSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBkcmF3TGluZShjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgc3R5bGU6IHN0cmluZyB8IENhbnZhc0dyYWRpZW50IHwgQ2FudmFzUGF0dGVybiwgaXNBeGlzWDogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgIGN0eC5zYXZlKCk7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHlsZTtcclxuICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLmF4aXNMaW5lV2lkdGg7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgubW92ZVRvKDAsIDApO1xyXG4gICAgaWYgKGlzQXhpc1gpIHtcclxuICAgICAgY3R4LmxpbmVUbyh0aGlzLmF4aXNMZW5ndGgsIDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3R4LmxpbmVUbygwLCB0aGlzLmF4aXNMZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgY3R4LnJlc3RvcmUoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBiZWdpbkRyYXcodHJhbnNmb3JtYWJsZTogSVRyYW5zZm9ybWFibGUsIHN0YXRlOiBJUmVuZGVyU3RhdGUsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgY29udGV4dC5zYXZlKCk7XHJcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IHN0YXRlLmxpbmVXaWR0aDtcclxuICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdGF0ZS5zdHJva2VTdHlsZTtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gc3RhdGUuZmlsbFN0eWxlO1xyXG4gICAgbGV0IG1hdDogbWF0MmQgPSB0cmFuc2Zvcm1hYmxlLmdldFdvcmxkTWF0cml4KCk7XHJcbiAgICBjb250ZXh0LnNldFRyYW5zZm9ybShtYXQudmFsdWVzWzBdLCBtYXQudmFsdWVzWzFdLCBtYXQudmFsdWVzWzJdLCBtYXQudmFsdWVzWzNdLCBtYXQudmFsdWVzWzRdLCBtYXQudmFsdWVzWzVdKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkcmF3KHRyYW5zZm9ybWFibGU6IElUcmFuc2Zvcm1hYmxlLCBzdGF0ZTogSVJlbmRlclN0YXRlLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgIGlmIChzdGF0ZS5yZW5kZXJUeXBlID09PSBFUmVuZGVyVHlwZS5TVFJPS0UpIHtcclxuICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgIH0gZWxzZSBpZiAoc3RhdGUucmVuZGVyVHlwZSA9PT0gRVJlbmRlclR5cGUuRklMTCkge1xyXG4gICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgIH0gZWxzZSBpZiAoc3RhdGUucmVuZGVyVHlwZSA9PT0gRVJlbmRlclR5cGUuU1RST0tFX0ZJTEwpIHtcclxuICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlLnJlbmRlclR5cGUgPT09IEVSZW5kZXJUeXBlLkNMSVApIHtcclxuICAgICAgY29udGV4dC5jbGlwKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZW5kRHJhdyh0cmFuc2Zvcm1hYmxlOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGU6IElSZW5kZXJTdGF0ZSwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICBpZiAoc3RhdGUucmVuZGVyVHlwZSAhPT0gRVJlbmRlclR5cGUuQ0xJUCkge1xyXG4gICAgICBpZiAoc3RhdGUuc2hvd0Nvb3JkU3lzdGVtKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3TGluZShjb250ZXh0LCB0aGlzLmF4aXNYU3R5bGUsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuZHJhd0xpbmUoY29udGV4dCwgdGhpcy5heGlzWVN0eWxlLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgICAgY29udGV4dC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2lyY2xlIGV4dGVuZHMgQmFzZVNoYXBlMkQge1xyXG4gIHB1YmxpYyByYWRpdXM6IG51bWJlcjtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHJhZGl1czogbnVtYmVyID0gMSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xyXG4gIH1cclxuICBwdWJsaWMgaGl0VGVzdChsb2NhbFB0OiB2ZWMyLCB0cmFuc2Zvcm06IElUcmFuc2Zvcm1hYmxlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gTWF0aDJELmlzUG9pbnRJbkNpcmNsZShsb2NhbFB0LCB2ZWMyLmNyZWF0ZSgwLCAwKSwgdGhpcy5yYWRpdXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEJvdW5kaW5nKCk6IEJvdW5kaW5nIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRvcDogLXRoaXMucmFkaXVzLFxyXG4gICAgICBib3R0b206IHRoaXMucmFkaXVzLFxyXG4gICAgICBsZWZ0OiAtdGhpcy5yYWRpdXMsXHJcbiAgICAgIHJpZ2h0OiB0aGlzLnJhZGl1c1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGRyYXcodHJhbnNmb3JtYWJsZTogSVRyYW5zZm9ybWFibGUsIHN0YXRlOiBJUmVuZGVyU3RhdGUsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwpOiB2b2lkIHtcclxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICBjb250ZXh0LmFyYygwLCAwLCB0aGlzLnJhZGl1cywgMC4wLCBNYXRoLlBJICogMi4wLCB0cnVlKTtcclxuICAgIHN1cGVyLmRyYXcodHJhbnNmb3JtYWJsZSwgc3RhdGUsIGNvbnRleHQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gXCJDaXJjbGVcIjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbGxpcHNlIGV4dGVuZHMgQmFzZVNoYXBlMkQge1xyXG4gIHB1YmxpYyByYWRpdXNYOiBudW1iZXI7XHJcbiAgcHVibGljIHJhZGl1c1k6IG51bWJlcjtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocmFkaXVzWDogbnVtYmVyID0gMTAsIHJhZGl1c1k6IG51bWJlciA9IDEwKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5yYWRpdXNYID0gcmFkaXVzWDtcclxuICAgIHRoaXMucmFkaXVzWSA9IHJhZGl1c1k7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGl0VGVzdChsb2NhbFB0OiB2ZWMyLCB0cmFuc2Zvcm06IElUcmFuc2Zvcm1hYmxlKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaXNIaXR0ZWQ6IGJvb2xlYW4gPSBNYXRoMkQuaXNQb2ludEluRWxsaXBzZShsb2NhbFB0LngsIGxvY2FsUHQueSwgMCwgMCwgdGhpcy5yYWRpdXNYLCB0aGlzLnJhZGl1c1kpO1xyXG4gICAgcmV0dXJuIGlzSGl0dGVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEJvdW5kaW5nKCk6IEJvdW5kaW5nIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgYm90dG9tOiAwLFxyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICByaWdodDogMFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGRyYXcodHJhbnNmb3JtOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGU6IElSZW5kZXJTdGF0ZSwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgY29udGV4dC5lbGxpcHNlKDAsIDAsIHRoaXMucmFkaXVzWCwgdGhpcy5yYWRpdXNZLCAwLCAwLCBNYXRoLlBJICogMik7XHJcbiAgICBzdXBlci5kcmF3KHRyYW5zZm9ybSwgc3RhdGUsIGNvbnRleHQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gXCJFbGxpcHNlXCI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udmV4UG9seWdvbiBleHRlbmRzIEJhc2VTaGFwZTJEIHtcclxuICBwdWJsaWMgcG9pbnRzOiB2ZWMyW107XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwb2ludHM6IHZlYzJbXSkge1xyXG4gICAgaWYgKHBvaW50cy5sZW5ndGggPCAzKSB7XHJcbiAgICAgIGFsZXJ0KFwi5aSa6L655b2i6aG254K55b+F6aG75aSn5LqOM+aIluetieS6jjMhIVwiKVxyXG4gICAgICBuZXcgRXJyb3IoXCLlpJrovrnlvaLpobbngrnlv4XpobvlpKfkuo4z5oiW562J5LqOMyEhXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKE1hdGgyRC5pc0NvbnZleChwb2ludHMpID09PSBmYWxzZSkge1xyXG4gICAgICBhbGVydChcIuW9k+WJjeWkmui+ueW9ouS4jeaYr+WHuOWkmui+ueW9oiEhXCIpO1xyXG4gICAgICBuZXcgRXJyb3IoXCLlvZPliY3lpJrovrnlvaLkuI3mmK/lh7jlpJrovrnlvaIhIVwiKTtcclxuICAgIH1cclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnBvaW50cyA9IHBvaW50cztcclxuXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGl0VGVzdChsb2NhbFB0OiB2ZWMyLCB0cmFuc2Zvcm06IElUcmFuc2Zvcm1hYmxlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gTWF0aDJELmlzUG9pbnRJblBvbHlnb24obG9jYWxQdCwgdGhpcy5wb2ludHMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEJvdW5kaW5nKCk6IEJvdW5kaW5nIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgYm90dG9tOiAwLFxyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICByaWdodDogMFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGRyYXcodHJhbnNmb3JtYWJsZTogSVRyYW5zZm9ybWFibGUsIHN0YXRlOiBJUmVuZGVyU3RhdGUsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGNvbnRleHQubW92ZVRvKHRoaXMucG9pbnRzWzBdLngsIHRoaXMucG9pbnRzWzBdLnkpO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLnBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb250ZXh0LmxpbmVUbyh0aGlzLnBvaW50c1tpXS54LCB0aGlzLnBvaW50c1tpXS55KTtcclxuICAgIH1cclxuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICBzdXBlci5kcmF3KHRyYW5zZm9ybWFibGUsIHN0YXRlLCBjb250ZXh0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFwiUG9seWdvblwiO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlY3QgZXh0ZW5kcyBCYXNlU2hhcGUyRCB7XHJcbiAgcHVibGljIHdpZHRoOiBudW1iZXI7XHJcbiAgcHVibGljIGhlaWdodDogbnVtYmVyO1xyXG4gIHB1YmxpYyB4OiBudW1iZXI7XHJcbiAgcHVibGljIHk6IG51bWJlcjtcclxuXHJcbiAgcHVibGljIGdldCByaWdodCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGJvdHRvbSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMueSArIHRoaXMuaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHc6IG51bWJlciA9IDEsIGg6IG51bWJlciA9IDEsIHU6IG51bWJlciA9IDAsIHY6IG51bWJlciA9IDApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLndpZHRoID0gdztcclxuICAgIHRoaXMuaGVpZ2h0ID0gaDtcclxuICAgIHRoaXMueCA9IC0gdGhpcy53aWR0aCAqIHU7XHJcbiAgICB0aGlzLnkgPSAtIHRoaXMuaGVpZ2h0ICogdjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFwiUmVjdFwiO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhpdFRlc3QobG9jYWxQdDogdmVjMiwgdHJhbnNmb3JtOiBJVHJhbnNmb3JtYWJsZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIE1hdGgyRC5pc1BvaW50SW5SZWN0KGxvY2FsUHQueCwgbG9jYWxQdC55LCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEJvdW5kaW5nKCk6IEJvdW5kaW5nIHtcclxuICAgIGxldCB0b3AgPSB0aGlzLnlcclxuICAgIGxldCBib3R0b20gPSB0aGlzLnkgKyB0aGlzLmhlaWdodFxyXG4gICAgbGV0IGxlZnQgPSB0aGlzLnhcclxuICAgIGxldCByaWdodCA9IHRoaXMueCArIHRoaXMud2lkdGhcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRvcCxcclxuICAgICAgYm90dG9tLFxyXG4gICAgICBsZWZ0LFxyXG4gICAgICByaWdodFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGRyYXcodHJhbnNmb3JtYWJsZTogSVRyYW5zZm9ybWFibGUsIHN0YXRlOiBJUmVuZGVyU3RhdGUsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGNvbnRleHQubW92ZVRvKHRoaXMueCwgdGhpcy55KTtcclxuICAgIGNvbnRleHQubGluZVRvKHRoaXMueCArIHRoaXMud2lkdGgsIHRoaXMueSk7XHJcbiAgICBjb250ZXh0LmxpbmVUbyh0aGlzLnggKyB0aGlzLndpZHRoLCB0aGlzLnkgKyB0aGlzLmhlaWdodCk7XHJcbiAgICBjb250ZXh0LmxpbmVUbyh0aGlzLngsIHRoaXMueSArIHRoaXMuaGVpZ2h0KTtcclxuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICBzdXBlci5kcmF3KHRyYW5zZm9ybWFibGUsIHN0YXRlLCBjb250ZXh0KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHcmlkIGV4dGVuZHMgUmVjdCB7XHJcbiAgcHVibGljIHhTdGVwOiBudW1iZXI7XHJcbiAgcHVibGljIHlTdGVwOiBudW1iZXI7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih3OiBudW1iZXIgPSAxMCwgaDogbnVtYmVyID0gMTAsIHhTdGVwOiBudW1iZXIgPSAxMCwgeVN0ZXA6IG51bWJlciA9IDEwKSB7XHJcbiAgICBzdXBlcih3LCBoLCAwLCAwKTtcclxuICAgIHRoaXMueFN0ZXAgPSB4U3RlcDtcclxuICAgIHRoaXMueVN0ZXAgPSB5U3RlcDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkcmF3KHRyYW5zZm9ybWFibGU6IElUcmFuc2Zvcm1hYmxlLCBzdGF0ZTogSVJlbmRlclN0YXRlLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgIHN0YXRlLnJlbmRlclR5cGUgPSBFUmVuZGVyVHlwZS5DVVNUT007XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgZm9yIChsZXQgaSA9IHRoaXMueFN0ZXAgKyAwLjU7IGkgPCB0aGlzLndpZHRoOyBpICs9IHRoaXMueFN0ZXApIHtcclxuICAgICAgY29udGV4dC5tb3ZlVG8oaSwgMCk7XHJcbiAgICAgIGNvbnRleHQubGluZVRvKGksIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcblxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGZvciAobGV0IGkgPSB0aGlzLnlTdGVwICsgMC41OyBpIDwgdGhpcy5oZWlnaHQ7IGkgKz0gdGhpcy55U3RlcCkge1xyXG4gICAgICBjb250ZXh0Lm1vdmVUbygwLCBpKTtcclxuICAgICAgY29udGV4dC5saW5lVG8odGhpcy53aWR0aCwgaSk7XHJcbiAgICB9XHJcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gXCJHcmlkXCI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmV6aWVyUGF0aCBleHRlbmRzIEJhc2VTaGFwZTJEIHtcclxuICBwdWJsaWMgcG9pbnRzOiB2ZWMyW107XHJcbiAgcHVibGljIGlzQ3ViaWM6IGJvb2xlYW47XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwb2ludHM6IHZlYzJbXSwgaXNDdWJpYzogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5wb2ludHMgPSBwb2ludHM7XHJcbiAgICB0aGlzLmlzQ3ViaWMgPSBpc0N1YmljO1xyXG4gICAgdGhpcy5kYXRhID0gcG9pbnRzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gXCJCZXppZXJQYXRoXCI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGl0VGVzdChsb2NhbFB0OiB2ZWMyLCB0cmFuc2Zvcm06IElUcmFuc2Zvcm1hYmxlKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICBwdWJsaWMgZ2V0Qm91bmRpbmcoKTogQm91bmRpbmcge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBib3R0b206IDAsXHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHJpZ2h0OiAwXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHJhdyh0cmFuc2Zvcm1hYmxlOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGU6IElSZW5kZXJTdGF0ZSwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgY29udGV4dC5tb3ZlVG8odGhpcy5wb2ludHNbMF0ueCwgdGhpcy5wb2ludHNbMF0ueSk7XHJcbiAgICBpZiAodGhpcy5pc0N1YmljKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5wb2ludHMubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8odGhpcy5wb2ludHNbaV0ueCxcclxuICAgICAgICAgIHRoaXMucG9pbnRzW2ldLnksXHJcbiAgICAgICAgICB0aGlzLnBvaW50c1tpICsgMV0ueCxcclxuICAgICAgICAgIHRoaXMucG9pbnRzW2kgKyAxXS55LFxyXG4gICAgICAgICAgdGhpcy5wb2ludHNbaSArIDJdLngsXHJcbiAgICAgICAgICB0aGlzLnBvaW50c1tpICsgMl0ueSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPCB0aGlzLnBvaW50cy5sZW5ndGg7IGkgKz0gMikge1xyXG4gICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyh0aGlzLnBvaW50c1tpXS54LFxyXG4gICAgICAgICAgdGhpcy5wb2ludHNbaV0ueSxcclxuICAgICAgICAgIHRoaXMucG9pbnRzW2kgKyAxXS54LFxyXG4gICAgICAgICAgdGhpcy5wb2ludHNbaSArIDFdLnkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzdXBlci5kcmF3KHRyYW5zZm9ybWFibGUsIHN0YXRlLCBjb250ZXh0KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lIGltcGxlbWVudHMgSVNoYXBlIHtcclxuICBwdWJsaWMgc3RhcnQ6IHZlYzI7XHJcbiAgcHVibGljIGVuZDogdmVjMjtcclxuICBwdWJsaWMgZGF0YTogYW55O1xyXG5cclxuICAvLyBsZW7kuLrnur/nmoTplb/luqbjgILnur/lj6rkvJrkvY3kuo546L205LiK77yM6LW354K56buY6K6k5Li65Z2Q5qCH5Y6f54K577yM57uI54K56buY6K6k5ZyoeOi9tOato+aWueWQkVxyXG4gIC8vIHTkuLrnur/nmoTotbfngrnnu4jngrnnm7jlr7nkuo556L2055qE5YGP56e76YePXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKGxlbjogbnVtYmVyID0gMTAsIHQ6IG51bWJlciA9IDApIHtcclxuICAgIGlmICh0IDwgMC4wIHx8IHQgPiAxLjApIHtcclxuICAgICAgYWxlcnQoXCLlj4LmlbB05b+F6aG75aSE5LqOIFsgMCAsIDEgXeS5i+mXtCEhXCIpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCLlj4LmlbB05b+F6aG75aSE5LqOIFsgMCAsIDEgXeS5i+mXtCEhXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdGFydCA9IHZlYzIuY3JlYXRlKC0gbGVuICogdCwgMCk7XHJcbiAgICB0aGlzLmVuZCA9IHZlYzIuY3JlYXRlKGxlbiAqICgxLjAgLSB0KSwgMCk7XHJcbiAgICB0aGlzLmRhdGEgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGl0VGVzdChsb2NhbFB0OiB2ZWMyLCB0cmFuc2Zvcm06IElUcmFuc2Zvcm1hYmxlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gTWF0aDJELmlzUG9pbnRPbkxpbmVTZWdtZW50KGxvY2FsUHQsIHRoaXMuc3RhcnQsIHRoaXMuZW5kKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRCb3VuZGluZygpOiBCb3VuZGluZyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIGJvdHRvbTogMCxcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgcmlnaHQ6IDBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBiZWdpbkRyYXcodHJhbnNmb3JtYWJsZTogSVRyYW5zZm9ybWFibGUsIHN0YXRlOiBJUmVuZGVyU3RhdGUsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgY29udGV4dC5zYXZlKCk7XHJcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IHN0YXRlLmxpbmVXaWR0aDtcclxuICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdGF0ZS5zdHJva2VTdHlsZTtcclxuICAgIGxldCBtYXQ6IG1hdDJkID0gdHJhbnNmb3JtYWJsZS5nZXRXb3JsZE1hdHJpeCgpO1xyXG4gICAgY29udGV4dC5zZXRUcmFuc2Zvcm0obWF0LnZhbHVlc1swXSwgbWF0LnZhbHVlc1sxXSwgbWF0LnZhbHVlc1syXSwgbWF0LnZhbHVlc1szXSwgbWF0LnZhbHVlc1s0XSwgbWF0LnZhbHVlc1s1XSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHJhdyh0cmFuc2Zvcm1hYmxlOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGU6IElSZW5kZXJTdGF0ZSwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICBzdGF0ZS5yZW5kZXJUeXBlID0gRVJlbmRlclR5cGUuU1RST0tFO1xyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGNvbnRleHQubW92ZVRvKHRoaXMuc3RhcnQueCwgdGhpcy5zdGFydC55KTtcclxuICAgIGNvbnRleHQubGluZVRvKHRoaXMuZW5kLngsIHRoaXMuZW5kLnkpO1xyXG4gICAgY29udGV4dC5zdHJva2UoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBlbmREcmF3KHRyYW5zZm9ybWFibGU6IElUcmFuc2Zvcm1hYmxlLCBzdGF0ZTogSVJlbmRlclN0YXRlLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgIGNvbnRleHQucmVzdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gXCJMaW5lXCI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2NhbGU5R3JpZCBleHRlbmRzIFJlY3Qge1xyXG5cclxuICBwdWJsaWMgZGF0YTogU2NhbGU5RGF0YTtcclxuICBwdWJsaWMgc3JjUmVjdHMgITogUmVjdGFuZ2xlW107XHJcbiAgcHVibGljIGRlc3RSZWN0cyAhOiBSZWN0YW5nbGVbXTtcclxuXHJcbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gXCJTY2FsZTlHcmlkXCI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoZGF0YTogU2NhbGU5RGF0YSwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHU6IG51bWJlciwgdjogbnVtYmVyKSB7XHJcbiAgICBzdXBlcih3aWR0aCwgaGVpZ2h0LCB1LCB2KTtcclxuICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB0aGlzLl9jYWxjRGVzdFJlY3RzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jYWxjRGVzdFJlY3RzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kZXN0UmVjdHMgPSBbXTtcclxuICAgIHRoaXMuc3JjUmVjdHMgPSBbXTtcclxuXHJcbiAgICBsZXQgcmM6IFJlY3RhbmdsZTtcclxuICAgIHJjID0gbmV3IFJlY3RhbmdsZSgpO1xyXG4gICAgcmMub3JpZ2luID0gdmVjMi5jcmVhdGUoMCwgMCk7XHJcbiAgICByYy5zaXplID0gU2l6ZS5jcmVhdGUodGhpcy5kYXRhLmxlZnRNYXJnaW4sIHRoaXMuZGF0YS50b3BNYXJnaW4pO1xyXG4gICAgdGhpcy5zcmNSZWN0cy5wdXNoKHJjKTtcclxuXHJcbiAgICByYyA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgIHJjLm9yaWdpbiA9IHZlYzIuY3JlYXRlKHRoaXMueCwgdGhpcy55KTtcclxuICAgIHJjLnNpemUgPSBTaXplLmNyZWF0ZSh0aGlzLmRhdGEubGVmdE1hcmdpbiwgdGhpcy5kYXRhLnRvcE1hcmdpbik7XHJcbiAgICB0aGlzLmRlc3RSZWN0cy5wdXNoKHJjKTtcclxuXHJcbiAgICByYyA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgIHJjLm9yaWdpbiA9IHZlYzIuY3JlYXRlKHRoaXMuZGF0YS5pbWFnZS53aWR0aCAtIHRoaXMuZGF0YS5yaWdodE1hcmdpbiwgMCk7XHJcbiAgICByYy5zaXplID0gU2l6ZS5jcmVhdGUodGhpcy5kYXRhLnJpZ2h0TWFyZ2luLCB0aGlzLmRhdGEudG9wTWFyZ2luKTtcclxuICAgIHRoaXMuc3JjUmVjdHMucHVzaChyYyk7XHJcblxyXG4gICAgcmMgPSBuZXcgUmVjdGFuZ2xlKCk7XHJcbiAgICByYy5vcmlnaW4gPSB2ZWMyLmNyZWF0ZSh0aGlzLnJpZ2h0IC0gdGhpcy5kYXRhLnJpZ2h0TWFyZ2luLCB0aGlzLnkpO1xyXG4gICAgcmMuc2l6ZSA9IFNpemUuY3JlYXRlKHRoaXMuZGF0YS5yaWdodE1hcmdpbiwgdGhpcy5kYXRhLnRvcE1hcmdpbik7XHJcbiAgICB0aGlzLmRlc3RSZWN0cy5wdXNoKHJjKTtcclxuXHJcbiAgICByYyA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgIHJjLm9yaWdpbiA9IHZlYzIuY3JlYXRlKHRoaXMuZGF0YS5pbWFnZS53aWR0aCAtIHRoaXMuZGF0YS5yaWdodE1hcmdpbiwgdGhpcy5kYXRhLmltYWdlLmhlaWdodCAtIHRoaXMuZGF0YS5ib3R0b21NYXJnaW4pO1xyXG4gICAgcmMuc2l6ZSA9IFNpemUuY3JlYXRlKHRoaXMuZGF0YS5yaWdodE1hcmdpbiwgdGhpcy5kYXRhLmJvdHRvbU1hcmdpbik7XHJcbiAgICB0aGlzLnNyY1JlY3RzLnB1c2gocmMpO1xyXG5cclxuICAgIHJjID0gbmV3IFJlY3RhbmdsZSgpO1xyXG4gICAgcmMub3JpZ2luID0gdmVjMi5jcmVhdGUodGhpcy5yaWdodCAtIHRoaXMuZGF0YS5yaWdodE1hcmdpbiwgdGhpcy5ib3R0b20gLSB0aGlzLmRhdGEuYm90dG9tTWFyZ2luKTtcclxuICAgIHJjLnNpemUgPSBTaXplLmNyZWF0ZSh0aGlzLmRhdGEucmlnaHRNYXJnaW4sIHRoaXMuZGF0YS5ib3R0b21NYXJnaW4pO1xyXG4gICAgdGhpcy5kZXN0UmVjdHMucHVzaChyYyk7XHJcblxyXG4gICAgcmMgPSBuZXcgUmVjdGFuZ2xlKCk7XHJcbiAgICByYy5vcmlnaW4gPSB2ZWMyLmNyZWF0ZSgwLCB0aGlzLmRhdGEuaW1hZ2UuaGVpZ2h0IC0gdGhpcy5kYXRhLmJvdHRvbU1hcmdpbik7XHJcbiAgICByYy5zaXplID0gU2l6ZS5jcmVhdGUodGhpcy5kYXRhLmxlZnRNYXJnaW4sIHRoaXMuZGF0YS5ib3R0b21NYXJnaW4pO1xyXG4gICAgdGhpcy5zcmNSZWN0cy5wdXNoKHJjKTtcclxuXHJcbiAgICByYyA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgIHJjLm9yaWdpbiA9IHZlYzIuY3JlYXRlKHRoaXMueCwgdGhpcy5ib3R0b20gLSB0aGlzLmRhdGEuYm90dG9tTWFyZ2luKTtcclxuICAgIHJjLnNpemUgPSBTaXplLmNyZWF0ZSh0aGlzLmRhdGEubGVmdE1hcmdpbiwgdGhpcy5kYXRhLmJvdHRvbU1hcmdpbik7XHJcbiAgICB0aGlzLmRlc3RSZWN0cy5wdXNoKHJjKTtcclxuXHJcbiAgICByYyA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgIHJjLm9yaWdpbiA9IHZlYzIuY3JlYXRlKDAsIHRoaXMuZGF0YS50b3BNYXJnaW4pO1xyXG4gICAgcmMuc2l6ZSA9IFNpemUuY3JlYXRlKHRoaXMuZGF0YS5sZWZ0TWFyZ2luLCB0aGlzLmRhdGEuaW1hZ2UuaGVpZ2h0IC0gdGhpcy5kYXRhLnRvcE1hcmdpbiAtIHRoaXMuZGF0YS5ib3R0b21NYXJnaW4pO1xyXG4gICAgdGhpcy5zcmNSZWN0cy5wdXNoKHJjKTtcclxuXHJcbiAgICByYyA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgIHJjLm9yaWdpbiA9IHZlYzIuY3JlYXRlKHRoaXMueCwgdGhpcy55ICsgdGhpcy5kYXRhLnRvcE1hcmdpbik7XHJcbiAgICByYy5zaXplID0gU2l6ZS5jcmVhdGUodGhpcy5kYXRhLmxlZnRNYXJnaW4sIHRoaXMuaGVpZ2h0IC0gdGhpcy5kYXRhLnRvcE1hcmdpbiAtIHRoaXMuZGF0YS5ib3R0b21NYXJnaW4pO1xyXG4gICAgdGhpcy5kZXN0UmVjdHMucHVzaChyYyk7XHJcblxyXG4gICAgcmMgPSBuZXcgUmVjdGFuZ2xlKCk7XHJcbiAgICByYy5vcmlnaW4gPSB2ZWMyLmNyZWF0ZSh0aGlzLmRhdGEubGVmdE1hcmdpbiwgMCk7XHJcbiAgICByYy5zaXplID0gU2l6ZS5jcmVhdGUodGhpcy5kYXRhLmltYWdlLndpZHRoIC0gdGhpcy5kYXRhLmxlZnRNYXJnaW4gLSB0aGlzLmRhdGEucmlnaHRNYXJnaW4sIHRoaXMuZGF0YS50b3BNYXJnaW4pO1xyXG4gICAgdGhpcy5zcmNSZWN0cy5wdXNoKHJjKTtcclxuXHJcbiAgICByYyA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgIHJjLm9yaWdpbiA9IHZlYzIuY3JlYXRlKHRoaXMueCArIHRoaXMuZGF0YS5sZWZ0TWFyZ2luLCB0aGlzLnkpO1xyXG4gICAgcmMuc2l6ZSA9IFNpemUuY3JlYXRlKHRoaXMud2lkdGggLSB0aGlzLmRhdGEubGVmdE1hcmdpbiAtIHRoaXMuZGF0YS5yaWdodE1hcmdpbiwgdGhpcy5kYXRhLnRvcE1hcmdpbik7XHJcbiAgICB0aGlzLmRlc3RSZWN0cy5wdXNoKHJjKTtcclxuXHJcbiAgICByYyA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgIHJjLm9yaWdpbiA9IHZlYzIuY3JlYXRlKHRoaXMuZGF0YS5pbWFnZS53aWR0aCAtIHRoaXMuZGF0YS5yaWdodE1hcmdpbiwgdGhpcy5kYXRhLnRvcE1hcmdpbik7XHJcbiAgICByYy5zaXplID0gU2l6ZS5jcmVhdGUodGhpcy5kYXRhLnJpZ2h0TWFyZ2luLCB0aGlzLmRhdGEuaW1hZ2UuaGVpZ2h0IC0gdGhpcy5kYXRhLnRvcE1hcmdpbiAtIHRoaXMuZGF0YS5ib3R0b21NYXJnaW4pO1xyXG4gICAgdGhpcy5zcmNSZWN0cy5wdXNoKHJjKTtcclxuXHJcbiAgICByYyA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgIHJjLm9yaWdpbiA9IHZlYzIuY3JlYXRlKHRoaXMucmlnaHQgLSB0aGlzLmRhdGEucmlnaHRNYXJnaW4sIHRoaXMueSArIHRoaXMuZGF0YS50b3BNYXJnaW4pO1xyXG4gICAgcmMuc2l6ZSA9IFNpemUuY3JlYXRlKHRoaXMuZGF0YS5yaWdodE1hcmdpbiwgdGhpcy5oZWlnaHQgLSB0aGlzLmRhdGEudG9wTWFyZ2luIC0gdGhpcy5kYXRhLmJvdHRvbU1hcmdpbik7XHJcbiAgICB0aGlzLmRlc3RSZWN0cy5wdXNoKHJjKTtcclxuXHJcbiAgICByYyA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgIHJjLm9yaWdpbiA9IHZlYzIuY3JlYXRlKHRoaXMuZGF0YS5sZWZ0TWFyZ2luLCB0aGlzLmRhdGEuaW1hZ2UuaGVpZ2h0IC0gdGhpcy5kYXRhLmJvdHRvbU1hcmdpbik7XHJcbiAgICByYy5zaXplID0gU2l6ZS5jcmVhdGUodGhpcy5kYXRhLmltYWdlLndpZHRoIC0gdGhpcy5kYXRhLmxlZnRNYXJnaW4gLSB0aGlzLmRhdGEucmlnaHRNYXJnaW4sIHRoaXMuZGF0YS5ib3R0b21NYXJnaW4pO1xyXG4gICAgdGhpcy5zcmNSZWN0cy5wdXNoKHJjKTtcclxuXHJcbiAgICByYyA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgIHJjLm9yaWdpbiA9IHZlYzIuY3JlYXRlKHRoaXMueCArIHRoaXMuZGF0YS5sZWZ0TWFyZ2luLCB0aGlzLmJvdHRvbSAtIHRoaXMuZGF0YS5ib3R0b21NYXJnaW4pO1xyXG4gICAgcmMuc2l6ZSA9IFNpemUuY3JlYXRlKHRoaXMud2lkdGggLSB0aGlzLmRhdGEubGVmdE1hcmdpbiAtIHRoaXMuZGF0YS5yaWdodE1hcmdpbiwgdGhpcy5kYXRhLmJvdHRvbU1hcmdpbik7XHJcbiAgICB0aGlzLmRlc3RSZWN0cy5wdXNoKHJjKTtcclxuXHJcbiAgICByYyA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgIHJjLm9yaWdpbiA9IHZlYzIuY3JlYXRlKHRoaXMuZGF0YS5sZWZ0TWFyZ2luLCB0aGlzLmRhdGEudG9wTWFyZ2luKTtcclxuICAgIHJjLnNpemUgPSBTaXplLmNyZWF0ZSh0aGlzLmRhdGEuaW1hZ2Uud2lkdGggLSB0aGlzLmRhdGEubGVmdE1hcmdpbiAtIHRoaXMuZGF0YS5yaWdodE1hcmdpbiwgdGhpcy5kYXRhLmltYWdlLmhlaWdodCAtIHRoaXMuZGF0YS50b3BNYXJnaW4gLSB0aGlzLmRhdGEuYm90dG9tTWFyZ2luKTtcclxuICAgIHRoaXMuc3JjUmVjdHMucHVzaChyYyk7XHJcblxyXG4gICAgcmMgPSBuZXcgUmVjdGFuZ2xlKCk7XHJcbiAgICByYy5vcmlnaW4gPSB2ZWMyLmNyZWF0ZSh0aGlzLnggKyB0aGlzLmRhdGEubGVmdE1hcmdpbiwgdGhpcy55ICsgdGhpcy5kYXRhLnRvcE1hcmdpbik7XHJcbiAgICByYy5zaXplID0gU2l6ZS5jcmVhdGUodGhpcy53aWR0aCAtIHRoaXMuZGF0YS5sZWZ0TWFyZ2luIC0gdGhpcy5kYXRhLnJpZ2h0TWFyZ2luLCB0aGlzLmhlaWdodCAtIHRoaXMuZGF0YS50b3BNYXJnaW4gLSB0aGlzLmRhdGEuYm90dG9tTWFyZ2luKTtcclxuICAgIHRoaXMuZGVzdFJlY3RzLnB1c2gocmMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZHJhd0ltYWdlKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgaW1nOiBIVE1MSW1hZ2VFbGVtZW50IHwgSFRNTENhbnZhc0VsZW1lbnQsIGRlc3RSZWN0OiBSZWN0YW5nbGUsIHNyY1JlY3Q6IFJlY3RhbmdsZSwgZmlsbFR5cGU6IEVJbWFnZUZpbGxUeXBlID0gRUltYWdlRmlsbFR5cGUuU1RSRVRDSCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHNyY1JlY3QuaXNFbXB0eSgpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGVzdFJlY3QuaXNFbXB0eSgpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZmlsbFR5cGUgPT09IEVJbWFnZUZpbGxUeXBlLlNUUkVUQ0gpIHtcclxuICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1nLFxyXG4gICAgICAgIHNyY1JlY3Qub3JpZ2luLngsXHJcbiAgICAgICAgc3JjUmVjdC5vcmlnaW4ueSxcclxuICAgICAgICBzcmNSZWN0LnNpemUud2lkdGgsXHJcbiAgICAgICAgc3JjUmVjdC5zaXplLmhlaWdodCxcclxuICAgICAgICBkZXN0UmVjdC5vcmlnaW4ueCxcclxuICAgICAgICBkZXN0UmVjdC5vcmlnaW4ueSxcclxuICAgICAgICBkZXN0UmVjdC5zaXplLndpZHRoLFxyXG4gICAgICAgIGRlc3RSZWN0LnNpemUuaGVpZ2h0XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgcm93czogbnVtYmVyID0gTWF0aC5jZWlsKGRlc3RSZWN0LnNpemUud2lkdGggLyBzcmNSZWN0LnNpemUud2lkdGgpO1xyXG4gICAgICBsZXQgY29sdW1zOiBudW1iZXIgPSBNYXRoLmNlaWwoZGVzdFJlY3Quc2l6ZS5oZWlnaHQgLyBzcmNSZWN0LnNpemUuaGVpZ2h0KTtcclxuXHJcbiAgICAgIGxldCBsZWZ0OiBudW1iZXIgPSAwO1xyXG4gICAgICBsZXQgdG9wOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgbGV0IHJpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgICBsZXQgYm90dG9tOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgbGV0IHdpZHRoOiBudW1iZXIgPSAwO1xyXG4gICAgICBsZXQgaGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgbGV0IGRlc3RSaWdodDogbnVtYmVyID0gZGVzdFJlY3Qub3JpZ2luLnggKyBkZXN0UmVjdC5zaXplLndpZHRoO1xyXG4gICAgICBsZXQgZGVzdEJvdHRvbTogbnVtYmVyID0gZGVzdFJlY3Qub3JpZ2luLnkgKyBkZXN0UmVjdC5zaXplLmhlaWdodDtcclxuXHJcbiAgICAgIGlmIChmaWxsVHlwZSA9PT0gRUltYWdlRmlsbFR5cGUuUkVQRUFUX1gpIHtcclxuICAgICAgICBjb2x1bXMgPSAxO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpbGxUeXBlID09PSBFSW1hZ2VGaWxsVHlwZS5SRVBFQVRfWSkge1xyXG4gICAgICAgIHJvd3MgPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgcm93czsgaSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgajogbnVtYmVyID0gMDsgaiA8IGNvbHVtczsgaisrKSB7XHJcbiAgICAgICAgICBsZWZ0ID0gZGVzdFJlY3Qub3JpZ2luLnggKyBpICogc3JjUmVjdC5zaXplLndpZHRoO1xyXG4gICAgICAgICAgdG9wID0gZGVzdFJlY3Qub3JpZ2luLnkgKyBqICogc3JjUmVjdC5zaXplLmhlaWdodDtcclxuXHJcbiAgICAgICAgICB3aWR0aCA9IHNyY1JlY3Quc2l6ZS53aWR0aDtcclxuICAgICAgICAgIGhlaWdodCA9IHNyY1JlY3Quc2l6ZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgcmlnaHQgPSBsZWZ0ICsgd2lkdGg7XHJcbiAgICAgICAgICBib3R0b20gPSB0b3AgKyBoZWlnaHQ7XHJcblxyXG4gICAgICAgICAgaWYgKHJpZ2h0ID4gZGVzdFJpZ2h0KSB7XHJcbiAgICAgICAgICAgIHdpZHRoID0gc3JjUmVjdC5zaXplLndpZHRoIC0gKHJpZ2h0IC0gZGVzdFJpZ2h0KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoYm90dG9tID4gZGVzdEJvdHRvbSkge1xyXG4gICAgICAgICAgICBoZWlnaHQgPSBzcmNSZWN0LnNpemUuaGVpZ2h0IC0gKGJvdHRvbSAtIGRlc3RCb3R0b20pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZyxcclxuICAgICAgICAgICAgc3JjUmVjdC5vcmlnaW4ueCxcclxuICAgICAgICAgICAgc3JjUmVjdC5vcmlnaW4ueSxcclxuICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgICAgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHJhdyh0cmFuc2Zvcm1hYmxlOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGU6IElSZW5kZXJTdGF0ZSwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5zcmNSZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLl9kcmF3SW1hZ2UoY29udGV4dCwgdGhpcy5kYXRhLmltYWdlLCB0aGlzLmRlc3RSZWN0c1tpXSwgdGhpcy5zcmNSZWN0c1tpXSwgRUltYWdlRmlsbFR5cGUuU1RSRVRDSCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW5kQ2xpcFNoYXBlIGltcGxlbWVudHMgSVNoYXBlIHtcclxuICBwdWJsaWMgZGF0YTogYW55O1xyXG4gIHB1YmxpYyBoaXRUZXN0KGxvY2FsUHQ6IHZlYzIsIHRyYW5zZm9ybTogSVRyYW5zZm9ybWFibGUpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcHVibGljIGdldEJvdW5kaW5nKCk6IEJvdW5kaW5nIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgYm90dG9tOiAwLFxyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICByaWdodDogMFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGJlZ2luRHJhdyh0cmFuc2Zvcm1hYmxlOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGU6IElSZW5kZXJTdGF0ZSwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7IH1cclxuXHJcbiAgcHVibGljIGRyYXcodHJhbnNmb3JtYWJsZTogSVRyYW5zZm9ybWFibGUsIHN0YXRlOiBJUmVuZGVyU3RhdGUsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQgeyB9XHJcblxyXG4gIHB1YmxpYyBlbmREcmF3KHRyYW5zZm9ybWFibGU6IElUcmFuc2Zvcm1hYmxlLCBzdGF0ZTogSVJlbmRlclN0YXRlLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgIGNvbnRleHQucmVzdG9yZSgpOyAvLyDlj6rmnInov5nkuIDlj6XmnInnlKhcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFwiRW5kQ0xpcFNoYXBlXCI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW1wdHlTaGFwZSBpbXBsZW1lbnRzIElTaGFwZSB7XHJcbiAgcHVibGljIGRhdGE6IGFueTtcclxuICBwdWJsaWMgaGl0VGVzdChsb2NhbFB0OiB2ZWMyLCB0cmFuc2Zvcm06IElUcmFuc2Zvcm1hYmxlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRCb3VuZGluZygpOiBCb3VuZGluZyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIGJvdHRvbTogMCxcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgcmlnaHQ6IDBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBiZWdpbkRyYXcodHJhbnNmb3JtYWJsZTogSVRyYW5zZm9ybWFibGUsIHN0YXRlOiBJUmVuZGVyU3RhdGUsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQgeyB9XHJcblxyXG4gIHB1YmxpYyBkcmF3KHRyYW5zZm9ybWFibGU6IElUcmFuc2Zvcm1hYmxlLCBzdGF0ZTogSVJlbmRlclN0YXRlLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHsgfVxyXG5cclxuICBwdWJsaWMgZW5kRHJhdyh0cmFuc2Zvcm1hYmxlOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGU6IElSZW5kZXJTdGF0ZSwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7IH1cclxuXHJcbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gXCJFbXB0eVNoYXBlXCI7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENhbnZhczJEQXBwbGljYXRpb24sIENhbnZhc01vdXNlRXZlbnQsIENhbnZhc0tleUJvYXJkRXZlbnQgfSBmcm9tIFwiLi4vYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgSVNwcml0ZUNvbnRhaW5lciwgSURpc3BhdGNoZXIsIElTcHJpdGUsIFNjZW5lTW9kZSB9IGZyb20gXCIuL2ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTcHJpdGUyRE1hbmFnZXIgfSBmcm9tIFwiLi9zcHJpdGUyZFN5c3RlbVwiO1xyXG5pbXBvcnQgeyBTcHJpdGVOb2RlTWFuYWdlciB9IGZyb20gXCIuL3Nwcml0ZTJkSGllcmFyY2hpY2FsU3lzdGVtXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGUyREFwcGxpY2F0aW9uIGV4dGVuZHMgQ2FudmFzMkRBcHBsaWNhdGlvbiB7XHJcbiAgcHJvdGVjdGVkIF9kaXNwYXRjaGVyOiBJRGlzcGF0Y2hlcjtcclxuICBwdWJsaWMgb3BlcmF0aW9uczogQXJyYXk8KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB8IG51bGwpID0+IHZvaWQ+ID0gW107XHJcbiAgcHVibGljIHNjZW5lTW9kZTogU2NlbmVNb2RlID0gU2NlbmVNb2RlLkRSQUcgLy8g5bqU55So5qih5byP77yM546w5Zyo5pyJ5ouW5Yqo5ZKM6YCJ5oup5Lik56eNXHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBpc0hpZXJhcmNoaWNhbDogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgIHN1cGVyKGNhbnZhcyk7XHJcblxyXG4gICAgZG9jdW1lbnQub25jb250ZXh0bWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzSGllcmFyY2hpY2FsID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuX2Rpc3BhdGNoZXIgPSBuZXcgU3ByaXRlTm9kZU1hbmFnZXIoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2Rpc3BhdGNoZXIgPSBuZXcgU3ByaXRlMkRNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHJvb3RDb250YWluZXIoKTogSVNwcml0ZUNvbnRhaW5lciB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5jb250YWluZXI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHJvb3RDb250YWluZXIoc3ByOiBJU3ByaXRlQ29udGFpbmVyKSB7XHJcbiAgICB0aGlzLl9kaXNwYXRjaGVyLmNvbnRhaW5lciA9IHNwcjtcclxuICB9XHJcblxyXG4gIC8vIOavj+S4gOW4p+mDveS8muiiq+aJp+ihjFxyXG4gIHB1YmxpYyB1cGRhdGUobXNlYzogbnVtYmVyLCBkaWZmOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2hVcGRhdGUobXNlYywgZGlmZik7XHJcbiAgfVxyXG5cclxuICAvLyDmr4/kuIDluKfpg73kvJrooqvmiafooYxcclxuICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY29udGV4dDJEKSB7XHJcbiAgICAgIHRoaXMuY29udGV4dDJELmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNvbnRleHQyRC5jYW52YXMud2lkdGgsIHRoaXMuY29udGV4dDJELmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoRHJhdyh0aGlzLmNvbnRleHQyRCk7XHJcbiAgICAgIHRoaXMuZHJhd09wZXJhdGlvbnMoKVxyXG4gICAgICB0aGlzLnJlbmRlckNvcHlSaWdodCgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRyYXdPcGVyYXRpb25zKCkge1xyXG4gICAgaWYgKHRoaXMuY29udGV4dDJEKSB7XHJcbiAgICAgIHRoaXMub3BlcmF0aW9ucy5mb3JFYWNoKG9wZXJhdGlvbiA9PiB7XHJcbiAgICAgICAgb3BlcmF0aW9uKHRoaXMuY29udGV4dDJEKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW5kZXJDb3B5UmlnaHQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jb250ZXh0MkQpIHtcclxuICAgICAgY29uc3QgdGV4dCA9ICdsaXl1MzY1J1xyXG4gICAgICBjb25zdCBtYXJnaW4gPSA1XHJcbiAgICAgIHRoaXMuY29udGV4dDJELnNhdmUoKVxyXG4gICAgICB0aGlzLmNvbnRleHQyRC5iZWdpblBhdGgoKTtcclxuICAgICAgdGhpcy5jb250ZXh0MkQuZmlsbFN0eWxlID0gXCJyZ2JhKDAsIDAsIDAsIDAuNSlcIlxyXG4gICAgICB0aGlzLmNvbnRleHQyRC5mb250ID0gXCIxMnB4IHNhbl9zZXJpZlwiO1xyXG4gICAgICBjb25zdCB3ID0gdGhpcy5jb250ZXh0MkQubWVhc3VyZVRleHQodGV4dCkud2lkdGhcclxuICAgICAgY29uc3QgaCA9IHRoaXMuY29udGV4dDJELm1lYXN1cmVUZXh0KCfnlLAnKS53aWR0aFxyXG4gICAgICB0aGlzLmNvbnRleHQyRC50ZXh0QWxpZ24gPSAnbGVmdCdcclxuICAgICAgdGhpcy5jb250ZXh0MkQudGV4dEJhc2VsaW5lID0gJ3RvcCdcclxuICAgICAgdGhpcy5jb250ZXh0MkQuZmlsbFRleHQodGV4dCwgdGhpcy5jb250ZXh0MkQuY2FudmFzLndpZHRoIC0gdyAtIG1hcmdpbiwgdGhpcy5jb250ZXh0MkQuY2FudmFzLmhlaWdodCAtIGggLSBtYXJnaW4pXHJcbiAgICAgIHRoaXMuY29udGV4dDJELnJlc3RvcmUoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8g6L+U5Zue5q2j5Zyo6KKr5ouW5Yqo55qEc3ByaXRlXHJcbiAgcHVibGljIGdldERyYWdTcHJpdGUoKTogSVNwcml0ZSB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5kcmFnU3ByaXRlXHJcbiAgfVxyXG5cclxuICAvLyDov5Tlm57pvKDmoIflkb3kuK3nmoRzcHJpdGVcclxuICBwdWJsaWMgZ2V0SGl0U3ByaXRlKCk6IElTcHJpdGUgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuaGl0U3ByaXRlXHJcbiAgfVxyXG5cclxuICAvLyDniLbnsbtBcHBsaWNhdGlvbuebkeWQrOWIsOeahOaJgOaciem8oOagh+S6i+S7tu+8jOmDveS8muiwg+eUqF9kaXNwYXRjaGVy55qEZGlzcGF0Y2hNb3VzZUV2ZW50KCnmlrnms5VcclxuICBwcm90ZWN0ZWQgZGlzcGF0Y2hNb3VzZURvd24oZXZ0OiBDYW52YXNNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBzdXBlci5kaXNwYXRjaE1vdXNlRG93bihldnQpO1xyXG4gICAgdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaE1vdXNlRXZlbnQoZXZ0KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBkaXNwYXRjaE1vdXNlVXAoZXZ0OiBDYW52YXNNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBzdXBlci5kaXNwYXRjaE1vdXNlVXAoZXZ0KTtcclxuICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2hNb3VzZUV2ZW50KGV2dCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZGlzcGF0Y2hNb3VzZU1vdmUoZXZ0OiBDYW52YXNNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBzdXBlci5kaXNwYXRjaE1vdXNlTW92ZShldnQpO1xyXG4gICAgdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaE1vdXNlRXZlbnQoZXZ0KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBkaXNwYXRjaE1vdXNlRHJhZyhldnQ6IENhbnZhc01vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHN1cGVyLmRpc3BhdGNoTW91c2VEcmFnKGV2dCk7XHJcbiAgICB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoTW91c2VFdmVudChldnQpO1xyXG4gIH1cclxuXHJcbiAgLy8g54i257G7QXBwbGljYXRpb27nm5HlkKzliLDmiYDmnInplK7nm5jkuovku7bvvIzpg73osIPnlKhfZGlzcGF0Y2hlcueahGRpc3BhdGNoS2V5RXZlbnQoKeaWueazlVxyXG4gIHByb3RlY3RlZCBkaXNwYXRjaEtleURvd24oZXZ0OiBDYW52YXNLZXlCb2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBzdXBlci5kaXNwYXRjaEtleURvd24oZXZ0KTtcclxuICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2hLZXlFdmVudChldnQpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGRpc3BhdGNoS2V5VXAoZXZ0OiBDYW52YXNLZXlCb2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBzdXBlci5kaXNwYXRjaEtleVVwKGV2dCk7XHJcbiAgICB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoS2V5RXZlbnQoZXZ0KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBkaXNwYXRjaEtleVByZXNzKGV2dDogQ2FudmFzS2V5Qm9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgc3VwZXIuZGlzcGF0Y2hLZXlQcmVzcyhldnQpO1xyXG4gICAgdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaEtleUV2ZW50KGV2dCk7XHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBtYXQyZCwgVHJhbnNmb3JtMkQsIHZlYzIgfSBmcm9tIFwiLi4vbWF0aDJkXCJcclxuaW1wb3J0IHsgSVNwcml0ZSwgTW91c2VFdmVudEhhbmRsZXIsIEtleWJvYXJkRXZlbnRIYW5kbGVyLCBVcGRhdGVFdmVudEhhbmRsZXIsIEVPcmRlciwgSVNoYXBlLCBFUmVuZGVyVHlwZSwgSVNwcml0ZUNvbnRhaW5lciwgUmVuZGVyRXZlbnRIYW5kbGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlXCJcclxuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tIFwiLi4vdHJlZU5vZGVcIjtcclxuaW1wb3J0IHsgU3ByaXRlTm9kZSB9IGZyb20gXCIuL3Nwcml0ZTJkSGllcmFyY2hpY2FsU3lzdGVtXCI7XHJcblxyXG4vKipcclxuICog6KGo56S65LiA5Liq57uY5Yi25a+56LGh77yM5YaF6YOo5a2Y5YKo5LqG77yaXHJcbiAqIHNoYXBl77ya6KGo56S66KaB57uY5Yi255qE6Lev5b6E77ybXHJcbiAqIHRyYW5zZm9ybe+8muWwgeijheS6huWPmOaNouefqemYte+8m1xyXG4gKiBmaWxsU3R5bGXjgIFzdHJva2VTdHlsZeOAgWxpbmVXaWR0aO+8muWtmOWCqOS6hmNvbnRleHTnu5jliLbmraTlr7nosaHml7bpnIDopoHorr7nva7nmoTmuLLmn5PnirbmgIHvvJtcclxuICogcmVuZGVyVHlwZe+8mkJhc2VTaGFwZTJE57G755qEZHJhd+aWueazleS8muivu+WPluatpOWAvO+8jOW5tuaJp+ihjOe7mOWItuWHveaVsGNvbnRleHQuZmlsbCgp5oiWY29udGV4dC5zdHJva2UoKeaIlmNvbnRleHQuY2xpcCgpXHJcbiAqIGlzWFhY77ya6KGo56S65b2T5YmN5a+56LGh55qE54q25oCBXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU3ByaXRlMkQgaW1wbGVtZW50cyBJU3ByaXRlIHtcclxuICBwdWJsaWMgc2hvd0Nvb3JkU3lzdGVtOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIHJlbmRlclR5cGU6IEVSZW5kZXJUeXBlID0gRVJlbmRlclR5cGUuRklMTDtcclxuICBwdWJsaWMgaXNWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgaXNTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlXHJcbiAgcHVibGljIGlzRHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZVxyXG4gIHB1YmxpYyBpc0hvdmVyaW5nOiBib29sZWFuID0gZmFsc2VcclxuICBwdWJsaWMgZmlsbFN0eWxlOiBzdHJpbmcgfCBDYW52YXNHcmFkaWVudCB8IENhbnZhc1BhdHRlcm4gPSAnd2hpdGUnO1xyXG4gIHB1YmxpYyBzdHJva2VTdHlsZTogc3RyaW5nIHwgQ2FudmFzR3JhZGllbnQgfCBDYW52YXNQYXR0ZXJuID0gJ2JsYWNrJztcclxuICBwdWJsaWMgbGluZVdpZHRoOiBudW1iZXIgPSAxO1xyXG5cclxuICBwdWJsaWMgdHJhbnNmb3JtOiBUcmFuc2Zvcm0yRCA9IG5ldyBUcmFuc2Zvcm0yRCgpO1xyXG5cclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBzaGFwZTogSVNoYXBlO1xyXG4gIHB1YmxpYyBkYXRhOiBhbnk7IC8vIOaMguWcqOWIsOatpOe7mOWItuWvueixoeeahOaVsOaNrlxyXG4gIC8vIOmdnuepuuaWreiogO+8jOWboOS4um93bmVy5LiN6YCa6L+H5p6E6YCg5Ye95pWw5oiW5YaF6IGU6LWL5YC86L+b6KGM5Yid5aeL5YyW44CC5a6D5oyH5ZCR5LiA5LiqU3ByaXRlTm9kZeWvueixoe+8iOWunueOsOS6hklTcHJpdGVDb250YWluZXLmjqXlj6PvvIlcclxuICAvLyAx77yab3duZXLnmoTliJ3lp4vljJbotYvlgLzmmK/lnKjosIPnlKhTcHJpdGVOb2Rl5a+56LGh55qEYWRkQ2hpbGRBdCgp5pe277yM6KKr5Lyg5YWl55qEY2hpbGTlpoLmnpzooqvmiJDlip/mj5LlhaXkuLrlhbblrZDnuqfvvIzliJljaGlsZOWMheijueeahFNwcml0ZTJE5a+56LGh55qEb3duZXLlsLHkvJrmjIflkJHor6VjaGlsZFxyXG4gIC8vIDLvvJrlpoLmnpzor6VTcHJpdGUyROWunuS+i+aYr+iiq+aguVNwcml0ZU5vZGXljIXoo7nvvIzliJnlroPnmoRvd25lcueahOWIneWni+WMlui1i+WAvOaYr+WcqFNwcml0ZU5vZGVNYW5hZ2Vy55qE5p6E6YCg5Ye95pWw5Lit77yI5Zug5Li65Zyo5q2k5p6E6YCg5Ye95pWw5Lit5a6e5L6L5YyW55qE5qC5U3ByaXRlTm9kZe+8iVxyXG4gIHB1YmxpYyBvd25lciAhOiBJU3ByaXRlQ29udGFpbmVyO1xyXG5cclxuICBwdWJsaWMgbW91c2VFdmVudDogTW91c2VFdmVudEhhbmRsZXIgfCBudWxsID0gbnVsbDtcclxuICBwdWJsaWMga2V5RXZlbnQ6IEtleWJvYXJkRXZlbnRIYW5kbGVyIHwgbnVsbCA9IG51bGw7XHJcbiAgcHVibGljIHVwZGF0ZUV2ZW50OiBVcGRhdGVFdmVudEhhbmRsZXIgfCBudWxsID0gbnVsbDsgLy8g6KKrdGhpcy51cGRhdGUoKeiwg+eUqFxyXG4gIHB1YmxpYyByZW5kZXJFdmVudDogUmVuZGVyRXZlbnRIYW5kbGVyIHwgbnVsbCA9IG51bGw7IC8vIOWcqHRoaXMuZHJhdygp5Lit6KKr6LCD55So5Lik5qyhXHJcblxyXG4gIC8vIOe8k+WtmOm8oOagh+eCueWHu+WIsOatpOWvueixoeeahOeCue+8jOebuOWvueS6juatpOWvueixoeWdkOagh+ezu+eahOWxgOmDqOWdkOagh1xyXG4gIHB1YmxpYyBkaWZmWDogbnVtYmVyID0gMDtcclxuICBwdWJsaWMgZGlmZlk6IG51bWJlciA9IDA7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzaGFwZTogSVNoYXBlLCBuYW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnNoYXBlID0gc2hhcGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHgoeDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi54ID0geDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLng7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHkoeTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi55ID0geTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLnk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHJvdGF0aW9uKHJvdGF0aW9uOiBudW1iZXIpIHtcclxuICAgIHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uID0gcm90YXRpb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHJvdGF0aW9uKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucm90YXRpb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHNjYWxlWChzOiBudW1iZXIpIHtcclxuICAgIHRoaXMudHJhbnNmb3JtLnNjYWxlLnggPSBzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBzY2FsZVgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5zY2FsZS54O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBzY2FsZVkoczogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnRyYW5zZm9ybS5zY2FsZS55ID0gcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2NhbGVZKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0uc2NhbGUueTtcclxuICB9XHJcblxyXG5cclxuICBwdWJsaWMgZ2V0V29ybGRNYXRyaXgoKTogbWF0MmQge1xyXG4gICAgaWYgKHRoaXMub3duZXIgaW5zdGFuY2VvZiBTcHJpdGVOb2RlKSB7XHJcbiAgICAgIGxldCBhcnI6IFRyZWVOb2RlPElTcHJpdGU+W10gPSBbXTtcclxuICAgICAgbGV0IGN1cnI6IFRyZWVOb2RlPElTcHJpdGU+IHwgdW5kZWZpbmVkID0gdGhpcy5vd25lciBhcyBTcHJpdGVOb2RlO1xyXG4gICAgICB3aGlsZSAoY3VyciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgYXJyLnB1c2goY3Vycik7XHJcbiAgICAgICAgY3VyciA9IGN1cnIucGFyZW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgb3V0OiBtYXQyZCA9IG1hdDJkLmNyZWF0ZSgpO1xyXG4gICAgICBsZXQgY3Vyck1hdDogbWF0MmQ7XHJcbiAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIGN1cnIgPSBhcnJbaV07XHJcbiAgICAgICAgaWYgKGN1cnIuZGF0YSkge1xyXG4gICAgICAgICAgY3Vyck1hdCA9IChjdXJyLmRhdGEgYXMgU3ByaXRlMkQpLnRyYW5zZm9ybS50b01hdHJpeCgpO1xyXG4gICAgICAgICAgbWF0MmQubXVsdGlwbHkob3V0LCBjdXJyTWF0LCBvdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb3V0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnRvTWF0cml4KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0V29ybGRNYXRyaXgyKCk6IG1hdDJkIHtcclxuICAgIGlmICh0aGlzLm93bmVyIGluc3RhbmNlb2YgU3ByaXRlTm9kZSkge1xyXG4gICAgICBsZXQgYXJyOiBUcmVlTm9kZTxJU3ByaXRlPltdID0gW107XHJcbiAgICAgIGxldCBjdXJyOiBUcmVlTm9kZTxJU3ByaXRlPiB8IHVuZGVmaW5lZCA9IHRoaXMub3duZXIgYXMgU3ByaXRlTm9kZTtcclxuICAgICAgd2hpbGUgKGN1cnIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGFyci5wdXNoKGN1cnIpO1xyXG4gICAgICAgIGN1cnIgPSBjdXJyLnBhcmVudDtcclxuICAgICAgfVxyXG4gICAgICBhcnIucG9wKClcclxuXHJcbiAgICAgIGxldCBvdXQ6IG1hdDJkID0gbWF0MmQuY3JlYXRlKCk7XHJcbiAgICAgIGxldCBjdXJyTWF0OiBtYXQyZDtcclxuICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgY3VyciA9IGFycltpXTtcclxuICAgICAgICBpZiAoY3Vyci5kYXRhKSB7XHJcbiAgICAgICAgICBjdXJyTWF0ID0gKGN1cnIuZGF0YSBhcyBTcHJpdGUyRCkudHJhbnNmb3JtLnRvTWF0cml4KCk7XHJcbiAgICAgICAgICBtYXQyZC5tdWx0aXBseShvdXQsIGN1cnJNYXQsIG91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0udG9NYXRyaXgoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMb2NhbE1hdHJpeCgpOiBtYXQyZCB7XHJcbiAgICBsZXQgc3JjOiBtYXQyZCA9IHRoaXMuZ2V0V29ybGRNYXRyaXgoKTtcclxuICAgIGxldCBvdXQ6IG1hdDJkID0gbWF0MmQuY3JlYXRlKCk7XHJcbiAgICBpZiAobWF0MmQuaW52ZXJ0KHNyYywgb3V0KSkge1xyXG4gICAgICByZXR1cm4gb3V0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLnn6npmLXmsYLpgIblpLHotKVcIik7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIuefqemYteaxgumAhuWksei0pVwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGUobWVzYzogbnVtYmVyLCBkaWZmOiBudW1iZXIsIG9yZGVyOiBFT3JkZXIpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnVwZGF0ZUV2ZW50KSB7XHJcbiAgICAgIHRoaXMudXBkYXRlRXZlbnQodGhpcywgbWVzYywgZGlmZiwgb3JkZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGhpdFRlc3QobG9jYWxQdDogdmVjMik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNoYXBlLmhpdFRlc3QobG9jYWxQdCwgdGhpcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xyXG5cclxuICAgICAgLy8gMS7lhYjosIPnlKhjb250ZXh0LnJlc3RvcmUoKTtcclxuICAgICAgLy8gMi7moLnmja50aGlzLmxpbmVXaWR0aO+8jHRoaXMuc3Ryb2tlU3R5bGXvvIx0aGlzLmZpbGxTdHlsZeiuvue9ruS4iuS4i+aWh+a4suafk+eKtuaAgVxyXG4gICAgICAvLyAzLuagueaNruW9k+WJjeWvueixoeeahOS4lueVjOefqemYte+8jOiuvue9rmNvbnRleHTnmoRzZXRUcmFuc2Zvcm0oKeaWueazlVxyXG4gICAgICB0aGlzLnNoYXBlLmJlZ2luRHJhdyh0aGlzLCB0aGlzLCBjb250ZXh0KTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnJlbmRlckV2ZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJFdmVudCh0aGlzLCBjb250ZXh0LCBFT3JkZXIuUFJFT1JERVIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNoYXBlLmRyYXcodGhpcywgdGhpcywgY29udGV4dCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5yZW5kZXJFdmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyRXZlbnQodGhpcywgY29udGV4dCwgRU9yZGVyLlBPU1RPUkRFUik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIOS8muiwg+eUqGNvbnRleHQucmVzdG9yZSgpO1xyXG4gICAgICB0aGlzLnNoYXBlLmVuZERyYXcodGhpcywgdGhpcywgY29udGV4dCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBUcmVlTm9kZSwgTm9kZUVudW1lcmF0b3JGYWN0b3J5IH0gZnJvbSBcIi4uL3RyZWVOb2RlXCI7XHJcbmltcG9ydCB7IElFbnVtZXJhdG9yIH0gZnJvbSBcIi4uL0lFbnVtZXJhdG9yXCI7XHJcbmltcG9ydCB7IENhbnZhc0tleUJvYXJkRXZlbnQsIENhbnZhc01vdXNlRXZlbnQsIENhbnZhczJEQXBwbGljYXRpb24sIEVJbnB1dEV2ZW50VHlwZSB9IGZyb20gXCIuLi9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBJU3ByaXRlLCBFT3JkZXIsIElEaXNwYXRjaGVyLCBTcHJpdGVGYWN0b3J5LCBFUmVuZGVyVHlwZSwgSVNwcml0ZUNvbnRhaW5lciwgTm9kZVR5cGUgfSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgbWF0MmQsIHZlYzIsIE1hdGgyRCB9IGZyb20gXCIuLi9tYXRoMmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGVOb2RlIGV4dGVuZHMgVHJlZU5vZGU8SVNwcml0ZT4gaW1wbGVtZW50cyBJU3ByaXRlQ29udGFpbmVyIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3Ioc3ByaXRlOiBJU3ByaXRlLCBwYXJlbnQ6IFNwcml0ZU5vZGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsIG5hbWU6IHN0cmluZyA9IFwic3ByaXRlTm9kZVwiKSB7XHJcbiAgICBzdXBlcihzcHJpdGUsIHBhcmVudCwgbmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkU3ByaXRlKHNwcml0ZTogSVNwcml0ZSk6IElTcHJpdGVDb250YWluZXIge1xyXG4gICAgbGV0IG5vZGU6IFNwcml0ZU5vZGUgPSBuZXcgU3ByaXRlTm9kZShzcHJpdGUsIHRoaXMsIHNwcml0ZS5uYW1lKTtcclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZVNwcml0ZShzcHJpdGU6IElTcHJpdGUpOiBib29sZWFuIHtcclxuICAgIGxldCBpZHg6IG51bWJlciA9IHRoaXMuZ2V0U3ByaXRlSW5kZXgoc3ByaXRlKTtcclxuICAgIGlmIChpZHggPT09IC0xKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnJlbW92ZUNoaWxkQXQoaWR4KSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUFsbChpbmNsdWRlVGhpczogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgbGV0IGl0ZXI6IElFbnVtZXJhdG9yPFRyZWVOb2RlPElTcHJpdGU+PiA9IE5vZGVFbnVtZXJhdG9yRmFjdG9yeS5jcmVhdGVfYmZfcjJsX2IydF9pdGVyKHRoaXMpO1xyXG4gICAgbGV0IGN1cnJlbnQ6IFRyZWVOb2RlPElTcHJpdGU+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgd2hpbGUgKGl0ZXIubW92ZU5leHQoKSkge1xyXG4gICAgICBjdXJyZW50ID0gaXRlci5jdXJyZW50O1xyXG4gICAgICBpZiAoY3VycmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYgKGN1cnJlbnQuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSB0aGlzKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGluY2x1ZGVUaGlzID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50LmRhdGEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY3VycmVudC5kYXRhID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U3ByaXRlKGlkeDogbnVtYmVyKTogSVNwcml0ZSB7XHJcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPiB0aGlzLmNoaWxkQ291bnQgLSAxKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIuWPguaVsGlkeOi2iueVjCEhXCIpO1xyXG4gICAgfVxyXG4gICAgbGV0IHNwcjogSVNwcml0ZSB8IHVuZGVmaW5lZCA9ICh0aGlzLmdldENoaWxkQXQoaWR4KSBhcyBTcHJpdGVOb2RlKS5zcHJpdGVcclxuICAgIGlmIChzcHIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBhbGVydChcInNwcml0ZSDkuLp1bmRlZmluZWTvvIzor7fmo4Dmn6Xljp/lm6AhISFcIik7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInNwcml0ZSDkuLp1bmRlZmluZWTvvIzor7fmo4Dmn6Xljp/lm6AhISFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNwcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQYXJlbnRTcHJpdGUoKTogSVNwcml0ZSB8IHVuZGVmaW5lZCB7XHJcbiAgICBsZXQgcGFyZW50OiBTcHJpdGVOb2RlIHwgdW5kZWZpbmVkID0gdGhpcy5wYXJlbnQgYXMgU3ByaXRlTm9kZTtcclxuICAgIGlmIChwYXJlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gcGFyZW50LnNwcml0ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U3ByaXRlQ291bnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkQ291bnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U3ByaXRlSW5kZXgoc3ByaXRlOiBJU3ByaXRlKTogbnVtYmVyIHtcclxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLmNoaWxkQ291bnQ7IGkrKykge1xyXG4gICAgICBsZXQgY2hpbGQ6IFNwcml0ZU5vZGUgPSB0aGlzLmdldENoaWxkQXQoaSkgYXMgU3ByaXRlTm9kZTtcclxuICAgICAgaWYgKGNoaWxkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAoY2hpbGQuc3ByaXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGlmIChjaGlsZC5zcHJpdGUgPT09IHNwcml0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtIDE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkQ2hpbGRBdChjaGlsZDogVHJlZU5vZGU8SVNwcml0ZT4sIGluZGV4OiBudW1iZXIpOiBUcmVlTm9kZTxJU3ByaXRlPiB8IHVuZGVmaW5lZCB7XHJcbiAgICBsZXQgcmV0OiBUcmVlTm9kZTxJU3ByaXRlPiB8IHVuZGVmaW5lZCA9IHN1cGVyLmFkZENoaWxkQXQoY2hpbGQsIGluZGV4KTtcclxuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgeyAvLyByZXTkuI3kuLp1bmRlZmluZO+8jOivgeaYjuW9ouWPgmNoaWxk5oiQ5Li65LqG5b2T5YmNU3ByaXRlTm9kZeWvueixoeeahOWtkOe6p1xyXG4gICAgICBpZiAocmV0LmRhdGEpIHsgLy8gcmV0LmRhdGHlsLHmmK/lvaLlj4JjaGlsZOWGhemDqOWMheijueeahElTcHJpdGXlr7nosaFcclxuICAgICAgICByZXQuZGF0YS5vd25lciA9IHJldCBhcyBTcHJpdGVOb2RlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJldDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc3ByaXRlKCk6IElTcHJpdGUgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVDaGlsZEF0KGluZGV4OiBudW1iZXIpOiBUcmVlTm9kZTxJU3ByaXRlPiB8IHVuZGVmaW5lZCB7XHJcbiAgICBsZXQgcmV0OiBUcmVlTm9kZTxJU3ByaXRlPiB8IHVuZGVmaW5lZCA9IHN1cGVyLnJlbW92ZUNoaWxkQXQoaW5kZXgpO1xyXG4gICAgcmV0dXJuIHJldDtcclxuICB9XHJcblxyXG4gIC8vIOS7juagueiKgueCueW8gOWni+mBjeWOhu+8muaKium8oOagh+eahOS4lueVjOWdkOagh+i9rOWMluS4uuebuOWvueS6juW9k+WJjei/reS7o+WIsOeahFNwcml0ZU5vZGXljIXoo7nnmoRTcHJpdGUyROWvueixoeeahOWxgOmDqOWdkOagh++8jOeEtuWQjui/m+ihjOeisOaSnuajgOa1i++8jOS4gOeCueeisOaSnuajgOa1i+aIkOWKn+Wwsei/lOWbnuatpFNwZWl0ZTJE5a+56LGhXHJcbiAgcHVibGljIGZpbmRTcHJpdGUoc3JjOiB2ZWMyLCBsb2NhbFBvaW50OiB2ZWMyIHwgbnVsbCA9IG51bGwpOiBJU3ByaXRlIHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCBpdGVyOiBJRW51bWVyYXRvcjxUcmVlTm9kZTxJU3ByaXRlPj4gPSBOb2RlRW51bWVyYXRvckZhY3RvcnkuY3JlYXRlX2JmX3IybF9iMnRfaXRlcih0aGlzLnJvb3QpOyAvLyDku47kuIvliLDkuIrjgIHlub/luqbkvJjlhYjjgIHku47lj7PliLDlt6bpgY3ljobvvIzkuZ/lsLHmmK/or7TmnIDlkI7nu5jliLbnmoTlr7nosaHkvJjlhYjnorDmkp7mo4DmtYtcclxuICAgIGxldCBjdXJyZW50OiBUcmVlTm9kZTxJU3ByaXRlPiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIGxldCBtYXQ6IG1hdDJkO1xyXG4gICAgbGV0IGRlc3Q6IHZlYzIgPSB2ZWMyLmNyZWF0ZSgpO1xyXG4gICAgd2hpbGUgKGl0ZXIubW92ZU5leHQoKSkge1xyXG4gICAgICBjdXJyZW50ID0gaXRlci5jdXJyZW50O1xyXG4gICAgICBpZiAoY3VycmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBtYXQgPSBjdXJyZW50LmRhdGEuZ2V0TG9jYWxNYXRyaXgoKTtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgTWF0aDJELnRyYW5zZm9ybShtYXQsIHNyYywgZGVzdCk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50LmRhdGEuaGl0VGVzdChkZXN0KSkge1xyXG4gICAgICAgICAgICAgIGlmIChsb2NhbFBvaW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFBvaW50LnggPSBkZXN0Lng7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFBvaW50LnkgPSBkZXN0Lnk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHJldHVybiBjdXJyZW50LmRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvLyDpgJLlvZLnu5jliLboh6rouqvlkozoh6rouqvnmoTmiYDmnInlrZDnuqfliKtcclxuICBwdWJsaWMgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnNwcml0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3ByaXRlLmRyYXcoY29udGV4dCk7XHJcbiAgICAgIHRoaXMuX2RyYXdDaGlsZHJlbihjb250ZXh0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfZHJhd0NoaWxkcmVuKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMuY2hpbGRDb3VudDsgaSsrKSB7XHJcbiAgICAgIGxldCBjaGlsZDogVHJlZU5vZGU8SVNwcml0ZT4gfCB1bmRlZmluZWQgPSB0aGlzLmdldENoaWxkQXQoaSk7XHJcbiAgICAgIGlmIChjaGlsZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IHNwcml0ZU5vZGU6IFNwcml0ZU5vZGUgPSBjaGlsZCBhcyBTcHJpdGVOb2RlO1xyXG4gICAgICAgIHNwcml0ZU5vZGUuZHJhdyhjb250ZXh0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZShtc2VjOiBudW1iZXIsIGRpZmZTZWM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc3ByaXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zcHJpdGUudXBkYXRlKG1zZWMsIGRpZmZTZWMsIEVPcmRlci5QUkVPUkRFUik7XHJcbiAgICAgIHRoaXMuX3VwZGF0ZUNoaWxkcmVuKG1zZWMsIGRpZmZTZWMpO1xyXG4gICAgICB0aGlzLnNwcml0ZS51cGRhdGUobXNlYywgZGlmZlNlYywgRU9yZGVyLlBPU1RPUkRFUik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3VwZGF0ZUNoaWxkcmVuKG1zZWM6IG51bWJlciwgZGlmZlNlYzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRDb3VudDsgaSsrKSB7XHJcbiAgICAgIGxldCBjaGlsZDogVHJlZU5vZGU8SVNwcml0ZT4gfCB1bmRlZmluZWQgPSB0aGlzLmdldENoaWxkQXQoaSk7XHJcbiAgICAgIGlmIChjaGlsZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IHNwcml0ZU5vZGU6IFNwcml0ZU5vZGUgPSBjaGlsZCBhcyBTcHJpdGVOb2RlO1xyXG4gICAgICAgIHNwcml0ZU5vZGUudXBkYXRlKG1zZWMsIGRpZmZTZWMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3ByaXRlTm9kZUdyb3VwIGV4dGVuZHMgU3ByaXRlTm9kZSB7XHJcbiAgcHVibGljIHBhcmFtczogYW55XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtczogYW55LCBwYXJlbnQ6IFNwcml0ZU5vZGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsIG5hbWUgPSBcInNwcml0ZU5vZGVHcm91cFwiKSB7XHJcbiAgICBzdXBlcihTcHJpdGVGYWN0b3J5LmNyZWF0ZVNwcml0ZShTcHJpdGVGYWN0b3J5LmVtcHR5U2hhcGUpLCBwYXJlbnQsIG5hbWUpO1xyXG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXNcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGVOb2RlTWFuYWdlciBpbXBsZW1lbnRzIElEaXNwYXRjaGVyIHtcclxuICBwcml2YXRlIF9yb290Tm9kZTogU3ByaXRlTm9kZTtcclxuICBwcml2YXRlIF9kcmFnU3ByaXRlOiBJU3ByaXRlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gIHByaXZhdGUgX2hpdFNwcml0ZTogSVNwcml0ZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICBwdWJsaWMgY29uc3RydWN0b3Iod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgIGxldCBzcHI6IElTcHJpdGUgPSBTcHJpdGVGYWN0b3J5LmNyZWF0ZUlTcHJpdGUoU3ByaXRlRmFjdG9yeS5jcmVhdGVHcmlkKHdpZHRoLCBoZWlnaHQpKTtcclxuICAgIHNwci5uYW1lID0gJ3Jvb3QnO1xyXG4gICAgc3ByLnN0cm9rZVN0eWxlID0gXCJyZ2JhKDAsMCwwLDAuMSlcIjtcclxuICAgIHNwci5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgc3ByLnJlbmRlclR5cGUgPSBFUmVuZGVyVHlwZS5TVFJPS0VfRklMTDtcclxuICAgIHRoaXMuX3Jvb3ROb2RlID0gbmV3IFNwcml0ZU5vZGUoc3ByLCB1bmRlZmluZWQsIHNwci5uYW1lKTtcclxuICAgIHRoaXMuX3Jvb3ROb2RlLm5vZGVUeXBlID0gTm9kZVR5cGUuU1BSSVRFXHJcbiAgICB0aGlzLl9yb290Tm9kZS5uZWVkU2VyaWFsaXplID0gdHJ1ZVxyXG4gICAgc3ByLm93bmVyID0gdGhpcy5fcm9vdE5vZGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGNvbnRhaW5lcigpOiBJU3ByaXRlQ29udGFpbmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9yb290Tm9kZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgY29udGFpbmVyKHNwcjogSVNwcml0ZUNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5fcm9vdE5vZGUgPSBzcHIgYXMgU3ByaXRlTm9kZVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBkcmFnU3ByaXRlKCk6IElTcHJpdGUgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RyYWdTcHJpdGVcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaGl0U3ByaXRlKCk6IElTcHJpdGUgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hpdFNwcml0ZVxyXG4gIH1cclxuXHJcbiAgLy8g5Li66byg5qCH5ZG95Lit55qE5a+56LGh77yM5rS+5Y+R6byg5qCH5LqL5Lu2XHJcbiAgcHVibGljIGRpc3BhdGNoTW91c2VFdmVudChldnQ6IENhbnZhc01vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldnQudHlwZSA9PT0gRUlucHV0RXZlbnRUeXBlLk1PVVNFVVApIHtcclxuICAgICAgdGhpcy5fZHJhZ1Nwcml0ZSA9IHVuZGVmaW5lZDtcclxuICAgIH0gZWxzZSBpZiAoZXZ0LnR5cGUgPT09IEVJbnB1dEV2ZW50VHlwZS5NT1VTRURSQUcpIHsgLy8g5aaC5p6c5Li66byg5qCH5ouW5Yqo5LqL5Lu277yM5bm25LiU5b2T5YmN5bey57uP57yT5a2Y5LqG5ouW5Yqo55qE5a+56LGh77yM5YiZ5LiN6L+b6KGM5LiL6Z2i55qE6YCS5b2S5ZG95Lit5qOA5rWL5LqG77yM5Y+q5omn6KGM5b2T5YmN5ouW5Yqo5a+56LGh55qEbW91c2VFdmVudCgp5pa55rOVXHJcbiAgICAgIGlmICh0aGlzLl9kcmFnU3ByaXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAodGhpcy5fZHJhZ1Nwcml0ZS5tb3VzZUV2ZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLl9kcmFnU3ByaXRlLm1vdXNlRXZlbnQodGhpcy5fZHJhZ1Nwcml0ZSwgZXZ0KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDku47moLnoioLngrnpgJLlvZLlr7vmib7pvKDmoIflkb3kuK3nmoTlr7nosaHvvIzlpoLmnpzmib7liLDliJnov5Tlm57lkb3kuK3nmoRTcHJpdGXlr7nosaFcclxuICAgIC8vIOW5tuaKimV2dOWvueixoeeahGxvY2FsUG9zaXRpb27lsZ7mgKfotYvlgLzkuLrvvJrpvKDmoIfnmoTkuJbnlYzlnZDmoIfovazmjaLkuLrlkb3kuK3lr7nosaHnmoTlsYDpg6jlnZDmoIdcclxuICAgIC8vIOW5tuaKimV2dOWvueixoeeahGhhc0xvY2FsUG9zaXRpb27orr7nva7kuLp0cnVlXHJcbiAgICBsZXQgc3ByOiBJU3ByaXRlIHwgdW5kZWZpbmVkID0gdGhpcy5fcm9vdE5vZGUuZmluZFNwcml0ZShldnQuY2FudmFzUG9zaXRpb24sIGV2dC5sb2NhbFBvc2l0aW9uKTtcclxuICAgIHRoaXMuX2hpdFNwcml0ZSA9IHNwclxyXG4gICAgaWYgKHNwciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGV2dC5oYXNMb2NhbFBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgaWYgKGV2dC5idXR0b24gPT09IDAgJiYgZXZ0LnR5cGUgPT09IEVJbnB1dEV2ZW50VHlwZS5NT1VTRURPV04pIHtcclxuICAgICAgICB0aGlzLl9kcmFnU3ByaXRlID0gc3ByO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZXZ0LnR5cGUgPT09IEVJbnB1dEV2ZW50VHlwZS5NT1VTRURSQUcpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgaWYgKHNwci5tb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgc3ByLm1vdXNlRXZlbnQoc3ByLCBldnQpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZXZ0Lmhhc0xvY2FsUG9zaXRpb24gPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIOa3seW6puS8mOWFiOeahOmAkuW9kumBjeWOhuaVtOS4quagke+8jOa0vuWPkemUruebmOS6i+S7tlxyXG4gIHB1YmxpYyBkaXNwYXRjaEtleUV2ZW50KGV2dDogQ2FudmFzS2V5Qm9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5fcm9vdE5vZGUudmlzaXQoXHJcbiAgICAgIChub2RlOiBUcmVlTm9kZTxJU3ByaXRlPik6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmIChub2RlLmRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgaWYgKG5vZGUuZGF0YS5rZXlFdmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBub2RlLmRhdGEua2V5RXZlbnQobm9kZS5kYXRhLCBldnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGRpc3BhdGNoVXBkYXRlKG1zZWM6IG51bWJlciwgZGlmZlNlYzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLl9yb290Tm9kZS51cGRhdGUobXNlYywgZGlmZlNlYyk7XHJcbiAgfVxyXG5cclxuICBkaXNwYXRjaERyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICB0aGlzLl9yb290Tm9kZS5kcmF3KGNvbnRleHQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDYW52YXNNb3VzZUV2ZW50LCBDYW52YXNLZXlCb2FyZEV2ZW50LCBFSW5wdXRFdmVudFR5cGUgfSBmcm9tIFwiLi4vYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgSVNwcml0ZUNvbnRhaW5lciwgSURpc3BhdGNoZXIsIElTcHJpdGUsIEVPcmRlciB9IGZyb20gXCIuL2ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBtYXQyZCwgTWF0aDJEIH0gZnJvbSBcIi4uL21hdGgyZFwiXHJcblxyXG5leHBvcnQgY2xhc3MgU3ByaXRlMkRNYW5hZ2VyIGltcGxlbWVudHMgSVNwcml0ZUNvbnRhaW5lciwgSURpc3BhdGNoZXIge1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSAnc3ByaXRlMmRNYW5hZ2VyJztcclxuICBwcml2YXRlIF9zcHJpdGVzOiBJU3ByaXRlW10gPSBbXTtcclxuXHJcbiAgcHVibGljIGFkZFNwcml0ZShzcHJpdGU6IElTcHJpdGUpOiBJU3ByaXRlQ29udGFpbmVyIHtcclxuICAgIHNwcml0ZS5vd25lciA9IHRoaXM7XHJcbiAgICB0aGlzLl9zcHJpdGVzLnB1c2goc3ByaXRlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZVNwcml0ZUF0KGlkeDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zcHJpdGVzLnNwbGljZShpZHgsIDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZVNwcml0ZShzcHJpdGU6IElTcHJpdGUpOiBib29sZWFuIHtcclxuICAgIGxldCBpZHggPSB0aGlzLmdldFNwcml0ZUluZGV4KHNwcml0ZSk7XHJcbiAgICBpZiAoaWR4ICE9IC0xKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlU3ByaXRlQXQoaWR4KTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlQWxsKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc3ByaXRlcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFNwcml0ZShpZHg6IG51bWJlcik6IElTcHJpdGUge1xyXG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID4gdGhpcy5fc3ByaXRlcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIuWPguaVsGlkeOi2iueVjCEhXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX3Nwcml0ZXNbaWR4XTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTcHJpdGVDb3VudCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nwcml0ZXMubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFNwcml0ZUluZGV4KHNwcml0ZTogSVNwcml0ZSk6IG51bWJlciB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3Nwcml0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMuX3Nwcml0ZXNbaV0gPT09IHNwcml0ZSkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UGFyZW50U3ByaXRlKCk6IElTcHJpdGUgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzcHJpdGU6IElTcHJpdGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gIHByaXZhdGUgX2RyYWdTcHJpdGU6IElTcHJpdGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gIHByaXZhdGUgX2hpdFNwcml0ZTogSVNwcml0ZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgcHVibGljIGdldCBjb250YWluZXIoKTogSVNwcml0ZUNvbnRhaW5lciB7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZHJhZ1Nwcml0ZSgpOiBJU3ByaXRlIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl9kcmFnU3ByaXRlXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGhpdFNwcml0ZSgpOiBJU3ByaXRlIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl9oaXRTcHJpdGVcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNwYXRjaFVwZGF0ZShtc2VjOiBudW1iZXIsIGRpZmY6IG51bWJlcik6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zcHJpdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuX3Nwcml0ZXNbaV0udXBkYXRlKG1zZWMsIGRpZmYsIEVPcmRlci5QUkVPUkRFUik7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuX3Nwcml0ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgdGhpcy5fc3ByaXRlc1tpXS51cGRhdGUobXNlYywgZGlmZiwgRU9yZGVyLlBPU1RPUkRFUik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzcGF0Y2hEcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zcHJpdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuX3Nwcml0ZXNbaV0uZHJhdyhjb250ZXh0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNwYXRjaEtleUV2ZW50KGV2dDogQ2FudmFzS2V5Qm9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgbGV0IHNwcjogSVNwcml0ZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc3ByaXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBzcHIgPSB0aGlzLl9zcHJpdGVzW2ldO1xyXG4gICAgICBpZiAoc3ByLmtleUV2ZW50KSB7XHJcbiAgICAgICAgc3ByLmtleUV2ZW50KHNwciwgZXZ0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc3BhdGNoTW91c2VFdmVudChldnQ6IENhbnZhc01vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldnQudHlwZSA9PT0gRUlucHV0RXZlbnRUeXBlLk1PVVNFVVApIHtcclxuICAgICAgdGhpcy5fZHJhZ1Nwcml0ZSA9IHVuZGVmaW5lZDtcclxuICAgIH0gZWxzZSBpZiAoZXZ0LnR5cGUgPT09IEVJbnB1dEV2ZW50VHlwZS5NT1VTRURSQUcpIHtcclxuICAgICAgaWYgKHRoaXMuX2RyYWdTcHJpdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kcmFnU3ByaXRlLm1vdXNlRXZlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuX2RyYWdTcHJpdGUubW91c2VFdmVudCh0aGlzLl9kcmFnU3ByaXRlLCBldnQpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBzcHI6IElTcHJpdGU7XHJcbiAgICBmb3IgKGxldCBpID0gdGhpcy5fc3ByaXRlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBzcHIgPSB0aGlzLl9zcHJpdGVzW2ldO1xyXG4gICAgICBsZXQgbWF0OiBtYXQyZCB8IG51bGwgPSBzcHIuZ2V0TG9jYWxNYXRyaXgoKTtcclxuICAgICAgTWF0aDJELnRyYW5zZm9ybShtYXQsIGV2dC5jYW52YXNQb3NpdGlvbiwgZXZ0LmxvY2FsUG9zaXRpb24pO1xyXG4gICAgICBpZiAoc3ByLmhpdFRlc3QoZXZ0LmxvY2FsUG9zaXRpb24pKSB7XHJcbiAgICAgICAgdGhpcy5faGl0U3ByaXRlID0gc3ByXHJcbiAgICAgICAgZXZ0Lmhhc0xvY2FsUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgIGlmIChldnQuYnV0dG9uID09PSAwICYmIGV2dC50eXBlID09PSBFSW5wdXRFdmVudFR5cGUuTU9VU0VET1dOKSB7XHJcblxyXG4gICAgICAgICAgdGhpcy5fZHJhZ1Nwcml0ZSA9IHNwcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldnQudHlwZSA9PT0gRUlucHV0RXZlbnRUeXBlLk1PVVNFRFJBRykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNwci5tb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgICBzcHIubW91c2VFdmVudChzcHIsIGV2dCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2hpdFNwcml0ZSA9IHVuZGVmaW5lZFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IElFbnVtZXJhdG9yIH0gZnJvbSBcIi4vSUVudW1lcmF0b3JcIlxyXG5pbXBvcnQgeyBOb2RlVHlwZSB9IGZyb20gJy4vc3ByaXRlU3lzdGVtL2ludGVyZmFjZSdcclxuXHJcbmV4cG9ydCB0eXBlIEluZGV4ZXIgPSAobGVuOiBudW1iZXIsIGlkeDogbnVtYmVyKSA9PiBudW1iZXI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSW5kZXhlckwyUihsZW46IG51bWJlciwgaWR4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gIHJldHVybiBpZHg7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJbmRleGVyUjJMKGxlbjogbnVtYmVyLCBpZHg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIChsZW4gLSBpZHggLSAxKTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgTm9kZUNhbGxiYWNrPFQ+ID0gKG5vZGU6IFRyZWVOb2RlPFQ+KSA9PiB2b2lkO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFkYXB0ZXI8VD4ge1xyXG4gIGFkZCh0OiBUKTogdm9pZDtcclxuICByZW1vdmUoKTogVCB8IHVuZGVmaW5lZDtcclxuICBjbGVhcigpOiB2b2lkO1xyXG4gIGxlbmd0aDogbnVtYmVyO1xyXG4gIGlzRW1wdHk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBZGFwdGVyQmFzZTxUPiBpbXBsZW1lbnRzIElBZGFwdGVyPFQ+IHtcclxuICBwcm90ZWN0ZWQgX2FycjogQXJyYXk8VD47XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2FyciA9IG5ldyBBcnJheTxUPigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZCh0OiBUKTogdm9pZCB7XHJcbiAgICB0aGlzLl9hcnIucHVzaCh0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhYnN0cmFjdCByZW1vdmUoKTogVCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgcHVibGljIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9hcnIubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc0VtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Fyci5sZW5ndGggPD0gMDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgIHRoaXMuX2FyciA9IG5ldyBBcnJheTxUPigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fYXJyLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDmoIjnu5PmnoRcclxuZXhwb3J0IGNsYXNzIFN0YWNrPFQ+IGV4dGVuZHMgQWRhcHRlckJhc2U8VD4ge1xyXG4gIHB1YmxpYyByZW1vdmUoKTogVCB8IHVuZGVmaW5lZCB7XHJcbiAgICBpZiAodGhpcy5fYXJyLmxlbmd0aCA+IDApXHJcbiAgICAgIHJldHVybiB0aGlzLl9hcnIucG9wKCk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDpmJ/liJfnu5PmnoRcclxuZXhwb3J0IGNsYXNzIFF1ZXVlPFQ+IGV4dGVuZHMgQWRhcHRlckJhc2U8VD4ge1xyXG4gIHB1YmxpYyByZW1vdmUoKTogVCB8IHVuZGVmaW5lZCB7XHJcbiAgICBpZiAodGhpcy5fYXJyLmxlbmd0aCA+IDApXHJcbiAgICAgIHJldHVybiB0aGlzLl9hcnIuc2hpZnQoKTtcclxuICAgIGVsc2VcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZTxUPiB7XHJcblxyXG4gIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg5qCR5pWw5o2u57uT5p6EXHJcbiAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcm9vdC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgIC8gICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICBcXFxyXG4gICAgICBub2RlMSAgICAgICAgICAgICAgICAgICAgICAgbm9kZTIgICAgICAgICAgICAgICAgICBub2RlM1xyXG4gICAgLyAgIHwgICBcXCAgICAgICAgICAgICAgICAgICAgLyAgICAgIFxcICAgICAgICAgICAgICAgICAgfFxyXG5ub2RlNCAgbm9kZTUgbm9kZTYgICAgICAgICAgICAgIG5vZGU3ICAgbm9kZTggICAgICAgICAgICAgbm9kZTlcclxuICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICB8XHJcbm5vZGUxMCAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUxMSAgbm9kZTEyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlMTNcclxuICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihkYXRhOiBUIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLCBwYXJlbnQ6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLCBuYW1lOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICB0aGlzLl9jaGlsZHJlbiA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgaWYgKHRoaXMuX3BhcmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuX3BhcmVudC5hZGRDaGlsZCh0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRDaGlsZEF0KGNoaWxkOiBUcmVlTm9kZTxUPiwgaW5kZXg6IG51bWJlcik6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkIHtcclxuICAgIC8vIOWFiOimgeS/neivgeS8oOWFpeeahOW9ouWPgmNoaWxk5a+56LGh5LiN5piv5q2k5a+56LGh55qE54i26IqC54K5XHJcbiAgICBpZiAodGhpcy5pc0Rlc2NlbmRhbnRPZihjaGlsZCkpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fY2hpbGRyZW4gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyB0aGlzLl9jaGlsZHJlbiA9IFtdO1xyXG4gICAgICB0aGlzLl9jaGlsZHJlbiA9IG5ldyBBcnJheTxUcmVlTm9kZTxUPj4oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8PSB0aGlzLl9jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgaWYgKGNoaWxkLl9wYXJlbnQpIHsgLy8g5aaC5p6c5Lyg5YWl55qE5b2i5Y+CY2hpbGTlt7Lnu4/mnIlfcGFyZW5077yM5YiZ5YWI5oqK5q2k5a+56LGh5LuOX3BhcmVudC5fY2hpbGRyZW7kuK3np7vpmaRcclxuICAgICAgICBjaGlsZC5fcGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKTtcclxuICAgICAgfVxyXG4gICAgICBjaGlsZC5fcGFyZW50ID0gdGhpcztcclxuICAgICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBjaGlsZCk7XHJcbiAgICAgIHJldHVybiBjaGlsZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkQ2hpbGQoY2hpbGQ6IFRyZWVOb2RlPFQ+KTogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKHRoaXMuX2NoaWxkcmVuID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmFkZENoaWxkQXQoY2hpbGQsIHRoaXMuX2NoaWxkcmVuLmxlbmd0aCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHVibGljIHJlbW92ZUNoaWxkQXQoaW5kZXg6IG51bWJlcik6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkIHtcclxuICAgIGlmICh0aGlzLl9jaGlsZHJlbiA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgIGxldCBjaGlsZDogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQgPSB0aGlzLmdldENoaWxkQXQoaW5kZXgpO1xyXG5cclxuICAgIGlmIChjaGlsZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIGNoaWxkLl9wYXJlbnQgPSB1bmRlZmluZWQ7IC8vIOWwhuWtkOiKgueCueeahOeItuS6suiKgueCueiuvue9ruS4unVuZGVmaW5lZFxyXG4gICAgcmV0dXJuIGNoaWxkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUNoaWxkKGNoaWxkOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCk6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkIHtcclxuICAgIGlmIChjaGlsZCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fY2hpbGRyZW4gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBpbmRleDogbnVtYmVyID0gLTE7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmdldENoaWxkQXQoaSkgPT09IGNoaWxkKSB7XHJcbiAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnJlbW92ZUNoaWxkQXQoaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fY2hpbGRyZW4pIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuW2ldLl9wYXJlbnQgPSB1bmRlZmluZWRcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5fY2hpbGRyZW4gPSB1bmRlZmluZWRcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmUoKTogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKHRoaXMuX3BhcmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENoaWxkQXQoaW5kZXg6IG51bWJlcik6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkIHtcclxuICAgIGlmICh0aGlzLl9jaGlsZHJlbiA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLl9jaGlsZHJlbi5sZW5ndGgpXHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW5baW5kZXhdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBjaGlsZENvdW50KCk6IG51bWJlciB7XHJcbiAgICBpZiAodGhpcy5fY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhc0NoaWxkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fY2hpbGRyZW4ubGVuZ3RoID4gMDtcclxuICB9XHJcblxyXG4gIC8vIOafpeeci+W9k+WJjeiKgueCueeahOeItue6p+acieayoeaciWFuY2VzdG9y5a+56LGhXHJcbiAgcHVibGljIGlzRGVzY2VuZGFudE9mKGFuY2VzdG9yOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGFuY2VzdG9yID09PSB1bmRlZmluZWQpXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIGZvciAobGV0IG5vZGU6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkID0gdGhpcy5fcGFyZW50OyBub2RlICE9PSB1bmRlZmluZWQ7IG5vZGUgPSBub2RlLl9wYXJlbnQpIHtcclxuICAgICAgaWYgKG5vZGUgPT09IGFuY2VzdG9yKVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBjaGlsZHJlbigpOiBBcnJheTxUcmVlTm9kZTxUPj4gfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBwYXJlbnQoKTogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgcm9vdCgpOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCB7XHJcbiAgICBsZXQgY3VycjogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQgPSB0aGlzO1xyXG4gICAgd2hpbGUgKGN1cnIgIT09IHVuZGVmaW5lZCAmJiBjdXJyLnBhcmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGN1cnIgPSBjdXJyLnBhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycjtcclxuICB9XHJcblxyXG4gIC8vIOa3seW6pu+8jOS+i+Wmgm5vZGUx55qE5rex5bqm5pivMVxyXG4gIHB1YmxpYyBnZXQgZGVwdGgoKTogbnVtYmVyIHtcclxuICAgIGxldCBjdXJyOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCA9IHRoaXM7XHJcbiAgICBsZXQgbGV2ZWw6IG51bWJlciA9IDA7XHJcbiAgICB3aGlsZSAoY3VyciAhPT0gdW5kZWZpbmVkICYmIGN1cnIucGFyZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY3VyciA9IGN1cnIucGFyZW50O1xyXG4gICAgICBsZXZlbCsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxldmVsO1xyXG4gIH1cclxuXHJcbiAgLy8g6YCS5b2S55qE6YGN5Y6G566X5rOV77ya5rex5bqm5LyY5YWI77yM5LuO5LiK5Yiw5LiLXHJcbiAgcHVibGljIHZpc2l0KHByZU9yZGVyRnVuYzogTm9kZUNhbGxiYWNrPFQ+IHwgbnVsbCA9IG51bGwsIHBvc3RPcmRlckZ1bmM6IE5vZGVDYWxsYmFjazxUPiB8IG51bGwgPSBudWxsLCBpbmRleEZ1bmM6IEluZGV4ZXIgPSBJbmRleGVyTDJSKTogdm9pZCB7XHJcbiAgICBpZiAocHJlT3JkZXJGdW5jICE9PSBudWxsKSB7XHJcbiAgICAgIHByZU9yZGVyRnVuYyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYXJyOiBBcnJheTxUcmVlTm9kZTxUPj4gfCB1bmRlZmluZWQgPSB0aGlzLl9jaGlsZHJlbjtcclxuICAgIGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGNoaWxkOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCA9IHRoaXMuZ2V0Q2hpbGRBdChpbmRleEZ1bmMoYXJyLmxlbmd0aCwgaSkpO1xyXG4gICAgICAgIGlmIChjaGlsZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjaGlsZC52aXNpdChwcmVPcmRlckZ1bmMsIHBvc3RPcmRlckZ1bmMsIGluZGV4RnVuYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBvc3RPcmRlckZ1bmMgIT09IG51bGwpIHtcclxuICAgICAgcG9zdE9yZGVyRnVuYyh0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIOmAkuW9kueahOmBjeWOhueul+azle+8mua3seW6puS8mOWFiO+8jOS7juS4iuWIsOS4i++8jOS7juW3puWIsOWPs1xyXG4gIHB1YmxpYyB2aXNpdEZvcndhcmQocHJlT3JkZXJGdW5jOiBOb2RlQ2FsbGJhY2s8VD4gfCBudWxsID0gbnVsbCwgcG9zdE9yZGVyRnVuYzogTm9kZUNhbGxiYWNrPFQ+IHwgbnVsbCA9IG51bGwpOiB2b2lkIHtcclxuICAgIGlmIChwcmVPcmRlckZ1bmMpIHtcclxuICAgICAgcHJlT3JkZXJGdW5jKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgbGV0IG5vZGU6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkID0gdGhpcy5maXJzdENoaWxkO1xyXG4gICAgd2hpbGUgKG5vZGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBub2RlLnZpc2l0Rm9yd2FyZChwcmVPcmRlckZ1bmMsIHBvc3RPcmRlckZ1bmMpO1xyXG4gICAgICBub2RlID0gbm9kZS5uZXh0U2libGluZztcclxuICAgIH1cclxuICAgIGlmIChwb3N0T3JkZXJGdW5jKSB7XHJcbiAgICAgIHBvc3RPcmRlckZ1bmModGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyDpgJLlvZLnmoTpgY3ljobnrpfms5XvvJrmt7HluqbkvJjlhYjvvIzku47kuIrliLDkuIvvvIzku47lj7PliLDlt6ZcclxuICBwdWJsaWMgdmlzaXRCYWNrd2FyZChwcmVPcmRlckZ1bmM6IE5vZGVDYWxsYmFjazxUPiB8IG51bGwgPSBudWxsLCBwb3N0T3JkZXJGdW5jOiBOb2RlQ2FsbGJhY2s8VD4gfCBudWxsID0gbnVsbCk6IHZvaWQge1xyXG4gICAgaWYgKHByZU9yZGVyRnVuYykge1xyXG4gICAgICBwcmVPcmRlckZ1bmModGhpcyk7XHJcbiAgICB9XHJcbiAgICBsZXQgbm9kZTogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQgPSB0aGlzLmxhc3RDaGlsZDtcclxuICAgIHdoaWxlIChub2RlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbm9kZS52aXNpdEJhY2t3YXJkKHByZU9yZGVyRnVuYywgcG9zdE9yZGVyRnVuYyk7XHJcbiAgICAgIG5vZGUgPSBub2RlLnByZXZTaWJsaW5nO1xyXG4gICAgfVxyXG4gICAgaWYgKHBvc3RPcmRlckZ1bmMpIHtcclxuICAgICAgcG9zdE9yZGVyRnVuYyh0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIOebtOaOpeWtkOiKgueCueeahOesrOS4gOS4qlxyXG4gIHB1YmxpYyBnZXQgZmlyc3RDaGlsZCgpOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCB7XHJcbiAgICBpZiAodGhpcy5fY2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlblswXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyDnm7TmjqXlrZDoioLngrnnmoTmnIDlkI7kuIDkuKpcclxuICBwdWJsaWMgZ2V0IGxhc3RDaGlsZCgpOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCB7XHJcbiAgICBpZiAodGhpcy5fY2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlblt0aGlzLl9jaGlsZHJlbi5sZW5ndGggLSAxXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyDkuIvkuIDkuKrlhYTlvJ/oioLngrlcclxuICBwdWJsaWMgZ2V0IG5leHRTaWJsaW5nKCk6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkIHtcclxuICAgIGlmICh0aGlzLl9wYXJlbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3BhcmVudC5fY2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9wYXJlbnQuX2NoaWxkcmVuLmxlbmd0aCA+IDEpIHtcclxuICAgICAgbGV0IGlkeDogbnVtYmVyID0gLTE7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcGFyZW50Ll9jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzID09PSB0aGlzLl9wYXJlbnQuX2NoaWxkcmVuW2ldKSB7XHJcbiAgICAgICAgICBpZHggPSBpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChpZHggIT09IHRoaXMuX3BhcmVudC5fY2hpbGRyZW4ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQuX2NoaWxkcmVuW2lkeCArIDFdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyDkuIrkuIDkuKrlhYTlvJ/oioLngrlcclxuICBwdWJsaWMgZ2V0IHByZXZTaWJsaW5nKCk6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkIHtcclxuICAgIGlmICh0aGlzLl9wYXJlbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3BhcmVudC5fY2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9wYXJlbnQuX2NoaWxkcmVuLmxlbmd0aCA+IDEpIHtcclxuICAgICAgbGV0IGlkeDogbnVtYmVyID0gLSAxO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3BhcmVudC5fY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcyA9PT0gdGhpcy5fcGFyZW50Ll9jaGlsZHJlbltpXSkge1xyXG4gICAgICAgICAgaWR4ID0gaTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoaWR4ICE9PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudC5fY2hpbGRyZW5baWR4IC0gMV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIOaJgOacieWtkOWtmeiKgueCueS4reacgOWPs+S+p+eahOiKgueCuVxyXG4gIHB1YmxpYyBnZXQgbW9zdFJpZ2h0KCk6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCBub2RlOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCA9IHRoaXM7XHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICBsZXQgc3ViTm9kZTogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgIGlmIChub2RlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdWJOb2RlID0gbm9kZS5sYXN0Q2hpbGQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHN1Yk5vZGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIG5vZGUgPSBzdWJOb2RlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG5cclxuICAvLyDmiYDmnInlrZDlrZnoioLngrnkuK3mnIDlt6bkvqfnmoToioLngrlcclxuICBwdWJsaWMgZ2V0IG1vc3RMZWZ0KCk6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCBub2RlOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCA9IHRoaXM7XHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICBsZXQgc3ViTm9kZTogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgIGlmIChub2RlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdWJOb2RlID0gbm9kZS5maXJzdENoaWxkO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzdWJOb2RlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBub2RlID0gc3ViTm9kZTtcclxuICAgIH1cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgLy8g6Z2e6YCS5b2S55qE6YGN5Y6G566X5rOV77ya5rex5bqm5LyY5YWI44CB5LuO5LiK5Yiw5LiL44CB5LuO5bem5Yiw5Y+zXHJcbiAgcHVibGljIG1vdmVOZXh0KCk6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCByZXQ6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkID0gdGhpcy5maXJzdENoaWxkO1xyXG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICByZXQgPSB0aGlzLm5leHRTaWJsaW5nO1xyXG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICByZXQgPSB0aGlzO1xyXG4gICAgd2hpbGUgKHJldCAhPT0gdW5kZWZpbmVkICYmIHJldC5uZXh0U2libGluZyA9PT0gdW5kZWZpbmVkKSB7IC8vIOS4gOebtOWbnua6r+afpeaJvuacieWPs+WFhOW8n+iKgueCueeahOelluWFiOiKgueCue+8jOW5tuiuvue9ruS4uuatpOelluWFiOiKgueCuVxyXG4gICAgICByZXQgPSByZXQucGFyZW50O1xyXG4gICAgfVxyXG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSB7IC8vIOWmguaenOWtmOWcqOi/meagt+eahOelluWFiOiKgueCue+8jOWwseWPluWug+eahOWPs+WFhOW8n+iKgueCuei/lOWbnlxyXG4gICAgICByZXR1cm4gcmV0Lm5leHRTaWJsaW5nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8vIOmdnumAkuW9kueahOmBjeWOhueul+azle+8mua3seW6puS8mOWFiOOAgeS7juS4iuWIsOS4i+OAgeS7juWPs+WIsOW3plxyXG4gIHB1YmxpYyBtb3ZlUHJldigpOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCB7XHJcbiAgICBsZXQgcmV0OiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCA9IHRoaXMubGFzdENoaWxkO1xyXG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICByZXQgPSB0aGlzLnByZXZTaWJsaW5nO1xyXG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICByZXQgPSB0aGlzO1xyXG4gICAgd2hpbGUgKHJldCAhPT0gdW5kZWZpbmVkICYmIHJldC5wcmV2U2libGluZyA9PT0gdW5kZWZpbmVkKSB7IC8vIOS4gOebtOWbnua6r+afpeaJvuacieW3puWFhOW8n+iKgueCueeahOelluWFiOiKgueCue+8jOW5tuiuvue9ruS4uuatpOelluWFiOiKgueCuVxyXG4gICAgICByZXQgPSByZXQucGFyZW50O1xyXG4gICAgfVxyXG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSB7IC8vIOWmguaenOWtmOWcqOi/meagt+eahOelluWFiOiKgueCue+8jOWwseWPluWug+eahOW3puWFhOW8n+iKgueCuei/lOWbnlxyXG4gICAgICByZXR1cm4gcmV0LnByZXZTaWJsaW5nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8vIOmdnumAkuW9kueahOmBjeWOhueul+azle+8mua3seW6puS8mOWFiOOAgeS7juS4i+WIsOS4iuOAgeS7juW3puWIsOWPs1xyXG4gIC8vIOmcgOimgeS9v+eUqG1vc3RMZWZ05L2c5Li66LW35aeL5YWD57SgXHJcbiAgcHVibGljIG1vdmVOZXh0UG9zdCgpOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCB7XHJcbiAgICBsZXQgbmV4dDogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQgPSB0aGlzLm5leHRTaWJsaW5nO1xyXG4gICAgaWYgKG5leHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGZpcnN0OiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIHdoaWxlIChuZXh0ICE9PSB1bmRlZmluZWQgJiYgKGZpcnN0ID0gbmV4dC5maXJzdENoaWxkKSkgeyAvLyDlpoLmnpzmnInlj7PlhYTlvJ/oioLngrnvvIzliJnmib7liLDlj7PlhYTlvJ/oioLngrnmnIDlt6bkvqfnmoTlrZDlrZnoioLngrlcclxuICAgICAgbmV4dCA9IGZpcnN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXh0O1xyXG4gIH1cclxuXHJcbiAgLy8g6Z2e6YCS5b2S55qE6YGN5Y6G566X5rOV77ya5rex5bqm5LyY5YWI44CB5LuO5LiL5Yiw5LiK44CB5LuO5Y+z5Yiw5bemXHJcbiAgLy8g6ZyA6KaB5L2/55SobW9zdFJpZ2h05L2c5Li66LW35aeL5YWD57SgXHJcbiAgcHVibGljIG1vdmVQcmV2UG9zdCgpOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCB7XHJcbiAgICBsZXQgcHJldjogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQgPSB0aGlzLnByZXZTaWJsaW5nO1xyXG4gICAgaWYgKHByZXYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XHJcbiAgICB9XHJcbiAgICBsZXQgbGFzdDogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICB3aGlsZSAocHJldiAhPT0gdW5kZWZpbmVkICYmIChsYXN0ID0gcHJldi5sYXN0Q2hpbGQpKSB7IC8vIOWmguaenOacieW3puWFhOW8n+iKgueCue+8jOWImeaJvuWIsOW3puWFhOW8n+iKgueCueacgOWPs+S+p+eahOWtkOWtmeiKgueCuVxyXG4gICAgICBwcmV2ID0gbGFzdDtcclxuICAgIH1cclxuICAgIHJldHVybiBwcmV2O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlcGVhdFN0cmluZyh0YXJnZXQ6IHN0cmluZywgbjogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGxldCB0b3RhbDogc3RyaW5nID0gXCJcIjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgIHRvdGFsICs9IHRhcmdldDtcclxuICAgIH1cclxuICAgIHJldHVybiB0b3RhbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwcmludExldmVsSW5mbyhpZHg6IG51bWJlciA9IDApOiB2b2lkIHtcclxuICAgIGxldCBzdHI6IHN0cmluZyA9IHRoaXMucmVwZWF0U3RyaW5nKFwiIFwiLCBpZHggKiA0KTtcclxuICAgIGxldCBhcnI6IEFycmF5PFRyZWVOb2RlPFQ+PiB8IHVuZGVmaW5lZCA9IHRoaXMuX2NoaWxkcmVuO1xyXG4gICAgaWYgKGFyciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgY2hpbGQ6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkID0gdGhpcy5nZXRDaGlsZEF0KGkpO1xyXG4gICAgICAgIGlmIChjaGlsZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjaGlsZC5wcmludExldmVsSW5mbyhpZHggKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwi5ZCO5qC577yaXCIgKyBzdHIgKyB0aGlzLm5hbWUpO1xyXG4gIH1cclxuXHJcblxyXG4gIHB1YmxpYyBwcmludEluZm8oaWR4OiBudW1iZXIgPSAwKTogdm9pZCB7XHJcbiAgICBsZXQgc3RyOiBzdHJpbmcgPSB0aGlzLnJlcGVhdFN0cmluZyhcIiBcIiwgaWR4ICogNCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIuWFiOague+8mlwiICsgc3RyICsgdGhpcy5uYW1lKTtcclxuICAgIGxldCBub2RlOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCA9IHRoaXMuZmlyc3RDaGlsZDtcclxuICAgIHdoaWxlIChub2RlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbm9kZS5wcmludEluZm8oaWR4ICsgMSk7XHJcbiAgICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHByaW50SW5mbzIoaWR4OiBudW1iZXIgPSAwKTogdm9pZCB7XHJcbiAgICBsZXQgc3RyOiBzdHJpbmcgPSB0aGlzLnJlcGVhdFN0cmluZyhcIiBcIiwgaWR4ICogNCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIuWFiOague+8mlwiICsgc3RyICsgdGhpcy5uYW1lKTtcclxuICAgIGxldCBub2RlOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCA9IHRoaXMubGFzdENoaWxkO1xyXG4gICAgd2hpbGUgKG5vZGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBub2RlLnByaW50SW5mbyhpZHggKyAxKTtcclxuICAgICAgbm9kZSA9IG5vZGUucHJldlNpYmxpbmc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9wYXJlbnQ6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkO1xyXG4gIHByaXZhdGUgX2NoaWxkcmVuOiBBcnJheTxUcmVlTm9kZTxUPj4gfCB1bmRlZmluZWQ7XHJcblxyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIGRhdGE6IFQgfCB1bmRlZmluZWQ7XHJcbiAgcHVibGljIG5vZGVUeXBlOiBOb2RlVHlwZSA9IE5vZGVUeXBlLlRSRUVOT0RFXHJcbiAgcHVibGljIG5lZWRTZXJpYWxpemU6IGJvb2xlYW4gPSBmYWxzZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGlua1RyZWVOb2RlPFQ+IHtcclxuXHJcbiAgcHJpdmF0ZSBfcGFyZW50OiBMaW5rVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQ7XHJcbiAgcHJpdmF0ZSBfZmlyc3RDaGlsZDogTGlua1RyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkO1xyXG4gIHByaXZhdGUgX2xhc3RDaGlsZDogTGlua1RyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkO1xyXG4gIHByaXZhdGUgX25leHRTaWJsaW5nOiBMaW5rVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQ7XHJcbiAgcHJpdmF0ZSBfcHJldlNpYmxpbmc6IExpbmtUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZyA9ICcnO1xyXG4gIHB1YmxpYyBkYXRhOiBUIHwgdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vLyDlhYjkuIrlkI7kuIvmnprkuL7lmahcclxuZXhwb3J0IGNsYXNzIE5vZGVUMkJFbnVtZXJhdG9yPFQsIElkeEZ1bmMgZXh0ZW5kcyBJbmRleGVyLCBBZGFwdGVyIGV4dGVuZHMgSUFkYXB0ZXI8VHJlZU5vZGU8VD4+PiBpbXBsZW1lbnRzIElFbnVtZXJhdG9yPFRyZWVOb2RlPFQ+PiB7XHJcblxyXG4gIHByaXZhdGUgX25vZGU6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkO1xyXG4gIHByaXZhdGUgX2FkYXB0ZXIgITogSUFkYXB0ZXI8VHJlZU5vZGU8VD4+O1xyXG4gIHByaXZhdGUgX2N1cnJOb2RlICE6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkO1xyXG4gIHByaXZhdGUgX2luZGV4ZXIgITogSWR4RnVuYztcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKG5vZGU6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkLCBmdW5jOiBJZHhGdW5jLCBhZGFwdGVyOiBuZXcgKCkgPT4gQWRhcHRlcikge1xyXG4gICAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl9ub2RlID0gbm9kZTtcclxuICAgIHRoaXMuX2luZGV4ZXIgPSBmdW5jO1xyXG4gICAgdGhpcy5fYWRhcHRlciA9IG5ldyBhZGFwdGVyKCk7XHJcblxyXG4gICAgdGhpcy5fYWRhcHRlci5hZGQodGhpcy5fbm9kZSk7XHJcbiAgICB0aGlzLl9jdXJyTm9kZSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9ub2RlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fY3Vyck5vZGUgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLl9hZGFwdGVyLmNsZWFyKCk7XHJcbiAgICB0aGlzLl9hZGFwdGVyLmFkZCh0aGlzLl9ub2RlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaguOW/g++8mlxyXG4gICAqIOavj+asoeiwg+eUqG1vdmVOZXh0KCnpg73mmK/ku45fYWRhcHRlcuS4reWPluWHuuS4gOS4quWFg+e0oO+8iOWPluWHuuWTquS4quWFg+e0oOWPluWGs+S6jl9hZGFwdGVy55qE57G75Z6L77yM5pyJ5YWI6L+b5YWI5Ye65ZKM5YWI6L+b5ZCO5Ye677yJ6LWL5YC857uZX2N1cnJOb2Rl77yM5L2c5Li65b2T5YmN5p6a5Li+5Yiw55qE5YC8XHJcbiAgICog5LmL5ZCO5qC55o2uX2luZGV4ZXLlrprkuYnnmoTov63ku6Ppobrluo/vvIjpobrluo/miJblgJLlj5nvvInvvIzmiopfY3Vyck5vZGXnmoTmiYDmnInnm7TmjqXlrZDlhYPntKDmjInpobrluo9wdXNo6L+bX2FkYXB0ZXLkuK1cclxuICAgKiDlm6DmraTlpoLmnpxfYWRhcHRlcuS4ulN0YWNr5YiZ5piv5rex5bqm5LyY5YWI55qE5p6a5Li+77yMX2FkYXB0ZXLkuLpRdWV1ZeWImeaYr+a3seW6puS8mOWFiOeahOaemuS4vlxyXG4gICAqIOi/meS4quaemuS4vuWZqOaYr+WFiOS4iuWQjuS4i+eahOaemuS4vuWZqO+8jOWboOS4uuaUvuWFpeWIneWni+WMluaXtuaUvuWFpV9hZGFwdGVy55qE56ys5LiA5Liq5YWD57Sg5pivcm9vdOWFg+e0oFxyXG4gICAqL1xyXG4gIHB1YmxpYyBtb3ZlTmV4dCgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLl9hZGFwdGVyLmlzRW1wdHkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2N1cnJOb2RlID0gdGhpcy5fYWRhcHRlci5yZW1vdmUoKTtcclxuICAgIGlmICh0aGlzLl9jdXJyTm9kZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgbGV0IGxlbjogbnVtYmVyID0gdGhpcy5fY3Vyck5vZGUuY2hpbGRDb3VudDtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGxldCBjaGlsZElkeDogbnVtYmVyID0gdGhpcy5faW5kZXhlcihsZW4sIGkpO1xyXG4gICAgICAgIGxldCBjaGlsZDogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQgPSB0aGlzLl9jdXJyTm9kZS5nZXRDaGlsZEF0KGNoaWxkSWR4KTtcclxuICAgICAgICBpZiAoY2hpbGQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5fYWRhcHRlci5hZGQoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGN1cnJlbnQoKTogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJOb2RlO1xyXG4gIH1cclxufVxyXG5cclxuLy8g5YWI5LiL5ZCO5LiK5p6a5Li+5Zmo77yI55u45b2T5LqO5oqK5LiO5LmL5a+55bqU55qE5YWI5LiK5ZCO5LiL55qE5p6a5Li+5Zmo5YWI5omn6KGM5LiA6YGN5bm257yT5a2Y5omA5pyJ57uT5p6c77yM5b2T6LCD55SoY3VycmVudOaXtu+8jOaKiue8k+WtmOWAkuedgOi+k+WHuu+8iVxyXG5leHBvcnQgY2xhc3MgTm9kZUIyVEVudW1lcmF0b3I8VD4gaW1wbGVtZW50cyBJRW51bWVyYXRvcjxUcmVlTm9kZTxUPj4ge1xyXG4gIHByaXZhdGUgX2l0ZXI6IElFbnVtZXJhdG9yPFRyZWVOb2RlPFQ+PjtcclxuICBwcml2YXRlIF9hcnIgITogQXJyYXk8VHJlZU5vZGU8VD4gfCB1bmRlZmluZWQ+O1xyXG4gIHByaXZhdGUgX2FycklkeCAhOiBudW1iZXI7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKGl0ZXI6IElFbnVtZXJhdG9yPFRyZWVOb2RlPFQ+Pikge1xyXG4gICAgdGhpcy5faXRlciA9IGl0ZXI7XHJcbiAgICB0aGlzLnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9hcnIgPSBbXTtcclxuICAgIHdoaWxlICh0aGlzLl9pdGVyLm1vdmVOZXh0KCkpIHtcclxuICAgICAgdGhpcy5fYXJyLnB1c2godGhpcy5faXRlci5jdXJyZW50KTtcclxuICAgIH1cclxuICAgIHRoaXMuX2FycklkeCA9IHRoaXMuX2Fyci5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGN1cnJlbnQoKTogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKHRoaXMuX2FycklkeCA+PSB0aGlzLl9hcnIubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5fYXJyW3RoaXMuX2FycklkeF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbW92ZU5leHQoKTogYm9vbGVhbiB7XHJcbiAgICB0aGlzLl9hcnJJZHgtLTtcclxuICAgIHJldHVybiAodGhpcy5fYXJySWR4ID49IDAgJiYgdGhpcy5fYXJySWR4IDwgdGhpcy5fYXJyLmxlbmd0aCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBOSXRlcjxUPiA9IE5vZGVUMkJFbnVtZXJhdG9yPFQsIEluZGV4ZXIsIElBZGFwdGVyPFRyZWVOb2RlPFQ+Pj47XHJcblxyXG4vLyDmoLnmja7lhaXlj4Jub2Rl77yM6L+U5Zue5p6a5Li+5q2kbm9kZeeahOWQhOenjeaemuS4vuWZqOWvueixoVxyXG5leHBvcnQgY2xhc3MgTm9kZUVudW1lcmF0b3JGYWN0b3J5IHtcclxuXHJcbiAgLyoqIFxyXG4gICAqIC0tLS0tXHJcbiAgICog5LuO5LiK5Yiw5LiL6YGN5Y6GXHJcbiAgICogLS0tLS1cclxuICAgKi9cclxuICAvLyDmt7HluqbkvJjlhYjjgIHku47lt6bliLDlj7NcclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZV9kZl9sMnJfdDJiX2l0ZXI8VD4obm9kZTogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQpOiBJRW51bWVyYXRvcjxUcmVlTm9kZTxUPj4ge1xyXG4gICAgbGV0IGl0ZXI6IElFbnVtZXJhdG9yPFRyZWVOb2RlPFQ+PiA9IG5ldyBOb2RlVDJCRW51bWVyYXRvcihub2RlLCBJbmRleGVyUjJMLCBTdGFjayk7XHJcbiAgICByZXR1cm4gaXRlcjtcclxuICB9XHJcbiAgLy8g5rex5bqm5LyY5YWI44CB5LuO5Y+z5Yiw5bemXHJcbiAgcHVibGljIHN0YXRpYyBjcmVhdGVfZGZfcjJsX3QyYl9pdGVyPFQ+KG5vZGU6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkKTogSUVudW1lcmF0b3I8VHJlZU5vZGU8VD4+IHtcclxuICAgIGxldCBpdGVyOiBJRW51bWVyYXRvcjxUcmVlTm9kZTxUPj4gPSBuZXcgTm9kZVQyQkVudW1lcmF0b3Iobm9kZSwgSW5kZXhlckwyUiwgU3RhY2spO1xyXG4gICAgcmV0dXJuIGl0ZXI7XHJcbiAgfVxyXG4gIC8vIOW5v+W6puS8mOWFiO+8jOS7juW3puWIsOWPs1xyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlX2JmX2wycl90MmJfaXRlcjxUPihub2RlOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCk6IElFbnVtZXJhdG9yPFRyZWVOb2RlPFQ+PiB7XHJcbiAgICBsZXQgaXRlcjogSUVudW1lcmF0b3I8VHJlZU5vZGU8VD4+ID0gbmV3IE5vZGVUMkJFbnVtZXJhdG9yKG5vZGUsIEluZGV4ZXJMMlIsIFF1ZXVlKTtcclxuICAgIHJldHVybiBpdGVyO1xyXG4gIH1cclxuICAvLyDlub/luqbkvJjlhYjvvIzku47lj7PliLDlt6ZcclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZV9iZl9yMmxfdDJiX2l0ZXI8VD4obm9kZTogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQpOiBJRW51bWVyYXRvcjxUcmVlTm9kZTxUPj4ge1xyXG4gICAgbGV0IGl0ZXI6IElFbnVtZXJhdG9yPFRyZWVOb2RlPFQ+PiA9IG5ldyBOb2RlVDJCRW51bWVyYXRvcihub2RlLCBJbmRleGVyUjJMLCBRdWV1ZSk7XHJcbiAgICByZXR1cm4gaXRlcjtcclxuICB9XHJcblxyXG4gIC8qKiBcclxuICAgKiAtLS0tLVxyXG4gICAqIOS7juS4i+WIsOS4iumBjeWOhlxyXG4gICAqIC0tLS0tXHJcbiAgICovXHJcbiAgLy8g5rex5bqm5LyY5YWI44CB5LuO5bem5Yiw5Y+zXHJcbiAgcHVibGljIHN0YXRpYyBjcmVhdGVfZGZfbDJyX2IydF9pdGVyPFQ+KG5vZGU6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkKTogSUVudW1lcmF0b3I8VHJlZU5vZGU8VD4+IHtcclxuICAgIGxldCBpdGVyOiBJRW51bWVyYXRvcjxUcmVlTm9kZTxUPj4gPSBuZXcgTm9kZUIyVEVudW1lcmF0b3I8VD4oTm9kZUVudW1lcmF0b3JGYWN0b3J5LmNyZWF0ZV9kZl9yMmxfdDJiX2l0ZXIobm9kZSkpO1xyXG4gICAgcmV0dXJuIGl0ZXI7XHJcbiAgfVxyXG4gIC8vIOa3seW6puS8mOWFiOOAgeS7juWPs+WIsOW3plxyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlX2RmX3IybF9iMnRfaXRlcjxUPihub2RlOiBUcmVlTm9kZTxUPiB8IHVuZGVmaW5lZCk6IElFbnVtZXJhdG9yPFRyZWVOb2RlPFQ+PiB7XHJcbiAgICBsZXQgaXRlcjogSUVudW1lcmF0b3I8VHJlZU5vZGU8VD4+ID0gbmV3IE5vZGVCMlRFbnVtZXJhdG9yPFQ+KE5vZGVFbnVtZXJhdG9yRmFjdG9yeS5jcmVhdGVfZGZfbDJyX3QyYl9pdGVyKG5vZGUpKTtcclxuICAgIHJldHVybiBpdGVyO1xyXG4gIH1cclxuICAvLyDlub/luqbkvJjlhYjjgIHku47lt6bliLDlj7NcclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZV9iZl9sMnJfYjJ0X2l0ZXI8VD4obm9kZTogVHJlZU5vZGU8VD4gfCB1bmRlZmluZWQpOiBJRW51bWVyYXRvcjxUcmVlTm9kZTxUPj4ge1xyXG4gICAgbGV0IGl0ZXI6IElFbnVtZXJhdG9yPFRyZWVOb2RlPFQ+PiA9IG5ldyBOb2RlQjJURW51bWVyYXRvcjxUPihOb2RlRW51bWVyYXRvckZhY3RvcnkuY3JlYXRlX2JmX3IybF90MmJfaXRlcihub2RlKSk7XHJcbiAgICByZXR1cm4gaXRlcjtcclxuICB9XHJcbiAgLy8g5bm/5bqm5LyY5YWI44CB5LuO5Y+z5Yiw5bem77yI5YGa6byg5qCH56Kw5pKe5qOA5rWL5pe277yM6YeH55So5q2k56eN5p6a5Li+5pa55byP77yJXHJcbiAgcHVibGljIHN0YXRpYyBjcmVhdGVfYmZfcjJsX2IydF9pdGVyPFQ+KG5vZGU6IFRyZWVOb2RlPFQ+IHwgdW5kZWZpbmVkKTogSUVudW1lcmF0b3I8VHJlZU5vZGU8VD4+IHtcclxuICAgIGxldCBpdGVyOiBJRW51bWVyYXRvcjxUcmVlTm9kZTxUPj4gPSBuZXcgTm9kZUIyVEVudW1lcmF0b3I8VD4oTm9kZUVudW1lcmF0b3JGYWN0b3J5LmNyZWF0ZV9iZl9sMnJfdDJiX2l0ZXIobm9kZSkpO1xyXG4gICAgcmV0dXJuIGl0ZXI7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBTcHJpdGUyREFwcGxpY2F0aW9uIH0gZnJvbSBcIi4vbGliL3Nwcml0ZVN5c3RlbS9zcHJpdGUyREFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IElTcHJpdGUsIEVPcmRlciwgSVNoYXBlLCBCb3VuZGluZywgTm9kZVR5cGUsIFNjZW5lTW9kZSwgU3ByaXRlRmFjdG9yeSwgRVJlbmRlclR5cGUgfSBmcm9tIFwiLi9saWIvc3ByaXRlU3lzdGVtL2ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYW52YXNNb3VzZUV2ZW50LCBFSW5wdXRFdmVudFR5cGUgfSBmcm9tIFwiLi9saWIvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgdmVjMiwgTWF0aDJEIH0gZnJvbSBcIi4vbGliL21hdGgyZFwiO1xyXG5pbXBvcnQgeyBTcHJpdGVOb2RlLCBTcHJpdGVOb2RlR3JvdXAgfSBmcm9tICcuL2xpYi9zcHJpdGVTeXN0ZW0vc3ByaXRlMmRIaWVyYXJjaGljYWxTeXN0ZW0nXHJcbmltcG9ydCB7IFRyZWVOb2RlLCBOb2RlRW51bWVyYXRvckZhY3RvcnkgfSBmcm9tIFwiLi9saWIvdHJlZU5vZGVcIjtcclxuaW1wb3J0IHsgSUVudW1lcmF0b3IgfSBmcm9tIFwiLi9saWIvSUVudW1lcmF0b3JcIlxyXG5pbXBvcnQgeyBOb2RlRGF0YSB9IGZyb20gXCIuL2xpYi9Ob2RlRGF0YVwiXHJcblxyXG5pbXBvcnQgeyBMaW5rRmFjdG9yeSB9IGZyb20gJy4vZmFjdG9yeS9MaW5rRmFjdG9yeSdcclxuaW1wb3J0IHsgSG9yaXpvbnRhbEZsZXhMaW5rRmFjdG9yeSB9IGZyb20gJy4vZmFjdG9yeS9Ib3Jpem9udGFsRmxleExpbmtGYWN0b3J5J1xyXG5pbXBvcnQgeyBWZXJ0aWNhbEZsZXhMaW5rRmFjdG9yeSB9IGZyb20gJy4vZmFjdG9yeS9WZXJ0aWNhbEZsZXhMaW5rRmFjdG9yeSdcclxuaW1wb3J0IHsgUGFuZWxQb2ludEZhY3RvcnkgfSBmcm9tICcuL2ZhY3RvcnkvUGFuZWxQb2ludEZhY3RvcnknXHJcbmltcG9ydCB7IENvbnRhaW5lckZhY3RvcnkgfSBmcm9tICcuL2ZhY3RvcnkvQ29udGFpbmVyRmFjdG9yeSdcclxuaW1wb3J0IHsgUGFuZWxSZWN0RmFjdG9yeSB9IGZyb20gJy4vZmFjdG9yeS9QYW5lbFJlY3RGYWN0b3J5J1xyXG5cclxuaW1wb3J0IHsgU3ByaXRlMkQgfSBmcm9tICcuL2xpYi9zcHJpdGVTeXN0ZW0vc3ByaXRlMmQnXHJcblxyXG5cclxuXHJcbmludGVyZmFjZSBXaGVlbEV2ZW50IGV4dGVuZHMgRXZlbnQge1xyXG4gIHdoZWVsRGVsdGE6IG51bWJlcixcclxuICBkZXRhaWw6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgZW51bSBXaGVlbFR5cGUge1xyXG4gIFVQLFxyXG4gIERPV05cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvcG9sb2d5QXBwbGljYXRpb24ge1xyXG4gIHByaXZhdGUgX2FwcDogU3ByaXRlMkRBcHBsaWNhdGlvblxyXG4gIHB1YmxpYyBfY3VyWm9vbSA9IDFcclxuICBwdWJsaWMgbGFzdFdoZWVsTW91c2VYID0gMFxyXG4gIHB1YmxpYyBsYXN0V2hlZWxNb3VzZVkgPSAwXHJcbiAgcHVibGljIF9pc01vdXNlRG93biA9IGZhbHNlXHJcbiAgcHVibGljIF9pc1N0YWdlSGFzRHJhZyA9IGZhbHNlXHJcbiAgcHVibGljIF9kaWZmWCA9IDAgLy8g6byg5qCH5oyJ5LiL55qE5LiW55WM5Z2Q5qCH5LiOcm9vdFNwcuW3puS4iuinkuS4lueVjOWdkOagh+eahOW3rlxyXG4gIHB1YmxpYyBfZGlmZlkgPSAwXHJcbiAgcHVibGljIF9kb3duWCA9IDAgLy8g6byg5qCH5oyJ5LiL5pe255qE5LiW55WM5Z2Q5qCHXHJcbiAgcHVibGljIF9kb3duWSA9IDBcclxuICBwdWJsaWMgX3NlbGVjdEFyZWFWZXJ0ZXhzOiBBcnJheTxudW1iZXI+ID0gW10gLy8g6YCJ5qGG55qEeCx5LHcsaFxyXG4gIHB1YmxpYyBfc2VsZWN0ZWRTcHJpdGVzOiBBcnJheTxJU3ByaXRlPiA9IFtdXHJcbiAgcHVibGljIF9ob3ZlcmluZ1Nwcml0ZTogSVNwcml0ZSB8IG51bGwgPSBudWxsXHJcbiAgcHVibGljIF9zcHJNZW51OiBIVE1MRWxlbWVudCB8IG51bGxcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKGFwcDogU3ByaXRlMkRBcHBsaWNhdGlvbikge1xyXG4gICAgdGhpcy5fYXBwID0gYXBwXHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgICAvLyB0aGlzLmluaXQyKCk7XHJcbiAgICAvLyB0aGlzLmluaXQzKClcclxuICAgIHRoaXMuX2FwcC5zdGFydCgpO1xyXG4gICAgdGhpcy5fc3ByTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3ByTWVudVwiKTtcclxuXHJcbiAgICBjb25zdCB6b29tSW5CdXR0b246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3pvb21JTicpIGFzIEhUTUxFbGVtZW50XHJcbiAgICBjb25zdCB6b29tT3V0QnV0dG9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN6b29tT3V0JykgYXMgSFRNTEVsZW1lbnRcclxuICAgIHpvb21JbkJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLl9jdXJab29tICo9IDEuMlxyXG4gICAgICB0aGlzLmhhbmRsZVNjYWxlQ2hhbmdlKHRoaXMubGFzdFdoZWVsTW91c2VYLCB0aGlzLmxhc3RXaGVlbE1vdXNlWSwgV2hlZWxUeXBlLlVQKVxyXG4gICAgfVxyXG4gICAgem9vbU91dEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLl9jdXJab29tIC89IDEuMlxyXG4gICAgICB0aGlzLmhhbmRsZVNjYWxlQ2hhbmdlKHRoaXMubGFzdFdoZWVsTW91c2VYLCB0aGlzLmxhc3RXaGVlbE1vdXNlWSwgV2hlZWxUeXBlLkRPV04pXHJcbiAgICB9XHJcbiAgICB0aGlzLmxhc3RXaGVlbE1vdXNlWCA9IHRoaXMuX2FwcC5jYW52YXMub2Zmc2V0V2lkdGggLyAyXHJcbiAgICB0aGlzLmxhc3RXaGVlbE1vdXNlWSA9IHRoaXMuX2FwcC5jYW52YXMub2Zmc2V0SGVpZ2h0IC8gMlxyXG5cclxuXHJcbiAgICB0aGlzLl9hcHAuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcykpXHJcbiAgICB0aGlzLl9hcHAuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXAuYmluZCh0aGlzKSlcclxuICAgIHRoaXMuX2FwcC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKSlcclxuICAgIHRoaXMuX2FwcC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIHRoaXMuaGFuZGxlV2hlZWwuYmluZCh0aGlzKSlcclxuICAgIHRoaXMuX2FwcC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCB0aGlzLmhhbmRsZVdoZWVsLmJpbmQodGhpcykpXHJcblxyXG5cclxuICAgIGNvbnN0IGFkZEJ0bjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkQnRuJykgYXMgSFRNTEVsZW1lbnRcclxuICAgIGFkZEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCByb290ID0gdGhpcy5fYXBwLnJvb3RDb250YWluZXIgYXMgU3ByaXRlTm9kZVxyXG4gICAgICBjb25zdCByZWN0Tm9kZTQ6IFNwcml0ZU5vZGUgPSBQYW5lbFJlY3RGYWN0b3J5LmNyZWF0ZShyb290LCAncmVjdE5vZGU0JywgbmV3IHZlYzIoMjAsIDIwKSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2F2ZUJ0bjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2F2ZUJ0bicpIGFzIEhUTUxFbGVtZW50XHJcbiAgICBzYXZlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJvb3QgPSB0aGlzLl9hcHAucm9vdENvbnRhaW5lciBhcyBTcHJpdGVOb2RlXHJcbiAgICAgIGxldCBqc29uID0gdGhpcy5jb252ZXJ0VHJlZVRvSnNvblN0cmluZyhyb290KVxyXG4gICAgICBjb25zb2xlLmxvZyhqc29uKVxyXG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NoYXJ0SlNPTicsIGpzb24pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdG9yZUJ0bjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdG9yZUJ0bicpIGFzIEhUTUxFbGVtZW50XHJcbiAgICByZXN0b3JlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIC8vIGNvbnN0IHJvb3QgPSB0aGlzLl9hcHAucm9vdENvbnRhaW5lciBhcyBTcHJpdGVOb2RlXHJcbiAgICAgIC8vIHJvb3QuY2xlYXJDaGlsZHJlbigpXHJcbiAgICAgIGxldCBqc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaGFydEpTT04nKVxyXG4gICAgICBpZiAoanNvbikge1xyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5jb252ZXJ0SnNvblN0cmluZ1RvVHJlZShqc29uKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyb290Jywgcm9vdClcclxuICAgICAgICBpZiAocm9vdCkge1xyXG4gICAgICAgICAgdGhpcy5fYXBwLnJvb3RDb250YWluZXIgPSByb290XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZHJhZ01vZGVCdG46IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RyYWdNb2RlQnRuJykgYXMgSFRNTEVsZW1lbnRcclxuICAgIGRyYWdNb2RlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2FwcC5zY2VuZU1vZGUgPSBTY2VuZU1vZGUuRFJBR1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdE1vZGVCdG46IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbGVjdE1vZGVCdG4nKSBhcyBIVE1MRWxlbWVudFxyXG4gICAgc2VsZWN0TW9kZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLl9hcHAuc2NlbmVNb2RlID0gU2NlbmVNb2RlLlNFTEVDVFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyQWxsU2VsZWN0ZWRTcHJpdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZFNwcml0ZXMuZm9yRWFjaChzcHIgPT4ge1xyXG4gICAgICBzcHIuaXNTZWxlY3RlZCA9IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgdGhpcy5fc2VsZWN0ZWRTcHJpdGVzID0gW11cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVTZWxlY3RlZFNwcml0ZShzcHI6IElTcHJpdGUpOiBJU3ByaXRlIHtcclxuICAgIHNwci5pc1NlbGVjdGVkID0gZmFsc2VcclxuICAgIGxldCBpbmRleCA9IHRoaXMuX3NlbGVjdGVkU3ByaXRlcy5maW5kSW5kZXgoaXRlbSA9PiB7XHJcbiAgICAgIHJldHVybiBpdGVtID09PSBzcHJcclxuICAgIH0pXHJcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkU3ByaXRlcy5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3ByXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkU2VsZWN0ZWRTcHJpdGUoc3ByOiBJU3ByaXRlKTogSVNwcml0ZSB7XHJcbiAgICBzcHIuaXNTZWxlY3RlZCA9IHRydWVcclxuICAgIGxldCBpbmRleCA9IHRoaXMuX3NlbGVjdGVkU3ByaXRlcy5maW5kSW5kZXgoaXRlbSA9PiB7XHJcbiAgICAgIHJldHVybiBpdGVtID09PSBzcHJcclxuICAgIH0pXHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkU3ByaXRlcy5wdXNoKHNwcilcclxuICAgIH1cclxuICAgIHJldHVybiBzcHJcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlTW91c2VEb3duKGV2dDogRXZlbnQpOiB2b2lkIHtcclxuICAgIGxldCBldmVudCA9IGV2dCBhcyBNb3VzZUV2ZW50XHJcbiAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwKSB7XHJcbiAgICAgIGNvbnN0IHJvb3QgPSB0aGlzLl9hcHAucm9vdENvbnRhaW5lciBhcyBTcHJpdGVOb2RlXHJcbiAgICAgIGNvbnN0IHJvb3RTcHIgPSByb290LnNwcml0ZVxyXG4gICAgICBjb25zdCBtb3VzZU9mZnNldDogdmVjMiA9IHRoaXMuX2FwcC5fdmlld3BvcnRUb0NhbnZhc0Nvb3JkaW5hdGUoZXZlbnQpXHJcbiAgICAgIGlmIChyb290U3ByKSB7XHJcbiAgICAgICAgdGhpcy5fZGlmZlggPSBtb3VzZU9mZnNldC54IC0gcm9vdFNwci54XHJcbiAgICAgICAgdGhpcy5fZGlmZlkgPSBtb3VzZU9mZnNldC55IC0gcm9vdFNwci55XHJcbiAgICAgICAgdGhpcy5faXNNb3VzZURvd24gPSB0cnVlXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fZG93blggPSBtb3VzZU9mZnNldC54XHJcbiAgICAgIHRoaXMuX2Rvd25ZID0gbW91c2VPZmZzZXQueVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9zcHJNZW51KSB7XHJcbiAgICAgIHRoaXMuX3Nwck1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVNb3VzZVVwKGV2dDogRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuX2lzTW91c2VEb3duID0gZmFsc2VcclxuXHJcbiAgICBsZXQgaGl0U3ByaXRlID0gdGhpcy5fYXBwLmdldEhpdFNwcml0ZSgpXHJcbiAgICAvLyDlpoLmnpzngrnlh7vkuobnqbrnmb3ljLrln5/vvIjlubbkuJTmsqHmnInmi5bliqjku7vkvZXlhYPntKDvvInvvIzliJnlj5bmtojmiYDmnIlzcHJpdGXnmoTpgInkuK3nirbmgIFcclxuICAgIGlmICgoaGl0U3ByaXRlID09PSB1bmRlZmluZWQgfHwgaGl0U3ByaXRlLm93bmVyLm5hbWUgPT09ICdyb290JykgJiYgdGhpcy5faXNTdGFnZUhhc0RyYWcgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJBbGxTZWxlY3RlZFNwcml0ZSgpXHJcbiAgICB9XHJcbiAgICB0aGlzLl9pc1N0YWdlSGFzRHJhZyA9IGZhbHNlXHJcbiAgICB0aGlzLl9hcHAub3BlcmF0aW9ucyA9IFtdXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZU1vdXNlTW92ZShldnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCByb290ID0gdGhpcy5fYXBwLnJvb3RDb250YWluZXIgYXMgU3ByaXRlTm9kZVxyXG4gICAgY29uc3Qgcm9vdFNwciA9IHJvb3Quc3ByaXRlXHJcbiAgICBpZiAocm9vdFNwcikge1xyXG4gICAgICBpZiAodGhpcy5faXNNb3VzZURvd24gJiYgIXRoaXMuX2FwcC5nZXREcmFnU3ByaXRlKCkgfHwgdGhpcy5fYXBwLmdldERyYWdTcHJpdGUoKSA9PT0gcm9vdFNwcikge1xyXG4gICAgICAgIHRoaXMuX2lzU3RhZ2VIYXNEcmFnID0gdHJ1ZVxyXG5cclxuICAgICAgICAvLyDmi5bliqhzdGFnZVxyXG4gICAgICAgIGlmICh0aGlzLl9hcHAuc2NlbmVNb2RlID09PSBTY2VuZU1vZGUuRFJBRykge1xyXG4gICAgICAgICAgbGV0IG1vdXNlT2Zmc2V0OiB2ZWMyID0gdGhpcy5fYXBwLl92aWV3cG9ydFRvQ2FudmFzQ29vcmRpbmF0ZShldnQgYXMgTW91c2VFdmVudClcclxuICAgICAgICAgIHJvb3RTcHIueCA9IG1vdXNlT2Zmc2V0LnggLSB0aGlzLl9kaWZmWFxyXG4gICAgICAgICAgcm9vdFNwci55ID0gbW91c2VPZmZzZXQueSAtIHRoaXMuX2RpZmZZXHJcbiAgICAgICAgICBpZiAodGhpcy5fc3ByTWVudSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zcHJNZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOe7mOWItumAieahhlxyXG4gICAgICAgIGlmICh0aGlzLl9hcHAuc2NlbmVNb2RlID09PSBTY2VuZU1vZGUuU0VMRUNUKSB7XHJcbiAgICAgICAgICBsZXQgbW91c2VPZmZzZXQ6IHZlYzIgPSB0aGlzLl9hcHAuX3ZpZXdwb3J0VG9DYW52YXNDb29yZGluYXRlKGV2dCBhcyBNb3VzZUV2ZW50KVxyXG4gICAgICAgICAgbGV0IHAxID0gbmV3IHZlYzIodGhpcy5fZG93blgsIHRoaXMuX2Rvd25ZKVxyXG4gICAgICAgICAgbGV0IHAyID0gbmV3IHZlYzIobW91c2VPZmZzZXQueCwgbW91c2VPZmZzZXQueSlcclxuICAgICAgICAgIGxldCB4ID0gcDEueCA+PSBwMi54ID8gcDIueCA6IHAxLnhcclxuICAgICAgICAgIGxldCB5ID0gcDEueSA+PSBwMi55ID8gcDIueSA6IHAxLnlcclxuICAgICAgICAgIGxldCB3ID0gTWF0aC5hYnMocDEueCAtIHAyLngpXHJcbiAgICAgICAgICBsZXQgaCA9IE1hdGguYWJzKHAxLnkgLSBwMi55KVxyXG4gICAgICAgICAgdGhpcy5fc2VsZWN0QXJlYVZlcnRleHNbMF0gPSB4XHJcbiAgICAgICAgICB0aGlzLl9zZWxlY3RBcmVhVmVydGV4c1sxXSA9IHlcclxuICAgICAgICAgIHRoaXMuX3NlbGVjdEFyZWFWZXJ0ZXhzWzJdID0gd1xyXG4gICAgICAgICAgdGhpcy5fc2VsZWN0QXJlYVZlcnRleHNbM10gPSBoXHJcbiAgICAgICAgICBsZXQgZ2V0T3BlcmF0aW9uRnVuID0gKHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB8IG51bGwpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zYXZlKClcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKClcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBcInJnYmEoMCwwLDIzNiwwLjUpXCJcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDAsMCwyMzYsMC4yKVwiXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlY3QoeCwgeSwgdywgaClcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5fYXBwLm9wZXJhdGlvbnMgPSBbXVxyXG4gICAgICAgICAgdGhpcy5fYXBwLm9wZXJhdGlvbnNbMF0gPSBnZXRPcGVyYXRpb25GdW4oeCwgeSwgdywgaClcclxuICAgICAgICAgIHRoaXMuY2FsY0luU2VsZWN0QXJhZSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIOWmguaenOm8oOagh+enu+WKqOWIsOS6huepuueZveWMuuWfn++8jOWImeWPlua2iOaJgOaciXNwcml0ZeeahGhvdmVy54q25oCBXHJcbiAgICAgIGxldCBoaXRTcHJpdGUgPSB0aGlzLl9hcHAuZ2V0SGl0U3ByaXRlKClcclxuICAgICAgaWYgKGhpdFNwcml0ZSA9PT0gdW5kZWZpbmVkIHx8IGhpdFNwcml0ZS5vd25lci5uYW1lID09PSAncm9vdCcpIHtcclxuICAgICAgICBpZiAodGhpcy5faG92ZXJpbmdTcHJpdGUpIHtcclxuICAgICAgICAgIHRoaXMuX2hvdmVyaW5nU3ByaXRlLmlzSG92ZXJpbmcgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8g6K6h566X5omA5pyJc3ByaXRl5piv5ZCm5Zyo6YCJ5Yy65YaFXHJcbiAgcHJpdmF0ZSBjYWxjSW5TZWxlY3RBcmFlKCkge1xyXG4gICAgY29uc3Qgcm9vdCA9IHRoaXMuX2FwcC5yb290Q29udGFpbmVyIGFzIFNwcml0ZU5vZGVcclxuICAgIGxldCBpdGVyOiBJRW51bWVyYXRvcjxUcmVlTm9kZTxJU3ByaXRlPj4gPSBOb2RlRW51bWVyYXRvckZhY3RvcnkuY3JlYXRlX2JmX3IybF9iMnRfaXRlcihyb290KTtcclxuICAgIGxldCBjdXJyZW50OiBUcmVlTm9kZTxJU3ByaXRlPiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuY2xlYXJBbGxTZWxlY3RlZFNwcml0ZSgpXHJcbiAgICB3aGlsZSAoaXRlci5tb3ZlTmV4dCgpKSB7XHJcbiAgICAgIGN1cnJlbnQgPSBpdGVyLmN1cnJlbnQ7XHJcbiAgICAgIGlmIChjdXJyZW50ICYmIGN1cnJlbnQuZGF0YSkge1xyXG4gICAgICAgIGxldCBzcHJpdGU6IElTcHJpdGUgPSBjdXJyZW50LmRhdGFcclxuICAgICAgICBsZXQgYm91bmRpbmc6IEJvdW5kaW5nID0gc3ByaXRlLnNoYXBlLmdldEJvdW5kaW5nKClcclxuICAgICAgICBsZXQgcGFyZW50U3ByID0gc3ByaXRlLm93bmVyLmdldFBhcmVudFNwcml0ZSgpXHJcbiAgICAgICAgaWYgKHBhcmVudFNwcikge1xyXG4gICAgICAgICAgbGV0IHNwcml0ZUxlZnRUb3A6IHZlYzIgPSBuZXcgdmVjMihzcHJpdGUueCArIGJvdW5kaW5nLmxlZnQsIHNwcml0ZS55ICsgYm91bmRpbmcudG9wKVxyXG4gICAgICAgICAgc3ByaXRlTGVmdFRvcCA9IE1hdGgyRC50cmFuc2Zvcm0ocGFyZW50U3ByLmdldFdvcmxkTWF0cml4KCksIHNwcml0ZUxlZnRUb3ApXHJcblxyXG4gICAgICAgICAgbGV0IHNwcml0ZVJpZ2h0Qm90dG9tID0gbmV3IHZlYzIoc3ByaXRlLnggKyBib3VuZGluZy5yaWdodCwgc3ByaXRlLnkgKyBib3VuZGluZy5ib3R0b20pXHJcbiAgICAgICAgICBzcHJpdGVSaWdodEJvdHRvbSA9IE1hdGgyRC50cmFuc2Zvcm0ocGFyZW50U3ByLmdldFdvcmxkTWF0cml4KCksIHNwcml0ZVJpZ2h0Qm90dG9tKVxyXG5cclxuICAgICAgICAgIGlmIChNYXRoMkQuaXNDb2xsaXNpb25XaXRoUmVjdChcclxuICAgICAgICAgICAgc3ByaXRlTGVmdFRvcC54LCBzcHJpdGVMZWZ0VG9wLnksIHNwcml0ZVJpZ2h0Qm90dG9tLnggLSBzcHJpdGVMZWZ0VG9wLngsIHNwcml0ZVJpZ2h0Qm90dG9tLnkgLSBzcHJpdGVMZWZ0VG9wLnksXHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdEFyZWFWZXJ0ZXhzWzBdLCB0aGlzLl9zZWxlY3RBcmVhVmVydGV4c1sxXSwgdGhpcy5fc2VsZWN0QXJlYVZlcnRleHNbMl0sIHRoaXMuX3NlbGVjdEFyZWFWZXJ0ZXhzWzNdXHJcbiAgICAgICAgICApKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU2VsZWN0ZWRTcHJpdGUoc3ByaXRlKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZFNwcml0ZShzcHJpdGUpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVdoZWVsKGV2dDogRXZlbnQpOiB2b2lkIHtcclxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBsZXQgd2hlZWxFdnQgPSBldnQgYXMgV2hlZWxFdmVudFxyXG4gICAgbGV0IHdoZWVsRGVsdGEgPSB3aGVlbEV2dC53aGVlbERlbHRhIHx8IHdoZWVsRXZ0LmRldGFpbDtcdFx0Ly9kZXRhaWzmmK9maXJlZm9455qE5bGe5oCnXHJcbiAgICBsZXQgbW91c2VPZmZzZXQ6IHZlYzIgPSB0aGlzLl9hcHAuX3ZpZXdwb3J0VG9DYW52YXNDb29yZGluYXRlKGV2dCBhcyBNb3VzZUV2ZW50KVxyXG4gICAgaWYgKHdoZWVsRGVsdGEgPT09IDEyMCB8fCB3aGVlbERlbHRhID09PSAtMyB8fCB3aGVlbERlbHRhID09PSAtMTApIHtcclxuICAgICAgLy8g5ZCR5LiK5ruaXHJcbiAgICAgIHRoaXMuX2N1clpvb20gKj0gMS4yXHJcbiAgICAgIHRoaXMuaGFuZGxlU2NhbGVDaGFuZ2UobW91c2VPZmZzZXQueCwgbW91c2VPZmZzZXQueSwgV2hlZWxUeXBlLlVQKVxyXG4gICAgfSBlbHNlIGlmICh3aGVlbERlbHRhID09PSAtMTIwIHx8IHdoZWVsRGVsdGEgPT09IDMgfHwgd2hlZWxEZWx0YSA9PT0gMTApIHtcclxuICAgICAgLy8g5ZCR5LiL5ruaXHJcbiAgICAgIHRoaXMuX2N1clpvb20gLz0gMS4yXHJcbiAgICAgIHRoaXMuaGFuZGxlU2NhbGVDaGFuZ2UobW91c2VPZmZzZXQueCwgbW91c2VPZmZzZXQueSwgV2hlZWxUeXBlLkRPV04pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX3Nwck1lbnUpIHtcclxuICAgICAgdGhpcy5fc3ByTWVudS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVNjYWxlQ2hhbmdlKG1vdXNlWDogbnVtYmVyLCBtb3VzZVk6IG51bWJlciwgYWN0aW9uOiBXaGVlbFR5cGUpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJvb3QgPSB0aGlzLl9hcHAucm9vdENvbnRhaW5lciBhcyBTcHJpdGVOb2RlXHJcbiAgICBjb25zdCByb290U3ByID0gcm9vdC5zcHJpdGVcclxuICAgIGlmIChyb290U3ByKSB7XHJcbiAgICAgIHJvb3RTcHIuc2NhbGVYID0gdGhpcy5fY3VyWm9vbVxyXG4gICAgICByb290U3ByLnNjYWxlWSA9IHRoaXMuX2N1clpvb21cclxuICAgICAgbGV0IHggPSAwXHJcbiAgICAgIGxldCB5ID0gMFxyXG4gICAgICAvL+aEn+iwoiBodHRwczovL3d3dy5jbmJsb2dzLmNvbS8zYm9keS9wLzk0MzY4NjQuaHRtbCDov5nnr4fmlofnq6BcclxuICAgICAgaWYgKGFjdGlvbiA9PT0gV2hlZWxUeXBlLlVQKSB7XHJcbiAgICAgICAgeCA9IChtb3VzZVggLSByb290U3ByLngpICogMS4yIC0gKG1vdXNlWCAtIHJvb3RTcHIueClcclxuICAgICAgICB5ID0gKG1vdXNlWSAtIHJvb3RTcHIueSkgKiAxLjIgLSAobW91c2VZIC0gcm9vdFNwci55KVxyXG4gICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gV2hlZWxUeXBlLkRPV04pIHtcclxuICAgICAgICB4ID0gKG1vdXNlWCAtIHJvb3RTcHIueCkgLyAxLjIgLSAobW91c2VYIC0gcm9vdFNwci54KVxyXG4gICAgICAgIHkgPSAobW91c2VZIC0gcm9vdFNwci55KSAvIDEuMiAtIChtb3VzZVkgLSByb290U3ByLnkpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5sYXN0V2hlZWxNb3VzZVggPSBtb3VzZVggLy8g57yT5a2Y5pyA5ZCO5LiA5qyh5rua5Yqo5rua6L2u5pe255qE6byg5qCH5L2N572u77yM5Li654K55Ye757yp5pS+5oyJ6ZKu5pe25L2/55SoXHJcbiAgICAgIHRoaXMubGFzdFdoZWVsTW91c2VZID0gbW91c2VZXHJcbiAgICAgIHJvb3RTcHIueCA9IHJvb3RTcHIueCAtIHhcclxuICAgICAgcm9vdFNwci55ID0gcm9vdFNwci55IC0geVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3Qgcm9vdCA9IHRoaXMuX2FwcC5yb290Q29udGFpbmVyIGFzIFNwcml0ZU5vZGVcclxuXHJcbiAgICBjb25zdCBwYW5lbFBvaW50Tm9kZTE6IFNwcml0ZU5vZGUgPSBQYW5lbFBvaW50RmFjdG9yeS5jcmVhdGUocm9vdCwgJ3BhbmVsUG9pbnROb2RlMScsIG5ldyB2ZWMyKDEyMCwgMTIwKSwgdGhpcyk7XHJcbiAgICBjb25zdCBwYW5lbFBvaW50Tm9kZTI6IFNwcml0ZU5vZGUgPSBQYW5lbFBvaW50RmFjdG9yeS5jcmVhdGUocm9vdCwgJ3BhbmVsUG9pbnROb2RlMicsIG5ldyB2ZWMyKDMyMCwgMTIwKSwgdGhpcyk7XHJcbiAgICBjb25zdCBwYW5lbFBvaW50Tm9kZTM6IFNwcml0ZU5vZGUgPSBQYW5lbFBvaW50RmFjdG9yeS5jcmVhdGUocm9vdCwgJ3BhbmVsUG9pbnROb2RlMycsIG5ldyB2ZWMyKDMyMCwgNDAwKSwgdGhpcyk7XHJcblxyXG5cclxuXHJcbiAgICBjb25zdCBjb250YWluZXJOb2RlMTogU3ByaXRlTm9kZSA9IENvbnRhaW5lckZhY3RvcnkuY3JlYXRlKHJvb3QsICdjb250YWluZXJOb2RlMScsIG5ldyB2ZWMyKDUyMCwgMjIwKSwgdGhpcylcclxuXHJcbiAgICBjb25zdCByZWN0Tm9kZTE6IFNwcml0ZU5vZGUgPSBQYW5lbFJlY3RGYWN0b3J5LmNyZWF0ZShjb250YWluZXJOb2RlMSwgJ3JlY3ROb2RlMScsIG5ldyB2ZWMyKDAsIDApLCB0aGlzKVxyXG4gICAgY29uc3QgcmVjdE5vZGUyOiBTcHJpdGVOb2RlID0gUGFuZWxSZWN0RmFjdG9yeS5jcmVhdGUoY29udGFpbmVyTm9kZTEsICdyZWN0Tm9kZTInLCBuZXcgdmVjMig2MCwgMTcwKSwgdGhpcylcclxuICAgIGNvbnN0IHJlY3ROb2RlMzogU3ByaXRlTm9kZSA9IFBhbmVsUmVjdEZhY3RvcnkuY3JlYXRlKHJvb3QsICdyZWN0Tm9kZTMnLCBuZXcgdmVjMigwLCAwKSwgdGhpcylcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyTm9kZTI6IFNwcml0ZU5vZGUgPSBDb250YWluZXJGYWN0b3J5LmNyZWF0ZShjb250YWluZXJOb2RlMSwgJ2NvbnRhaW5lck5vZGUyJywgbmV3IHZlYzIoMCwgMTcwKSwgdGhpcylcclxuXHJcblxyXG4gICAgY29uc3QgcmVjdE5vZGUyXzE6IFNwcml0ZU5vZGUgPSBQYW5lbFJlY3RGYWN0b3J5LmNyZWF0ZShjb250YWluZXJOb2RlMiwgJ3JlY3ROb2RlMl8xJywgbmV3IHZlYzIoMCwgMCksIHRoaXMpXHJcbiAgICBjb25zdCByZWN0Tm9kZTJfMjogU3ByaXRlTm9kZSA9IFBhbmVsUmVjdEZhY3RvcnkuY3JlYXRlKGNvbnRhaW5lck5vZGUyLCAncmVjdE5vZGUyXzInLCBuZXcgdmVjMigwLCAxMjApLCB0aGlzKVxyXG5cclxuICAgIExpbmtGYWN0b3J5LmNyZWF0ZShyb290LCByZWN0Tm9kZTJfMSwgcmVjdE5vZGUyXzIsICc5OScpO1xyXG5cclxuXHJcblxyXG4gICAgTGlua0ZhY3RvcnkuY3JlYXRlKHJvb3QsIHBhbmVsUG9pbnROb2RlMSwgcGFuZWxQb2ludE5vZGUyLCAnMS0+MicpO1xyXG4gICAgTGlua0ZhY3RvcnkuY3JlYXRlKHJvb3QsIHBhbmVsUG9pbnROb2RlMiwgcGFuZWxQb2ludE5vZGUxLCAnMi0+MScpO1xyXG4gICAgTGlua0ZhY3RvcnkuY3JlYXRlKHJvb3QsIHBhbmVsUG9pbnROb2RlMiwgcGFuZWxQb2ludE5vZGUxLCAnMi0+MScpO1xyXG4gICAgTGlua0ZhY3RvcnkuY3JlYXRlKHJvb3QsIHBhbmVsUG9pbnROb2RlMiwgcGFuZWxQb2ludE5vZGUxLCAnMi0+MScpO1xyXG4gICAgTGlua0ZhY3RvcnkuY3JlYXRlKHJvb3QsIHBhbmVsUG9pbnROb2RlMSwgcGFuZWxQb2ludE5vZGUzLCAnMS0+MycpO1xyXG4gICAgTGlua0ZhY3RvcnkuY3JlYXRlKHJvb3QsIHBhbmVsUG9pbnROb2RlMiwgcGFuZWxQb2ludE5vZGUzLCAnMi0+MycpO1xyXG4gICAgTGlua0ZhY3RvcnkuY3JlYXRlKHJvb3QsIHBhbmVsUG9pbnROb2RlMiwgcGFuZWxQb2ludE5vZGUzLCAnMi0+MycpO1xyXG4gICAgTGlua0ZhY3RvcnkuY3JlYXRlKHJvb3QsIHJlY3ROb2RlMSwgcmVjdE5vZGUyLCAnaWknKTtcclxuICAgIExpbmtGYWN0b3J5LmNyZWF0ZShyb290LCByZWN0Tm9kZTEsIHBhbmVsUG9pbnROb2RlMiwgJzg4Jyk7XHJcblxyXG5cclxuXHJcbiAgICBjb25zdCByZWN0Tm9kZTQ6IFNwcml0ZU5vZGUgPSBQYW5lbFJlY3RGYWN0b3J5LmNyZWF0ZShyb290LCAncmVjdE5vZGU0JywgbmV3IHZlYzIoNzAwLCA2MCksIHRoaXMpO1xyXG5cclxuICAgIGNvbnN0IHJlY3ROb2RlNTogU3ByaXRlTm9kZSA9IFBhbmVsUmVjdEZhY3RvcnkuY3JlYXRlKHJvb3QsICdyZWN0Tm9kZTUnLCBuZXcgdmVjMig4NTAsIDMwMCksIHRoaXMpO1xyXG5cclxuICAgIEhvcml6b250YWxGbGV4TGlua0ZhY3RvcnkuY3JlYXRlKHJvb3QsIHJlY3ROb2RlNCwgcmVjdE5vZGU1LCAnMScpO1xyXG4gICAgSG9yaXpvbnRhbEZsZXhMaW5rRmFjdG9yeS5jcmVhdGUocm9vdCwgcmVjdE5vZGU1LCByZWN0Tm9kZTQsICcyJyk7XHJcblxyXG4gICAgY29uc3QgcmVjdE5vZGU2OiBTcHJpdGVOb2RlID0gUGFuZWxSZWN0RmFjdG9yeS5jcmVhdGUocm9vdCwgJ3JlY3ROb2RlNicsIG5ldyB2ZWMyKDcwMCwgNDAwKSwgdGhpcyk7XHJcblxyXG4gICAgY29uc3QgcmVjdE5vZGU3OiBTcHJpdGVOb2RlID0gUGFuZWxSZWN0RmFjdG9yeS5jcmVhdGUocm9vdCwgJ3JlY3ROb2RlNycsIG5ldyB2ZWMyKDg1MCwgNTAwKSwgdGhpcyk7XHJcblxyXG4gICAgVmVydGljYWxGbGV4TGlua0ZhY3RvcnkuY3JlYXRlKHJvb3QsIHJlY3ROb2RlNiwgcmVjdE5vZGU3LCAnMycpO1xyXG4gICAgVmVydGljYWxGbGV4TGlua0ZhY3RvcnkuY3JlYXRlKHJvb3QsIHJlY3ROb2RlNywgcmVjdE5vZGU2LCAnNCcpO1xyXG4gICAgVmVydGljYWxGbGV4TGlua0ZhY3RvcnkuY3JlYXRlKHJvb3QsIHJlY3ROb2RlNywgcmVjdE5vZGU2LCAnNScpO1xyXG5cclxuXHJcblxyXG4gICAgY29uc29sZS5sb2cocm9vdClcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdDIoKTogdm9pZCB7XHJcbiAgICBjb25zdCByb290ID0gdGhpcy5fYXBwLnJvb3RDb250YWluZXIgYXMgU3ByaXRlTm9kZVxyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lck5vZGUxOiBTcHJpdGVOb2RlID0gQ29udGFpbmVyRmFjdG9yeS5jcmVhdGUocm9vdCwgJ2NvbnRhaW5lck5vZGUxJywgbmV3IHZlYzIoMCwgMCksIHRoaXMpXHJcblxyXG4gICAgY29uc3QgcGFuZWxQb2ludE5vZGUxOiBTcHJpdGVOb2RlID0gUGFuZWxQb2ludEZhY3RvcnkuY3JlYXRlKGNvbnRhaW5lck5vZGUxLCAncGFuZWxQb2ludE5vZGUxJywgbmV3IHZlYzIoNTAsIDUwKSwgdGhpcyk7XHJcbiAgICBjb25zdCBwYW5lbFBvaW50Tm9kZTI6IFNwcml0ZU5vZGUgPSBQYW5lbFBvaW50RmFjdG9yeS5jcmVhdGUoY29udGFpbmVyTm9kZTEsICdwYW5lbFBvaW50Tm9kZTInLCBuZXcgdmVjMigzMjAsIDEyMCksIHRoaXMpO1xyXG4gICAgY29uc3QgcGFuZWxQb2ludE5vZGUzOiBTcHJpdGVOb2RlID0gUGFuZWxQb2ludEZhY3RvcnkuY3JlYXRlKHJvb3QsICdwYW5lbFBvaW50Tm9kZTMnLCBuZXcgdmVjMigzMjAsIDQwMCksIHRoaXMpO1xyXG5cclxuICAgIExpbmtGYWN0b3J5LmNyZWF0ZShyb290LCBwYW5lbFBvaW50Tm9kZTIsIHBhbmVsUG9pbnROb2RlMywgJzItPjMnKTtcclxuICAgIExpbmtGYWN0b3J5LmNyZWF0ZShyb290LCBwYW5lbFBvaW50Tm9kZTEsIHBhbmVsUG9pbnROb2RlMiwgJzEtPjInKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhyb290KVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0MygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJvb3QgPSB0aGlzLl9hcHAucm9vdENvbnRhaW5lciBhcyBTcHJpdGVOb2RlXHJcblxyXG5cclxuXHJcbiAgICBjb25zdCByZWN0Tm9kZTM6IFNwcml0ZU5vZGUgPSBQYW5lbFJlY3RGYWN0b3J5LmNyZWF0ZShyb290LCAncmVjdE5vZGUzJywgbmV3IHZlYzIoMjAwLCAyMDApLCB0aGlzKVxyXG4gICAgLy9jb25zdCBwYW5lbFBvaW50Tm9kZTI6IFNwcml0ZU5vZGUgPSBQYW5lbFBvaW50RmFjdG9yeS5jcmVhdGUocm9vdCwgJ3BhbmVsUG9pbnROb2RlMicsIG5ldyB2ZWMyKDMyMCwgMTIwKSwgdGhpcyk7XHJcblxyXG4gICAgY29uc29sZS5sb2cocm9vdClcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb252ZXJ0VHJlZVRvSnNvblN0cmluZyhub2RlOiBUcmVlTm9kZTxJU3ByaXRlPik6IHN0cmluZyB7XHJcbiAgICBsZXQgbm9kZXM6IEFycmF5PFRyZWVOb2RlPElTcHJpdGU+PiA9IFtdO1xyXG4gICAgbGV0IGRhdGFzOiBBcnJheTxOb2RlRGF0YT4gPSBbXTtcclxuICAgIGxldCBuOiBUcmVlTm9kZTxJU3ByaXRlPiB8IHVuZGVmaW5lZCA9IG5vZGVcclxuICAgIGRvIHtcclxuICAgICAgaWYgKG4ubmVlZFNlcmlhbGl6ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGxldCBzcHJpdGUgPSBuLmRhdGFcclxuICAgICAgICBpZiAoc3ByaXRlKSB7XHJcbiAgICAgICAgICAvLyDniLbnuqflr7nosaHnmoTntKLlvJXlhYjnu5/kuIDorr7nva7miJAtMVxyXG4gICAgICAgICAgbGV0IG5vZGVEYXRhID0gbmV3IE5vZGVEYXRhKC0xLCBuLm5vZGVUeXBlKVxyXG4gICAgICAgICAgbm9kZURhdGEueCA9IHNwcml0ZS54XHJcbiAgICAgICAgICBub2RlRGF0YS55ID0gc3ByaXRlLnlcclxuICAgICAgICAgIG5vZGVEYXRhLm5hbWUgPSBuLm5hbWVcclxuICAgICAgICAgIC8vIOWcqOWQjOS4gOS4quW+queOr+mHjOS4gOi1t+i1i+WAvGRhdGFz5ZKMbm9kZXPvvIzkv53or4FkYXRhc+WSjG5vZGVz55qE5ZCM5LiA57Si5byV5a+55bqU55qE5piv5ZCM5LiA5LiqVHJlZU5vZGXmlbDmja5cclxuICAgICAgICAgIGRhdGFzLnB1c2gobm9kZURhdGEpO1xyXG4gICAgICAgICAgbm9kZXMucHVzaChuKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gd2hpbGUgKG4gPSBuLm1vdmVOZXh0KCkpOyAvLyDmt7HluqbkvJjlhYjjgIHku47kuIrliLDkuIvjgIHku47lt6bliLDlj7PnmoTpgY3ljobvvIzkv53or4HniLboioLngrnlnKjmlbDnu4TkuK3nmoTntKLlvJXogq/lrprmr5TlrZDoioLngrnnmoTntKLlvJXlsI/vvIzov5nmoLflj43luo/liJfljJbnmoTml7blgJnvvIzniLboioLngrnnmoTlrp7kvovmiY3og73lhYjkuo7lrZDoioLngrnliJvlu7pcclxuXHJcbiAgICAvLyDkuLpwYXJlbnRJZHjotYvlgLxcclxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBkYXRhcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAvLyDov57nur9ub2Rl6ZyA6KaB5omL5Yqo5oyH5a6acGFyZW505Li6cm9vdO+8jOWboOS4uuWGjeW3peWOguWHveaVsOS4rei/nue6v25vZGXpg73kvJrmlL7liLDkuIDkuKpTcHJpdGVOb2RlR3JvdXDkuK3vvIzlho3miopTcHJpdGVOb2RlR3JvdXDmlL7liLByb2905LiLXHJcbiAgICAgIGlmIChcclxuICAgICAgICBub2Rlc1tpXS5ub2RlVHlwZSA9PT0gTm9kZVR5cGUuTElOSyB8fFxyXG4gICAgICAgIG5vZGVzW2ldLm5vZGVUeXBlID09PSBOb2RlVHlwZS5IT1JJWk9OVEFMRkxFWExJTksgfHxcclxuICAgICAgICBub2Rlc1tpXS5ub2RlVHlwZSA9PT0gTm9kZVR5cGUuVkVSVElDQUxGTEVYTElOS1xyXG4gICAgICApIHtcclxuICAgICAgICBkYXRhc1tpXS5wYXJlbnRJZHggPSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBwYXJlbnQ6IFRyZWVOb2RlPElTcHJpdGU+IHwgdW5kZWZpbmVkID0gbm9kZXNbaV0ucGFyZW50O1xyXG4gICAgICAgIGlmIChwYXJlbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgZGF0YXNbaV0ucGFyZW50SWR4ID0gLTE7ICAvLyDmoLnoioLngrlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgajogbnVtYmVyID0gMDsgaiA8IGRhdGFzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IG5vZGVzW2pdKSB7XHJcbiAgICAgICAgICAgICAgZGF0YXNbaV0ucGFyZW50SWR4ID0gajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOS4umRldGFz5pWw57uE5Lit55qE6L+e57q/5pWw5o2u55qEdG9JZHjlkoxmcm9tSWR46LWL5YC877yM6L+Z6YeM5LiN6ZyA6KaB566hZnJvbUlkeOWSjHRvSWR45oyH5ZCR55qEbm9kZeWvueixoeWcqOWPjeW6j+WIl+WMlueahOaXtuWAmeaYr+WQpuW3sue7j+WIm+W7uu+8jOWboOS4uuWPjeW6j+WIl+WMlueahOaXtuWAmeacieeJueauiuWkhOeQhlxyXG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGRhdGFzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChub2Rlc1tpXS5ub2RlVHlwZSA9PT0gTm9kZVR5cGUuTElOSyB8fCBub2Rlc1tpXS5ub2RlVHlwZSA9PT0gTm9kZVR5cGUuSE9SSVpPTlRBTEZMRVhMSU5LIHx8IG5vZGVzW2ldLm5vZGVUeXBlID09PSBOb2RlVHlwZS5WRVJUSUNBTEZMRVhMSU5LKSB7XHJcbiAgICAgICAgbGV0IHNwcml0ZSA9IG5vZGVzW2ldLmRhdGFcclxuICAgICAgICBpZiAoc3ByaXRlKSB7XHJcbiAgICAgICAgICBsZXQgZnJvbUlkeCA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgbGV0IHRvSWR4ID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICBmb3IgKGxldCBqOiBudW1iZXIgPSAwOyBqIDwgZGF0YXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgaWYgKHNwcml0ZS5kYXRhLmZyb20gPT09IG5vZGVzW2pdKSB7XHJcbiAgICAgICAgICAgICAgZnJvbUlkeCA9IGo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNwcml0ZS5kYXRhLnRvID09PSBub2Rlc1tqXSkge1xyXG4gICAgICAgICAgICAgIHRvSWR4ID0gajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGF0YXNbaV0uZnJvbUlkeCA9IGZyb21JZHhcclxuICAgICAgICAgIGRhdGFzW2ldLnRvSWR4ID0gdG9JZHhcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29udmVydEpzb25TdHJpbmdUb1RyZWU8VD4oanNvbjogc3RyaW5nKTogU3ByaXRlTm9kZSB8IHVuZGVmaW5lZCB7XHJcbiAgICBsZXQgZGF0YXM6IFtdID0gSlNPTi5wYXJzZShqc29uKTtcclxuICAgIGxldCBkYXRhICE6IE5vZGVEYXRhO1xyXG4gICAgbGV0IG5vZGVzOiBTcHJpdGVOb2RlW10gPSBbXTtcclxuXHJcbiAgICBjb25zdCByb290ID0gdGhpcy5fYXBwLnJvb3RDb250YWluZXIgYXMgU3ByaXRlTm9kZVxyXG4gICAgLy8g5qC55o2uTm9kZURhdGHliJfooajnlJ/miJDoioLngrnmlbDnu4RcclxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBkYXRhcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBkYXRhID0gZGF0YXNbaV0gYXMgTm9kZURhdGE7XHJcbiAgICAgIGlmIChkYXRhLnBhcmVudElkeCA9PT0gLTEpIHtcclxuICAgICAgICBsZXQgc3ByOiBJU3ByaXRlID0gU3ByaXRlRmFjdG9yeS5jcmVhdGVJU3ByaXRlKFNwcml0ZUZhY3RvcnkuY3JlYXRlR3JpZCgxMDAwLCA2MDApKTtcclxuICAgICAgICBzcHIubmFtZSA9ICdyb290JztcclxuICAgICAgICBzcHIuc3Ryb2tlU3R5bGUgPSBcInJnYmEoMCwwLDAsMC4xKVwiO1xyXG4gICAgICAgIHNwci5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgICAgIHNwci5yZW5kZXJUeXBlID0gRVJlbmRlclR5cGUuU1RST0tFX0ZJTEw7XHJcbiAgICAgICAgbGV0IHJvb3QgPSBuZXcgU3ByaXRlTm9kZShzcHIsIHVuZGVmaW5lZCwgc3ByLm5hbWUpO1xyXG4gICAgICAgIHJvb3Qubm9kZVR5cGUgPSBOb2RlVHlwZS5TUFJJVEVcclxuICAgICAgICByb290Lm5lZWRTZXJpYWxpemUgPSB0cnVlXHJcbiAgICAgICAgc3ByLm93bmVyID0gcm9vdFxyXG4gICAgICAgIG5vZGVzLnB1c2gocm9vdClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgYmxhbmtOb2RlID0gbmV3IFNwcml0ZU5vZGVHcm91cCh1bmRlZmluZWQsIHVuZGVmaW5lZCwgJ2JsYW5rJylcclxuICAgICAgICBpZiAoZGF0YS5ub2RlVHlwZSA9PT0gTm9kZVR5cGUuQ09OVEFJTkVSKSB7XHJcbiAgICAgICAgICBsZXQgbm9kZSA9IENvbnRhaW5lckZhY3RvcnkuY3JlYXRlKG5vZGVzW2RhdGEucGFyZW50SWR4XSwgZGF0YS5uYW1lIHx8ICcnLCBuZXcgdmVjMihkYXRhLngsIGRhdGEueSksIHRoaXMpXHJcbiAgICAgICAgICBub2Rlcy5wdXNoKG5vZGUpXHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLm5vZGVUeXBlID09PSBOb2RlVHlwZS5QQU5FTFBPSU5UKSB7XHJcbiAgICAgICAgICBsZXQgbm9kZSA9IFBhbmVsUG9pbnRGYWN0b3J5LmNyZWF0ZShub2Rlc1tkYXRhLnBhcmVudElkeF0sIGRhdGEubmFtZSB8fCAnJywgbmV3IHZlYzIoZGF0YS54LCBkYXRhLnkpLCB0aGlzKTtcclxuICAgICAgICAgIG5vZGVzLnB1c2gobm9kZSlcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEubm9kZVR5cGUgPT09IE5vZGVUeXBlLlBBTkVMUkVDVCkge1xyXG4gICAgICAgICAgbGV0IG5vZGUgPSBQYW5lbFJlY3RGYWN0b3J5LmNyZWF0ZShub2Rlc1tkYXRhLnBhcmVudElkeF0sIGRhdGEubmFtZSB8fCAnJywgbmV3IHZlYzIoZGF0YS54LCBkYXRhLnkpLCB0aGlzKTtcclxuICAgICAgICAgIG5vZGVzLnB1c2gobm9kZSlcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEubm9kZVR5cGUgPT09IE5vZGVUeXBlLkxJTksgfHwgZGF0YS5ub2RlVHlwZSA9PT0gTm9kZVR5cGUuVkVSVElDQUxGTEVYTElOSyB8fCBkYXRhLm5vZGVUeXBlID09PSBOb2RlVHlwZS5IT1JJWk9OVEFMRkxFWExJTkspIHtcclxuICAgICAgICAgIC8vIOi/nue6v+exu+Wei+eahG5vZGXvvIzlm6DkuLrku5bku6znmoRmcm9t5oiWdG/mjIflkJHnmoTlr7nosaHov5jmsqHmnInlu7rnq4vvvIzmiYDku6XlhYjnlKhibGFua05vZGXlnKhub2Rlc+S4reWBmuWNoOS9jVxyXG4gICAgICAgICAgbm9kZXMucHVzaChibGFua05vZGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOaKiuaJgOaciei/nue6v25vZGXpg73lrp7kvovljJblubborr7nva7lroPku6znmoRmcm9t5ZKMdG/mjIflkJHvvIzlm6DkuLrmraTml7bnmoRub2Rlc+S4reaJgOaciW5vZGXpg73lt7Lnu4/mjInpobrluo/lrp7kvovljJbvvIjov57nur9ub2Rl5bey57uP6L+b6KGM5LqG5Y2g5L2N77yJXHJcbiAgICAvLyDkuI3nlKjmi4Xlv4Nmcm9tSWR457Si5byV5oiWdG9JZHjntKLlvJXlnKhub2Rlc+S4reayoeacieWvueW6lOeahOaIkOWRmFxyXG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGRhdGFzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGRhdGEgPSBkYXRhc1tpXSBhcyBOb2RlRGF0YTtcclxuICAgICAgaWYgKGRhdGEuZnJvbUlkeCAhPT0gdW5kZWZpbmVkICYmIGRhdGEudG9JZHggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmIChkYXRhLm5vZGVUeXBlID09PSBOb2RlVHlwZS5MSU5LKSB7XHJcbiAgICAgICAgICBMaW5rRmFjdG9yeS5jcmVhdGUobm9kZXNbZGF0YS5wYXJlbnRJZHhdLCBub2Rlc1tkYXRhLmZyb21JZHhdLCBub2Rlc1tkYXRhLnRvSWR4XSwgZGF0YS5uYW1lIHx8ICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEubm9kZVR5cGUgPT09IE5vZGVUeXBlLlZFUlRJQ0FMRkxFWExJTkspIHtcclxuICAgICAgICAgIFZlcnRpY2FsRmxleExpbmtGYWN0b3J5LmNyZWF0ZShub2Rlc1tkYXRhLnBhcmVudElkeF0sIG5vZGVzW2RhdGEuZnJvbUlkeF0sIG5vZGVzW2RhdGEudG9JZHhdLCBkYXRhLm5hbWUgfHwgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5ub2RlVHlwZSA9PT0gTm9kZVR5cGUuSE9SSVpPTlRBTEZMRVhMSU5LKSB7XHJcbiAgICAgICAgICBIb3Jpem9udGFsRmxleExpbmtGYWN0b3J5LmNyZWF0ZShub2Rlc1tkYXRhLnBhcmVudElkeF0sIG5vZGVzW2RhdGEuZnJvbUlkeF0sIG5vZGVzW2RhdGEudG9JZHhdLCBkYXRhLm5hbWUgfHwgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOi/lOWbnuWPjeW6j+WIl+WMluS4reeahOagueiKgueCuVxyXG4gICAgcmV0dXJuIG5vZGVzWzBdO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG5jb25zdCBhcHAgPSBuZXcgU3ByaXRlMkRBcHBsaWNhdGlvbihjYW52YXMsIHRydWUpXHJcbmFwcC5pc1N1cHBvcnRNb3VzZU1vdmUgPSB0cnVlXHJcbm5ldyBUb3BvbG9neUFwcGxpY2F0aW9uKGFwcCk7IiwiaW1wb3J0IHsgSVRyYW5zZm9ybWFibGUsIElSZW5kZXJTdGF0ZSwgQm91bmRpbmcgfSBmcm9tIFwiLi4vbGliL3Nwcml0ZVN5c3RlbS9pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQmFzZVNoYXBlMkQgfSBmcm9tIFwiLi4vbGliL3Nwcml0ZVN5c3RlbS9zaGFwZXNcIjtcclxuaW1wb3J0IHsgU3ByaXRlMkQgfSBmcm9tICcuLi9saWIvc3ByaXRlU3lzdGVtL3Nwcml0ZTJkJ1xyXG5pbXBvcnQgeyB2ZWMyIH0gZnJvbSBcIi4uL2xpYi9tYXRoMmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDTm9kZVRleHRTaGFwIGV4dGVuZHMgQmFzZVNoYXBlMkQge1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IocmFkaXVzID0gMSkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcbiAgcHVibGljIGhpdFRlc3QobG9jYWxQdDogdmVjMiwgdHJhbnNmb3JtOiBJVHJhbnNmb3JtYWJsZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Qm91bmRpbmcoKTogQm91bmRpbmcge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBib3R0b206IDAsXHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHJpZ2h0OiAwXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHJhdyh0cmFuc2Zvcm1hYmxlOiBJVHJhbnNmb3JtYWJsZSwgc3RhdGU6IElSZW5kZXJTdGF0ZSwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc3ByID0gdHJhbnNmb3JtYWJsZSBhcyBTcHJpdGUyRFxyXG4gICAgY29uc3QgdGV4dCA9IHNwci5kYXRhLnRleHRcclxuXHJcbiAgICBjb250ZXh0LnNhdmUoKVxyXG4gICAgY29udGV4dC5mb250ID0gXCIyMHB4IEFyaWFsXCI7XHJcbiAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCJcclxuICAgIGNvbnRleHQudGV4dEFsaWduID0gXCJsZWZ0XCJcclxuICAgIGNvbnN0IHcgPSBjb250ZXh0Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoXHJcbiAgICBjb25zdCBoID0gY29udGV4dC5tZWFzdXJlVGV4dCgn55SwJykud2lkdGhcclxuICAgIGNvbnN0IHBhZGRpbmcgPSAxMFxyXG4gICAgY29uc3QgWGRldmlhdGlvbiA9IC0gKHcgKyAyICogcGFkZGluZykgLyAyIC8vIHjovbTnmoTlgY/np7vph49cclxuXHJcbiAgICBjb250ZXh0LnNhdmUoKVxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDAsIDAsIDI1NSwgMC44KVwiXHJcbiAgICB0aGlzLmRyYXdSb3VuZFJlY3QoY29udGV4dCwgWGRldmlhdGlvbiwgMCwgdyArIDIgKiBwYWRkaW5nLCBoICsgMiAqIHBhZGRpbmcsIDYpXHJcbiAgICAvL2NvbnRleHQucmVjdChYZGV2aWF0aW9uICwgMCAsdyArIDIgKiBwYWRkaW5nLCBoICsgMiAqIHBhZGRpbmcpXHJcbiAgICBjb250ZXh0LmZpbGwoKVxyXG4gICAgY29udGV4dC5yZXN0b3JlKClcclxuXHJcbiAgICBjb250ZXh0LnNhdmUoKVxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpXCJcclxuICAgIGNvbnRleHQuZmlsbFRleHQodGV4dCwgcGFkZGluZyArIFhkZXZpYXRpb24sIHBhZGRpbmcgKyBoIC8gMiArIDEpXHJcbiAgICBjb250ZXh0LnJlc3RvcmUoKVxyXG5cclxuICAgIGNvbnRleHQucmVzdG9yZSgpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRyYXdSb3VuZFJlY3QoY3h0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcmFkaXVzOiBudW1iZXIpIHtcclxuICAgIGN4dC5iZWdpblBhdGgoKTtcclxuICAgIGN4dC5tb3ZlVG8oeCArIHJhZGl1cywgeSlcclxuICAgIGN4dC5saW5lVG8oeCArIHdpZHRoIC0gcmFkaXVzLCB5KVxyXG4gICAgY3h0LnF1YWRyYXRpY0N1cnZlVG8oeCArIHdpZHRoLCB5LCB4ICsgd2lkdGgsIHkgKyByYWRpdXMpXHJcbiAgICBjeHQubGluZVRvKHggKyB3aWR0aCwgeSArIGhlaWdodCAtIHJhZGl1cylcclxuICAgIGN4dC5xdWFkcmF0aWNDdXJ2ZVRvKHggKyB3aWR0aCwgeSArIGhlaWdodCwgeCArIHdpZHRoIC0gcmFkaXVzLCB5ICsgaGVpZ2h0KVxyXG4gICAgY3h0LmxpbmVUbyh4ICsgcmFkaXVzLCB5ICsgaGVpZ2h0KVxyXG4gICAgY3h0LnF1YWRyYXRpY0N1cnZlVG8oeCwgeSArIGhlaWdodCwgeCwgeSArIGhlaWdodCAtIHJhZGl1cylcclxuICAgIGN4dC5saW5lVG8oeCwgeSArIHJhZGl1cylcclxuICAgIGN4dC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHksIHggKyByYWRpdXMsIHkpXHJcbiAgICAvLyBjeHQuYXJjKHggKyByYWRpdXMsIHkgKyByYWRpdXMsIHJhZGl1cywgTWF0aC5QSSwgTWF0aC5QSSAqIDMgLyAyKTtcclxuICAgIC8vIGN4dC5saW5lVG8od2lkdGggLSByYWRpdXMgKyB4LCB5KTtcclxuICAgIC8vIGN4dC5hcmMod2lkdGggLSByYWRpdXMgKyB4LCByYWRpdXMgKyB5LCByYWRpdXMsIE1hdGguUEkgKiAzIC8gMiwgTWF0aC5QSSAqIDIpO1xyXG4gICAgLy8gY3h0LmxpbmVUbyh3aWR0aCArIHgsIGhlaWdodCArIHkgLSByYWRpdXMpO1xyXG4gICAgLy8gY3h0LmFyYyh3aWR0aCAtIHJhZGl1cyArIHgsIGhlaWdodCAtIHJhZGl1cyArIHksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDEgLyAyKTtcclxuICAgIC8vIGN4dC5saW5lVG8ocmFkaXVzICsgeCwgaGVpZ2h0ICsgeSk7XHJcbiAgICAvLyBjeHQuYXJjKHJhZGl1cyArIHgsIGhlaWdodCAtIHJhZGl1cyArIHksIHJhZGl1cywgTWF0aC5QSSAqIDEgLyAyLCBNYXRoLlBJKTtcclxuICAgIGN4dC5jbG9zZVBhdGgoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFwiQ05vZGVUZXh0U2hhcFwiO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElUcmFuc2Zvcm1hYmxlLCBJUmVuZGVyU3RhdGUsIEJvdW5kaW5nIH0gZnJvbSBcIi4uL2xpYi9zcHJpdGVTeXN0ZW0vaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJhc2VTaGFwZTJEIH0gZnJvbSBcIi4uL2xpYi9zcHJpdGVTeXN0ZW0vc2hhcGVzXCI7XHJcbmltcG9ydCB7IFNwcml0ZTJEIH0gZnJvbSAnLi4vbGliL3Nwcml0ZVN5c3RlbS9zcHJpdGUyZCdcclxuaW1wb3J0IHsgdmVjMiB9IGZyb20gXCIuLi9saWIvbWF0aDJkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTGlua1RleHRTaGFwIGV4dGVuZHMgQmFzZVNoYXBlMkQge1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgaGl0VGVzdChsb2NhbFB0OiB2ZWMyLCB0cmFuc2Zvcm06IElUcmFuc2Zvcm1hYmxlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRCb3VuZGluZygpOiBCb3VuZGluZyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIGJvdHRvbTogMCxcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgcmlnaHQ6IDBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBkcmF3KHRyYW5zZm9ybWFibGU6IElUcmFuc2Zvcm1hYmxlLCBzdGF0ZTogSVJlbmRlclN0YXRlLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsKTogdm9pZCB7XHJcbiAgICBjb25zdCBzcHIgPSB0cmFuc2Zvcm1hYmxlIGFzIFNwcml0ZTJEXHJcbiAgICBjb25zdCB0ZXh0ID0gc3ByLmRhdGEudGV4dFxyXG5cclxuICAgIGNvbnRleHQuc2F2ZSgpXHJcbiAgICBjb250ZXh0LmZvbnQgPSBcIjE0cHggQXJpYWxcIjtcclxuICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIlxyXG4gICAgY29udGV4dC50ZXh0QWxpZ24gPSBcImxlZnRcIlxyXG4gICAgY29uc3QgdyA9IGNvbnRleHQubWVhc3VyZVRleHQodGV4dCkud2lkdGhcclxuICAgIGNvbnN0IGggPSBjb250ZXh0Lm1lYXN1cmVUZXh0KCfnlLAnKS53aWR0aFxyXG4gICAgY29uc3QgcGFkZGluZyA9IDRcclxuICAgIGNvbnN0IFhkZXZpYXRpb24gPSAtICh3ICsgMiAqIHBhZGRpbmcpIC8gMiAvLyB46L2055qE5YGP56e76YePXHJcbiAgICBjb25zdCBZZGV2aWF0aW9uID0gLSAoaCArIDIgKiBwYWRkaW5nKSAvIDIgLy8geei9tOeahOWBj+enu+mHj1xyXG5cclxuICAgIGNvbnRleHQuc2F2ZSgpXHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMCwgMCwgMjU1LCAwLjgpXCJcclxuICAgIHRoaXMuZHJhd1JvdW5kUmVjdChjb250ZXh0LCBYZGV2aWF0aW9uLCBZZGV2aWF0aW9uLCB3ICsgMiAqIHBhZGRpbmcsIGggKyAyICogcGFkZGluZywgNilcclxuICAgIC8vY29udGV4dC5yZWN0KFhkZXZpYXRpb24gLCAwICx3ICsgMiAqIHBhZGRpbmcsIGggKyAyICogcGFkZGluZylcclxuICAgIGNvbnRleHQuZmlsbCgpXHJcbiAgICBjb250ZXh0LnJlc3RvcmUoKVxyXG5cclxuICAgIGNvbnRleHQuc2F2ZSgpXHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMSlcIlxyXG4gICAgY29udGV4dC5maWxsVGV4dCh0ZXh0LCBwYWRkaW5nICsgWGRldmlhdGlvbiwgcGFkZGluZyArIGggLyAyICsgWWRldmlhdGlvbiArIDEpXHJcbiAgICBjb250ZXh0LnJlc3RvcmUoKVxyXG5cclxuICAgIGNvbnRleHQucmVzdG9yZSgpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRyYXdSb3VuZFJlY3QoY3h0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcmFkaXVzOiBudW1iZXIpIHtcclxuICAgIGN4dC5iZWdpblBhdGgoKTtcclxuICAgIGN4dC5tb3ZlVG8oeCArIHJhZGl1cywgeSlcclxuICAgIGN4dC5saW5lVG8oeCArIHdpZHRoIC0gcmFkaXVzLCB5KVxyXG4gICAgY3h0LnF1YWRyYXRpY0N1cnZlVG8oeCArIHdpZHRoLCB5LCB4ICsgd2lkdGgsIHkgKyByYWRpdXMpXHJcbiAgICBjeHQubGluZVRvKHggKyB3aWR0aCwgeSArIGhlaWdodCAtIHJhZGl1cylcclxuICAgIGN4dC5xdWFkcmF0aWNDdXJ2ZVRvKHggKyB3aWR0aCwgeSArIGhlaWdodCwgeCArIHdpZHRoIC0gcmFkaXVzLCB5ICsgaGVpZ2h0KVxyXG4gICAgY3h0LmxpbmVUbyh4ICsgcmFkaXVzLCB5ICsgaGVpZ2h0KVxyXG4gICAgY3h0LnF1YWRyYXRpY0N1cnZlVG8oeCwgeSArIGhlaWdodCwgeCwgeSArIGhlaWdodCAtIHJhZGl1cylcclxuICAgIGN4dC5saW5lVG8oeCwgeSArIHJhZGl1cylcclxuICAgIGN4dC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHksIHggKyByYWRpdXMsIHkpXHJcbiAgICAvLyBjeHQuYXJjKHggKyByYWRpdXMsIHkgKyByYWRpdXMsIHJhZGl1cywgTWF0aC5QSSwgTWF0aC5QSSAqIDMgLyAyKTtcclxuICAgIC8vIGN4dC5saW5lVG8od2lkdGggLSByYWRpdXMgKyB4LCB5KTtcclxuICAgIC8vIGN4dC5hcmMod2lkdGggLSByYWRpdXMgKyB4LCByYWRpdXMgKyB5LCByYWRpdXMsIE1hdGguUEkgKiAzIC8gMiwgTWF0aC5QSSAqIDIpO1xyXG4gICAgLy8gY3h0LmxpbmVUbyh3aWR0aCArIHgsIGhlaWdodCArIHkgLSByYWRpdXMpO1xyXG4gICAgLy8gY3h0LmFyYyh3aWR0aCAtIHJhZGl1cyArIHgsIGhlaWdodCAtIHJhZGl1cyArIHksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDEgLyAyKTtcclxuICAgIC8vIGN4dC5saW5lVG8ocmFkaXVzICsgeCwgaGVpZ2h0ICsgeSk7XHJcbiAgICAvLyBjeHQuYXJjKHJhZGl1cyArIHgsIGhlaWdodCAtIHJhZGl1cyArIHksIHJhZGl1cywgTWF0aC5QSSAqIDEgLyAyLCBNYXRoLlBJKTtcclxuICAgIGN4dC5jbG9zZVBhdGgoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFwiTGlua1RleHRTaGFwXCI7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSVRyYW5zZm9ybWFibGUsIElSZW5kZXJTdGF0ZSwgQm91bmRpbmcgfSBmcm9tIFwiLi4vbGliL3Nwcml0ZVN5c3RlbS9pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQmFzZVNoYXBlMkQgfSBmcm9tIFwiLi4vbGliL3Nwcml0ZVN5c3RlbS9zaGFwZXNcIjtcclxuaW1wb3J0IHsgU3ByaXRlMkQgfSBmcm9tICcuLi9saWIvc3ByaXRlU3lzdGVtL3Nwcml0ZTJkJ1xyXG5pbXBvcnQgeyB2ZWMyIH0gZnJvbSBcIi4uL2xpYi9tYXRoMmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYWR1aXNMaW5lU2hhcCBleHRlbmRzIEJhc2VTaGFwZTJEIHtcclxuXHJcbiAgcHVibGljIHJhZGl1czogbnVtYmVyID0gN1xyXG4gIHB1YmxpYyBwb2ludEFycjogQXJyYXk8dmVjMj4gPSBbXVxyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IocG9pbnRDb3VudDogbnVtYmVyID0gMCwgcmFkaXVzOiBudW1iZXIgPSAwKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50Q291bnQ7IGkrKykge1xyXG4gICAgICB0aGlzLnBvaW50QXJyLnB1c2gobmV3IHZlYzIoMCwgMCkpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGl0VGVzdChsb2NhbFB0OiB2ZWMyLCB0cmFuc2Zvcm06IElUcmFuc2Zvcm1hYmxlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRCb3VuZGluZygpOiBCb3VuZGluZyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIGJvdHRvbTogMCxcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgcmlnaHQ6IDBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBkcmF3UmFkaXVzKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgcG90MTogdmVjMiwgcG90MjogdmVjMiwgcG90MzogdmVjMik6IHZvaWQge1xyXG4gICAgbGV0IHJvdGF0ZSA9IE1hdGguYXRhbjIocG90Mi55IC0gcG90MS55LCBwb3QyLnggLSBwb3QxLngpXHJcbiAgICBsZXQgZHggPSBNYXRoLmNvcyhyb3RhdGUpICogdGhpcy5yYWRpdXNcclxuICAgIGxldCBkeSA9IE1hdGguc2luKHJvdGF0ZSkgKiB0aGlzLnJhZGl1c1xyXG4gICAgbGV0IG5ld1BvaW50MSA9IG5ldyB2ZWMyKHBvdDIueCAtIGR4LCBwb3QyLnkgLSBkeSlcclxuXHJcbiAgICBsZXQgcm90YXRlMiA9IE1hdGguYXRhbjIocG90My55IC0gcG90Mi55LCBwb3QzLnggLSBwb3QyLngpXHJcbiAgICBsZXQgZHgyID0gTWF0aC5jb3Mocm90YXRlMikgKiB0aGlzLnJhZGl1c1xyXG4gICAgbGV0IGR5MiA9IE1hdGguc2luKHJvdGF0ZTIpICogdGhpcy5yYWRpdXNcclxuICAgIGxldCBuZXdQb2ludDIgPSBuZXcgdmVjMihwb3QyLnggKyBkeDIsIHBvdDIueSArIGR5MilcclxuXHJcbiAgICBjb250ZXh0LmxpbmVUbyhuZXdQb2ludDEueCwgbmV3UG9pbnQxLnkpXHJcbiAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocG90Mi54LCBwb3QyLnksIG5ld1BvaW50Mi54LCBuZXdQb2ludDIueSlcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkcmF3KHRyYW5zZm9ybWFibGU6IElUcmFuc2Zvcm1hYmxlLCBzdGF0ZTogSVJlbmRlclN0YXRlLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuXHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG5cclxuICAgIGlmICh0aGlzLnJhZGl1cyA9PT0gMCkge1xyXG4gICAgICB0aGlzLnBvaW50QXJyLmZvckVhY2goKHBvaW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnRleHQubGluZVRvKHBvaW50LngsIHBvaW50LnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBvaW50QXJyLmZvckVhY2goKHBvaW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmIChpbmRleCA8IHRoaXMucG9pbnRBcnIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdSYWRpdXMoY29udGV4dCwgdGhpcy5wb2ludEFycltpbmRleCAtIDFdLCB0aGlzLnBvaW50QXJyW2luZGV4XSwgdGhpcy5wb2ludEFycltpbmRleCArIDFdKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gXCJSYWR1aXNMaW5lU2hhcFwiO1xyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLnRzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==