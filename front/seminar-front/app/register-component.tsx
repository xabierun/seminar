'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createUser } from '../api/user';
import { AxiosError } from 'axios';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const response = await createUser(data).catch((error: AxiosError) => {
      return error;
    });
    alert(response);
  };

  return (
    <div className="container">
      <h1>新規会員登録</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">ユーザー名:</label>
          <input
            type="text"
            id="username"
            {...register('username', {
              required: 'ユーザー名が必要です',
              minLength: {
                value: 3,
                message: 'ユーザー名は3文字以上入力してください',
              },
              maxLength: {
                value: 20,
                message: 'ユーザー名は20文字以下で入力してください',
              },
            })}
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'メールアドレスは必須入力項目です',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'hogehoge@example.com形式で入力してください',
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'パスワードは必須入力項目です',
              minLength: {
                value: 8,
                message: 'パスワードは8文字以上入力してください',
              },
              validate: {
                hasNumber: value =>
                  /\d/.test(value) || 'パスワードには数字を一文字以上入力してください',
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default Register;
