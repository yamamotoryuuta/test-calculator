# ベースイメージとしてNode.jsのイメージを使用
FROM node:latest

# アプリケーションディレクトリを作成
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストール
# パッケージマニフェストファイルをコピー
COPY package*.json ./

# npm installを実行
RUN npm install

# アプリケーションのソースをコンテナ内にコピー
COPY . .

# アプリケーションがリッスンするポートを指定
EXPOSE 3000

# アプリケーションサーバーを起動
CMD ["npm", "start"]
