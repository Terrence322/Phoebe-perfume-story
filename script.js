let current = 0;
const answers = [];

const questions = [
  {
    text: '你看到一片湖水，想做什麼？',
    img: 'ChatGPT Image 2025年6月24日 下午01_56_54.png',
    options: [
      { text: '撿起水邊石子', scent: '清新', cls: 'stone' },
      { text: '坐在木樁上休息', scent: '木質', cls: 'log' },
      { text: '觀賞水面花朵', scent: '花香', cls: 'flower' }
    ]
  },
  {
    text: '遠處傳來旋律，你會？',
    img: 'ChatGPT Image 2025年6月24日 下午01_56_43.png',
    options: [
      { text: '跟著節奏舞動', scent: '花香' },
      { text: '閉眼聆聽', scent: '木質' },
      { text: '在草地翻滾', scent: '清新' }
    ]
  },
  {
    text: '夜幕降臨，你準備？',
    img: 'ChatGPT Image 2025年6月24日 下午01_56_30.png',
    options: [
      { text: '點燃營火', scent: '木質' },
      { text: '採集夜間花朵', scent: '花香' },
      { text: '仰望星空', scent: '清新' }
    ]
  }
];

function showQuestion() {
  if (current >= questions.length) {
    showResult();
    return;
  }
  const q = questions[current];
  const container = document.getElementById('question');
  if (current === 0) {
    container.innerHTML = `<p>${q.text}</p>
      <div class="image-options">
        <img src="${q.img}" alt="問題1" id="q1-img">
        ${q.options.map((o,i)=>`<button class="opt ${o.cls}" onclick="choose(${i}, this)" aria-label="${o.text}"></button>`).join('')}
      </div>`;
  } else {
    container.innerHTML = `<p>${q.text}</p>
      <img src="${q.img}" alt="問題${current+1}" class="question-img">
      <div class="btn-group">
        ${q.options.map((o,i)=>`<button onclick="choose(${i}, this)">${o.text}</button>`).join('')}
      </div>`;
  }
}

function choose(index, el) {
  if (el) el.classList.add('glow');
  const q = questions[current];
  answers.push(q.options[index].text);
  setTimeout(() => {
    current++;
    showQuestion();
  }, 300);
}

function showResult() {
  const result = document.getElementById('result');
  result.innerHTML = '<h2>你的選擇</h2>' +
    answers.map((a,i)=>`<p>問題 ${i+1}: ${a}</p>`).join('');
  document.getElementById('question').style.display = 'none';
  result.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', showQuestion);
