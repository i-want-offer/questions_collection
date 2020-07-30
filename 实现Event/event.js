/**
 * 考察设计模式 => 发布订阅模式. 实现 Event 类, 支持 once, on, off, emit
 */
class Event {
  listeners = {};

  on(type, fn) {
    if (this.listeners[type]) {
      this.listeners[type].push(fn);
    } else {
      this.listeners[type] = [fn];
    }
  }

  emit(type, ...args) {
    this.listeners[type].forEach((fn) => {
      fn.apply(this, args);
    });
  }

  off(type, fn) {
    const index = this.listeners[type].indexOf(fn);
    this.listeners[type].splice(index, 1);
  }

  once(type, fn) {
    const cb = (...args) => {
      fn.apply(this, args);
      this.off(type, fn);
    };
    this.on(type, cb);
  }
}

const event = new Event();

event.on('say', console.log);
event.once('eat', console.log);

event.emit('say', 'good bye')

event.emit('eat', 'dog', 'cat');
event.emit('eat', 'cat', 'flish');


