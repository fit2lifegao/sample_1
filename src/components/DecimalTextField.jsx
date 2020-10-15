import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextField } from 'office-ui-fabric-react/lib-commonjs/TextField';

const propTypes = {
  onChange: PropTypes.func.isRequired,
};

class DecimalTextField extends Component {
  onKeyPress = e => {
    // Prevent non-integer values like "-"
    if (
      !(
        (e.charCode > 47 && e.charCode < 58) ||
        e.charCode === 8 ||
        e.charCode === 46 ||
        e.key === 'Enter'
      )
    ) {
      e.preventDefault();
    }
  };

  render() {
    return (
      <TextField
        type="number"
        onChanged={this.props.onChange}
        onKeyPress={this.onKeyPress}
        {...this.props}
      />
    );
  }
}

DecimalTextField.propTypes = propTypes;

export default DecimalTextField;

/**
 * Wrapper for Redux Form usage
 */
export const reduxFormDecimalTextField = ({
  input,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <DecimalTextField {...input} errorMessage={touched && error} {...rest} />
  );
};
