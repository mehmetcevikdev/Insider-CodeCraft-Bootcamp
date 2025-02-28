let countdown;
let remainingTime;

const timeInput = document.getElementById("timeInput");
const countdownDisplay = document.getElementById("countdownDisplay");

timeInput.addEventListener("keyup", ({ key }) => {
  if ( key === "Enter") {
    startCountdown();
  }
});

startCountdown = () => {
  let time = parseInt(timeInput.value);
  if (time <= 0 || isNaN(time)) {
    alert("Lütfen geçerli bir süre girin.");
    return;
  }

  clearInterval(countdown);
  remainingTime = time;
  updateDisplay();

  countdown = setInterval(() => {
    remainingTime--;
    updateDisplay();

    if (remainingTime <= 0) {
      clearInterval(countdown);
      countdownDisplay.textContent = "Süre doldu!";
    }
  }, 1000);
};

resetCountdown = () => {
  clearInterval(countdown);
  remainingTime = 0;
  countdownDisplay.textContent = "Süreyi girin ve başlatın.";

  timeInput.value = "";
};

updateDisplay = () => {
  document.getElementById(
    "countdownDisplay"
  ).textContent = `Kalan süre: ${remainingTime} saniye`;
};
