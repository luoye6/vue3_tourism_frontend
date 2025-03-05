<template>
  <div class="spot-route-admin">
    <!-- 查询区域 -->
    <el-card style="margin-bottom: 10px">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="路线描述">
            <el-input
              v-model="queryParams.spotRouteDescription"
              placeholder="请输入路线描述"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="管理员ID">
            <el-input
              v-model="queryParams.adminId"
              placeholder="请输入管理员ID"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="景点ID列表">
            <el-input-tag
              v-model="queryParams.spotIdList"
              placeholder="请输入标签"
              :max="5"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button @click="resetQuery">重置</el-button>
            <el-button type="primary" @click="getSpotRouteList">查询</el-button>
            <el-button type="primary" @click="showAddDialog" :icon="Promotion">
              添加新路线
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <!-- 景点路线列表表格 -->
    <el-card>
      <el-table :data="spotRouteList" style="width: 100%" :loading="loading">
        <el-table-column prop="id" label="路线ID" />
        <el-table-column prop="spotRouteDescription" label="路线描述" />
        <el-table-column
          prop="spotIdList"
          label="景点ID列表"
          width="200px"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <el-tag
              v-for="tag in row.spotIdList"
              :key="tag"
              style="margin-right: 5px"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="spotRouteAvatar" label="路线封面图">
          <template #default="scope">
            <img
              :src="scope.row.spotRouteAvatar"
              style="width: 36px; height: 36px"
            />
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
              title="你确定要删除该路线吗？"
              @confirm="deleteSpotRoute(row)"
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

    <!-- 修改路线的对话框 -->
    <el-dialog
      title="修改路线"
      v-model="editDialogVisible"
      width="50%"
      @close="resetEditField(editFormRef)"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="100px">
        <el-form-item label="路线描述" prop="spotRouteDescription">
          <el-input v-model="editForm.spotRouteDescription" />
        </el-form-item>
        <el-form-item label="景点ID列表" prop="spotIds">
          <el-input-tag
            v-model="editForm.spotIdList"
            placeholder="请输入景点ID"
            :max="5"
          />
        </el-form-item>
        <el-form-item label="路线封面图" prop="spotRouteAvatar">
          <el-input
            v-model="editForm.spotRouteAvatar"
            placeholder="请输入一个 HTTP 链接的图片"
          />
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <slot name="footer">
          <el-button @click="resetEditField(editFormRef)">取消</el-button>
          <el-button type="primary" @click="editSpotRoute">确定</el-button>
        </slot>
      </span>
    </el-dialog>

    <!-- 添加路线的对话框 -->
    <el-dialog
      title="添加路线"
      v-model="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form :model="addForm" ref="addFormRef" label-width="100px">
        <el-form-item label="路线描述" prop="spotRouteDescription">
          <el-input v-model="addForm.spotRouteDescription" />
        </el-form-item>
        <el-form-item label="景点ID列表" prop="spotIds">
          <el-input-tag
            v-model="addForm.spotIdList"
            placeholder="请输入景点ID"
            :max="5"
          />
        </el-form-item>
        <el-form-item label="路线封面图" prop="spotRouteAvatar">
          <el-input
            v-model="addForm.spotRouteAvatar"
            placeholder="请输入一个 HTTP 链接的图片"
          />
        </el-form-item>
      </el-form>
      <span class="dialog-footer" style="margin-left: 100px">
        <slot name="footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addSpotRoute">添加</el-button>
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
  addSpotRouteUsingPost,
  deleteSpotRouteUsingPost,
  getSpotRouteVoByIdUsingGet,
  listSpotRouteVoByPageUsingPost,
  updateSpotRouteUsingPost
} from "@/api/spotRouteController";

// 查询参数
const queryParams = ref({
  spotRouteDescription: "",
  adminId: "",
  spotIdList: []
});

// 景点路线列表
const spotRouteList = ref([]);
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
  spotRouteDescription: "",
  spotIdList: [],
  spotRouteAvatar: ""
});

// 添加表单数据
const addForm = ref({
  spotRouteDescription: "",
  spotIdList: [],
  spotRouteAvatar: ""
});

// 获取景点路线列表
const getSpotRouteList = async () => {
  loading.value = true;
  try {
    const res = await listSpotRouteVoByPageUsingPost({
      ...queryParams.value,
      current: paginationConfig.value.current,
      pageSize: paginationConfig.value.pageSize
    });
    if (res.code === 200) {
      spotRouteList.value = res.data.records;
      paginationConfig.value.total = parseInt(res.data.total);
    } else {
      ElMessage.error("获取景点路线列表失败");
    }
  } catch (error) {
    ElMessage.error("获取景点路线列表失败");
  } finally {
    loading.value = false;
  }
};

// 重置查询条件
const resetQuery = () => {
  queryParams.value = {
    spotRouteDescription: "",
    adminId: "",
    spotIds: ""
  };
  getSpotRouteList();
};

// 显示修改对话框
const showEditDialog = async (id: number) => {
  loading.value = true;
  try {
    const res = await getSpotRouteVoByIdUsingGet({ id });
    if (res.code === 200) {
      editForm.value = res.data;
      editDialogVisible.value = true;
    } else {
      ElMessage.error("获取路线信息失败");
    }
  } catch (error) {
    ElMessage.error("获取路线信息失败");
  } finally {
    loading.value = false;
  }
};

// 修改景点路线
const editSpotRoute = async () => {
  try {
    const res = await updateSpotRouteUsingPost(editForm.value);
    if (res.code === 200) {
      ElMessage.success("修改路线成功");
      editDialogVisible.value = false;
      await getSpotRouteList();
    } else {
      ElMessage.error("修改路线失败");
    }
  } catch (error) {
    ElMessage.error("修改路线失败");
  }
};

// 添加景点路线
const addSpotRoute = async () => {
  try {
    const res = await addSpotRouteUsingPost(addForm.value);
    if (res.code === 200) {
      ElMessage.success("添加路线成功");
      addDialogVisible.value = false;
      await getSpotRouteList();
    } else {
      ElMessage.error("添加路线失败");
    }
  } catch (error) {
    ElMessage.error("添加路线失败");
  }
};

// 删除景点路线
const deleteSpotRoute = async (row) => {
  try {
    const res = await deleteSpotRouteUsingPost({ id: row.id });
    if (res.code === 200) {
      ElMessage.success("删除路线成功");
      await getSpotRouteList();
    } else {
      ElMessage.error("删除路线失败");
    }
  } catch (error) {
    ElMessage.error("删除路线失败");
  }
};

// 关闭添加对话框
const addDialogClosed = () => {
  addForm.value = {
    spotRouteDescription: "",
    spotIds: "",
    spotRouteAvatar: ""
  };
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
  getSpotRouteList();
};

const handleCurrentChange = (page: number) => {
  paginationConfig.value.current = page;
  getSpotRouteList();
};

// 取消删除
const cancelEvent = () => {
  ElMessage.success("取消删除成功");
};

// 显示添加对话框
const showAddDialog = () => {
  addDialogVisible.value = true;
};

// 初始化加载景点路线列表
onMounted(() => {
  getSpotRouteList();
});
</script>

<style scoped>
.spot-route-admin {
  padding: 20px;
}
</style>
