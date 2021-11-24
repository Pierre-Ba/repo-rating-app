import React, { useState } from "react";
import { Text, TextInput, Pressable, View, ScrollView } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";

const Form = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    onSubmit({ username, password, email });
  };

  return (
    <View>
      <View>
        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Username"
          testID="usernameField"
        />
      </View>
      <View>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          testID="passwordField"
        />
      </View>
      <View>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          testID="emailField"
        />
      </View>
      <View>
        <Pressable onPress={handleSubmit} testID="submitButton">
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

describe("Form", () => {
  it("calls function provided by onSubmit prop after pressing the submit button", () => {
    const onSubmit = jest.fn();
    const onScrollMock = jest.fn();

    const { getByTestId } = render(
      <ScrollView onScroll={onScrollMock} testID="scroll-view">
        <Form onSubmit={onSubmit}  />
      </ScrollView>
    );

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 200,
        },
      },
    };

    console.log("On End Reached: ", onScrollMock.mock.calls);

    fireEvent.changeText(getByTestId("usernameField"), "kalle");
    fireEvent.changeText(getByTestId("passwordField"), "password");
    fireEvent.changeText(getByTestId("emailField"), "kalle@gmail.com");
    fireEvent.press(getByTestId("submitButton"));
    fireEvent.scroll(getByTestId("scroll-view"), eventData);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    console.log("Mock calls", onSubmit.mock.calls);
    console.log("Mock results", onSubmit.mock.results);

    // onSubmit.mock.calls[0][0] contains the first argument of the first call
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: "kalle",
      password: "password",
      email: "kalle@gmail.com",
    });
    expect(onScrollMock).toHaveBeenCalled();
  });
});
