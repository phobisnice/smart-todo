<template>
  <div class="container">
    <div class="single-task">
      <div class="single-task__header">
        <span
          class="single-task__status"
          :class="`single-task__status--${currentTask.status}`"
        >Status: {{currentTask.status}}</span>
        <time class="single-task__time">{{currentTask.time | dateFilter}}</time>
      </div>
      <div class="single-task__content">
        <p v-if="!edit" class="single-task__text">{{currentTask.text}}</p>
        <form v-else @submit.prevent="editTask">
          <textarea-autosize
            class="single-task__input"
            type="text"
            :value="currentTask.text"
            ref="newTaskText"
            required
          />
          <v-select
            class="single-task__select"
            v-model="status"
            :options="options"
            placeholder="change status"
          >
            <template #search="{attributes, events}">
              <input class="vs__search" :required="!status" v-bind="attributes" v-on="events" />
            </template>
          </v-select>
          <div v-if="edit" class="single-task__controls">
            <button class="btn single-task__btn" type="submit">SAVE</button>
            <button class="btn-cancel" type="button" @click.prevent="editHandler">CANCEL</button>
          </div>
        </form>
      </div>
      <div v-if="!edit" class="single-task__controls">
        <button class="btn btn--edit" type="button" @click.prevent="editHandler">EDIT</button>
        <button class="btn btn--remove" type="button" @click.prevent="removeHandler">REMOVE</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      edit: false,
      status: "",
      options: ["open", "progress", "complete"]
    };
  },
  methods: {
    ...mapActions(["changeTask", "removeTask"]),
    editHandler() {
      this.edit = !this.edit;
      this.status = "";
    },
    editTask() {
      const editedTask = {
        status: this.status,
        text: this.$refs.newTaskText.$el.value,
        time: this.currentTask.time,
        id: this.$route.params.id
      };
      this.changeTask(editedTask);
      this.edit = false;
      this.status = "";
    },
    removeHandler() {
      this.removeTask(this.$route.params.id);
      this.$router.replace("/");
    }
  },
  computed: {
    currentTask() {
      return this.$store.getters.getTaskById(this.$route.params.id);
    }
  }
};
</script>

<style lang="scss">
.single-task {
  background-color: #444;
  border-radius: 5px;
  box-shadow: 0 -2px 25px rgba(0, 0, 0, 0.2);
  max-width: 900px;
  margin: 0 auto;

  &__header {
    padding: 20px;
    border-bottom: 1px solid #666;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    padding: 20px;
    text-align: left;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #f5f5f5;
  }

  &__controls {
    padding: 20px;
    border-top: 1px solid #666;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__btn {
    margin-right: 20px;
  }

  &__input {
    background-color: #e6e6e6;
    color: #666;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 0;
    font-size: 0.9rem;

    &:focus {
      background-color: #fff;
      outline: none;
    }
  }

  &__status {
    padding: 8px;
    text-transform: uppercase;
    font-size: 0.7rem;

    &--open {
      background-color: #46a546;
    }

    &--progress {
      background-color: #bf8e03;
    }

    &--complete {
      background-color: #737373;
    }
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
}

.single-task__select .vs__search::placeholder,
.single-task__select .vs__dropdown-toggle,
.single-task__select .vs__dropdown-menu {
  background: #e6e6e6;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}

.single-task__select .vs__clear,
.single-task__select .vs__open-indicator {
  fill: #394066;
}
</style>
