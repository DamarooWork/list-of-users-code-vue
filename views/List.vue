<template>
    <div>      
        <h3 class="center">Список экспертов по оценке и руководителей</h3>
    
    <div class="filters">

        <h4 class="blue-text text-darken-2 center">Фильтры</h4>

        <div class="row">
          <div class="col s12 m6 l3">
            <p>
              <span class="blue-text text-darken-2" style="margin: 100px 0 0 10px;">Должность</span>
          </p>
            <div class="input-field col s12">
                 <select ref="selectPost" v-model="filterPost" >
                    <option value="" disabled selected>Выберете должность</option>
                    <option value="Внешний эксперт">Внешний эксперт</option>
                    <option value="HR BP">HR BP</option>
                </select>
             </div>
             
            </div>

    <div class="col s12 m6 l3">
      <p>
      <span class="blue-text text-darken-2" style="margin-left: 10px;">ID</span>
      </p>
        <div class="input-field col s12">
          <input ref="selectId" v-model="filterId" placeholder="Введите ID" type="text" >         
        </div>
      </div>

    <div class="col s12 m6 l3">
      <p>
      <span class="blue-text text-darken-2" style="margin-left: 10px;">ФИО</span>
        </p>
        <div class="input-field col s12">
          <input ref="selectFullName" v-model="filterFullName" placeholder="Введите ФИО" type="text">         
        </div>
      </div>

    <div class="col s12 m6 l3">
      <p> 
        <span class="blue-text text-darken-2" style="margin-left: 10px;">Логин</span>
     </p>
        <div class="input-field col s12">
          <input ref="selectEmail" v-model="filterEmail" placeholder="Введите логин участника" type="text">         
        </div>
      </div>
  </div>
    
         
<button v-if="filterPost || filterId || filterFullName || filterEmail" class="btn btn-small red" style="margin: 10px; " 
@click="filterPost = null; filterId = null, filterFullName= null, filterEmail = null">Clear filter</button>
       

   </div>
    


  

    

    

    <table v-if="displayUsers.length">
      <thead class="blue-text text-darken-2 center">
      <tr>
        <th >ID</th>
        <th>Дата регистрации</th>
        <th>ФИО</th>
        <th>Должность</th>
        <th>Почта (логин)</th>
        <th>Пароль</th>
        <th>Телефон, привязанный к месседжеру</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(user, idx) of displayUsers.slice((page - 1) * perPage, page * perPage)"
          :key="user.id"
      >
        <td>{{idx + 1 + (page - 1) * perPage}}</td>
        <td>{{new Date(user.date).toLocaleDateString()}}</td>
        <td>{{user.fullName}}</td>
        <td>{{user.post}}</td>
        <td class="blue-text text-darken-1 center">{{user.email}}</td> 
        <td >{{secret.padStart(user.password.length, '*')}}</td>
        <td>{{user.tel}}</td>
      </tr>
      </tbody>
    </table>

    <h4 v-if="!displayUsers.length" class="center-align" style="color: red;">Пользователи не найдены!</h4>

<div class="center" style="margin-top: 1%; " >
   
  <button @click="next(-1)" :disabled="page <= 1" class="btn waves-effect waves-light" v-show="displayUsers.length" style="display: inline-block; margin: 0 10px 0 0">&lt;</button>
  <div style="display: inline-block; vertical-align: middle;" v-show="displayUsers.length">{{this.page}} из {{numPages}}</div>
<button @click="next(+1)" :disabled="page >= numPages" class="btn waves-effect waves-light" v-show="displayUsers.length" style="display: inline-block; margin: 0 0 0 10px">&gt;</button>

</div>
    
  


        
        <button data-target="Modal" class="btn-floating btn-large waves-effect waves-light red modal-trigger" style="float: right; margin: 50px 50px 50px 0"  @click="showModal = true">ADD</button>
      
      <Modal v-if="showModal"/>
      
        
        
      
    </div>
</template>


<script>
import Modal from '@/components/Modal.vue'

