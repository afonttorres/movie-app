import '../components/form.css';
import { useEffect, useState } from 'react';
import { Preview } from './Preview';

export const Form = (props) => {

    const [isEditMode, setisEditMode] = useState(props.isEditMode);
    const [movieToPreview, setMovieToPreview] = useState(props.movieToPreview);
    const [movie, setMovie] = useState(props.movieToPreview);

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value.toLowerCase();

        setMovie({
            ...movie, [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitter = e.nativeEvent.submitter.value;

        if (submitter === 'add' && isEditMode === false) {
            addItem(movie);
            return;
        }
        else {
            updateItem(movie);
            return;
        }
    }

    const emptyInput = () => {
        setMovie({ name: '', genre: '', year: '', valoration: '', imgUrl: '' })
    }

    const sanitize = (obj) => {
        let isAble = false;
        for (let key in obj) {
            if (obj[key].length > 0 || obj[key].length === undefined) isAble = true;
            else isAble = false
        }
        return isAble;
    }

    const addItem = (data) => {
        let newItem = data;
        if (sanitize(newItem)) { props.addItem(newItem); emptyInput(); }
        else {
            let confirmation = window.confirm('Your inputs are empty, are you sure to save this data?');
            if (!confirmation) return;
            else props.addItem(newItem);
        }
    }

    const updateItem = (data) => {
        let movie = data;
        let changesCount = 0;

        if (sanitize(movie)) {
            for (let key in movie) {
                if (movie[key] !== movieToPreview[key]) changesCount++;
            }
            if (changesCount > 0) props.updateItem(movie, movie.id);
            else {
                let confirmation = window.confirm('Did not found any changes, do you want to save your movie without changes?');
                if (!confirmation) return;
                else props.updateItem(movie, movie.id);
            }
            emptyInput();
        }
        else {
            window.confirm('Some of your inputs might be wrong, check them out again.');
            return;
        }
    }

    let val = isEditMode === false ? 'add' : 'edit';
    
    return (
        <form className='form' onSubmit={handleSubmit}>
            {isEditMode === false ?
                <p className='closeButton' onClick={() => props.toggleForm()}><i className="fa-solid fa-x"></i></p>
                : null}

            <div className={`input-container ${movie && isEditMode === true ? 'preview-active' : ''}`}>
                <input name="name" type="text" onChange={handleInputChange} value={movie.name} placeholder='name'></input>
                <input name="genre" type="text" onChange={handleInputChange} value={movie.genre} placeholder='genre'></input>
                <input name="year" type="text" onChange={handleInputChange} value={movie.year} placeholder='year'></input>
                <input name="imgUrl" type="text" onChange={handleInputChange} value={movie.imgUrl} placeholder='img url'></input>
                <input name="valoration" type="text" onChange={handleInputChange} value={movie.valoration} placeholder='valoration'></input>
            </div>

            <div className={`button-container ${movieToPreview && isEditMode ? 'preview-active' : ''}`}>
                <button type="submit" className="add-button" value={val}>{val.toLocaleUpperCase()}</button>
            </div>

            {movieToPreview && isEditMode ?
                <div className='preview-container'>
                    <Preview movieToPreview={movieToPreview} previewData={movie} />
                </div>
                : null}

        </form>
    )
}