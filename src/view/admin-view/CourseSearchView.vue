<template>
  <div class="course-search-container">
    <div class="form-container">
      <a-form layout="vertical" class="centered-form">
        <h2>当前周次</h2>
        <a-form-item>
          <a-input-number v-model:value="currentWeek" min="1" max="52" placeholder="请输入当前周次" style="width: 100%;" />
        </a-form-item>
      </a-form>
      <a-form layout="vertical" class="centered-form">
        <h2>根据班级查找课表</h2>
        <a-form-item>
          <a-input-search v-model:value="className" placeholder="请输入班级" size="large" @search="fetchSchedule">
            <template #enterButton>
              <a-button>搜索</a-button>
            </template>
          </a-input-search>
        </a-form-item>
      </a-form>
      <a-form layout="vertical" class="centered-form">
        <h2>导出课表</h2>
        <a-form-item>
          <ExportButton></ExportButton>
        </a-form-item>
      </a-form>
    </div>
    <div class="table-container">
      <ScheduleTable :scheduleData="filteredScheduleData" />
    </div>
  </div>
  <a-table class="schedule-table" :columns="columns" :dataSource="scheduleData" rowKey="courseName" />
</template>

<script setup lang="ts">
import { ref, type Ref, watch } from 'vue';
import ScheduleTable from '../../component/ScheduleTable.vue';
import { message } from 'ant-design-vue';
import ExportButton from '../../component/ExportButton.vue';
import axiosInstance from '../../utils/axiosInstance';

// 测试数据
interface Course {
  weekDay: string;
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

const scheduleData = ref<Course[]>([]);

const className = ref('');
const currentWeek = ref(1);
const filteredScheduleData = ref(scheduleData.value);

const fetchSchedule = async () => {
  if (className.value.trim() === '') {
    message.warning('请输入班级名称');
    return;
  }

  try {
    const response = await axiosInstance.get('/getSchedule', {
      params: { className: className.value.trim() }
    });
    scheduleData.value = response.data;

    // 根据当前周次过滤课表数据
    filteredScheduleData.value = scheduleData.value.filter(course => {
      return currentWeek.value >= course.weekBegin && currentWeek.value <= course.weekEnd;
    });

    message.success('课表加载成功');
  } catch (error) {
    console.error('获取课表失败:', error);
    message.error('获取课表失败，请稍后再试');
  }
};

watch(currentWeek, () => {
  applyWeekFilter();
});
// 根据当前周次过滤课表数据
const applyWeekFilter = () => {
  filteredScheduleData.value = scheduleData.value.filter(course => {
    return currentWeek.value >= course.weekBegin && currentWeek.value <= course.weekEnd;
  });
};

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

</script>

<style scoped>
.course-search-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.form-container {
  margin-top: 60px;
  width: 300px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.centered-form {
  width: 100%;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table-container {
  flex: 1;
}
</style>