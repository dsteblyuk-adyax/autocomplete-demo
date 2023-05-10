import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import loader from '../../loader.svg';
import styles from './styles.module.css';

interface AutoCompleteProps<T, K> {
    options: T[];
    isLoading: boolean;
    value?: string;
    onInput: (value: string) => void
    onSelect: (value: K | null) => void
    getItemValue: (value: T) => K
    getItemLabel: (value: T) => string
    getItemKey: (value: T) => string
    onClose?: () => void
}

const AutoComplete = <T, K>({
    options,
    isLoading,
    value = '',
    onInput,
    onSelect,
    getItemValue,
    getItemLabel,
    getItemKey,
    onClose,
}: AutoCompleteProps<T, K>) => {
    /* #region  Hooks */
    const [inputValue, setInputValue] = useState("");
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [isShow, setIsShow] = useState(false);
    const [disableBlur, setDisableBlur] = useState(false);
    const inputRef = useRef<HTMLDivElement | null>(null)
    /* #endregion */

    /* #region  Handlers */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setInputValue(value);
        onInput(value);
        setSelectedIndex(-1);
        if(value === '') {
            onSelect(null)
        }
        if (!isShow) {
            setIsShow(true)
        }
    };

    const handleClose = () => {
        onClose?.();
        setIsShow(false);
    }

    const handleInputFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
        if (!isShow) {
            onInput((event.target as HTMLInputElement).value);
        }
        setIsShow(true);
        setDisableBlur(false)
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && selectedIndex >= 0) {
            handleSelected(options[selectedIndex]);
        } else if (event.key === "ArrowUp" && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        } else if (
            event.key === "ArrowDown" &&
            selectedIndex < options.length - 1
        ) {
            setSelectedIndex(selectedIndex + 1);
        } else if (event.key === "Escape") {
            handleClose();
        }
    };

    const handleSelected = (item: T) => {
        setInputValue(getItemLabel(item));
        onSelect(getItemValue(item));
        setSelectedIndex(-1);
        handleClose();
    };

    const highlightMatchingText = (text: string) => {
        const index = text.toLowerCase().indexOf(inputValue.toLowerCase());

        if (index >= 0) {
            const beforeMatch = text.slice(0, index);
            const matchedText = text.slice(index, index + inputValue.length);
            const afterMatch = text.slice(index + inputValue.length);

            return (
                <>
                    {beforeMatch}
                    <span className={styles.highlight}>{matchedText}</span>
                    {afterMatch}
                </>
            );
        }

        return text;
    };

    const handleOnBlur = () => {
        if (!disableBlur) {
            setInputValue(value ?? '');
            handleClose();
        }
    }
    /* #endregion */

    useEffect(() => {
        if (value) {
            onInput(value)
            setInputValue(value);
        }
    }, []);

    return (
        <div className={`${styles.autocomplete} ${isShow ? styles.opened : ''}`} ref={inputRef}>
            <input
                type="text"
                value={inputValue}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                onBlur={handleOnBlur}
            />

            {isLoading && (
                <img className={styles.loader} src={loader} width="18" height="18" alt=""/>
            )}

            {isShow && (inputValue || isLoading || options.length > 0) && (
                <ul className={styles.autocompleteList}
                    onMouseEnter={() => setDisableBlur(true)}
                    onMouseLeave={() => setDisableBlur(false)}
                >
                    {options.length > 0 ? (
                        options.map((item, index) => (
                            <li
                                key={getItemKey(item)}
                                onClick={() => handleSelected(item)}
                                className={selectedIndex === index ? `${styles.selected}` : ''}
                            >
                                {highlightMatchingText(getItemLabel(item))}
                            </li>
                        ))
                    ) : (
                        <li className={styles.noResult}>{isLoading ? 'Loading...' : 'No options'}</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;