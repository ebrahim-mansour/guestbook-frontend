import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./MessageForm.css";

const NewMessage = (props) => {
  const auth = useContext(AuthContext);

  const ownerId = useParams().userId;

  const [formState, inputHandler] = useForm(
    {
      msgBody: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const messageSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/messages/create`,
        "POST",
        JSON.stringify({
          msgBody: formState.inputs.msgBody.value,
          owner: ownerId,
        }),
        {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        }
      );

      history.push(`/`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="message-form" onSubmit={messageSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="msgBody"
          element="input"
          type="text"
          label="Message"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid text!"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Leave a Message
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewMessage;
