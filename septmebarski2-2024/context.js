import { Proizvod } from "./proizvod.js";

export class Context{
    constructor(kategorije)
    {
        this.kategorije=kategorije;
        this.container=null;
        this.korpa=null;
    }
    crtajHtml(element,klasa,inner,host)
    {
        let el=document.createElement(element);
        if(klasa!=null)
            el.className=klasa;
        if(inner!=null)
            el.innerHTML=inner;
        host.appendChild(el);
        return el;
        
    }
    crtajSelekt(host)
    {
        // let sel=document.createElement("select");
        // sel.className="selekt";
        // host.appendChild(sel);
        let sel=this.crtajHtml("select","selekt",null,host);
        this.kategorije.forEach(x=>{
            let op=this.crtajHtml("option",null,x.naziv,sel);
            op.value=x.id;
        })
        
        return sel;
    }
    pribaviProizvode(kategorija,divCentar)
    {
        fetch(`http://localhost:5200/Proizvod/VratiProizvodeOdredjenogTipa/${kategorija}`,{
            method:"GET"
        })
        .then(s=>{
            if(s.ok)
            {
                s.json()
                .then(proizvodi=>{
                    let listaProizvoda=[];
                    proizvodi.forEach(x=>{
                        let pr=new Proizvod(x.id,x.naziv,x.kolicina,x.cena,x.opis,x.tip,this);
                        listaProizvoda.push(pr);
                    })
                    this.pribaviKorpu(listaProizvoda,divCentar,kategorija);
                    

                })
            }
        })
    }
    crtajProizvode(listaProizvoda,divCentar,kategorija)
    {
        let boxovi=divCentar.querySelectorAll(".box");
        console.log(boxovi);
        boxovi.forEach(box=>{
            divCentar.removeChild(box);
        })
        listaProizvoda.forEach(el=>{
            el.CrtajFormu(divCentar,this.korpa,kategorija);
        })


    }
    pribaviKorpu(listaProizvoda,divCentar,kategorija)
    {
        fetch("http://localhost:5200/Proizvod/NapraviKorpu",{
            method:"POST"
        })
        .then(s=>{
            if(s.ok)
            {
                s.json()
                .then(res=>{
                    console.log(res);
                    this.korpa=res;
                    console.log(this.korpa);
                  //  this.crtajProizvode(listaProizvoda,divCentar);
                  
                  this.crtajProizvode(listaProizvoda,divCentar,kategorija);
                })
            }
        })
    }
    crtaj(host)
    {
        //this.pribaviKorpu();
        this.container=this.crtajHtml("div","roditelj",null,host);
        let divSelekt=this.crtajHtml("div","divSelekt",null,this.container);
        let div=this.crtajHtml("div","glavni",null,this.container);
        this.crtajHtml("div","detalji",null,div);
        let divCentar=this.crtajHtml("div","centar",null,div);
       this.CrtajKorpu(div);
        let sel=this.crtajSelekt(divSelekt);
        document.addEventListener("DOMContentLoaded",event=>{
            let kategorija=parseInt(sel.options[sel.selectedIndex].value);
            this.pribaviProizvode(kategorija,divCentar);
        })
        sel.addEventListener("change",event=>{
            let kategorija=parseInt(sel.options[sel.selectedIndex].value);
            this.pribaviProizvode(kategorija,divCentar);
        })
        

    }
    CrtajKorpu(host)
    {
        let divKorpa=this.crtajHtml("div","korpa",null,host);
    }


}