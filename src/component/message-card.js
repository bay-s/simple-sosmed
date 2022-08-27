import React from 'react'
import { Link } from 'react-router-dom'


function messasgeCard(props){

    return(
<Link to={`message`} className='p-0'>
<div className='is-flex is-flex-gap-xl p-3 border-sm'>
<span className='subtitle is-6 text-nowrap p-0 m-0 has-text-info'>Eren Yeager</span>
<span className='subtitle is-6 text-hide text-nowrap p-0 m-0'>Unfeeling so rapturous discovery he exquisite. Reasonably so middletons or impression by terminated. Old pleasure required removing elegance him had. Down she bore sing saw calm high. Of an or game gate west face shed. ﻿no great but music too old found arose.</span>
<span className='subtitle is-6 text-nowrap p-0 m-0'>TEST 123</span>
</div>
</Link>
    )
}

export default messasgeCard;