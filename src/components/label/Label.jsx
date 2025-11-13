import "./Label.module.css";

const Label = ({ children, type, text, value, onChange }) => {
  return (
    <div>
      <label>
        {children}:
        <input
          type={type}
          placeholder={text}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Label;
