"use strict";(self["webpackChunkVueCRM"]=self["webpackChunkVueCRM"]||[]).push([[6],{6:function(r,e,c){c.r(e),c.d(e,{default:function(){return j}});var n=c(3396);const t={class:"page-title"},l=(0,n._)("h3",null,"Счет",-1),s=(0,n._)("i",{class:"material-icons"},"refresh",-1),i=[s],a={key:1,class:"row"};function u(r,e,c,s,u,o){const d=(0,n.up)("AppLoader"),y=(0,n.up)("HomeBill"),h=(0,n.up)("HomeCurrency");return(0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("div",t,[l,(0,n._)("button",{class:"btn waves-effect waves-light btn-small",onClick:e[0]||(e[0]=(...r)=>o.refresh&&o.refresh(...r))},i)]),r.loading?((0,n.wg)(),(0,n.j4)(d,{key:0})):((0,n.wg)(),(0,n.iD)("div",a,[(0,n.Wm)(y,{currency:r.currency},null,8,["currency"]),(0,n.Wm)(h,{currency:r.currency},null,8,["currency"])]))])}var o=c(7139);const d={class:"col s12 m6 l4"},y={class:"card light-blue bill-card"},h={class:"card-content white-text"},w=(0,n._)("span",{class:"card-title"},"Счет в валюте",-1);function g(r,e,c,t,l,s){return(0,n.wg)(),(0,n.iD)("div",d,[(0,n._)("div",y,[(0,n._)("div",h,[w,((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.currencyList,(r=>((0,n.wg)(),(0,n.iD)("p",{key:r,class:"currency-line"},[(0,n._)("span",null,(0,o.zw)(s.getCurrency(r)),1)])))),128))])])])}var p={props:{currency:Object},data:()=>({currencyList:["RUB","USD","EUR"]}),methods:{getCurrency(r){let e=this.$store.getters.info.bill*this.currency[r];return this.$filters.currency(e,r)}}},_=c(89);const f=(0,_.Z)(p,[["render",g]]);var v=f;const m={class:"col s12 m6 l8"},b={class:"card orange darken-3 bill-card"},C={class:"card-content white-text"},k=(0,n._)("div",{class:"card-header"},[(0,n._)("span",{class:"card-title"},"Курс валют")],-1),D=(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"Валюта"),(0,n._)("th",null,"Курс")])],-1);function H(r,e,c,t,l,s){return(0,n.wg)(),(0,n.iD)("div",m,[(0,n._)("div",b,[(0,n._)("div",C,[k,(0,n._)("table",null,[D,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.currencyList,(e=>((0,n.wg)(),(0,n.iD)("tr",{key:e},[(0,n._)("td",null,(0,o.zw)(e),1),(0,n._)("td",null,(0,o.zw)(r.$filters.currency(1/c.currency[e])),1)])))),128))])])])])])}var R={props:{currency:Object},data:()=>({currencyList:["RUB","USD","EUR"]})};const U=(0,_.Z)(R,[["render",H]]);var L=U,$={name:"HomeView",data:()=>({loading:!0,currency:null}),async mounted(){this.currency=await this.$store.dispatch("fetchCurrency"),this.loading=!1},components:{HomeBill:v,HomeCurrency:L},methods:{async refresh(){this.loading=!0,this.currency=await this.$store.dispatch("fetchCurrency"),setTimeout((()=>{this.loading=!1}),200)}}};const B=(0,_.Z)($,[["render",u]]);var j=B}}]);
//# sourceMappingURL=6.23890583.js.map