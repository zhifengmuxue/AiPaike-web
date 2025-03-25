<template>
  <div>
    <!-- 直观的课程表 -->
    <div class="schedule-grid">
      <div class="header-cell"></div>
      <div class="header-cell" v-for="day in days" :key="day">{{ day }}</div>
      <div v-for="(time, index) in times" :key="index" class="time-row">
        <div class="time-cell">{{ time }}</div>
        <div v-if="time === '12:00 - 13:30'" class="break">午休</div>
        <div v-else-if="time === '16:30 - 18:00'" class="break">晚休</div>
        <div v-else v-for="day in days" :key="day" class="schedule-cell">
          <div v-for="course in getCoursesForTime(day, index)" :key="course.courseName" class="course">
            {{ course.courseName }} {{ course.teacherName }} <br>
            {{ course.roomBuilding }}-{{ course.roomFloor }}-{{ course.classroomName }}
          </div>
        </div>
      </div>
    </div>

    <!-- 表格形式的课程表 -->
    <a-table class="schedule-table" :columns="columns" :dataSource="scheduleData" rowKey="courseName" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  scheduleData: {
    type: Array,
    required: true
  }
});

const columns = [
  {
    title: '星期几',
    dataIndex: 'weekDay',
    key: 'weekDay'
  },
  {
    title: '开始节次',
    dataIndex: 'slotStart',
    key: 'slotStart'
  },
  {
    title: '结束节次',
    dataIndex: 'slotEnd',
    key: 'slotEnd'
  },
  {
    title: '开始周次',
    dataIndex: 'weekBegin',
    key: 'weekBegin'
  },
  {
    title: '结束周次',
    dataIndex: 'weekEnd',
    key: 'weekEnd'
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    key: 'courseName'
  },
  {
    title: '教师名字',
    dataIndex: 'teacherName',
    key: 'teacherName'
  },
  {
    title: '教室名字',
    dataIndex: 'classroomName',
    key: 'classroomName'
  },
  {
    title: '教学楼',
    dataIndex: 'roomBuilding',
    key: 'roomBuilding'
  },
  {
    title: '楼层',
    dataIndex: 'roomFloor',
    key: 'roomFloor'
  }
];

const days = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
const times = [
  '08:10 - 08:50', '08:55 - 09:35', '09:50 - 10:30', '10:35 - 11:15', '11:20 - 12:00',
  '12:00 - 13:30', // 午休时间
  '13:30 - 14:10', '14:15 - 14:55', '15:05 - 15:45', '15:50 - 16:30',
  '16:30 - 18:00', // 晚休时间
  '18:00 - 18:40', '18:45 - 19:25', '19:30 - 20:10'
];

interface Course {
  weekDay: number;
  slotStart: number;
  slotEnd: number;
  weekBegin: number;
  weekEnd: number;
  courseName: string;
  teacherName: string;
  classroomName: string;
  roomBuilding: string;
  roomFloor: string;
}

const getCoursesForTime = (day: string, timeIndex: number): Course[] => {
  return (props.scheduleData as Course[]).filter(course => {
    const courseDay = course.weekDay === days.indexOf(day) + 1;
    const courseTime = timeIndex + 1 >= course.slotStart && timeIndex + 1 <= course.slotEnd;
    return courseDay && courseTime;
  });
};
</script>

<style scoped>
.schedule-table {
  margin: 130px auto;
  max-width: 80%;
}

.schedule-grid {
  margin: 16px auto;
  max-width: 80%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1px;
  background-color: #ccc;
}

.header-cell,
.time-cell,
.schedule-cell {
  background-color: #fff;
  padding: 8px;
  text-align: center;
  border: 1px solid #ccc;
}

.time-row {
  display: contents;
}

.course {
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  margin: 2px;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.break {
  grid-column: span 7;
  /* 合并后面七个列 */
  background-color: #d3d3d3;
  /* 设置背景颜色为灰色 */
  border: 1px solid #ccc;
  margin: 2px;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  /* 设置午休行的高度 */
}
</style>