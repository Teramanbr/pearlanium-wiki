# Pearlanium Wiki - Projeto Acadêmico Cesmac

Este projeto foi desenvolvido como parte do curso de Análise e Desenvolvimento de Sistemas no Centro Universitário CESMAC. Trata-se de uma wiki interativa sobre itens de um universo de ficção, construída com React Native (Expo) e Firebase.

## Tecnologias Utilizadas
- React Native (Expo)
- TypeScript
- Firebase (Autenticação e Firestore)
- Context API para gerenciamento de estado

## Configuração do Firebase

Para executar o projeto, é necessário criar um arquivo `firebaseConfig.ts` na raiz do projeto com as seguintes credenciais do Firebase:

```ts
export const firebaseConfig = {
  apiKey: "examplekey",
  authDomain: "example-domain",
  projectId: "example-project",
  storageBucket: "examplebucket.app",
  messagingSenderId: "examplesender",
  appId: "exampleid",
}
```

Substitua os valores pelos dados reais da sua conta Firebase.

## Execução do Projeto

### Para versão WEB:
1. Certifique-se que o arquivo `metro.config.js` **não está presente** no diretório raiz
2. Instale dependências: `npm install`
3. Execute: `npm run web`

### Para versão MOBILE (Android/iOS):
1. Restaure o arquivo `metro.config.js` (necessário para bundler do React Native)
2. Instale dependências: `npm install`
3. Execute: `npm start` e escaneie o QR code com app Expo Go

## Nota Importante
O arquivo `metro.config.js` é necessário apenas para a versão mobile. Para executar na web, **você deve excluir este arquivo** temporariamente. Isso ocorre devido a diferenças de configuração entre as plataformas.
