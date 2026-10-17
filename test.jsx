
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quiz Master</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:Arial;background:#101827;color:white;
display:flex;justify-content:center;align-items:center;min-height:100vh}
.container{background:#1e293b;padding:30px;border-radius:18px;
width:90%;max-width:550px;box-shadow:0 10px 35px #0005}
h1{text-align:center;color:#38bdf8}
p{text-align:center;color:#cbd5e1}
.top{display:flex;justify-content:space-between;margin:20px 0}
button{width:100%;padding:13px;margin:7px 0;border:0;border-radius:8px;
cursor:pointer;font-size:16px}
.option{background:#334155;color:white;text-align:left}
.option:hover{background:#475569}
.correct{background:#16a34a!important}
.wrong{background:#dc2626!important}
#next{background:#0ea5e9;color:white;margin-top:15px}
#start{background:#0ea5e9;color:white}
#result{text-align:center;font-size:22px}
.hidden{display:none}
</style>
</head>
<body>
<div class="container">
  <h1>⚡ Quiz Master</h1>
  <p>Test your knowledge and challenge yourself!</p>

  <div id="startScreen">
    <p>10 questions • General Knowledge • Timed Quiz</p>
    <button id="start" onclick="startQuiz()">Start Quiz</button>
  </div>

  <div id="quizScreen" class="hidden">
    <div class="top">
      <span id="progress"></span>
      <span>⏱ <span id="timer">15</span>s</span>
      <span>Score: <span id="score">0</span></span>
    </div>
    <h3 id="question"></h3>
    <div id="options"></div>
    <button id="next" onclick="nextQuestion()" disabled>Next Question →</button>
  </div>

  <div id="resultScreen" class="hidden">
    <h2>Quiz Completed!</h2>
    <div id="result"></div>
    <button id="start" onclick="startQuiz()">Play Again</button>
  </div>
</div>

<script>
const questions = [
 {q:"Which is the capital of India?",o:["Mumbai","New Delhi","Kolkata","Chennai"],a:1},
 {q:"Which planet is known as the Red Planet?",o:["Earth","Venus","Mars","Jupiter"],a:2},
 {q:"What is 12 × 8?",o:["84","96","108","88"],a:1},
 {q:"Which language is used to style web pages?",o:["HTML","Python","CSS","SQL"],a:2},
 {q:"What is the largest ocean?",o:["Atlantic","Indian","Arctic","Pacific"],a:3},
 {q:"How many sides does a hexagon have?",o:["5","6","7","8"],a:1},
 {q:"Which organ pumps blood?",o:["Lungs","Brain","Heart","Liver"],a:2},
 {q:"What does CPU stand for?",o:["Central Processing Unit","Computer Power Unit","Control Program Utility","Central Print Unit"],a:0},
 {q:"Which gas do plants absorb?",o:["Oxygen","Carbon dioxide","Nitrogen","Hydrogen"],a:1},
 {q:"What is the binary form of decimal 2?",o:["01","10","11","100"],a:1}
];

let index=0, score=0, time=15, clock, answered=false;

function startQuiz(){
 index=0;score=0;
 document.getElementById("score").textContent=score;
 document.getElementById("startScreen").classList.add("hidden");
 document.getElementById("resultScreen").classList.add("hidden");
 document.getElementById("quizScreen").classList.remove("hidden");
 showQuestion();
}

function showQuestion(){
 clearInterval(clock);
 time=15;answered=false;
 document.getElementById("timer").textContent=time;
 document.getElementById("progress").textContent=
 "Question "+(index+1)+"/"+questions.length;
 document.getElementById("question").textContent=questions[index].q;
 document.getElementById("next").disabled=true;
 const box=document.getElementById("options");
 box.innerHTML="";
 questions[index].o.forEach((option,i)=>{
  const btn=document.createElement("button");
  btn.textContent=option;
  btn.className="option";
  btn.onclick=()=>selectAnswer(i,btn);
  box.appendChild(btn);
 });
 clock=setInterval(()=>{
  time--;
  document.getElementById("timer").textContent=time;
  if(time<=0){
   clearInterval(clock);
   if(!answered) selectAnswer(-1,null);
  }
 },1000);
}

function selectAnswer(choice,btn){
 if(answered)return;
 answered=true;clearInterval(clock);
 const q=questions[index];
 document.querySelectorAll(".option").forEach((b,i)=>{
  b.disabled=true;
  if(i===q.a)b.classList.add("correct");
 });
 if(choice!==-1 && choice===q.a)score++;
 else if(btn)btn.classList.add("wrong");
 document.getElementById("score").textContent=score;
 document.getElementById("next").disabled=false;
}

function nextQuestion(){
 if(!answered)return;
 index++;
 if(index<questions.length)showQuestion();
 else showResult();
}

function showResult(){
 clearInterval(clock);
 document.getElementById("quizScreen").classList.add("hidden");
 document.getElementById("resultScreen").classList.remove("hidden");
 const percent=Math.round(score/questions.length*100);
 document.getElementById("result").innerHTML=
 `${score} / ${questions.length}<p>You scored ${percent}%</p>
 <p>${percent>=80?"Excellent work!":percent>=50?"Good effort!":"Keep practising!"}</p>`;
}
</script>
</body>
</html>
