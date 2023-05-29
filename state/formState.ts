import { observable, ObservableObject } from '@legendapp/state'

export type FormData = {
  firstName: string;
  lastName: string;
};


export const formState: ObservableObject<{ form: FormData }> = observable({ 
    form: {
      firstName: "", 
      lastName: ""
    }
  })