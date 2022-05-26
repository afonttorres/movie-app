import '../components/form.css';
import { useState } from 'react';
import { Preview } from './Preview';

export const Form = (props) => {

    const [state, setState] = useState({ isEditMode: props.isEditMode, movie: props.movieToPreview, })

    const handleInputChange = (e) => {

        let name = e.target.name;
        let value = e.target.value.toLowerCase();

        setState({ isEditMode: props.isEditMode, movie: { ...state.movie, [name]: value } })

        console.log(state)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitter = e.nativeEvent.submitter.value;

        if (submitter === 'add' && state.isEditMode === false) {
            addItem(state.movie);
            return;
        }
        else {
            updateItem(state.movie);
            return;
        }
    }

    const emptyInput = () => {
        setState({ isEditMode: props.isEditMode, movie: { id: '', name: '', genre: '', year: '', valoration: '', imgUrl: '' } })
    }

    const sanitize = (obj) => {
        let data = obj;
        let id = data.id;
        delete data.id;
        let isAble = false;
        for (let key in data) {
            if (data[key].length > 0 && typeof data[key] === 'string') isAble = true;
            else isAble = false
        }
        return isAble;
    }

    const addItem = (state) => {
        let newItem = state;
        if (sanitize(newItem)) { props.addItem(newItem); emptyInput(); }
        else {
            let confirmation = window.confirm('Your inputs are empty, are you sure to save this data?');
            if (!confirmation) return;
            else props.addItem(newItem);
        }
    }

    const updateItem = (state) => {
        let movie = state;
        let changesCount = 0;
        if (sanitize(movie)) {
            for (let key in movie) {
                if (movie[key] !== props.movieToPreview[key]) changesCount++;
            }
            if (changesCount > 0) props.updateItem(movie, props.movieToPreview.id);
            else {
                let confirmation = window.confirm('Did not found any changes, do you want to save your movie without changes?');
                if (!confirmation) return;
                else props.updateItem(movie);
            }
            emptyInput();
        }
        else {
            window.confirm('Some of your inputs might be wrong, check them out again.');
            return;
        }
    }

    let val = state.isEditMode === false ? 'add' : 'edit';
    return (

        <form className='form' onSubmit={handleSubmit}>
            {state.isEditMode === false ?
                <p className='closeButton' onClick={() => props.toggleForm()}><i className="fa-solid fa-x"></i></p>
                : null}

            <div className={`input-container ${state.movie && state.isEditMode === true ? 'preview-active' : ''}`}>
                <input name="name" type="text" onChange={handleInputChange} value={state.movie.name} placeholder='name'></input>
                <input name="genre" type="text" onChange={handleInputChange} value={state.movie.genre} placeholder='genre'></input>
                <input name="year" type="text" onChange={handleInputChange} value={state.movie.year} placeholder='year'></input>
                <input name="imgUrl" type="text" onChange={handleInputChange} value={state.movie.imgUrl} placeholder='img url'></input>
                <input name="valoration" type="text" onChange={handleInputChange} value={state.movie.valoration} placeholder='valoration'></input>
            </div>

            <div className={`button-container ${state.movieToPreview && state.isEditMode ? 'preview-active' : ''}`}>
                <button type="submit" className="add-button" value={val}>{val.toLocaleUpperCase()}</button>
            </div>

            {state.movie && state.isEditMode ?
                <div className='preview-container'>
                    <Preview movieToPreview={state.movie} previewData={state.movie} />
                </div>
                : null}

        </form>
    )
}