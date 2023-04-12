async function getHighscore() {
    const url =
      "https://highscore-e869e-default-rtdb.europe-west1.firebasedatabase.app/.json";
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
  
  async function updateObject(userIndex, name, score) {
    const url = `https://highscore-e869e-default-rtdb.europe-west1.firebasedatabase.app/highscore/${userIndex}.json`;
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
  
  document.getElementById("addInfo").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const score = parseInt(document.getElementById("score").value.trim());
    const data = await getHighscore();
  
    // Find next available object or the one with the lowest score
    let minScore = Infinity;
    let minScoreIndex = -1;
  
    const highscoreData = data.highscore;
    for (let index in highscoreData) {
      const currentScore = highscoreData[index].score;
  
      if (
        highscoreData[index].name === "undefined" ||
        highscoreData[index].score === undefined ||
        currentScore < minScore
      ) {
        minScore = currentScore;
        minScoreIndex = parseInt(index);
      }
    }
  
    await updateObject(minScoreIndex, name, score);
    document.getElementById("name").value = "";
    document.getElementById("score").value = "";
  
    const updatedData = await getHighscore();
    displayHighscore(updatedData);
  });
  