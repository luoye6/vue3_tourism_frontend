<template>
  <div class="post-admin">
    <!-- 查询区域 -->
    <el-card style="margin-bottom: 10px">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="标题">
            <el-input v-model="queryParams.title" placeholder="请输入标题" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="内容">
            <el-input v-model="queryParams.content" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="标签">
            <el-input-tag
              v-model="queryParams.tags"
              placeholder="请输入标签"
              :max="5"
              :validate="validateTag"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户ID">
            <el-input v-model="queryParams.userId" placeholder="请输入用户ID" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button @click="resetQuery">重置</el-button>
            <el-button type="primary" @click="getPostList">查询</el-button>
            <el-button type="primary" @click="showAddDialog" :icon="Promotion">
              添加新帖子
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <!-- 帖子列表表格 -->
    <el-card>
      <el-table :data="postList" style="width: 100%" :loading="loading">
        <el-table-column prop="title" label="标题" />
        <el-table-column
          prop="content"
          label="内容"
          width="200px"
          show-overflow-tooltip
        />
        <el-table-column prop="tags" label="标签" width="200px">
          <template #default="{ row }">
            <el-tag
              v-for="tag in row.tags"
              :key="tag"
              style="margin-right: 5px"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="userId" label="用户ID" />
        <el-table-column prop="thumbNum" label="点赞数" />
        <el-table-column prop="favourNum" label="收藏数" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column label="操作" width="200px">
          <template #default="{ row }">
            <el-button type="primary" @click="showEditDialog(row.id)"
              >修改
            </el-button>
            <el-popconfirm
              title="你确定要删除该帖子吗？"
              @confirm="deletePost(row)"
              @cancel="cancelEvent"
            >
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        style="margin-top: 20px"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 15, 20]"
        :current-page="paginationConfig.current"
        :total="paginationConfig.total"
        :page-size="paginationConfig.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!-- 修改帖子的对话框 -->
    <el-dialog
      title="修改帖子"
      v-model="editDialogVisible"
      width="50%"
      @close="resetEditField(editFormRef)"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="editForm.content" />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-input-tag
            v-model="editForm.tagList"
            placeholder="请输入标签"
            :max="5"
            :validate="validateTag"
          />
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <slot name="footer">
          <el-button @click="resetEditField(editFormRef)">取消</el-button>
          <el-button type="primary" @click="editPost">确定</el-button>
        </slot>
      </span>
    </el-dialog>

    <!-- 添加帖子的对话框 -->
    <el-dialog
      title="添加帖子"
      v-model="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form :model="addForm" ref="addFormRef" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addForm.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <MdEditor
            :modelValue="addForm.content"
            previewTheme="github"
            showCodeRowNumber
            @on-change="handleContentChange"
          />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-input-tag
            v-model="addForm.tags"
            placeholder="请输入标签"
            :max="5"
            :validate="validateTag"
          />
        </el-form-item>
      </el-form>
      <span class="dialog-footer" style="margin-left: 100px">
        <slot name="footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addPost">添加</el-button>
        </slot>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import "md-editor-v3/lib/style.css";
import { onMounted, ref } from "vue";
import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElTag,
  FormInstance
} from "element-plus";
import { Promotion } from "@element-plus/icons-vue";
import {
  addPostUsingPost,
  deletePostUsingPost,
  getPostVoByIdUsingGet,
  listPostByPageUsingPost,
  updatePostUsingPost
} from "@/api/postController";
import { MdEditor } from "md-editor-v3";

// 查询参数
const queryParams = ref({
  title: "",
  content: "",
  tags: [],
  userId: ""
});

// 帖子列表
const postList = ref([]);
const loading = ref<boolean>(false);
// 处理内容变化
const handleContentChange = (content) => {
  addForm.value.content = content;
};
// 分页配置
const paginationConfig = ref({
  pageSize: 10,
  total: 0,
  current: 1
});

// 对话框状态
const editDialogVisible = ref(false);
const addDialogVisible = ref(false);

