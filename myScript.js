let currentPage = 1, selectedFood = "", selectedMovie = "", dateTime = {date: "", time: ""};

function createFloatingElements() {
    let e = document.querySelector(".floating-elements");
    for (let t = 0; t < 20; t++) {
        let n = document.createElement("div");
        n.className = "heart", n.style.left = `${100 * Math.random()}vw`, n.style.animationDelay = `${20 * Math.random()}s`, e.appendChild(n)
    }
}

function initializeDateInput() {
    let e = document.getElementById("dateInput"), t = new Date().toISOString().split("T")[0];
    e.min = t
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    let e = document.querySelector(".theme-toggle i");
    e.className = document.body.classList.contains("dark-mode") ? "bx bx-sun" : "bx bx-moon"
}

function updateProgress() {
    let e = (currentPage - 1) / 6 * 100;
    document.querySelector(".progress-bar").style.width = `${e}%`
}

function nextPage(e) {
    let t = document.querySelector(`#page${currentPage}`), n = document.querySelector(`#page${e}`);
    t.classList.add("slide-out"), n.classList.add("slide-in"), n.style.display = "block", setTimeout(() => {
        t.style.display = "none", t.classList.remove("slide-out", "active"), n.classList.remove("slide-in"), n.classList.add("active"), currentPage = e, updateProgress(), 7 === e && updateFinalPage()
    }, 500)
}

function handleYes() {
    nextPage(2)
}

function handleNo() {
    document.querySelector(".btn");
    let e = document.getElementById("noBtn"),
        t = ["Đừng m\xe0 :<", "Nghĩ lại đi :3", "Th\xf4i m\xe0, đi đi m\xe0 \uD83E\uDD7A", "H\xf4ngggggg", "Đi m\xe0 n\xe0oooo \uD83D\uDC96"],
        n = Math.floor(Math.random() * t.length);
    e.textContent = t[n]
}

function handleDateTimeSubmit() {
    let e = document.getElementById("dateInput").value, t = document.getElementById("timeInput").value;
    e && t ? (dateTime.date = e, dateTime.time = t, nextPage(4)) : Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "\xcd l\xe0 cậu phải chọn ng\xe0y v\xe0 giờ để tớ sắp xếp 1 buổi hẹn ho\xe0n hảo!"
    })
}

function selectFood(e, t) {
    document.querySelectorAll(".food-item").forEach(e => e.classList.remove("selected")), e.classList.add("selected"), selectedFood = t
}

function handleFoodSubmit() {
    selectedFood ? nextPage(5) : Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Chọn đồ ăn đi! Kh\xf4ng l\xe0 đến bữa bọn m\xecnh sẽ bị đ\xf3i đ\xf3 huhu"
    })
}

function selectMovie(e, t) {
    document.querySelectorAll(".movie-item").forEach(e => e.classList.remove("selected")), e.classList.add("selected"), selectedMovie = t
}

function handleMovieSubmit() {
    selectedMovie ? nextPage(6) : Swal.fire({
        icon: "error", title: "Oops...", text: "H\xe3y xem phim nh\xe1. Nhưng m\xe0 tớ cần cậu chọn@@"
    })
}

function updateFinalPage() {
    let e = dateTime.date ? new Date(dateTime.date).toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    }) : "", t = dateTime.time ? new Date(`2000/01/01 ${dateTime.time}`).toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit"
    }) : "";
    document.getElementById("selectedDate").textContent = e, document.getElementById("selectedTime").textContent = t, document.getElementById("selectedFood").textContent = selectedFood || "Not selected", document.getElementById("selectedMovie").textContent = selectedMovie || "Not selected"
}

function startOver() {
    selectedFood = "", selectedMovie = "", dateTime = {
        date: "", time: ""
    }, document.querySelectorAll(".food-item, .movie-item").forEach(e => e.classList.remove("selected")), document.getElementById("excitementSlider").value = 50, nextPage(1)
}

function confirm() {
    backgroundMusic.pause(), backgroundMusic.currentTime = 0, Swal.fire("Chốt hẹn!", "Tớ rất mong chờ được gặp cậu! \uD83D\uDC96", "success")
}

document.addEventListener("DOMContentLoaded", () => {
    createFloatingElements(), initializeDateInput(), document.querySelector(".theme-toggle").addEventListener("click", toggleTheme);
    let e = document.getElementById("backgroundMusic"), t = !1;
    document.addEventListener("click", () => {
        t || (e.play().catch(e => {
            console.error("Lỗi phát nhạc:", e)
        }), t = !0)
    })
});