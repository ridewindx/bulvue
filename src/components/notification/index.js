import Vue from 'vue'
import Notification from './notification'

let instance = new Vue(Notification)
document.body.appendChild(instance.$mount().$el)

export default instance
