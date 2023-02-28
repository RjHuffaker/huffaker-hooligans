const Checkbox = ({ label, value=false, onChange }) => {
    return (
      <div className="form-check">
        <label>
          <input
            className="form-check-input"
            type="checkbox"
            name={label}
            checked={value}
            onChange={onChange}
          />
          &nbsp;
          {label}
        </label>
      </div>
    );
  };

  export default Checkbox;