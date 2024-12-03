import { Karta } from "./karta.js";

export class Context
{
    constructor(projekcije)
    {
        this.projekcije=projekcije;
        this.container=null;
        this.karte=[];
        this.idkarte=null;
        this.karta=null;
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
    crtajInputUdivu(type,klasaIn,klasaDiv,host)
    {
        let div=document.createElement("div");
        if(klasaDiv!==null)
            div.className=klasaDiv;
        host.appendChild(div);
        let input=document.createElement("input");
        input.type=type;
        input.disabled=true;
        if(klasaIn!==null)
            input.className=klasaIn;
        div.appendChild(input);
        return input;
        
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
    FecujKarte(sala,proj)
    {
        fetch(`http://localhost:5012/Glavni/VratiKarte/${sala}/${proj}`,{
            method:"GET"
        })
        .then(s=>{
            if(s.ok)
            {
                s.json()
                .then(listaKarti=>{
                    this.karte=[];
                    listaKarti.forEach(x=>{
                        let k=new Karta(x.id,x.red,x.broj,x.rezervisana,x.cena,this);
                        this.karte.push(k);
                    })
                    console.log(this.karte);
                    let prikaz=this.container.querySelector(".prikaz");
                    let glavni=this.container.querySelector(".glavni");
                    console.log(prikaz);
                    if(prikaz!==null){
                        glavni.removeChild(prikaz);
                    }
                    let novi=this.crtajHtml("div","prikaz",null,glavni);
                    this.karte.forEach(x=>{x.crtaj(novi)})
                })
            }
        })
    }
    crtajSelekt(host)
    {
        let sel=this.crtajHtml("select","selekt",null,host);
        this.projekcije.forEach(el=>{
            let op=this.crtajHtml("option",null,el.naziv+": "+el.datum+"-"+el.sala,sel);
            op.value=el.idSale+" "+el.id;
            console.log(op.value)

        })
        sel.addEventListener("change",event=>{
            console.log(sel.options[sel.selectedIndex].value);
            let[sala,proj]=sel.options[sel.selectedIndex].value.split(" ");
            console.log("Sala id:"+sala);
            console.log("Projekcija id:"+proj);
          this.FecujKarte(parseInt(sala),parseInt(proj))

        })
    }
    crtajFormu(host)
    {
        this.crtajLabelUdivu("Kupi kartu","naslov","divNaslov",host);
        let divCentar=this.crtajHtml("div","centar",null,host);
        let levi=this.crtajHtml("div","levi",null,divCentar);
        let desni=this.crtajHtml("div","desni",null,divCentar);
        let labele=["Red:","Broj Sedista:","Cena karte:","Sifra:"];
        let klase=["red","sediste","cena","sifra"];
        labele.forEach((x,ind)=>{
            this.crtajLabelUdivu(x,"labelaUdiv","unutrasnji",levi);
            this.crtajInputUdivu("number",klase[ind],"unutrsnji",desni);
        });
        let divDugme=this.crtajHtml("div","divDugme",null,host);
        let dugme=this.crtajHtml("button","dugme","Kupi kartu",divDugme);
        dugme.addEventListener("click",event=>{
            let inRed=host.querySelector(".red");
            let inSed=host.querySelector(".sediste");
            let inCen=host.querySelector(".cena");
            let inSif=host.querySelector(".sifra");
            let red=parseInt(inRed.value);
            let sediste=parseInt(inSed.value);
            let cena=parseInt(inCen.value);
            let sifra=parseInt(inSif.value);
            fetch(`http://localhost:5012/Glavni/KupiKartu/${this.idkarte}`,{
                method:"POST",
                headers:{"Content-Type":"application/json"}
            })
            .then(s=>{
                if(s.ok)
                {
                            this.karta.container.classList.remove("box");   
                            this.karta.container.className="crvena";
                            alert("Uspesno kupljena karta");
                            inRed.innerHTML="";
                            inRed.value=null;
                            inSed.innerHTML="";
                            inSed.value=null;
                            inSif.innerHTML="";
                            inSif.value=null;
                            inCen.innerHTML="";
                            inCen.value=null;
                            this.karta.rezervisana=true;
                            
                    
                }
            })
            
            
            

        })
        
    }
    
    crtaj(host)
    {
        this.container=this.crtajHtml("div","roditelj",null,host);
        let divSelekt=this.crtajHtml("div","divSelekt",null,this.container);
        let divGlavni=this.crtajHtml("div","glavni",null,this.container);
        let forma=this.crtajHtml("div","forma",null,divGlavni);
        let prikaz=this.crtajHtml("div","prikaz",null,divGlavni);
        //pozivi fja
        this.crtajSelekt(divSelekt);
        this.crtajFormu(forma);
       let sel=this.container.querySelector(".selekt");
       let [sala,proj]=sel.options[sel.selectedIndex].value.split(" ");
       this.FecujKarte(parseInt(sala),parseInt(proj));
    }
}