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

const signupForm = document.getElementById('signup-form');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupMsg = document.getElementById('signup-msg');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupEmail.value.trim();
  const password = signupPassword.value;
  if (!email || !email.includes('@')) {
    signupMsg.textContent = '올바른 이메일을 입력하세요';
    return;
  }
  if (password.length < 8) {
    signupMsg.textContent = '비밀번호는 8자 이상이어야 합니다';
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some((u) => u.email === email)) {
    signupMsg.textContent = '이미 가입된 이메일입니다';
    return;
  }
  users.push({ email, password });
  localStorage.setItem('users', JSON.stringify(users));

  signupMsg.textContent = '가입이 완료되었습니다';
  signupEmail.value = '';
  signupPassword.value = '';
});
