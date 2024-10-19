import dayjs from 'dayjs';

const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

export const emailValidate = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const toStringLeadZero = (
  num: number = 1,
  places: number = 1,
): string => {
  return String(num).padStart(places, '0');
};

export const formattedNumberToMoney = (number: number | string) => {
  return number?.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  });
};

export const allowedNumbersValidatorToString = (text: string) => {
  return /^\d*(,\d{0,2})?$/.test(text);
};

export const cuitFormat = (value: string | number) => {
  value = value.toString();
  if (value.length < 3) {
    return value;
  }

  const partOne = value.substring(0, 2);
  const partTwo = value.substring(2, value.length - 1);
  const partThree = value[value.length - 1];

  return `${partOne}-${partTwo}-${partThree}`;
};

export const replaceCharacterInString = (
  text: string,
  characterToReplace: string,
  replacementCharacter: string,
) => {
  const regex = new RegExp(characterToReplace, 'g');
  const result = text.replace(regex, replacementCharacter);
  return result;
};

export const capitalizeFirstLetter = (text: string = '') => {
  const words = text.toLowerCase().split(' ');

  const capitalizedWords = words.map(word => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return '';
    }
  });
  const result = capitalizedWords.join(' ');
  return result;
};

export const formatNumberWithDots = (number: string | number) => {
  number = number.toString();
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatDate = (dateString: string) => {
  const formattedDate = dayjs(dateString)
    .locale('es-AR')
    .format('ddd DD [de] MMM');
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1) + '.';
};

export const removeDuplicatesFromAnArray = (array: any[]) => {
  let arraySinDuplicados = array.filter((valor, indice) => {
    return array.indexOf(valor) === indice;
  });
  return arraySinDuplicados;
};

export const mayorValueByObject = (obj: Object): [string, number] => {
  let valorMayor = 0;
  let nombreValorMayor = '';

  for (let clave in obj) {
    if (obj[clave] > valorMayor) {
      valorMayor = obj[clave];
      nombreValorMayor = clave;
    }
  }
  return [nombreValorMayor, valorMayor];
};

export const removeZeroLeft = (str: string): string => {
  const caracteres = str.split(''); // Separa cada carácter en un array

  let indiceNoCero = 0;
  while (indiceNoCero < str.length && caracteres[indiceNoCero] === '0') {
    indiceNoCero++; // Encuentra el índice del primer carácter que no sea '0'
  }

  // Verifica si todos los caracteres son '0'
  const sonTodosCeros = indiceNoCero === str.length;

  if (sonTodosCeros) {
    return '0'; // Si todos son ceros, devuelve "0"
  } else {
    const contieneSoloLetras = /^[a-zA-Z]+$/.test(str); // Verifica si solo contiene letras

    if (contieneSoloLetras) {
      return str; // Si solo contiene letras, devuelve el string original
    } else {
      return str.substring(indiceNoCero); // Si hay números, quita los ceros iniciales
    }
  }
};


export const processValueCurrency = (value: string) => {
  // Eliminar comas y puntos y convertir a número entero
  return parseFloat(value.replace(/,/g, ''));
};

export const setTimeForInactivityMinutesAndSeconds = (
  minutes: number,
  seconds: number = 0,
): number => {
  return 1000 * 60 * minutes + 1000 * seconds;
};
