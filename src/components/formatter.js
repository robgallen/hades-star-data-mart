import numeral from 'numeral';

export default {
  decimal: function (n) {
    return Number(parseFloat(n).toFixed(2));
  },
  formatNumber: function (value, key) {
    if (typeof (value) === 'number') {
      if (key === 'additionalHydrogenUse') return numeral(value).format('0.0');
      if (value >= 1) return numeral(value).format('0,0');
      else return numeral(value).format('0.0%');
    }
    return value;
  },
  singleColumn: function (value, levels) {
    if (levels.length === 1) return false;
    if (typeof (value) === 'object' && value.length === 1) {
      return true;
    };
    return false;
  },
  timeFormat: function (value) {
    if (isNaN(value)) return value;
    if (value >= 60) {
      return numeral(value / 60).format(0.0) + 'm';
    } else {
      return value + 's';
    }
  },
  wordify: function (str) {
    var words = str.replace(/([A-Z])/g, ' $1').replace(/^./, function (letter) {
      return letter.toUpperCase();
    });
    return words;
  }
};