export default {
  data: () => ({
      filterEmail: null,
      filterId: null,
      filterPost: null,
      filterFullName: null,
      showModal: false,
      perPage: 3,
      page: 1,
      secret: ''
  }),
  components: {
            Modal
    },
  methods: {
    next(change) {
    this.page = Math.max(1, Math.min(this.numPages, this.page + change));
  },
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    displayUsers() {
      return this.users.filter((t, i) => {
        if (!this.filterPost && !this.filterId && !this.filterFullName && !this.filterEmail) {
          return true
        } 
        else if(this.filterPost && this.filterId && this.filterFullName){
            return i === this.filterId-1 && t.post === this.filterPost && (t.fullName.toLowerCase().indexOf(this.filterFullName.toLowerCase()) > -1) && (this.page = 1)
        }
        else if(this.filterPost && this.filterEmail && this.filterFullName){
            return (t.email.toLowerCase().indexOf(this.filterEmail.toLowerCase()) > -1) && (t.fullName.toLowerCase().indexOf(this.filterFullName.toLowerCase()) > -1) && t.post === this.filterPost && (this.page = 1)
        }
        else if(this.filterPost && this.filterId && this.filterEmail){
            return (t.email.toLowerCase().indexOf(this.filterEmail.toLowerCase()) > -1) && i === this.filterId-1 && t.post === this.filterPost && (this.page = 1)
        }
        else if(this.filterId && this.filterFullName && this.filterEmail){
            return (t.email.toLowerCase().indexOf(this.filterEmail.toLowerCase()) > -1) && i === this.filterId-1 && (t.fullName.toLowerCase().indexOf(this.filterFullName.toLowerCase()) > -1) && (this.page = 1)
        }
        else if(this.filterPost && this.filterId){
            return i === this.filterId-1 && t.post === this.filterPost && (this.page = 1)
        }
        else if(this.filterId && this.filterFullName){
            return i === this.filterId-1 && (t.fullName.toLowerCase().indexOf(this.filterFullName.toLowerCase()) > -1) && (this.page = 1)
        }
        else if(this.filterFullName && this.filterEmail){
            return (t.email.toLowerCase().indexOf(this.filterEmail.toLowerCase()) > -1) && (t.fullName.toLowerCase().indexOf(this.filterFullName.toLowerCase()) > -1) && (this.page = 1)
        }
        else if(this.filterPost && this.filterFullName){
            return t.post === this.filterPost && (t.fullName.toLowerCase().indexOf(this.filterFullName.toLowerCase()) > -1)  && (this.page = 1)
        }
        else if(this.filterPost && this.filterEmail){
            return (t.email.toLowerCase().indexOf(this.filterEmail.toLowerCase()) > -1) && t.post === this.filterPost && (this.page = 1)
        }
        else if(this.filterId && this.filterFullName){
            return i === this.filterId-1 && (t.fullName.toLowerCase().indexOf(this.filterFullName.toLowerCase()) > -1) && (this.page = 1)
        }
        else if(this.filterId && this.filterEmail){
            return (t.email.toLowerCase().indexOf(this.filterEmail.toLowerCase()) > -1) && i === this.filterId-1 && (this.page = 1)
        }
         else if(this.filterFullName && this.filterEmail){
            return (t.fullName.toLowerCase().indexOf(this.filterFullName.toLowerCase()) > -1) && (t.email.toLowerCase().indexOf(this.filterEmail.toLowerCase()) > -1) && (this.page = 1)
        }
        else if(this.filterPost){
            return t.post === this.filterPost && (this.page = 1)
        }
         else if(this.filterFullName){
            return (t.fullName.toLowerCase().indexOf(this.filterFullName.toLowerCase()) > -1) && (this.page = 1)
        }
        else if(this.filterId){
            return  i === this.filterId-1 && (this.page = 1)
             
        }
        else if(this.filterEmail){
            return (t.email.toLowerCase().indexOf(this.filterEmail.toLowerCase()) > -1) && (this.page = 1)
        }
      

      })
    }, 
    numPages() {
    return Math.ceil(this.displayUsers.length / this.perPage);
  },
    
  
},                       
  mounted() {
    M.FormSelect.init(this.$refs.selectPost)
    
  }
}
</script>
 
 <style scoped>
.filters{
  
    display:inline-block;
    width: 100%;
    margin: 5px 0 50px 0;
    background-color: #e3f2fd;
    min-height: 300px;

}
th, td {
    border: 1px solid rgb(226, 226, 226);
    text-align: center;
    }
    td{
        min-height: 100px;
        
    }   
.arrow {
      width: 60px;
      height: 60px;
      border-top: 10px solid #6E18C0;
      border-right: 10px solid #6E18C0;
      margin-right: 60px;
  }   
.arrow-right {
      transform: rotate(45deg);
  }    
 </style>