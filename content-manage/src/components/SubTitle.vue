<template>
  <p class="right-title"><slot></slot></p>
</template>

<style scoped lang="less">
.right-title {
  position: relative;
  font-size: 18px;
  text-indent: 12px;
  margin-top: 8px;

  &:before {
    position: absolute;
    border-radius: 24px;
    content: ' ';
    width: 6px;
    height: 16px;
    left: 0;
    top: 4px;
    background: blue;
  }
}
</style>
