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
    {errors && <div className="error-msg">{errors.message}</div>}
    </>
  );
};

export default InputType;