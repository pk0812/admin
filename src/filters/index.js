import Vue from 'vue'
import filterPrice from './filter'
let obj={
    filterPrice
}
for(let i in obj){
    Vue.filter(i,obj[i])
}