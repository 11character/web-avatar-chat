<template>
  <MainLayoutVue @styleChange="onStyleChange">
    <CommunityPageVue :chat-style="style"/>
  </MainLayoutVue>
</template>

<script>
import MainLayoutVue from '@/components/layout/MainLayout.vue';
import CommunityPageVue from '@/components/CommunityPage.vue';

export default {
  name: 'App',
  components: {
    MainLayoutVue,
    CommunityPageVue,
  },
  data() {
    return {
      style: 0,
    };
  },
  methods: {
    onStyleChange(val) {
      this.style = val;
    }
  }
};
</script>
