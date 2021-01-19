const Fuse = require('fuse.js');

module.exports = {
  fusesort: (list, needle) => {
    const fuse = new Fuse(list, { includeScore: false });
    return fuse.search(needle).map(item => item.item);
  }
}
