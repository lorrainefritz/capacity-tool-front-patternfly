import useInput from '@app/hooks/use-input';
import { PlaceHolderToForm } from '@app/models/Form/PlaceholderToForm';
import { Button, Flex, FlexItem, Form, FormGroup, TextInput } from '@patternfly/react-core';
import { TrashIcon } from '@patternfly/react-icons';
import React from 'react';

export const Test: React.FC<{ placeholder: PlaceHolderToForm, chooseMessage  }> = (props) => {
  const placeholder = props.placeholder;
  const isNotEmpty = (value) => value.trim() !== '';
  const {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: valueHasError,
    valueChangeHandler: valueChangeHandler,
    inputBlurHandler: valueBlurHandler,
    reset: valueReset,
  } = useInput(isNotEmpty);

  const valueInputClasses = valueHasError ? 'form-control invalid' : 'form-control';

  return (
    <React.Fragment>
      <FormGroup label={placeholder.placeHolderId.key} isRequired fieldId="horizontal-form">
      <Flex>
        <FlexItem>
          <input
            value={enteredValue}
            onChange={valueChangeHandler}
            onBlur={valueBlurHandler}
            type="text"
            id="horizontal-form"
            aria-describedby="horizontal-form-helper"
            name="horizontal-form"
            placeholder={placeholder.value}
            style={{ width: 500 }}
            required
          />
        </FlexItem>
        <FlexItem>
          <Button variant="plain" icon={<TrashIcon />}></Button>
        </FlexItem>
        </Flex>
        {valueHasError && <p className="error-text">{placeholder.placeHolderId.key} must not be empty.</p> }
      </FormGroup>
    </React.Fragment>
  );
};

export const EnviroFormInput: React.FC<{ placeholders: PlaceHolderToForm[] }> = (props) => {
  const placeholders: PlaceHolderToForm[] = props.placeholders;
  const [message, setMessage] = React.useState("");
  const chooseMessage = (message) => {
    setMessage(message);
  };

//   const isNotEmpty = (value) => value.trim() !== '';
//   const {
//     value: enteredValue,
//     isValid: valueIsValid,
//     hasError: valueHasError,
//     valueChangeHandler: valueChangeHandler,
//     inputBlurHandler: valueBlurHandler,
//     reset: valueReset,
//   } = useInput(isNotEmpty);

//   let formIsValid = false;

//   if (valueIsValid) {
//     formIsValid = true;
//   }
//   const formSubmissionHandler = (event) => {
//     event.preventDefault();
//     if (!formIsValid) {
//       return;
//     }
//     valueReset();
//   };
//   const valueInputClasses = valueHasError ? 'form-control invalid' : 'form-control';

  return (
    <React.Fragment>
      <Form isHorizontal  maxWidth="true">
        <h1>{message}</h1>
        {placeholders.map((placeholder) => (
          <Test placeholder={placeholder} chooseMessage={chooseMessage}/>

          // <FormGroup  label={placeholder.placeHolderId.key} isRequired fieldId="horizontal-form">
          //   <Flex>
          //     {/* <div
          //       style={{
          //         display: 'flex',
          //       }}
          //     >
          //     </div> */}
          //     <FlexItem>
          //       <input
          //         value={enteredValue}
          //         onChange={valueChangeHandler}
          //         onBlur={valueBlurHandler}
          //         type="text"
          //         id="horizontal-form"
          //         aria-describedby="horizontal-form-helper"
          //         name="horizontal-form"
          //         placeholder={placeholder.value}
          //         style={{ width: 500
          //         }}
          //         required
          //       />
          //     </FlexItem>
          //     <FlexItem>
          //       <Button variant="plain" icon={<TrashIcon />}></Button>
          //     </FlexItem>
          //   </Flex>

          //   {valueHasError && <p className="error-text">{placeholder.placeHolderId.key} must not be empty.</p>}
          // </FormGroup>
        ))}
      </Form>
    </React.Fragment>
  );
};
