<template>

    

              <div id="Modal" class="modal" ref="init">
    <div class="modal-content row ">
      <h5 style="text-align: center"><span class="blue-text text-darken-2">
          Добавление данных о экспертах по  оценке и руководителей</span></h5> 

        
    
      <form @submit.prevent="submitHandler">
          <span class="blue-text text-darken-2" >Дата регистрации</span>
 
        <input type="text" ref="datepicker" id="date">
        
        <div class="input-field">
            <span class="blue-text text-darken-2" >ФИО</span>
          <input id="fullName" v-model="fullName" placeholder="Введите ФИО" type="text" class="validate" required>
          
          <span class="helper-text" data-error="Введите ФИО"></span>
        </div>


<div class="input-field" >
<span class="blue-text text-darken-2">
          Должность</span>
        
    <select ref="post" id="post" v-model="post">
      <option value="" disabled selected>Веберите должность</option>
      <option value="Внешний эксперт">Внешний эксперт</option>
      <option value="HR BP">HR BP</option>
    </select>
   
    
  </div>

  <div class="row">
        <div class="input-field">
            <span class="blue-text text-darken-2">
          Почта (логин)</span>
          <input id="email" v-model="email" placeholder="Введите логин" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" type="email" class="validate" required>
          
          <span class="helper-text" data-error="Неправильно введен логин"></span>
        </div>
      </div>

      <div class="row">
        <div class="input-field">
            <span class="blue-text text-darken-2">
          Пароль</span>
          <input id="password" v-model="password" placeholder="Введите пароль" type="password" class="validate" required>
           <span class="helper-text" data-error="Неправильно введен пароль"></span>
          
        </div>
      </div>

 <div class="row">
      <div class="input-field">
          <span class="blue-text text-darken-2">
          Телефон, привязанный к мессенджеру</span>
          <input id="tel" v-model="tel" placeholder="8 9XX XXX XX XX" pattern="8\s9[0-9]{2}\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}" type="tel" class="validate" required>
          <span class="helper-text" data-error="Нерпвильно указан номер телефона"></span>
        </div>
      </div>


        

        <button class="btn" type="submit" style="margin: 0 20px 0 0">СОХРАНИТЬ</button>
        <button class="btn red"  @click="closeModal" style="margin: 0 0 0 0">ЗАКРЫТЬ</button>
      </form>
    </div>
  </div>    
                    
</template>
    

<script>

export default {
    name: 'Modal',
    data: () => ({
    fullName: '',
    post: '',
    email: '',
    date: null,
    password: '',
    tel: ''
  }),
  mounted() {
      
    this.post = M.FormSelect.init(this.$refs.post)
        M.Modal.init(this.$refs.init)
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true
    })
  },
  methods: {
    submitHandler() {
      const user = {
        fullName: this.fullName,
        post: this.post,
        email: this.email,
        password: this.password,
        tel: this.tel,
        id: Date.now(),
        date: this.date.date
      }
      this.$store.dispatch('createUser', user)
      let instance = M.Modal.getInstance(this.$refs.init)
       instance.close()

    },
     closeModal(){
         
         let instance = M.Modal.getInstance(this.$refs.init)
       instance.close()
    }
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }

  }
}

</script>

<style scoped>
.modal{
   min-height: 830px;
}
</style>