import { FormErrorsType } from "../../types/formErrorsType";

type PostFormValidatorProps = {
  userId: string;
  title: string;
  body: string;
};

function postFormValidator({ userId, title, body }: PostFormValidatorProps) {
  const formErrors: FormErrorsType = {};

  if (userId === "") {
    formErrors.userId = "Required";
  }
  if (title === "") {
    formErrors.title = "Required";
  }
  if (body === "") {
    formErrors.body = "Required";
  }

  return formErrors;
}

export default postFormValidator;
