<template>
  <div class="post-detail">
    <!-- 帖子详情 -->
    <div class="post-content">
      <div class="post-header">
        <el-avatar :src="post.user?.userAvatar" class="user-avatar"></el-avatar>
        <div class="user-details">
          <span class="user-name">{{ post.user?.userName }}</span>
          <span class="post-time">{{ post.createTime }}</span>
        </div>
      </div>
      <h1 class="post-title">{{ post.title }}</h1>
      <MdPreview
        class="post-body"
        editor-id="mdPreview"
        :modelValue="post.content"
        previewTheme="github"
        showCodeRowNumber
      />
      <!-- 分割线 -->
      <el-divider />

      <!-- 三个图标 -->
      <div class="icon-container">
        <div class="icon-item" @click="doThumb">
          <template v-if="initLikeStatus === 0">
            <img src="@/assets/icons/dianzan.svg" width="17" height="17" />
          </template>
          <template v-if="initLikeStatus === 1">
            <img src="@/assets/icons/alreadyLike.svg" width="17" height="17" />
          </template>

          <span>{{ likeCount }}</span>
        </div>
        <div class="icon-item" @click="handleCollect">
          <el-icon :size="20">
            <template v-if="initCollectStatus === 0">
              <Star />
            </template>
            <template v-if="initCollectStatus === 1">
              <StarFilled color="#fadb14" :size="20" />
            </template>
          </el-icon>
          <span>{{ collectCount }}</span>
        </div>
        <div class="icon-item" @click="handleShare">
          <el-icon :size="20">
            <Share />
          </el-icon>
          <span>分享</span>
        </div>
        <!-- 分享对话框 -->
        <el-dialog v-model="shareDialogVisible" width="400px">
          <div class="share-dialog-content">
            <!-- 标题 -->
            <h3
              style="
                font-weight: 700;
                font-size: 24px;
                margin: 0;
                text-align: center;
              "
            >
              分享此题目
            </h3>
            <el-divider />
            <!-- 分享链接 -->
            <div class="share-section">
              <p style="margin: 0 0 10px 0; font-weight: 700; font-size: 20px">
                分享链接：
              </p>
              <el-card>
                <div class="link-container">
                  <span>{{ currentPageUrl }}</span>
                  <el-button type="primary" @click="copyLink">复制</el-button>
                </div>
              </el-card>
            </div>
            <el-divider />
            <!-- 二维码分享 -->
            <div class="share-section">
              <p style="margin: 0 0 10px 0; font-weight: 700; font-size: 20px">
                二维码分享：
              </p>
              <el-card style="margin: 0 auto">
                <QRCodeVue3
                  :value="currentPageUrl"
                  :width="200"
                  :height="200"
                  :imageOptions="{
                    hideBackgroundDots: false,
                    imageSize: 0.4,
                    margin: 0
                  }"
                />
              </el-card>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>

    <!-- 评论区 -->
    <Comments :postId="postId" style="margin-top: 20px" />
  </div>
</template>

<script setup lang="ts">
import Comments from "@/components/Comment/index.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPostVoByIdUsingGet } from "@/api/postController";
import { doPostFavourUsingPost } from "@/api/postFavourController";
import { ElMessage } from "element-plus";
import { doThumbUsingPost } from "@/api/postThumbController";
import QRCodeVue3 from "qrcode-vue3";
import useClipboard from "vue-clipboard3";
import { MdPreview } from "md-editor-v3";
// 获取路由参数
const route = useRoute();
const postId = route.params.id;
// 分享对话框的显示状态
const shareDialogVisible = ref(false);
// 当前页面地址
const currentPageUrl = ref(window.location.href);

// 帖子详情数据
const post = ref({
  id: postId,
  title: "",
  content: "",
  createTime: "",
  user: {
    userName: "",
    userAvatar: ""
  }
});

