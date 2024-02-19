<template>
  <div>
    <div>{{value}}</div>
    <el-button @click="addNum">+1</el-button>
  </div>
</template>

<script>

export default {
  name: 'TestPage',

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