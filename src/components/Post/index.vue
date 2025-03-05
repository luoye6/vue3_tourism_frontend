<template>
  <div class="post-browse">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <el-row style="display: flex; justify-content: space-between">
        <el-col :span="8" v-if="!addPost">
          <el-input
            v-model="searchText"
            placeholder="搜索旅游攻略帖子"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #append>
              <el-button :icon="Search" @click="handleSearch" />
            </template>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <AddPost v-if="addPost"></AddPost>
    <!-- 帖子列表 -->
    <div class="post-list" v-if="!addPost">
      <div
        v-for="post in postList"
        :key="post.id"
        class="post-item"
        @click="goToPostDetail(post.id)"
      >
        <!-- 用户信息 -->
        <div class="user-info">
          <el-avatar
            :src="post.user?.userAvatar"
            class="user-avatar"
          ></el-avatar>
          <div class="user-details">
            <span class="user-name">{{ post.user?.userName }}</span>
            <span class="post-time">{{ post.createTime }}</span>
          </div>
        </div>
        <!-- 帖子标题 -->
        <div class="post-header">
          <span class="post-title">{{ post.title }}</span>
        </div>
        <!-- 帖子内容 -->
        <div class="post-content">
          {{ truncateContent(post.content, 30) }}
        </div>
        <!-- 标签 -->
        <div class="post-footer">
          <div class="post-tags">
            <el-tag
              v-for="tag in post.tagList"
              :key="tag"
              type="info"
              size="small"
              class="tag"
            >
              {{ tag }}
            </el-tag>
          </div>
          <!-- 点赞和收藏 -->
          <div class="post-actions">
            <span class="action-item">
              <img src="@/assets/icons/dianzan.svg" width="14" height="14" />
              {{ post.thumbNum }}
            </span>
            <span class="action-item">
              <el-icon><Star /></el-icon>
              {{ post.favourNum }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination" v-if="!addPost">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 15, 20]"
        :current-page="paginationConfig.current"
        :total="paginationConfig.total"
        :page-size="paginationConfig.pageSize"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Search, Star } from "@element-plus/icons-vue";
import { ElButton, ElMessage, ElPagination } from "element-plus";
import AddPost from "@/components/AddPost/index.vue";
import "@/assets/icons/dianzan.svg";
import { useRouter } from "vue-router";
import { listMyFavourPostByPageUsingPost } from "@/api/postFavourController";

// 搜索文本
const searchText = ref("");

// 帖子列表
const postList = ref([]);
const addPost = ref(false);
const router = useRouter(); // 获取路由实例
// 分页配置
const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0
});

// 获取帖子列表
const getPostList = async () => {
  try {
    const res = await listMyFavourPostByPageUsingPost({
      title: searchText.value,
      current: paginationConfig.value.current,
      pageSize: paginationConfig.value.pageSize
    });
    if (res.code === 200) {
      postList.value = res.data.records;
      paginationConfig.value.total = parseInt(res.data.total);
    } else {
      ElMessage.error("获取帖子列表失败");
    }
  } catch (error) {
    ElMessage.error("获取帖子列表失败");
  }
};
// 跳转到帖子详情页
const goToPostDetail = (postId: number) => {
  router.push({ name: "PostDetail", params: { id: postId } });
};

// 处理搜索
const handleSearch = () => {
  paginationConfig.value.current = 1;
  getPostList();
};

// 处理分页
const handlePageChange = (page: number) => {
  paginationConfig.value.current = page;
  getPostList();
};

const handleSizeChange = (val: number) => {
  paginationConfig.value.pageSize = val;
  getPostList();
};

// 初始化加载帖子列表
onMounted(() => {
  getPostList();
});

// 工具函数：截断内容
const truncateContent = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
};
</script>

<style scoped lang="scss">
.post-browse {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .search-bar {
    margin-bottom: 20px;

    .el-input {
      width: 100%;
      max-width: 400px;
    }
  }

  .post-list {
    .post-item {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;

      .user-info {
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        .user-avatar {
          margin-right: 12px;
        }

        .user-details {
          display: flex;
          flex-direction: column;

          .user-name {
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }

          .post-time {
            font-size: 14px;
            margin-top: 10px;
            color: #999;
          }
        }
      }

      .post-header {
        margin-bottom: 16px;

        .post-title {
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }
      }

      .post-content {
        font-size: 14px;
        color: #666;
        line-height: 1.6;
        margin-bottom: 16px;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 限制显示两行 */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .post-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .post-tags {
          .tag {
            margin-right: 8px;
          }
        }

        .post-actions {
          display: flex;
          align-items: center;

          .action-item {
            display: flex;
            align-items: center;
            margin-left: 16px;
            font-size: 14px;
            color: #666;

            .el-icon {
              margin-right: 4px;
            }
          }
        }
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
