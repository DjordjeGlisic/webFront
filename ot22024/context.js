import { Recept } from "./recept.js";

export class Context{
    constructor(listaSastojaka)
    {
        this.listaSastojaka=listaSastojaka;
        this.container=null;
        this.op=["yellow","grey","purple","black","red","orange","green"];
        this.i=0;
        this.trenutniSastojci=[];
        this.listaRecepata=[];
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
    crtajLabDiv(sta,inner,tip,klasaDiv,klasaLab,host)
    {
        let div=this.crtajHTML("div",klasaDiv,null,host);
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
        this.container=this.crtajHTML("div","roditelj",null,host);
        let forma=this.crtajHTML("div","forma",null,this.container);
        let prikaz=this.crtajHTML("div","prikaz",null,this.container);
        this.crtajLevuFormu(forma);
        let desnaForma=this.crtajHTML("div","desnaForma",null,forma);
       this.crtajDesnuFormu(desnaForma);
        
    }
    crtajLevuFormu(host)
    {
        let levaForma=this.crtajHTML("div","levaForma",null,host);
        let okvir=this.crtajHTML("div","okvir",null,levaForma);
        let levi=this.crtajHTML("div","levi",null,okvir);
        let desni=this.crtajHTML("div","desni",null,okvir);
        let podaci=["Ime sastojka:","Boja:"];
        podaci.forEach((x,ind)=>{
            let [klasa,nista]=x.split(":");
            this.crtajLabDiv(0,x,null,"unutrasnjiLab","labelaForme",levi);
            if(ind===0)
                this.crtajLabDiv(1,null,"text","unutrasnjiIn","ime",desni);
            else{
                let unutrasnji=this.crtajHTML("div","unutrasnji",null,desni);
                let dugme=this.crtajHTML("button","boja","------",unutrasnji);
                dugme.style.backgroundColor=this.op[this.i];
                dugme.addEventListener("click",event=>{
                    if(this.i>=this.op.length)
                        this.i=0;
                    dugme.style.backgroundColor=this.op[this.i];
                    this.i++;
                })
            }
           
        })
        let divDugme=this.crtajHTML("div","divDugme",null,levaForma);
        let dugme=this.crtajHTML("button","dugme","Dodaj sastojak",divDugme);
        dugme.addEventListener("click",event=>{
            let naziv=desni.querySelector(".ime").value;
            let boja=this.op[this.i];
            fetch(`http://localhost:5181/Glavni/DodajSastojak/${naziv}/${boja}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(s=>{
                if(s.ok)
                {
                    s.json()
                    .then(sastojak=>{
                       let sel= this.container.querySelector(".selekt");
                        let opcija=this.crtajHTML("option",sastojak.naziv,sastojak.naziv,sel);
                        opcija.value=sastojak.id;
                        sel.appendChild(opcija);
                        this.listaSastojaka.push(sastojak);
                    })
                }
            })
        })
    }
    crtajDesnuFormu(host)
    {
       
        let okvir=this.crtajHTML("div","okvir",null,host);
        let levi=this.crtajHTML("div","levi",null,okvir);
        let desni=this.crtajHTML("div","desniD",null,okvir);
       
        let podaci=["Sastojci:","Izbor:"];
        let niz;
        let sastojci=[]
        podaci.forEach((x,ind)=>{
            let [klasa,nista]=x.split(":");
            this.crtajLabDiv(0,x,null,"unutrasnjiLab",klasa,levi);
            if(ind===0)
            {
                niz=this.crtajLabDiv(0,null,null,"unutrasnjiNiz","labelaForme",desni);

            }
            else{
                let unutrasnji=this.crtajHTML("div","unutrasnjiSel",null,desni);
                let sel=this.crtajHTML("select","selekt",null,unutrasnji);
                this.listaSastojaka.forEach(x=>{
                    let op=this.crtajHTML("option",x.naziv,x.naziv,sel);
                    op.value=x.id;
                });
                let dugme=this.crtajHTML("button","miniDugme","Dodaj",unutrasnji);
                dugme.addEventListener("click",event=>{
                    let izbor=parseInt(sel.options[sel.selectedIndex].value);
                    
                    let naz=this.listaSastojaka.find(x=>x.id===izbor);
                    
                    let op=sel.querySelector(`.${naz.naziv}`);
                    sel.removeChild(op);
                    op.value=izbor;
                    niz.innerHTML+=naz.naziv+",";
                    sastojci.push(naz.naziv);
                })
                
            }
           
        })
        let divDugme=this.crtajHTML("div","divDugme",null,host);
        let dugme=this.crtajHTML("button","dugme","Filtriraj prikaz",divDugme);
        dugme.addEventListener("click",event=>{
            console.log(sastojci);
            let filter="";
            sastojci.forEach((x,ind)=>{
                filter+=x;
                if(ind<sastojci.length-1)
                    filter+=",";
            })
            console.log(filter)
            fetch(`http://localhost:5181/Glavni/Filter/${filter}`,{
                method:"POST",
                headers:
                {
                    "Content-Type":"application/json"
                }
                
            })
            .then(s=>{
                if(s.ok)
                {
                    s.json()
                    .then(recpeti=>{
                        this.listaRecepata=[];
                        recpeti.forEach(r=>{
                            let recept=new Recept(r.id,r.ime,r.opis,r.sastojci);
                            this.listaRecepata.push(recept);
                        })
                        let prikaz=this.container.querySelector(".prikaz");
                        this.container.removeChild(prikaz);
                        let novi=this.crtajHTML("div","prikaz",null,this.container);
                        this.listaRecepata.forEach(x=>{
                            x.crtaj(novi);
                        })
                        


                    })
                }
                else
                {
                    alert("Ne postoji nijedan recpet u bazi koji koristi navedene sastojke");
                }
            })

        })
    }
  
}