<template>
   <v-container fluid>
      <v-progress-circular
      v-if="loading"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>

    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="بحث"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="blue"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="blue"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.name }} 
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                >
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row
          class="mt-2"
          align="center"
          justify="center"
        >
          <span class="grey--text">عدد العناصر بالصفحة</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
          {{ numberOfPages }}  صفحة  {{ page }} من 
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            :style="{width: windowWidth < 300 ? '17px' : '56px',
                     height: windowWidth < 300 ? '17px' : '56px'}"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            :style="{width: windowWidth < 300 ? '17px' : '56px',
                     height: windowWidth < 300 ? '17px' : '56px'}"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
data () {
      return {
         windowWidth: window.innerWidth,
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: 'name',
        keys: [
          'المكان',
          'الموقع',
          'الشقة',
          'الطابق',
          'السعر',
          'المالك',
          'جوال المالك',
          'المستأجر',
          'جوال المستاجر',
          'تاريخ البدأ',
          'الأيام',
          'تاريخ النهاية',
          'ملاحظات'
        ],
        items: [],

        loading: false,
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
    },
    methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      getRemaingdays(start, days) {
         const currentDate = new Date();
         const year = currentDate.getUTCFullYear();
          const month =  currentDate.getUTCMonth() + 1;
          const day =  currentDate.getUTCDate();
        

         const current = new Date(year.toString() + '-' + month.toString() + '-' + day.toString())

        //  const oneDay = 24 * 60 * 60 * 1000;
        //  const firstDate = new Date(start.getUTCFullYear(),
        //  start.getUTCMonth() + 1, start.getUTCDate());

         if (current < ( new Date(start.getUTCFullYear() + '-' +
          (start.getUTCMonth() + 1) + '-' + start.getUTCDate()))) {
            return 'لم تبدأ بعد'
         }

         let expiryDate =   new Date();
         let startDay2 = new Date(start)
         let result = expiryDate.setDate(startDay2.getDate() + Number.parseInt(days));
        //  let expiryDateText = new Date(result)
        //  const secondDate = new Date(
        //     expiryDateText.getUTCFullYear(),
        //     expiryDateText.getUTCMonth() + 1,
        //     expiryDateText.getUTCDate());

          const fd = new Date();
          const sd = new Date(result);
          var Difference_In_Time = fd.getTime() - sd.getTime();
  
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        //  return 'باقي ' + Math.round(Math.abs((firstDate - secondDate) / oneDay)) + ' يوم ';

          Difference_In_Days = -Difference_In_Days;
        return 'باقي ' + Difference_In_Days + ' يوم ';

},
      isExpired(start, days) {
         let expiryDate =   new Date();
         let startDay2 = new Date(start)
         let result = expiryDate.setDate(startDay2.getDate() + days);
         expiryDate = new Date(result)
         const year0 = expiryDate.getUTCFullYear();
          const month0 =  expiryDate.getUTCMonth() + 1;
          const day0 =  expiryDate.getUTCDate();
         expiryDate = new Date(year0.toString() + '-' + month0.toString() + '-' + day0.toString())


         let currentDate = new Date();
         const year = currentDate.getUTCFullYear();
          const month =  currentDate.getUTCMonth() + 1;
          const day =  currentDate.getUTCDate();
         currentDate = new Date(year.toString() + '-' + month.toString() + '-' + day.toString())

         if (currentDate <= expiryDate)
            return true;
         return false;   
      }
    },
   async created() {
      this.loading = true;

       const token = localStorage.getItem('token');
        const uri = "";
        const list = await  axios.get(uri + '/booking/active-booking',
           {headers: {authorization: token}});
           this.loading = false;
          
           list.data.forEach(element => {
               if (this.isExpired(element.start, element.days)) {
                  this.items.push(
                  {
                  name: this.getRemaingdays(new Date(element.start), element.days),
                  المكان : element.place,
                  'الموقع': element.location,
                  'الشقة': element.department,
                  'الطابق': element.floor,
                  'السعر': element.price,
                  'المالك': element.ownerName,
                  'جوال المالك': element.ownerMobile,
                  'المستأجر': element.tenantName,
                  'جوال المستاجر': element.tenantMobile,
                  'تاريخ البدأ': (function() {
                     let  dateObj = new Date(element.start);
                        let month = dateObj.getUTCMonth() + 1; //months from 1-12
                        let day = dateObj.getUTCDate();
                        let year = dateObj.getUTCFullYear();

                     return day + "/" + month + "/" + year;
                  } ()), 
               'الأيام': element.days,
               'تاريخ النهاية': (function() {
                        let expiryDate =   new Date();
                        let startDay2 = new Date(element.start)
                        let result = expiryDate.setDate(startDay2.getDate() + element.days);
                        return  (new Date(result).getUTCDate())
                        + '/' +
                        (new Date(result).getUTCMonth() + 1) 
                        
                        
                        + '/' +
                        new Date(result).getUTCFullYear();
                     }()),
                     'ملاحظات': element.notes,
                     }
                     )
               }
               }
               );
           
        }
    
}
</script>

<style scoped>
.v-list-item--dense .v-list-item__content, .v-list--dense .v-list-item .v-list-item__content {
    padding: 8px 0;
    font-size: 0.8rem;
}
</style>