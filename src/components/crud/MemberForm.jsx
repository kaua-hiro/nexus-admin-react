import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'; // 1. Importe o hook principal

const MemberForm = ({ onSave, onCancel, member }) => {
  // 2. Inicialize o React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Função para reiniciar o formulário
  } = useForm();

  // 3. useEffect para preencher o formulário quando estiver a editar um membro
  useEffect(() => {
    if (member) {
      reset(member); // Preenche o formulário com os dados do membro
    } else {
      reset({ name: '', email: '', status: 'Ativo' }); // Limpa o formulário
    }
  }, [member, reset]);

  // 4. A função onSave é chamada pelo handleSubmit apenas se a validação passar
  const onSubmit = (data) => {
    // Adiciona o ID de volta se estiver a editar
    const finalData = member ? { ...data, id: member.id } : data;
    onSave(finalData);
  };

  return (
    <div className="form-container">
      {/* 5. O handleSubmit do React Hook Form agora envolve a nossa função onSubmit */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>{member ? 'Editar Utilizador' : 'Adicionar Novo Utilizador'}</h3>
        
        {/* Campo de Nome com Validação */}
        <div className="form-group-validation">
          <input
            type="text"
            placeholder="Nome completo"
            // 6. O 'register' conecta o input ao formulário e adiciona regras
            {...register('name', { required: 'O nome é obrigatório.' })}
          />
          {/* 7. Mostra a mensagem de erro se a validação falhar */}
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>

        {/* Campo de Email com Validação */}
        <div className="form-group-validation">
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'O email é obrigatório.',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Formato de email inválido.',
              },
            })}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        {/* Campo de Status (não precisa de validação complexa) */}
        <div className="form-group-validation">
          <select {...register('status')}>
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