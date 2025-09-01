const listText = document.querySelector('#list');
const itemWrapper = document.querySelector('#item-wrapper');
const InvalidText = document.querySelector('#invalidText');

/**
 * Menyimpan data saat ini dari DOM ke localStorage.
 */
function saveData() {
    const allItems = document.querySelectorAll('.todo-item-container');
    const todos = [];
    allItems.forEach(container => {
        const textElement = container.querySelector('.new-item');
        const checkboxElement = container.querySelector('input[type="checkbox"]');
        todos.push({
            text: textElement.textContent,
            completed: checkboxElement.checked
        });
    });
    localStorage.setItem('todos-data', JSON.stringify(todos));
}

/**
 * Membuat elemen HTML untuk satu item to-do.
 */
function createTodoElement(text, isCompleted) {
    const newContainer = document.createElement('div');
    newContainer.className = 'todo-item-container';

    const newList = document.createElement('ul');
    const newItem = document.createElement('li');
    const deleteButton = document.createElement('button');
    const checkBox = document.createElement('input');

    // Menggunakan kelas, bukan ID, agar tidak duplikat
    newList.className = 'new-list';
    newItem.className = 'new-item';
    deleteButton.className = 'delete-button';

    newItem.textContent = text;
    checkBox.type = 'checkbox';
    checkBox.checked = isCompleted;
    
    // --- Semua style inline Anda dipertahankan ---
    checkBox.style.marginLeft = '5px';
    checkBox.style.border = '1px solid black';
    checkBox.style.borderStyle = 'none';
    newItem.style.maxWidth = '80%';
    newItem.style.boxSizing = 'border-box';
    newList.style.display = 'flex';
    newList.style.justifyContent = 'space-between';
    newList.style.alignItems = 'center'; // Menambahkan ini agar checkbox sejajar
    deleteButton.textContent = 'x';
    deleteButton.style.display = 'flex';
    deleteButton.style.justifyContent = 'end';
    deleteButton.style.cursor = 'pointer';

    // --- Logika untuk mencoret teks ---
    function updateStyle() {
        if (checkBox.checked) {
            newItem.style.textDecoration = 'line-through';
            newItem.style.color = 'gray';
        } else {
            newItem.style.textDecoration = '';
            newItem.style.color = '';
        }
    }

    if (isCompleted) {
        updateStyle();
    }

    // --- Event Listeners ---
    checkBox.addEventListener('change', () => {
        updateStyle();
        saveData();
    });

    deleteButton.addEventListener('click', () => {
        newContainer.classList.add('item-exit');
        newContainer.addEventListener('animationend', () => {
            newContainer.remove();
            saveData();
        }, { once: true });
    });
    
    // --- Memasukkan elemen ke DOM ---
    newList.append(checkBox, newItem, deleteButton);
    newContainer.append(newList);
    itemWrapper.append(newContainer);
    
    return newContainer; // Kembalikan elemen agar bisa dianimasikan
}

/**
 * Fungsi utama yang dipanggil saat tombol +Add diklik.
 */
function addClick() {
    if (listText.value.trim() === '') {
        InvalidText.style.display = 'inherit';
        return;
    }
    InvalidText.style.display = 'none';

    const newElement = createTodoElement(listText.value, false);
    newElement.classList.add('item-enter'); // Memicu animasi masuk

    saveData();
    listText.value = '';
}

/**
 * Fungsi untuk memuat data dari localStorage.
 */
function loadData() {
    const savedData = localStorage.getItem('todos-data');
    if (savedData) {
        const todos = JSON.parse(savedData);
        todos.forEach(todo => {
            createTodoElement(todo.text, todo.completed);
        });
    }
}

// --- Pendaftaran Service Worker ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js');
  });
}

// --- Memuat Data Awal ---
loadData();