const topNotes = ['含羞草','無花果','白葡萄酒','伯爵茶茶','香檸檬','桂花'];
const middleNotes = ['小蒼蘭','天竺葵','橙花','青草','金銀花','茉莉花','海洋'];
const baseNotes = ['禪茶','零陵香豆','白麝香','麝香','檀香木','紅木','香草'];

const noteMap = {
  '清新': topNotes,
  '花香': middleNotes,
  '木質': baseNotes
};

const questions = [
  {
    text: '你看到一片湖水，想做什麼？',
    options: [
      { text: '撿起水邊石子', scent: '清新' },
      { text: '坐在木樁上休息', scent: '木質' },
      { text: '觀賞水面花朵', scent: '花香' }
    ]
  },
  {
    text: '遠處傳來旋律，你會？',
    options: [
      { text: '跟著節奏舞動', scent: '花香' },
      { text: '閉眼聆聽', scent: '木質' },
      { text: '在草地翻滾', scent: '清新' }
    ]
  },
  {
    text: '夜幕降臨，你準備？',
    options: [
      { text: '點燃營火', scent: '木質' },
      { text: '採集夜間花朵', scent: '花香' },
      { text: '仰望星空', scent: '清新' }
    ]
  }
];

let current = 0;
const scentChoices = [];

function startGame(choice) {
  const scent = ['清新','木質','花香'][choice];
  const list = noteMap[scent];
  const item = list[Math.floor(Math.random() * list.length)];
  scentChoices.push(item);
  document.getElementById('story').style.display = 'none';
  showQuestion();
}

function showQuestion() {
  if (current >= questions.length) {
    askName();
    return;
  }
  const q = questions[current];
  const container = document.getElementById('question');
  if (current === 0) {
    container.innerHTML = `<p>${q.text}</p>
      <div class="image-options">
        <img src="ChatGPT Image 2025年6月24日 下午01_56_54.png" alt="q1" id="q1-img">
        <button class="stone opt" onclick="choose(0, this)" aria-label="${q.options[0].text}"></button>
        <button class="log opt" onclick="choose(1, this)" aria-label="${q.options[1].text}"></button>
        <button class="flower opt" onclick="choose(2, this)" aria-label="${q.options[2].text}"></button>
      </div>`;
  } else {
    container.innerHTML = `<p>${q.text}</p>` +
      q.options.map((o,i)=>`<button onclick="choose(${i}, this)">${o.text}</button>`).join('');
  }
  container.style.display = 'block';
}

function choose(index, el) {
  if (el) {
    el.classList.add('glow');
  }
  setTimeout(() => {
    const q = questions[current];
    const scent = q.options[index].scent;
    const list = noteMap[scent];
    const item = list[Math.floor(Math.random() * list.length)];
    scentChoices.push(item);
    current++;
    showQuestion();
  }, 300);
}

function askName() {
  const container = document.getElementById('question');
  container.innerHTML = `<p>給你的香水取個名字吧：</p>
    <input id="pname" placeholder="我的香水" />
    <button onclick="generatePerfume()">完成</button>`;
}

function generatePerfume() {
  const name = document.getElementById('pname').value || '未命名香水';
  const counts = {};
  scentChoices.forEach(s => { counts[s] = (counts[s] || 0) + 1; });
  const card = document.createElement('div');
  card.id = 'card';
  card.innerHTML = `<h2>${name}</h2>`;
  Object.keys(counts).forEach(k => {
    const grams = (counts[k] / scentChoices.length * 4.5).toFixed(2);
    card.innerHTML += `<p>${k}: ${grams} g</p>`;
  });
  const result = document.getElementById('result');
  result.innerHTML = '';
  result.appendChild(card);
  result.innerHTML += `<div>
    <button onclick="copyLink()">複製連結</button>
    <button onclick="downloadCard()">下載配方卡</button>
    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" target="_blank">分享到 Facebook</a>
    </div>`;
  document.getElementById('question').style.display='none';
  result.style.display='block';
}

function copyLink() {
  navigator.clipboard.writeText(location.href);
  alert('連結已複製');
}

function downloadCard() {
  const card = document.getElementById('card');
  html2canvas(card).then(canvas => {
    const link = document.createElement('a');
    link.download = 'perfume.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}
