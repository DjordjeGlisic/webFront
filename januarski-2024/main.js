import { Context } from "./context.js";
import { Soba } from "./soba.js";

let imena=[];
let sobe=[];
let context;
fetch(`https://localhost:5001/Glavni/VratiUserName`,{
    method:"GET"
})
.then(s=>{
    if(s.ok)
    {
        s.json()
        .then(lista=>{
            imena=[];
            lista.forEach(x=>{
                let i={id:x.id,username:x.username,boja:x.boja}
                imena.push(i);
            })
            console.log(imena);
            fetch(`https://localhost:5001/Glavni/VratiCetSobe`,{
                method:"GET"
            })
            .then(s=>{
                if(s.ok)
                    {
                    s.json()
                    .then(cetSobbe=>{
                        sobe=[];
                        cetSobbe.forEach(x=>{
                            let s=new Soba(x.id,x.soba,x.clanovi);
                            sobe.push(s);
                        })
                        console.log(sobe);
                        context=new Context(imena,sobe);
                        context.crtaj(document.body);
                    })
                }
            })

        })
    }

})