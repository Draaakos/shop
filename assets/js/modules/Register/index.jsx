import React, { useState } from 'react';
import Input from 'ui/Input';
import service from 'services/auth';
import { notify } from 'utils/notifications';

const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /\D*([+56])(\d{5})(\d{4})\D*/g;

const Register = () => {
  const [errors, updateErrors] = useState({});
  const [form, updateForm] = useState({});

  const onSend = evt => {
    evt.preventDefault();

    if(Object.keys(errors).length) {
      notify('hay campos invalidos');
      return;
    }

    const password = form.password1 === form.password2
      ? form.password1
      : '';

    if(!password.length) {
      notify('Las contraseñas deber ser iguales');
      return;
    }

    service.register(
      form.firstName,
      form.lastName,
      form.email,
      form.phone,
      password
    ).then(response => {
      if(response.success) {
        notify("Registro Realizado exitosamente!");
        window.location.assign('/login');
      };
    })
  }

  const onChangeInput = obj => {
    updateForm({
      ...form,
      ...{ [obj.key]: obj.value }
    });
  }

  return(
    <section className="form__container">
      <form className="form" onSubmit={onSend}>
        <div>
          <div className="form__title">Registrarse</div>

          <Input
            type='text'
            label='Nombre'
            name='firstName'
            getValue={onChangeInput}
            regex={nameRegex}
            errors={errors}
            updateErrors={updateErrors}
            placeholder='Juan'
          />

          <Input
            type='text'
            label='Apellido'
            name='lastName'
            getValue={onChangeInput}
            regex={nameRegex}
            errors={errors}
            updateErrors={updateErrors}
            placeholder='Soto'
          />

          <Input
            type='email'
            label='Correo electrónico'
            name='email'
            getValue={onChangeInput}
            regex={emailRegex}
            errors={errors}
            updateErrors={updateErrors}
            placeholder='example@gmail.com'
          />

          <Input
            type='text'
            label='Teléfono'
            name='phone'
            getValue={onChangeInput}
            regex={phoneRegex}
            errors={errors}
            updateErrors={updateErrors}
            placeholder='+56922224444'
          />

          <Input
            type='password'
            label='Contraseña'
            name='password1'
            getValue={onChangeInput}
            errors={errors}
            updateErrors={updateErrors}
          />

          <Input
            type='password'
            label='Verificar Contraseña'
            name='password2'
            getValue={onChangeInput}
            errors={errors}
            updateErrors={updateErrors}
          />
        </div>
        <button className="default-button">entrar</button>
      </form>
    </section>
  )
}
export default Register;
