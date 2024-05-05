import React from 'react'
import floading from '../assets/floading.gif'

function Loading() {
  return (
    <div style={{textAlign:"center"}}>
    <div style={{marginTop:30}}>
        Maçlar yükleniyor ...
        Lütfen bekleyiniz ...
       
    </div>

<div>
<img src={floading} />
</div>

</div>
  )
}

export default Loading