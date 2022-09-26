<template>
   <v-data-table
    :headers="dessertHeaders"
    :items="desserts"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="_id"
    show-expand
    class="elevation-1"
    :items-per-page="4"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>السجل  {{historyLength}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-switch
          v-model="singleExpand"
          label="Single expand"
          class="mt-2"
        ></v-switch> -->
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
       <v-expansion-panels>
          <v-expansion-panel>
          <v-expansion-panel-header>
          المالك
        </v-expansion-panel-header>
        <v-expansion-panel-content>
         <v-text-field
              label="الاسم"
              v-model="item.ownerName"
              readonly
            ></v-text-field>
            <v-text-field
              label="الجوال"
              type="number"
              readonly
               v-model="item.ownerMobile">
            </v-text-field>
        </v-expansion-panel-content>
         </v-expansion-panel>

          <v-expansion-panel>
          <v-expansion-panel-header>
          المستاجر
        </v-expansion-panel-header>
        <v-expansion-panel-content>
           <v-text-field
              label="الاسم"
              readonly
               v-model="item.tenantName"
            ></v-text-field>
            <v-text-field
              label="الجوال"
              readonly
               v-model="item.tenantMobile"
            ></v-text-field>
        </v-expansion-panel-content>
         </v-expansion-panel>
          <v-expansion-panel>
          <v-expansion-panel-header>
          التاريخ
        </v-expansion-panel-header>
        <v-expansion-panel-content>
           <v-text-field
              label="البدأ"
              readonly
              :value="hh(item.start)"
            ></v-text-field>
            <v-text-field
              label="النهاية"
              readonly
              :value="hh(item.expirayDate)"
            ></v-text-field>
        </v-expansion-panel-content>
         </v-expansion-panel>
      </v-expansion-panels>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';

export default {
 data () {
      return {
        expanded: [],
        singleExpand: true,
        size: 0,
        dessertHeaders: [
          {
            text: 'المكان',
            align: 'start',
            sortable: false,
            value: 'place',
          },
          
          { text: 'الموقع', value: 'location' },
          { text: 'الشقة', value: 'department' },
          { text: 'الطابق', value: 'floor' },
          { text: 'السعر', value: 'price' },
          { text: 'الأيام', value: 'days' },
          { text: 'ملاحظات', value: 'notes' },
        ],
        desserts: [],
        historyLength: 0
      }
    },
    methods: {
        hh(date) {
             let  dateObj = new Date(date);
                        let month = dateObj.getUTCMonth() + 1;
                        let day = dateObj.getUTCDate();
                        let year = dateObj.getUTCFullYear();

                     return year + "-" + month + "-" +  day ;
        },
       async getHistory() {
            let result = await axios.get("/booking/history", {
                headers: {
                authorization: localStorage.getItem("token"),
                },
            });
            
               if (! (result.data === true)) {
                    this.desserts.push( ...(result.data))
                    console.log('rrrrr',  this.desserts)
               }

        }
      
    },
    mounted() {
        var elements = document.getElementsByClassName("v-data-footer__icons-after");
        console.log('doccooc', elements)

        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', this.getHistory, false);
        }
    }, 
  async  created() {
          const token = localStorage.getItem('token');
          // const uri = "http://localhost:3000";
          const uri = "";
       
         let historyLength = await  axios.get(uri + '/booking/get-history-length',
          {headers: {authorization: token}});
          console.log('historyLength',historyLength)
          this.historyLength = historyLength.data;


         let aa = await  axios.get(uri + '/booking/reset-count',
          {headers: {authorization: token}});
          console.log('aaaaaaa', aa)

          let result = await axios.get("/booking/history", {
                headers: {
                authorization: localStorage.getItem("token"),
                },
            });
            
               if (!(result.data === true)) {
                    this.desserts = result.data
                console.log('rrrrr',  this.desserts)
               }

    },
    destroyed() {
        // console.log('ddddddddddd')
        // const token = localStorage.getItem('token');
        //   const uri = "http://localhost:3000";
        //   axios.get(uri + '/booking/reset-count',
        //   {headers: {authorization: token}});
    }
}
</script>

<style>

</style>