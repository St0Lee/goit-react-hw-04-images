import { useState, useCallback } from "react";

import styles from "./searchbar.module.css"

const Searchbar = ({onSubmit}) => {
    const [state, setState] = useState("")
    const [submitValue, setSubmitValue] = useState("")

    const handleChange = useCallback( ({target}) => {
        const {value} = target;
        setState (value)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state === submitValue) {
            return alert(`Can't enter identical request.`);
        }
        setSubmitValue(state);
        onSubmit(state);
    }


    return (
        <header className={styles.searchForm}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <button type="submit" className={styles.button}>
                    <span className={styles.buttonLabel}>Find</span>
                </button>
                <input 
                value={state} 
                onChange={handleChange} 
                required type="text" 
                autoComplete="off" 
                name="search" 
                autoFocus
                placeholder="Search images and photos"
                className={styles.searchElements}
                />
            </form>
        </header>
    )
}

export default Searchbar;
