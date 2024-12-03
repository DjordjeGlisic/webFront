export class Recept{
    constructor(id,ime,opis,sastojci)
    {
        this.id=id;
        this.ime=ime;
        this.opis=opis;
        this.sastojci=sastojci;
      
        this.container=null;

    }
    crtajHTML(element,klasa,inner,host)
    {
        let el=document.createElement(element);
        if(klasa!==null)
            el.className=klasa;
        if(inner!==null)
            el.innerHTML=inner;
        host.appendChild(el);
        return el;
        
    }
    crtajLabDiv(sta,inner,tip,klasaDiv,bg,klasaLab,host)
    {
        let div=this.crtajHTML("div",klasaDiv,null,host);
        bg!==null?div.style.backgroundColor=bg:null;
        let el;
        if(sta===0)
        {
            el=this.crtajHTML("label",klasaLab,inner,div);
        }
        else
        {
            el=this.crtajHTML("input",klasaLab,null,div);
            el.type=tip;
        }
        return el;
    }
    crtaj(host)
    {
       this.container=this.crtajHTML("div","box",null,host);
       this.crtajLabDiv(0,this.ime,null,"naslovBox",null,"labNaslovBox",this.container);
       let sredina=this.crtajHTML("div","sredina",null,this.container);
       this.sastojci.forEach(s=>{
           this.crtajLabDiv(0,s.naziv,null,"sastojakDiv",s.boja,"sastojakLab",sredina);
           
        })
        this.crtajLabDiv(0,this.opis,null,"opisBox",null,"labOpisBox",this.container);
       

    }
}