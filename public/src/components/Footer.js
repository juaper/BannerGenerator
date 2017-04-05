
import React from 'react';

export default ()=>{

    const setCookie = (()=>{
        document.cookie = 'name=nir; ';
        console.log(document.cookie);
    })();

    return(
           <div className="footer">
               <p>
                   All rights reserved to the creator of the Meme Generator :<a href="mailto:nirbenya@gmail.com"> Nir Ben-Yair</a>.
               </p>
               <p>
                   You can contact me vie e-mail: <a href="mailto:nirbenya@gmail.com"> nirbenya@gmail.com</a>,
               </p>
               <p> Or via Facebook : "Nir Ben-Yair"</p>
           </div>
       )

};