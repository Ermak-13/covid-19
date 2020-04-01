<template>
  <div class="app">
    <nav class="nav app__nav">
      <ul class="nav__list">
        <li class="nav__item">
          <router-link
            class="nav__link"
            to="/">World</router-link>
        </li>
        <li class="nav__item">
          <router-link
            class="nav__link"
            to="/by-country">By Country</router-link>
        </li>
      </ul>
    </nav>

    <div class="app__content">
      <router-view v-if="$store.state.isReady" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',

  created () {
    this.$store.dispatch('loadCovid19Data')
  }
}
</script>

<style>
:root {
  --primary-color: #000000;
  --secodary-color: #ffffff;
  --accent-color: red;
}

html, body {
  height: 100%;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
}

.app {
  display: grid;
  grid-template-columns: 250px auto;
  height: 100%;

  background-color: var(--secodary-color);
  color: var(--primary-color);
}

.app__nav {
  background-color: var(--primary-color);
  color: var(--secodary-color);
  padding: 10px 0;
}

.app__content {
  padding: 25px;
}

.nav__list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.nav__link {
  display: inline-block;
  width: 100%;
  padding: 10px 20px;

  color: inherit;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  transition: color 0.5s ease;
}

.nav__link:hover {
  color: var(--accent-color);
}

.widget {
  padding: 15px;
  border: solid 1px var(--primary-color);
  background-color: var(--secondar-color);
  color: var(--primary-color);
}
</style>
