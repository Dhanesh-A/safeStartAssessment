import './../App.css';

const InputType = ({label, className,errors, type = "text", id, registration, name,minLength, maxLength ,size}) => {
  return (
    <>
    <div className="inputLabel">{label}</div>
    <input
      type={type}
      id={id}
      name={name}
      className={className}
      minLength={minLength}
      maxLength={maxLength}
      size={size}
      {...registration} 
    />
    {errors && <span className="error-msg">{errors.message}</span>}
    </>
  );
};

export default InputType;