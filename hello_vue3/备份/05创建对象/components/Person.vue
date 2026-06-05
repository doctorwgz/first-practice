<template>
    <div class="person">
        <!-- <h2>姓名：{{ name }}</h2>
        <h2>年龄:{{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">查看联系方式</button>
        <hr> -->
        <!-- <h2>测试：{{ a }}</h2> -->
        <!-- <h2>数字：{{ a }}</h2> -->

        <h2>一辆{{ car.brand }}车,价值{{ car.price }}万</h2>
        <button @click="changePrice">修改汽车的价格</button>
        <br>
        <h2>游戏列表：</h2>
        <ul>
          <li v-for="g in games" :key="g.id">{{ g.name }}</li>
        </ul>
        <button @click="changeFirstName">修改游戏的名字</button>
    </div>
</template>


<!-- <script lang="ts">
 export default {
    // name: 'Person',          //组件名
    // data(vm) {
    //     return {
    //         name: '张三',
    //         age: 18,
    //         tel: '1234567890'
    //     }
    // },
    // methods: {
    //     showTel() {
    //         alert(this.tel)
    //     }   
    // }
    // }
</script> -->

<!-- <script lang="ts">
  export default {
    name: 'Person',
    // beforeCreate(){
    //     console.log('beforeCreate')
    // },
    // data() {
    //     return {
    //         a:100
    //     }
    // },
    setup(props, ctx) {
        //setup 函数中this是undefined
        //数据，原来是写在data中的，此时name、age、tel都不是响应式数据
        //数据
        let name = '张三'  //此时的name不是响应式数据
        let age = 18      //此时的age不是响应式数据
        let tel = '1234567890'

        //方法
        function changeName() {
            name = '王五'  //注意：这样修改name的值，不会触发视图更新
            console.log(name)  //打印name的值，但name不是响应式的
        }

        function changeAge() {
            age +=1  //注意：这样修改age的值，不会触发视图更新
            console.log(age)  //打印age的值，但age不是响应式的
        }

        function showTel() {
            alert(tel)
        }

        return {name,age,changeName,changeAge,showTel}

    }
  }

</script> -->

<!-- <script lang="ts">
  export default {
    name: 'Person',
  }
</script>

<script lang="ts" setup>
import { createAbstractBuilder } from 'typescript';

  let a = 100
</script> -->

<script lang="ts" setup name="Person">
  import { reactive } from 'vue'

     //数据
     let car = reactive({
        brand: '保时捷',
        price: 1000
     })

     let games= reactive([
      {id:123,name:'王者荣耀'},
      {id:456,name:'英雄联盟'},
      {id:789,name:'和平精英'}
     ])

     //方法
     function changePrice(){
      car.price +=10;
      console.log(car.price)
     }

     function changeFirstName(){
      if(games[0])
      games[0].name = '和平精英'
      // console.log(games.name)
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