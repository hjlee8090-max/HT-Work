const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const list = document.getElementById('note-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);
  input.value = '';
});
