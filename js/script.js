function load(){
    if (curr>0) {
        var i;
        if (curr==1) {
            i="homeapplicants"
        } else {
            i="techapplicants"
        }
        parse_data.xml("snippets/applicants.html",(html)=>{
            document.querySelector("#body").innerHTML=html.replace("{{name}}",pages[curr])
            parse_data.json("snippets/content.json",(json)=>{
                Object.keys(json[pages[curr]]).forEach((value)=>{
                    document.querySelector("#holder").innerHTML+=
`<div class="cont">
    <div class="categories" style="background-image: url(img/` + i +`.jpg);">
    <div class="title">`+value+`</div>
</div>
</div>
`
                })
            })
        })
    }
    else{
    parse_data.xml("snippets/"+pages[curr]+".html",(html)=>{
        document.querySelector("#body").innerHTML=html
        document.querySelector("#search_icon").addEventListener("click",()=>{
            search()
        })
        document.querySelector("#search").addEventListener("keypress",(event)=>{
            if(event.code=="Enter"){
                search()
            }
        })
    })}
}

function search(){
    var s=document.querySelector("#search").value.toLowerCase()
    Object.keys(window.json).forEach((value,index)=>{
        if(value.toLowerCase()==s){
            curr=index+1
            load()
        }
        else{
            Object.keys(window.json[value]).forEach((value1)=>{
                if(value1.toLowerCase()==s){
                    curr=index+1
                    load()
                }
            })
        }
    })
}

var curr=0
var pages=["home","Home Applicants","Tech Applicants"]

document.addEventListener("DOMContentLoaded",()=>{
    load()
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
            root.setProperty("--nav_back","rgba(255, 255, 255, 0.75)")
            document.getElementById("theme").setAttribute("content","grey")
            root.setProperty("--cback","rgb(226, 226, 226)")
            if(curr==0){
            document.querySelector("#search_icon").setAttribute("src","img/search.jpg")
            document.querySelector("#mode").style.backgroundSize="105%"
            }
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
            root.setProperty("--cback","black")
            root.setProperty("--nav_back","rgba(15, 15, 15, 0.75)")
            document.getElementById("theme").setAttribute("content","rgb(40, 40, 40)")
            if(curr==0){
            document.querySelector("#search_icon").setAttribute("src","img/search_dark.jpg")
            document.querySelector("#mode").style.backgroundSize="100%"}
            isdark=true
        }
    })
    document.querySelector("#home").addEventListener("click",()=>{
        if(curr!=0){
        curr=0
        load()
        }
    })
    document.querySelector("#homeapplicant").addEventListener("click",()=>{
        if(curr!=1){
        curr=1
        load()
        }
    })
    document.querySelector("#techapplicant").addEventListener("click",()=>{
        if(curr!=2){
        curr=2
        load()
        }
    })
    parse_data.json("snippets/content.json",(json)=>{
        window.json=json;
    })
})