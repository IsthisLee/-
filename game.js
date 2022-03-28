let comNums;

//게임 시작 버튼 클릭 시
function startGame() {
  comNums = getComNums(); //컴퓨터의 3자리 숫자 생성
  //버튼 숨기기, 게임 input 버튼 나타내기
  document.querySelector("#startButton").style.display = "none";
  document.querySelector("#gameInput").style.display = "block";
  //게시판 지우기
  document.querySelector(".result-board").innerHTML = "";
}

//숫자 입력 받을 시
function enter() {
  let compareResultArr, checkStrike, checkEnd;
  let inputNums = document.querySelector("#gameInput");
  let userNums = inputNums.value;

  //엔터 입력인지 확인
  if (!checkEnter()) {
    return;
  }
  //입력받은 숫자 검증
  if (!checkUserNums(userNums)) {
    return;
  }
  //두 숫자의 각 자리 비교
  compareResultArr = compareNums(comNums, userNums);
  //사용자에게 라운드 결과(힌트) 제공
  giveHint(compareResultArr, userNums);
  //쓰리 스트라이크 여부 확인
  checkStrike = checkThreeStrike(compareResultArr);
  //게임 결과에 따라 종료 또는 재시작
  checkEnd = checkGame(comNums, checkStrike);
  //게임 종료 시 input창 변경(재시작 여부 묻는 input창)
  if (checkEnd) {
    document.querySelector("#gameInput").style.display = "none";
    document.querySelector("#restartInput").style.display = "block";
  }
  inputNums.value = null;
}

function restart() {
  //엔터 입력인지 확인
  if (!checkEnter()) {
    return;
  }
  answerRestart();
}

//엔터 입력인지 확인하는 함수
function checkEnter() {
  if (event.keyCode === 13) {
    return true;
  }
}

//입력 받은 숫자 검증 함수
function checkUserNums(nums) {
  console.log("사용자의 숫자 : ", nums, typeof nums);
  if (isNaN(Number(nums))) {
    document.getElementById("explainResult").innerHTML =
      "숫자만 입력 가능합니다!";
    return false;
  } //3자리 숫자가 아닌 경우
  else if (nums.length !== 3) {
    document.getElementById("explainResult").innerHTML =
      "3자리 숫자를 입력해주세요!";
    return false;
  } else {
    return true;
  }
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
function getComNums() {
  let comNums,
    comNumArr = [], //상대방(컴퓨터)의 숫자, 숫자 생성용 배열
    num = getRandNum();

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
    //사용자가 입력 창 취소 시 null 들어옴.
    if (userNums === null) {
      return userNums;
    } //숫자를 입력하지 않은 경우
    else if (isNaN(Number(userNums))) {
      userNums = null;
      document.getElementById("explainResult").innerHTML =
        "숫자만 입력 가능합니다!";
    } //3자리 숫자가 아닌 경우
    else if (userNums.length !== 3)
      document.getElementById("explainResult").innerHTML =
        "3자리 숫자를 입력해주세요!";
  } while (userNums === null || userNums.length !== 3);
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
function giveHint(dataArr, nums) {
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
    document.querySelector(
      "#explainResult"
    ).innerHTML = `${strike} 스트라이크 ${ball} 볼`;
    document.querySelector(
      ".result-board"
    ).innerHTML += `<span>&nbsp${nums} ${strike}S ${ball}B /</span>`;
  } else if (strike) {
    document.querySelector("#explainResult").innerHTML = `${strike} 스트라이크`;
    document.querySelector(
      ".result-board"
    ).innerHTML += `<span>&nbsp${nums} ${strike}S ${ball}B /</span>`;
  } else if (ball) {
    document.querySelector("#explainResult").innerHTML = `${ball} 볼`;
    document.querySelector(
      ".result-board"
    ).innerHTML += `<span>&nbsp${nums} ${strike}S ${ball}B /</span>`;
  } else {
    document.querySelector("#explainResult").innerHTML = "낫싱";
    document.querySelector(
      ".result-board"
    ).innerHTML += `<span>&nbsp${nums} 낫싱 /</span>`;
  }
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

//게임 결과 확인하는 함수
function checkGame(comNums, checkResult) {
  //쓰리 스트라이크 여부 확인
  if (checkResult) {
    document.querySelector("#explainResult").innerHTML =
      "정답을 맞추셨습니다 !! 🥳";
    document.querySelector("#explainResult").style.color = "green";
    return true;
  } else return false;
}

//새로 시작 여부 묻는 함수
function answerRestart() {
  let restartInputNum = document.querySelector("#restartInput");
  let restartNum = restartInputNum.value;

  if (restartNum === "1") {
    startGame();
    //게임 input으로 변경
    document.querySelector("#restartInput").style.display = "none";
    document.querySelector("#gameInput").style.display = "block";
    document.getElementById("explainResult").innerHTML = "";
    document.querySelector("#explainResult").style.color = "red";
  } else if (restartNum === "2") {
    //input창 지우고, 게임 시작 버튼 생성
    document.querySelector("#restartInput").style.display = "none";
    document.querySelector("#startButton").style.display = "block";
    document.getElementById("explainResult").innerHTML = "";
    document.querySelector("#explainResult").style.color = "red";
  } else {
    document.querySelector("#explainResult").style.color = "red";
    document.getElementById("explainResult").innerHTML =
      "1 또는 2만 입력 가능합니다.";
  }

  restartInputNum.value = null;
  document.querySelector(".result-board").innerHTML = "라운드 결과 기록 게시판";

  return;
}
