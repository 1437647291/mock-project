<template>
  <div>
    <div>{{value}}</div>
    <el-button @click="addNum">+1</el-button>
    <Child :value="childValue" :addBrotherNum="addBrotherNum" />
  </div>
</template>

<script>
import Child from './components/Child';
export default {
  name: 'TestPage',
  components: { Child },
  data () {
    return {
      childValue: 0,
      value: 0
    }
  },
  methods: {
    addBrotherNum () {
      this.childValue += 1;
    },
    addNum () {
      this.value += 1;
    }
  }
}
</script>

<style>

</style>