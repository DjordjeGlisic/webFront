export class Karta{
    constructor(id,red,broj,rezervisana,cena,context)
    {
        this.id=id;
        this.red=red;
        this.broj=broj;
        this.rezervisana=rezervisana;
        this.container=null;
        this.cena=cena;
        this.context=context;
    }
    crtajHtml(element,klasa,inner,host)
    {
        let el=document.createElement(element);
        if(klasa!==null)
            el.className=klasa;
        if(inner!==null)
            el.innerHTML=inner;
        host.appendChild(el);
        return el;
        
    }
    crtajLabelUdivu(inner,klasaIn,klasaDiv,host)
    {
        let div=document.createElement("div");
        if(klasaDiv!==null)
            div.className=klasaDiv;
        host.appendChild(div);
        let label=document.createElement("label");
        label.innerHTML=inner;
        if(klasaIn!==null)
            label.className=klasaIn;
        div.appendChild(label);
        
        
    }
    crtaj(host)
    {
        let klasa="box";
        if(this.rezervisana===true)
            klasa="crvena"
        this.container=this.crtajHtml("div",klasa,null,host);
        this.crtajLabelUdivu("Red:"+this.red+";"+"Broj:"+this.broj,"labelaKarte","divkarte",this.container);
        this.container.addEventListener("click",event=>{
            console.log(this.rezervisana);
            if(this.rezervisana===false){
            let klase=["red","sediste","cena","sifra"];
            let redIn=document.querySelector(".red");
            let sedisteIn=document.querySelector(".sediste");
            let cenaIn=document.querySelector(".cena");
            let sifraIn=document.querySelector(".sifra");
            redIn.value=this.red;
            redIn.innerHTML=this.red;
            sedisteIn.value=this.broj;
            sedisteIn.innerHTML=this.broj;
            cenaIn.value=this.cena;
            cenaIn.innerHTML=this.cena;
            sifraIn.value=this.red;
            sifraIn.innerHTML=this.red;
            this.context.idkarte=this.id;
            this.context.karta=this;
            
            }
            

        })

    }
}