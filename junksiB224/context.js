import { Sala } from "./sala.js";

export class Context{
    constructor()
    {
        this.container=null;
        this.listaSala=[];
    }
    ctrtajHtml(element,klasa,inner,host)
    {
        let el=document.createElement(element);
        if(klasa!==null)
            el.className=klasa;
        if(inner!==null)
            el.innerHTML=inner;
        host.appendChild(el);
        return el;
        
    }
    crtajLabDiv(sta,inner,tip,klasaDiv,klasaLab,host)
    {
        let div=this.ctrtajHtml("div",klasaDiv,null,host);
        let unutra;
        if(sta==0)
        {
            unutra=this.ctrtajHtml("label",klasaLab,inner,div);
        
        }
        else
        {
            unutra=this.ctrtajHtml("input",klasaLab,null,div);
            unutra.type=tip;
        

        }
        return unutra;
    }
    crtaj(host)
    {
         this.container=this.ctrtajHtml("div","roditelj",null,host);
         let forma=this.ctrtajHtml("div","forma",null,this.container);
         let prikaz=this.ctrtajHtml("div","prikaz",null,this.container);
         this.crtajFormu(forma);

    }
  
    crtajFormu(host)
    {
       
        let formaFilter=this.ctrtajHtml("div","formaFilter",null,host);
        let formaPodaci=this.ctrtajHtml("div","formaPodaci",null,host);
        let okvirGornji=this.ctrtajHtml("div","okvir",null,formaFilter);
        let niz=["Cena:","Kapacitet:","Slobodna:","Datum:"];
        let tipovi=["number","number","null","date"]
        let leviG=this.ctrtajHtml("div","levi",null,okvirGornji);
        let desniG=this.ctrtajHtml("div","desni",null,okvirGornji);
        niz.forEach((x,ind)=>{
            this.crtajLabDiv(0,x,null,"unutrasnji","unutrasnja",leviG);
                if(ind!==2)
                {
                    let tip=tipovi[ind];
                    let [klasa,ostatak]=x.split(":");
                    this.crtajLabDiv(1,null,tip,"unutrasnji2",klasa,desniG);
                }
                else
                {
                    console.log(x);
                    let cb=this.crtajLabDiv(1,null,"checkbox","unutrasnji3","check",desniG);

                }
        })
        let divDugme=this.ctrtajHtml("div","divDugme",null,formaFilter);
        let dugme=this.ctrtajHtml("button","dugme","Filtrtiraj prikaz",divDugme);
        let okvirDonji=this.ctrtajHtml("div","okvir",null,formaPodaci);
        let leviD=this.ctrtajHtml("div","levi",null,okvirDonji);
        let desniD=this.ctrtajHtml("div","desni",null,okvirDonji);
        this.crtajLabDiv(0,"Ime i prezime:",null,"unutrasnji","unutrasnja",leviD);
        this.crtajLabDiv(0,"JMBG:",null,"unutrasnji","unutrasnja",leviD);
        this.crtajLabDiv(1,null,"text","unutrasnji4","imePrezime",desniD);
        this.crtajLabDiv(1,null,"number","unutrasnji4","Jmbg",desniD);
        dugme.addEventListener("click",event=>{
            let cena=this.container.querySelector(".Cena").value;
            let kapacitet=this.container.querySelector(".Kapacitet").value;
            let zauzeta=this.container.querySelector(".check").checked;
            let datum=this.container.querySelector(".Datum").value;
          
           
            if(cena.trim()==="")
                cena=-1;
            if(kapacitet.trim()==="")
                kapacitet=-1;
            if(datum.trim()==="")
                datum="string";
            console.log("Datum"+datum);
            if(zauzeta===true)
                zauzeta="ne";
            else
                zauzeta="da";
            let upit={cena:cena,kapacitet:kapacitet,zauzeta:zauzeta,datum:datum}
            fetch(`https://localhost:44367/Glavni/FilterSale`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(upit)
            })
            .then(s=>{
                if(s.ok)
                {
                    s.json()
                    .then(sale=>{
                        this.listaSala=[];
                        sale.forEach(x=>{
                            let sala={id: x.id,kapacitet:x.kapacitet,adresa: x.adresa,cena:x.cena,iznajmljen:x.iznajmljen};
                            this.listaSala.push(sala);
                        })
                            console.log(this.listaSala);
                            let prikaz=this.container.querySelector(".prikaz");
                            this.container.removeChild(prikaz);
                            let novi=this.ctrtajHtml("div","prikaz",null,this.container);
                            let imePrezime=this.container.querySelector(".imePrezime");
                            let jmbg=this.container.querySelector(".Jmbg");
                            let datum=this.container.querySelector(".Datum");
                            this.listaSala.forEach(x=>{
                                let sala=new Sala(x.id,x.kapacitet,x.adresa,x.cena,x.iznajmljen,imePrezime,jmbg,datum);

                                sala.crtaj(novi)
                            })
                    })
                }
            })

            
            
            
        })
        
        

        
        
    }
}