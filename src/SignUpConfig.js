// サインアップ画面で設定する内容を定義する

const config = {
  header: "Create New Account", // サインアップ画面のヘッダ文言を設定
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    },
    {
      label: 'PhoneNumber',
      key: 'phone_number',
      required: false,
      displayOrder: 3,
      type: 'string'
    },
    // {
    //   label: 'Custom Attribute',
    //   key: 'custom_attr',
    //   required: false,
    //   displayOrder: 4,
    //   type: 'string',
    //   custom: true
    // } // カスタム項目の設定例
  ],  // サインアップ画面に表示する項目を設定
  defaultCountryCode: "81", // 電話番号の国コードの初期値を設定
  hideAllDefaults: true, // 全てのデフォルト入力項目を表示するかを設定(true/false)
  //hiddenDefaults: [] // 特定のデフォルト入力項目を非表示にしたい場合に設定
};

export default config;