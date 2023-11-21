<template>
  <div>
    <div v-for="(item, index) in arr" :key="index">
      {{item}}
      <Child />
      <el-button @click="del(index)">删除</el-button>
    </div>
  </div>
</template>

<script>
import Child from './components/Child';
export default {
  name: 'TestPage',
  components: { Child },
  data () {
    return {
      arr: [1, 2, 3],
      arr1: [
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 3 },
      ],
      a: ''
    }
  },
  methods: {
    del (index) {
      this.arr.splice(index, 1);
    }
  }
}
</script>

<style>

</style>