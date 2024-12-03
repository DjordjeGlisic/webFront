import { Context } from "./context.js";

let listaProdavnica=[];

let context;
fetch(`http://localhost:5087/Prodavnica/VratiProizvodeProdavnice`,
    {
        method:"GET"
    }
)
.then(s=>{
    if(s.ok)
    {
        s.json()
        .then(prodavnice=>{
            prodavnice.forEach(x=>{
                let p={id:x.id,naziv:x.naziv,proizvodi:x.proizvodi};
                listaProdavnica.push(p);
            })
            context=new Context(listaProdavnica);
            context.crtaj(document.body);
        })
    }

})