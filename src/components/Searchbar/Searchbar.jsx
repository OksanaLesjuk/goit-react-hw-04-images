import { Notify } from 'notiflix';
import { useState } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [inputQuery, setInputQuery] = useState('');

  const handleInputQuery = e => {
    setInputQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputQuery.trim() === '') {
      Notify.info('Enter your request');
      return;
    }
    onSubmit(inputQuery.trim());
    setInputQuery('');
  };

  return (
    <div>
      <SearchbarHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputQuery}
            value={inputQuery}
          />
        </SearchForm>
      </SearchbarHeader>
    </div>
  );
}
