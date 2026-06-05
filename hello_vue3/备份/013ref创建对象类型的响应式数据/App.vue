<template>
    <!-- html -->
     <!-- <div class="app">
        <h1>i love you</h1>
        <Person></Person>
     </div> -->
     <Person/>
</template>

<script lang="ts">
import Person from './components/Person.vue'
//JS或TS
export default {
    name: 'App',//组件名
    components: { Person },//注册组件
}
</script>

<!-- <style>
/* 样式 */
.app{
    background-color: red;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}
</style> -->