import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const MemberForm = ({ onSave, onCancel, member }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (member) {
      reset(member);
    } else {
      reset({ name: '', email: '', status: 'Ativo' });
    }
  }, [member, reset]);

  const onSubmit = (data) => {
    const finalData = member ? { ...data, id: member.id } : data;
    onSave(finalData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h3>{member ? 'Editar Utilizador' : 'Adicionar Novo Utilizador'}</h3>

        <div className="form-group-validation">
          {/* 1. Adicionado um label explícito */}
          <label htmlFor="name-input">Nome completo</label>
          <input
            id="name-input" // O id corresponde ao htmlFor do label
            type="text"
            placeholder="Nome completo"
            // 2. Adicionado aria-invalid para indicar que o campo tem um erro
            aria-invalid={errors.name ? "true" : "false"}
            // 3. Adicionado aria-describedby para conectar ao elemento de erro
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register('name', { required: 'O nome é obrigatório.' })}
          />
          {/* 4. A mensagem de erro agora tem um id e um role="alert" */}
          {errors.name && <span id="name-error" className="error-message" role="alert">{errors.name.message}</span>}
        </div>

        <div className="form-group-validation">
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            placeholder="Email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register('email', {
              required: 'O email é obrigatório.',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Formato de email inválido.',
              },
            })}
          />
          {errors.email && <span id="email-error" className="error-message" role="alert">{errors.email.message}</span>}
        </div>

        <div className="form-group-validation">
          <label htmlFor="status-select">Status</label>
          <select id="status-select" {...register('status')}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Salvar</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;