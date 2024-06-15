import { useRef } from 'react';

const SearchUser = ({search, setSearch, userName, setUserName, transitionState, setTransitionState}) => {

    const inputRef = useRef();

    const handleSubmit = (e) => {

        e.preventDefault();
        if (!search.trim() || search === userName) return
        setUserName(search);
        setSearch('');
        inputRef.current.focus();
        setTransitionState(!transitionState);
        if (transitionState === true) setTimeout(() => {setTransitionState(transitionState);}, 300)
        
    }

    return (

        <form className='form' onSubmit={handleSubmit}>

            <input

                name='username-input'
                type="text"
                className='form__input'
                placeholder='Type in username...'
                value={search}
                onChange={(e)=> {setSearch(e.target.value)}}
                ref={inputRef}

            />

            <button 
                type='submit'
                className='form__btn'
            >Search for a user</button>

        </form>

    )

}

export default SearchUser
