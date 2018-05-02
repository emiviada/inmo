/** Utilities of common usage **/
const Utils = {
  getUtcDatetime: function() {
    var now = new Date();
    return now.getUTCFullYear() + '-' + (now.getUTCMonth()+1) + '-' + now.getUTCDate() + ' ' +
      now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();
  },
  randomHash: function (nChar) {
    let abc = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
    let hash = '';

    for (i=0; i<nChar; i++) {
      hash += abc[Math.floor(Math.random()*abc.length)];
    }

    return hash; //Will return a nChar bit "hash"
  }
};

module.exports = Utils;
