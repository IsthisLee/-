//게임 함수
function game(nums) {
  let randNum, comNums, userNums, compareResultArr, checkStrike, checkEnd;

  randNum = getRandNum(); //난수 생성
  //컴퓨터의 숫자가 없는 경우(첫 라운드인 경우)
  if (!nums) {
    comNums = getComNums(randNum); //컴퓨터의 3자리 숫자 생성
  } else comNums = nums; // 첫 라운드가 아닌 경우 기존 숫자
  userNums = getUserNums(); //사용자의 3자리 숫자 받기
  compareResultArr = compareNums(comNums, userNums); //두 숫자의 각 자리 비교 결과 배열
  giveHint(compareResultArr); //사용자에게 라운드 결과(힌트) 제공
  checkStrike = checkThreeStrike(compareResultArr); //쓰리 스트라이크 여부 확인
  checkEnd = checkGame(comNums, checkStrike); //게임 결과에 따라 종료 또는 재시작

  console.log(comNums, userNums, compareResultArr, checkStrike);
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

//조건. 같은 자리인 경우(스트라이크) true 반환 함수
function checkStrike(round, comNums, userNum) {
  if (comNums[round] === userNum) {
    return true;
  } else return false;
}

//조건. 다른 자리인 경우(볼) true 반환 함수
function checkBall(comNums, userNum) {
  if (comNums.includes(userNum)) {
    return true;
  } else return false;
}

//사용자와 컴퓨터의 숫자 비교 함수
function compareNums(standardNums, targetNums) {
  let strike,
    ball,
    result = [];

  for (let i = 0; i < 3; i++) {
    strike = checkStrike(i, standardNums, targetNums[i]);
    ball = checkBall(standardNums, targetNums[i]);
    if (strike) {
      result.push("스트라이크");
      continue;
    } else if (ball) {
      result.push("볼");
    } else {
      result.push("낫싱");
    }
  }
  console.log("비교 결과 : ", result);
  return result;
}

//사용자에게 라운드 결과(힌트) 제공 함수
function giveHint(dataArr) {
  let strike = 0,
    ball = 0;

  for (let i = 0; i < dataArr.length; i++) {
    if (dataArr[i] === "스트라이크") {
      strike++;
    } else if (dataArr[i] === "볼") {
      ball++;
    }
  }
  if (strike && ball) {
    alert(`${strike} 스트라이크 ${ball} 볼`);
  } else if (strike) {
    alert(`${strike} 스트라이크`);
  } else if (ball) {
    alert(`${ball} 볼`);
  } else alert("낫싱");
}

//쓰리 스트라이크 여부 확인 함수
function checkThreeStrike(dataArr) {
  let clear = false,
    strikeCnt = 0;

  for (let i = 0; i < dataArr.length; i++) {
    if (dataArr[i] === "스트라이크") {
      strikeCnt++;
    }
  }
  if (strikeCnt === 3) {
    return (clear = true);
  }
}

//결과에 따라 종료 또는 재시작하는 함수
function checkGame(comNums, checkResult) {
  //쓰리 스트라이크 여부에 따라 종료 또는 재시작
  if (checkResult) {
    alert("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
    return true;
  } else game(comNums); //재시작 시 기존 컴퓨터 숫자 가지고 시작
}
