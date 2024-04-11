const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

//set value
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

// first we create a random paragraph

function loadParagraph() {
  const paragraph = [
    "It had been a late night. To be more correct, it had been an early morning.Programming isn't about typing quickly. Being able to type quickly is important if you need to input data quickly. Good for quantity. Writing code is about quality, and you won't be (seriously) limited by typing slowly.If your intention is whether to know if typing speed helps software engineering it’s not. Not much. Because there are many other important factors which can affect the productivity speed when compared to typing speed.",
    "It was now 3:00 AM and George was just getting home.The average programmer? Probably quite fast. The better-than-average programmer? Probably slower, as they will actually be thinking about what they are typing. Speed of typing has nothing to do with successful software development.But if you ask me whether it helps in competitive programming or an interview (where you are under time pressure) it definitely helps. If you have 30 minutes in a contest, you can think for even 20 minutes and then write your code in 5 minutes and you’ll still have 5 minutes to debug/verify before submitting.",
    "He wasn't sure if it had been worth it.she'd know that he wasn't who she thought he was which would be almost as bad.The speed itself is not terribly important. One thing that is nice is to be able to touch-type all of the unusual characters that you often find in programming, but not in standard English.For me learning things properly is important, than focus solely on typing. If I were somebody who was already good at problem solving or good programming practices after enough practice, by now, my speed would have been better, and then only could I focus more on that to boost productivity, but now I’m involved in learning a lot of things.",
    "He was supposed to have been finished by 10:00 PM.Yet she asked the question anyway and waited for his answer. As many others have said, typing speed isn't influenced very much by programming because you are never pushed to type faster. I typed 140 wpm by the time I started getting into programming because of RuneScape marketing. Since programming I've only gotten up to 150, but never while actually programming.I don’t have any intention to enhance it, as a developer most of the time I have to write very few lines continuously. We have to check the next step of the Algorithm or the manual of the API or have to review the code - that we wrote, after a few lines.",
    "but his boss had implored him to stay and help when it was clear they weren't going to meet the 10:00 PM target time.I took a voluntary typing class back in elementary school and it was one of the most boring things I've ever done, but boy am I glad I didn't quit. Here's a puzzle for you: If you increase your average typing speed by 50 wpm (or more), which is not unrealistic, how much time will you save each year, given your average amount of daily typing? When you're a fast, efficient typist, you spend less time between thinking that thought and expressing it in code. Granted, but what does typing speed have anything to do with it? Anyone who has worked around computers for a while should be familiar enough with the keyboard in order to fluently write code at a reasonable speed.",
  ];
  // come random paragrahs
  const randomIndex = Math.floor(Math.random() * paragraph.length);
  typingText.innerHTML = "";
  for (const char of paragraph[randomIndex]) {
    console.log(char);
    typingText.innerHTML += `<span>${char}</span>`;
  }

  //Typing text color change
  typingText.querySelectorAll(`span`)[0].classList.add("active");
  document.addEventListener("keydown", () => input.focus());
  typingText.addEventListener("click", () => {
    input.focus();
  });
}

//handle user input
function initTyping() {
  const char = typingText.querySelectorAll("span");
  const typedChar = input.value.charAt(charIndex);
  if (charIndex < char.length && timeLeft > 0) {
    //time reverse when typing
    if (!isTyping) {
      timer = setInterval(initTime, 1000);
      isTyping = true;
    }

    if (char[charIndex].innerText === typedChar) {
      char[charIndex].classList.add("correct");
      console.log("correct");
    } else {
      mistake++;
      char[charIndex].classList.add("incorrect");
      console.log("incorrect");
    }
    charIndex++;
    //show the text by what we type (hint the next text)
    char[charIndex].classList.add("active");
    // mistake count mechanism
    mistakes.innerText = mistake;
    cpm.innerText = charIndex - mistake;
  } else {
    clearInterval(timer);
    input.value = "";
  }
}

//time count fuction
function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;
    //wpm count formula......important to remember
    let wpmVal = Math.round(
      ((charIndex - mistake) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm.innerText = wpmVal;
  } else {
    clearInterval(timer);
  }
}

//reset function
function reset() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  time.innerText = timeLeft;
  input.value = "";
  charIndex = 0;
  mistake = 0;
  isTyping = false;
  wpm.innerText = 0;
  cpm.innerText = 0;
  mistake.innerText = 0;
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);

loadParagraph();
