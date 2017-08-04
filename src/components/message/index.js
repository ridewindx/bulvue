import Vue from 'vue'
import Message from './message'

let instance = new Vue(Message)
document.body.appendChild(instance.$mount().$el)

export default instance
