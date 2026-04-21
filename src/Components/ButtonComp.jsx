const ButtonComp = ({className, btnLable, onClick, type}) =>{
    return (
        <button className={className} type={type} onClick={onClick}>{btnLable}</button>
    )
}

export default ButtonComp