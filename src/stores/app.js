import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    users: [],
    pagesCount: 1,
    activePage: 1,
    defaultAvatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  }),

  getters: {
    getUsers: (state) => state.users.filter((item, index) => index >= ((state.activePage * 6) - 6) && index <= (state.activePage * 6) -1)
  },

  actions: {
    getUsersList(){
      return fetch("https://reqres.in/api/users/", {
        method: "GET"
      })
      .then(res => res.json())
      .then((response) => {
        this.users = response.data
      })
    },

    getUserInfo(id){
      return this.users.find(user => user.id == id)
    },

    togglePagination(index) {
      this.activePage = index
    },

    saveNewUser(form){
      let newUser = {
        "id": this.assignNewId(),
        "first_name": form.first_name,
        "last_name": form.last_name,
        "avatar": form.avatar ? form.avatar : this.defaultAvatar
      }

      this.users.push(newUser)
      this.refreshPaginationCount()
    },

    editUserInfo(id, form){
      const user = this.users.find(user => user.id == id);
      if (user) {
        user.first_name = form.value.first_name
        user.last_name = form.value.last_name
        user.avatar = form.value.avatar
        return
      }
    },

    deleteItem(id){
      let indexOfItem = this.users.findIndex(item => item.id == id)
      this.users.splice(indexOfItem, 1)
      this.refreshPaginationCount()
      return
    },

    assignNewId(){
      if(this.users.length == 0) {
        return 1
      }

      let lastItem = this.users.at(-1)
      return lastItem.id + 1
    },

    refreshPaginationCount(){
      this.pagesCount = this.users.length != 0 ? Math.ceil(this.users.length/6) : 1

      if(this.activePage > this.pagesCount){
        this.activePage = this.pagesCount
      }
    }
  }
})
