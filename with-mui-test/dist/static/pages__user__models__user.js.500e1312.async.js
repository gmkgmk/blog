webpackJsonp([1],{"2iTh":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("a/jC"),a=n.n(s),r=n("+D7y"),c=n.n(r);t.default={namespace:"user",state:{page:20},subscriptions:{setup:function(e){e.dispatch;e.history.listen(function(e){console.log("user",e)})}},effects:{fetch:c.a.mark(function e(t,n){var s,a,r;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.payload,a=n.call,r=n.put,e.next=4,r({type:"save"});case 4:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,t){return a()({},e,t.payload)}}}}});