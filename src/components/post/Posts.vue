<template>
  <div>
    <!-- <div v-for="post in posts" :key="post._id" @click="inPostClick(post)"> -->
          <div v-for="post in posts" :key="post._id" >

      <my-post
        :image="'http://localhost:3000/static/' + post._id + '.PNG'"
        :name="post.text"
        :id="post._id"
        :commentsArr="post.comments"
        :likeNumber="post.likes.length"
        :likesArr="post.likes"
        :owner="post.owner"
        :ownerName="post.owner.name"
        :date="post.date"
      >
      </my-post>
    </div>
  </div>
</template>

<script>
import Post from "./post";
// import { mapActions } from "vuex";
import * as types from "../../store/types";
// import axios from "axios";
import io from "socket.io-client";

global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;

export default {
  data: () => ({
    index: 0,
    // posts: [],
     socket: io("http://localhost:3000", {
        query: { token: localStorage.getItem("token") },
    })
  }),
  computed: {
    posts() {
      console.log("Posts.vue 1211", this.$store.getters.getPosts)
      return this.$store.getters.getPosts;
    },

    comments() {
      return ["aa", "bb"];
    },
  },
  created() {
    this.$store.dispatch(types.GET_FRIEND_POSTS, 0);

    this.socket.on('edit-post', (post) => {
      console.log('Post.vue esit post socket1111111', post)
    })
  },

  methods: {
    // inPostClick(post) {
    //   console.log("Posts.vue inPostClick", post);
    // },

    scroll() {
      let t = this;
      $(window).scroll(function () {
        if (
          $(window).scrollTop() + $(window).height() >
          $(document).height() - 100
        ) {
          console.log(" bottom!");
          t.index += 2;
          t.$store.dispatch(types.GET_FRIEND_POSTS, t.index);
        }
      });
    },
  },
  mounted() {
    this.scroll();
  },
  components: {
    "my-post": Post,
  },
beforeDestroy () {
 this.$router.go()
},
};
</script>

<style>
</style>
