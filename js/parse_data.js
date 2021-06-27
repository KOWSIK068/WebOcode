(function (global) {

var ajaxUtils = {};

function getRequestObject() {
  if (global.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } 
  else if (global.ActiveXObject) {
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } 
  else {
    global.alert("Ajax is not supported!");
    return(null);
  }
}

ajaxUtils.xml = function(requestUrl, responseHandler) {
    var request = getRequestObject();
    request.onreadystatechange = 
      function() { 
        handleResponse(request, responseHandler, false);
      };
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
  };

  ajaxUtils.json = function(requestUrl, responseHandler) {
    var request = getRequestObject();
    request.onreadystatechange = 
      function() { 
        handleResponse(request, responseHandler,true); 
      };
    request.open("GET", requestUrl, true);
    request.send(null);
  };

function handleResponse(request, responseHandler, json) {
  if ((request.readyState == 4) &&
     (request.status == 200)) {
       if(json)
       {
        responseHandler(JSON.parse(request.responseText));
       }
       else
       {
        responseHandler(request.responseText);
       }
  }
}

ajaxUtils.propname = function (str1,obj)
{
    var list = str1.match(/\{\{\w*\}\}/g)
    for (var i of list)
    {
        if(obj==undefined)
            str1=str1.replace(i,"")
        else
            var g = obj[i.slice(2,i.length-2)]
        if(g!=undefined)
            str1=str1.replace(i,g)
    }
    return str1
}

global.parse_data = ajaxUtils;

})(window);