export class Auto{
    constructor(id,model,kilometraza,godiste,brojSedista,cenaPoDanu,iznajmljen)
    {
        this.id=id;
        this.kilometraza=kilometraza;
        this.godiste=godiste;
        this.brojSedista=brojSedista;
        this.cenaPoDanu=cenaPoDanu;
        this.iznajmljen=iznajmljen;
        this.container=null;
        this.model=model;
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
    crtajLabDiv(inner,klasaLab,klasaDiv,host)
    {
        let labela=document.createElement("label");
        labela.innerHTML=inner;
        if(klasaLab!==null)
            labela.className=klasaLab;
        let div=document.createElement("div");
        if(klasaDiv!==null)
            div.className=klasaDiv;
        host.appendChild(div);
        div.appendChild(labela);
        
    }
    CrtajLeviDesniDiv(strana,niz,host)
    {
        if(strana==="levi")
        {
            niz.forEach(el=>{
                this.crtajLabDiv(el,"labelaForme","unutarBox",host);

            })
        }
        else{
            this.crtajLabDiv(this.model,"labelaForme","unutarBox",host);
            this.crtajLabDiv(this.kilometraza,"labelaForme","unutarBox",host);
            this.crtajLabDiv(this.godiste,"labelaForme","unutarBox",host);
            this.crtajLabDiv(this.brojSedista,"labelaForme","unutarBox",host);
            this.crtajLabDiv(this.cenaPoDanu,"labelaForme","unutarBox",host);
            this.crtajLabDiv(this.iznajmljen,"labelaForme","unutarBox",host);
        }

    }
    Crtaj(host)
    {
        let iznajmljen=this.iznajmljen==="Da"?"crvena":"box";
        this.container=this.crtajHtml("div",iznajmljen,null,host);
        let miniBox=this.crtajHtml("div","miniBox",null,this.container);
        let levi=this.crtajHtml("div","levi",null,miniBox);
        let desni=this.crtajHtml("div","desniBox",null,miniBox);
        let niz=["Model:","Kilometraza:","Gosite","Broj sedista:","Cena po danu:","Iznajmljen:"];
        this.CrtajLeviDesniDiv("levi",niz,levi);
        this.CrtajLeviDesniDiv("desni",niz,desni);
        let divDugme=this.crtajHtml("div","divDugmeBox",null,this.container);
        let dugme=this.crtajHtml("button","dugmeBox","Iznajmi",divDugme);
        if(this.iznajmljen==="Da")
            dugme.disabled=true;
        dugme.addEventListener("click",event=>{
            let prikaz=this.container.parentNode;
            let roditelj=prikaz.parentNode;

            
            let imePrezime=roditelj.querySelector(".ime").value;
            let [ime,prezime]=imePrezime.split(" ");
            let jmbg=parseInt(roditelj.querySelector(".jmbg").value);
            let vozacka=parseInt(roditelj.querySelector(".brojVoz").value);
            let dani=parseInt(roditelj.querySelector(".brojDana").value);
            let obj={ime:ime,prezime:prezime,jmbg:jmbg,brojVozacke:vozacka};
            //5001
            //44322
            fetch(`https://localhost:5001/Glavni/IznajmiAuto/${this.id}/${dani}`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(obj)
            })
            .then(s=>{
                if(s.ok)
                {
                    this.container.className="crvena";
                    dugme.disabled=true;
                }
            })
            

        })
        

    }
}