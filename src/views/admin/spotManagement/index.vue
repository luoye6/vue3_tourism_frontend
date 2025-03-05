<template>
  <div class="spot-admin">
    <!-- 查询区域 -->
    <el-card style="margin-bottom: 10px">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="景点名称">
            <el-input
              v-model="queryParams.spotName"
              placeholder="请输入景点名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="景点坐标">
            <el-input
              v-model="queryParams.spotLocation"
              placeholder="请输入描述"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="标签">
            <el-input-tag
              v-model="queryParams.spotTagList"
              placeholder="请输入标签"
              :max="5"
              :validate="validateTag"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户ID">
            <el-input
              v-model="queryParams.adminId"
              placeholder="请输入管理员ID"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button @click="resetQuery">重置</el-button>
            <el-button type="primary" @click="getSpotList">查询</el-button>
            <el-button type="primary" @click="showAddDialog" :icon="Promotion">
              添加新景点
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <!-- 景点列表表格 -->
    <el-card>
      <el-table :data="spotList" style="width: 100%" :loading="loading">
        <el-table-column prop="id" label="景点ID" />
        <el-table-column prop="spotName" label="景点名称" />
        <el-table-column prop="spotLocation" label="景点坐标" />
        <el-table-column
          prop="spotDescription"
          label="景点介绍"
          width="200px"
          show-overflow-tooltip
        />
        <el-table-column prop="spotAvatar" label="景点封面图">
          <template #default="scope">
            <img
              :src="scope.row.spotAvatar"
              style="width: 36px; height: 36px"
            />
          </template>
        </el-table-column>
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
        <el-table-column prop="adminId" label="管理员ID" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column label="操作" width="200px">
          <template #default="{ row }">
            <el-button type="primary" @click="showEditDialog(row.id)"
              >修改
            </el-button>
            <el-popconfirm
              title="你确定要删除该景点吗？"
              @confirm="deleteSpot(row)"
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

    <!-- 修改景点的对话框 -->
    <el-dialog
      title="修改景点"
      v-model="editDialogVisible"
      width="50%"
      @close="resetEditField(editFormRef)"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="100px">
        <el-form-item label="景点名称" prop="spotName">
          <el-input v-model="editForm.spotName" />
        </el-form-item>
        <el-form-item label="景点坐标" prop="spotLocation">
          <el-input type="textarea" v-model="editForm.spotLocation" />
        </el-form-item>
        <el-form-item label="景点介绍" prop="spotDescription">
          <el-input type="textarea" v-model="editForm.spotDescription" />
        </el-form-item>
        <el-form-item label="景点封面图" prop="spotAvatar">
          <el-input
            type="textarea"
            v-model="editForm.spotAvatar"
            placeholder="请输入一个 HTTP 链接的图片"
          />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-input-tag
            v-model="editForm.spotTagList"
            placeholder="请输入标签"
            :max="5"
            :validate="validateTag"
          />
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <slot name="footer">
          <el-button @click="resetEditField(editFormRef)">取消</el-button>
          <el-button type="primary" @click="editSpot">确定</el-button>
        </slot>
      </span>
    </el-dialog>

    <!-- 添加景点的对话框 -->
    <el-dialog
      title="添加景点"
      v-model="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form :model="addForm" ref="addFormRef" label-width="100px">
        <el-form-item label="景点名称" prop="spotName">
          <el-input v-model="addForm.spotName" />
        </el-form-item>
        <el-form-item label="景点坐标" prop="spotLocation">
          <el-input type="textarea" v-model="addForm.spotLocation" />
        </el-form-item>
        <el-form-item label="景点介绍" prop="spotDescription">
          <el-input type="textarea" v-model="addForm.spotDescription" />
        </el-form-item>
        <el-form-item label="景点封面图" prop="spotAvatar">
          <el-input
            type="textarea"
            v-model="addForm.spotAvatar"
            placeholder="请输入一个 HTTP 链接的图片"
          />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-input-tag
            v-model="addForm.spotTagList"
            placeholder="请输入标签"
            :max="5"
            :validate="validateTag"
          />
        </el-form-item>
      </el-form>
      <span class="dialog-footer" style="margin-left: 100px">
        <slot name="footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addSpot">添加</el-button>
        </slot>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
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
  addSpotUsingPost,
  deleteSpotUsingPost,
  getSpotVoByIdUsingGet,
  listSpotByPageUsingPost,
  updateSpotUsingPost
} from "@/api/spotController";

