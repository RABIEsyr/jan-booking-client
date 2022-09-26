<template>
  <div>
    <v-app id="inspire">
      <v-app id="inspire">
        <v-main>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                  <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>تسجيل الدخول</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn icon large target="_blank" v-on="on">
                         
                        </v-btn>
                      </template>
                      <span>New Account</span>
                    </v-tooltip>
                  </v-toolbar>
                  <v-card-text>
                    
       
                      <v-text-field
                        id="password"
                        :label="'كلمة المرور'"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="password"
                      ></v-text-field>
                    
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      @click.prevent="login"
                      class="login-btn"
                      >Login</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        password: this.password,
      });
    },
    
  },
 
};
</script>

<style scoped>
.login-btn {
  margin-right: 50%;
  width: 100%;
}

.v-application a {
  margin-right: 40px;
  color: white;
}
</style>