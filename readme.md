

## :gear: Back-end

## Pré requisitos

- Git [Git](https://git-scm.com)
- Node.js [Node.js v11.15.0](https://nodejs.org/)
- Typescript [Typescript](https://www.typescriptlang.org/)
- Yarn [Yarn v1.13](https://yarnpkg.com/)
- MongoDB [MongoDB](https://www.mongodb.com/)
- Docker [Docker](https://www.docker.com/)
- Docker Compose [Docker Compose](https://docs.docker.com/compose/)

## Instruções

```bash

# entrar na pasta do projeto
cd api-node-typescript-sequelize-mongodb

# instalar as dependências
yarn install

# criar .env para informar as SUAS variáveis de ambiente
cp .env.example .env

# create folder docker/storage para armazenamento local
mkdir -p docker/storage

# permissão para container redis /mongodb
# se o container ficar reiniciando, aplique a permissão e reiniciei os containers
sudo chown -R 1001 docker

# subir os serviços (redis, mongodb)
docker-compose up -d

# verifique se os container estão rodando corretamente
docker ps

# obs. Se precisar reinicar os container utilize
docker-compose restart

# iniciar o servidor da aplicação
yarn dev
```

---

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
