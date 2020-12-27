const cotd = document.getElementById("cotd");
const catbutton = document.getElementById("catbutton");
catbutton.addEventListener("click", getRandomCat)

function getRandomCat() {
    fetch("https://aws.random.cat/meow")
    .then(res => res.json())
    .then(data => {
        cotd.innerHTML = `<img src="${data.file}"/>`
    })
}