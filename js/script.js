document.addEventListener("DOMContentLoaded",()=>{
    var root=document.querySelector(":root").style;
    var isdark=false;
    document.querySelector("#mode").addEventListener("click",()=>{
        if(isdark){  //white mode
            root.setProperty("--shadow","rgba(0, 0, 0, 0.5)")
            root.setProperty("--high","black")
            root.setProperty("--low","white")
            root.setProperty("--place_holder","grey")
            root.setProperty("--search","white")
            root.setProperty("--background_img","url(../img/background.jpg)")
            root.setProperty("--mode_img","url(../img/darkmode.jpg)")
            document.querySelector("#search_icon").setAttribute("src","img/search.jpg")
            document.querySelector("#mode").style.backgroundSize="105%"
            isdark=false
        }
        else{        //dark mode
            root.setProperty("--shadow","rgba(255, 255, 255, 0.5)")
            root.setProperty("--high","white")
            root.setProperty("--low","black")
            root.setProperty("--place_holder","rgb(180, 180, 180)")
            root.setProperty("--search","rgb(40, 40, 40)")
            root.setProperty("--background_img","url(../img/background_dark.png)")
            root.setProperty("--mode_img","url(../img/lightmode.jpg)")
            document.querySelector("#search_icon").setAttribute("src","img/search_dark.jpg")
            document.querySelector("#mode").style.backgroundSize="100%"
            isdark=true
        }
    })
})