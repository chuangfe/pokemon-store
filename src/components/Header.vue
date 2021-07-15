<template>
  <header class="header">
    <router-link to="javascript:;">
      <img
        src="../../public/images/pokemon-store.png"
        alt="Pokemon Store"
        class="logo"
      />
    </router-link>

    <router-link to="javascript:;">
      <div class="meun"></div>
    </router-link>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {},
};
</script>

<style scoped lang="scss">
.header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: block;
  }
}

.logo {
  width: 180px;
}

.meun {
  width: 20px;
  height: 12px;
  box-sizing: border-box;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
  position: relative;

  &::before,
  &::after {
    display: block;
    content: "";
    position: absolute;
    left: 0px;
    top: 3px;
  }

  &::before {
    width: 100%;
    border-top: 2px solid #000;
  }

  &.close {
    border-top: none;
    border-bottom: none;
    transform: rotate(45deg);

    &::after {
      width: 100%;
      border-top: 2px solid #000;
      transform: rotate(90deg);
    }
  }
}
</style>
