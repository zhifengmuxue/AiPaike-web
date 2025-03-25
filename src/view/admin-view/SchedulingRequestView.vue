<template>
    <div class="option-container">
        <div class="left-container">
            <h2>自动排课</h2>
            <div class="form-group">
                <label for="course-select">选择优先排课课程：</label>
                <a-select id="course-select" v-model:value="selectedCourses" mode="multiple" placeholder="请选择课程(不选择则默认同等优先级)"
                    style="width: 100%" :disabled="loading">
                    <a-select-option v-for="course in courses" :key="course.id" :value="course.id">
                        {{ course.name }}
                    </a-select-option>
                </a-select>
            </div>
            <div class="form-group">
                <label for="stagoery-select">选择排课策略模式：</label>
                <a-select id="stagoery-select" v-model:value="selectedStagoery" placeholder="请选择策略(不选择则不增加策略)" style="width: 100%" :disabled="loading">
                    <a-select-option value="策略一">策略一</a-select-option>
                    <a-select-option value="策略二">策略二</a-select-option>
                    <a-select-option value="策略三">策略三</a-select-option>
                </a-select>
            </div>
            <div class="button-container">
                <button @click="scheduleCourses" :disabled="loading">排课</button>
            </div>
        </div>

        <div class="right-container">
            <h2>自动调课</h2>
            <div class="form-group">
                <label for="week">周次：</label>
                <input type="number" id="week" v-model="week" :disabled="loading" />

                <label for="day">星期几：</label>
                <select id="day" v-model="day" :disabled="loading">
                    <option v-for="(dayName, index) in days" :key="index" :value="index + 1">
                        {{ dayName }}
                    </option>
                </select>

                <div class="form-group-inline">
                    <div class="form-group-half">
                        <label for="start-slot">开始节次：</label>
                        <input type="number" id="start-slot" v-model="startSlot" :disabled="loading" />
                    </div>
                    <div class="form-group-half">
                        <label for="end-slot">结束节次：</label>
                        <input type="number" id="end-slot" v-model="endSlot" :disabled="loading" />
                    </div>
                </div>
            </div>
            <div class="button-container">
                <button @click="rescheduleCourse" :disabled="loading">调课</button>
            </div>
        </div>
    </div>
    <a-spin v-if="loading" tip="排课中..." class="loading-spinner">
        <div class="loading-content"></div>
    </a-spin>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axiosInstance from '../../utils/axiosInstance';
import { message } from 'ant-design-vue';

interface Course {
    id: number;
    name: string;
}

const selectedCourses = ref<number[]>([]);
const selectedStagoery = ref<string[]>([]);
const week = ref<number | string>('');
const day = ref<number | string>('');
const startSlot = ref<number | string>('');
const endSlot = ref<number | string>('');
const courses = ref<Course[]>([]);
const days = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
const loading = ref(false);

onMounted(async () => {
    try {
        courses.value = [
            { id: 1, name: '数学' },
            { id: 2, name: '英语' },
            { id: 3, name: '物理' },
            { id: 4, name: '化学' },
            { id: 5, name: '生物' },
            { id: 6, name: '历史' },
            { id: 7, name: '地理' },
            { id: 8, name: '政治' },
            { id: 9, name: '体育' },
            { id: 10, name: '音乐' }
        ];
    } catch (error) {
        console.error('获取课程数据失败:', error);
    }
});

const scheduleCourses = async () => {
    loading.value = true;
    try {
        const response = await axiosInstance({
            method: 'get',
            url: '/paike',
        });
        if (response.data.code === 200) {
            message.success('排课成功');
        } else {
            message.error(`排课失败: ${response.data.msg}`);
        }
    } catch (error) {
        message.error('请求错误，请稍后再试');
        console.error('请求错误:', error);
    } finally {
        loading.value = false;
    }

    selectedStagoery.value = [];
    selectedCourses.value = [];
};

const rescheduleCourse = () => {
    selectedCourses.value = [];
    week.value = '';
    day.value = '';
    startSlot.value = '';
    endSlot.value = '';
};
</script>

<style scoped>
.option-container {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #f6f6f6;
    border-radius: 8px;
    background-color: #fff;
}

.left-container,
.right-container {
    width: 48%;
    padding: 20px;
    border: 1px solid #f5f5f5;
    border-radius: 8px;
    background-color: #ffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.form-group {
    margin-bottom: 20px;
}

.form-group-inline {
    display: flex;
    justify-content: space-between;
}

.form-group-half {
    width: 48%;
}

h2 {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
}

label {
    display: block;
    margin-bottom: 8px;
}

input,
select {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.button-container {
    margin-top: auto;
}

button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

button:hover:enabled {
    background-color: #0056b3;
}

.loading-spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 9999;
}

.loading-content {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>