let currentPage = 1;
let selectedFood = '';
let selectedMovie = '';
let dateTime = {date: '', time: ''};

// Create floating hearts
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDelay = `${Math.random() * 20}s`;
        container.appendChild(heart);
    }
}

// Initialize date input min value
function initializeDateInput() {
    const dateInput = document.getElementById('dateInput');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.theme-toggle i');
    icon.className = document.body.classList.contains('dark-mode') ? 'bx bx-sun' : 'bx bx-moon';
}

// Update progress bar
function updateProgress() {
    const progress = ((currentPage - 1) / 6) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

// Page navigation
function nextPage(page) {
    document.querySelector(`#page${currentPage}`).classList.remove('active');
    document.querySelector(`#page${page}`).classList.add('active');
    currentPage = page;
    updateProgress();

    // Nếu chuyển đến trang cuối, cập nhật thông tin
    if (page === 7) {
        updateFinalPage();
    }
}

// Handle Yes button
function handleYes() {
    nextPage(2);
}

// Handle No button
function handleNo() {
    const yesBtn = document.querySelector('.btn');
    const noBtn = document.getElementById('noBtn');
    yesBtn.style.fontSize = (parseFloat(getComputedStyle(yesBtn).fontSize) + 2) + 'px';
    noBtn.style.fontSize = (parseFloat(getComputedStyle(noBtn).fontSize) - 1) + 'px';
}

// Handle date and time submission
function handleDateTimeSubmit() {
    const date = document.getElementById('dateInput').value;
    const time = document.getElementById('timeInput').value;
    if (date && time) {
        dateTime.date = date;
        dateTime.time = time;
        nextPage(4);
    } else {
        alert('Í là cậu phải chọn ngày và giờ để tớ sắp xếp 1 buổi hẹn hoàn hảo!');
    }
}

// Food selection
function selectFood(element, food) {
    document.querySelectorAll('.food-item').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
    selectedFood = food;
}

function handleFoodSubmit() {
    if (selectedFood) {
        nextPage(5);
    } else {
        alert('Chọn đồ ăn đi! Không là đến bữa bọn mình sẽ bị đói đó huhu');
    }
}

// Movie selection
function selectMovie(element, movie) {
    document.querySelectorAll('.movie-item').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
    selectedMovie = movie;
}

function handleMovieSubmit() {
    if (selectedMovie) {
        nextPage(6);
    } else {
        alert('Hãy xem phim nhá. Nhưng mà tớ cần cậu chọn@@');
    }
}

// Final page
function updateFinalPage() {
    // Format date to be more readable
    const formattedDate = dateTime.date ? new Date(dateTime.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : '';

    // Format time to be more readable
    const formattedTime = dateTime.time ? new Date(`2000/01/01 ${dateTime.time}`).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    }) : '';

    document.getElementById('selectedDate').textContent = formattedDate;
    document.getElementById('selectedTime').textContent = formattedTime;
    document.getElementById('selectedFood').textContent = selectedFood || 'Not selected';
    document.getElementById('selectedMovie').textContent = selectedMovie || 'Not selected';
}

// Start over
function startOver() {
    selectedFood = '';
    selectedMovie = '';
    dateTime = {date: '', time: ''};
    document.querySelectorAll('.food-item, .movie-item').forEach(item => item.classList.remove('selected'));
    document.getElementById('excitementSlider').value = 50;
    nextPage(1);
}

// Confirm
function confirm() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    alert('Chốt hẹn! Tớ rất mong chờ được gặp cậu! 💖');
}


document.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();
    initializeDateInput();
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);

    const backgroundMusic = document.getElementById('backgroundMusic'); // Di chuyển dòng này vào đây
    let musicStarted = false;

    document.addEventListener('click', () => {
        if (!musicStarted) {
            backgroundMusic.play().catch(error => {
                console.error("Lỗi phát nhạc:", error);
            });
            musicStarted = true;
        }
    });
})