// 表单引用
const editFormRef = ref<FormInstance>();
const addFormRef = ref<FormInstance>();

// 编辑表单数据
const editForm = ref({
  id: 0,
  title: "",
  content: "",
  tagList: []
});

// 添加表单数据
const addForm = ref({
  title: "",
  content: "",
  tags: []
});

// 获取帖子列表
const getPostList = async () => {
  loading.value = true;
  try {
    const res = await listPostByPageUsingPost({
      ...queryParams.value,
      current: paginationConfig.value.current,
      pageSize: paginationConfig.value.pageSize
    });
    if (res.code === 200) {
      // 处理 tags 数据
      postList.value = res.data.records.map((item) => {
        return {
          ...item,
          tags: JSON.parse(item.tags)
        };
      });
      paginationConfig.value.total = parseInt(res.data.total);
    } else {
      ElMessage.error("获取帖子列表失败");
    }
  } catch (error) {
    ElMessage.error("获取帖子列表失败");
  } finally {
    loading.value = false;
  }
};

// 重置查询条件
const resetQuery = () => {
  queryParams.value = {
    title: "",
    content: "",
    tags: [],
    userId: ""
  };
  getPostList();
};

// 显示修改对话框
const showEditDialog = async (id: number) => {
  loading.value = true;
  try {
    const res = await getPostVoByIdUsingGet({ id });
    if (res.code === 200) {
      // 处理 tags 数据
      editForm.value = res.data;
      editDialogVisible.value = true;
    } else {
      ElMessage.error("获取帖子信息失败");
    }
  } catch (error) {
    ElMessage.error("获取帖子信息失败");
  } finally {
    loading.value = false;
  }
};

// 修改帖子
const editPost = async () => {
  try {
    const res = await updatePostUsingPost({
      content: editForm.value.content,
      id: editForm.value.id,
      tags: editForm.value.tagList,
      title: editForm.value.title
    });
    if (res.code === 200) {
      ElMessage.success("修改帖子成功");
      editDialogVisible.value = false;
      await getPostList();
    } else {
      ElMessage.error("修改帖子失败");
    }
  } catch (error) {
    ElMessage.error("修改帖子失败");
  }
};

// 添加帖子
const addPost = async () => {
  try {
    const res = await addPostUsingPost(addForm.value);
    if (res.code === 200) {
      ElMessage.success("添加帖子成功");
      addDialogVisible.value = false;
      await getPostList();
    } else {
      ElMessage.error("添加帖子失败");
    }
  } catch (error) {
    ElMessage.error("添加帖子失败");
  }
};

// 删除帖子
const deletePost = async (row) => {
  try {
    const res = await deletePostUsingPost({ id: row.id });
    if (res.code === 200) {
      ElMessage.success("删除帖子成功");
      await getPostList();
    } else {
      ElMessage.error("删除帖子失败");
    }
  } catch (error) {
    ElMessage.error("删除帖子失败");
  }
};

// 关闭添加对话框
const addDialogClosed = () => {
  addForm.value = { title: "", content: "", tags: [] };
};

// 关闭修改对话框
const resetEditField = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  editDialogVisible.value = false;
  formEl.resetFields();
};

// 分页处理
const handleSizeChange = (size: number) => {
  paginationConfig.value.pageSize = size;
  getPostList();
};

const handleCurrentChange = (page: number) => {
  paginationConfig.value.current = page;
  getPostList();
};

// 标签验证
const validateTag = (tag: string) => {
  if (tag.length > 10) {
    return "标签长度不能超过 10 个字符";
  }
  return true;
};

// 取消删除
const cancelEvent = () => {
  ElMessage.success("取消删除成功");
};

// 显示添加对话框
const showAddDialog = () => {
  addDialogVisible.value = true;
};

// 初始化加载帖子列表
onMounted(() => {
  getPostList();
});
</script>

<style scoped>
.post-admin {
  padding: 20px;
}
</style>
