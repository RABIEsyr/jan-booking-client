<template>
  <v-app style="height: 100%">
     <router-view v-if="!isClientAuth"></router-view>
    <div style="height: 100%" id="app" v-else >
    <v-card style="height: 100%">
      
      <v-navigation-drawer
       style="float: left"
        permanent
        expand-on-hover
        :width="200"
        
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img  src="@/assets/jan.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>
     

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Jan Salloom
              </v-list-item-title>
              <v-list-item-subtitle>business account</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
        <router-link to="/">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>حجز جديد</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/add-house">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-alert-circle-check-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>النشطة</v-list-item-title>
          </v-list-item>
        </router-link>
         <router-link to="/history">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-title>السجل</v-list-item-title>
          </v-list-item>
         </router-link>



         <v-dialog
        transition="dialog-top-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
           <v-list-item link  v-bind="attrs"
            v-on="on">
          <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>خروج</v-list-item-title>
          </v-list-item>
          

        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >مغادرة الموقع</v-toolbar>
            <v-card-text>
              <div style="justify-content: center">الى اللقاء</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-row>
                <v-col>
                  <v-btn
                  text
                  @click="dialog.value = false"
                  >الغاء</v-btn>
                </v-col>
                <v-col>
                  <v-btn
                  text
                  @click="logout()"
                  >خروج</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
         
        </v-list>
        
      </v-navigation-drawer>
     <router-view ></router-view>
    </v-card>
    
  </div>
  
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isClientAuth: false,
      l: false,
    }
  },
  created() {
     axios
      .get("/check-auth", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((data) => {
        console.log('datadatadata', data)
        this.isClientAuth = data.data.success;
      });

      window.onbeforeunload =  function(){
          const token = localStorage.getItem('token');
          const uri = "";
          axios.get(uri + '/booking/reset-count',
          {headers: {authorization: token}});
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
       this.$router.push('/')
    }
  }
}
</script>

<style>

</style>