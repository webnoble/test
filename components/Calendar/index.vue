<!--
 * @Author: your name
 * @Date: 2020-05-28 17:18:30
 * @LastEditTime: 2020-05-29 09:47:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \monitor\src\components\calendar\index.vue
-->
<template>
  <div class="calendar">
    <div class="month">
      <ul>
        <li class="arrow" @click="pickPre(currentYear,currentMonth)">
          <span class="icon iconfont iconarrow_triangle-left"></span>
        </li>
        <li
          class="year-month"
          @click="pickYear(currentYear,currentMonth)"
        >{{ currentYear }}年{{ currentMonth }}月</li>
        <li class="arrow" @click="pickNext(currentYear,currentMonth)">
          <span class="icon iconfont iconarrow_triangle-right"></span>
        </li>
      </ul>
    </div>
    <ul class="weekdays">
      <li>日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>
    <ul class="days">
      <li v-for="(dayobject,key) in days" :key="key">
        <div :class="{'other-month':dayobject.day.getMonth()+1 != currentMonth}">
          <span v-if="anomalyList.includes(dayobject.day.getTime())" class="anomaly">异常</span>
          {{ dayobject.day.getDate() }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    anomalyList: {
      type: Array,
      default: () => {
        return [new Date(new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()).getTime()]
      }
    }
  },
  data () {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: []
    };
  },
  created: function () { // 在vue初始化时调用
    this.initData(null);
  },
  methods: {
    initData: function (cur) {
      var date;
      if (cur) {
        date = new Date(cur);
      } else {
        var now = new Date();
        var d = new Date(this.formatDate(now.getFullYear(), now.getMonth() + 1, 1));
        date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      }
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;

      this.currentWeek = date.getDay(); // 1...6,0
      var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
      this.days.length = 0;
      for (let i = this.currentWeek; i >= 0; i--) {
        const d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject = {};
        dayobject.day = d;
        this.days.push(dayobject);
      }
      for (let i = 1; i <= 41 - this.currentWeek; i++) {
        const d = new Date(str);
        d.setDate(d.getDate() + i);
        const dayobject = {};
        dayobject.day = d;
        this.days.push(dayobject);
      }
    },
    pickPre: function (year, month) {
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickNext: function (year, month) {
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickYear: function (year, month) {
      alert(year + ',' + month);
    },

    formatDate: function (year, month, day) {
      var y = year;
      var m = month;
      if (m < 10) m = '0' + m;
      var d = day;
      if (d < 10) d = '0' + d;
      return y + '/' + m + '/' + d
    }

  }
}
</script>
<style lang="scss" scoped>
.calendar {
  width: 100%;
  margin: 0 auto;
}
.month {
  width: 100%;
  background: #ffffff;
  color: #2f2f2f;
  font-size: 18px;
  margin-bottom: 15px;
}

.month ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  .icon {
    color: #5466e0;
  }
}

.year-month {
  display: flex;
  align-items: center;
}

.choose-year {
  padding-left: 20px;
  padding-right: 20px;
}

.choose-month {
  text-align: center;
  font-size: 1.5rem;
}

.arrow {
  padding: 1%;
  cursor: pointer;
}

.month ul li {
  color: #2f2f2f;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.weekdays {
  margin: 0;
  background-color: #f9f9fb;
  display: flex;
  flex-wrap: wrap;
  color: #2f2f2f;
  font-size: 16px;
  justify-content: space-around;
}

.weekdays li {
  display: inline-block;
  width: calc(100% / 7);
  text-align: center;
  padding-bottom: 13px;
  padding-top: 13px;
  border-left: 1px solid #eeefff;
  border-bottom: 1px solid #eeefff;
}

.days {
  padding: 0;
  background: #ffffff;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  border-right: 1px solid #eeefff;
}

.days li {
  list-style-type: none;
  display: inline-block;
  width: calc(100% / 7);
  text-align: right;
  padding-bottom: 18px;
  padding-top: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  font-size: 16px;
  color: #2f2f2f;
  border-left: 1px solid #eeefff;
  border-bottom: 1px solid #eeefff;
  .anomaly {
    font-size: 12px;
    background-color: #ff0000;
    padding: 1px 4px;
    border-radius: 3px;
    color: #ffffff;
  }
}

.days li .other-month {
  color: #a4a4a4;
}
</style>
