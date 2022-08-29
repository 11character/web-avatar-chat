<template>
  <header class="header">
    <label>
      <input v-model="style" type="radio" name="chatStyle" value="0"/>
      <span>일반</span>
    </label>

    <label>
      <input v-model="style" type="radio" name="chatStyle" value="1"/>
      <span>댓글뷰어1</span>
    </label>

    <label>
      <input v-model="style" type="radio" name="chatStyle" value="2"/>
      <span>댓글뷰어2</span>
    </label>
  </header>
  <div class="body">
    <slot></slot>
  </div>
  <footer class="footer">

  </footer>
</template>

<script>
export default {
  name: 'MainLayout',
  emits: ['styleChange'],
  data() {
    return {
      style: 0,
    };
  },
  watch: {
    style(val) {
      this.$emit('styleChange', parseInt(val, 10));
    }
  }
}
</script>

<style scoped>
  .header {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    background-color: antiquewhite;
    padding: 1rem;
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header > label {
    margin-right: 2rem;
  }
</style>