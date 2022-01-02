
getVideoInfo()

function getVideoInfo(){

    const loggedIn = location.search?.split("?")[1]?.split("&")[1]?.split("=")[1];

    if (!loggedIn) {
        document.body.innerHTML = "";
        document.write("You are not loggedIn. Please login first!!!");
        return;
    }

    let userName = location.href.split("?")[1].split("&")[0].split("=")[1];
    userName = userName.split("%20").join(" ");
    
    document.querySelector("#welcomeName").innerHTML = " " + userName;
    
    const currentVideo = JSON.parse(localStorage.getItem("currentVideo"));
    // const currentVideo = null

    if(!currentVideo){
        document.querySelector('#displayContainer').innerHTML = `<div class="m-5 p-5 fs-3 border fw-bold">Sorry video unable to upload. Try again.</div>`
        return;
    }

    renderVideoInfo(currentVideo)
}


function renderVideoInfo(currentVideo){
    const videoId = currentVideo.link.split('=')[1];
    const videoTitle = currentVideo.title;
    const channel = currentVideo.channel;

    document.querySelector(
        "iframe"
    ).src = `https://youtube.com/embed/${videoId}?autoplay=1&mute=0`;

    document.querySelector("#title").innerText = videoTitle;

    document.querySelector(
        "#channel"
    ).innerHTML = `<b>Channel : </b>${channel}`;
}
