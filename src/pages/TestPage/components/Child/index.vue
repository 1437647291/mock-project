<template>
  <!-- <el-input v-model="a" /> -->
  <div>
    <div>child:{{value}}</div>
    <el-button @click="addBrotherNum">child+1</el-button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    value: { type: Number },
    addBrotherNum: { type: Function }
  },
  updated () {
    console.log('子组件更新了', this.value)
  },
}
</script>

<style>

</style>