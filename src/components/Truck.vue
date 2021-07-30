<template>
  <div class="truck">
    <div class="image-container-home">
      <img src="../../public/images/home.png" alt="home" />
    </div>

    <div class="image-container-truck">
      <img src="../../public/images/truck.png" alt="truck" />
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

.truck {
  padding-bottom: 40px;
  width: 100%;
  position: relative;
  overflow: hidden;

  .image-container-home {
    margin: 0 auto;
    width: 10rem;

    img {
      width: 100%;
      object-fit: contain;
    }
  }

  .image-container-truck {
    width: 80px;
    position: absolute;
    left: 100%;
    bottom: 0px;
    animation: shake 0.6s steps(1) 0s infinite normal running,
      walk 10s linear 0s infinite normal running;

    img {
      width: 100%;
      object-fit: contain;
    }
  }
}

@keyframes shake {
  50% {
    bottom: 1px;
  }
}

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
</style>
