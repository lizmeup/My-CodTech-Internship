// --- 1. MOCK DATABASE ---
const courses = [
    {
        id: 1,
        title: "Full Stack Web Development",
        instructor: "Mohan Kumar",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
        video: "https://www.youtube.com/embed/nu_pCVPKzTk", // React Intro
        lessons: [
            { title: "HTML5 Structure", completed: true },
            { title: "CSS Grid Layouts", completed: true },
            { title: "JavaScript Basics", completed: false },
            { title: "React Components", completed: false }
        ]
    },
    {
        id: 2,
        title: "IoT & Embedded Systems",
        instructor: "Sarah Eng",
        thumbnail: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&auto=format&fit=crop",
        video: "https://www.youtube.com/embed/6mBO2vqLv38", // IoT Intro
        lessons: [
            { title: "Arduino Setup", completed: false },
            { title: "Sensors & Actuators", completed: false },
            { title: "MQTT Protocol", completed: false }
        ]
    },
    {
        id: 3,
        title: "Python for Data Science",
        instructor: "David Data",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
        video: "https://www.youtube.com/embed/_uQrJ0TkZlc", // Python Intro
        lessons: [
            { title: "Python Syntax", completed: true },
            { title: "Pandas Library", completed: false },
            { title: "Data Visualization", completed: false }
        ]
    }
];

let currentCourseId = null;

// --- 2. INITIALIZATION ---
// Run this when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderCourseGrid();
});

// --- 3. RENDER FUNCTIONS ---

// Function to draw the grid of courses
function renderCourseGrid() {
    const grid = document.getElementById('course-grid');
    grid.innerHTML = ""; // Clear existing content

    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = "course-card";
        card.onclick = () => openCourse(course.id); // Add click listener

        card.innerHTML = `
            <img src="${course.thumbnail}" class="card-thumb" alt="${course.title}">
            <div class="card-body">
                <span class="badge">${course.lessons.length} LESSONS</span>
                <h3 class="card-title">${course.title}</h3>
                <div class="card-meta">
                    <span>${course.instructor}</span>
                    <span>Start Learning →</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Function to open the video player view
function openCourse(id) {
    currentCourseId = id;
    const course = courses.find(c => c.id === id);
    
    // Inject Data into HTML
    document.getElementById('video-frame').src = course.video;
    document.getElementById('course-title').innerText = course.title;
    document.getElementById('instructor-name').innerText = course.instructor;

    renderLessons(course);
    updateProgressBar(course);

    // Switch Views
    toggleView('player-view');
}

// Function to draw the list of lessons in the sidebar
function renderLessons(course) {
    const list = document.getElementById('lesson-list');
    list.innerHTML = ""; // Clear list

    course.lessons.forEach((lesson, index) => {
        const li = document.createElement('li');
        li.className = `lesson-item ${lesson.completed ? 'completed' : ''}`;
        
        // When clicking a lesson, toggle its status
        li.onclick = () => toggleLessonStatus(index);

        li.innerHTML = `
            <span>${lesson.title}</span>
            <span class="icon-status">${lesson.completed ? '✔' : '○'}</span>
        `;
        list.appendChild(li);
    });
}

// --- 4. INTERACTION LOGIC ---

function toggleLessonStatus(index) {
    const course = courses.find(c => c.id === currentCourseId);
    
    // Toggle true/false
    course.lessons[index].completed = !course.lessons[index].completed;
    
    // Re-render the sidebar to show changes
    renderLessons(course);
    updateProgressBar(course);
}

function updateProgressBar(course) {
    const total = course.lessons.length;
    const completed = course.lessons.filter(l => l.completed).length;
    const percentage = Math.round((completed / total) * 100);

    // Update width and text
    document.getElementById('progress-bar').style.width = percentage + "%";
    document.getElementById('progress-text').innerText = percentage + "%";
}

// Helper to switch between Home and Player sections
function toggleView(viewId) {
    // Hide all views
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active-view'));
    // Show selected view
    document.getElementById(viewId).classList.add('active-view');
}

function goHome() {
    toggleView('home-view');
    // Stop video playback when leaving
    document.getElementById('video-frame').src = ""; 
}