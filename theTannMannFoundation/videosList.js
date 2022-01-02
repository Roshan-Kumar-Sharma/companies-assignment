
const allVideos = [
    {
        link: "https://www.youtube.com/watch?v=PoRJizFvM7s",
        title: "Async JS Crash Course - Callbacks, Promises, Async Await",
        channel: "Traversy Media",
    },
    {
        link: "https://www.youtube.com/watch?v=SWYqp7iY_Tc",
        title: "Git & GitHub Crash Course For Beginners",
        channel: "Traversy Media",
    },
    {
        link: "https://www.youtube.com/watch?v=Q33KBiDriJY",
        title: "Web Development Full Course - 10 Hours | Learn Web Development from Scratch | Edureka",
        channel: "edureka!",
    },
    {
        link: "https://www.youtube.com/watch?v=jBzwzrDvZ18",
        title: "Python Backend Web Development Course (with Django)",
        channel: "freeCodeCamp.org",
    },
    {
        link: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
        title: "CSS Tutorial - Zero to Hero (Complete Course)",
        channel: "freeCodeCamp.org",
    },
    {
        link: "https://www.youtube.com/watch?v=ci_AIMCF-HA",
        title: "Full Roadmap to learn Blockchain development in 2021",
        channel: "EatTheBlocks",
    },
    {
        link: "https://www.youtube.com/watch?v=qOVAbKKSH10",
        title: "Blockchain Technology Explained (2 Hour Course)",
        channel: "Coding Tech",
    },
];

const videosContainer = document.querySelector("#vids-container");
const welcomeName = document.querySelector("#welcomeName");

renderPage();

function renderPage() {

    const loggedIn = location.search?.split("?")[1]?.split("&")[1]?.split("=")[1];

    if(!loggedIn){
        document.body.innerHTML = ""
        document.write('You are not loggedIn. Please login first!!!')
        return
    }

    let userName = location.search.split('?')[1].split("&")[0].split("=")[1]
    userName = userName.split('%20').join(' ')

    welcomeName.innerHTML = " " + userName;
    videosContainer.innerHTML = "";

    allVideos.forEach((video, index) => {
        let vidDom = `<div class="d-flex mt-2">
                        <div class="flex-shrink-0">
                            <i class="fab fa-youtube fa-5x"></i>
                        </div>
                        <div class="d-flex flex-column flex-grow-1 ms-3">
                            <a id=${index} href="displayVideo.html?user=${userName}&loggedIn=true" style="text-decoration: none; cursor: pointer" class="mt-2 fw-bold" target="_blank" onClick="saveVideoDetails(this)">${video.title}</a>
                            <span class="mt-1 fst-italic">${video.channel}</span>
                        </div>
                    </div>`;

        const readyVidDom = createHTMLDom(vidDom);
        videosContainer.append(readyVidDom);
    });
}

function saveVideoDetails(elem){
    const videoNum = parseInt(elem.id);
    const clickVideo = allVideos[videoNum]
    localStorage.setItem("currentVideo", JSON.stringify(clickVideo))
}

function createHTMLDom(elem) {
    const temp = document.createElement("template");
    temp.innerHTML = elem;
    return temp.content.firstChild;
}
