export class NodeData {

  public name: string;
  public parentIdx: number;
  public nodeClass: string;
  public fromIdx: number | undefined
  public toIdx: number | undefined

  public constructor(name: string, parentIdx: number, nodeClass: string, fromIdx?: number, toIdx?: number) {
    this.name = name
    this.parentIdx = parentIdx
    this.nodeClass = nodeClass
    this.fromIdx = fromIdx
    this.toIdx = toIdx
  }
}