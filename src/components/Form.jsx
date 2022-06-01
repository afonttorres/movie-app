import '../components/form.css';
import { useEffect, useState } from 'react';
import { Preview } from './Preview';
import { Modal } from './Modal';

export const Form = (props) => {

    const [isEditMode, setisEditMode] = useState(props.isEditMode);
    const [movieToPreview, setMovieToPreview] = useState(props.movieToPreview);
    const [movie, setMovie] = useState(props.movieToPreview);

    //MODAL
    const [isModalActive, setIsModalACtive] = useState(false);
    const [msg, setMsg] = useState();
    const [modalData, setModalData] = useState();

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
        let movie = data;
        if (sanitize(movie)) { props.addItem(movie); emptyInput(); }
        else {
            askConfirmation('Your inputs are empty, are you sure to save this data?', { movie: movie, id: movie.id, action: 'add' })
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
                askConfirmation('Did not found any changes, do you want to save your movie without changes?', { movie: movie, id: movie.id, action: 'update' })
            }
            emptyInput();
        }
        else {
            openModal('Some of your inputs might be wrong, check them out again.');
            return;
        }
    }

    const openModal = (data) => {
        setIsModalACtive(true);
        setMsg(data);
    }

    const closeModal = () => {
        setisEditMode(false);
        setIsModalACtive(false);
        setMsg();
        props.closeModal();
    }

    const askConfirmation = (text, data) => {
        openModal(text);
        setModalData(data);
    }


    let val = isEditMode === false ? 'add' : 'edit';

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                {isModalActive ? <Modal msg={msg} closeModal={closeModal} modalData={modalData} confirm={props.confirm} /> : null}
                <p className='closeButton' onClick={() => props.toggleForm()}><i className="fa-solid fa-x"></i></p>
                <div className={`input-container ${movie && isEditMode === true ? 'preview-active' : ''}`}>
                    <input name="name" type="text" onChange={handleInputChange} value={movie.name} placeholder='name'></input>
                    <input name="genre" type="text" onChange={handleInputChange} value={movie.genre} placeholder='genre'></input>
                    <input name="year" type="text" onChange={handleInputChange} value={movie.year} placeholder='year'></input>
                    <input name="imgUrl" type="text" onChange={handleInputChange} value={movie.imgUrl} placeholder='img url'></input>
                    <input name="valoration" type="text" onChange={handleInputChange} value={movie.valoration} placeholder='valoration'></input>
                </div>

                <div className={`form-button-container ${movieToPreview && isEditMode ? 'preview-active' : ''}`}>
                    <button type="submit" className="add-button" value={val}>{val.toLocaleUpperCase()}</button>
                </div>

                {movieToPreview && isEditMode ?
                    <div className='preview-container'>
                        <Preview movieToPreview={movieToPreview} previewData={movie} />
                    </div>
                    : null}

            </form>
        </div>
    )
}