<template>

    <template v-for="(item) in menu_list" :key="item.path">
        <el-menu-item v-if="((!item.children || item.children.length == 0) && (!item.meta.hidden)) || (item.itemFlag) " :index="item.path" @click="toRoute">
            <el-icon> <component :is="item.meta.icon"></component> </el-icon>
            <template #title class="el_row">
                    <span> {{ item.meta.title }} </span>
            </template>
        </el-menu-item>
        <el-sub-menu v-if="(item.children && item.children.length > 0) && !item.itemFlag &&  !item.meta.hidden" :index="item.path" @click="toRoute">
          
            <template #title class="el_row">
                <el-icon> <component :is="item.meta.icon" ></component> </el-icon>
                    <span v-show="!isCollapse"> {{ item.meta.title }} </span>
            </template>
            <Menu :menu_list="item.children"></Menu>
        </el-sub-menu>

    </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'; 

//接受父组件传值
defineProps(['menu_list','isCollapse']);
// console.log(menu_list);

let $router = useRouter();

const toRoute = (vc :any):void => {
    console.log(vc);
   if(vc && vc.index)
    $router.push(vc.index)
    
}



</script>

<script lang="ts">
export default {
    name: 'Menu',
}

</script>


<style scoped lang="scss">

.el_row {
    display: flex;
    align-items: center;
}

</style>