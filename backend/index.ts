import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import connectDB from './config/db'; // Importa a função de conexão
import typeDefs from './schema/schema'; // Importa seus typeDefs
import resolvers from './resolvers'; // Importa seus resolvers

const app = express();
const port = 8000;

// Função assíncrona para iniciar o servidor
const startServer = async () => {
  try {
    // 1. Conectar ao MongoDB
    await connectDB();

    // 2. Criar uma instância do ApolloServer
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // 3. Iniciar o servidor Apollo
    await server.start();

    // 4. Aplicar o middleware do ApolloServer ao Express
    server.applyMiddleware({ app });

    // 5. Iniciar o servidor Express
    app.listen(port, () => {
      console.log(`Servidor escutando na porta ${port}`);
      console.log(
        `GraphQL Playground disponível em http://localhost:${port}${server.graphqlPath}`,
      );
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
};

// Iniciar o servidor
startServer();
