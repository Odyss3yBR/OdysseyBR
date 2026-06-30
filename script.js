const SERVER_IP = "odysseybr.com.br:25567";
const MAP_URL = "http://odysseybr.com.br:8123";

function copyIP() {
  navigator.clipboard.writeText(SERVER_IP).then(() => {
    showToast("IP copiado: " + SERVER_IP);
  }).catch(() => {
    const temp = document.createElement("textarea");
    temp.value = SERVER_IP;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    showToast("IP copiado: " + SERVER_IP);
  });
}

function reloadMap() {
  const map = document.getElementById("liveMap");
  if (!map) return;

  map.src = MAP_URL + "?reload=" + Date.now();
  showToast("Mapa atualizado!");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

const mobileMenu = document.getElementById("mobileMenu");
const menu = document.getElementById("menu");

mobileMenu.addEventListener("click", () => {
  menu.classList.toggle("open");
  const icon = mobileMenu.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    const icon = mobileMenu.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

async function loadServerStatus() {

    try {

        const response = await fetch(
            "https://api.mcsrvstat.us/3/odysseybr.com.br:25567"
        );

        const data = await response.json();

        const status = document.querySelector(".online");
        const players = document.querySelector("#players");
        const ping = document.querySelector("#ping");

        if (data.online) {

            status.innerHTML =
                '<i class="fa-solid fa-circle"></i> Online';

            status.style.color = "#43d35c";

            players.innerHTML =
                `${data.players.online} / ${data.players.max}`;

            ping.innerHTML =
                data.debug.ping ? data.debug.ping + " ms" : "--";

        } else {

            status.innerHTML =
                '<i class="fa-solid fa-circle"></i> Offline';

            status.style.color = "#ff4d4d";

            players.innerHTML = "--";
            ping.innerHTML = "--";

        }

    } catch (e) {

        console.log(e);

    }

}

loadServerStatus();

setInterval(loadServerStatus,30000);