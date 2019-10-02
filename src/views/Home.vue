<template>
  <div class="container">
    <div class="types">
      <article class="types__item">
        <header class="types__header">
          <h2 class="types__name">ToDo List</h2>
          <button
            class="btn-bordered types__btn"
            type="button"
            @click.prevent="addNewTask('open')"
          >New Task</button>
        </header>
        <div class="types__content">
          <ul class="todo-list">
            <transition name="fade">
              <add-todo v-show="formtType.open" :status="'open'" @statusChange="statusChange" />
            </transition>
            <transition name="fade-out">
              <li v-show="!openTasks.length && !formtType.open" class="todo-list__item">
                <span class="todo-list__empty">No tasks yet</span>
              </li>
            </transition>
            <li class="todo-list__dragzone">
              <draggable
                :oepnTasks="openTasks"
                group="tasks"
                tag="ul"
                class="todo-list__inner"
                data-status="open"
                @end="editStatus"
              >
                <todo-item
                  v-for="item in openTasks"
                  :key="item.id"
                  :todo="item"
                  :data-id="item.id"
                />
              </draggable>
            </li>
          </ul>
        </div>
      </article>

      <article class="types__item">
        <header class="types__header">
          <h2 class="types__name">In Work</h2>
          <button
            class="btn-bordered types__btn"
            type="button"
            @click.prevent="addNewTask('progress')"
          >New Task</button>
        </header>
        <div class="types__content">
          <ul class="todo-list">
            <transition name="fade">
              <add-todo
                v-show="formtType.progress"
                :status="'progress'"
                @statusChange="statusChange"
              />
            </transition>
            <transition name="fade-out">
              <li v-show="!progressTasks.length && !formtType.progress" class="todo-list__item">
                <span class="todo-list__empty">No tasks in work</span>
              </li>
            </transition>
            <li class="todo-list__dragzone">
              <draggable
                :progressTasks="progressTasks"
                group="tasks"
                tag="ul"
                class="todo-list__inner"
                data-status="progress"
                @end="editStatus"
              >
                <todo-item
                  v-for="item in progressTasks"
                  :key="item.id"
                  :todo="item"
                  :data-id="item.id"
                />
              </draggable>
            </li>
          </ul>
        </div>
      </article>

      <article class="types__item">
        <header class="types__header">
          <h2 class="types__name">Done</h2>
          <button
            class="btn-bordered types__btn"
            type="button"
            @click.prevent="addNewTask('complete')"
          >New Task</button>
        </header>
        <div class="types__content">
          <ul class="todo-list">
            <transition name="fade">
              <add-todo
                v-show="formtType.complete"
                :status="'complete'"
                @statusChange="statusChange"
              />
            </transition>
            <transition name="fade-out">
              <li v-show="!completeTasks.length && !formtType.complete" class="todo-list__item">
                <span class="todo-list__empty">No tasks in done</span>
              </li>
            </transition>
            <li class="todo-list__dragzone">
              <draggable
                :progressTasks="completeTasks"
                group="tasks"
                tag="ul"
                class="todo-list__inner"
                data-status="complete"
                @end="editStatus"
              >
                <todo-item
                  v-for="item in completeTasks"
                  :key="item.id"
                  :todo="item"
                  :data-id="item.id"
                />
              </draggable>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import AddTodo from "../components/AddTodo";
import TodoItem from "../components/TodoItem";
import draggable from "vuedraggable";
import { mapState, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      formtType: {
        open: false,
        progress: false,
        complete: false
      }
    };
  },
  components: {
    AddTodo,
    TodoItem,
    draggable
  },
  methods: {
    ...mapActions(["updateTask"]),
    addNewTask(message) {
      this.formtType[message] = !this.formtType[message];
    },
    statusChange(message) {
      this.formtType[message] = false;
    },
    editStatus(evt) {
      const edited = {
        id: evt.item.dataset.id,
        status: evt.to.dataset.status
      };
      this.updateTask(edited);
    }
  },
  computed: {
    ...mapState({
      tasks: state => state.tasks
    }),
    openTasks() {
      return this.tasks.filter(task => task.status === "open");
    },
    progressTasks() {
      return this.tasks.filter(task => task.status === "progress");
    },
    completeTasks() {
      return this.tasks.filter(task => task.status === "complete");
    }
  }
};
</script>

<style lang="scss">
.types {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }

  &__item {
    background-color: #444;
    border-radius: 5px;
    box-shadow: 0 -2px 25px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  }

  &__header {
    padding: 25px 15px;
    border-bottom: 1px solid #666;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    color: #eee;
  }

  &__name {
    font-size: 1.2rem;
    margin: 0;
    margin-right: 15px;
  }

  &__content {
    padding: 30px 15px;
    flex-grow: 1;
  }
}

.todo-list {
  padding: 0;
  margin: 0;
  list-style: none;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__item {
    border: 1px solid #666;
    border-radius: 7px;
    padding: 20px 15px;
    margin-bottom: 10px;
  }

  &__inner {
    padding: 0;
    margin: 0;
    list-style: none;
    height: 100%;
  }

  &__dragzone {
    height: 100%;
  }

  &__empty {
    font-size: 0.9rem;
    color: #ccc;
  }
}

.btn-bordered {
  display: inline-block;
  vertical-align: top;
  padding: 15px 20px;
  color: #a0a0a0;
  font-weight: 700;
  border: 1px solid #a0a0a0;
  border-radius: 5px;
  background-color: transparent;
  font-size: 0.7rem;
  text-transform: uppercase;

  &:hover,
  &:focus {
    color: orange;
    border-color: orange;
    outline: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}

.fade-out-enter-active,
.fade-out-leave-active {
  transition: all 0.6s;
}
.fade-out-enter,
.fade-out-leave-to {
  opacity: 0;
  transform: translateY(40px);
}

.sortable-chosen {
  background-color: #589df3;
}
</style>
