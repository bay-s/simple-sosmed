import React from 'react'

function ModalAddSkill(props){

 const Card = (m) => {
  return  {__html:m}
}

    return(
        <>
<div class="modal-background"></div>
<div class="modal-card box">
<form className='is-flex is-flex-column' onSubmit={props.updateSkills}>
<div class="field">
  <label class="label ">Topics (separate with spaces)</label>
  <div class="control" >
    <input className="input" type="text" name='SkillText' placeholder="Text input" onChange={props.handlerChange}/>
  </div>
</div>
<div className='field is-flex ms-auto justify-end'>
<button class="button is-link" onClick={props.addSkill}>Add</button>
</div>
<div className='is-flex is-flex-gap-md' >
{props.SkillText.length < 1 ? "" : props.SkillText.map((m,index) => {
  return <div className='is-flex align-center tag is-info' key={index} data-index={index}>
  <span dangerouslySetInnerHTML={Card (m)} />
   <a class="delete is-small" onClick={props.removeArr}></a>
  </div>
})}
</div>
<div class={props.openInput ?  "field is-grouped is-flex justify-end" : 'hide' }>
  <div class="control">
  <button type='submit'class="button is-link" >Save</button>
  </div>
</div>
</form>
     </div>
        </>
    )
}

export default ModalAddSkill;