var $,LinkList,React;$=require("jquery"),React=require("react"),module.exports=LinkList=React.createClass({render:function(){var e;return e=this.props.items.map(function(e){return function(t){return React.createElement("li",{className:e.props.itemClassName},React.createElement("a",{href:t.href,className:e.props.anchorClassName},t.text))}}(this)),React.createElement("ul",{className:this.props.className},e)}});