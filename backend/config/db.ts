import mongoose from 'mongoose';

// URL de conexão do MongoDB (substitua pelo seu URL)
const mongoURI =
  'mongodb+srv://camilamadureira04:10102040@cluster0.dggn4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Função para conectar ao MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerra o processo com erro
  }
};

export default connectDB;
