import { formState } from "@/state/formState";
import { createActorContext } from "@xstate/react";
import { createMachine } from "xstate";



export const formMachine = createMachine(
  {
    id: "formMachine",
    schema: {
      events: {} as { type: "SUBMIT_FORM" },
    },
    initial: `editing`,
    states: {
      editing: {
        on: {
          SUBMIT_FORM: { target: "submitting" },
        },
      },
      submitting: {
        invoke: {
          src: "submitForm",
          onDone: { actions: ["clearFields"], target: "editing" },
        },
      },
    },
  },
  {
    actions: {
      clearFields: (context, event) => {
        formState.form.set({ firstName: "", lastName: "" })
      },
    },
    services: {
      async submitForm(context, event) {
        // Imagine something asynchronous here
        alert(
          `First name: ${formState.form.firstName.get()} Last name: ${formState.form.lastName.get()}`
        );
      },
    },
  }
);

export const FormMachineReactContext = createActorContext(formMachine);
