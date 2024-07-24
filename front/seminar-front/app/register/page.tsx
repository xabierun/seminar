'use client'; // この行を追加
// app/register/page.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getUser } from '../../api/user';

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
  } = useForm<IFormInput>({
    mode: 'onChange', // バリデーションを onChange イベントで実行
  });

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    console.log(data);
    console.log(await getUser());
    // ここでフォームのデータを処理します
    console.log('Form submitted');
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
                message: 'ユーザー名は3文字以上である必要があります',
              },
              maxLength: {
                value: 20,
                message: 'ユーザー名は20文字以下である必要があります',
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
              required: 'メールアドレスが必要です',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '有効なメールアドレスを入力してください',
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
              required: 'パスワードが必要です',
              minLength: {
                value: 8,
                message: 'パスワードは8文字以上である必要があります',
              },
              validate: {
                hasNumber: value =>
                  /\d/.test(value) ||
                  'パスワードには少なくとも1つの数字が含まれている必要があります',
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
