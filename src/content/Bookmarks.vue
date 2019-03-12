<template>
  <div class="bookmarks">
    <img alt="Vue logo" src="/assets/logo.png">
    <h1>{{ title }}</h1>
    <label><input
      type="text"
      placeholder="Type to filter..."
      v-model="value"
      @input="load">
    </label>
    <ul>
      <li v-for="bookmark in bookmarks" :key="bookmark.id">
        <a :href="bookmark.url">{{ bookmark.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },

  data () {
    return {
      value: '',
      bookmarks: [
        { id: 1, title: 'No bookmarks...' }
      ]
    }
  },

  mounted () {
    this.load()
  },

  methods: {
    load () {
      console.log('Loading...')
      if (window.chrome.runtime.id) {
        const payload = {
          command: 'getBookmarks',
          value: this.value
        }
        chrome.runtime.sendMessage(null, payload, null, bookmarks => {
          this.bookmarks = bookmarks
        })
      }
    }
  }
}
</script>

<style scoped>
.bookmarks {
  width: 600px;
  margin: auto;
}

img {
  height: 300px;
}
</style>
