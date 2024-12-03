import { Context } from "./Context.js";

let listaProjekcija=[];
let context;
fetch(`http://localhost:5012/Glavni/VratiProjekcije`,{
    method:"GET"
})
.then(s=>{
    if(s.ok)
    {
        s.json()
        .then(projekcije=>{
            projekcije.forEach(proj=>{
            let p={id:proj.id,naziv:proj.naziv,datum:proj.datum,sala:proj.sala,idSale:proj.idSale};
            listaProjekcija.push(p);
        })
        console.log(listaProjekcija);
        context=new Context(listaProjekcija);
        context.crtaj(document.body);

        })
    }
})
