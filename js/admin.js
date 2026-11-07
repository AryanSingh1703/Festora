(function () {
  'use strict';
  const client = window.FestoraSupabase;
  const $ = (id) => document.getElementById(id);
  const setupNotice = $('setup-notice');
  const loginView = $('login-view');
  const dashboardView = $('dashboard-view');
  const loginForm = $('login-form');
  const signOutButton = $('sign-out-button');
  let subscribers = [];

  function message(id, text, isError) {
    const node = $(id);
    if (!node) return;
    node.textContent = text || '';
    node.style.color = isError ? '#ff8c78' : '#2ec4b6';
  }
  function showLogin() {
    loginView.hidden = false;
    dashboardView.hidden = true;
    signOutButton.hidden = true;
  }
  function formatDate(value) {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
  }
  function escapeCsv(value) {
    return '"' + String(value).replace(/"/g, '""') + '"';
  }
  function renderRows() {
    const query = $('subscriber-search').value.trim().toLowerCase();
    const filtered = subscribers.filter((item) => item.email.toLowerCase().includes(query));
    const body = $('subscriber-rows');
    body.replaceChildren();
    $('result-count').textContent = filtered.length + (filtered.length === 1 ? ' subscriber' : ' subscribers');
    if (!filtered.length) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 4;
      cell.className = 'admin-empty';
      cell.textContent = query ? 'No subscribers match that search.' : 'No subscribers yet. Your first sign-up will appear here.';
      row.appendChild(cell); body.appendChild(row); return;
    }
    filtered.forEach((subscriber) => {
      const row = document.createElement('tr');
      const email = document.createElement('td'); email.className = 'admin-email-cell'; email.textContent = subscriber.email;
      const date = document.createElement('td'); date.className = 'admin-date-cell'; date.textContent = formatDate(subscriber.created_at);
      const status = document.createElement('td'); status.innerHTML = '<span class="admin-active-pill">Subscribed</span>';
      const action = document.createElement('td');
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'admin-remove-button'; remove.textContent = 'Remove';
      remove.addEventListener('click', () => removeSubscriber(subscriber.id, subscriber.email));
      action.appendChild(remove);
      row.append(email, date, status, action);
      body.appendChild(row);
    });
  }
  async function loadSubscribers() {
    message('dashboard-message', 'Refreshing subscriber list…', false);
    const { data, error, count } = await client.from('newsletter_subscribers')
      .select('id,email,created_at', { count: 'exact' })
      .order('created_at', { ascending: false }).limit(1000);
    if (error) throw error;
    subscribers = data || [];
    $('subscriber-total').textContent = typeof count === 'number' ? count.toLocaleString() : subscribers.length.toLocaleString();
    $('latest-signup').textContent = subscribers.length ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(subscribers[0].created_at)) : '—';
    renderRows();
    message('dashboard-message', 'Subscriber list is up to date.', false);
  }
  async function removeSubscriber(id, email) {
    if (!window.confirm('Remove ' + email + ' from the newsletter list?')) return;
    const { error } = await client.from('newsletter_subscribers').delete().eq('id', id);
    if (error) { message('dashboard-message', error.message, true); return; }
    subscribers = subscribers.filter((item) => item.id !== id);
    $('subscriber-total').textContent = subscribers.length.toLocaleString();
    $('latest-signup').textContent = subscribers.length ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(subscribers[0].created_at)) : '—';
    renderRows();
    message('dashboard-message', 'Subscriber removed.', false);
  }
  async function showDashboard(user) {
    const { data: adminRecord, error: adminError } = await client.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle();
    if (adminError || !adminRecord) {
      await client.auth.signOut();
      showLogin();
      message('login-message', 'This account is not authorized to access the FESTORA admin dashboard.', true);
      return;
    }
    loginView.hidden = true;
    dashboardView.hidden = false;
    signOutButton.hidden = false;
    try { await loadSubscribers(); }
    catch (error) { message('dashboard-message', 'Could not load subscribers: ' + error.message, true); }
  }

  if (!client) {
    setupNotice.hidden = false;
    return;
  }
  loginView.hidden = false;
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = loginForm.querySelector('button[type="submit"]');
    button.disabled = true;
    message('login-message', 'Signing in…', false);
    const { data, error } = await client.auth.signInWithPassword({
      email: $('admin-email').value.trim(),
      password: $('admin-password').value
    });
    button.disabled = false;
    if (error) { message('login-message', error.message, true); return; }
    await showDashboard(data.user);
  });
  signOutButton.addEventListener('click', async () => {
    await client.auth.signOut();
    showLogin();
    loginForm.reset();
    message('login-message', 'You have signed out.', false);
  });
  $('refresh-button').addEventListener('click', async () => {
    try { await loadSubscribers(); }
    catch (error) { message('dashboard-message', error.message, true); }
  });
  $('subscriber-search').addEventListener('input', renderRows);
  $('export-button').addEventListener('click', () => {
    if (!subscribers.length) { message('dashboard-message', 'There are no subscribers to export yet.', true); return; }
    const rows = [['Email', 'Subscribed at'], ...subscribers.map((item) => [item.email, item.created_at])];
    const csv = rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a'); link.href = url; link.download = 'festora-subscribers.csv';
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  });
  client.auth.getSession().then(({ data, error }) => {
    if (error) { message('login-message', error.message, true); return; }
    if (data.session) showDashboard(data.session.user);
    else showLogin();
  });
})();
