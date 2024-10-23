import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
    }
  }
`;

const FormCategory = () => {
  const [category, setCategory] = useState('');

  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createCategory({
        variables: { input: { name: category } },
      });
      console.log('Categoria criada:', data.createCategory);

      setCategory('');
    } catch (err) {
      console.error('Erro ao criar categoria:', err);
    }
  };

  return (
    <div>
      <h1>Criar categoria</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          <label>Nome:</label>
          <input
            type="text"
            className="border-2 p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Digite o nome da categoria"
            required
          />
        </div>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar Categoria'}
        </button>

        {error && <p>Erro: {error.message}</p>}
      </form>
    </div>
  );
};

export default FormCategory;
