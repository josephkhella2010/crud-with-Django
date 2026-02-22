import type { textAndRadioInput } from "./interfaces";

export const registerInputArray = [
  { label: "username", type: "text", name: "username" },
  { label: "email", type: "text", name: "email" },
  { label: "password", type: "password", name: "password" },
  { label: "confirm password", type: "password", name: "repassword" },
].map((item) => ({ ...item, placeholder: `Please enter Your ${item.label}` }));

export const loginInputArray = [
  { label: "username", type: "text", name: "username" },
  { label: "password", type: "password", name: "password" },
].map((item) => {
  return item.name === "username"
    ? { ...item, placeholder: `Please enter YourUsername or Email` }
    : { ...item, placeholder: `Please Enter Your ${item.label}` };
});

export const taskInput: textAndRadioInput = [
  {
    textInput: [
      {
        label: "Title",
        type: "text",
        name: "title",
        placeholder: "Please enter Title",
      },
      {
        label: "Task",
        type: "text",
        name: "task",
        placeholder: "Please enter Task",
      },
    ],
  },
  {
    radioInput: {
      radioOptions: {
        title: "Completed",
        options: [
          { label: "No", type: "radio", name: "completed" },
          { label: "Yes", type: "radio", name: "completed" },
        ],
      },
    },
  },
];
