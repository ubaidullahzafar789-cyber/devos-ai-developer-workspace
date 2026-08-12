// DevOS — AI assistant chat interaction

const responses: string[] = [
  'Here is a suggested approach based on your current project context:\n\nI analyzed the relevant modules and found two opportunities to simplify the logic while preserving behavior. The first refactors the duplicated validation into a shared helper, and the second replaces the manual loop with a declarative map.',
  'I looked through the codebase and can explain this. The caching layer uses a write-through strategy — every update both writes to the store and updates the cache synchronously. This keeps reads fast but means writes are a bit slower.\n\nIf you want, I can generate a benchmark to compare it with a write-back approach.',
  'I generated 6 unit tests covering the auth callback. They include the happy path, missing session, expired token, malformed input, network failure, and concurrent calls.\n\nWould you like me to apply these to the test file?',
  'I found 3 potential issues in src/api:\n\n1. An unhandled promise rejection in the retry loop\n2. A race condition when two clients update the same record\n3. A missing content-type header on PATCH requests\n\nWant me to draft fixes for each?',
];

export function initAIChat(notify: (msg: string) => void): void {
  const input = document.getElementById('aiInput') as HTMLInputElement | null;
  const sendBtn = document.getElementById('aiSend');
  const thread = document.getElementById('aiThread');
  if (!input || !sendBtn || !thread) return;

  const threadEl: HTMLElement = thread;
  const inputEl: HTMLInputElement = input;
  let respIndex = 0;

  function handleSend(): void {
    const text = inputEl.value.trim();
    if (!text) return;
    addMessage(threadEl, 'user', text);
    inputEl.value = '';
    notify('AI is thinking…');

    setTimeout(() => {
      const reply = responses[respIndex % responses.length];
      respIndex++;
      addMessage(threadEl, 'ai', reply);
      threadEl.scrollTop = threadEl.scrollHeight;
    }, 700);
  }

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}

function addMessage(thread: HTMLElement, role: 'user' | 'ai', text: string): void {
  const wrap = document.createElement('div');
  wrap.className = `ai-msg ai-msg-${role}`;

  const avatar = role === 'user' ? '<div class="ai-avatar user">DV</div>' : '<div class="ai-avatar ai"><i class="bi bi-stars"></i></div>';
  const formatted = formatText(text);

  wrap.innerHTML = `${avatar}<div class="ai-bubble">${formatted}</div>`;
  thread.appendChild(wrap);
  thread.scrollTop = thread.scrollHeight;
}

function formatText(text: string): string {
  return text
    .split('\n')
    .map((line) => line.trim() ? `<p style="margin:0 0 8px">${escapeHtml(line)}</p>` : '<br>')
    .join('');
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
