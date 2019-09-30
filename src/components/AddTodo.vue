<template>
  <li class="todo-list__item">
    <form class="add-todo" @submit.prevent="submitHandler">
      <label class="add-todo__label">
        <textarea-autosize
          v-model.trim="taskText"
          class="add-todo__input"
          type="text"
          placeholder="| New Task"
          required
        />
      </label>
      <div class="add-todo__controls">
        <button class="btn add-todo__submit" type="submit">ADD</button>
        <button
          class="btn-cancel add-todo__cancel"
          type="button"
          @click.prevent="chancelHandler"
        >CANCEL</button>
      </div>
    </form>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    status: String
  },
  data() {
    return {
      taskText: ""
    };
  },
  methods: {
    ...mapActions(["createTask"]),
    chancelHandler() {
      this.$emit("statusChange", this.status);
      this.taskText = "";
    },
    submitHandler() {
      const task = {
        status: this.status,
        text: this.taskText,
        time: new Date(),
        id: this.$uuid.v1()
      };

      this.createTask(task);
      this.$emit("statusChange", this.status);
      this.taskText = "";
    }
  }
};
</script>

<style lang="scss">
.add-todo {
  &__label {
    width: 100%;
    display: block;
    margin-bottom: 10px;
  }

  &__input {
    resize: none;
    background-color: transparent;
    padding: 10px 7px;
    font-size: 0.8rem;
    border: 0;
    display: block;
    width: 100%;
    color: #ccc;
    min-height: 35px;
    border-radius: 7px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &__submit {
    margin-right: 25px;
  }
}

.btn {
  border: 0;
  display: inline-block;
  vertical-align: top;
  padding: 15px 20px;
  font-size: 0.6rem;
  text-transform: uppercase;
  text-decoration: none;
  background-color: #589df3;
  border-radius: 5px;
  color: #fff;
  font-weight: 700;
  cursor: pointer;

  &:hover,
  &:focus {
    box-shadow: 0 -2px 25px rgba(0, 0, 0, 0.1);
    background-color: #3c8aeb;
  }
}

.btn-cancel {
  border: 0;
  font-weight: 700;
  font-size: 0.6rem;
  background-color: transparent;
  color: #999;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: none;
    color: #fff;
  }
}
</style>
