import { NodeType } from './spriteSystem/interface'

export class NodeData {

  public name: string;
  public parentIdx: number;
  public nodeType: NodeType;
  public fromIdx: number | undefined
  public toIdx: number | undefined

  public constructor(name: string, parentIdx: number, nodeType: NodeType, fromIdx?: number, toIdx?: number) {
    this.name = name
    this.parentIdx = parentIdx
    this.nodeType = nodeType
    this.fromIdx = fromIdx
    this.toIdx = toIdx
  }
}