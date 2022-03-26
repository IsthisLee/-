//게임 함수
function game() {
  let randNum = getRandNum(); // 난수 생성
  let randNums = getComNums(randNum); //컴퓨터의 3자리 숫자 생성

  console.log(randNums);
}

//1~9 난수 생성 함수
function getRandNum() {
  let randNum = 0;

  do {
    randNum = Math.floor(Math.random() * 10);
  } while (!randNum);
  return randNum;
}

//서로 다른 세 자리 숫자 생성 함수
function getComNums(num) {
  let comNums,
    comNumArr = []; //상대방(컴퓨터)의 숫자, 숫자 생성용 배열

  for (let i = 0; i < 3; i++) {
    do {
      num = getRandNum();
    } while (comNumArr.includes(num));
    comNumArr[i] = num;
  }
  comNums = comNumArr.join("");
  console.log("상대방(컴퓨터)의 숫자 : ", comNums, typeof comNums);
  return comNums;
}
