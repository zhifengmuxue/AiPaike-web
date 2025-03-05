<template>
  <div>
    <ScheduleTable :scheduleData="scheduleData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ScheduleTable from './ScheduleTable.vue';

// 测试数据
const scheduleData = ref([
  {
    weekDay: 1,
    slotStart: 1,
    slotEnd: 2,
    weekBegin: 1,
    weekEnd: 16,
    courseName: '数学',
    teacherName: '张老师',
    classroomName: '101',
    roomBuilding: 'A',
    roomFloor: 1
  },
  {
    weekDay: 2,
    slotStart: 3,
    slotEnd: 4,
    weekBegin: 1,
    weekEnd: 16,
    courseName: '英语',
    teacherName: '李老师',
    classroomName: '102',
    roomBuilding: 'B',
    roomFloor: 2
  }
]);

</script>