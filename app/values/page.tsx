"use client";

import { FormMachineReactContext } from "@/machines/formMachine";
import { useForm, Controller, appendErrors } from "react-hook-form";
import { observer } from '@legendapp/state/react'

import { formState, formState as state } from '../../state/formState'
import { useEffect } from "react";


const FirstNameInput = (props: any) => {
  return (
    <>
      <Controller
        control={props.control}
        name="firstName"
        rules={{
          required: { value: true, message: "First name is required." },
        }}
        render={({ field: { value } }) => {
          return (
            <input
              placeholder="First name"
              onChange={({ currentTarget: { value } }) => {
                state.form.firstName.set(value)
              }}
              value={value}
            />
          );
        }}
      />
      {props.errors && <span>This field is required</span>}
    </>
  )
}

const LastNameInput = (props: any) => {

  return (
    <>
      <Controller
        control={props.control}
        name="lastName"
        rules={{
          required: { value: true, message: "Last name is required." },
        }}
        render={({ field: { value } }) => {
          return (
            <input
              placeholder="Last name"
              onChange={({ currentTarget: { value } }) => {
                state.form.lastName.set(value)
              }}
              value={value}
            />
          );
        }}
      />
      {props.errors && <span>This field is required</span>}
    </>
  )
}


export default observer(function ValuesExample() {
  const machine = FormMachineReactContext.useActorRef();

  useEffect(() => {
    console.log("render")
  })

  const {
    formState: { errors },
    handleSubmit,
    control
  } = useForm({
    values: {
      firstName: state.form.firstName.get(), 
      lastName: state.form.lastName.get()
    }
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        machine.send({ type: "SUBMIT_FORM" });
      })}
    >
      <FirstNameInput control={control} errors={errors.firstName} />
      <LastNameInput control={control} errors={errors.lastName} />
      <input type="submit" />
    </form>
  );
})
