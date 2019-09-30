<template>
  <li class="todo-list__item">
    <p class="todo-list__text">{{todo.text}}</p>
    <div class="todo-list__footer">
      <router-link :to="'/todo/' +todo.id" class="todo-list__link">edit ></router-link>
      <time class="todo-list__time">{{todo.time | dateFilter}}</time>
    </div>
  </li>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: Object
  },
  computed: {
    timeFormat() {
      return new Date(this.todo.time).toLocaleDateString();
    }
  }
};
</script>

<style lang="scss">
.todo-list {
  color: #eee;

  &__footer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
  }

  &__text {
    font-size: 0.9rem;
    font-weight: 700;
    margin: 0 0 25px;
    text-align: left;
  }

  &__time {
    font-size: 0.9rem;
    color: #ccc;
    font-weight: 700;
    padding-left: 20px;
    position: relative;
    line-height: 1;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 14px;
      height: 14px;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url("../assets/clock.svg");
    }
  }

  &__link {
    border: 0;
    background-color: transparent;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.7rem;
    color: #ccc;
    letter-spacing: 0.5px;
    cursor: pointer;

    &:hover {
      color: orange;
    }
  }
}
</style>
