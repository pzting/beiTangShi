(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/index"],{"1d71":function(t,e,i){"use strict";i.r(e);var n=i("f413"),u=i("a481");for(var o in u)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return u[t]}))}(o);i("b115");var r=i("f0c5"),c=Object(r["a"])(u["default"],n["b"],n["c"],!1,null,"e6cdf378",null,!1,n["a"],void 0);e["default"]=c.exports},"37f5":function(t,e,i){"use strict";(function(t,e){var n=i("4ea4");i("1f7d");n(i("66fd"));var u=n(i("1d71"));t.__webpack_require_UNI_MP_PLUGIN__=i,e(u.default)}).call(this,i("bc2e")["default"],i("543d")["createPage"])},"662f":function(t,e,i){},a481:function(t,e,i){"use strict";i.r(e);var n=i("bc05"),u=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=u.a},b115:function(t,e,i){"use strict";var n=i("662f"),u=i.n(n);u.a},bc05:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("af9f"),u={components:{},data:function(){return{isSetDifficulty:!1,showClear:!1,winRate:"暂无",Data:n.Data,key:"value",curNow:0,difficulty:{},difficultyArr:[{name:"简单",time:18e4,curNow:0,isTitle:!0,isAuthor:!0,isTitleHide:!1,isAuthorHide:!1,type:"simpleness"},{name:"一般",time:12e4,curNow:1,isTitle:!1,isAuthor:!0,isTitleHide:!1,isAuthorHide:!1,type:"ordinary"},{name:"困难",time:9e4,curNow:2,isTitle:!0,isAuthor:!1,isTitleHide:!0,isAuthorHide:!1,type:"difficulty"},{name:"极限",time:5e4,curNow:3,isTitle:!0,isAuthor:!0,isTitleHide:!0,isAuthorHide:!0,type:"extremity"}],rankingData:{},dataResult:{}}},watch:{isSetDifficulty:function(e,i){if(e){var n=t.getStorageSync("difficulty");n&&(this.curNow=n.curNow)}}},onLoad:function(){var e=t.getStorageSync("difficulty");e?this.difficulty=e:(this.difficulty=this.difficultyArr[this.curNow],t.setStorageSync("difficulty",this.difficultyArr[this.curNow]))},onShow:function(){this.getRanking()},methods:{setDifficulty:function(){this.difficulty=this.difficultyArr[this.curNow],t.setStorageSync("difficulty",this.difficultyArr[this.curNow]),t.$u.toast("操作成功~"),this.isSetDifficulty=!1},sectionChange:function(t){this.curNow=t},clear:function(){this.showClear=!1;var e=t.getStorageSync("dataResult"),i=0;this.dataResult={all:i,write:0,success:0,error:0},e&&(i=Number(e.all)),t.setStorageSync("dataResult",{all:i,write:0,success:0,error:0}),t.showToast({title:"操作成功~",duration:2e3})},getRanking:function(){var e=parseInt(1/6*100),i=0,u=t.getStorageSync("dataResult"),o=0,r=0,c=0,s=0;u&&(o=Number(u.all),r=Number(u.write),c=Number(u.success),s=Number(u.error)),this.dataResult={all:o,write:r,success:c,error:s},0!=r&&(this.winRate=parseInt(c/r*100)),0==r||0==c?i=0:c<20?i=1:c>20&&(this.winRate<2*e?i=1:this.winRate<3*e?i=2:this.winRate<4*e?i=3:this.winRate<5*e?i=4:this.winRate<6*e&&(this.winRate<92?i=5:this.winRate<96?i=6:this.winRate<100&&(i=7))),this.rankingData=n.Data.nameType[i]}}};e.default=u}).call(this,i("543d")["default"])},f413:function(t,e,i){"use strict";i.d(e,"b",(function(){return u})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={uSubsection:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-subsection/u-subsection")]).then(i.bind(null,"e63e"))},uCell:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-cell/u-cell")]).then(i.bind(null,"eefc"))},uButton:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-button/u-button")]).then(i.bind(null,"e983"))},uCellGroup:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-cell-group/u-cell-group")]).then(i.bind(null,"04ca"))},uModal:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-modal/u-modal")]).then(i.bind(null,"50f9"))}},u=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.isSetDifficulty=!1},t.e1=function(e){t.isSetDifficulty=!0},t.e2=function(e){t.showClear=!0},t.e3=function(e){t.showClear=!1})},o=[]}},[["37f5","common/runtime","common/vendor"]]]);