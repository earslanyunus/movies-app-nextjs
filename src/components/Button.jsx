import React from 'react';
// import googleIcon from '../../assets/googleIcon.svg'

function Button({text="Button",wFull=false,variant,extraClass='',isSocial=false,...props}) {
    const initialClass = `
    ${(variant=== 'primary'||variant === 'secondary') ? 'py-2.5 px-[1.125rem] rounded-lg text-text-md font-semibold':''}
    ${variant=== 'primary'? 'bg-primary-600  text-white ':''}
    ${variant=== 'secondary'? 'bg-white border border-gray-300 text-gray-700 ':''}
    ${variant=== 'link'? 'text-primary-700  font-semibold text-sm' : ' ' } 
    ${isSocial? 'flex items-center justify-center gap-3' : ''}
    
    ${wFull? 'w-full' : '' }
    `
    return (
        <>
        <button  {...props}  className={initialClass+extraClass}>{isSocial&&<img src={googleIcon} alt={'google icon '}/>}{text}</button>

        </>
    );
}

export default Button;