import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import logo from './logo.svg';
import './App.css';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
import * as subscriptions from './graphql/subscriptions';

Amplify.configure(awsconfig);

const App = () => {
  const [stateTodos, setTodos] = useState([]);
  const [nameVal, setNameVal] = useState('');
  const nameHandler = e => {
    setNameVal(e.target.value);
  }
  
  // 追加
  const clickHandler = async () => {
    if (!nameVal) return;
    await API.graphql(
      graphqlOperation(mutations.createTodo, {input: {name: nameVal}})
    );
    setNameVal('');
  };

  useEffect(() => {
    // 最初の一覧取得
    (async () => {
      const todos = await API.graphql(graphqlOperation(queries.listTodos));
      setTodos(todos.data.listTodos.items);
    })();
    
    // 追加イベントの購読
    API.graphql(graphqlOperation(subscriptions.onCreateTodo)).subscribe({
      next: todoData => {
        const { id, name } = todoData.value.data.onCreateTodo;
        setTodos(prevTodos => [...prevTodos, { id, name }]);
      }
    });
}, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div style={{padding: '1rem', display:'flex', backgroundColor: '#fff'}}>
          <TextField label="Name" value={nameVal} onChange={nameHandler} />
          <Button
            variant="contained"
            color="primary"
            onClick={clickHandler}
            size="large"
          >
            Add
          </Button>
        </div>
        {stateTodos.map(todo => (
          <div key={todo.id}>{todo.name}</div>
        ))}
      </header>
    </div>
  );
}

const signUpConfig = {
  header: "Create New Account", // サインアップ画面のヘッダ文言を設定
  signUpFields: [
    {
      label: "Email(User Name)",
      key: "username",
      required: true,
      displayOrder: 2,
      type: "string"
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 3,
      type: "password"
    },
    {
      label: "PhoneNumber",
      key: "phone_number",
      required: false,
      displayOrder: 4,
      type: "string"
    }
    // {
    //   label: 'Custom Attribute',
    //   key: 'custom_attr',
    //   required: false,
    //   displayOrder: 4,
    //   type: 'string',
    //   custom: true
    // } // カスタム項目の設定例
  ], // サインアップ画面に表示する項目を設定
  defaultCountryCode: "81", // 電話番号の国コードの初期値を設定
  hideAllDefaults: true // 全てのデフォルト入力項目を表示するかを設定(true/false)
  //hiddenDefaults: [] // 特定のデフォルト入力項目を非表示にしたい場合に設定
};

export default withAuthenticator(App, { signUpConfig });
