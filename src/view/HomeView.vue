<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible theme="light">
            <div class="logo">AIPaike</div>
            <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
                <a-menu-item key="dashboard" @click="navigateTo('dashboard')">
                    <desktop-outlined />
                    <span>仪表盘</span>
                </a-menu-item>
                <a-menu-item key="export" @click="navigateTo('export')">
                    <TableOutlined />
                    <span>课表展示</span>
                </a-menu-item>
                <a-menu-item key="option" @click="navigateTo('option')">
                    <RobotOutlined />
                    <span>智能调课</span>
                </a-menu-item>
                <a-menu-item key="chat" @click="navigateTo('chat')">
                    <RadarChartOutlined />
                    <span>智能问答</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header
                style="background: #fff; padding: 0; display: flex; align-items: center; justify-content: space-between;">
                <div style="flex: 1; display: flex; justify-content: center;">
                    <a-input-search placeholder="搜索" style="max-width: 400px;" />
                </div>
                <a-button type="primary" @click="logout" style="margin: 16px;">登出</a-button>
            </a-layout-header>
            <a-layout-content style="margin: 0 0px">
                <div :style="{ padding: '24px', background: '#fff', minHeight: '100%' }">
                    <router-view />
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import {
    TableOutlined,
    DesktopOutlined,
    RadarChartOutlined,
    RobotOutlined
} from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>([]);
const router = useRouter();
const route = useRoute();

const navigateTo = (path: string) => {
    router.push(`/home/${path}`);
};

const logout = () => {
    sessionStorage.removeItem('token');
    router.push('/login');
};

onMounted(() => {
    const currentPath = route.path.split('/').pop();
    if (currentPath) {
        selectedKeys.value = [currentPath];
    }
});
</script>

<style scoped>
.logo {
    height: 32px;
    margin: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    font-weight: bold;
    color: #333;
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='light'] .site-layout .site-layout-background {
    background: #f8f2f2;
}
</style>