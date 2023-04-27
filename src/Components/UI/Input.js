import { forwardRef } from "react";
import { FloatingLabel, FormControl, FormText } from "react-bootstrap";

const Input = forwardRef((props, ref) => {
  return (
    <FloatingLabel
      // controlId="floatingInput"
      label={props.label}
      className="mb-3"
    >
      <FormControl
        type={props.type}
        placeholder={props.placeholder}
        ref={ref}
      />
      <FormText>{props.text}</FormText>
    </FloatingLabel>
  );
});
export default Input;
