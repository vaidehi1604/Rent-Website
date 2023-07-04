import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class PaymentForm extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const { token } = await this.props.stripe.createToken({ name: 'Customer Name' });
    // Send the token to your server for processing
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <button type="submit">Pay</button>
      </form>
    );
  }
}

export default injectStripe(PaymentForm);
