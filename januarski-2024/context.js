import { Soba } from "./soba.js";

export class Context{
    constructor(korisnici,sobe)
    {
        this.korisnici=korisnici;
        this.sobe=sobe;
        this.container=null;
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
    crtajLabelaDiv(inner,klasaLab,klasaDiv,host)
    {
        let div=this.crtajHtml("div",klasaDiv,null,host);
        this.crtajHtml("label",klasaLab,inner,div);

        
    }
    crtajInputDiv(type,klasaIn,klasaDiv,host)
    {
        let div=this.crtajHtml("div",klasaDiv,null,host);
        let input=this.crtajHtml("input",klasaIn,null,div);
        input.type=type;
        return input;

        
    }
    SelektKorisnika(host)
    {
        let div=this.crtajHtml("div","unutrasnji",null,host);
        let sel=this.crtajHtml("select","selekt",null,div);
        this.korisnici.forEach(x=>{
            let op=this.crtajHtml("option",null,x.username,sel);
            op.value=x.id;
        });
        sel.addEventListener("change",event=>{
            let id=sel.options[sel.selectedIndex].value;
       let kor=this.korisnici.find(x=>x.id==id);
       let klasa=this.NadjiBoju(kor.boja);
       let div2=this.container.querySelector(".unutar");
       div2.style.backgroundColor=klasa;
        })
        return sel;
        
    }
    crtaj(host)
    {
        this.crtajLabelaDiv("Cet sobe","naslov","naslovni",host);
        this.container=this.crtajHtml("div","roditelj",null,host);
        let forma=this.crtajHtml("div","forma",null,this.container);
        let prikaz=this.crtajHtml("div","prikaz",null,this.container);
        this.crtajFormu(forma);
        this.crtajPrikaz(prikaz);
        

    }
    crtajPrikaz(host)
    {
        this.sobe.forEach(soba=>{soba.crtaj(host)});

    }
    crtajFormu(host)
    {
        let okvir=this.crtajHtml("div","okvir",null,host);
        let levi=this.crtajHtml("div","levi",null,okvir);
        let desni=this.crtajHtml("div","desni",null,okvir);
        let nizlabela=["Soba:","Korisnik:","Nadimak:","Boja:"];
        nizlabela.forEach(x=>{this.crtajLabelaDiv(x,"labela","unutrasnji",levi)});
        let inSoba=this.crtajInputDiv("text","soba","unutrasnjiInput",desni);
        let sel=this.SelektKorisnika(desni);
        let inNadimak=this.crtajInputDiv("text","nadimak","unutrasnjiInput",desni);
       let div=this.crtajHtml("div","spoljasni",null,desni);
       
       let id=sel.options[sel.selectedIndex].value;
       console.log(this.korisnici);
       let kor=this.korisnici.find(x=>x.id==id);
       console.log(kor);
      let klasa=this.NadjiBoju(kor.boja);
       
       let div2=this.crtajHtml("div","unutar",null,div);
       div2.style.backgroundColor=klasa;
       let divDugme=this.crtajHtml("div","divDugme",null,host);
       let dugme=this.crtajHtml("button","dugme","Dodaj",divDugme);
       dugme.addEventListener("click",event=>{
           let dodaj={korisncko:this.korisnici.find(x=>x.id==sel.options[sel.selectedIndex].value).username,nadimak:inNadimak.value};
           console.log(dodaj);
        fetch(`https://localhost:5001/Glavni/DodajKorisnikaSobi/${inSoba.value}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(dodaj)

        }).then(s=>{
            if(s.ok)
            {
                let prikaz=this.container.querySelector(".prikaz");
                this.container.removeChild(prikaz);
                let novi=this.crtajHtml("div","prikaz",null,this.container);
                fetch(`https://localhost:5001/Glavni/VratiCetSobe`,{method:"GEt"})
                .then(k=>{if(k.ok){k.json()
                    .then(lista=>{
                        this.sobe=[];
                        lista.forEach(x=>{
                            let s=new Soba(x.id,x.soba,x.clanovi);
                            this.sobe.push(s);

                        })
                        this.sobe.forEach(x=>{x.crtaj(novi);})
                    })
                }} )
            }
            if(!s.ok)
            {
                alert("Prekoracen je kapacitet sobe");
            }
            
        })
       })
        
    }
    NadjiBoju(boja)
    {
        let klasa;
        switch(boja)
        {
         case 1:
             klasa="black";
             break;
         case 2:
             klasa="white";
             break;
         case 3:
             klasa="green";
             break;
         case 4:
             klasa="blue";
             break;
         case 5:
             klasa="red";
             break;
         default:
             klasa="yellow";
             break;
 
        }
        return klasa;
    }
}