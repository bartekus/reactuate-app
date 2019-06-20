import { EventEmitter } from 'fbemitter';

const _emitter = new EventEmitter();

export const emitter = {
  addListener(key, listener) {
    return _emitter.addListener(key, listener)
  },
  emit(key, payload) {
    _emitter.emit(key, payload)
  },
};
