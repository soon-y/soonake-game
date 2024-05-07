export default class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(element) {
    this.queue.push(element);
    return this.queue;
  }

  dequeue() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }

  last() {
    return this.queue[this.queue.length - 1];
  }

  length() {
    return this.queue.length;
  }

  reverse() {
    // Declare an empty array
    const reversed = [];

    // Iterate through the array using a while loop
    while (this.queue.length > 0) {
      reversed.push(this.queue.pop());
    }
    // Set queue using the new array
    this.queue = reversed;
    return this.queue;
  }
}
