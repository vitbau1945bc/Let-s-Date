let currentPage = 1;
let selectedFood = '';
let selectedMovie = '';
let dateTime = {date: '', time: ''};
let userName = ""; // Biến lưu trữ tên người dùng

function setName() {
    userName = document.getElementById("nameInput").value;
    if (userName) {
        personalizeContent(); // Gọi hàm để cá nhân hóa nội dung
        nextPage(1); // Chuyển đến trang 1 (trang chào mừng)
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Vui lòng nhập tên của bạn!',
        });
    }
}


function personalizeContent() {
  // Tìm tất cả các phần tử có class "personalize" và thay thế nội dung bằng tên người dùng
  const elements = document.querySelectorAll(".personalize");
  elements.forEach(element => {
    element.textContent = userName;
  });
}

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

function nextPage(page) {
    const currentPageElement = document.querySelector(`#page${currentPage}`);
    const nextPageElement = document.querySelector(`#page${page}`);

    // Bắt đầu animation slide-out cho trang hiện tại
    currentPageElement.classList.add('slide-out');

    // Lắng nghe sự kiện transitionend của trang HIỆN TẠI
    currentPageElement.addEventListener('transitionend', function handler() {
        // Ẩn trang hiện tại
        currentPageElement.style.visibility = 'hidden';
        currentPageElement.classList.remove('slide-out', 'active');

        // Hiện trang tiếp theo và bắt đầu animation slide-in
        nextPageElement.style.visibility = 'visible';
        nextPageElement.classList.add('slide-in', 'active');


        // Lắng nghe sự kiện transitionend của trang TIẾP THEO
        nextPageElement.addEventListener('transitionend', function handler2() {
            nextPageElement.classList.remove('slide-in');
            currentPage = page;
            updateProgress();

            if (page === 7) {
                updateFinalPage();
            }


            // Xóa event listener sau khi hoàn thành animation
            nextPageElement.removeEventListener('transitionend', handler2);
            currentPageElement.removeEventListener('transitionend', handler); // Xóa event listener của trang hiện tại

        });

    });
}

// Handle Yes button
function handleYes() {
    nextPage(2);
}

// Handle No button
function handleNo() {
    const yesBtn = document.querySelector('.btn');
    const noBtn = document.getElementById('noBtn');
    const noMessages = ["Đừng mà :<", "Nghĩ lại đi :3", "Thôi mà, đi đi mà 🥺", "Hôngggggg", "Đi mà nàoooo 💖"]; // Mảng các câu trả lời
    const randomIndex = Math.floor(Math.random() * noMessages.length);
    noBtn.textContent = noMessages[randomIndex];
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
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Í là cậu phải chọn ngày và giờ để tớ sắp xếp 1 buổi hẹn hoàn hảo!',
          })
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
    Swal.fire('Chốt hẹn!', 'Tớ rất mong chờ được gặp cậu! 💖', 'success');
}


document.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();
    initializeDateInput();
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);

    const backgroundMusic = document.getElementById('backgroundMusic'); // Di chuyển dòng này vào đây
    let musicStarted = false;
    // Xóa class 'active' của trang 1 (chào mừng)
    document.getElementById('page1').classList.remove('active'); 

    // Thêm class "active" cho trang nhập tên khi trang web được tải
    document.getElementById('page0').classList.add('active');
    document.addEventListener('click', () => {
        if (!musicStarted) {
            backgroundMusic.play().catch(error => {
                console.error("Lỗi phát nhạc:", error);
            });
            musicStarted = true;
        }
    });
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`page${i}`).classList.remove('active');
    }
    document.getElementById('page0').classList.add('active');
})
