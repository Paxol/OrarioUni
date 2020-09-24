import React, { createContext } from 'react';

class CategorieLezioni {
    static values = ["", "In diretta", "Video su Elly"];

    constructor() {
        this.data = undefined;
    }

    getData = () => {
        if (!this.data) {
            const loaded = localStorage.getItem(CategorieLezioni.name);
            if (loaded) {
                this.data = JSON.parse(loaded);
            } else {
                this.data = {};
            }
        }

        return this.data;
    }

    setData = (materia, tipologia) => {
        this.data[materia] = tipologia;
        localStorage.setItem(CategorieLezioni.name, JSON.stringify(this.data));
    }

    getTipologia = (materia) => {
        return this.data[materia];
    }

    getString = (tipologia) => {
        return CategorieLezioni.values[tipologia] || "";
    }
}

const CategorieLezioniContext = createContext(null);
const withCategorieLezioni = Component => props => (
    <CategorieLezioniContext.Consumer>
        {categorieLezioni => <Component {...props} categorieLezioni={categorieLezioni} />}
    </CategorieLezioniContext.Consumer>
)

export default CategorieLezioni;
export { CategorieLezioniContext, withCategorieLezioni };