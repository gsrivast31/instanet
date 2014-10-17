this["InstaNet"] = this["InstaNet"] || {};
this["InstaNet"]["Templates"] = this["InstaNet"]["Templates"] || {};

this["InstaNet"]["Templates"]["/scripts/templates/reminder_item"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"view\">\n	<input class=\"toggle\" type=\"checkbox\" ";
  if (helper = helpers.completed) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.completed); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ? 'checked' : '' >\n	<label>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\n    <button class=\"destroy\"></button>\n    <label>";
  if (helper = helpers.date) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.date); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\n</div>";
  return buffer;
  });

this["InstaNet"]["Templates"]["/scripts/templates/todo_item"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"view\">\n	<input class=\"toggle\" type=\"checkbox\" ";
  if (helper = helpers.completed) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.completed); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ? 'checked' : '' >\n    <label>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\n    <button class=\"destroy\"></button>\n</div>\n<input class=\"edit\" value=\"";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  return buffer;
  });

this["InstaNet"]["Templates"]["/scripts/templates/weather"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"weather\">\n	<div class=\"clock\">\n	    <div id=\"Date\"></div>\n		<br>\n		<ul>\n	    	<li id=\"hours\"></li>\n	        <li id=\"point\">:</li>\n	        <li id=\"min\"></li>\n	        <li id=\"point\">:</li>\n	        <li id=\"sec\"></li>\n	    </ul>\n	</div>\n\n	<br><br>\n	<div class=\"metric-label\">\n		<span class=\"location data\">";
  if (helper = helpers.location) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.location); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n	</div>\n	<br><br>\n	<div class=\"metric-stat\">\n	    ";
  if (helper = helpers.temperature) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.temperature); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&deg;<span class=\"unit ";
  if (helper = helpers.unitClass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.unitClass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.unit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.unit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span><span> ";
  if (helper = helpers.condition) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.condition); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n	</div>\n	<br><br>\n	<div class=\"metric-forecast\">\n	    "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.forecast_1)),stack1 == null || stack1 === false ? stack1 : stack1.day)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<span>    High "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.forecast_1)),stack1 == null || stack1 === false ? stack1 : stack1.high)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&deg;";
  if (helper = helpers.unit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.unit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span><span>    Low "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.forecast_1)),stack1 == null || stack1 === false ? stack1 : stack1.low)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&deg;";
  if (helper = helpers.unit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.unit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n	    <span>    "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.forecast_1)),stack1 == null || stack1 === false ? stack1 : stack1.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	    <br>\n	    "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.forecast_2)),stack1 == null || stack1 === false ? stack1 : stack1.day)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<span>    High "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.forecast_2)),stack1 == null || stack1 === false ? stack1 : stack1.high)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&deg;";
  if (helper = helpers.unit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.unit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span><span>    Low "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.forecast_2)),stack1 == null || stack1 === false ? stack1 : stack1.low)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&deg;";
  if (helper = helpers.unit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.unit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n	    <span>    "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.forecast_2)),stack1 == null || stack1 === false ? stack1 : stack1.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	    <br>\n	    "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.forecast_3)),stack1 == null || stack1 === false ? stack1 : stack1.day)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<span>    High "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.forecast_3)),stack1 == null || stack1 === false ? stack1 : stack1.high)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&deg;";
  if (helper = helpers.unit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.unit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span><span>    Low "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.forecast_3)),stack1 == null || stack1 === false ? stack1 : stack1.low)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&deg;";
  if (helper = helpers.unit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.unit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n	    <span>    "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.forecast_3)),stack1 == null || stack1 === false ? stack1 : stack1.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	</div>\n	\n</div>";
  return buffer;
  });