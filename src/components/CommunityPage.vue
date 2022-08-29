<template>
  <div class="container">
    <div class="content-field">
      <p>
        위에 써 많은 옥 이네들은 프랑시스 까닭입니다. 위에도 지나가는 가을로 같이 봅니다. 소학교 가을로 이제 있습니다. 그리워 릴케 하나에 어머니, 나는
        그리고 까닭입니다. 잔디가 옥 이름을 어머니 언덕 별 까닭입니다. 지나고 강아지, 이 릴케 벌써 내일 토끼, 소학교 그리워 버리었습니다. 이름과, 쉬이
        우는 내 어머니, 별들을 있습니다. 차 어머니, 이름자를 가을 릴케 이국 없이 계십니다. 풀이 했던 가슴속에 소학교 있습니다. 하나 이름과 추억과 위에
        버리었습니다.
      </p>
    </div>

    <div class="comment-field">
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
            :style="{ backgroundColor: comment.bgColor, marginLeft: comment.depth ? '4rem' : 0 }"
            @mouseover="onMouseOverComment(comment, i)"
            class="comment"
          >
            <dt>{{ comment.name }}</dt>
            <dd>{{ comment.message }}</dd>
          </div>
        </dl>
      </div>
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
}

.content-field {
  box-sizing: border-box;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border: 2px solid black;
  border-radius: 10px;
}

.comment-field {
  width: 100%;
  display: flex;
  justify-content: center;
}

.avatar-side {
  width: 100%;
}

.comment-side {
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
  top: 60px;
  width: 100%;
  overflow: hidden;
}
</style>
