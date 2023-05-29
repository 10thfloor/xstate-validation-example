"use client";

import { FormMachineReactContext } from "@/machines/formMachine";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector} from '@xstate/react'
import { formState } from '../../state/formState' 

type FormData = {
  firstName: string;
  lastName: string;
};

const isSubmitting = (state: any) => state.matches("submitting")

export default function DefaultValuesExample() {

  const machine = FormMachineReactContext.useActorRef();
  const submitting = useSelector(machine, isSubmitting)

  useEffect(() => {
    console.log("render")
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<FormData>({
    defaultValues: formState.form.get(),
  });

  useEffect(() => {
    if (submitting) {
      setValue("firstName", "");
      setValue("lastName", "");
    }
  }, [submitting]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        machine.send({ type: "SUBMIT_FORM" });
      })}
    >
      <Controller
        control={control}
        name="firstName"
        rules={{
          required: { value: true, message: "First name is required." },
        }}
        render={({ field: { onChange, value } }) => {
          return (
            <input
              placeholder="First name"
              onChange={({ currentTarget: { value } }) => {
                onChange(value);
                formState.form.firstName.set(value)
              }}
              value={value}
            />
          );
        }}
      />
      {errors.firstName && <span>This field is required</span>}

      <Controller
        control={control}
        name="lastName"
        rules={{
          required: { value: true, message: "Last name is required." },
        }}
        render={({ field: { onChange, value } }) => {
          return (
            <input
              placeholder="Last name"
              onChange={({ currentTarget: { value } }) => {
                onChange(value);
                formState.form.lastName.set(value)
              }}
              value={value}
            />
          );
        }}
      />
      {errors.lastName && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
