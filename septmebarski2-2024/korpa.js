export class Korpa{
    constructor(id,proizvodi,ukupno,context,kategorija)
    {
        this.id=id;
        this.proizvodi=proizvodi;
        this.container=null;
        this.ukupno=ukupno;
        this.context=context;
        this.kategorija=kategorija

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
    craj(host)
    {
        console.log(host);
        let roditelj=host.parentNode;
        console.log(roditelj);
         roditelj.removeChild(host);
         this.container=this.crtajHtml("div","korpa",null,roditelj);
         let divOkvir=this.crtajHtml("div","okvir",null,this.container);
        let divLevi=this.crtajHtml("div","divLevi",null,divOkvir);
        let divDesni=this.crtajHtml("div","divDesni",null,divOkvir);
        this.proizvodi.forEach(element=>{
            this.crtajLabeluUDivu(element.naziv,"labelaLeva","divUnutrasnji",divLevi);
            this.crtajLabeluUDivu("Cena: "+element.cena+" din","labelaDesna","divUnutrasnji",divDesni);
        })
        this.crtajLabeluUDivu("Ukupno:","labelaUkupno","divUnutrasnji",divLevi);
        this.crtajLabeluUDivu("Cena: "+this.ukupno+" din","labelaUkupnoVr","divUnutrasnji",divDesni);
        let kupi=this.crtajHtml("button","dugme","Naruci",this.container);
        kupi.addEventListener("click",event=>{
           this.kupi(roditelj);
        })    


    }
    kupi(roditelj)
    {
        fetch(`http://localhost:5200/Proizvod/ObrisiKorpuSmanjiKolicinuProizvoda/${this.id}`,{
            method:"DELETE"
        })
        .then(s=>{
            if(s.ok)
            {
                
                       roditelj.removeChild(this.container);
                       let divCentar=roditelj.querySelector(".detalji");
                        this.context.pribaviProizvode(this.kategorija,divCentar);
                        this.context.CrtajKorpu(roditelj);
                    
               
            }
        })
    }

    
}