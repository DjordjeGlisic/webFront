import { Student } from "./student.js";

export class Fakuletet{
    constructor(listaPredmeta,listaRokova){
        this.listaPredmeta=listaPredmeta;
        this.listaRokova=listaRokova;
        this.container=null;
       // this.listaStudenti=[];
    }
    crtaj(host){
        if(!host)
            throw new Error("Nema hosta");
        this.container=document.createElement("div");
        this.container.className="glavni";
        host.appendChild(this.container);
        let contForma=document.createElement("div");
        contForma.className="forma";
        this.container.appendChild(contForma);
        let divPrikaz=document.createElement("div");
        divPrikaz.className="divPrikaz";
        this.container.appendChild(divPrikaz)
        this.crtajFormu(contForma);
        this.crtajTabelu1(divPrikaz);
        
    }

    crtajFormu(host)
    {
        let divIspit=document.createElement("div");
        divIspit.className="divIspit";
        host.appendChild(divIspit);
        let l=document.createElement("label");
        l.innerHTML="Ispit";
        divIspit.appendChild(l);
        let s=document.createElement("select");
        divIspit.appendChild(s);
        this.listaPredmeta.forEach(x=>{
            let op=document.createElement("option");
            op.innerHTML=x.naziv;
            op.value=x.id;
            s.appendChild(op);
        });
        let divLabele=this.vratiDiv("pomocniDiv");
        l=document.createElement("label");
        l.innerHTML="Rok";
        divLabele.appendChild(l);
        host.appendChild(divLabele)
        let okvir=document.createElement("div");
        okvir.className="okvir";
        host.appendChild(okvir);
    this.crtajRokove(okvir);
    let divNadji=document.createElement("div");
    divNadji.className="pomocniDiv";
    host.appendChild(divNadji);
    let nadji=document.createElement("button");
    nadji.addEventListener("click",event=>{
        this.NadjiStudenete();
    })
    nadji.innerHTML="Nadji";
    divNadji.appendChild(nadji);
    let indPolje=document.createElement("div");
    indPolje.className="pomocniDiv";
    host.appendChild(indPolje);
    l=document.createElement("label");
    l.innerHTML="Indeks: ";
    indPolje.appendChild(l);
    let tb=document.createElement("input");
    tb.type="number";
    tb.className="Indeks"
    indPolje.appendChild(tb);
    let ocPolje=document.createElement("div");
    ocPolje.className="pomocniDiv";
    host.appendChild(ocPolje);
    l=document.createElement("label");
    l.innerHTML="OCena: ";
    ocPolje.appendChild(l);
    tb=document.createElement("input");
    tb.type="number";
    tb.className="Ocena"
    ocPolje.appendChild(tb);
    let upisi=document.createElement("button");
    upisi.addEventListener("click",event=>{
       this.Upisi();
    })
    let upisDiv=document.createElement("div");
    upisDiv.className="pomocniDiv";
    upisi.innerHTML="Upisi";
    host.appendChild(upisDiv);
    upisDiv.appendChild(upisi);
    
    
    

    }
    Upisi()
    {
        let iIndeks=this.container.querySelector(".Indeks");
        let iOcena=this.container.querySelector(".Ocena");
        console.log(iIndeks);
        console.log(iOcena);
        let rok=this.container.querySelectorAll("input[type='checkbox']:checked");
        if(rok.length>1||rok.length<1)
         {
             alert("Izabrali ste vise roka za upis ocene studentu");
             return;
        }
            
        if(iIndeks.value===undefined||iIndeks.value===null)
        {
            alert("Unesite indeks");
            return;

        }
        if(iOcena.value===undefined||iOcena.value===null||iOcena.value<6||iOcena.value>10)
            {
                alert("Unesite ispravnu ocenu");
                return;
    
            }
        let izabran=rok[0].value;
        console.log(rok);
        let s=this.container.querySelector("select");
        console.log(s);
        let predmet=s.options[s.selectedIndex].value;
        
        console.log(`Izabran id predmeta ${predmet}`);
        fetch(`https://localhost:7048/IspitniRok/DodajOcenuStudentu/${iIndeks.value}/${izabran}/${predmet}/${iOcena.value}`,
            {
                method:"POST"
            })
            .then(s=>{
                if(s.ok)
                {
                    s.json()
                    .then(studenti=>{
                        
                        this.popuniTabelu(studenti);
                        
                    })
                }
            })
    }
    crtajHtml(naziv,host,klasa,tekst){
        let el=document.createElement(naziv);
        el.className=klasa;
        if(naziv=="label"||naziv==="button")
        {
            el.innerHTML=tekst;
        }
        host.appendChild(el);
        return el;
    }
    crtajRokove(host)
    {
        let levi=document.createElement("div");
        let desni=document.createElement("div");
        levi.classList="divCB";
        desni.classList="divCB";
        
        host.appendChild(levi);
        host.appendChild(desni);
       
        
        /*let cbdiv=document.createElement("div");
        cbdiv.className="divCB";
        host.appendChild(cbdiv);*/
        this.listaRokova.forEach((x,ind)=>{
            let cb=document.createElement("input");
            cb.type="checkbox";
            cb.value=x.id;
            let lab=document.createElement("label");
            lab.innerHTML=x.rok;
            let labbox=document.createElement("div");
            labbox.className="labbox";
            let divLabele=this.vratiDiv("divZaLabelu");
            let divZaCB=this.vratiDiv("divZaCB");
            divLabele.appendChild(lab);
            divZaCB.appendChild(cb);
            
            if(ind%2==0)
            {
                labbox.appendChild(divLabele);
                labbox.appendChild(divZaCB);
                levi.append(labbox)
            
            }
            else{
                labbox.appendChild(divZaCB);
                labbox.appendChild(divLabele);
                desni.appendChild(labbox);
            
            }
            

        })
        
    }
    vratiDiv(klasa)
    {
        let div=document.createElement("div");
        div.className=klasa;
        return div;
    }
    crtajTabelu1(host)
    {
        let tabela=document.createElement("table");
        tabela.id="tabela1";
        host.appendChild(tabela);
        let thead=document.createElement("thead");
        tabela.appendChild(thead);
        let tbody=document.createElement("tbody");
        tabela.appendChild(tbody);
        let atributi=["indeks","ime","prezime","predmet","rok","ocena"];
        let tr=document.createElement("tr");
        thead.appendChild(tr);
        
        atributi.forEach(x=>{
            let td=document.createElement("td");
            td.innerHTML=x;
            tr.appendChild(td);
        })
        
    }

