<template>

 <div>
   <v-alert
     v-if="success"
      type="success"
      @click="success = false"
    >
      تم الحجز بنجاح
    </v-alert>

  <v-progress-circular
      v-if="loading"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>

   <v-stepper v-else v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Name of step 1
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        Name of step 2
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step 
      :complete="e1 > 3"
       step="3">
        Name of step 3
      </v-stepper-step>

       <v-divider></v-divider>

      <v-stepper-step step="4">
        View setup instructions
      </v-stepper-step>

    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        
           <form>
    <v-text-field
      v-model="name"
      :counter="10"
      label="المكان"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="location"
      label="الموقع"
      required
      @input="$v.location.$touch()"
      @blur="$v.location.$touch()"
    ></v-text-field>
   <v-text-field
      v-model="departement"
      :counter="10"
      label="الشقة"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="floor"
      :counter="10"
      label="الطابق"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
     <v-text-field
            v-model="price"
            label="السعر"
            outlined
            shaped
            type="number"
          ></v-text-field>

    
  </form>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          تقدم
        </v-btn>

       
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-expansion-panels style="margin-bootom: 40px">
          <v-expansion-panel>
          <v-expansion-panel-header>
          المالك
        </v-expansion-panel-header>
        <v-expansion-panel-content>
         <v-text-field
              label="الاسم"
              v-model="ownerName"
            ></v-text-field>
            <v-text-field
              label="الجوال"
              type="number"
               v-model="ownerMobile">
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
               v-model="tenantName"
            ></v-text-field>
            <v-text-field
              label="الجوال"
               v-model="tenantMobile"
            ></v-text-field>
        </v-expansion-panel-content>
         </v-expansion-panel>
      </v-expansion-panels>

        <v-btn
          color="primary"
          style="margin-top: 40px;"
          @click="e1 = 3"
        >
          تقدم
        </v-btn>

        <v-btn 
        style="margin-top: 25px"
         @click="e1 = 1"
        text>
          رجوع
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
           <v-container >
       <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="تاريخ البدأ"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <!-- :min="minDate" -->
      <v-date-picker
      
      width= "200"
        v-model="date"
        
        @change="save"
      ></v-date-picker>
    </v-menu>
  </div>
      <v-text-field
      v-if="date"
      v-model="numberValue"
      hide-details
      single-line
      label="عدد الايام"
      type="number"
    />
   <v-text-field
   v-if="date && numberValue"
   width="40"
          v-model="expiryDateText"
          label="حتى تاريخ"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
     </v-container>

        <v-btn
          color="primary"
          @click="e1 = 4"
        >
          متابعة
        </v-btn>

        <v-btn 
        style="margin-top: 5px"
         @click="e1 = 2"
        text>
          رجوع
        </v-btn>
      </v-stepper-content>

      
      <v-stepper-content step="4">
        <v-textarea
          name="input-7-1"
          label="ملاحظات"
          v-model="notes"
        ></v-textarea>

        <v-btn
          block
          elevation="12"
          large
          :disabled = "isAllComplete"
          @click="addBooking()"
        >احجز</v-btn>

        <v-btn
        style="margin-top: 40px"
          color="primary"
          @click="e1 = 1"
        >
          تهيئة
        </v-btn>

        
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
 </div>
</template>

<script>
import axios from 'axios';

export default {
    data () {
      return {
        e1: 1,

        name: null,
        location: null,
        departement: null,
        floor: null,
        price: null,

        ownerName: null,
        ownerMobile: null,
        tenantName: null,
        tenantMobile: null,

        date: null,
        menu: false,
        minDate: new Date().toJSON(),

        numberValue: null,

        expiryDateText: null,

        notes: null,

        success: false,

        loading: false,
      }
    },
     watch: {
      numberValue() {
        let expiryDate =   new Date();
        let startDay2 = new Date(this.date)
        let result = expiryDate.setDate(startDay2.getDate() + Number.parseInt(this.numberValue));
        this.expiryDateText = new Date(result).toJSON()
      },
       date() {
        let expiryDate =   new Date();
        let startDay2 = new Date(this.date)
        let result = expiryDate.setDate(startDay2.getDate() + Number.parseInt(this.numberValue));
        this.expiryDateText = new Date(result).toJSON()
      }
      
    },
    computed: {
      isAllComplete() {
         if (
          this.name &&
          this.location &&
          this.floor &&
          this.departement &&
          this.price &&
           this.ownerName &&
          this.ownerMobile &&
          this.tenantName &&
          this.tenantMobile &&
          this.date &&
          this.numberValue

    ) {
      return false
    }
    return true
      }
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
      async addBooking() {
        if (
          this.name &&
          this.location &&
          this.floor &&
          this.departement &&
          this.price &&
          
          this.ownerName &&
          this.ownerMobile &&
          this.tenantName &&
          this.tenantMobile &&

          this.date &&

          this.numberValue

    ) {
      const payload = {
          name: this.name ,
          location: this.location ,
          floor: this.floor ,
          departement: this.departement ,
          price: this.price,
          ownerName : this.ownerName ,
          ownerMobile: this.ownerMobile ,
          tenantName :  this.tenantName ,
          tenantMobile:  this.tenantMobile ,
          startDate : this.date,
          days:  this.numberValue,
          notes: this.notes
      }
      this.loading = true;
        const token = localStorage.getItem('token');
          const uri = "";
         const res = await axios.post(uri + '/booking/add-booking',
          payload, 
           {headers: {authorization: token}});
           this.loading = false;

           if (res.data.success)
          this.success = true
        }

        
      }
    },

   
}
</script>

<style >

</style>