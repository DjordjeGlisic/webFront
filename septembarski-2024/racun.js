export class Racun{
    constructor(mesec,voda,struja,komunalneUsluge,placen)
    {
        this.mesec=mesec;
        this.voda=voda;
        this.struja=struja;
        this.komunalneUsluge=komunalneUsluge;
        this.placen=placen;
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
    crtajLabeluUDivu(inner,klasaD,klasaL,host)
    {
        let lab=document.createElement("label");
        lab.innerHTML=inner;
        lab.className=klasaL;
        let div=document.createElement("div");
        div.className=klasaD;
        host.appendChild(div);
        div.appendChild(lab);
        return div;
    }
    crtaj(host)
    {
        let klasa=this.placen==="da"?"placen":"box";
        this.container=this.crtajHtml("div",klasa,null,host);
        let levi=this.crtajHtml("div","levi",null,this.container);
        let desni=this.crtajHtml("div","desni",null,this.container);
        this.crtajLabeluUDivu("Mesec: ","unutrasnji","labelaUzSelekt",levi);
        this.crtajLabeluUDivu("Voda: ","unutrasnji","labelaUzSelekt",levi);
        this.crtajLabeluUDivu("Struja: ","unutrasnji","labelaUzSelekt",levi);
        this.crtajLabeluUDivu("Komunalne usluge: ","unutrasnji","labelaUzSelekt",levi);
        this.crtajLabeluUDivu("Placen: ","unutrasnji","labelaUzSelekt",levi);
        this.crtajLabeluUDivu(this.mesec,"unutrasnji","labelaUzSelekt",desni);
        this.crtajLabeluUDivu(this.voda,"unutrasnji","labelaUzSelekt",desni);
        this.crtajLabeluUDivu(this.struja,"unutrasnji","labelaUzSelekt",desni);
        this.crtajLabeluUDivu(this.komunalneUsluge,"unutrasnji","labelaUzSelekt",desni);
        this.crtajLabeluUDivu(this.placen,"unutrasnji","labelaUzSelekt",desni);
        

        

    }
}