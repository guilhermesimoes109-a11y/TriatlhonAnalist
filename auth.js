// ===== iTX Supabase Auth =====
const SUPABASE_URL = 'https://ulymklfwlvzvzzyrarpc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseW1rbGZ3bHZ6dnp6eXJhcnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MzM0NjYsImV4cCI6MjA5MzEwOTQ2Nn0.pbru2YYMgoNAxbMzkltnBaVz-bcfi11NjVZQDDTOcp8';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== TAB SWITCHING =====
function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const authError = document.getElementById('authError');
  const authSuccess = document.getElementById('authSuccess');

  // Clear messages
  if (authError) { authError.classList.remove('show'); authError.textContent = ''; }
  if (authSuccess) { authSuccess.classList.remove('show'); authSuccess.textContent = ''; }

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
  } else {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    tabLogin.classList.remove('active');
    tabRegister.classList.add('active');
  }
}

// ===== SHOW ERROR/SUCCESS =====
function showError(msg) {
  const el = document.getElementById('authError');
  if (el) { el.textContent = msg; el.classList.add('show'); }
}
function showSuccess(msg) {
  const el = document.getElementById('authSuccess');
  if (el) { el.textContent = msg; el.classList.add('show'); }
}
function clearMessages() {
  const err = document.getElementById('authError');
  const suc = document.getElementById('authSuccess');
  if (err) { err.classList.remove('show'); err.textContent = ''; }
  if (suc) { suc.classList.remove('show'); suc.textContent = ''; }
}

// ===== SET LOADING =====
function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  if (loading) { btn.classList.add('loading'); btn.disabled = true; }
  else { btn.classList.remove('loading'); btn.disabled = false; }
}

// ===== LOGIN =====
async function handleLogin(e) {
  e.preventDefault();
  clearMessages();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) { showError('Preenche todos os campos.'); return; }

  setLoading('loginBtn', true);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    showSuccess('Login efetuado com sucesso! A redirecionar...');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1200);
  } catch (err) {
    let msg = 'Erro ao iniciar sessão.';
    if (err.message.includes('Invalid login')) msg = 'Email ou password incorretos.';
    else if (err.message.includes('Email not confirmed')) msg = 'Confirma o teu email antes de entrar.';
    else if (err.message) msg = err.message;
    showError(msg);
  } finally {
    setLoading('loginBtn', false);
  }
}

// ===== REGISTER =====
async function handleRegister(e) {
  e.preventDefault();
  clearMessages();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirm').value;

  if (!name || !email || !password || !confirm) { showError('Preenche todos os campos.'); return; }
  if (password.length < 6) { showError('A password deve ter pelo menos 6 caracteres.'); return; }
  if (password !== confirm) { showError('As passwords não coincidem.'); return; }

  setLoading('registerBtn', true);

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }
      }
    });
    if (error) throw error;

    if (data.user && data.user.identities && data.user.identities.length === 0) {
      showError('Este email já está registado. Tenta iniciar sessão.');
    } else {
      showSuccess('Conta criada com sucesso! Verifica o teu email para confirmar a conta.');
      document.getElementById('registerForm').reset();
      // Reset strength bars
      for (let i = 1; i <= 4; i++) {
        document.getElementById('str' + i).className = 'strength-bar';
      }
      document.getElementById('strengthText').textContent = '';
    }
  } catch (err) {
    let msg = 'Erro ao criar conta.';
    if (err.message.includes('already registered')) msg = 'Este email já está registado.';
    else if (err.message) msg = err.message;
    showError(msg);
  } finally {
    setLoading('registerBtn', false);
  }
}

// ===== SOCIAL LOGIN =====
async function handleSocialLogin(provider) {
  clearMessages();
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin + '/dashboard.html' }
    });
    if (error) throw error;
  } catch (err) {
    showError('Erro ao conectar com ' + provider + ': ' + err.message);
  }
}

// ===== RESET PASSWORD =====
function showResetModal() {
  document.getElementById('resetOverlay').classList.add('show');
}
function closeResetModal() {
  document.getElementById('resetOverlay').classList.remove('show');
  const rs = document.getElementById('resetSuccess');
  if (rs) { rs.classList.remove('show'); rs.textContent = ''; }
}

async function handleResetPassword(e) {
  e.preventDefault();
  const email = document.getElementById('resetEmail').value.trim();
  if (!email) return;

  setLoading('resetBtn', true);

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/login.html'
    });
    if (error) throw error;
    const rs = document.getElementById('resetSuccess');
    if (rs) { rs.textContent = 'Email de recuperação enviado! Verifica a tua caixa de correio.'; rs.classList.add('show'); }
  } catch (err) {
    showError('Erro: ' + err.message);
  } finally {
    setLoading('resetBtn', false);
  }
}

// ===== PASSWORD STRENGTH =====
function checkPasswordStrength(password) {
  const bars = [
    document.getElementById('str1'),
    document.getElementById('str2'),
    document.getElementById('str3'),
    document.getElementById('str4')
  ];
  const text = document.getElementById('strengthText');

  // Reset
  bars.forEach(b => b.className = 'strength-bar');
  if (!text) return;

  if (password.length === 0) { text.textContent = ''; return; }

  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let level, label;
  if (score <= 1) { level = 1; label = 'Fraca'; }
  else if (score <= 2) { level = 2; label = 'Razoável'; }
  else if (score <= 3) { level = 3; label = 'Boa'; }
  else { level = 4; label = 'Forte'; }

  const cls = level <= 1 ? 'weak' : level <= 2 ? 'medium' : 'strong';
  for (let i = 0; i < level; i++) bars[i].classList.add(cls);
  text.textContent = label;
}

// ===== AUTH STATE CHECK (for protected pages) =====
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

async function requireAuth() {
  const session = await checkAuth();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  return session;
}

async function handleLogout() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}

// ===== UPDATE NAVBAR based on auth state =====
async function updateNavbar() {
  const { data: { session } } = await supabase.auth.getSession();
  const navCta = document.querySelector('.nav-cta');
  if (!navCta) return;

  if (session) {
    const name = session.user.user_metadata?.full_name || session.user.email.split('@')[0];
    navCta.textContent = '👤 ' + name;
    navCta.href = '#';
    navCta.onclick = (e) => {
      e.preventDefault();
      if (confirm('Queres terminar sessão?')) handleLogout();
    };
  } else {
    navCta.textContent = 'Iniciar Sessão';
    navCta.href = 'login.html';
    navCta.onclick = null;
  }
}

// If on login page and already logged in, redirect
async function checkLoginPageRedirect() {
  if (window.location.pathname.includes('login.html')) {
    const session = await checkAuth();
    if (session) window.location.href = 'dashboard.html';
  }
}

// Init auth on page load
document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
  checkLoginPageRedirect();
});
