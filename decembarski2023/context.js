export class Context{
    constructor(prodavnice)
    {
        this.prodavnice=prodavnice;
        this.container=null;
    }
    cetajHTML(element,klasa,inner,host)
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
        let div=this.cetajHTML("div",klasaDiv,null,host);
        let upis;
        if(sta===0)
        {
            upis=this.cetajHTML("label",klasaLab,inner,div);
        
        }
        else
        {
            upis=this.cetajHTML("input",klasaLab,null,div);
            upis.type=tip;
        

        }
        return upis;
    }
    crtaj(host)
    {
        this.container=this.cetajHTML("div","roditelj",null,host);
        this.prodavnice.forEach(prodavnica=>{
            this.crtaj2(this.container,prodavnica.id,prodavnica.naziv,prodavnica.proizvodi);
        })

    }
    crtaj2(host,id,naziv,proizvodi)
    {
        let okvirForme=this.cetajHTML("div","okvirForme",null,host);
        let forma=this.cetajHTML("div","forma",null,okvirForme);
        let prikaz=this.cetajHTML("div","prikaz",null,okvirForme);
        this.crtajFormu(forma,id);
        this.crtajPrikaz(prikaz,id,naziv,proizvodi);
    }
    crtajFormu(host,id)
    {
        let naslov=this.cetajHTML("div","divNaslov",null,host);
        let sredina=this.cetajHTML("div","divSredina",null,host);
        let dugme=this.cetajHTML("div","divDugme",null,host);
        this.cetajHTML("label","naslovnaLab","Unos proizvoda",naslov);
        let okvir=this.cetajHTML("div","okvir",null,sredina);
        let levi=this.cetajHTML("div","levi",null,okvir);
        let desni=this.cetajHTML("div","desni",null,okvir);
        let sel;
        let atributi=["Naziv","Kategorija","Cena","Kolicina"];
        let tipovi=["text",null,"number","number"];
        atributi.forEach(x=>{
            this.crtajLabDiv(0,x+":",null,"atribut","unutrasnjiLab",levi);
        })
        tipovi.forEach((x,ind)=>{
            if(x!==null)
            {
                this.crtajLabDiv(1,null,x,atributi[ind],"unutrasnjInput",desni);
            }
            else
            {
                 sel=this.cetajHTML("select","selekt",null,desni);
                let opcije=["Knjiga","Igracka","Pribor","Ostalo"];
                opcije.forEach((x,ind)=>{
                    let op=this.cetajHTML("option",null,x,sel);
                    op.value=ind+1;
                    console.log("Indeks "+op.value);
                })
            }
        })
        let btn=this.cetajHTML("button","btn","Dodaj proizvod",dugme);
        btn.addEventListener("click",event=>{
            let naziv=this.container.querySelector(".Naziv").value;
            let kategorija=parseInt(sel.options[sel.selectedIndex].value);
            let cena=this.container.querySelector(".Cena").value;
            cena=parseFloat(cena);
            let kolicina=this.container.querySelector(".Kolicina").value;
            kolicina=parseInt(kolicina);
            let dto={naziv:naziv,kategorijaProizvoda:kategorija,cena:cena,kolicina:kolicina}
            fetch(`http://localhost:5087/Proizvod/DodajProizvodProdavnici/${id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    
                },
                body:JSON.stringify(dto)
            })
            .then(s=>{
                if(s.ok)
                {
                    s.json()
                    .then(resp=>{
                        this.prodavnice=[];
                        fetch(`http://localhost:5087/Prodavnica/VratiProizvodeProdavnice`,
                            {
                                method:"GET"
                            }
                        )
                        .then(s=>{
                            if(s.ok)
                            {
                                s.json()
                                .then(lista=>{
                                    lista.forEach(x=>{
                                        let p={id:x.id,naziv:x.naziv,proizvodi:x.proizvodi};
                                        this.prodavnice.push(p);
                                    })
                                    let body=this.container.parentNode;
                                    body.removeChild(this.container);
                                    this.crtaj(body);
                                })
                            }
                        
                        })
                    }
                    )
                }
            })

        })
        
        
    }
    crtajPrikaz(host,id,naziv,proizvodi)
    {
        let naslov=this.cetajHTML("div","gornjiPrikaz",null,host);
        let sredina=this.cetajHTML("div","srednjiPrikaz",null,host);
        this.cetajHTML("label","naslovPrikaza","Prodavnica:"+naziv,naslov);
        let okvirPrikaza=this.cetajHTML("div","okvirPrikaza",null,sredina);
        let leviPrikaz=this.cetajHTML("div","leviPrikaz",null,okvirPrikaza);
        let desniPrikaz=this.cetajHTML("div","desniPrikaz",null,okvirPrikaza);
        let boje=["green","red","blue"];
        let i=0;
        proizvodi.forEach(proizvod=>{
            let lab=this.crtajLabDiv(0,proizvod.naziv+":"+proizvod.kolicina,null,"naslovProizvoda","divNaslovProizvoda",leviPrikaz);
            let ukupno=this.cetajHTML("div","ukupno",null,leviPrikaz);
            ukupno.style.border=`1px dotted ${boje[i]}`;
            let trenutno=this.cetajHTML("div","trenutno",null,ukupno);
            trenutno.style.backgroundColor=boje[i];
            trenutno.style.width=`${proizvod.kolicina}%`
            i++;
            if(i===3)
                i=0;
            let divMiniForma=this.cetajHTML("div","miniForma",null,desniPrikaz);
            this.cetajHTML("label","labelaMiniForme","Kolicina:",divMiniForma);
            let input=this.cetajHTML("input",`kolicnaProdaje+${id}`,null,divMiniForma);
            input.type="number";
            let prodaj=this.cetajHTML("button","prodajDugme","Prodaj",divMiniForma);
            prodaj.addEventListener("click",event=>{
                let kolicina=parseInt(input.value);
                if(kolicina>proizvod.kolicina)
                {
                    alert("Uneli ste vecu kolicinu od raspolozive za dati prozivod");
                    return;
                }
                fetch(`http://localhost:5087/Proizvod/ProdajProizvodeizProdavnice/${proizvod.id}/${kolicina}`,{
                    method:"PUT",
                    headers:{"Content-Type":"application/json"}
                })
                .then(s=>{
                    if(s.ok)
                    {
                        s.json()
                        .then(nova=>{
                            
                            lab.innerHTML=proizvod.naziv+":"+nova;
                            proizvod.kolicina=nova;
                            trenutno.style.width=`${proizvod.kolicina}%`
                        })
                    }
                })
            })

        })
    }
}