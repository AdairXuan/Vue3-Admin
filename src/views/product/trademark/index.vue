<template>
  <div>
    <el-card class="box-card">
      <!-- 添加品牌按钮 -->
      <el-button type="primary" size="default" icon="Plus" @click="addBrandBtn">
        添加品牌
      </el-button>
      <!-- Table组件 border：增加网格线 label：列名 align:列对其方式 -->
      <el-table border style="margin: 10px 0px" :data="brandList">
        <el-table-column
          label="序号"
          width="80"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称" align="center">
          <template #="{ row, $index }">
            <pre>{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO" align="center">
          <template #="{ row, $index }">
            <img
              :src="row.logoUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="EditBrandBtn"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="DelBrandBtn"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <!-- :current-page 设置分页当前页数 -->
      <!-- :page-size 设置每页展示数据条数 -->

      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-count="9"
        :page-sizes="[5, 10, 20, 50]"
        :small="false"
        :disabled="false"
        :background="true"
        layout=" prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @current-change="getHasTrademark"
        @size-change="SizeChange"
      />
    </el-card>

    <!-- 新增品牌对话框 -->
    <el-dialog v-model="addBrandVisible" title="添加品牌">
      <el-form>
        <el-form-item label="品牌名称" label-width="100px">
          <el-input type="text" placeholder="请输入您的品牌"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="primary" size="default" @click="CancelBtn">取消</el-button>
        <el-button type="primary" size="default" @click="ConfirmBtn">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHosTrademark } from '@/api/product/trademark'
import { TradeMarkResponseData, Records } from '@/api/product/trademark/type'

const addBrandVisible = ref<boolean>(false)
//当数据前页
const pageNo = ref<number>(1)
//当前每页多少行
const pageSize = ref<number>(5)
//总共多少行数据
const total = ref<number>(0)
//页面展示数据定义
const brandList = ref<Records>([])
//获取数据
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHosTrademark(
    pageNo.value,
    pageSize.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    brandList.value = result.data.records
  }
}
//挂在时获取数据
onMounted(() => {
  getHasTrademark()
})

// //当前页码发生变化时候出发
// const ChangePageNo = () => {
//   //当前页码发生变化时再次请求数据
//   getHasTrademark();
// }

//下拉菜单发生变化的时候出发
//分页器组件会将下拉菜单选中数据返回
const SizeChange = () => {
  //当前每页行数发生变化时，当前页码改为 1
  // pageNo.value = 1;
  getHasTrademark()
}

//Add BrandBtn
const addBrandBtn = () => {
  addBrandVisible.value = true
}

// Edit BrandBtn
const EditBrandBtn = () => {}

// Del Btn Click
const DelBrandBtn = () => {}

// Cancel Click
const CancelBtn = () => {
  addBrandVisible.value = false;
}

// Confirm Click
const ConfirmBtn = () => {
  addBrandVisible.value = false;
}



</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>