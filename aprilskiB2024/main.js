import { Context } from "./context.js";

let listaTakmicara=[];
let maraton;
let context;
fetch(`http://localhost:5107/Glavni/VratiMaraton/1`,{
    method:"GET"
})
.then(s=>{
    if(s.ok)
    {
        s.json()
        .then(obj=>{
            maraton=obj.naziv+"-"+obj.lokacija;
            console.log(maraton);
            fetch(`http://localhost:5107/Glavni/VratiTakmicare/1`,{
                method:"GET"
            })
            .then(odg=>{
                if(odg.ok)
                {
                    odg.json()
                    .then(takmicari=>{
                        listaTakmicara=[];
                        console.log(takmicari);
                        takmicari.forEach(x=>{
                            let t= {id:x.id,imePrezime:x.ime+" "+x.prezime}
                            listaTakmicara.push(t);
                        })
                        context=new Context(maraton,listaTakmicara);
                        context.crtaj(document.body);

                    })
                }
            })

        })
    }
})