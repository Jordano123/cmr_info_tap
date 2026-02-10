// 365-script.js
// Loads schedule JSON, renders months and days, highlights current month/day,
// supports "Jump to today's reading" and sharing.

document.addEventListener('DOMContentLoaded', () => {
  const monthsList = document.getElementById('monthsList');
  const daysGrid = document.getElementById('daysGrid');
  const monthTitle = document.getElementById('monthTitle');
  const readingTitle = document.getElementById('readingTitle');
  const readingText = document.getElementById('readingText');
  const jumpTodayBtn = document.getElementById('jumpToday');
  const shareBtn = document.getElementById('sharePlan');
  const prevBtn = document.getElementById('prevMonth');
  const nextBtn = document.getElementById('nextMonth');

  let schedule = {};
  let currentMonthIndex = 0; // 0..11
  let selectedDayIndex = null;

  // Determine today's date (used for highlighting)
  const today = new Date();
  const todayMonth = today.getMonth(); // 0..11
  const todayDate = today.getDate(); // 1..31
  const currentYear = today.getFullYear();

  // Load schedule JSON
  fetch('365schedule.json')
    .then(r => r.json())
    .then(data => {
      schedule = data;
      renderMonths();
      // default open to current month
      openMonth(todayMonth);
    })
    .catch(err => {
      console.error('Could not load schedule JSON', err);
      monthsList.innerHTML = '<p style="color:#c00">Schedule not available.</p>';
    });

  function renderMonths(){
    monthsList.innerHTML = '';
    const monthNames = schedule.monthNames || ["January","February","March","April","May","June","July","August","September","October","November","December"];
    monthNames.forEach((m, idx) => {
      const btn = document.createElement('button');
      btn.textContent = m;
      btn.dataset.month = idx;
      if (idx === todayMonth) btn.classList.add('current');
      btn.addEventListener('click', () => openMonth(idx));
      monthsList.appendChild(btn);
    });
  }

  function openMonth(monthIdx){
    currentMonthIndex = monthIdx;
    // update month title
    const monthNames = schedule.monthNames || ["January","February","March","April","May","June","July","August","September","October","November","December"];
    monthTitle.textContent = monthNames[monthIdx];

    // highlight month buttons
    Array.from(monthsList.children).forEach((b, i) => {
      b.classList.toggle('current', i === monthIdx);
    });

    // render days
    const monthData = (schedule.months && schedule.months[monthIdx]) || [];
    daysGrid.innerHTML = '';
    monthData.forEach((dayObj, i) => {
      const cell = document.createElement('div');
      cell.className = 'day-cell';
      cell.textContent = dayObj.day; // e.g., "1"
      cell.dataset.dayIndex = i;
      // highlight today's date if same month and same day
      if (monthIdx === todayMonth && Number(dayObj.day) === todayDate) {
        cell.classList.add('today');
        // auto-select today's day
        selectDay(i, monthIdx);
      }
      cell.addEventListener('click', () => selectDay(i, monthIdx));
      daysGrid.appendChild(cell);
    });

    // update prev/next buttons
    prevBtn.onclick = () => openMonth(Math.max(0, monthIdx - 1));
    nextBtn.onclick = () => openMonth(Math.min(11, monthIdx + 1));
  }

  function selectDay(dayIndex, monthIdx){
    selectedDayIndex = dayIndex;
    // remove previous selection
    Array.from(daysGrid.children).forEach(c => c.classList.remove('selected'));
    const selectedCell = daysGrid.querySelector(`[data-day-index="${dayIndex}"]`);
    if (selectedCell) selectedCell.classList.add('selected');

    // show reading detail
    const monthData = (schedule.months && schedule.months[monthIdx]) || [];
    const dayObj = monthData[dayIndex];
    if (dayObj) {
      readingTitle.textContent = `${schedule.monthNames[monthIdx]} ${dayObj.day}`;
      readingText.innerHTML = `<strong>${escapeHtml(dayObj.reading)}</strong><br><span style="color:#666">${escapeHtml(dayObj.note || '')}</span>`;
    } else {
      readingTitle.textContent = 'No reading';
      readingText.textContent = '';
    }
  }

  // Jump to today's reading: open month and scroll into view
  jumpTodayBtn.addEventListener('click', () => {
    openMonth(todayMonth);
    // small delay to ensure DOM updated
    setTimeout(() => {
      const todayCell = daysGrid.querySelector('.today');
      if (todayCell) {
        todayCell.scrollIntoView({behavior:'smooth', block:'center'});
        todayCell.classList.add('selected');
        todayCell.focus && todayCell.focus();
        // show detail
        const idx = Number(todayCell.dataset.dayIndex);
        selectDay(idx, todayMonth);
      }
    }, 120);
  });

  // Share plan
  shareBtn.addEventListener('click', async () => {
    const shareText = `Join me on the CMR 365 Bible reading plan for ${currentYear}. Start today and read with me!`;
    const shareUrl = location.href; // page URL
    if (navigator.share) {
      try {
        await navigator.share({title:'CMR 365 Bible', text:shareText, url:shareUrl});
      } catch (err) {
        // user cancelled or error
      }
    } else {
      // fallback: open mailto and WhatsApp options
      const mailto = `mailto:?subject=${encodeURIComponent('Join the CMR 365 Bible')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
      const whatsapp = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
      // open a small chooser: mail or WhatsApp
      const fallback = confirm('Web Share not available. Press OK to share via WhatsApp, Cancel to share via Email.');
      if (fallback) window.open(whatsapp, '_blank');
      else window.location.href = mailto;
    }
  });

  // small helper to escape HTML
  function escapeHtml(s){ return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
});

