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