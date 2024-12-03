import { Context } from "./context.js";

let context;
let listakategorija=[];
fetch("http://localhost:5200/Proizvod/VratiSveKategorije",{
    method:"GET"
})
.then(s=>{
    if(s.ok)
    {
        s.json()
        .then(kategorije=>{
            kategorije.forEach(element=>{
                let k={
                    id:element.id,
                    naziv:element.naziv
                }
                listakategorija.push(k);

            })
            context=new Context(listakategorija);
            context.crtaj(document.body);
        })
    }
})