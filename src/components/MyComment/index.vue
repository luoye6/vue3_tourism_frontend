<template>
  <div class="my-comments-container">
    <el-card
      title="我的评论"
      class="my-comments-card"
      :body-style="{ padding: '20px' }"
    >
      <div :data="myComments" class="comment-list">
        <div v-for="item in myComments" :key="item.id" class="my-comments-item">
          <el-card class="comment-card" :body-style="{ padding: '20px' }">
            <div style="display: flex; justify-content: space-between">
              <slot name="header">
                <el-text strong>
                  <router-link
                    :to="`/user/post/${item.postId}`"
                    class="comment-link"
                  >
                    面经标题：{{ item.postTitle }}
                  </router-link>
                </el-text>
                <el-text class="comment-update-time">
                  更新时间：{{ formatDate(item.updateTime) }}
                </el-text>
              </slot>
            </div>

            <div class="comment-content">
              <strong>评论内容：</strong> {{ item.content }}
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { listMyCommentsUsingPost } from "@/api/commentController"; // API 请求函数
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

// 定义评论类型
interface MyComment {
  id: string;
  postId: string;
  postContent: string;
  postTitle: string;
  updateTime: string;
  content: string;
}

// 定义 myComments 的状态
const myComments = ref<MyComment[]>([]);

// 获取评论的函数
const getComments = async () => {
  try {
    const res = await listMyCommentsUsingPost();
    myComments.value = res.data || [];
  } catch (e) {
    ElMessage.error(`获取我的评论失败，${e.message}`);
  }
};

// 格式化时间的函数
const formatDate = (date: string) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

// 在组件挂载时获取评论数据
onMounted(() => {
  getComments();
});
</script>

<style scoped>
.my-comments-container {
  margin: 20px;
}

.my-comments-card {
  background: #f5f5f5;
  border-radius: 8px;
}

.comment-list {
  margin-top: 20px;
}

.my-comments-item {
  margin-bottom: 16px;
}

.comment-card {
  background: #fff;
}

.comment-link {
  color: #409eff;
  text-decoration: none;
}

.comment-update-time {
  color: #999;
}

.comment-content {
  margin-top: 10px;
  color: #333;
}
</style>