    NadjiStudenete()
    {
        let sel=this.container.querySelector("select");
        let predmet=sel.options[sel.options.selectedIndex].value;
        let rokovi=this.container.querySelectorAll("input[type='checkbox']:checked");
       if(rokovi.length===0){
            alert("Niste nista cekirali");
            return;}
        console.log(`Izabran predmet: ${predmet}`);
        console.log("Izabrani rokovi");
        let nizRokova=[]
        //let nizRokova="";
        rokovi.forEach(x=>{
            //nizRokova=nizRokova.concat(x.value,"a");
            nizRokova.push(parseInt(x.value));
        })
        console.log(`Rok ${nizRokova}`);
        //this.ucitajStudente(predmet,nizRokova);
        this.ucitajStudenteFromBody(predmet,nizRokova)
    }
    ucitajStudente(predmet,rokovi){
        fetch(`https://localhost:7048/Student/VratiStudenteSaPredmetom/${predmet}/${rokovi}`,
        {
            method:"GET"
        })
        .then(p=>{
            if(p.ok){
            p.json().then(studenti=>
                {
              this.popuniTabelu(studenti);
                

            });
        }
        })
    }
    ucitajStudenteFromBody(predmet,rokovi)
    {
        fetch(`https://localhost:7048/Student/StudentiFromBody/${predmet}`,
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(rokovi)
            })
            .then(p=>{
                if(p.ok)
                    {p.json().then(data=>{
                this.popuniTabelu(data);})}}
                
            )


    }
    popuniTabelu(niz)
    {
        let tbody=this.container.querySelector("#tabela1").querySelector("tbody");
              
        if(tbody!==null)
            {
                this.container.querySelector("#tabela1").removeChild(tbody);
                tbody=document.createElement("tbody")
                this.container.querySelector("#tabela1").appendChild(tbody);;
       
            }
        niz.forEach(student=>{
            let stud=new Student(
                student.indeks,
                student.ime,
                student.prezime,
                student.predmet,
                student.rok,
                student.ocena
            )
           /* let postoji=this.listaStudenti.find(x=>stud.indeks===x.indeks);
            console.log(postoji);
            if(postoji===undefined){
            console.log(studenti);
            console.log(stud);
            stud.crtaj(this.container.querySelector("#tabela1").querySelector("tbody"));
            this.listaStudenti.push(stud);    
        }*/
       
       stud.crtaj(this.container.querySelector("#tabela1").querySelector("tbody"));
           
            
            
        })
    }
    

}