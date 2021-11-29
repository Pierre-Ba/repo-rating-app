import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import SignInContainer from '../../src/components/signIn';






describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit =  jest.fn();
      console.log('ON SUBMIT FUNC: ', onSubmit.mock);

      const { getByTestId, debug } =  render(<SignInContainer onSubmit={onSubmit} />);

      act(() => {
        fireEvent.changeText(getByTestId("username"), "pierre");
      });
      act(() => {
        fireEvent.changeText(getByTestId("password"), "liverpool");
      });
      act(() => {
        fireEvent.press(getByTestId("signIn"));
      });
        
        
        

        debug();

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: "pierre",
            password: "liverpool",
           
          });
      });
    });
  });
});