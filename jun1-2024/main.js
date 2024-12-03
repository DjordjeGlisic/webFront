import { Context } from "./context.js";
let listaModela=[];
fetch("https://localhost:5001/Glavni/VratiModele",{
    method:"GET"
})
.then(s=>{
    if(s.ok)
    {
        s.json()
        .then(modeli=>{
            modeli.forEach(x=>{
                let m={id:x.id,naziv:x.naziv}
                listaModela.push(m);
            })
            console.log(listaModela);
            let context=new Context(listaModela);
            context.crtaj(document.body);

        })
    }
})