
onload = function () {
    let poll = localStorage.getItem("poll");
    let pollBtnDiv = document.querySelector(".vote_button");
    let pollViewDiv = document.querySelector(".vote");
    console.log(pollViewDiv);

    let pollContent;

    if (poll) {
        // 진행중인 투표가 있다면.
        let pollJson = JSON.parse(poll);
        let pollView = `
            <h3 style="margin:auto; text-align:center;">[ 당신의 선택 ]</h3>
            <h4>${pollJson.question}</h4>
            <div class="poll-answer-list">
         `;
        let answers = pollJson.answers;
        for (let answer of answers) {
            pollView += `
            <label><input type="radio" name="poll-answer" value="${answer}" /> ${answer}</label><br>
            `;
        }
        let start_date = pollJson.startDate;
        let end_date = pollJson.endDate;

        pollView += `
        </div>
        <div class="poll-btn-list" style="margin-right:10px; text-align:right;">
          <button type="button" id="polling-btn" class="button btn-primary" onclick="javascript:polling();">투표하기</button>
          <button class="button btn-primary" >결과보기</button>
        </div>
        <div class="poll-date" style="font-size:14px"><b>투표기간 : ${start_date} ~ ${end_date}</b></div>
        `;
        pollViewDiv.innerHTML = pollView;

        pollBtnDiv.style.display = "none";
        pollViewDiv.style.display = "";
    } else {
        // 진행중인 투표가 없다면.
        pollContent = `진행중인 투표가 없습니다.`;
        pollViewDiv.innerHTML = pollContent;

        pollBtnDiv.style.display = "";
        pollViewDiv.setAttribute("style", "text-align: center; display: block;");
    }
}

function login() {
    while (txt != "ssafy") {
        var txt = prompt("아이디입력", "아이디를 입력해주세요.");
    }
    while (txt != "1234") {
        var txt = prompt("비밀번호입력", "비밀번호를 입력해주세요.");
    }
    alert("로그인 성공");
    document.getElementById("header_nav_confirm_off").style.display = 'none';
    document.getElementById("header_nav_confirm_on").style.display = 'inline';
    document.getElementById("profile_img").src='img/profile.png';

}

function logout() {
    document.getElementById("header_nav_confirm_off").style.display = 'inline';
    document.getElementById("header_nav_confirm_on").style.display = 'none';
    document.getElementById("profile_img").src='img/noimg.png';
}

function slideDown(region) {
    var current = document.getElementById(region.getAttribute('id')).style.display;
    if (current == 'none') 
        document.getElementById(region.getAttribute('id')).style.display = 'block';
    else if (current == 'block')
    document.getElementById(region.getAttribute('id')).style.display = 'none';
}

function allSlide(command) {
    var docs = document.getElementsByClassName("store_item_sub");
    if (command == 'on') {
        for (var doc of docs) {
            document.getElementById(doc.getAttribute('id')).style.display = 'block';
        }
        document.getElementsByClassName("store_display_on")[0].style.display = 'none';
        document.getElementsByClassName("store_display_off")[0].style.display = 'block';
    }
    else if (command == 'off') {
        console.log("here");
        for (var doc of docs) {
            document.getElementById(doc.getAttribute('id')).style.display = 'none';
        }
        document.getElementsByClassName("store_display_on")[0].style.display = 'block';
        document.getElementsByClassName("store_display_off")[0].style.display = 'none';
    }
}

function pollMake() {
    window.open("./pollmake.html", "winname", "width=420, height=280");
}

var counter = 1;
function addAnswer() {
    let answer = document.createElement("div");
    answer.setAttribute("class", "poll_answer_item");
    answer.setAttribute("id", counter);
    let txt = document.createElement("input");
    txt.setAttribute("type", "text");
    txt.setAttribute("name", "answer");
    answer.appendChild(txt);
    let btn = document.createElement("button");
    
    btn.setAttribute("type", "button");
    btn.setAttribute("onclick", `removeElement(${counter})`);
    
    btn.innerText = "삭제";
    //btn.addEventListener('click', removeElement(counter));
    answer.appendChild(btn);

    document.getElementById("poll_answer_list").appendChild(answer);
    counter++;
}

function removeElement(index) { 
    console.log(index);
    let el = document.getElementById(index);
    document.getElementById("poll_answer_list").removeChild(el);
    // counter--;
}

function makePoll() {
    let sdate = document.querySelector("#start_date").value;
    let start_date = sdate.substring(2, 4) + "." + sdate.substring(5, 7) + "." + sdate.substring(8, 10);
    let edate = document.querySelector("#end_date").value;
    let end_date = edate.substring(2, 4) + "." + edate.substring(5, 7) + "." + edate.substring(8, 10);
    
    if (!start_date) {
        alert("시작일자는 필수!!!");
        return;
    }
    else if (!end_date) {
        alert("종료일자는 필수!!!");
        return;
    }

    let question = document.querySelector("#question").value;
    if (!question) {
        alert("질문은 필수!!!");
        return;
    }

    let answers = document.getElementsByName("answer");

    for (const answer of answers) {
        if (!answer.value) {
        alert("답변 필수!!!");
        return;
        }
    }

    let answerArr = [];
    for (const answer of answers) {
        answerArr.push(answer.value);
    }

    let poll = {
        question: question,
        startDate: start_date,
        endDate: end_date,
        answers: answerArr,
    };

    if (confirm("투표를 생성하시겠습니까?")) {
        localStorage.setItem("poll", JSON.stringify(poll));
        opener.location.reload();
        self.close();
    }
}

function polling() {
    let id = prompt("아이디입력", "아이디");
      console.log(id);
      let pwd = prompt("비밀번호입력", "비밀번호");
      console.log(pwd);
  
      let answers = document.getElementsByName("poll-answer");
      let val = "";
      for (let answer of answers) {
        if (answer.checked) {
          val = answer.value;
          break;
        }
      }
      if (val) alert(val + "을 선택!!!!");
      else alert("답변 항목 하나를 선택 해 주세요!!!");
}