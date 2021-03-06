<template>
  <div>
      <h1 class="headline">Vue.js Chat Box</h1>

<main id="ap">
  <section ref="chatArea" class="chat-area">
    <p v-for="message in messages" :key="message.body" class="message" :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }">
      {{ message.body }}
    </p>
  </section>

  <section class="chat-inputs">

    <form @submit.prevent="sendMessage()" id="person1-form">
      <label for="person1-input">Bob</label>
      <input v-model="bobMessage" id="person1-input" type="text" placeholder="Type your message">
      <button type="submit">Send</button>
    </form>
<!-- <button @click="clearAllMessages">Clear All</button> -->
    <!-- <form @submit.prevent="sendMessage('out')" id="person2-form">
      <label for="person2-input">You</label>
      <input v-model="youMessage" id="person2-input" type="text" placeholder="Type your message">
      <button type="submit">Send</button>
    </form> -->
  </section>
</main>
  </div>
</template>

<script>
import io from "socket.io-client";
import { mapActions, mapGetters } from "vuex";
import * as types from "../../store/types";

import axios from "axios";

export default {
    data() {
        return {
            socket: io("http://localhost:3000", {
             query: { token: localStorage.getItem("token") },
             }),
        bobMessage: '',
        youMessage: '',
        messages: [
        {
            body: 'Welcome to the chat, I\'m Bob!',
            author: 'bob'
        },
        {
            body: 'Thank you Bob',
            author: 'you'
        },
        {
            body: 'You\'re most welcome',
            author: 'bob'
        }
        ]
  }
},
methods: {
  //   sendMessage(direction) {
  //     if (!this.youMessage && !this.bobMessage) {
  //       return
  //     }
  //     if (direction === 'out') {
  //       this.messages.push({body: this.youMessage, author: 'you'})
  //       this.youMessage = ''
  //     } else if (direction === 'in') {
  //       this.messages.push({body: this.bobMessage, author: 'bob'})
  //       this.bobMessage = ''
  //     } else {
  //       alert('something went wrong')
  //     }
  //     this.nextTick(() => {
  //       let messageDisplay = this.$refs.chatArea
  //       messageDisplay.scrollTop = messageDisplay.scrollHeight
  //     })
  // },
    sendMessage() {
      // if (!this.youMessage && !this.bobMessage) {
      //   return
      // }
      // if (direction === 'out') {
      //   this.messages.push({body: this.youMessage, author: 'you'})
      //   this.youMessage = ''
      // } else if (direction === 'in') {
      //   this.messages.push({body: this.bobMessage, author: 'bob'})
      //   this.bobMessage = ''
      // } else {
      //   alert('something went wrong')
      // }
      this.messages.push({body: this.bobMessage, author: 'bob'})
      
      this.$store.dispatch('socketOnConnection', {msg: this.bobMessage, id: this.$route.params.receiverID})
      // this.nextTick(() => {
      //   let messageDisplay = this.$refs.chatArea
      //   messageDisplay.scrollTop = messageDisplay.scrollHeight
      // })
      this.$nextTick(() => {
     document.getElementsByClassName('chat-area')[0].scrollTop = '11111';                      
  }) 
  },
  ...mapActions({
    getChatMessage: types.GET_CHAT_MESSAGES
  })
},
computed: {
  ...mapGetters({
    getMessages: types.GET_CHAT_MESSAGES
  })
},
created() {
  // this.getChatMessage(this.$route.params.receiverID).then(() => {
  //   const msgs = this.getMessages;
  //   console.log('222', msgs)
  // })
  

      axios.get("http://localhost:3000/chat-message/" + this.$route.params.receiverID,
       {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        var msgs = res.data;
        msgs.map((m) => {
          if (m.from == localStorage.getItem('userID')) {
            console.log('0000', localStorage.getItem('userID'), '0000', m.from )
            this.messages.push({body: m.text, author: 'bob'})
            this.$nextTick(() => {
              document.getElementsByClassName('chat-area')[0].scrollTop = '11111';                      
              }) 
            return {
              body: m.text,
              author: 'bob'
            }
          } else {
             this.messages.push({body: m.text, author: 'you'})
            
           return {
              body: m.text,
              author: 'you'
            }
          }
        })
        console.log('33333', this.messages)
      })
  
  this.socket.on('msg', (msg) => {
    console.log('ChatOneToOne', msg)
    if (msg.senderId ==  this.$route.params.receiverID ) {
      this.messages.push({body: msg.msg, author: 'you'})
       this.$nextTick(() => {
              document.getElementsByClassName('chat-area')[0].scrollTop = '11111';                      
             }) 
    }
   
  })
},
destroyed() {
  console.log('destroyed')
 this.messages = []
 this.$store.dispatch(types.RESET_CHAT_MESSAGES)
}
}
</script>

<style scoped>
.headline {
  text-align: center;
  font-weight: 100;
  color: white;
}
.chat-area {
/*   border: 1px solid #ccc; */
  background: white;
  height: 50vh;
  padding: 1em;
  overflow: auto;
  max-width: 350px;
  margin: 0 auto 2em auto;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3)
}
.message {
  width: 45%;
  border-radius: 10px;
  padding: .5em;
/*   margin-bottom: .5em; */
  font-size: .8em;
}
.message-out {
  background: #407FFF;
  color: white;
  margin-left: 50%;
}
.message-in {
  background: #F1F0F0;
  color: black;
}
.chat-inputs {
  display: flex;
  justify-content: space-between;
}
#person1-input {
  padding: .5em;
}
#person2-input {
  padding: .5em;  
}

</style>