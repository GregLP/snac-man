function setCookie(c_name,value,exdays){
    document.cookie = "";
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value + ";domain=.snacman.com;path=/";
  }
