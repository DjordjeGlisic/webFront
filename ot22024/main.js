import { Context } from "./context.js";

let listaSastojaka=[];
let cotnext;
fetch(`http://localhost:5181/Glavni/VratiSastojke`,{
    method:"GET"
})
.then(s=>{
    if(s.ok)
    {
        s.json()
        .then(sastojci=>{
            sastojci.forEach(x=>{
                listaSastojaka.push(x);
            })
            cotnext=new Context(listaSastojaka);
            cotnext.crtaj(document.body);
        })
    }
})