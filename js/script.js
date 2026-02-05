// Seleksi elemen HTML
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const todoBody = document.getElementById('todo-body');
const emptyMsg = document.getElementById('empty-msg');
const deleteAllBtn = document.getElementById('delete-all-btn');
const filterOption = document.getElementById('filter-todo');

// Array untuk menyimpan data todo
let todos = [];

// Event Listener saat tombol Add diklik
addBtn.addEventListener('click', addTodo);

// Event Listener untuk Filter
filterOption.addEventListener('change', renderTodos);

// Event Listener untuk Delete All
deleteAllBtn.addEventListener('click', () => {
    todos = [];
    renderTodos();
});

// Fungsi Menambah Todo
function addTodo() {
    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;

    // 1. Validasi Input Form (Sesuai instruksi)
    if (taskText === '' || taskDate === '') {
        alert('Please fill in both the task and the due date.');
        return;
    }

    // Objek Todo baru
    const todo = {
        id: Date.now(), // ID unik berdasarkan waktu
        text: taskText,
        date: taskDate,
        completed: false
    };

    todos.push(todo);
    renderTodos();
    
    // Reset form
    taskInput.value = '';
    dateInput.value = '';
}

// Fungsi Render (Menampilkan) Todo ke HTML
function renderTodos() {
    todoBody.innerHTML = ''; // Bersihkan tabel sebelum render ulang
    
    // Logika Filter
    const filterValue = filterOption.value;
    
    // Filter array berdasarkan status
    const filteredTodos = todos.filter(todo => {
        if (filterValue === 'completed') return todo.completed === true;
        if (filterValue === 'pending') return todo.completed === false;
        return true; // 'all'
    });

    // Cek jika kosong
    if (filteredTodos.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
    }

    // Loop data dan buat elemen baris tabel (TR)
    filteredTodos.forEach(todo => {
        const tr = document.createElement('tr');
        
        // Tentukan class badge status
        const statusClass = todo.completed ? 'status-completed' : 'status-pending';
        const statusText = todo.completed ? 'Completed' : 'Pending';
        const textClass = todo.completed ? 'completed-text' : '';

        tr.innerHTML = `
            <td class="${textClass}">${todo.text}</td>
            <td>${todo.date}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <button class="action-btn check-btn" onclick="toggleComplete(${todo.id})">
                    <i class="fas fa-check"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteTodo(${todo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        todoBody.appendChild(tr);
    });
}

// Fungsi Mengubah Status (Selesai/Belum)
window.toggleComplete = function(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

// Fungsi Menghapus Satu Todo
window.deleteTodo = function(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

// Inisialisasi awal
renderTodos();

