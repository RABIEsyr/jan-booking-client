<template>
  <v-layout row wrap align-center>
    <v-flex xs12 sm10 md9 lg6 xlg6 offset-md2>
      <div>
        <v-card class="my-3" hover>
           <span style="margin-left: 50%; color:#1565C0"> {{ownerName}} </span>
           at 
           <span style="margin-left:auto;"> {{postDate(date)}}</span>
          <v-layout>
            <v-flex  xs12 offset-xs11 align-end>
               <v-menu
      transition="slide-y-transition"
      bottom
    >
           

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="purple"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          v-if="postOwner(owner)"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) in icons"
          :key="i"
        >
          <v-list-item-title><v-icon @click.prevent="editorRemove(i, id, name, owner)">{{item}}</v-icon>
          <v-divider></v-divider>
          
        </v-list-item-title>
          
        </v-list-item>
      </v-list>
      


      <!-- <v-btn
            bottom
            color="pink"
            dark
            fab
            fixed
            right
            @click="dialogDelete = !dialogDelete"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn> -->
    </v-menu>



  <v-dialog v-if="isEdit"
            scrollable
            v-model="dialogDelete"
            width="800px"
            style="color: red"
            content-class="vdialognew"
            persistent
          >
            <!-- plus button -->
            <v-card style="overflow-y: hidden !important" class="rounded-card">
              <v-card-title class="color dialog-custom darken-2">
                Create contact
              </v-card-title>
              <v-container fluid>
                <v-row class="mx-2">
                  <v-col class="align-center justify-space-between" cols="12">
                    <v-row align="center" class="mr-0">
                      <!-- <v-avatar size="40px" class="mx-3">
                        <img :src="pho" alt="" />
                      </v-avatar> -->
                      <v-text-field
                        placeholder="What is in your mind"
                        v-model="postText"
                      ></v-text-field>
                    </v-row>
                  </v-col>

                  <v-col cols="12">
                    <img class="post-image" id="output" />
                  </v-col>
                  <v-col cols="12">
                    <!-- <label for="upload-photo">Browse...</label> -->
                    <input
                    v-if="isEdit2"
                      type="file"
                      id="upload-photo"
                      @change="onFileSelected($event)"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <!-- <v-btn
              text
              color="primary"
            >More</v-btn> -->
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="dialogDelete = false"
                  >Cancel</v-btn
                >
                <v-btn text @click="EditPost(owner)">Edit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
            
        </v-flex>
          </v-layout>
          <v-img height="350px" :src="image" alt="no image"></v-img>
          <v-container fill-height fluid>
            <v-layout>
              <v-flex xs12 align-end d-flex>
                <span class="headline"> {{ name }} </span>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-text> 
            <v-row>
            <v-col cols="11">
               <v-icon :style="{color: likeColor}" @click="addRemoveLike({postID: id})">mdi-thumb-up</v-icon> 
            </v-col>
            <v-col cols="1">
              {{likeNumber}}
             
            </v-col>

            </v-row> 
           
          </v-card-text>
          <v-card-actions>
            <v-row style="padding: 10px">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Commnet
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">comment</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="leave comment"
                            required
                            v-model="comment"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="
                        addComment({ comment: comment, postID: id });
                        dialog = false;
                      "
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
            <!--  -->
            <v-spacer></v-spacer>
            <v-btn icon class="red--text">
              <v-icon small>fa-reddit</v-icon>
            </v-btn>
            <v-btn icon class="light-blue--text">
              <v-icon small>fa-twitter</v-icon>
            </v-btn>
            <v-btn icon class="blue--text text--darken-4">
              <v-icon small>fa-facebook</v-icon>
            </v-btn>
            <v-btn icon class="red--text">
              <v-icon small>fa-google-plus</v-icon>
            </v-btn>
            <v-btn icon class="blue--text text--darken-4">
              <v-icon small>fa-linkedin</v-icon>
            </v-btn>
            <v-spacer></v-spacer>

            <!-- <v-btn small replace color="info" href="'image.url'" target="_blank"
              >Read More</v-btn
            > -->
          </v-card-actions>

          <v-row align="center">
            <v-col cols="12">
              <div id="root">
                <v-card @click.prevent="showPosts" class="mx-auto">
                  <v-toolbar color="cyan" dark>
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>

                    <v-toolbar-title>Comments</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <!-- <v-btn icon>
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn> -->
                  </v-toolbar>

                  <v-list style="padding-bottom: 0" v-if="showHidePosts" three-line>
                    <template v-for="(item, index) in commentsArr">
                      <v-subheader
                        v-if="item.header"
                        :key="item.header"
                        v-text="item.header"
                      ></v-subheader>

                      <v-divider :key="index" :inset="item.inset"></v-divider>

                      <v-list-item :key="item.title">
                        <v-list-item-avatar>
                          <v-img
                          @click.prevent="onUserProfile(item.user)"
                            :src="
                              'http://localhost:3000/profile-image/' +
                              item.user +
                              '.PNG'"
                          ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-html="item.content"
                          ></v-list-item-title>
                         
                            {{item.date | date}}
                         
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-list>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import types from '../../store/types'
import io from "socket.io-client";

