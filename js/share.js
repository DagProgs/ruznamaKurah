
const shareData = {
  title: "Рузнама",
  text: "Курахский район",
  url: "https://dagprogs.github.io/ruznamaKurah/",
};

const btnn = document.querySelector(".button");
const resultPara = document.querySelector(".result");

// Share must be triggered by "user activation"
btnn.addEventListener("click", async () => {
  try {
    await navigator.share(shareData);
    resultPara.textContent = "Рузнама Курахский район";
  } catch (err) {
    resultPara.textContent = `Error: ${err}`;
  }
});