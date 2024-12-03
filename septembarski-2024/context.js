import { Racun } from "./racun.js";

export class Context{
    constructor(brojevi)
    {
        this.brojevi=brojevi;
        this.container=null;
        this.id=null;
        this.divDugme=null;
    

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
    crtajLabeluUDivu(inner,klasaD,klasaL,host)
    {
        let lab=document.createElement("label");
        lab.innerHTML=inner;
        lab.className=klasaL;
        let div=document.createElement("div");
        div.className=klasaD;
        host.appendChild(div);
        div.appendChild(lab);
        return div;
    }
    crtajSelektBrojeva(host){
        let sel=this.crtajHtml("select","selekt",null,host);
        this.brojevi.forEach(el=>{
            let op=this.crtajHtml("option",null,el.broj,sel);
            op.value=el.broj;
        })
        return sel;

    }
    crtajSelektIdugme(host){
        let divLabSel=this.crtajHtml("div","labSel",null,host);
        this.crtajLabeluUDivu("Broj stana: ","unutrasnji","labelaUzSelekt",divLabSel);
        let sel=this.crtajSelektBrojeva(divLabSel);
        let divDugme=this.crtajHtml("div","divDugme",null,host);
        let dugme=this.crtajHtml("button","dugme","Prikaz informacija",divDugme);
        dugme.addEventListener("click",event=>{
            let brojStana=parseInt(sel.options[sel.selectedIndex].value);
            fetch(`https://localhost:5001/Stan/VratiStan/${brojStana}`,{
                method:"GET"
            }).then(s=>{
                if(s.ok)
                {
                    s.json()
                    .then(stan=>{
                        let s={
                            brojStana:stan.brojStana,
                            imeVlasnika:stan.imeVlasnika,
                            povrsina:stan.povrsina,
                            brojClanova:stan.brojClanova
                        };
                        this.id=brojStana;
                        let desni=this.container.querySelector(".desni");
                        let roditelj=this.container.querySelector(".divOkvir");
                        roditelj.removeChild(desni);
                        let novi=this.crtajHtml("div","desni",null,roditelj);
                        this.PopuniFormu(s,novi);
                        let racuni=document.querySelector(".divRacuni");
                        let osnovni=document.querySelector(".roditelj");
                        osnovni.removeChild(racuni);
                        let noviDiv=this.crtajHtml("div","divRacuni",null,osnovni);
                        this.CrtajFormuRacuna(brojStana,noviDiv);
                        this.crtajObracunDugme(this.divDugme)



                    })
                }
            })
        })


    }
    CrtajFormuRacuna(id,host)
    {
        fetch(`https://localhost:5001/Stan/VratiRacune/${id}`,{
            method:"GET"
        })
        .then(s=>{
            if(s.ok)
            {
                s.json()
                .then(racuni=>{
                    racuni.forEach(el=>{
                        let racun=new Racun(el.mesec,el.voda,el.struja,el.komunalneUsluge,el.placen);
                        racun.crtaj(host);
                    })
                })
            }
        })


    }
    crtaj(host)
    {
        let roditelj=this.crtajHtml("div","roditelj",null,host);
        let okvir=this.crtajHtml("div","okvir",null,roditelj);
        this.container=okvir;
        let selDugme=this.crtajHtml("div","selDugme",null,okvir);
        let divForma=this.crtajHtml("div","forma",null,okvir);
        this.crtajFormu(divForma);
       this.crtajSelektIdugme(selDugme);
        let divRacuni=this.crtajHtml("div","divRacuni",null,roditelj);

    }
    PopuniFormu(stan,host)
    {
        this.crtajLabeluUDivu(stan.brojStana ,"unutrasnji","labelaUzSelekt",host);
        this.crtajLabeluUDivu(stan.imeVlasnika,"unutrasnji","labelaUzSelekt",host);
        this.crtajLabeluUDivu(stan.povrsina,"unutrasnji","labelaUzSelekt",host);
        this.crtajLabeluUDivu(stan.brojClanova,"unutrasnji","labelaUzSelekt",host);
    }
    crtajFormu(host)
    {
        let divOkvir=this.crtajHtml("div","divOkvir",null,host);
        let divLevi=this.crtajHtml("div","levi",null,divOkvir);
        let divDesni=this.crtajHtml("div","desni",null,divOkvir);
        this.crtajLabeluUDivu("Broj stana: ","unutrasnji","labelaUzSelekt",divLevi);
        this.crtajLabeluUDivu("Ime vlasnika: ","unutrasnji","labelaUzSelekt",divLevi);
        this.crtajLabeluUDivu("Povrsina (m2): ","unutrasnji","labelaUzSelekt",divLevi);
        this.crtajLabeluUDivu("Broj clanova: ","unutrasnji","labelaUzSelekt",divLevi);
        this.divDugme=this.crtajHtml("div","divDugme",null,host);
        this.crtajObracunDugme(this.divDugme);

        

        

    }
    crtajObracunDugme(host)
    {
        
        let staroDugme=host.querySelector("button");
        console.log(staroDugme);
        if(staroDugme!==null){
            host.removeChild(staroDugme);
        
        }
        let dugme=this.crtajHtml("button","dugme","Izracunaj ukupno zaduzenje",host);
        dugme.addEventListener("click",event=>{
            fetch(`https://localhost:5001/Stan/UkupnoZaduzenje/${this.id}`,{
                method:"GET"
            })
            .then(s=>{
                if(s.ok)
                {
                    s.json()
                    .then(res=>{
                        dugme.innerHTML=res;
                        dugme.disabled =true;
                    })
                }
            })
        })
    }
    
}