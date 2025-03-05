<template>
  <el-card class="comment-view">
    <!-- 左侧头像 -->
    <el-avatar
      :src="comment.user.userAvatar || '/assets/logo.png'"
      size="default"
      class="avatar"
    />
    <!-- 右侧内容 -->
    <div class="comment-content">
      <!-- 用户名 -->
      <div class="comment-header">
        <span class="username">{{ comment.user.userName }}</span>
      </div>
      <!-- 用户评论内容 -->
      <div class="comment-body">
        {{ comment.content }}
      </div>
      <!-- 操作区 -->
      <div class="comment-actions">
        <el-row class="actions-row">
          <el-col>
            <span class="create-time">{{ comment.createTime }}</span>
            <el-text @click="handleReply" type="primary" style="cursor: pointer"
              >回复
            </el-text>
            <!-- 删除按钮，只有当前用户是评论作者时才显示 -->
            <template v-if="loginUser.id === comment.user.id">
              <el-popconfirm
                title="你确定要删除该评论吗？"
                @confirm="handleDelete"
                @cancel="cancelEvent"
              >
                <template #reference>
                  <el-text
                    style="cursor: pointer"
                    class="delete-button"
                    type="danger"
                    >删除
                  </el-text>
                </template>
              </el-popconfirm>
            </template>
          </el-col>
        </el-row>
      </div>

      <!-- 二级评论区域 -->
      <div v-if="isReplying" class="secondary-comment">
        <el-input
          type="textarea"
          v-model="replyContent"
          :placeholder="`回复${comment.user.userName}：`"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
        <div class="action-buttons">
          <el-button type="text" @click="cancelReply">取消</el-button>
          <el-button type="primary" @click="submitReply">回复</el-button>
        </div>
      </div>

      <!-- 显示二级评论列表 -->
      <div
        v-if="comment.replies && comment.replies.length"
        class="replies-section"
      >
        <div
          v-for="(reply, index) in comment.replies"
          :key="index"
          class="secondary-comment-item"
        >
          <div v-show="index < showMap.get(comment.id)">
            <div class="secondary-comment-content">
              <el-row
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <el-avatar
                  :src="reply.user.userAvatar || '/assets/logo.png'"
                  size="small"
                />
                <span class="reply-username">{{ reply.user.userName }}</span>
                <span style="margin-left: 5px">回复:</span>
                <span class="reply-username">{{
                  reply.repliedUser.userName
                }}</span>
              </el-row>

              <p style="font-size: 14px; margin: 15px 0">{{ reply.content }}</p>
              <span class="reply-time">{{ reply.createTime }}</span>
            </div>
          </div>
        </div>
        <template
          v-if="comment.replies.length > 3 && showMap.get(comment.id) == 3"
        >
          <el-text
            style="cursor: pointer"
            type="primary"
            @click="handleExpand(comment.id, comment.replies.length)"
          >
            展开全部
          </el-text>
        </template>

        <template
          v-if="comment.replies.length > 3 && showMap.get(comment.id) > 3"
        >
          <el-text
            style="cursor: pointer"
            type="success"
            @click="handleCollapse(comment.id)"
          >
            收起
          </el-text>
        </template>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GET_ID } from "@/utils/token";
import { ElMessage } from "element-plus";
import { addCommentUsingPost } from "@/api/commentController";

const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  postId: {
    type: String,
    required: true
  },
  showCount: {
    type: Map,
    require: true
  }
});

const emit = defineEmits(["reply", "delete", "getComment", "doCancel"]);

const loginUser = ref({
  id: GET_ID()
});
const replyContent = ref(""); // 用于存储回复内容
const isReplying = ref(false); // 是否正在输入二级评论
const parentId = ref(props.comment.id); // 当前评论的父评论ID
const showMap = ref(props.showCount);
// 处理点击回复
const handleReply = () => {
  isReplying.value = true;
};
// 取消二级评论
const cancelReply = () => {
  isReplying.value = false;
  replyContent.value = ""; // 清空输入框内容
};

// 提交二级评论
const submitReply = async () => {
  if (!props.postId) {
    return;
  }
  if (!loginUser.value.id) {
    return ElMessage.error({
      duration: 1500,
      message: "请先登录"
    });
  }
  try {
    const res = await addCommentUsingPost({
      postId: props.postId,
      content: replyContent.value,
      parentId: parentId.value
    });
    if (res.code !== 200) {
      isReplying.value = false;
      return ElMessage.error({
        duration: 1500,
        message: `回复失败，${res.message}`
      });
    }
    emit("getComment");
    emit("doCancel");
    ElMessage.success({
      duration: 1500,
      message: "回复评论成功"
    });
    cancelReply();
  } catch (e) {
    ElMessage.error("回复失败: " + e.message);
  }
};

// 处理删除评论
const handleDelete = () => {
  emit("delete", props.comment.id);
};
// 点击展开按钮显示所有回复

const handleExpand = (id, length) => {
  showMap.value = props.showCount;
  showMap.value?.set(id, length);
};
// 点击收起按钮，显示前 3 条
const handleCollapse = (id) => {
  showMap.value = props.showCount;
  showMap.value?.set(id, 3);
};

// 取消删除事件
const cancelEvent = () => {
  ElMessage.success({
    duration: 1000,
    message: "取消删除成功"
  });
};
</script>

<style scoped lang="scss">
.comment-view {
  display: flex;
  gap: 16px;
}

.comment-content {
  flex: 1;
  font-size: 14px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.username {
  font-weight: bold;
}

.create-time {
  color: #999;
  font-size: 0.875rem;
}

.comment-body {
  display: flex;
  align-items: flex-start;
  padding: 10px 0 0 0;
  width: 1048px;
  margin: 15px 0;
  border-radius: 10px;
}

.comment-actions {
  display: flex;
  gap: 8px;
}

.actions-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.delete-button {
  color: red;
}

.el-button {
  font-size: 14px;
}

/* 二级评论区域 */
.secondary-comment {
  margin-top: 15px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.secondary-comment .action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.replies-section {
  margin-top: 20px;
}

.secondary-comment-item {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.secondary-comment-item .secondary-comment-content {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 6px;
  flex: 1;
}

.reply-username {
  margin-left: 5px;
  font-weight: bold;
  color: #333;
}

.reply-time {
  color: #999;
  font-size: 12px;
}
</style>
