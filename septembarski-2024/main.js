import { Context } from "./context.js";

let listaBrojeva=[];
let context;
fetch("https://localhost:5001/Stan/BrojeviStana",{
    method:"GET"
    
})
.then(s=>{
    if(s.ok)
    {
        s.json()
        .then(brojevi=>{
            brojevi.forEach(element=>{
                let b={broj:element.broj};
                listaBrojeva.push(b);
            })
            console.log(listaBrojeva);
            context=new Context(listaBrojeva);
            context.crtaj(document.body); 

        })
    }
})