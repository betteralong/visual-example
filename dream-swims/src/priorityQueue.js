export class PriorityQueue{
  items = []
  constructor(compare) {
    if (!compare) {
      this.compare = (a, b) => { return a - b }
    } else {
      this.compare = compare
    }
  }
  enqueue(item) {
    this.items.push(item)
  }
  dequeue() {
    if (!this.items.length) return
    let minIndex = 0
    for(let i = 1; i < this.items.length; i++) {
      if (this.compare(this.items[i], this.items[minIndex]) < 0) {
        minIndex = i
      }
    }
    // 最小项出队列
    const min = this.items[minIndex]
    this.items[minIndex] = this.items[this.items.length -1]
    this.items.pop()
    return min
  }

  get length() {
    return this.items.length
  }

}