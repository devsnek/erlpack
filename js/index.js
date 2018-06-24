'use strict';

const { pack, unpack } = require('bindings')('erlpack');

const kPackSymbol = Symbol('erlpack.pack.custom');

module.exports = {
  pack: (v) => {
    if (v && v[kPackSymbol]) {
      return pack(v[kPackSymbol]());
    }
    return pack(v);
  },
  unpack: (v) => {
    if (typeof v !== 'object') {
      throw new Error('Attempting to unpack a non-object.');
    }
    if (v instanceof ArrayBuffer) {
      v = new Uint8Array(v);
    }
    return unpack(v);
  },
};

module.exports.pack.custom = kPackSymbol;
