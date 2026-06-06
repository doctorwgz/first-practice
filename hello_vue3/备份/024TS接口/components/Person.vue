<template>
    <div class="person">
        ???
    </div>
</template>


<script lang="ts" setup name="Person">
  import { type PersonInter,type Persons } from '@/types' 
//   let person = {id:123,name:'张三',age:18}
  
  let personList:Persons=[
    {id:'1',name:'张三',age:60},
    {id:'2',name:'李四',age:18},
    {id:'3',name:'王五',age:5}
  ]
</script>

<style scoped>
     .person{
        background-color: aqua;
        box-shadow: 0 0 10px;
        border-radius:10px;
        padding: 10px;

    } 
</style>