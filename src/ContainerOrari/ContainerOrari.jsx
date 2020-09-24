import React, { useEffect } from 'react';

import Container from 'react-bootstrap/Container';

import { connect, useSelector } from 'react-redux';

import { fetchAPI, selectOrarioGiorno, selectOrarioSettimana, selectOrarioSuccessivo } from '../redux/data';
import { Table } from 'react-bootstrap';

import CategorieLezioni, { withCategorieLezioni } from '../context/categorieLezioni';

//import { Test } from './ContainerOrari.styles';

const ContainerOrari = ({ isDataLoaded, fetchAPI }) => {
  const giorno = useSelector(selectOrarioGiorno);
  const settimana = useSelector(selectOrarioSettimana);
  const altro = useSelector(selectOrarioSuccessivo);

  useEffect(() => {
    if (!isDataLoaded)
      fetchAPI();
  }, [isDataLoaded, fetchAPI]);

  console.log(giorno);

  return (
    <Container>
      {
        isDataLoaded ? (
          <>
            <h1>Lezioni di oggi</h1>
            {
              giorno && giorno.length > 0 ? (
                <TabellaOrario orari={giorno} />
              ) : (
                  <div>Non ci sono lezioni per oggi</div>
                )
            }
            <hr />

            <h1>Lezioni della settimana</h1>
            {
              settimana && settimana.length > 0 ? (
                <TabellaOrario orari={settimana} />
              ) : (
                  <div>Non ci sono altre lezioni per questa settimana</div>
                )
            }
            <hr />

            <h2>Lezioni successive</h2>
            {
              altro && altro.length > 0 ? (
                <TabellaOrario orari={altro} />
              ) : (
                  <div>Non ci sono altre lezioni</div>
                )
            }
          </>
        ) : (
            <h1>Caricamento...</h1>
          )
      }
    </Container>
  )
};

const TabellaOrario = withCategorieLezioni(({ orari, categorieLezioni }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Data</th>
        <th>Insegnamento</th>
        <th>Orario</th>
        <th>Modalità lezione</th>
      </tr>
    </thead>
    <tbody>
      {
        orari.map((o, i) => <Item key={i} orario={o}
          categoriaSelezionata={categorieLezioni.getTipologia(o.id_insegnamento)}
          handleChangeCategoria={(v) => categorieLezioni.setData(o.id_insegnamento, v)} />)
      }
    </tbody>
  </Table>
));

const Item = ({ orario: { data, nome_insegnamento, inizio, fine }, categoriaSelezionata, handleChangeCategoria }) => (
  <tr>
    <td>{data && data.format("DD/MM/YYYY")}</td>
    <td>{nome_insegnamento}</td>
    <td>{inizio} - {fine}</td>
    <td>
      <select value={categoriaSelezionata} onChange={({ target: { value } }) => {
        handleChangeCategoria(value);
      }}>
        {
          CategorieLezioni.values.map((c, i) => (
            <option key={i} value={i}>{c}</option>
          ))
        }
      </select>
    </td>
  </tr>
);

const mapStateToProps = (state => {
  return { isDataLoaded: state != null }
});

export default connect(mapStateToProps, { fetchAPI })(ContainerOrari);
