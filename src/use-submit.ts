import React from 'react';
import validate from './validate';
import { FormContext } from './form';

const useSubmit = () => {
  const {
    rules,
    values,
    errors,
    setErrors,
    setValuesBlurred,
  } = React.useContext(FormContext);

  const handleSubmit = (callback: (values: any) => any) => {
    let errors = validate({
      values,
      rules,
      setErrors,
    });
    if (!errors.length) return callback(values);

    // if there are errors, mark all values as blurred,
    // so validation runs on change after hitting submit
    setValuesBlurred(
      Object.keys(rules).reduce((acc, name) => ({ ...acc, [name]: true }), {}),
    );
  };

  return {
    values,
    handleSubmit,
    canSubmit: !errors.length,
  };
};

export default useSubmit;