import * as Types from "../../store/types";

import {
    mdiPencil,
    mdiDelete,
} from '@mdi/js'
import moment from 'moment'

export default {
  // props: {
  //   id: String,
  //   name: String,
  //   image: String,
  //   commentsArr: Array,
  //   items: [],
  //   likeNumber: Number,
  //   likesArr: Array,
  //   owner: String,
  //   isEdit2: Boolean,
  //   ownerName: String
    // },
  
  props: [
    'id',
    'name',
    'image',
    'commentsArr',
    'items',
    'likeNumber',
    'likesArr',
    'owner',
    'isEdit2',
    'ownerName',
    'date'
  ],
  data() {
    return {
        icons: [
        mdiPencil,
        mdiDelete,
        ],
      dialog: false,
      dialogDelete: false,
      postText:"",
      isEdit: false,
      pho: "",
      comment: "",
      showHidePosts: false,
       socket: io("http://localhost:3000", {
        query: { token: localStorage.getItem("token") },
    }),
    likeColor: 'gray'
    };
  },

  computed: {
    ...mapGetters({
      // getCommentsGetter: Types.GET_COMMENTS,
    }),
    
  },
  methods: {
    ...mapActions({
      // addComment: Types.ADD_COMMENT,
      getCommets: Types.GET_COMMENTS,
     
    }),
    postOwner(owner) {
      return owner == localStorage.getItem('userID')
    },
     addComment(data) {
       this.socket.emit('new-comment', data)
          // console.log('App.vue addComment555', data)
      },
    showPosts() {
      this.showHidePosts = !this.showHidePosts;
      this.$store.getters.getPosts
    },
    addRemoveLike(postID) {
      this.likeColor = this.likeColor == 'gray' ? this.likeColor = 'blue': this.likeColor = 'gray'
      this.socket.emit('add-remove-like', postID)
    }, 
    EditPost(owner) {
      console.log('post.vue, owner', this.owner)
      this.socket.emit('edit-post', {text: this.postText, id: this.id, owner: owner})
      this.dialogDelete = false
    },
    editorRemove(index, id, text, owner) {
      if (index == 0) {
        this.dialogDelete = !this.dialogDelete
        this.isEdit = true
        this.postText = text
        console.log('name', text, 'owner _id', owner)
        
      }
      if (index == 1) {
        //console.log('post.vue delete', text, 'post id', id, 'owner', owner)
        this.socket.emit('delete-post', {postid: id, ownerid: owner})
      }
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      var output = document.getElementById("output");
      output.src = URL.createObjectURL(event.target.files[0]);
      this.isFileSelected = true;
      output.onload = function () {
        URL.revokeObjectURL(output.src);
      };
    },
    onUserProfile(id) {
      this.$router.push({
        name: 'userProfile',
        params: {id: id}
      })
    },
    postDate(date) {
      moment.locale(this.$i18n.locale)  
      return moment(date, "YYYYMMDD").fromNow()
     // return moment(date).format('llll')
    }
  },
 created() {
   
   for (let i = 0; i < this.likesArr.length; i++){
      console.log('post.vue craeter likesArr', this.likesArr[i])
      if (localStorage.getItem('userID') == this.likesArr[i].user) {
        this.likeColor = 'blue'
      }
   }  
   this.socket.on('new-comment-posted',  data => {
     this.$store.commit('addComment', data)
   })

  this.socket.on('add-like', like => {
    this.$store.commit('addLike', like)
  })

  this.socket.on('remove-like', like => {
    this.$store.commit('removeLike', like)
  })
 }
};
</script>

<style scoped>
.col-12 {
    flex: 0 0 100%;
    max-width: 100%;
    padding-bottom: 0 !important;
}
</style>