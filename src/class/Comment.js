export default class Comment {
  constructor(obj = {}) {
    this.id = obj.id ?? -1;
    this.targetComment = obj.targetComment ?? this;
    this.depth = obj.depth || 0;
    this.name = obj.name || '';
    this.message = obj.message || '';
    this.bgColor = obj.bgColor || '#ffffff';
    this.imgUrl = obj.imgUrl || '';
  }
}