// 点赞和收藏计数
const likeCount = ref(); // 示例查看次数
const collectCount = ref(); // 示例收藏次数
const initCollectStatus = ref(0); // 示例收藏状态，0 表示未收藏，1 表示已收藏
const initLikeStatus = ref(0); // 点赞状态 0 未点赞  1已点赞
// 获取帖子详情
const fetchPostDetail = async () => {
  try {
    const response = await getPostVoByIdUsingGet({ id: postId });
    if (response?.data) {
      post.value = {
        id: response.data.id,
        title: response.data.title,
        content: response.data.content,
        createTime: response.data.createTime,
        user: {
          userName: response.data.user.userName,
          userAvatar: response.data.user.userAvatar
        }
      };
    }
  } catch (error) {
    ElMessage.error("获取帖子详情失败:", error);
  }
};
// 点赞处理
const doThumb = async () => {
  const res = await doThumbUsingPost({
    postId: post.value.id
  });
  if (res.code !== 200) {
    return ElMessage.error({
      duration: 1000,
      message: "点赞/取消点赞操作失败"
    });
  }
  if (res.data === -1) {
    ElMessage.success({
      duration: 1000,
      message: "取消点赞成功"
    });
    initLikeStatus.value = 0;
  } else {
    ElMessage.success({
      duration: 1000,
      message: "点赞成功"
    });
    initLikeStatus.value = 1;
  }
  await getPostLikeAndCollect();
};
// 收藏处理
const handleCollect = async () => {
  // 处理收藏状态
  if (initCollectStatus.value === 0) {
    // 添加收藏
    const res = await doPostFavourUsingPost({ postId });
    if (res.code === 200) {
      initCollectStatus.value = 1;
      ElMessage.success({
        duration: 1000,
        message: "收藏该帖子成功"
      });
    }
  } else {
    // 取消收藏
    const res = await doPostFavourUsingPost({ postId });
    if (res.code === 200) {
      initCollectStatus.value = 0;
      ElMessage.success({
        duration: 1000,
        message: "取消收藏帖子成功"
      });
    }
  }
  await getPostLikeAndCollect();
};
// 复制链接
const { toClipboard } = useClipboard();
const copyLink = async () => {
  try {
    await toClipboard(currentPageUrl.value);
    ElMessage.success({
      message: "链接已复制到剪贴板",
      duration: 1000
    });
  } catch (e) {
    ElMessage.error("复制失败", e);
  }
};
// 获取帖子原来的点赞量和收藏量
const getPostLikeAndCollect = async () => {
  const res = await getPostVoByIdUsingGet({
    id: post.value.id
  });
  if (res.code !== 200) {
    ElMessage.error({
      duration: 1000,
      message: "获取帖子点赞和收藏量失败"
    });
  }
  likeCount.value = res.data.thumbNum;
  collectCount.value = res.data.favourNum;
};
// 分享处理
// 处理分享的点击事件
const handleShare = () => {
  shareDialogVisible.value = true;
};
// 获取原始帖子的点赞和收藏情况（是否点赞，是否收藏，利用双重调用）
const getInitCollectAndLikeStatus = async () => {
  const res = await doThumbUsingPost({
    postId: post.value.id
  });
  if (res.data === 1) {
    initLikeStatus.value = 0;
  } else {
    initLikeStatus.value = 1;
  }
  await doThumbUsingPost({
    postId: post.value.id
  });
  const res2 = await doPostFavourUsingPost({
    postId: post.value.id
  });
  if (res2.data === 1) {
    initCollectStatus.value = 0;
  } else {
    initCollectStatus.value = 1;
  }
  await doPostFavourUsingPost({
    postId: post.value.id
  });
};
// 在组件挂载时获取数据
onMounted(async () => {
  await fetchPostDetail();
  await getPostLikeAndCollect();
  await getInitCollectAndLikeStatus();
});
</script>

<style scoped lang="scss">
.post-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .post-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .post-header {
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

    .post-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .post-body {
      font-size: 16px;
      color: #333;
      line-height: 1.6;
    }
  }

  .comment-section {
    margin-top: 20px;

    .comment-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .comment-list {
      .comment-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 16px;

        .comment-avatar {
          margin-right: 12px;
        }

        .comment-content {
          display: flex;
          flex-direction: column;

          .comment-user {
            font-size: 14px;
            font-weight: bold;
            color: #333;
          }

          .comment-text {
            font-size: 14px;
            color: #666;
            margin: 8px 0;
          }

          .comment-time {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }

  .icon-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;

    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      color: #666;
      transition: color 0.3s;

      &:hover {
        color: #409eff;
      }

      span {
        font-size: 14px;
      }
    }
  }
}

.share-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .share-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .link-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    span {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
