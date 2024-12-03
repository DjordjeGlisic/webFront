import { Fakuletet } from "./fakultet.js";
import { Predmet } from "./oredmet.js";
import { Rok } from "./rok.js";
let listaPredmeta=[];
fetch("https://localhost:7048/Predmet/PreuzmiPredmete")
.then(p=>{
    p.json().then(predmeti=>{
        predmeti.forEach(element=>{

            let pr=new Predmet(element.id,element.naziv);
            console.log("Stampam predmet");
            console.log(pr);
            listaPredmeta.push(pr);
        });
        uhvatiRokove();
       
    })
  

});
let listaRokova=[];
console.log(listaPredmeta);
function uhvatiRokove(){
fetch("https://localhost:7048/IspitniRok/VratiRokove")
.then(p=>{
    p.json().then(rokovi=>{
        rokovi.forEach(element=>{

            let pr=new Rok(element.id,element.rok);
            
            listaRokova.push(pr);
        });
        let fakultet=new Fakuletet(listaPredmeta,listaRokova);
        fakultet.crtaj(document.body);
    })

});
console.log(listaRokova)
}
