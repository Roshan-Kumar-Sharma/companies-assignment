window.onload = () => {
    document.querySelector("#quiz1").addEventListener("click", () => {
        location.href = '/Quiz.html?name=quiz1'
    })
    document.querySelector("#quiz2").addEventListener("click", () => {
        location.href = "/Quiz.html?name=quiz2";
    })
    document.querySelector("#quiz3").addEventListener("click", () => {
        location.href = "/Quiz.html?name=quiz3";
    });
}

