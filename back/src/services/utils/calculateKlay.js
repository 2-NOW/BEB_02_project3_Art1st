import dotenv from 'dotenv';
dotenv.config();
import Caver from 'caver-js';
const caver = new Caver(process.env.BAOBAB_NETWORK);

async function addAmount(num1, num2) { // string 값, string 값
    num1 = caver.utils.toPeb(num1, 'KLAY');
    num2 = caver.utils.toPeb(num2, 'KLAY');

    return caver.utils.fromPeb((BigInt(num1) + BigInt(num2)).toString());
}

async function subAmount(num1, num2) { // num1 - num2
    num1 = caver.utils.toPeb(num1, 'KLAY');
    num2 = caver.utils.toPeb(num2, 'KLAY');

    return caver.utils.fromPeb((BigInt(num1) - BigInt(num2)).toString());
} 

async function isBigger(num1, num2) { // num2가 더 크면 true 반환
    num1 = caver.utils.toPeb(num1, 'KLAY');
    num2 = caver.utils.toPeb(num2, 'KLAY');

    if(BigInt(num1) < BigInt(num2)){
        return true;
    }
    else{
        return false;
    }
}

async function floating(str){
    str = str.split('.');
    if(str.length == 2) {
        str[1] = str[1].slice(0,2);
    }
    return str.join('.');
  }

export {addAmount, subAmount, isBigger, floating};