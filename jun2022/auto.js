export class Auto
{
    constructor(id,brend,model,kolicina,datumPoslednjeProdaje,cena)
    {
        this.id=id;
        this.brend=brend;
        this.model=model;
        this.kolicina=kolicina;
        if(datumPoslednjeProdaje!==null){
            let [godina,mesec,dan]=datumPoslednjeProdaje.split("-");
        dan=dan[0]+dan[1];
        this.datumPoslednjeProdaje=dan+"."+mesec+"."+godina+".";
        }
        else
            this.datumPoslednjeProdaje=null;
        this.cena=cena;
        this.container=null;
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
        this.container=this.crtajHTML("div","box",null,host);
        this.crtajlabDiv(0,`Brend:${this.brend}`,null,"divBrendObjekta","brendObjekta",this.container);
        this.crtajlabDiv(0,`Model:${this.model}`,null,"divModelObjekta","modelObjekta",this.container);
        let divSlika=this.crtajHTML("div","divSlika",null,this.container);
        let slika=document.createElement("img");
        slika.src=`${this.model}.png`;
        // slika.width="200px";
        // slika.height="100px";
        divSlika.appendChild(slika);
        this.crtajlabDiv(0,`Kolicina:${this.kolicina}`,null,"divKolicinaObjekta","kolicinaObjekta",this.container);
        this.crtajlabDiv(0,`Datum poslednje prodaje:${this.datumPoslednjeProdaje===null?"Nije prodan":this.datumPoslednjeProdaje}`,null,"divKolicinaObjekta","datumObjekta",this.container);
        this.crtajlabDiv(0,`Cena:${this.cena} din`,null,"divCenaObjekta","cenaObjekta",this.container);
        let divDugme=this.crtajHTML("div","divDugmeBox",null,this.container)
        let dugme=this.crtajHTML("button","dugmeBox","Naruci",divDugme);

        dugme.addEventListener("click",event=>{
            fetch(`http://localhost:5189/Auto/ProdajAuto/${this.id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(s=>{
                if(s.ok)
                {
                    s.json()
                    .then(resp=>{
                        alert("Auto je uspesno narucen");
                        if(resp!==-1)
                        {
                            console.log(resp);
                            //2024-12-02T23:35:16.1014534+01:00
                            this.kolicina-=1;
                            let [godina,mesec,dan]=resp.datum.split("-");
                            console.log(godina);
                            console.log(mesec);
                            dan=dan[0]+dan[1];
                            console.log(dan);
                            this.datumPoslednjeProdaje=dan+"."+mesec+"."+godina+".";
                            let labKol=this.container.querySelector(".kolicinaObjekta");
                            let labDat=this.container.querySelector(".datumObjekta");
                            labKol.innerHTML=`Kolicina:${this.kolicina}`;
                            labDat.innerHTML=`Datum poslednje prodaje:${this.datumPoslednjeProdaje}`;

                        }
                        else{
                        let rod=this.container.parentNode;
                        rod.removeChild(this.container);
                        }
                    })
                }
            })

        })

    }
}