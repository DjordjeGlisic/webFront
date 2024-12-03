export class Student{
    constructor(indeks,ime,prezime,predmet,rok, ocena)
    {
        this.indeks=indeks;
        this.ime=ime;
        this.prezime=prezime;
        this.predmet=predmet;
        this.rok=rok,
        this.ocena=ocena;
        this.container=null;
    }
    crtaj(host)
    {
        let tr=document.createElement("tr");
        this.container=tr;
        host.appendChild(tr);
        let ind=document.createElement("td");
        ind.innerHTML=this.indeks;
        this.container.appendChild(ind);
        let ime=document.createElement("td");
        ime.innerHTML=this.ime;
        this.container.appendChild(ime);
        let prezime=document.createElement("td");
        prezime.innerHTML=this.prezime;
        this.container.appendChild(prezime);
        let predmet=document.createElement("td");
        predmet.innerHTML=this.predmet;
        this.container.appendChild(predmet);
        let rok=document.createElement("td");
        rok.innerHTML=this.rok;
        this.container.appendChild(rok);
        let ocena=document.createElement("td");
        ocena.innerHTML=this.ocena;
        this.container.appendChild(ocena);
        
        
        

    }
}