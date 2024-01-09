import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Edit() {
  const { id } = useParams();

  const [livroDados, setLivroDados] = useState({
    title: '',
    description: '',
    pageCount: '',
    excerpt: ''
  });

  const getLivroDados = async (livroId) => {
    axios({
      method: 'get',
      url: `https://fakerestapi.azurewebsites.net/api/v1/Books/${livroId}`
    }).then((response) => {
      const livroDados = response.data;
      setLivroDados(livroDados);
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      id,
      title: livroDados.title,
      description: livroDados.description,
      pageCount: livroDados.pageCount,
      excerpt: livroDados.excerpt
    };

    edit(formData, id);
  };

  function edit(formData, id) {
    axios({
      method: 'put',
      url: `https://fakerestapi.azurewebsites.net/api/v1/Books/${id}`,
      data: formData
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        console.log(response.data);
        toast.success('Item editado com sucesso! Clique em voltar para acessar todos os livros.');
      } else {
        toast.error('Erro ao editar livro!');
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getLivroDados(id);
  }, [id]);

  return (
    <div className='container py-4'>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='form-group col-md-2'>
            <label>ID:</label>
            <input type="text" value={id} className='form-control' readOnly/>
          </div>
          <div className='form-group col-md-6'>
            <label>Título:</label>
            <input
              type="text"
              className='form-control'
              value={livroDados.title}
              onChange={(e) => setLivroDados({ ...livroDados, title: e.target.value })}
              required
            />
          </div>
          <div className='form-group col-md-4'>
            <label>Número de páginas:</label>
            <input
              type="number"
              className='form-control'
              value={livroDados.pageCount}
              onChange={(e) => setLivroDados({ ...livroDados, pageCount: e.target.value })}
              required
            />
          </div>
        </div>
        <div className='form-group pt-4'>
          <label>Descrição:</label>
          <input
            type="text"
            className='form-control'
            value={livroDados.description}
            onChange={(e) => setLivroDados({ ...livroDados, description: e.target.value })}
            required
          />
        </div>
        <div className='form-group pt-4'>
          <label>Resumo:</label>
          <textarea
            type="text"
            rows="7"
            className='form-control'
            value={livroDados.excerpt}
            onChange={(e) => setLivroDados({ ...livroDados, excerpt: e.target.value })}
            required
          >
          </textarea>
        </div>
        <div className='d-flex justify-content-end py-4'>
          <Link to="/">
            <button className='btn btn-primary' style={{marginRight: "10px"}}>Voltar</button>
          </Link>
          <input type="submit" value="Enviar" className='btn btn-success'/>
        </div>
      </form>
    </div>
  );
}

export default Edit;