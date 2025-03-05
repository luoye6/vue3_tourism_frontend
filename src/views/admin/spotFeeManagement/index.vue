<template>
  <div class="spot-fee-admin">
    <!-- 查询区域 -->
    <el-card style="margin-bottom: 10px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="门票ID" label-width="80px">
            <el-input v-model="queryParams.id" placeholder="请输入门票ID" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="景点ID" label-width="80px">
            <el-input v-model="queryParams.spotId" placeholder="请输入景点ID" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="门票描述" label-width="80px">
            <el-input
              v-model="queryParams.spotFeeDescription"
              placeholder="请输入门票描述"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="管理员ID" label-width="80px">
            <el-input
              v-model="queryParams.adminId"
              placeholder="请输入管理员ID"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="门票状态" label-width="80px">
            <el-select
              v-model="queryParams.spotFeeStatus"
              placeholder="请选择门票状态"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button @click="resetQuery">重置</el-button>
            <el-button type="primary" @click="getSpotFeeList">查询</el-button>
            <el-button type="primary" @click="showAddDialog" :icon="Promotion">
              添加新门票
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <!-- 门票列表表格 -->
    <el-card>
      <el-table :data="spotFeeList" style="width: 100%" :loading="loading">
        <el-table-column prop="id" label="门票ID" />
        <el-table-column prop="spotId" label="景点ID" />
        <el-table-column prop="spotName" label="景点名称" />
        <el-table-column prop="spotFeeDescription" label="门票描述" />
        <el-table-column prop="spotFeeNumber" label="门票数量" />
        <el-table-column prop="spotFeePrice" label="门票价格" />
        <el-table-column prop="spotFeeStatus" label="门票状态">
          <template #default="{ row }">
            <el-tag :type="row.spotFeeStatus === 1 ? 'success' : 'danger'">
              {{ row.spotFeeStatus === 1 ? "启用" : "禁用" }}
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
              title="你确定要删除该门票吗？"
              @confirm="deleteSpotFee(row)"
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

    <!-- 修改门票的对话框 -->
    <el-dialog
      title="修改门票"
      v-model="editDialogVisible"
      width="50%"
      @close="resetEditField(editFormRef)"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="100px">
        <el-form-item label="门票描述" prop="spotFeeDescription">
          <el-input v-model="editForm.spotFeeDescription" />
        </el-form-item>
        <el-form-item
          label="门票数量"
          prop="spotFeeNumber"
          :rules="[
            { required: true, message: '门票数量必填' },
            { type: 'number', message: '门票数量必须是数字' }
          ]"
        >
          <el-input v-model="editForm.spotFeeNumber" />
        </el-form-item>
        <el-form-item
          label="门票价格"
          prop="spotFeePrice"
          :rules="[{ required: true, message: '门票价格必填' }]"
        >
          <el-input v-model="editForm.spotFeePrice" />
        </el-form-item>
        <el-form-item label="门票状态" prop="spotFeeStatus">
          <el-select
            v-model="editForm.spotFeeStatus"
            placeholder="请选择门票状态"
          >
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <slot name="footer">
          <el-button @click="resetEditField(editFormRef)">取消</el-button>
          <el-button type="primary" @click="editSpotFee">确定</el-button>
        </slot>
      </span>
    </el-dialog>

    <!-- 添加门票的对话框 -->
    <el-dialog
      title="添加门票"
      v-model="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form :model="addForm" ref="addFormRef" label-width="100px">
        <el-form-item label="景点ID" prop="spotId">
          <el-select v-model="addForm.spotId" placeholder="请选择景点">
            <el-option
              v-for="spot in spotList"
              :key="spot.id"
              :label="spot.spotName"
              :value="spot.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="门票描述" prop="spotFeeDescription">
          <el-input v-model="addForm.spotFeeDescription" />
        </el-form-item>
        <el-form-item
          label="门票数量"
          prop="spotFeeNumber"
          :rules="[
            { required: true, message: '门票数量必填' },
            { type: 'number', message: '门票数量必须是数字' }
          ]"
        >
          <el-input v-model.number="addForm.spotFeeNumber" />
        </el-form-item>
        <el-form-item
          label="门票价格"
          prop="spotFeePrice"
          :rules="[{ required: true, message: '门票数量必填' }]"
        >
          <el-input v-model="addForm.spotFeePrice" />
        </el-form-item>
        <el-form-item label="门票状态" prop="spotFeeStatus">
          <el-select
            v-model="addForm.spotFeeStatus"
            placeholder="请选择门票状态"
          >
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" style="margin-left: 100px">
        <slot name="footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addSpotFee">添加</el-button>
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
  ElOption,
  ElSelect,
  ElTag,
  FormInstance
} from "element-plus";
import { Promotion } from "@element-plus/icons-vue";
import {
  addSpotFeeUsingPost,
  deleteSpotFeeUsingPost,
  getSpotFeeVoByIdUsingGet,
  listSpotFeeVoByPageUsingPost,
  updateSpotFeeUsingPost
} from "@/api/spotFeeController";
import { listSpotByPageUsingPost } from "@/api/spotController"; // 引入获取景点列表的接口

