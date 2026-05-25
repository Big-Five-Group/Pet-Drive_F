# Guia de Integração Frontend-Backend

Este documento fornece instruções detalhadas para integrar o frontend com o backend do aplicativo de carona compartilhada.

## 🔗 Configuração da Conexão

### 1. URL da API

Edite o arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
```

Substitua `http://localhost:3000/api` pela URL do seu backend.

### 2. CORS (Cross-Origin Resource Sharing)

Certifique-se de que o backend está configurado para aceitar requisições do frontend. No backend, configure o CORS:

```javascript
// Exemplo com Express
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // URL do frontend em desenvolvimento
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

Para produção, substitua `http://localhost:5173` pela URL do seu frontend.

## 📡 Endpoints Esperados

O frontend espera que o backend implemente os seguintes endpoints:

### Autenticação

#### POST `/auth/login`
**Requisição:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "name": "João Silva",
    "email": "usuario@email.com",
    "phone": "(11) 99999-9999",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### POST `/auth/register`
**Requisição:**
```json
{
  "name": "João Silva",
  "email": "usuario@email.com",
  "password": "senha123",
  "phone": "(11) 99999-9999"
}
```

**Resposta (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "name": "João Silva",
    "email": "usuario@email.com",
    "phone": "(11) 99999-9999",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### POST `/auth/logout`
**Requisição:** (requer header `Authorization: Bearer {token}`)

**Resposta (200):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

#### POST `/auth/validate`
**Requisição:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Resposta (200):**
```json
{
  "valid": true
}
```

### Viagens

#### GET `/trips`
**Query Parameters:**
- `page` (padrão: 1)
- `pageSize` (padrão: 10)

**Requisição:** (requer header `Authorization: Bearer {token}`)

**Resposta (200):**
```json
{
  "data": [
    {
      "id": "trip-123",
      "origin": "São Paulo, SP",
      "destination": "Rio de Janeiro, RJ",
      "distance": 430,
      "speed": 80,
      "estimatedTime": 322,
      "departureTime": "2024-01-20T14:00:00Z",
      "availableSeats": 2,
      "driverId": "user-123",
      "driver": {
        "id": "user-123",
        "name": "João Silva",
        "email": "usuario@email.com"
      },
      "passengers": [],
      "status": "pending",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "pageSize": 10
}
```

#### GET `/trips/:id`
**Requisição:** (requer header `Authorization: Bearer {token}`)

**Resposta (200):**
```json
{
  "id": "trip-123",
  "origin": "São Paulo, SP",
  "destination": "Rio de Janeiro, RJ",
  "distance": 430,
  "speed": 80,
  "estimatedTime": 322,
  "departureTime": "2024-01-20T14:00:00Z",
  "availableSeats": 2,
  "driverId": "user-123",
  "driver": {
    "id": "user-123",
    "name": "João Silva",
    "email": "usuario@email.com"
  },
  "passengers": [
    {
      "id": "user-456",
      "name": "Maria Santos",
      "email": "maria@email.com"
    }
  ],
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### POST `/trips`
**Requisição:** (requer header `Authorization: Bearer {token}`)
```json
{
  "origin": "São Paulo, SP",
  "destination": "Rio de Janeiro, RJ",
  "distance": 430,
  "speed": 80,
  "departureTime": "2024-01-20T14:00:00Z",
  "availableSeats": 4
}
```

**Resposta (201):**
```json
{
  "id": "trip-123",
  "origin": "São Paulo, SP",
  "destination": "Rio de Janeiro, RJ",
  "distance": 430,
  "speed": 80,
  "estimatedTime": 322,
  "departureTime": "2024-01-20T14:00:00Z",
  "availableSeats": 4,
  "driverId": "user-123",
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### PUT `/trips/:id`
**Requisição:** (requer header `Authorization: Bearer {token}`)
```json
{
  "origin": "São Paulo, SP",
  "destination": "Brasília, DF",
  "distance": 1000,
  "speed": 90,
  "departureTime": "2024-01-20T14:00:00Z",
  "availableSeats": 3
}
```

**Resposta (200):**
```json
{
  "id": "trip-123",
  "origin": "São Paulo, SP",
  "destination": "Brasília, DF",
  "distance": 1000,
  "speed": 90,
  "estimatedTime": 667,
  "departureTime": "2024-01-20T14:00:00Z",
  "availableSeats": 3,
  "driverId": "user-123",
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

#### DELETE `/trips/:id`
**Requisição:** (requer header `Authorization: Bearer {token}`)

**Resposta (200):**
```json
{
  "success": true,
  "message": "Viagem deletada com sucesso"
}
```

#### POST `/trips/:id/join`
**Requisição:** (requer header `Authorization: Bearer {token}`)

**Resposta (200):**
```json
{
  "id": "trip-123",
  "origin": "São Paulo, SP",
  "destination": "Rio de Janeiro, RJ",
  "distance": 430,
  "speed": 80,
  "estimatedTime": 322,
  "departureTime": "2024-01-20T14:00:00Z",
  "availableSeats": 1,
  "driverId": "user-123",
  "passengers": [
    {
      "id": "user-456",
      "name": "Maria Santos",
      "email": "maria@email.com"
    },
    {
      "id": "user-789",
      "name": "Pedro Costa",
      "email": "pedro@email.com"
    }
  ],
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

#### POST `/trips/:id/leave`
**Requisição:** (requer header `Authorization: Bearer {token}`)

**Resposta (200):**
```json
{
  "id": "trip-123",
  "origin": "São Paulo, SP",
  "destination": "Rio de Janeiro, RJ",
  "distance": 430,
  "speed": 80,
  "estimatedTime": 322,
  "departureTime": "2024-01-20T14:00:00Z",
  "availableSeats": 2,
  "driverId": "user-123",
  "passengers": [
    {
      "id": "user-456",
      "name": "Maria Santos",
      "email": "maria@email.com"
    }
  ],
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

### Temas

#### GET `/themes`
**Query Parameters:**
- `page` (padrão: 1)
- `pageSize` (padrão: 10)

**Requisição:** (requer header `Authorization: Bearer {token}`)

**Resposta (200):**
```json
{
  "data": [
    {
      "id": "theme-123",
      "name": "Viagens Rápidas",
      "description": "Viagens com velocidade acima de 100 km/h",
      "color": "#aa3bff",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 10,
  "page": 1,
  "pageSize": 10
}
```

#### GET `/themes/:id`
**Requisição:** (requer header `Authorization: Bearer {token}`)

**Resposta (200):**
```json
{
  "id": "theme-123",
  "name": "Viagens Rápidas",
  "description": "Viagens com velocidade acima de 100 km/h",
  "color": "#aa3bff",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### POST `/themes`
**Requisição:** (requer header `Authorization: Bearer {token}`)
```json
{
  "name": "Viagens Rápidas",
  "description": "Viagens com velocidade acima de 100 km/h",
  "color": "#aa3bff"
}
```

**Resposta (201):**
```json
{
  "id": "theme-123",
  "name": "Viagens Rápidas",
  "description": "Viagens com velocidade acima de 100 km/h",
  "color": "#aa3bff",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### PUT `/themes/:id`
**Requisição:** (requer header `Authorization: Bearer {token}`)
```json
{
  "name": "Viagens Econômicas",
  "description": "Viagens com velocidade controlada",
  "color": "#00ff00"
}
```

**Resposta (200):**
```json
{
  "id": "theme-123",
  "name": "Viagens Econômicas",
  "description": "Viagens com velocidade controlada",
  "color": "#00ff00",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

#### DELETE `/themes/:id`
**Requisição:** (requer header `Authorization: Bearer {token}`)

**Resposta (200):**
```json
{
  "success": true,
  "message": "Tema deletado com sucesso"
}
```

### Produtos

#### GET `/products`
**Query Parameters:**
- `page` (padrão: 1)
- `pageSize` (padrão: 10)
- `themeId` (opcional)

**Requisição:** (requer header `Authorization: Bearer {token}`)

**Resposta (200):**
```json
{
  "data": [
    {
      "id": "product-123",
      "name": "Protetor Solar",
      "description": "Protetor solar SPF 50",
      "price": 49.90,
      "themeId": "theme-123",
      "image": "https://...",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 20,
  "page": 1,
  "pageSize": 10
}
```

#### GET `/products/:id`
**Requisição:** (requer header `Authorization: Bearer {token}`)

**Resposta (200):**
```json
{
  "id": "product-123",
  "name": "Protetor Solar",
  "description": "Protetor solar SPF 50",
  "price": 49.90,
  "themeId": "theme-123",
  "image": "https://...",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### POST `/products`
**Requisição:** (requer header `Authorization: Bearer {token}`)
```json
{
  "name": "Protetor Solar",
  "description": "Protetor solar SPF 50",
  "price": 49.90,
  "themeId": "theme-123",
  "image": "https://..."
}
```

**Resposta (201):**
```json
{
  "id": "product-123",
  "name": "Protetor Solar",
  "description": "Protetor solar SPF 50",
  "price": 49.90,
  "themeId": "theme-123",
  "image": "https://...",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### PUT `/products/:id`
**Requisição:** (requer header `Authorization: Bearer {token}`)
```json
{
  "name": "Protetor Solar Premium",
  "description": "Protetor solar SPF 70",
  "price": 59.90,
  "themeId": "theme-123",
  "image": "https://..."
}
```

**Resposta (200):**
```json
{
  "id": "product-123",
  "name": "Protetor Solar Premium",
  "description": "Protetor solar SPF 70",
  "price": 59.90,
  "themeId": "theme-123",
  "image": "https://...",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

#### DELETE `/products/:id`
**Requisição:** (requer header `Authorization: Bearer {token}`)

**Resposta (200):**
```json
{
  "success": true,
  "message": "Produto deletado com sucesso"
}
```

## 🔒 Autenticação com Token

Todos os endpoints protegidos requerem o header `Authorization` com o token JWT:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

O frontend adiciona automaticamente este header em todas as requisições via interceptor do Axios.

## ⚠️ Tratamento de Erros

O frontend espera que o backend retorne os seguintes status HTTP:

| Status | Significado |
|--------|-------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Token inválido ou expirado |
| 403 | Forbidden - Acesso negado |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

**Formato de Erro Esperado:**
```json
{
  "success": false,
  "message": "Descrição do erro",
  "error": "Detalhes técnicos (opcional)"
}
```

## 🧪 Testando a Integração

### 1. Teste de Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@email.com",
    "password": "senha123"
  }'
```

### 2. Teste de Criação de Viagem
```bash
curl -X POST http://localhost:3000/api/trips \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "origin": "São Paulo, SP",
    "destination": "Rio de Janeiro, RJ",
    "distance": 430,
    "speed": 80,
    "departureTime": "2024-01-20T14:00:00Z",
    "availableSeats": 4
  }'
```

### 3. Teste de Listagem de Viagens
```bash
curl -X GET "http://localhost:3000/api/trips?page=1&pageSize=10" \
  -H "Authorization: Bearer {token}"
```

## 📝 Notas Importantes

1. **Token JWT**: O frontend espera um token JWT válido no formato `Bearer {token}`
2. **CORS**: Configure o CORS no backend para aceitar requisições do frontend
3. **Validação de Token**: O frontend valida o token automaticamente e redireciona para login se expirar
4. **Timestamps**: Use o formato ISO 8601 para datas (ex: `2024-01-15T10:30:00Z`)
5. **Paginação**: O frontend espera respostas paginadas com `data`, `total`, `page` e `pageSize`

## 🆘 Troubleshooting

### Erro: "Network Error" ou "CORS Error"
- Verifique se o backend está rodando
- Verifique se a URL em `VITE_API_URL` está correta
- Verifique se o CORS está configurado no backend

### Erro: "401 Unauthorized"
- Verifique se o token está sendo enviado corretamente
- Verifique se o token não expirou
- Verifique se o backend valida o token corretamente

### Erro: "404 Not Found"
- Verifique se o endpoint existe no backend
- Verifique se a URL está correta
- Verifique se o ID do recurso está correto

## 📚 Recursos

- [JWT.io](https://jwt.io) - Decodificador de JWT
- [Postman](https://www.postman.com) - Ferramenta para testar APIs
- [Insomnia](https://insomnia.rest) - Alternativa ao Postman
