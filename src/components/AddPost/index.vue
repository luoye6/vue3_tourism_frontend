<template>
  <div class="post-editor">
    <el-form :model="editForm" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="editForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-input-tag
          v-model="editForm.tags"
          placeholder="请输入标签"
          :max="5"
          :validate="validateTag"
        />
      </el-form-item>
      <el-form-item label="内容">
        <MdEditor
          :modelValue="editForm.content"
          previewTheme="github"
          showCodeRowNumber
          @on-change="handleContentChange"
        />
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button type="primary" @click="handleSubmit" class="small-button"
              >提交
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button @click="handleReset" class="small-button"
              >重置
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ElMessage } from "element-plus";
import { addPostUsingPost } from "@/api/postController";
import eventBus from "@/utils/eventBus";

// 表单数据
const editForm = ref({
  title: "",
  tags: [], // 标签数据
  content: ""
});

// 处理内容变化
const handleContentChange = (content) => {
  editForm.value.content = content;
};

// 处理提交
const handleSubmit = async () => {
  if (!editForm.value.title || !editForm.value.content) {
    ElMessage.error("标题和内容不能为空");
    return;
  }

  try {
    const res = await addPostUsingPost({
      ...editForm.value
    });
    if (res.code !== 200) {
      return ElMessage.error({
        duration: 1000,
        message: "发帖失败，请稍后重试"
      });
    }
    handleReset();
    ElMessage.success({
      duration: 1000,
      message: "发帖成功"
    });
    // 触发事件，通知 PostList 刷新数据
    eventBus.emit("refresh-post-list");
  } catch (error) {
    ElMessage.error("发帖失败，请稍后重试");
  }
};

// 处理重置
const handleReset = () => {
  editForm.value.title = "";
  editForm.value.tags = [];
  editForm.value.content = "";
};

// 标签验证函数
const validateTag = (tag) => {
  if (tag.length > 10) {
    return "标签长度不能超过 10 个字符";
  }
  return true;
};
</script>

<style lang="scss" scoped>
.post-editor {
  height: calc(100vh - 40px); // 撑满整个屏幕高度，减去内边距
  padding: 20px; // 屏幕内边距
  display: flex;
  flex-direction: column;

  .el-form {
    flex: 1;
    display: flex;
    flex-direction: column;

    .el-form-item {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .el-form-item__content {
      flex: 1;
      display: flex;
      flex-direction: column;

      .md-editor {
        flex: 1;
        display: flex;
        flex-direction: column;

        .md-editor-content {
          flex: 1;
        }
      }
    }
  }

  .el-input,
  .el-textarea {
    width: 100%;
  }

  .small-button {
    width: 100%; // 按钮宽度占满 el-col
    max-width: 150px; // 限制按钮最大宽度
  }

  .el-row {
    display: flex;
    justify-content: space-between;

    .el-col {
      display: flex;
      justify-content: center; // 按钮居中
    }
  }
}
</style>
