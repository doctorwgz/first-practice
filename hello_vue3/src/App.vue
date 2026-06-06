<template>
    //: 是 v-bind 的简写，用来告诉 Vue：引号里的内容不是普通字符串，而是 JavaScript 表达式/变量。
     <Person a="哈哈" :list = "personList"/>
</template>

<script lang="ts" setup name = "App">
  import Person from './components/Person.vue'
  import {reactive} from 'vue'
  import {type Persons} from '@/types'

  let personList= reactive<Persons>([
    {id:'1',name:'张三',age:18},
    {id:'2',name:'李四',age:19},
    {id:'3',name:'王五',age:20}
  ])

  console.log(personList)
</script>

