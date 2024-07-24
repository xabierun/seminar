'use client'; // この行を追加
// app/register/page.js

import React from 'react';
import { getRequest } from '../api/mogemoge';


const Register = () => {
  const handleSubmit = async (event: any) => {
    console.log(await getRequest());
    event.preventDefault();
    // ここでフォームのデータを処理します
    console.log('Form submitted');
  };

  return (
    <div className="container">
      <h1>新規会員登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">ユーザー名:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default Register;
