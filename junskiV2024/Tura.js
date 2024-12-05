export class Tura
{
    constructor(id,preostaloMesta,znamenitosti,cena)
    {
        this.id=id;
        this.preostaloMesta=preostaloMesta;
        this.znamenitosti=znamenitosti;
        this.cena=cena;
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
        this.container=this.cHTML("div",`Box${this.id}`,null,host);
        let levi=this.cHTML("div","boxLevi",null,this.container);
        let desni=this.cHTML("div","boxDesni",null,this.container);
        let atributi=["Preostalo mesta:","Cena:","Znamenitosti:"];
        let klase=["mesta","cena","znamenitosti"];
        atributi.forEach(x=>{
            this.crtajLabDiv(0,x,null,"boxLabela","boxUnutrasnjiLab",levi);

        })
        this.crtajLabDiv(0,this.preostaloMesta,null,`${klase[0]}`,"boxUnutrasnjiLab2",desni);
        this.crtajLabDiv(0,this.cena,null,`${klase[1]}`,"boxUnutrasnjiLab2",desni);
        let labela="";
        let miniBox=this.cHTML("div","minibox",null,desni);
        this.znamenitosti.forEach((x,ind)=>{
            let lab;
            if(ind===this.znamenitosti.length-1)
                lab=x.ime;
            else
            {
                lab=x.ime+","
            }
            this.crtajLabDiv(0,lab,null,`${klase[2]}`,"boxUnutrasnjiLab3",miniBox);
        
        })
        if(this.preostaloMesta==0)
            this.container.style.backgroundColor="orange";
        else
            this.container.style.backgroundColor="RGB(120,150,255)";
        

        
        



        
    }
}