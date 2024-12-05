import { Tura } from "./Tura.js";

export class Context{
    constructor(listaZnamenitosti,listaTura)
    {
        this.listaZnamenitosti=listaZnamenitosti;
        this.listaTura=listaTura;
        this.container=null;
    }
    cHTML(element,klasa,inner,host)
    {
        let el=document.createElement(element);
        if(klasa!==null)
            el.className=klasa;
        if(inner!==null)
            el.innerHTML=inner;
        host.appendChild(el);
        return el;
        
    }
    crtajLabDiv(sta,inner,tip,klasaLab,klasaDiv,host)
    {
        let div=this.cHTML("div",klasaDiv,null,host);
        let el;
        if(sta===0)
        {
            el=this.cHTML("label",klasaLab,inner,div);
        }
        else
        {
            el=this.cHTML("input",klasaLab,null,div);
            el.type=tip;
        }
        return el;
    }
    crtaj(host)
    {
        this.container=this.cHTML("div","roditelj",null,host);
        let celaForma=this.cHTML("div","celaForma",null,this.container);
        let prikaz=this.cHTML("div","prikaz",null,this.container);
        this.crtajDeoForme(0,celaForma);
        this.crtajDeoForme(1,celaForma);
        this.crtajPrikaz(prikaz);
        
    }
    crtajDeoForme(koja,host)
    {
        let klasa=koja===0?"gornjaForma":"donjaForma";
        let forma=this.cHTML("div",klasa,null,host);
        let okvir=this.cHTML("div","okvir",null,forma);
        let levi=this.cHTML("div","levi",null,okvir);
        let desni=this.cHTML("div","desni",null,okvir);
        let atributi=koja===0?["Ime i prezime","Broj licne karte"]:["Ime znamenitosti","Cena"];
        let klase=koja===0?["ime","broj"]:["imeZnam","cena"]
        let tipovi=["text","number"];
        atributi.forEach((atr,ind)=>{
            this.crtajLabDiv(0,atr,null,"labelaForme","unutrasnjiZaLab",levi);
            this.crtajLabDiv(1,null,tipovi[ind],`In${klase[ind]}`,`unutrasnjiZaIn`,desni);
            

        })
        if(koja===0)
        {
            this.crtajLabDiv(0,"Znamenitosti:",null,"labelaForme","unutrasnjiZaLabZ",levi);
            let divCB=this.cHTML("div","divCB",null,desni);
            this.listaZnamenitosti.forEach(z=>{
                let cb=this.cHTML("input","cb",null,divCB);
                cb.type="checkbox";
                cb.value=z.id;
                this.cHTML("label","labelaCB",z.ime,divCB);
            })
        }
        let innerDugma=koja===0?"Zapocni tutu":"Dodaj znamenitost";
        let divDugme=this.cHTML("div","divDugme",null,forma);
        let dugme=this.cHTML("button","dugme",innerDugma,divDugme);
        if(koja===1)
        {
            dugme.addEventListener("click",event=>{
                let inptIme=this.container.querySelector(".InimeZnam");
                
                let inputCena=this.container.querySelector(".Incena").value;
                let ime=inptIme.value;
                let cena=parseFloat(inputCena);
                if(ime.trim()==="")
                {
                    alert("Unesite naziv znamenitosti");
                    return;
                }
                if(inputCena.trim()==="")
                    {
                        alert("Unesite cenu znamenitosti");
                        return;
                    }
                    
                let obj={imeZnamenitosti:ime,cena:cena}
                fetch(`http://localhost:5067/Znamenitost/DodajZnamenitost`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(obj)
                })
                .then(s=>{
                    if(s.ok)
                    {
                        s.json()
                        .then(info=>{
                            let divCB=this.container.querySelector(".divCB");
                            let cb=this.cHTML("input","cb",null,divCB);
                            cb.type="checkbox";
                            cb.value=info.id;
                            this.cHTML("label","labelaCB",info.ime,divCB);

                        })
                    }
                })

            })
        }
        else
        {
            dugme.addEventListener("click",event=>{
                let imePrez=this.container.querySelector(".Inime").value;
                if(imePrez.trim()==="")
                {
                    alert("Unesite ime korisnika");
                    return;
                }
                let licna=this.container.querySelector(".Inbroj").value;
                if(licna.trim()==="")
                {
                    alert("Unesite ime korisnika");
                    return;
                }
                let [ime,prezime]=imePrez.split(" ");
                let korisnik={ime:ime,prezime:prezime,brojLicneKarte:parseInt(licna)};
                let cekiranNiz=this.container.querySelectorAll("input[type='checkbox']:checked");
                let ids="";
                cekiranNiz.forEach((cb,ind)=>{
                    ids+=cb.value;
                    if(ind!==cekiranNiz.length-1)
                        ids+="a";

                })
                console.log(ids);
                fetch(`http://localhost:5067/Tura/FiltrirajTure/${ids}`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(korisnik)
                })
                .then(s=>{
                    if(s.ok)
                    {
                        s.json()
                        .then(resp=>{
                            console.log(resp);
                            if(resp.idStare!==null)
                            {
                                let box=this.container.querySelector(`.Box${resp.idStare}`);
                                let clan=this.listaTura.find(x=>x.id===resp.idStare);
                                clan.preostaloMesta-=1;
                                box.querySelector(".mesta").innerHTML=clan.preostaloMesta;
                                if(resp.menjajBoju===true)
                                {
                                    box.style.backgroundColor="orange";
                                }
                                return;
                            }
                            if(resp.idNove!==null)
                            {
                                fetch(`http://localhost:5067/Tura/VratiTury/${resp.idNove}`,{
                                    method:"GET"
                                })
                                .then(odg=>{
                                    if(odg.ok)
                                    {
                                        odg.json()
                                        .then(x=>{
                                            let tura=new Tura(x.id,x.preostaloMesta,x.znamenitosti,x.cena);
                                            let prikaz=this.container.querySelector(".prikaz");
                                            this.listaTura.push(tura);
                                            tura.crtaj(prikaz);

                                        })
                                        
                                    }
                                })
                            }
                            
                        })
                    }
                })

            })
        }


    }
    crtajPrikaz(prikaz)
    {
        this.listaTura.forEach(x=>{
            let tura=new Tura(x.id,x.preostaloMesta,x.znamenitosti,x.cena);
            tura.crtaj(prikaz);
        })
    }

}