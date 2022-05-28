# API de Autenticação

## **Introdução**

Essa API tem o intuito de ser um serviço que registra e loga usuários em uma aplicação, para tal foi utilizado como linguagem o JavaScript, através do NodesJS, utilizando o MongoDB como banco de dados. Para auxiliar o desenvolvimento das funções da API, foi utilizado o framework ExpressJS para definir rotas, bcryptsjs para criptografar as senhas dos usuários, jsonwebtoken para autenticar o usuário de maneira segura eficiente, express-validator para auxiliar à validar os formulários recebidos, mongoose para abstrair o modelo de usuário à ser cadastrado no banco de dados.

## Configuração

```jsx
Abra o arquivo config/default.json e preencha sua mongoURI e seu jwtSecret
```

Rode no terminal os seguintes scripts (é necessário que o nodeJS estejam instalados em seu OS)

```jsx
npm install
npm run server
```

O servidor rodará localmente na seguinte URL

```jsx
 [http://localhost:5000](http://localhost:5000/)
```

## Endpoints da API

**Registrar um usuário [POST /api/users]**

- Request: Adiciona um usuário e recebe um JSON web token
    - Headers
        
        ```jsx
        Content-type: application/json
        ```
        
    - Body
        
        ```jsx
        	{
              "name": "",
              "email": "",
              "password": ""
          }
        ```
        
- Response:
    - Body
        
        ```jsx
          {
            "token": ""
          }
        ```
        

**Loga um usuário [POST /api/auth]**

- Request: Insira email e senha para receber um JSON web token e assim obter acesso à aplicação
    - Headers
        
        ```jsx
        Content-type: application/json
        ```
        
    - Body
        
        ```jsx
            {
              "email": "",
              "password": ""
            }
        ```
        
- Response:
    - Body
        
        ```jsx
          {
            "token": ""
          }
        ```
        

##
