//게임 함수
function game() {
  let randNum, randNums, userNums;
  randNum = getRandNum(); // 난수 생성
  randNums = getComNums(randNum); //컴퓨터의 3자리 숫자 생성
  userNums = getUserNums(); //사용자의 3자리 숫자 받기

  console.log(randNums, userNums);
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

//사용자에게 3자리 숫자 받는 함수
function getUserNums() {
  let userNums; //사용자의 숫자

  do {
    userNums = prompt("숫자를 입력해주세요");
    if (userNums === null) return userNums; //사용자가 입력 창 취소 시 null 들어옴.
    if (userNums.length !== 3) alert("3자리 숫자를 입력해주세요!");
  } while (userNums.length !== 3);
  console.log("사용자의 숫자 : ", userNums, typeof userNums);
  return userNums;
}
