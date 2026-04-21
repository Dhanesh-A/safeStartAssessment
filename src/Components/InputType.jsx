import './../App.css';

const InputType = ({label, className, type = "text", id, name,minLength, maxLength ,size}) => {
  return (
    <>
    <div className="inputLabel">{label}</div>
    <input
      type={type}
      id={id}
      name={name}
      className={className}
      required
      minLength={minLength}
      maxLength={maxLength}
      size={size}
    />

    </>
  );
};

export default InputType;