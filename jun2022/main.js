import { Context } from "./context.js";

let listaBrendova=[];
let listaModela=[];
let listaBoja=[];
let context;
fetch(`http://localhost:5189/Prodavnica/VratiBrendoveAutaUProdavnici/${1}`,{
    method:"GET"
})
.then(s=>{
    if(s.ok)
    {
        s.json()
        .then(brendovi=>{
            brendovi.forEach(brend=>{
                listaBrendova.push(brend);
            })
            console.log(listaBrendova);
            fetch(`http://localhost:5189/Prodavnica/VratiBojeAutaUProdavnici/${1}`,{
                method:"GET"
            })
            .then(st=>{
                if(st.ok)
                {
                    st.json()
                    .then(boje=>{
                        boje.forEach(boja=>{
                            listaBoja.push(boja);
                        })
                        fetch(`http://localhost:5189/Prodavnica/VratiModeleAutaUProdavnici/${1}`,{
                            method:"GET"
                        })
                        .then(sta=>{
                            if(sta.ok)
                                {
                                    sta.json()
                                    .then(modeli=>{
                                        modeli.forEach(model=>{
                                            listaModela.push(model);
                                        })
                                    console.log(listaBoja);
                                    context=new Context(listaBrendova,listaBoja,listaModela);
                                    context.crtaj(document.body);

                                    })

                                }
                        })
                    })
                }
            })
          
        })
    }
})