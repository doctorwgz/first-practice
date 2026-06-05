<template>
    <div class="person">
        <h2>一辆{{ car.brand }}车,价值{{ car.price }}万</h2>
        <button @click="changePrice">修改汽车的价格</button>
        <br>
        <h2>当前sum值为：{{ sum }}</h2>
        <button @click="changeSum">点我sum+1</button>
    </div>
</template>


<script lang="ts" setup name="Person">
  import { ref } from 'vue'

     //数据
     let car = ref({
        brand: '保时捷',
        price: 100
     })
     let sum = ref(0)
     //方法
     function changePrice(){
      car.value.price +=10;
      console.log(car.value.price)
     }
     function changeSum(){
      sum.value +=1
     }

</script>

<style scoped>
     .person{
        background-color: aqua;
        box-shadow: 0 0 10px;
        border-radius:10px;
        padding: 10px;

    } 
</style>