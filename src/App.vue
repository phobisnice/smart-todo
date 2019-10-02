<template>
  <div class="main-app" id="app">
    <header class="main-header">
      <div class="container">
        <nav class="main-nav">
          <router-link
            to="/"
            exact
            class="main-nav__link"
            active-class="main-nav__link--active"
          >SmartTodo</router-link>
        </nav>
      </div>
    </header>
    <main class="main-content">
      <router-view />
    </main>
    <footer class="main-footer">
      <div class="container">
        <p class="copyright">created by Gukov Alexey</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["init"])
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";

html {
  font-size: 16px;
  line-height: 1.2;

  @media (max-width: 991px) {
    font-size: 14px;
  }
}

html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

body {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #323232;
  color: #fff;
}

.main-app {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-gap: 20px;
}

.main-header,
.main-footer {
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.copyright {
  padding: 0;
  margin: 0;
  font-style: italic;
  color: #f5f5f5;
}

.main-nav__link {
  color: #fff;
  text-decoration: none;
  font-weight: 800;
  font-size: 2rem;

  &:hover {
    color: orange;
  }
}
</style>
