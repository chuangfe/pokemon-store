<template>
  <div class="self-truck position-relative overflow-hidden">
    <div class="self-image-container-home mx-auto">
      <img
        class="image-object-fit-width-contain"
        src="../../public/images/home.png"
        alt="home"
      />
    </div>

    <div class="self-image-container-truck">
      <img
        class="image-object-fit-width-contain"
        src="../../public/images/truck.png"
        alt="truck"
      />
    </div>
  </div>
</template>

<script>
// 卡車動畫組件, 登入頁面使用.

export default {
  name: "Truck",
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";
@import "../assets/style/mixin.scss";
@import "../assets/style/class.scss";

.self-truck {
  padding-bottom: 40px;

  .self-image-container-home {
    width: 10rem;
  }

  .self-image-container-truck {
    width: 80px;
    position: absolute;
    left: 100%;
    bottom: 0px;
    animation: shake 0.6s steps(1) 0s infinite normal running,
      walk 10s linear 0s infinite normal running;
  }
}

// 卡車上下移動.
@keyframes shake {
  50% {
    bottom: 1px;
  }
}

// 卡車從右到左.
@keyframes walk {
  0% {
    left: calc(100% + 80px);
  }
  40% {
    left: calc(50% - 64px);
  }
  60% {
    left: calc(50% - 64px);
  }
  100% {
    left: calc(0% - 80px);
  }
}

@media only screen and (min-width: $screen-width-md) {
  .self-truck {
    .self-image-container-truck {
      animation: shake 0.6s steps(1) 0s infinite normal running,
        walk 20s linear 0s infinite normal running;
    }
  }
}
</style>
