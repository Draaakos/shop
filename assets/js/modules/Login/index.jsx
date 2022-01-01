import React, { useState } from 'react';
import Input from 'ui/Input';
import service from 'services/auth';
import Spinner from 'ui/Spinner';
import { notify } from 'utils/notifications';

const Login = () => {
  const [errors, updateErrors] = useState({});
  const [form, updateForm] = useState({});
  const [isLoading, updateLoading] = useState(false);

  const onSend = evt => {
    evt.preventDefault();

    if (Object.keys(errors).length) {
      notify('hay campos invalidos');
      return;
    }

    updateLoading(true);

    service
      .login(form.email, form.password)
      .then(response => {
        updateLoading(false);
        if(response.success) {
          sessionStorage.setItem('uuid', response.result.uuid);
          sessionStorage.setItem('firstName', response.result.firstName);
          sessionStorage.setItem('lastName', response.result.lastName);
          sessionStorage.setItem('phone', response.result.phone);

          const lastUrl = window.localStorage.getItem('lastUrl');

          if(lastUrl) {
            window.localStorage.removeItem('lastUrl');
            window.location.assign(lastUrl);
            return;
          }

          window.location.assign('/');
        }
      });
  }

  const onChangeInput = obj => {
    updateForm({
      ...form,
      ...{ [obj.key]: obj.value }
    });
  }

  return(
    <section className="page-wrapper">
      <div className="form__container">
        <form className="form" onSubmit={onSend}>
          <Spinner status={isLoading} fullBlock />
          <div>
            <div className="form__title">Iniciar sesión</div>

            <Input
              type='email'
              label='Correo electrónico'
              name='email'
              getValue={onChangeInput}
              errors={errors}
              updateErrors={updateErrors}
            />

            <Input
              type='password'
              label='Contraseña'
              name='password'
              getValue={onChangeInput}
              errors={errors}
              updateErrors={updateErrors}
            />

          </div>
          <button type="submit" className="default-button">entrar</button>
        </form>
      </div>
    </section>
  )
}

export default Login;
