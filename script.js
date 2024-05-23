document.addEventListener('DOMContentLoaded', function () {
  const datepickerInput = document.getElementById('datepicker-input');
  const calendar = document.querySelector('.calendar');
  const monthYearDisplay = document.getElementById('month-year');
  const prevMonthButton = document.getElementById('prev-month');
  const nextMonthButton = document.getElementById('next-month');
  const calendarBody = document.querySelector('.calendar-body');
  const yearInput = document.getElementById('year-input');
  const goYearButton = document.getElementById('go-year');

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();

  function showCalendar() {
    calendar.classList.toggle('visible');
  }

  function generateCalendar(year, month) {
    const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let startingDay = firstDayOfMonth.getDay();
    if (startingDay === 0) startingDay = 7; 

    let html = '<table>';
    html += '<tr>' + daysOfWeek.map(day => `<th>${day}</th>`).join('') + '</tr><tr>';

    let day = 1;
    for (let i = 0; i < 6; i++) {
      for (let j = 1; j <= 7; j++) {
        if (i === 0 && j < startingDay) {
          html += '<td></td>';
        } else if (day > daysInMonth) {
          html += '<td></td>';
        } else {
          html += `<td>${day}</td>`;
          day++;
        }
      }
      html += '</tr>';
      if (day > daysInMonth) {
        break;
      } else {
        html += '<tr>';
      }
    }
    html += '</tr></table>';

    calendarBody.innerHTML = html;
    monthYearDisplay.textContent = `${firstDayOfMonth.toLocaleString('ru', { month: 'long' })} ${year}`;

  
    const days = calendarBody.querySelectorAll('td');
    days.forEach(dayElement => {
      dayElement.addEventListener('click', function() {
        if (dayElement.textContent) {
          datepickerInput.value = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayElement.textContent).padStart(2, '0')}`;
          calendar.classList.remove('visible');
        }
      });
    });
  }

  function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    } else if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
  }

  function goToYear() {
    const year = parseInt(yearInput.value);
    if (!isNaN(year)) {
      currentYear = year;
      generateCalendar(currentYear, currentMonth);
    }
  }

  datepickerInput.addEventListener('focus', showCalendar);
  prevMonthButton.addEventListener('click', () => changeMonth(-1));
  nextMonthButton.addEventListener('click', () => changeMonth(1));
  goYearButton.addEventListener('click', goToYear);

 
  generateCalendar(currentYear, currentMonth);
});
