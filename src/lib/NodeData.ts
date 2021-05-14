import { NodeType } from './spriteSystem/interface'

export class NodeData {


  public parentIdx: number; // 父节点索引
  public nodeType: NodeType; // 节点类型
  public name: string | undefined; // name
  public fromIdx: number | undefined // from索引
  public toIdx: number | undefined // to索引

  public x: number = 0;
  public y: number = 0

  public constructor(
    parentIdx: number,
    nodeType: NodeType,
  ) {
    this.parentIdx = parentIdx
    this.nodeType = nodeType
  }
}