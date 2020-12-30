jQuery(($) => {
  $(document).ready(() => {
    (function init() {
      calendarInit();
    })();

    function calendarInit() {
      const days_not_working = [
        "31.12.2020",
        "1.1.2021",
        "2.1.2021",
        "3.1.2021",
      ];
      const start_after_today = 2;

      const date_start = daysAdd(new Date(), start_after_today);

      let calendar_el = document.getElementById("calendar-picker");
      let calendar = jsCalendar.new({
        target: calendar_el,
        language: "pl",
        date: date_start,
        firstDayOfTheWeek: 2,
      });

      $(".range-buttons > button").on("click", function () {
        $(".range-buttons > button").removeClass("active");
        $(this).addClass("active");
        let range = getRange();
        console.log(range);
      });

      // calendar.select(selectRange(date_start, getRange(), days_not_working));
      saveDays(selectRange(date_start, getRange(), days_not_working));
      calendar.select(loadDays());
      $('.select-days > span').html(loadDays());

      calendar.onDateClick(function(event, date) {
        calendar.clearselect();
        saveDays(selectRange(date, getRange(), days_not_working));
        calendar.select(loadDays());
        $('.select-days > span').html(loadDays());
      })

      console.log($('#week-switch').prop('checked'));
      $('#week-switch').on('change', function() {
        console.log($(this).prop('checked'));
      })


      function saveDays(days) {
        localStorage.setItem('selectDays', JSON.stringify(days));
      }

      function loadDays() {
        return JSON.parse(localStorage.getItem('selectDays'));
      }

      function getRange() {
        return parseInt($(".range-buttons > button.active").attr("data-range"));
      }

      function dateFormat(date) {
        return (
          date.getDate() +
          "." +
          (date.getMonth() + 1) +
          "." +
          date.getFullYear() +
          ""
        );
      }

      function dateFormat2(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10) {
          day = "" + 0 + "" + day;
        }
        if (month < 10) {
          month = "" + 0 + "" + month;
        }
        return day + "/" + month + "/" + year;
      }

      function daysAdd(currDate, d) {
        function addDays(date, days) {
          const copy = new Date(Number(date));
          copy.setDate(date.getDate() + days);
          return copy;
        }

        const newDate = addDays(currDate, d);

        return newDate;
      }

      function selectRange(date_start, range, days_out) {
        let i = 0;
        let j = 0;
        let days = [];
        while (i < range) {
          let day = daysAdd(date_start, j);
          let day_format = dateFormat(day);
          let day_format_2 = dateFormat2(day);
          if (days_out.indexOf(day_format) === -1) {
            days.push(day_format_2);
            i++;
          }
          j++;
        }
        return days;
      }

    }
  });
});
