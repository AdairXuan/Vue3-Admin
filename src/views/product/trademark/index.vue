<template>
  <div>
    <el-card class="box-card">
      <!-- 添加品牌按钮 -->
      <el-button type="primary" size="default" icon="Plus">品牌</el-button>
      <!-- Table组件 border：增加网格线 label：列名 align:列对其方式 -->
      <el-table border style="margin: 10px 0px;" :data="brandList">
        <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
        <el-table-column label="品牌名称" align="center">
          <template #="{row,$index}">
            <pre>{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO" align="center">
          <template #="{row,$index}">
            <img :src="row.logoUrl" alt="" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #="{row,$index}">
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <!-- :current-page 设置分页当前页数 -->
      <!-- :page-size 设置每页展示数据条数 -->

      <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :small="false"
      :disabled="false"
      :background="true"
      layout=" prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHosTrademark } from '@/api/product/trademark'
import { TradeMarkResponseData,Records } from '@/api/product/trademark/type'

//当数据前页
const pageNo = ref<number>(1);
//当前每页多少行
const pageSize = ref<number>(5);
//总共多少行数据
const total = ref<number>(0);
//页面展示数据定义
const brandList = ref<Records>([]);
//获取数据
const getHasTrademark = async () => {
  let result: TradeMarkResponseData = await reqHosTrademark(pageNo.value, pageSize.value);
  if(result.code == 200)
  {
    total.value = result.data.total;
    brandList.value = result.data.records;
  }
}
//挂在时获取数据
onMounted(() => {

   getHasTrademark();
});



</script>
