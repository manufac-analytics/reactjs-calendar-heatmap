"use strict";(self.webpackChunk_manufac_reactjs_calendar_heatmap=self.webpackChunk_manufac_reactjs_calendar_heatmap||[]).push([[221],{"./src/DrilldownCalendar/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Dark:()=>Dark,Default:()=>Default,DrilldownDayOverview:()=>DrilldownDayOverview,DrilldownMonthOverview:()=>DrilldownMonthOverview,DrilldownYearOverview:()=>DrilldownYearOverview,HSL:()=>HSL,Light:()=>Light,LiveData:()=>LiveData,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/core-js/modules/es.function.bind.js");var dev_utils=__webpack_require__("./src/dev-utils.ts"),toDate=(__webpack_require__("./node_modules/core-js/modules/es.object.keys.js"),__webpack_require__("./node_modules/core-js/modules/es.array.index-of.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.description.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.iterator.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),__webpack_require__("./node_modules/core-js/modules/es.function.name.js"),__webpack_require__("./node_modules/core-js/modules/es.array.from.js"),__webpack_require__("./node_modules/core-js/modules/es.array.filter.js"),__webpack_require__("./node_modules/core-js/modules/es.date.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.array.find.js"),__webpack_require__("./node_modules/core-js/modules/es.date.to-iso-string.js"),__webpack_require__("./node_modules/core-js/modules/es.promise.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.array.is-array.js"),__webpack_require__("./node_modules/core-js/modules/es.array.concat.js"),__webpack_require__("./node_modules/date-fns/esm/toDate/index.js")),toInteger=__webpack_require__("./node_modules/date-fns/esm/_lib/toInteger/index.js"),requiredArgs=__webpack_require__("./node_modules/date-fns/esm/_lib/requiredArgs/index.js");function startOfWeek(dirtyDate,dirtyOptions){(0,requiredArgs.Z)(1,arguments);var options=dirtyOptions||{},locale=options.locale,localeWeekStartsOn=locale&&locale.options&&locale.options.weekStartsOn,defaultWeekStartsOn=null==localeWeekStartsOn?0:(0,toInteger.Z)(localeWeekStartsOn),weekStartsOn=null==options.weekStartsOn?defaultWeekStartsOn:(0,toInteger.Z)(options.weekStartsOn);if(!(weekStartsOn>=0&&weekStartsOn<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var date=(0,toDate.Z)(dirtyDate),day=date.getDay(),diff=(day<weekStartsOn?7:0)+day-weekStartsOn;return date.setDate(date.getDate()-diff),date.setHours(0,0,0,0),date}function getWeekYear(dirtyDate,options){var _options$locale,_options$locale$optio;(0,requiredArgs.Z)(1,arguments);var date=(0,toDate.Z)(dirtyDate),year=date.getFullYear(),localeFirstWeekContainsDate=null==options||null===(_options$locale=options.locale)||void 0===_options$locale||null===(_options$locale$optio=_options$locale.options)||void 0===_options$locale$optio?void 0:_options$locale$optio.firstWeekContainsDate,defaultFirstWeekContainsDate=null==localeFirstWeekContainsDate?1:(0,toInteger.Z)(localeFirstWeekContainsDate),firstWeekContainsDate=null==(null==options?void 0:options.firstWeekContainsDate)?defaultFirstWeekContainsDate:(0,toInteger.Z)(options.firstWeekContainsDate);if(!(firstWeekContainsDate>=1&&firstWeekContainsDate<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var firstWeekOfNextYear=new Date(0);firstWeekOfNextYear.setFullYear(year+1,0,firstWeekContainsDate),firstWeekOfNextYear.setHours(0,0,0,0);var startOfNextYear=startOfWeek(firstWeekOfNextYear,options),firstWeekOfThisYear=new Date(0);firstWeekOfThisYear.setFullYear(year,0,firstWeekContainsDate),firstWeekOfThisYear.setHours(0,0,0,0);var startOfThisYear=startOfWeek(firstWeekOfThisYear,options);return date.getTime()>=startOfNextYear.getTime()?year+1:date.getTime()>=startOfThisYear.getTime()?year:year-1}function startOfWeekYear(dirtyDate,dirtyOptions){(0,requiredArgs.Z)(1,arguments);var options=dirtyOptions||{},locale=options.locale,localeFirstWeekContainsDate=locale&&locale.options&&locale.options.firstWeekContainsDate,defaultFirstWeekContainsDate=null==localeFirstWeekContainsDate?1:(0,toInteger.Z)(localeFirstWeekContainsDate),firstWeekContainsDate=null==options.firstWeekContainsDate?defaultFirstWeekContainsDate:(0,toInteger.Z)(options.firstWeekContainsDate),year=getWeekYear(dirtyDate,dirtyOptions),firstWeek=new Date(0);firstWeek.setFullYear(year,0,firstWeekContainsDate),firstWeek.setHours(0,0,0,0);var date=startOfWeek(firstWeek,dirtyOptions);return date}var react=__webpack_require__("./node_modules/react/index.js"),DayOverviewHeatmap=__webpack_require__("./src/DayOverviewHeatmap/index.tsx"),GlobalOverviewHeatmap=__webpack_require__("./src/GlobalOverviewHeatmap/index.tsx"),MonthOverviewHeatmap=__webpack_require__("./src/MonthOverviewHeatmap/index.tsx"),YearOverviewHeatmap=__webpack_require__("./src/YearOverviewHeatmap/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["data","overview","color","onTooltip","onHideTooltip","response","fetchGlobalData","fetchDayData"];function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||_unsupportedIterableToArray(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)}))}}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null==_i)return;var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||_unsupportedIterableToArray(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function filterDataByYear(data,year){return data.filter((function(ele){return new Date(ele.date).getFullYear()===year}))}function filterMonthData(data,month){return data.filter((function(ele){return new Date(ele.date).toLocaleString(void 0,{month:"short"})===month}))}function filterSelectedDatum(data,datum){var _data$find;return null!==(_data$find=data.find((function(ele){var dateObject=new Date(ele.date);return function getWeek(dirtyDate,options){(0,requiredArgs.Z)(1,arguments);var date=(0,toDate.Z)(dirtyDate),diff=startOfWeek(date,options).getTime()-startOfWeekYear(date,options).getTime();return Math.round(diff/6048e5)+1}(dateObject)===datum.week&&dateObject.getDay()===datum.day})))&&void 0!==_data$find?_data$find:{date:(new Date).toISOString(),total:NaN}}function DrilldownCalendar(_ref){var data=_ref.data,overview=_ref.overview,color=_ref.color,onTooltip=_ref.onTooltip,onHideTooltip=_ref.onHideTooltip,response=_ref.response,fetchGlobalData=_ref.fetchGlobalData,fetchDayData=_ref.fetchDayData,rest=_objectWithoutProperties(_ref,_excluded),_useState2=_slicedToArray((0,react.useState)([null!=overview?overview:"global"]),2),overviewOrder=_useState2[0],setOverviewOrder=_useState2[1],_useState4=_slicedToArray((0,react.useState)([]),2),globalData=_useState4[0],setGlobalData=_useState4[1],_useState6=_slicedToArray((0,react.useState)([]),2),currentYearData=_useState6[0],setCurrentYearData=_useState6[1],_useState8=_slicedToArray((0,react.useState)([]),2),currentMonthData=_useState8[0],setCurrentMonthData=_useState8[1],_useState10=_slicedToArray((0,react.useState)({date:(new Date).toISOString(),total:NaN}),2),currentDay=_useState10[0],setCurrentDay=_useState10[1],_useState12=_slicedToArray((0,react.useState)(!1),2),fade=_useState12[0],setFade=_useState12[1];(0,react.useEffect)((function(){var fetchedData=[];function _fetchData(){return(_fetchData=_asyncToGenerator(regeneratorRuntime.mark((function _callee(){var _yield$fetchGlobalDat;return regeneratorRuntime.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:if(!0!==Array.isArray(data)||0===(null==data?void 0:data.length)){_context.next=4;break}fetchedData=null!=data?data:[],_context.next=16;break;case 4:return _context.next=6,null==fetchGlobalData?void 0:fetchGlobalData();case 6:if(_context.t1=_yield$fetchGlobalDat=_context.sent,_context.t0=null!==_context.t1,!_context.t0){_context.next=10;break}_context.t0=void 0!==_yield$fetchGlobalDat;case 10:if(!_context.t0){_context.next=14;break}_context.t2=_yield$fetchGlobalDat,_context.next=15;break;case 14:_context.t2=[];case 15:fetchedData=_context.t2;case 16:setGlobalData(fetchedData);case 17:case"end":return _context.stop()}}),_callee)})))).apply(this,arguments)}!function fetchData(){return _fetchData.apply(this,arguments)}()}),[data,fetchGlobalData]),(0,react.useEffect)((function(){if(globalData.length>0)switch(overview){case"month":setCurrentMonthData(filterMonthData(globalData,new Date(globalData[0].date).toLocaleString(void 0,{month:"short"})));break;case"year":setCurrentYearData(filterDataByYear(globalData,new Date(globalData[0].date).getFullYear()));break;case"day":setCurrentDay(globalData[0])}}),[globalData,overview]);var onFadeComplete=(0,react.useCallback)((function(){setFade(!1),setOverviewOrder((function(prev){var newOrder=_toConsumableArray(prev);return newOrder.pop(),newOrder}))}),[setFade,setOverviewOrder]);return(0,jsx_runtime.jsxs)("div",{style:{position:"relative"},children:[(0,jsx_runtime.jsx)("button",{style:{position:"absolute",top:0,left:0,background:"transparent",borderColor:"transparent"},disabled:"global"===overviewOrder[overviewOrder.length-1],onClick:function onClick(){setFade(!0)},children:(0,jsx_runtime.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24",viewBox:"0 0 24 24",width:"24",className:rest.className,children:[(0,jsx_runtime.jsx)("path",{d:"M0 0h24v24H0z",fill:"transparent"}),(0,jsx_runtime.jsx)("path",{d:"M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z",fill:"var(--primary_color)"})]})}),function getOverviewChart(input){var output=(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{});switch(input){case"year":output=(0,jsx_runtime.jsx)(YearOverviewHeatmap.q,Object.assign({color,data:currentYearData},rest,{response,fade,onTooltip,onHideTooltip,onFadeComplete,onCellClick:function onCellClick(d){setCurrentDay(filterSelectedDatum(currentYearData,d)),setOverviewOrder((function(prev){return[].concat(_toConsumableArray(prev),["day"])}))},onMonthLabelClick:function onMonthLabelClick(d){setCurrentMonthData(filterMonthData(currentYearData,d)),setOverviewOrder((function(prev){return[].concat(_toConsumableArray(prev),["month"])}))}}));break;case"month":output=(0,jsx_runtime.jsx)(MonthOverviewHeatmap.j,Object.assign({color,data:currentMonthData},rest,{response,fade,onTooltip,onHideTooltip,onFadeComplete,onCellClick:function onCellClick(d){setCurrentDay(filterSelectedDatum(currentMonthData,d)),setOverviewOrder((function(prev){return[].concat(_toConsumableArray(prev),["day"])}))}}));break;case"day":output=(0,jsx_runtime.jsx)(DayOverviewHeatmap.X,Object.assign({color,data:currentDay},rest,{fetchDayData,response,fade,onTooltip,onHideTooltip,onFadeComplete}));break;default:output=(0,jsx_runtime.jsx)(GlobalOverviewHeatmap.n,Object.assign({color,data:globalData},rest,{response,fade,onTooltip,onHideTooltip,onFadeComplete,onCellClick:function onCellClick(d){var year=d.year;setCurrentYearData(filterDataByYear(globalData,year)),setOverviewOrder((function(prev){return[].concat(_toConsumableArray(prev),["year"])}))}}))}return output}(overviewOrder[overviewOrder.length-1])]})}DrilldownCalendar.displayName="DrilldownCalendar";try{DrilldownCalendar.displayName="DrilldownCalendar",DrilldownCalendar.__docgenInfo={description:"",displayName:"DrilldownCalendar",props:{data:{defaultValue:null,description:"",name:"data",required:!1,type:{name:"CalendarHeatmapDatum[]"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"string"}},overview:{defaultValue:null,description:"",name:"overview",required:!1,type:{name:"enum",value:[{value:'"global"'},{value:'"year"'},{value:'"month"'},{value:'"day"'}]}},response:{defaultValue:null,description:"",name:"response",required:!1,type:{name:"enum",value:[{value:'"rotate"'},{value:'"offset"'},{value:'"hide"'}]}},onTooltip:{defaultValue:null,description:"",name:"onTooltip",required:!1,type:{name:"((datum: { value: unknown; }) => void)"}},onHideTooltip:{defaultValue:null,description:"",name:"onHideTooltip",required:!1,type:{name:"(() => void)"}},fetchGlobalData:{defaultValue:null,description:"",name:"fetchGlobalData",required:!1,type:{name:"(() => Promise<CalendarHeatmapDatum[]>)"}},fetchDayData:{defaultValue:null,description:"",name:"fetchDayData",required:!1,type:{name:"((dateTime: string) => Promise<CalendarHeatmapDetail[]>)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/DrilldownCalendar/index.tsx#DrilldownCalendar"]={docgenInfo:DrilldownCalendar.__docgenInfo,name:"DrilldownCalendar",path:"src/DrilldownCalendar/index.tsx#DrilldownCalendar"})}catch(__react_docgen_typescript_loader_error){}var injectStylesIntoStyleTag=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),cjs_ruleSet_1_rules_7_use_1_src_DrilldownCalendar=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./src/DrilldownCalendar/index.css"),options={insert:"head",singleton:!1};injectStylesIntoStyleTag_default()(cjs_ruleSet_1_rules_7_use_1_src_DrilldownCalendar.Z,options);cjs_ruleSet_1_rules_7_use_1_src_DrilldownCalendar.Z.locals;const index_stories={title:"DrilldownCalendar",component:DrilldownCalendar,args:{data:(0,dev_utils.D)(2,3),onTooltip:function onTooltip(d){console.log(d)},color:"spectral"}};var Template=function Template(args){return(0,jsx_runtime.jsx)(DrilldownCalendar,Object.assign({},args,{style:{height:"90vh",width:"100%",border:"1px solid black"}}))};Template.displayName="Template";var Light=Template.bind({});Light.args={className:"light"};var Dark=Template.bind({});Dark.args={className:"dark"};var HSL=Template.bind({});HSL.args={color:"hsl"};var Default=Template.bind({});Default.args={color:void 0};var DrilldownYearOverview=Template.bind({});DrilldownYearOverview.args={overview:"year"};var DrilldownMonthOverview=Template.bind({});DrilldownMonthOverview.args={overview:"month"};var DrilldownDayOverview=Template.bind({});DrilldownDayOverview.args={overview:"day"};var LiveData=Template.bind({});LiveData.args={data:[{date:"2022-04-28T00:00:00.000Z",total:148471},{date:"2022-04-29T00:00:00.000Z",total:122342},{date:"2022-04-30T00:00:00.000Z",total:120133},{date:"2022-05-01T00:00:00.000Z",total:109908},{date:"2022-05-02T00:00:00.000Z",total:108752},{date:"2022-05-03T00:00:00.000Z",total:146205},{date:"2022-05-04T00:00:00.000Z",total:124881},{date:"2022-05-05T00:00:00.000Z",total:164011},{date:"2022-05-06T00:00:00.000Z",total:177959},{date:"2022-05-07T00:00:00.000Z",total:127550},{date:"2022-05-08T00:00:00.000Z",total:97882},{date:"2022-05-09T00:00:00.000Z",total:135627},{date:"2022-05-10T00:00:00.000Z",total:182670},{date:"2022-05-11T00:00:00.000Z",total:229608},{date:"2022-05-12T00:00:00.000Z",total:368919},{date:"2022-05-13T00:00:00.000Z",total:45356},{date:"2022-05-14T00:00:00.000Z",total:499057},{date:"2022-05-15T00:00:00.000Z",total:455587},{date:"2022-05-16T00:00:00.000Z",total:472499},{date:"2022-05-17T00:00:00.000Z",total:214326},{date:"2022-05-18T00:00:00.000Z",total:166338},{date:"2022-05-19T00:00:00.000Z",total:355811},{date:"2022-05-20T00:00:00.000Z",total:274293},{date:"2022-05-21T00:00:00.000Z",total:274275},{date:"2022-05-22T00:00:00.000Z",total:267865},{date:"2022-05-23T00:00:00.000Z",total:191128},{date:"2022-05-24T00:00:00.000Z",total:338148},{date:"2022-05-25T00:00:00.000Z",total:349940}]},Light.parameters=Object.assign({storySource:{source:"(args) => (\n  <DrilldownCalendar\n    {...args}\n    style={{ height: '90vh', width: '100%', border: '1px solid black' }}\n  />\n)"}},Light.parameters),Dark.parameters=Object.assign({storySource:{source:"(args) => (\n  <DrilldownCalendar\n    {...args}\n    style={{ height: '90vh', width: '100%', border: '1px solid black' }}\n  />\n)"}},Dark.parameters),HSL.parameters=Object.assign({storySource:{source:"(args) => (\n  <DrilldownCalendar\n    {...args}\n    style={{ height: '90vh', width: '100%', border: '1px solid black' }}\n  />\n)"}},HSL.parameters),Default.parameters=Object.assign({storySource:{source:"(args) => (\n  <DrilldownCalendar\n    {...args}\n    style={{ height: '90vh', width: '100%', border: '1px solid black' }}\n  />\n)"}},Default.parameters),DrilldownYearOverview.parameters=Object.assign({storySource:{source:"(args) => (\n  <DrilldownCalendar\n    {...args}\n    style={{ height: '90vh', width: '100%', border: '1px solid black' }}\n  />\n)"}},DrilldownYearOverview.parameters),DrilldownMonthOverview.parameters=Object.assign({storySource:{source:"(args) => (\n  <DrilldownCalendar\n    {...args}\n    style={{ height: '90vh', width: '100%', border: '1px solid black' }}\n  />\n)"}},DrilldownMonthOverview.parameters),DrilldownDayOverview.parameters=Object.assign({storySource:{source:"(args) => (\n  <DrilldownCalendar\n    {...args}\n    style={{ height: '90vh', width: '100%', border: '1px solid black' }}\n  />\n)"}},DrilldownDayOverview.parameters),LiveData.parameters=Object.assign({storySource:{source:"(args) => (\n  <DrilldownCalendar\n    {...args}\n    style={{ height: '90vh', width: '100%', border: '1px solid black' }}\n  />\n)"}},LiveData.parameters);var __namedExportsOrder=["Light","Dark","HSL","Default","DrilldownYearOverview","DrilldownMonthOverview","DrilldownDayOverview","LiveData"];try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/DrilldownCalendar/index.stories.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"src/DrilldownCalendar/index.stories.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}},"./src/GlobalOverviewHeatmap/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>GlobalOverviewHeatMap});__webpack_require__("./node_modules/core-js/modules/es.object.keys.js"),__webpack_require__("./node_modules/core-js/modules/es.array.index-of.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.array.is-array.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.description.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.iterator.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),__webpack_require__("./node_modules/core-js/modules/es.function.name.js"),__webpack_require__("./node_modules/core-js/modules/es.array.from.js"),__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.regexp.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.date.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.number.is-finite.js"),__webpack_require__("./node_modules/core-js/modules/es.number.constructor.js"),__webpack_require__("./node_modules/core-js/modules/es.array.filter.js"),__webpack_require__("./node_modules/core-js/modules/es.object.assign.js");var src=__webpack_require__("./node_modules/d3/src/index.js"),react=__webpack_require__("./node_modules/react/index.js"),utils=__webpack_require__("./src/utils.ts");__webpack_require__("./node_modules/core-js/modules/es.array.reduce.js"),__webpack_require__("./node_modules/core-js/modules/es.map.js"),__webpack_require__("./node_modules/core-js/modules/es.array.concat.js");function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||_unsupportedIterableToArray(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null==_i)return;var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||_unsupportedIterableToArray(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function getGlobalHeatmapCellDimensions(element,xScale,margin){var clientHeight=element.clientHeight;return[xScale.bandwidth(),clientHeight-margin.top-margin.bottom]}var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["data","onTooltip","onHideTooltip","color","onCellClick","fade","onFadeComplete","response"];function GlobalOverviewHeatmap_slicedToArray(arr,i){return function GlobalOverviewHeatmap_arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function GlobalOverviewHeatmap_iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null==_i)return;var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function GlobalOverviewHeatmap_unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return GlobalOverviewHeatmap_arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return GlobalOverviewHeatmap_arrayLikeToArray(o,minLen)}(arr,i)||function GlobalOverviewHeatmap_nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function GlobalOverviewHeatmap_arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function GlobalOverviewHeatMap(_ref){var data=_ref.data,onTooltip=_ref.onTooltip,onHideTooltip=_ref.onHideTooltip,color=_ref.color,onCellClick=_ref.onCellClick,fade=_ref.fade,onFadeComplete=_ref.onFadeComplete,response=_ref.response,rest=_objectWithoutProperties(_ref,_excluded),ref=(0,react.useRef)(null);return(0,react.useEffect)((function(){var margin={top:50,bottom:50,left:50,right:50},svg=void 0,resize=void 0;if(null!==ref.current&&data.length>0){var _getGlobalData=function getGlobalData(data){var _minYear2,_maxYear2,_minTotal,_maxTotal,minTotal,maxTotal,minYear,maxYear,dataArray=[];if(data.length>0){var _minYear,_maxYear,groupedData=(0,src.jJk)(data,(function(g){return(0,src.Smz)(g,(function(d){return d.total}))}),(function(d){return new Date(d.date).getFullYear()})),yearsPresent=Array.from(groupedData.keys()),_extent2=_slicedToArray((0,src.Wem)(yearsPresent),2);minYear=null!==(_minYear=minYear=_extent2[0])&&void 0!==_minYear?_minYear:NaN,maxYear=null!==(_maxYear=maxYear=_extent2[1])&&void 0!==_maxYear?_maxYear:NaN;var consecutiveYearsMap=(0,src.w6H)(minYear,maxYear+1).reduce((function(acc,curr){return acc.set(curr,NaN),acc}),new Map),combinedData=new Map([].concat(_toConsumableArray(consecutiveYearsMap),_toConsumableArray(groupedData)));dataArray=Array.from(combinedData).map((function(ele){return{year:ele[0],total:ele[1]}}));var _extent4=_slicedToArray((0,src.Wem)(dataArray,(function(d){return d.total})),2);minTotal=_extent4[0],maxTotal=_extent4[1]}return{dataArray,yearExtent:[null!==(_minYear2=minYear)&&void 0!==_minYear2?_minYear2:NaN,null!==(_maxYear2=maxYear)&&void 0!==_maxYear2?_maxYear2:NaN],totalExtent:[null!==(_minTotal=minTotal)&&void 0!==_minTotal?_minTotal:NaN,null!==(_maxTotal=maxTotal)&&void 0!==_maxTotal?_maxTotal:NaN]}}(data),dataArray=_getGlobalData.dataArray,yearExtent=_getGlobalData.yearExtent,totalExtent=_getGlobalData.totalExtent,_yearExtent=GlobalOverviewHeatmap_slicedToArray(yearExtent,2),startYear=_yearExtent[0],endYear=_yearExtent[1],_totalExtent=GlobalOverviewHeatmap_slicedToArray(totalExtent,2),minTotal=_totalExtent[0],maxTotal=_totalExtent[1],colorGenerator=(0,utils.D0)(minTotal,maxTotal,color),yearLabels=(0,src.w6H)(startYear,endYear+1).map((function(d){return d.toString()})),_getXScaleAndAxis2=GlobalOverviewHeatmap_slicedToArray((0,utils.DW)({labels:yearLabels,element:ref.current,margin,paddingInner:.2,response}),2),xScale=_getXScaleAndAxis2[0],xAxis=_getXScaleAndAxis2[1],_getGlobalHeatmapCell2=GlobalOverviewHeatmap_slicedToArray(getGlobalHeatmapCellDimensions(ref.current,xScale,margin),2),cellWidth=_getGlobalHeatmapCell2[0],cellHeight=_getGlobalHeatmapCell2[1],parent=(svg=(0,src.Ys)(ref.current).append("svg").attr("width","100%").attr("height","100%").style("cursor","pointer")).append("g").attr("transform","translate("+margin.left+", "+margin.top+")");svg.append("g").attr("transform","translate("+margin.left+", "+margin.top+")").attr("class","x-axis").call(xAxis),parent.selectAll(".heat-cell").data(dataArray).enter().append("rect").attr("class","heat-cell").attr("width",cellWidth).attr("height",cellHeight).attr("x",(function(d){var _xScale;return null!==(_xScale=xScale(d.year.toString()))&&void 0!==_xScale?_xScale:0})).attr("fill",(function(d){return Number.isFinite(d.total)?colorGenerator(d.total):"var(--background_color)"})).attr("stroke-width",1).attr("stroke"," var(--background_color)"),(0,src.Ys)(".x-axis").selectAll("text").attr("fill","var(--primary_color)"),(0,src.Ys)(".x-axis").selectAll("path").attr("stroke","var(--primary_color)"),(0,src.td_)(".heat-cell").on("mouseover",(function(e,datum){(0,src.Ys)(e.currentTarget).attr("fill-opacity",.4),null==onTooltip||onTooltip({value:datum})})).on("mousemove",(function(_e,datum){null==onTooltip||onTooltip({value:datum})})).on("mouseout",(function(e){(0,src.Ys)(e.currentTarget).attr("fill-opacity",1),null==onHideTooltip||onHideTooltip()})).on("click",(function(_e,datum){(0,utils.Fe)([".heat-cell",".x-axis"]).then((function(){null==onCellClick||onCellClick(datum)}))})),(0,src.Ys)(".x-axis").selectAll("text").on("mouseover",(function(_e,tickLabel){(0,src.td_)(".heat-cell").filter((function(d){return d.year.toString()!==tickLabel})).transition().duration(500).ease(src.Nyw).attr("fill-opacity",.2)})).on("mouseout",(function(){(0,src.td_)(".heat-cell").transition().duration(500).ease(src.Nyw).attr("fill-opacity",1)})),resize=function resize(){if(null!==ref.current){var _getXScaleAndAxis4=GlobalOverviewHeatmap_slicedToArray((0,utils.DW)({labels:yearLabels,element:ref.current,margin,paddingInner:.2,response}),2),newXScale=_getXScaleAndAxis4[0],newXAxis=_getXScaleAndAxis4[1],_getGlobalHeatmapCell4=GlobalOverviewHeatmap_slicedToArray(getGlobalHeatmapCellDimensions(ref.current,newXScale,margin),2),newWidth=_getGlobalHeatmapCell4[0],newHeight=_getGlobalHeatmapCell4[1];(0,src.Ys)(".x-axis").call(newXAxis).attr("transform","translate("+margin.left+", "+margin.top+")"),(0,src.td_)(".heat-cell").transition().duration(500).ease(src.Nyw).attr("width",newWidth).attr("height",newHeight).attr("x",(function(d){var _newXScale;return null!==(_newXScale=newXScale(d.year.toString()))&&void 0!==_newXScale?_newXScale:0}))}},window.addEventListener("resize",resize)}return function(){var _svg;void 0!==resize&&window.removeEventListener("resize",resize),null===(_svg=svg)||void 0===_svg||_svg.remove()}}),[color,data,onCellClick,onHideTooltip,onTooltip,response]),(0,react.useEffect)((function(){!0===fade&&(0,utils.Fe)([".heat-cell",".x-axis"]).then((function(){null==onFadeComplete||onFadeComplete()}))}),[fade,onFadeComplete]),(0,jsx_runtime.jsx)("div",Object.assign({},rest,{style:Object.assign({width:"100%",height:"100%",boxSizing:"border-box"},rest.style),ref}))}GlobalOverviewHeatMap.displayName="GlobalOverviewHeatMap";try{GlobalOverviewHeatMap.displayName="GlobalOverviewHeatMap",GlobalOverviewHeatMap.__docgenInfo={description:"Ref: https://bl.ocks.org/Bl3f/cdb5ad854b376765fa99",displayName:"GlobalOverviewHeatMap",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"CalendarHeatmapDatum[]"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"string"}},fade:{defaultValue:null,description:"",name:"fade",required:!1,type:{name:"boolean"}},response:{defaultValue:null,description:"",name:"response",required:!1,type:{name:"enum",value:[{value:'"rotate"'},{value:'"offset"'},{value:'"hide"'}]}},onCellClick:{defaultValue:null,description:"",name:"onCellClick",required:!1,type:{name:"((d: GlobalOverviewDatum) => void)"}},onTooltip:{defaultValue:null,description:"",name:"onTooltip",required:!1,type:{name:"((datum: { value: unknown; }) => void)"}},onHideTooltip:{defaultValue:null,description:"",name:"onHideTooltip",required:!1,type:{name:"(() => void)"}},onFadeComplete:{defaultValue:null,description:"",name:"onFadeComplete",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/GlobalOverviewHeatmap/index.tsx#GlobalOverviewHeatMap"]={docgenInfo:GlobalOverviewHeatMap.__docgenInfo,name:"GlobalOverviewHeatMap",path:"src/GlobalOverviewHeatmap/index.tsx#GlobalOverviewHeatMap"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./src/DrilldownCalendar/index.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/cssWithMappingToString.js"),_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".light {\n  color: #383a42;\n  background-color: #fafafa;\n  --primary_color: #383a42;\n  --secondary_color: #c18401;\n  --background_color: #fafafa;\n  --border_color: #c7c7c7;\n  --hover_color: #000;\n}\n\n.dark {\n  color: #dcdfe4;\n  background-color: #282c34;\n  --primary_color: #dcdfe4;\n  --secondary_color: #61afef;\n  --background_color: #282c34;\n  --border_color: #49515f;\n  --hover_color: #f78c6c;\n}\n","",{version:3,sources:["webpack://./src/DrilldownCalendar/index.css"],names:[],mappings:"AAAA;EACE,cAAc;EACd,yBAAyB;EACzB,wBAAwB;EACxB,0BAA0B;EAC1B,2BAA2B;EAC3B,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,yBAAyB;EACzB,wBAAwB;EACxB,0BAA0B;EAC1B,2BAA2B;EAC3B,uBAAuB;EACvB,sBAAsB;AACxB",sourcesContent:[".light {\n  color: #383a42;\n  background-color: #fafafa;\n  --primary_color: #383a42;\n  --secondary_color: #c18401;\n  --background_color: #fafafa;\n  --border_color: #c7c7c7;\n  --hover_color: #000;\n}\n\n.dark {\n  color: #dcdfe4;\n  background-color: #282c34;\n  --primary_color: #dcdfe4;\n  --secondary_color: #61afef;\n  --background_color: #282c34;\n  --border_color: #49515f;\n  --hover_color: #f78c6c;\n}\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);