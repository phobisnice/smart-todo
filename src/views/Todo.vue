<template>
  <div class="container">
    <div class="single-task">
      <div class="single-task__content">
        <p class="single-task__text">{{currentTask.text}}</p>
        <time class="single-task__time">{{currentTask.time | dateFilter}}</time>
      </div>
      <div class="single-task__controls"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentTask() {
      return this.$store.getters.getTaskById(this.$route.params.id);
    }
  }
};
</script>
