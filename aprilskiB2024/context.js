export class Context{
    constructor(maraton,listaTakmicara)
    {
        this.maraton=maraton;
        this.listaTakmicara=listaTakmicara;
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
    crtajLabDiv(sta,inner,type,klasaLab,klasaDiv,host)
    {
        let div=this.crtajHtml("div",klasaDiv,null,host);
        let el;
        if(sta===0)
        {
            el=this.crtajHtml("label",klasaLab,inner,div);
        }
        else
        {
            el=this.crtajHtml("input",klasaLab,null,div);
            el.type=type;
        }
        return el;

    }
    crtajSelekt(host)
    {
        let sel=this.crtajHtml("select","selekt",null,host);
        this.listaTakmicara.forEach(x=>{
            let op=this.crtajHtml("option",null,x.imePrezime,sel);
            op.value=x.id;
        })
        return sel;
    }
    crtaj(host)
    {
        this.container=this.crtajHtml("div","roditelj",null,host);
        this.crtajLabDiv(0,this.maraton,null,"naslovna","naslovni",this.container);
        let drugiNaslov=this.crtajHtml("div","izbor",null,this.container);
        this.crtajHtml("label","naslovna","Odaberite ucesnika",drugiNaslov);
        let sel=this.crtajSelekt(drugiNaslov);
        let glavni=this.crtajHtml("div","glavni",null,this.container)
        let forma=this.crtajHtml("div","forma",null,glavni);
        let prikaz=this.crtajHtml("div","prikaz",null,glavni);
        this.crtajFomrmu(forma);
        this.crtajPrikaz(prikaz);
        

    }
    crtajPrikaz(host)
    {
        let divMaratonac=this.crtajHtml("div","maratonac",null,host);
        this.crtajLabDiv(0,"Opste informacije o maratoncu",null,"Segment","divSegment",divMaratonac);
        let okvir=this.crtajHtml("div","okvir",null,divMaratonac)
        let leviM=this.crtajHtml("div","levi",null,okvir);
        let desniM=this.crtajHtml("div","desni",null,okvir);
        let divInfo=this.crtajHtml("div","maratonac",null,host);
        let okvirInfo=this.crtajHtml("div","okvir",null,divInfo)
        let leviInfo=this.crtajHtml("div","levi",null,okvirInfo);
        let desniInfo=this.crtajHtml("div","desni",null,okvirInfo);
        let niz=["Ime i prezime:","Broj nagrada:","Srednja brzina"];
        let infoNiz=["Pocetak trke","Duzina staze","Startni broj:","Trenutna pozicija","Predjeno","Prteklo vreme","Prosecna brzina","Trenutan progres"]
        let sel=this.container.querySelector(".selekt");
        let vreme=this.container.querySelector(".inVreme").value;
        if(vreme.trim()=="")
            vreme="12:00";
        let takm=parseInt(sel.options[sel.selectedIndex].value);
        console.log("Takmicar "+takm);
        fetch(`http://localhost:5107/Glavni/VratiTakmicara/${takm}`,{
            method:"GET"
        })
        .then(s=>{
            if(s.ok)
            {
                s.json()
                .then(takmicar=>{
                    console.log(takmicar);
                    let podaci={id:takmicar.id,imePrezime:takmicar.imePrezime,brojNagrada:takmicar.brojNagrada,srednjaBrzina:takmicar.srednjaBrzina}
                    fetch(`http://localhost:5107/Glavni/VratiInformacije/${takm}/${vreme}`,
                    {
                        method:"GET"
                    })
                    .then(odg=>{
                        if(odg.ok)
                        {
                            odg.json()
                            .then(info=>{
                                
                                niz.forEach(x=>{
                                    this.crtajLabDiv(0,x,null,"atribut","unutrasnji",leviM);
                               
                                })
                                this.crtajLabDiv(0,podaci.imePrezime,null,"podaci","unutrasnji",desniM);
                                this.crtajLabDiv(0,podaci.brojNagrada,null,"podaci","unutrasnji",desniM);
                                this.crtajLabDiv(0,podaci.srednjaBrzina+" km/h",null,"podaci","unutrasnji",desniM);
                                
                                this.crtajLabDiv(0,"Trenutne informacije",null,"Segment","divSegment",divInfo);
                                infoNiz.forEach(x=>{
                                    this.crtajLabDiv(0,x,null,"atribut","unutrasnji",leviInfo);
                               
                                })
                                this.crtajLabDiv(0,info.pocetak,null,"podaci","unutrasnji",desniInfo);
                                this.crtajLabDiv(0,info.duzina+" m",null,"podaci","unutrasnji",desniInfo);
                                this.crtajLabDiv(0,info.broj,null,"podaci","unutrasnji",desniInfo);
                                this.crtajLabDiv(0,info.pozicija,null,"podaci","unutrasnji",desniInfo);
                                this.crtajLabDiv(0,info.predjeno+" m",null,"podaci","unutrasnji",desniInfo);
                                this.crtajLabDiv(0,info.vreme,null,"podaci","unutrasnji",desniInfo);
                                this.crtajLabDiv(0,info.prosecna+" km/h",null,"podaci","unutrasnji",desniInfo);
                                let progresDiv=this.crtajHtml("div","progDiv",null,desniInfo);
                                let progres=this.crtajHtml("div","progres",null,progresDiv);
                                console.log("Progres:"+info.progres)
                                info.progres=`${info.progres}%`;
                                progres.style.width=info.progres;
                                this.crtajHtml("label","centar",info.progres,progres);
                                
                            })
                        }
                    })

                })
            }
        })
        
        
        
    }
    crtajFomrmu(host)
    {
        let divVreme=this.crtajHtml("div","vreme",null,host);
        this.crtajLabDiv(0,"Odaberite vreme",null,"labVreme","unutrasnji",divVreme);
        this.crtajLabDiv(1,null,"time","inVreme","unutrasnji",divVreme);
        let divDugme=this.crtajHtml("div","divDugme",null,host);
        let dugme=this.crtajHtml("button","dugme","Prikazi informacije",divDugme);
        dugme.addEventListener("click",event=>{
            console.log("klik");
            let marato=1;
            let sel=this.container.querySelector(".selekt");
            let takm=parseInt(sel.options[sel.selectedIndex].value);
            let vreme=this.container.querySelector(".inVreme").value;
            console.log(vreme);
            let prikaz=this.container.querySelector(".prikaz");
            let glavni=this.container.querySelector(".glavni");
            glavni.removeChild(prikaz);
            let novi=this.crtajHtml("div","prikaz",null,this.container);
            glavni.appendChild(novi);
            this.crtajPrikaz(novi);


        })
        
    }
}