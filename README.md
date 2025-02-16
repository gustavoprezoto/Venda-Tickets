# Venda-Tickets
ES45B - Programação Web Back-End - ES51 (2024_02)
Aluno: Gustavo Prezoto Boca - 2250373

#### Tecnologias Utilizadas:
- Node.js com Express
- Sequelize para persistência de dados
- Banco de dados local
- Mustache para renderização de templates
- Rotas da API e Interface

#### Rotas:

###### Usuários:
- GET /users/register → Página de cadastro de usuário
- POST /users/create → Criação de usuário
- GET /users/login → Página de login
- POST /users/login → Autenticação do usuário
- GET /users/logout → Logout do usuário
- GET /users/dashboard → Painel do usuário

###### Ingressos:
- GET /tickets/buy → Página de compra de ingressos
- POST /tickets/buy/:ticketId → Compra de um ingresso
- GET /tickets/my-tickets → Histórico de compras do usuário

###### Admnistradores
- GET /tickets/create → Página para criação de ingressos
- POST /tickets/create → Criação de um ingresso
- GET /tickets/delete → Listagem de ingressos para exclusão
- POST /tickets/delete/:ticketId → Exclusão de um ingresso e suas compras associadas
