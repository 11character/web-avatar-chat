export default class Comment {
  constructor(obj = {}) {
    this.name = obj.name || '';
    this.message = obj.message || '';
    this.bgColor = obj.bgColor || '#ffffff';
    this.imgUrl = obj.imgUrl || '';
  }
}
