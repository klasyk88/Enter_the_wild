const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//nowa tablica z wynikami graczy
highScoresList.innerHTML = highScores
  .map(score => {
    console.log(`${score.name}- ${score.score}`);
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
