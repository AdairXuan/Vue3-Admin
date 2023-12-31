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
              @click="EditBrandBtn(row)"
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
    <el-dialog
      v-model="addBrandVisible"
      :title="trademarkParams.id ? '修改品牌' : '新增品牌'"
    >
      <el-form :model="trademarkParams" :rules="rules" ref="formRef" >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            type="text"
            placeholder="请输入您的品牌"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- action 上传图片地址 路径加上/api/代理服务器不发送这次post请求-->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="primary" size="default" @click="CancelBtn">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="ConfirmBtn">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  reqHosTrademark,
  reqAddOrUpdateTrademark,
} from '@/api/product/trademark'
import {
  TradeMarkResponseData,
  Records,
  TradeMark,
} from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

//定义边编辑页面数据对象
const trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
//获取el-form组件实例
const formRef = ref();

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
  trademarkParams.id = 0;
  trademarkParams.logoUrl = '';
  trademarkParams.tmName  = '';
  addBrandVisible.value = true
  formRef.value.clearValidate('logoUrl');
}

// Edit BrandBtn
const EditBrandBtn = (row: TradeMark) => {

  addBrandVisible.value = true;
  Object.assign(trademarkParams,row);
}

// Del Btn Click
const DelBrandBtn = () => {}

// Cancel Click
const CancelBtn = () => {
  addBrandVisible.value = false;
}

// Confirm Click
const ConfirmBtn = async () => {

  await  formRef.value.validate();

  let result: any = reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    addBrandVisible.value = false
    //弹出提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    getHasTrademark(trademarkParams.id?pageNo.value:1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件不能超过4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传格式务必PNG|JPG|GIF',
    })
    return false
  }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  // response:上传图片服务器返回的数据
  // uploadFile也是服务器返回数据，包含图片信息
  trademarkParams.logoUrl = response.data;
  formRef.value.clearValidate('logoUrl');
}

const validatorTmName = (rule:any, value:any, callBack:any) => {
  if(value.trim().length >= 2)
  {
    callBack();
  }else
  {
    callBack(new Error('品牌名称需要大于等于两位'))
  }
}

const validatorLogoUrl = (rule:any, value:any, callBack:any) => {
  if(value) {
    callBack();
  } else {
    callBack(new Error('请上传LOGO图片'))
  }
}

const rules = {
  tmName: [
  {
      //字段必须输入
      required: true,
      //何时校验
      trigger: 'blur',
      validator: validatorTmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      trigger: 'change',
      validator: validatorLogoUrl,
    }
  ]
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