// 查询参数
const queryParams = ref({
  id: undefined,
  spotId: undefined,
  spotFeeDescription: "",
  spotFeeStatus: undefined,
  adminId: undefined
});

// 门票列表
const spotFeeList = ref([]);
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
const editForm = ref();

// 添加表单数据
const addForm = ref({});

// 景点列表
const spotList = ref<{ id: number; spotName: string }[]>([]);

// 获取所有景点信息
const getAllSpots = async () => {
  try {
    const res = await listSpotByPageUsingPost({
      current: 1,
      pageSize: 1000 // 假设最多 1000 条景点数据
    });
    if (res.code === 200) {
      spotList.value = res.data.records.map((item) => ({
        id: item.id,
        spotName: item.spotName
      }));
    } else {
      ElMessage.error("获取景点列表失败");
    }
  } catch (error) {
    ElMessage.error("获取景点列表失败");
  }
};

// 获取门票列表
const getSpotFeeList = async () => {
  loading.value = true;
  try {
    const res = await listSpotFeeVoByPageUsingPost({
      ...queryParams.value,
      current: paginationConfig.value.current,
      pageSize: paginationConfig.value.pageSize
    });
    if (res.code === 200) {
      spotFeeList.value = res.data.records;
      paginationConfig.value.total = parseInt(res.data.total);
    } else {
      ElMessage.error("获取门票列表失败");
    }
  } catch (error) {
    ElMessage.error("获取门票列表失败");
  } finally {
    loading.value = false;
  }
};

// 重置查询条件
const resetQuery = () => {
  queryParams.value = {
    id: undefined,
    spotId: undefined,
    spotFeeDescription: "",
    spotFeeStatus: undefined,
    adminId: undefined
  };
  getSpotFeeList();
};

// 显示修改对话框
const showEditDialog = async (id: number) => {
  loading.value = true;
  try {
    const res = await getSpotFeeVoByIdUsingGet({ id });
    if (res.code === 200) {
      editForm.value = res.data;
      editDialogVisible.value = true;
    } else {
      ElMessage.error("获取门票信息失败");
    }
  } catch (error) {
    ElMessage.error("获取门票信息失败");
  } finally {
    loading.value = false;
  }
};

// 修改门票
const editSpotFee = async () => {
  try {
    const res = await updateSpotFeeUsingPost(editForm.value);
    if (res.code === 200) {
      ElMessage.success("修改门票成功");
      editDialogVisible.value = false;
      await getSpotFeeList();
    } else {
      ElMessage.error("修改门票失败");
    }
  } catch (error) {
    ElMessage.error("修改门票失败");
  }
};

// 添加门票
const addSpotFee = async () => {
  try {
    const res = await addSpotFeeUsingPost(addForm.value);
    if (res.code === 200) {
      ElMessage.success("添加门票成功");
      addDialogVisible.value = false;
      await getSpotFeeList();
    } else {
      ElMessage.error("添加门票失败");
    }
  } catch (error) {
    ElMessage.error("添加门票失败");
  }
};

// 删除门票
const deleteSpotFee = async (row) => {
  try {
    const res = await deleteSpotFeeUsingPost({ id: row.id });
    if (res.code === 200) {
      ElMessage.success("删除门票成功");
      await getSpotFeeList();
    } else {
      ElMessage.error("删除门票失败");
    }
  } catch (error) {
    ElMessage.error("删除门票失败");
  }
};

// 关闭添加对话框
const addDialogClosed = () => {
  addForm.value = {
    spotId: 0,
    spotFeeDescription: "",
    spotFeeNumber: 0,
    spotFeePrice: 0,
    spotFeeStatus: 0
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
  getSpotFeeList();
};

const handleCurrentChange = (page: number) => {
  paginationConfig.value.current = page;
  getSpotFeeList();
};

// 取消删除
const cancelEvent = () => {
  ElMessage.success("取消删除成功");
};

// 显示添加对话框
const showAddDialog = () => {
  addDialogVisible.value = true;
};

// 初始化加载门票列表和景点列表
onMounted(() => {
  getSpotFeeList();
  getAllSpots(); // 加载景点列表
});
</script>

<style scoped>
.spot-fee-admin {
  padding: 20px;
}
</style>
