<template>
  <div v-if="comment && isShow" :style="{ backgroundColor: bgColor }" class="field">
    <div v-if="comment.depth > 0">
      <div @mousedown="onMouseDownAvatar" class="show-animation-multi">
        <div class="show-animation-multi-sub slidein-right">
          <img :src="comment.targetComment.imgUrl" />
        </div>

        <div class="show-animation-multi-sub slidein-left-half">
          <img :src="comment.imgUrl" />
        </div>
      </div>

      <div v-if="chatStyle == 2" class="speech-bubble">
        {{ speech }}
      </div>
    </div>

    <div v-else>
      <div @mousedown="onMouseDownAvatar" class="show-animation-single slidein-right">
        <img :src="comment.imgUrl" />
      </div>

      <div v-if="chatStyle == 2" class="speech-bubble">
        {{ speech }}
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '@/class/Comment';

export default {
  name: 'AvatarField',
  props: {
    chatStyle: { type: Number, default: 0 },
    comment: { type: Comment, default: null },
  },
  emits: ['click-avatar'],
  data() {
    return {
      speech: '',
      bgColor: '#ffffff',
      isShow: false,
      isShowTimeout: null,
    };
  },
  watch: {
    comment(nVal) {
      this.onChangeComment(nVal);
    },
  },
  mounted() {
    this.onChangeComment(this.comment, null);
  },
  methods: {
    onChangeComment(nVal) {
      clearTimeout(this.isShowTimeout);

      this.isShow = false;

      if (nVal) {
        this.bgColor = nVal.targetComment.bgColor;
        this.speech = this.comment.message;
      } else {
        this.bgColor = null;
        this.$refs.img.src = null;
      }

      this.isShowTimeout = setTimeout(() => {
        this.isShow = true;
      }, 1);
    },
    onMouseDownAvatar() {
      this.$emit('click-avatar');
    },
  },
};
</script>

<style scoped>
@keyframes slidein-right {
  from {
    left: -100%;
  }

  to {
    left: 0;
  }
}

@keyframes slidein-left-half {
  from {
    left: 100%;
  }

  to {
    left: 50%;
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.field {
  box-sizing: border-box;
  width: 100%;
  height: 60vh;
  padding: 1rem;
  overflow: hidden;
}

.field > div {
  width: 100%;
  height: 100%;
  position: relative;
}

.show-animation-single {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
}

.show-animation-multi {
  width: 100%;
  height: 100%;
}

.show-animation-multi-sub {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  left:0;
}

.show-animation-multi-sub:last-child {
  left: 50%;
}

.show-animation-multi-sub:last-child img {
  transform: scaleX(-1);
}

.speech-bubble {
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  padding: 0.5rem 1rem;
  overflow-y: auto;

  border: 5px solid black;
  border-radius: 5px;
  background-color: white;

  position: absolute;
  left: 0;
  bottom: 0;

  word-break: break-all;
  font-weight: bold;
}

.slidein-right {
  animation-duration: 0.3s;
  animation-name: slidein-right;
}

.slidein-left-half {
  animation-duration: 0.3s;
  animation-name: slidein-left-half;
}
</style>
