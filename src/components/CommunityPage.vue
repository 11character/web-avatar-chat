<template>
  <div class="container">
    <div v-if="chatStyle != 0" class="avatar-side">
      <div class="sticky-field">
        <AvatarFieldVue :comment="selectComment" :chat-style="chatStyle" @click-avatar="onClickAvatar" />
      </div>
    </div>

    <div v-if="chatStyle != 2" class="comment-side">
      <dl>
        <div
          v-for="(comment, i) in list"
          :key="i"
          :style="{ backgroundColor: comment.bgColor }"
          @mouseover="onMouseOverComment(comment, i)"
          class="comment"
        >
          <dt>{{ comment.name }}</dt>
          <dd>{{ comment.message }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
import CommentGenerator from '@/class/CommentGenerator';

import AvatarFieldVue from '@/components/AvatarField.vue';

export default {
  name: 'CommunityPage',
  components: {
    AvatarFieldVue,
  },
  props: {
    chatStyle: { type: Number, default: 0 },
  },
  data() {
    // 사용자 정보
    const randomList = CommentGenerator.getList(100);

    return {
      list: randomList,
      selectComment: randomList[0],
      selectIndex: 0,
    };
  },
  methods: {
    onMouseOverComment(comment, index) {
      if (this.selectComment != comment) {
        this.selectComment = comment;
        this.selectIndex = index;
      }
    },
    onClickAvatar() {
      const i = this.selectIndex;

      if (i < this.list.length - 1) {
        this.selectIndex++;
      } else {
        this.selectIndex = 0;
      }

      this.selectComment = this.list[this.selectIndex];
    },
  },
};
</script>

<style scoped>
.container {
  width: 70%;
  margin: 0 auto;
  padding-top: 1rem;
  display: flex;
  justify-content: center;
}

.comment-side {
  width: 100%;
}

.avatar-side {
  width: 100%;
}

.comment-side > dl {
  margin: 0;
}

.comment {
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
}

.comment:first-child {
  margin-top: 0;
}

.comment > dd {
  text-align: center;
  padding: 0.5rem 0;
  word-break: break-all;
}

.sticky-field {
  position: -webkit-sticky;
  position: sticky;
  top: 10vh;
  width: 100%;
  overflow: hidden;
}
</style>
