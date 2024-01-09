import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

async function listarLivros() {
    return axios({
        method: 'get',
        url: 'https://fakerestapi.azurewebsites.net/api/v1/Books'
    }).then((response) => {
        const livros = response.data;
        const primeiros50Livros = livros.slice(0, 50);

        return primeiros50Livros;
    }).catch((error) => {
        throw error;
    });
};

function deletarLivro(livroId, setPrimeiros50Livros) {
    axios({
        method: 'delete',
        url: `https://fakerestapi.azurewebsites.net/api/v1/Books/${livroId}`
      }).then((response) => {
        const status = response.status;
        if (status === 200) {
            setPrimeiros50Livros((livros) => livros.filter(livro => livro.id !== livroId));
            toast.success('Livro deletado com sucesso!');
        } else {
            toast.error('Erro ao deletar livro!');
        }
      }).catch((error) => {
        console.log(error);
      });
}

export default props => {
    const [primeiros50Livros, setPrimeiros50Livros] = useState([]);

    useEffect(() => {
        listarLivros().then((livros) => {
            setPrimeiros50Livros(livros);
        });
    }, []);

    return (
        <div className="container py-4">
            <ToastContainer />
            <table border="1" style={{borderCollapse: "collapse"}} className='table table-hover table-striped text-center'>
                <thead>
                    <tr>
                        <th className='align-middle'>ID</th>
                        <th className='align-middle'>Título</th>
                        <th className='align-middle'>Descrição</th>
                        <th className='align-middle'><Link to={`/create`}><button className='btn'><img src="/images/mais.png"/></button></Link></th>
                    </tr>
                </thead>
                <tbody>
                    {primeiros50Livros.map((livro, index) => (
                        <tr key={index}>
                            <td className='align-middle'>{livro.id}</td>
                            <td className='align-middle'>{livro.title}</td>
                            <td className='align-middle'>{livro.description}</td>
                            <td className='align-middle'>
                                <Link to={`/edit/${livro.id}`}><button className="btn"><img src="/images/pencil.png"/></button></Link>
                                <button onClick={() => deletarLivro(livro.id, setPrimeiros50Livros)} className='btn'><img src="/images/bloquear.png"/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}