async function getHighscore() {
  const url =
    "https://highscore-1e03a-default-rtdb.europe-west1.firebasedatabase.app/.json";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}


function displayHighscore(data) {
  const highscoreList = document.querySelector("#highscoreList");
  highscoreList.innerHTML = "";

  data.highscore.sort((min, max) => max.score - min.score);

  data.highscore.forEach((entry) => {
    const name = entry.name;
    const score = entry.score;

    const p = document.createElement("p");
    p.innerHTML = `Name: ${name}`;
    p.innerHTML += `<br>Score: ${score}`;
    highscoreList.appendChild(p);
  });
}

getHighscore().then((data) => displayHighscore(data));

async function updateObject(name, score) {
  const data = await getHighscore();
  let minScoreIndex = -1;
  let minScore = Infinity;

  for (let index in data.highscore) {
    const currentScore = data.highscore[index].score;

    if (currentScore < minScore) {
      minScore = currentScore;
      minScoreIndex = parseInt(index);
    }
  }

  const url = `https://highscore-1e03a-default-rtdb.europe-west1.firebasedatabase.app/highscore/${minScoreIndex}.json`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      score: score,
    }),
  });
  const updatedData = await response.json();
  console.log(updatedData);
  return updatedData;
}

export { updateObject, getHighscore, displayHighscore };
