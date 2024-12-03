import { Auto } from "./auto.js";

export class Context
{
    constructor(brendovi,boje,modeli)
    {
        this.brendovi=brendovi;
        this.container=null;
        this.boje=boje;
        this.modeli=modeli;
        this.listAuta=[];
        
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
    crtajlabDiv(sta,inner,tip,klasaDiv,klasaLab,host)
    {
        let div=this.crtajHTML("div",klasaDiv,null,host);
        let el;
        if(sta===0)
        {
            el=this.crtajHTML("label",klasaLab,inner,div);
        }
        else
        {
            el=this.crtajHTML("select",klasaLab,null,div);
           // el.type=tip;
        }
       
        host.appendChild(div);
        return el;
    }

    crtaj(host)
    {
        this.container=this.crtajHTML("div","roditelj",null,host);
        let forma=this.crtajHTML("div","forma",null,this.container);
        let prikaz=this.crtajHTML("div","prikaz",null,this.container);
        this.crtajFormu(forma);
        
        
        

    }
    popuniSelektOpcijama(rbr,selekt,opcije)
    {
        
        
        opcije.forEach(x=>{
            let op;
            switch(rbr)
            {
                case 1:
                    op=this.crtajHTML("option",null,x.naziv,selekt);
                    op.value=x.id;
                    break;
                case 2:
                    op=this.crtajHTML("option",null,x.model,selekt);
                    op.value=x.model;
                    break;
                case 3:
                    op=this.crtajHTML("option",null,x.boja,selekt);
                    op.value=x.boja;
                    break;
                default:
                    break;
                    
            }
        })
    }
    crtajFormu(host)
    {
        let okvir=this.crtajHTML("div","okvir",null,host);
        let levi=this.crtajHTML("div","levi",null,okvir);
        let desni=this.crtajHTML("div","desni",null,okvir);
        let atributi=["Brend","Model","Boja"];
        atributi.forEach((el,ind)=>{
            this.crtajlabDiv(0,el+":",null,"unutrasnjiLab","labelaForme",levi);
            let sel=this.crtajlabDiv(1,null,"select",`unutrasnjiSelekt${el}`,el,desni);
            console.log(sel);
            if(ind==0)
                this.popuniSelektOpcijama(1,sel,this.brendovi);

            if(ind==1)
                this.popuniSelektOpcijama(2,sel,this.modeli);
            if(ind==2)
                this.popuniSelektOpcijama(3,sel,this.boje);
            
            

        })

        let divDugme=this.crtajHTML("div","divDugme",null,host);
        let dugme=this.crtajHTML("button","dugme","Pronadji",divDugme);
        dugme.addEventListener("click",event=>{
            let selBrend= this.container.querySelector(".Brend");
            let selModel= this.container.querySelector(".Model");
            let selBoja= this.container.querySelector(".Boja");
            let brend=parseInt(selBrend.options[selBrend.selectedIndex].value);
            let model=selModel.options[selModel.selectedIndex].value;
            let boja=selBoja.options[selBoja.selectedIndex].value;
            if(boja.trim()=="")
                boja=null;
            if(model.trim()=="")
                model=null;
            
            let obj={brend:brend,model:model,boja:boja}
            fetch(`http://localhost:5189/Prodavnica/UcitajAuta/${1}`,{
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
                    .then(auta=>{
                        this.listAuta=[];
                        auta.forEach(el=>{

                        let a=new Auto(el.id,el.brend,el.model,el.kolicina,el.datumPoslednjeProdaje,el.cena);
                        this.listAuta.push(a);
                            
                    });
                    console.log(this.listAuta);
                    let prikaz=this.container.querySelector(".prikaz");
                    this.container.removeChild(prikaz);
                    let novi=this.crtajHTML("div","prikaz",null,this.container);
                    this.listAuta.forEach(x=>{
                        x.crtaj(novi);
                    })
                    })
                }
            })
            
            
            
            
        })
        
        
        
    }
    
}