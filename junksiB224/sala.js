export class Sala{
    constructor(id,kapacitet,adresa,cena,iznajmljen,imePrezime,jmbg,datum)
    {
        this.id=id;
        this.kapacitet=kapacitet;
        this.adresa=adresa;
        this.cena=cena;
        this.iznajmljen=iznajmljen==="ne"?false:true;
        this.container=null;
        this.imePrezime=imePrezime;
        this.jmbg=jmbg;
        this.datum=datum;
        

    }
    ctrtajHtml(element,klasa,inner,host)
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
        let div=this.ctrtajHtml("div",klasaDiv,null,host);
        let unutra;
        if(sta==0)
        {
            unutra=this.ctrtajHtml("label",klasaLab,inner,div);
        
        }
        else
        {
            unutra=this.ctrtajHtml("input",klasaLab,null,div);
            unutra.type=tip;
        

        }
        return unutra;
    }
    crtaj(host)
    {
        this.container=this.ctrtajHtml("div","box",null,host);
        let okvir=this.ctrtajHtml("div","okvir",null,this.container);
        let divDugme=this.ctrtajHtml("div","divDugme",null,this.container);
        let levi=this.ctrtajHtml("div","leviBox",null,okvir);
        let desni=this.ctrtajHtml("div","desniBox",null,okvir);
        let niz=["Kapacitet:","Adresa:","Cena:","Iznajmljena:"];
        niz.forEach(el=>{
            this.crtajLabDiv(0,el,null,"unutrasnjiBox","labelaBoxa",levi);
        })
        this.crtajLabDiv(0,this.kapacitet,null,"unutrasnjiBox","labelaBoxa",desni);
        this.crtajLabDiv(0,this.adresa,null,"unutrasnjiBox","labelaBoxa",desni);
        this.crtajLabDiv(0,this.cena,null,"unutrasnjiBox","labelaBoxa",desni);
        let promena=this.crtajLabDiv(0,this.iznajmljen,null,"unutrasnjiBox","labelaBoxa",desni);
        let dugme=this.ctrtajHtml("button","dugme","Iznajmi",divDugme);
        if(this.iznajmljen===true){
            dugme.disabled=true;
            this.container.style.backgroundColor="orange";
        }
        dugme.addEventListener("click",event=>{
            let [ime,prezime]=this.imePrezime.value.split(" ");
            console.log(ime+"-"+prezime);
            let j=parseInt(this.jmbg.value);
            let d=this.datum.value;
            if(d.trim()=="")
                alert("Unesite datum za inzajmljivanje");
            if(this.imePrezime.value.trim()=="")
                alert("Unesite ime i prezime korisnika");
            if(this.jmbg.value.trim()==""||j<1000000000000||j>10000000000000)
                alert("Jmbg mora biti 13 cifara");
            
            fetch(`https://localhost:44367/Glavni/IznajmiSalu/${ime+"-"+prezime}/${j}/${this.id}/${d}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }
                
            })
            .then(s=>{
                if(s.ok)
                {
                    s.json()
                    .then(resp=>{
                        alert("Uspesno ste rezervisali salu "+resp.id+" za datum "+resp.dan+"/"+resp.mesec+"/"+resp.godina+" godine");
                        this.container.style.backgroundColor="orange";
                        dugme.disabled=true;
                        promena.innerHTML="true";
                    })
                }
            })
        })
        
        
        

    }
}