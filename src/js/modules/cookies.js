function setCookie(cname,cvalue,exdays){
    document.cookie = "";
    const exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    let c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=cname + "=" + c_value + ";domain=.snacman.com;path=/";
  }
