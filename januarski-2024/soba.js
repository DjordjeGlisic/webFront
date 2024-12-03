export class Soba{
    constructor(id,soba,clanovi)
    {
        this.id=id;
        this.soba=soba;
        this.clanovi=clanovi;
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
    crtaj(host)
    {
        let box=this.crtajHtml("div","box",null,host);
        let naslovBoxa=this.crtajHtml("div","naslovBoxa",null,box);
        this.crtajHtml("label","labelaNaslovBoxa",this.soba,naslovBoxa);
        let okvirni=this.crtajHtml("div","okvirni",null,box);
        let gornji=this.crtajHtml("div","gornji",null,okvirni);
        let sredisnji=this.crtajHtml("div","srednji",null,okvirni);
        let divDugme=this.crtajHtml("div","divDugmeBox",null,box);
        this.crtajHtml("label","clanovi","Clanovi:",gornji);
        let ul=this.crtajHtml("ul","ul",null,sredisnji);
        this.clanovi.forEach(x=>{
            let li=this.crtajHtml("li","li",x.nadimak+"("+x.korisnicko+")",ul);
            li.style.color=this.NadjiBoju(x.boja);

        })
        let dugme=this.crtajHtml("button","dugmeBox","Prebroj jedinstvene",divDugme);
        dugme.addEventListener("click",event=>{
            fetch(`https://localhost:5001/Glavni/PrebrojiJedinstevne/${this.id}`,{
                method:"GET"
            })
            .then(s=>{
                if(s.ok)
                {
                    s.json()
                    .then(res=>{
                        alert("U sobi "+this.soba+" ima "+res+" jedinstvenih clanova");
                    })
                }
            })
        })

        


    }
    NadjiBoju(boja)
    {
        let klasa;
        switch(boja)
        {
         case 1:
             klasa="black";
             break;
         case 2:
             klasa="white";
             break;
         case 3:
             klasa="green";
             break;
         case 4:
             klasa="blue";
             break;
         case 5:
             klasa="red";
             break;
         default:
             klasa="yellow";
             break;
 
        }
        return klasa;
    }
}