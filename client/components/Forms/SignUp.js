import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../../store';

const AuthSignUp = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div className='position-fixed'>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor='email'>
            <small>Email</small>
          </label>
          <input name='email' type='text' />
        </div>
        <div>
          <label htmlFor='password'>
            <small>Password</small>
          </label>
          <input name='password' type='password' />
        </div>
        <div>
          <label htmlFor='firstName'>
            <small>First Name</small>
          </label>
          <input name='firstName' type='text' />
        </div>
        <div>
          <label htmlFor='lastName'>
            <small>Last Name</small>
          </label>
          <input name='lastName' type='text' />
        </div>
        <div>
          <button type='submit'>{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;

      dispatch(authenticate(email, password, firstName, lastName, formName));
    },
  };
};

export const SignUp = connect(mapSignup, mapDispatch)(AuthSignUp);
