let timerEl = document.getElementById("timer");
let defuserEl = document.getElementById("defuser");
let reset = document.getElementById("reset");
let atteEl = document.getElementById("attempts");
let bombBlastEl = document.getElementById("bombBlast");
let bombSetupEl = document.getElementById("bombSetup");
let BoyEl = document.getElementById("boySetup");
let openDoorEl = document.getElementById("openDoor");
let thankEl=document.getElementById("thank");
let countdown;
let attempts;
let randNum;
let intervalId;
function helpBtn(){
  window.location.href = 'bombDefuse.html';
}
bombBlastEl.removeChild(thankEl);
bombSetupEl.classList.add("BombSetupNone");

function startGame() {
  bombBlastEl.removeChild(openDoorEl);
  bombBlastEl.removeChild(BoyEl);
  bombSetupEl.classList.remove("BombSetupNone");
  clearInterval(intervalId);
  countdown = 20;
  attempts = 3;
  randNum = 1; //Math.ceil(Math.random() * 10); // Generates a random number between 1 and 10
  console.log(randNum);
  timerEl.textContent = countdown;
  atteEl.textContent = "";
  defuserEl.value = "";
  
  intervalId = setInterval(function() {
    countdown--;
    timerEl.textContent = countdown;
    if (countdown === 0) {
      timerEl.textContent = "BOOM";
      atteEl.textContent = "";
      bombBlastEl.classList.add("Blasting");
      BoyEl.classList.add("BoyNone");
      bombSetupEl.classList.add("BombSetupNone");
      clearInterval(intervalId);
    }
  }, 1000);
}

reset.onclick = startGame;

defuserEl.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && countdown !== 0) {
    let bombDefuserText = parseInt(defuserEl.value);
    
    if (bombDefuserText === randNum) {
      timerEl.textContent = "You did it!";
      bombBlastEl.classList.add("celebrate");
      bombSetupEl.classList.add("BombSetupNone");
      BoyEl.classList.add("BoyNone");
      defuserEl.value = "";
      bombBlastEl.appendChild(thankEl);
      clearInterval(intervalId);
    } else {
      attempts--;
      if (attempts > 0) {
        atteEl.textContent = `Wrong! ${attempts} attempts left.`;
      } else {
        timerEl.textContent = "Failed to find";
        defuserEl.value = "";
        atteEl.textContent = "";
        clearInterval(intervalId);
      }
    }
  }
});
