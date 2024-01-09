import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Create() {
    const [livroDados, setLivroDados] = useState({
        id: '',
        title: '',
        description: '',
        pageCount: '',
        excerpt: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        create(livroDados);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLivroDados({ ...livroDados, [name]: value });
    };

    function create(formData) {
        axios({
            method: 'post',
            url: `https://fakerestapi.azurewebsites.net/api/v1/Books`,
            data: formData
          }).then((response) => {
            console.log(response)
            const status = response.status;
            if (status === 200) {
                console.log(response.data);
                toast.success('Item adicionado com sucesso! Clique em voltar para acessar todos os livros.');
            } else {
              toast.error('Erro ao adicionar livro!');
            }
          }).catch((error) => {
            console.log(error);
          });
    }

    return (
        <div className='container py-4'>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='form-group col-md-2'>
                        <label>ID:</label>
                        <input
                            type="text"
                            className='form-control'
                            name="id"
                            value={livroDados.id}
                            onChange={handleChange}
                            placeholder='ID'
                            required
                        />
                    </div>
                    <div className='form-group col-md-6'>
                        <label>Título:</label>
                        <input
                            type="text"
                            className='form-control'
                            name="title"
                            value={livroDados.title}
                            onChange={handleChange}
                            placeholder='Título'
                            required
                        />
                    </div>
                    <div className='form-group col-md-4'>
                        <label>Número de páginas:</label>
                        <input
                            type="number"
                            className='form-control'
                            name="pageCount"
                            value={livroDados.pageCount}
                            onChange={handleChange}
                            placeholder='Número de páginas'
                            required
                        />
                    </div>
                </div>
                <div className='form-group pt-4'>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        className='form-control'
                        name="description"
                        value={livroDados.description}
                        onChange={handleChange}
                        placeholder='Descrição'
                        required
                    />
                </div>
                <div className='form-group pt-4'>
                    <label>Resumo:</label>
                    <textarea
                        className='form-control'
                        name="excerpt"
                        rows="7"
                        value={livroDados.excerpt}
                        onChange={handleChange}
                        placeholder='Resumo'
                        required
                    ></textarea>
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

export default Create;