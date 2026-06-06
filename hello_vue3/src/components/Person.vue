<template>
    <div class="person">
        <!-- <h2>{{ a }}</h2> -->
         <ul>
            <li v-for="item in list" :key="item.id">
                {{ item.name }}--{{ item.age }}
            </li>
         </ul>
    </div>
</template>


<script lang="ts" setup name="Person">
    import {defineProps} from 'vue'
    import {type Persons} from '@/types'

    //接收a
    defineProps(['list'])

    //接收list+限制类型
    defineProps<{list:Persons}

    //接收list+限制类型+限制必要性+指定默认值
    withDafault(defineProps<{list:Persons}>(),{
        list:()=>[{id:'001',name:'张三',age:18+}]
    })

</script>


<style scoped>
     .person{
        background-color: aqua;
        box-shadow: 0 0 10px;
        border-radius:10px;
        padding: 10px;

    } 
</style>