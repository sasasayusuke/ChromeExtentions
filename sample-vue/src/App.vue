<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello from Vue in Chrome Extension!'
    }
  }
}
</script>

<style>
/* ここにCSSスタイルを追加 */
h1 {
  color: blue;
}
</style>
