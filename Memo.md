# Amplify × React App 構築メモ

[公式チュートリアル(React)](https://aws-amplify.github.io/docs/js/start?platform=react)を参考に構築する。

## React Settings

Reactのテンプレートを使用して構築を行う。

```bash
# テンプレートを使用するためにインストール
yarn global add create-react-app
# Reactアプリのテンプレートを使用
create-react-app myapp && cd myapp
# 実行してみる
yarn start
```

## Amplify Settings

先にCLIのインストールを行う。

```bash
yarn global add @aws-amplify/cli
```

次に、必要なパッケージをインストール

```bash
yarn add aws-amplify
# 以下はUIコンポーネント
yarn add aws-amplify-react
```

Amplify CLIを使用してプロジェクトのセットアップを行う

以下のリンクが参考になりそう。  
<https://aws-amplify.github.io/docs/cli-toolchain/quickstart#environments--teams>

```bash
amplify init
```

※初めて構築する場合、途中でAWSへのログインを求められます。  
事前にAWSアカウントの作成を行ってください。

|メッセージ|設定値|
|:--|:--|
|Enter a name for the project|プロジェクト名|
|Enter a name for the environment|dev|
|Choose your default editor|Visual Studio Code|
|Choose the type of app that you're building|javascript|
|What javascript framework are you using|react|
|Source Directory Path|src|
|Distribution Directory Path|build|
|Build Command|npm run-script build|
|Start Command|npm run-script start|
|Do you want to use an AWS profile?|Y, default|

成功すると以下のメッセージが表示される

```none
✔ Successfully created initial AWS cloud resources for deployments.
✔ Initialized provider successfully.
Initialized your environment successfully.

Your project has been successfully initialized and connected to the cloud!
```

上記の作業だけで以下の内容がセットアップされる。

- IAM
- S3
- CloudFormation

IAMが自動生成される  
![IAM](md-images/2019-07-12-15-01-13.png)

S3が自動生成される  
![S3](md-images/2019-07-12-15-02-59.png)

CloudFormationはテンプレートが作成される  
`team-provider-info.json`

```json
{
    "dev": {
        "awscloudformation": {
            "AuthRoleName": "amplify-sandbox-dev-20190712144240-authRole",
            "UnauthRoleArn": "arn:aws:iam::003995953257:role/amplify-sandbox-dev-20190712144240-unauthRole",
            "AuthRoleArn": "arn:aws:iam::003995953257:role/amplify-sandbox-dev-20190712144240-authRole",
            "Region": "us-east-1",
            "DeploymentBucketName": "amplify-sandbox-dev-20190712144240-deployment",
            "UnauthRoleName": "amplify-sandbox-dev-20190712144240-unauthRole",
            "StackName": "amplify-sandbox-dev-20190712144240",
            "StackId": "arn:aws:cloudformation:us-east-1:003995953257:stack/amplify-sandbox-dev-20190712144240/de790290-a467-11e9-bd28-12de81a2e318"
        }
    }
}
```
