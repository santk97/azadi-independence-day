/* ============================================================
   आज़ादी Quiz — survival-style trivia. Runs as a full-screen
   overlay so the persistent music player keeps playing underneath.
   ============================================================ */
(function quizApp(){
  const page = document.getElementById("quizPage");
  if(!page || typeof QUIZ_QUESTIONS === "undefined") return;

  const els = {
    close: document.getElementById("quizClose"),
    startScreen: document.getElementById("quizStartScreen"),
    playScreen: document.getElementById("quizPlayScreen"),
    resultsScreen: document.getElementById("quizResultsScreen"),
    nameInput: document.getElementById("quizNameInput"),
    startBtn: document.getElementById("quizStartBtn"),
    best: document.getElementById("quizBest"),
    hudName: document.getElementById("quizPlayerName"),
    hudTimer: document.getElementById("quizTimer"),
    hudScore: document.getElementById("quizScore"),
    progressFill: document.getElementById("quizProgressFill"),
    qNumber: document.getElementById("quizQNumber"),
    difficultyBadge: document.getElementById("quizDifficultyBadge"),
    questionText: document.getElementById("quizQuestionText"),
    options: document.getElementById("quizOptions"),
    feedback: document.getElementById("quizFeedback"),
    feedbackHead: document.getElementById("quizFeedbackHead"),
    feedbackExplanation: document.getElementById("quizFeedbackExplanation"),
    feedbackLink: document.getElementById("quizFeedbackLink"),
    nextBtn: document.getElementById("quizNextBtn"),
    resultsTitle: document.getElementById("quizResultsTitle"),
    resultsSubtitle: document.getElementById("quizResultsSubtitle"),
    finalScore: document.getElementById("quizFinalScore"),
    finalTime: document.getElementById("quizFinalTime"),
    finalDifficulty: document.getElementById("quizFinalDifficulty"),
    playAgainBtn: document.getElementById("quizPlayAgainBtn"),
    backBtn: document.getElementById("quizBackBtn"),
    hintBtn: document.getElementById("quizHintBtn"),
  };

  const state = { queue: [], index: 0, score: 0, name: "", startTime: 0, timerInterval: null, awaitingNext: false, hintUsed: false };
  let lastFocused = null;

  function shuffleArr(arr){
    const a = arr.slice();
    for(let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildQueue(){
    const easy = shuffleArr(QUIZ_QUESTIONS.filter(q => q.difficulty === "easy"));
    const medium = shuffleArr(QUIZ_QUESTIONS.filter(q => q.difficulty === "medium"));
    const hard = shuffleArr(QUIZ_QUESTIONS.filter(q => q.difficulty === "hard"));
    return [...easy, ...medium, ...hard];
  }

  function fmtTime(totalSeconds){
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return m + ":" + String(s).padStart(2, "0");
  }

  function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

  function getBestScore(){ return Number(localStorage.getItem("azadiQuizBest") || 0); }
  function saveBestScore(score){
    if(score > getBestScore()) localStorage.setItem("azadiQuizBest", String(score));
  }

  function showScreen(name){
    els.startScreen.hidden = name !== "start";
    els.playScreen.hidden = name !== "play";
    els.resultsScreen.hidden = name !== "results";
  }

  function startTimer(){
    clearInterval(state.timerInterval);
    els.hudTimer.textContent = "0:00";
    state.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
      els.hudTimer.textContent = fmtTime(elapsed);
    }, 250);
  }
  function stopTimer(){ clearInterval(state.timerInterval); }

  function updateHud(){
    els.hudName.textContent = state.name;
    els.hudScore.textContent = "Score " + state.score;
    els.progressFill.style.width = (state.index / state.queue.length * 100) + "%";
  }

  function renderQuestion(){
    const q = state.queue[state.index];
    state.awaitingNext = false;
    els.qNumber.textContent = `Question ${state.index + 1} of ${state.queue.length}`;
    els.difficultyBadge.textContent = capitalize(q.difficulty);
    els.difficultyBadge.className = "quiz-difficulty-badge diff-" + q.difficulty;
    els.questionText.textContent = q.q;
    updateHud();

    const opts = q.options.map((text, i) => ({ text, isCorrect: i === q.correct }));
    const shuffled = shuffleArr(opts);
    els.options.innerHTML = shuffled.map(o =>
      `<button class="quiz-option" data-correct="${o.isCorrect}">${o.text}</button>`
    ).join("");
    els.feedback.hidden = true;
    els.hintBtn.disabled = state.hintUsed;
  }

  function useHint(){
    if(state.hintUsed || state.awaitingNext) return;
    const wrongBtns = Array.from(els.options.querySelectorAll(".quiz-option"))
      .filter(b => b.dataset.correct === "false" && !b.disabled);
    if(!wrongBtns.length) return;
    const pick = wrongBtns[Math.floor(Math.random() * wrongBtns.length)];
    pick.disabled = true;
    pick.classList.add("hint-eliminated");
    state.hintUsed = true;
    els.hintBtn.disabled = true;
  }

  function handleAnswer(btn){
    if(state.awaitingNext || btn.disabled) return;
    state.awaitingNext = true;
    const q = state.queue[state.index];
    const allBtns = Array.from(els.options.querySelectorAll(".quiz-option"));
    allBtns.forEach(b => b.disabled = true);
    els.hintBtn.disabled = true;
    const isCorrect = btn.dataset.correct === "true";

    if(isCorrect){
      btn.classList.add("correct");
      state.score++;
      updateHud();
      setTimeout(() => {
        state.index++;
        if(state.index >= state.queue.length) finish(true);
        else renderQuestion();
      }, 800);
    } else {
      btn.classList.add("wrong");
      allBtns.forEach(b => { if(b.dataset.correct === "true") b.classList.add("correct"); });
      els.feedbackHead.textContent = `The correct answer: ${q.options[q.correct]}`;
      els.feedbackExplanation.textContent = q.explanation;
      els.feedbackLink.href = q.link;
      els.feedback.hidden = false;
    }
  }

  function finish(perfect){
    stopTimer();
    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    const reachedIndex = Math.min(state.index, state.queue.length - 1);
    const reachedDifficulty = state.queue[reachedIndex] ? state.queue[reachedIndex].difficulty : "easy";

    els.resultsTitle.textContent = perfect ? `Flawless, ${state.name}!` : `So Close, ${state.name}!`;
    els.resultsSubtitle.textContent = perfect
      ? "You answered all 100 questions correctly — a true scholar of the freedom struggle."
      : `You answered ${state.score} question${state.score === 1 ? "" : "s"} correctly before a wrong turn.`;
    els.finalScore.textContent = state.score;
    els.finalTime.textContent = fmtTime(elapsed);
    els.finalDifficulty.textContent = capitalize(reachedDifficulty);

    saveBestScore(state.score);
    showScreen("results");
  }

  function open(){
    lastFocused = document.activeElement;
    page.classList.add("open");
    page.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const best = getBestScore();
    els.best.textContent = best > 0 ? `Your best so far: ${best} correct in a row.` : "";
    showScreen("start");
    setTimeout(() => els.nameInput.focus(), 100);
  }

  function close(){
    page.classList.remove("open");
    page.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    stopTimer();
    if(lastFocused) lastFocused.focus();
  }

  els.startBtn.addEventListener("click", () => {
    state.name = els.nameInput.value.trim() || "Freedom Seeker";
    state.queue = buildQueue();
    state.index = 0;
    state.score = 0;
    state.hintUsed = false;
    state.startTime = Date.now();
    startTimer();
    showScreen("play");
    renderQuestion();
  });
  els.nameInput.addEventListener("keydown", (e) => { if(e.key === "Enter") els.startBtn.click(); });

  els.options.addEventListener("click", (e) => {
    const btn = e.target.closest(".quiz-option");
    if(btn) handleAnswer(btn);
  });
  els.hintBtn.addEventListener("click", useHint);

  els.nextBtn.addEventListener("click", () => finish(false));

  els.playAgainBtn.addEventListener("click", () => {
    els.nameInput.value = state.name;
    showScreen("start");
    els.best.textContent = getBestScore() > 0 ? `Your best so far: ${getBestScore()} correct in a row.` : "";
  });
  els.backBtn.addEventListener("click", close);
  els.close.addEventListener("click", close);
  page.querySelector(".app-page-backdrop").addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && page.classList.contains("open")) close();
  });

  document.getElementById("navOpenQuiz")?.addEventListener("click", open);
  document.getElementById("navOpenQuizMobile")?.addEventListener("click", () => {
    document.getElementById("navMobileMenu")?.classList.remove("open");
    open();
  });

  window.__openAzadiQuiz = open;
})();
