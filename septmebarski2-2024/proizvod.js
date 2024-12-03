import { Korpa } from "./korpa.js";

export class Proizvod{
    constructor(id,naziv,kolicina,cena,opis,tip,context)
    {
        this.id=id;
        this.naziv=naziv;
        this.kolicina=kolicina;
        this.cena=cena;
        this.opis=opis;
        this.tip=tip;
        this.container=null;
        this.context=context;
      
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
    crtajLabeluUDivu(inner,klasaLab,klasaDiv,host)
    {
        let div=this.crtajHtml("div",klasaDiv,null,host);
        let lab=this.crtajHtml("label",klasaLab,inner,div);
    }
    crtajDetalje(host)
    {
        let divNaslov=this.crtajHtml("div","nalsov",null,host);
        this.crtajLabeluUDivu("Naziv","labC","divNaslov",divNaslov);
        this.crtajLabeluUDivu(this.naziv,"labB","divNaslov",divNaslov);
        let divOpis=this.crtajHtml("div","opis",null,host);
        this.crtajHtml("p","paragraf",this.opis,divOpis);
        let divCena=this.crtajHtml("div","nalsov",null,host);
        this.crtajLabeluUDivu("Cena","labC","divNaslov",divCena);
        this.crtajLabeluUDivu(this.cena+" dinara","labB","divNaslov",divCena);
        let divKolicina=this.crtajHtml("div","nalsov",null,host);
        this.crtajLabeluUDivu("Preostala kolicina","labC","divNaslov",divKolicina);
        this.crtajLabeluUDivu(this.kolicina+" komada","labB","divNaslov",divKolicina);
        
    }
   
    CrtajFormu(host,korpa,kategorija)
    {

        let divBox=this.crtajHtml("div","box",null,host);
        this.container=divBox;
        let divOkvir=this.crtajHtml("div","okvir",null,divBox);
      //  let divDugme=this.crtajHtml("div","divDugme",null,divBox);
        let divLevi=this.crtajHtml("div","divLevi",null,divOkvir);
        let divDesni=this.crtajHtml("div","divDesni",null,divOkvir);
        this.crtajLabeluUDivu("Naziv","leva","levi",divLevi);
        this.crtajLabeluUDivu("Kolicina","leva","levi",divLevi);
        this.crtajLabeluUDivu("Cena(kom)","leva","levi",divLevi);
        this.crtajLabeluUDivu("opis","leva","levi",divLevi);
        this.crtajLabeluUDivu(this.naziv,"desna","desni",divDesni);
        this.crtajLabeluUDivu(this.kolicina,"desna","desni",divDesni);
        this.crtajLabeluUDivu(this.cena+" din","desna","desni",divDesni);
        this.crtajLabeluUDivu(this.opis,"desna","desni",divDesni);
        let kupi=this.crtajHtml("button","kupi","Kupi",divDesni);
        
        this.container.addEventListener("click",event=>{
            let boxovi=host.querySelectorAll(".zeleni");
            boxovi.forEach(x=>{x.className="box"});
            this.container.className="zeleni";
            let divDetalji=document.querySelector(".detalji");
            let roditelj=divDetalji.parentNode;
            roditelj.removeChild(divDetalji);
            divDetalji=this.crtajHtml("div","detalji",null,roditelj);
            this.crtajDetalje(divDetalji);
        })
        kupi.addEventListener("click",event=>{
            fetch(`http://localhost:5200/Proizvod/DodajProizvodUKorpu/${this.id}/${korpa}`,{
                method:"POST"
            })
            .then(s=>{
                if(s.ok)
                {
                    s.json()
                    .then(korpa=>{
                        let k=new Korpa(korpa.id,korpa.proizvodi,korpa.ukupno,this.context,kategorija);
                        let divCentar=this.container.parentNode;
                        let divGlavni=divCentar.parentNode;
                        let divKorpa=divGlavni.querySelector(".korpa");

                        k.craj(divKorpa)
                    })
                }
            })
        })

      
        
        
        
        
    }
}