// 查询参数
const queryParams = ref({
  spotName: "",
  spotLocation: "",
  spotTagList: [],
  adminId: ""
});

// 景点列表
const spotList = ref([]);
const loading = ref<boolean>(false);

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
  spotName: "",
  spotLocation: "",
  spotAvatar: "",
  spotTagList: [],
  spotDescription: ""
});

// 添加表单数据
const addForm = ref({
  spotName: "",
  spotLocation: "",
  spotAvatar: "",
  spotTagList: [],
  spotDescription: ""
});

// 获取景点列表
const getSpotList = async () => {
  loading.value = true;
  try {
    const res = await listSpotByPageUsingPost({
      ...queryParams.value,
      current: paginationConfig.value.current,
      pageSize: paginationConfig.value.pageSize
    });
    if (res.code === 200) {
      // 处理 tags 数据
      spotList.value = res.data.records.map((item) => {
        return {
          ...item,
          tags: JSON.parse(item.spotTags)
        };
      });
      paginationConfig.value.total = parseInt(res.data.total);
    } else {
      ElMessage.error("获取景点列表失败1");
    }
  } catch (error) {
    ElMessage.error("获取景点列表失败2");
  } finally {
    loading.value = false;
  }
};

// 重置查询条件
const resetQuery = () => {
  queryParams.value = {
    spotName: "",
    spotLocation: "",
    tags: [],
    adminId: ""
  };
  getSpotList();
};

// 显示修改对话框
const showEditDialog = async (id: number) => {
  loading.value = true;
  try {
    const res = await getSpotVoByIdUsingGet({ id });
    if (res.code === 200) {
      // 处理 tags 数据
      editForm.value = res.data;
      editDialogVisible.value = true;
    } else {
      ElMessage.error("获取景点信息失败");
    }
  } catch (error) {
    ElMessage.error("获取景点信息失败");
  } finally {
    loading.value = false;
  }
};

// 修改景点
const editSpot = async () => {
  try {
    const res = await updateSpotUsingPost({
      spotLocation: editForm.value.spotLocation,
      id: editForm.value.id,
      spotTagList: editForm.value.spotTagList,
      spotName: editForm.value.spotName
    });
    if (res.code === 200) {
      ElMessage.success("修改景点成功");
      editDialogVisible.value = false;
      await getSpotList();
    } else {
      ElMessage.error("修改景点失败");
    }
  } catch (error) {
    ElMessage.error("修改景点失败");
  }
};

// 添加景点
const addSpot = async () => {
  try {
    const res = await addSpotUsingPost(addForm.value);
    if (res.code === 200) {
      ElMessage.success("添加景点成功");
      addDialogVisible.value = false;
      await getSpotList();
    } else {
      ElMessage.error("添加景点失败");
    }
  } catch (error) {
    ElMessage.error("添加景点失败");
  }
};

// 删除景点
const deleteSpot = async (row) => {
  try {
    const res = await deleteSpotUsingPost({ id: row.id });
    if (res.code === 200) {
      ElMessage.success("删除景点成功");
      await getSpotList();
    } else {
      ElMessage.error("删除景点失败");
    }
  } catch (error) {
    ElMessage.error("删除景点失败");
  }
};

// 关闭添加对话框
const addDialogClosed = () => {
  addForm.value = { name: "", description: "", tags: [] };
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
  getSpotList();
};

const handleCurrentChange = (page: number) => {
  paginationConfig.value.current = page;
  getSpotList();
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

// 初始化加载景点列表
onMounted(() => {
  getSpotList();
});
</script>

<style scoped>
.spot-admin {
  padding: 20px;
}
</style>
