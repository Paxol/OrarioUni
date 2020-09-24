import moment from 'moment';

// ACTIONS
const CHANGE_DATA = "orario_elly/data/CHANGE_DATA";

export default function reducer(state, action) {
	console.log(action)
	switch (action.type) {
		case CHANGE_DATA:
			return action.payload;

		default:
			return state;
	}
}

export function fetchAPI() {
	return (dispatch => {
		let myHeaders = new Headers();
		myHeaders.append("x-requested-with", "XMLHttpRequest");
		myHeaders.append("content-type", "application/x-www-form-urlencoded; charset=UTF-8");

		let urlencoded = new URLSearchParams();
		urlencoded.append("view", "easycourse");
		urlencoded.append("form-type", "corso");
		urlencoded.append("include", "corso");
		urlencoded.append("txtcurr", "2 anno - Generale");
		urlencoded.append("anno", "2020");
		urlencoded.append("corso", "3050");
		urlencoded.append("anno2[]", "GEN|2");
		urlencoded.append("date", "21-09-2020");
		urlencoded.append("periodo_didattico", "");
		urlencoded.append("_lang", "it");
		urlencoded.append("list", "0");
		urlencoded.append("week_grid_type", "-1");
		urlencoded.append("ar_codes_", "");
		urlencoded.append("ar_select_", "");
		urlencoded.append("col_cells", "0");
		urlencoded.append("empty_box", "0");
		urlencoded.append("only_grid", "0");
		urlencoded.append("highlighted_date", "0");
		urlencoded.append("all_events", "0");
		urlencoded.append("faculty_group", "0");
		urlencoded.append("all_events", "1");

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow'
		};

		return fetch("https://cors-anywhere.herokuapp.com/https://agendastudenti.unipr.it/grid_call.php", requestOptions)
			.then(response => response.json())
			.then(result => dispatch(changeData(result)))
			.catch(error => console.error(error));
	})
}

export function changeData(data) {
	return {
		type: CHANGE_DATA,
		payload: data
	}
}

export function selectOrarioLezioni(state) {
	if (state) {
		const orari = state.celle.map(c => {
			let data = moment(c.data.split('-').reverse().join('-'))

			return {
				data,
				nome_insegnamento: c.nome_insegnamento,
				inizio: c.ora_inizio,
				fine: c.ora_fine,
				id_insegnamento: c.codice_insegnamento,
			}
		})

		return orari
	}
}

export function selectOrarioGiorno(state) {
	const orari = selectOrarioLezioni(state);

	if (orari) {
		const giornata = orari.filter(c => moment().isSame(c.data, 'day'))
		giornata.sort((a, b) => {
			return (a.inizio < b.inizio) ? -1 : 0;
		})
		return giornata;
	}
}

export function selectOrarioSettimana(state) {
	const orari = selectOrarioLezioni(state);

	if (orari) {
		const settimana = orari.filter(c => c.data.isAfter(moment()) && moment().isSame(c.data, 'week'));
		settimana.sort((a, b) => {
			if (a.data.isBefore(b.data)) {
				return -1;
			} else if (a.data.isSame(b.data, 'day')) {
				return (a.inizio < b.inizio) ? -1 : 0;
			} else return 1;
		});

		return settimana;
	}
}

export function selectOrarioSuccessivo(state) {
	const orari = selectOrarioLezioni(state);

	if (orari) {
		const altro = orari.filter(c => c.data.isAfter(moment().endOf('week')))
		altro.sort((a, b) => {
			if (a.data.isBefore(b.data)) {
				return -1;
			} else if (a.data.isSame(b.data, 'day')) {
				return (a.inizio < b.inizio) ? -1 : 0;
			} else return 1;
		});

		return altro
	}
}

