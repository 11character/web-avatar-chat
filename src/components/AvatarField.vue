<template>
  <div v-if="comment" :style="{ backgroundColor: bgColor }" class="field">
    <div>
      <div
        :class="animationClass"
        @mousedown="onMouseDownAvatar"
        class="show-animation"
      >
        <img ref="img" />
      </div>

      <div v-if="chatStyle == 2" class="speech-bubble">
        {{ speech }}
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/class/Comment";

export default {
  name: "AvatarField",
  props: {
    chatStyle: { type: Number, default: 0 },
    comment: { type: Comment, default: null },
  },
  emits: ["click-avatar"],
  data() {
    return {
      speech: "",
      bgColor: "#ffffff",
      animationClass: {
        slidein: false,
      },
    };
  },
  watch: {
    comment(nVal, oVal) {
      this.onChangeComment(nVal, oVal);
    },
  },
  mounted() {
    this.onChangeComment(this.comment, null);
  },
  methods: {
    onChangeComment(nVal, oVal) {
      if (nVal && nVal != oVal) {
        this.animationClass.slidein = false;

        this.bgColor = nVal.bgColor;

        if (nVal.imgUrl) {
          this.$refs.img.onload = () => {
            setTimeout(() => {
              this.animationClass.slidein = true;
              this.speech = this.comment.message;
            }, 1);
          };

          this.$refs.img.src = nVal.imgUrl;
        }
      } else {
        this.bgColor = null;
        this.$refs.img.src = null;
      }
    },
    onMouseDownAvatar() {
      this.$emit("click-avatar");
    },
  },
};
</script>

<style scoped>
@keyframes slidein {
  from {
    left: -100%;
  }

  to {
    left: 0;
  }
}

.field {
  box-sizing: border-box;
  width: 100%;
  height: 90vh;
  padding: 1rem;
  overflow: hidden;
}

.field > div {
  width: 100%;
  height: 100%;
  position: relative;
}

.show-animation {
  visibility: hidden;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
}

.slidein {
  visibility: visible;
  animation-duration: 0.3s;
  animation-name: slidein;
}

.show-animation img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  right: 0;
  bottom: 100px;

  word-break: break-all;
  font-weight: bold;
}
</style>
