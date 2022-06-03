import { useEffect, useState } from 'react';
import '../components/modal.css';

export const Modal = (props) => {
    const [msg, setMsg] = useState(props.msg);
    const [isQuestion, setIsQuestion] = useState(false);

    const [modalData, setModalData] = useState(props.modalData);


    useEffect(() => {
        checkMsg()
    }, [])

    useEffect(() => {
        setMsg(props.msg);
        setModalData(props.modalData);
    }, [props.msg, props.modalData])

    useEffect(() => {
        checkMsg();
    }, [msg])

    const checkMsg = () => {
        if (msg.includes('?')) setIsQuestion(true);
        else setIsQuestion(false);
    }

    const closeModal = () => {
        props.closeModal();
    }

    const confirm = () => {
        props.confirm(modalData);
    }

    return (
        <div className='modal-container'>
            <dialog className='modal'>
                <p className='closeButton modal-closeButton' onClick={closeModal}><i className="fa-solid fa-x"></i></p>
                <p className='font modal-text'>{msg}</p>
                <div className='modal-button-container' >
                    {isQuestion ?
                        <>
                            <button onClick={() => { confirm(); closeModal() }} className='font modal-button'>Yes</button>
                            <button onClick={closeModal} className='font modal-button'>Cancel</button>
                        </>
                        : <button onClick={closeModal} className='font modal-button'>Ok</button>}
                </div>
            </dialog>
        </div>
    )
}