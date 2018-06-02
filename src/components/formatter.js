import numeral from 'numeral';

var specificKeyFormat = {
  'additionalHydrogenUse': '0.0',
  'creditYield': '0.0%',
  'hydrogenYield': '0.0%',
  'shipmentModifer': '0.0%',
  'shipmentsPerHour': '0.0',
  'speedIncreasePerPlayer': '0.0%',
  'supportModules': '0'
};

export default {
  decimal: function (n) {
    return Number(parseFloat(n).toFixed(2));
  },
  formatNumber: function (value, key) {
    if (typeof (value) === 'number') {
      // see if we have a specific format to use for this propery
      var format = specificKeyFormat[key];
      if (format) {
        return numeral(value).format(format);
      }
      // otherwise assume that it is a number or percent
      if (value >= 1) {
        return numeral(value).format('0,0');
      } else {
        return numeral(value).format('0.0%');
      }
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

    function timeFormatInternal (value, divider, suffix) {
      var f = (value % divider === 0) ? '0' : '0.0';
      return numeral(value / divider).format(f) + suffix;
    }

    if (value >= 3600) {
      return timeFormatInternal(value, 3600, 'h');
    } else if (value >= 60) {
      return timeFormatInternal(value, 60, 'm');
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
