import { Auto } from "./Auto.js";

export class Context{
    constructor(listaModela)
    {
        this.listaModela=listaModela;
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
    crtajInput(type,klasa,host)
    {
        let input=document.createElement("input");
        input.type=type;
        if(klasa!==null)
            input.className=klasa;
        host.appendChild(input);
        return input;
    }
    crtaj(host)
    {
        this.container=this.crtajHtml("div","roditelj",null,host);
        let forma=this.crtajHtml("div","forma",null,this.container);
        let prikaz=this.crtajHtml("div","prikaz",null,this.container);
        this.crtajFormu(forma);
        this.crtajPrikaz(prikaz);


    }
    crtajFormu(host)
    {
        let forma1=this.crtajHtml("div","forma1",null,host);
        let forma2=this.crtajHtml("div","forma2",null,host);
        let divLevi1=this.crtajHtml("div","levi",null,forma1);
        let divDesni1=this.crtajHtml("div","desni",null,forma1);
        let divLevi2=this.crtajHtml("div","levi",null,forma2);
        let divDesni2=this.crtajHtml("div","desni",null,forma2);
        this.crtajDeoForme(1,divLevi1,divDesni1);
        this.crtajDeoForme(2,divLevi2,divDesni2);
        let divDugme=this.crtajHtml("div","divDugme",null,host);
        let dugme=this.crtajHtml("button","dugme","Filtriraj prikaz",divDugme);
        dugme.addEventListener("click",event=>{
            let pomKil=this.container.querySelector(".kilometraza").value;
            let pomSed=this.container.querySelector(".sedite").value
            let pomCen=this.container.querySelector(".cena").value

            let kilomtraza=pomKil.trim()===""?-1:parseFloat(pomKil);
            let sediste=pomSed.trim()===""?-1:parseInt(pomSed);
            let cena=pomCen.trim()===""?-1:parseFloat(pomCen);
            let sel=this.container.querySelector(".selekt");
            let model=parseInt(sel.options[sel.selectedIndex].value);
            fetch(`https://localhost:5001/Glavni/PretraziAuta/${model}/${cena}/${sediste}/${kilomtraza}`,{
                method:"GET"
            })
            .then(s=>{
                if(s.ok)
                {
                    s.json()
                    .then(auta=>{
                        let listaAuta=[];
                        auta.forEach(auto=>{
                            let a=new Auto(auto.id, auto.model,
                                auto.kilometraza,
                                auto.godiste,
                                auto.brojSedista,
                                auto.cenaPoDanu,
                                auto.iznajmljen);
                                listaAuta.push(a);
                            
                        })
                        console.log(listaAuta);
                        this.container.removeChild(this.container.querySelector(".prikaz"));
                            let prikaz=this.crtajHtml("div","prikaz",null,this.container);
                            listaAuta.forEach(x=>{
                            x.Crtaj(prikaz);

                        })
                    })
                }
            })

        })
        
        

    }
    crtajDeoForme(forma,levi,desni)
    {
        let labele=[];
        let inputi=[];
        let tipovi=[];
        
        if(forma===1)
        {
            labele=["Ime i prezime:","JMBG:","Broj vozacke dozvole:","Broj dana:"];
            inputi=["ime","jmbg","brojVoz","brojDana"];
            tipovi=["text","number","number","number"];
           
        }
        else
        {
            labele=["Predjena kilometraza:","Broj sedista:","Cena:","Model:"];
            inputi=["kilometraza","sedite","cena"];
            tipovi=["number","number","number"];
            
        }
        labele.forEach(element=>{
            this.crtajLabDiv(element,"labelaForme","unutrasnji",levi);
        })
        inputi.forEach((element,ind)=>{
            let inputDiv=this.crtajHtml("div","inputDiv",null,desni);
            this.crtajInput(tipovi[ind],element,inputDiv);
        })
        if(forma===2)
        {
            let inputDiv=this.crtajHtml("div","inputDiv",null,desni);
            this.crtajSelekt("selekt",inputDiv);
        }
        

    }
    crtajSelekt(klasa,host)
    {
        let sel=this.crtajHtml("select",klasa,null,host);
        this.listaModela.forEach(el=>{
            let op=document.createElement("option");
            op.innerHTML=el.naziv;
            op.value=el.id;
            sel.appendChild(op);
        })
        return sel;
    }
    crtajPrikaz(host)
    {

    }

}