import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    
    const {active: note} = useSelector(state => state.notes) //renombrar active a note
    const [formValues, handleInputChange,reset] = useForm(note);
    const { body,title, id } = formValues;

    const activeId = useRef(note.id);
    const dispatch = useDispatch();

    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }
        
    }, [note,reset])

    // useEffect(() => {
    //     reset(note);
    // }, [note])

    useEffect(() => {
        dispatch(activeNote(formValues.id,{...formValues}))

    }, [formValues,dispatch])

    const handleDeleteNote = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className='notes__main-content'>
            <NotesAppBar />

            <div className='notes__content'>
                <input 
                    type="text"
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />

            </div>

            <textarea
                placeholder='What happened today'
                className='notes__textarea'
                name='body'
                value={body}
                onChange={handleInputChange}
            ></textarea>

            {
                (note.url) &&
                <div>
                    <img className='notes__image'
                        src={note.url}
                        alt='Image'
                    />
                </div>
            }

            <button
                className='btn btn-danger'
                onClick={handleDeleteNote}
            >
                Delete
            </button>

        </div>
    )
}
