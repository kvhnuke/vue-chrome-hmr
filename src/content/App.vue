<template>
  <div id="app">
    <Bookmarks :title="title"/>
  </div>
</template>

<script>
import Bookmarks from './Bookmarks.vue'

export default {
  components: {
    Bookmarks
  },

  data () {
    return {
      title: 'Search bookmarks'
    }
  }
}
</script>

<style>
body {
  overflow-y: scroll;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px auto 30px;
}

h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}
</style>
