import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export {screenHeight, screenWidth};

export const convertDate = inputFormat => {
  function pad(s) {
    return s < 10 ? '0' + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-');
};
