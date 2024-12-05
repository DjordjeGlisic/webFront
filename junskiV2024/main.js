import { Context } from "./context.js";

let listaTura=[];
let listaZnamenitosti=[];
let context;
fetch(`http://localhost:5067/Tura/VratiTure`,{
    method:"GET"
})
.then(s=>{
    if(s.ok)
    {
        s.json()
        .then(ture=>{
            ture.forEach(tur=>{
                let tura={id:tur.id,preostaloMesta:tur.preostaloMesta,cena:tur.cena,znamenitosti:tur.znamenitosti};
                listaTura.push(tura);
            })
            console.log(listaTura);
            fetch(`http://localhost:5067/Znamenitost/VratiZnamenitosti`,{
                method:"GET"
            })
            .then(l=>{
                if(l.ok)
                {
                    l.json().
                    then(znamenitosti=>{
                        znamenitosti.forEach(x=>{
                            let z={id:x.id,ime:x.ime};
                            listaZnamenitosti.push(z);
                        })
                        context=new Context(listaZnamenitosti,listaTura);
                        context.crtaj(document.body);
                    })
                }
            })
        })
    }
})